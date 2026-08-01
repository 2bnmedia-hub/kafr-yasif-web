import { ExternalLink, Scale, CreditCard, FileText, UserCheck } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList, StaffCard, DocumentList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  heroSubtitle: string;
  staffName: string;
  section1Title: string;
  section1Paragraphs: string[];
  section1LinkText: string;
  section2Title: string;
  section2Paragraphs: string[];
  section3Title: string;
  requestFormTitle: string;
  section4Title: string;
  section4Intro: string;
  contactLabels: { phone: string; fax: string; address: string; addressValue: string; email: string };
  section5Title: string;
  exemptions: string[];
  exemptionsNote: string;
  exemptionsContact: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "הממונה על חופש המידע במועצה מקומית כפר יאסיף",
    staffName: "והיב תומא",
    section1Title: 'חוק חופש המידע, התשנ"ח-1998',
    section1Paragraphs: [
      "חוק חופש המידע, התשנ\"ח-1998, נחקק ב-19 במאי 1998 ונכנס לתוקף שנה לאחר מכן. החוק עיגן את זכותו של כל אזרח או תושב, לקבלת מידע המצוי בידי רשויות ציבוריות.",
      "החוק קובע כי הכלל הוא שהרשות תענה בחיוב לבקשה, אלא אם חשיפת המידע תפגע באינטרס אחר כגון בטחון המדינה, פרטיותם של אנשים, סודות מסחריים וכדומה.",
      "בחינת הבקשה נעשה במסגרת הזמנים הקבועים בחוק. לפיכך על הרשות להשיב לפונה תוך 30 יום, אולם, במקרה הצורך, רשאי הממונה או ראש הרשות הציבורית, להאריך את זמן המענה לטיפול עד ל-90 יום נוספים.",
      "במקום בו המידע נוגע לצד שלישי, על הרשות לפנות לאותו גורם ולאפשר לו להתנגד למסירת המידע. פניה לצד שלישי, מאריכה את זמן הטיפול בבקשה ב-21 יום נוספים, וככל שעמדת הצד השלישי נדחית, מוקנית לו הזכות לעתור על החלטת הרשות הציבורית והמידע לא יימסר למבקש עד למיצוי זכות זו.",
    ],
    section1LinkText: "מידע מפורט על החוק ניתן למצוא באתר היחידה הממשלתית לחופש המדע (נפתח בחלון חדש)",
    section2Title: "אגרות חופש המידע",
    section2Paragraphs: [
      "על פי חוק תקנת האגרות החדשות התשנ\"ט - 1999, פנייה לקבלת מידע תטופל לאחר תשלום אגרת בקשה והתחייבות (קישור לטופס התחייבות) המבקש/ת לשאת בתשלום הטיפול בבקשה ובהפקת המידע המבוקש.",
      "אדם המבקש/ת מידע אודות עצמו/ה וזכויותיו/ה פטור/ה מאגרת בקשה ומאגרת טיפול בעד 4 שעות עבודה, החל בשעה השלישית (כלומר, ייגבה תשלום אגרת טיפול החל מהשעה השביעית לטיפול). פירוט של סכומי האגרות מצוי באתר שירות התשלומים הממשלתי.",
      "את אגרת הבקשה ניתן לשלם באמצעות חשבון בנק שמספרו: 153729 סניף 691 מספר 17 או במשרדי המועצה.",
    ],
    section3Title: "טופס בקשה לקבלת מידע",
    requestFormTitle: "טופס בקשה לקבלת מידע",
    section4Title: "אגרת הגשת בקשה למידע",
    section4Intro: "להגשת בקשת חופש מידע ולשאלות בנושא יש לפנות לממונה על החוק מר: והיב תומא",
    contactLabels: {
      phone: "טלפון:",
      fax: "פקס:",
      address: "כתובת:",
      addressValue: "כפר יאסיף - ת.ד 994",
      email: "בכתובת מייל",
    },
    section5Title: "מתן פטורים",
    exemptions: [
      "מידע אישי - יינתן פטור מאגרת הבקשה ומאגרת טיפול בעד 4 שעות עבודה.",
      "עמותה רשומה כמשמעותה בחוק העמותות - יינתן פטור מאגרת הבקשה ומאגרת טיפול בעד 4 שעות עבודה.",
      "אדם המבקש מידע לצורך מחקר אקדמי - יינתן פטור מאגרת הבקשה ומאגרת טיפול בעד 4 שעות עבודה.",
      "אדם בעל זכאות לקבלת קיצבה - יינתן פטור מאגרת הבקשה ומאגרת טיפול בעד 4 שעות עבודה.",
    ],
    exemptionsNote:
      "פטור מאגרת הטיפול בעד 4 שעות הינו מעבר ל-3 השעות הניתנות בכל מקרה במסגרת הגשת הבקשה (כלומר, יינתן פטור עבור 7 שעות עבודה).",
    exemptionsContact: "להגשת בקשת חופש מידע ולשאלות בנושא יש לפנות לממונה על החוק מר והיב תומא לפי הפרטים לעיל.",
  },
  ar: {
    heroSubtitle: "المسؤول عن حرية المعلومات في المجلس المحلي كفر ياسيف",
    staffName: "והיב תומא",
    section1Title: "قانون حرية المعلومات لسنة 1998",
    section1Paragraphs: [
      "سُنّ قانون حرية المعلومات لسنة 1998 بتاريخ 19 مايو 1998 ودخل حيز التنفيذ بعد عام من ذلك. أرسى القانون حق كل مواطن أو مقيم في الحصول على المعلومات الموجودة بحوزة الجهات العامة.",
      "ينص القانون على أن القاعدة هي أن تستجيب الجهة العامة للطلب بالإيجاب، إلا إذا كان كشف المعلومات سيمس بمصلحة أخرى مثل أمن الدولة أو خصوصية الأفراد أو الأسرار التجارية وما شابه.",
      "تتم دراسة الطلب ضمن المهل الزمنية المحددة في القانون. لذا يتعين على الجهة العامة الرد على مقدم الطلب خلال 30 يوماً، إلا أنه يجوز للمسؤول أو لرئيس الجهة العامة، عند الحاجة، تمديد فترة الرد لمعالجة الطلب حتى 90 يوماً إضافياً.",
      "في الحالات التي تتعلق فيها المعلومات بطرف ثالث، يتعين على الجهة العامة التوجه إلى ذلك الطرف وتمكينه من الاعتراض على تسليم المعلومات. تؤدي مخاطبة الطرف الثالث إلى تمديد مدة معالجة الطلب 21 يوماً إضافياً، وفي حال رُفض موقف الطرف الثالث، يُمنح الحق في الطعن بقرار الجهة العامة، ولا تُسلَّم المعلومات لمقدم الطلب حتى استنفاد هذا الحق.",
    ],
    section1LinkText: "يمكن الاطلاع على معلومات تفصيلية حول القانون في موقع الوحدة الحكومية لحرية المعلومات (يفتح في نافذة جديدة)",
    section2Title: "رسوم حرية المعلومات",
    section2Paragraphs: [
      "بموجب قانون تنظيم الرسوم الجديدة لسنة 1999، تتم معالجة طلب الحصول على المعلومات بعد دفع رسم الطلب وتعهد (رابط لنموذج التعهد) يلتزم فيه مقدم/ة الطلب بتحمل تكلفة معالجة الطلب وإصدار المعلومات المطلوبة.",
      "يُعفى الشخص الذي يطلب معلومات عن نفسه وحقوقه من رسم الطلب ومن رسم المعالجة حتى 4 ساعات عمل، ابتداءً من الساعة الثالثة (أي يُجبى رسم المعالجة اعتباراً من الساعة السابعة من المعالجة). تفاصيل مبالغ الرسوم متوفرة في موقع خدمة الدفع الحكومية.",
      "يمكن دفع رسم الطلب عبر حساب بنكي رقمه: 153729 فرع 691 رقم 17 أو في مكاتب المجلس.",
    ],
    section3Title: "نموذج طلب الحصول على معلومات",
    requestFormTitle: "نموذج طلب الحصول على معلومات",
    section4Title: "رسم تقديم طلب المعلومات",
    section4Intro: "لتقديم طلب حرية معلومات ولأي استفسارات بهذا الشأن، يرجى التوجه إلى المسؤول عن تطبيق القانون السيد: והיב תומא",
    contactLabels: {
      phone: "الهاتف:",
      fax: "الفاكس:",
      address: "العنوان:",
      addressValue: "كفر ياسيف - ص.ب 994",
      email: "البريد الإلكتروني",
    },
    section5Title: "منح الإعفاءات",
    exemptions: [
      "المعلومات الشخصية - يُمنح إعفاء من رسم الطلب ومن رسم المعالجة حتى 4 ساعات عمل.",
      "جمعية مسجلة وفق مفهومها في قانون الجمعيات - يُمنح إعفاء من رسم الطلب ومن رسم المعالجة حتى 4 ساعات عمل.",
      "شخص يطلب معلومات لغرض بحث أكاديمي - يُمنح إعفاء من رسم الطلب ومن رسم المعالجة حتى 4 ساعات عمل.",
      "شخص مستحق لتلقي راتب تقاعدي - يُمنح إعفاء من رسم الطلب ومن رسم المعالجة حتى 4 ساعات عمل.",
    ],
    exemptionsNote:
      "الإعفاء من رسم المعالجة حتى 4 ساعات يُضاف إلى الساعات الثلاث الممنوحة في كل الأحوال عند تقديم الطلب (أي يُمنح إعفاء عن 7 ساعات عمل).",
    exemptionsContact: "لتقديم طلب حرية معلومات ولأي استفسارات بهذا الشأن، يرجى التوجه إلى المسؤول عن تطبيق القانون السيد והיב תומא وفق البيانات أعلاه.",
  },
  en: {
    heroSubtitle: "Freedom of Information Officer at Kafr Yasif Local Council",
    staffName: "והיב תומא",
    section1Title: "Freedom of Information Law, 5758-1998",
    section1Paragraphs: [
      "The Freedom of Information Law, 5758-1998, was enacted on May 19, 1998 and came into force a year later. The law established the right of every citizen or resident to obtain information held by public authorities.",
      "The law provides that, as a rule, an authority must respond favorably to a request unless disclosing the information would harm another interest, such as state security, personal privacy, trade secrets, and the like.",
      "A request is examined within the timeframes set by law. Accordingly, the authority must respond to the applicant within 30 days; however, where necessary, the officer or the head of the public authority may extend the response period by up to an additional 90 days.",
      "Where the information concerns a third party, the authority must approach that party and allow them to object to the release of the information. Contacting a third party extends the handling period by an additional 21 days, and if the third party's objection is rejected, they are entitled to petition against the public authority's decision, and the information will not be disclosed to the applicant until that right has been exhausted.",
    ],
    section1LinkText: "Detailed information about the law can be found on the website of the Government Freedom of Information Unit (opens in a new window)",
    section2Title: "Freedom of Information Fees",
    section2Paragraphs: [
      "Under the New Fee Regulations Law, 5759-1999, a request for information will be handled after payment of a request fee and an undertaking (link to undertaking form) by the applicant to bear the cost of handling the request and producing the requested information.",
      "A person requesting information about themselves and their rights is exempt from the request fee and from the handling fee for up to 4 hours of work, starting from the third hour (i.e., a handling fee will be charged starting from the seventh hour of handling). Details of the fee amounts are available on the government payment service website.",
      "The request fee can be paid via bank account number: 153729, branch 691, account 17, or at the council offices.",
    ],
    section3Title: "Request Form for Information",
    requestFormTitle: "Request Form for Information",
    section4Title: "Fee for Submitting an Information Request",
    section4Intro: "To submit a freedom of information request or for questions on the subject, please contact the officer responsible for the law, Mr. והיב תומא",
    contactLabels: {
      phone: "Phone:",
      fax: "Fax:",
      address: "Address:",
      addressValue: "Kafr Yasif - P.O. Box 994",
      email: "Email address",
    },
    section5Title: "Granting Exemptions",
    exemptions: [
      "Personal information - an exemption will be granted from the request fee and the handling fee for up to 4 hours of work.",
      "A registered nonprofit association within the meaning of the Nonprofit Associations Law - an exemption will be granted from the request fee and the handling fee for up to 4 hours of work.",
      "A person requesting information for academic research purposes - an exemption will be granted from the request fee and the handling fee for up to 4 hours of work.",
      "A person entitled to receive an allowance - an exemption will be granted from the request fee and the handling fee for up to 4 hours of work.",
    ],
    exemptionsNote:
      "The exemption from the handling fee of up to 4 hours is in addition to the 3 hours granted in any case when a request is submitted (i.e., an exemption is granted for 7 hours of work in total).",
    exemptionsContact: "To submit a freedom of information request or for questions on the subject, please contact the officer responsible for the law, Mr. והיב תומא, using the details above.",
  },
};

export function FreedomOfInformationPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle} />

      <div className="mb-6 max-w-sm">
        <StaffCard
          name={c.staffName}
          phone="04-9569807"
          fax="04-9569885"
          email="hofesh-hameida@kafr-yasif.muni.il"
        />
      </div>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Scale} title={c.section1Title}>
          {c.section1Paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
          <a
            href="http://forms.gov.il/globalData/GetSequence/gethtmlform.aspx?formType=hofeshmeyda%40justice.gov.il"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:underline"
          >
            <ExternalLink size={14} aria-hidden="true" />
            {c.section1LinkText}
          </a>
        </NumberedSection>

        <NumberedSection index={2} icon={CreditCard} title={c.section2Title}>
          {c.section2Paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={3} icon={FileText} title={c.section3Title}>
          <DocumentList
            items={[{ title: c.requestFormTitle, href: "/documents/tofes-bakasha-hofesh-hameida.doc" }]}
            locale={locale}
          />
        </NumberedSection>

        <NumberedSection index={4} icon={FileText} title={c.section4Title}>
          <p className="text-sm leading-6 text-ink-600">{c.section4Intro}</p>
          <BulletList
            items={[
              <>
                <strong className="text-ink-900">{c.contactLabels.phone}</strong>{" "}
                <a href="tel:04-9569807" className="text-teal-700 hover:underline">
                  04-9569807
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.contactLabels.fax}</strong> 04-9569885
              </>,
              <>
                <strong className="text-ink-900">{c.contactLabels.address}</strong> {c.contactLabels.addressValue}
              </>,
              <>
                <strong className="text-ink-900">{c.contactLabels.email}</strong>{" "}
                <a href="mailto:hofesh-hameida@kafr-yasif.muni.il" className="text-teal-700 hover:underline">
                  hofesh-hameida@kafr-yasif.muni.il
                </a>
              </>,
            ]}
          />
        </NumberedSection>

        <NumberedSection index={5} icon={UserCheck} title={c.section5Title}>
          <BulletList items={c.exemptions} />
          <p className="text-sm leading-6 text-ink-600">{c.exemptionsNote}</p>
          <p className="text-sm leading-6 text-ink-600">{c.exemptionsContact}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
