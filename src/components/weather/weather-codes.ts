export type SkyCondition = "clear" | "partly-cloudy" | "cloudy" | "fog" | "drizzle" | "rain" | "snow" | "thunder";

/** WMO weather_code (Open-Meteo) → condition family + Hebrew label. */
const WEATHER_CODE_MAP: Record<number, { condition: SkyCondition; label: string }> = {
  0: { condition: "clear", label: "בהיר" },
  1: { condition: "clear", label: "בהיר בעיקרו" },
  2: { condition: "partly-cloudy", label: "מעונן חלקית" },
  3: { condition: "cloudy", label: "מעונן" },
  45: { condition: "fog", label: "ערפל" },
  48: { condition: "fog", label: "ערפל קרח" },
  51: { condition: "drizzle", label: "טפטוף קל" },
  53: { condition: "drizzle", label: "טפטוף" },
  55: { condition: "drizzle", label: "טפטוף חזק" },
  56: { condition: "drizzle", label: "טפטוף קפוא" },
  57: { condition: "drizzle", label: "טפטוף קפוא חזק" },
  61: { condition: "rain", label: "גשם קל" },
  63: { condition: "rain", label: "גשם" },
  65: { condition: "rain", label: "גשם חזק" },
  66: { condition: "rain", label: "גשם קפוא" },
  67: { condition: "rain", label: "גשם קפוא חזק" },
  71: { condition: "snow", label: "שלג קל" },
  73: { condition: "snow", label: "שלג" },
  75: { condition: "snow", label: "שלג חזק" },
  77: { condition: "snow", label: "גרגירי שלג" },
  80: { condition: "rain", label: "ממטרים קלים" },
  81: { condition: "rain", label: "ממטרים" },
  82: { condition: "rain", label: "ממטרים חזקים" },
  85: { condition: "snow", label: "ממטרי שלג" },
  86: { condition: "snow", label: "ממטרי שלג חזקים" },
  95: { condition: "thunder", label: "סופת רעמים" },
  96: { condition: "thunder", label: "סופת רעמים עם ברד" },
  99: { condition: "thunder", label: "סופת רעמים עם ברד כבד" },
};

export function getWeatherInfo(code: number) {
  return WEATHER_CODE_MAP[code] ?? { condition: "partly-cloudy" as SkyCondition, label: "לא ידוע" };
}

const COMPASS_LABELS = [
  "צפון", "צפון-מזרח", "מזרח", "דרום-מזרח", "דרום", "דרום-מערב", "מערב", "צפון-מערב",
];

export function windDirectionLabel(deg: number) {
  const index = Math.round(deg / 45) % 8;
  return COMPASS_LABELS[index];
}

export function seaStateLabel(waveHeightM: number) {
  if (waveHeightM < 0.5) return "רגוע";
  if (waveHeightM < 1.25) return "קל";
  if (waveHeightM < 2.5) return "בינוני";
  return "גבוה";
}

const HEBREW_DAY_NAMES = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];

export function hebrewDayName(date: Date) {
  return HEBREW_DAY_NAMES[date.getDay()];
}

export function shortDate(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${String(date.getFullYear()).slice(-2)}`;
}
