import { Brain, ListChecks, Users, ClipboardCheck, MessageCircle } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  subtitle: string;
  intro: string;
  activities: { title: string; intro: string; items: string[] };
  vision: { title: string; text: string };
  targetAudience: { title: string; intro: string; items: string[] };
  principles: { title: string; items: string[] };
  contact: { title: string; text: string };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "השירות הפסיכולוגי החינוכי - מועצה מקומית כפר יאסיף",
    intro:
      "השירות הפסיכולוגי החינוכי במועצה המקומית כפר יאסיף פועל לקידום רווחתם הנפשית, הרגשית, החברתית והלימודית של ילדי ובני הנוער ביישוב, מתוך מחויבות עמוקה להתפתחותם התקינה ולחיזוק המערכת החינוכית והקהילתית. השירות מעניק מענה מקצועי, רגיש ומותאם לצורכי הילדים, ההורים, צוותי החינוך והמסגרות הקהילתיות, ופועל בשיתוף פעולה עם מוסדות החינוך, מחלקות המועצה וגורמי טיפול ורווחה בקהילה.",
    activities: {
      title: "תחומי הפעילות של השירות",
      intro: "השירות הפסיכולוגי החינוכי מעניק מגוון רחב של שירותים מקצועיים, ובהם:",
      items: [
        "אבחון והערכה פסיכולוגית לילדים ולבני נוער במסגרת החינוכית",
        "ליווי רגשי וטיפולי במצבים של קושי רגשי, חברתי, התנהגותי או לימודי",
        "ייעוץ והדרכה להורים בהתמודדות עם אתגרים התפתחותיים, רגשיים ומשפחתיים",
        "ליווי מקצועי לצוותים חינוכיים בבתי הספר ובגני הילדים",
        "התערבות במצבי משבר וחירום ברמת הפרט, הקבוצה והמערכת",
        "השתתפות בוועדות מקצועיות ובתהליכי הערכה ושילוב במסגרות החינוך",
        "קידום תכניות מניעה והתערבות לחיזוק החוסן הנפשי והאקלים החינוכי",
      ],
    },
    vision: {
      title: "חזון השירות",
      text: "השירות הפסיכולוגי החינוכי רואה חשיבות עליונה ביצירת סביבה חינוכית מיטיבה, בטוחה ומכילה, המאפשרת לכל ילד וילדה למצות את יכולותיהם האישיות, הרגשיות והלימודיות. אנו מאמינים בעבודה מערכתית, בשותפות עם המשפחה ועם הצוותים החינוכיים, ובמתן מענה מקצועי המבוסס על כבוד, אמון, רגישות תרבותית וזמינות לצורכי הקהילה.",
    },
    targetAudience: {
      title: "אוכלוסיית היעד",
      intro: "השירות מיועד ל:",
      items: [
        "ילדי הגנים ובתי הספר ביישוב",
        "בני נוער במסגרות החינוך השונות",
        "הורים ומשפחות",
        "צוותי חינוך, הנהלות מוסדות חינוך ואנשי מקצוע בקהילה",
      ],
    },
    principles: {
      title: "עקרונות העבודה",
      items: [
        "מקצועיות ואמינות",
        "שמירה על סודיות ואתיקה מקצועית",
        "רגישות תרבותית וקהילתית",
        "עבודה רב-מערכתית ורב-מקצועית",
        "זמינות, הקשבה ומתן מענה מותאם",
      ],
    },
    contact: {
      title: "יצירת קשר",
      text: "השירות הפסיכולוגי החינוכי עומד לרשות תושבי כפר יאסיף ופועל למתן מענה מקצועי ואיכותי לילדים, להורים ולמערכת החינוך. למידע נוסף, תיאום פנייה או יצירת קשר, ניתן לפנות למשרדי המועצה.",
    },
  },
  ar: {
    subtitle: "الخدمة النفسية التربوية - المجلس المحلي كفر ياسيف",
    intro:
      "تعمل الخدمة النفسية التربوية في المجلس المحلي كفر ياسيف على تعزيز الرفاه النفسي والعاطفي والاجتماعي والتعليمي لأطفال وشباب البلدة، انطلاقاً من التزام عميق بنموهم السليم وتعزيز المنظومة التربوية والمجتمعية. تقدم الخدمة استجابة مهنية وحساسة تتناسب مع احتياجات الأطفال والأهالي والطواقم التربوية والأطر المجتمعية، وتعمل بالتعاون مع المؤسسات التعليمية وأقسام المجلس وجهات العلاج والرعاية في المجتمع.",
    activities: {
      title: "مجالات نشاط الخدمة",
      intro: "تقدم الخدمة النفسية التربوية مجموعة واسعة من الخدمات المهنية، من بينها:",
      items: [
        "التشخيص والتقييم النفسي للأطفال والشباب ضمن الإطار التربوي",
        "المرافقة العاطفية والعلاجية في حالات الصعوبة العاطفية أو الاجتماعية أو السلوكية أو التعليمية",
        "تقديم الاستشارة والإرشاد للأهالي في التعامل مع التحديات النمائية والعاطفية والأسرية",
        "المرافقة المهنية للطواقم التربوية في المدارس ورياض الأطفال",
        "التدخل في حالات الأزمات والطوارئ على مستوى الفرد والمجموعة والمنظومة",
        "المشاركة في اللجان المهنية وعمليات التقييم والدمج ضمن الأطر التربوية",
        "تعزيز برامج الوقاية والتدخل لتقوية الصمود النفسي والمناخ التربوي",
      ],
    },
    vision: {
      title: "رؤية الخدمة",
      text: "ترى الخدمة النفسية التربوية أهمية قصوى في تهيئة بيئة تربوية داعمة وآمنة واحتوائية، تتيح لكل طفل وطفلة استثمار قدراتهم الشخصية والعاطفية والتعليمية. نحن نؤمن بالعمل المنظومي، بالشراكة مع الأسرة والطواقم التربوية، وبتقديم استجابة مهنية قائمة على الاحترام والثقة والحساسية الثقافية والتوافر لاحتياجات المجتمع.",
    },
    targetAudience: {
      title: "الفئة المستهدفة",
      intro: "الخدمة موجهة إلى:",
      items: [
        "أطفال رياض الأطفال والمدارس في البلدة",
        "الشباب في الأطر التعليمية المختلفة",
        "الأهالي والعائلات",
        "الطواقم التربوية وإدارات المؤسسات التعليمية والمختصين في المجتمع",
      ],
    },
    principles: {
      title: "مبادئ العمل",
      items: [
        "المهنية والمصداقية",
        "الحفاظ على السرية والأخلاقيات المهنية",
        "الحساسية الثقافية والمجتمعية",
        "العمل متعدد المنظومات ومتعدد التخصصات",
        "التوافر والإصغاء وتقديم استجابة ملائمة",
      ],
    },
    contact: {
      title: "التواصل معنا",
      text: "الخدمة النفسية التربوية في خدمة سكان كفر ياسيف وتعمل على تقديم استجابة مهنية وعالية الجودة للأطفال والأهالي والمنظومة التربوية. لمزيد من المعلومات أو لتنسيق موعد أو التواصل، يمكن التوجه إلى مكاتب المجلس.",
    },
  },
  en: {
    subtitle: "Educational Psychological Service - Kafr Yasif Local Council",
    intro:
      "The Educational Psychological Service at the Kafr Yasif Local Council works to promote the mental, emotional, social and academic wellbeing of the town's children and youth, out of a deep commitment to their healthy development and to strengthening the educational and community system. The service provides a professional, sensitive response tailored to the needs of children, parents, education staff and community frameworks, and works in cooperation with educational institutions, Council departments, and community care and welfare providers.",
    activities: {
      title: "Areas of Service Activity",
      intro: "The Educational Psychological Service provides a wide range of professional services, including:",
      items: [
        "Psychological diagnosis and assessment for children and youth within the educational framework",
        "Emotional and therapeutic support in cases of emotional, social, behavioral or academic difficulty",
        "Counseling and guidance for parents in coping with developmental, emotional and family challenges",
        "Professional guidance for education staff in schools and kindergartens",
        "Intervention in crisis and emergency situations at the individual, group and systemic level",
        "Participation in professional committees and in assessment and inclusion processes within educational frameworks",
        "Promoting prevention and intervention programs to strengthen mental resilience and the educational climate",
      ],
    },
    vision: {
      title: "Service Vision",
      text: "The Educational Psychological Service places paramount importance on creating a supportive, safe and inclusive educational environment that enables every child to realize their personal, emotional and academic potential. We believe in systemic work, in partnership with families and education staff, and in providing a professional response grounded in respect, trust, cultural sensitivity and availability to the community's needs.",
    },
    targetAudience: {
      title: "Target Population",
      intro: "The service is intended for:",
      items: [
        "Kindergarten and school children in the town",
        "Youth in the various educational frameworks",
        "Parents and families",
        "Education staff, management of educational institutions and community professionals",
      ],
    },
    principles: {
      title: "Working Principles",
      items: [
        "Professionalism and reliability",
        "Maintaining confidentiality and professional ethics",
        "Cultural and community sensitivity",
        "Multi-systemic and multi-disciplinary work",
        "Availability, attentiveness and tailored responses",
      ],
    },
    contact: {
      title: "Get in Touch",
      text: "The Educational Psychological Service is available to the residents of Kafr Yasif and works to provide a professional, high-quality response to children, parents and the education system. For further information, to schedule a consultation, or to get in touch, please contact the Council offices.",
    },
  },
};

export function PsychologicalServicePageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle}>
        {c.intro}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={ListChecks} title={c.activities.title}>
          <p className="text-sm leading-6 text-ink-600">{c.activities.intro}</p>
          <BulletList items={c.activities.items} />
        </NumberedSection>

        <NumberedSection index={2} icon={Brain} title={c.vision.title}>
          <p className="text-sm leading-6 text-ink-600">{c.vision.text}</p>
        </NumberedSection>

        <NumberedSection index={3} icon={Users} title={c.targetAudience.title}>
          <p className="text-sm leading-6 text-ink-600">{c.targetAudience.intro}</p>
          <BulletList items={c.targetAudience.items} />
        </NumberedSection>

        <NumberedSection index={4} icon={ClipboardCheck} title={c.principles.title}>
          <BulletList items={c.principles.items} />
        </NumberedSection>

        <NumberedSection index={5} icon={MessageCircle} title={c.contact.title}>
          <p className="text-sm leading-6 text-ink-600">{c.contact.text}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
