import { GraduationCap, TrendingUp, Sparkles, HeartHandshake, Quote } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BulletPoint = { bold: string; text: string };

type LocaleContent = {
  heroBody: string;
  section1: { title: string; intro: string; items: BulletPoint[] };
  section2: { title: string; intro: string; items: BulletPoint[] };
  section3: { title: string; intro: string; items: BulletPoint[] };
  section4: { title: string; intro: string; items: BulletPoint[] };
  modelTitle: string;
  modelIntro: string;
  quote: string;
  quoteAttribution: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroBody:
      "החזון של המועצה המקומית כפר יאסיף, כפי שהוא בא לידי ביטוי בתוכניות העבודה לשנת 2026 תחת הנהגתו של עסאם נעים שחאדה, נשען על שלושה עמודי תווך מרכזיים: מצוינות בחינוך, חוסן קהילתי וחדשנות אורבנית. המועצה שואפת לשמר את מעמדו של הכפר כ\"בירת התרבות וההשכלה של הגליל\", תוך הפיכתו ליישוב חכם ומודרני.",
    section1: {
      title: "חינוך כערך עליון (Education First)",
      intro: "זהו הלב של חזון הכפר מזה עשורים. המועצה רואה בחינוך את המפתח למוביליות חברתית וכלכלית:",
      items: [
        {
          bold: "מצוינות אקדמית:",
          text: "שאיפה לאחוזי זכאות לבגרות מהגבוהים בארץ, עם דגש על מקצועות ה-STEM (מדעים, טכנולוגיה, הנדסה ומתמטיקה).",
        },
        { bold: "חינוך בלתי פורמלי:", text: "השקעה במרכזים קהילתיים, תנועות נוער וחוגי העשרה לאחר שעות הלימודים." },
        { bold: "תשתיות למידה:", text: 'הקמת "קמפוסים חכמים" המצוידים בטכנולוגיות הלמידה המתקדמות ביותר.' },
      ],
    },
    section2: {
      title: "פיתוח כלכלי ואוטונומיה פיננסית",
      intro: "כדי לא להישען רק על תקציבי ממשלה, המועצה חותרת לעצמאות כלכלית:",
      items: [
        {
          bold: "אזורי תעסוקה ומסחר:",
          text: "פיתוח מואץ של שטחי המסחר לאורך כביש 70 ועידוד עסקים מקומיים (ארנונה עסקית היא מנוע הצמיחה של המועצה).",
        },
        {
          bold: "תיירות ותרבות:",
          text: "מיתוג כפר יאסיף כיעד תיירותי קולינרי והיסטורי, תוך ניצול המבנים העתיקים בגלעין הכפר.",
        },
      ],
    },
    section3: {
      title: "איכות חיים וחדשנות (Smart Village)",
      intro: "שיפור המרחב הציבורי עבור התושב:",
      items: [
        { bold: "מהפכה דיגיטלית:", text: "הנגשת כל שירותי המועצה (תשלומים, פניות, אישורים) באופן מקוון 24/7." },
        {
          bold: "קיימות וסביבה:",
          text: "קידום פרויקטים של אנרגיה ירוקה (פאנלים סולאריים על מבני ציבור), מחזור פסולת וטיפוח ריאות ירוקות בתוך הכפר.",
        },
        { bold: "תשתיות ותחבורה:", text: "פתרון בעיות העומס בציר המרכזי ושיפור בטיחות בדרכים." },
      ],
    },
    section4: {
      title: "דו-קיום וערכים חברתיים",
      intro: "שימור המודל הייחודי של כפר יאסיף כיישוב שבו חיים יחד נוצרים ומוסלמים בכבוד הדדי:",
      items: [
        { bold: "סובלנות:", text: "קיום אירועים תרבותיים משותפים לכל העדות." },
        {
          bold: "ביטחון אישי:",
          text: 'חיזוק מערך השיטור העירוני והתקנת מערכות מצלמות ("עיר ללא אלימות") להגברת תחושת הביטחון של התושבים.',
        },
      ],
    },
    modelTitle: "המודל החזוני של כפר יאסיף",
    modelIntro: "החזון מתורגם למבנה שבו הקהילה נמצאת במרכז, וסביבה מעטפת של שירותים מקצועיים:",
    quote:
      "החזון שלנו הוא להפוך את כפר יאסיף למודל לחיקוי עבור כל המגזר הערבי בישראל – יישוב שמשלב בין השכלה גבוהה, כלכלה חזקה ואיכות חיים ללא פשרות.",
    quoteAttribution: "(מתוך הצהרות המועצה)",
  },
  ar: {
    heroBody:
      "تستند رؤية المجلس المحلي كفر ياسيف، كما تتجلى في خطط العمل لعام 2026 بقيادة عصام نعيم شحادة، إلى ثلاثة محاور رئيسية: التميّز في التعليم، الصمود المجتمعي، والابتكار الحضري. يسعى المجلس إلى الحفاظ على مكانة القرية كـ\"عاصمة الثقافة والتعليم في الجليل\"، مع تحويلها إلى بلدة ذكية وحديثة.",
    section1: {
      title: "التعليم كقيمة عليا (Education First)",
      intro: "هذا هو جوهر رؤية القرية منذ عقود. يرى المجلس في التعليم مفتاح الحراك الاجتماعي والاقتصادي:",
      items: [
        {
          bold: "التميّز الأكاديمي:",
          text: "الطموح لتحقيق نسب نجاح في امتحانات البجروت من بين الأعلى في البلاد، مع التركيز على مواد STEM (العلوم، التكنولوجيا، الهندسة والرياضيات).",
        },
        { bold: "التعليم غير الرسمي:", text: "الاستثمار في المراكز المجتمعية وحركات الشبيبة والأندية الإثرائية بعد ساعات الدوام المدرسي." },
        { bold: "بنى تحتية تعليمية:", text: "إنشاء \"حرم جامعي ذكي\" مزوّد بأحدث تقنيات التعلّم." },
      ],
    },
    section2: {
      title: "التطوير الاقتصادي والاستقلالية المالية",
      intro: "لكي لا يعتمد المجلس فقط على ميزانيات الحكومة، فإنه يسعى نحو الاستقلال الاقتصادي:",
      items: [
        {
          bold: "مناطق التوظيف والتجارة:",
          text: "تطوير متسارع للمناطق التجارية على طول طريق رقم 70 وتشجيع الأعمال المحلية (أرنونا الأعمال هي محرك النمو للمجلس).",
        },
        {
          bold: "السياحة والثقافة:",
          text: "تسويق كفر ياسيف كوجهة سياحية تراثية وتاريخية، عبر الاستفادة من المباني القديمة في قلب القرية.",
        },
      ],
    },
    section3: {
      title: "جودة الحياة والابتكار (قرية ذكية)",
      intro: "تحسين المرفق العام لصالح المواطن:",
      items: [
        { bold: "ثورة رقمية:", text: "إتاحة جميع خدمات المجلس (المدفوعات، الطلبات، الإفادات) عبر الإنترنت على مدار الساعة." },
        {
          bold: "الاستدامة والبيئة:",
          text: "تعزيز مشاريع الطاقة الخضراء (ألواح شمسية على المباني العامة)، إعادة تدوير النفايات وتنمية رئات خضراء داخل القرية.",
        },
        { bold: "البنى التحتية والمواصلات:", text: "حل مشاكل الازدحام على المحور المركزي وتحسين السلامة على الطرق." },
      ],
    },
    section4: {
      title: "التعايش والقيم الاجتماعية",
      intro: "الحفاظ على النموذج الفريد لكفر ياسيف كبلدة يعيش فيها المسيحيون والمسلمون معاً باحترام متبادل:",
      items: [
        { bold: "التسامح:", text: "إقامة فعاليات ثقافية مشتركة لجميع الطوائف." },
        {
          bold: "الأمن الشخصي:",
          text: "تعزيز منظومة الشرطة البلدية وتركيب أنظمة كاميرات (\"مدينة بلا عنف\") لتعزيز شعور الأمان لدى السكان.",
        },
      ],
    },
    modelTitle: "النموذج الرؤيوي لكفر ياسيف",
    modelIntro: "تُترجم الرؤية إلى بنية يكون فيها المجتمع في المركز، وتحيط به منظومة من الخدمات المهنية:",
    quote:
      "رؤيتنا هي تحويل كفر ياسيف إلى نموذج يُحتذى به لكل المجتمع العربي في إسرائيل – بلدة تجمع بين التعليم العالي، الاقتصاد القوي وجودة الحياة دون تنازلات.",
    quoteAttribution: "(من تصريحات المجلس)",
  },
  en: {
    heroBody:
      "The vision of the Kafr Yasif Local Council, as expressed in the 2026 work plans under the leadership of Essam Naeem Shehadeh, rests on three central pillars: excellence in education, community resilience and urban innovation. The council strives to preserve the village's standing as the \"capital of culture and education of the Galilee\", while turning it into a smart, modern town.",
    section1: {
      title: "Education First",
      intro: "This has been the heart of the village's vision for decades. The council sees education as the key to social and economic mobility:",
      items: [
        {
          bold: "Academic excellence:",
          text: "Aspiring to some of the highest matriculation (Bagrut) eligibility rates in the country, with an emphasis on STEM subjects (science, technology, engineering and mathematics).",
        },
        { bold: "Informal education:", text: "Investment in community centers, youth movements and enrichment clubs after school hours." },
        { bold: "Learning infrastructure:", text: "Establishing \"smart campuses\" equipped with the most advanced learning technologies." },
      ],
    },
    section2: {
      title: "Economic Development and Financial Autonomy",
      intro: "In order not to rely solely on government budgets, the council is working toward economic independence:",
      items: [
        {
          bold: "Employment and commercial zones:",
          text: "Accelerated development of commercial areas along Route 70 and encouragement of local businesses (business property tax is the council's growth engine).",
        },
        {
          bold: "Tourism and culture:",
          text: "Branding Kafr Yasif as a culinary and historical tourism destination, making use of the ancient buildings at the village's core.",
        },
      ],
    },
    section3: {
      title: "Quality of Life and Innovation (Smart Village)",
      intro: "Improving the public space for residents:",
      items: [
        { bold: "Digital revolution:", text: "Making all council services (payments, requests, certificates) accessible online 24/7." },
        {
          bold: "Sustainability and environment:",
          text: "Promoting green energy projects (solar panels on public buildings), waste recycling and cultivating green lungs within the village.",
        },
        { bold: "Infrastructure and transportation:", text: "Solving congestion problems on the main artery and improving road safety." },
      ],
    },
    section4: {
      title: "Coexistence and Social Values",
      intro: "Preserving Kafr Yasif's unique model as a town where Christians and Muslims live together with mutual respect:",
      items: [
        { bold: "Tolerance:", text: "Holding shared cultural events for all communities." },
        {
          bold: "Personal security:",
          text: "Strengthening the municipal policing system and installing camera systems (\"a city without violence\") to enhance residents' sense of security.",
        },
      ],
    },
    modelTitle: "Kafr Yasif's Visionary Model",
    modelIntro: "The vision translates into a structure where the community is at the center, surrounded by a framework of professional services:",
    quote:
      "Our vision is to make Kafr Yasif a model to emulate for the entire Arab sector in Israel – a town that combines higher education, a strong economy and an uncompromising quality of life.",
    quoteAttribution: "(from the council's statements)",
  },
};

export function VisionPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.heroBody}</Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={GraduationCap} title={c.section1.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section1.intro}</p>
          <BulletList
            items={c.section1.items.map((p, j) => (
              <span key={j}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={2} icon={TrendingUp} title={c.section2.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section2.intro}</p>
          <BulletList
            items={c.section2.items.map((p, j) => (
              <span key={j}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={3} icon={Sparkles} title={c.section3.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section3.intro}</p>
          <BulletList
            items={c.section3.items.map((p, j) => (
              <span key={j}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={4} icon={HeartHandshake} title={c.section4.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section4.intro}</p>
          <BulletList
            items={c.section4.items.map((p, j) => (
              <span key={j}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <div
          className="rounded-2xl px-6 py-8 sm:px-10 sm:py-10"
          style={{ background: "linear-gradient(135deg, #12323d 0%, #1e5266 100%)" }}
        >
          <h2 className="mb-2 text-lg font-bold text-white">{c.modelTitle}</h2>
          <p className="mb-4 text-sm leading-6 text-teal-100/90">{c.modelIntro}</p>
          <blockquote className="flex gap-3 rounded-xl bg-white/10 p-5">
            <Quote size={22} className="mt-1 shrink-0 text-teal-100" aria-hidden="true" />
            <div>
              <p className="italic leading-7 text-white">{c.quote}</p>
              <footer className="mt-2 text-sm text-teal-100/80">{c.quoteAttribution}</footer>
            </div>
          </blockquote>
        </div>
      </div>
    </PageArticle>
  );
}
