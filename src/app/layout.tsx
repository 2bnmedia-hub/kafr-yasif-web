import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import { headers } from "next/headers";
import { getServerLocale } from "@/i18n/get-locale";
import { LOCALE_DIR, DEFAULT_LOCALE } from "@/i18n/config";
import { StagingBanner } from "@/components/layout/StagingBanner";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kafr-yasif-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "מועצה מקומית כפר יאסיף",
    template: "%s | מועצה מקומית כפר יאסיף",
  },
  description:
    "האתר הרשמי של המועצה המקומית כפר יאסיף — מידע, שירותי תושב, מחלקות המועצה, ביטחון וחירום ויצירת קשר.",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "מועצה מקומית כפר יאסיף",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  // The admin panel is always Hebrew/RTL regardless of the visitor's public-site locale
  // cookie — otherwise a visitor who switched the public site to en/ar would land on
  // /admin with the whole panel mirrored to LTR. See src/proxy.ts for x-pathname.
  const isAdmin = (headerList.get("x-pathname") ?? "").startsWith("/admin");
  const locale = isAdmin ? DEFAULT_LOCALE : await getServerLocale();

  return (
    <html lang={locale} dir={LOCALE_DIR[locale]} className={`${assistant.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <StagingBanner />
        {children}
      </body>
    </html>
  );
}
