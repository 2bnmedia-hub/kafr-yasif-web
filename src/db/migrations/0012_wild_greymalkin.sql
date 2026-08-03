CREATE TYPE "public"."audit_log_action" AS ENUM('login_success', 'login_failure', 'logout', 'content_create', 'content_update', 'content_delete', 'content_publish', 'content_unpublish', 'permission_change', 'user_invite', 'submission_view', 'attachment_download');--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"action" "audit_log_action" NOT NULL,
	"actor_admin_id" integer,
	"actor_email" varchar(255),
	"target_type" varchar(50),
	"target_id" varchar(100),
	"ip" varchar(64),
	"detail" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_admin_id_admin_users_id_fk" FOREIGN KEY ("actor_admin_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;