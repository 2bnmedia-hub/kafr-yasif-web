import { Sparkles, ListChecks, Rocket, Users, UserCog } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };

type LocaleContent = {
  heroBody: string;
  s1Title: string;
  s1Body: string;
  s2Title: string;
  s2Points: string[];
  s3Title: string;
  s3Points: (string | BoldPoint)[];
  s4Title: string;
  s4Intro: string;
  s4Points: string[];
  s5Title: string;
  s5Body: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroBody:
      'הוקמה בסוף חודש דצמבר 2017, עם מינוי מנהל/ת יחידת הנוער. היחידה פועלת מכוח חוק הרשויות המקומיות (מנהל יחידת נוער), התשע"א–2011. היחידה פועלת תחת פיקוחו של מינהל חברה ונוער במשרד החינוך, ומהווה גוף מקצועי האחראי על תכלול, פיתוח והובלת תחום החינוך הבלתי-פורמלי לילדים ובני נוער, תוך יצירת חיבור הדוק למערכת החינוך הפורמלית. יחידת הנוער מובילה את תחום החינוך הבלתי-פורמלי בתיאום ובשיתוף פעולה עם מערכת החינוך הפורמלית (בתי הספר), במטרה ליצור רצף חינוכי מיטבי ומשמעותי עבור הילדים ובני הנוער ברשות. אחת ממטרות העל של היחידה היא להעניק מענה רחב, איכותי ומשמעותי לכלל הילדים ובני הנוער בשעות הפנאי שלהם.',
    s1Title: "חזון",
    s1Body:
      "יחידת הנוער בכפר יאסיף שואפת להמשיך ולהוות בית חינוכי-ערכי משמעותי עבור בני הנוער, לעודד יוזמה, מצוינות ומעורבות קהילתית, ולהצמיח דור צעיר מוביל, ערכי ותורם לחברה. היחידה תפעל גם בעתיד להרחבת המענים, חיזוק השותפויות והעמקת הקשר בין בני הנוער לקהילה, מתוך אמונה כי השקעה בדור הצעיר היא המפתח לעתיד טוב ומבטיח יותר.",
    s2Title: "תחומי האחריות של היחידה",
    s2Points: [
      "הובלת מועצת נוער רשותית תקנית, המייצגת את כלל בני הנוער ברשות",
      'חיזוק ופיתוח מנהיגות צעירה (מד"צים)',
      "עידוד מנהיגות, מעורבות חברתית והתנדבות בקהילה",
      "היערכות למצבי חירום באמצעות בניית תכניות חינוך בלתי-פורמליות, בתיאום עם מנהל מחלקת/מכלול החינוך הרשותי",
    ],
    s3Title: "פרויקטים מרכזיים המנוהלים על ידי היחידה",
    s3Points: [
      {
        bold: 'תכנית "אתגרים לחברה הערבית"',
        text: "– במסגרתה מתקיימות תכניות חברתיות בבתי הספר מכיתה ג' ועד י\"ב, המתמקדות בחיזוק תחושת השייכות, פיתוח מנהיגות אישית וחברתית, ועידוד יוזמות קהילתיות.",
      },
      { bold: 'תכנית מד"צים', text: "– תכנית לפיתוח מנהיגות צעירה והכשרת בני נוער להובלה והדרכה." },
      {
        bold: 'פרויקט מוזיקה "מודל מוזיקלי"',
        text: 'מסגרת חינוכית חדשנית המשלבת לימודי מוזיקה במהלך יום הלימודים עם שיעורים פרטניים אחר הצהריים. הפרויקט פועל לפיתוח מצוינות מוזיקלית, חיזוק ביטוי אישי, יצירת מרחב פנאי איכותי והקמת תזמורת רשותית. תכנית "סל מדע" – קידום חשיבה מדעית ויצירתית במסגרת בתי הספר.',
      },
      "פעילויות בחופשות – תכניות חינוכיות וחווייתיות לאורך חופשות השנה.",
      {
        bold: "שבוע המעשים הטובים",
        text: "– פעילות רשותית רחבת היקף בשיתוף מחלקות המועצה, לחיזוק ערכי הנתינה, השייכות והאחריות החברתית.",
      },
    ],
    s4Title: "כוח האדם ביחידה",
    s4Intro: "ביחידה פועל צוות מקצועי הכולל:",
    s4Points: ['רכזת מנהיגות ועוגן רשותית לתכנית "אתגרים"', 'שתי רכזות עוגן לתכנית "אתגרים"', 'רכז מד"צים'],
    s5Title: "ניהול היחידה",
    s5Body:
      "היחידה מנוהלת על ידי גב' כמיליא סעדה (كميليا سعدة). הפועלת לקידום חזון חינוכי הרואה בכל ילד ובת נוער פוטנציאל לצמיחה, מנהיגות והשפעה.",
  },
  ar: {
    heroBody:
      "تأسست في نهاية شهر كانون الأول/ديسمبر 2017، مع تعيين مدير/ة وحدة الشبيبة. تعمل الوحدة بموجب قانون السلطات المحلية (مدير وحدة شبيبة)، لسنة 2011. تعمل الوحدة تحت إشراف إدارة المجتمع والشبيبة في وزارة التربية والتعليم، وهي جهة مهنية مسؤولة عن تنظيم وتطوير وقيادة مجال التعليم غير الرسمي للأطفال وبني الشبيبة، مع خلق ارتباط وثيق بمنظومة التعليم الرسمي. تقود وحدة الشبيبة مجال التعليم غير الرسمي بالتنسيق والتعاون مع منظومة التعليم الرسمي (المدارس)، بهدف خلق تواصل تربوي أمثل وذي مغزى للأطفال وبني الشبيبة في السلطة. من أهم أهداف الوحدة تقديم استجابة واسعة، عالية الجودة وذات مغزى لجميع الأطفال وبني الشبيبة في أوقات فراغهم.",
    s1Title: "الرؤية",
    s1Body:
      "تسعى وحدة الشبيبة في كفر ياسيف لمواصلة كونها بيتاً تربوياً-قيمياً ذا مغزى لبني الشبيبة، وتشجيع المبادرة والتميز والمشاركة المجتمعية، وإنماء جيل شاب قائد وذو قيم ومساهم في المجتمع. ستعمل الوحدة أيضاً في المستقبل على توسيع الاستجابات، تعزيز الشراكات وتعميق العلاقة بين بني الشبيبة والمجتمع، انطلاقاً من الإيمان بأن الاستثمار في الجيل الشاب هو مفتاح مستقبل أفضل وأكثر ازدهاراً.",
    s2Title: "مجالات مسؤولية الوحدة",
    s2Points: [
      "قيادة مجلس شبيبة سلطوي رسمي، يمثل جميع بني الشبيبة في السلطة",
      "تعزيز وتطوير القيادة الشابة (مدربي الشبيبة - مد\"צים)",
      "تشجيع القيادة والمشاركة الاجتماعية والتطوع في المجتمع",
      "الاستعداد لحالات الطوارئ من خلال بناء برامج تعليم غير رسمي، بالتنسيق مع مدير قسم/منظومة التعليم في السلطة",
    ],
    s3Title: "المشاريع الرئيسية التي تديرها الوحدة",
    s3Points: [
      {
        bold: 'برنامج "تحديات للمجتمع العربي"',
        text: "– يشمل برامج اجتماعية تُقام في المدارس من الصف الثالث وحتى الثاني عشر، تركز على تعزيز الشعور بالانتماء، تطوير القيادة الشخصية والاجتماعية، وتشجيع المبادرات المجتمعية.",
      },
      { bold: "برنامج مدربي الشبيبة", text: "– برنامج لتطوير القيادة الشابة وتدريب بني الشبيبة على القيادة والتوجيه." },
      {
        bold: 'مشروع الموسيقى "النموذج الموسيقي"',
        text: 'إطار تربوي مبتكر يجمع بين تعليم الموسيقى خلال يوم الدراسة والدروس الفردية بعد الظهر. يعمل المشروع على تطوير التميز الموسيقي، تعزيز التعبير الشخصي، خلق حيز فراغ نوعي وإنشاء أوركسترا سلطوية. برنامج "سلة العلوم" – تعزيز التفكير العلمي والإبداعي في إطار المدارس.',
      },
      "أنشطة في العطل – برامج تربوية وتجريبية على مدار عطل السنة.",
      {
        bold: "أسبوع الأعمال الطيبة",
        text: "– نشاط سلطوي واسع النطاق بالتعاون مع أقسام المجلس، لتعزيز قيم العطاء والانتماء والمسؤولية الاجتماعية.",
      },
    ],
    s4Title: "الطاقم البشري في الوحدة",
    s4Intro: "يعمل في الوحدة طاقم مهني يشمل:",
    s4Points: ['منسقة قيادة وعنك سلطوية لبرنامج "تحديات"', 'منسقتَي عنك لبرنامج "تحديات"', "منسق مدربي الشبيبة"],
    s5Title: "إدارة الوحدة",
    s5Body:
      "تدير الوحدة السيدة كميليا سعدة (כמיליא סעדה)، التي تعمل على تعزيز رؤية تربوية ترى في كل طفل وفتى/ة إمكانية للنمو والقيادة والتأثير.",
  },
  en: {
    heroBody:
      "Established at the end of December 2017, with the appointment of a Youth Unit director. The unit operates under the Local Authorities Law (Youth Unit Director), 2011. The unit operates under the supervision of the Society and Youth Administration at the Ministry of Education, and serves as a professional body responsible for coordinating, developing and leading the field of informal education for children and youth, while creating a close connection with the formal education system. The Youth Unit leads the field of informal education in coordination and cooperation with the formal education system (schools), with the aim of creating an optimal and meaningful educational continuum for the authority's children and youth. One of the unit's overarching goals is to provide a broad, high-quality and meaningful response to all children and youth during their leisure time.",
    s1Title: "Vision",
    s1Body:
      "The Kafr Yasif Youth Unit aims to continue serving as a meaningful educational and values-based home for young people, to encourage initiative, excellence and community involvement, and to raise a leading young generation that contributes to society with strong values. The unit will continue working in the future to expand its offerings, strengthen partnerships and deepen the connection between youth and the community, based on the belief that investing in the young generation is the key to a better and more promising future.",
    s2Title: "The Unit's Areas of Responsibility",
    s2Points: [
      "Leading a formal Authority Youth Council representing all of the authority's youth",
      "Strengthening and developing young leadership (youth counselors)",
      "Encouraging leadership, social involvement and volunteering in the community",
      "Preparing for emergencies by building informal education programs, in coordination with the head of the authority's education department",
    ],
    s3Title: "Major Projects Managed by the Unit",
    s3Points: [
      {
        bold: '"Challenges for Arab Society" Program',
        text: "– under which social programs are run in schools from 3rd to 12th grade, focusing on strengthening a sense of belonging, developing personal and social leadership, and encouraging community initiatives.",
      },
      { bold: "Youth Counselors Program", text: "– a program for developing young leadership and training youth for leading and guiding roles." },
      {
        bold: '"Musical Model" Music Project',
        text: 'An innovative educational framework combining music studies during the school day with individual afternoon lessons. The project works to develop musical excellence, strengthen personal expression, create a quality leisure space and establish an authority orchestra. The "Science Basket" program promotes scientific and creative thinking within schools.',
      },
      "Vacation activities – educational and experiential programs throughout the year's school vacations.",
      {
        bold: "Good Deeds Week",
        text: "– a large-scale authority-wide activity in cooperation with Council departments, to strengthen the values of giving, belonging and social responsibility.",
      },
    ],
    s4Title: "Unit Staff",
    s4Intro: "The unit's professional team includes:",
    s4Points: [
      'A leadership and authority anchor coordinator for the "Challenges" program',
      'Two anchor coordinators for the "Challenges" program',
      "A youth-counselors coordinator",
    ],
    s5Title: "Unit Management",
    s5Body:
      "The unit is managed by Ms. Camelia Saadeh (כמיליא סעדה), who works to promote an educational vision that sees in every child and young person the potential for growth, leadership and influence.",
  },
};

export function YouthUnitPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.heroBody}</Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Sparkles} title={c.s1Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s1Body}</p>
        </NumberedSection>

        <NumberedSection index={2} icon={ListChecks} title={c.s2Title}>
          <BulletList items={c.s2Points} />
        </NumberedSection>

        <NumberedSection index={3} icon={Rocket} title={c.s3Title}>
          <BulletList
            items={c.s3Points.map((p, i) =>
              typeof p === "string" ? (
                p
              ) : (
                <span key={i}>
                  <strong className="text-ink-900">{p.bold}</strong> {p.text}
                </span>
              )
            )}
          />
        </NumberedSection>

        <NumberedSection index={4} icon={Users} title={c.s4Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s4Intro}</p>
          <BulletList items={c.s4Points} />
        </NumberedSection>

        <NumberedSection index={5} icon={UserCog} title={c.s5Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s5Body}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
