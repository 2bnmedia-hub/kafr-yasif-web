import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { PageContentForm } from "@/components/admin/PageContentForm";
import { updatePageAction, deletePageAction } from "@/app/actions/admin-pages";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNum = Number(id);
  const rows = await db.select().from(pages).where(eq(pages.id, idNum)).limit(1);
  const page = rows[0];
  if (!page) notFound();

  const boundUpdate = updatePageAction.bind(null, page.id);
  const boundDelete = deletePageAction.bind(null, page.id);

  return (
    <div className="max-w-3xl">
      <h2 className="mb-1 text-xl font-bold text-teal-900">עריכת עמוד</h2>
      <p className="mb-6 text-sm text-ink-600">/{page.slug}</p>

      <PageContentForm action={boundUpdate} defaultValues={page} />

      <form action={boundDelete} className="mt-4">
        <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
          מחיקת עמוד
        </button>
      </form>
    </div>
  );
}
