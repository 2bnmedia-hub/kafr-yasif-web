"use client";

import { createContext, useContext, useState, useCallback, useSyncExternalStore } from "react";
import {
  type ConsentState,
  readStoredConsent,
  writeStoredConsent,
} from "@/lib/cookie-consent";
import { CookieBanner } from "./CookieBanner";
import { CookieSettingsModal } from "./CookieSettingsModal";
import { ConsentScripts } from "./ConsentScripts";

type Ctx = {
  consent: ConsentState | null;
  hasDecided: boolean;
  openSettings: () => void;
};

const CookieConsentContext = createContext<Ctx | null>(null);

function subscribe(callback: () => void) {
  window.addEventListener("cookie-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cookie-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): ConsentState | null {
  return null;
}

export function CookieConsentProvider({ children, nonce }: { children: React.ReactNode; nonce: string | null }) {
  // Hydration-safe read of the visitor's stored decision: matches SSR (null) on first client
  // render, then re-syncs to the real localStorage value once mounted — no effect needed.
  const storedConsent = useSyncExternalStore(subscribe, readStoredConsent, getServerSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const hasDecided = storedConsent !== null;

  const persist = useCallback((next: ConsentState) => {
    writeStoredConsent(next);
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, functional: true, marketing: true });
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({ necessary: true, analytics: false, functional: false, marketing: false });
  }, [persist]);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  return (
    <CookieConsentContext.Provider value={{ consent: storedConsent, hasDecided, openSettings }}>
      {children}
      <ConsentScripts nonce={nonce} />
      {!hasDecided && !settingsOpen && (
        <CookieBanner onAcceptAll={acceptAll} onRejectNonEssential={rejectNonEssential} onOpenSettings={openSettings} />
      )}
      {settingsOpen && (
        <CookieSettingsModal
          initialConsent={storedConsent ?? { necessary: true, analytics: false, functional: false, marketing: false }}
          onSave={persist}
          onClose={closeSettings}
        />
      )}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): Ctx {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return ctx;
}
