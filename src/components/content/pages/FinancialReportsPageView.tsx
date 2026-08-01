import { PageArticle, Breadcrumb, Hero, SectionCard, DocumentList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

const CONTENT: Record<Locale, { intro: string; reports: { title: string; href: string }[] }> = {
  he: {
    intro:
      "המועצה המקומית כפר יאסיף פועלת בשקיפות מלאה ומפרסמת את דוחותיה הכספיים לציבור. ניתן לצפות בדוחות ולהורידם ישירות מהאתר.",
    reports: [
      { title: "דוחות כספיים שנת 2024 - תמצית", href: "/documents/dochot-kaspiim-2024.pdf" },
      { title: "דוחות כספיים שנת 2023 - תמצית", href: "/documents/dochot-kaspiim-2023.pdf" },
    ],
  },
  ar: {
    intro:
      "يعمل المجلس المحلي كفر ياسيف بشفافية كاملة وينشر تقاريره المالية للجمهور. يمكنكم الاطلاع على التقارير وتحميلها مباشرة من الموقع.",
    reports: [
      { title: "التقارير المالية لعام 2024 - ملخص", href: "/documents/dochot-kaspiim-2024.pdf" },
      { title: "التقارير المالية لعام 2023 - ملخص", href: "/documents/dochot-kaspiim-2023.pdf" },
    ],
  },
  en: {
    intro:
      "The Kafr Yasif Local Council operates with full transparency and publishes its financial reports to the public. Reports can be viewed and downloaded directly from the website.",
    reports: [
      { title: "2024 Financial Reports - Summary", href: "/documents/dochot-kaspiim-2024.pdf" },
      { title: "2023 Financial Reports - Summary", href: "/documents/dochot-kaspiim-2023.pdf" },
    ],
  },
};

export function FinancialReportsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.intro}</Hero>

      <SectionCard>
        <DocumentList items={c.reports} locale={locale} />
      </SectionCard>
    </PageArticle>
  );
}
