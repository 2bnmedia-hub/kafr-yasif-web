import { NextResponse } from "next/server";
import { ilike, or, eq, and } from "drizzle-orm";
import { db } from "@/db";
import { pages, news } from "@/db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const pattern = `%${q}%`;

  const [pageResults, newsResults] = await Promise.all([
    db
      .select({ title: pages.title, slug: pages.slug, navLabel: pages.navLabel })
      .from(pages)
      .where(and(eq(pages.published, true), or(ilike(pages.title, pattern), ilike(pages.navLabel, pattern), ilike(pages.bodyHtml, pattern))))
      .limit(8),
    db
      .select({ title: news.title, slug: news.slug })
      .from(news)
      .where(and(eq(news.published, true), or(ilike(news.title, pattern), ilike(news.excerpt, pattern))))
      .limit(4),
  ]);

  const results = [
    ...pageResults.map((p) => ({ title: p.title, href: `/${p.slug}`, type: "page" as const })),
    ...newsResults.map((n) => ({ title: n.title, href: `/news/${n.slug}`, type: "news" as const })),
  ];

  return NextResponse.json({ results });
}
