import Image from "next/image";
import Link from "next/link";
import { getPublishedNews } from "@/db/queries";
import { getServerLocale } from "@/i18n/get-locale";

type NewsRow = Awaited<ReturnType<typeof getPublishedNews>>[number];

const FALLBACK_IMAGE_BY_VARIANT: Record<string, string> = {
  flyer: "/images/news-flyer-kindergarten.jpg",
  alert: "/images/news-alert-condemn.jpg",
  logo: "/images/news-logo-statement.jpg",
};

const TYPE_LABEL_BY_VARIANT: Record<string, Record<string, string>> = {
  he: {
    alert: "הודעה דחופה",
    flyer: "הרשמה",
    logo: "הודעה רשמית",
    photo: "עדכון",
    "urgent-update": "עדכון דחוף",
    "urgent-alert": "התראה דחופה",
    registration: "הרשמה",
    "resident-notice": "התראה לתושבים",
  },
  ar: {
    alert: "إعلان عاجل",
    flyer: "التسجيل",
    logo: "بيان رسمي",
    photo: "تحديث",
    "urgent-update": "تحديث عاجل",
    "urgent-alert": "تنبيه عاجل",
    registration: "التسجيل",
    "resident-notice": "تنبيه للسكان",
  },
  en: {
    alert: "Urgent notice",
    flyer: "Registration",
    logo: "Official statement",
    photo: "Update",
    "urgent-update": "Urgent update",
    "urgent-alert": "Urgent alert",
    registration: "Registration",
    "resident-notice": "Notice to Residents",
  },
};

const SECTION_LABELS: Record<string, { heading: string; viewAll: string; fallbackBadge: string }> = {
  he: { heading: "חדשות ועדכונים", viewAll: "לכל החדשות", fallbackBadge: "ידיעה" },
  ar: { heading: "أخبار وتحديثات", viewAll: "لكل الأخبار", fallbackBadge: "خبر" },
  en: { heading: "News & Updates", viewAll: "View all news", fallbackBadge: "News" },
};

const DATE_LOCALE: Record<string, string> = { he: "he-IL", ar: "ar", en: "en-GB" };

const HOMEPAGE_NEWS_LIMIT = 8;

export async function NewsGrid() {
  const [allNews, locale] = await Promise.all([getPublishedNews(), getServerLocale()]);
  const newsItems = allNews.slice(0, HOMEPAGE_NEWS_LIMIT);
  const labels = SECTION_LABELS[locale];

  return (
    <section aria-labelledby="news-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 id="news-heading" className="text-2xl font-bold text-teal-900">
            {labels.heading}
          </h2>
          <span className="mt-3 block h-1 w-14 rounded-full bg-[#175AE2]" aria-hidden="true" />
        </div>
        <Link
          href="/news"
          className="group inline-flex items-center gap-1.5 rounded-full border-2 border-[#175AE2]/25 px-4 py-1.5 text-sm font-semibold text-[#175AE2] transition-colors hover:border-[#175AE2] hover:bg-[#175AE2] hover:text-white"
        >
          {labels.viewAll}
          <ArrowIcon />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {newsItems.map((item) => (
          <NewsCard key={item.slug} item={item} locale={locale} />
        ))}
      </div>
    </section>
  );
}

function NewsCard({ item, locale }: { item: NewsRow; locale: string }) {
  const labels = SECTION_LABELS[locale];
  return (
    <Link
      href={`/news/${item.slug}`}
      style={{ order: item.sortOrder }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden">
        <CardArt item={item} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
        <span className="absolute top-3 right-3 rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#175AE2] shadow-md backdrop-blur-sm">
          {TYPE_LABEL_BY_VARIANT[locale][item.variant] ?? item.variant ?? labels.fallbackBadge}
        </span>
      </div>
      <time
        dateTime={new Date(item.publishedAt).toISOString()}
        dir="rtl"
        className="block px-4 pt-3 text-[11px] font-medium text-ink-400"
      >
        {new Date(item.publishedAt).toLocaleDateString(DATE_LOCALE[locale], { year: "numeric", month: "long", day: "numeric" })}
      </time>
      <div dir="rtl" lang="ar" className="flex flex-1 flex-col gap-2 p-4 pt-2">
        <h3 className="line-clamp-2 text-sm font-bold leading-6 text-teal-900">{item.title}</h3>
        <span className="h-px w-8 bg-black/10" aria-hidden="true" />
        <p className="line-clamp-2 text-xs leading-5 text-ink-600">{item.excerpt}</p>
      </div>
    </Link>
  );
}

function CardArt({ item }: { item: NewsRow }) {
  const src = item.coverUrl || (item.variant === "photo" && item.imageUrl) || FALLBACK_IMAGE_BY_VARIANT[item.variant] || "/images/lobby.jpg";
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
      <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
