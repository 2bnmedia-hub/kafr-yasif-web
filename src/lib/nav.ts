export type NavItem = {
  label: string;
  href: string;
};

/** Real nav + all hrefs below use the exact URL slugs migrated from the source site. */
export const mainNav: NavItem[] = [
  { label: "דף בית", href: "/" },
  { label: "מרכזי מידע", href: "/מרכזמידע" },
  { label: "מחלקות המועצה", href: "/מחלקות-המועצה" },
  { label: "שירותי תושב", href: "/שירותי-תושב" },
  { label: "ביטחון וחירום", href: "/ביטחוןוחירום" },
  { label: "צור קשר", href: "/צור-קשר" },
];

export const quickTags: { label: string; href: string; icon: string; external?: boolean }[] = [
  {
    label: "תשלום ארנונה",
    href: "https://city4u.co.il/PortalServicesSite/cityPay/905070/mislaka/1",
    icon: "/icons/property-tax.png",
    external: true,
  },
  { label: "רישום לחינוך", href: "/חינוך", icon: "/icons/education-registration.png" },
  {
    label: "אישור תושב",
    href: "https://por310.cityforms.co.il/ApplicationBuilder/eFormRender.html?code=B81D0050568A7C1511EE3206A007F3A0&Process=ProcessResidenceConfirmation",
    icon: "/icons/resident-certificate.png",
    external: true,
  },
  { label: "פניות הציבור", href: "/פניות-הציבור", icon: "/icons/public-inquiries.png" },
  { label: "תלונות הציבור", href: "/תלונות-הציבור", icon: "/icons/public-complaints.png" },
  { label: "ביטחון וחירום", href: "/ביטחוןוחירום", icon: "/icons/security-emergency.png" },
  { label: "מכרזים", href: "/מכרזים", icon: "/icons/tenders.png" },
  { label: "מוקד שירות", href: "/צור-קשר", icon: "/icons/service-center.png" },
];

/** Same as quickTags, plus two extra shortcuts shown only in the search panel's quick-pick
 *  pills — not in the homepage icon row below the hero, which stays at the original 8. */
export const searchQuickTags: { label: string; href: string; icon: string; external?: boolean }[] = [
  ...quickTags,
  { label: "טפסים", href: "/טפסים", icon: "/icons/forms.png" },
  { label: "תשלומים", href: "/לתשלומים", icon: "/icons/payments.png" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "ביטחון וחירום",
    links: [
      { label: "אגף חירום וביטחון", href: "/אגף-חירום-וביטחון" },
      { label: "הנחיות ופקודות פיקוד העורף", href: "/הנחיות-ופקודות-פיקוד-העורף" },
      { label: "חומר הסברה לשעת חירום", href: "/חומר-הסברה-לשעת-חירום" },
    ],
  },
  {
    title: "שירות לתושב",
    links: [
      { label: "מכרזים", href: "/מכרזים" },
      { label: "טפסים", href: "/טפסים" },
      { label: "תשלומים", href: "/לתשלומים" },
      { label: "פניות הציבור", href: "/פניות-הציבור" },
      { label: "תלונות הציבור", href: "/תלונות-הציבור" },
      { label: "אישור תושב", href: "/אישור-תושב" },
      { label: "קישורים חשובים", href: "/קישורים-חשובים" },
    ],
  },
  {
    title: "מחלקות המועצה",
    links: [
      { label: "לשכת ראש המועצה", href: "/לשכת-ראש-המועצה" },
      { label: "מנכ\"ל ומזכירות", href: "/מנכל-ומזכירות" },
      { label: "הנהלת המועצה", href: "/הנהלת-המועצה" },
      { label: "מבקר המועצה", href: "/מבקר-המועצה" },
      { label: "הנדסה, תשתיות ופיתוח", href: "/הנדסה-תשתיות-ופיתוח" },
      { label: "גזברות וגביה", href: "/גזברות-וגביה" },
      { label: "ארנונה", href: "/ארנונה" },
      { label: "חינוך", href: "/חינוך" },
      { label: "הספריה הציבורית", href: "/הספריה-הציבורית" },
      { label: "תברואה ורישוי עסקים", href: "/תברואה-ורישוי-עסקים" },
      { label: "רכש", href: "/רכש" },
      { label: "רווחה", href: "/רווחה" },
      { label: "מחלקה משפטית", href: "/מחלקה-משפטית" },
      { label: "שירות פסיכולוגי", href: "/שירות-פסיכולוגי" },
      { label: "יחידת הנוער", href: "/יחידת-הנוער" },
      { label: "מרכז צעירים", href: "/מחלקת-מרכז-צעירים" },
      { label: "ספורט", href: "/ספורט" },
      { label: "שיטור מקומי", href: "/שיטור-מקומי" },
      { label: "ביטחון קהילתי", href: "/ביטחון-קהילתי" },
      { label: "מזכירות", href: "/מזכירות" },
    ],
  },
  {
    title: "מרכזי מידע",
    links: [
      { label: "נעים להכיר", href: "/נעים-להכיר" },
      { label: "על המועצה", href: "/על-המועצה" },
      { label: "קצת היסטוריה", href: "/קצת-היסטוריה" },
      { label: "חזון המועצה", href: "/חזון-המועצה" },
      { label: "חוקי עזר", href: "/חוקי-עזר" },
      { label: "צווי ארנונה", href: "/צווי-ארנונה" },
      { label: "דוחות רשות כספיים", href: "/דוחות-כספיים" },
      { label: "דו״חות ממשלתיים", href: "/דוחות-ממשלתיים" },
      { label: "פרוטוקולי ישיבות המועצה", href: "/פרוטוקולי-ישיבות-המועצה" },
      { label: "שעות קבלה וכתובת", href: "/שעות-קבלה" },
      { label: "המבנה הארגוני", href: "/המבנה-הארגוני" },
    ],
  },
];

function submenuFor(columnTitle: string): NavItem[] {
  return footerColumns.find((c) => c.title === columnTitle)?.links ?? [];
}

export type MainNavItem = NavItem & { submenu?: NavItem[] };

/** Header nav with dropdown submenus, sourced from the same real per-section link lists as the footer. */
export const mainNavWithSubmenu: MainNavItem[] = [
  { label: "דף בית", href: "/" },
  { label: "מרכזי מידע", href: "/מרכזמידע", submenu: submenuFor("מרכזי מידע") },
  { label: "מחלקות המועצה", href: "/מחלקות-המועצה", submenu: submenuFor("מחלקות המועצה") },
  { label: "שירותי תושב", href: "/שירותי-תושב", submenu: submenuFor("שירות לתושב") },
  { label: "ביטחון וחירום", href: "/ביטחוןוחירום", submenu: submenuFor("ביטחון וחירום") },
  { label: "צור קשר", href: "/צור-קשר" },
];

export const contactInfo = {
  heading: "מועצה מקומית כפר יאסיף תמיד כאן לשירותך!",
  address: "כפר יאסיף, כביש פנימי, רח'.",
  phone: "04-9569842",
  email: "info@kafr-yasif.muni.il",
  emailLabel: "לפניות הציבור - נא לשלוח מייל לכתובת:",
  hours: [
    { days: "ראשון", hours: "סגור (יום חופש)" },
    { days: "שני", hours: "09:00 – 15:00" },
    { days: "שלישי", hours: "09:00 – 15:00" },
    { days: "רביעי", hours: "09:00 – 15:00" },
    { days: "חמישי", hours: "09:00 – 15:00" },
    { days: "שישי", hours: "סגור (יום חופש)" },
    { days: "שבת", hours: "09:00 – 15:00" },
  ],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/essamnaeemshehadeh" },
    { label: "WhatsApp", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

/** News content transcribed verbatim from the live source site (globaly.biz) homepage. */
export const newsItems = [
  {
    title: "بيان هام صادر من رئيس المجلس المحلي- تحديثات الوضع الأمني.",
    excerpt:
      "‼ بيان هام من رئيس المجلس المحلي أهلنا الكرام: بناءً على التعليمات الجديدة الصادرة عن قيادة الجبهة الداخلية، والتي تسري ابتداءً من يوم الأحد 7/6/26 الساعة 22:00 وحتى يوم الاثنين 8/6/26 الساعة 20:00، نود إعلامكم بما يلي: ■ تعطيل جميع الأنشطة التعليمية ومنع إقامة أي نشاط تعليمي خلال فترة سريان التعليمات. ■ التجمعات والخدمات: يُسمح بالتجمهر حتى 200 شخص في الأماكن المفتوحة وحتى 500 شخص داخل المباني، وذلك بشرط توفر إمكانية الوصول إلى حيّز محمي معياري خلال الوقت المحدد للوصول إليه...",
    variant: "logo",
    order: 2,
  },
  {
    title: "بيان صادر عن مجلس كفرياسيف المحلي- طوارئ",
    excerpt:
      "عقد المجلس المحلي اليوم الاثنين 8/6/2026 جلسة طارئة لبحث المستجدات الأمنية. وعلى ضوء التطورات الأخيرة، نعلم أهلنا الكرام بما يلي: 1. جميع الملاجئ العامة والمتنقلة في البلدة مفتوحة وجاهزة للاستخدام عند الحاجة. إليكم قائمة بأماكن الملاجئ العامة المفتوحة: المركز الثقافي البلدي بجانب الملعب البلدي، كنيسة ميلاد السيدة العذراء للروم الأرثوذكس، مدرسة البادر الابتدائية، مدرسة البستان الإبتدائية، مدرسة المطران الأهلية...",
    variant: "photo",
    image: "/images/lobby.jpg",
    order: 1,
  },
  {
    title: "بدء التسجيل للروضات والبساتين للسنة الدراسية 2026/2027",
    excerpt:
      "بدعم من رئيس المجلس المحلي السيد عصام نعيم شحاده، يسرنا أن نعلن عن بدء التسجيل لروضات وبساتين الأطفال للسنة الدراسية المقبلة 2026/2027. فترة التسجيل: 17/02/2026 - 27/01/2026. يتم التسجيل عبر رابط خاص من خلال موقع المجلس المحلي. التسجيل يشمل الحضانات، الروضات الرسمية والروضات الخاصة.",
    variant: "flyer",
    order: 4,
  },
  {
    title: "شجب واستنكار",
    excerpt:
      "يستنكر رئيس المجلس المحلي في كفرياسيف، السيد عصام نعيم شحاده، إلى جانب الإدارة والأعضاء (النواب)، وموظفي المجلس المحلي، وأهالي كفرياسيف، بأشد العبارات التصرف الذي صدر من الشرطة بحق الأخ عصام كمال شريف، المربي والمستشار في مدرسة بني الثانوية، وما رافقه من إساءة وأذى يمس بكرامة الإنسان وحقوقه الأساسية. ويؤكد الجميع تضامنهم الكامل مع الأخ عصام كمال شريف، مطالبين بكشف حقيقة ما جرى بكل شفافية، ومحاسبة كل من تسبب بهذا الأذى، واتخاذ الإجراءات اللازمة لضمان عدم تكرار مثل هذه الحوادث، حفاظًا على كرامة المواطنين وحقوقهم.",
    variant: "alert",
    order: 3,
  },
];

export const events = [
  { title: "כריסמס מרקט", subtitle: "דצמבר", dates: "4/11 - 25/12", note: "פתוח לקהל הרחב" },
  { title: "דוכני האיכרים", subtitle: "שלושה ימים", dates: "4/11 - 5/12", note: "פתוח לקהל הרחב" },
  { title: "פסטיבל הספר", subtitle: "במשך שבוע", dates: "4/11 - 5/12", note: "בהרשמה מראש" },
];
