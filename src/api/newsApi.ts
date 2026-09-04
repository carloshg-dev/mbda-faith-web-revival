import { FRESHNESS_MS, MAX_FEED_BYTES } from "../domain/newsPolicy.ts";
import type { NewsFeed } from "../domain/news.ts";
export type { NewsItem } from "../domain/news";

const CACHE_MS = 15 * 60_000;
const REFRESH_COOLDOWN_MS = 60_000;
export class NewsClient {
  private cached: NewsFeed | null = null;
  private checkedAt = -Infinity;
  private pending: Promise<NewsFeed> | null = null;
  private readonly fetcher: typeof fetch;
  private readonly now: () => number;
  constructor(fetcher: typeof fetch = fetch, now = Date.now) { this.fetcher = (input, init) => fetcher(input, init); this.now = now; }
  async loadFeed(force = false): Promise<NewsFeed> {
    if (this.pending) return this.pending;
    if (this.cached && this.now() - this.checkedAt < (force ? REFRESH_COOLDOWN_MS : CACHE_MS)) {
      return { ...this.cached, stale: this.cached.unavailable || !this.cached.updatedAt || this.now() - Date.parse(this.cached.updatedAt) > FRESHNESS_MS };
    }
    this.pending = this.request();
    try { return await this.pending; } finally { this.pending = null; }
  }
  private async request(): Promise<NewsFeed> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      // Same-origin static feed: no visitor-triggered scraping, Supabase reads or cache-busting.
      const response = await this.fetcher("/data/christian_news.json", { signal: controller.signal, cache: "default", credentials: "omit" });
      if (!response.ok) throw new Error("Feed indisponível");
      if (Number(response.headers.get("content-length")) > MAX_FEED_BYTES) throw new Error("Feed acima do limite");
      if (!response.body) throw new Error("Feed sem conteúdo");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let bytes = 0;
      let content = "";
      try {
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          bytes += part.value.byteLength;
          if (bytes > MAX_FEED_BYTES) { controller.abort(); await reader.cancel(); throw new Error("Feed acima do limite"); }
          content += decoder.decode(part.value, {stream:true});
        }
      } finally { reader.releaseLock(); }
      content += decoder.decode();
      // Load parsing code only when the bounded feed is actually requested.
      const { normalizeFeed } = await import("../domain/news.ts");
      const feed = normalizeFeed(JSON.parse(content), this.now());
      this.cached = feed; this.checkedAt = this.now();
      return feed;
    } catch (error) {
      if (import.meta.env?.DEV) console.warn("Static news feed unavailable:", error instanceof Error ? error.message : "unknown error");
      this.checkedAt = this.now();
      this.cached = { ...(this.cached ?? {articles:[], updatedAt:null, rejected:0}), stale:true, unavailable:true };
      return this.cached;
    } finally { clearTimeout(timeout); }
  }
  async loadNews() { return (await this.loadFeed()).articles; }
  async refreshNews() { return (await this.loadFeed(true)).articles; }
  getCacheInfo() { return { isCached: !!this.cached, lastUpdated: this.cached?.updatedAt ?? null }; }
}
export const newsAPI = new NewsClient();
export const loadNewsFeed = (force = false) => newsAPI.loadFeed(force);
export const loadChristianNews = () => newsAPI.loadNews();
export const refreshChristianNews = () => newsAPI.refreshNews();
export const getNewsCacheInfo = () => newsAPI.getCacheInfo();
export const resetNewsLocalState = () => {
  try { localStorage.removeItem("newsBlacklist"); localStorage.removeItem("newsFirstSeen"); }
  catch { /* Storage may be disabled. Reading news never depends on it. */ }
  return newsAPI.refreshNews();
};
