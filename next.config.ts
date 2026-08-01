import type { NextConfig } from "next";

// Report-Only for now — logs violations without blocking anything, so we can see what a real
// enforcement rollout would break before switching this to `Content-Security-Policy`.
// 'unsafe-inline' is included deliberately at this stage: the consent-gated analytics snippets
// (GTM/Meta Pixel/Hotjar/Clarity in components/cookies/ConsentScripts.tsx) and Next.js's own
// hydration data are inline by design, and a nonce-based policy would require forcing every page
// to dynamic rendering (see proxy.ts CSP guide) — a bigger change than a Report-Only baseline needs.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://static.hotjar.com https://www.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://*.public.blob.vercel-storage.com https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://www.clarity.ms https://c.clarity.ms https://www.facebook.com https://www.google-analytics.com https://analytics.google.com",
  "frame-src 'self' https://www.facebook.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy-Report-Only", value: cspDirectives },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
