-- Approved production hardening for project atvchidakkzgtlszwmvn.
-- Execute transactionally, with the companion assertions before COMMIT.
-- Does not delete application data or change service_role's table access.
SET LOCAL lock_timeout = '3s';
SET LOCAL statement_timeout = '15s';

DO $preflight$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname IN ('articles', 'news_articles', 'cleanup_runs')
      AND NOT c.relrowsecurity
  ) THEN
    RAISE EXCEPTION 'RLS baseline changed; review before applying';
  END IF;
END;
$preflight$;

DROP POLICY IF EXISTS "Allow insert access" ON public.news_articles;
DROP POLICY IF EXISTS insert_authenticated_articles ON public.articles;

-- RLS does not govern TRUNCATE or sequence operations. Restrict grants too.
REVOKE ALL PRIVILEGES ON TABLE
  public.articles, public.news_articles, public.cleanup_runs
  FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.articles, public.news_articles TO anon, authenticated;
REVOKE ALL PRIVILEGES ON SEQUENCE public.news_articles_id_seq
  FROM PUBLIC, anon, authenticated;

-- The existing body uses schema-qualified tables; pg_catalog remains implicit.
ALTER FUNCTION public.cleanup_old_articles() SET search_path = '';
REVOKE ALL PRIVILEGES ON FUNCTION public.cleanup_old_articles()
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_old_articles() TO service_role;
