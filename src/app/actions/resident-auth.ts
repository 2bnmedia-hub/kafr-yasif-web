"use server";

import { createResident, createResidentSession, isResidentRateLimited, verifyResidentLogin } from "@/lib/resident-auth";

export type AuthActionState = { error: string } | { success: true } | null;

export async function registerResidentAction(_prev: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) return { error: "יש למלא את כל השדות." };
  if (password.length < 6) return { error: "הסיסמה חייבת להכיל לפחות 6 תווים." };

  const result = await createResident(name, email, password);
  if ("error" in result) return { error: result.error };

  await createResidentSession(result.resident.id);
  return { success: true };
}

export async function loginResidentAction(_prev: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "יש למלא את כל השדות." };

  if (await isResidentRateLimited(email)) {
    return { error: "יותר מדי ניסיונות כניסה. יש לנסות שוב בעוד כמה דקות." };
  }

  const resident = await verifyResidentLogin(email, password);
  if (!resident) return { error: "דוא\"ל או סיסמה שגויים." };

  await createResidentSession(resident.id);
  return { success: true };
}
