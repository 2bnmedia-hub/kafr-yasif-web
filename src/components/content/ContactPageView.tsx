import { MapPin, Phone, Mail, Clock, FileText, ListChecks, ClipboardCheck } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, SectionCard, IconBadge, HoursTable } from "./premium/Shared";

type Props = {
  title: string;
};

const channels = [
  {
    icon: MapPin,
    label: "כתובת למשלוח דואר",
    value: "מועצה מקומית כפר יאסיף, ת.ד. 994, מיקוד 2490800",
    href: undefined,
  },
  {
    icon: Phone,
    label: "טלפון מרכזי",
    value: "04-9569800",
    href: "tel:04-9569800",
  },
  {
    icon: Mail,
    label: "דואר אלקטרוני",
    value: "info@kafr-yasif.muni.il",
    href: "mailto:info@kafr-yasif.muni.il",
  },
];

const hours = [
  { days: "ימי ב׳ – ה׳", hours: "08:30 – 15:00", note: "קבלת קהל בתיאום מראש", open: true },
  { days: "יום ו׳", hours: null, note: "סגור (אין קבלת קהל)", open: false },
  { days: "יום שבת", hours: "08:30 – 15:00", note: "קבלת קהל כסדרה", open: true },
  { days: "יום א׳", hours: null, note: "סגור (אין קבלת קהל)", open: false },
];

const guidelines = [
  {
    icon: ClipboardCheck,
    title: "תיעוד הפנייה",
    text: 'בשליחת דוא"ל, חובה לציין שם מלא, תעודת זהות, מספר טלפון לחזרה ונושא ברור בקו ה"נדון".',
  },
  {
    icon: FileText,
    title: "פירוט ובקשה",
    text: "תארו את מהות הפנייה בקצרה ובצורה עניינית.",
  },
  {
    icon: ListChecks,
    title: "תהליך הטיפול",
    text: "כל פנייה נרשמת במערכת הממוחשבת ומטופלת על ידי הגורם המקצועי הרלוונטי. סטטוס הטיפול יימסר לפונה בהתאם לצורך.",
  },
];

export function ContactPageView({ title }: Props) {
  return (
    <PageArticle>
      <Breadcrumb title={title} />

      <Hero title={title} subtitle="מרכז שירות וקשר לתושב - מועצה מקומית כפר יאסיף">
        מועצת כפר יאסיף מחויבת למתן מענה מקצועי, מהיר ושקוף לכל פנייה. אנו מעמידים לרשותכם מגוון
        ערוצים ליצירת קשר, כדי להבטיח שתקבלו את השירות הטוב ביותר.
      </Hero>

      <div className="space-y-6">
        <div>
          <p className="mb-4 text-base leading-7 text-ink-600">
            לפניות כלליות, בקשות מידע או הצעות לייעול, ניתן לפנות אלינו בערוצים הבאים:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {channels.map((c) => (
              <SectionCard key={c.label}>
                <IconBadge icon={c.icon} />
                <h2 className="mb-1 text-sm font-bold text-teal-900">{c.label}</h2>
                {c.href ? (
                  <a href={c.href} className="text-sm leading-6 text-ink-600 hover:text-teal-700 hover:underline">
                    {c.value}
                  </a>
                ) : (
                  <p className="text-sm leading-6 text-ink-600">{c.value}</p>
                )}
              </SectionCard>
            ))}
          </div>
        </div>

        <SectionCard>
          <div className="mb-5 flex items-center gap-2">
            <Clock size={20} className="text-teal-700" aria-hidden="true" />
            <h2 className="text-xl font-bold text-teal-900">שעות פעילות וקבלת קהל</h2>
          </div>
          <h3 className="mb-2 font-semibold text-teal-900">
            מועצה מקומית כפר יאסיף – לשירותכם תמיד!
          </h3>
          <p className="mb-5 leading-7 text-ink-600">
            כחלק משיפור השירות והרצון להעניק לכל תושב ותושבת יחס אישי ומקצועי ללא המתנה מיותרת,
            קבלת הקהל באגפי המועצה מתבצעת בתיאום מראש בלבד.
          </p>
          <HoursTable rows={hours} />
        </SectionCard>

        <SectionCard>
          <h2 className="mb-1 text-xl font-bold text-teal-900">הנחיות חשובות לפונים (אמנת השירות)</h2>
          <p className="mb-5 leading-7 text-ink-600">
            כדי שנוכל להעניק לכם את הטיפול המהיר ביותר, אנא פעלו לפי ההנחיות הבאות:
          </p>
          <div className="space-y-4">
            {guidelines.map((g, i) => (
              <div key={g.title} className="flex gap-4 rounded-xl bg-cream-50 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700/10 font-bold text-teal-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-1 flex items-center gap-1.5 font-semibold text-teal-900">
                    <g.icon size={16} className="text-teal-700" aria-hidden="true" />
                    {g.title}
                  </h3>
                  <p className="text-sm leading-6 text-ink-600">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageArticle>
  );
}
