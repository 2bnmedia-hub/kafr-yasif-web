CREATE TABLE "resident_sessions" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"resident_id" integer NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "residents" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "residents_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "resident_sessions" ADD CONSTRAINT "resident_sessions_resident_id_residents_id_fk" FOREIGN KEY ("resident_id") REFERENCES "public"."residents"("id") ON DELETE cascade ON UPDATE no action;