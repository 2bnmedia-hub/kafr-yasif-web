"use server";

import { randomUUID } from "crypto";
import { put } from "@vercel/blob";
import * as z from "zod";
import { getServerLocale } from "@/i18n/get-locale";
import type { Locale } from "@/i18n/config";
import { validateUploadedFile } from "@/lib/upload-validation";
import { getClientIp, isFormRateLimited, recordFormSubmissionAttempt } from "@/lib/form-rate-limit";

export type PublicInquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// Resident-submitted attachments (photos of a hazard, a scanned complaint letter) are personal
// data tied to a named complaint, so this is deliberately smaller than the 50MB admin-media cap
// and restricted to image/pdf — no office documents, which carry more macro/embedded-content risk.
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10MB
const FORM_TYPE = "public-inquiry";

const MESSAGES: Record<
  Locale,
  { required: string; badEmail: string; badPhone: string; badFile: string; rateLimited: string; down: string; success: string }
> = {
  he: {
    required: "נא למלא את כל שדות החובה.",
    badEmail: "כתובת הדואר האלקטרוני שהוזנה אינה תקינה.",
    badPhone: "מספר הטלפון שהוזן אינו תקין.",
    badFile: "לא ניתן לצרף את הקובץ. יש לצרף PDF או תמונה (JPG/PNG) עד 10MB.",
    rateLimited: "נשלחו יותר מדי פניות מכתובת זו. נא לנסות שוב בעוד כמה דקות.",
    down: "מערכת קליטת הפניות בתחזוקה זמנית. אנא פנו ישירות במייל mivaker@kafr-yasif.muni.il.",
    success: "הפנייה נשלחה בהצלחה. ניצור איתך קשר בהקדם.",
  },
  ar: {
    required: "يرجى تعبئة جميع الحقول الإلزامية.",
    badEmail: "عنوان البريد الإلكتروني الذي تم إدخاله غير صالح.",
    badPhone: "رقم الهاتف الذي تم إدخاله غير صالح.",
    badFile: "تعذر إرفاق الملف. يرجى إرفاق PDF أو صورة (JPG/PNG) حتى 10 ميغابايت.",
    rateLimited: "تم إرسال عدد كبير جداً من الطلبات من هذا العنوان. يرجى المحاولة مرة أخرى بعد بضع دقائق.",
    down: "نظام استقبال الطلبات في صيانة مؤقتة. يرجى التواصل مباشرة عبر البريد الإلكتروني mivaker@kafr-yasif.muni.il.",
    success: "تم إرسال الطلب بنجاح. سنتواصل معك في أقرب وقت ممكن.",
  },
  en: {
    required: "Please fill in all required fields.",
    badEmail: "The email address entered is not valid.",
    badPhone: "The phone number entered is not valid.",
    badFile: "The file couldn't be attached. Please attach a PDF or image (JPG/PNG) up to 10MB.",
    rateLimited: "Too many inquiries have been sent from this address. Please try again in a few minutes.",
    down: "The inquiry system is temporarily under maintenance. Please contact us directly at mivaker@kafr-yasif.muni.il.",
    success: "Your inquiry has been sent successfully. We will contact you soon.",
  },
};

const inquirySchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().min(1).email(),
  phone: z
    .string()
    .trim()
    .min(1)
    .regex(/^[\d\s+()-]{7,}$/),
  department: z.string().trim().min(1),
  subject: z.string().trim().min(1),
});

export async function submitPublicInquiry(
  _prevState: PublicInquiryState,
  formData: FormData
): Promise<PublicInquiryState> {
  const locale = await getServerLocale();
  const m = MESSAGES[locale];

  // Hidden honeypot field — real visitors never see or fill it (see PublicInquiryForm.tsx).
  // Bots that fill every field get a fake success so they don't learn to avoid this field.
  if (String(formData.get("_honey") ?? "").length > 0) {
    return { status: "success", message: m.success };
  }

  const ip = await getClientIp();
  if (await isFormRateLimited(ip, FORM_TYPE)) {
    return { status: "error", message: m.rateLimited };
  }

  const parsed = inquirySchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    department: formData.get("department"),
    subject: formData.get("subject"),
  });

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    if (fieldErrors.email) return { status: "error", message: m.badEmail };
    if (fieldErrors.phone) return { status: "error", message: m.badPhone };
    return { status: "error", message: m.required };
  }

  const { fullName, email, phone, department, subject } = parsed.data;

  const file = formData.get("file");
  const hasFile = file instanceof File && file.size > 0;

  if (hasFile && file.size > MAX_ATTACHMENT_BYTES) {
    return { status: "error", message: m.badFile };
  }

  let attachment: { pathname: string; originalName: string; mimeType: string; sizeBytes: number } | null = null;

  if (hasFile) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const validation = await validateUploadedFile(buffer, file.name, ["image", "pdf"]);
    if (!validation.ok) {
      return { status: "error", message: m.badFile };
    }

    const pathname = `inquiry-attachments/${randomUUID()}.${validation.extension}`;
    const blob = await put(pathname, buffer, {
      access: "private",
      contentType: validation.mimeType,
    });
    attachment = { pathname: blob.pathname, originalName: file.name, mimeType: validation.mimeType, sizeBytes: file.size };
  }

  if (!process.env.DATABASE_URL) {
    console.error("Public inquiry received but DATABASE_URL is not configured yet:", {
      fullName,
      email,
      phone,
      department,
      subject,
    });
    return { status: "error", message: m.down };
  }

  const { db } = await import("@/db");
  const { formSubmissions } = await import("@/db/schema");

  await recordFormSubmissionAttempt(ip, FORM_TYPE);

  await db.insert(formSubmissions).values({
    formType: FORM_TYPE,
    data: { fullName, email, phone, department, subject, attachment },
  });

  return { status: "success", message: m.success };
}
