import { db } from "@/db";
import { media } from "@/db/schema";
import { desc } from "drizzle-orm";
import { MediaLibraryGrid } from "@/components/admin/MediaLibraryGrid";

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q = "", type = "" } = await searchParams;
  const all = await db.select().from(media).orderBy(desc(media.createdAt));

  const filtered = all.filter((m) => {
    if (type === "images" && m.kind !== "image") return false;
    if (type === "documents" && m.kind === "image") return false;
    if (q && !m.filename.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const imageCount = all.filter((m) => m.kind === "image").length;
  const docCount = all.length - imageCount;

  return (
    <div>
      <h2 className="mb-1 text-2xl font-bold tracking-tight text-teal-900">ספריית מדיה</h2>
      <p className="mb-6 text-sm text-ink-600">
        {all.length} קבצים · {imageCount} תמונות · {docCount} מסמכים. קבצים שבשימוש בתוכן קיים לא ניתנים למחיקה — יש להסיר אותם מהתוכן קודם.
      </p>

      <form className="admin-shadow-card mb-4 flex flex-wrap gap-3 rounded-2xl bg-white p-3" method="get">
        <input type="search" name="q" defaultValue={q} placeholder="חיפוש לפי שם קובץ..." className="min-w-[240px] flex-1 rounded-lg border border-teal-100 px-3 py-2 text-sm" />
        <select name="type" defaultValue={type} className="rounded-lg border border-teal-100 px-3 py-2 text-sm">
          <option value="">כל הסוגים</option>
          <option value="images">תמונות</option>
          <option value="documents">מסמכים</option>
        </select>
        <button type="submit" className="rounded-lg bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-900 hover:bg-teal-200">סינון</button>
      </form>

      <MediaLibraryGrid items={filtered} />
    </div>
  );
}
