import { Rocket, Target, GraduationCap, Users2, Compass, Phone } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };

type LocaleContent = {
  heroSubtitle: string;
  heroBody: string;
  s1Title: string;
  s1Paragraphs: string[];
  s2Title: string;
  s2Points: string[];
  s3Title: string;
  s3Points: BoldPoint[];
  s4Title: string;
  s4Body: string;
  s5Title: string;
  s5Body: string;
  s6Title: string;
  s6Body: string;
  staffRole: string;
  mobileLabel: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: 'יחידת צעירים „בסמתי" – מועצה מקומית כפר יאסיף',
    heroBody: "משרד הנגב והגליל | רשות הצעירים",
    s1Title: "אודות היחידה",
    s1Paragraphs: [
      'יחידת הצעירים „בסמתי" פועלת במסגרת המועצה המקומית כפר יאסיף ומשמשת מרכז מוביל לפיתוח, העצמה וקידום צעירי היישוב. היחידה פועלת בשיתוף פעולה עם משרד הנגב והגליל ורשות הצעירים, כחלק ממערך ארצי לחיזוק מעורבותם החברתית והמקצועית של צעירים בקהילה.',
      "היחידה מהווה מוקד מרכזי עבור צעירי היישוב ומספקת מעטפת רחבה של שירותים, תכניות ויוזמות שמטרתן ללוות צעירים וצעירות בשלבי החיים המרכזיים – החל מהשתלבות באקדמיה, דרך פיתוח קריירה ותעסוקה, ועד לעידוד מנהיגות, יזמות ומעורבות קהילתית.",
      "פעילות היחידה מבוססת על תפיסה הרואה בצעירי היישוב מנוע צמיחה מרכזי לחיזוק החוסן החברתי, הכלכלי והקהילתי של כפר יאסיף.",
    ],
    s2Title: "מטרות ויעדי היחידה",
    s2Points: [
      "קידום הזדמנויות השכלה גבוהה והנגשת מידע אקדמי לצעירים.",
      "חיזוק יכולות התעסוקה ופיתוח קריירה בקרב צעירי היישוב.",
      "עידוד יזמות, חדשנות ומנהיגות צעירה בקהילה המקומית.",
      "הרחבת מעורבות צעירים בפעילות חברתית וקהילתית.",
      "מתן ליווי מקצועי והכוונה אישית לצעירים בשלבי החיים השונים.",
    ],
    s3Title: "תחומי פעילות מרכזיים",
    s3Points: [
      {
        bold: "השכלה גבוהה והכוונה ללימודים",
        text: "– מתן מידע מקצועי והכוונה בבחירת מסלולי לימוד, סיוע בתהליכי הרשמה למוסדות אקדמיים, הנגשת מידע על מלגות ותכניות תמיכה לסטודנטים.",
      },
      {
        bold: "תעסוקה ופיתוח קריירה",
        text: "– קיום סדנאות והכשרות בתחום התעסוקה, ליווי אישי בתהליכי חיפוש עבודה, הכנה לראיונות עבודה, חיזוק מיומנויות מקצועיות וחיבור להזדמנויות תעסוקה רלוונטיות.",
      },
      {
        bold: "יזמות ומנהיגות צעירה",
        text: "– עידוד ופיתוח יוזמות חברתיות וקהילתיות, קיום תכניות מנהיגות, העצמת צעירים והקניית כלים להובלת פרויקטים והשפעה בקהילה המקומית.",
      },
      {
        bold: "מלגות ותכניות סיוע",
        text: "– ליווי והנגשת מידע על מגוון מלגות לסטודנטים ותכניות ממשלתיות וקהילתיות המיועדות לצעירים.",
      },
      {
        bold: "פעילות חברתית וקהילתית",
        text: "– ייזום והפקת אירועים, סדנאות, מפגשי קהילה ופעילויות חברתיות המקדמות חיבור בין צעירי היישוב ומחזקות את תחושת השייכות לקהילה.",
      },
    ],
    s4Title: "קהל היעד",
    s4Body:
      'פעילות יחידת הצעירים „בסמתי" מיועדת לצעירים וצעירות תושבי כפר יאסיף בגילאי 18–35, המעוניינים להשתלב בלימודים, לפתח קריירה מקצועית, להוביל יוזמות קהילתיות ולהיות שותפים פעילים בפיתוח היישוב.',
    s5Title: "חזון היחידה",
    s5Body:
      'יחידת הצעירים „בסמתי" שואפת להוות בית מקצועי, חדשני ומשמעותי לצעירי כפר יאסיף – מרכז הפועל לקידום הזדמנויות, פיתוח מנהיגות מקומית וחיזוק מעורבותם של צעירי היישוב בעיצוב עתיד הקהילה.',
    s6Title: "יצירת קשר",
    s6Body:
      'צעירים המעוניינים לקבל מידע נוסף על פעילות היחידה, תכניות, סדנאות והזדמנויות המוצעות במסגרת המרכז, מוזמנים לפנות ליחידת הצעירים „בסמתי" במועצה המקומית כפר יאסיף ולקבל ליווי מקצועי והכוונה אישית.',
    staffRole: "מנהלת המחלקה",
    mobileLabel: "טלפון נייד:",
  },
  ar: {
    heroSubtitle: 'وحدة الشباب "بسمتي" – المجلس المحلي كفر ياسيف',
    heroBody: "وزارة النقب والجليل | هيئة الشباب",
    s1Title: "حول الوحدة",
    s1Paragraphs: [
      'تعمل وحدة الشباب "بسمتي" في إطار المجلس المحلي كفر ياسيف وتُعد مركزاً رائداً لتطوير وتمكين وتعزيز شباب البلدة. تعمل الوحدة بالتعاون مع وزارة النقب والجليل وهيئة الشباب، كجزء من منظومة وطنية لتعزيز المشاركة الاجتماعية والمهنية للشباب في المجتمع.',
      "تشكل الوحدة مركزاً رئيسياً لشباب البلدة وتقدم منظومة واسعة من الخدمات والبرامج والمبادرات التي تهدف إلى مرافقة الشابات والشباب في المراحل المحورية من حياتهم – بدءاً من الاندماج في الأكاديميا، مروراً بتطوير المسار المهني والتشغيل، وصولاً إلى تشجيع القيادة وريادة الأعمال والمشاركة المجتمعية.",
      "يستند نشاط الوحدة إلى رؤية تعتبر شباب البلدة محركاً رئيسياً لتعزيز الصمود الاجتماعي والاقتصادي والمجتمعي لكفر ياسيف.",
    ],
    s2Title: "أهداف وغايات الوحدة",
    s2Points: [
      "تعزيز فرص التعليم العالي وإتاحة المعلومات الأكاديمية للشباب.",
      "تعزيز قدرات التشغيل وتطوير المسار المهني بين شباب البلدة.",
      "تشجيع ريادة الأعمال والابتكار والقيادة الشابة في المجتمع المحلي.",
      "توسيع مشاركة الشباب في النشاط الاجتماعي والمجتمعي.",
      "تقديم مرافقة مهنية وتوجيه شخصي للشباب في مراحل الحياة المختلفة.",
    ],
    s3Title: "مجالات النشاط الرئيسية",
    s3Points: [
      {
        bold: "التعليم العالي والتوجيه للدراسة",
        text: "– تقديم معلومات مهنية وتوجيه في اختيار مسارات الدراسة، المساعدة في إجراءات التسجيل بالمؤسسات الأكاديمية، وإتاحة المعلومات حول المنح وبرامج الدعم للطلاب.",
      },
      {
        bold: "التشغيل وتطوير المسار المهني",
        text: "– عقد ورشات وتدريبات في مجال التشغيل، مرافقة شخصية في عمليات البحث عن عمل، التحضير لمقابلات العمل، تعزيز المهارات المهنية والربط بفرص عمل مناسبة.",
      },
      {
        bold: "ريادة الأعمال والقيادة الشابة",
        text: "– تشجيع وتطوير مبادرات اجتماعية ومجتمعية، عقد برامج قيادة، تمكين الشباب وإكسابهم أدوات لقيادة المشاريع والتأثير في المجتمع المحلي.",
      },
      {
        bold: "المنح وبرامج المساعدة",
        text: "– مرافقة وإتاحة معلومات حول مجموعة من المنح الدراسية للطلاب والبرامج الحكومية والمجتمعية الموجهة للشباب.",
      },
      {
        bold: "النشاط الاجتماعي والمجتمعي",
        text: "– استحداث وتنظيم فعاليات وورشات ولقاءات مجتمعية وأنشطة اجتماعية تعزز التواصل بين شباب البلدة وتقوّي شعور الانتماء للمجتمع.",
      },
    ],
    s4Title: "الفئة المستهدفة",
    s4Body:
      'نشاط وحدة الشباب "بسمتي" موجّه للشابات والشباب من سكان كفر ياسيف في سن 18–35، الراغبين في الاندماج في الدراسة، تطوير مسار مهني، قيادة مبادرات مجتمعية، وأن يكونوا شركاء فاعلين في تطوير البلدة.',
    s5Title: "رؤية الوحدة",
    s5Body:
      'تسعى وحدة الشباب "بسمتي" لأن تكون بيتاً مهنياً وابتكارياً وذا مغزى لشباب كفر ياسيف – مركز يعمل على تعزيز الفرص، وتطوير القيادة المحلية، وتعزيز مشاركة شباب البلدة في تشكيل مستقبل المجتمع.',
    s6Title: "التواصل",
    s6Body:
      'الشباب الراغبون في الحصول على مزيد من المعلومات حول نشاط الوحدة، البرامج، الورشات والفرص المتاحة في إطار المركز، مدعوون للتواصل مع وحدة الشباب "بسمتي" في المجلس المحلي كفر ياسيف للحصول على مرافقة مهنية وتوجيه شخصي.',
    staffRole: "مديرة القسم",
    mobileLabel: "الهاتف المحمول:",
  },
  en: {
    heroSubtitle: '"Basmati" Young Adults Unit – Kafr Yasif Local Council',
    heroBody: "Negev and Galilee Ministry | Young Adults Authority",
    s1Title: "About the Unit",
    s1Paragraphs: [
      'The "Basmati" Young Adults Unit operates within the Kafr Yasif Local Council and serves as a leading center for the development, empowerment and advancement of the town\'s young adults. The unit works in cooperation with the Negev and Galilee Ministry and the Young Adults Authority, as part of a national framework for strengthening the social and professional involvement of young people in the community.',
      "The unit serves as a central hub for the town's young adults, providing a broad range of services, programs and initiatives aimed at accompanying young men and women through key life stages — from entering academia, through career and employment development, to encouraging leadership, entrepreneurship and community involvement.",
      "The unit's activity is based on the view that the town's young adults are a key growth engine for strengthening Kafr Yasif's social, economic and community resilience.",
    ],
    s2Title: "Unit Goals and Objectives",
    s2Points: [
      "Promoting higher-education opportunities and making academic information accessible to young adults.",
      "Strengthening employment capabilities and career development among the town's young adults.",
      "Encouraging entrepreneurship, innovation and young leadership in the local community.",
      "Expanding young adults' involvement in social and community activity.",
      "Providing professional accompaniment and personal guidance to young adults at various life stages.",
    ],
    s3Title: "Main Activity Areas",
    s3Points: [
      {
        bold: "Higher education and academic guidance",
        text: "– providing professional information and guidance in choosing study tracks, assisting with registration processes at academic institutions, and making information on scholarships and student-support programs accessible.",
      },
      {
        bold: "Employment and career development",
        text: "– running employment-related workshops and training, personal accompaniment through job-search processes, interview preparation, strengthening professional skills, and connecting to relevant employment opportunities.",
      },
      {
        bold: "Entrepreneurship and young leadership",
        text: "– encouraging and developing social and community initiatives, running leadership programs, empowering young adults and equipping them with tools to lead projects and influence the local community.",
      },
      {
        bold: "Scholarships and assistance programs",
        text: "– accompaniment and access to information on a range of student scholarships and government and community programs aimed at young adults.",
      },
      {
        bold: "Social and community activity",
        text: "– initiating and producing events, workshops, community gatherings and social activities that foster connection among the town's young adults and strengthen their sense of belonging to the community.",
      },
    ],
    s4Title: "Target Audience",
    s4Body:
      'The "Basmati" Young Adults Unit\'s activity is intended for young men and women residents of Kafr Yasif aged 18–35 who wish to pursue studies, develop a professional career, lead community initiatives, and be active partners in the town\'s development.',
    s5Title: "Unit Vision",
    s5Body:
      'The "Basmati" Young Adults Unit aims to be a professional, innovative and meaningful home for the young adults of Kafr Yasif — a center working to promote opportunities, develop local leadership, and strengthen the involvement of the town\'s young adults in shaping the community\'s future.',
    s6Title: "Contact",
    s6Body:
      'Young adults wishing to receive more information about the unit\'s activity, programs, workshops and opportunities offered by the center are invited to contact the "Basmati" Young Adults Unit at the Kafr Yasif Local Council for professional accompaniment and personal guidance.',
    staffRole: "Department Director",
    mobileLabel: "Mobile phone:",
  },
};

export function YoungAdultsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroBody}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Rocket} title={c.s1Title}>
          {c.s1Paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={2} icon={Target} title={c.s2Title}>
          <BulletList items={c.s2Points} />
        </NumberedSection>

        <NumberedSection index={3} icon={GraduationCap} title={c.s3Title}>
          <BulletList
            items={c.s3Points.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={4} icon={Users2} title={c.s4Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s4Body}</p>
        </NumberedSection>

        <NumberedSection index={5} icon={Compass} title={c.s5Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s5Body}</p>
        </NumberedSection>

        <NumberedSection index={6} icon={Phone} title={c.s6Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s6Body}</p>
          <StaffCard name="הזאר בשארה" role={c.staffRole} phone="04-6290234" email="hazarbsh@gmail.com" />
          <p className="text-sm leading-6 text-ink-600">
            <strong className="text-ink-900">{c.mobileLabel}</strong>{" "}
            <a href="tel:054-3309688" className="text-teal-700 hover:underline">
              054-3309688
            </a>
          </p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
