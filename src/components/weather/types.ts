export type HourlyPoint = { time: string; temp: number; weatherCode: number };

export type DailyPoint = {
  time: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
};

export type WeatherData = {
  current: {
    temp: number;
    humidity: number;
    weatherCode: number;
    windSpeed: number;
    windDirection: number;
    isDay: boolean;
  };
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  marine: { waveHeight: number; seaTemp: number } | null;
  fetchedAt: number;
};
