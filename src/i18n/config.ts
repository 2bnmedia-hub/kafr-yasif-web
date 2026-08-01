export const LOCALES = ["he", "ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "he";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_DIR: Record<Locale, "rtl" | "ltr"> = {
  he: "rtl",
  ar: "rtl",
  en: "ltr",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  he: "עברית",
  ar: "العربية",
  en: "English",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
