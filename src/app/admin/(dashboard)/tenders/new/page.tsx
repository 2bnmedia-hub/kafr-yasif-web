import { TenderForm } from "@/components/admin/TenderForm";
import { TenderDocumentsPanel } from "@/components/admin/TenderDocumentsPanel";
import { createTenderAction } from "@/app/actions/admin-tenders";

export default function NewTenderPage() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-teal-900">מכרז חדש</h2>
      <TenderForm action={createTenderAction} submitLabel="יצירת מכרז">
        <TenderDocumentsPanel initialDocs={[]} coverImageId={null} />
      </TenderForm>
    </div>
  );
}
