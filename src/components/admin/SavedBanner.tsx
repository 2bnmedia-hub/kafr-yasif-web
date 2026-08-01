"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

const MESSAGES: Record<string, string> = {
  created: "התוכן נשמר ופורסם באתר בהצלחה",
  created_draft: "התוכן נשמר כטיוטה. הוא לא מוצג באתר הציבורי עד לפרסום.",
  saved: "השינויים נשמרו ועודכנו באתר בהצלחה",
  saved_draft: "השינויים נשמרו. הפריט עדיין בטיוטה ואינו מוצג באתר הציבורי.",
};

export function SavedBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const flag = searchParams.get("status");
  const [visible, setVisible] = useState(!!flag && flag in MESSAGES);

  useEffect(() => {
    if (!flag || !(flag in MESSAGES)) return;
    const timeout = setTimeout(() => {
      setVisible(false);
      router.replace(pathname);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [flag, pathname, router]);

  if (!flag || !(flag in MESSAGES) || !visible) return null;

  const isDraft = flag.endsWith("_draft");

  return (
    <div
      role="status"
      className={`mb-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
        isDraft ? "bg-gold-100 text-gold-700" : "bg-green-50 text-green-700"
      }`}
    >
      <span className="flex items-center gap-2">
        <CheckCircle2 size={16} aria-hidden="true" />
        {MESSAGES[flag]}
      </span>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          router.replace(pathname);
        }}
        aria-label="סגירה"
        className="rounded-full p-1 hover:bg-black/5"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
