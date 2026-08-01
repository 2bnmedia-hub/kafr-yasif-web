CREATE TYPE "public"."content_status" AS ENUM('draft', 'published', 'hidden', 'scheduled');--> statement-breakpoint
CREATE TYPE "public"."tender_status" AS ENUM('open', 'closed', 'awarded', 'cancelled');--> statement-breakpoint

ALTER TABLE "media" ADD COLUMN "mime_type" varchar(100);--> statement-breakpoint

ALTER TABLE "news" ADD COLUMN "subtitle" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "title_ar" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "subtitle_ar" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "excerpt_ar" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "body_html_ar" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "title_en" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "subtitle_en" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "excerpt_en" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "body_html_en" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "category" varchar(100);--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "tags" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "status" "content_status" DEFAULT 'published' NOT NULL;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "scheduled_at" timestamp;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "meta_title" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "meta_description" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "og_image_url" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "view_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint

CREATE TABLE "news_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"news_id" integer NOT NULL,
	"media_id" integer NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);--> statement-breakpoint
ALTER TABLE "news_images" ADD CONSTRAINT "news_images_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news_images" ADD CONSTRAINT "news_images_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "events" ADD COLUMN "slug" varchar(255);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "body_html" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "title_ar" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "subtitle_ar" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "description_ar" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "body_html_ar" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "title_en" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "subtitle_en" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "description_en" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "body_html_en" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "event_date" timestamp;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "start_time" varchar(10);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "end_time" varchar(10);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "address" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "contact_name" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "contact_phone" varchar(50);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "open_to_public" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "registration_required" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "registration_url" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "registration_phone" varchar(50);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "registration_text" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "capacity" integer;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "status" "content_status" DEFAULT 'published' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "scheduled_at" timestamp;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "meta_title" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "meta_description" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "og_image_url" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "view_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_slug_unique" UNIQUE("slug");--> statement-breakpoint

CREATE TABLE "event_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"media_id" integer NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);--> statement-breakpoint
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

CREATE TABLE "tenders" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"tender_number" varchar(100),
	"category" varchar(100),
	"title" text NOT NULL,
	"title_ar" text,
	"title_en" text,
	"short_description" text DEFAULT '' NOT NULL,
	"short_description_ar" text,
	"short_description_en" text,
	"body_html" text DEFAULT '' NOT NULL,
	"body_html_ar" text,
	"body_html_en" text,
	"publish_date" timestamp,
	"submission_deadline" timestamp,
	"tender_status" "tender_status" DEFAULT 'open' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"scheduled_at" timestamp,
	"contact_info" text DEFAULT '' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"meta_title" text,
	"meta_description" text,
	"og_image_url" text,
	"view_count" integer DEFAULT 0 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tenders_slug_unique" UNIQUE("slug")
);--> statement-breakpoint

CREATE TABLE "tender_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"tender_id" integer NOT NULL,
	"media_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "tender_documents" ADD CONSTRAINT "tender_documents_tender_id_tenders_id_fk" FOREIGN KEY ("tender_id") REFERENCES "public"."tenders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tender_documents" ADD CONSTRAINT "tender_documents_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
