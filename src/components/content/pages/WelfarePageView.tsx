import Image from "next/image";
import { Heart, LayoutGrid, Users, LifeBuoy, Sun, Accessibility, Users2, HeartHandshake } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };
type NumberedItem = { heading: string; body: string[] };
type ServiceArea = { title: string; text: string };
type Staff = { name: string; role: string };

type LocaleContent = {
  heroSubtitle: string;
  heroImageAlt: string;
  s1Title: string;
  s1Paragraphs: string[];
  s2Title: string;
  serviceAreas: ServiceArea[];
  s3Title: string;
  s3Intro: string;
  s3Items: NumberedItem[];
  s3EarlyChildhoodLabel: string;
  s3Bullets: string[];
  s4Title: string;
  s4Intro: string;
  s4FrameworksLabel: string;
  s4Items: NumberedItem[];
  s5Title: string;
  s5Paragraphs: string[];
  s5FrameworksLabel: string;
  s5Points: BoldPoint[];
  s6Title: string;
  s6Intro: string;
  s6Bullets: string[];
  s6Closing: string;
  s6FrameworksLabel: string;
  s6Programs: string[];
  s7Title: string;
  s7Paragraph: string;
  s7AreasLabel: string;
  s7Points: BoldPoint[];
  s8Title: string;
  s8Paragraphs: string[];
  s8Quote: string;
  s9Title: string;
  s9Intro: string;
  staff: Staff[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "מחלקת הרווחה והביטחון הסוציאלי - כפר יאסיף",
    heroImageAlt: "מחלקת רווחה",
    s1Title: "החזון שלנו: קידום החוסן הקהילתי עבור כל פרט",
    s1Paragraphs: [
      "מחלקת הרווחה החברתית בכפר יאסיף פועלת לחיזוק ולהעצמת החוסן הקהילתי של התושבים. אנו מאמינים שכל אדם ראוי לתמיכה ולטיפול מקצועי ההולם את צרכיו.",
      "הצוות המקצועי שלנו, הכולל עובדים סוציאליים ואנשי מקצוע, מעניק שירותים מקיפים ברמת הפרט, המשפחה והציבור, באמצעות אבחון המצב, מניעה, טיפול, הגנה, שיקום ומתן מענה לפרט, למשפחות ולקהילות המקומיות החיות במצבי משבר זמני או מתמשך עקב מוגבלות, מצבי עוני, הדרה חברתית, קשיי תפקוד, זקנה, אבטלה, הזנחה והתמכרות.",
      "אנו מחויבים למתן מענה מקצועי מעולה בהתאם לחוק ולתקנות, תוך שמירה על הכבוד, ההוקרה והפרטיות של כל מי שפונה אלינו.",
    ],
    s2Title: "תחומי השירות המרכזיים שלנו",
    serviceAreas: [
      { title: "הפרט והמשפחה", text: "תמיכה מקיפה למשפחות, ילדים ובני נוער" },
      { title: "שיקום ומניעה", text: "תוכניות ייעודיות לקבוצות בסיכון" },
      { title: "הגיל הזהוב", text: "שירותים ייעודיים לאזרחים ותיקים" },
      { title: "עבודה קהילתית והתנדבות", text: "פיתוח יוזמות קבוצתיות וציבוריות, וטיפוח רוח ההתנדבות." },
      { title: "בעלי צרכים מיוחדים", text: "טיפול כוללני לאנשים עם מוגבלויות ומגבלות" },
    ],
    s3Title: "תחום הפרט והמשפחה: מענה למשפחות ולילדים",
    s3Intro:
      "תחום הפרט והמשפחה מהווה עמוד השדרה של השירותים שלנו, כאשר אנו מספקים מענה רחב ומגוון ההולם את צורכי המשפחות, הילדים ובני הנוער בשלבי חייהם השונים. אנו פועלים באמצעות יחידות ייעודיות המצוידות בשיטות הטיפול והמסגרות המקצועיות העדכניות ביותר.",
    s3Items: [
      { heading: "1. טיפול ישיר", body: ["עובדות סוציאליות מומחיות מעניקות טיפול ישיר למשפחות המתמודדות עם אתגרים."] },
      {
        heading: ' 2. מרכז סווא לשלום המשפחה (מרכז למניעת אלימות)',
        body: [
          "המרכז מספק שירותים מגוונים בתחום האלימות במשפחה, החל מאבחון המצב ועד לטיפול ושיקום פרטני וקבוצתי, בידי עובדות סוציאליות המתמחות בתחום. המרכז מעניק ייעוץ ראשוני והתערבות במצבי חירום עבור התושב, ומספק ייעוץ להתערבות מקצועית בשיתוף הגורמים הרלוונטיים האחראים על המשפחה/הפרט. בנוסף, המרכז יוזם הפעלת תוכניות ואירועי הסברה בנושא אלימות במסגרות השונות ביישוב.",
        ],
      },
      {
        heading: "3. מרכז עוצמה (מרכז העצמה)",
        body: [
          "מדובר במסגרת מקצועית-קהילתית שמטרתה לחזק את יכולות הפרט והמשפחה ולסייע להם במעבר לעצמאות וליציבות חברתית, תעסוקתית וכלכלית.",
          "המרכז פועל לפי תוכניות עבודה מובנות ברמה האישית, המשפחתית, הקבוצתית והציבורית, באמצעות העצמה קהילתית, כלכלית ותעסוקתית, וליווי במיצוי זכויות.",
          "צוות המרכז שואף לחולל שינוי בר-קיימא המבוסס על שותפות עם המשתתפים ובניית יכולותיהם, באופן המשתקף בשיפור איכות החיים והמעורבות הקהילתית.",
        ],
      },
      { heading: "4. תוכנית 360", body: ["תוכנית עירונית המיועדת לילדים ובני נוער במצוקה, הכוללת טיפולים קבוצתיים."] },
      {
        heading: ' 5. תוכנית יה"ב',
        body: [
          "מיועדת למשפחות במצוקה, ומעניקה שירותים אינטנסיביים לחיזוק ולביסוס הקשרים המשפחתיים ולשיקומם, ולהבטחת בית בטוח למשפחה.",
        ],
      },
      {
        heading: "6. הגיל הרך: בניית יסוד איתן לעתיד",
        body: [
          "התוכניות שלנו לגיל הרך",
          "אנו מאמינים כי השנים הראשונות בחייו של הילד הן הבסיס לעתידו, ולכן אנו מציעים מכלול תוכניות ושירותים המיועדים לתמוך בילדים ובמשפחותיהם בשלב הקריטי הזה.",
          "המסגרות והתוכניות שהמחלקה מציעה לגיל הילדות",
        ],
      },
    ],
    s3EarlyChildhoodLabel: "",
    s3Bullets: [
      "1. שיבוץ ילדים במצוקה במעונות מוכרים עם סמל רווחה חברתי.",
      '2. תוכנית "ראשית" להדרכת הורים של 15 משפחות: אנו מעניקים הדרכה אישית להורים טריים (הורים לילדים מגיל לידה ועד גיל 7), המסייעת להם לפתח מיומנויות הורות חיוביות ולבנות קשר בריא עם ילדיהם מהימים הראשונים.',
      '3. "מועדונית אלואן": המסגרת פועלת לאחר שעות הלימודים ומספקת שירות שיקומי ייעודי ל-15 תלמידים ותלמידות.',
      "4. מועדונית משותפת בשיתוף מחלקת החינוך: גם מסגרת זו פועלת לאחר שעות הלימודים ומספקת שירות שיקומי ייעודי ל-15 תלמידים ותלמידות.",
    ],
    s4Title: "יחידת השיקום, הליווי והמניעה",
    s4Intro:
      "היחידה המתמחה לשיקום, ליווי ומניעה עוסקת בטיפול, שיקום ואיתור של אוכלוסיות ייחודיות. אנו מציעים תוכניות מקיפות שמטרתן שילוב מחדש של הפרט בקהילה ובניית עתיד טוב יותר עבורו.",
    s4FrameworksLabel: "המסגרות והתוכניות",
    s4Items: [
      {
        heading: "1. יחידת הנוער",
        body: ["אנו מספקים שירות וטיפול פרטני וקבוצתי לבני ולבנות נוער, לרבות עבודת מדריכי שטח המגיעים אל בני הנוער בסביבתם הטבעית."],
      },
      {
        heading: "2. תוכנית מעגלים",
        body: ["קבוצות טיפוליות המיועדות לנערים ולנערות, כל קבוצה מונה 12 משתתפים. התוכנית מספקת סביבה בטוחה לביטוי ולצמיחה."],
      },
      {
        heading: "3. הבית החם",
        body: [
          'הבית החם לנערות – מרכז התקווה מעניק לנערות אקלים תומך במטרה לקדם חִברות תקין והכוונה נכונה, לשם נטילת אחריות אישית וקבוצתית בעתיד. אנו מעניקים שירות ל-15 נערות.',
        ],
      },
      {
        heading: "4. מרחב לקידום תעסוקה",
        body: [
          "אנו מלווים בני נוער במסע התעסוקתי שלהם, מסייעים להם לגלות את יכולותיהם ולפתח את כישוריהם התעסוקתיים, ומכוונים אותם לעבר הזדמנויות תעסוקה מתאימות. השירות ניתן ל-10 בני ובנות נוער.",
        ],
      },
      {
        heading: "5. יחידת ההתמכרויות – צעדים",
        body: [
          "יחידה ותיקה הפועלת מאז שנת 1990, המספקת שירותי הסברה וטיפול פרטני, קבוצתי וציבורי בהתמכרות לסמים, אלכוהול, הימורים והתמכרויות התנהגותיות. הצוות המקצועי שלנו מלווה את המטופלים במסע ההחלמה הארוך.",
        ],
      },
    ],
    s5Title: "הגיל הזהוב: למען אוכלוסיית הקשישים",
    s5Paragraphs: [
      "אנו מעניקים שירותים פרטניים איכותיים לאזרחים ותיקים מתוך ראייה כוללת של פיתוח קהילתי. אנו מאמינים שהקשישים הם אוצר הקהילה ומאגר ניסיונה, והם ראויים לכל הכבוד והטיפול.",
      "באמצעות תוכניותינו המגוונות, אנו פועלים להקל על תחושת הבדידות שעלולים לחוש הקשישים ולחזק את הקשרים החברתיים ביניהם. אנו מספקים סביבה חמה ומעוררת המסייעת להם להישאר פעילים ומעורבים בקהילה.",
    ],
    s5FrameworksLabel: "המסגרות והתוכניות",
    s5Points: [
      {
        bold: "מועדונים יומיים פעילים:",
        text: 'אנו מפעילים מועדונים לגיל הזהב – מועדון "מופ"ת", בו צוות המועדון מגיש ארוחות חמות, פעילויות ושירותים שונים, והקשישים נפגשים בפעילויות חברתיות, תרבותיות ופנאי; ומועדון "מועשר", בו צוות המועדון מציע פעילויות ושירותים שונים, לצד תוכניות קהילתיות מגוונות.',
      },
      {
        bold: "תוכניות קהילתיות מגוונות:",
        text: "באמצעות בדיקת צורכי הקשישים על ידי רכזת השייכות והשילוב הקהילתי, במטרה להקל על הבדידות ולחזק את הקשרים החברתיים בקרב הקשישים.",
      },
      {
        bold: "שירותים פרטניים ייעודיים:",
        text: "מעניקים מעקב פרטני אחר צורכיהם המיוחדים של הקשישים, לרבות סיוע במיצוי זכויותיהם.",
      },
    ],
    s6Title: "בעלי צרכים מיוחדים: טיפול כוללני ומקיף",
    s6Intro: "יחידת בעלי הצרכים המיוחדים מעניקה תמיכה, שירותים ושיקום לאנשים",
    s6Bullets: [
      "עם מוגבלויות שונות, אנשים עם אוטיזם ועם הפרעות בספקטרום האוטיסטי",
      "עם מוגבלות שכלית התפתחותית",
      "עם מוגבלויות תנועה",
      "עם מוגבלויות ראייה ושמיעה",
    ],
    s6Closing: "במטרה להעצים אותם, לשלב אותם בקהילה ובמקומות העבודה ולהבטיח את זכויותיהם.",
    s6FrameworksLabel: "המסגרות והתוכניות",
    s6Programs: [
      '"מועדון מראם" לבעלי צרכים מיוחדים (29 משתתפים) – המועדון מציע תוכניות פנאי, הסברה והעשרה בשעות אחר הצהריים.',
      'תוכנית "סביבה תומכת" לאנשים עם מוגבלות שכלית, הכוללת ליווי ביתי על ידי עובדת סוציאלית ומדריכה בתחום.',
      '"מועדונית קנר" לילדים על הספקטרום האוטיסטי (בשיתוף אשכול הגליל המערבי).',
    ],
    s7Title: "עבודה קהילתית והתנדבות",
    s7Paragraph:
      "העבודה הקהילתית נכללת בתחום פעולתה של מחלקת הרווחה והביטחון הסוציאלי, בשיתוף מחלקות המועצה המקומית, משרד הרווחה, אנשי מקצוע לעבודה קהילתית, פעילים ומתנדבים. מטרתה להעצים את הקהילה להשפיע על סביבתה, לצמצם פערים חברתיים וכלכליים, ולקדם את איכות החיים באמצעות שיתוף התושבים, איתור צרכים, תכנון פרויקטים ופיתוח שירותים משותפים.",
    s7AreasLabel: "התחומים המרכזיים:",
    s7Points: [
      {
        bold: "חוסן והתנדבות:",
        text: 'קידום המוכנות לחירום, כגון "צוות סאנד כפר יאסיף לחוסן קהילתי וחירום" המורכב מפעילים מקומיים; פיתוח מנהיגות מקומית וניצול פוטנציאל האנרגיות לפרויקטים סביבתיים השומרים על איכות החיים.',
      },
      {
        bold: "מרכז ההעצמה והזכאות:",
        text: "חיזוק הסולידריות החברתית, שירותי ייעוץ, הזדמנויות תעסוקה, ותמיכה בבני נוער, במשפחות חד-הוריות ובאוכלוסיות במצוקה כלכלית.",
      },
      {
        bold: "יחידת ההתנדבות:",
        text: "הוקמה על מנת למסגר את המתנדבים בהתאם ליכולותיהם וכישוריהם, ומסייעת בארגון, בהכוונה ובתיאום בין כוחות האדם הקיימים.",
      },
    ],
    s8Title: "יחד בונים קהילה טובה יותר",
    s8Paragraphs: [
      "מחלקת הרווחה החברתית במועצה המקומית כפר יאסיף נכונה תמיד לתת שירות לתושבים, בין אם אתם זקוקים לתמיכה פרטנית, סיוע משפחתי או הכוונה.",
      "השירותים שלנו זמינים לכל תושבי כפר יאסיף. אנו מחויבים למתן מענה מקצועי השומר על כבודו של כל אדם בהתאם לסטנדרטים המקצועיים הגבוהים ביותר, ומחויבים לסודיות מלאה.",
      "הצוות המקצועי שלנו מוכן לעזור לכם וללוות אתכם במסע לקראת חיים טובים יותר.",
    ],
    s8Quote: "מחלקת הרווחה והביטחון הסוציאלי - כפר יאסיף | יחד לקראת עתיד טוב יותר",
    s9Title: "צוות מחלקת הרווחה והביטחון הסוציאלי",
    s9Intro:
      "הכירו את צוות העבודה שלנו, המחויב למתן השירות והטיפול הטובים ביותר לתושבי כפר יאסיף. אל תהססו ליצור עמנו קשר לקבלת סיוע או לבירור אודות התוכניות שלנו.",
    staff: [
      { name: "רהאם דרוויש", role: "מנהלת מחלקת הרווחה החברתית" },
      { name: "נידאא צאפיה", role: "מזכירת המחלקה" },
      { name: "כאמלה איוב", role: "עובדת סוציאלית קהילתית / אחראית ועדות תכנון וטיפול" },
      { name: "חוסיינה צאפיה", role: 'עובדת סוציאלית - אחראית תוכנית יה"ב, נוער במצוקה, טיפול באלימות במשפחה' },
      { name: "מנאל שחאדה", role: "חשבת המחלקה" },
      { name: "הבה נאטור", role: "רכזת המתנדבים" },
      { name: "הבה חדיד", role: "עובדת סוציאלית - משפחות, גיל הזהב" },
      { name: "אימאן דרוויש", role: "עובדת סוציאלית - משפחות, בעלי צרכים מיוחדים" },
      { name: "רנא עלי", role: "עובדת סוציאלית - גיל הזהב, מרחב לקידום תעסוקה" },
      { name: "מרווה עות'מאן", role: 'אחראית תוכנית "ראשית"' },
      { name: "נרמין עבד", role: "עובדת סוציאלית - משפחות, בעלי צרכים מיוחדים" },
      { name: "סוהא שחאדה", role: "עובדת סוציאלית - אחראית בני ובנות נוער, מועדונית" },
      { name: "באסל עבדה", role: "אחראי יחידת ההתמכרויות" },
      { name: "ז'קלין פרח", role: "רכזת חירום / רכזת שייכות" },
      { name: "פדווא צאפיה", role: 'עובדת סוציאלית - קהילתית, מועדונית "אלואן"' },
      { name: "מנאבא אבו רומי", role: "עובדת סוציאלית - מרכז עוצמה, משפחות" },
      { name: "בסמה דאווד", role: "רכזת מרכז עוצמה - עובדת סוציאלית קהילתית" },
      { name: "רבא אלשע'רי", role: "רכזת מרכז סווא לשלום המשפחה" },
      { name: "קאתרין דאווד", role: "עובדת סוציאלית - הבית החם לנערות" },
      { name: "דנא ח'ורי", role: "רכזת שייכות" },
    ],
  },
  ar: {
    heroSubtitle: "قسم الرفاه والضمان الاجتماعي - كفر ياسيف",
    heroImageAlt: "قسم الرفاه",
    s1Title: "رؤيتنا: تعزيز الحصانة المجتمعية لكل فرد",
    s1Paragraphs: [
      "يعمل قسم الرفاه الاجتماعي في كفر ياسيف على تعزيز وتمكين الحصانة المجتمعية للمواطنين.. نحن نؤمن بأن كل فرد يستحق الدعم والرعاية المهنية التي تلبي احتياجاته .",
      "يقدم طاقمنا المتخصص من العاملين الاجتماعيين والمهنيين، خدمات شاملة على المستوى الفردي، العائلي والجماهيري، من خلال تشخيص الحاله ، الوقاية، العلاج، الحماية، التأهيل وتوفير الاستجابة للفرد ، العائلات، والمجتمعات المحلية التي تعيش في حالات من الأزمة المؤقتة أو المستمرة بسبب الإعاقة، حالات الفقر، التهميش الاجتماعي، صعوبات الأداء، الشيخوخه، البطالة، الإهمال والادمان",
      "نحن ملتزمون بتقديم استجابة مهنية متميزة تتوافق مع القانون والأنظمة، مع الحفاظ على كرامة ، احترام وخصوصية كل من يلجأ إلينا.",
    ],
    s2Title: "مجالات خدماتنا الرئيسية",
    serviceAreas: [
      { title: "الفرد والعائلة", text: "دعم شامل للعائلات والأطفال والشباب" },
      { title: "إعادة التأهيل والوقاية", text: "برامج متخصصة للمجموعات المعرضة للخطر" },
      { title: "الجيل الذهبي", text: "خدمات مخصصة لكبار السن" },
      { title: "العمل الجماهيري والتطوع", text: "تطوير المبادرات الجماعية والجماهيريه ، وتعزيز روح التطوع." },
      { title: "ذوي الاحتياجات الخاصة", text: "رعاية متكاملة لذوي الهمم والمحدوديات" },
    ],
    s3Title: "مجال الفرد والعائلة: استجابة للعائلات والأطفال",
    s3Intro:
      "يشكل مجال الفرد والعائلة العمود الفقري لخدماتنا، حيث نقدم استجابة واسعة ومتنوعة تلبي احتياجات العائلات والأطفال والشباب في مختلف مراحل حياتهم. نعمل من خلال وحدات تخصصية مجهزة بأحدث الأساليب العلاجية والمهنيةالأطر والبرامج.",
    s3Items: [
      { heading: "1. العلاج المباشر", body: ["عاملات اجتماعيات مختصات يقدمن علاجاً مباشراً للعائلات التي تواجه تحديات."] },
      {
        heading: "2. مركز سوا لسلامة العائلة – מרכז למניעת אלימות",
        body: [
          "المركز يوفر خدمات متعددة في مجال العنف الاسري بداية من تشخيص الحالة حتى العلاج وإعادة التأهيل الفردي والجماعي من قبل اخصائيات اجتماعيات متخصصات في هذا المجال ويوفر تقديم مشورة اولية وتدخل في حالات الطوارئ للمواطن ،إعطاء استشارة للتدخل المهني وذلك بالتعاون مع الجهات المسؤولة ذات صلة مع العائلة/ الفرد، بالاضافة لذلك المركز يبادر لتفعيل برامج وفعاليات توعوية بموضوع العنف في أطر القرية المختلفة.",
        ],
      },
      {
        heading: "3. مركز التمكين – מרכז עוצמה",
        body: [
          "هو إطار مهني-مجتمعي يهدف إلى تعزيز قدرات الفرد والأسرة ومساعدتهم على الانتقال نحو الاستقلالية والاستقرار الاجتماعي المهني والاقتصادي.",
          "يعمل المركز وفق خطط عمل منظمة على المستوى الشخصي، العائلي، الجماعي (ضمن مجموعات)، والجماهيري، من خلال التمكين المجتمعي، الاقتصادي، التشغيلي، ومرافقة تحصيل الحقوق.",
          "يسعى طاقم المركز إلى إحداث تغيير مستدام وقائم على الشراكة مع المستفيدين وبناء قدراتهم بما ينعكس على تحسين جودة الحياة والمشاركة المجتمعية.",
        ],
      },
      { heading: "4. برنامج 360", body: ["برنامج بلدي مخصص للأطفال والشباب في ضائقة مع علاجات مجموعاتية."] },
      {
        heading: "5. برنامج יהב",
        body: [
          "مخصص لعائلات في ضائقة، يقدم خدمات مكثفة من أجل تقوية وتعزيز الروابط العائلية وإعادة تأهيلها، وتوفير بيت آمن للعائلة.",
        ],
      },
      {
        heading: "6. الطفولة المبكرة: بناء أساس قوي للمستقبل",
        body: [
          "برامجنا للطفولة المبكرة",
          "نؤمن بأن السنوات الأولى من حياة الطفل هي الأساس لمستقبله، لذلك نقدم مجموعة متكاملة من البرامج والخدمات المصممة لدعم الأطفال وعائلاتهم في هذه المرحلة الحرجة .",
          "الأطر والبرامج التي يقدمها القسم لجيل الطفولة",
        ],
      },
    ],
    s3EarlyChildhoodLabel: "",
    s3Bullets: [
      "1. ترتيب أطفال بضائقة بحضانات معتمدة مع رمز رفاه اجتماعي.",
      '2. برنامج "بداية" (ראשית) لإرشاد والدي 15 عائلة: نقدم إرشاداً شخصياً للوالدين الجدد (اهل لأطفال من جيل الولاده وحتى جيل 7 سنوات)، مما يساعدهم على تطوير مهارات التربية الإيجابية وبناء علاقة صحية مع أطفالهم منذ الأيام الأولى.',
      "3. نوديه ألوان : يعمل هذا الاطار بعد الدوام الدراسي وهوي يوفر خدمة   تأهيلية متخصصة ل 15 طالب/ة .",
      "4. نوديه مشتركة بالتعاون مع قسم المعارف  كذلك يعمل هذا الاطار بعد الدوام الدراسي وهوي يوفر خدمة   تأهيلية متخصصة ل 15 طالب/ة .",
    ],
    s4Title: "وحدة إعادة التأهيل والمرافقة والوقاية",
    s4Intro:
      "تعمل وحدة إعادة التأهيل والمرافقة والوقاية المتخصصة على علاج وتأهيل ورصد مجموعات خاصة. نحن نقدم برامج شاملة تهدف إلى إعادة دمج الأفراد في المجتمع وبناء مستقبل أفضل لهم",
    s4FrameworksLabel: "الأطر والبرامج",
    s4Items: [
      {
        heading: "1. وحدة الشباب נוער",
        body: ["نقدم خدمة وعلاج فردي وجماعي للشباب والشابات، بما في ذلك عمل المرشدين الميدانيين الذين يصلون إلى الشباب في بيئتهم الطبيعية."],
      },
      {
        heading: "2. برنامج دوائر (מעגלים)",
        body: ["مجموعات علاجية مخصصة للفتيّة ، المجموعة مكونة من 12 مشاركاً. يوفر بيئة آمنة للتعبير والنمو"],
      },
      {
        heading: "3. البيت الدافئ",
        body: [
          "البيت الدافئ للفتيات - مركز الأمل (בית חם לנערות) يمنح الفتيات المناخ الداعم بهدف التنشئة الاجتماعية الصحيحة والتوجيه السليم بهدف تحمل المسؤولية الفردية والجماعية مستقبلاً نقدم خدمة ل15 فتاة..",
        ],
      },
      {
        heading: "4. حيّز الإرشاد المهني (מרחב לקידום תעסוקה)",
        body: ["نرافق الشباب في رحلتهم المهنية، نساعدهم على اكتشاف قدراتهم وتطوير مهاراتهم التشغيلية، ونوجههم نحو فرص عمل مناسبة الخدمة مقدمة ل10 شاب/ة"],
      },
      {
        heading: "5. وحدة الإدمان - خطوات (צעדים)",
        body: [
          "وحدة عريقة تعمل منذ عام 1990، تقدم خدمات توعوية وعلاجاً فردياً وجماعياً وجماهيرياً للإدمان على المخدرات، الكحول، القمار، والإدمان السلوكي. فريقنا المتخصص يرافق المتعالجين في رحلة التعافي الطويلة .",
        ],
      },
    ],
    s5Title: "الجيل الذهبي: لشريحة كبار السن",
    s5Paragraphs: [
      "نقدم خدمات فردية متميزة لكبار السن مع رؤية شاملة للتطوير المجتمعي. نحن نؤمن بأن المسنين هم كنز المجتمع وخزينة تجاربه، ويستحقون كل الاحترام والرعاية",
      "من خلال برامجنا المتنوعة، نعمل على تخفيف الوحدة التي قد يشعر بها كبار السن وتعزيز الروابط الاجتماعية بينهم، نوفر بيئة دافئة ومحفزة تساعدهم على البقاء نشطين ومتفاعلين مع المجتمع",
    ],
    s5FrameworksLabel: "الأطر والبرامج",
    s5Points: [
      {
        bold: "نوادٍ يومية نشطة:",
        text: 'نفعل نوادي للجيل الذهبي، نادي מופ"ת, يقدم طاقم النادي وجبات ساخنة ، فعاليات وخدمات مختلفة، حيث يلتقي المسنون بالأنشطة الاجتماعية ، الثقافية والترفيهية؛ ونادي מועשר, يقدم طاقم النادي فعاليات وخدمات مختلفة، إلى جانب برامج مجتمعية متنوعة.',
      },
      {
        bold: "برامج مجتمعية متنوعة:",
        text: "عن طريق فحص حاجات المسنين بواسطة منسقة الانتماء والاندماج المجتمعي، لتخفيف الوحدة وتعزيز الروابط الاجتماعية عند كبار السن",
      },
      { bold: "خدمات فردية مخصصة:", text: "تقدم متابعة فردية لاحتياجات كبار السن الخاصة، بما في ذلك المساعدة في الحصول على حقوقهم." },
    ],
    s6Title: "ذوي الاحتياجات الخاصة: رعاية شاملة ومتكاملة",
    s6Intro: "وحدة ذوي الاحتياجات الخاصة تقدم الدعم والخدمات والتأهيل للأشخاص",
    s6Bullets: [
      "ذوي الإعاقات المختلفة الأشخاص مع التوحد وطيف التوحد",
      "ذوي المحدودية الذهنية التطورية",
      "ذوي المحدوديات الحركية",
      "ذوي محدوديات الرؤية والسمع",
    ],
    s6Closing: "بهدف تمكينهم ودمجهم في المجتمع وأماكن العمل وتوفير حقوقهم.",
    s6FrameworksLabel: "الأطر والبرامج",
    s6Programs: [
      "نادي مرام لذوي الهمم (29 مشاركاً) يقدم النادي برامج ترفيهية وتوعوية واثرائية في ساعات بعد الظهر.",
      'برنامج "بيئة داعمة" للأشخاص مع محدودية ذهنية ومرافقة بيتية من قبل عاملة اجتماعية ومرشدة بالمجال.',
      "نويدية كانر (קנר) للأطفال على طيف التوحد (بالتعاون مع عنقود الجليل الغربي).",
    ],
    s7Title: "العمل الجماهيري والتطوع",
    s7Paragraph:
      "العمل الجماهيري يندرج ضمن نطاق مكتب الرفاه والضمان الاجتماعي، بالتعاون مع أقسام المجلس المحلي، وزارة الرفاه، اختصاصيي العمل المجتمعي، نشطاء ومتطوعين. يهدف إلى تمكين المجتمع من التأثير في بيئته، تقليص الفجوات الاجتماعية والاقتصادية، وتعزيز جودة الحياة من خلال إشراك السكان، تحديد الاحتياجات، تخطيط مشاريع، وتطوير خدمات مشتركة.",
    s7AreasLabel: "المجالات الرئيسية:",
    s7Points: [
      {
        bold: "الصمود والتطوع:",
        text: 'تعزيز الاستعداد للطوارئ، مثل "طاقم سند كفر ياسيف للحصانة المجتمعية والطوارئ" المؤلف من نشطاء محليين؛ تنمية القيادة المحلية واستغلال الطاقات لمشاريع بيئية تحافظ على جودة الحياة.',
      },
      {
        bold: "مركز التمكين والاستحقاق:",
        text: "تعزيز التضامن الاجتماعي، خدمات استشارية، فرص عمل، ودعم للشباب، الأسر أحادية الوالدين، والفقراء.",
      },
      {
        bold: "وحدة التطوع:",
        text: "أقيمت من أجل تأطير المتطوعين حسب إمكانياتهم وقدراتهم وتساعد في تنظيم، توجيه وتنسيق بين الطاقات الموجودة.",
      },
    ],
    s8Title: "معاً نبني مجتمعاً أفضل",
    s8Paragraphs: [
      "قسم الرفاه الاجتماعي في مجلس كفر ياسيف المحلي على استعداد دائم في تقديم الخدمات للمواطنين سواء كنت بحاجة إلى دعم فردي، مساعدة عائلية، توجيه",
      "خدماتنا متاحة لجميع مواطني كفر ياسيف، نحن ملتزمون بتقديم استجابة مهنية تحافظ على كرامة كل فرد وفقاً لأعلى المعايير المهنية ونلتزم بالسرية التامة.",
      "فريقنا المتخصص جاهز لمساعدتك ومرافقتك في رحلتك نحو حياة أفضل.",
    ],
    s8Quote: "قسم الرفاه والضمان الاجتماعي - كفر ياسيف | معاً نحو مستقبل أفضل",
    s9Title: "طاقم قسم الرفاه والضمان الاجتماعي",
    s9Intro:
      "تعرفوا على فريق عملنا ، الذي يلتزم بتقديم أفضل الخدمات والرعاية لمواطني كفر ياسيف. لا تترددوا في التواصل معنا للحصول على المساعدة أو الاستفسار عن برامجنا.",
    staff: [
      { name: "رهان درويش", role: "مديرة قسم الرفاه الاجتماعي" },
      { name: "نداء صفيه", role: "سكرتيرة القسم" },
      { name: "كامله أيوب", role: "عاملة اجتماعية جماهيرية /مسؤولة لجان التخطيط والعلاج" },
      { name: "حسينة صفية", role: "عاملة اجتماعية - مسؤولة برنامج יהב، شباب في ضائقة، علاج عنف أسري" },
      { name: "منال شحادة", role: "محاسبه תחשבנית" },
      { name: "هبة ناطور", role: "مركزة المتطوعين" },
      { name: "هبة حديد", role: "عاملة اجتماعية - عائلات، الجيل الذهبي" },
      { name: "إيمان درويش", role: "عاملة اجتماعية - عائلات، ذوي الاحتياجات الخاصة" },
      { name: "رنا علي", role: "عاملة اجتماعية - الجيل الذهبي، حيز تطويرالإرشاد المهني" },
      { name: "مرفت عثمان", role: 'مسؤولة برنامج "بداية"' },
      { name: "نرمين عبد", role: "عاملة اجتماعية - عائلات، ذوي الاحتياجات الخاصة" },
      { name: "سهى شهادة", role: "عاملة اجتماعية – مسؤولة عن شباب وشابات، نوديه" },
      { name: "باسل عبده", role: "مسؤول وحدة الإدمان" },
      { name: "جاكلين فرح", role: "مركزة الطوارئ / مركزة انتماء" },
      { name: "فدوى صفية", role: "عاملة اجتماعية - جماهيرية، نوديه ألوان" },
      { name: "منابا أبو رومي", role: "عاملة اجتماعية - مركز التمكين، عائلات" },
      { name: "بسمة داود", role: "مركزة مركز التمكين - عاملة اجتماعية - جماهيرية" },
      { name: "ربى الشغري", role: "مركزة مركز سوا لسلامة العائلة" },
      { name: "كاترين داوود", role: "عاملة اجتماعية - البيت الدافئ للفتيات" },
      { name: "دنى خوري", role: "مركزة انتماء" },
    ],
  },
  en: {
    heroSubtitle: "Welfare and Social Security Department - Kafr Yasif",
    heroImageAlt: "Welfare Department",
    s1Title: "Our Vision: Promoting Community Resilience for Every Individual",
    s1Paragraphs: [
      "The Social Welfare Department in Kafr Yasif works to strengthen and empower the community resilience of residents. We believe that every individual deserves support and professional care that meets their needs.",
      "Our specialized team of social workers and professionals provides comprehensive services at the individual, family and community levels, through assessment, prevention, treatment, protection, rehabilitation and response to individuals, families and local communities experiencing temporary or ongoing crisis due to disability, poverty, social marginalization, functional difficulties, old age, unemployment, neglect and addiction.",
      "We are committed to providing an outstanding professional response in accordance with the law and regulations, while preserving the dignity, respect and privacy of everyone who turns to us.",
    ],
    s2Title: "Our Main Service Areas",
    serviceAreas: [
      { title: "Individual & Family", text: "Comprehensive support for families, children and youth" },
      { title: "Rehabilitation & Prevention", text: "Specialized programs for at-risk groups" },
      { title: "Golden Generation", text: "Dedicated services for senior citizens" },
      { title: "Community Work & Volunteering", text: "Developing group and public initiatives, and fostering the spirit of volunteering." },
      { title: "People with Special Needs", text: "Comprehensive care for people with disabilities and limitations" },
    ],
    s3Title: "Individual & Family Domain: A Response for Families and Children",
    s3Intro:
      "The individual and family domain forms the backbone of our services, providing a broad and varied response that meets the needs of families, children and youth at different stages of their lives. We operate through specialized units equipped with the most up-to-date therapeutic methods and professional frameworks and programs.",
    s3Items: [
      { heading: "1. Direct Treatment", body: ["Specialized social workers provide direct treatment to families facing challenges."] },
      {
        heading: "2. Sawa Center for Family Safety (violence prevention center)",
        body: [
          "The center provides a range of services in the field of domestic violence, from assessment through to individual and group treatment and rehabilitation, delivered by social workers specializing in this field. The center offers initial counseling and emergency intervention for residents, as well as professional-intervention consultation in cooperation with the relevant bodies responsible for the family/individual. In addition, the center initiates awareness programs and events on the topic of violence across the town's various frameworks.",
        ],
      },
      {
        heading: "3. Otzma Empowerment Center",
        body: [
          "This is a professional-community framework aimed at strengthening the capabilities of individuals and families and helping them transition toward independence and social, occupational and economic stability.",
          "The center operates according to structured work plans at the personal, family, group and community levels, through community, economic and employment empowerment, and accompaniment in securing entitlements.",
          "The center's staff seeks to create sustainable change based on partnership with participants and building their capabilities, reflected in improved quality of life and community involvement.",
        ],
      },
      { heading: "4. Program 360", body: ["A municipal program for children and youth in distress, including group therapy."] },
      {
        heading: "5. Yahav Program",
        body: [
          "Intended for families in distress, providing intensive services to strengthen and reinforce family bonds and rehabilitate them, and to ensure a safe home for the family.",
        ],
      },
      {
        heading: "6. Early Childhood: Building a Strong Foundation for the Future",
        body: [
          "Our early-childhood programs",
          "We believe that a child's early years are the foundation for their future, so we offer a comprehensive set of programs and services designed to support children and their families during this critical stage.",
          "The frameworks and programs the department offers for early childhood",
        ],
      },
    ],
    s3EarlyChildhoodLabel: "",
    s3Bullets: [
      "1. Placing children in distress in accredited daycare centers with a social-welfare subsidy code.",
      '2. The "Reshit" (Beginning) program guiding parents in 15 families: we provide personal guidance to new parents (of children from birth to age 7), helping them develop positive parenting skills and build a healthy relationship with their children from the earliest days.',
      '3. The "Alwan" (Colors) Clubhouse: this after-school framework provides a dedicated rehabilitative service for 15 students.',
      "4. A joint clubhouse in cooperation with the Education Department: this framework also operates after school hours and provides a dedicated rehabilitative service for 15 students.",
    ],
    s4Title: "Rehabilitation, Accompaniment and Prevention Unit",
    s4Intro:
      "The specialized Rehabilitation, Accompaniment and Prevention Unit works on treating, rehabilitating and identifying special populations. We offer comprehensive programs aimed at reintegrating individuals into the community and building a better future for them.",
    s4FrameworksLabel: "Frameworks and Programs",
    s4Items: [
      {
        heading: "1. Youth Unit",
        body: ["We provide individual and group service and treatment for young men and women, including the work of field counselors who reach youth in their natural environment."],
      },
      {
        heading: "2. Circles (\"Ma'agalim\") Program",
        body: ["Therapeutic groups for teenagers, each group comprising 12 participants. It provides a safe environment for self-expression and growth."],
      },
      {
        heading: "3. The Warm Home",
        body: [
          'The "Warm Home" for girls – Hope Center provides girls with a supportive climate aimed at healthy socialization and proper guidance, so they can take on individual and collective responsibility in the future. We provide this service to 15 girls.',
        ],
      },
      {
        heading: "4. Career Guidance Space (Employment Promotion Space)",
        body: ["We accompany young people on their career journey, help them discover their abilities and develop their employment skills, and guide them toward suitable job opportunities. The service is provided to 10 young men and women."],
      },
      {
        heading: "5. Addiction Unit – \"Steps\" (\"Tzadim\")",
        body: [
          "A long-standing unit operating since 1990, providing awareness services and individual, group and community treatment for addiction to drugs, alcohol, gambling and behavioral addictions. Our specialized team accompanies patients on their long recovery journey.",
        ],
      },
    ],
    s5Title: "Golden Generation: For Senior Citizens",
    s5Paragraphs: [
      "We provide high-quality individual services for senior citizens as part of a comprehensive vision of community development. We believe that the elderly are the community's treasure and the repository of its experience, and deserve every respect and care.",
      "Through our diverse programs, we work to ease the loneliness senior citizens may feel and to strengthen social ties among them. We provide a warm and stimulating environment that helps them remain active and engaged with the community.",
    ],
    s5FrameworksLabel: "Frameworks and Programs",
    s5Points: [
      {
        bold: "Active daily clubs:",
        text: 'We operate clubs for the golden generation – the "Mofet" club, whose staff serve hot meals and offer a variety of activities and services, where seniors meet for social, cultural and leisure activities; and the "Mo\'ushar" club, whose staff offer a variety of activities and services, alongside diverse community programs.',
      },
      {
        bold: "Diverse community programs:",
        text: "Through an assessment of seniors' needs by the community belonging and integration coordinator, aimed at easing loneliness and strengthening social ties among the elderly.",
      },
      {
        bold: "Dedicated individual services:",
        text: "Providing individual follow-up on the special needs of senior citizens, including assistance in securing their entitlements.",
      },
    ],
    s6Title: "People with Special Needs: Comprehensive and Integrated Care",
    s6Intro: "The Special Needs Unit provides support, services and rehabilitation for people",
    s6Bullets: [
      "with various disabilities, people with autism and autism spectrum disorders",
      "with developmental intellectual disabilities",
      "with physical/mobility limitations",
      "with visual and hearing impairments",
    ],
    s6Closing: "with the aim of empowering them, integrating them into the community and workplaces, and securing their rights.",
    s6FrameworksLabel: "Frameworks and Programs",
    s6Programs: [
      'The "Maram" club for people with disabilities (29 participants) – the club offers recreational, awareness and enrichment programs in the afternoon hours.',
      'The "Supportive Environment" program for people with intellectual disabilities, including home accompaniment by a social worker and a field guide.',
      'The "Kanner" club for children on the autism spectrum (in cooperation with the Western Galilee Cluster).',
    ],
    s7Title: "Community Work and Volunteering",
    s7Paragraph:
      "Community work falls within the scope of the Welfare and Social Security Department, in cooperation with Local Council departments, the Ministry of Welfare, community-work professionals, activists and volunteers. It aims to empower the community to influence its environment, reduce social and economic gaps, and enhance quality of life by involving residents, identifying needs, planning projects and developing joint services.",
    s7AreasLabel: "Main areas:",
    s7Points: [
      {
        bold: "Resilience and volunteering:",
        text: 'Promoting emergency preparedness, such as the "Sanad Kafr Yasif Team for Community Resilience and Emergencies," composed of local activists; local leadership development and channeling energy into environmental projects that preserve quality of life.',
      },
      {
        bold: "Empowerment and Entitlement Center:",
        text: "Strengthening social solidarity, counseling services, employment opportunities, and support for youth, single-parent families and low-income populations.",
      },
      {
        bold: "Volunteering Unit:",
        text: "Established to organize volunteers according to their abilities and skills, and helps organize, guide and coordinate among the available human resources.",
      },
    ],
    s8Title: "Together We Build a Better Community",
    s8Paragraphs: [
      "The Social Welfare Department of the Kafr Yasif Local Council is always ready to provide services to residents, whether you need individual support, family assistance, or guidance.",
      "Our services are available to all residents of Kafr Yasif. We are committed to providing a professional response that preserves the dignity of every individual according to the highest professional standards, and we maintain full confidentiality.",
      "Our specialized team is ready to help you and accompany you on your journey toward a better life.",
    ],
    s8Quote: "Welfare and Social Security Department - Kafr Yasif | Together toward a better future",
    s9Title: "Welfare and Social Security Department Staff",
    s9Intro:
      "Meet our team, which is committed to providing the best services and care to the residents of Kafr Yasif. Don't hesitate to contact us for assistance or to inquire about our programs.",
    staff: [
      { name: "رهان درويش", role: "Director of the Social Welfare Department" },
      { name: "نداء صفيه", role: "Department Secretary" },
      { name: "كامله أيوب", role: "Community Social Worker / Head of Planning & Treatment Committees" },
      { name: "حسينة صفية", role: "Social Worker - Head of the Yahav Program, Youth in Distress, Domestic Violence Treatment" },
      { name: "منال شحادة", role: "Department Accountant" },
      { name: "هبة ناطور", role: "Volunteer Coordinator" },
      { name: "هبة حديد", role: "Social Worker - Families, Golden Generation" },
      { name: "إيمان درويش", role: "Social Worker - Families, People with Special Needs" },
      { name: "رنا علي", role: "Social Worker - Golden Generation, Career Guidance Space" },
      { name: "مرفت عثمان", role: 'Head of the "Reshit" Program' },
      { name: "نرمين عبد", role: "Social Worker - Families, People with Special Needs" },
      { name: "سهى شهادة", role: "Social Worker - Head of Youth, Clubhouse" },
      { name: "باسل عبده", role: "Head of the Addiction Unit" },
      { name: "جاكلين فرح", role: "Emergency Coordinator / Belonging Coordinator" },
      { name: "فدوى صفية", role: 'Social Worker - Community, "Alwan" Clubhouse' },
      { name: "منابا أبو رومي", role: "Social Worker - Otzma Empowerment Center, Families" },
      { name: "بسمة داود", role: "Coordinator of the Otzma Empowerment Center - Community Social Worker" },
      { name: "ربى الشغري", role: "Coordinator of the Sawa Center for Family Safety" },
      { name: "كاترين داوود", role: "Social Worker - The Warm Home for Girls" },
      { name: "دنى خوري", role: "Belonging Coordinator" },
    ],
  },
};

export function WelfarePageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle} />

      <div className="mb-6 flex justify-start">
        <div className="relative h-36 w-36 overflow-hidden rounded-2xl shadow-sm ring-1 ring-zinc-100 sm:h-40 sm:w-40">
          <Image src="/uploads/welfare-hero.avif" alt={c.heroImageAlt} fill sizes="160px" className="object-cover" />
        </div>
      </div>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Heart} title={c.s1Title}>
          {c.s1Paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={2} icon={LayoutGrid} title={c.s2Title}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.serviceAreas.map((a) => (
              <div key={a.title} className="rounded-xl bg-cream-50 p-4">
                <h3 className="mb-1 font-semibold text-teal-900">{a.title}</h3>
                <p className="text-sm leading-6 text-ink-600">{a.text}</p>
              </div>
            ))}
          </div>
        </NumberedSection>

        <NumberedSection index={3} icon={Users} title={c.s3Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s3Intro}</p>
          {c.s3Items.map((item, i) => (
            <div key={i}>
              <h3 className="pt-2 font-semibold text-teal-900">{item.heading}</h3>
              {item.body.map((p, j) => (
                <p key={j} className="text-sm leading-6 text-ink-600">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <BulletList items={c.s3Bullets} />
        </NumberedSection>

        <NumberedSection index={4} icon={LifeBuoy} title={c.s4Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s4Intro}</p>
          <p className="text-sm leading-6 text-ink-600">{c.s4FrameworksLabel}</p>
          {c.s4Items.map((item, i) => (
            <div key={i}>
              <h3 className="pt-2 font-semibold text-teal-900">{item.heading}</h3>
              {item.body.map((p, j) => (
                <p key={j} className="text-sm leading-6 text-ink-600">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </NumberedSection>

        <NumberedSection index={5} icon={Sun} title={c.s5Title}>
          {c.s5Paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
          <p className="text-sm leading-6 text-ink-600">{c.s5FrameworksLabel}</p>
          <BulletList
            items={c.s5Points.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={6} icon={Accessibility} title={c.s6Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s6Intro}</p>
          <BulletList items={c.s6Bullets} />
          <p className="text-sm leading-6 text-ink-600">{c.s6Closing}</p>
          <p className="text-sm leading-6 text-ink-600">{c.s6FrameworksLabel}</p>
          <BulletList items={c.s6Programs} />
        </NumberedSection>

        <NumberedSection index={7} icon={Users2} title={c.s7Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s7Paragraph}</p>
          <p className="text-sm leading-6 text-ink-600">{c.s7AreasLabel}</p>
          <BulletList
            items={c.s7Points.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={8} icon={HeartHandshake} title={c.s8Title}>
          {c.s8Paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
          <blockquote className="rounded-xl bg-cream-50 p-4 text-sm font-medium italic leading-6 text-teal-900">{c.s8Quote}</blockquote>
        </NumberedSection>

        <NumberedSection index={9} icon={Users} title={c.s9Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s9Intro}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.staff.map((m) => (
              <StaffCard key={m.name} name={m.name} role={m.role} />
            ))}
          </div>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
