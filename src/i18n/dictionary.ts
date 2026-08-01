import type { Locale } from "./config";

export type Dictionary = {
  hero: {
    bannerAriaLabel: string;
    slidesAriaLabel: string;
    caption: string;
    helpCta: string;
    shortcuts: string;
    pause: string;
    play: string;
  };
  search: {
    openLabel: string;
    placeholder: string;
    close: string;
    searching: string;
    noResults: string;
    noResultsFor: (q: string) => string;
    typeToSearch: string;
    page: string;
    news: string;
  };
  header: {
    personalArea: string;
    languageChooser: string;
    openMenu: string;
    closeMenu: string;
    mobileNav: string;
    mainNav: string;
    skipToContent: string;
  };
  common: {
    readMore: string;
    viewAll: string;
    download: string;
    open: string;
    comingSoon: string;
    loading: string;
    saving: string;
    savedSuccess: string;
    saveError: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    confirmDelete: string;
    publish: string;
    unpublish: string;
    duplicate: string;
    view: string;
    required: string;
    submit: string;
    backHome: string;
  };
  notFound: {
    title: string;
    message: string;
  };
  forms: {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    fillAllRequired: string;
    submitSuccess: string;
    submitError: string;
  };
  content: {
    status: {
      draft: string;
      published: string;
      hidden: string;
      scheduled: string;
    };
    tenderStatus: {
      open: string;
      closed: string;
      awarded: string;
      cancelled: string;
    };
    publishDate: string;
    deadline: string;
    noDeadline: string;
    documents: string;
    noDocuments: string;
    contactInfo: string;
    openToPublic: string;
    registrationRequired: string;
    registerNow: string;
    eventDate: string;
    location: string;
    backToList: string;
    noItemsFound: string;
    translationMissing: string;
  };
  cookies: {
    bannerTitle: string;
    bannerText: string;
    acceptAll: string;
    rejectNonEssential: string;
    openSettings: string;
    privacyLink: string;
    settingsTitle: string;
    settingsIntro: string;
    savePreferences: string;
    alwaysActive: string;
    reopenLink: string;
    categories: {
      necessary: { title: string; description: string };
      analytics: { title: string; description: string };
      functional: { title: string; description: string };
      marketing: { title: string; description: string };
    };
  };
  ticker: {
    recentlyAdded: string;
    pause: string;
    play: string;
    previous: string;
    next: string;
    dismiss: string;
    today: string;
    yesterday: string;
    daysAgo: (n: number) => string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  he: {
    hero: {
      bannerAriaLabel: "באנר ראשי",
      slidesAriaLabel: "שקופיות באנר",
      caption: "קהילה מתקדמת, שירות לכל תושב.",
      helpCta: "כיצד נוכל לעזור?",
      shortcuts: "קיצורי דרך",
      pause: "השהיית התצוגה",
      play: "המשך התצוגה",
    },
    search: {
      openLabel: "חיפוש באתר",
      placeholder: "חיפוש באתר... (עמודים, ידיעות)",
      close: "סגירה",
      searching: "מחפש...",
      noResults: "לא נמצאו תוצאות",
      noResultsFor: (q: string) => `לא נמצאו תוצאות עבור "${q}".`,
      typeToSearch: "הקלידו לפחות 2 תווים כדי לחפש.",
      page: "עמוד",
      news: "ידיעה",
    },
    header: {
      personalArea: "אזור אישי",
      languageChooser: "בחירת שפה",
      openMenu: "פתח תפריט",
      closeMenu: "סגור תפריט",
      mobileNav: "ניווט ראשי - נייד",
      mainNav: "ניווט ראשי",
      skipToContent: "דלג לתוכן הראשי",
    },
    common: {
      readMore: "קרא עוד",
      viewAll: "לכל התוכן",
      download: "הורדה",
      open: "פתיחה",
      comingSoon: "בקרוב",
      loading: "טוען...",
      saving: "שומר...",
      savedSuccess: "נשמר בהצלחה",
      saveError: "שגיאה בשמירה",
      cancel: "ביטול",
      save: "שמירה",
      edit: "עריכה",
      delete: "מחיקה",
      confirmDelete: "האם אתה בטוח שברצונך למחוק?",
      publish: "פרסום",
      unpublish: "הסרה מפרסום",
      duplicate: "שכפול",
      view: "צפייה",
      required: "שדה חובה",
      submit: "שליחה",
      backHome: "דף בית",
    },
    notFound: {
      title: "העמוד המבוקש לא נמצא",
      message: "ייתכן שהקישור שגוי או שהעמוד הוסר. ניתן לחזור לדף הבית או לחפש את מה שחיפשת.",
    },
    forms: {
      fullName: "שם מלא",
      email: "דואר אלקטרוני",
      phone: "טלפון",
      subject: "נושא",
      message: "הודעה",
      fillAllRequired: "נא למלא את כל שדות החובה.",
      submitSuccess: "הפנייה נשלחה בהצלחה. ניצור איתך קשר בהקדם.",
      submitError: "אירעה שגיאה בשליחת הטופס. נסו שוב.",
    },
    content: {
      status: {
        draft: "טיוטה",
        published: "פורסם",
        hidden: "מוסתר",
        scheduled: "מתוזמן לפרסום",
      },
      tenderStatus: {
        open: "פעיל",
        closed: "סגור להגשה",
        awarded: "הוכרז זוכה",
        cancelled: "בוטל",
      },
      publishDate: "תאריך פרסום",
      deadline: "מועד אחרון להגשה",
      noDeadline: "ללא מועד סופי",
      documents: "מסמכים מצורפים",
      noDocuments: "לא צורפו מסמכים לפריט זה",
      contactInfo: "פרטי קשר",
      openToPublic: "פתוח לקהל",
      registrationRequired: "נדרשת הרשמה מראש",
      registerNow: "הרשמה",
      eventDate: "תאריך האירוע",
      location: "מקום האירוע",
      backToList: "חזרה לרשימה",
      noItemsFound: "לא נמצאו פריטים",
      translationMissing: "תוכן זה עדיין לא תורגם לשפה הנוכחית — מוצג בעברית.",
    },
    cookies: {
      bannerTitle: "הפרטיות שלכם חשובה לנו",
      bannerText:
        "אתר המועצה המקומית כפר יאסיף משתמש בקובצי Cookies ובטכנולוגיות דומות לצורך הפעלה תקינה של האתר, שיפור חוויית הגלישה, ניתוח שימוש באתר והתאמת שירותים דיגיטליים לציבור. ניתן לאשר את כל העוגיות, לדחות עוגיות שאינן הכרחיות או לנהל את ההעדפות שלכם.",
      acceptAll: "אישור הכל",
      rejectNonEssential: "דחיית עוגיות לא הכרחיות",
      openSettings: "ניהול העדפות",
      privacyLink: "מדיניות פרטיות",
      settingsTitle: "ניהול העדפות Cookies",
      settingsIntro: "בחרו אילו סוגי עוגיות לאפשר. ניתן לשנות את ההעדפות בכל עת.",
      savePreferences: "שמירת העדפות",
      alwaysActive: "תמיד פעיל",
      reopenLink: "ניהול העדפות Cookies",
      categories: {
        necessary: { title: "עוגיות הכרחיות", description: "תמיד פעילות. נדרשות לפעילות תקינה של האתר." },
        analytics: { title: "עוגיות ביצועים וסטטיסטיקה", description: "מסייעות לנו להבין כיצד משתמשים באתר ולשפר אותו." },
        functional: { title: "עוגיות פונקציונליות", description: "מאפשרות שמירת העדפות משתמש ושיפור חוויית השימוש." },
        marketing: { title: "עוגיות שיווקיות", description: "יופעלו רק אם קיימים באתר כלי פרסום או מעקב שיווקי." },
      },
    },
    ticker: {
      recentlyAdded: "הועלו לאחרונה",
      pause: "השהיה",
      play: "המשך",
      previous: "הקודם",
      next: "הבא",
      dismiss: "סגירה",
      today: "היום",
      yesterday: "אתמול",
      daysAgo: (n: number) => `לפני ${n} ימים`,
    },
  },
  ar: {
    hero: {
      bannerAriaLabel: "الشريط الرئيسي",
      slidesAriaLabel: "شرائح الشريط الرئيسي",
      caption: "مجتمع متقدم، خدمة لكل مقيم.",
      helpCta: "كيف يمكننا مساعدتكم؟",
      shortcuts: "اختصارات",
      pause: "إيقاف العرض مؤقتاً",
      play: "استئناف العرض",
    },
    search: {
      openLabel: "البحث في الموقع",
      placeholder: "البحث في الموقع... (صفحات، أخبار)",
      close: "إغلاق",
      searching: "جارٍ البحث...",
      noResults: "لم يتم العثور على نتائج",
      noResultsFor: (q: string) => `لم يتم العثور على نتائج لـ "${q}".`,
      typeToSearch: "اكتب حرفين على الأقل للبحث.",
      page: "صفحة",
      news: "خبر",
    },
    header: {
      personalArea: "المنطقة الشخصية",
      languageChooser: "اختيار اللغة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      mobileNav: "التنقل الرئيسي - جوال",
      mainNav: "التنقل الرئيسي",
      skipToContent: "تخطَّ إلى المحتوى الرئيسي",
    },
    common: {
      readMore: "اقرأ المزيد",
      viewAll: "لكل المحتوى",
      download: "تحميل",
      open: "فتح",
      comingSoon: "قريباً",
      loading: "جارٍ التحميل...",
      saving: "جارٍ الحفظ...",
      savedSuccess: "تم الحفظ بنجاح",
      saveError: "خطأ في الحفظ",
      cancel: "إلغاء",
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      confirmDelete: "هل أنت متأكد أنك تريد الحذف؟",
      publish: "نشر",
      unpublish: "إلغاء النشر",
      duplicate: "نسخ",
      view: "عرض",
      required: "حقل إلزامي",
      submit: "إرسال",
      backHome: "الصفحة الرئيسية",
    },
    notFound: {
      title: "الصفحة المطلوبة غير موجودة",
      message: "ربما يكون الرابط غير صحيح أو تمت إزالة الصفحة. يمكنكم العودة إلى الصفحة الرئيسية أو البحث عما تريدون.",
    },
    forms: {
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      subject: "الموضوع",
      message: "الرسالة",
      fillAllRequired: "يرجى تعبئة جميع الحقول الإلزامية.",
      submitSuccess: "تم إرسال الطلب بنجاح. سنتواصل معكم قريباً.",
      submitError: "حدث خطأ أثناء إرسال النموذج. حاولوا مرة أخرى.",
    },
    content: {
      status: {
        draft: "مسودة",
        published: "منشور",
        hidden: "مخفي",
        scheduled: "مجدول للنشر",
      },
      tenderStatus: {
        open: "نشط",
        closed: "مغلق للتقديم",
        awarded: "تم ترسيته",
        cancelled: "ملغى",
      },
      publishDate: "تاريخ النشر",
      deadline: "الموعد النهائي للتقديم",
      noDeadline: "بدون موعد نهائي",
      documents: "المستندات المرفقة",
      noDocuments: "لم يتم إرفاق مستندات لهذا العنصر",
      contactInfo: "معلومات التواصل",
      openToPublic: "مفتوح للجمهور",
      registrationRequired: "التسجيل المسبق مطلوب",
      registerNow: "التسجيل",
      eventDate: "تاريخ الفعالية",
      location: "مكان الفعالية",
      backToList: "العودة إلى القائمة",
      noItemsFound: "لم يتم العثور على عناصر",
      translationMissing: "لم تتم ترجمة هذا المحتوى إلى اللغة الحالية بعد — يُعرض بالعبرية.",
    },
    cookies: {
      bannerTitle: "خصوصيتكم تهمّنا",
      bannerText:
        "يستخدم موقع المجلس المحلي كفر ياسيف ملفات تعريف الارتباط (Cookies) وتقنيات مشابهة من أجل التشغيل السليم للموقع، وتحسين تجربة التصفح، وتحليل استخدام الموقع، وتخصيص الخدمات الرقمية للجمهور. يمكنكم الموافقة على جميع ملفات تعريف الارتباط، أو رفض غير الضرورية منها، أو إدارة تفضيلاتكم.",
      acceptAll: "الموافقة على الكل",
      rejectNonEssential: "رفض ملفات تعريف الارتباط غير الضرورية",
      openSettings: "إدارة التفضيلات",
      privacyLink: "سياسة الخصوصية",
      settingsTitle: "إدارة تفضيلات ملفات تعريف الارتباط",
      settingsIntro: "اختاروا أنواع ملفات تعريف الارتباط المسموح بها. يمكن تغيير التفضيلات في أي وقت.",
      savePreferences: "حفظ التفضيلات",
      alwaysActive: "نشط دائماً",
      reopenLink: "إدارة تفضيلات ملفات تعريف الارتباط",
      categories: {
        necessary: { title: "ملفات تعريف ارتباط ضرورية", description: "نشطة دائماً. مطلوبة لعمل الموقع بشكل سليم." },
        analytics: { title: "ملفات تعريف ارتباط للأداء والإحصائيات", description: "تساعدنا على فهم كيفية استخدام الموقع وتحسينه." },
        functional: { title: "ملفات تعريف ارتباط وظيفية", description: "تتيح حفظ تفضيلات المستخدم وتحسين تجربة الاستخدام." },
        marketing: { title: "ملفات تعريف ارتباط تسويقية", description: "تُفعّل فقط في حال وجود أدوات إعلان أو تتبع تسويقي في الموقع." },
      },
    },
    ticker: {
      recentlyAdded: "أضيفت مؤخراً",
      pause: "إيقاف مؤقت",
      play: "استئناف",
      previous: "السابق",
      next: "التالي",
      dismiss: "إغلاق",
      today: "اليوم",
      yesterday: "أمس",
      daysAgo: (n: number) => `قبل ${n} ${n === 2 ? "يومين" : n >= 3 && n <= 10 ? "أيام" : "يوماً"}`,
    },
  },
  en: {
    hero: {
      bannerAriaLabel: "Main banner",
      slidesAriaLabel: "Banner slides",
      caption: "A forward-looking community, service for every resident.",
      helpCta: "How can we help?",
      shortcuts: "Shortcuts",
      pause: "Pause slideshow",
      play: "Resume slideshow",
    },
    search: {
      openLabel: "Search the site",
      placeholder: "Search the site... (pages, news)",
      close: "Close",
      searching: "Searching...",
      noResults: "No results found",
      noResultsFor: (q: string) => `No results found for "${q}".`,
      typeToSearch: "Type at least 2 characters to search.",
      page: "Page",
      news: "News",
    },
    header: {
      personalArea: "Personal area",
      languageChooser: "Choose language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mobileNav: "Main navigation - mobile",
      mainNav: "Main navigation",
      skipToContent: "Skip to main content",
    },
    common: {
      readMore: "Read more",
      viewAll: "View all",
      download: "Download",
      open: "Open",
      comingSoon: "Coming soon",
      loading: "Loading...",
      saving: "Saving...",
      savedSuccess: "Saved successfully",
      saveError: "Error saving",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this?",
      publish: "Publish",
      unpublish: "Unpublish",
      duplicate: "Duplicate",
      view: "View",
      required: "Required field",
      submit: "Submit",
      backHome: "Home",
    },
    notFound: {
      title: "Page not found",
      message: "The link may be broken or the page may have been removed. You can return home or search for what you were looking for.",
    },
    forms: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message",
      fillAllRequired: "Please fill in all required fields.",
      submitSuccess: "Your request was sent successfully. We'll be in touch soon.",
      submitError: "An error occurred while submitting the form. Please try again.",
    },
    content: {
      status: {
        draft: "Draft",
        published: "Published",
        hidden: "Hidden",
        scheduled: "Scheduled",
      },
      tenderStatus: {
        open: "Open",
        closed: "Closed for submissions",
        awarded: "Awarded",
        cancelled: "Cancelled",
      },
      publishDate: "Publish date",
      deadline: "Submission deadline",
      noDeadline: "No deadline",
      documents: "Attached documents",
      noDocuments: "No documents attached to this item",
      contactInfo: "Contact information",
      openToPublic: "Open to the public",
      registrationRequired: "Advance registration required",
      registerNow: "Register",
      eventDate: "Event date",
      location: "Location",
      backToList: "Back to list",
      noItemsFound: "No items found",
      translationMissing: "This content hasn't been translated to the current language yet — showing Hebrew.",
    },
    cookies: {
      bannerTitle: "Your privacy matters to us",
      bannerText:
        "The Kafr Yasif Local Council website uses cookies and similar technologies to ensure the site functions properly, improve your browsing experience, analyze site usage, and tailor digital services to the public. You may accept all cookies, reject non-essential cookies, or manage your preferences.",
      acceptAll: "Accept All",
      rejectNonEssential: "Reject Non-Essential Cookies",
      openSettings: "Manage Preferences",
      privacyLink: "Privacy Policy",
      settingsTitle: "Manage Cookie Preferences",
      settingsIntro: "Choose which types of cookies to allow. You can change your preferences at any time.",
      savePreferences: "Save Preferences",
      alwaysActive: "Always active",
      reopenLink: "Manage Cookie Preferences",
      categories: {
        necessary: { title: "Necessary cookies", description: "Always active. Required for the site to function properly." },
        analytics: { title: "Performance & statistics cookies", description: "Help us understand how the site is used and improve it." },
        functional: { title: "Functional cookies", description: "Allow saving user preferences and improving the user experience." },
        marketing: { title: "Marketing cookies", description: "Only activated if the site includes advertising or marketing tracking tools." },
      },
    },
    ticker: {
      recentlyAdded: "Recently added",
      pause: "Pause",
      play: "Resume",
      previous: "Previous",
      next: "Next",
      dismiss: "Dismiss",
      today: "Today",
      yesterday: "Yesterday",
      daysAgo: (n: number) => `${n} day${n === 1 ? "" : "s"} ago`,
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
