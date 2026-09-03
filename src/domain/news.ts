export interface NewsItem {
  title: string; summary: string; url: string; source: string; date: string;
  category: string; image_url?: string; dateVerified: boolean;
  relevanceScore?: number; detectedKeywords?: string[]; autoTags?: string[];
}
export interface NewsFeed {
  articles: NewsItem[];
  updatedAt: string | null;
  stale: boolean;
  unavailable: boolean;
  rejected: number;
}
export const MAX_ARTICLES = 60;
export const MAX_FEED_BYTES = 1_000_000;
export const FRESHNESS_MS = 48 * 60 * 60 * 1000;
const publishers = [
  "gospelprime.com.br", "guiame.com.br", "portasabertas.org.br", "cafetorah.com",
  "folhagospel.com", "radio93.com.br", "cpadnews.com.br", "noticiasdeisrael.com.br",
  "voltemosaoevangelho.com", "ministeriofiel.com.br", "biblicalarchaeology.org",
  "teologiabrasileira.com.br", "monergismo.com", "monergismo.com.br", "ipb.org.br",
  "mackenzie.br", "cinco-solas.com", "cristianismohoje.com.br", "editorafiel.com.br",
  "cpad.com.br", "revistagalileu.globo.com", "arqueologiaeprehistoria.com",
  "bbc.com", "christianitytoday.com", "news.google.com", "ibarq.org.br",
  "incrivelhistoria.com.br", "usp.br", "nationalgeographicbrasil.com", "sabnet.org",
  "hernandesdiaslopes.com.br", "ultimato.com.br",
];
const knownSyntheticTitles = [
  "A Importância da Doutrina da Graça na Vida Cristã",
  "Perseguição aos Cristãos: Como Orar pela Igreja Perseguida",
  "Os Dons Espirituais na Igreja Reformada: Ordem e Edificação",
  "Reconciliação: O Ministério da Igreja no Mundo",
  "Conferência teológica reúne milhares de cristãos em São Paulo",
  "Nova tradução bíblica facilita leitura para jovens brasileiros",
  "Igreja brasileira cresce em engajamento social nas comunidades",
  "Teólogos debatem relevância da fé cristã na era digital",
];
const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
export const normalizeSearch = (value: string): string => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const plain = (value: unknown, max: number): string => typeof value === "string" ? value.replace(/<[^>]*>/g, "").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim().slice(0,max) : "";
export function safeHttpsUrl(value: unknown, restrictPublisher = false): string | undefined {
  if (typeof value !== "string" || value.length > 2048 || value.includes("\\") || [...value].some(char => char.charCodeAt(0) <= 32)) return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || (url.port && url.port !== "443")) return;
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(url.hostname) || /(^|\.)(localhost|local|internal)$/i.test(url.hostname)) return;
    if (restrictPublisher && (!publishers.some(domain => url.hostname === domain || url.hostname.endsWith("." + domain)) || url.pathname === "/")) return;
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) if (/^(utm_|fbclid|gclid)/i.test(key)) url.searchParams.delete(key);
    return url.href;
  } catch { return; }
}
function validDate(value: unknown, now: number): string | null {
  if (typeof value !== "string" || value.length > 100) return null;
  // Legacy collector wrote a naive UTC last_updated; never interpret it in the visitor's timezone.
  const candidate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/.test(value) ? value + "Z" : value;
  const timestamp = Date.parse(candidate);
  return Number.isFinite(timestamp) && timestamp <= now + 5 * 60_000 && timestamp >= Date.UTC(2000,0,1) ? new Date(timestamp).toISOString() : null;
}
export function normalizeFeed(value: unknown, now = Date.now()): NewsFeed {
  if (!isRecord(value) || !Array.isArray(value.articles)) throw new Error("Formato do arquivo de notícias inválido.");
  const updatedAt = validDate(value.last_updated, now);
  const articles: NewsItem[] = [];
  const seen = new Set<string>();
  let rejected = 0;
  for (const row of value.articles.slice(0, 200)) {
    if (!isRecord(row)) { rejected++; continue; }
    const title = plain(row.title, 240);
    const url = safeHttpsUrl(row.url, true);
    const date = validDate(row.date, now);
    const source = plain(row.source, 90);
    if (!url || !date || title.length < 8 || !source || knownSyntheticTitles.includes(title)) { rejected++; continue; }
    const titleKey = normalizeSearch(title);
    if (seen.has(url) || seen.has(titleKey)) { rejected++; continue; }
    seen.add(url); seen.add(titleKey);
    articles.push({title, url, source, date, summary: plain(row.summary, 480),
      category: plain(row.category, 65) || "Notícias cristãs",
      image_url: safeHttpsUrl(row.image_url),
      dateVerified: value.schema_version === 2 && row.publication_date_verified === true });
  }
  articles.sort((a,b) => Date.parse(b.date) - Date.parse(a.date));
  return { articles: articles.slice(0, MAX_ARTICLES), updatedAt,
    stale: !updatedAt || now - Date.parse(updatedAt) > FRESHNESS_MS,
    unavailable: false, rejected };
}
export function selectNews(items: NewsItem[], search: string, category: string, source: string, page: number, pageSize = 6) {
  const terms = normalizeSearch(search.trim()).split(/\s+/).filter(Boolean);
  const filtered = items.filter(item => (!category || item.category === category) && (!source || item.source === source)
    && terms.every(term => normalizeSearch(item.title + " " + item.summary + " " + item.source).includes(term)));
  const size = Math.max(1, Math.min(12, Math.floor(pageSize) || 6));
  const pageCount = Math.max(1, Math.ceil(filtered.length / size));
  const safePage = Math.min(Math.max(0, Math.floor(page) || 0), pageCount - 1);
  return { items: filtered.slice(safePage * size, (safePage + 1) * size), total: filtered.length, page: safePage, pageCount };
}
