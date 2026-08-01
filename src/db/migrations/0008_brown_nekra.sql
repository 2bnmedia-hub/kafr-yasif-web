CREATE TABLE "form_rate_limits" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip" varchar(64) NOT NULL,
	"form_type" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
