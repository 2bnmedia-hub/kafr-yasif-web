import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { eq, and, gte, count } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminSessions, adminUsers, loginAttempts } from "@/db/schema";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

/** DB-backed (not in-memory) so this actually works across serverless function instances. */
export async function isRateLimited(email: string): Promise<boolean> {
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

export async function verifyLogin(email: string, password: string) {
  const rows = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  const user = rows[0];
  const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH) && !!user;

  if (!valid) {
    await recordFailedAttempt(email);
    return null;
  }
  return user;
}

export async function createSession(userId: number) {
  const id = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(adminSessions).values({ id, userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionId) {
    await db.delete(adminSessions).where(eq(adminSessions.id, sessionId));
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const rows = await db
    .select({ user: adminUsers, session: adminSessions })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
    .where(eq(adminSessions.id, sessionId))
    .limit(1);

  const row = rows[0];
  if (!row || row.session.expiresAt < new Date()) return null;
  return row.user;
}
