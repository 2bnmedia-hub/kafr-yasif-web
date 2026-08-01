import Image from "next/image";
import { Building2, Clock, Users } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, HoursTable, StaffCard } from "../premium/Shared";
import type { HoursRow } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  heroIntro: string;
  imageAlt: string;
  section1Title: string;
  section1Paragraphs: string[];
  section2Title: string;
  hours: HoursRow[];
  section3Title: string;
  section3Intro: string;
  staff1Name: string;
  staff1Role: string;
  staff2Name: string;
  staff2Role: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroIntro:
      "ראש המועצה עיסאם נעים שחאדה נבחר לראש המועצה המקומית כפר יאסיף — זו הקדנציה הראשונה, החל מ-18/3/24. לראש הרשות יש סמכות עליונה בכל ענייני הרשות, והוא ממונה על תפקודה התקין של הרשות ועל יישום החלטות המועצה.",
    imageAlt: "מועצה מקומית כפר יאסיף",
    section1Title: "תפקיד לשכת ראש המועצה",
    section1Paragraphs: [
      "לשכת ראש המועצה ממוקמת בראש המבנה הארגוני של הרשות.",
      "הלשכה אחראית על ניהול הרשות המקומית, מהלשכה יוצאות הנחיות ראש המועצה לכל המחלקות.",
      "הלשכה מבצעת בקרה על תפעולה של הרשות לפי מדיניות העומד בראשה ומימושה בדרך היעילה והאפקטיביות ביותר.",
      "הלשכה רואה באיכות עבודתה אלמנט מרכזי וחיוני, כדי לספק שרות אפקטיבי לשביעות רצון התושבים.",
      "הלשכה מהווה קשר בין המועצה לבין גורמים חיצוניים שונים: משרדי ממשלה, חברי כנסת, נציגי מוסדות וחברות.",
    ],
    section2Title: "שעות קבלה",
    hours: [
      { days: "יום רביעי", hours: "10:00 – 15:00", note: "קבלת קהל", open: true },
      { days: "יום שבת", hours: "10:00 – 13:00", note: "קבלת קהל", open: true },
    ],
    section3Title: "תיאום פגישה",
    section3Intro: "לתיאום פגישה עם ראש המועצה ניתן ליצור קשר עם:",
    staff1Name: "והיב תומא",
    staff1Role: "מנהל לשכת ראש המועצה",
    staff2Name: "עיסאם נעים שחאדה",
    staff2Role: "ראש המועצה המקומית כפר יאסיף",
  },
  ar: {
    heroIntro:
      "انتُخب رئيس المجلس عيسام نعيم شحادة رئيساً للمجلس المحلي كفر ياسيف — وهذه هي الولاية الأولى، اعتباراً من 18/3/24. يتمتع رئيس السلطة بالصلاحية العليا في جميع شؤون السلطة، وهو المسؤول عن حسن سير عمل السلطة وعن تنفيذ قرارات المجلس.",
    imageAlt: "المجلس المحلي كفر ياسيف",
    section1Title: "دور مكتب رئيس المجلس",
    section1Paragraphs: [
      "يقع مكتب رئيس المجلس على رأس الهيكل التنظيمي للسلطة.",
      "المكتب مسؤول عن إدارة السلطة المحلية، ومنه تصدر توجيهات رئيس المجلس إلى جميع الأقسام.",
      "يتولى المكتب الرقابة على تشغيل السلطة وفق سياسة رئيسها وتنفيذها بأكثر الطرق كفاءة وفعالية.",
      "يعتبر المكتب جودة عمله عنصراً مركزياً وضرورياً، لتقديم خدمة فعّالة تحقق رضا السكان.",
      "يشكّل المكتب حلقة الوصل بين المجلس وبين جهات خارجية مختلفة: الوزارات الحكومية، أعضاء الكنيست، وممثلي المؤسسات والشركات.",
    ],
    section2Title: "ساعات الاستقبال",
    hours: [
      { days: "يوم الأربعاء", hours: "10:00 – 15:00", note: "استقبال الجمهور", open: true },
      { days: "يوم السبت", hours: "10:00 – 13:00", note: "استقبال الجمهور", open: true },
    ],
    section3Title: "تنسيق موعد",
    section3Intro: "لتنسيق موعد مع رئيس المجلس يمكن التواصل مع:",
    staff1Name: "והיב תומא",
    staff1Role: "مدير مكتب رئيس المجلس",
    staff2Name: "עיסאם נעים שחאדה",
    staff2Role: "رئيس المجلس المحلي كفر ياسيف",
  },
  en: {
    heroIntro:
      "Council Head עיסאם נעים שחאדה was elected Head of the Kafr Yasif Local Council — this is his first term, beginning on March 18, 2024. The head of the authority holds supreme authority over all matters of the authority, and is responsible for its proper functioning and for implementing council decisions.",
    imageAlt: "Kafr Yasif Local Council",
    section1Title: "Role of the Office of the Council Head",
    section1Paragraphs: [
      "The office of the council head sits at the top of the authority's organizational structure.",
      "The office is responsible for managing the local authority; the council head's directives to all departments are issued from this office.",
      "The office oversees the authority's operations in line with the policy set by its head, implementing it as efficiently and effectively as possible.",
      "The office regards the quality of its work as a central and essential element in providing effective service to the satisfaction of residents.",
      "The office serves as the point of contact between the council and various external parties: government ministries, members of Knesset, and representatives of institutions and companies.",
    ],
    section2Title: "Reception Hours",
    hours: [
      { days: "Wednesday", hours: "10:00 AM – 3:00 PM", note: "Public reception", open: true },
      { days: "Saturday", hours: "10:00 AM – 1:00 PM", note: "Public reception", open: true },
    ],
    section3Title: "Scheduling a Meeting",
    section3Intro: "To schedule a meeting with the council head, please contact:",
    staff1Name: "והיב תומא",
    staff1Role: "Head of the Office of the Council Head",
    staff2Name: "עיסאם נעים שחאדה",
    staff2Role: "Head of the Kafr Yasif Local Council",
  },
};

export function OfficeOfMayorPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.heroIntro}</Hero>

      <div className="mb-6 flex justify-start">
        <div className="relative h-36 w-36 overflow-hidden rounded-2xl shadow-sm ring-1 ring-zinc-100 sm:h-40 sm:w-40">
          <Image src="/uploads/office-of-mayor.avif" alt={c.imageAlt} fill sizes="160px" className="object-cover" />
        </div>
      </div>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Building2} title={c.section1Title}>
          {c.section1Paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={2} icon={Clock} title={c.section2Title}>
          <HoursTable rows={c.hours} />
        </NumberedSection>

        <NumberedSection index={3} icon={Users} title={c.section3Title}>
          <p className="mb-1 text-sm leading-6 text-ink-600">{c.section3Intro}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StaffCard name={c.staff1Name} role={c.staff1Role} phone="04-9569807" />
            <StaffCard
              name={c.staff2Name}
              role={c.staff2Role}
              phone="052-4263631"
              fax="04-9961801"
              email="isam@kafr-yasif.muni.il"
            />
          </div>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
