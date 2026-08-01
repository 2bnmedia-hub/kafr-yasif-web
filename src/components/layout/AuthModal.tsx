"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { X, LogIn, UserPlus, Mail, Lock, User as UserIcon, CheckCircle2, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { registerResidentAction, loginResidentAction, type AuthActionState } from "@/app/actions/resident-auth";

type Props = {
  onClose: () => void;
};

type Tab = "signin" | "signup";

const initialState: AuthActionState = null;

export function AuthModal({ onClose }: Props) {
  const [tab, setTab] = useState<Tab>("signin");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [signinState, signinAction, signinPending] = useActionState(loginResidentAction, initialState);
  const [signupState, signupAction, signupPending] = useActionState(registerResidentAction, initialState);

  const state = tab === "signin" ? signinState : signupState;
  const pending = tab === "signin" ? signinPending : signupPending;
  const succeeded = state && "success" in state;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (succeeded) return;
    closeRef.current?.focus({ preventScroll: true });
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, succeeded]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center px-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      style={{ background: "rgba(12,35,70,0.5)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        dir="rtl"
        className="relative w-full max-w-[380px] overflow-hidden rounded-[28px] bg-white ring-1 ring-teal-900/[0.07] animate-[dropIn_0.3s_cubic-bezier(0.22,1,0.36,1)]"
        style={{ boxShadow: "0 12px 32px rgba(12,35,70,0.14), 0 30px 70px rgba(12,35,70,0.22)" }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: "linear-gradient(to left, #1e5266 0%, #d99a3d 50%, #8ec640 100%)" }}
          aria-hidden="true"
        />

        <button
          ref={succeeded ? undefined : closeRef}
          type="button"
          onClick={onClose}
          aria-label="סגירה"
          className="absolute left-4 top-5 z-10 rounded-full p-2 text-ink-600 transition-colors hover:bg-teal-100 hover:text-teal-900"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {succeeded ? (
          <div className="flex flex-col items-center gap-3 px-7 pt-14 pb-9 text-center">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(155deg, #8ec64022 0%, #8ec6400a 100%)" }}
              aria-hidden="true"
            >
              <CheckCircle2 size={28} color="#4d7321" strokeWidth={1.6} />
            </span>
            <h2 id="auth-modal-title" className="text-lg font-extrabold tracking-tight text-teal-900">
              {tab === "signin" ? "התחברת בהצלחה" : "החשבון נוצר בהצלחה"}
            </h2>
            <p className="text-[13px] leading-6 text-ink-600">ברוכים הבאים לאזור האישי של מועצה מקומית כפר יאסיף.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: "linear-gradient(155deg, #2c6a76 0%, #1e5266 100%)" }}
            >
              המשך לאתר
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2 px-7 pt-9 pb-1 text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-teal-900/10"
                style={{ background: "linear-gradient(155deg, #e3edec 0%, #fbf7f0 100%)" }}
                aria-hidden="true"
              >
                <UserIcon size={20} color="#1e5266" strokeWidth={1.6} />
              </span>
              <h2 id="auth-modal-title" className="text-lg font-extrabold tracking-tight text-teal-900">
                אזור אישי
              </h2>
              <p className="text-[13px] leading-5 text-ink-600">מועצה מקומית כפר יאסיף</p>
            </div>

            <div className="mx-7 mt-5 flex rounded-full bg-cream-50 p-1 ring-1 ring-teal-900/[0.06]">
              <button
                type="button"
                onClick={() => setTab("signin")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition-all ${
                  tab === "signin" ? "bg-white text-teal-900 shadow-sm" : "text-ink-600 hover:text-teal-700"
                }`}
              >
                <LogIn size={14} aria-hidden="true" />
                כניסה
              </button>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition-all ${
                  tab === "signup" ? "bg-white text-teal-900 shadow-sm" : "text-ink-600 hover:text-teal-700"
                }`}
              >
                <UserPlus size={14} aria-hidden="true" />
                הרשמה
              </button>
            </div>

            <div className="px-7 pt-5 pb-8">
              <div className="mb-4 space-y-2">
                <OAuthButton icon={<GoogleIcon />} label="המשך עם Google" />
                <OAuthButton icon={<AppleIcon />} label="המשך עם Apple" />
                <p className="pt-0.5 text-center text-[11px] leading-4 text-ink-600">
                  ההתחברות עם Google ו-Apple תופעל לאחר חיבור החשבונות מצד המועצה.
                </p>
              </div>

              <div className="mb-4 flex items-center gap-3 text-[11px] font-medium text-ink-600">
                <span className="h-px flex-1 bg-teal-100" aria-hidden="true" />
{'או באמצעות דוא"ל'}
                <span className="h-px flex-1 bg-teal-100" aria-hidden="true" />
              </div>

              {tab === "signin" ? (
                <form key="signin" action={signinAction} className="space-y-3.5">
                  <FieldWithIcon icon={Mail} label='דוא"ל' name="email" type="email" dir="ltr" />
                  <FieldWithIcon icon={Lock} label="סיסמה" name="password" type="password" dir="ltr" minLength={6} toggle />
                  {signinState && "error" in signinState && <ErrorNote message={signinState.error} />}
                  <SubmitButton pending={pending} label="כניסה" />
                </form>
              ) : (
                <form key="signup" action={signupAction} className="space-y-3.5">
                  <FieldWithIcon icon={UserIcon} label="שם מלא" name="name" type="text" dir="rtl" />
                  <FieldWithIcon icon={Mail} label='דוא"ל' name="email" type="email" dir="ltr" />
                  <FieldWithIcon icon={Lock} label="סיסמה" name="password" type="password" dir="ltr" minLength={6} toggle />
                  {signupState && "error" in signupState && <ErrorNote message={signupState.error} />}
                  <SubmitButton pending={pending} label="הרשמה" />
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FieldWithIcon({
  icon: Icon,
  label,
  name,
  type,
  dir,
  minLength,
  toggle,
}: {
  icon: typeof Mail;
  label: string;
  name: string;
  type: string;
  dir: "rtl" | "ltr";
  minLength?: number;
  toggle?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const resolvedType = toggle ? (visible ? "text" : "password") : type;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-900">{label}</span>
      <div className="relative">
        <Icon size={15} className="pointer-events-none absolute top-1/2 start-3.5 -translate-y-1/2 text-teal-600/70" aria-hidden="true" />
        <input
          name={name}
          type={resolvedType}
          required
          dir={dir}
          minLength={minLength}
          className={`w-full rounded-xl border border-teal-100 bg-cream-50/60 py-2.5 ps-9 text-sm transition-colors focus:border-teal-500 focus:bg-white focus:outline-none ${
            toggle ? "pe-10" : "pe-3.5"
          }`}
        />
        {toggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "הסתרת סיסמה" : "הצגת סיסמה"}
            className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-600 transition-colors hover:bg-teal-100 hover:text-teal-900"
          >
            {visible ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
          </button>
        )}
      </div>
    </label>
  );
}

function OAuthButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-teal-100 bg-white py-2.5 text-sm font-semibold text-ink-900 opacity-80 transition-colors"
    >
      {icon}
      {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.27a12 12 0 0 0 0 10.8l4-3.11Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.6l4 3.11C6.22 6.86 8.87 4.75 12 4.75Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
      <path d="M16.36 1.02c.09 1.02-.32 2.02-.94 2.75-.65.76-1.72 1.36-2.75 1.28-.12-1 .38-2.05 1-2.72.68-.75 1.85-1.32 2.69-1.31ZM19.94 17.4c-.4.93-.88 1.83-1.53 2.66-.83 1.06-1.7 2.12-3.05 2.14-1.32.03-1.75-.79-3.26-.79-1.52 0-1.99.77-3.24.82-1.32.05-2.32-1.14-3.16-2.19-1.72-2.17-3.04-6.13-1.27-8.81.87-1.33 2.44-2.17 4.14-2.2 1.28-.02 2.48.87 3.26.87.78 0 2.24-1.07 3.77-.91.64.03 2.45.26 3.61 1.94-.09.06-2.16 1.26-2.14 3.76.02 2.98 2.62 3.97 2.87 4.08Z" />
    </svg>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-xs font-medium leading-5 text-red-700">
      <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
      {message}
    </div>
  );
}

function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-70"
      style={{ background: "linear-gradient(155deg, #2c6a76 0%, #1e5266 100%)" }}
    >
      {pending && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
      {label}
    </button>
  );
}
