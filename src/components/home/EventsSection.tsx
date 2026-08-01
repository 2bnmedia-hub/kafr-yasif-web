import Image from "next/image";
import { getPublishedEvents } from "@/db/queries";
import { getServerLocale } from "@/i18n/get-locale";
import type { Locale } from "@/i18n/config";

type EventRow = Awaited<ReturnType<typeof getPublishedEvents>>[number];

const LABELS: Record<Locale, { heading: string; until: string }> = {
  he: { heading: "אירועים בכפר", until: "עד" },
  ar: { heading: "فعاليات في القرية", until: "حتى" },
  en: { heading: "Village Events", until: "Until" },
};

export async function EventsSection() {
  const [events, locale] = await Promise.all([getPublishedEvents(), getServerLocale()]);
  const l = LABELS[locale];

  return (
    <section aria-labelledby="events-heading" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 id="events-heading" className="text-2xl font-bold text-teal-900">
            {l.heading}
          </h2>
          <span className="mx-auto mt-3 block h-1 w-14 rounded-full bg-[#175AE2]" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {events.map((event) => {
            const title = (locale === "ar" ? event.titleAr : locale === "en" ? event.titleEn : event.title) || event.title;
            const subtitle =
              (locale === "ar" ? event.subtitleAr : locale === "en" ? event.subtitleEn : event.subtitle) || event.subtitle;
            return (
              <div
                key={event.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={event.coverUrl || eventImage(event.title)}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
                  <div className="absolute top-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 text-center shadow-md backdrop-blur-sm">
                    <div className="text-sm font-bold leading-none text-[#175AE2]">{event.endDate}</div>
                    <div className="mt-0.5 text-[10px] font-medium leading-none text-ink-600">
                      {l.until} {event.startDate}
                    </div>
                  </div>
                </div>
                <div className="px-5 py-5 text-center">
                  <div className="text-lg font-bold text-teal-900">{title}</div>
                  <div className="mt-1 text-xs font-medium tracking-wide text-ink-600">{subtitle}</div>
                  <div className="mx-auto mt-3 h-px w-10 bg-black/10" aria-hidden="true" />
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#175AE2]/8 px-3 py-1 text-xs font-semibold text-[#175AE2]">
                    <CalendarCheckIcon />
                    {event.note}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CalendarCheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m8.5 14.5 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function eventImage(title: EventRow["title"]) {
  if (title.includes("ספר")) return "/images/event-book-festival.jpg";
  if (title.includes("איכר")) return "/images/event-farmers-market.jpg";
  return "/images/event-christmas-market.jpg";
}
