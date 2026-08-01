import type { Locale } from "./config";

/**
 * Arabic/English translations for every nav, footer, and site-chrome label used across the app.
 * Keyed by the canonical Hebrew source string (the single source of truth used throughout nav.ts
 * and the layout components). Deep department/page *content* is out of scope here — this covers
 * navigation, menus, buttons, and static chrome text only.
 */
const NAV_LABELS: Record<string, { ar: string; en: string }> = {
  // Main nav
  "דף בית": { ar: "الصفحة الرئيسية", en: "Home" },
  "מרכזי מידע": { ar: "مراكز المعلومات", en: "Information Center" },
  "מחלקות המועצה": { ar: "أقسام المجلس", en: "Council Departments" },
  "שירותי תושב": { ar: "خدمات المواطن", en: "Resident Services" },
  "ביטחון וחירום": { ar: "الأمن والطوارئ", en: "Security & Emergency" },
  "צור קשר": { ar: "اتصل بنا", en: "Contact Us" },

  // Quick tags
  "תשלום ארנונה": { ar: "دفع الأرنونا", en: "Pay Property Tax" },
  "רישום לחינוך": { ar: "التسجيل للتعليم", en: "Education Registration" },
  "אישור תושב": { ar: "شهادة إقامة", en: "Resident Certificate" },
  "פניות הציבור": { ar: "طلبات الجمهور", en: "Public Inquiries" },
  "תלונות הציבור": { ar: "شكاوى الجمهور", en: "Public Complaints" },
  "מכרזים": { ar: "المناقصات", en: "Tenders" },
  "מוקד שירות": { ar: "مركز الخدمة", en: "Service Center" },

  // Footer column: ביטחון וחירום
  "אגף חירום וביטחון": { ar: "شعبة الطوارئ والأمن", en: "Emergency & Security Division" },
  "הנחיות ופקודות פיקוד העורף": { ar: "تعليمات وأوامر قيادة الجبهة الداخلية", en: "Home Front Command Guidelines" },
  "חומר הסברה לשעת חירום": { ar: "مواد توعية لحالات الطوارئ", en: "Emergency Preparedness Guide" },

  // Footer column: שירות לתושב
  "טפסים": { ar: "نماذج", en: "Forms" },
  "תשלומים": { ar: "المدفوعات", en: "Payments" },
  "קישורים חשובים": { ar: "روابط هامة", en: "Important Links" },

  // Footer column: מחלקות המועצה
  "לשכת ראש המועצה": { ar: "مكتب رئيس المجلس", en: "Office of the Mayor" },
  'מנכ"ל ומזכירות': { ar: "المدير العام وأمانة السر", en: "Director General & Secretariat" },
  "הנהלת המועצה": { ar: "إدارة المجلس", en: "Council Leadership" },
  "מבקר המועצה": { ar: "مراقب المجلس", en: "Council Comptroller" },
  "הנדסה, תשתיות ופיתוח": { ar: "الهندسة والبنى التحتية والتطوير", en: "Engineering, Infrastructure & Development" },
  "גזברות וגביה": { ar: "الخزينة والجباية", en: "Treasury & Collections" },
  "ארנונה": { ar: "الأرنونا", en: "Property Tax" },
  "חינוך": { ar: "التربية والتعليم", en: "Education" },
  "הספריה הציבורית": { ar: "المكتبة العامة", en: "Public Library" },
  "תברואה ורישוי עסקים": { ar: "الصحة العامة وترخيص الأعمال", en: "Sanitation & Business Licensing" },
  "רכש": { ar: "المشتريات", en: "Procurement" },
  "רווחה": { ar: "الرفاه الاجتماعي", en: "Welfare" },
  "מחלקה משפטית": { ar: "القسم القانوني", en: "Legal Department" },
  "שירות פסיכולוגי": { ar: "الخدمة النفسية", en: "Psychological Service" },
  "יחידת הנוער": { ar: "وحدة الشبيبة", en: "Youth Unit" },
  "מרכז צעירים": { ar: "مركز الشباب", en: "Young Adults Center" },
  "ספורט": { ar: "الرياضة", en: "Sports" },
  "שיטור מקומי": { ar: "الشرطة المحلية", en: "Local Policing" },
  "ביטחון קהילתי": { ar: "الأمن المجتمعي", en: "Community Security" },
  "מזכירות": { ar: "أمانة السر", en: "Secretariat" },

  // Footer column: מרכזי מידע
  "נעים להכיר": { ar: "تعرّف علينا", en: "Get to Know Us" },
  "על המועצה": { ar: "عن المجلس", en: "About the Council" },
  "קצת היסטוריה": { ar: "لمحة تاريخية", en: "A Bit of History" },
  "חזון המועצה": { ar: "رؤية المجلس", en: "Council Vision" },
  "חוקי עזר": { ar: "القوانين المساعدة", en: "Municipal Bylaws" },
  "צווי ארנונה": { ar: "أوامر الأرنونا", en: "Property Tax Orders" },
  "דוחות רשות כספיים": { ar: "التقارير المالية للسلطة", en: "Financial Reports" },
  "דו״חות ממשלתיים": { ar: "تقارير حكومية", en: "Government Reports" },
  "פרוטוקולי ישיבות המועצה": { ar: "محاضر جلسات المجلس", en: "Council Meeting Minutes" },
  "שעות קבלה וכתובת": { ar: "ساعات الاستقبال والعنوان", en: "Reception Hours & Address" },
  "המבנה הארגוני": { ar: "الهيكل التنظيمي", en: "Organizational Structure" },

  // Contact / footer static text
  "מועצה מקומית כפר יאסיף תמיד כאן לשירותך!": { ar: "المجلس المحلي كفر ياسيف دائماً في خدمتكم!", en: "Kafr Yasif Local Council is always at your service!" },
  "לפניות הציבור - נא לשלוח מייל לכתובת:": { ar: "لتقديم استفسارات الجمهور - يرجى إرسال بريد إلكتروني إلى:", en: "For public inquiries, please email:" },
  "עקבו אחרינו": { ar: "تابعونا", en: "Follow Us" },
  "שעות פעילות": { ar: "ساعات العمل", en: "Business Hours" },
  "הצהרת נגישות": { ar: "بيان إمكانية الوصول", en: "Accessibility Statement" },
  "תנאי שימוש": { ar: "شروط الاستخدام", en: "Terms of Use" },
  "מדיניות פרטיות": { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  "לובי בניין המועצה המקומית כפר יאסיף": { ar: "ردهة مبنى المجلس المحلي كفر ياسيف", en: "Kafr Yasif Council Building Lobby" },

  // Days of week
  "ראשון": { ar: "الأحد", en: "Sunday" },
  "שני": { ar: "الاثنين", en: "Monday" },
  "שלישי": { ar: "الثلاثاء", en: "Tuesday" },
  "רביעי": { ar: "الأربعاء", en: "Wednesday" },
  "חמישי": { ar: "الخميس", en: "Thursday" },
  "שישי": { ar: "الجمعة", en: "Friday" },
  "שבת": { ar: "السبت", en: "Saturday" },
  "סגור (יום חופש)": { ar: "مغلق (يوم عطلة)", en: "Closed (day off)" },

  // Footer legal line
  "© כל הזכויות שמורות למועצה המקומית כפר יאסיף": {
    ar: "© جميع الحقوق محفوظة للمجلس المحلي كفر ياسيف",
    en: "© All rights reserved to Kafr Yasif Local Council",
  },
  "האתר מספק מידע כללי בלבד. הנוסח המחייב הוא בהוראות הדין הקבוע ולא הרלוונטיות כפי שתהיינה בתוקף מעת לעת.": {
    ar: "يوفر الموقع معلومات عامة فقط. النص الملزم هو ما ورد في أحكام القانون ذات الصلة كما ستكون سارية المفعول من وقت لآخر.",
    en: "This site provides general information only. The binding text is that set out in the relevant legal provisions as they may be amended from time to time.",
  },
  'בניה, עיצוב ותחזוקה ע"י': { ar: "بناء وتصميم وصيانة بواسطة", en: "Built, designed & maintained by" },
};

export function tNav(hebrew: string, locale: Locale): string {
  if (locale === "he") return hebrew;
  return NAV_LABELS[hebrew]?.[locale] ?? hebrew;
}
