import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import type { adminUsers } from "@/db/schema";

export type AdminRole = (typeof adminUsers.$inferSelect)["role"];
export type AdminUser = typeof adminUsers.$inferSelect;

/**
 * Capability matrix (see docs/handover-cio.md for the human-readable table). Default-deny: a
 * capability not listed here for a role is not granted — there is no wildcard/fallback case.
 */
const CAPABILITIES = {
  "content:edit": ["site-admin", "content-editor"], // create/edit content, as a draft
  "content:publish": ["site-admin"],
  "content:delete": ["site-admin"],
  "media:upload": ["site-admin", "content-editor"],
  "submissions:view": ["site-admin"],
  "users:manage": ["site-admin"],
  "settings:manage": ["site-admin"],
  "audit-log:view": ["site-admin"],
} as const satisfies Record<string, readonly AdminRole[]>;

export type Capability = keyof typeof CAPABILITIES;

export function roleCan(role: AdminRole, capability: Capability): boolean {
  return (CAPABILITIES[capability] as readonly AdminRole[]).includes(role);
}

/** For server actions/route handlers: throws if there's no session, or if the session's role
 *  lacks the given capability. Never returns a "denied" value the caller could accidentally
 *  ignore — a missing capability is a thrown error, always. */
export async function requireCapability(capability: Capability): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Unauthorized: no active admin session");
  if (!roleCan(admin.role, capability)) {
    throw new Error(`Forbidden: role "${admin.role}" lacks capability "${capability}"`);
  }
  return admin;
}

/** For Server Components (pages): redirects rather than throwing, since there's no error
 *  boundary a thrown thrown-during-render error would usefully surface to as JSON here. */
export async function requireCapabilityOrRedirect(capability: Capability): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  if (!roleCan(admin.role, capability)) redirect("/admin");
  return admin;
}

/**
 * content-editor may create or edit content only while it stays a draft ("✔ (טיוטות)" in the
 * capability table) — a site-admin has no such restriction. This throws whenever a
 * content-editor's request touches anything already published, or asks to publish: editing a
 * live page's typo, unpublishing something, or publishing a new item are all site-admin-only,
 * since all of them change what a visitor currently sees or is about to see.
 */
export function assertContentMutationAllowed(
  admin: AdminUser,
  params: { currentlyPublished: boolean; requestedPublished: boolean }
): void {
  if (roleCan(admin.role, "content:publish")) return;
  if (params.currentlyPublished || params.requestedPublished) {
    throw new Error(`Forbidden: role "${admin.role}" may only create or edit draft content, and cannot publish`);
  }
}
