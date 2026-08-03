import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const navSectionEnum = pgEnum("nav_section", [
  "info-center",
  "departments",
  "resident-services",
  "emergency",
  "contact",
  "other",
]);

export const mediaKindEnum = pgEnum("media_kind", ["image", "pdf", "document", "video", "icon"]);

/** מנהל אתר (full access, incl. publishing/deleting/user management/public inquiries) vs
 *  עורך תוכן (create/edit content as drafts only — cannot publish, delete, or see resident
 *  submissions). See src/lib/permissions.ts for the enforced capability matrix. */
export const adminRoleEnum = pgEnum("admin_role", ["site-admin", "content-editor"]);

/** Shared publish-workflow status used by tenders, news, and events. */
export const contentStatusEnum = pgEnum("content_status", ["draft", "published", "hidden", "scheduled"]);

/** Business status of a tender, independent of the publish workflow. */
export const tenderStatusEnum = pgEnum("tender_status", ["open", "closed", "awarded", "cancelled"]);

/** Generic CMS-managed content pages, keyed by the real (often Hebrew) source URL slug. */
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  navSection: navSectionEnum("nav_section").notNull().default("other"),
  navLabel: text("nav_label").notNull(),
  navLabelAr: text("nav_label_ar"),
  navLabelEn: text("nav_label_en"),
  title: text("title").notNull(),
  titleAr: text("title_ar"),
  titleEn: text("title_en"),
  bodyHtml: text("body_html").notNull().default(""),
  bodyHtmlAr: text("body_html_ar"),
  bodyHtmlEn: text("body_html_en"),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  metaTitle: text("meta_title"),
  metaTitleAr: text("meta_title_ar"),
  metaTitleEn: text("meta_title_en"),
  metaDescription: text("meta_description"),
  metaDescriptionAr: text("meta_description_ar"),
  metaDescriptionEn: text("meta_description_en"),
  ogImageUrl: text("og_image_url"),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  alt: text("alt").notNull().default(""),
  kind: mediaKindEnum("kind").notNull().default("image"),
  mimeType: varchar("mime_type", { length: 100 }),
  sizeBytes: integer("size_bytes"),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  excerpt: text("excerpt").notNull().default(""),
  bodyHtml: text("body_html").notNull().default(""),
  titleAr: text("title_ar"),
  subtitleAr: text("subtitle_ar"),
  excerptAr: text("excerpt_ar"),
  bodyHtmlAr: text("body_html_ar"),
  titleEn: text("title_en"),
  subtitleEn: text("subtitle_en"),
  excerptEn: text("excerpt_en"),
  bodyHtmlEn: text("body_html_en"),
  category: varchar("category", { length: 100 }),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  coverImageId: integer("cover_image_id").references(() => media.id),
  imageUrl: text("image_url"),
  variant: varchar("variant", { length: 20 }).notNull().default("logo"),
  status: contentStatusEnum("status").notNull().default("published"),
  scheduledAt: timestamp("scheduled_at"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImageUrl: text("og_image_url"),
  viewCount: integer("view_count").notNull().default(0),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Gallery images for a news article, beyond the single cover image (up to 10, admin-ordered). */
export const newsImages = pgTable("news_images", {
  id: serial("id").primaryKey(),
  newsId: integer("news_id")
    .notNull()
    .references(() => news.id, { onDelete: "cascade" }),
  mediaId: integer("media_id")
    .notNull()
    .references(() => media.id, { onDelete: "cascade" }),
  alt: text("alt").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  description: text("description").notNull().default(""),
  bodyHtml: text("body_html").notNull().default(""),
  titleAr: text("title_ar"),
  subtitleAr: text("subtitle_ar"),
  descriptionAr: text("description_ar"),
  bodyHtmlAr: text("body_html_ar"),
  titleEn: text("title_en"),
  subtitleEn: text("subtitle_en"),
  descriptionEn: text("description_en"),
  bodyHtmlEn: text("body_html_en"),
  // Legacy free-text date fields kept for the existing homepage EventsSection display; auto-derived from eventDate below on write.
  startDate: varchar("start_date", { length: 20 }),
  endDate: varchar("end_date", { length: 20 }),
  note: text("note").notNull().default(""),
  eventDate: timestamp("event_date"),
  startTime: varchar("start_time", { length: 10 }),
  endTime: varchar("end_time", { length: 10 }),
  location: text("location").notNull().default(""),
  address: text("address").notNull().default(""),
  contactName: text("contact_name").notNull().default(""),
  contactPhone: varchar("contact_phone", { length: 50 }),
  openToPublic: boolean("open_to_public").notNull().default(true),
  registrationRequired: boolean("registration_required").notNull().default(false),
  registrationUrl: text("registration_url"),
  registrationPhone: varchar("registration_phone", { length: 50 }),
  registrationText: text("registration_text"),
  capacity: integer("capacity"),
  imageId: integer("image_id").references(() => media.id),
  status: contentStatusEnum("status").notNull().default("published"),
  scheduledAt: timestamp("scheduled_at"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImageUrl: text("og_image_url"),
  viewCount: integer("view_count").notNull().default(0),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const eventImages = pgTable("event_images", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  mediaId: integer("media_id")
    .notNull()
    .references(() => media.id, { onDelete: "cascade" }),
  alt: text("alt").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Tenders (מכרזים) — replaces the earlier static hardcoded list with a DB-backed, admin-managed module. */
export const tenders = pgTable("tenders", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  tenderNumber: varchar("tender_number", { length: 100 }),
  category: varchar("category", { length: 100 }),
  title: text("title").notNull(),
  titleAr: text("title_ar"),
  titleEn: text("title_en"),
  shortDescription: text("short_description").notNull().default(""),
  shortDescriptionAr: text("short_description_ar"),
  shortDescriptionEn: text("short_description_en"),
  bodyHtml: text("body_html").notNull().default(""),
  bodyHtmlAr: text("body_html_ar"),
  bodyHtmlEn: text("body_html_en"),
  publishDate: timestamp("publish_date"),
  submissionDeadline: timestamp("submission_deadline"),
  tenderStatus: tenderStatusEnum("tender_status").notNull().default("open"),
  status: contentStatusEnum("status").notNull().default("draft"),
  scheduledAt: timestamp("scheduled_at"),
  contactInfo: text("contact_info").notNull().default(""),
  notes: text("notes").notNull().default(""),
  coverImageId: integer("cover_image_id").references(() => media.id),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImageUrl: text("og_image_url"),
  viewCount: integer("view_count").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const tenderDocuments = pgTable("tender_documents", {
  id: serial("id").primaryKey(),
  tenderId: integer("tender_id")
    .notNull()
    .references(() => tenders.id, { onDelete: "cascade" }),
  mediaId: integer("media_id")
    .notNull()
    .references(() => media.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Downloadable forms shown on the public /טפסים page, managed from the admin Forms module. */
export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleAr: text("title_ar"),
  titleEn: text("title_en"),
  // Exactly one of these is normally set: an uploaded file (mediaId, resolved to a URL at read time)
  // or a manually entered external link (e.g. a gov.il page instead of a PDF we host).
  mediaId: integer("media_id").references(() => media.id),
  externalUrl: text("external_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  headName: text("head_name"),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  iconUrl: text("icon_url"),
  href: text("href").notNull(),
  showOnHomepage: boolean("show_on_homepage").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Scrolling breaking-news ticker shown at the top of the homepage, admin-managed. */
export const tickerItems = pgTable("ticker_items", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  href: text("href"),
  active: boolean("active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default(""),
  imageId: integer("image_id").references(() => media.id),
  videoUrl: text("video_url"),
  linkHref: text("link_href"),
  active: boolean("active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Singleton row (id always 1) for site-wide contact/footer settings. */
export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  siteName: text("site_name").notNull(),
  address: text("address").notNull().default(""),
  phone: varchar("phone", { length: 50 }).notNull().default(""),
  email: varchar("email", { length: 255 }).notNull().default(""),
  hours: jsonb("hours").$type<{ days: string; hours: string }[]>().notNull().default([]),
  socialLinks: jsonb("social_links").$type<{ label: string; href: string }[]>().notNull().default([]),
  defaultMetaTitle: text("default_meta_title"),
  defaultMetaDescription: text("default_meta_description"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const footerLinks = pgTable("footer_links", {
  id: serial("id").primaryKey(),
  columnTitle: text("column_title").notNull(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formType: varchar("form_type", { length: 100 }).notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Per-IP submission tracking for public-facing forms. DB-backed for the same reason as
 *  loginAttempts below — serverless functions don't share memory between invocations, so an
 *  in-memory counter would reset (or diverge across instances) constantly. */
export const formRateLimits = pgTable("form_rate_limits", {
  id: serial("id").primaryKey(),
  ip: varchar("ip", { length: 64 }).notNull(),
  formType: varchar("form_type", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  // Least-privilege default: a row inserted without an explicit role (there should never be
  // one — see the invite flow in src/app/actions/admin-users.ts) gets the lower-access role
  // rather than silently becoming a site-admin.
  // Physical column is "access_role", not "role": the live DB already has an undocumented
  // "role" (varchar) + "permissions" (jsonb) pair on this table that predates this codebase's
  // git history and isn't read by any app code found — left untouched pending investigation
  // (see docs/handover-cio.md open items) rather than colliding with or overwriting it.
  role: adminRoleEnum("access_role").notNull().default("content-editor"),
  // TOTP secret is stored as-is (base32), not further encrypted — protected by the same DB
  // access controls as password_hash. null until the user completes enrollment; totpEnabled
  // only flips to true after they've proven possession by entering one real code (see
  // confirmTotpEnrollmentAction), not merely after a secret is generated for them.
  totpSecret: text("totp_secret"),
  totpEnabled: boolean("totp_enabled").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Invite-only account creation: a site-admin creates a row here and shares the (one-time-shown,
 *  never-stored-in-plaintext) invite link themselves. The invitee sets their own password when
 *  accepting — nobody else ever sets or sees it. See src/app/actions/admin-invites.ts. */
export const adminInvites = pgTable("admin_invites", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  role: adminRoleEnum("role").notNull(),
  tokenHash: varchar("token_hash", { length: 64 }).notNull().unique(),
  invitedBy: integer("invited_by")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminSessions = pgTable("admin_sessions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // A session exists (password verified) but isn't usable for anything beyond the MFA challenge
  // itself until this flips to true. Sessions for accounts without TOTP enabled are created with
  // this already true (nothing to verify) — see createSession's requireMfa param.
  mfaVerified: boolean("mfa_verified").notNull().default(false),
});

/** Failed-login tracking for rate limiting. DB-backed (not in-memory) since serverless functions
 *  don't share memory between invocations. */
export const loginAttempts = pgTable("login_attempts", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** One row per public-page load, logged via a client-side beacon (see VisitTracker). Powers the admin
 *  dashboard's daily/monthly visitor counts — not a full analytics system, just page-load counts. */
export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Public resident accounts (the site's "personal area" sign-in/sign-up), separate from adminUsers. */
export const residents = pgTable("residents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const residentSessions = pgTable("resident_sessions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  residentId: integer("resident_id")
    .notNull()
    .references(() => residents.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
