import type { NewsItem } from "./news.ts";

export const normalizeSearch = (value: string): string => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function selectNews(items: NewsItem[], search: string, category: string, source: string, page: number, pageSize = 6) {
  const terms = normalizeSearch(search.trim()).split(/\s+/).filter(Boolean);
  const filtered = items.filter(item => (!category || item.category === category) && (!source || item.source === source)
    && terms.every(term => normalizeSearch(item.title + " " + item.summary + " " + item.source).includes(term)));
  const size = Math.max(1, Math.min(12, Math.floor(pageSize) || 6));
  const pageCount = Math.max(1, Math.ceil(filtered.length / size));
  const safePage = Math.min(Math.max(0, Math.floor(page) || 0), pageCount - 1);
  return { items: filtered.slice(safePage * size, (safePage + 1) * size), total: filtered.length, page: safePage, pageCount };
}
