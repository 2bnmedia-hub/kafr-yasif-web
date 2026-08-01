import { PageArticle, Breadcrumb, Hero, SectionCard, DocumentList } from "../premium/Shared";
import type { DocumentItem } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  heroIntro: string;
  reports: DocumentItem[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroIntro:
      "חוקי ההסדרים הם חוקים שמתקבלים על ידי הכנסת מדי שנה ומשפיעים ישירות על פעילות הרשויות המקומיות לרבות תקציבים, אגרות ומדיניות. להלן הגרסאות הרשמיות לעיון הציבור.",
    reports: [
      { title: "חוקי הסדרים 2025", href: "/documents/chukey-hesderim-2025.pdf" },
      { title: "חוקי הסדרים 2024", href: "/documents/chukey-hesderim-2024.pdf" },
    ],
  },
  ar: {
    heroIntro:
      "قوانين التسويات هي قوانين يقرّها الكنيست سنوياً وتؤثر بشكل مباشر على عمل السلطات المحلية، بما في ذلك الميزانيات والرسوم والسياسات. فيما يلي النسخ الرسمية لاطلاع الجمهور.",
    reports: [
      { title: "قوانين التسويات 2025", href: "/documents/chukey-hesderim-2025.pdf" },
      { title: "قوانين التسويات 2024", href: "/documents/chukey-hesderim-2024.pdf" },
    ],
  },
  en: {
    heroIntro:
      "The Arrangements Laws are laws passed by the Knesset each year that directly affect the operation of local authorities, including budgets, fees and policy. Below are the official versions for public review.",
    reports: [
      { title: "Arrangements Laws 2025", href: "/documents/chukey-hesderim-2025.pdf" },
      { title: "Arrangements Laws 2024", href: "/documents/chukey-hesderim-2024.pdf" },
    ],
  },
};

export function GovernmentReportsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.heroIntro}</Hero>

      <SectionCard>
        <DocumentList items={c.reports} locale={locale} />
      </SectionCard>
    </PageArticle>
  );
}
