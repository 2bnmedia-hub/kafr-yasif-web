import { PageArticle, Breadcrumb, Hero, StaffCard } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type Member = { name: string; role: string; phone: string };

const CONTENT: Record<Locale, { members: Member[] }> = {
  he: {
    members: [
      { name: "עיסאם שחאדה", role: 'יו"ר המועצה', phone: "052-4263631" },
      { name: "פלאח ספייה", role: "ס. ראש המועצה", phone: "052-5224304" },
      { name: "ג'בר עווד", role: "ס. ראש המועצה", phone: "054-4417660" },
      { name: "ניקולה יאור", role: 'מ"מ מקום ר.המועצה', phone: "052-2693056" },
      { name: "ואסים בסל", role: "חבר מועצה", phone: "050-4983770" },
      { name: "נתאלי נאסר", role: "חבר מועצה", phone: "050-123456" },
      { name: "עפיף ספיה", role: "חבר מועצה", phone: "052-4679470" },
      { name: "חוסין עואד", role: "חבר מועצה", phone: "052-5026671" },
      { name: "ג'ורג' ג'ריס", role: "חבר מועצה", phone: "052-456619" },
      { name: "ניקולא כרייני", role: "חבר מועצה", phone: "052-4646072" },
      { name: "סלימאן דאוד", role: "חבר מועצה", phone: "054-7467739" },
      { name: "מרון סעיד", role: "חבר מועצה", phone: "052-5443655" },
    ],
  },
  ar: {
    members: [
      { name: "עיסאם שחאדה", role: "رئيس المجلس", phone: "052-4263631" },
      { name: "פלאח ספייה", role: "نائب رئيس المجلس", phone: "052-5224304" },
      { name: "ג'בר עווד", role: "نائب رئيس المجلس", phone: "054-4417660" },
      { name: "ניקולה יאור", role: "قائم مقام نائب رئيس المجلس", phone: "052-2693056" },
      { name: "ואסים בסל", role: "عضو مجلس", phone: "050-4983770" },
      { name: "נתאלי נאסר", role: "عضو مجلس", phone: "050-123456" },
      { name: "עפיף ספיה", role: "عضو مجلس", phone: "052-4679470" },
      { name: "חוסין עואד", role: "عضو مجلس", phone: "052-5026671" },
      { name: "ג'ורג' ג'ריס", role: "عضو مجلس", phone: "052-456619" },
      { name: "ניקולא כרייני", role: "عضو مجلس", phone: "052-4646072" },
      { name: "סלימאן דאוד", role: "عضو مجلس", phone: "054-7467739" },
      { name: "מרון סעיד", role: "عضو مجلس", phone: "052-5443655" },
    ],
  },
  en: {
    members: [
      { name: "עיסאם שחאדה", role: "Chairman of the Council", phone: "052-4263631" },
      { name: "פלאח ספייה", role: "Deputy Head of the Council", phone: "052-5224304" },
      { name: "ג'בר עווד", role: "Deputy Head of the Council", phone: "054-4417660" },
      { name: "ניקולה יאור", role: "Acting Deputy Head of the Council", phone: "052-2693056" },
      { name: "ואסים בסל", role: "Council Member", phone: "050-4983770" },
      { name: "נתאלי נאסר", role: "Council Member", phone: "050-123456" },
      { name: "עפיף ספיה", role: "Council Member", phone: "052-4679470" },
      { name: "חוסין עואד", role: "Council Member", phone: "052-5026671" },
      { name: "ג'ורג' ג'ריס", role: "Council Member", phone: "052-456619" },
      { name: "ניקולא כרייני", role: "Council Member", phone: "052-4646072" },
      { name: "סלימאן דאוד", role: "Council Member", phone: "054-7467739" },
      { name: "מרון סעיד", role: "Council Member", phone: "052-5443655" },
    ],
  },
};

export function CouncilLeadershipPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.members.map((m) => (
          <StaffCard key={m.name} {...m} />
        ))}
      </div>
    </PageArticle>
  );
}
