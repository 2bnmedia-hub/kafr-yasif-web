CREATE TABLE "ticker_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"href" text,
	"active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
