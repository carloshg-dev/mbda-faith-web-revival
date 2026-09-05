-- EMERGENCY ONLY. Restores the measured legacy permissions, INCLUDING weaknesses.
-- Never run automatically; prefer a targeted forward repair. Requires approval.
SET LOCAL lock_timeout = '3s';
SET LOCAL statement_timeout = '15s';
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER, MAINTAIN ON TABLE
  public.articles, public.news_articles, public.cleanup_runs TO anon, authenticated;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE public.news_articles_id_seq TO anon, authenticated;
DROP POLICY IF EXISTS "Allow insert access" ON public.news_articles;
CREATE POLICY "Allow insert access" ON public.news_articles FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS insert_authenticated_articles ON public.articles;
CREATE POLICY insert_authenticated_articles ON public.articles FOR INSERT
  TO authenticated WITH CHECK ((SELECT auth.uid()) IS NOT NULL);
ALTER FUNCTION public.cleanup_old_articles() RESET search_path;
-- The original EXECUTE grants already allowed only owner postgres and service_role.
