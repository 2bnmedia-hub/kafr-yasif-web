import { ShieldCheck, Search, MessageSquareWarning, Phone } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, DocumentList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };

type LocaleContent = {
  subtitle: string;
  visionTitle: string;
  visionParagraph: string;
  comptrollerTitle: string;
  comptrollerIntro1: string;
  comptrollerIntro2: string;
  comptrollerPoints: BoldPoint[];
  complaintsTitle: string;
  complaintsIntro: string;
  eligibilityHeading: string;
  eligibilityIntro: string;
  eligibilityPoints: BoldPoint[];
  filingHeading: string;
  filingIntro1: string;
  filingIntro2: string;
  filingPoints: BoldPoint[];
  contactTitle: string;
  contactIntro: string;
  managerLabel: string;
  managerName: string;
  officePhoneLabel: string;
  officePhone: string;
  mobileLabel: string;
  mobile: string;
  emailLabel: string;
  email: string;
  hoursLabel: string;
  hoursText: string;
  contactClosing: string;
  formDocument: { title: string; href: string };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "מבקר המועצה והממונה על תלונות הציבור",
    visionTitle: "חזון ומחויבות לשקיפות",
    visionParagraph:
      "מועצה מקומית כפר יאסיף מחויבת לפעול בשקיפות מלאה ולספק מידע נגיש וברור לכלל התושבים. אנו שואפים להבטיח שכל החלטה תתקבל תוך שמירה על סדרי עבודה תקינים, יושרה וטוהר המידות, במטרה לחזק את אמון הציבור במערכת המוניציפלית.",
    comptrollerTitle: "מבקר המועצה",
    comptrollerIntro1:
      "מבקר המועצה הוא תפקיד סטטוטורי שהרשות המקומית נדרשת למנות על פי חוק. סמכויותיו מעוגנות בחקיקה (פקודת המועצות המקומיות).",
    comptrollerIntro2: "תחומי האחריות והסמכויות:",
    comptrollerPoints: [
      {
        bold: "בחינת תקינות:",
        text: "בדיקה האם פעולות הרשות נעשו כדין על ידי הגורמים המוסמכים, תוך שמירה על יעילות, חיסכון וטוהר המידות.",
      },
      {
        bold: "ביקורת פיננסית וניהולית:",
        text: "בחינת תהליכים כספיים, ניהול פרויקטים, ניהול נכסים והתחייבויות המועצה.",
      },
      {
        bold: "גישה למידע:",
        text: "למבקר סמכות לקבל כל מסמך, הסבר או מידע הדרוש לו, כולל גישה ישירה למאגרי המידע הממוחשבים של המועצה.",
      },
      {
        bold: "דיווח לציבור:",
        text: "ממצאי הביקורת מוגשים בדוח שנתי לראש המועצה ולוועדה לענייני ביקורת. לאחר אישור המועצה, הדוחות מפורסמים לעיון הציבור.",
      },
    ],
    complaintsTitle: "הממונה על תלונות הציבור",
    complaintsIntro:
      'הממונה פועל מכוח "חוק הרשויות המקומיות (ממונה על תלונות הציבור), תשס"ח-2008". תפקידו לשמש כתובת ברורה לתושב ולהבטיח שהמועצה נוהגת בהגינות ובתום לב.',
    eligibilityHeading: "מי רשאי להגיש תלונה?",
    eligibilityIntro: "כל אדם רשאי להגיש תלונה על המועצה, מוסדותיה, עובדיה או נושאי משרה בה, ובלבד שמתקיימים התנאים הבאים:",
    eligibilityPoints: [
      { bold: "פגיעה ישירה:", text: "המעשה פוגע במישרין במתלונן או מונע ממנו טובת הנאה." },
      { bold: "עילה חוקית:", text: "המעשה נעשה בניגוד לחוק, ללא סמכות, בניגוד למינהל תקין, או שיש בו אי-צדק בולט." },
      {
        bold: "מיצוי הליכים:",
        text: "הטיפול מותנה בכך שהמתלונן פנה תחילה למחלקות הרלוונטיות במועצה וניסה לפתור את העניין מולן, אך לא נענה או שנענה באופן לא מספק.",
      },
    ],
    filingHeading: "דרך הגשת התלונה",
    filingIntro1: "הגשת התלונה תיעשה בכתב בלבד. ניתן להגיש תלונה שניתנה בעל פה, בתנאי שרישומה נחתם על ידי המתלונן.",
    filingIntro2: "התלונה חייבת לכלול:",
    filingPoints: [
      { bold: "פרטים אישיים:", text: "שם מלא וכתובת מגורים/התקשרות." },
      { bold: "תיאור המקרה:", text: "תיאור מפורט של העניין והמועד המדויק בו אירע." },
      { bold: "חתימה וצרופות:", text: "חתימת המתלונן וכל פרט או מסמך נוסף העשויים לסייע בבירור יעיל של התלונה." },
    ],
    contactTitle: "צור קשר",
    contactIntro: "נשמח לעמוד לשירותכם בשעות הפעילות בתיאום מראש.",
    managerLabel: "מנהל המחלקה:",
    managerName: "אימן פרח",
    officePhoneLabel: "טלפון משרד:",
    officePhone: "04-9569803",
    mobileLabel: "טלפון נייד:",
    mobile: "052-4204136",
    emailLabel: 'דוא"ל:',
    email: "mivaker@kafr-yasif.muni.il",
    hoursLabel: "שעות קבלת קהל:",
    hoursText: "ימים ב'-ה', בין השעות 08:30 – 15:00 (בתיאום מראש).",
    contactClosing: "אנו מזמינים אתכם לשלוח פניות ונתייחס אליהן בכובד ראש ובמענה מקצועי.",
    formDocument: { title: "טופס תלונה ופנייה", href: "/documents/tofes-tluna-panyia.pdf" },
  },
  ar: {
    subtitle: "مراقب المجلس والمسؤول عن شكاوى الجمهور",
    visionTitle: "الرؤية والالتزام بالشفافية",
    visionParagraph:
      "يلتزم المجلس المحلي كفر ياسيف بالعمل بشفافية كاملة وتوفير معلومات واضحة ومتاحة لجميع المقيمين. نسعى إلى ضمان اتخاذ كل قرار في ظل الحفاظ على إجراءات عمل سليمة ونزاهة وطهارة أخلاقية، بهدف تعزيز ثقة الجمهور بالمنظومة البلدية.",
    comptrollerTitle: "مراقب المجلس",
    comptrollerIntro1:
      "مراقب المجلس منصب قانوني تُلزم السلطة المحلية بتعيينه بموجب القانون. صلاحياته منصوص عليها في التشريع (قانون المجالس المحلية).",
    comptrollerIntro2: "مجالات المسؤولية والصلاحيات:",
    comptrollerPoints: [
      {
        bold: "فحص السلامة الإجرائية:",
        text: "التحقق من أن إجراءات السلطة تمت وفق القانون من قبل الجهات المخوّلة، مع الحفاظ على الكفاءة والتوفير والنزاهة.",
      },
      {
        bold: "التدقيق المالي والإداري:",
        text: "فحص العمليات المالية وإدارة المشاريع وإدارة أصول المجلس والتزاماته.",
      },
      {
        bold: "الوصول إلى المعلومات:",
        text: "يملك المراقب صلاحية الحصول على أي مستند أو توضيح أو معلومة يحتاجها، بما في ذلك الوصول المباشر إلى قواعد بيانات المجلس المحوسبة.",
      },
      {
        bold: "التقرير للجمهور:",
        text: "تُقدَّم نتائج التدقيق في تقرير سنوي إلى رئيس المجلس ولجنة شؤون التدقيق. وبعد مصادقة المجلس عليها، تُنشر التقارير لاطلاع الجمهور.",
      },
    ],
    complaintsTitle: "المسؤول عن شكاوى الجمهور",
    complaintsIntro:
      'يعمل المسؤول بموجب "قانون السلطات المحلية (المسؤول عن شكاوى الجمهور)، لسنة 2008". مهمته أن يكون عنواناً واضحاً للمقيم وضمان تصرف المجلس بنزاهة وحسن نية.',
    eligibilityHeading: "من يحق له تقديم شكوى؟",
    eligibilityIntro: "يحق لأي شخص تقديم شكوى بحق المجلس، مؤسساته، موظفيه أو شاغلي المناصب فيه، بشرط توافر الشروط التالية:",
    eligibilityPoints: [
      { bold: "ضرر مباشر:", text: "الفعل يضر بشكل مباشر بمقدّم الشكوى أو يحرمه من منفعة." },
      { bold: "سبب قانوني:", text: "الفعل تم بالمخالفة للقانون، دون صلاحية، بما يخالف الإدارة السليمة، أو ينطوي على ظلم واضح." },
      {
        bold: "استنفاد الإجراءات:",
        text: "يُشترط لمعالجة الشكوى أن يكون مقدّمها قد توجّه أولاً إلى الأقسام المعنية في المجلس وحاول حل الأمر معها، دون أن يتلقَّ رداً أو تلقَّى رداً غير مُرضٍ.",
      },
    ],
    filingHeading: "طريقة تقديم الشكوى",
    filingIntro1: "تُقدَّم الشكوى كتابياً فقط. يمكن تقديم شكوى شفوية بشرط أن يوقّع مقدّمها على تدوينها.",
    filingIntro2: "يجب أن تتضمن الشكوى:",
    filingPoints: [
      { bold: "بيانات شخصية:", text: "الاسم الكامل وعنوان السكن/التواصل." },
      { bold: "وصف الحالة:", text: "وصف مفصل للأمر والتاريخ الدقيق الذي وقع فيه." },
      { bold: "التوقيع والمرفقات:", text: "توقيع مقدّم الشكوى وأي تفاصيل أو مستندات إضافية قد تساعد في توضيح الشكوى بفعالية." },
    ],
    contactTitle: "اتصل بنا",
    contactIntro: "يسرّنا خدمتكم خلال ساعات العمل بالتنسيق المسبق.",
    managerLabel: "مدير القسم:",
    managerName: "אימן פרח",
    officePhoneLabel: "هاتف المكتب:",
    officePhone: "04-9569803",
    mobileLabel: "هاتف جوال:",
    mobile: "052-4204136",
    emailLabel: "البريد الإلكتروني:",
    email: "mivaker@kafr-yasif.muni.il",
    hoursLabel: "ساعات استقبال الجمهور:",
    hoursText: "أيام الاثنين إلى الخميس، من الساعة 08:30 حتى 15:00 (بالتنسيق المسبق).",
    contactClosing: "ندعوكم لإرسال استفساراتكم وسنتعامل معها بجدية وباستجابة مهنية.",
    formDocument: { title: "استمارة شكوى وطلب", href: "/documents/tofes-tluna-panyia.pdf" },
  },
  en: {
    subtitle: "Council Comptroller and Public Complaints Commissioner",
    visionTitle: "Vision and Commitment to Transparency",
    visionParagraph:
      "The Kafr Yasif Local Council is committed to acting with full transparency and providing accessible, clear information to all residents. We strive to ensure that every decision is made while maintaining proper work procedures, integrity and clean conduct, with the aim of strengthening public trust in the municipal system.",
    comptrollerTitle: "Council Comptroller",
    comptrollerIntro1:
      "The Council Comptroller is a statutory position that the local authority is required by law to appoint. Its powers are anchored in legislation (the Local Councils Ordinance).",
    comptrollerIntro2: "Areas of responsibility and authority:",
    comptrollerPoints: [
      {
        bold: "Compliance review:",
        text: "Examining whether the authority's actions were carried out lawfully by the authorized bodies, while maintaining efficiency, economy and integrity.",
      },
      {
        bold: "Financial and managerial audit:",
        text: "Reviewing financial processes, project management, and management of the Council's assets and liabilities.",
      },
      {
        bold: "Access to information:",
        text: "The Comptroller has the authority to obtain any document, explanation or information required, including direct access to the Council's computerized databases.",
      },
      {
        bold: "Reporting to the public:",
        text: "Audit findings are submitted in an annual report to the head of the Council and the Audit Committee. Once approved by the Council, the reports are published for public review.",
      },
    ],
    complaintsTitle: "Public Complaints Commissioner",
    complaintsIntro:
      "The Commissioner operates under the \"Local Authorities Law (Public Complaints Commissioner), 5768-2008.\" Its role is to serve as a clear point of contact for residents and to ensure the Council acts fairly and in good faith.",
    eligibilityHeading: "Who May File a Complaint?",
    eligibilityIntro: "Any person may file a complaint against the Council, its institutions, employees, or officeholders, provided the following conditions are met:",
    eligibilityPoints: [
      { bold: "Direct harm:", text: "The act directly harms the complainant or denies them a benefit." },
      { bold: "Legal grounds:", text: "The act was carried out in violation of the law, without authority, contrary to proper administration, or involves clear injustice." },
      {
        bold: "Exhaustion of remedies:",
        text: "Handling the complaint is conditional on the complainant having first approached the relevant Council departments and attempted to resolve the matter with them, but not receiving a response, or receiving an inadequate one.",
      },
    ],
    filingHeading: "How to File a Complaint",
    filingIntro1: "Complaints must be submitted in writing only. A complaint given verbally may be submitted, provided its record is signed by the complainant.",
    filingIntro2: "The complaint must include:",
    filingPoints: [
      { bold: "Personal details:", text: "Full name and home/contact address." },
      { bold: "Description of the case:", text: "A detailed description of the matter and the exact date on which it occurred." },
      { bold: "Signature and attachments:", text: "The complainant's signature and any additional details or documents that may help resolve the complaint efficiently." },
    ],
    contactTitle: "Contact Us",
    contactIntro: "We are happy to assist you during business hours, by prior arrangement.",
    managerLabel: "Department Manager:",
    managerName: "אימן פרח",
    officePhoneLabel: "Office Phone:",
    officePhone: "04-9569803",
    mobileLabel: "Mobile:",
    mobile: "052-4204136",
    emailLabel: "Email:",
    email: "mivaker@kafr-yasif.muni.il",
    hoursLabel: "Public Reception Hours:",
    hoursText: "Monday-Thursday, between 08:30 AM and 3:00 PM (by prior arrangement).",
    contactClosing: "We invite you to send us your inquiries, and we will address them seriously and professionally.",
    formDocument: { title: "Complaint and Inquiry Form", href: "/documents/tofes-tluna-panyia.pdf" },
  },
};

export function ComptrollerPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle} />

      <div className="space-y-4">
        <NumberedSection index={1} icon={ShieldCheck} title={c.visionTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.visionParagraph}</p>
        </NumberedSection>

        <NumberedSection index={2} icon={Search} title={c.comptrollerTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.comptrollerIntro1}</p>
          <p className="text-sm leading-6 text-ink-600">{c.comptrollerIntro2}</p>
          <BulletList
            items={c.comptrollerPoints.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={3} icon={MessageSquareWarning} title={c.complaintsTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.complaintsIntro}</p>

          <h3 className="pt-2 font-semibold text-teal-900">{c.eligibilityHeading}</h3>
          <p className="text-sm leading-6 text-ink-600">{c.eligibilityIntro}</p>
          <BulletList
            items={c.eligibilityPoints.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />

          <h3 className="pt-2 font-semibold text-teal-900">{c.filingHeading}</h3>
          <p className="text-sm leading-6 text-ink-600">{c.filingIntro1}</p>
          <p className="text-sm leading-6 text-ink-600">{c.filingIntro2}</p>
          <BulletList
            items={c.filingPoints.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={4} icon={Phone} title={c.contactTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.contactIntro}</p>
          <BulletList
            items={[
              <>
                <strong className="text-ink-900">{c.managerLabel}</strong> {c.managerName}
              </>,
              <>
                <strong className="text-ink-900">{c.officePhoneLabel}</strong>{" "}
                <a href={`tel:${c.officePhone}`} className="text-teal-700 hover:underline">
                  {c.officePhone}
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.mobileLabel}</strong>{" "}
                <a href={`tel:${c.mobile}`} className="text-teal-700 hover:underline">
                  {c.mobile}
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.emailLabel}</strong>{" "}
                <a href={`mailto:${c.email}`} className="text-teal-700 hover:underline">
                  {c.email}
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.hoursLabel}</strong> {c.hoursText}
              </>,
            ]}
          />
          <p className="pt-2 text-sm leading-6 text-ink-600">{c.contactClosing}</p>
          <DocumentList items={[c.formDocument]} locale={locale} />
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
