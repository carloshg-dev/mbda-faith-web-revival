-- Read-only catalog assertions: safe in production; never attempts a write.
DO $assertions$
DECLARE
  principal text;
  relation text;
  privilege text;
BEGIN
  FOREACH principal IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH relation IN ARRAY ARRAY['articles', 'news_articles', 'cleanup_runs'] LOOP
      FOREACH privilege IN ARRAY ARRAY[
        'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER', 'MAINTAIN'
      ] LOOP
        IF has_table_privilege(principal, 'public.' || relation, privilege) THEN
          RAISE EXCEPTION '% retains % on %', principal, privilege, relation;
        END IF;
      END LOOP;
      IF has_any_column_privilege(principal, 'public.' || relation, 'INSERT')
        OR has_any_column_privilege(principal, 'public.' || relation, 'UPDATE') THEN
        RAISE EXCEPTION '% retains column write access on %', principal, relation;
      END IF;
    END LOOP;
    IF NOT has_table_privilege(principal, 'public.news_articles', 'SELECT')
      OR NOT has_table_privilege(principal, 'public.articles', 'SELECT') THEN
      RAISE EXCEPTION 'Public reading changed for %', principal;
    END IF;
    IF has_table_privilege(principal, 'public.cleanup_runs', 'SELECT') THEN
      RAISE EXCEPTION 'Cleanup audit became public to %', principal;
    END IF;
    IF has_sequence_privilege(principal, 'public.news_articles_id_seq', 'USAGE')
      OR has_sequence_privilege(principal, 'public.news_articles_id_seq', 'UPDATE')
      OR has_sequence_privilege(principal, 'public.news_articles_id_seq', 'SELECT') THEN
      RAISE EXCEPTION 'Sequence privileges remain for %', principal;
    END IF;
    IF has_function_privilege(principal, 'public.cleanup_old_articles()', 'EXECUTE') THEN
      RAISE EXCEPTION 'Privileged cleanup remains executable by %', principal;
    END IF;
  END LOOP;

  IF (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relname IN ('articles','news_articles','cleanup_runs')
        AND c.relkind IN ('r','p') AND c.relrowsecurity) <> 3 THEN
    RAISE EXCEPTION 'Expected three RLS-protected tables';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public'
      AND tablename IN ('articles','news_articles','cleanup_runs') AND cmd <> 'SELECT') THEN
    RAISE EXCEPTION 'Unexpected write policy remains';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public'
      AND tablename='news_articles' AND cmd='SELECT' AND qual='true') THEN
    RAISE EXCEPTION 'Public news read policy changed';
  END IF;
  IF NOT has_function_privilege('service_role', 'public.cleanup_old_articles()', 'EXECUTE')
    OR NOT has_table_privilege('service_role', 'public.news_articles', 'INSERT') THEN
    RAISE EXCEPTION 'Server service access changed';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p, unnest(p.proconfig) cfg
      WHERE p.oid='public.cleanup_old_articles()'::regprocedure
        AND p.prosecdef AND cfg IN ('search_path=""', 'search_path=')) THEN
    RAISE EXCEPTION 'Cleanup search_path is not empty';
  END IF;
END;
$assertions$;
