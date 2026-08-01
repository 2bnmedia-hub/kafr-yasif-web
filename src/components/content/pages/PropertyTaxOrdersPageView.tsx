import { PageArticle, Breadcrumb, Hero, SectionCard, DocumentList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  intro: string;
  orders: { title: string; href: string }[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    intro:
      "צו הארנונה קובע את תעריפי הארנונה הכללית החלים על נכסים בתחום המועצה המקומית כפר יאסיף. הצו מתפרסם מדי שנה לאחר אישור משרד הפנים ומשרד האוצר.",
    orders: [
      { title: "צו ארנונה שנת 2026 - מ.מ.כפר יאסיף", href: "/documents/tzav-arnona-2026.pdf" },
      { title: "צו ארנונה שנת 2025 - מ.מ.כפר יאסיף", href: "/documents/tzav-arnona-2025.pdf" },
      { title: "צו ארנונה שנת 2024 - מ.מ.כפר יאסיף", href: "/documents/tzav-arnona-2024.pdf" },
      { title: "צו ארנונה שנת 2023 - מ.מ.כפר יאסיף", href: "/documents/tzav-arnona-2023.pdf" },
    ],
  },
  ar: {
    intro:
      "يحدد أمر ضريبة الأملاك (الأرنونا) تعريفات الضريبة العامة السارية على الأملاك ضمن نطاق المجلس المحلي كفر ياسيف. يُنشر الأمر سنوياً بعد مصادقة وزارة الداخلية ووزارة المالية.",
    orders: [
      { title: "أمر ضريبة الأملاك (الأرنونا) لسنة 2026 - المجلس المحلي كفر ياسيف", href: "/documents/tzav-arnona-2026.pdf" },
      { title: "أمر ضريبة الأملاك (الأرنونا) لسنة 2025 - المجلس المحلي كفر ياسيف", href: "/documents/tzav-arnona-2025.pdf" },
      { title: "أمر ضريبة الأملاك (الأرنونا) لسنة 2024 - المجلس المحلي كفر ياسيف", href: "/documents/tzav-arnona-2024.pdf" },
      { title: "أمر ضريبة الأملاك (الأرنونا) لسنة 2023 - المجلس المحلي كفر ياسيف", href: "/documents/tzav-arnona-2023.pdf" },
    ],
  },
  en: {
    intro:
      "The Property Tax Order sets the general property tax (Arnona) rates applicable to properties within the jurisdiction of the Kafr Yasif Local Council. The order is published annually following approval by the Ministry of Interior and the Ministry of Finance.",
    orders: [
      { title: "Property Tax Order 2026 - Kafr Yasif Local Council", href: "/documents/tzav-arnona-2026.pdf" },
      { title: "Property Tax Order 2025 - Kafr Yasif Local Council", href: "/documents/tzav-arnona-2025.pdf" },
      { title: "Property Tax Order 2024 - Kafr Yasif Local Council", href: "/documents/tzav-arnona-2024.pdf" },
      { title: "Property Tax Order 2023 - Kafr Yasif Local Council", href: "/documents/tzav-arnona-2023.pdf" },
    ],
  },
};

export function PropertyTaxOrdersPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.intro}</Hero>

      <SectionCard>
        <DocumentList items={c.orders} locale={locale} />
      </SectionCard>
    </PageArticle>
  );
}
