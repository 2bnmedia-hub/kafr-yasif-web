"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALE_DIR } from "@/i18n/config";

type SearchResult = { title: string; href: string; type: "page" | "news" };

export function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, dict } = useLocale();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const trimmedQuery = query.trim();

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim().length >= 2) setLoading(true);
  }

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

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-[#0C2346]/40 px-4 pt-24 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease-out]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={dict.search.openLabel}
        dir={LOCALE_DIR[locale]}
        className="w-full max-w-xl origin-top animate-[dropIn_0.25s_ease-out] overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(12,35,70,0.35)] ring-1 ring-black/[0.06]"
      >
        <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3.5 sm:px-5">
          <SearchGlyph />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={dict.search.placeholder}
            aria-label={dict.search.placeholder}
            className="flex-1 rounded-lg border-none bg-transparent text-base text-[#0C2346] outline-none placeholder:text-zinc-400"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.search.close}
            className="shrink-0 rounded-full p-2 text-ink-600 transition-colors hover:bg-zinc-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2.5">
          {trimmedQuery.length >= 2 && loading && (
            <p className="px-3.5 py-4 text-sm text-ink-600">{dict.search.searching}</p>
          )}

          {trimmedQuery.length >= 2 && !loading && results.length === 0 && (
            <p className="px-3.5 py-4 text-sm text-ink-600">{dict.search.noResultsFor(query)}</p>
          )}

          {trimmedQuery.length >= 2 &&
            !loading &&
            results.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={onClose}
                className="flex items-center justify-between gap-3 rounded-2xl px-3.5 py-3 text-sm text-[#0C2346] transition-colors hover:bg-[#F0F5FF]"
              >
                <span className="font-medium">{r.title}</span>
                <span className="shrink-0 rounded-full bg-[#175AE2]/10 px-2.5 py-1 text-xs font-semibold text-[#175AE2]">
                  {r.type === "news" ? dict.search.news : dict.search.page}
                </span>
              </Link>
            ))}

          {query.trim().length < 2 && (
            <p className="px-3.5 py-4 text-sm text-ink-600">{dict.search.typeToSearch}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchGlyph() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#175AE2]/10 text-[#175AE2]">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}
