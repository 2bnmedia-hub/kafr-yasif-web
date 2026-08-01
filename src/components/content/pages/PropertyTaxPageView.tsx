import { Receipt, Wrench, Percent, FileText, Users, Clock } from "lucide-react";
import {
  PageArticle,
  Breadcrumb,
  Hero,
  NumberedSection,
  BulletList,
  DocumentList,
  StaffCard,
  HoursTable,
} from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  subtitle: string;
  intro: string;
  taxDept: { title: string; intro: string; items: string[]; outro: string };
  maintenanceDept: { title: string; intro: string; items: string[]; outro: string };
  ratesDept: { title: string; p1: string; p2: string; items: string[] };
  forms: { title: string; items: { title: string; href: string }[]; note: string };
  staff: { title: string; manager: { role: string }; clerk: { role?: string } };
  hours: { title: string; intro: string; rows: { days: string; hours: string | null; note: string; open: boolean }[]; note: string };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "מחלקת ארנונה – מועצה מקומית כפר יאסיף",
    intro:
      "מחלקת ארנונה במועצה המקומית כפר יאסיף אמונה על מתן שירותים חיוניים לתושבי היישוב בתחומי התחזוקה המוניציפלית, ניהול מערך הארנונה והטיפול בפניות התושבים. המחלקה פועלת לשמירה על תשתיות ציבוריות תקינות, לקידום סביבת מגורים בטוחה ומטופחת, ולמתן שירות מקצועי, יעיל ושקוף בכל הנוגע לחיובים, תעריפים ובירורים.",
    taxDept: {
      title: "מחלקת ארנונה",
      intro: "מחלקת הארנונה אחראית על ניהול מערך חיובי הארנונה והאגרות בתחום שיפוט המועצה, לרבות:",
      items: [
        "חיוב נכסים חדשים בהתאם לשטח הנכס ולסיווגו",
        "טיפול בהשגות, ערעורים ובקשות לעדכון חיוב",
        "בדיקת בקשות במקרים של שיפוצים, נכסים שאינם ראויים לשימוש או נכסים ריקים",
        "מתן מידע והבהרות לתושבים בנושא חיובים ותעריפים",
      ],
      outro: "המחלקה מקפידה על עבודה מקצועית, מסודרת ושקופה, בהתאם להוראות החוק, לצווי הארנונה ולהנחיות הרלוונטיות.",
    },
    maintenanceDept: {
      title: "מחלקת אחזקה",
      intro: "מחלקת האחזקה אחראית על תחזוקה שוטפת וטיפול בתשתיות ובנכסים המוניציפליים שבאחריות המועצה, ובהם:",
      items: [
        "תחזוקת מוסדות המועצה והמבנים הציבוריים",
        "אחזקת כבישים ומדרכות",
        "תחזוקת מערכות תאורת רחוב",
        "טיפול בתשתיות ניקוז",
        "מענה לליקויים תפעוליים במרחב הציבורי",
      ],
      outro: "המחלקה פועלת באופן שוטף לשמירה על רמת תחזוקה נאותה, בטיחות הציבור ושיפור איכות החיים ביישוב.",
    },
    ratesDept: {
      title: "ארנונה ותעריפים",
      p1: 'מחלקת הארנונה פועלת בהתאם לצווי הארנונה המאושרים כדין ע"י מליאת המועצה המקומית מדי שנה ולפי חוקי העזר שבתוקף.',
      p2: "בין הפרסומים:",
      items: [
        "צווי ארנונה",
        "עדכון תעריפי אגרות והיטלים לפי חוקי עזר",
        "הנחיות כלליות לשיעורי ארנונה לשנים 2023–2024",
      ],
    },
    forms: {
      title: "טפסים",
      items: [
        { title: "טופס נכס ריק (צריכת מים וחשמל)", href: "/documents/tofes-neches-reik.pdf" },
        { title: "טופס נכס לא ראוי לשימוש", href: "/documents/tofes-neches-lo-raui.pdf" },
        { title: "טופס הודעה על נכס שעובר שיפוצים", href: "/documents/tofes-neches-shiputzim.pdf" },
        { title: 'טופס הודעה על העברת שם משתמש (צילום ת"ז)', href: "/documents/tofes-haavarat-shem-mishtamesh.pdf" },
        { title: "טופס הודעה על הפסקת שימוש ושכירות בנכס", href: "/documents/tofes-hafsakat-sechirut.pdf" },
      ],
      note: 'טפסים המוגשים למחלקה צריכים להיות מלאים בשלמות וללא חוסרים ע"י מגיש הבקשה. טפסים שיוגשו לא בהתאם לכך לא יטופלו או יוחזרו.',
    },
    staff: {
      title: "צוות המחלקה",
      manager: { role: "מנהלת מחלקת ארנונה" },
      clerk: {},
    },
    hours: {
      title: "שעות קבלת קהל",
      intro: "קבלת קהל במחלקה מתקיימת בימים ובשעות הבאים:",
      rows: [
        { days: "ימים ב׳, ה׳, שבת", hours: "10:00 – 13:00", note: "קבלת קהל", open: true },
        { days: "ימים ג׳, ד׳", hours: null, note: "לא מתקיימת קבלת קהל", open: false },
      ],
      note: "מומלץ לבדוק מראש את זמינות השירות והאם נדרש לתאם פגישה לפני ההגעה.",
    },
  },
  ar: {
    subtitle: "قسم ضريبة الأملاك (الأرنونا) – المجلس المحلي كفر ياسيف",
    intro:
      "يتولى قسم ضريبة الأملاك (الأرنونا) في المجلس المحلي كفر ياسيف تقديم خدمات أساسية لسكان البلدة في مجالات الصيانة البلدية، وإدارة منظومة الأرنونا، ومعالجة استفسارات السكان. يعمل القسم على الحفاظ على بنية تحتية عامة سليمة، وتعزيز بيئة سكنية آمنة ومعتنى بها، وتقديم خدمة مهنية وفعالة وشفافة في كل ما يتعلق بالتحصيلات والتعريفات والاستفسارات.",
    taxDept: {
      title: "قسم ضريبة الأملاك (الأرنونا)",
      intro: "يتولى قسم الأرنونا إدارة منظومة تحصيل الأرنونا والرسوم ضمن نطاق سلطة المجلس، ويشمل ذلك:",
      items: [
        "تحصيل الأملاك الجديدة وفق مساحة الملك وتصنيفه",
        "معالجة الاعتراضات والطعون وطلبات تحديث التحصيل",
        "فحص الطلبات في حالات التجديدات، أو الأملاك غير الصالحة للاستخدام، أو الأملاك الفارغة",
        "تقديم المعلومات والتوضيحات للسكان بشأن التحصيلات والتعريفات",
      ],
      outro: "يحرص القسم على العمل المهني والمنظم والشفاف، وفقاً لأحكام القانون وأوامر الأرنونا والتعليمات ذات الصلة.",
    },
    maintenanceDept: {
      title: "قسم الصيانة",
      intro: "يتولى قسم الصيانة أعمال الصيانة الدورية ومعالجة البنية التحتية والأملاك البلدية الخاضعة لمسؤولية المجلس، ومنها:",
      items: [
        "صيانة مؤسسات المجلس والمباني العامة",
        "صيانة الطرق والأرصفة",
        "صيانة أنظمة إنارة الشوارع",
        "معالجة البنية التحتية لتصريف المياه",
        "الاستجابة للأعطال التشغيلية في المرافق العامة",
      ],
      outro: "يعمل القسم بشكل دائم على الحفاظ على مستوى صيانة ملائم، وسلامة الجمهور، وتحسين جودة الحياة في البلدة.",
    },
    ratesDept: {
      title: "الأرنونا والتعريفات",
      p1: "يعمل قسم الأرنونا وفق أوامر الأرنونا المصادق عليها قانونياً من قِبل مجلس البلدية العام كل عام، وبحسب القوانين المساعدة السارية.",
      p2: "من بين المنشورات:",
      items: [
        "أوامر الأرنونا",
        "تحديث تعريفات الرسوم والاستقطاعات وفق القوانين المساعدة",
        "تعليمات عامة لمعدلات الأرنونا لسنتي 2023–2024",
      ],
    },
    forms: {
      title: "النماذج",
      items: [
        { title: "نموذج ملك فارغ (استهلاك المياه والكهرباء)", href: "/documents/tofes-neches-reik.pdf" },
        { title: "نموذج ملك غير صالح للاستخدام", href: "/documents/tofes-neches-lo-raui.pdf" },
        { title: "نموذج إشعار بملك قيد التجديد", href: "/documents/tofes-neches-shiputzim.pdf" },
        { title: "نموذج إشعار بنقل اسم المستخدم (نسخة عن الهوية)", href: "/documents/tofes-haavarat-shem-mishtamesh.pdf" },
        { title: "نموذج إشعار بإنهاء الاستخدام والإيجار في الملك", href: "/documents/tofes-hafsakat-sechirut.pdf" },
      ],
      note: "يجب أن تكون النماذج المقدَّمة إلى القسم مكتملة بالكامل ودون نواقص من قِبل مقدّم الطلب. النماذج التي تُقدَّم خلافاً لذلك لن تُعالج أو ستُعاد.",
    },
    staff: {
      title: "طاقم القسم",
      manager: { role: "مديرة قسم الأرنونا" },
      clerk: {},
    },
    hours: {
      title: "ساعات استقبال الجمهور",
      intro: "يُستقبل الجمهور في القسم في الأيام والساعات التالية:",
      rows: [
        { days: "أيام الاثنين، الخميس، السبت", hours: "10:00 – 13:00", note: "استقبال جمهور", open: true },
        { days: "أيام الثلاثاء، الأربعاء", hours: null, note: "لا يوجد استقبال جمهور", open: false },
      ],
      note: "يُنصح بالتحقق مسبقاً من مدى توفر الخدمة وما إذا كان يلزم تحديد موعد قبل الحضور.",
    },
  },
  en: {
    subtitle: "Property Tax Department – Kafr Yasif Local Council",
    intro:
      "The Property Tax (Arnona) Department at the Kafr Yasif Local Council is responsible for providing essential services to residents in the areas of municipal maintenance, managing the property tax system, and handling resident inquiries. The department works to maintain sound public infrastructure, promote a safe and well-kept living environment, and provide professional, efficient and transparent service regarding charges, rates and inquiries.",
    taxDept: {
      title: "Property Tax Department",
      intro: "The Property Tax Department is responsible for managing the property tax and levy billing system within the Council's jurisdiction, including:",
      items: [
        "Billing new properties according to their size and classification",
        "Handling objections, appeals and requests to update billing",
        "Reviewing requests in cases of renovations, properties unfit for use, or vacant properties",
        "Providing residents with information and clarifications regarding charges and rates",
      ],
      outro: "The department maintains professional, orderly and transparent work, in accordance with the law, the property tax orders and the relevant guidelines.",
    },
    maintenanceDept: {
      title: "Maintenance Department",
      intro: "The Maintenance Department is responsible for routine maintenance and upkeep of the infrastructure and municipal assets under the Council's responsibility, including:",
      items: [
        "Maintaining Council institutions and public buildings",
        "Maintaining roads and sidewalks",
        "Maintaining street lighting systems",
        "Handling drainage infrastructure",
        "Responding to operational faults in public spaces",
      ],
      outro: "The department works on an ongoing basis to maintain proper upkeep, public safety, and an improved quality of life in the town.",
    },
    ratesDept: {
      title: "Property Tax and Rates",
      p1: "The Property Tax Department operates in accordance with the property tax orders duly approved by the Local Council plenum each year and pursuant to the by-laws in effect.",
      p2: "Publications include:",
      items: [
        "Property tax orders",
        "Updates to fee and levy rates under the by-laws",
        "General guidelines on property tax rates for 2023–2024",
      ],
    },
    forms: {
      title: "Forms",
      items: [
        { title: "Vacant Property Form (Water and Electricity Consumption)", href: "/documents/tofes-neches-reik.pdf" },
        { title: "Property Unfit for Use Form", href: "/documents/tofes-neches-lo-raui.pdf" },
        { title: "Notice of Property Undergoing Renovation Form", href: "/documents/tofes-neches-shiputzim.pdf" },
        { title: "Notice of User Name Transfer Form (Copy of ID Required)", href: "/documents/tofes-haavarat-shem-mishtamesh.pdf" },
        { title: "Notice of Termination of Use and Tenancy Form", href: "/documents/tofes-hafsakat-sechirut.pdf" },
      ],
      note: "Forms submitted to the department must be fully and completely filled out by the applicant. Forms submitted otherwise will not be processed or will be returned.",
    },
    staff: {
      title: "Department Staff",
      manager: { role: "Property Tax Department Manager" },
      clerk: {},
    },
    hours: {
      title: "Reception Hours",
      intro: "The department receives the public on the following days and hours:",
      rows: [
        { days: "Monday, Thursday, Saturday", hours: "10:00 AM – 1:00 PM", note: "Public Reception", open: true },
        { days: "Tuesday, Wednesday", hours: null, note: "No Public Reception", open: false },
      ],
      note: "It is recommended to check service availability in advance and whether an appointment is required before arriving.",
    },
  },
};

export function PropertyTaxPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle}>
        {c.intro}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Receipt} title={c.taxDept.title}>
          <p className="text-sm leading-6 text-ink-600">{c.taxDept.intro}</p>
          <BulletList items={c.taxDept.items} />
          <p className="text-sm leading-6 text-ink-600">{c.taxDept.outro}</p>
        </NumberedSection>

        <NumberedSection index={2} icon={Wrench} title={c.maintenanceDept.title}>
          <p className="text-sm leading-6 text-ink-600">{c.maintenanceDept.intro}</p>
          <BulletList items={c.maintenanceDept.items} />
          <p className="text-sm leading-6 text-ink-600">{c.maintenanceDept.outro}</p>
        </NumberedSection>

        <NumberedSection index={3} icon={Percent} title={c.ratesDept.title}>
          <p className="text-sm leading-6 text-ink-600">{c.ratesDept.p1}</p>
          <p className="text-sm leading-6 text-ink-600">{c.ratesDept.p2}</p>
          <BulletList items={c.ratesDept.items} />
        </NumberedSection>

        <NumberedSection index={4} icon={FileText} title={c.forms.title}>
          <DocumentList items={c.forms.items} locale={locale} />
          <p className="text-xs leading-5 text-ink-600">*{c.forms.note}</p>
        </NumberedSection>

        <NumberedSection index={5} icon={Users} title={c.staff.title}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StaffCard name="עדבה אל חאג'" role={c.staff.manager.role} phone="04-9569810" email="adbae@kafr-yasif.muni.il" />
            <StaffCard name="עבד סעד" phone="04-9569872" />
          </div>
        </NumberedSection>

        <NumberedSection index={6} icon={Clock} title={c.hours.title}>
          <p className="text-sm leading-6 text-ink-600">{c.hours.intro}</p>
          <HoursTable rows={c.hours.rows} />
          <p className="text-xs leading-5 text-ink-600">*{c.hours.note}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
