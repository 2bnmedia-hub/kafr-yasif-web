import { db } from "@/db";
import { formSubmissions } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireCapabilityOrRedirect } from "@/lib/permissions";
import { logAuditEvent } from "@/lib/audit-log";

type Attachment = { pathname: string; originalName: string; mimeType: string; sizeBytes: number };

function isAttachment(value: unknown): value is Attachment {
  return typeof value === "object" && value !== null && "pathname" in value && "originalName" in value;
}

export default async function AdminSubmissionsPage() {
  const admin = await requireCapabilityOrRedirect("submissions:view");
  const rows = await db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt));
  await logAuditEvent({
    action: "submission_view",
    actorAdminId: admin.id,
    actorEmail: admin.email,
    targetType: "form_submissions",
    detail: { viewedCount: rows.length },
  });

  return (
    <div>
      <h2 className="mb-1 text-2xl font-bold tracking-tight text-teal-900">פניות שהתקבלו דרך האתר</h2>
      <p className="mb-6 text-sm text-ink-600">{rows.length} פניות</p>
      <div className="space-y-3">
        {rows.map((s) => {
          const data = s.data as Record<string, unknown>;
          return (
            <div key={s.id} className="admin-shadow-card rounded-2xl bg-white p-4 text-sm">
              <div className="mb-1 flex items-center justify-between text-ink-600">
                <span className="font-medium text-teal-900">{s.formType}</span>
                <time>{new Date(s.createdAt).toLocaleString("he-IL")}</time>
              </div>
              <dl className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {Object.entries(data).map(([key, value]) => {
                  if (value === null) return null;
                  if (isAttachment(value)) {
                    return (
                      <div key={key}>
                        <dt className="inline font-medium text-ink-900">קובץ מצורף: </dt>
                        <dd className="inline">
                          <a
                            href={`/api/admin/submissions/download?pathname=${encodeURIComponent(value.pathname)}`}
                            className="text-teal-700 underline underline-offset-2 hover:text-teal-900"
                          >
                            {value.originalName}
                          </a>
                        </dd>
                      </div>
                    );
                  }
                  return (
                    <div key={key}>
                      <dt className="inline font-medium text-ink-900">{key}: </dt>
                      <dd className="inline text-ink-600">{String(value)}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
        {rows.length === 0 && <p className="text-sm text-ink-600">עדיין לא התקבלו פניות.</p>}
      </div>
    </div>
  );
}
