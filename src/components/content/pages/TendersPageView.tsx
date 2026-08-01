import Link from "next/link";
import Image from "next/image";
import { Gavel, Hash, Calendar, CalendarCheck } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, SectionCard } from "../premium/Shared";
import { getPublishedTenders } from "@/db/queries";
import { getServerLocale } from "@/i18n/get-locale";

type Props = {
  title: string;
};

const TENDER_STATUS_LABEL: Record<string, Record<string, string>> = {
  he: { open: "פעיל", closed: "סגור להגשה", awarded: "הוכרז זוכה", cancelled: "בוטל" },
  ar: { open: "نشط", closed: "مغلق للتقديم", awarded: "تم ترسيته", cancelled: "ملغى" },
  en: { open: "Open", closed: "Closed for submissions", awarded: "Awarded", cancelled: "Cancelled" },
};

const LABELS: Record<string, { heroBody: string; noTenders: string }> = {
  he: {
    heroBody:
      "המועצה המקומית כפר יאסיף, כרשות מקומית בישראל, כפופה לצו המועצות המקומיות (נוהל מכרזים), התשמ\"ז-1987 ולחוק חובת המכרזים. ניהול המכרזים והליך קבלת הצעות המחיר נועד להבטיח שקיפות, שוויון הזדמנויות וחיסכון בכספי הציבור.",
    noTenders: "אין כרגע מכרזים פעילים.",
  },
  ar: {
    heroBody:
      "يخضع المجلس المحلي كفر ياسيف، بصفته سلطة محلية في إسرائيل، لأمر المجالس المحلية (إجراءات المناقصات)، لسنة 1987، ولقانون إلزامية المناقصات. تهدف إدارة المناقصات وإجراءات تقديم عروض الأسعار إلى ضمان الشفافية وتكافؤ الفرص والحفاظ على أموال الجمهور.",
    noTenders: "لا توجد حالياً مناقصات نشطة.",
  },
  en: {
    heroBody:
      "The Kafr Yasif Local Council, as a local authority in Israel, is subject to the Local Councils Order (Tender Procedure), 1987, and to the Mandatory Tenders Law. The management of tenders and the price-quote submission process is intended to ensure transparency, equal opportunity and the preservation of public funds.",
    noTenders: "There are currently no active tenders.",
  },
};

function fmtDate(d: Date | null, locale: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(locale === "en" ? "en-GB" : locale === "ar" ? "ar" : "he-IL");
}

export async function TendersPageView({ title }: Props) {
  const [tenders, locale] = await Promise.all([getPublishedTenders(), getServerLocale()]);
  const statusLabels = TENDER_STATUS_LABEL[locale];
  const labels = LABELS[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{labels.heroBody}</Hero>

      {tenders.length === 0 ? (
        <SectionCard>
          <p className="text-center text-sm text-ink-600">{labels.noTenders}</p>
        </SectionCard>
      ) : (
        <div className="space-y-4">
          {tenders.map((t) => {
            const displayTitle = (locale === "ar" ? t.titleAr : locale === "en" ? t.titleEn : t.title) || t.title;
            return (
              <Link key={t.id} href={`/tenders/${t.slug}`} className="block">
                <SectionCard className="transition-shadow hover:shadow-md sm:p-6">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <h2 className="flex items-center gap-2 text-base font-bold text-teal-900">
                      {t.coverUrl ? (
                        <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-teal-100">
                          <Image src={t.coverUrl} alt="" fill sizes="36px" className="object-cover" />
                        </span>
                      ) : (
                        <Gavel size={17} className="shrink-0 text-teal-700" aria-hidden="true" />
                      )}
                      {displayTitle}
                    </h2>
                    <span className="shrink-0 rounded-full bg-teal-700/10 px-2.5 py-1 text-xs font-bold text-teal-700">
                      {statusLabels[t.tenderStatus]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-600">
                    {t.tenderNumber && (
                      <span className="flex items-center gap-1.5">
                        <Hash size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
                        {t.tenderNumber}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
                      {fmtDate(t.publishDate, locale)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarCheck size={14} className="shrink-0 text-teal-700" aria-hidden="true" />
                      {fmtDate(t.submissionDeadline, locale)}
                    </span>
                  </div>
                </SectionCard>
              </Link>
            );
          })}
        </div>
      )}
    </PageArticle>
  );
}
