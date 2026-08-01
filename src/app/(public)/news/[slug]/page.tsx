import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { news } from "@/db/schema";
import { getNewsBySlug, getNewsGallery } from "@/db/queries";
import { getServerLocale } from "@/i18n/get-locale";
import { ImageLightboxGrid } from "@/components/content/ImageLightboxGrid";

export const revalidate = 3600;

export async function generateStaticParams() {
  const rows = await db.select({ slug: news.slug }).from(news);
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(decodeURIComponent(slug));
  if (!item) return {};
  return {
    title: item.metaTitle || item.title,
    description: item.metaDescription || item.excerpt || undefined,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      title: item.metaTitle || item.title,
      description: item.metaDescription || item.excerpt || undefined,
      images: item.ogImageUrl ? [item.ogImageUrl] : item.imageUrl ? [item.imageUrl] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(decodeURIComponent(slug));
  if (!item || !item.published) notFound();

  await db.update(news).set({ viewCount: sql`${news.viewCount} + 1` }).where(eq(news.id, item.id));

  const [gallery, locale] = await Promise.all([getNewsGallery(item.id), getServerLocale()]);
  const heroImage = gallery.find((g) => g.media.kind === "image");

  const displayTitle = (locale === "ar" ? item.titleAr : locale === "en" ? item.titleEn : item.title) || item.title;
  const displaySubtitle = (locale === "ar" ? item.subtitleAr : locale === "en" ? item.subtitleEn : item.subtitle) || item.subtitle;
  const displayBody = (locale === "ar" ? item.bodyHtmlAr : locale === "en" ? item.bodyHtmlEn : item.bodyHtml) || item.bodyHtml;
  const isRichHtml = /<[a-z][\s\S]*>/i.test(displayBody);
  const paragraphs = isRichHtml ? [] : displayBody.split(/\n{2,}/).filter(Boolean);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kafr-yasif-web.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: displayTitle,
    description: item.excerpt || undefined,
    datePublished: new Date(item.publishedAt).toISOString(),
    image: item.imageUrl ? [item.imageUrl] : undefined,
    publisher: { "@type": "Organization", name: "מועצה מקומית כפר יאסיף", url: siteUrl },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-teal-700 hover:underline">
              דף בית
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/news" className="hover:text-teal-700 hover:underline">
              חדשות ועדכונים
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-teal-900">
            {displayTitle}
          </li>
        </ol>
      </nav>

      {heroImage && (
        <ImageLightboxGrid heroImage={{ url: heroImage.media.url, alt: heroImage.image.alt }} images={[]} />
      )}

      <h1 dir="rtl" lang="ar" className="mb-2 text-2xl font-bold text-teal-900 sm:text-3xl">
        {displayTitle}
      </h1>
      {displaySubtitle && (
        <p dir="rtl" lang="ar" className="mb-6 text-lg font-medium text-ink-600">
          {displaySubtitle}
        </p>
      )}

      {isRichHtml ? (
        <div dir="rtl" lang="ar" className="rte-render" dangerouslySetInnerHTML={{ __html: displayBody }} />
      ) : (
        <div dir="rtl" lang="ar" className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="whitespace-pre-line text-base leading-8 text-ink-600">
              {para}
            </p>
          ))}
        </div>
      )}

      <ImageLightboxGrid
        images={gallery
          .filter((g) => g.media.kind === "image" && g.image.id !== heroImage?.image.id)
          .map((g) => ({ url: g.media.url, alt: g.image.alt }))}
        documents={gallery.filter((g) => g.media.kind !== "image").map((g) => ({ url: g.media.url, filename: g.media.filename }))}
      />
    </article>
  );
}
