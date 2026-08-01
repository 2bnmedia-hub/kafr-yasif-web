"use client";

import { useEffect, useMemo, useState } from "react";
import { Megaphone, Pause, Play, ChevronUp, ChevronDown, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export type TickerItem = {
  id: number;
  text: string;
  href: string | null;
  createdAt: string | Date;
};

const PAGE_SIZE = 2;
const ROTATE_MS = 6000;

const DATE_LOCALE: Record<Locale, string> = { he: "he-IL", ar: "ar", en: "en-GB" };

function relativeLabel(date: Date, locale: Locale) {
  const dict = getDictionary(locale);
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return dict.ticker.today;
  if (days === 1) return dict.ticker.yesterday;
  return dict.ticker.daysAgo(days);
}

export function TickerCarousel({ items, locale }: { items: TickerItem[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const dir = locale === "en" ? "ltr" : "rtl";

  const pages = useMemo(() => {
    const chunks: TickerItem[][] = [];
    for (let i = 0; i < items.length; i += PAGE_SIZE) chunks.push(items.slice(i, i + PAGE_SIZE));
    return chunks;
  }, [items]);

  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (paused || pages.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, pages.length]);

  if (dismissed || pages.length === 0) return null;

  const current = pages[Math.min(page, pages.length - 1)];

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div
        dir={dir}
        className="relative overflow-hidden rounded-2xl px-5 py-4 shadow-[0_10px_30px_rgba(12,35,70,0.18)] sm:px-7 sm:py-5"
        style={{ background: "linear-gradient(135deg, #12323d 0%, #1e5266 100%)" }}
      >
        {/* recently-added badge */}
        <div className="absolute end-5 top-4 hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-teal-100 ring-1 ring-white/15 sm:flex">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-gold-500" aria-hidden="true" />
          {dict.ticker.recentlyAdded}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* controls cluster */}
          <div className="flex shrink-0 flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label={dict.ticker.dismiss}
              className="flex h-6 w-6 items-center justify-center rounded-full text-teal-100/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={13} aria-hidden="true" />
            </button>

            {pages.length > 1 && (
              <span className="text-[11px] font-semibold tabular-nums text-teal-100/80" aria-live="polite">
                {page + 1}/{pages.length}
              </span>
            )}

            {pages.length > 1 && (
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => setPage((p) => (p - 1 + pages.length) % pages.length)}
                  aria-label={dict.ticker.previous}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-teal-100/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ChevronUp size={13} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => (p + 1) % pages.length)}
                  aria-label={dict.ticker.next}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-teal-100/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ChevronDown size={13} aria-hidden="true" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? dict.ticker.play : dict.ticker.pause}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            </button>
          </div>

          {/* divider */}
          <span className="h-12 w-px shrink-0 bg-white/10" aria-hidden="true" />

          {/* announcements */}
          <ul className="min-w-0 flex-1 space-y-2">
            {current.map((item) => {
              const date = new Date(item.createdAt);
              const Row = (
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Megaphone size={12} className="text-gold-500" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-white sm:text-[15px]">{item.text}</span>
                  <span className="hidden shrink-0 items-center gap-2 text-[11px] text-teal-100/70 sm:flex">
                    <span>{relativeLabel(date, locale)}</span>
                    <span className="text-teal-100/40">•</span>
                    <span className="tabular-nums">{date.toLocaleDateString(DATE_LOCALE[locale])}</span>
                  </span>
                </div>
              );
              return (
                <li key={item.id}>
                  {item.href ? (
                    <a href={item.href} className="block rounded-lg transition-opacity hover:opacity-80">
                      {Row}
                    </a>
                  ) : (
                    Row
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
