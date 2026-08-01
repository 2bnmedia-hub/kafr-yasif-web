import { FileSearch, Users, FileText } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, StaffCard, DocumentList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

// Form file names/URLs are locale-independent; only the visible titles are translated below.
const FORM_HREFS = [
  "/documents/ishur-evel.pdf",
  "/documents/ishur-bituach-leumi.pdf",
  "/documents/ishur-heder-chovot.pdf",
  "/documents/ishur-tabu-2026.pdf",
  "/documents/ishur-studentim-arnona.pdf",
  "/documents/ishur-misrad-hapnim-sinuy-sefach.pdf",
];

const STAFF = [
  { name: "אדמונד שחאדה", phone: "04-9569805", email: "cio@kafr-yasif.muni.il" },
  { name: "חנאן חדיג'ה", phone: "04-9569860", email: "hanan@kafr-yasif.muni.il" },
];

type LocaleContent = {
  subtitle: string;
  heroBody: string;
  section1: { title: string; body: string };
  section2: { title: string; roles: string[] };
  section3: { title: string; intro: string; forms: string[] };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "מחלקת מזכירות ומינהל כללי - מועצה מקומית כפר יאסיף",
    heroBody:
      "מחלקת המזכירות מהווה את הגשר המרכזי בין תושבי כפר יאסיף לבין הנהלת המועצה ומחלקותיה השונות. אנו אמונים על ניהול פניות הציבור, ניתוב התכתבויות לגורמים הרלוונטיים ומענה מהיר, יעיל ומקצועי לכל תושב. צוות המחלקה מחויב להעניק לכם שירות איכותי ונגיש לשיפור איכות החיים ביישוב.",
    section1: {
      title: "עיון בנהלי המועצה",
      body: "לצפייה או עיון בנהלי המועצה המקומית, יש לפנות ישירות למזכיר המועצה, אשר יפנה את הבקשה לגורם המוסמך במחלקה הרלוונטית לצורך קבלת מענה מלא.",
    },
    section2: {
      title: "הנהלת המועצה ומזכירות – פרטי התקשרות",
      roles: ['מנכ"ל המועצה', "מזכירת ראש המועצה"],
    },
    section3: {
      title: 'טפסים ואישורים להורדה (מחלקת המזכירות / מנכ"ל)',
      intro:
        "לנוחיותכם, ריכזנו את הטפסים הדיגיטליים הרשמיים של המועצה המקומית כפר יאסיף. ניתן להוריד את הטופס, למלא את הפרטים ולהגישם למחלקה:",
      forms: [
        "אישור אבל",
        "אישור ביטוח לאומי",
        "אישור העדר חובות",
        "אישור טאבו 2026",
        "אישור לסטודנטים על אי קבלת הנחה בארנונה",
        "אישור משרד פנים - שינוי ספח",
      ],
    },
  },
  ar: {
    subtitle: "قسم السكرتارية والإدارة العامة - المجلس المحلي كفر ياسيف",
    heroBody:
      "يُشكّل قسم السكرتارية الجسر المركزي بين سكان كفر ياسيف وإدارة المجلس وأقسامه المختلفة. نحن مسؤولون عن إدارة طلبات الجمهور، وتوجيه المراسلات إلى الجهات ذات الصلة، وتقديم استجابة سريعة وفعّالة ومهنية لكل مواطن. طاقم القسم ملتزم بمنحكم خدمة عالية الجودة وسهلة الوصول لتحسين جودة الحياة في البلدة.",
    section1: {
      title: "الاطلاع على أنظمة المجلس",
      body: "لمشاهدة أو الاطلاع على أنظمة المجلس المحلي، يجب التوجه مباشرة إلى سكرتير المجلس، الذي يحيل الطلب إلى الجهة المخوّلة في القسم المعني للحصول على استجابة كاملة.",
    },
    section2: {
      title: "إدارة المجلس والسكرتارية – بيانات التواصل",
      roles: ["المدير العام للمجلس", "سكرتيرة رئيس المجلس"],
    },
    section3: {
      title: "نماذج وإفادات للتحميل (قسم السكرتارية / المدير العام)",
      intro:
        "لراحتكم، جمّعنا النماذج الرقمية الرسمية للمجلس المحلي كفر ياسيف. يمكنكم تحميل النموذج، تعبئة البيانات وتقديمه إلى القسم:",
      forms: [
        "إفادة عزاء",
        "إفادة تأمين وطني",
        "إفادة خلو الذمة المالية",
        "إفادة طابو 2026",
        "إفادة للطلاب بعدم الحصول على تخفيض في الأرنونا",
        "إفادة وزارة الداخلية - تغيير ملحق",
      ],
    },
  },
  en: {
    subtitle: "Secretariat & General Administration Department - Kafr Yasif Local Council",
    heroBody:
      "The Secretariat Department serves as the central bridge between the residents of Kafr Yasif and the council's management and various departments. We are responsible for managing public inquiries, routing correspondence to the relevant parties, and providing a fast, efficient and professional response to every resident. The department's staff is committed to providing you with quality, accessible service to improve the quality of life in the village.",
    section1: {
      title: "Reviewing Council Procedures",
      body: "To view or review the local council's procedures, please contact the council secretary directly, who will forward the request to the authorized party in the relevant department for a complete response.",
    },
    section2: {
      title: "Council Management & Secretariat – Contact Details",
      roles: ["Council CEO", "Secretary to the Head of Council"],
    },
    section3: {
      title: "Downloadable Forms and Certificates (Secretariat Department / CEO)",
      intro:
        "For your convenience, we have gathered the official digital forms of the Kafr Yasif Local Council. You can download the form, fill in the details and submit it to the department:",
      forms: [
        "Bereavement Certificate",
        "National Insurance Certificate",
        "Certificate of No Outstanding Debts",
        "Land Registry (Tabu) Certificate 2026",
        "Certificate for Students Not Receiving a Property Tax Discount",
        "Ministry of Interior Certificate - Address Change",
      ],
    },
  },
};

export function SecretariatPageView({ title, locale }: Props) {
  const c = CONTENT[locale];
  const forms = c.section3.forms.map((title, i) => ({ title, href: FORM_HREFS[i] }));

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle}>
        {c.heroBody}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={FileSearch} title={c.section1.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section1.body}</p>
        </NumberedSection>

        <NumberedSection index={2} icon={Users} title={c.section2.title}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STAFF.map((s, i) => (
              <StaffCard key={s.name} name={s.name} role={c.section2.roles[i]} phone={s.phone} email={s.email} />
            ))}
          </div>
        </NumberedSection>

        <NumberedSection index={3} icon={FileText} title={c.section3.title}>
          <p className="mb-1 text-sm leading-6 text-ink-600">{c.section3.intro}</p>
          <DocumentList items={forms} locale={locale} />
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
