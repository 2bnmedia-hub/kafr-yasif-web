ALTER TABLE "admin_sessions" ADD COLUMN "mfa_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "totp_secret" text;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "totp_enabled" boolean DEFAULT false NOT NULL;