import { Trash2, Recycle, Receipt, Users, Clock, Store, ExternalLink } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard, DocumentList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

// Staff contact details are locale-independent (names, phone numbers, emails are never translated).
const STAFF = [
  { name: "אבראהים שחאדה", phone: "052-8310004", fax: "04-9569829", email: "habeb-sh1973@hotmail.com" },
  { name: "סעיד מלחם", phone: "049569829" },
];

type LocaleContent = {
  subtitle: string;
  section1: { title: string; items: string[] };
  section2: { title: string; items: string[] };
  section3: { title: string; items: string[]; note: string };
  section4: { title: string; roles: string[] };
  section5: { title: string; items: string[] };
  section6: {
    title: string;
    docs1: { title: string; href: string }[];
    lawHeading: string;
    lawLinkText: string;
    pruningHeading: string;
    docs2: { title: string; href: string }[];
    formsHeading: string;
    docs3: { title: string; href: string }[];
    envLinkText: string;
  };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "מחלקת תברואה ורישוי עסקים – מועצה מקומית כפר יאסיף",
    section1: {
      title: "תחום אחריות המחלקה",
      items: [
        "ניקוי רחובות ושכונות בכפר",
        "פינוי אשפה, גזמים ופסולת בניין (לפי הצורך ולפי חוקים ונהלים)",
        "פינוי קרטונים (באמצעות כלובים שמוצבים במקומות ציבוריים)",
        "ניקוי שטחים באזורי מטעים",
        "הדברת מוסדות חינוך",
        "פיקוח על רישוי עסקים ותשלום אגרות",
        "סילוק  המזיקותם לתושבים",
        "תכנון הצבת מיכלי אשפה ציבוריים",
      ],
    },
    section2: {
      title: "סדר ניקוי ופינוי בכפר",
      items: [
        "ניקוי כביש 70 כל יום",
        "ניקוי שכונות הכפר יומיים בשבוע",
        "ניקוי רחובות על ידי פועלים 6 ימים בשבוע (5 פועלים בכל יום)",
        "איסוף גרטאות וגזמים בתיאום טלפוני עם המועצה",
        "פינוי פסולת בניין חובת התושב לפנות לאתר פינוי מורשה",
        "איסוף קרטונים באמצעות 25 כלובים המנוהלים על ידי קבלן",
      ],
    },
    section3: {
      title: "תעריפים",
      items: ['אגרת רישיון עסק: 382 ש"ח (עדכון תקופתי משרד הפנים)', 'אגרת חיסון כלבת: 90 ש"ח'],
      note: "התשלום מתבצע במחלקת גבייה",
    },
    section4: {
      title: "צוות המחלקה",
      roles: ["מנהל מחלקת תברואה ורישוי עסקים", "עוזר מנהל מחלקה - נהל מוקד עירוני"],
    },
    section5: {
      title: "קבלת קהל – רישוי עסקים",
      items: ["יום שבת: בין השעות 12:00–09:00", "שעות פעילות המשרד: 15:45–08:00"],
    },
    section6: {
      title: "רישוי עסקים ומידע לתושב",
      docs1: [
        { title: "מנהל מחלקת הבריאות", href: "/documents/kalimat-mudir-qism-alsihha.pdf" },
        { title: "מפרט רישוי עסקים כפר יאסיף", href: "/documents/mifrat-rishuy-asakim-kafr-yasif.pdf" },
      ],
      lawHeading: "חוק רישוי עסקים:",
      lawLinkText: "חוק רישוי עסקים",
      pruningHeading: "סדר פינוי גיזום:",
      docs2: [{ title: "מודעה בעניין איסוף גרוטאות וגזם", href: "/documents/modaa-isuf-grutaot-vgezem.pdf" }],
      formsHeading: "טפסים רלוונטיים:",
      docs3: [
        {
          title: "בקשה לחוות דעת מקדמית לרישיון עסק לפי חוק רישוי עסקים",
          href: "/documents/bakasha-chavat-daat-rishayon-esek.pdf",
        },
      ],
      envLinkText: "מידע סביבתי לצורך בדיקת בקשה לרישיון עסק / היתר זמני",
    },
  },
  ar: {
    subtitle: "قسم الصرف الصحي وترخيص الأعمال – المجلس المحلي كفر ياسيف",
    section1: {
      title: "نطاق مسؤولية القسم",
      items: [
        "تنظيف شوارع وأحياء القرية",
        "إزالة النفايات ومخلفات التقليم ونفايات البناء (حسب الحاجة ووفق القوانين والأنظمة)",
        "جمع الكرتون (عبر حاويات موزّعة في الأماكن العامة)",
        "تنظيف مناطق البساتين",
        "مكافحة الآفات في المؤسسات التعليمية",
        "الإشراف على ترخيص الأعمال وتحصيل الرسوم",
        "إزالة الآفات المؤذية للمواطنين",
        "تخطيط توزيع حاويات النفايات العامة",
      ],
    },
    section2: {
      title: "جدول التنظيف وجمع النفايات في القرية",
      items: [
        "تنظيف طريق رقم 70 يومياً",
        "تنظيف أحياء القرية يومين في الأسبوع",
        "تنظيف الشوارع بواسطة عمال 6 أيام في الأسبوع (5 عمال في كل يوم)",
        "جمع الخردة ومخلفات التقليم بالتنسيق الهاتفي مع المجلس",
        "إزالة نفايات البناء هي مسؤولية المواطن، ويجب التوجه إلى موقع تفريغ مرخّص",
        "جمع الكرتون عبر 25 حاوية يديرها مقاول",
      ],
    },
    section3: {
      title: "الرسوم",
      items: ["رسم ترخيص الأعمال: 382 شيكل (تحديث دوري من وزارة الداخلية)", "رسم تطعيم داء الكلب: 90 شيكل"],
      note: "يتم الدفع في قسم التحصيل",
    },
    section4: {
      title: "طاقم القسم",
      roles: ["مدير قسم الصرف الصحي وترخيص الأعمال", "مساعد مدير القسم - مدير مركز الاتصال البلدي"],
    },
    section5: {
      title: "استقبال الجمهور – ترخيص الأعمال",
      items: ["يوم السبت: بين الساعة 12:00–09:00", "ساعات عمل المكتب: 15:45–08:00"],
    },
    section6: {
      title: "ترخيص الأعمال ومعلومات للمواطن",
      docs1: [
        { title: "مدير قسم الصحة", href: "/documents/kalimat-mudir-qism-alsihha.pdf" },
        { title: "مواصفات ترخيص الأعمال في كفر ياسيف", href: "/documents/mifrat-rishuy-asakim-kafr-yasif.pdf" },
      ],
      lawHeading: "قانون ترخيص الأعمال:",
      lawLinkText: "قانون ترخيص الأعمال",
      pruningHeading: "جدول جمع مخلفات التقليم:",
      docs2: [{ title: "إعلان بخصوص جمع الخردة ومخلفات التقليم", href: "/documents/modaa-isuf-grutaot-vgezem.pdf" }],
      formsHeading: "نماذج ذات صلة:",
      docs3: [
        {
          title: "طلب رأي مسبق لترخيص عمل وفق قانون ترخيص الأعمال",
          href: "/documents/bakasha-chavat-daat-rishayon-esek.pdf",
        },
      ],
      envLinkText: "معلومات بيئية لفحص طلب ترخيص عمل / تصريح مؤقت",
    },
  },
  en: {
    subtitle: "Sanitation & Business Licensing Department – Kafr Yasif Local Council",
    section1: {
      title: "Department's Areas of Responsibility",
      items: [
        "Cleaning streets and neighborhoods in the village",
        "Removal of garbage, pruning waste and construction debris (as needed, in accordance with laws and regulations)",
        "Cardboard collection (via cages placed in public locations)",
        "Cleaning of areas in orchard zones",
        "Pest control at educational institutions",
        "Supervision of business licensing and fee payments",
        "Removal of pests and nuisances affecting residents",
        "Planning the placement of public waste containers",
      ],
    },
    section2: {
      title: "Cleaning and Collection Schedule in the Village",
      items: [
        "Cleaning of Route 70 every day",
        "Cleaning of the village's neighborhoods two days a week",
        "Street cleaning by workers 6 days a week (5 workers per day)",
        "Collection of scrap and pruning waste by phone coordination with the council",
        "Construction debris removal is the resident's responsibility – must be taken to an authorized disposal site",
        "Cardboard collection via 25 cages managed by a contractor",
      ],
    },
    section3: {
      title: "Fees",
      items: ["Business license fee: NIS 382 (periodically updated by the Ministry of Interior)", "Rabies vaccination fee: NIS 90"],
      note: "Payment is made at the Collection Department",
    },
    section4: {
      title: "Department Staff",
      roles: ["Head of the Sanitation & Business Licensing Department", "Deputy Department Head – Municipal Call Center Manager"],
    },
    section5: {
      title: "Public Reception Hours – Business Licensing",
      items: ["Saturday: between 09:00–12:00", "Office operating hours: 08:00–15:45"],
    },
    section6: {
      title: "Business Licensing & Resident Information",
      docs1: [
        { title: "Health Department Manager", href: "/documents/kalimat-mudir-qism-alsihha.pdf" },
        { title: "Kafr Yasif Business Licensing Specification", href: "/documents/mifrat-rishuy-asakim-kafr-yasif.pdf" },
      ],
      lawHeading: "Business Licensing Law:",
      lawLinkText: "Business Licensing Law",
      pruningHeading: "Pruning Waste Collection Schedule:",
      docs2: [{ title: "Notice Regarding the Collection of Scrap and Pruning Waste", href: "/documents/modaa-isuf-grutaot-vgezem.pdf" }],
      formsHeading: "Relevant Forms:",
      docs3: [
        {
          title: "Application for a Preliminary Opinion for a Business License under the Business Licensing Law",
          href: "/documents/bakasha-chavat-daat-rishayon-esek.pdf",
        },
      ],
      envLinkText: "Environmental information for reviewing a business license / temporary permit application",
    },
  },
};

export function SanitationPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle} />

      <div className="space-y-4">
        <NumberedSection index={1} icon={Trash2} title={c.section1.title}>
          <BulletList items={c.section1.items} />
        </NumberedSection>

        <NumberedSection index={2} icon={Recycle} title={c.section2.title}>
          <BulletList items={c.section2.items} />
        </NumberedSection>

        <NumberedSection index={3} icon={Receipt} title={c.section3.title}>
          <BulletList items={c.section3.items} />
          <p className="text-sm leading-6 text-ink-600">{c.section3.note}</p>
        </NumberedSection>

        <NumberedSection index={4} icon={Users} title={c.section4.title}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STAFF.map((s, i) => (
              <StaffCard key={s.name} name={s.name} role={c.section4.roles[i]} phone={s.phone} fax={s.fax} email={s.email} />
            ))}
          </div>
        </NumberedSection>

        <NumberedSection index={5} icon={Clock} title={c.section5.title}>
          <BulletList items={c.section5.items} />
        </NumberedSection>

        <NumberedSection index={6} icon={Store} title={c.section6.title}>
          <DocumentList items={c.section6.docs1} locale={locale} />

          <h3 className="pt-2 font-semibold text-teal-900">{c.section6.lawHeading}</h3>
          <a
            href="https://www.gov.il/he/departments/ministry_of_environmental_protection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:underline"
          >
            <ExternalLink size={14} aria-hidden="true" />
            {c.section6.lawLinkText}
          </a>

          <h3 className="pt-2 font-semibold text-teal-900">{c.section6.pruningHeading}</h3>
          <DocumentList items={c.section6.docs2} locale={locale} />

          <h3 className="pt-2 font-semibold text-teal-900">{c.section6.formsHeading}</h3>
          <DocumentList items={c.section6.docs3} locale={locale} />
          <a
            href="https://www.gov.il/he/departments/ministry_of_environmental_protection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:underline"
          >
            <ExternalLink size={14} aria-hidden="true" />
            {c.section6.envLinkText}
          </a>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
