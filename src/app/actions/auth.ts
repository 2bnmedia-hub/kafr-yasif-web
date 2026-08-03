"use server";

import { redirect } from "next/navigation";
import { verifyLogin, createSession, destroySession, isRateLimited } from "@/lib/auth";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (await isRateLimited(email)) {
    return { status: "error", message: "יותר מדי ניסיונות התחברות כושלים. נסו שוב בעוד כמה דקות." };
  }

  const user = await verifyLogin(email, password);
  if (!user) {
    return { status: "error", message: "אימייל או סיסמה שגויים." };
  }

  await createSession(user.id, !user.totpEnabled);

  if (user.totpEnabled) {
    redirect("/admin/mfa/verify");
  }
  if (user.role === "site-admin") {
    // MFA is mandatory for site-admin (see CONTRIBUTING.md) — first login without it enrolled
    // goes straight to setup, not the dashboard.
    redirect("/admin/mfa/setup");
  }
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
