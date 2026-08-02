/**
 * CI gate: fails the build if a slug- or link-like source string contains a typographic quote
 * mark (U+2019 ', U+2018 ') instead of a straight one. This exact substitution (Word/Docs
 * autocorrect turning a straight apostrophe into a curly one when content is pasted) previously
 * produced slugs Next's router couldn't decode, causing 500s on /[slug] routes.
 *
 * Scoped to slug/href-bearing fields rather than all source text, since U+2019 is legitimate in
 * ordinary prose (e.g. English "don't").
 */
import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname } from "path";

const SCAN_ROOT = join(__dirname, "..", "src");
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".json"]);
const BAD_CHARS = /[‘’]/;
// Matches `slug: "..."`, `"slug": "..."`, `href: "..."` etc. (any quote style, JSON or TS keys) containing a bad char.
const FIELD_PATTERN = /\b(slug|href|navLabel\w*|pathname)\b["'`]?\s*[:=]\s*(["'`])((?:(?!\2).)*)\2/g;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next") continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (SCAN_EXTENSIONS.has(extname(entry))) out.push(full);
  }
  return out;
}

let failures = 0;

for (const file of walk(SCAN_ROOT)) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(FIELD_PATTERN)) {
    const [, field, , value] = match;
    if (BAD_CHARS.test(value)) {
      const line = content.slice(0, match.index).split("\n").length;
      console.error(`✗ ${file}:${line} — ${field} contains a typographic quote (’/‘): ${value}`);
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} slug/link field(s) contain a typographic quote mark. Replace ’/‘ with a straight ' or remove it.`);
  process.exit(1);
}

console.log("✓ No typographic quote marks found in slug/link fields.");
