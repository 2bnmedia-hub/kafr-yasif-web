import { Home, Zap, HeartHandshake, Building2, Phone, ExternalLink } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, LinkedBanner } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };

type LocaleContent = {
  heroSubtitle: string;
  heroBody: string;
  bannerAlt: string;
  s1Title: string;
  s1Intro: string;
  s1Point1Bold: string;
  s1Point1Text: string;
  s1Point2Bold1: string;
  s1Point2Text1: string;
  s1Point2Bold2: string;
  s1Point2Text2: string;
  s1Point2Bold3: string;
  s1Point2Text3: string;
  s1Point3Bold: string;
  s1Point3Text: string;
  s2Title: string;
  s2Intro: string;
  s2Points: BoldPoint[];
  s2Closing: string;
  s3Title: string;
  s3Intro: string;
  s3Points: BoldPoint[];
  s4Title: string;
  s4Intro: string;
  s4School1: string;
  s4School2: string;
  s4Closing: string;
  s5Title: string;
  s5Intro: string;
  s5HotlineBold: string;
  s5HotlineText: string;
  s5HfcBold: string;
  s5HfcText: string;
  s5PoliceBold: string;
  s5PoliceText: string;
  s5MdaBold: string;
  s5MdaText: string;
  s5FireBold: string;
  s5FireText: string;
  s6Title: string;
  s6PortalBold: string;
  s6AppBold: string;
  s6AppText: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "מדריך החוסן היישובי: נערכים היום, מוגנים מחר",
    heroBody:
      "המדריך הרשמי לחירום – מועצה מקומית כפר יאסיף. תושבות ותושבים יקרים, ניסיון העבר מוכיח כי ככל שנתכונן טוב יותר בשגרה, כך נתפקד בצורה מיטבית בחירום. אגף הביטחון והחירום מעמיד לרשותכם את כלל המידע הנחוץ להגנה על בני המשפחה והבית.",
    bannerAlt: "חומר הסברה לשעת חירום",
    s1Title: "המוכנות המשפחתית: הצעדים שעושים היום",
    s1Intro: 'בעריות גדולות מושם דגש על "משפחה כצבא קטן". בצעו את שלושת השלבים הבאים:',
    s1Point1Bold: 'בחירת ה"מרחב המוגן הביתי":',
    s1Point1Text: "ודאו שכל בני המשפחה מכירים את החדר שנבחר ומסוגלים להגיע אליו בתוך 90 שניות.",
    s1Point2Bold1: "הכנת תיק ה-72 (ערכת הישרדות):",
    s1Point2Text1: "הכינו תיק שיאפשר לכם שהייה עצמאית למשך 3 יממות.",
    s1Point2Bold2: "חובה:",
    s1Point2Text2: "3 ליטר מים לאדם ליום, מזון יבש, פנס סוללות, ערכת עזרה ראשונה.",
    s1Point2Bold3: "חשוב:",
    s1Point2Text3: "מטען נייד, צילומי מסמכים (תעודות זהות, ביטוח), ותרופות מרשם.",
    s1Point3Bold: "שיחת היערכות משפחתית:",
    s1Point3Text: 'הגדירו "איש קשר" מחוץ ליישוב אליו כולם מתקשרים אם אין קליטה מקומית, וקבעו נקודת מפגש משפחתית.',
    s2Title: "זמן אמת: פעולות מצילות חיים",
    s2Intro: 'בזמן הישמע אזעקה או קבלת התרעה באפליקציה, פועלים לפי הנחיית "הכי מוגן שיש":',
    s2Points: [
      { bold: "בתוך מבנה:", text: 'כניסה מיידית לממ"ד/מקלט/חדר פנימי. סגירת חלונות ודלתות.' },
      { bold: "בחוץ (שטח בנוי):", text: "כניסה לחדר מדרגות או למבנה קרוב. אין להישאר ברחבת הכניסה." },
      { bold: "בשטח פתוח:", text: "שכיבה על הקרקע והגנה על הראש באמצעות הידיים (זהו האמצעי היעיל ביותר נגד רסיסים)." },
      { bold: "ברכב:", text: "עצירה בבטחה בצד הדרך, יציאה מהרכב וכניסה למבנה או היצמדות לקרקע." },
    ],
    s2Closing: "חשוב: יש לשהות במרחב המוגן 10 דקות לפחות מרגע הישמע האזעקה.",
    s3Title: "חוסן וקהילה: מידע וסיוע",
    s3Intro: "עירייה חזקה נמדדת בערבות ההדדית שלה.",
    s3Points: [
      { bold: "סיוע לשכנים:", text: "בדקו מה שלום קשישים, בעלי מוגבלויות או משפחות עם ילדים קטנים המתגוררים בסמיכות אליכם." },
      {
        bold: "התמודדות עם חרדה:",
        text: 'במצבי לחץ, מומלץ להשתמש בשיטת יהלו"ם (יצירת קשר, הדגשת מחויבות, לוגיקה, ועשייה). אם אתם זקוקים לתמיכה רגשית, מוקד המועצה זמין עבורכם.',
      },
      {
        bold: "הסברה לילדים:",
        text: 'תיווך המצב לילדים בגובה העיניים, תוך מתן תפקידים ("אתה אחראי להביא את הפנס לממ"ד"), מחזק את תחושת השליטה שלהם.',
      },
    ],
    s4Title: "מתקני קליטה ביישוב (מרכזי שהייה)",
    s4Intro:
      "במקרים של אירוע חריג, פגיעה במבני מגורים או צורך בפינוי אוכלוסייה, המועצה המקומית הגדירה את המוסדות הבאים כמרכזי קליטה רשמיים. מרכזים אלו ערוכים למתן מענה ראשוני, קורת גג וסיוע לוגיסטי:",
    s4School1: "בית ספר יסודי א' (אלביאדר)",
    s4School2: "בית ספר יסודי ב' (אלבוסתאן)",
    s4Closing: "שימו לב: הגעה למרכזי הקליטה תתבצע בהתאם להנחיות המועצה ואגף הביטחון שיפורסמו בזמן אמת.",
    s5Title: "מוקדי שירות וחירום – רשימת קשר חיונית",
    s5Intro: "אנו ממליצים לשמור מספרים אלו בחיוג המהיר במכשיר הטלפון שלכם:",
    s5HotlineBold: "מוקד המועצה המקומית:",
    s5HotlineText: "דיווח על מפגעים וקבלת מידע יישובי",
    s5HfcBold: "פיקוד העורף:",
    s5HfcText: "הנחיות התגוננות ופורטל החירום",
    s5PoliceBold: "משטרת ישראל:",
    s5PoliceText: "אירועי ביטחון פנים וסדר ציבורי",
    s5MdaBold: 'מד"א:',
    s5MdaText: "עזרה ראשונה ומצבי חירום רפואיים",
    s5FireBold: "כבאות והצלה:",
    s5FireText: "שריפות, חילוץ ולכידת לכודים",
    s6Title: "קישורים דיגיטליים למעקב בזמן אמת",
    s6PortalBold: "פורטל החירום הלאומי:",
    s6AppBold: "אפליקציית פיקוד העורף:",
    s6AppText: "(ניתן להורדה בחנויות האפליקציות - מומלץ להפעיל התרעות מבוססות מיקום).",
  },
  ar: {
    heroSubtitle: "دليل الصمود المحلي: نستعد اليوم، نكون محميين غداً",
    heroBody:
      "الدليل الرسمي للطوارئ – المجلس المحلي كفر ياسيف. أهلنا الكرام، تثبت تجربة الماضي أنه كلما استعددنا بشكل أفضل في الروتين، كلما تصرفنا بشكل أمثل في الطوارئ. توفر شعبة الأمن والطوارئ لكم كل المعلومات اللازمة لحماية أفراد الأسرة والمنزل.",
    bannerAlt: "مواد توعية لحالات الطوارئ",
    s1Title: "الجاهزية العائلية: الخطوات التي تُتخذ اليوم",
    s1Intro: 'في البلديات الكبرى يُشدَّد على مبدأ "العائلة كجيش صغير". اتبعوا الخطوات الثلاث التالية:',
    s1Point1Bold: 'اختيار "المكان المحمي المنزلي":',
    s1Point1Text: "تأكدوا من أن جميع أفراد الأسرة يعرفون الغرفة المختارة وقادرون على الوصول إليها خلال 90 ثانية.",
    s1Point2Bold1: "تجهيز حقيبة الـ72 ساعة (عدة النجاة):",
    s1Point2Text1: "جهّزوا حقيبة تتيح لكم البقاء بشكل مستقل لمدة 3 أيام.",
    s1Point2Bold2: "إلزامي:",
    s1Point2Text2: "3 لترات ماء للشخص يومياً، طعام جاف، مصباح يعمل بالبطاريات، عدة إسعافات أولية.",
    s1Point2Bold3: "مهم:",
    s1Point2Text3: "شاحن محمول، نسخ عن المستندات (بطاقات الهوية، التأمين)، والأدوية الموصوفة.",
    s1Point3Bold: "محادثة استعداد عائلية:",
    s1Point3Text: 'حددوا "جهة اتصال" خارج البلدة يتصل بها الجميع في حال انعدام التغطية المحلية، وحددوا نقطة تجمع عائلية.',
    s2Title: "الوقت الحقيقي: إجراءات تنقذ الأرواح",
    s2Intro: 'عند سماع صفارة الإنذار أو تلقي تنبيه عبر التطبيق، تصرفوا وفق مبدأ "الأكثر أماناً":',
    s2Points: [
      { bold: "داخل مبنى:", text: "الدخول الفوري إلى الغرفة المحمية/الملجأ/غرفة داخلية. إغلاق النوافذ والأبواب." },
      { bold: "في الخارج (منطقة مبنية):", text: "الدخول إلى بيت الدرج أو مبنى قريب. عدم البقاء في ساحة المدخل." },
      { bold: "في منطقة مفتوحة:", text: "الاستلقاء على الأرض وحماية الرأس باليدين (هذه أنجع وسيلة ضد الشظايا)." },
      { bold: "داخل السيارة:", text: "التوقف بأمان على جانب الطريق، الخروج من السيارة والدخول إلى مبنى أو الانبطاح على الأرض." },
    ],
    s2Closing: "مهم: يجب البقاء في المكان المحمي 10 دقائق على الأقل من لحظة سماع صفارة الإنذار.",
    s3Title: "الصمود والمجتمع: معلومات ومساعدة",
    s3Intro: "تُقاس قوة البلدية بمدى التكافل بين سكانها.",
    s3Points: [
      { bold: "مساعدة الجيران:", text: "اطمئنوا على المسنين وذوي الإعاقة والعائلات ذات الأطفال الصغار المقيمين بالقرب منكم." },
      {
        bold: "التعامل مع القلق:",
        text: "في حالات الضغط، يُنصح باستخدام أسلوب التواصل، التأكيد على الالتزام، المنطق والفعل. إذا احتجتم لدعم نفسي، مركز اتصال المجلس متاح لكم.",
      },
      {
        bold: "التوعية للأطفال:",
        text: 'شرح الوضع للأطفال بلغة تناسب مستواهم، مع إعطائهم أدواراً ("أنت مسؤول عن إحضار المصباح إلى الغرفة المحمية")، يعزز شعورهم بالسيطرة.',
      },
    ],
    s4Title: "مراكز الاستيعاب في البلدة (مراكز الإيواء)",
    s4Intro:
      "في حالات وقوع حدث استثنائي أو ضرر بمباني السكن أو الحاجة لإخلاء السكان، حدد المجلس المحلي المؤسسات التالية كمراكز إيواء رسمية. هذه المراكز مجهزة لتقديم استجابة أولية ومأوى ومساعدة لوجستية:",
    s4School1: "المدرسة الابتدائية أ (البيادر)",
    s4School2: "المدرسة الابتدائية ب (البستان)",
    s4Closing: "يرجى الانتباه: سيتم التوجه إلى مراكز الإيواء وفقاً لتعليمات المجلس وشعبة الأمن التي ستُنشر في الوقت الفعلي.",
    s5Title: "مراكز الخدمة والطوارئ – قائمة اتصال أساسية",
    s5Intro: "نوصي بحفظ هذه الأرقام في الاتصال السريع في هاتفكم:",
    s5HotlineBold: "مركز اتصال المجلس المحلي:",
    s5HotlineText: "الإبلاغ عن مخاطر وتلقي معلومات محلية",
    s5HfcBold: "قيادة الجبهة الداخلية:",
    s5HfcText: "تعليمات الحماية وبوابة الطوارئ",
    s5PoliceBold: "شرطة إسرائيل:",
    s5PoliceText: "أحداث الأمن الداخلي والنظام العام",
    s5MdaBold: "نجمة داوود الحمراء (الإسعاف):",
    s5MdaText: "الإسعافات الأولية والحالات الطبية الطارئة",
    s5FireBold: "الإطفاء والإنقاذ:",
    s5FireText: "الحرائق والإنقاذ وتحرير المحاصرين",
    s6Title: "روابط رقمية للمتابعة في الوقت الفعلي",
    s6PortalBold: "بوابة الطوارئ الوطنية:",
    s6AppBold: "تطبيق قيادة الجبهة الداخلية:",
    s6AppText: "(متوفر للتحميل في متاجر التطبيقات - يُنصح بتفعيل التنبيهات القائمة على الموقع).",
  },
  en: {
    heroSubtitle: "Community Resilience Guide: Prepare today, stay protected tomorrow",
    heroBody:
      "The official emergency guide of the Kafr Yasif Local Council. Dear residents, past experience shows that the better prepared we are in routine times, the better we function in an emergency. The Security and Emergency Division provides you with all the information needed to protect your family and home.",
    bannerAlt: "Emergency preparedness guide",
    s1Title: "Family Readiness: Steps to Take Today",
    s1Intro: 'Large municipalities emphasize the principle of "family as a small army." Follow these three steps:',
    s1Point1Bold: 'Choosing the "home protected space":',
    s1Point1Text: "Make sure all family members know the chosen room and can reach it within 90 seconds.",
    s1Point2Bold1: "Preparing a 72-hour survival kit:",
    s1Point2Text1: "Prepare a bag that will allow you to be self-sufficient for 3 days.",
    s1Point2Bold2: "Required:",
    s1Point2Text2: "3 liters of water per person per day, dry food, a battery-powered flashlight, a first-aid kit.",
    s1Point2Bold3: "Important:",
    s1Point2Text3: "A portable charger, copies of documents (ID cards, insurance), and prescription medication.",
    s1Point3Bold: "Family readiness conversation:",
    s1Point3Text: "Designate an out-of-town contact person everyone can call if there's no local reception, and set a family meeting point.",
    s2Title: "Real Time: Life-Saving Actions",
    s2Intro: 'When a siren sounds or you receive an app alert, act according to the "safest possible" principle:',
    s2Points: [
      { bold: "Inside a building:", text: "Immediately enter the safe room/shelter/interior room. Close windows and doors." },
      { bold: "Outdoors (built-up area):", text: "Enter a stairwell or a nearby building. Do not remain in an entrance plaza." },
      { bold: "In an open area:", text: "Lie on the ground and protect your head with your hands (the most effective measure against shrapnel)." },
      { bold: "In a vehicle:", text: "Stop safely at the side of the road, exit the vehicle and enter a building or lie flat on the ground." },
    ],
    s2Closing: "Important: remain in the protected space for at least 10 minutes from the moment the siren sounds.",
    s3Title: "Resilience and Community: Information and Assistance",
    s3Intro: "A strong town is measured by its mutual solidarity.",
    s3Points: [
      { bold: "Helping neighbors:", text: "Check on elderly residents, people with disabilities, or families with young children living near you." },
      {
        bold: "Coping with anxiety:",
        text: "In stressful situations, it is recommended to use a method of connection, commitment, logic and action. If you need emotional support, the Council hotline is available for you.",
      },
      {
        bold: "Explaining to children:",
        text: 'Explain the situation to children at eye level, giving them small responsibilities ("you\'re in charge of bringing the flashlight to the safe room"), which strengthens their sense of control.',
      },
    ],
    s4Title: "Reception Facilities in Town (Emergency Shelters)",
    s4Intro:
      "In the event of an extraordinary incident, damage to residential buildings, or a need to evacuate residents, the Local Council has designated the following institutions as official reception centers. These centers are equipped to provide initial response, shelter and logistical assistance:",
    s4School1: "Elementary School A (Al-Bayader)",
    s4School2: "Elementary School B (Al-Bustan)",
    s4Closing: "Please note: access to reception centers will be carried out according to Council and Security Division instructions published in real time.",
    s5Title: "Service and Emergency Hotlines – Essential Contact List",
    s5Intro: "We recommend saving these numbers to your phone's speed dial:",
    s5HotlineBold: "Local Council hotline:",
    s5HotlineText: "Report hazards and receive local information",
    s5HfcBold: "Home Front Command:",
    s5HfcText: "Protection guidelines and the emergency portal",
    s5PoliceBold: "Israel Police:",
    s5PoliceText: "Internal security incidents and public order",
    s5MdaBold: "Magen David Adom (ambulance):",
    s5MdaText: "First aid and medical emergencies",
    s5FireBold: "Fire and Rescue:",
    s5FireText: "Fires, rescue and extrication of trapped persons",
    s6Title: "Digital Links for Real-Time Tracking",
    s6PortalBold: "National Emergency Portal:",
    s6AppBold: "Home Front Command app:",
    s6AppText: "(available for download in app stores - it is recommended to enable location-based alerts).",
  },
};

export function EmergencyGuidePageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroBody}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Home} title={c.s1Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s1Intro}</p>
          <BulletList
            items={[
              <span key="p1">
                <strong className="text-ink-900">{c.s1Point1Bold}</strong> {c.s1Point1Text}
              </span>,
              <span key="p2">
                <strong className="text-ink-900">{c.s1Point2Bold1}</strong> {c.s1Point2Text1}
                <br />
                <strong className="text-ink-900">{c.s1Point2Bold2}</strong> {c.s1Point2Text2}
                <br />
                <strong className="text-ink-900">{c.s1Point2Bold3}</strong> {c.s1Point2Text3}
              </span>,
              <span key="p3">
                <strong className="text-ink-900">{c.s1Point3Bold}</strong> {c.s1Point3Text}
              </span>,
            ]}
          />
        </NumberedSection>

        <NumberedSection index={2} icon={Zap} title={c.s2Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s2Intro}</p>
          <BulletList
            items={c.s2Points.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
          <p className="pt-2 text-sm leading-6 text-ink-600">{c.s2Closing}</p>
        </NumberedSection>

        <NumberedSection index={3} icon={HeartHandshake} title={c.s3Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s3Intro}</p>
          <BulletList
            items={c.s3Points.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={4} icon={Building2} title={c.s4Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s4Intro}</p>
          <BulletList
            items={[
              <span key="sc1">
                <strong className="text-ink-900">{c.s4School1}</strong> —{" "}
                {locale === "en" ? "phone" : locale === "ar" ? "هاتف" : "טלפון"}:{" "}
                <a href="tel:04-9961711" className="text-teal-700 hover:underline">
                  04-9961711
                </a>
              </span>,
              <span key="sc2">
                <strong className="text-ink-900">{c.s4School2}</strong> —{" "}
                {locale === "en" ? "phone" : locale === "ar" ? "هاتف" : "טלפון"}:{" "}
                <a href="tel:04-9961713" className="text-teal-700 hover:underline">
                  04-9961713
                </a>
              </span>,
            ]}
          />
          <p className="pt-2 text-sm leading-6 text-ink-600">{c.s4Closing}</p>
        </NumberedSection>

        <NumberedSection index={5} icon={Phone} title={c.s5Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s5Intro}</p>
          <BulletList
            items={[
              <span key="h1">
                <strong className="text-ink-900">{c.s5HotlineBold}</strong>{" "}
                <a href="tel:106" className="text-teal-700 hover:underline">
                  106
                </a>{" "}
                {c.s5HotlineText}
              </span>,
              <span key="h2">
                <strong className="text-ink-900">{c.s5HfcBold}</strong>{" "}
                <a href="tel:104" className="text-teal-700 hover:underline">
                  104
                </a>{" "}
                {c.s5HfcText}
              </span>,
              <span key="h3">
                <strong className="text-ink-900">{c.s5PoliceBold}</strong>{" "}
                <a href="tel:100" className="text-teal-700 hover:underline">
                  100
                </a>{" "}
                {c.s5PoliceText}
              </span>,
              <span key="h4">
                <strong className="text-ink-900">{c.s5MdaBold}</strong>{" "}
                <a href="tel:101" className="text-teal-700 hover:underline">
                  101
                </a>{" "}
                {c.s5MdaText}
              </span>,
              <span key="h5">
                <strong className="text-ink-900">{c.s5FireBold}</strong>{" "}
                <a href="tel:102" className="text-teal-700 hover:underline">
                  102
                </a>{" "}
                {c.s5FireText}
              </span>,
            ]}
          />
        </NumberedSection>

        <NumberedSection index={6} icon={ExternalLink} title={c.s6Title}>
          <BulletList
            items={[
              <span key="l1">
                <strong className="text-ink-900">{c.s6PortalBold}</strong>{" "}
                <a
                  href="https://www.oref.org.il/heb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-700 hover:underline"
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  www.oref.org.il
                </a>
              </span>,
              <span key="l2">
                <strong className="text-ink-900">{c.s6AppBold}</strong> {c.s6AppText}
              </span>,
            ]}
          />
        </NumberedSection>
      </div>

      <LinkedBanner src="/uploads/emergency-security-hero.avif" alt={c.bannerAlt} href="https://www.oref.org.il/heb" />
    </PageArticle>
  );
}
