import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPageSlugs, getPageBySlug } from "@/db/queries";
import { getServerLocale } from "@/i18n/get-locale";
import type { Locale } from "@/i18n/config";
import { ContentPageView } from "@/components/content/ContentPageView";
import { ContactPageView } from "@/components/content/ContactPageView";
import { NiceToMeetPageView } from "@/components/content/pages/NiceToMeetPageView";
import { AboutCouncilPageView } from "@/components/content/pages/AboutCouncilPageView";
import { HistoryPageView } from "@/components/content/pages/HistoryPageView";
import { VisionPageView } from "@/components/content/pages/VisionPageView";
import { BylawsPageView } from "@/components/content/pages/BylawsPageView";
import { OfficeOfMayorPageView } from "@/components/content/pages/OfficeOfMayorPageView";
import { SecretariatPageView } from "@/components/content/pages/SecretariatPageView";
import { CouncilLeadershipPageView } from "@/components/content/pages/CouncilLeadershipPageView";
import { ComptrollerPageView } from "@/components/content/pages/ComptrollerPageView";
import { EngineeringPageView } from "@/components/content/pages/EngineeringPageView";
import { TreasuryPageView } from "@/components/content/pages/TreasuryPageView";
import { PropertyTaxPageView } from "@/components/content/pages/PropertyTaxPageView";
import { EducationPageView } from "@/components/content/pages/EducationPageView";
import { FreedomOfInformationPageView } from "@/components/content/pages/FreedomOfInformationPageView";
import { SanitationPageView } from "@/components/content/pages/SanitationPageView";
import { ProcurementPageView } from "@/components/content/pages/ProcurementPageView";
import { LegalPageView } from "@/components/content/pages/LegalPageView";
import { PsychologicalServicePageView } from "@/components/content/pages/PsychologicalServicePageView";
import { YouthUnitPageView } from "@/components/content/pages/YouthUnitPageView";
import { YoungAdultsPageView } from "@/components/content/pages/YoungAdultsPageView";
import { SportsPageView } from "@/components/content/pages/SportsPageView";
import { LocalPolicingPageView } from "@/components/content/pages/LocalPolicingPageView";
import { CommunitySecurityPageView } from "@/components/content/pages/CommunitySecurityPageView";
import { WelfarePageView } from "@/components/content/pages/WelfarePageView";
import { EmergencySecurityPageView } from "@/components/content/pages/EmergencySecurityPageView";
import { HomeFrontCommandPageView } from "@/components/content/pages/HomeFrontCommandPageView";
import { EmergencyGuidePageView } from "@/components/content/pages/EmergencyGuidePageView";
import { OrgChartPageView } from "@/components/content/pages/OrgChartPageView";
import { TendersPageView } from "@/components/content/pages/TendersPageView";
import { FormsPageView } from "@/components/content/pages/FormsPageView";
import { PaymentsPageView } from "@/components/content/pages/PaymentsPageView";
import { ReceptionHoursPageView } from "@/components/content/pages/ReceptionHoursPageView";
import { PublicInquiriesPageView } from "@/components/content/pages/PublicInquiriesPageView";
import { ResidentCertificatePageView } from "@/components/content/pages/ResidentCertificatePageView";
import { PublicComplaintsPageView } from "@/components/content/pages/PublicComplaintsPageView";
import { ProtocolsPageView } from "@/components/content/pages/ProtocolsPageView";
import { GovernmentReportsPageView } from "@/components/content/pages/GovernmentReportsPageView";
import { PropertyTaxOrdersPageView } from "@/components/content/pages/PropertyTaxOrdersPageView";
import { ImportantLinksPageView } from "@/components/content/pages/ImportantLinksPageView";
import { FinancialReportsPageView } from "@/components/content/pages/FinancialReportsPageView";

// Slugs with a bespoke premium-designed page instead of the generic content template.
const CUSTOM_PAGES: Record<
  string,
  (props: { title: string; locale: Locale }) => React.ReactElement | Promise<React.ReactElement>
> = {
  "צור-קשר": ContactPageView,
  "נעים-להכיר": NiceToMeetPageView,
  "על-המועצה": AboutCouncilPageView,
  "קצת-היסטוריה": HistoryPageView,
  "חזון-המועצה": VisionPageView,
  "חוקי-עזר": BylawsPageView,
  "לשכת-ראש-המועצה": OfficeOfMayorPageView,
  "מנכל-ומזכירות": SecretariatPageView,
  "מזכירות": SecretariatPageView,
  "הנהלת-המועצה": CouncilLeadershipPageView,
  "מבקר-המועצה": ComptrollerPageView,
  "הנדסה-תשתיות-ופיתוח": EngineeringPageView,
  "גזברות-וגביה": TreasuryPageView,
  "ארנונה": PropertyTaxPageView,
  "חינוך": EducationPageView,
  "חופש-המידע": FreedomOfInformationPageView,
  "תברואה-ורישוי-עסקים": SanitationPageView,
  "רכש": ProcurementPageView,
  "מחלקה-משפטית": LegalPageView,
  "שירות-פסיכולוגי": PsychologicalServicePageView,
  "יחידת-הנוער": YouthUnitPageView,
  "מחלקת-מרכז-צעירים": YoungAdultsPageView,
  "ספורט": SportsPageView,
  "שיטור-מקומי": LocalPolicingPageView,
  "ביטחון-קהילתי": CommunitySecurityPageView,
  "רווחה": WelfarePageView,
  "אגף-חירום-וביטחון": EmergencySecurityPageView,
  "הנחיות-ופקודות-פיקוד-העורף": HomeFrontCommandPageView,
  "חומר-הסברה-לשעת-חירום": EmergencyGuidePageView,
  "המבנה-הארגוני": OrgChartPageView,
  "מכרזים": TendersPageView,
  "טפסים": FormsPageView,
  "לתשלומים": PaymentsPageView,
  "שעות-קבלה": ReceptionHoursPageView,
  "פניות-הציבור": PublicInquiriesPageView,
  "אישור-תושב": ResidentCertificatePageView,
  "תלונות-הציבור": PublicComplaintsPageView,
  "פרוטוקולי-ישיבות-המועצה": ProtocolsPageView,
  "דוחות-ממשלתיים": GovernmentReportsPageView,
  "צווי-ארנונה": PropertyTaxOrdersPageView,
  "קישורים-חשובים": ImportantLinksPageView,
  "דוחות-כספיים": FinancialReportsPageView,
};

// Pages are DB-backed (CMS-managed); revalidate periodically and instantly on admin save via revalidatePath.
export const revalidate = 3600;

// Next's router already decodes the raw route param before we see it; this second decode only
// matters for a slug that legitimately contains a literal "%" (e.g. "50%-הנחה"), where
// decodeURIComponent can throw "URI malformed". Never let a bad param crash the route — treat it
// as an unknown slug instead. Proxy (src/proxy.ts) is the primary guard against malformed raw
// request URLs; this is a second, cheap layer in case a route is ever reached without it.
function safeDecodeSlug(rawSlug: string): string | null {
  try {
    return decodeURIComponent(rawSlug);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = safeDecodeSlug(slug);
  if (decodedSlug === null) return {};

  const [page, locale] = await Promise.all([getPageBySlug(decodedSlug), getServerLocale()]);
  if (!page) return {};

  const title = (locale === "ar" ? page.titleAr : locale === "en" ? page.titleEn : page.title) || page.title;
  const description =
    (locale === "ar" ? page.metaDescriptionAr : locale === "en" ? page.metaDescriptionEn : page.metaDescription) ||
    page.metaDescription ||
    undefined;

  return {
    title,
    description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title,
      description,
      images: page.images[0] ? [page.images[0]] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = safeDecodeSlug(slug);
  if (decodedSlug === null) notFound();

  const [page, locale] = await Promise.all([getPageBySlug(decodedSlug), getServerLocale()]);
  if (!page || !page.published) notFound();

  const Custom = CUSTOM_PAGES[page.slug];
  if (Custom) return <Custom title={page.title} locale={locale} />;

  return <ContentPageView page={page} locale={locale} />;
}
