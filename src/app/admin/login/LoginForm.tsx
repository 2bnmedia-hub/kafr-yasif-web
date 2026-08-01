"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-900">
          אימייל
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-teal-100 bg-cream-50/60 px-4 py-2.5 text-ink-900 transition-colors focus:border-teal-500 focus:bg-white"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink-900">
          סיסמה
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-teal-100 bg-cream-50/60 px-4 py-2.5 text-ink-900 transition-colors focus:border-teal-500 focus:bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="admin-shadow-card w-full rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-800 hover:shadow-lg disabled:opacity-60"
      >
        {pending ? "מתחבר..." : "התחברות"}
      </button>
      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {state.message}
        </p>
      )}
    </form>
  );
}
