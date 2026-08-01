import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Eye, Copy } from "lucide-react";
import { db } from "@/db";
import { events } from "@/db/schema";
import { getEventGallery } from "@/db/queries";
import { EventForm } from "@/components/admin/EventForm";
import { EventGalleryPanel } from "@/components/admin/EventGalleryPanel";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { SavedBanner } from "@/components/admin/SavedBanner";
import { updateEventAction, deleteEventAction, duplicateEventAction, togglePublishEventAction } from "@/app/actions/admin-events";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eventId = Number(id);
  const [item] = await db.select().from(events).where(eq(events.id, eventId)).limit(1);
  if (!item) notFound();

  const gallery = await getEventGallery(eventId);
  const galleryRows = gallery.map((g) => ({
    image: { id: g.image.id, alt: g.image.alt },
    media: { id: g.media.id, url: g.media.url },
  }));

  const boundUpdate = updateEventAction.bind(null, eventId);
  const boundDelete = deleteEventAction.bind(null, eventId);
  const boundDuplicate = duplicateEventAction.bind(null, eventId);
  const boundTogglePublish = togglePublishEventAction.bind(null, eventId, item.status === "published" ? "hidden" : "published");

  return (
    <div>
      <Suspense fallback={null}>
        <SavedBanner />
      </Suspense>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-teal-900">עריכת אירוע</h2>
          <p className="text-sm text-ink-600">{item.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {item.slug && (
            <Link href={`/events/${item.slug}`} target="_blank" className="flex items-center gap-1.5 rounded-full bg-teal-100 px-4 py-2 text-xs font-semibold text-teal-900 hover:bg-teal-200">
              <Eye size={14} aria-hidden="true" />
              צפייה באתר
            </Link>
          )}
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
          <ConfirmDeleteForm action={boundDelete} confirmMessage="האם אתה בטוח שברצונך למחוק אירוע זה? הפעולה אינה הפיכה." />
        </div>
      </div>

      <div className="space-y-6">
        <EventForm action={boundUpdate} defaultValues={item} submitLabel="שמירת שינויים" />
        <div className="max-w-3xl">
          <EventGalleryPanel eventId={eventId} initialImages={galleryRows} coverImageId={item.imageId} />
        </div>
      </div>
    </div>
  );
}
