import { ShieldAlert, Radio, Camera, AlertTriangle, ExternalLink } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, LinkedBanner } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  heroSubtitle: string;
  heroBody: string;
  bannerAlt: string;
  s1Title: string;
  s1Points: string[];
  s2Title: string;
  s2Points: string[];
  s3Title: string;
  s3Points: string[];
  s4Title: string;
  s4Points: string[];
  s5Title: string;
  s5Intro: string;
  s5ShelterBold: string;
  s5ShelterText: string;
  s5LinkLabel: string;
  s5ReportBold: string;
  s5ReportText: string;
  s5VolunteerBold: string;
  s5VolunteerText: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "אגף חירום וביטחון – מועצה מקומית כפר יאסיף",
    heroBody:
      "אגף חירום וביטחון אמון על הבטחת שלומם, ביטחונם ואיכות חייהם של תושבי כפר יאסיף והמבקרים בה. האגף פועל בשגרה ובחירום לחיזוק החוסן הקהילתי, מניעת פשיעה, ושמירה על הסדר הציבורי, תוך שיתוף פעולה הדוק עם גופי הביטחון וההצלה הלאומיים. אנו מחויבים למענה מהיר, מקצועי ונחוש לכל אירוע חריג במרחב הציבורי.",
    bannerAlt: "אגף חירום וביטחון",
    s1Title: "היערכות לחירום וחוסן עירוני",
    s1Points: [
      "הכנת הרשות לתרחישי חירום שונים (ביטחוניים, רעידות אדמה, פגעי מזג אוויר).",
      'ניהול מרכז ההפעלה היישובי (המנ"מ) ותיאום מול פיקוד העורף ומשרדי הממשלה.',
      "הכשרה והפעלה של צוותי סער ומתנדבים לשעת חירום.",
    ],
    s2Title: "ביטחון מוסדות חינוך וציבור",
    s2Points: [
      "ניהול מערך האבטחה בבתי הספר, גני הילדים ומתקני המועצה.",
      "פיקוח על תקינות אמצעי המיגון, המקלטים והמרחבים המוגנים ביישוב.",
      "ביצוע תרגילי מוסדות חינוך להעלאת המוכנות בקרב תלמידים וצוותי הוראה.",
    ],
    s3Title: "שיטור עירוני וסדר ציבורי",
    s3Points: [
      "הפעלת ניידות סיור למניעת ונדליזם ושמירה על השקט במרחב הציבורי.",
      "פיקוח על הסדרי תנועה וחנייה בשיתוף עם משטרת ישראל.",
      "הגברת תחושת הביטחון האישי באמצעות נוכחות בולטת במוקדי חיכוך.",
    ],
    s4Title: "טכנולוגיה ומניעה (עיר ללא אלימות)",
    s4Points: [
      "ניהול מערך המצלמות והמוקד הרואה (LPR) לניטור אירועים בזמן אמת.",
      "קידום תוכניות למניעת אלימות ושימוש בחומרים מסוכנים בקרב בני נוער.",
    ],
    s5Title: "הנחיות לתושב בחירום",
    s5Intro: "האגף מפעיל מערך הסברה שוטף לתושבים הכולל:",
    s5ShelterBold: "מיגון:",
    s5ShelterText: "הנחיות לבחירת המרחב המוגן והכנת הבית לחירום.",
    s5LinkLabel: "אתר פיקוד העורף",
    s5ReportBold: "דיווח:",
    s5ReportText: "פנייה למוקד המועצה בכל מקרה של חפץ חשוד, מפגע בטיחותי או אירוע חריג.",
    s5VolunteerBold: "התנדבות:",
    s5VolunteerText: "הזמנה להצטרפות ליחידות המתנדבים היישוביות (יחידת החילוץ וההצלה).",
  },
  ar: {
    heroSubtitle: "شعبة الطوارئ والأمن – المجلس المحلي كفر ياسيف",
    heroBody:
      "تتولى شعبة الطوارئ والأمن مسؤولية ضمان سلامة وأمن ونوعية حياة سكان كفر ياسيف وزوارها. تعمل الشعبة في الروتين وفي الطوارئ على تعزيز الصمود المجتمعي، ومنع الجريمة، والحفاظ على النظام العام، بالتعاون الوثيق مع أجهزة الأمن والإنقاذ الوطنية. نحن ملتزمون بتقديم استجابة سريعة ومهنية وحازمة لكل حدث استثنائي في الحيز العام.",
    bannerAlt: "شعبة الطوارئ والأمن",
    s1Title: "الجاهزية للطوارئ والصمود البلدي",
    s1Points: [
      "إعداد السلطة المحلية لسيناريوهات طوارئ مختلفة (أمنية، زلازل، أحوال جوية).",
      "إدارة مركز التشغيل البلدي والتنسيق مع قيادة الجبهة الداخلية والوزارات الحكومية.",
      "تدريب وتفعيل طواقم الطوارئ والمتطوعين لحالات الطوارئ.",
    ],
    s2Title: "أمن المؤسسات التعليمية والعامة",
    s2Points: [
      "إدارة منظومة الأمن في المدارس ورياض الأطفال ومنشآت المجلس.",
      "الإشراف على سلامة وسائل الحماية والملاجئ والأماكن المحمية في البلدة.",
      "إجراء تدريبات في المؤسسات التعليمية لرفع مستوى الجاهزية لدى الطلاب وطواقم التدريس.",
    ],
    s3Title: "الشرطة البلدية والنظام العام",
    s3Points: [
      "تشغيل دوريات لمنع التخريب والحفاظ على الهدوء في الحيز العام.",
      "الإشراف على ترتيبات المرور ومواقف السيارات بالتعاون مع شرطة إسرائيل.",
      "تعزيز الشعور بالأمن الشخصي من خلال التواجد البارز في نقاط الاحتكاك.",
    ],
    s4Title: "التكنولوجيا والوقاية (مدينة بلا عنف)",
    s4Points: [
      "إدارة منظومة الكاميرات والمركز المرئي (LPR) لمراقبة الأحداث في الوقت الفعلي.",
      "تعزيز برامج منع العنف واستخدام المواد الخطرة بين صفوف الشبيبة.",
    ],
    s5Title: "إرشادات للمقيم في حالات الطوارئ",
    s5Intro: "تُشغّل الشعبة منظومة توعية دائمة للمقيمين تشمل:",
    s5ShelterBold: "الحماية:",
    s5ShelterText: "إرشادات لاختيار المكان المحمي وتجهيز المنزل للطوارئ.",
    s5LinkLabel: "موقع قيادة الجبهة الداخلية",
    s5ReportBold: "الإبلاغ:",
    s5ReportText: "التوجه إلى مركز اتصال المجلس في أي حالة وجود جسم مشبوه أو خطر على السلامة أو حدث استثنائي.",
    s5VolunteerBold: "التطوع:",
    s5VolunteerText: "دعوة للانضمام إلى وحدات المتطوعين البلدية (وحدة الإنقاذ والإغاثة).",
  },
  en: {
    heroSubtitle: "Emergency & Security Division – Kafr Yasif Local Council",
    heroBody:
      "The Emergency and Security Division is responsible for ensuring the safety, security and quality of life of Kafr Yasif's residents and visitors. The Division operates in routine and emergency times to strengthen community resilience, prevent crime, and maintain public order, in close cooperation with national security and rescue bodies. We are committed to a fast, professional and determined response to every extraordinary event in the public space.",
    bannerAlt: "Emergency & Security Division",
    s1Title: "Emergency Preparedness and Municipal Resilience",
    s1Points: [
      "Preparing the authority for various emergency scenarios (security, earthquakes, severe weather).",
      "Managing the municipal operations center and coordinating with the Home Front Command and government ministries.",
      "Training and activating emergency response teams and volunteers.",
    ],
    s2Title: "Security of Educational and Public Institutions",
    s2Points: [
      "Managing the security system in schools, kindergartens and Council facilities.",
      "Overseeing the condition of protective measures, shelters and protected spaces throughout the town.",
      "Conducting drills at educational institutions to raise preparedness among students and teaching staff.",
    ],
    s3Title: "Municipal Policing and Public Order",
    s3Points: [
      "Operating patrol units to prevent vandalism and maintain calm in the public space.",
      "Overseeing traffic and parking arrangements in cooperation with the Israel Police.",
      "Enhancing residents' sense of personal security through a visible presence at friction points.",
    ],
    s4Title: "Technology and Prevention (Violence-Free Town)",
    s4Points: [
      "Managing the camera network and monitoring center (LPR) for real-time event tracking.",
      "Promoting programs to prevent violence and the use of dangerous substances among youth.",
    ],
    s5Title: "Guidelines for Residents in an Emergency",
    s5Intro: "The Division runs an ongoing awareness program for residents, including:",
    s5ShelterBold: "Protection:",
    s5ShelterText: "Guidelines for choosing a protected space and preparing the home for emergencies.",
    s5LinkLabel: "Home Front Command website",
    s5ReportBold: "Reporting:",
    s5ReportText: "Contact the Council hotline in any case of a suspicious object, safety hazard or extraordinary event.",
    s5VolunteerBold: "Volunteering:",
    s5VolunteerText: "An invitation to join the town's volunteer units (the rescue and relief unit).",
  },
};

export function EmergencySecurityPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroBody}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={ShieldAlert} title={c.s1Title}>
          <BulletList items={c.s1Points} />
        </NumberedSection>

        <NumberedSection index={2} icon={ShieldAlert} title={c.s2Title}>
          <BulletList items={c.s2Points} />
        </NumberedSection>

        <NumberedSection index={3} icon={Radio} title={c.s3Title}>
          <BulletList items={c.s3Points} />
        </NumberedSection>

        <NumberedSection index={4} icon={Camera} title={c.s4Title}>
          <BulletList items={c.s4Points} />
        </NumberedSection>

        <NumberedSection index={5} icon={AlertTriangle} title={c.s5Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s5Intro}</p>
          <BulletList
            items={[
              <span key="shelter">
                <strong className="text-ink-900">{c.s5ShelterBold}</strong> {c.s5ShelterText}{" "}
                <a
                  href="https://www.oref.org.il/heb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-700 hover:underline"
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  {c.s5LinkLabel}
                </a>
              </span>,
              <span key="report">
                <strong className="text-ink-900">{c.s5ReportBold}</strong> {c.s5ReportText}
              </span>,
              <span key="volunteer">
                <strong className="text-ink-900">{c.s5VolunteerBold}</strong> {c.s5VolunteerText}
              </span>,
            ]}
          />
        </NumberedSection>
      </div>

      <LinkedBanner src="/uploads/emergency-security-hero.avif" alt={c.bannerAlt} href="https://www.oref.org.il/heb" />
    </PageArticle>
  );
}
