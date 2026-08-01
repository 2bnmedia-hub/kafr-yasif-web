import {
  GraduationCap,
  Users,
  School,
  Brain,
  Home,
  LifeBuoy,
  Construction,
  Accessibility,
} from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard } from "../premium/Shared";
import type { Locale } from "@/i18n/config";
import type { StaffInfo } from "../premium/Shared";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  subtitle: string;
  visionTitle: string;
  visionParagraphs: string[];
  staffTitle: string;
  staff: StaffInfo[];
  institutionsTitle: string;
  schoolsHeading: string;
  schoolsIntro: string;
  schools: string[];
  kindergartensHeading: string;
  kindergartensIntro: string;
  kindergartens: string[];
  informalHeading: string;
  informalIntro: string;
  informal: string[];
  psychTitle: string;
  psychIntro: string;
  psychPoints: string[];
  clubhouseTitle: string;
  clubhouseParagraphs: string[];
  naarTitle: string;
  naarParagraph: string;
  projectsTitle: string;
  completedHeading: string;
  completed: string[];
  upcomingHeading: string;
  upcoming: string[];
  accessibilityTitle: string;
  accessibilityIntro1: string;
  accessibilityIntro2: string;
  accessibilityPoints: string[];
  accessibilityClosing: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "מחלקת החינוך – מועצה מקומית כפר יאסיף",
    visionTitle: "חזון המחלקה",
    visionParagraphs: [
      "מחלקת החינוך במועצה המקומית כפר יאסיף אחראית על פיתוח, ניהול וקידום מערכת החינוך ביישוב, החל מגיל הרך ועד למסגרות החינוך העל-יסודי והבלתי פורמלי. המחלקה פועלת להבטחת מערכת חינוך איכותית, מתקדמת ושוויונית, תוך מתן מענה חינוכי, ערכי וחברתי לכלל תלמידי היישוב.",
      "המחלקה ממלאת תפקיד מרכזי בגיבוש מדיניות חינוכית מקומית, בקידום יוזמות חינוכיות וביישום החלטות הנהלת המועצה והנחיות משרד החינוך. פעילותה כוללת פיקוח וליווי מקצועי של מוסדות החינוך, קידום תכניות לימוד חדשניות, פיתוח תשתיות חינוכיות ושיתוף פעולה עם הנהלות בתי הספר, צוותי החינוך, ועדי ההורים וגורמי מקצוע נוספים. לחינוך המיוחד תשומת לה מיוחדת הן בקיום ועדות אפיון וזכאות, שיבוץ תלמידים וארגון מערך ההסעות עבורם.",
      "בנוסף, מחלקת החינוך משמשת חוליית הקשר המרכזית בין מוסדות החינוך ביישוב לבין הנהלת המועצה ומשרד החינוך, ומקדמת תכניות חינוכיות, חברתיות וקהילתיות התורמות להתפתחות התלמידים ולחיזוק הקהילה.",
    ],
    staffTitle: "צוות מחלקת החינוך",
    staff: [
      { name: "מיכאיל בסל", role: "מנהל חינוך", phone: "04-9569840" },
      { name: "הילאנה פרנסיס", role: "רכזת גנים, סגנית מנהל מחלקת חינוך", phone: "04-9569842" },
      { name: "מאג'דה גנטוס", role: 'קב"סית', phone: "04-9569868" },
      { name: "ח'אולה סעיד", role: 'קב"סית', phone: "049-569840", email: "Khawlas@kafr-yasif.muni.il" },
      { name: "כמיליא סעדה", role: "מנהלת יחידת נוער", phone: "050-3644001", email: "kamelia@kafr-yasif.muni.il" },
      { name: "ויויאן בולס", role: "מנהלת גיל לידה עד שלוש", email: "Viviane20@walla.co.il" },
      { name: "עלאא חאג", role: 'מנהל יחידת שפ"ח', email: "abunimir@gmail.com" },
    ],
    institutionsTitle: "מוסדות החינוך ביישוב",
    schoolsHeading: "בתי ספר",
    schoolsIntro: "מערכת החינוך בכפר יאסיף כוללת מספר מוסדות חינוך יסודיים ועל-יסודיים הפועלים לקידום מצוינות לימודית וחברתית:",
    schools: [
      "בית ספר יסודי א' – אלביאדר   049961711",
      "בית ספר יסודי ב' – אלבוסתאן   049961713",
      "חטיבת ביניים – אלעין    049569854",
      'בית ספר תיכון ע"ש יני   049569845',
      "בית ספר \"אלמוטראן\"",
    ],
    kindergartensHeading: "גני ילדים",
    kindergartensIntro: "מערך הגנים ביישוב כולל מגוון מסגרות חינוכיות לגיל הרך:",
    kindergartens: [
      "6 גני חובה",
      "4 גני טרום חובה בבעלות המועצה",
      'גן אחד לחינוך מיוחד – "חיוך מיוחד"',
      "7 גני טרום חובה במעמד מוכר שאינו רשמי",
    ],
    informalHeading: "חינוך בלתי פורמלי",
    informalIntro: "החינוך הבלתי פורמלי ביישוב מהווה נדבך חשוב בפיתוח החברתי והקהילתי של הילדים ובני הנוער, ומתקיים במסגרות הבאות:",
    informal: [
      "מרכז קהילתי – שכונה מזרחית",
      "מרכז קהילתי – שכונה מערבית",
      "מרכז פיס קהילתי – שכונת דאר אלגרבייה",
      "מועדון פיס להתעמלות וחינוך גופני",
      "מרכזי פעילות קהילתיים נוספים",
    ],
    psychTitle: "השירות הפסיכולוגי החינוכי",
    psychIntro: "השירות הפסיכולוגי החינוכי פועל במוסדות החינוך ומספק מענה מקצועי לתלמידים, להורים ולצוותים החינוכיים. במסגרת השירות פועלים ארבעה פסיכולוגים חינוכיים המספקים:",
    psychPoints: [
      "אבחונים והערכות מקצועיות",
      "הדרכות לצוותים חינוכיים",
      "טיפולים פרטניים וקבוצתיים",
      "השתתפות בוועדות מקצועיות ובישיבות צוות",
    ],
    clubhouseTitle: "מועדונית משפחתית",
    clubhouseParagraphs: [
      "המועדונית המשפחתית מעניקה מסגרת טיפולית וחינוכית לתלמידי כיתות א'–ו', אשר נבחרים בהתאם להחלטת ועדה משותפת של מחלקת החינוך והמחלקה לשירותים חברתיים.",
      'המועדונית מופעלת על ידי צוות מקצועי הכולל אם בית ואב בית, ומנוהלת בשיתוף קב"סית המועצה. פעילותה מתוקצבת באמצעות המועצה המקומית ומשרד החינוך, ומטרתה להעניק תמיכה לימודית, חברתית ורגשית לתלמידים הזקוקים לכך.',
    ],
    naarTitle: 'מרכז "נער" לילדים בסיכון',
    naarParagraph:
      'מרכז "נער" פועל במסגרת התכנית הלאומית לילדים ובני נוער בסיכון, ומספק מענה חינוכי-חברתי לילדים הזקוקים לתמיכה נוספת, תוך שילוב פעילות חינוכית, טיפולית וקהילתית.',
    projectsTitle: "פרויקטים חינוכיים",
    completedHeading: "פרויקטים שבוצעו בשנה החולפת",
    completed: [
      'התכנית הלאומית – אור, תכניות לבתי הספר היסודיים ומרכז "נער"',
      "התנסות מדעית לכיתות ה'",
      "קייטנות קיץ",
      "תכנית בריאות השן",
      "פעילות קיפול נייר לגני הילדים",
      "שיפוץ בית הספר התיכון כולל חדר מורים",
      "שיפוץ מבני פיס",
      "שיפוץ בית ספר יסודי ב'",
      "קירוי מגרש מיני ביץ'",
      'תכנית פר"ח',
    ],
    upcomingHeading: "פרויקטים חדשים לקראת ביצוע",
    upcoming: [
      "תכנית \"ניצנים\" לגני הילדים ולכיתות א' (עד השעה 16:00)",
      "הקמת מעבדת מחשבים לחטיבת הביניים",
      "תוספת בנייה לבית הספר התיכון",
      "הקמת אולם התעמלות חדש עם 250 מקומות ישיבה",
      "שיפוץ אולם ההתעמלות",
      "סל מדע (בביצוע)",
      "תכנית איכות הסביבה בגנים ובבתי הספר היסודיים",
      "הקמת בית ספר מוזיקלי",
      "תכנית \"חוג לכל ילד\"",
      "פסטיבל תרבות יישובי",
    ],
    accessibilityTitle: "התאמות הנגשה טכנולוגיות פרטניות",
    accessibilityIntro1:
      "לרשות ההורים עומדת חוברת מידע בנושא התאמות הנגשה טכנולוגיות פרטניות לתלמידים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות.",
    accessibilityIntro2: "החוברת כוללת מידע מקיף בנושאים הבאים:",
    accessibilityPoints: [
      "תקנות וחוקי הנגשה במערכת החינוך",
      "סוגי התאמות טכנולוגיות אפשריות לתלמידים",
      "תהליך הגשת בקשה להתאמות",
      "אופן הטיפול בבקשה על ידי הגורמים המקצועיים",
    ],
    accessibilityClosing: "מידע זה נועד לסייע להורים ולתלמידים לממש את זכויותיהם ולקדם שילוב מלא במערכת החינוך.",
  },
  ar: {
    subtitle: "قسم التعليم – المجلس المحلي كفر ياسيف",
    visionTitle: "رؤية القسم",
    visionParagraphs: [
      "يتولى قسم التعليم في المجلس المحلي كفر ياسيف تطوير وإدارة وتعزيز منظومة التعليم في البلدة، بدءاً من مرحلة الطفولة المبكرة وصولاً إلى أطر التعليم الثانوي وغير الرسمي. يعمل القسم على ضمان منظومة تعليمية عالية الجودة ومتقدمة ومتساوية، مع تقديم استجابة تربوية وقيمية واجتماعية لجميع طلاب البلدة.",
      "يؤدي القسم دوراً محورياً في بلورة سياسة تعليمية محلية، وتعزيز المبادرات التربوية، وتنفيذ قرارات إدارة المجلس وتوجيهات وزارة التربية والتعليم. تشمل أنشطته الإشراف والمرافقة المهنية لمؤسسات التعليم، وتعزيز برامج تعليمية مبتكرة، وتطوير البنى التحتية التعليمية، والتعاون مع إدارات المدارس وطواقم التعليم ولجان الأهالي وجهات مهنية أخرى. ويحظى التعليم الخاص باهتمام خاص من خلال عقد لجان التشخيص والأهلية، وتوزيع الطلاب، وتنظيم منظومة المواصلات لهم.",
      "إضافة إلى ذلك، يشكّل قسم التعليم حلقة الوصل المركزية بين مؤسسات التعليم في البلدة وإدارة المجلس ووزارة التربية والتعليم، ويعزز برامج تعليمية واجتماعية ومجتمعية تساهم في تطور الطلاب وتعزيز المجتمع.",
    ],
    staffTitle: "طاقم قسم التعليم",
    staff: [
      { name: "מיכאיל בסל", role: "مدير التعليم", phone: "04-9569840" },
      { name: "הילאנה פרנסיס", role: "منسقة الروضات، نائبة مدير قسم التعليم", phone: "04-9569842" },
      { name: "מאג'דה גנטוס", role: "ضابطة انتظام مدرسي", phone: "04-9569868" },
      { name: "ח'אולה סעיד", role: "ضابطة انتظام مدرسي", phone: "049-569840", email: "Khawlas@kafr-yasif.muni.il" },
      { name: "כמיליא סעדה", role: "مديرة وحدة الشبيبة", phone: "050-3644001", email: "kamelia@kafr-yasif.muni.il" },
      { name: "ויויאן בולס", role: "مديرة مرحلة من الولادة حتى سن الثالثة", email: "Viviane20@walla.co.il" },
      { name: "עלאא חאג", role: "مدير وحدة الخدمة النفسية التربوية", email: "abunimir@gmail.com" },
    ],
    institutionsTitle: "مؤسسات التعليم في البلدة",
    schoolsHeading: "المدارس",
    schoolsIntro: "تضم منظومة التعليم في كفر ياسيف عدة مؤسسات تعليمية ابتدائية وثانوية تعمل على تعزيز التميّز الدراسي والاجتماعي:",
    schools: [
      "المدرسة الابتدائية أ – البيادر   049961711",
      "المدرسة الابتدائية ب – البستان   049961713",
      "المدرسة الإعدادية – العين    049569854",
      "المدرسة الثانوية باسم ياني   049569845",
      "مدرسة \"المطران\"",
    ],
    kindergartensHeading: "رياض الأطفال",
    kindergartensIntro: "تضم منظومة الرياض في البلدة مجموعة متنوعة من أطر التعليم لمرحلة الطفولة المبكرة:",
    kindergartens: [
      "6 رياض إلزامية",
      "4 روضات ما قبل الإلزامي مملوكة للمجلس",
      'روضة واحدة للتربية الخاصة – "ابتسامة خاصة"',
      "7 روضات ما قبل الإلزامي بمكانة معترف بها غير رسمية",
    ],
    informalHeading: "التعليم غير الرسمي",
    informalIntro: "يشكّل التعليم غير الرسمي في البلدة ركيزة مهمة في التطور الاجتماعي والمجتمعي للأطفال والشبيبة، ويُقدَّم من خلال الأطر التالية:",
    informal: [
      "مركز مجتمعي – الحي الشرقي",
      "مركز مجتمعي – الحي الغربي",
      "مركز بايس المجتمعي – حي دار الغربية",
      "نادي بايس للجمباز والتربية البدنية",
      "مراكز نشاط مجتمعي إضافية",
    ],
    psychTitle: "الخدمة النفسية التربوية",
    psychIntro: "تعمل الخدمة النفسية التربوية في مؤسسات التعليم وتقدم استجابة مهنية للطلاب والأهالي والطواقم التربوية. يعمل ضمن الخدمة أربعة أخصائيين نفسيين تربويين يقدّمون:",
    psychPoints: [
      "تشخيصات وتقييمات مهنية",
      "إرشاد للطواقم التربوية",
      "علاجات فردية وجماعية",
      "المشاركة في اللجان المهنية واجتماعات الطاقم",
    ],
    clubhouseTitle: "النادي الأسري",
    clubhouseParagraphs: [
      "يوفر النادي الأسري إطاراً علاجياً وتربوياً لطلاب الصفوف أ'–و'، الذين يُختارون بناءً على قرار لجنة مشتركة من قسم التعليم وقسم الخدمات الاجتماعية.",
      "يُدار النادي الأسري من قبل طاقم مهني يضم أماً منزلية وأباً منزلياً، ويُدار بالتعاون مع ضابطة الانتظام المدرسي في المجلس. تُموَّل أنشطته من خلال المجلس المحلي ووزارة التربية والتعليم، وتهدف إلى تقديم دعم دراسي واجتماعي وعاطفي للطلاب المحتاجين لذلك.",
    ],
    naarTitle: 'مركز "نער" للأطفال المعرّضين للخطر',
    naarParagraph:
      'يعمل مركز "نער" في إطار البرنامج الوطني للأطفال والشبيبة المعرّضين للخطر، ويقدّم استجابة تربوية-اجتماعية للأطفال المحتاجين لدعم إضافي، من خلال دمج أنشطة تربوية وعلاجية ومجتمعية.',
    projectsTitle: "المشاريع التربوية",
    completedHeading: "مشاريع نُفِّذت في العام الماضي",
    completed: [
      'البرنامج الوطني "أور" (نور) – برامج للمدارس الابتدائية ومركز "نער"',
      "تجربة علمية لصفوف الخامس",
      "مخيمات صيفية",
      "برنامج صحة الأسنان",
      "نشاط طي الورق (أوريغامي) لرياض الأطفال",
      "ترميم المدرسة الثانوية بما في ذلك غرفة المعلمين",
      "ترميم مباني بايس",
      "ترميم المدرسة الابتدائية ب",
      "تسقيف ملعب ميني بيتش",
      'برنامج "بيرح"',
    ],
    upcomingHeading: "مشاريع جديدة قيد التنفيذ",
    upcoming: [
      'برنامج "نيتسانيم" (البراعم) لرياض الأطفال وصفوف الأول (حتى الساعة 16:00)',
      "إنشاء مختبر حواسيب للمدرسة الإعدادية",
      "إضافة بناء للمدرسة الثانوية",
      "إنشاء صالة رياضية جديدة بسعة 250 مقعداً",
      "ترميم الصالة الرياضية",
      "سلة العلوم (قيد التنفيذ)",
      "برنامج جودة البيئة في الروضات والمدارس الابتدائية",
      "إنشاء مدرسة موسيقية",
      'برنامج "نادٍ لكل طفل"',
      "مهرجان ثقافي بلدي",
    ],
    accessibilityTitle: "تكييفات تكنولوجية فردية لإتاحة الوصول",
    accessibilityIntro1:
      "يتوفر للأهالي كتيب معلومات حول التكييفات التكنولوجية الفردية لإتاحة الوصول للطلاب ذوي الإعاقة، وفقاً لقانون المساواة في حقوق الأشخاص ذوي الإعاقة.",
    accessibilityIntro2: "يتضمن الكتيب معلومات شاملة حول المواضيع التالية:",
    accessibilityPoints: [
      "أنظمة وقوانين إتاحة الوصول في منظومة التعليم",
      "أنواع التكييفات التكنولوجية الممكنة للطلاب",
      "عملية تقديم طلب للحصول على التكييفات",
      "كيفية معالجة الطلب من قبل الجهات المهنية",
    ],
    accessibilityClosing: "تهدف هذه المعلومات إلى مساعدة الأهالي والطلاب على إعمال حقوقهم وتعزيز الدمج الكامل في منظومة التعليم.",
  },
  en: {
    subtitle: "Education Department – Kafr Yasif Local Council",
    visionTitle: "Department Vision",
    visionParagraphs: [
      "The Education Department at the Kafr Yasif Local Council is responsible for developing, managing and advancing the town's education system, from early childhood through secondary and informal education frameworks. The Department works to ensure a high-quality, advanced and equitable education system, providing an educational, values-based and social response to all of the town's students.",
      "The Department plays a central role in shaping local education policy, promoting educational initiatives, and implementing Council leadership decisions and Ministry of Education directives. Its activities include professional oversight and support of educational institutions, promotion of innovative curricula, development of educational infrastructure, and cooperation with school administrations, teaching staff, parent committees and other professional bodies. Special education receives particular attention, including through diagnostic and eligibility committees, student placement, and organization of transportation services.",
      "In addition, the Education Department serves as the central liaison between the town's educational institutions, the Council leadership and the Ministry of Education, and promotes educational, social and community programs that contribute to students' development and strengthen the community.",
    ],
    staffTitle: "Education Department Staff",
    staff: [
      { name: "מיכאיל בסל", role: "Director of Education", phone: "04-9569840" },
      { name: "הילאנה פרנסיס", role: "Kindergarten Coordinator, Deputy Director of the Education Department", phone: "04-9569842" },
      { name: "מאג'דה גנטוס", role: "School Attendance Officer", phone: "04-9569868" },
      { name: "ח'אולה סעיד", role: "School Attendance Officer", phone: "049-569840", email: "Khawlas@kafr-yasif.muni.il" },
      { name: "כמיליא סעדה", role: "Director of the Youth Unit", phone: "050-3644001", email: "kamelia@kafr-yasif.muni.il" },
      { name: "ויויאן בולס", role: "Director of Early Childhood (Birth to Age Three)", email: "Viviane20@walla.co.il" },
      { name: "עלאא חאג", role: "Director of the Educational Psychological Service Unit", email: "abunimir@gmail.com" },
    ],
    institutionsTitle: "Educational Institutions in the Town",
    schoolsHeading: "Schools",
    schoolsIntro: "The Kafr Yasif education system includes several elementary and secondary educational institutions working to promote academic and social excellence:",
    schools: [
      "Elementary School A – Al-Bayader   049961711",
      "Elementary School B – Al-Bustan   049961713",
      "Al-Ein Middle School    049569854",
      "Yani High School   049569845",
      'Al-Matran School',
    ],
    kindergartensHeading: "Kindergartens",
    kindergartensIntro: "The town's kindergarten network includes a variety of early childhood education frameworks:",
    kindergartens: [
      "6 compulsory kindergartens",
      "4 pre-compulsory kindergartens owned by the Council",
      'One special-education kindergarten – "Special Smile"',
      "7 recognized-but-unofficial pre-compulsory kindergartens",
    ],
    informalHeading: "Informal Education",
    informalIntro: "Informal education in the town forms an important pillar in the social and communal development of children and youth, and is offered through the following frameworks:",
    informal: [
      "Community Center – Eastern Neighborhood",
      "Community Center – Western Neighborhood",
      "Pais Community Center – Dar al-Gharbiyya Neighborhood",
      "Pais Club for Gymnastics and Physical Education",
      "Additional community activity centers",
    ],
    psychTitle: "Educational Psychological Service",
    psychIntro: "The Educational Psychological Service operates within educational institutions and provides a professional response to students, parents and teaching staff. Four educational psychologists work within the service, providing:",
    psychPoints: [
      "Professional diagnostic assessments and evaluations",
      "Guidance and training for teaching staff",
      "Individual and group therapy",
      "Participation in professional committees and staff meetings",
    ],
    clubhouseTitle: "Family Clubhouse",
    clubhouseParagraphs: [
      "The Family Clubhouse provides a therapeutic and educational framework for students in grades 1-6, who are selected based on the decision of a joint committee of the Education Department and the Social Services Department.",
      "The clubhouse is operated by a professional team that includes a house mother and house father, and is managed in cooperation with the Council's school attendance officer. Its activities are funded by the Local Council and the Ministry of Education, and its purpose is to provide academic, social and emotional support to students in need.",
    ],
    naarTitle: '"Naar" Center for At-Risk Children',
    naarParagraph:
      'The "Naar" Center operates as part of the national program for children and youth at risk, providing an educational-social response to children in need of additional support, through a combination of educational, therapeutic and community activities.',
    projectsTitle: "Educational Projects",
    completedHeading: "Projects Completed in the Past Year",
    completed: [
      'The national "Or" (Light) program – programs for elementary schools and the "Naar" center',
      "Scientific experience program for 5th grades",
      "Summer camps",
      "Dental health program",
      "Paper-folding (origami) activity for kindergartens",
      "Renovation of the high school, including the teachers' room",
      "Renovation of Pais buildings",
      "Renovation of Elementary School B",
      "Roofing of the mini-beach (volleyball) court",
      'The "Perach" mentoring program',
    ],
    upcomingHeading: "New Projects Underway",
    upcoming: [
      'The "Nitzanim" (Buds) extended-day program for kindergartens and 1st grade (until 4:00 PM)',
      "Establishment of a computer lab for the middle school",
      "Building addition to the high school",
      "Construction of a new gymnasium with 250 seats",
      "Renovation of the gymnasium",
      "Science Basket program (in progress)",
      "Environmental quality program in kindergartens and elementary schools",
      "Establishment of a music school",
      'The "A Club for Every Child" program',
      "Municipal cultural festival",
    ],
    accessibilityTitle: "Individual Technological Accessibility Accommodations",
    accessibilityIntro1:
      "Parents have access to an information booklet on individual technological accessibility accommodations for students with disabilities, in accordance with the Equal Rights for Persons with Disabilities Law.",
    accessibilityIntro2: "The booklet includes comprehensive information on the following topics:",
    accessibilityPoints: [
      "Accessibility regulations and laws within the education system",
      "Types of technological accommodations available to students",
      "The process for submitting a request for accommodations",
      "How requests are handled by professional bodies",
    ],
    accessibilityClosing: "This information is intended to help parents and students exercise their rights and promote full integration within the education system.",
  },
};

export function EducationPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle} />

      <div className="space-y-4">
        <NumberedSection index={1} icon={GraduationCap} title={c.visionTitle}>
          {c.visionParagraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={2} icon={Users} title={c.staffTitle}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.staff.map((s) => (
              <StaffCard key={s.name} {...s} />
            ))}
          </div>
        </NumberedSection>

        <NumberedSection index={3} icon={School} title={c.institutionsTitle}>
          <h3 className="font-semibold text-teal-900">{c.schoolsHeading}</h3>
          <p className="text-sm leading-6 text-ink-600">{c.schoolsIntro}</p>
          <BulletList items={c.schools} />

          <h3 className="pt-2 font-semibold text-teal-900">{c.kindergartensHeading}</h3>
          <p className="text-sm leading-6 text-ink-600">{c.kindergartensIntro}</p>
          <BulletList items={c.kindergartens} />

          <h3 className="pt-2 font-semibold text-teal-900">{c.informalHeading}</h3>
          <p className="text-sm leading-6 text-ink-600">{c.informalIntro}</p>
          <BulletList items={c.informal} />
        </NumberedSection>

        <NumberedSection index={4} icon={Brain} title={c.psychTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.psychIntro}</p>
          <BulletList items={c.psychPoints} />
        </NumberedSection>

        <NumberedSection index={5} icon={Home} title={c.clubhouseTitle}>
          {c.clubhouseParagraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={6} icon={LifeBuoy} title={c.naarTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.naarParagraph}</p>
        </NumberedSection>

        <NumberedSection index={7} icon={Construction} title={c.projectsTitle}>
          <h3 className="font-semibold text-teal-900">{c.completedHeading}</h3>
          <BulletList items={c.completed} />

          <h3 className="pt-2 font-semibold text-teal-900">{c.upcomingHeading}</h3>
          <BulletList items={c.upcoming} />
        </NumberedSection>

        <NumberedSection index={8} icon={Accessibility} title={c.accessibilityTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.accessibilityIntro1}</p>
          <p className="text-sm leading-6 text-ink-600">{c.accessibilityIntro2}</p>
          <BulletList items={c.accessibilityPoints} />
          <p className="text-sm leading-6 text-ink-600">{c.accessibilityClosing}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
