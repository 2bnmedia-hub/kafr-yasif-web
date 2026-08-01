export type ConsentCategory = "necessary" | "analytics" | "functional" | "marketing";

export type ConsentState = Record<ConsentCategory, boolean>;

// Bumped again to v3 after the two-row layout / logo-removal pass, so anyone who already
// decided under v1 or v2 sees the current banner once — old keys are simply orphaned, never
// read or deleted.
export const CONSENT_STORAGE_KEY = "kafr-yasif-cookie-consent-v3";

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};

// Cache the last-parsed result keyed by the raw string, so readStoredConsent() returns a
// referentially-stable object when the underlying value hasn't changed. Required by
// useSyncExternalStore, which re-renders whenever getSnapshot() returns a new reference.
let lastRaw: string | null | undefined;
let lastParsed: ConsentState | null = null;

export function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (raw === lastRaw) return lastParsed;

  lastRaw = raw;
  if (!raw) {
    lastParsed = null;
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    lastParsed = { ...DEFAULT_CONSENT, ...parsed, necessary: true };
  } catch {
    lastParsed = null;
  }
  return lastParsed;
}

export function writeStoredConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ ...state, necessary: true }));
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: state }));
}

/** Use this before loading any analytics/marketing script (e.g. GA, Meta Pixel, GTM) — returns
 *  false until the visitor has explicitly granted that category. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const stored = readStoredConsent();
  return stored?.[category] ?? false;
}
