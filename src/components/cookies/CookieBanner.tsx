"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Cookie, Settings2 } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALE_DIR } from "@/i18n/config";

type Props = {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onOpenSettings: () => void;
};

export function CookieBanner({ onAcceptAll, onRejectNonEssential, onOpenSettings }: Props) {
  const { dict, locale } = useLocale();
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    acceptRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
      dir={LOCALE_DIR[locale]}
      className="fixed inset-x-0 bottom-0 z-[80] animate-[dropIn_0.4s_cubic-bezier(0.22,1,0.36,1)] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] bg-white/98 ring-1 ring-teal-900/[0.07] backdrop-blur-xl"
        style={{ boxShadow: "0 -8px 12px rgba(12,35,70,0.05), 0 -28px 60px rgba(12,35,70,0.18)" }}
      >
        {/* official brand accent — teal / gold / olive, echoes the council crest */}
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: "linear-gradient(to left, #1e5266 0%, #d99a3d 50%, #8ec640 100%)" }}
          aria-hidden="true"
        />

        {/* message row */}
        <div className="flex items-start gap-4 px-5 pt-6 pb-5 sm:gap-5 sm:px-7 sm:pt-7">
          <span
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-teal-900/10"
            style={{ background: "linear-gradient(155deg, #e3edec 0%, #fbf7f0 100%)" }}
            aria-hidden="true"
          >
            <Cookie size={22} color="#1e5266" strokeWidth={1.6} />
          </span>

          <div className="min-w-0 flex-1 pt-0.5">
            <h2 id="cookie-banner-title" className="mb-1.5 text-lg font-extrabold tracking-tight text-teal-900 text-balance">
              {dict.cookies.bannerTitle}
            </h2>
            <p id="cookie-banner-text" className="max-w-[58ch] text-[13.5px] leading-6 text-ink-600">
              {dict.cookies.bannerText}{" "}
              <Link
                href="/מדיניות-פרטיות"
                className="font-semibold text-teal-700 underline decoration-teal-700/30 underline-offset-2 hover:text-teal-800 hover:decoration-teal-800/50"
              >
                {dict.cookies.privacyLink}
              </Link>
            </p>
          </div>
        </div>

        {/* action row — separated from the message so the two real decisions read clearly */}
        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-teal-900/[0.06] bg-cream-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center justify-center gap-1.5 self-start rounded-full px-2 py-1.5 text-[13px] font-semibold text-teal-700 underline decoration-teal-700/30 underline-offset-2 transition-colors hover:text-teal-900 hover:decoration-teal-900/40"
          >
            <Settings2 size={14} aria-hidden="true" />
            {dict.cookies.openSettings}
          </button>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onRejectNonEssential}
              className="rounded-full border border-teal-900/15 bg-white px-5 py-2.5 text-sm font-semibold text-teal-900 transition-colors hover:border-teal-900/25 hover:bg-teal-100"
            >
              {dict.cookies.rejectNonEssential}
            </button>
            <button
              ref={acceptRef}
              type="button"
              onClick={onAcceptAll}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: "linear-gradient(155deg, #2c6a76 0%, #1e5266 100%)" }}
            >
              {dict.cookies.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
