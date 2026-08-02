import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kafr-yasif-web.vercel.app";
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    // Blocking crawl entirely here was a trap: a blocked crawler never reads the page-level
    // noindex signal, so anything already indexed before the block went up stays indexed
    // forever. Allow crawling and rely solely on the global `X-Robots-Tag: noindex, nofollow`
    // response header (set in proxy.ts for every non-production request) to keep this
    // environment out of search results — a crawler that's allowed in actually sees and obeys it.
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
