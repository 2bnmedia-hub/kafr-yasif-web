import type { WeatherData } from "./types";

// Kafr Yasif village center
const LAT = 32.9436;
const LON = 35.1064;
// nearest coastal point (Akko shoreline) for sea conditions
const SEA_LAT = 32.92;
const SEA_LON = 35.07;

const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,is_day` +
  `&hourly=temperature_2m,weather_code` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
  `&timezone=Asia%2FJerusalem&forecast_days=7`;

const MARINE_URL =
  `https://marine-api.open-meteo.com/v1/marine?latitude=${SEA_LAT}&longitude=${SEA_LON}` +
  `&current=wave_height,sea_surface_temperature&timezone=Asia%2FJerusalem`;

export async function fetchWeather(): Promise<WeatherData> {
  const [weatherRes, marineRes] = await Promise.all([
    fetch(WEATHER_URL).then((r) => (r.ok ? r.json() : null)),
    fetch(MARINE_URL)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null),
  ]);

  if (!weatherRes) throw new Error("weather fetch failed");

  const nowIndex = weatherRes.hourly.time.findIndex((t: string) => t >= weatherRes.current.time);
  const startIndex = nowIndex === -1 ? 0 : nowIndex;

  const hourly = weatherRes.hourly.time
    .slice(startIndex, startIndex + 24)
    .map((time: string, i: number) => ({
      time,
      temp: Math.round(weatherRes.hourly.temperature_2m[startIndex + i]),
      weatherCode: weatherRes.hourly.weather_code[startIndex + i],
    }));

  const daily = weatherRes.daily.time.map((time: string, i: number) => ({
    time,
    weatherCode: weatherRes.daily.weather_code[i],
    tempMax: Math.round(weatherRes.daily.temperature_2m_max[i]),
    tempMin: Math.round(weatherRes.daily.temperature_2m_min[i]),
    sunrise: weatherRes.daily.sunrise[i],
    sunset: weatherRes.daily.sunset[i],
  }));

  return {
    current: {
      temp: Math.round(weatherRes.current.temperature_2m),
      humidity: weatherRes.current.relative_humidity_2m,
      weatherCode: weatherRes.current.weather_code,
      windSpeed: Math.round(weatherRes.current.wind_speed_10m),
      windDirection: weatherRes.current.wind_direction_10m,
      isDay: weatherRes.current.is_day === 1,
    },
    hourly,
    daily,
    marine: marineRes
      ? {
          waveHeight: marineRes.current.wave_height,
          seaTemp: Math.round(marineRes.current.sea_surface_temperature),
        }
      : null,
    fetchedAt: Date.now(),
  };
}
