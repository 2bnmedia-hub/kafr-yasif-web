"use server";

import { randomBytes, createHash } from "crypto";
import { eq, and, isNull, gt } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminInvites, adminUsers } from "@/db/schema";
import { requireCapability, type AdminRole } from "@/lib/permissions";
import { validatePassword } from "@/lib/password-policy";
import { logAuditEvent } from "@/lib/audit-log";

const INVITE_TTL_MS = 72 * 60 * 60 * 1000; // 72 hours

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Creates an invite row and returns the one-time raw link. Nobody but the invitee ever sees or
 * sets their password — the site-admin who runs this shares the link themselves (Slack, email,
 * in person); the token is never emailed by the app itself, since no outbound email sender is
 * configured yet (see CONTRIBUTING.md / docs/handover-cio.md).
 */
export async function createInviteAction(email: string, role: AdminRole): Promise<{ inviteUrl: string }> {
  const admin = await requireCapability("users:manage");

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    throw new Error("כתובת דוא\"ל לא תקינה.");
  }

  const [existingUser] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, normalizedEmail)).limit(1);
  if (existingUser) {
    throw new Error("כבר קיים משתמש עם כתובת דוא\"ל זו.");
  }

  const token = randomBytes(32).toString("hex");
  await db.insert(adminInvites).values({
    email: normalizedEmail,
    role,
    tokenHash: hashToken(token),
    invitedBy: admin.id,
    expiresAt: new Date(Date.now() + INVITE_TTL_MS),
  });

  await logAuditEvent({
    action: "user_invite",
    actorAdminId: admin.id,
    actorEmail: admin.email,
    targetType: "admin_invites",
    detail: { invitedEmail: normalizedEmail, role },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return { inviteUrl: `${siteUrl}/admin/invite/${token}` };
}

export async function getInviteByToken(token: string) {
  const rows = await db
    .select()
    .from(adminInvites)
    .where(and(eq(adminInvites.tokenHash, hashToken(token)), isNull(adminInvites.usedAt), gt(adminInvites.expiresAt, new Date())))
    .limit(1);
  return rows[0] ?? null;
}

export async function acceptInviteAction(
  token: string,
  password: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const invite = await getInviteByToken(token);
  if (!invite) {
    return { ok: false, error: "ההזמנה אינה תקפה, פגה תוקפה, או שכבר נוצלה." };
  }

  const validation = await validatePassword(password);
  if (!validation.ok) {
    return { ok: false, error: validation.reason };
  }

  const [existingUser] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, invite.email)).limit(1);
  if (existingUser) {
    return { ok: false, error: "כבר קיים משתמש עם כתובת דוא\"ל זו." };
  }

  // No transaction support on the neon-http driver (stateless HTTP, not a persistent
  // connection) — sequential writes instead. The email UNIQUE constraint on admin_users is the
  // real safety net against a double-accept race: a second concurrent accept of the same invite
  // would fail cleanly on that constraint rather than creating a duplicate account.
  const passwordHash = await bcrypt.hash(password, 12);
  try {
    await db.insert(adminUsers).values({ email: invite.email, passwordHash, role: invite.role });
  } catch {
    return { ok: false, error: "כבר קיים משתמש עם כתובת דוא\"ל זו." };
  }
  await db.update(adminInvites).set({ usedAt: new Date() }).where(eq(adminInvites.id, invite.id));

  return { ok: true };
}
