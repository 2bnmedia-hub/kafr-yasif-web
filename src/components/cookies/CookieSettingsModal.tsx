"use client";

import { useEffect, useRef, useState } from "react";
import { X, ShieldCheck, BarChart3, SlidersHorizontal, Megaphone, Cookie } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALE_DIR } from "@/i18n/config";
import type { ConsentCategory, ConsentState } from "@/lib/cookie-consent";

type Props = {
  initialConsent: ConsentState;
  onSave: (next: ConsentState) => void;
  onClose: () => void;
};

const TOGGLE_CATEGORIES: ConsentCategory[] = ["necessary", "analytics", "functional", "marketing"];

const CATEGORY_ICON: Record<ConsentCategory, LucideIcon> = {
  necessary: ShieldCheck,
  analytics: BarChart3,
  functional: SlidersHorizontal,
  marketing: Megaphone,
};

const CATEGORY_COLOR: Record<ConsentCategory, string> = {
  necessary: "#1e5266",
  analytics: "#2c6a76",
  functional: "#6ea52f",
  marketing: "#c07f2c",
};

export function CookieSettingsModal({ initialConsent, onSave, onClose }: Props) {
  const { dict, locale } = useLocale();
  const [draft, setDraft] = useState<ConsentState>(initialConsent);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center px-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      style={{ background: "rgba(12,35,70,0.45)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        dir={LOCALE_DIR[locale]}
        className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-teal-900/[0.07] animate-[dropIn_0.3s_cubic-bezier(0.22,1,0.36,1)]"
        style={{ boxShadow: "0 10px 30px rgba(12,35,70,0.1), 0 24px 60px rgba(12,35,70,0.18)" }}
      >
        {/* official brand accent — teal / gold / olive */}
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: "linear-gradient(to left, #1e5266 0%, #d99a3d 50%, #8ec640 100%)" }}
          aria-hidden="true"
        />

        {/* header — fixed, does not scroll with the category list */}
        <div className="flex shrink-0 items-start justify-between gap-4 px-6 pt-7 pb-5">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-teal-900/10"
              style={{ background: "linear-gradient(155deg, #e3edec 0%, #fbf7f0 100%)" }}
              aria-hidden="true"
            >
              <Cookie size={20} color="#1e5266" strokeWidth={1.6} />
            </span>
            <div className="min-w-0 pt-0.5">
              <h2 id="cookie-settings-title" className="text-lg font-extrabold tracking-tight text-teal-900 text-balance">
                {dict.cookies.settingsTitle}
              </h2>
              <p className="mt-1 text-[13px] leading-5 text-ink-600">{dict.cookies.settingsIntro}</p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={dict.common.cancel}
            className="shrink-0 rounded-full p-2 text-ink-600 transition-colors hover:bg-teal-100 hover:text-teal-900"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* category list — the only scrollable region */}
        <div className="min-h-0 flex-1 overflow-y-auto border-t border-teal-900/[0.06] bg-cream-50/40 px-6 py-5">
          <div className="space-y-3">
            {TOGGLE_CATEGORIES.map((cat) => {
              const info = dict.cookies.categories[cat];
              const locked = cat === "necessary";
              const checked = draft[cat];
              const Icon = CATEGORY_ICON[cat];
              const color = CATEGORY_COLOR[cat];
              return (
                <div
                  key={cat}
                  className="rounded-2xl bg-white p-4 ring-1 ring-black/[0.05] transition-shadow hover:ring-black/[0.09]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        style={{ background: `linear-gradient(155deg, ${color}22 0%, ${color}0a 100%)` }}
                        aria-hidden="true"
                      >
                        <Icon size={17} color={color} strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-teal-900">{info.title}</h3>
                        <p className="mt-0.5 text-xs leading-5 text-ink-600">{info.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      aria-label={info.title}
                      disabled={locked}
                      onClick={() => setDraft((prev) => ({ ...prev, [cat]: !prev[cat] }))}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                      }`}
                      style={{ background: checked ? color : "#d4d4d8" }}
                    >
                      <span
                        className={`absolute top-0.5 start-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          checked ? (locale === "en" ? "translate-x-5" : "-translate-x-5") : ""
                        }`}
                      />
                    </button>
                  </div>
                  {locked && (
                    <p className="mt-2 text-[11px] font-medium" style={{ color }}>
                      {dict.cookies.alwaysActive}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* footer — fixed, always reachable regardless of scroll position */}
        <div className="shrink-0 border-t border-teal-900/[0.06] px-6 py-5">
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="w-full rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "linear-gradient(155deg, #2c6a76 0%, #1e5266 100%)" }}
          >
            {dict.cookies.savePreferences}
          </button>
        </div>
      </div>
    </div>
  );
}
