"use client";

import { useCookieConsent } from "./CookieConsentProvider";
import { useLocale } from "@/i18n/LocaleProvider";

export function CookieSettingsTrigger() {
  const { openSettings } = useCookieConsent();
  const { dict } = useLocale();

  return (
    <button type="button" onClick={openSettings} className="font-medium underline hover:text-teal-700">
      {dict.cookies.reopenLink}
    </button>
  );
}
