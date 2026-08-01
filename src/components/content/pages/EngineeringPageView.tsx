import { HardHat, Construction, MapPin, Users } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard } from "../premium/Shared";
import type { Locale } from "@/i18n/config";
import type { StaffInfo } from "../premium/Shared";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };

type LocaleContent = {
  heroSubtitle: string;
  heroBody: string;
  s1Title: string;
  s1Intro: string;
  s1Points: BoldPoint[];
  s2Title: string;
  inProgress: string[];
  s3Title: string;
  statutory: string[];
  s4Title: string;
  staff: StaffInfo[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "מחלקת הנדסה, תשתיות ופיתוח - מועצה מקומית כפר יאסיף",
    heroBody:
      "מחלקת ההנדסה אחראית על מדיניות הבנייה והפיתוח בכפר יאסיף ומהווה סמכות מקצועית בכל הנושאים ההנדסיים הקשורים בתכנון ופיתוח המרחב הציבורי, אישורי תכניות בנייה, תנועה, בטיחות, מבני ציבור וחזות הכפר.",
    s1Title: "תחומי אחריות ופעילות המחלקה",
    s1Intro: "עיקרי הפעילות:",
    s1Points: [
      {
        bold: "פעילות שוטפת:",
        text: "טיפול בבדיקה ואישור תכניות, אחזקה, בטיחות המרחב הציבורי, תנועה וחנייה, וקשר עם גופים ציבוריים ממשלתיים העוסקים בתחום ההנדסה.",
      },
      {
        bold: "פיתוח ותשתיות:",
        text: "פיתוח והקמת תשתיות ציבוריות לשכונות מגורים, הקמת מבני ציבור ומוסדות חינוך, הקמת גנים ציבוריים, הנגשת המרחב הציבורי, וכן שדרוג תשתיות קיימות.",
      },
      {
        bold: "תכנון ארוך טווח:",
        text: 'תכנון אסטרטגי המותאם לצמיחה הדמוגרפית של כפר יאסיף, ותכנון סטטוטורי הכולל ייזום וקידום תכניות מתאר ותכניות בניין עיר (תב"ע) חדשות, כולל תחומי איחוד וחלוקה.',
      },
      { bold: "רישוי בנייה:", text: "חתימה על בקשות להיתר מול הוועדה לתכנון ולבנייה גליל מרכזי." },
      {
        bold: "פיקוח במרחב הציבורי:",
        text: "אכיפה ושמירה על התשתית הציבורית (כבישים, מדרכות, תאורת רחוב) במהלך עבודות של תושבים וקבלנים, תוך הקפדה על כללי העבודה למניעת מטרדים.",
      },
    ],
    s2Title: "פרויקטים בביצוע ולקראת ביצוע",
    inProgress: [
      "שדרוג מגרש כדורגל",
      "שדרוג תאורת רחובות (לד)",
      "שיקום בית קברות מוסלמי",
      "שיפוצים במרכז קהילתי ב'",
      "שיפוצים והנגשת במרכז קהילתי א'",
      "שימור מבנה קשתות",
      "עבודות שדרוג מע' הניקוז",
      "בניין המועצה ומבנה רב תכליתי",
      "שדרוג כבישים 51+21 בשכונת סניבעה",
      "הרחבת כביש 70",
      "טיפת חלב ו-2 גני ילדים (ליד ליאלי בעלבק)",
      "ראש שטח שכונה דרומית",
      "חיזוק בית ספר אלביאדר מרעידות אדמה",
      "פיתוח שכונה מערבית",
      "תוספת שתי יחידות גני ילדים (שכונה מערבית)",
      "שדרוג מתקן טניס פתוח",
      "שדרוג מגרשי קט-רגל סינטטי",
      "הנגשת תחנות אוטובוס",
    ],
    s3Title: "פרויקטים סטטוטוריים בתכנון",
    statutory: [
      'תצ"ר שכונה מערבית מתחם 6',
      "איחוד וחלוקה שכונה דרומית מתחם 6",
      "כביש 70 - מסמך מדיניות",
      "תכנון מתחם 7",
      "תכנון מתחם 10",
      "תכנון מתחם 11",
      "התחדשות עירונית בגלעין הכפר",
      "תכנון מתחם 8",
      "תכנון מתחם 1",
      "תכנון מתחם 5",
      "תכנון תא שטח 183",
    ],
    s4Title: "צוות מחלקת הנדסה",
    staff: [
      { name: "מג'ד סעיד", role: "מהנדס המועצה", phone: "04-9569809", email: "majd@kafr-yasif.muni.il" },
      { name: "רים שחאדה", role: "מהנדסת מתכננת", phone: "04-9569808", email: "reems@kafr-yasif.muni.il" },
      { name: "עבד סעד", role: "מהנדס פרויקטים", phone: "054-809417", email: "nayhndsa@outlook.co.il" },
      { name: "עדבה חאג'", role: "מזכירת מחלקת הנדסה", phone: "04-9569808", email: "adbae@kafr-yasif.muni.il" },
    ],
  },
  ar: {
    heroSubtitle: "قسم الهندسة والبنى التحتية والتطوير - المجلس المحلي كفر ياسيف",
    heroBody:
      "يتولى قسم الهندسة مسؤولية سياسة البناء والتطوير في كفر ياسيف ويُعد الجهة المهنية المختصة بجميع المواضيع الهندسية المتعلقة بتخطيط وتطوير الحيز العام، والموافقة على مخططات البناء، والحركة المرورية، والسلامة، ومباني الجمهور ومظهر البلدة.",
    s1Title: "مجالات مسؤولية ونشاط القسم",
    s1Intro: "أبرز الأنشطة:",
    s1Points: [
      {
        bold: "النشاط الروتيني:",
        text: "معالجة فحص والموافقة على المخططات، الصيانة، سلامة الحيز العام، الحركة المرورية ومواقف السيارات، والتواصل مع الجهات الحكومية العاملة في مجال الهندسة.",
      },
      {
        bold: "التطوير والبنى التحتية:",
        text: "تطوير وإقامة بنى تحتية عامة للأحياء السكنية، إقامة مباني عامة ومؤسسات تعليمية، إقامة حدائق عامة، إتاحة الوصول في الحيز العام، وكذلك تحديث البنى التحتية القائمة.",
      },
      {
        bold: "التخطيط طويل المدى:",
        text: "تخطيط استراتيجي يتناسب مع النمو السكاني لكفر ياسيف، وتخطيط قانوني يشمل بلورة وتعزيز مخططات هيكلية ومخططات بناء مدينة جديدة، بما في ذلك مناطق التوحيد والتقسيم.",
      },
      { bold: "تراخيص البناء:", text: "التوقيع على طلبات التراخيص أمام لجنة التخطيط والبناء لمنطقة الجليل المركزي." },
      {
        bold: "الرقابة في الحيز العام:",
        text: "إنفاذ والحفاظ على البنية التحتية العامة (الطرق، الأرصفة، إنارة الشوارع) أثناء أعمال السكان والمقاولين، مع الحرص على قواعد العمل لمنع المضايقات.",
      },
    ],
    s2Title: "مشاريع قيد التنفيذ وقيد الإعداد",
    inProgress: [
      "تحديث ملعب كرة القدم",
      "تحديث إنارة الشوارع (LED)",
      "ترميم المقبرة الإسلامية",
      "ترميمات في المركز المجتمعي ب",
      "ترميمات وإتاحة وصول في المركز المجتمعي أ",
      "الحفاظ على مبنى الأقواس",
      "أعمال تحديث منظومة الصرف",
      "مبنى المجلس والمبنى متعدد الأغراض",
      "تحديث الشارعين 51+21 في حي سنيبعة",
      "توسيع الشارع 70",
      "مركز صحة الأم والطفل وروضتي أطفال (بجانب ليالي بعلبك)",
      "رأس منطقة الحي الجنوبي",
      "تقوية مدرسة البيادر الابتدائية ضد الزلازل",
      "تطوير الحي الغربي",
      "إضافة وحدتي رياض أطفال (الحي الغربي)",
      "تحديث ملعب التنس المفتوح",
      "تحديث ملاعب كرة القدم المصغرة الصناعية",
      "إتاحة الوصول لمحطات الحافلات",
    ],
    s3Title: "مشاريع قانونية قيد التخطيط",
    statutory: [
      "مخطط مساحي للحي الغربي - المجمع 6",
      "توحيد وتقسيم الحي الجنوبي - المجمع 6",
      "الشارع 70 - وثيقة سياسة",
      "تخطيط المجمع 7",
      "تخطيط المجمع 10",
      "تخطيط المجمع 11",
      "التجديد الحضري في قلب القرية",
      "تخطيط المجمع 8",
      "تخطيط المجمع 1",
      "تخطيط المجمع 5",
      "تخطيط قطعة الأرض 183",
    ],
    s4Title: "طاقم قسم الهندسة",
    staff: [
      { name: "מג'ד סעיד", role: "مهندس المجلس", phone: "04-9569809", email: "majd@kafr-yasif.muni.il" },
      { name: "רים שחאדה", role: "مهندسة تخطيط", phone: "04-9569808", email: "reems@kafr-yasif.muni.il" },
      { name: "עבד סעד", role: "مهندس مشاريع", phone: "054-809417", email: "nayhndsa@outlook.co.il" },
      { name: "עדבה חאג'", role: "سكرتيرة قسم الهندسة", phone: "04-9569808", email: "adbae@kafr-yasif.muni.il" },
    ],
  },
  en: {
    heroSubtitle: "Engineering, Infrastructure & Development Department - Kafr Yasif Local Council",
    heroBody:
      "The Engineering Department is responsible for building and development policy in Kafr Yasif and serves as the professional authority on all engineering matters related to planning and developing the public space, approving building plans, traffic, safety, public buildings and the town's appearance.",
    s1Title: "Department Responsibilities and Activities",
    s1Intro: "Main activities:",
    s1Points: [
      {
        bold: "Routine activity:",
        text: "Reviewing and approving plans, maintenance, public space safety, traffic and parking, and liaison with government bodies working in the field of engineering.",
      },
      {
        bold: "Development and infrastructure:",
        text: "Developing and establishing public infrastructure for residential neighborhoods, constructing public buildings and educational institutions, establishing public gardens, making the public space accessible, and upgrading existing infrastructure.",
      },
      {
        bold: "Long-term planning:",
        text: "Strategic planning adapted to Kafr Yasif's demographic growth, and statutory planning that includes initiating and advancing new master plans and town building plans, including unification and division zones.",
      },
      { bold: "Building licensing:", text: "Signing permit requests before the Central Galilee Planning and Building Committee." },
      {
        bold: "Public space oversight:",
        text: "Enforcing and maintaining public infrastructure (roads, sidewalks, street lighting) during residents' and contractors' works, while ensuring work rules to prevent nuisances.",
      },
    ],
    s2Title: "Projects Underway and About to Begin",
    inProgress: [
      "Football field upgrade",
      "Street lighting upgrade (LED)",
      "Restoration of the Muslim cemetery",
      "Renovations at Community Center B",
      "Renovations and accessibility upgrades at Community Center A",
      "Preservation of the Arches building",
      "Drainage system upgrade works",
      "Council building and multi-purpose building",
      "Roads 51+21 upgrade in the Sanabra neighborhood",
      "Expansion of Route 70",
      "Mother and child clinic and 2 kindergartens (near Layali Baalbek)",
      "Southern neighborhood plot head",
      "Seismic reinforcement of Al-Bayader Elementary School",
      "Western neighborhood development",
      "Addition of two kindergarten units (western neighborhood)",
      "Open tennis facility upgrade",
      "Synthetic mini-football field upgrades",
      "Bus stop accessibility upgrades",
    ],
    s3Title: "Statutory Projects in Planning",
    statutory: [
      "Survey plan, western neighborhood, zone 6",
      "Unification and division, southern neighborhood, zone 6",
      "Route 70 - policy document",
      "Zone 7 planning",
      "Zone 10 planning",
      "Zone 11 planning",
      "Urban renewal in the village core",
      "Zone 8 planning",
      "Zone 1 planning",
      "Zone 5 planning",
      "Plot 183 planning",
    ],
    s4Title: "Engineering Department Staff",
    staff: [
      { name: "מג'ד סעיד", role: "Council Engineer", phone: "04-9569809", email: "majd@kafr-yasif.muni.il" },
      { name: "רים שחאדה", role: "Planning Engineer", phone: "04-9569808", email: "reems@kafr-yasif.muni.il" },
      { name: "עבד סעד", role: "Projects Engineer", phone: "054-809417", email: "nayhndsa@outlook.co.il" },
      { name: "עדבה חאג'", role: "Engineering Department Secretary", phone: "04-9569808", email: "adbae@kafr-yasif.muni.il" },
    ],
  },
};

export function EngineeringPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroBody}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={HardHat} title={c.s1Title}>
          <p className="text-sm leading-6 text-ink-600">{c.s1Intro}</p>
          <BulletList
            items={c.s1Points.map((p, i) => (
              <span key={i}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={2} icon={Construction} title={c.s2Title}>
          <BulletList items={c.inProgress} />
        </NumberedSection>

        <NumberedSection index={3} icon={MapPin} title={c.s3Title}>
          <BulletList items={c.statutory} />
        </NumberedSection>

        <NumberedSection index={4} icon={Users} title={c.s4Title}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.staff.map((s) => (
              <StaffCard key={s.name} {...s} />
            ))}
          </div>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
