import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq, lt, and, desc } from "drizzle-orm";
import { PageArticle, Breadcrumb, Hero, SectionCard } from "@/components/content/premium/Shared";
import { getServerLocale } from "@/i18n/get-locale";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ארכיון אירועים",
  description: "אירועים שכבר התקיימו במועצה המקומית כפר יאסיף.",
  alternates: { canonical: "/events/archive" },
};

const LABELS: Record<string, Record<string, string>> = {
  he: { title: "ארכיון אירועים", intro: "אירועים שכבר התקיימו במועצה המקומית כפר יאסיף.", empty: "הארכיון ריק כרגע.", back: "לאירועים הקרובים" },
  ar: { title: "أرشيف الفعاليات", intro: "فعاليات سابقة أقيمت في المجلس المحلي كفر ياسيف.", empty: "الأرشيف فارغ حالياً.", back: "إلى الفعاليات القادمة" },
  en: { title: "Events Archive", intro: "Past events held at Kafr Yasif Local Council.", empty: "The archive is currently empty.", back: "To upcoming events" },
};

function fmtDate(d: Date | null, locale: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(locale === "en" ? "en-GB" : locale === "ar" ? "ar" : "he-IL");
}

export default async function EventsArchivePage() {
  const now = new Date();
  const [rows, locale] = await Promise.all([
    db
      .select()
      .from(events)
      .where(and(eq(events.status, "published"), lt(events.eventDate, now)))
      .orderBy(desc(events.eventDate)),
    getServerLocale(),
  ]);
  const l = LABELS[locale];

  return (
    <PageArticle>
      <Breadcrumb title={l.title} />
      <Hero title={l.title}>{l.intro}</Hero>

      <div className="mb-4 flex justify-end">
        <Link href="/events" className="text-sm font-medium text-teal-700 hover:underline">
          {l.back}
        </Link>
      </div>

      {rows.length === 0 ? (
        <SectionCard>
          <p className="text-center text-sm text-ink-600">{l.empty}</p>
        </SectionCard>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rows.map((e) => {
            const displayTitle = (locale === "ar" ? e.titleAr : locale === "en" ? e.titleEn : e.title) || e.title;
            return (
              <Link key={e.id} href={e.slug ? `/events/${e.slug}` : "#"} className="block">
                <SectionCard className="h-full opacity-80 transition-shadow hover:opacity-100 hover:shadow-md">
                  <h2 className="mb-2 text-base font-bold text-teal-900">{displayTitle}</h2>
                  <div className="space-y-1.5 text-sm text-ink-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
                      {fmtDate(e.eventDate, locale)}
                    </span>
                    {e.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
                        {e.location}
                      </span>
                    )}
                  </div>
                </SectionCard>
              </Link>
            );
          })}
        </div>
      )}
    </PageArticle>
  );
}
