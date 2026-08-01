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
      "תושבות ותושבים יקרים, המועצה המקומית פועלת לשיפור מתמיד של איכות החיים והשירות ביישוב. מצאתם מפגע? נתקלתם בבעיה? אנחנו כאן כדי להקשיב ולטפל. כדי שנוכל לבדוק את פנייתכם בצורה היעילה ביותר, אנא מלאו את פרטי הטופס שלהלן ונציג מטעמנו יחזור אליכם בהקדם.",
  },
  ar: {
    intro:
      "أيها السكان الأعزاء، يعمل المجلس المحلي على التحسين المستمر لجودة الحياة والخدمة في البلدة. هل وجدتم مصدر إزعاج؟ هل واجهتم مشكلة؟ نحن هنا للإصغاء والمعالجة. حتى نتمكن من فحص طلبكم بأكثر الطرق فعالية، يرجى تعبئة بيانات النموذج أدناه وسيعاود أحد ممثلينا الاتصال بكم في أقرب وقت ممكن.",
  },
  en: {
    intro:
      "Dear residents, the Local Council works to continuously improve quality of life and service in the town. Have you found a hazard? Encountered a problem? We are here to listen and take action. To help us review your inquiry as efficiently as possible, please fill out the form details below and one of our representatives will get back to you as soon as possible.",
  },
};

export function PublicInquiriesPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.intro}</Hero>

      <PublicInquiryForm />
    </PageArticle>
  );
}
