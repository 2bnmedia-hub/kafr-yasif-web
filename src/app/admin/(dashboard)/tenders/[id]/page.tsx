import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Eye, Copy } from "lucide-react";
import { getTenderById, getTenderDocuments } from "@/db/queries";
import { TenderForm } from "@/components/admin/TenderForm";
import { TenderDocumentsPanel } from "@/components/admin/TenderDocumentsPanel";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { SavedBanner } from "@/components/admin/SavedBanner";
import {
  updateTenderAction,
  deleteTenderAction,
  duplicateTenderAction,
  togglePublishTenderAction,
} from "@/app/actions/admin-tenders";

export default async function EditTenderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenderId = Number(id);
  const tender = await getTenderById(tenderId);
  if (!tender) notFound();

  const docsRaw = await getTenderDocuments(tenderId);
  const docs = docsRaw.map((d) => ({
    key: d.doc.id,
    mediaId: d.media.id,
    url: d.media.url,
    filename: d.media.filename,
    kind: d.media.kind,
    name: d.doc.name,
    description: d.doc.description,
    sizeBytes: d.media.sizeBytes,
  }));
  const boundUpdate = updateTenderAction.bind(null, tenderId);
  const boundDelete = deleteTenderAction.bind(null, tenderId);
  const boundDuplicate = duplicateTenderAction.bind(null, tenderId);
  const boundTogglePublish = togglePublishTenderAction.bind(null, tenderId, tender.status === "published" ? "hidden" : "published");

  return (
    <div>
      <Suspense fallback={null}>
        <SavedBanner />
      </Suspense>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-teal-900">עריכת מכרז</h2>
          <p className="text-sm text-ink-600">{tender.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/tenders/${tender.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-teal-100 px-4 py-2 text-xs font-semibold text-teal-900 hover:bg-teal-200"
          >
            <Eye size={14} aria-hidden="true" />
            צפייה באתר
          </Link>
          <form action={boundTogglePublish}>
            <button type="submit" className="rounded-full bg-olive-500/15 px-4 py-2 text-xs font-semibold text-olive-700 hover:bg-olive-500/25">
              {tender.status === "published" ? "הסרה מפרסום" : "פרסום"}
            </button>
          </form>
          <form action={boundDuplicate}>
            <button type="submit" className="flex items-center gap-1.5 rounded-full bg-gold-100 px-4 py-2 text-xs font-semibold text-gold-700 hover:bg-gold-100/70">
              <Copy size={14} aria-hidden="true" />
              שכפול
            </button>
          </form>
          <ConfirmDeleteForm action={boundDelete} confirmMessage="האם אתה בטוח שברצונך למחוק מכרז זה? הפעולה אינה הפיכה." />
        </div>
      </div>

      <div className="space-y-6">
        <TenderForm action={boundUpdate} defaultValues={tender} submitLabel="שמירת שינויים" />
        <div className="max-w-3xl">
          <TenderDocumentsPanel tenderId={tenderId} initialDocs={docs} coverImageId={tender.coverImageId} />
        </div>
      </div>
    </div>
  );
}
