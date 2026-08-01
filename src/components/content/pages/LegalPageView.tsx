import { Scale, Gavel, MessageCircle, Phone } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };

type LocaleContent = {
  heroSubtitle: string;
  heroIntro: string;
  section1Title: string;
  section1Items: string[];
  section2Title: string;
  section2Items: string[];
  section3Title: string;
  section3Items: string[];
  section4Title: string;
  section4Items: string[];
  section5Title: string;
  section5Items: string[];
  section6Title: string;
  section6Intro1: string;
  section6Intro2: string;
  section6Points: BoldPoint[];
  section7Title: string;
  section7Text: string;
  section8Title: string;
  section8Intro: string;
  staffName: string;
  staffRole: string;
  mobileLabel: string;
  receptionLabel: string;
  receptionText: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "המחלקה המשפטית ותביעה עירונית – מועצה מקומית כפר יאסיף",
    heroIntro:
      "המחלקה המשפטית מהווה את הסמכות המקצועית להבטחת שלטון החוק וייצוג האינטרסים המשפטיים של המועצה המקומית ותושביה. אנו פועלים לביסוס מינהל תקין, שמירה על טוהר המידות והענקת ייעוץ משפטי שוטף למועצה המקומית, לראש המועצה, לחברי המועצה ולעובדיה, מתוך מחויבות לשקיפות ולשלטון החוק. היועץ המשפטי מכהן מכח הוראות חוק הרשויות המקומיות (ייעוץ משפטי) תשל\"ו 1976.",
    section1Title: "ייעוץ משפטי סטטוטורי ואסטרטגי",
    section1Items: [
      "ליווי משפטי צמוד לישיבות המועצה והנהלתה.",
      "כתיבת חוות דעת משפטיות בסוגיות עקרוניות ומורכבות ובכל סוגיה משפטית המתעוררת.",
      "ייעוץ לכלל אגפי המועצה ביישום הוראות הדין והחלטות המועצה.",
    ],
    section2Title: "ליטיגציה וייצוג בערכאות",
    section2Items: [
      "ניהול וייצוג המועצה בתביעות אזרחיות, מנהליות ובעתירות מנהליות.",
      "ייצוג הרשות בפני ועדות ערר, ועדות תכנון ובנייה וטריבונלים שיפוטיים.",
    ],
    section3Title: "חוזים, מכרזים ותשתיות",
    section3Items: [
      "ניסוח ובחינה של מכרזים למיניהם וכלל התקשרויות המועצה.",
      "ליווי משפטי של פרויקטים תשתיתיים ופיתוח עירוני.",
      "הסדרת התקשרויות חוזיות מול תושבים, גופים ממשלתיים, חברות וקבלנים.",
    ],
    section4Title: "חקיקה עירונית (חוקי עזר)",
    section4Items: [
      "גיבוש ועדכון חוקי עזר עירוניים המותאמים לצרכים המשתנים של היישוב.",
      "התאמת מדיניות האכיפה העירונית לשינויי החקיקה הארצית.",
    ],
    section5Title: "אתיקה ומינהל תקין",
    section5Items: ["הטמעת נוהלי עבודה למניעת ניגוד עניינים.", "פיקוח על עמידה בסטנדרטים של טוהר המידות והגינות שלטונית."],
    section6Title: "שירות לתושב",
    section6Intro1: "בהתאם לדין, הלשכה המשפטית מייצגת את המועצה כגוף משפטי ואינה מעניקה ייעוץ משפטי פרטי לתושבים.",
    section6Intro2: "עם זאת, הלשכה אמונה על:",
    section6Points: [
      {
        bold: "חופש המידע:",
        text: 'ליווי הגורם המוסמך במועצה בטיפול בבקשות לקבלת מידע ציבורי בהתאם לחוק חופש המידע ומתן כל סיוע הנדרש ע"י אותו עובד מטעם המועצה המטפל בבקשות אלה.',
      },
      { bold: "הסדרת מעמד:", text: "טיפול משפטי בנושאים רוחביים המשפיעים על רווחת כלל התושבים." },
    ],
    section7Title: "תביעה עירונית",
    section7Text:
      'היועץ המשפטי של המועצה משמש כתובע עירוני המגיש כתבי אישום ומופיע בבתי המשפט בעבירות על חוק רישוי עסקים, חוק שמירת הניקיון, החוק למניעת העישון במקומות ציבוריים והחשיפה לעישון, חוק לימוד חובה, חוק המים, חוקי העזר העירוניים וחוקים נוספים בעלי אופי מוניציפאלי אשר בתחום סמכותה והכל מכוח הסמכות שהוענקה לתובע העירוני על ידי היועץ המשפטי לממשלה. התובע העירוני מגיש כתבי אישום בהתבסס על דו"חות המגיעים ממחלקות העירייה השונות ובמקרים מסוימים גם ממשטרת ישראל. הסמכות לביטול דוחות חנייה נתונה אף היא לתובע העירוני, וזאת מכוח אותה הסמכה של היועץ המשפטי לממשלה ובכפיפות להנחיות היועץ המשפטי לממשלה.',
    section8Title: "צור קשר",
    section8Intro: "נשמח לעמוד לשירותכם בתיאום מראש:",
    staffName: 'עו"ד טועמה עודה',
    staffRole: "יועץ משפטי",
    mobileLabel: "נייד:",
    receptionLabel: "קבלת קהל:",
    receptionText: "בתיאום מראש בלבד.",
  },
  ar: {
    heroSubtitle: "القسم القانوني والادعاء البلدي – المجلس المحلي كفر ياسيف",
    heroIntro:
      "يشكّل القسم القانوني الجهة المهنية لضمان سيادة القانون وتمثيل المصالح القانونية للمجلس المحلي وسكانه. نعمل على ترسيخ الإدارة السليمة، والحفاظ على النزاهة، وتقديم استشارة قانونية مستمرة للمجلس المحلي ولرئيس المجلس ولأعضاء المجلس وموظفيه، انطلاقاً من التزامنا بالشفافية وسيادة القانون. يشغل المستشار القانوني منصبه بموجب أحكام قانون السلطات المحلية (الاستشارة القانونية) لسنة 1976.",
    section1Title: "الاستشارة القانونية الإلزامية والاستراتيجية",
    section1Items: [
      "مرافقة قانونية ملازمة لجلسات المجلس وإدارته.",
      "كتابة آراء قانونية في القضايا المبدئية والمعقدة وفي كل مسألة قانونية تطرأ.",
      "تقديم الاستشارة لجميع أقسام المجلس في تطبيق أحكام القانون وقرارات المجلس.",
    ],
    section2Title: "التقاضي والتمثيل أمام المحاكم",
    section2Items: [
      "إدارة وتمثيل المجلس في الدعاوى المدنية والإدارية والعرائض الإدارية.",
      "تمثيل السلطة أمام لجان الاعتراضات ولجان التخطيط والبناء والهيئات القضائية.",
    ],
    section3Title: "العقود والمناقصات والبنى التحتية",
    section3Items: [
      "صياغة وفحص المناقصات بأنواعها وجميع تعاقدات المجلس.",
      "مرافقة قانونية لمشاريع البنية التحتية والتطوير الحضري.",
      "تنظيم التعاقدات مع السكان والجهات الحكومية والشركات والمقاولين.",
    ],
    section4Title: "التشريع البلدي (القوانين المساعدة)",
    section4Items: [
      "بلورة وتحديث القوانين المساعدة البلدية بما يتلاءم مع احتياجات البلدة المتغيرة.",
      "مواءمة سياسة الإنفاذ البلدي مع التغييرات في التشريع الوطني.",
    ],
    section5Title: "الأخلاقيات والإدارة السليمة",
    section5Items: ["ترسيخ إجراءات عمل لمنع تضارب المصالح.", "الإشراف على الالتزام بمعايير النزاهة والعدالة في الحكم."],
    section6Title: "خدمة للمقيم",
    section6Intro1: "وفقاً للقانون، يمثّل المكتب القانوني المجلس كجهة قانونية ولا يقدم استشارة قانونية خاصة للسكان.",
    section6Intro2: "مع ذلك، يتولى المكتب مسؤولية:",
    section6Points: [
      {
        bold: "حرية المعلومات:",
        text: "مرافقة الجهة المخوّلة في المجلس في معالجة طلبات الحصول على معلومات عامة وفقاً لقانون حرية المعلومات، وتقديم كل المساعدة اللازمة من قبل الموظف المعني في المجلس الذي يتولى معالجة هذه الطلبات.",
      },
      { bold: "تسوية الأوضاع:", text: "معالجة قانونية للمواضيع الأفقية التي تؤثر على رفاهية جميع السكان." },
    ],
    section7Title: "الادعاء البلدي",
    section7Text:
      "يشغل المستشار القانوني للمجلس منصب المدعي البلدي الذي يقدم لوائح الاتهام ويمثل أمام المحاكم في المخالفات المتعلقة بقانون ترخيص الأعمال، وقانون الحفاظ على النظافة، والقانون لمنع التدخين في الأماكن العامة والتعرض للتدخين، وقانون التعليم الإلزامي، وقانون المياه، والقوانين المساعدة البلدية وقوانين أخرى ذات طابع بلدي ضمن نطاق صلاحيته، وذلك كله بموجب الصلاحية الممنوحة للمدعي البلدي من قبل المستشار القانوني للحكومة. يقدم المدعي البلدي لوائح الاتهام استناداً إلى تقارير ترد من مختلف أقسام البلدية وفي بعض الحالات أيضاً من شرطة إسرائيل. كما أن صلاحية إلغاء مخالفات وقوف السيارات ممنوحة للمدعي البلدي، وذلك بموجب نفس التفويض من المستشار القانوني للحكومة وبما يتوافق مع تعليماته.",
    section8Title: "تواصل معنا",
    section8Intro: "يسعدنا خدمتكم بموعد مسبق:",
    staffName: 'עו"ד טועמה עודה',
    staffRole: "مستشار قانوني",
    mobileLabel: "الجوال:",
    receptionLabel: "استقبال الجمهور:",
    receptionText: "بموعد مسبق فقط.",
  },
  en: {
    heroSubtitle: "Legal Department and Municipal Prosecution – Kafr Yasif Local Council",
    heroIntro:
      "The Legal Department is the professional authority responsible for ensuring the rule of law and representing the legal interests of the local council and its residents. We work to establish sound administration, uphold integrity, and provide ongoing legal counsel to the local council, the head of the council, council members and its employees, out of a commitment to transparency and the rule of law. The legal advisor serves under the provisions of the Local Authorities Law (Legal Advice), 5736-1976.",
    section1Title: "Statutory and Strategic Legal Counsel",
    section1Items: [
      "Close legal support for council and management meetings.",
      "Drafting legal opinions on fundamental and complex issues and on any legal question that arises.",
      "Advising all council divisions on the implementation of legal provisions and council decisions.",
    ],
    section2Title: "Litigation and Representation Before Tribunals",
    section2Items: [
      "Managing and representing the council in civil and administrative lawsuits and administrative petitions.",
      "Representing the authority before appeals committees, planning and building committees, and judicial tribunals.",
    ],
    section3Title: "Contracts, Tenders and Infrastructure",
    section3Items: [
      "Drafting and reviewing tenders of all kinds and all of the council's contractual engagements.",
      "Legal support for infrastructure projects and urban development.",
      "Regulating contractual engagements with residents, government bodies, companies and contractors.",
    ],
    section4Title: "Municipal Legislation (Bylaws)",
    section4Items: [
      "Formulating and updating municipal bylaws adapted to the town's changing needs.",
      "Aligning municipal enforcement policy with changes in national legislation.",
    ],
    section5Title: "Ethics and Sound Administration",
    section5Items: ["Implementing work procedures to prevent conflicts of interest.", "Overseeing compliance with standards of integrity and administrative fairness."],
    section6Title: "Service to Residents",
    section6Intro1: "By law, the legal office represents the council as a legal body and does not provide private legal advice to residents.",
    section6Intro2: "Nonetheless, the office is responsible for:",
    section6Points: [
      {
        bold: "Freedom of information:",
        text: "Supporting the council's authorized officer in handling requests for public information under the Freedom of Information Law, and providing any assistance required by the council employee handling these requests.",
      },
      { bold: "Status regulation:", text: "Legal handling of cross-cutting matters affecting the welfare of all residents." },
    ],
    section7Title: "Municipal Prosecution",
    section7Text:
      "The council's legal advisor serves as the municipal prosecutor, filing indictments and appearing in court in offenses relating to the Business Licensing Law, the Maintenance of Cleanliness Law, the Law for the Prevention of Smoking in Public Places and Exposure to Smoking, the Compulsory Education Law, the Water Law, municipal bylaws, and other laws of a municipal nature within its authority, all by virtue of the authority granted to the municipal prosecutor by the Attorney General. The municipal prosecutor files indictments based on reports received from the various municipal departments and, in certain cases, also from the Israel Police. The authority to cancel parking tickets is likewise vested in the municipal prosecutor, by virtue of the same authorization from the Attorney General and subject to the Attorney General's guidelines.",
    section8Title: "Contact Us",
    section8Intro: "We will be happy to assist you by appointment:",
    staffName: 'עו"ד טועמה עודה',
    staffRole: "Legal Advisor",
    mobileLabel: "Mobile:",
    receptionLabel: "Public reception:",
    receptionText: "By prior appointment only.",
  },
};

export function LegalPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroIntro}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Scale} title={c.section1Title}>
          <BulletList items={c.section1Items} />
        </NumberedSection>

        <NumberedSection index={2} icon={Gavel} title={c.section2Title}>
          <BulletList items={c.section2Items} />
        </NumberedSection>

        <NumberedSection index={3} icon={Scale} title={c.section3Title}>
          <BulletList items={c.section3Items} />
        </NumberedSection>

        <NumberedSection index={4} icon={Gavel} title={c.section4Title}>
          <BulletList items={c.section4Items} />
        </NumberedSection>

        <NumberedSection index={5} icon={Scale} title={c.section5Title}>
          <BulletList items={c.section5Items} />
        </NumberedSection>

        <NumberedSection index={6} icon={MessageCircle} title={c.section6Title}>
          <p className="text-sm leading-6 text-ink-600">{c.section6Intro1}</p>
          <p className="text-sm leading-6 text-ink-600">{c.section6Intro2}</p>
          <BulletList
            items={c.section6Points.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={7} icon={Gavel} title={c.section7Title}>
          <p className="text-sm leading-6 text-ink-600">{c.section7Text}</p>
        </NumberedSection>

        <NumberedSection index={8} icon={Phone} title={c.section8Title}>
          <p className="text-sm leading-6 text-ink-600">{c.section8Intro}</p>
          <StaffCard name={c.staffName} role={c.staffRole} phone="04-9560932" email="tommy@odsh-office.com" />
          <BulletList
            items={[
              <>
                <strong className="text-ink-900">{c.mobileLabel}</strong>{" "}
                <a href="tel:052-2475029" className="text-teal-700 hover:underline">
                  052-2475029
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.receptionLabel}</strong> {c.receptionText}
              </>,
            ]}
          />
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
