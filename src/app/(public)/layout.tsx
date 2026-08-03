import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getServerLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/dictionary";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { AccessibilityWidget } from "@/components/layout/AccessibilityWidget";
import { VisitTracker } from "@/components/layout/VisitTracker";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const nonce = (await headers()).get("x-nonce");

  return (
    <LocaleProvider initialLocale={locale}>
      <CookieConsentProvider nonce={nonce}>
        <a href="#main-content" className="skip-link">
          {dict.header.skipToContent}
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <AccessibilityWidget />
        <VisitTracker />
      </CookieConsentProvider>
    </LocaleProvider>
  );
}
