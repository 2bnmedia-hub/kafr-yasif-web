import Image from "next/image";
import { Landmark, ScrollText, Castle, GraduationCap, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, SectionCard, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type EraPoint = { bold: string; text: string };
type EraContent = { icon: LucideIcon; title: string; intro?: string; points?: EraPoint[]; paragraph?: string };

type LocaleContent = {
  heroIntro: string;
  timelineIntro: string;
  eras: EraContent[];
  images: { src: string; alt: string; caption: string }[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroIntro:
      "ההיסטוריה של כפר יאסיף היא פסיפס מרתק של עתיקות, תרבות ודו-קיום, שהפכו אותו לאחד היישובים החשובים והמשפיעים ביותר בגליל לאורך הדורות.",
    timelineIntro: "להלן ציר זמן ונקודות מפתח בהתפתחות הכפר:",
    eras: [
      {
        icon: Landmark,
        title: "העת העתיקה והתקופה הרומית-ביזנטית",
        intro: "שורשי היישוב עמוקים מאוד באדמת הגליל:",
        points: [
          {
            bold: "ארכאולוגיה:",
            text: "בכפר נמצאו שרידים מתקופת הברזל, אך שיא פריחתו הקדומה היה בתקופה הרומית והביזנטית. התגלו בו גתות, רצפות פסיפס ומערות קבורה המעידים על חקלאות משגשגת (בעיקר שמן זית ויין).",
          },
          {
            bold: "הקשר המקראי:",
            text: 'יש המזהים את הכפר עם העיר המקראית "חוסה" או יישובים אחרים המוזכרים בנחלת שבט אשר.',
          },
        ],
      },
      {
        icon: ScrollText,
        title: "הקשר היהודי ובית הקברות העתיק",
        intro: "כפר יאסיף ידוע בהיסטוריה שלו כיישוב שבו התקיימה קהילה יהודית לאורך מאות שנים:",
        points: [
          {
            bold: "מאה 16-19:",
            text: "בתקופה העות'מאנית חיה בכפר קהילה יהודית שעסקה בחקלאות. בית הקברות היהודי העתיק בכפר שימש גם את יהודי עכו, שלא הורשו לקבור את מתיהם בתוך חומות עכו (מסיבות הלכתיות או ביטחוניות).",
          },
          {
            bold: "עזיבת הקהילה:",
            text: "הקהילה היהודית האחרונה עזבה את הכפר בשנת 1841 בעקבות שינויים פוליטיים וביטחוניים באזור.",
          },
        ],
      },
      {
        icon: Castle,
        title: "דאהר אל-עומר והתקופה העות'מאנית",
        paragraph:
          "במאה ה-18, תחת שלטונו של דאהר אל-עומר (ששלט בגליל), זכה הכפר לחשיבות אסטרטגית. הוא שימש כצומת דרכים מרכזי בין עכו לצפת, והאדמות הפוריות סביבו הפכו אותו למרכז אספקה חקלאי חשוב.",
      },
      {
        icon: GraduationCap,
        title: 'תקופת המנדט הבריטי – "בירת החינוך"',
        intro: "זהו תור הזהב המודרני של הכפר:",
        points: [
          {
            bold: "הכרזה כמועצה (1925):",
            text: "כפר יאסיף היה מהיישובים הערביים הראשונים בארץ ישראל שקיבלו מעמד של מועצה מקומית תחת המנדט הבריטי.",
          },
          {
            bold: "מרכז השכלה:",
            text: 'בכפר הוקם "תיכון יאני", שהפך למוסד חינוכי מרכזי עבור כל האוכלוסייה הערבית בצפון. משכילים, משוררים ופוליטיקאים רבים צמחו במוסדות החינוך של הכפר, מה שהעניק לו את הכינוי "בירת התרבות של הגליל".',
          },
        ],
      },
      {
        icon: HeartHandshake,
        title: "מהקמת המדינה ועד היום",
        intro: "מאז 1948, כפר יאסיף שמר על צביונו כיישוב מעורב (נוצרי-מוסלמי) המצטיין ברמת השכלה גבוהה מאוד.",
        points: [
          { bold: "דו-קיום:", text: "הכפר הפך לסמל של חיים משותפים ושלווים בין העדות השונות." },
          {
            bold: "התפתחות עירונית:",
            text: "מה שהיה פעם כפר חקלאי קטן הפך למרכז מסחרי וקולינרי תוסס המשרת את כל תושבי הגליל המערבי.",
          },
        ],
      },
    ],
    images: [
      { src: "/uploads/kafr-yasif-1957.jpg", alt: "כפר יאסיף בשנת 1957", caption: "כפר יאסיף בשנת 1957" },
      { src: "/uploads/kafr-yasif-1963.jpg", alt: "כפר יאסיף בשנת 1963", caption: "כפר יאסיף בשנת 1963" },
    ],
  },
  ar: {
    heroIntro:
      "تاريخ كفر ياسيف هو فسيفساء آسرة من الآثار والثقافة والتعايش، جعلته على مر الأجيال واحدة من أهم البلدات وأكثرها تأثيراً في الجليل.",
    timelineIntro: "فيما يلي خط زمني ومحطات رئيسية في تطور القرية:",
    eras: [
      {
        icon: Landmark,
        title: "العصور القديمة والفترة الرومانية-البيزنطية",
        intro: "جذور البلدة عميقة جداً في أرض الجليل:",
        points: [
          {
            bold: "الآثار:",
            text: "عُثر في القرية على بقايا من العصر الحديدي، إلا أن ذروة ازدهارها القديم كانت في الفترة الرومانية والبيزنطية. اكتُشفت فيها معاصر، أرضيات فسيفساء ومغاور دفن تشهد على زراعة مزدهرة (بشكل أساسي زيت الزيتون والنبيذ).",
          },
          {
            bold: "الصلة التوراتية:",
            text: 'يربط البعض بين القرية وبين مدينة "حوسة" التوراتية أو بلدات أخرى مذكورة في نصيب سبط أشير.',
          },
        ],
      },
      {
        icon: ScrollText,
        title: "الصلة اليهودية والمقبرة اليهودية القديمة",
        intro: "تُعرف كفر ياسيف تاريخياً كبلدة عاشت فيها جالية يهودية على مدى مئات السنين:",
        points: [
          {
            bold: "القرن 16-19:",
            text: "في الفترة العثمانية عاشت في القرية جالية يهودية عملت في الزراعة. خدمت المقبرة اليهودية القديمة في القرية أيضاً يهود عكا، الذين لم يُسمح لهم بدفن موتاهم داخل أسوار عكا (لأسباب دينية أو أمنية).",
          },
          {
            bold: "مغادرة الجالية:",
            text: "غادرت الجالية اليهودية الأخيرة القرية عام 1841 عقب تغيرات سياسية وأمنية في المنطقة.",
          },
        ],
      },
      {
        icon: Castle,
        title: "ظاهر العمر والفترة العثمانية",
        paragraph:
          "في القرن الثامن عشر، تحت حكم ظاهر العمر (الذي حكم الجليل)، اكتسبت القرية أهمية استراتيجية. عملت كمفترق طرق مركزي بين عكا وصفد، وحوّلتها أراضيها الخصبة المحيطة إلى مركز إمداد زراعي هام.",
      },
      {
        icon: GraduationCap,
        title: 'فترة الانتداب البريطاني – "عاصمة التعليم"',
        intro: "هذا هو العصر الذهبي الحديث للقرية:",
        points: [
          {
            bold: "الإعلان كمجلس (1925):",
            text: "كانت كفر ياسيف من أوائل البلدات العربية في أرض إسرائيل التي حصلت على مكانة مجلس محلي في ظل الانتداب البريطاني.",
          },
          {
            bold: "مركز تعليمي:",
            text: 'أُنشئت في القرية "ثانوية ياني"، التي أصبحت مؤسسة تعليمية مركزية لكل السكان العرب في الشمال. تخرّج من مؤسسات التعليم في القرية العديد من المثقفين والشعراء والسياسيين، مما منحها لقب "عاصمة الثقافة في الجليل".',
          },
        ],
      },
      {
        icon: HeartHandshake,
        title: "من قيام الدولة وحتى اليوم",
        intro: "منذ عام 1948، حافظت كفر ياسيف على طابعها كبلدة مختلطة (مسيحية-مسلمة) تتميز بمستوى تعليم عالٍ جداً.",
        points: [
          { bold: "التعايش:", text: "أصبحت القرية رمزاً للحياة المشتركة والسلمية بين الطوائف المختلفة." },
          {
            bold: "التطور الحضري:",
            text: "ما كان في السابق قرية زراعية صغيرة أصبح مركزاً تجارياً وثقافياً نابضاً بالحياة يخدم كل سكان الجليل الغربي.",
          },
        ],
      },
    ],
    images: [
      { src: "/uploads/kafr-yasif-1957.jpg", alt: "كفر ياسيف عام 1957", caption: "كفر ياسيف عام 1957" },
      { src: "/uploads/kafr-yasif-1963.jpg", alt: "كفر ياسيف عام 1963", caption: "كفر ياسيف عام 1963" },
    ],
  },
  en: {
    heroIntro:
      "The history of Kafr Yasif is a fascinating mosaic of antiquity, culture and coexistence, which over generations made it one of the most important and influential towns in the Galilee.",
    timelineIntro: "Below is a timeline of key milestones in the village's development:",
    eras: [
      {
        icon: Landmark,
        title: "Antiquity and the Roman-Byzantine Period",
        intro: "The town's roots run deep in the soil of the Galilee:",
        points: [
          {
            bold: "Archaeology:",
            text: "Iron Age remains have been found in the village, but its ancient peak was during the Roman and Byzantine periods. Wine and olive presses, mosaic floors and burial caves were uncovered, testifying to thriving agriculture (mainly olive oil and wine).",
          },
          {
            bold: "Biblical connection:",
            text: 'Some identify the village with the biblical town of "Hosah" or other settlements mentioned in the territory of the Tribe of Asher.',
          },
        ],
      },
      {
        icon: ScrollText,
        title: "The Jewish Community and the Ancient Cemetery",
        intro: "Kafr Yasif is historically known as a town where a Jewish community lived for hundreds of years:",
        points: [
          {
            bold: "16th-19th centuries:",
            text: "During the Ottoman period, a Jewish community engaged in agriculture lived in the village. The village's ancient Jewish cemetery also served the Jews of Acre, who were not permitted to bury their dead within the city walls (for religious or security reasons).",
          },
          {
            bold: "Departure of the community:",
            text: "The last Jewish community left the village in 1841 following political and security changes in the region.",
          },
        ],
      },
      {
        icon: Castle,
        title: "Zahir al-Umar and the Ottoman Period",
        paragraph:
          "In the 18th century, under the rule of Zahir al-Umar (who governed the Galilee), the village gained strategic importance. It served as a key crossroads between Acre and Safed, and the fertile surrounding land turned it into an important agricultural supply center.",
      },
      {
        icon: GraduationCap,
        title: 'The British Mandate Era – "Capital of Education"',
        intro: "This was the village's modern golden age:",
        points: [
          {
            bold: "Declared a council (1925):",
            text: "Kafr Yasif was among the first Arab towns in the Land of Israel to be granted local council status under the British Mandate.",
          },
          {
            bold: "Educational center:",
            text: '"Yani High School" was established in the village, becoming a central educational institution for the entire Arab population in the north. Many scholars, poets and politicians emerged from the village\'s educational institutions, earning it the nickname "Capital of Culture of the Galilee".',
          },
        ],
      },
      {
        icon: HeartHandshake,
        title: "From the Founding of the State to Today",
        intro: "Since 1948, Kafr Yasif has preserved its character as a mixed (Christian-Muslim) town distinguished by a very high level of education.",
        points: [
          { bold: "Coexistence:", text: "The village became a symbol of shared, peaceful life between its different communities." },
          {
            bold: "Urban development:",
            text: "What was once a small agricultural village has become a vibrant commercial and culinary center serving all residents of the Western Galilee.",
          },
        ],
      },
    ],
    images: [
      { src: "/uploads/kafr-yasif-1957.jpg", alt: "Kafr Yasif in 1957", caption: "Kafr Yasif in 1957" },
      { src: "/uploads/kafr-yasif-1963.jpg", alt: "Kafr Yasif in 1963", caption: "Kafr Yasif in 1963" },
    ],
  },
};

function Era({ index, icon: Icon, title, children }: { index: number; icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="relative flex gap-4">
      <div className="flex shrink-0 flex-col items-center">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white shadow-sm">
          <Icon size={17} aria-hidden="true" />
        </span>
        <span className="mt-1 w-px flex-1 bg-teal-100" aria-hidden="true" />
      </div>
      <SectionCard className="mb-4 flex-1 sm:p-6">
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-teal-900">
          <span className="text-teal-500">{index}.</span> {title}
        </h2>
        <div className="space-y-3">{children}</div>
      </SectionCard>
    </div>
  );
}

export function HistoryPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title}>{c.heroIntro}</Hero>

      <p className="mb-4 text-base leading-7 text-ink-600">{c.timelineIntro}</p>

      <div>
        {c.eras.map((era, i) => (
          <Era key={i} index={i + 1} icon={era.icon} title={era.title}>
            {era.intro && <p className="text-sm leading-6 text-ink-600">{era.intro}</p>}
            {era.points && (
              <BulletList
                items={era.points.map((p, j) => (
                  <span key={j}>
                    <strong className="text-ink-900">{p.bold}</strong> {p.text}
                  </span>
                ))}
              />
            )}
            {era.paragraph && <p className="text-sm leading-6 text-ink-600">{era.paragraph}</p>}
          </Era>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {c.images.map((img) => (
          <figure key={img.src} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100">
            <div className="relative aspect-[4/3]">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="px-4 py-3 text-sm font-medium text-teal-900">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    </PageArticle>
  );
}
