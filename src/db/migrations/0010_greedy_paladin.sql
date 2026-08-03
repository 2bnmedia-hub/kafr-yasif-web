CREATE TABLE "admin_invites" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" "admin_role" NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"invited_by" integer NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_invites_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
ALTER TABLE "admin_invites" ADD CONSTRAINT "admin_invites_invited_by_admin_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."admin_users"("id") ON DELETE cascade ON UPDATE no action;