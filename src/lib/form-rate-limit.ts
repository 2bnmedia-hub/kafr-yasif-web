import { headers } from "next/headers";
import { and, eq, gte, count } from "drizzle-orm";
import { db } from "@/db";
import { formRateLimits } from "@/db/schema";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

/** Vercel sets x-forwarded-for to "client, proxy1, proxy2, ..." — the first entry is the client. */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function isFormRateLimited(ip: string, formType: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - WINDOW_MS);
  const [{ value }] = await db
    .select({ value: count() })
    .from(formRateLimits)
    .where(and(eq(formRateLimits.ip, ip), eq(formRateLimits.formType, formType), gte(formRateLimits.createdAt, windowStart)));
  return value >= MAX_SUBMISSIONS_PER_WINDOW;
}

export async function recordFormSubmissionAttempt(ip: string, formType: string): Promise<void> {
  await db.insert(formRateLimits).values({ ip, formType });
}
