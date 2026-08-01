import { Building2, ClipboardList, Compass, HeartHandshake, FileText, Users } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

// Staff contact details are locale-independent (names, phone numbers, emails are never translated).
const STAFF = [
  { name: "סעיד אבראהים", phone: "04-9569832", email: "gizbars@kafr-yasif.muni.il" },
  { name: "נבילה ספייה", phone: "04-9569830", email: "Nabelas@kafr-yasif.muni.il" },
  { name: "ג'יהאן מוסא", phone: "04-9569931" },
  { name: "חביב אליאס", phone: "04-9569835", email: "Habeebe@kafr-yasif.muni.il" },
  { name: "איבית ג'ריס", phone: "04-9569837" },
];

type LocaleContent = {
  section1: { title: string; paragraphs: string[] };
  section2: { title: string; intro: string; items: string[] };
  section3: { title: string; paragraphs: string[] };
  section4: { title: string; paragraphs: string[] };
  section5: { title: string; intro: string; items: string[] };
  section6: { title: string; roles: string[] };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    section1: {
      title: "אודות המחלקה",
      paragraphs: [
        "אגף הגזברות והגבייה במועצה המקומית כפר יאסיף מהווה את הגוף המקצועי האמון על ניהול המערך הכספי של הרשות המקומית, תוך שמירה על עקרונות של אחריות תקציבית, שקיפות ציבורית וניהול פיננסי תקין.",
        "האגף פועל בהתאם להוראות הדין, להנחיות משרד הפנים ולכללי המינהל התקין, ומוביל את התכנון, הניהול והבקרה של כלל הפעילות התקציבית והחשבונאית של המועצה. במסגרת פעילותו, אחראי האגף להבטיח יציבות פיננסית ויכולת תפקודית המאפשרת למועצה לספק שירותים מוניציפליים איכותיים ולקדם פיתוח קהילתי, כלכלי ותשתיתי לרווחת תושבי כפר יאסיף.",
        "אגף הגזברות משמש גורם מרכזי בתהליכי קבלת החלטות כלכליות ברשות, ומקיים עבודה שוטפת עם הנהלת המועצה, מחלקות הרשות, משרדי הממשלה וגופים מבקרים.",
      ],
    },
    section2: {
      title: "תחומי אחריות מרכזיים",
      intro: "מחלקת הגזברות והגבייה אחראית, בין היתר, על התחומים הבאים:",
      items: [
        "ניהול תקציב המועצה ובקרה שוטפת על ביצועו",
        "הכנת דוחות כספיים, מעקב תקציבי ופיקוח על התנהלות פיננסית תקינה",
        "ניהול מערך ההכנסות של הרשות המקומית",
        "גביית ארנונה, אגרות, היטלים ותשלומי חובה בהתאם להוראות הדין",
        "טיפול בחיובים שוטפים ובבירורים כספיים של תושבים ועסקים",
        "בחינת בקשות לקבלת הנחות והטבות בהתאם לקריטריונים הקבועים בחוק ובנהלי משרד הפנים",
        "טיפול בהסדרי תשלום ובניהול חובות",
        "ביצוע תשלומים לספקים, נותני שירותים וגורמים חיצוניים",
        "ניהול ספרי חשבונות, התאמות ובקרות כספיות",
        "יישום הוראות רגולטוריות והבטחת עמידת המועצה בכללי מינהל תקין, שקיפות ואחריות תקציבית",
      ],
    },
    section3: {
      title: "חזון המחלקה",
      paragraphs: [
        "מחלקת הגזברות והגבייה רואה לנגד עיניה את חיזוק היציבות הכלכלית של המועצה המקומית כפר יאסיף, תוך שמירה על איזון בין אחריות תקציבית, שירותיות, יעילות מנהלית ורגישות לצורכי התושבים.",
        "המחלקה פועלת לקידום תרבות ארגונית המבוססת על מקצועיות, אמינות, דיוק, שקיפות ושיפור מתמיד, מתוך תפיסה כי ניהול כספי אחראי ואפקטיבי מהווה תנאי יסוד לפיתוח השירותים המוניציפליים ולחיזוק אמון הציבור ברשות המקומית.",
      ],
    },
    section4: {
      title: "שירות לתושב",
      paragraphs: [
        "מחלקת הגזברות והגבייה מחויבת להעניק לתושבי כפר יאסיף שירות מקצועי, אדיב, זמין ויעיל, תוך מתן מענה ברור ומסודר בכל הנוגע לחיובים, תשלומים, בירורי יתרות, הנחות, אישורים, הסדרי חוב ופניות בנושאים כספיים.",
        "המחלקה פועלת להנגשת המידע והשירותים לציבור, לקיצור זמני טיפול, לשיפור חוויית השירות ולמתן פתרונות מותאמים, בכפוף להוראות הדין ולנהלי הרשות.",
      ],
    },
    section5: {
      title: "נושאים מרכזיים בטיפול המחלקה",
      intro: "המחלקה מטפלת, בין היתר, בנושאים הבאים:",
      items: [
        "תשלומי ארנונה שוטפים",
        "בירור חיובים ויתרות",
        "הנפקת אישורים שונים בתחום הגבייה",
        "טיפול בבקשות להנחה בארנונה",
        "הסדרת חובות ותיאום הסדרי תשלום",
        "עדכון פרטי מחזיק/נכס",
        "טיפול בפניות תושבים ובעלי עסקים בנושאי חיוב וגבייה",
        "תשלומים לספקים והתחייבויות כספיות של המועצה",
        "בקרה ודיווח בתחומי התקציב והניהול הכספי",
      ],
    },
    section6: {
      title: "צור קשר – צוות האגף",
      roles: ["גזבר המועצה", "הנהלת חשבונות", "הנהלת חשבונות", "פקיד גבייה", "ניהול חשבונות – גבייה"],
    },
  },
  ar: {
    section1: {
      title: "عن القسم",
      paragraphs: [
        "يمثّل قسم الخزينة والتحصيل في المجلس المحلي كفر ياسيف الجهاز المهني المسؤول عن إدارة المنظومة المالية للسلطة المحلية، مع الحفاظ على مبادئ المسؤولية التقديرية والشفافية العامة والإدارة المالية السليمة.",
        "يعمل القسم وفقاً لأحكام القانون وتوجيهات وزارة الداخلية وقواعد الإدارة السليمة، ويقود عملية التخطيط والإدارة والرقابة على كافة النشاط التقديري والمحاسبي للمجلس. وفي إطار عمله، يتحمل القسم مسؤولية ضمان الاستقرار المالي والقدرة التشغيلية التي تمكّن المجلس من تقديم خدمات بلدية عالية الجودة، ودفع عجلة التطوير المجتمعي والاقتصادي والتحتي لصالح سكان كفر ياسيف.",
        "يُعد قسم الخزينة جهة مركزية في عمليات اتخاذ القرارات الاقتصادية في السلطة المحلية، ويحافظ على عمل مستمر مع إدارة المجلس، أقسام السلطة، الوزارات الحكومية وجهات الرقابة.",
      ],
    },
    section2: {
      title: "مجالات المسؤولية الرئيسية",
      intro: "يتولى قسم الخزينة والتحصيل، في جملة أمور، المسؤولية عن المجالات التالية:",
      items: [
        "إدارة ميزانية المجلس والرقابة المستمرة على تنفيذها",
        "إعداد التقارير المالية، متابعة الميزانية والإشراف على السير المالي السليم",
        "إدارة منظومة إيرادات السلطة المحلية",
        "تحصيل الأرنونا، الرسوم، الضرائب والمدفوعات الإلزامية وفقاً لأحكام القانون",
        "معالجة الفواتير الجارية والاستفسارات المالية للسكان وأصحاب الأعمال",
        "دراسة طلبات الحصول على التخفيضات والامتيازات وفقاً للمعايير المحددة في القانون وتعليمات وزارة الداخلية",
        "التعامل مع ترتيبات التسديد وإدارة الديون",
        "تنفيذ المدفوعات للموردين ومقدمي الخدمات والجهات الخارجية",
        "إدارة السجلات المحاسبية، التسويات والضوابط المالية",
        "تطبيق التعليمات الرقابية وضمان التزام المجلس بقواعد الإدارة السليمة والشفافية والمسؤولية التقديرية",
      ],
    },
    section3: {
      title: "رؤية القسم",
      paragraphs: [
        "يضع قسم الخزينة والتحصيل نصب عينيه تعزيز الاستقرار الاقتصادي للمجلس المحلي كفر ياسيف، مع الحفاظ على التوازن بين المسؤولية التقديرية، روح الخدمة، الكفاءة الإدارية والحساسية تجاه احتياجات السكان.",
        "يعمل القسم على تعزيز ثقافة تنظيمية قائمة على المهنية والموثوقية والدقة والشفافية والتحسين المستمر، انطلاقاً من قناعة بأن الإدارة المالية المسؤولة والفعّالة شرط أساسي لتطوير الخدمات البلدية وتعزيز ثقة الجمهور بالسلطة المحلية.",
      ],
    },
    section4: {
      title: "خدمة المواطن",
      paragraphs: [
        "قسم الخزينة والتحصيل ملتزم بتقديم خدمة مهنية ولبقة ومتاحة وفعّالة لسكان كفر ياسيف، مع تقديم استجابة واضحة ومنظمة في كل ما يتعلق بالفواتير، المدفوعات، استفسارات الأرصدة، التخفيضات، الإفادات، ترتيبات الديون والاستفسارات في المواضيع المالية.",
        "يعمل القسم على تيسير وصول المعلومات والخدمات للجمهور، وتقليص أوقات المعالجة، وتحسين تجربة الخدمة، وتقديم حلول ملائمة، وذلك وفقاً لأحكام القانون وأنظمة السلطة.",
      ],
    },
    section5: {
      title: "المواضيع الرئيسية التي يتعامل معها القسم",
      intro: "يتعامل القسم، في جملة أمور، مع المواضيع التالية:",
      items: [
        "مدفوعات الأرنونا الجارية",
        "الاستفسار عن الفواتير والأرصدة",
        "إصدار إفادات مختلفة في مجال التحصيل",
        "معالجة طلبات التخفيض في الأرنونا",
        "تسوية الديون وتنسيق ترتيبات التسديد",
        "تحديث بيانات الحائز/العقار",
        "معالجة استفسارات السكان وأصحاب الأعمال في مواضيع الفواتير والتحصيل",
        "المدفوعات للموردين والالتزامات المالية للمجلس",
        "الرقابة وإعداد التقارير في مجالات الميزانية والإدارة المالية",
      ],
    },
    section6: {
      title: "تواصلوا معنا – طاقم القسم",
      roles: ["أمين صندوق المجلس (الخزينة)", "محاسبة", "محاسبة", "موظف تحصيل", "إدارة حسابات – تحصيل"],
    },
  },
  en: {
    section1: {
      title: "About the Department",
      paragraphs: [
        "The Treasury & Collection Division at the Kafr Yasif Local Council is the professional body responsible for managing the local authority's financial system, while upholding the principles of budgetary responsibility, public transparency and sound financial management.",
        "The Division operates in accordance with the law, Ministry of Interior guidelines and proper administration rules, and leads the planning, management and control of all the council's budgetary and accounting activity. As part of its work, the Division is responsible for ensuring financial stability and the operational capacity that enables the council to provide quality municipal services and promote community, economic and infrastructure development for the benefit of Kafr Yasif's residents.",
        "The Treasury Division serves as a central factor in the authority's economic decision-making processes, and maintains ongoing work with the council's management, the authority's departments, government ministries and oversight bodies.",
      ],
    },
    section2: {
      title: "Key Areas of Responsibility",
      intro: "The Treasury & Collection Department is responsible, among other things, for the following areas:",
      items: [
        "Managing the council's budget and ongoing monitoring of its implementation",
        "Preparing financial reports, budget tracking and supervision of proper financial conduct",
        "Managing the local authority's revenue system",
        "Collecting property tax (arnona), fees, levies and mandatory payments in accordance with the law",
        "Handling routine billing and financial inquiries from residents and businesses",
        "Reviewing applications for discounts and benefits according to the criteria set by law and Ministry of Interior procedures",
        "Handling payment arrangements and debt management",
        "Making payments to suppliers, service providers and external parties",
        "Managing account books, reconciliations and financial controls",
        "Implementing regulatory requirements and ensuring the council's compliance with proper administration, transparency and budgetary responsibility rules",
      ],
    },
    section3: {
      title: "Department Vision",
      paragraphs: [
        "The Treasury & Collection Department envisions strengthening the economic stability of the Kafr Yasif Local Council, while maintaining a balance between budgetary responsibility, service orientation, administrative efficiency and sensitivity to residents' needs.",
        "The Department works to promote an organizational culture based on professionalism, reliability, accuracy, transparency and continuous improvement, based on the understanding that responsible and effective financial management is a fundamental condition for developing municipal services and strengthening public trust in the local authority.",
      ],
    },
    section4: {
      title: "Service to Residents",
      paragraphs: [
        "The Treasury & Collection Department is committed to providing residents of Kafr Yasif with professional, courteous, available and efficient service, with clear and organized responses regarding charges, payments, balance inquiries, discounts, certificates, debt arrangements and financial inquiries.",
        "The Department works to make information and services accessible to the public, shorten processing times, improve the service experience and provide tailored solutions, subject to the law and the authority's procedures.",
      ],
    },
    section5: {
      title: "Key Issues Handled by the Department",
      intro: "The Department handles, among other things, the following matters:",
      items: [
        "Ongoing property tax (arnona) payments",
        "Inquiries regarding charges and balances",
        "Issuing various certificates in the field of collection",
        "Handling requests for property tax discounts",
        "Debt settlement and coordination of payment arrangements",
        "Updating occupant/property details",
        "Handling inquiries from residents and business owners regarding billing and collection",
        "Payments to suppliers and the council's financial obligations",
        "Monitoring and reporting in the fields of budget and financial management",
      ],
    },
    section6: {
      title: "Contact Us – Division Staff",
      roles: ["Council Treasurer", "Bookkeeping", "Bookkeeping", "Collection Clerk", "Account Management – Collection"],
    },
  },
};

export function TreasuryPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} />

      <div className="space-y-4">
        <NumberedSection index={1} icon={Building2} title={c.section1.title}>
          {c.section1.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={2} icon={ClipboardList} title={c.section2.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section2.intro}</p>
          <BulletList items={c.section2.items} />
        </NumberedSection>

        <NumberedSection index={3} icon={Compass} title={c.section3.title}>
          {c.section3.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={4} icon={HeartHandshake} title={c.section4.title}>
          {c.section4.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={5} icon={FileText} title={c.section5.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section5.intro}</p>
          <BulletList items={c.section5.items} />
        </NumberedSection>

        <NumberedSection index={6} icon={Users} title={c.section6.title}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STAFF.map((s, i) => (
              <StaffCard key={s.name} name={s.name} role={c.section6.roles[i]} phone={s.phone} email={s.email} />
            ))}
          </div>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
