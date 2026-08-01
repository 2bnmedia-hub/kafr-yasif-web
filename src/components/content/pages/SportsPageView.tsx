import { Trophy, Dumbbell, Music, Phone } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

// Staff name/phone/email are locale-independent (never translated or transliterated).
const STAFF = { name: "עלאא מובארכי", phone: "054-4700793", email: "alaamb69@gmail.com" };

type BulletPoint = { bold: string; text: string };

type LocaleContent = {
  subtitle: string;
  heroBody: string;
  section1: { title: string; intro: string; items: BulletPoint[] };
  section2: { title: string; intro: string; items: BulletPoint[] };
  section3: { title: string; intro: string; items: BulletPoint[]; quote: string; quoteAttribution: string };
  section4: { title: string; body: string; role: string };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "ספורט | מחלקת הספורט – המועצה המקומית כפר יאסיף",
    heroBody:
      "בניית קהילה חיונית באמצעות ספורט, ערכים ומצוינות. מחלקת הספורט בכפר יאסיף, בניהולו של עלאא מובארכי, מהווה עמוד תווך מרכזי לקידום אורח חיים בריא ופיתוח יכולותיהם של צעירי הכפר. אנו מאמינים כי ספורט אינו רק פעילות גופנית, אלא בית ספר לערכים, משמעת ועבודת צוות.",
    section1: {
      title: "ענף הכדורגל",
      intro: "המחלקה מפעילה מערך מקצועי מקיף הכולל 13 קבוצות הרשומות בליגות הרשמיות, תוך מתן סביבת אימון מתקדמת:",
      items: [
        { bold: "תשתית צעירה:", text: "קבוצות טרום-ילדים וילדים." },
        { bold: "דור השאיפות:", text: "קבוצות נערים ונוער." },
        {
          bold: "העצמת נשים בספורט:",
          text: "אנו גאים להוביל בתמיכה בספורט נשים באמצעות קבוצות ילדות א' ונערות א', במטרה לפתוח אופקים חדשים להצטיינות עבור בנותינו.",
        },
      ],
    },
    section2: {
      title: "ענפי כדור ותחרות (חדש!)",
      intro: "הרחבנו את הפעילות כדי לאפשר לכל ספורטאי וספורטאית למצוא את המקום שלהם:",
      items: [
        { bold: "כדורסל:", text: "פיתוח יכולות אישיות, עבודת צוות ואסטרטגיה על המגרש." },
        { bold: "כדורשת:", text: "ענף ספורט קהילתי ומגבש, המשלב הנאה וכושר גופני גבוה." },
        { bold: "אגרוף:", text: "אימוני כוח, סיבולת ומשמעת עצמית ברמה הגבוהה ביותר." },
      ],
    },
    section3: {
      title: "מרכזים חינוכיים וחוגים: גיוון המעשיר את הקהילה",
      intro: "לצד המצוינות במגרשים, המחלקה מציעה מגוון עשיר של חוגים המשלבים כושר גופני, אמנות ותרבות:",
      items: [
        { bold: "אמנויות לחימה ותנועה:", text: "חוגי קראטה וקפוארה לפיתוח ביטחון עצמי וריכוז." },
        { bold: "אצילות וביטוי תנועתי:", text: "בית ספר לבלט בפיקוח מקצועי." },
        { bold: "ספורט נשים:", text: "תוכניות כושר גופני ייעודיות לנשים לקידום הבריאות." },
        { bold: "טיפוח כישרונות:", text: "מחלקת מוזיקה ואמנויות הציור לפיתוח הצדדים היצירתיים של ילדינו." },
      ],
      quote:
        "החזון שלנו הוא להעניק לכל ילד ונער בכפר יאסיף את הכלים הדרושים להצלחה, הן על המגרש והן במסלול החיים.",
      quoteAttribution: "עלאא מובארכי, מנהל מחלקת הספורט",
    },
    section4: {
      title: "צרו קשר",
      body: "לפרטים נוספים, הרשמה לחוגים או תיאום:",
      role: "מנהל המחלקה",
    },
  },
  ar: {
    subtitle: "الرياضة | قسم الرياضة – المجلس المحلي كفر ياسيف",
    heroBody:
      "بناء مجتمع حيوي من خلال الرياضة والقيم والتميّز. يشكّل قسم الرياضة في كفر ياسيف، بإدارة עלאא מובארכי، عموداً مركزياً لتعزيز أسلوب حياة صحي وتطوير قدرات شباب القرية. نحن نؤمن بأن الرياضة ليست مجرد نشاط بدني، بل مدرسة للقيم والانضباط والعمل الجماعي.",
    section1: {
      title: "فرع كرة القدم",
      intro: "يشغّل القسم منظومة مهنية شاملة تضم 13 فريقاً مسجلاً في الدوريات الرسمية، مع توفير بيئة تدريب متطورة:",
      items: [
        { bold: "البنية الشابة:", text: "فرق ما قبل الأطفال والأطفال." },
        { bold: "جيل الطموحات:", text: "فرق الفتيان والناشئين." },
        {
          bold: "تمكين المرأة في الرياضة:",
          text: "نفخر بريادتنا في دعم رياضة النساء من خلال فرق الفتيات الصغرى والناشئات، بهدف فتح آفاق جديدة للتميّز لبناتنا.",
        },
      ],
    },
    section2: {
      title: "فروع الكرة والمنافسات (جديد!)",
      intro: "وسّعنا نشاطنا ليتمكن كل رياضي ورياضية من إيجاد مكانه:",
      items: [
        { bold: "كرة السلة:", text: "تطوير القدرات الفردية والعمل الجماعي والتخطيط الاستراتيجي على الملعب." },
        { bold: "الكرة الطائرة:", text: "فرع رياضي مجتمعي يجمع بين المتعة واللياقة البدنية العالية." },
        { bold: "الملاكمة:", text: "تدريبات في القوة والتحمل والانضباط الذاتي على أعلى مستوى." },
      ],
    },
    section3: {
      title: "مراكز تعليمية ونوادٍ: تنوّع يُثري المجتمع",
      intro: "إلى جانب التميّز في الملاعب، يقدّم القسم مجموعة غنية من النوادي التي تجمع بين اللياقة البدنية والفن والثقافة:",
      items: [
        { bold: "فنون القتال والحركة:", text: "نوادي كاراتيه وكابويرا لتطوير الثقة بالنفس والتركيز." },
        { bold: "الرشاقة والتعبير الحركي:", text: "مدرسة باليه تحت إشراف مهني." },
        { bold: "رياضة النساء:", text: "برامج لياقة بدنية مخصصة للنساء لتعزيز الصحة." },
        { bold: "رعاية المواهب:", text: "قسم الموسيقى وفنون الرسم لتطوير الجوانب الإبداعية لدى أطفالنا." },
      ],
      quote:
        "رؤيتنا هي منح كل طفل وناشئ في كفر ياسيف الأدوات اللازمة للنجاح، سواء على أرض الملعب أو في مسار الحياة.",
      quoteAttribution: "עלאא מובארכי، مدير قسم الرياضة",
    },
    section4: {
      title: "تواصلوا معنا",
      body: "لمزيد من التفاصيل، التسجيل في النوادي أو التنسيق:",
      role: "مدير القسم",
    },
  },
  en: {
    subtitle: "Sports | Sports Department – Kafr Yasif Local Council",
    heroBody:
      "Building a vibrant community through sports, values and excellence. The Sports Department in Kafr Yasif, led by עלאא מובארכי, is a central pillar in promoting a healthy lifestyle and developing the abilities of the village's youth. We believe that sport is not merely physical activity, but a school of values, discipline and teamwork.",
    section1: {
      title: "Football",
      intro: "The department operates a comprehensive professional program of 13 teams registered in official leagues, while providing an advanced training environment:",
      items: [
        { bold: "Young infrastructure:", text: "Pre-children's and children's teams." },
        { bold: "Generation of aspirations:", text: "Boys' and youth teams." },
        {
          bold: "Empowering women in sport:",
          text: "We are proud to lead the way in supporting women's sport through girls' and young women's teams, aiming to open new horizons of excellence for our girls.",
        },
      ],
    },
    section2: {
      title: "Ball Sports & Competition (New!)",
      intro: "We have expanded our activities so every athlete can find their place:",
      items: [
        { bold: "Basketball:", text: "Developing individual skills, teamwork and strategy on the court." },
        { bold: "Volleyball:", text: "A community and team-building sport that combines enjoyment with high physical fitness." },
        { bold: "Boxing:", text: "Strength, endurance and self-discipline training at the highest level." },
      ],
    },
    section3: {
      title: "Educational Centers and Clubs: Diversity that Enriches the Community",
      intro: "Alongside excellence on the field, the department offers a rich variety of clubs combining physical fitness, art and culture:",
      items: [
        { bold: "Martial arts and movement:", text: "Karate and capoeira classes to build self-confidence and focus." },
        { bold: "Grace and movement expression:", text: "A ballet school under professional supervision." },
        { bold: "Women's sport:", text: "Dedicated fitness programs for women to promote health." },
        { bold: "Nurturing talent:", text: "A music and painting arts department to develop our children's creative sides." },
      ],
      quote:
        "Our vision is to give every child and youth in Kafr Yasif the tools needed to succeed, both on the field and in life.",
      quoteAttribution: "עלאא מובארכי, Head of the Sports Department",
    },
    section4: {
      title: "Contact Us",
      body: "For further details, club registration or coordination:",
      role: "Department Head",
    },
  },
};

export function SportsPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle}>
        {c.heroBody}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Trophy} title={c.section1.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section1.intro}</p>
          <BulletList
            items={c.section1.items.map((p, j) => (
              <span key={j}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={2} icon={Dumbbell} title={c.section2.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section2.intro}</p>
          <BulletList
            items={c.section2.items.map((p, j) => (
              <span key={j}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
        </NumberedSection>

        <NumberedSection index={3} icon={Music} title={c.section3.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section3.intro}</p>
          <BulletList
            items={c.section3.items.map((p, j) => (
              <span key={j}>
                <strong className="text-ink-900">{p.bold}</strong> {p.text}
              </span>
            ))}
          />
          <blockquote className="rounded-xl bg-cream-50 p-4 text-sm italic leading-6 text-ink-600">
            &quot;{c.section3.quote}&quot; — {c.section3.quoteAttribution}.
          </blockquote>
        </NumberedSection>

        <NumberedSection index={4} icon={Phone} title={c.section4.title}>
          <p className="text-sm leading-6 text-ink-600">{c.section4.body}</p>
          <StaffCard name={STAFF.name} role={c.section4.role} phone={STAFF.phone} email={STAFF.email} />
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
