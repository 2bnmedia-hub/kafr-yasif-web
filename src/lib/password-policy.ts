import { createHash } from "crypto";

const MIN_LENGTH = 12;

export type PasswordValidation = { ok: true } | { ok: false; reason: string };

/**
 * Checks a password against Have I Been Pwned's Pwned Passwords API using k-anonymity: only the
 * first 5 hex characters of the SHA-1 hash are sent, so HIBP never sees the actual password (or
 * even enough of its hash to reverse it) — https://haveibeenpwned.com/API/v3#PwnedPasswords.
 * Fails open (treats the password as not-pwned) if the API is unreachable, so a third-party
 * outage can't block legitimate account creation.
 */
async function isPasswordPwned(password: string): Promise<boolean> {
  const sha1 = createHash("sha1").update(password, "utf8").digest("hex").toUpperCase();
  const prefix = sha1.slice(0, 5);
  const suffix = sha1.slice(5);

  try {
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { "User-Agent": "kafr-yasif-web-password-check" },
    });
    if (!res.ok) return false;
    const text = await res.text();
    return text.split("\n").some((line) => line.split(":")[0].trim() === suffix);
  } catch {
    return false;
  }
}

/**
 * Minimum 12 characters + not a known-breached password (HIBP k-anonymity). Deliberately no
 * complexity rules (uppercase/digit/symbol requirements) and no forced rotation — length plus a
 * breach check is the current NIST SP 800-63B guidance, and complexity/rotation rules push users
 * toward predictable patterns instead of stronger passwords.
 */
export async function validatePassword(password: string): Promise<PasswordValidation> {
  if (password.length < MIN_LENGTH) {
    return { ok: false, reason: `הסיסמה חייבת להכיל לפחות ${MIN_LENGTH} תווים.` };
  }
  if (await isPasswordPwned(password)) {
    return { ok: false, reason: "סיסמה זו הופיעה בדליפות מידע ידועות. יש לבחור סיסמה אחרת." };
  }
  return { ok: true };
}
