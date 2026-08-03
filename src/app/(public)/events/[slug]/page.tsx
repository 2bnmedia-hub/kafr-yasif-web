import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Phone, User, ExternalLink, CheckCircle2 } from "lucide-react";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { events } from "@/db/schema";
import { getEventBySlug, getEventGallery } from "@/db/queries";
import { getServerLocale } from "@/i18n/get-locale";
import { PageArticle, Breadcrumb, Hero, SectionCard } from "@/components/content/premium/Shared";
import { ImageLightboxGrid } from "@/components/content/ImageLightboxGrid";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kafr-yasif-web.vercel.app";

const LABELS: Record<string, Record<string, string>> = {
  he: { date: "תאריך האירוע", time: "שעה", location: "מקום האירוע", contact: "איש קשר", open: "פתוח לקהל", closed: "לא פתוח לקהל הרחב", registrationRequired: "נדרשת הרשמה מראש", register: "הרשמה", gallery: "תמונות מהאירוע" },
  ar: { date: "تاريخ الفعالية", time: "الوقت", location: "مكان الفعالية", contact: "جهة الاتصال", open: "مفتوح للجمهور", closed: "غير مفتوح للجمهور العام", registrationRequired: "التسجيل المسبق مطلوب", register: "التسجيل", gallery: "صور من الفعالية" },
  en: { date: "Event date", time: "Time", location: "Location", contact: "Contact", open: "Open to the public", closed: "Not open to the general public", registrationRequired: "Advance registration required", register: "Register", gallery: "Event photos" },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(decodeURIComponent(slug));
  if (!event) return {};
  return {
    title: event.metaTitle || event.title,
    description: event.metaDescription || event.description || undefined,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: event.metaTitle || event.title,
      description: event.metaDescription || event.description || undefined,
      images: event.ogImageUrl ? [event.ogImageUrl] : undefined,
    },
  };
}

function fmtDate(d: Date | null, locale: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(locale === "en" ? "en-GB" : locale === "ar" ? "ar" : "he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(decodeURIComponent(slug));
  if (!event || (event.status !== "published" && event.status !== "scheduled")) notFound();
  if (event.status === "published") {
    await db.update(events).set({ viewCount: sql`${events.viewCount} + 1` }).where(eq(events.id, event.id));
  }

  const [gallery, locale] = await Promise.all([getEventGallery(event.id), getServerLocale()]);
  const l = LABELS[locale];

  const displayTitle = (locale === "ar" ? event.titleAr : locale === "en" ? event.titleEn : event.title) || event.title;
  const displayDescription = (locale === "ar" ? event.descriptionAr : locale === "en" ? event.descriptionEn : event.description) || event.description;
  const displayBody = (locale === "ar" ? event.bodyHtmlAr : locale === "en" ? event.bodyHtmlEn : event.bodyHtml) || event.bodyHtml;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: displayTitle,
    description: displayDescription || undefined,
    startDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 10) : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: event.location
      ? { "@type": "Place", name: event.location, address: event.address || undefined }
      : undefined,
    organizer: { "@type": "Organization", name: "מועצה מקומית כפר יאסיף", url: siteUrl },
  };

  const nonce = (await headers()).get("x-nonce");
  return (
    <PageArticle>
      <script type="application/ld+json" nonce={nonce ?? undefined} dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb title={displayTitle} />

      <Hero title={displayTitle}>{displayDescription}</Hero>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SectionCard>
          <div className="space-y-2 text-sm text-ink-600">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="shrink-0 text-teal-700" aria-hidden="true" />
              {l.date}: {fmtDate(event.eventDate, locale)}
            </span>
            {(event.startTime || event.endTime) && (
              <span className="flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-teal-700" aria-hidden="true" />
                {l.time}: {event.startTime}
                {event.endTime && ` – ${event.endTime}`}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-2">
                <MapPin size={15} className="shrink-0 text-teal-700" aria-hidden="true" />
                {l.location}: {event.location}
                {event.address && ` (${event.address})`}
              </span>
            )}
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="shrink-0 text-teal-700" aria-hidden="true" />
              {event.openToPublic ? l.open : l.closed}
            </span>
          </div>
        </SectionCard>

        {(event.contactName || event.contactPhone || event.registrationRequired) && (
          <SectionCard>
            <div className="space-y-2 text-sm text-ink-600">
              {event.contactName && (
                <span className="flex items-center gap-2">
                  <User size={15} className="shrink-0 text-teal-700" aria-hidden="true" />
                  {l.contact}: {event.contactName}
                </span>
              )}
              {event.contactPhone && (
                <a href={`tel:${event.contactPhone}`} className="flex items-center gap-2 hover:text-teal-700 hover:underline">
                  <Phone size={15} className="shrink-0 text-teal-700" aria-hidden="true" />
                  {event.contactPhone}
                </a>
              )}
              {event.registrationRequired && (
                <div className="pt-2">
                  <p className="mb-2 flex items-center gap-2 font-medium text-gold-700">{l.registrationRequired}</p>
                  {event.registrationText && <p className="mb-2 text-xs">{event.registrationText}</p>}
                  {event.registrationUrl && (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-teal-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      {l.register}
                    </a>
                  )}
                </div>
              )}
            </div>
          </SectionCard>
        )}
      </div>

      {displayBody && (
        <SectionCard className="mb-6">
          <div className="rte-render" dangerouslySetInnerHTML={{ __html: displayBody }} />
        </SectionCard>
      )}

      {gallery.length > 0 && (
        <SectionCard>
          <h2 className="mb-4 text-sm font-bold text-teal-900">{l.gallery}</h2>
          <ImageLightboxGrid images={gallery.map((g) => ({ url: g.media.url, alt: g.image.alt }))} />
        </SectionCard>
      )}
    </PageArticle>
  );
}
