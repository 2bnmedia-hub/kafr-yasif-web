import { Link as LinkIcon, Landmark, GraduationCap, ExternalLink } from "lucide-react";
import { PageArticle, Hero, NumberedSection } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type PaymentLink = { label: string; href?: string };
type PaymentSection = { icon: typeof Landmark; title: string; items: PaymentLink[] };

type LocaleContent = {
  subtitle: string;
  payLabel: string;
  comingSoonLabel: string;
  sections: PaymentSection[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "מועצה מקומית כפר יאסיף",
    payLabel: "לתשלום",
    comingSoonLabel: "בקרוב",
    sections: [
      {
        icon: Landmark,
        title: "ארנונה",
        items: [
          { label: "תשלום ארנונה", href: "https://city4u.co.il/PortalServicesSite/cityPay/905070/mislaka/1" },
        ],
      },
      {
        icon: GraduationCap,
        title: "חינוך",
        items: [
          { label: "אגרת תלמידי חוץ", href: "https://www.paykal.co.il/kafr-yasif/product/foreign-student-fee/" },
          { label: "ניצנים – מסגרת צהרונים", href: "https://www.paykal.co.il/kafr-yasif/product/tzahrronim/" },
          { label: "ניצנים בחופשות – חופשת חורף", href: "https://www.paykal.co.il/kafr-yasif/product/nitzanimholiday/" },
          {
            label: "ניצנים בחופשות – אביב",
            href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page",
          },
          { label: "תשלומי הורים – ביטוח גני ילדים", href: "https://www.paykal.co.il/kafr-yasif/product/hofeshgadol/" },
          {
            label: "תשלומי הורים – בית הספר של החופש הגדול",
            href: "https://www.paykal.co.il/kafr-yasif/product/hofeshgadol/",
          },
        ],
      },
    ],
  },
  ar: {
    subtitle: "المجلس المحلي كفر ياسيف",
    payLabel: "للدفع",
    comingSoonLabel: "قريباً",
    sections: [
      {
        icon: Landmark,
        title: "ضريبة الأملاك (الأرنونا)",
        items: [
          { label: "دفع ضريبة الأملاك (الأرنونا)", href: "https://city4u.co.il/PortalServicesSite/cityPay/905070/mislaka/1" },
        ],
      },
      {
        icon: GraduationCap,
        title: "التعليم",
        items: [
          { label: "رسم الطلاب من خارج البلدة", href: "https://www.paykal.co.il/kafr-yasif/product/foreign-student-fee/" },
          { label: "نيتسانيم – إطار الرعاية بعد الظهر (تسهرونيم)", href: "https://www.paykal.co.il/kafr-yasif/product/tzahrronim/" },
          { label: "نيتسانيم في العطلات – عطلة الشتاء", href: "https://www.paykal.co.il/kafr-yasif/product/nitzanimholiday/" },
          {
            label: "نيتسانيم في العطلات – عطلة الربيع",
            href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page",
          },
          { label: "مدفوعات الأولياء – تأمين رياض الأطفال", href: "https://www.paykal.co.il/kafr-yasif/product/hofeshgadol/" },
          {
            label: "مدفوعات الأولياء – مدرسة العطلة الصيفية الكبرى",
            href: "https://www.paykal.co.il/kafr-yasif/product/hofeshgadol/",
          },
        ],
      },
    ],
  },
  en: {
    subtitle: "Kafr Yasif Local Council",
    payLabel: "Pay Now",
    comingSoonLabel: "Coming Soon",
    sections: [
      {
        icon: Landmark,
        title: "Property Tax (Arnona)",
        items: [
          { label: "Property Tax Payment", href: "https://city4u.co.il/PortalServicesSite/cityPay/905070/mislaka/1" },
        ],
      },
      {
        icon: GraduationCap,
        title: "Education",
        items: [
          { label: "Out-of-Town Student Fee", href: "https://www.paykal.co.il/kafr-yasif/product/foreign-student-fee/" },
          { label: "Nitzanim – Afternoon Care Program", href: "https://www.paykal.co.il/kafr-yasif/product/tzahrronim/" },
          { label: "Nitzanim Holiday Program – Winter Break", href: "https://www.paykal.co.il/kafr-yasif/product/nitzanimholiday/" },
          {
            label: "Nitzanim Holiday Program – Spring Break",
            href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page",
          },
          { label: "Parent Payments – Kindergarten Insurance", href: "https://www.paykal.co.il/kafr-yasif/product/hofeshgadol/" },
          {
            label: "Parent Payments – Summer Break School",
            href: "https://www.paykal.co.il/kafr-yasif/product/hofeshgadol/",
          },
        ],
      },
    ],
  },
};

function PaymentLinkList({ items, payLabel, comingSoonLabel }: { items: PaymentLink[]; payLabel: string; comingSoonLabel: string }) {
  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl ring-1 ring-zinc-100">
      {items.map((it) => (
        <li key={it.label} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
          <span className="flex items-center gap-2 text-sm font-medium text-ink-900">
            <LinkIcon size={16} className="shrink-0 text-teal-700" aria-hidden="true" />
            {it.label}
          </span>
          {it.href ? (
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-teal-700 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-800"
            >
              <ExternalLink size={14} aria-hidden="true" />
              {payLabel}
            </a>
          ) : (
            <span className="shrink-0 rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-medium text-ink-600">
              {comingSoonLabel}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function PaymentsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Hero title={title} subtitle={c.subtitle} />

      <div className="space-y-4">
        {c.sections.map((section, i) => (
          <NumberedSection key={section.title} index={i + 1} icon={section.icon} title={section.title}>
            <PaymentLinkList items={section.items} payLabel={c.payLabel} comingSoonLabel={c.comingSoonLabel} />
          </NumberedSection>
        ))}
      </div>
    </PageArticle>
  );
}
