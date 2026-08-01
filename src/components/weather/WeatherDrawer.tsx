"use client";

import { useEffect, useRef } from "react";
import type { WeatherData } from "./types";
import { getWeatherInfo, hebrewDayName, shortDate, windDirectionLabel, seaStateLabel } from "./weather-codes";
import { WeatherIcon, SunriseIcon, SunsetIcon, HumidityIcon, WindIcon, WaveIcon, ThermometerIcon } from "./WeatherIcons";

export function WeatherDrawer({ data, onClose }: { data: WeatherData; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const today = new Date();
  const { condition, label } = getWeatherInfo(data.current.weatherCode);
  const todaySunrise = data.daily[0] ? new Date(data.daily[0].sunrise) : null;
  const todaySunset = data.daily[0] ? new Date(data.daily[0].sunset) : null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/30 px-4 pt-20 animate-[fadeIn_0.2s_ease-out] sm:justify-end sm:px-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="מזג האוויר בכפר יאסיף"
        dir="rtl"
        className="w-full max-w-md origin-top animate-[dropIn_0.25s_ease-out] rounded-3xl bg-white p-6 shadow-2xl sm:mt-2 sm:max-w-2xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0C2346]">{hebrewDayName(today)}</h2>
            <p className="text-sm text-ink-600">{shortDate(today)}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="סגירה"
            className="rounded-full p-1.5 text-ink-600 hover:bg-zinc-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* current conditions */}
        <div className="mb-5 flex items-center gap-4 rounded-2xl bg-[#F0F5FF] p-4">
          <WeatherIcon condition={condition} isDay={data.current.isDay} size={48} />
          <div>
            <div className="text-3xl font-bold text-[#0C2346]">{data.current.temp}°</div>
            <div className="text-sm text-ink-600">{label}</div>
          </div>
        </div>

        {/* grid of stats */}
        <div className="mb-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Stat icon={<ThermometerIcon />} label="טמפרטורה בחוץ" value={`${data.current.temp}°`} />
          {data.marine && <Stat icon={<ThermometerIcon />} label="טמפרטורת הים" value={`${data.marine.seaTemp}°`} />}
          {data.marine && (
            <Stat icon={<WaveIcon />} label="גובה הגלים" value={`${Math.round(data.marine.waveHeight * 100)} ס"מ`} />
          )}
          {data.marine && <Stat label="מצב הים" value={seaStateLabel(data.marine.waveHeight)} />}
          <Stat
            icon={<WindIcon />}
            label="רוח"
            value={`${data.current.windSpeed} קמ"ש, ${windDirectionLabel(data.current.windDirection)}`}
          />
          <Stat icon={<HumidityIcon />} label="לחות" value={`${data.current.humidity}%`} />
          {todaySunrise && <Stat icon={<SunriseIcon />} label="זריחה" value={formatTime(todaySunrise)} />}
          {todaySunset && <Stat icon={<SunsetIcon />} label="שקיעה" value={formatTime(todaySunset)} />}
        </div>

        {/* 24h forecast */}
        <h3 className="mb-2 text-sm font-bold text-[#0C2346]">תחזית ל-24 השעות הקרובות</h3>
        <div className="mb-5 flex gap-3 overflow-x-auto pb-2">
          {data.hourly.map((h) => {
            const hourInfo = getWeatherInfo(h.weatherCode);
            const d = new Date(h.time);
            return (
              <div key={h.time} className="flex shrink-0 flex-col items-center gap-1 text-xs text-ink-600">
                <span>{d.getHours()}:00</span>
                <WeatherIcon condition={hourInfo.condition} isDay={d.getHours() >= 6 && d.getHours() < 19} size={22} />
                <span className="font-semibold text-[#0C2346]">{h.temp}°</span>
              </div>
            );
          })}
        </div>

        {/* 7 day forecast */}
        <h3 className="mb-2 text-sm font-bold text-[#0C2346]">תחזית ל-7 ימים</h3>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {data.daily.map((d, i) => {
            const dayInfo = getWeatherInfo(d.weatherCode);
            const date = new Date(d.time + "T12:00:00");
            return (
              <li key={d.time} className="flex items-center justify-between text-sm">
                <span className="w-20 text-ink-600">{i === 0 ? "היום" : hebrewDayName(date).replace("יום ", "")}</span>
                <WeatherIcon condition={dayInfo.condition} isDay={true} size={20} />
                <span className="flex gap-2">
                  <span className="font-semibold text-[#0C2346]">{d.tempMax}°</span>
                  <span className="text-ink-600">{d.tempMin}°</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2.5">
      {icon}
      <div>
        <div className="text-[11px] text-ink-600">{label}</div>
        <div className="font-semibold text-[#0C2346]">{value}</div>
      </div>
    </div>
  );
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
}
