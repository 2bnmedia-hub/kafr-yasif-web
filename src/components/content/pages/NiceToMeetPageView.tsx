import { Home, UtensilsCrossed, Vote, Award } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, SectionCard, IconBadge, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };

type LocaleContent = {
  heroSubtitle: string;
  heroIntro: string;
  lead: string;
  card1Title: string;
  card1Text: string;
  card2Title: string;
  card2Intro: string;
  card2Points: (BoldPoint | string)[];
  card3Title: string;
  card3Text: string;
  card4Title: string;
  card4Points: BoldPoint[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "נעים מאוד",
    heroIntro:
      'נעים מאוד! כיף לפגוש מישהו שמתעניין בפנינה הגלילית הזו. אם אנחנו עוברים לטון קצת יותר אישי ופחות "רשמי", כפר יאסיף הוא הרבה מעבר למועצה מקומית – הוא מרכז תרבותי עם נשמה.',
    lead: 'הנה כמה דברים שהופכים את "המפגש" עם כפר יאסיף למיוחד באמת:',
    card1Title: 'האווירה הייחודית ("אל-קריה")',
    card1Text:
      "מי שמבקר בכפר מרגיש מיד את השילוב בין ישן לחדש. המועצה משמרת את המבנים העתיקים בגרעין הכפר, לצד פיתוח מודרני מואץ. זהו יישוב שמתגאה באחוזי השכלה מהגבוהים במגזר הערבי, מה שמשתקף במוסדות החינוך המצוינים שלו.",
    card2Title: "הקולינריה והאירוח",
    card2Intro: "אי אפשר לדבר על כפר יאסיף בלי להזכיר את האוכל. מועצה מעודדת יזמות עסקית שהפכה את הכפר למוקד משיכה בסופי שבוע:",
    card2Points: [
      { bold: "חומוס מפורסם:", text: "כמה מהחומוסיות הטובות בארץ נמצאות כאן." },
      { bold: "קונדיטוריות:", text: "ממתקים מזרחיים אותנטיים לצד בתי קפה מודרניים." },
      { bold: "שוק פעיל:", text: "חווית קנייה תוססת לאורך הציר המרכזי." },
      "בתי קפה וחיי לילה.",
      "מסעדות שף ומטבח לבנוני.",
    ],
    card3Title: "דמוקרטיה מקומית תוססת",
    card3Text:
      "בניגוד ליישובים רבים, הפוליטיקה המקומית בכפר יאסיף תמיד הייתה מלאת עניין. המועצה, בראשות עסאם שחאדה (מאז בחירות 2024), שמה דגש רב על שיתוף הציבור ועל שקיפות – מה שמתבטא בפורטל הדיגיטלי החדש ובמענה המהיר לתושבים.",
    card4Title: "סמלים וגאווה מקומית",
    card4Points: [
      { bold: "הסמל:", text: "בסמל המועצה תוכלו לראות ייצוג לענפי הזית (היסטוריה חקלאית) ולספרי הלימוד (החינוך כערך עליון)." },
      {
        bold: "דו-קיום אמיתי:",
        text: "זה לא רק סיסמה כאן. המועצה מנהלת חיי קהילה משותפים בין נוצרים ומוסלמים בצורה מעוררת השראה, עם חגיגות משותפות ואירועי תרבות לאורך כל השנה.",
      },
    ],
  },
  ar: {
    heroSubtitle: "سررنا بلقائكم",
    heroIntro:
      "سررنا بلقائكم! من الجميل أن نلتقي بمن يهتم بهذه اللؤلؤة الجليلية. إذا انتقلنا إلى نبرة أكثر شخصية وأقل \"رسمية\"، فإن كفر ياسيف هي أكثر بكثير من مجرد مجلس محلي – إنها مركز ثقافي له روح.",
    lead: '"إليكم بعض الأمور التي تجعل "التعرف" على كفر ياسيف تجربة مميزة حقاً:',
    card1Title: 'الأجواء المميزة ("القرية")',
    card1Text:
      "من يزور القرية يشعر فوراً بالمزج بين القديم والحديث. يحافظ المجلس على المباني القديمة في قلب القرية، إلى جانب تطوير حديث متسارع. هذه بلدة تفتخر بأعلى نسب التعليم في المجتمع العربي، وهو ما ينعكس في مؤسساتها التعليمية المتميزة.",
    card2Title: "المطبخ والضيافة",
    card2Intro: "لا يمكن الحديث عن كفر ياسيف دون ذكر الطعام. يشجع المجلس ريادة الأعمال التي حولت القرية إلى وجهة جذب في عطل نهاية الأسبوع:",
    card2Points: [
      { bold: "حمص مشهور:", text: "توجد هنا بعض أفضل محلات الحمص في البلاد." },
      { bold: "محلات حلويات:", text: "حلويات شرقية أصيلة إلى جانب مقاهٍ عصرية." },
      { bold: "سوق نشط:", text: "تجربة تسوق نابضة بالحياة على طول الشارع الرئيسي." },
      "مقاهٍ وحياة ليلية.",
      "مطاعم شيف ومطبخ لبناني.",
    ],
    card3Title: "ديمقراطية محلية نابضة بالحياة",
    card3Text:
      "على عكس بلدات كثيرة، كانت السياسة المحلية في كفر ياسيف دائماً مثيرة للاهتمام. يضع المجلس، برئاسة עסאם שחאדה (منذ انتخابات 2024)، تركيزاً كبيراً على إشراك الجمهور والشفافية – وهو ما ينعكس في البوابة الرقمية الجديدة والاستجابة السريعة للسكان.",
    card4Title: "الرموز والفخر المحلي",
    card4Points: [
      { bold: "الشعار:", text: "في شعار المجلس يمكنكم رؤية تمثيل لأغصان الزيتون (التاريخ الزراعي) وكتب التعليم (التعليم كقيمة عليا)." },
      {
        bold: "تعايش حقيقي:",
        text: "هذا ليس مجرد شعار هنا. يدير المجلس حياة مجتمعية مشتركة بين المسيحيين والمسلمين بطريقة ملهمة، مع احتفالات مشتركة وفعاليات ثقافية على مدار السنة.",
      },
    ],
  },
  en: {
    heroSubtitle: "Nice to Meet You",
    heroIntro:
      "Nice to meet you! It's great to meet someone interested in this Galilean gem. Shifting to a more personal, less \"official\" tone, Kafr Yasif is far more than a local council – it's a cultural hub with soul.",
    lead: "Here are a few things that make \"getting to know\" Kafr Yasif truly special:",
    card1Title: 'The Distinctive Atmosphere ("Al-Qarya")',
    card1Text:
      "Anyone visiting the village immediately feels the blend of old and new. The council preserves the ancient buildings at the village's core, alongside accelerated modern development. This is a town proud of some of the highest education rates in the Arab sector, reflected in its excellent educational institutions.",
    card2Title: "Cuisine and Hospitality",
    card2Intro: "You can't talk about Kafr Yasif without mentioning the food. The council encourages business initiative that has turned the village into a weekend attraction:",
    card2Points: [
      { bold: "Famous hummus:", text: "Some of the best hummus restaurants in the country are found here." },
      { bold: "Patisseries:", text: "Authentic Middle Eastern sweets alongside modern cafés." },
      { bold: "A bustling market:", text: "A vibrant shopping experience along the main strip." },
      "Cafés and nightlife.",
      "Chef restaurants and Lebanese cuisine.",
    ],
    card3Title: "Vibrant Local Democracy",
    card3Text:
      "Unlike many towns, local politics in Kafr Yasif has always been full of interest. The council, headed by עסאם שחאדה (since the 2024 elections), places great emphasis on public participation and transparency – reflected in the new digital portal and rapid response to residents.",
    card4Title: "Symbols and Local Pride",
    card4Points: [
      { bold: "The emblem:", text: "In the council's emblem you can see a representation of olive branches (agricultural history) and books (education as a supreme value)." },
      {
        bold: "Genuine coexistence:",
        text: "This isn't just a slogan here. The council fosters shared community life between Christians and Muslims in an inspiring way, with joint celebrations and cultural events throughout the year.",
      },
    ],
  },
};

function renderPoint(p: BoldPoint | string, i: number) {
  if (typeof p === "string") return p;
  return (
    <span key={i}>
      <strong className="text-ink-900">{p.bold}</strong> {p.text}
    </span>
  );
}

export function NiceToMeetPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroIntro}
      </Hero>

      <p className="mb-4 text-base leading-7 text-ink-600">{c.lead}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SectionCard>
          <IconBadge icon={Home} />
          <h2 className="mb-2 text-lg font-bold text-teal-900">{c.card1Title}</h2>
          <p className="text-sm leading-7 text-ink-600">{c.card1Text}</p>
        </SectionCard>

        <SectionCard>
          <IconBadge icon={UtensilsCrossed} color="#8ec640" />
          <h2 className="mb-2 text-lg font-bold text-teal-900">{c.card2Title}</h2>
          <p className="mb-3 text-sm leading-7 text-ink-600">{c.card2Intro}</p>
          <BulletList items={c.card2Points.map((p, i) => renderPoint(p, i))} />
        </SectionCard>

        <SectionCard>
          <IconBadge icon={Vote} color="#d99a3d" />
          <h2 className="mb-2 text-lg font-bold text-teal-900">{c.card3Title}</h2>
          <p className="text-sm leading-7 text-ink-600">{c.card3Text}</p>
        </SectionCard>

        <SectionCard>
          <IconBadge icon={Award} color="#417c79" />
          <h2 className="mb-2 text-lg font-bold text-teal-900">{c.card4Title}</h2>
          <BulletList items={c.card4Points.map((p, i) => renderPoint(p, i))} />
        </SectionCard>
      </div>
    </PageArticle>
  );
}
