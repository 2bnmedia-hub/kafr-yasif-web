"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { getCurrentAdmin, getPendingMfaSession, verifyMfaAndUpgradeSession } from "@/lib/auth";
import { generateTotpSecret, getTotpEnrollmentQrDataUrl, verifyTotpCode } from "@/lib/totp";

/** Setup is reachable two ways: forced right after password login for a site-admin who hasn't
 *  enrolled yet (pending, not-yet-mfaVerified session), or opened voluntarily by an already
 *  fully-authenticated admin who wants to turn MFA on. Either is a legitimate "acting as this
 *  account" context for enrollment purposes. */
async function getActingAdminForMfaSetup() {
  const verified = await getCurrentAdmin();
  if (verified) return verified;
  const pending = await getPendingMfaSession();
  if (pending) return pending.user;
  redirect("/admin/login");
}

export async function beginTotpEnrollmentAction(): Promise<{ secret: string; qrDataUrl: string }> {
  const admin = await getActingAdminForMfaSetup();
  const secret = generateTotpSecret();
  // Stored but totpEnabled stays false until confirmTotpEnrollmentAction proves possession —
  // an unconfirmed secret can't be used to log in (the login/verify flow gates on totpEnabled).
  await db.update(adminUsers).set({ totpSecret: secret }).where(eq(adminUsers.id, admin.id));
  const qrDataUrl = await getTotpEnrollmentQrDataUrl(secret, admin.email);
  return { secret, qrDataUrl };
}

export async function confirmTotpEnrollmentAction(code: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = await getActingAdminForMfaSetup();
  const [row] = await db.select({ totpSecret: adminUsers.totpSecret }).from(adminUsers).where(eq(adminUsers.id, admin.id)).limit(1);
  if (!row?.totpSecret) {
    return { ok: false, error: "יש להתחיל בהגדרת אימות דו-שלבי לפני האישור." };
  }
  if (!verifyTotpCode(row.totpSecret, admin.email, code)) {
    return { ok: false, error: "קוד שגוי. יש לנסות שוב." };
  }
  await db.update(adminUsers).set({ totpEnabled: true }).where(eq(adminUsers.id, admin.id));

  // If this was a forced first-login enrollment, the session is still pending — upgrade it now
  // using the same code so the admin lands straight in the dashboard instead of re-entering it.
  await verifyMfaAndUpgradeSession(code);
  return { ok: true };
}

export async function verifyTotpLoginAction(code: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const ok = await verifyMfaAndUpgradeSession(code);
  return ok ? { ok: true } : { ok: false, error: "קוד שגוי או שפג תוקפו. יש לנסות שוב." };
}
