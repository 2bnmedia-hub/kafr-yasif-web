import { EventForm } from "@/components/admin/EventForm";
import { createEventAction } from "@/app/actions/admin-events";

export default function NewEventPage() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-teal-900">אירוע חדש</h2>
      <EventForm action={createEventAction} submitLabel="יצירת אירוע" />
    </div>
  );
}
