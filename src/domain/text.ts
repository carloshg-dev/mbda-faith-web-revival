import { Parser } from "htmlparser2";

const OMIT_CONTENT = new Set(["script", "style", "template", "iframe", "object"]);
const BREAKS = new Set(["br", "p", "div", "li", "h1", "h2", "h3", "section"]);

/** Extract bounded display text, not trusted HTML. Render with React or escape at the output sink. */
export function toDisplayText(value: unknown, max = 480): string {
  if (typeof value !== "string" || !Number.isFinite(max) || max < 1) return "";
  const limit = Math.min(4000, Math.floor(max));
  const chunks: string[] = [];
  let length = 0;
  let omittedDepth = 0;
  const append = (text: string) => {
    const part = text.slice(0, Math.max(0, limit * 4 - length));
    if (part) { chunks.push(part); length += part.length; }
  };
  // Event parsing avoids a DOM allocation; both input and output have hard budgets.
  const parser = new Parser({
    onopentag(name) {
      if (omittedDepth > 0 || OMIT_CONTENT.has(name)) omittedDepth++;
      else if (BREAKS.has(name)) append(" ");
    },
    ontext(text) { if (omittedDepth === 0) append(text); },
    onclosetag(name) {
      if (omittedDepth > 0) omittedDepth--;
      else if (BREAKS.has(name)) append(" ");
    },
  }, { decodeEntities: true });
  parser.end(value.slice(0, 16_000));
  // Entities are decoded exactly once by the parser. Never parse this output as HTML.
  return chunks.join("").replace(/\s+/g, " ").trim().slice(0, limit);
}
