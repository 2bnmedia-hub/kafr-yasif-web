import { TOTP, Secret } from "otpauth";
import QRCode from "qrcode";

const ISSUER = "כפר יאסיף - ניהול אתר";

export function generateTotpSecret(): string {
  return new Secret({ size: 20 }).base32;
}

function totpFor(secretBase32: string, email: string): TOTP {
  return new TOTP({
    issuer: ISSUER,
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secretBase32),
  });
}

/** window: 1 tolerates the previous/next 30s step, absorbing minor clock drift between the
 *  server and the user's authenticator app without meaningfully widening the valid code window. */
export function verifyTotpCode(secretBase32: string, email: string, code: string): boolean {
  if (!/^\d{6}$/.test(code)) return false;
  const delta = totpFor(secretBase32, email).validate({ token: code, window: 1 });
  return delta !== null;
}

export async function getTotpEnrollmentQrDataUrl(secretBase32: string, email: string): Promise<string> {
  const uri = totpFor(secretBase32, email).toString();
  return QRCode.toDataURL(uri);
}
