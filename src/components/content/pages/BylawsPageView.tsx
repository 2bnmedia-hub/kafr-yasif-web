import { PageArticle, Breadcrumb, Hero, SectionCard, DocumentList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  heroText: string;
  documents: { title: string; href: string }[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroText:
      "חוקי העזר הם תקנות מקומיות שמוציאה המועצה המקומית כפר יאסיף מכוח סמכותה החוקית. הם מסדירים נושאים כגון פרסום, תברואה, סלילת דרכים ועוד — ומחייבים את כלל התושבים והעסקים בתחום המועצה.",
    documents: [
      { title: "חוק עזר סלילת רחובות - כפר יאסיף", href: "/documents/chok-ezer-slilat-rechovot.pdf" },
      { title: "חוק עזר פסולת עודפת קובץ התקנות", href: "/documents/chok-ezer-psolet-odefet.pdf" },
      { title: "חוק עזר פרסום מודעות ושלטים - כפר יאסיף", href: "/documents/chok-ezer-pirsum-modaot.pdf" },
      { title: "חוק עזר תיעול - כפר יאסיף", href: "/documents/chok-ezer-tiul.pdf" },
    ],
  },
  ar: {
    heroText:
      "اللوائح البلدية هي تشريعات محلية يصدرها المجلس المحلي كفر ياسيف بموجب صلاحياته القانونية. وهي تنظّم مواضيع مثل الإعلانات والصحة العامة ورصف الطرق وغيرها — وتُلزم جميع المقيمين والأعمال التجارية في نطاق المجلس.",
    documents: [
      { title: "لائحة رصف الشوارع - كفر ياسيف", href: "/documents/chok-ezer-slilat-rechovot.pdf" },
      { title: "لائحة النفايات الزائدة - ملف الأنظمة", href: "/documents/chok-ezer-psolet-odefet.pdf" },
      { title: "لائحة نشر الإعلانات واللافتات - كفر ياسيف", href: "/documents/chok-ezer-pirsum-modaot.pdf" },
      { title: "لائحة الصرف الصحي - كفر ياسيف", href: "/documents/chok-ezer-tiul.pdf" },
    ],
  },
  en: {
    heroText:
      "Municipal bylaws are local regulations issued by the Kafr Yasif Local Council under its statutory authority. They govern matters such as advertising, sanitation, road paving and more — and are binding on all residents and businesses within the Council's jurisdiction.",
    documents: [
      { title: "Street Paving Bylaw - Kafr Yasif", href: "/documents/chok-ezer-slilat-rechovot.pdf" },
      { title: "Excess Waste Bylaw - Regulations File", href: "/documents/chok-ezer-psolet-odefet.pdf" },
      { title: "Advertisements and Signage Bylaw - Kafr Yasif", href: "/documents/chok-ezer-pirsum-modaot.pdf" },
      { title: "Drainage Bylaw - Kafr Yasif", href: "/documents/chok-ezer-tiul.pdf" },
    ],
  },
};

export function BylawsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.heroText}</Hero>

      <SectionCard>
        <DocumentList items={c.documents} locale={locale} />
      </SectionCard>
    </PageArticle>
  );
}
