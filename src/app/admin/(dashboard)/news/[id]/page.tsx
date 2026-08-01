import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Eye, Copy } from "lucide-react";
import { db } from "@/db";
import { news } from "@/db/schema";
import { getNewsGallery } from "@/db/queries";
import { NewsForm } from "@/components/admin/NewsForm";
import { NewsGalleryPanel } from "@/components/admin/NewsGalleryPanel";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { SavedBanner } from "@/components/admin/SavedBanner";
import { updateNewsAction, deleteNewsAction, duplicateNewsAction, togglePublishNewsAction } from "@/app/actions/admin-news";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsId = Number(id);
  const [item] = await db.select().from(news).where(eq(news.id, newsId)).limit(1);
  if (!item) notFound();

  const gallery = await getNewsGallery(newsId);
  const galleryRows = gallery.map((g) => ({
    key: g.image.id,
    mediaId: g.media.id,
    url: g.media.url,
    filename: g.media.filename,
    kind: g.media.kind,
    alt: g.image.alt,
  }));

  const boundUpdate = updateNewsAction.bind(null, newsId);
  const boundDelete = deleteNewsAction.bind(null, newsId);
  const boundDuplicate = duplicateNewsAction.bind(null, newsId);
  const boundTogglePublish = togglePublishNewsAction.bind(null, newsId, item.status === "published" ? "hidden" : "published");

  return (
    <div>
      <Suspense fallback={null}>
        <SavedBanner />
      </Suspense>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-teal-900">עריכת כתבה</h2>
          <p className="text-sm text-ink-600">{item.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/news/${item.slug}`} target="_blank" className="flex items-center gap-1.5 rounded-full bg-teal-100 px-4 py-2 text-xs font-semibold text-teal-900 hover:bg-teal-200">
            <Eye size={14} aria-hidden="true" />
            צפייה באתר
          </Link>
          <form action={boundTogglePublish}>
            <button type="submit" className="rounded-full bg-olive-500/15 px-4 py-2 text-xs font-semibold text-olive-700 hover:bg-olive-500/25">
              {item.status === "published" ? "הסרה מפרסום" : "פרסום"}
            </button>
          </form>
          <form action={boundDuplicate}>
            <button type="submit" className="flex items-center gap-1.5 rounded-full bg-gold-100 px-4 py-2 text-xs font-semibold text-gold-700 hover:bg-gold-100/70">
              <Copy size={14} aria-hidden="true" />
              שכפול
            </button>
          </form>
          <ConfirmDeleteForm action={boundDelete} confirmMessage="האם אתה בטוח שברצונך למחוק כתבה זו? הפעולה אינה הפיכה." />
        </div>
      </div>

      <div className="space-y-6">
        <NewsForm action={boundUpdate} defaultValues={item} submitLabel="שמירת שינויים" />
        <div className="max-w-3xl">
          <NewsGalleryPanel newsId={newsId} initialImages={galleryRows} coverImageId={item.coverImageId} />
        </div>
      </div>
    </div>
  );
}
