import { MapPin, Clock, Building2, Info } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, HoursTable } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  subtitle: string;
  contactInfo: {
    title: string;
    addressLabel: string;
    addressText: string;
    switchboardLabel: string;
  };
  mayorHours: {
    title: string;
    intro: string;
    rows: { days: string; hours: string | null; note: string; open: boolean }[];
    note: string;
  };
  deptHours: {
    title: string;
    intro: string;
    workDaysLabel: string;
    workDaysText: string;
    hoursLabel: string;
    hoursText: string;
    note: string;
  };
  importantNote: { title: string; text: string };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "פרטי התקשרות וקבלת קהל - מועצה מקומית כפר יאסיף",
    contactInfo: {
      title: "פרטי קשר רשמיים",
      addressLabel: "כתובת למכתבים:",
      addressText: "ת.ד. 994, כפר יאסיף, מיקוד 2490800.",
      switchboardLabel: "מרכזיית המועצה:",
    },
    mayorHours: {
      title: "שעות קבלת קהל – ראש המועצה (מר עסאם נעים שחאדה)",
      intro: "ראש המועצה מקבל קהל בתיאום מראש בימים הבאים:",
      rows: [
        { days: "יום רביעי", hours: "15:00–10:00", note: "בתיאום מראש", open: true },
        { days: "יום שבת", hours: "15:00–10:00", note: "בתיאום מראש", open: true },
      ],
      note: "מומלץ לבדוק מראש את זמינות השירות ואת הצורך בתיאום פגישה לפני ההגעה.",
    },
    deptHours: {
      title: "שעות פעילות מחלקות המועצה",
      intro: "משרדי המועצה (גבייה, הנדסה, רווחה וכד') פועלים בימים:",
      workDaysLabel: "ימי עבודה:",
      workDaysText: "שני, שלישי, רביעי, חמישי ושבת.",
      hoursLabel: "שעות פעילות:",
      hoursText: "16:00 – 08:30.",
      note: "שימו לב: ימי שישי וראשון – ימים ללא קבלת קהל (ימי מנוחה).",
    },
    importantNote: {
      title: "הערה חשובה",
      text: "לפני הגעה למחלקה מסוימת (כגון הנדסה או גבייה), מומלץ לוודא טלפונית את שעות קבלת הקהל הספציפיות ואת זמינות השירות.",
    },
  },
  ar: {
    subtitle: "معلومات التواصل واستقبال الجمهور - المجلس المحلي كفر ياسيف",
    contactInfo: {
      title: "معلومات الاتصال الرسمية",
      addressLabel: "العنوان للمراسلات:",
      addressText: "ص.ب. 994، كفر ياسيف، الرمز البريدي 2490800.",
      switchboardLabel: "مقسم هاتف المجلس:",
    },
    mayorHours: {
      title: "ساعات استقبال الجمهور – رئيس المجلس (السيد עסאם נעים שחאדה)",
      intro: "يستقبل رئيس المجلس الجمهور بالتنسيق المسبق في الأيام التالية:",
      rows: [
        { days: "يوم الأربعاء", hours: "10:00–15:00", note: "بالتنسيق المسبق", open: true },
        { days: "يوم السبت", hours: "10:00–15:00", note: "بالتنسيق المسبق", open: true },
      ],
      note: "يُنصح بالتحقق مسبقاً من مدى توفر الخدمة ومن ضرورة تحديد موعد قبل الحضور.",
    },
    deptHours: {
      title: "ساعات عمل أقسام المجلس",
      intro: "تعمل مكاتب المجلس (الجباية، الهندسة، الرفاه وغيرها) في الأيام التالية:",
      workDaysLabel: "أيام العمل:",
      workDaysText: "الاثنين، الثلاثاء، الأربعاء، الخميس والسبت.",
      hoursLabel: "ساعات العمل:",
      hoursText: "08:30 – 16:00.",
      note: "يُرجى الانتباه: يومَا الجمعة والأحد – أيام دون استقبال جمهور (أيام راحة).",
    },
    importantNote: {
      title: "ملاحظة هامة",
      text: "قبل التوجه إلى قسم معين (مثل الهندسة أو الجباية)، يُنصح بالتأكد هاتفياً من ساعات استقبال الجمهور المحددة ومدى توفر الخدمة.",
    },
  },
  en: {
    subtitle: "Contact Details and Reception Hours - Kafr Yasif Local Council",
    contactInfo: {
      title: "Official Contact Details",
      addressLabel: "Mailing Address:",
      addressText: "P.O. Box 994, Kafr Yasif, Postal Code 2490800.",
      switchboardLabel: "Council Switchboard:",
    },
    mayorHours: {
      title: "Reception Hours – Council Head (Mr. עסאם נעים שחאדה)",
      intro: "The Council Head receives the public by prior arrangement on the following days:",
      rows: [
        { days: "Wednesday", hours: "10:00 AM–3:00 PM", note: "By Prior Arrangement", open: true },
        { days: "Saturday", hours: "10:00 AM–3:00 PM", note: "By Prior Arrangement", open: true },
      ],
      note: "It is recommended to check service availability in advance and whether an appointment is required before arriving.",
    },
    deptHours: {
      title: "Council Departments' Operating Hours",
      intro: "The Council offices (Collection, Engineering, Welfare, etc.) operate on the following days:",
      workDaysLabel: "Working Days:",
      workDaysText: "Monday, Tuesday, Wednesday, Thursday and Saturday.",
      hoursLabel: "Operating Hours:",
      hoursText: "8:30 AM – 4:00 PM.",
      note: "Please note: Friday and Sunday are days with no public reception (days of rest).",
    },
    importantNote: {
      title: "Important Note",
      text: "Before visiting a specific department (such as Engineering or Collection), it is recommended to confirm the specific reception hours and service availability by phone.",
    },
  },
};

export function ReceptionHoursPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle} />

      <div className="space-y-4">
        <NumberedSection index={1} icon={MapPin} title={c.contactInfo.title}>
          <BulletList
            items={[
              <>
                <strong className="text-ink-900">{c.contactInfo.addressLabel}</strong> {c.contactInfo.addressText}
              </>,
              <>
                <strong className="text-ink-900">{c.contactInfo.switchboardLabel}</strong>{" "}
                <a href="tel:04-9569800" className="text-teal-700 hover:underline">
                  04-9569800
                </a>
              </>,
            ]}
          />
        </NumberedSection>

        <NumberedSection index={2} icon={Clock} title={c.mayorHours.title}>
          <p className="text-sm leading-6 text-ink-600">{c.mayorHours.intro}</p>
          <HoursTable rows={c.mayorHours.rows} />
          <p className="pt-2 text-xs leading-5 text-ink-600">*{c.mayorHours.note}</p>
        </NumberedSection>

        <NumberedSection index={3} icon={Building2} title={c.deptHours.title}>
          <p className="text-sm leading-6 text-ink-600">{c.deptHours.intro}</p>
          <BulletList
            items={[
              <>
                <strong className="text-ink-900">{c.deptHours.workDaysLabel}</strong> {c.deptHours.workDaysText}
              </>,
              <>
                <strong className="text-ink-900">{c.deptHours.hoursLabel}</strong> {c.deptHours.hoursText}
              </>,
            ]}
          />
          <p className="pt-2 text-sm leading-6 text-ink-600">{c.deptHours.note}</p>
        </NumberedSection>

        <NumberedSection index={4} icon={Info} title={c.importantNote.title}>
          <p className="text-sm leading-6 text-ink-600">{c.importantNote.text}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
