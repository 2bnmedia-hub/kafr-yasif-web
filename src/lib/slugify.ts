/** Turns a title into a URL-safe slug, keeping Hebrew/Arabic letters (matches this site's existing Hebrew-slug convention). */
export function slugify(input: string): string {
  return input
    .trim()
    .replace(/["'׳״]/g, "")
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
