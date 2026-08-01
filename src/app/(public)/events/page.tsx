import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq, gte, and, or, isNull, lte, asc } from "drizzle-orm";
import { PageArticle, Breadcrumb, Hero, SectionCard } from "@/components/content/premium/Shared";
import { getServerLocale } from "@/i18n/get-locale";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "אירועים בכפר",
  description: "לוח האירועים הקרובים במועצה המקומית כפר יאסיף.",
  alternates: { canonical: "/events" },
};

const LABELS: Record<string, Record<string, string>> = {
  he: { title: "אירועים בכפר", intro: "לוח האירועים הקרובים במועצה המקומית כפר יאסיף.", archive: "ארכיון אירועים שעברו", empty: "אין כרגע אירועים קרובים.", open: "פתוח לקהל", registration: "נדרשת הרשמה מראש" },
  ar: { title: "فعاليات القرية", intro: "جدول الفعاليات القادمة في المجلس المحلي كفر ياسيف.", archive: "أرشيف الفعاليات السابقة", empty: "لا توجد فعاليات قادمة حالياً.", open: "مفتوح للجمهور", registration: "التسجيل المسبق مطلوب" },
  en: { title: "Village Events", intro: "Upcoming events at Kafr Yasif Local Council.", archive: "Past events archive", empty: "No upcoming events at the moment.", open: "Open to the public", registration: "Advance registration required" },
};

function fmtDate(d: Date | null, locale: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(locale === "en" ? "en-GB" : locale === "ar" ? "ar" : "he-IL");
}

export default async function EventsListPage() {
  const now = new Date();
  const [rows, locale] = await Promise.all([
    db
      .select()
      .from(events)
      .where(and(eq(events.status, "published"), or(isNull(events.eventDate), gte(events.eventDate, now)), or(isNull(events.scheduledAt), lte(events.scheduledAt, now))))
      .orderBy(asc(events.eventDate)),
    getServerLocale(),
  ]);
  const l = LABELS[locale];

  return (
    <PageArticle>
      <Breadcrumb title={l.title} />
      <Hero title={l.title}>{l.intro}</Hero>

      <div className="mb-4 flex justify-end">
        <Link href="/events/archive" className="text-sm font-medium text-teal-700 hover:underline">
          {l.archive}
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
                <SectionCard className="h-full transition-shadow hover:shadow-md">
                  <h2 className="mb-2 text-base font-bold text-teal-900">{displayTitle}</h2>
                  <div className="space-y-1.5 text-sm text-ink-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
                      {fmtDate(e.eventDate, locale)} {e.startTime && `· ${e.startTime}`}
                    </span>
                    {e.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
                        {e.location}
                      </span>
                    )}
                    {e.registrationRequired && (
                      <span className="flex items-center gap-1.5 text-gold-700">
                        <Users size={14} className="shrink-0" aria-hidden="true" />
                        {l.registration}
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
