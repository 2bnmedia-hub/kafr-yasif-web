import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hash, Calendar, CalendarCheck, Phone, FileText, Download } from "lucide-react";
import { getTenderBySlug, getTenderDocuments, incrementTenderViews } from "@/db/queries";
import { getServerLocale } from "@/i18n/get-locale";
import { PageArticle, Breadcrumb, Hero, SectionCard } from "@/components/content/premium/Shared";
import { ImageLightboxGrid } from "@/components/content/ImageLightboxGrid";

export const revalidate = 3600;

const TENDER_STATUS_LABEL: Record<string, Record<string, string>> = {
  he: { open: "פעיל", closed: "סגור להגשה", awarded: "הוכרז זוכה", cancelled: "בוטל" },
  ar: { open: "نشط", closed: "مغلق للتقديم", awarded: "تم ترسيته", cancelled: "ملغى" },
  en: { open: "Open", closed: "Closed for submissions", awarded: "Awarded", cancelled: "Cancelled" },
};

const LABELS: Record<string, Record<string, string>> = {
  he: { number: "מספר מכרז", published: "תאריך פרסום", deadline: "מועד אחרון להגשה", contact: "פרטי קשר", documents: "מסמכים מצורפים", noDocuments: "לא צורפו מסמכים למכרז זה.", download: "הורדה" },
  ar: { number: "رقم المناقصة", published: "تاريخ النشر", deadline: "الموعد النهائي للتقديم", contact: "معلومات التواصل", documents: "المستندات المرفقة", noDocuments: "لم يتم إرفاق مستندات لهذه المناقصة.", download: "تحميل" },
  en: { number: "Tender number", published: "Publish date", deadline: "Submission deadline", contact: "Contact information", documents: "Attached documents", noDocuments: "No documents attached to this tender.", download: "Download" },
};

function fmtDate(d: Date | null, locale: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(locale === "en" ? "en-GB" : locale === "ar" ? "ar" : "he-IL");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tender = await getTenderBySlug(decodeURIComponent(slug));
  if (!tender) return {};
  return {
    title: tender.metaTitle || tender.title,
    description: tender.metaDescription || tender.shortDescription || undefined,
    alternates: { canonical: `/tenders/${tender.slug}` },
    openGraph: {
      title: tender.metaTitle || tender.title,
      description: tender.metaDescription || tender.shortDescription || undefined,
      images: tender.ogImageUrl ? [tender.ogImageUrl] : undefined,
    },
  };
}

export default async function TenderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tender = await getTenderBySlug(decodeURIComponent(slug));
  if (!tender || (tender.status !== "published" && tender.status !== "scheduled")) notFound();
  if (tender.status === "published") await incrementTenderViews(tender.id);

  const [docsRaw, locale] = await Promise.all([getTenderDocuments(tender.id), getServerLocale()]);
  const docs = docsRaw.filter((d) => d.media.kind !== "image");
  const images = docsRaw.filter((d) => d.media.kind === "image").map((d) => ({ url: d.media.url, alt: d.doc.name }));
  const statusLabels = TENDER_STATUS_LABEL[locale];
  const l = LABELS[locale];

  const displayTitle = (locale === "ar" ? tender.titleAr : locale === "en" ? tender.titleEn : tender.title) || tender.title;
  const displayBody = (locale === "ar" ? tender.bodyHtmlAr : locale === "en" ? tender.bodyHtmlEn : tender.bodyHtml) || tender.bodyHtml;

  return (
    <PageArticle>
      <Breadcrumb title={displayTitle} />

      <Hero title={displayTitle}>
        <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-bold">
          {statusLabels[tender.tenderStatus]}
        </span>
      </Hero>

      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-600">
        {tender.tenderNumber && (
          <span className="flex items-center gap-1.5">
            <Hash size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
            {l.number}: {tender.tenderNumber}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Calendar size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
          {l.published}: {fmtDate(tender.publishDate, locale)}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarCheck size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
          {l.deadline}: {fmtDate(tender.submissionDeadline, locale)}
        </span>
      </div>

      {displayBody && (
        <SectionCard className="mb-6">
          <div className="rte-render" dangerouslySetInnerHTML={{ __html: displayBody }} />
        </SectionCard>
      )}

      {tender.contactInfo && (
        <SectionCard className="mb-6">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-teal-900">
            <Phone size={16} className="text-teal-700" aria-hidden="true" />
            {l.contact}
          </h2>
          <p className="text-sm leading-6 text-ink-600">{tender.contactInfo}</p>
        </SectionCard>
      )}

      <SectionCard>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-teal-900">
          <FileText size={16} className="text-teal-700" aria-hidden="true" />
          {l.documents}
        </h2>
        {docs.length === 0 ? (
          <p className="text-sm text-ink-600">{l.noDocuments}</p>
        ) : (
          <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl ring-1 ring-zinc-100">
            {docs.map(({ doc, media }) => (
              <li key={doc.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="shrink-0 text-teal-700" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink-900">{doc.name}</p>
                    {doc.description && <p className="text-xs text-ink-600">{doc.description}</p>}
                  </div>
                </div>
                <a
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-teal-700 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  <Download size={14} aria-hidden="true" />
                  {l.download}
                </a>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {images.length > 0 && <ImageLightboxGrid images={images} />}
    </PageArticle>
  );
}
