/** Shared static-feed budgets; importing them must not load the HTML parser. */
export const MAX_ARTICLES = 60;
export const MAX_FEED_BYTES = 1_000_000;
export const FRESHNESS_MS = 48 * 60 * 60 * 1000;
