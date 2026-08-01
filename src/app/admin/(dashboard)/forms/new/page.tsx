import { FormForm } from "@/components/admin/FormForm";
import { createFormAction } from "@/app/actions/admin-forms";

export default function NewFormPage() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-teal-900">טופס חדש</h2>
      <FormForm action={createFormAction} submitLabel="יצירת טופס" />
    </div>
  );
}
