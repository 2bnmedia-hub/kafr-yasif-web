import { db } from "@/db";
import { auditLog } from "@/db/schema";
import { getClientIp } from "@/lib/form-rate-limit";

type AuditAction = (typeof auditLog.$inferInsert)["action"];

type LogAuditEventInput = {
  action: AuditAction;
  actorAdminId?: number | null;
  actorEmail?: string | null;
  targetType?: string;
  targetId?: string | number;
  detail?: Record<string, unknown>;
};

/**
 * Fire-and-forget by design: an audit-log write failure must never block or roll back the actual
 * action it's recording (a content save shouldn't fail because logging did) — errors are
 * swallowed after being reported to the console rather than thrown.
 */
export async function logAuditEvent(input: LogAuditEventInput): Promise<void> {
  try {
    const ip = await getClientIp();
    await db.insert(auditLog).values({
      action: input.action,
      actorAdminId: input.actorAdminId ?? null,
      actorEmail: input.actorEmail ?? null,
      targetType: input.targetType,
      targetId: input.targetId !== undefined ? String(input.targetId) : undefined,
      ip,
      detail: input.detail,
    });
  } catch (err) {
    console.error("audit log write failed:", err);
  }
}
