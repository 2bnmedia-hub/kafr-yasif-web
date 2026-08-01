"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { WeatherData } from "./types";
import { fetchWeather } from "./fetchWeather";
import { getWeatherInfo } from "./weather-codes";
import { WeatherIcon } from "./WeatherIcons";
import { WeatherDrawer } from "./WeatherDrawer";

const CACHE_KEY = "kafr-yasif-weather-cache-v1";
const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

// Cached by raw string so the snapshot stays referentially stable when unchanged — required by
// useSyncExternalStore (and avoids a hydration mismatch: SSR always sees getServerSnapshot's
// `null`, so the first client render must match it exactly rather than eagerly reading the
// browser's real cached value).
let lastRaw: string | null | undefined;
let lastParsed: WeatherData | null = null;

function loadCache(): WeatherData | null {
  let raw: string | null;
  try {
    raw = localStorage.getItem(CACHE_KEY);
  } catch {
    return null;
  }
  if (raw === lastRaw) return lastParsed;
  lastRaw = raw;
  try {
    lastParsed = raw ? (JSON.parse(raw) as WeatherData) : null;
  } catch {
    lastParsed = null;
  }
  return lastParsed;
}

function saveCache(data: WeatherData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot(): WeatherData | null {
  return null;
}

export function WeatherWidget() {
  const cached = useSyncExternalStore(subscribe, loadCache, getServerSnapshot);
  const [fetched, setFetched] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const data = fetched ?? cached;

  useEffect(() => {
    let ignore = false;

    function refresh() {
      fetchWeather()
        .then((fresh) => {
          if (ignore) return;
          setFetched(fresh);
          saveCache(fresh);
        })
        .catch(() => {
          // keep whatever is currently shown (cache or previous state) — weather is non-critical
        })
        .finally(() => {
          if (!ignore) setLoading(false);
        });
    }

    refresh();
    const interval = setInterval(refresh, REFRESH_MS);
    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center gap-1.5 px-2" aria-hidden="true">
        <div className="h-4 w-4 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-3 w-6 animate-pulse rounded bg-zinc-200" />
      </div>
    );
  }

  if (!data) return null;

  const { condition } = getWeatherInfo(data.current.weatherCode);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="flex items-center gap-1.5 rounded-full bg-[#0C2346]/[0.04] px-3 py-2 text-sm font-semibold text-[#0C2346] transition-colors hover:bg-[#0C2346]/10"
        aria-label={`מזג האוויר בכפר יאסיף כעת: ${data.current.temp} מעלות, ${getWeatherInfo(data.current.weatherCode).label}. לחצו לפרטים נוספים`}
      >
        <WeatherIcon condition={condition} isDay={data.current.isDay} />
        <span>{data.current.temp}°</span>
      </button>

      {drawerOpen && (
        <WeatherDrawer
          data={data}
          onClose={() => {
            setDrawerOpen(false);
            triggerRef.current?.focus();
          }}
        />
      )}
    </>
  );
}
