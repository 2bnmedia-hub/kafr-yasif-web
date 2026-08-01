"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fires a fire-and-forget beacon once per page load to power the admin dashboard's visitor counts. */
export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const payload = JSON.stringify({ path: pathname });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track-visit", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track-visit", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
