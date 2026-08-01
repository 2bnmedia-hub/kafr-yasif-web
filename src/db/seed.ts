import { db } from "./index";
import { pages, news, events, siteSettings, footerLinks, media } from "./schema";
import { contentPages } from "@/content/pages-data";
import { newsItems, events as eventsData, contactInfo, footerColumns } from "@/lib/nav";

/** Shared site-wide chrome (footer icons/photo/logo) that appeared in every scraped page's <img> list — not real page content. */
const CHROME_IMAGES = new Set([
  "/uploads/11062b_69d309d6dbde492fae325fb0deca6556-mv2.png",
  "/uploads/modern-office-lobby-with-armchairs-plants.jpg",
  "/uploads/d65f4e_fd6c79705f2144e4a4929c26701c801d-mv2.png",
  "/uploads/11062b_1db239e728f641c3a3be5b7ca708f239-mv2.png",
  "/uploads/d65f4e_3aa7d18f776a4702aa35adbe93cedd9f-mv2.png",
  "/uploads/11062b_55e4be1e75564866b6c28290f9a9d271-mv2.png",
  "/uploads/d65f4e_a292b45aa92c48c6909b34a5d242564b-mv2.png",
  "/uploads/111_edited.jpg",
  "/uploads/11062b_2381e8a6e7444f4f902e7b649aa3f0ac-mv2.png",
  "/uploads/d65f4e_f5b60623e5da40a3b1f4cb9461fb6917-mv2.png",
]);

async function seed() {
  console.log("Clearing tables without a natural unique key...");
  await db.delete(events);
  await db.delete(footerLinks);

  console.log("Seeding media...");
  const uniqueImages = new Set<string>();
  for (const p of contentPages) for (const img of p.images) uniqueImages.add(img);
  if (uniqueImages.size > 0) {
    await db
      .insert(media)
      .values(
        [...uniqueImages].map((url) => ({
          filename: url.split("/").pop() ?? url,
          url,
          kind: "image" as const,
        }))
      )
      .onConflictDoNothing();
  }

  console.log("Seeding pages...", contentPages.length);
  for (const p of contentPages) {
    const images = p.images.filter((img) => !CHROME_IMAGES.has(img));
    await db
      .insert(pages)
      .values({
        slug: p.slug,
        navSection: p.navSection,
        navLabel: p.navLabel,
        title: p.title,
        bodyHtml: p.bodyText,
        images,
        metaDescription: p.metaDescription || null,
      })
      .onConflictDoUpdate({
        target: pages.slug,
        set: {
          navSection: p.navSection,
          navLabel: p.navLabel,
          title: p.title,
          bodyHtml: p.bodyText,
          images,
          metaDescription: p.metaDescription || null,
          updatedAt: new Date(),
        },
      });
  }

  console.log("Seeding news...");
  for (let i = 0; i < newsItems.length; i++) {
    const n = newsItems[i];
    const slug = `news-${i + 1}`;
    await db
      .insert(news)
      .values({
        slug,
        title: n.title,
        excerpt: n.excerpt,
        bodyHtml: n.excerpt,
        imageUrl: "image" in n ? n.image : null,
        variant: n.variant,
        sortOrder: n.order,
      })
      .onConflictDoUpdate({
        target: news.slug,
        set: {
          title: n.title,
          excerpt: n.excerpt,
          imageUrl: "image" in n ? n.image : null,
          variant: n.variant,
          sortOrder: n.order,
        },
      });
  }

  console.log("Seeding events...");
  for (const e of eventsData) {
    await db.insert(events).values({
      title: e.title,
      subtitle: e.subtitle,
      startDate: e.dates.split(" - ")[1] ?? "",
      endDate: e.dates.split(" - ")[0] ?? "",
      note: e.note,
    });
  }

  console.log("Seeding site settings...");
  await db
    .insert(siteSettings)
    .values({
      id: 1,
      siteName: "מועצה מקומית כפר יאסיף",
      address: contactInfo.address,
      phone: contactInfo.phone,
      email: contactInfo.email,
      hours: contactInfo.hours,
      socialLinks: contactInfo.social,
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        address: contactInfo.address,
        phone: contactInfo.phone,
        email: contactInfo.email,
        hours: contactInfo.hours,
        socialLinks: contactInfo.social,
        updatedAt: new Date(),
      },
    });

  console.log("Seeding footer links...");
  for (const col of footerColumns) {
    for (let i = 0; i < col.links.length; i++) {
      await db.insert(footerLinks).values({
        columnTitle: col.title,
        label: col.links[i].label,
        href: col.links[i].href,
        sortOrder: i,
      });
    }
  }

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
