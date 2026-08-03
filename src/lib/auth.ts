import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { eq, and, gte, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminSessions, adminUsers, loginAttempts } from "@/db/schema";

const SESSION_COOKIE = "admin_session";
// Sliding idle window: each authenticated request pushes expiresAt forward by this much...
const SESSION_IDLE_MS = 30 * 60 * 1000; // 30 minutes
// ...but never past createdAt + this hard cap, regardless of activity.
const SESSION_MAX_LIFETIME_MS = 8 * 60 * 60 * 1000; // 8 hours

const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // rolling 24h window of failed attempts
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const LOCKOUT_BASE_MS = 30 * 1000; // 30s lockout starting at the 5th failure
const LOCKOUT_MAX_MS = 15 * 60 * 1000; // doubles per subsequent failure, capped at 15 min

/** DB-backed (not in-memory) so this actually works across serverless function instances.
 *  Progressive: the lockout doubles for each failed attempt past the 5th (30s, 1m, 2m, ... 15m
 *  cap), measured from the most recent failure — not a flat block. */
export async function isRateLimited(email: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
  const attempts = await db
    .select({ createdAt: loginAttempts.createdAt })
    .from(loginAttempts)
    .where(and(eq(loginAttempts.email, email.toLowerCase()), gte(loginAttempts.createdAt, windowStart)))
    .orderBy(desc(loginAttempts.createdAt));

  if (attempts.length < RATE_LIMIT_MAX_ATTEMPTS) return false;

  const overage = attempts.length - RATE_LIMIT_MAX_ATTEMPTS;
  const lockoutMs = Math.min(LOCKOUT_MAX_MS, LOCKOUT_BASE_MS * 2 ** overage);
  const lockedUntil = new Date(attempts[0].createdAt.getTime() + lockoutMs);
  return lockedUntil > new Date();
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
  const now = Date.now();
  const expiresAt = new Date(now + SESSION_IDLE_MS);
  await db.insert(adminSessions).values({ id, userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(now + SESSION_MAX_LIFETIME_MS),
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
  if (!row) return null;

  const now = Date.now();
  const hardCap = row.session.createdAt.getTime() + SESSION_MAX_LIFETIME_MS;
  if (row.session.expiresAt.getTime() < now || now > hardCap) {
    await db.delete(adminSessions).where(eq(adminSessions.id, sessionId));
    return null;
  }

  // Slide the idle window forward, but never past the absolute 8h cap from session creation.
  const nextExpiry = new Date(Math.min(now + SESSION_IDLE_MS, hardCap));
  if (nextExpiry.getTime() > row.session.expiresAt.getTime()) {
    await db.update(adminSessions).set({ expiresAt: nextExpiry }).where(eq(adminSessions.id, sessionId));
  }

  return row.user;
}
