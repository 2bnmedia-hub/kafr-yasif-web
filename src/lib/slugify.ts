/** Turns a title into a URL-safe slug, keeping Hebrew/Arabic letters (matches this site's existing Hebrew-slug convention). */
export function slugify(input: string): string {
  return input
    .normalize("NFC")
    // Straight and curly quote marks (ASCII ' ", right/left single quotes U+2019/U+2018,
    // Hebrew geresh/gershayim U+05F3/U+05F4) — content pasted from Word/Docs autocorrects
    // straight quotes to curly ones, and those must never survive into a slug.
    .replace(/["'‘’׳״]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120) || "item";
}

export function uniqueSlug(base: string, existing: Set<string>): string {
  const slug = slugify(base);
  if (!existing.has(slug)) return slug;
  let i = 2;
  while (existing.has(`${slug}-${i}`)) i++;
  return `${slug}-${i}`;
}
