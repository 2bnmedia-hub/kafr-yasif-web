import type { SkyCondition } from "./weather-codes";

const GOLD = "#d99a3d";
const BLUE = "#175AE2";
const CLOUD = "#9db3c2";
const CLOUD_DARK = "#7690a3";

export function WeatherIcon({
  condition,
  isDay,
  size = 22,
}: {
  condition: SkyCondition;
  isDay: boolean;
  size?: number;
}) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true } as const;

  if (condition === "clear") {
    return isDay ? (
      <svg {...props} fill="none">
        <circle cx="12" cy="12" r="4.6" fill={GOLD} />
        <path
          d="M12 2.8v2.2M12 19v2.2M21.2 12H19M5 12H2.8M18.1 5.9l-1.5 1.5M7.4 16.6l-1.5 1.5M18.1 18.1l-1.5-1.5M7.4 7.4 5.9 5.9"
          stroke={GOLD}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg {...props} fill="none">
        <path
          d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"
          fill="#8aa0d6"
        />
      </svg>
    );
  }

  if (condition === "partly-cloudy") {
    return (
      <svg {...props} fill="none">
        {isDay ? (
          <circle cx="8.5" cy="8.5" r="3.6" fill={GOLD} />
        ) : (
          <path d="M11.5 4.5A5 5 0 1 1 6 10.9a4 4 0 0 0 5.5-6.4Z" fill="#8aa0d6" />
        )}
        <path
          d="M7 18.5h9a3.4 3.4 0 0 0 .5-6.76 4.5 4.5 0 0 0-8.7-1.47A3.8 3.8 0 0 0 7 18.5Z"
          fill={CLOUD}
        />
      </svg>
    );
  }

  if (condition === "cloudy") {
    return (
      <svg {...props} fill="none">
        <path
          d="M6 17.5h11a3.6 3.6 0 0 0 .5-7.15A4.7 4.7 0 0 0 8.4 8.8 4 4 0 0 0 6 17.5Z"
          fill={CLOUD_DARK}
        />
        <path
          d="M4.5 20h9a2.9 2.9 0 0 0 .3-5.78"
          stroke={CLOUD}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
      </svg>
    );
  }

  if (condition === "fog") {
    return (
      <svg {...props} fill="none">
        <path d="M6 9.5h9a3.2 3.2 0 0 0 .3-6.4A4.2 4.2 0 0 0 7.4 4.3 3.5 3.5 0 0 0 6 9.5Z" fill={CLOUD} />
        <path d="M3.5 13h17M3.5 16.5h17M3.5 20h17" stroke={CLOUD_DARK} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (condition === "drizzle" || condition === "rain") {
    const heavy = condition === "rain";
    return (
      <svg {...props} fill="none">
        <path
          d="M6 14.5h11a3.4 3.4 0 0 0 .5-6.76A4.5 4.5 0 0 0 8.9 6.3 3.8 3.8 0 0 0 6 14.5Z"
          fill={CLOUD_DARK}
        />
        <path
          d={heavy ? "M8 17.5l-1.3 3M12 17.5l-1.3 3M16 17.5l-1.3 3" : "M9 17.5l-1 2.4M15 17.5l-1 2.4"}
          stroke={BLUE}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (condition === "snow") {
    return (
      <svg {...props} fill="none">
        <path
          d="M6 14.5h11a3.4 3.4 0 0 0 .5-6.76A4.5 4.5 0 0 0 8.9 6.3 3.8 3.8 0 0 0 6 14.5Z"
          fill={CLOUD}
        />
        <path d="M9 18.5v3M7.6 19.3l2.8 1.4M11.4 19.3l-2.8 1.4" stroke="#8aa0d6" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M15 18.5v3M13.6 19.3l2.8 1.4M17.4 19.3l-2.8 1.4" stroke="#8aa0d6" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  // thunder
  return (
    <svg {...props} fill="none">
      <path
        d="M6 13.5h11a3.4 3.4 0 0 0 .5-6.76A4.5 4.5 0 0 0 8.9 5.3 3.8 3.8 0 0 0 6 13.5Z"
        fill={CLOUD_DARK}
      />
      <path d="M13 14.5l-3 4.2h2.4l-1.6 3.3 4-4.6h-2.3l1.5-2.9Z" fill={GOLD} />
    </svg>
  );
}

export function SunriseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 18h18M6 18a6 6 0 0 1 12 0" stroke={GOLD} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 4v3M6.5 8l1.8 1.8M17.5 8l-1.8 1.8" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 21.5l3-3 3 3" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SunsetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 18h18M6 18a6 6 0 0 1 12 0" stroke="#c2703a" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 4v3M6.5 8l1.8 1.8M17.5 8l-1.8 1.8" stroke="#c2703a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 18.5l3 3 3-3" stroke="#c2703a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HumidityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3s6 6.7 6 11a6 6 0 1 1-12 0c0-4.3 6-11 6-11Z" stroke={BLUE} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function WindIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 8h11.5a2.5 2.5 0 1 0-2.4-3.2" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 13h14.5a2.5 2.5 0 1 1-2.4 3.2" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 18h8.5a2 2 0 1 0-1.9-2.6" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function WaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 15c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0M2 19c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"
        stroke={BLUE}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ThermometerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 14.5V5.5a2 2 0 1 0-4 0v9a3.5 3.5 0 1 0 4 0Z"
        stroke="#c2703a"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="16.5" r="1.4" fill="#c2703a" />
    </svg>
  );
}
