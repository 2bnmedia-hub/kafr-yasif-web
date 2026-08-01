import {
  Crown,
  UserCog,
  Users,
  Building2,
  ShieldCheck,
  Trash2,
  HeartHandshake,
  Archive,
  ShoppingCart,
  ShieldAlert,
  GraduationCap,
  Receipt,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, SectionCard, IconBadge, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LeadershipEntry = { title: string; name: string | null; icon: LucideIcon };
type DepartmentEntry = { title: string; name: string | null; icon: LucideIcon; color: string; items: string[] };

type LocaleContent = {
  heroSubtitle: string;
  leadership: LeadershipEntry[];
  departments: DepartmentEntry[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "מבנה ארגוני של מועצת כפר יאסיף – 2026",
    leadership: [
      { title: 'מנכ"ל המועצה', name: "אדמונד שחאדה", icon: UserCog },
      { title: "ראש המועצה", name: "עסאם נעים שחאדה", icon: Crown },
      { title: "ממלא מקום ראש המועצה + סגני ראש המועצה", name: null, icon: Users },
    ],
    departments: [
      {
        title: "מחלקת הנדסה, הנדסה ותכנון",
        name: "רים שחאדה",
        icon: Building2,
        color: "#1e5266",
        items: ["אחזקת כבישים ותכנון", "תאגיד אל עין", "תאורה", "תכנון ופיקוח על הבנייה"],
      },
      { title: "מבקר פנים", name: "אימן פרח", icon: ShieldCheck, color: "#417c79", items: [] },
      {
        title: "מחלקת תברואה ואיכות סביבה",
        name: "אבראהים שחאדה",
        icon: Trash2,
        color: "#d99a3d",
        items: ["רישוי עסקים", "פיקוח ווטרינרי", "ניקוי רחובות"],
      },
      {
        title: "מחלקת רווחה",
        name: "ריהאן דרווייש",
        icon: HeartHandshake,
        color: "#2c6a76",
        items: ["רווחה קהילתית", "רווחה פרטנית", "שירותים חברתיים"],
      },
      {
        title: 'מנכ"ל המועצה - מחלקת מזכירות',
        name: null,
        icon: Archive,
        color: "#8ec640",
        items: ["מינהל מנגנון כוח אדם", "ארכיב", "מזכירות"],
      },
      {
        title: "מחלקת רכש ואספקה",
        name: "עסאם פרח",
        icon: ShoppingCart,
        color: "#1e5266",
        items: ["קניין", "מחסן מועצה"],
      },
      {
        title: "מדור חירום וביטחון",
        name: "פאדי שחאדה",
        icon: ShieldAlert,
        color: "#d99a3d",
        items: ["בטיחות בדרכים", "שירותי חירום וביטחון"],
      },
      {
        title: "מחלקת חינוך וספורט",
        name: "מיכאיל בסל",
        icon: GraduationCap,
        color: "#12323d",
        items: ['בי"ס תיכון', 'בי"ס חט"ב', "גני ילדים חובה וטרום חובה", "תרבות ונוער וספורט"],
      },
      {
        title: "מחלקת גזברות",
        name: "סעיד אבראהים",
        icon: Receipt,
        color: "#1e5266",
        items: ["גביה", 'הנה"ח', "משכורת וחשב שכר", "תקציב וכספים"],
      },
    ],
  },
  ar: {
    heroSubtitle: "الهيكل التنظيمي لمجلس كفر ياسيف – 2026",
    leadership: [
      { title: "المدير العام للمجلس", name: "אדמונד שחאדה", icon: UserCog },
      { title: "رئيس المجلس", name: "עסאם נעים שחאדה", icon: Crown },
      { title: "نائب رئيس المجلس ومساعدو رئيس المجلس", name: null, icon: Users },
    ],
    departments: [
      {
        title: "قسم الهندسة والتخطيط",
        name: "רים שחאדה",
        icon: Building2,
        color: "#1e5266",
        items: ["صيانة الطرق والتخطيط", "شركة العين", "الإنارة", "التخطيط والإشراف على البناء"],
      },
      { title: "المراقب الداخلي", name: "אימן פרח", icon: ShieldCheck, color: "#417c79", items: [] },
      {
        title: "قسم الصحة العامة والبيئة",
        name: "אבראהים שחאדה",
        icon: Trash2,
        color: "#d99a3d",
        items: ["ترخيص الأعمال", "الرقابة البيطرية", "تنظيف الشوارع"],
      },
      {
        title: "قسم الرفاه",
        name: "ריהאן דרווייש",
        icon: HeartHandshake,
        color: "#2c6a76",
        items: ["الرفاه المجتمعي", "الرفاه الفردي", "الخدمات الاجتماعية"],
      },
      {
        title: "المدير العام للمجلس - قسم السكرتارية",
        name: null,
        icon: Archive,
        color: "#8ec640",
        items: ["إدارة شؤون الموظفين", "الأرشيف", "السكرتارية"],
      },
      {
        title: "قسم المشتريات والتزويد",
        name: "עסאם פרח",
        icon: ShoppingCart,
        color: "#1e5266",
        items: ["المشتريات", "مستودع المجلس"],
      },
      {
        title: "شعبة الطوارئ والأمن",
        name: "פאדי שחאדה",
        icon: ShieldAlert,
        color: "#d99a3d",
        items: ["السلامة على الطرق", "خدمات الطوارئ والأمن"],
      },
      {
        title: "قسم التربية والرياضة",
        name: "מיכאיל בסל",
        icon: GraduationCap,
        color: "#12323d",
        items: ["المدرسة الثانوية", "المدرسة الإعدادية", "رياض الأطفال الإلزامية وما قبل الإلزامية", "الثقافة والشباب والرياضة"],
      },
      {
        title: "قسم الخزينة",
        name: "סעיד אבראהים",
        icon: Receipt,
        color: "#1e5266",
        items: ["الجباية", "المحاسبة", "الرواتب ومحاسب الرواتب", "الميزانية والشؤون المالية"],
      },
    ],
  },
  en: {
    heroSubtitle: "Organizational Structure of the Kafr Yasif Council – 2026",
    leadership: [
      { title: "Council Director-General", name: "אדמונד שחאדה", icon: UserCog },
      { title: "Head of the Council", name: "עסאם נעים שחאדה", icon: Crown },
      { title: "Deputy Council Head + Vice Council Heads", name: null, icon: Users },
    ],
    departments: [
      {
        title: "Engineering and Planning Department",
        name: "רים שחאדה",
        icon: Building2,
        color: "#1e5266",
        items: ["Road Maintenance and Planning", "Al-Ein Corporation", "Lighting", "Building Planning and Supervision"],
      },
      { title: "Internal Comptroller", name: "אימן פרח", icon: ShieldCheck, color: "#417c79", items: [] },
      {
        title: "Sanitation and Environmental Quality Department",
        name: "אבראהים שחאדה",
        icon: Trash2,
        color: "#d99a3d",
        items: ["Business Licensing", "Veterinary Inspection", "Street Cleaning"],
      },
      {
        title: "Welfare Department",
        name: "ריהאן דרווייש",
        icon: HeartHandshake,
        color: "#2c6a76",
        items: ["Community Welfare", "Individual Welfare", "Social Services"],
      },
      {
        title: "Council Director-General - Secretariat Department",
        name: null,
        icon: Archive,
        color: "#8ec640",
        items: ["Human Resources Administration", "Archive", "Secretariat"],
      },
      {
        title: "Procurement and Supply Department",
        name: "עסאם פרח",
        icon: ShoppingCart,
        color: "#1e5266",
        items: ["Purchasing", "Council Warehouse"],
      },
      {
        title: "Emergency & Security Division",
        name: "פאדי שחאדה",
        icon: ShieldAlert,
        color: "#d99a3d",
        items: ["Road Safety", "Emergency and Security Services"],
      },
      {
        title: "Education and Sports Department",
        name: "מיכאיל בסל",
        icon: GraduationCap,
        color: "#12323d",
        items: ["High School", "Junior High School", "Compulsory and Pre-Compulsory Kindergartens", "Culture, Youth and Sports"],
      },
      {
        title: "Treasury Department",
        name: "סעיד אבראהים",
        icon: Receipt,
        color: "#1e5266",
        items: ["Collections", "Bookkeeping", "Payroll and Payroll Accounting", "Budget and Finance"],
      },
    ],
  },
};

export function OrgChartPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {c.leadership.map((l) => (
          <div
            key={l.title}
            className="rounded-2xl px-5 py-6 text-center"
            style={{ background: "linear-gradient(135deg, #12323d 0%, #1e5266 100%)" }}
          >
            <l.icon size={22} className="mx-auto mb-2 text-teal-100" aria-hidden="true" />
            <h2 className="font-bold text-white">{l.title}</h2>
            {l.name && <p className="mt-1 text-sm text-teal-100">{l.name}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.departments.map((d) => (
          <SectionCard key={d.title}>
            <IconBadge icon={d.icon} color={d.color} />
            <h2 className="mb-1 text-base font-bold text-teal-900">{d.title}</h2>
            {d.name && <p className="mb-3 text-sm text-ink-600">{d.name}</p>}
            {d.items.length > 0 && <BulletList items={d.items} />}
          </SectionCard>
        ))}
      </div>
    </PageArticle>
  );
}
