import { SectionCard, Breadcrumb, Hero, PageArticle, DocumentList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  intro: string;
  protocols: { title: string; href: string }[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    intro:
      'פרוטוקולי ישיבות המועצה הם "תיבת התהודה" של הדמוקרטיה המקומית בכפר יאסיף. הם מתעדים את כל ההחלטות, הוויכוחים וההצבעות של נבחרי הציבור, ומהווים כלי קריטי לשקיפות עבור התושבים.',
    protocols: [
      { title: "פרוטוקול ישיבת המועצה מן המניין - 19:02:2026 מס' 5-2026", href: "/documents/protocol-5-2026.pdf" },
      { title: "פרוטוקול ישיבת המועצה מן המניין - 19:02:2026 מס' 4-2026", href: "/documents/protocol-4-2026.pdf" },
      { title: "פרוטוקול ישיבת המועצה מן המניין - 27:01:2026 מס' 3-2026", href: "/documents/protocol-3-2026.pdf" },
    ],
  },
  ar: {
    intro:
      'محاضر جلسات المجلس هي "صندوق الصدى" للديمقراطية المحلية في كفر ياسيف. فهي توثّق جميع القرارات والنقاشات وعمليات التصويت لممثلي الجمهور المنتخَبين، وتشكّل أداة حاسمة للشفافية أمام السكان.',
    protocols: [
      { title: "محضر جلسة المجلس العادية - 19:02:2026 رقم 5-2026", href: "/documents/protocol-5-2026.pdf" },
      { title: "محضر جلسة المجلس العادية - 19:02:2026 رقم 4-2026", href: "/documents/protocol-4-2026.pdf" },
      { title: "محضر جلسة المجلس العادية - 27:01:2026 رقم 3-2026", href: "/documents/protocol-3-2026.pdf" },
    ],
  },
  en: {
    intro:
      'The Council meeting protocols are the "sounding board" of local democracy in Kafr Yasif. They document all the decisions, debates and votes of elected officials, and serve as a critical tool for transparency toward residents.',
    protocols: [
      { title: "Regular Council Meeting Protocol - 19/02/2026 No. 5-2026", href: "/documents/protocol-5-2026.pdf" },
      { title: "Regular Council Meeting Protocol - 19/02/2026 No. 4-2026", href: "/documents/protocol-4-2026.pdf" },
      { title: "Regular Council Meeting Protocol - 27/01/2026 No. 3-2026", href: "/documents/protocol-3-2026.pdf" },
    ],
  },
};

export function ProtocolsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.intro}</Hero>

      <SectionCard>
        <DocumentList items={c.protocols} locale={locale} />
      </SectionCard>
    </PageArticle>
  );
}
