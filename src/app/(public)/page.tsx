import type { Metadata } from "next";
import { headers } from "next/headers";
import { Hero } from "@/components/home/Hero";
import { NewsTicker } from "@/components/home/NewsTicker";
import { NewsGrid } from "@/components/home/NewsGrid";
import { EventsSection } from "@/components/home/EventsSection";
import { contactInfo } from "@/lib/nav";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kafr-yasif-web.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: "מועצה מקומית כפר יאסיף",
  url: siteUrl,
  logo: `${siteUrl}/images/logo-100years.png`,
  telephone: contactInfo.phone,
  email: contactInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contactInfo.address,
    addressLocality: "כפר יאסיף",
    addressCountry: "IL",
  },
};

export default async function Home() {
  const nonce = (await headers()).get("x-nonce");
  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce ?? undefined}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <NewsTicker />
      <NewsGrid />
      <EventsSection />
    </>
  );
}
