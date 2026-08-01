import { Home, Radio, Backpack, Building2, Phone, ExternalLink } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, LinkedBanner } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type BoldPoint = { bold: string; text: string };

type LocaleContent = {
  heroSubtitle: string;
  heroIntro: string;
  bannerAlt: string;
  section1Title: string;
  section1Intro: string;
  shelterPoints: BoldPoint[];
  section2Title: string;
  section2Intro: string;
  alertPoints: BoldPoint[];
  section3Title: string;
  section3Intro: string;
  kitPoints: BoldPoint[];
  section4Title: string;
  section4Paragraphs: string[];
  section5Title: string;
  helpCenter1Bold: string;
  helpCenter1Suffix: string;
  helpCenter2Bold: string;
  helpCenter3Bold: string;
  helpCenter3Text: string;
  closing: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "מרכז מידע וחירום: הנחיות פיקוד העורף",
    heroIntro:
      "מועצה מקומית כפר יאסיף – נערכים בשגרה, מוגנים בחירום. מועצת כפר יאסיף פועלת בתיאום מלא ובשיתוף פעולה הדוק עם פיקוד העורף כדי להבטיח את מוכנות היישוב לכל תרחיש. זכרו: הנחיות פיקוד העורף מצילות חיים. הקפדה על הכללים הוכחה כגורם המכריע בצמצום פגיעות בנפש.",
    bannerAlt: "הנחיות ופקודות פיקוד העורף",
    section1Title: "בחירת המרחב המוגן והכנתו",
    section1Intro:
      "בזמן קבלת התרעה, עומדות לרשותנו 90 שניות (דקה וחצי) להגיע למרחב המוגן. יש לבחור את המרחב המוגן לפי סדר העדיפויות הבא:",
    shelterPoints: [
      { bold: 'ממ"ד (מרחב מוגן דירתי) או ממ"ק (מרחב מוגן קומתי):', text: "אלו האופציות המועדפות ביותר." },
      { bold: "מקלט:", text: "בתנאי שהמקלט נמצא בתוך המבנה וניתן להגיע אליו תוך פרק הזמן המוגדר." },
      { bold: "חדר פנימי בבית:", text: "חדר עם מינימום קירות חיצוניים, חלונות ופתחים." },
      { bold: "חדר מדרגות:", text: 'בבניינים ללא ממ"ד או מקלט, יש לרדת לקומה אמצעית ולשהות בגרם המדרגות.' },
    ],
    section2Title: "איך מקבלים התרעה בזמן אמת?",
    section2Intro: "המועצה ממליצה לכל תושב להחזיק לפחות שני אמצעי התרעה פעילים:",
    alertPoints: [
      { bold: "אפליקציית פיקוד העורף:", text: "האמצעי המדויק ביותר המזהה את מיקומכם ושולח התרעה ממוקדת." },
      { bold: "צופרי המועצה:", text: "מערך הצופרים הפרוס ברחבי היישוב." },
      { bold: "רדיו וטלוויזיה:", text: 'הערוצים המרכזיים מפעילים "גל שקט" ודיווחים בזמן אמת.' },
    ],
    section3Title: "ציוד חירום מומלץ לכל משפחה",
    section3Intro: 'עירייה ערוכה היא עירייה שתושביה ערוכים. אנו ממליצים להכין "תיק חירום" משפחתי שיכלול:',
    kitPoints: [
      { bold: "מים:", text: "3 ליטר לאדם ליום (לפחות ל-72 שעות)." },
      { bold: "מזון:", text: "מוצרים יבשים או שימורים (שלא דורשים קירור)." },
      { bold: "תאורה:", text: "פנס המופעל על סוללות ורדיו." },
      { bold: "ערכת עזרה ראשונה:", text: "תרופות קבועות ומסמכים חשובים (צילום ת.ז, חוזה דירה)." },
      { bold: "סוללות גיבוי:", text: "למכשירים סלולריים." },
    ],
    section4Title: "מקלטים ציבוריים בכפר יאסיף",
    section4Paragraphs: [
      "המועצה מתחזקת מערך מקלטים ציבוריים הפרוסים בנקודות אסטרטגיות ביישוב.",
      "לידיעתכם: בזמן עליית כוננות, המועצה פותחת את כל המקלטים הציבוריים באופן אוטומטי מרחוק או באמצעות צוותי הסריקה של אגף הביטחון.",
    ],
    section5Title: "מוקדי סיוע ומידע",
    helpCenter1Bold: "מוקד פיקוד העורף:",
    helpCenter1Suffix: "(מענה טלפוני 24/7).",
    helpCenter2Bold: "פורטל החירום הלאומי:",
    helpCenter3Bold: "מוקד המועצה (106):",
    helpCenter3Text: "לדיווח על מפגעים או צורך בסיוע לוגיסטי.",
    closing: "ביחד, במשמעת ובאחריות, נשמור על כפר יאסיף בטוחה.",
  },
  ar: {
    heroSubtitle: "مركز المعلومات والطوارئ: تعليمات قيادة الجبهة الداخلية",
    heroIntro:
      "المجلس المحلي كفر ياسيف – نستعد في الروتين، ونكون محميين في الطوارئ. يعمل مجلس كفر ياسيف بتنسيق تام وتعاون وثيق مع قيادة الجبهة الداخلية لضمان جاهزية البلدة لأي سيناريو. تذكروا: تعليمات قيادة الجبهة الداخلية تنقذ الأرواح. أثبت الالتزام بالتعليمات أنه العامل الحاسم في الحد من الإصابات.",
    bannerAlt: "تعليمات وأوامر قيادة الجبهة الداخلية",
    section1Title: "اختيار المكان المحمي وتجهيزه",
    section1Intro: "عند تلقي إنذار، تتوفر لدينا 90 ثانية (دقيقة ونصف) للوصول إلى المكان المحمي. يجب اختيار المكان المحمي وفق ترتيب الأولويات التالي:",
    shelterPoints: [
      { bold: 'الغرفة المحمية للشقة أو الغرفة المحمية للطابق:', text: "هذان الخياران هما الأكثر تفضيلاً." },
      { bold: "الملجأ:", text: "بشرط أن يكون الملجأ داخل المبنى ويمكن الوصول إليه خلال المهلة الزمنية المحددة." },
      { bold: "غرفة داخلية في المنزل:", text: "غرفة بأقل عدد ممكن من الجدران الخارجية والنوافذ والفتحات." },
      { bold: "بيت الدرج:", text: "في المباني التي لا تحتوي على غرفة محمية أو ملجأ، يجب النزول إلى الطابق الأوسط والبقاء في بيت الدرج." },
    ],
    section2Title: "كيف نتلقى الإنذار في الوقت الفعلي؟",
    section2Intro: "يوصي المجلس كل مقيم بامتلاك وسيلتي إنذار فعّالتين على الأقل:",
    alertPoints: [
      { bold: "تطبيق قيادة الجبهة الداخلية:", text: "الوسيلة الأكثر دقة، والتي تحدد موقعكم وترسل إنذاراً مركّزاً." },
      { bold: "صفارات المجلس:", text: "شبكة الصفارات المنتشرة في أنحاء البلدة." },
      { bold: "الراديو والتلفزيون:", text: 'تُفعّل القنوات الرئيسية "الموجة الصامتة" وتقارير فورية.' },
    ],
    section3Title: "معدات طوارئ يُنصح بها لكل عائلة",
    section3Intro: 'البلدية المستعدة هي بلدية سكانها مستعدون. نوصي بتجهيز "حقيبة طوارئ" عائلية تشمل:',
    kitPoints: [
      { bold: "الماء:", text: "3 لترات للشخص يومياً (لمدة 72 ساعة على الأقل)." },
      { bold: "الطعام:", text: "منتجات جافة أو معلبات (لا تتطلب التبريد)." },
      { bold: "الإضاءة:", text: "مصباح يعمل بالبطاريات وراديو." },
      { bold: "حقيبة الإسعافات الأولية:", text: "الأدوية الدائمة والمستندات المهمة (نسخة عن الهوية، عقد إيجار الشقة)." },
      { bold: "بطاريات احتياطية:", text: "للأجهزة الخلوية." },
    ],
    section4Title: "الملاجئ العامة في كفر ياسيف",
    section4Paragraphs: [
      "يحافظ المجلس على شبكة ملاجئ عامة منتشرة في نقاط استراتيجية في البلدة.",
      "للعلم: عند ارتفاع درجة الجاهزية، يفتح المجلس جميع الملاجئ العامة تلقائياً عن بُعد أو بواسطة طواقم المسح التابعة لشعبة الأمن.",
    ],
    section5Title: "مراكز المساعدة والمعلومات",
    helpCenter1Bold: "مركز قيادة الجبهة الداخلية:",
    helpCenter1Suffix: "(رد هاتفي على مدار الساعة طوال أيام الأسبوع).",
    helpCenter2Bold: "بوابة الطوارئ الوطنية:",
    helpCenter3Bold: "مركز اتصال المجلس (106):",
    helpCenter3Text: "للإبلاغ عن مخاطر أو الحاجة إلى مساعدة لوجستية.",
    closing: "معاً، بانضباط ومسؤولية، نحافظ على أمان كفر ياسيف.",
  },
  en: {
    heroSubtitle: "Information and Emergency Center: Home Front Command Guidelines",
    heroIntro:
      "Kafr Yasif Local Council – prepared in routine, protected in emergency. The Kafr Yasif Council operates in full coordination and close cooperation with the Home Front Command to ensure the town's readiness for any scenario. Remember: Home Front Command guidelines save lives. Strict adherence to the rules has proven to be the decisive factor in reducing casualties.",
    bannerAlt: "Home Front Command guidelines and instructions",
    section1Title: "Choosing and Preparing the Protected Space",
    section1Intro:
      "When an alert is received, we have 90 seconds (a minute and a half) to reach the protected space. The protected space should be chosen according to the following order of priority:",
    shelterPoints: [
      { bold: "Mamad (apartment safe room) or Mamak (floor safe room):", text: "These are the most preferred options." },
      { bold: "Shelter:", text: "Provided the shelter is within the building and can be reached within the defined time frame." },
      { bold: "An interior room in the home:", text: "A room with a minimum of exterior walls, windows and openings." },
      { bold: "Stairwell:", text: "In buildings without a safe room or shelter, go down to a middle floor and stay in the stairwell." },
    ],
    section2Title: "How Do You Receive a Real-Time Alert?",
    section2Intro: "The council recommends that every resident keep at least two active alert methods:",
    alertPoints: [
      { bold: "Home Front Command app:", text: "The most precise method, identifying your location and sending a targeted alert." },
      { bold: "Council sirens:", text: "The network of sirens deployed throughout the town." },
      { bold: "Radio and television:", text: 'The main channels activate a "silent wave" and provide real-time reports.' },
    ],
    section3Title: "Recommended Emergency Equipment for Every Family",
    section3Intro: 'A prepared town is a town whose residents are prepared. We recommend preparing a family "emergency kit" that includes:',
    kitPoints: [
      { bold: "Water:", text: "3 liters per person per day (for at least 72 hours)." },
      { bold: "Food:", text: "Dry goods or canned food (that do not require refrigeration)." },
      { bold: "Lighting:", text: "A battery-powered flashlight and a radio." },
      { bold: "First-aid kit:", text: "Regular medications and important documents (a copy of ID, apartment lease)." },
      { bold: "Backup batteries:", text: "For mobile devices." },
    ],
    section4Title: "Public Shelters in Kafr Yasif",
    section4Paragraphs: [
      "The council maintains a network of public shelters deployed at strategic points around the town.",
      "Please note: when the alert level rises, the council automatically opens all public shelters remotely or via the security division's inspection teams.",
    ],
    section5Title: "Help and Information Centers",
    helpCenter1Bold: "Home Front Command hotline:",
    helpCenter1Suffix: "(24/7 phone response).",
    helpCenter2Bold: "National Emergency Portal:",
    helpCenter3Bold: "Council hotline (106):",
    helpCenter3Text: "To report hazards or the need for logistical assistance.",
    closing: "Together, with discipline and responsibility, we will keep Kafr Yasif safe.",
  },
};

function renderPoints(points: BoldPoint[]) {
  return points.map((p, i) => (
    <span key={i}>
      <strong className="text-ink-900">{p.bold}</strong> {p.text}
    </span>
  ));
}

export function HomeFrontCommandPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroIntro}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Home} title={c.section1Title}>
          <p className="text-sm leading-6 text-ink-600">{c.section1Intro}</p>
          <BulletList items={renderPoints(c.shelterPoints)} />
        </NumberedSection>

        <NumberedSection index={2} icon={Radio} title={c.section2Title}>
          <p className="text-sm leading-6 text-ink-600">{c.section2Intro}</p>
          <BulletList items={renderPoints(c.alertPoints)} />
        </NumberedSection>

        <NumberedSection index={3} icon={Backpack} title={c.section3Title}>
          <p className="text-sm leading-6 text-ink-600">{c.section3Intro}</p>
          <BulletList items={renderPoints(c.kitPoints)} />
        </NumberedSection>

        <NumberedSection index={4} icon={Building2} title={c.section4Title}>
          {c.section4Paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={5} icon={Phone} title={c.section5Title}>
          <BulletList
            items={[
              <>
                <strong className="text-ink-900">{c.helpCenter1Bold}</strong>{" "}
                <a href="tel:104" className="text-teal-700 hover:underline">
                  104
                </a>{" "}
                {c.helpCenter1Suffix}
              </>,
              <>
                <strong className="text-ink-900">{c.helpCenter2Bold}</strong>{" "}
                <a
                  href="https://www.oref.org.il/heb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-700 hover:underline"
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  www.oref.org.il
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.helpCenter3Bold}</strong> {c.helpCenter3Text}
              </>,
            ]}
          />
          <p className="pt-2 text-sm font-medium leading-6 text-teal-900">{c.closing}</p>
        </NumberedSection>
      </div>

      <LinkedBanner src="/uploads/emergency-security-hero.avif" alt={c.bannerAlt} href="https://www.oref.org.il/heb" />
    </PageArticle>
  );
}
