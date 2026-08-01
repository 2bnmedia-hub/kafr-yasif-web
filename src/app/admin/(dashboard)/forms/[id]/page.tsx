import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Eye } from "lucide-react";
import { getFormById } from "@/db/queries";
import { FormForm } from "@/components/admin/FormForm";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { SavedBanner } from "@/components/admin/SavedBanner";
import { updateFormAction, deleteFormAction } from "@/app/actions/admin-forms";

export default async function EditFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const formId = Number(id);
  const form = await getFormById(formId);
  if (!form) notFound();

  const boundUpdate = updateFormAction.bind(null, formId);
  const boundDelete = deleteFormAction.bind(null, formId);

  return (
    <div>
      <Suspense fallback={null}>
        <SavedBanner />
      </Suspense>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-teal-900">עריכת טופס</h2>
          <p className="text-sm text-ink-600">{form.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/טפסים"
            target="_blank"
            className="flex items-center gap-1.5 rounded-full bg-teal-100 px-4 py-2 text-xs font-semibold text-teal-900 hover:bg-teal-200"
          >
            <Eye size={14} aria-hidden="true" />
            צפייה באתר
          </Link>
          <ConfirmDeleteForm action={boundDelete} confirmMessage="האם אתה בטוח שברצונך למחוק טופס זה? הפעולה אינה הפיכה." />
        </div>
      </div>

      <FormForm
        action={boundUpdate}
        submitLabel="שמירת שינויים"
        defaultValues={{
          title: form.title,
          titleAr: form.titleAr,
          titleEn: form.titleEn,
          mediaId: form.mediaId,
          externalUrl: form.externalUrl,
          currentFileName: form.fileName,
          currentFileUrl: form.fileUrl,
        }}
      />
    </div>
  );
}
