"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Accessibility, X, Plus, Minus, Contrast, Link2, PauseCircle, Type, RotateCcw } from "lucide-react";

type A11ySettings = {
  fontScale: number;
  highContrast: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
  readableFont: boolean;
};

const DEFAULT_SETTINGS: A11ySettings = {
  fontScale: 100,
  highContrast: false,
  highlightLinks: false,
  stopAnimations: false,
  readableFont: false,
};

const STORAGE_KEY = "a11y-settings";
const MIN_SCALE = 90;
const MAX_SCALE = 150;

function applySettings(s: A11ySettings) {
  const root = document.documentElement;
  root.style.fontSize = `${s.fontScale}%`;
  root.classList.toggle("a11y-contrast", s.highContrast);
  root.classList.toggle("a11y-highlight-links", s.highlightLinks);
  root.classList.toggle("a11y-stop-animations", s.stopAnimations);
  root.classList.toggle("a11y-readable-font", s.readableFont);
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as A11ySettings;
    } catch {
      // ignore malformed/unavailable storage
    }
    return DEFAULT_SETTINGS;
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    applySettings(settings);
    // Only sync to the DOM on mount from the lazily-read initial state;
    // subsequent changes apply directly inside update().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(next: Partial<A11ySettings>) {
    setSettings((prev) => {
      const merged = { ...prev, ...next };
      applySettings(merged);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // ignore
      }
      return merged;
    });
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
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
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="תפריט נגישות"
        aria-expanded={open}
        aria-haspopup="true"
        className="fixed bottom-24 left-5 z-40 flex items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-105"
        style={{
          background: "linear-gradient(155deg, #1e5266 0%, #12323d 100%)",
          boxShadow: "0 6px 20px rgba(12,35,70,0.35)",
          width: "3.25rem",
          height: "3.25rem",
        }}
      >
        <Accessibility size={26} aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="a11y-widget-title"
          dir="rtl"
          className="fixed bottom-40 left-5 z-40 w-[300px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[24px] bg-white ring-1 ring-teal-900/[0.08] animate-[dropIn_0.25s_cubic-bezier(0.22,1,0.36,1)]"
          style={{ boxShadow: "0 10px 30px rgba(12,35,70,0.12), 0 24px 60px rgba(12,35,70,0.2)" }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{ background: "linear-gradient(to left, #1e5266 0%, #d99a3d 50%, #8ec640 100%)" }}
            aria-hidden="true"
          />

          <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
            <h2 id="a11y-widget-title" className="text-sm font-extrabold tracking-tight text-teal-900">
              נגישות האתר
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="סגירת תפריט נגישות"
              className="rounded-full p-1.5 text-ink-600 transition-colors hover:bg-teal-100 hover:text-teal-900"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-2 px-5 pb-3">
            <div className="flex items-center justify-between gap-3 rounded-xl bg-cream-50/70 px-3.5 py-2.5">
              <span className="flex items-center gap-2 text-xs font-semibold text-ink-900">
                <Type size={15} className="text-teal-700" aria-hidden="true" />
                גודל טקסט
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => update({ fontScale: Math.max(MIN_SCALE, settings.fontScale - 10) })}
                  aria-label="הקטנת טקסט"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-teal-700 ring-1 ring-teal-100 hover:bg-teal-50"
                >
                  <Minus size={13} aria-hidden="true" />
                </button>
                <span className="w-9 text-center text-xs font-semibold text-teal-900">{settings.fontScale}%</span>
                <button
                  type="button"
                  onClick={() => update({ fontScale: Math.min(MAX_SCALE, settings.fontScale + 10) })}
                  aria-label="הגדלת טקסט"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-teal-700 ring-1 ring-teal-100 hover:bg-teal-50"
                >
                  <Plus size={13} aria-hidden="true" />
                </button>
              </div>
            </div>

            <ToggleRow icon={Contrast} label="ניגודיות גבוהה" checked={settings.highContrast} onToggle={() => update({ highContrast: !settings.highContrast })} />
            <ToggleRow icon={Link2} label="הדגשת קישורים" checked={settings.highlightLinks} onToggle={() => update({ highlightLinks: !settings.highlightLinks })} />
            <ToggleRow icon={Type} label="גופן קריא" checked={settings.readableFont} onToggle={() => update({ readableFont: !settings.readableFont })} />
            <ToggleRow icon={PauseCircle} label="עצירת אנימציות" checked={settings.stopAnimations} onToggle={() => update({ stopAnimations: !settings.stopAnimations })} />
          </div>

          <div className="border-t border-teal-900/[0.06] px-5 py-3.5">
            <button
              type="button"
              onClick={() => update(DEFAULT_SETTINGS)}
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-cream-50 py-2 text-xs font-semibold text-ink-700 transition-colors hover:bg-teal-100 hover:text-teal-900"
            >
              <RotateCcw size={13} aria-hidden="true" />
              איפוס הגדרות
            </button>
            <Link href="/הצהרת-נגישות" className="mt-2 block text-center text-[11px] font-medium text-teal-700 hover:underline">
              הצהרת נגישות מלאה
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  checked,
  onToggle,
}: {
  icon: typeof Contrast;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-cream-50/70 px-3.5 py-2.5">
      <span className="flex items-center gap-2 text-xs font-semibold text-ink-900">
        <Icon size={15} className="text-teal-700" aria-hidden="true" />
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onToggle}
        className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors"
        style={{ background: checked ? "#1e5266" : "#d4d4d8" }}
      >
        <span className={`absolute top-0.5 start-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "-translate-x-5" : ""}`} />
      </button>
    </div>
  );
}
