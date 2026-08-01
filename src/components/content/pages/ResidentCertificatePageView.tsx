import { IdCard, HelpCircle, ListChecks, ExternalLink } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  subtitle: string;
  intro: string;
  whatIsIt: { title: string; text: string };
  whenNeeded: { title: string; intro: string; items: string[] };
  apply: { title: string; linkPrefix: string; linkLabel: string; note: string };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "אישור תושב – מועצה מקומית כפר יאסיף",
    intro:
      "תושבי כפר יאסיף הזקוקים לאישור תושב לצורך קבלת שירותים, הנחות, הטבות או הצגתו בפני גורמים שונים, יכולים להגיש בקשה באופן מקוון באמצעות הטופס הדיגיטלי של המועצה.",
    whatIsIt: {
      title: "מהו אישור תושב?",
      text: "אישור תושב הוא מסמך רשמי המאשר כי המבקש/ת מתגורר/ת דרך קבע בכפר יאסיף ומהווה תושב/ת היישוב.",
    },
    whenNeeded: {
      title: "מתי נדרש אישור תושב?",
      intro: "האישור עשוי לשמש למגוון מטרות, ובהן:",
      items: [
        "קבלת הנחות והטבות בארנונה.",
        "רישום למוסדות חינוך, חוגים ופעילויות קהילתיות.",
        "הצגת כתובת מגורים בפני רשויות וגופים ציבוריים.",
        "הגשת בקשות למענקים, מלגות והטבות שונות.",
        "כל צורך מנהלי או רשמי המחייב הוכחת תושבות.",
      ],
    },
    apply: {
      title: "הגשת בקשה מקוונת",
      linkPrefix: "להגשת בקשה לאישור תושב,",
      linkLabel: "לחצו כאן",
      note: "לאחר מילוי הטופס והשלמת הפרטים הנדרשים, הבקשה תועבר לטיפול המועצה.",
    },
  },
  ar: {
    subtitle: "شهادة إقامة – المجلس المحلي كفر ياسيف",
    intro:
      "بإمكان سكان كفر ياسيف الذين يحتاجون إلى شهادة إقامة للحصول على خدمات أو حسومات أو مزايا، أو لتقديمها لجهات مختلفة، تقديم طلب عبر الإنترنت من خلال النموذج الرقمي الخاص بالمجلس.",
    whatIsIt: {
      title: "ما هي شهادة الإقامة؟",
      text: "شهادة الإقامة هي وثيقة رسمية تؤكد أن مقدّم/ة الطلب يقيم/تقيم بشكل دائم في كفر ياسيف ويُعتبر/تُعتبر من سكان البلدة.",
    },
    whenNeeded: {
      title: "متى تُطلب شهادة الإقامة؟",
      intro: "قد تُستخدم الشهادة لأغراض متعددة، من بينها:",
      items: [
        "الحصول على حسومات ومزايا في ضريبة الأملاك (الأرنونا).",
        "التسجيل في المؤسسات التعليمية والأندية والأنشطة المجتمعية.",
        "إثبات عنوان السكن أمام السلطات والجهات العامة.",
        "تقديم طلبات للحصول على منح ومساعدات ومزايا مختلفة.",
        "أي حاجة إدارية أو رسمية تستوجب إثبات الإقامة.",
      ],
    },
    apply: {
      title: "تقديم طلب عبر الإنترنت",
      linkPrefix: "لتقديم طلب للحصول على شهادة إقامة،",
      linkLabel: "اضغطوا هنا",
      note: "بعد تعبئة النموذج واستكمال البيانات المطلوبة، سيُحال الطلب لمعالجة المجلس.",
    },
  },
  en: {
    subtitle: "Resident Certificate – Kafr Yasif Local Council",
    intro:
      "Residents of Kafr Yasif who need a resident certificate in order to receive services, discounts or benefits, or to present it to various bodies, may submit a request online through the Council's digital form.",
    whatIsIt: {
      title: "What Is a Resident Certificate?",
      text: "A resident certificate is an official document confirming that the applicant permanently resides in Kafr Yasif and is a resident of the town.",
    },
    whenNeeded: {
      title: "When Is a Resident Certificate Required?",
      intro: "The certificate may be used for a variety of purposes, including:",
      items: [
        "Receiving property tax (Arnona) discounts and benefits.",
        "Registration at educational institutions, clubs and community activities.",
        "Presenting a home address to authorities and public bodies.",
        "Submitting applications for grants, scholarships and various benefits.",
        "Any administrative or official need requiring proof of residency.",
      ],
    },
    apply: {
      title: "Submit an Online Request",
      linkPrefix: "To submit a request for a resident certificate,",
      linkLabel: "click here",
      note: "After filling out the form and completing the required details, the request will be forwarded to the Council for processing.",
    },
  },
};

export function ResidentCertificatePageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle}>
        {c.intro}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={HelpCircle} title={c.whatIsIt.title}>
          <p className="text-sm leading-6 text-ink-600">{c.whatIsIt.text}</p>
        </NumberedSection>

        <NumberedSection index={2} icon={ListChecks} title={c.whenNeeded.title}>
          <p className="text-sm leading-6 text-ink-600">{c.whenNeeded.intro}</p>
          <BulletList items={c.whenNeeded.items} />
        </NumberedSection>

        <NumberedSection index={3} icon={IdCard} title={c.apply.title}>
          <p className="text-sm leading-6 text-ink-600">
            {c.apply.linkPrefix}{" "}
            <a
              href="https://por310.cityforms.co.il/ApplicationBuilder/eFormRender.html?code=B81D0050568A7C1511EE3206A007F3A0&Process=ProcessResidenceConfirmation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-teal-700 hover:underline"
            >
              <ExternalLink size={13} aria-hidden="true" />
              {c.apply.linkLabel}
            </a>
            .
          </p>
          <p className="pt-2 text-xs leading-5 text-ink-600">*{c.apply.note}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
