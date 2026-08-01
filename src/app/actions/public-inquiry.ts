"use server";

export type PublicInquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitPublicInquiry(
  _prevState: PublicInquiryState,
  formData: FormData
): Promise<PublicInquiryState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const file = formData.get("file");
  const fileName = file instanceof File && file.size > 0 ? file.name : null;

  if (!fullName || !email || !phone || !department || !subject) {
    return { status: "error", message: "נא למלא את כל שדות החובה." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "כתובת הדואר האלקטרוני שהוזנה אינה תקינה." };
  }

  if (!/^[\d\s+()-]{7,}$/.test(phone)) {
    return { status: "error", message: "מספר הטלפון שהוזן אינו תקין." };
  }

  if (!process.env.DATABASE_URL) {
    console.error("Public inquiry received but DATABASE_URL is not configured yet:", {
      fullName,
      email,
      phone,
      department,
      subject,
    });
    return {
      status: "error",
      message:
        "מערכת קליטת הפניות בתחזוקה זמנית. אנא פנו ישירות במייל mivaker@kafr-yasif.muni.il.",
    };
  }

  const { db } = await import("@/db");
  const { formSubmissions } = await import("@/db/schema");

  await db.insert(formSubmissions).values({
    formType: "public-inquiry",
    data: { fullName, email, phone, department, subject, fileName },
  });

  return { status: "success", message: "הפנייה נשלחה בהצלחה. ניצור איתך קשר בהקדם." };
}
