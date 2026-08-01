import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { eq, and, gte, count } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { residentSessions, residents, loginAttempts } from "@/db/schema";

const SESSION_COOKIE = "resident_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

export async function isResidentRateLimited(email: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
  const [{ value }] = await db
    .select({ value: count() })
    .from(loginAttempts)
    .where(and(eq(loginAttempts.email, email.toLowerCase()), gte(loginAttempts.createdAt, windowStart)));
  return value >= RATE_LIMIT_MAX_ATTEMPTS;
}

async function recordFailedAttempt(email: string) {
  await db.insert(loginAttempts).values({ email: email.toLowerCase() });
}

// Fixed dummy hash so a nonexistent-email lookup still runs bcrypt.compare — keeps response
// time consistent regardless of whether the account exists, avoiding email-enumeration via timing.
const DUMMY_HASH = "$2a$10$CwTycUXWue0Thq9StjUM0uJ8G9AjMXH6L2xqoY6WWU9v1o5U6bMWa";

export async function verifyResidentLogin(email: string, password: string) {
  const rows = await db.select().from(residents).where(eq(residents.email, email.toLowerCase())).limit(1);
  const resident = rows[0];
  const valid = (await bcrypt.compare(password, resident?.passwordHash ?? DUMMY_HASH)) && !!resident;

  if (!valid) {
    await recordFailedAttempt(email);
    return null;
  }
  return resident;
}

type CreateResidentResult = { error: string } | { resident: typeof residents.$inferSelect };

export async function createResident(name: string, email: string, password: string): Promise<CreateResidentResult> {
  const existing = await db.select({ id: residents.id }).from(residents).where(eq(residents.email, email.toLowerCase())).limit(1);
  if (existing[0]) return { error: "כתובת הדוא\"ל הזו כבר רשומה במערכת." };

  const passwordHash = await bcrypt.hash(password, 10);
  const [resident] = await db
    .insert(residents)
    .values({ name, email: email.toLowerCase(), passwordHash })
    .returning();
  return { resident };
}

export async function createResidentSession(residentId: number) {
  const id = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(residentSessions).values({ id, residentId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroyResidentSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionId) {
    await db.delete(residentSessions).where(eq(residentSessions.id, sessionId));
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentResident() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const rows = await db
    .select({ resident: residents, session: residentSessions })
    .from(residentSessions)
    .innerJoin(residents, eq(residentSessions.residentId, residents.id))
    .where(eq(residentSessions.id, sessionId))
    .limit(1);

  const row = rows[0];
  if (!row || row.session.expiresAt < new Date()) return null;
  return row.resident;
}
