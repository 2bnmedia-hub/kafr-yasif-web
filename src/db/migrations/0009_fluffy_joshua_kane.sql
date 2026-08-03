CREATE TYPE "public"."admin_role" AS ENUM('site-admin', 'content-editor');--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "access_role" "admin_role" DEFAULT 'content-editor' NOT NULL;--> statement-breakpoint
-- Every admin_users row that predates this column was created before roles existed, with full
-- access. Backfill them to site-admin so nobody's access is silently downgraded by this
-- migration; from here on, new accounts only ever get a role via the explicit invite flow.
UPDATE "admin_users" SET "access_role" = 'site-admin';