"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Pause, Play } from "lucide-react";
import { quickTags, searchQuickTags } from "@/lib/nav";
import { useLocale } from "@/i18n/LocaleProvider";
import { tNav } from "@/i18n/nav-translations";
import {
  PropertyTaxIcon,
  EducationIcon,
  ResidentCertificateIcon,
  PublicInquiriesIcon,
  PublicComplaintsIcon,
  SecurityEmergencyIcon,
  TendersIcon,
  ServiceCenterIcon,
} from "@/components/icons/QuickTagIcons";

const quickTagIcons = [
  PropertyTaxIcon,
  EducationIcon,
  ResidentCertificateIcon,
  PublicInquiriesIcon,
  PublicComplaintsIcon,
  SecurityEmergencyIcon,
  TendersIcon,
  ServiceCenterIcon,
];

const slides = [
  "/images/hero-slide-1.jpg",
  "/images/hero-slide-2.jpg",
  "/images/hero-slide-3.jpg",
  "/images/hero-slide-4.jpg",
];

const SLIDE_DURATION_MS = 3000;

const SLIDE_COLORS = ["#414446", "#74786F", "#C8925A", "#D8CDB9"];

type SearchResult = { title: string; href: string; type: "page" | "news" };

export function Hero() {
  const { locale, dict } = useLocale();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (trimmedQuery.length < 2) return;
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`)
        .then((r) => r.json())
        .then((data) => setResults(data.results ?? []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timeout);
  }, [trimmedQuery]);

  useEffect(() => {
    if (!searchOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  return (
    <section aria-label={dict.hero.bannerAriaLabel} className="bg-white px-4 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[500px]">
          {slides.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : 1 }}
              aria-hidden={i !== current}
            >
              <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
            </div>
          ))}

          <div className="absolute inset-x-4 top-4 z-20 flex items-center gap-2" aria-label={dict.hero.slidesAriaLabel}>
            <div className="flex flex-1 gap-2">
              {slides.map((src, i) => (
                <div key={src} className="h-1 flex-1 overflow-hidden rounded-full bg-white/35">
                  <div
                    className="h-full"
                    style={{
                      backgroundColor: SLIDE_COLORS[i % SLIDE_COLORS.length],
                      width: i < current ? "100%" : i === current ? "100%" : "0%",
                      transition: i === current && !paused ? `width ${SLIDE_DURATION_MS}ms linear` : "none",
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? dict.hero.play : dict.hero.pause}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            </button>
          </div>

          {/* bottom overlay: caption */}
          <div className="absolute inset-x-0 bottom-0 z-10 pt-24 pb-14">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4">
              <p
                className="flex items-center gap-2.5 rounded-full px-7 py-3 text-center text-lg font-bold text-teal-900 shadow-[0_8px_30px_rgba(12,35,70,0.2)] ring-1 ring-white/40 backdrop-blur-md sm:text-xl"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.5) 100%)" }}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#175AE2]" aria-hidden="true" />
                {dict.hero.caption}
              </p>
            </div>
          </div>
        </div>

        {/* search pill straddling the image / white-section boundary */}
        <div className="relative z-20 mx-auto -mt-8 w-full max-w-2xl px-4 sm:-mt-9">
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            className="group flex w-full items-center justify-between gap-3 rounded-full bg-white/95 py-2 pe-2 ps-6 shadow-[0_14px_40px_rgba(12,35,70,0.22)] ring-1 ring-black/[0.06] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(12,35,70,0.28)]"
          >
            <span className="text-base font-bold text-teal-900 sm:text-lg">{dict.hero.helpCta}</span>
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#175AE2] ring-1 ring-black/[0.04] transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
              style={{ background: "linear-gradient(155deg, #175AE222 0%, #175AE20a 100%)" }}
            >
              <Search size={19} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </button>

          {searchOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setSearchOpen(false)} aria-hidden="true" />
              <div
                dir={locale === "en" ? "ltr" : "rtl"}
                className="absolute inset-x-4 top-full z-30 mt-3 overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(12,35,70,0.3)] ring-1 ring-black/[0.06] animate-[dropIn_0.2s_ease-out]"
              >
                <div className="flex items-center gap-3 border-b border-zinc-100 px-5 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#175AE2]/10 text-[#175AE2]">
                    <Search size={16} aria-hidden="true" />
                  </span>
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (e.target.value.trim().length >= 2) setLoading(true);
                    }}
                    placeholder={dict.search.placeholder}
                    aria-label={dict.search.placeholder}
                    className="flex-1 border-none bg-transparent text-base text-[#0C2346] outline-none placeholder:text-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    aria-label={dict.search.close}
                    className="shrink-0 rounded-full p-2 text-ink-600 transition-colors hover:bg-zinc-100"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto p-3.5">
                  {trimmedQuery.length < 2 ? (
                    <>
                      <p className="mb-2.5 px-1 text-xs font-bold text-ink-600">{dict.hero.shortcuts}</p>
                      <div className="flex flex-wrap gap-2">
                        {searchQuickTags.map((t) => (
                          <Link
                            key={t.href}
                            href={t.href}
                            onClick={() => setSearchOpen(false)}
                            className="rounded-full border border-teal-100 px-4 py-2 text-sm font-medium text-teal-900 transition-colors hover:border-[#175AE2]/30 hover:bg-[#175AE2]/5"
                          >
                            {tNav(t.label, locale)}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : loading ? (
                    <p className="px-2 py-3 text-sm text-ink-600">{dict.search.searching}</p>
                  ) : results.length === 0 ? (
                    <p className="px-2 py-3 text-sm text-ink-600">{dict.search.noResultsFor(query)}</p>
                  ) : (
                    <div className="space-y-1">
                      {results.map((r) => (
                        <Link
                          key={r.href}
                          href={r.href}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between gap-3 rounded-2xl px-3.5 py-3 text-sm text-[#0C2346] transition-colors hover:bg-[#F0F5FF]"
                        >
                          <span className="font-medium">{r.title}</span>
                          <span className="shrink-0 rounded-full bg-[#175AE2]/10 px-2.5 py-1 text-xs font-semibold text-[#175AE2]">
                            {r.type === "news" ? dict.search.news : dict.search.page}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* quick-access tags: flat icon + label row below the hero image */}
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:pt-10">
        <ul className="flex flex-wrap items-start justify-center gap-x-6 gap-y-6 sm:gap-x-10 sm:gap-y-8">
          {quickTags.map((item, i) => {
            const Icon = quickTagIcons[i];
            const linkProps = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <li key={item.href}>
                <Link href={item.href} {...linkProps} className="group flex w-16 flex-col items-center gap-2 text-center sm:w-20">
                  <Icon />
                  <span className="text-xs font-semibold text-ink-900 sm:text-sm">{tNav(item.label, locale)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
