import { PageArticle, Breadcrumb, Hero } from "../premium/Shared";
import { PublicInquiryForm } from "../PublicInquiryForm";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

const CONTENT: Record<Locale, { intro: string }> = {
  he: {
    intro:
      "נשמח לעמוד לשירותכם! המועצה המקומית כפר יאסיף מחויבת לשירות קשוב, יעיל ושקוף. כדי שנוכל לטפל בפנייתכם או בתלונתכם בצורה הטובה ביותר, אנא מלאו את הטופס הקצר ואנו נבדוק את הנושא בהקדם.",
  },
  ar: {
    intro:
      "يسعدنا خدمتكم! المجلس المحلي كفر ياسيف ملتزم بتقديم خدمة تتسم بالإنصات والفعالية والشفافية. حتى نتمكن من معالجة طلبكم أو شكواكم بأفضل شكل ممكن، يرجى تعبئة النموذج القصير وسنقوم بفحص الموضوع في أقرب وقت ممكن.",
  },
  en: {
    intro:
      "We are happy to serve you! The Kafr Yasif Local Council is committed to attentive, efficient and transparent service. To help us address your request or complaint in the best possible way, please fill out the short form below and we will look into the matter as soon as possible.",
  },
};

export function PublicComplaintsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.intro}</Hero>

      <PublicInquiryForm />
    </PageArticle>
  );
}
