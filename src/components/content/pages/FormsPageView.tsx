import { FileCheck } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, DocumentList } from "../premium/Shared";
import type { DocumentItem } from "../premium/Shared";
import type { Locale } from "@/i18n/config";
import { getPublishedForms } from "@/db/queries";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  heroSubtitle: string;
  heroIntro: string;
  listIntro: string;
  guidelinesTitle: string;
  guidelines: string[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "טפסים - מועצה מקומית כפר יאסיף",
    heroIntro:
      "לנוחות התושבים, רוכזו בעמוד זה טפסים ושירותים מקוונים בתחומי פעילות שונים. הטפסים זמינים לעיון, להורדה ולהגשה, במטרה להקל על קבלת השירות ולייעל את הטיפול בפניות.",
    listIntro: "להלן רשימת הטפסים לפי נושא:",
    guidelinesTitle: "הנחיות להגשת טפסים",
    guidelines: [
      "יש למלא את כל השדות המסומנים ב־✱ (כוכבית).",
      "טפסים שאינם מלאים כנדרש לא יטופלו.",
      "מומלץ לצרף מסמכים תומכים לפי ההנחיות בכל טופס.",
    ],
  },
  ar: {
    heroSubtitle: "نماذج - المجلس المحلي كفر ياسيف",
    heroIntro:
      "لراحة السكان، جُمعت في هذه الصفحة نماذج وخدمات إلكترونية في مجالات عمل مختلفة. النماذج متاحة للاطلاع والتنزيل والتقديم، بهدف تسهيل الحصول على الخدمة وتسريع معالجة الطلبات.",
    listIntro: "فيما يلي قائمة النماذج بحسب الموضوع:",
    guidelinesTitle: "تعليمات لتقديم النماذج",
    guidelines: [
      "يجب تعبئة جميع الحقول المُشار إليها بعلامة ✱ (نجمة).",
      "النماذج غير المُعبأة كما هو مطلوب لن تتم معالجتها.",
      "يُنصح بإرفاق المستندات الداعمة وفق التعليمات الواردة في كل نموذج.",
    ],
  },
  en: {
    heroSubtitle: "Forms - Kafr Yasif Local Council",
    heroIntro:
      "For residents' convenience, this page brings together forms and online services across a range of activities. The forms are available to view, download and submit, making it easier to access services and streamlining the handling of requests.",
    listIntro: "Below is the list of forms by subject:",
    guidelinesTitle: "Guidelines for Submitting Forms",
    guidelines: [
      "All fields marked with an asterisk (✱) must be completed.",
      "Forms that are not filled out as required will not be processed.",
      "It is recommended to attach supporting documents according to the guidelines on each form.",
    ],
  },
};

function formTitle(form: Awaited<ReturnType<typeof getPublishedForms>>[number], locale: Locale) {
  if (locale === "ar") return form.titleAr || form.title;
  if (locale === "en") return form.titleEn || form.title;
  return form.title;
}

export async function FormsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];
  const forms = await getPublishedForms();
  const items: DocumentItem[] = forms.map((f) => ({
    title: formTitle(f, locale),
    href: f.fileUrl ?? f.externalUrl ?? undefined,
  }));

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroIntro}
      </Hero>

      <div className="space-y-4">
        <p className="text-sm text-ink-600">{c.listIntro}</p>

        <DocumentList items={items} locale={locale} />

        <NumberedSection index={1} icon={FileCheck} title={c.guidelinesTitle}>
          <BulletList items={c.guidelines} />
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
