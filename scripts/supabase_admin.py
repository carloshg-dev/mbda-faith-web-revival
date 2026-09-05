"""Scoped backup, local restore rehearsal and approved access hardening.

Requires local psycopg2 and python-dotenv. Never prints DSNs or passwords.
Production probes use read-only transactions and catalog checks, never DML.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import uuid
from datetime import datetime, timezone

import psycopg2
from psycopg2 import extensions, sql
from dotenv import dotenv_values

ROOT = Path(__file__).resolve().parents[1]
PROJECT = "atvchidakkzgtlszwmvn"
VERSION = "20260905030000"
MIGRATION = ROOT / "supabase/migrations" / f"{VERSION}_harden_public_access.sql"
ROLLBACK = ROOT / "supabase/rollback" / MIGRATION.name
ASSERTIONS = ROOT / "supabase/tests/20260905_public_access.sql"
TABLES = ("articles", "cleanup_runs", "news_articles")


def digest(path: Path) -> str:
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def write_json(path: Path, value: dict) -> None:
    with path.open("x", encoding="utf-8") as stream:
        json.dump(value, stream, ensure_ascii=False, indent=2)


def canonical_state(state: dict) -> dict:
    value = json.loads(json.dumps(state))
    # Built-in role names in this project have no commas/escaped quotes. ACL
    # array order changes after REVOKE/GRANT, but does not change privileges.
    for collection in ("acls", "functions"):
        for row in value[collection]:
            acl = row[1]
            if isinstance(acl, str):
                row[1] = sorted(acl.strip("{}").split(","))
    return value


def remote_config() -> dict:
    env = dotenv_values(ROOT / ".env.local", interpolate=False)
    if str(env.get("VITE_SUPABASE_URL", "")).rstrip("/") != f"https://{PROJECT}.supabase.co":
        raise ValueError("Unexpected Supabase project")
    cfg = extensions.parse_dsn(env.get("DATABASE_URL") or "")
    direct = cfg.get("host") == f"db.{PROJECT}.supabase.co"
    pooler = (cfg.get("host", "").endswith(".pooler.supabase.com")
              and cfg.get("user") == f"postgres.{PROJECT}")
    if not (direct or pooler) or cfg.get("dbname") != "postgres":
        raise ValueError("DATABASE_URL does not match the approved database")
    cfg.setdefault("sslmode", "require")
    if cfg["sslmode"] not in ("require", "verify-ca", "verify-full"):
        raise ValueError("TLS is required")
    cfg["connect_timeout"] = "10"
    return cfg


def connection(cfg: dict, readonly: bool = True):
    conn = psycopg2.connect(**cfg)
    conn.set_session(isolation_level="REPEATABLE READ", readonly=readonly)
    with conn.cursor() as cur:
        cur.execute("SET LOCAL statement_timeout = '30s'")
        cur.execute("SET LOCAL lock_timeout = '3s'")
        cur.execute("SET LOCAL TIME ZONE 'UTC'")
    return conn


def snapshot(conn) -> dict:
    out = {"data": {}}
    for table in TABLES:
        h = hashlib.sha256()
        count = 0
        with conn.cursor(name="mbda_fingerprint_" + table) as cur:
            cur.itersize = 256
            cur.execute(sql.SQL("SELECT row_to_json(t)::text FROM public.{} t ORDER BY id")
                        .format(sql.Identifier(table)))
            for row in cur:
                h.update(row[0].encode("utf-8"))
                h.update(b"\n")
                count += 1
        out["data"][table] = {"rows": count, "sha256": h.hexdigest()}
    queries = {
        "policies": "SELECT tablename,policyname,roles,cmd,qual,with_check FROM pg_policies WHERE schemaname='public' ORDER BY tablename,policyname",
        "acls": "SELECT c.relname,c.relacl::text,c.relrowsecurity FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind IN ('r','p','S') ORDER BY c.relname",
        "functions": "SELECT p.oid::regprocedure::text,p.proacl::text,p.proconfig,pg_get_functiondef(p.oid) FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' ORDER BY 1",
    }
    with conn.cursor() as cur:
        for label, query in queries.items():
            cur.execute(query)
            out[label] = cur.fetchall()
    # Canonicalize tuple/list representations for on-disk comparisons.
    return canonical_state(out)


def run_tool(bin_dir: Path, tool: str, args: list[str], cfg: dict | None = None,
             timeout: int = 90) -> None:
    env = os.environ.copy()
    # Isolate libpq configuration from other projects on this machine.
    for name in list(env):
        if name.startswith("PG"):
            del env[name]
    if cfg:
        for key, name in {"host":"PGHOST", "port":"PGPORT", "user":"PGUSER",
                          "password":"PGPASSWORD", "dbname":"PGDATABASE",
                          "sslmode":"PGSSLMODE", "sslrootcert":"PGSSLROOTCERT"}.items():
            if key in cfg:
                env[name] = str(cfg[key])
        env["PGCONNECT_TIMEOUT"] = "10"
    # pg_ctl children can inherit pipe handles on Windows. File-backed capture
    # waits for the utility, not for the background database to close a pipe.
    with tempfile.TemporaryFile() as stdout, tempfile.TemporaryFile() as stderr:
        result = subprocess.run([str(bin_dir / (tool + ".exe")), *args],
                                env=env, stdout=stdout, stderr=stderr, timeout=timeout)
        stderr.seek(0, os.SEEK_END)
        stderr.seek(max(0, stderr.tell() - 3000))
        error = stderr.read().decode("utf-8", errors="replace")
    if result.returncode:
        # Keep diagnostic detail but redact every supplied credential.
        if cfg:
            for key in ("password", "user", "host"):
                if cfg.get(key):
                    error = error.replace(str(cfg[key]), "[redacted]")
        raise RuntimeError(f"{tool} failed ({result.returncode}): {error}")


def backup(bin_dir: Path, folder: Path) -> None:
    cfg = remote_config()
    conn = connection(cfg)
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT pg_export_snapshot()")
            exported = cur.fetchone()[0]
        state = snapshot(conn)
        archive = folder / "public-before.dump"
        if archive.exists():
            raise ValueError("Backup destination already exists")
        run_tool(bin_dir, "pg_dump", ["--format=custom", "--schema=public", "--no-owner",
                 "--lock-wait-timeout=5000", "--snapshot=" + exported,
                 "--file=" + str(archive)], cfg)
        run_tool(bin_dir, "pg_restore", ["--list", str(archive)])
        write_json(folder / "before.json", {"project": PROJECT, "at": now(),
                   "scope": "public schema: all application tables, sequences, functions, policies and ACLs",
                   "archive_sha256": digest(archive), "state": state})
        print(json.dumps({"backup": str(folder), "bytes": archive.stat().st_size,
                          "tables": state["data"]}))
    finally:
        conn.rollback()
        conn.close()


def apply_sql(conn, path: Path) -> None:
    with conn.cursor() as cur:
        cur.execute(path.read_text(encoding="utf-8"))


def verify_backup(folder: Path) -> dict:
    record = json.loads((folder / "before.json").read_text(encoding="utf-8"))
    if record["project"] != PROJECT or digest(folder / "public-before.dump") != record["archive_sha256"]:
        raise ValueError("Backup integrity/project verification failed")
    record["state"] = canonical_state(record["state"])
    return record


def rehearse(bin_dir: Path, folder: Path) -> None:
    original = verify_backup(folder)
    data_dir = folder / ("restore-test-" + uuid.uuid4().hex[:8])
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
    local = {"host":"127.0.0.1", "port":port, "user":"postgres", "dbname":"postgres"}
    run_tool(bin_dir, "initdb", ["-D", str(data_dir), "-U", "postgres", "--auth=trust",
                                 "--encoding=UTF8", "--locale=C"])
    started = False
    try:
        run_tool(bin_dir, "pg_ctl", ["-D", str(data_dir), "-l", str(folder / "restore-server.log"),
                 "-o", f"-h 127.0.0.1 -p {port} -c shared_buffers=32MB -c max_connections=10", "-w", "start"])
        started = True
        conn = connection(local, readonly=False)
        try:
            with conn.cursor() as cur:
                cur.execute("CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS; CREATE ROLE supabase_admin; CREATE ROLE dashboard_user")
                cur.execute("CREATE SCHEMA auth; CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT NULLIF(current_setting('request.jwt.claim.sub',true),'')::uuid $$")
            conn.commit()
        finally:
            conn.close()
        # --clean is confined to a freshly-created local cluster, never production.
        run_tool(bin_dir, "pg_restore", ["--exit-on-error", "--clean", "--if-exists",
                 "--no-owner", "--dbname=postgres", str(folder / "public-before.dump")], local)
        conn = connection(local, readonly=False)
        try:
            restored = snapshot(conn)
            if restored != original["state"]:
                raise ValueError("Restore differs from source snapshot")
            apply_sql(conn, MIGRATION)
            apply_sql(conn, ASSERTIONS)
            hardened = snapshot(conn)
            if hardened["data"] != restored["data"]:
                raise ValueError("Migration changed application rows")
            apply_sql(conn, MIGRATION)
            apply_sql(conn, ASSERTIONS)
            if snapshot(conn) != hardened:
                raise ValueError("Migration is not idempotent")
            apply_sql(conn, ROLLBACK)
            rolled_back = snapshot(conn)
            if rolled_back != restored:
                different = [key for key in restored if rolled_back[key] != restored[key]]
                raise ValueError("Rollback differs from source: " + ", ".join(different))
            conn.rollback()
        finally:
            conn.close()
        write_json(folder / "rehearsal.json", {"project":PROJECT, "at":now(),
            "migration_sha256":digest(MIGRATION), "assertions_sha256":digest(ASSERTIONS),
            "archive_sha256":original["archive_sha256"], "restore_exact":True,
            "data_unchanged":True, "catalog_assertions":True, "idempotent":True,
            "rollback_exact":True})
        print("Local restore, permissions, unchanged data, idempotence and rollback: PASS")
    finally:
        if started:
            run_tool(bin_dir, "pg_ctl", ["-D", str(data_dir), "-w", "stop", "-m", "fast"])


def apply_production(folder: Path, confirmed_project: str | None) -> None:
    if confirmed_project != PROJECT:
        raise ValueError("Explicit confirmation of the approved project is required")
    original = verify_backup(folder)
    trial = json.loads((folder / "rehearsal.json").read_text(encoding="utf-8"))
    if (trial.get("migration_sha256") != digest(MIGRATION)
        or trial.get("assertions_sha256") != digest(ASSERTIONS)
        or trial.get("archive_sha256") != original["archive_sha256"]
        or not all(trial.get(k) for k in ("restore_exact","data_unchanged","catalog_assertions","idempotent","rollback_exact"))):
        raise ValueError("A successful rehearsal of this exact migration/backup is required")
    receipt = folder / "applied.json"
    if receipt.exists():
        raise ValueError("Already applied; verify current state instead of repeating")
    conn = connection(remote_config(), readonly=False)
    try:
        before = snapshot(conn)
        if before != original["state"]:
            raise ValueError("Production changed since backup: take a fresh snapshot/rehearsal")
        apply_sql(conn, MIGRATION)
        apply_sql(conn, ASSERTIONS)
        after = snapshot(conn)
        if before["data"] != after["data"]:
            raise ValueError("Application data changed; rolling back")
        conn.commit()
        write_json(receipt, {"project":PROJECT, "at":now(),
            "migration_sha256":digest(MIGRATION), "archive_sha256":original["archive_sha256"],
            "data_unchanged":True, "state":after})
        print("Approved production transaction committed; all catalog assertions passed")
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=["backup","rehearse","apply","verify"])
    parser.add_argument("--bin", type=Path)
    parser.add_argument("--folder", required=True, type=Path)
    parser.add_argument("--confirm-project")
    args = parser.parse_args()
    folder = args.folder.resolve()
    allowed = (ROOT / "_local_backups").resolve()
    if not folder.is_relative_to(allowed) or folder == allowed:
        raise ValueError("Artifacts must be in a dedicated ignored backup subdirectory")
    if not folder.is_dir():
        raise ValueError("Create a private backup directory first")
    if args.action in ("backup", "rehearse"):
        if args.bin is None:
            raise ValueError("PostgreSQL 17+ binary directory required")
        (backup if args.action == "backup" else rehearse)(args.bin.resolve(), folder)
    elif args.action == "apply":
        apply_production(folder, args.confirm_project)
    else:
        conn = connection(remote_config())
        try:
            apply_sql(conn, ASSERTIONS)
            print(json.dumps({"project":PROJECT, "catalog_assertions":"PASS", "state":snapshot(conn)}))
        finally:
            conn.rollback()
            conn.close()


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        # Connection errors can embed DSNs. Report class only for libpq errors.
        if isinstance(error, psycopg2.Error):
            print(f"Database operation failed: {type(error).__name__}; SQLSTATE={error.pgcode}", file=sys.stderr)
        else:
            print(str(error), file=sys.stderr)
        sys.exit(1)
