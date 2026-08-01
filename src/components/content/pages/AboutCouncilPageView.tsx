import { Users, Compass, Building2, ShieldAlert, MessageCircle } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection as Section, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };
type ContactPoint = { bold: string; text: string; phone?: string; phoneSuffix?: string };

type LocaleContent = {
  heroText: string;
  introLine: string;
  identityTitle: string;
  identityPoints: BoldPoint[];
  visionTitle: string;
  visionIntro: string;
  visionPoints: BoldPoint[];
  servicesTitle: string;
  servicesIntro: string;
  servicesPoints: BoldPoint[];
  emergencyTitle: string;
  emergencyParagraph: string;
  contactTitle: string;
  contactIntro: string;
  contactPoints: ContactPoint[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroText:
      "המועצה המקומית כפר יאסיף היא הלב הפועם של היישוב, והיא נחשבת לאחת הרשויות המקומיות המעניינות והוותיקות בישראל. המועצה אחראית על ניהול חיי היום-יום של כ-10,500 תושבים, תוך ניסיון לאזן בין שימור המורשת ההיסטורית הענפה של הכפר לבין פיתוח מודרני.",
    introLine: "להלן סקירה מקיפה על המועצה:",
    identityTitle: "זהות והנהגה",
    identityPoints: [
      {
        bold: "הנהגה נוכחית:",
        text: "בראש המועצה עומד מר עסאם נעים שחאדה (נבחר ב-2024). הנהגת המועצה הנוכחית שמה דגש על שקיפות, דיגיטציה של שירותים ושיפור התשתיות בגרעין הכפר העתיק.",
      },
      {
        bold: "היסטוריה מנהלית:",
        text: "כפר יאסיף מחזיקה בתואר המועצה המקומית הערבית הראשונה שהוכרה בארץ (כבר בשנת 1925), מה שמעניק לה מעמד של כבוד וניסיון רב בניהול עצמי.",
      },
    ],
    visionTitle: "חזון המועצה וסדרי עדיפויות",
    visionIntro: "המועצה מגדירה את עצמה כמרכז חינוכי ותרבותי אזורי. סדרי העדיפויות התקציביים לשנת 2026 מתמקדים ב:",
    visionPoints: [
      {
        bold: "חינוך מצטיין:",
        text: "השקעה מאסיבית בבתי הספר המקומיים, הנחשבים למובילים במגזר, תוך דגש על צמצום פערים דיגיטליים.",
      },
      {
        bold: "פיתוח תשתיות:",
        text: "סלילת כבישים פנימיים ושיפור מערכות הניקוז (נושא קריטי בחורף הגלילי).",
      },
      {
        bold: "כלכלה מקומית:",
        text: "עידוד יזמות מסחרית לאורך הצירים הראשיים (כביש 70) כדי להגדיל את הכנסות המועצה מארנונה עסקית.",
      },
    ],
    servicesTitle: "שירותים לתושב (המבנה התפעולי)",
    servicesIntro: "המועצה פועלת באמצעות מחלקות מקצועיות המספקות מענה לכל תחומי החיים:",
    servicesPoints: [
      { bold: "אגף הנדסה:", text: "אחראי על תכנון מתארי ורישוי בנייה." },
      { bold: 'מחלקת שפ"ע (שיפור פני העיר):', text: "אחראית על הניקיון, פינוי האשפה והתאורה." },
      { bold: "מחלקה לשירותים חברתיים:", text: "מעניקה סיוע וליווי למשפחות ויחידים." },
      {
        bold: "מחלקת גבייה:",
        text: "מנהלת את תשלומי הארנונה והאגרות (ניתן לבצע תשלומים גם באופן מקוון בפורטל המועצה).",
      },
    ],
    emergencyTitle: "פעילות בחירום",
    emergencyParagraph:
      'כיישוב הממוקם בגליל המערבי, המועצה מפעילה מרכז הפעלה (חמ"ל) המיועד למצבי חירום. המועצה עובדת בשיתוף פעולה הדוק עם פיקוד העורף כדי להבטיח את מיגון התושבים ותקינות המקלטים הציבוריים.',
    contactTitle: "קשר עם הציבור",
    contactIntro: "המועצה משקיעה לאחרונה בשיפור הקשר עם התושב דרך:",
    contactPoints: [
      { bold: "דף פייסבוק פעיל:", text: "עדכונים שוטפים בערבית ובעברית." },
      { bold: "שעות קבלה:", text: "ראש המועצה שומר על דלת פתוחה בימים ב', ד' ו-ש' (10:00-15:00)." },
      { bold: "מוקד טלפוני:", text: "זמין לדיווח על מפגעים בטלפון", phone: "04-9569800", phoneSuffix: "." },
    ],
  },
  ar: {
    heroText:
      "المجلس المحلي كفر ياسيف هو القلب النابض للبلدة، ويُعد من أكثر السلطات المحلية إثارة للاهتمام وعراقة في إسرائيل. يتولى المجلس إدارة الحياة اليومية لنحو 10,500 مقيم، سعياً إلى الموازنة بين الحفاظ على الإرث التاريخي الغني للقرية والتطوير الحديث.",
    introLine: "فيما يلي نظرة شاملة على المجلس:",
    identityTitle: "الهوية والقيادة",
    identityPoints: [
      {
        bold: "القيادة الحالية:",
        text: "يرأس المجلس السيد عصام نعيم شحادة (انتُخب عام 2024). تضع قيادة المجلس الحالية تركيزاً على الشفافية ورقمنة الخدمات وتحسين البنى التحتية في نواة القرية القديمة.",
      },
      {
        bold: "تاريخ إداري:",
        text: "تحمل كفر ياسيف لقب أول مجلس محلي عربي معترف به في البلاد (منذ عام 1925)، ما يمنحها مكانة مرموقة وخبرة واسعة في الإدارة الذاتية.",
      },
    ],
    visionTitle: "رؤية المجلس وأولوياته",
    visionIntro: "يُعرّف المجلس نفسه كمركز تعليمي وثقافي إقليمي. تتركز أولويات الميزانية لعام 2026 على:",
    visionPoints: [
      {
        bold: "تعليم متميز:",
        text: "استثمار واسع في المدارس المحلية، التي تُعد من الرائدة في القطاع، مع التركيز على تقليص الفجوات الرقمية.",
      },
      {
        bold: "تطوير البنى التحتية:",
        text: "رصف الطرق الداخلية وتحسين أنظمة الصرف (موضوع بالغ الأهمية في شتاء الجليل).",
      },
      {
        bold: "الاقتصاد المحلي:",
        text: "تشجيع الريادة التجارية على طول المحاور الرئيسية (شارع 70) لزيادة إيرادات المجلس من أرنونا الأعمال.",
      },
    ],
    servicesTitle: "الخدمات للمقيمين (البنية التشغيلية)",
    servicesIntro: "يعمل المجلس من خلال أقسام مهنية تقدم مظلة خدمات لكل مجالات الحياة:",
    servicesPoints: [
      { bold: "قسم الهندسة:", text: "مسؤول عن التخطيط الهيكلي وترخيص البناء." },
      { bold: "قسم تحسين المظهر البلدي:", text: "مسؤول عن النظافة وجمع النفايات والإنارة." },
      { bold: "قسم الخدمات الاجتماعية:", text: "يقدم المساعدة والمرافقة للعائلات والأفراد." },
      {
        bold: "قسم الجباية:",
        text: "يدير دفعات الأرنونا والرسوم (يمكن أيضاً السداد عبر الإنترنت من خلال بوابة المجلس).",
      },
    ],
    emergencyTitle: "النشاط في حالات الطوارئ",
    emergencyParagraph:
      "بصفتها بلدة تقع في الجليل الغربي، يشغّل المجلس مركز إدارة (غرفة عمليات) مخصصاً لحالات الطوارئ. يعمل المجلس بتعاون وثيق مع الجبهة الداخلية لضمان تحصين المقيمين وسلامة الملاجئ العامة.",
    contactTitle: "التواصل مع الجمهور",
    contactIntro: "يستثمر المجلس مؤخراً في تحسين التواصل مع المقيمين من خلال:",
    contactPoints: [
      { bold: "صفحة فيسبوك نشطة:", text: "تحديثات دورية باللغتين العربية والعبرية." },
      { bold: "ساعات الاستقبال:", text: "يحافظ رئيس المجلس على سياسة الباب المفتوح أيام الاثنين والأربعاء والسبت (10:00-15:00)." },
      { bold: "خط هاتفي:", text: "متاح للإبلاغ عن الأعطال والمخاطر على الهاتف", phone: "04-9569800", phoneSuffix: "." },
    ],
  },
  en: {
    heroText:
      "The Kafr Yasif Local Council is the beating heart of the town, and is regarded as one of the most interesting and long-standing local authorities in Israel. The Council is responsible for managing the daily life of some 10,500 residents, seeking to balance preservation of the village's rich historical heritage with modern development.",
    introLine: "Below is a comprehensive overview of the Council:",
    identityTitle: "Identity and Leadership",
    identityPoints: [
      {
        bold: "Current leadership:",
        text: "The Council is headed by Mr. Essam Naim Shehadeh (elected in 2024). The current Council leadership places emphasis on transparency, digitization of services, and infrastructure improvement in the old village core.",
      },
      {
        bold: "Administrative history:",
        text: "Kafr Yasif holds the distinction of being the first Arab local council recognized in the country (as early as 1925), granting it a position of prestige and extensive experience in self-governance.",
      },
    ],
    visionTitle: "Council Vision and Priorities",
    visionIntro: "The Council defines itself as a regional educational and cultural center. The 2026 budget priorities focus on:",
    visionPoints: [
      {
        bold: "Educational excellence:",
        text: "Massive investment in local schools, considered leaders in the sector, with an emphasis on closing digital gaps.",
      },
      {
        bold: "Infrastructure development:",
        text: "Paving internal roads and improving drainage systems (a critical issue during the Galilee winter).",
      },
      {
        bold: "Local economy:",
        text: "Encouraging commercial entrepreneurship along the main thoroughfares (Route 70) to increase the Council's revenue from business property tax.",
      },
    ],
    servicesTitle: "Resident Services (Operational Structure)",
    servicesIntro: "The Council operates through professional departments that provide services across every area of life:",
    servicesPoints: [
      { bold: "Engineering Division:", text: "Responsible for master planning and building permits." },
      { bold: "Municipal Beautification Department:", text: "Responsible for cleanliness, waste collection, and lighting." },
      { bold: "Social Services Department:", text: "Provides assistance and support to families and individuals." },
      {
        bold: "Collections Department:",
        text: "Manages property tax and fee payments (payments can also be made online via the Council portal).",
      },
    ],
    emergencyTitle: "Emergency Activity",
    emergencyParagraph:
      "As a town located in the Western Galilee, the Council operates an emergency operations center dedicated to emergency situations. The Council works in close cooperation with the Home Front Command to ensure resident protection and the proper functioning of public shelters.",
    contactTitle: "Public Engagement",
    contactIntro: "The Council has recently been investing in improving engagement with residents through:",
    contactPoints: [
      { bold: "Active Facebook page:", text: "Regular updates in Arabic and Hebrew." },
      { bold: "Reception hours:", text: "The head of the Council maintains an open-door policy on Mondays, Wednesdays and Saturdays (10:00 AM - 3:00 PM)." },
      { bold: "Telephone hotline:", text: "Available for reporting hazards at", phone: "04-9569800", phoneSuffix: "." },
    ],
  },
};

export function AboutCouncilPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.heroText}</Hero>

      <p className="mb-4 text-base leading-7 text-ink-600">{c.introLine}</p>

      <div className="space-y-4">
        <Section index={1} icon={Users} title={c.identityTitle}>
          <BulletList
            items={c.identityPoints.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </Section>

        <Section index={2} icon={Compass} title={c.visionTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.visionIntro}</p>
          <BulletList
            items={c.visionPoints.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </Section>

        <Section index={3} icon={Building2} title={c.servicesTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.servicesIntro}</p>
          <BulletList
            items={c.servicesPoints.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </Section>

        <Section index={4} icon={ShieldAlert} title={c.emergencyTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.emergencyParagraph}</p>
        </Section>

        <Section index={5} icon={MessageCircle} title={c.contactTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.contactIntro}</p>
          <BulletList
            items={c.contactPoints.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
                {p.phone && (
                  <>
                    {" "}
                    <a href={`tel:${p.phone}`} className="text-teal-700 hover:underline">
                      {p.phone}
                    </a>
                    {p.phoneSuffix}
                  </>
                )}
              </span>
            ))}
          />
        </Section>
      </div>
    </PageArticle>
  );
}
