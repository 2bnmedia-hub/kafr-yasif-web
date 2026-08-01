import { NewsForm } from "@/components/admin/NewsForm";
import { NewsGalleryPanel } from "@/components/admin/NewsGalleryPanel";
import { createNewsAction } from "@/app/actions/admin-news";

export default function NewNewsPage() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-teal-900">כתבה חדשה</h2>
      <NewsForm action={createNewsAction} submitLabel="יצירת כתבה">
        <NewsGalleryPanel initialImages={[]} coverImageId={null} />
      </NewsForm>
    </div>
  );
}
