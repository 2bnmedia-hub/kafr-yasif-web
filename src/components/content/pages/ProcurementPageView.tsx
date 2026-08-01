import { ShoppingCart, ClipboardList, Handshake, Phone } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  subtitle: string;
  vision: { title: string; paragraphs: string[] };
  responsibilities: { title: string; items: string[] };
  supplierInfo: { title: string; paragraphs: string[] };
  contact: {
    title: string;
    intro: string;
    managerLabel: string;
    officePhoneLabel: string;
    mobilePhoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hoursText: string;
  };
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "מחלקת רכש – מועצה מקומית כפר יאסיף",
    vision: {
      title: "חזון המחלקה",
      paragraphs: [
        "מחלקת הרכש וההתקשרויות במועצה המקומית אמונה על ניהול, תכנון ובקרה של כלל תהליכי הרכש, ההצטיידות וההתקשרויות של המועצה עם ספקים, קבלנים ונותני שירותים. פעילות המחלקה מתבצעת בהתאם להוראות הדין, לתקנות הרשויות המקומיות ולנהלי המינהל הציבורי, תוך הקפדה על עקרונות של שקיפות, יעילות, מקצועיות ושוויון הזדמנויות.",
        "המחלקה מהווה גורם מרכזי בתהליכי הניהול הארגוניים של המועצה, ופועלת להבטיח אספקה סדירה ואיכותית של ציוד, שירותים ועבודות הנדרשים להפעלת מחלקות המועצה ומוסדותיה. זאת לצד ניהול תקין ואחראי של משאבי הציבור, תוך שמירה על סטנדרטים מקצועיים גבוהים ועמידה בדרישות החוק והנהלים המחייבים.",
        "במסגרת פעילותה, אחראית המחלקה על פרסום וניהול מכרזים, קבלת ובחינת הצעות מחיר, ליווי הליכי התקשרות עם ספקים וקבלנים, פיקוח ובקרה על ביצוע הזמנות ואספקות, וכן על ניהול מאגר ספקים והבטחת תהליכי עבודה מסודרים ויעילים.",
        "מחלקת הרכש פועלת בשיתוף פעולה הדוק עם כלל אגפי המועצה ויחידותיה, במטרה לספק מענה מקצועי ואיכותי לצורכי הארגון, לייעל את תהליכי העבודה ולחזק את עקרונות המינהל התקין והשקיפות הציבורית.",
      ],
    },
    responsibilities: {
      title: "תחומי אחריות מרכזיים",
      items: [
        "ניהול ותכנון מערך הרכש וההתקשרויות של המועצה.",
        "פרסום מכרזים וניהול הליכי התקשרות בהתאם לדין ולנהלים.",
        "טיפול בהצעות מחיר ובחירת ספקים וקבלנים.",
        "ניהול ובקרה על הזמנות, אספקות והסכמי התקשרות.",
        "תחזוקה וניהול של מאגר ספקים.",
        "פיקוח על יישום נהלי רכש ושמירה על שקיפות ומינהל תקין.",
        "מתן ליווי מקצועי לאגפי המועצה בנושאי רכש והתקשרויות.",
      ],
    },
    supplierInfo: {
      title: "מידע לספקים",
      paragraphs: [
        "מועצת כפר יאסיף רואה בספקיה שותפים לדרך. אנו מזמינים ספקים ונותני שירות להגיש מועמדות להצטרפות למאגר הספקים שלנו.",
        "לתשומת לבכם: כל התקשרות עם המועצה מותנית בהצגת אישורים ניהוליים תקינים (ניהול ספרים, ניכוי מס במקור וכדומה).",
      ],
    },
    contact: {
      title: "צור קשר",
      intro: "נשמח לעמוד לשירותכם בשעות הפעילות בתיאום מראש.",
      managerLabel: "מנהל המחלקה:",
      officePhoneLabel: "טלפון משרד:",
      mobilePhoneLabel: "טלפון נייד:",
      emailLabel: 'דוא"ל:',
      hoursLabel: "שעות קבלת קהל:",
      hoursText: "ימים ב'-ה', בין השעות 08:30 – 15:00 (בתיאום מראש).",
    },
  },
  ar: {
    subtitle: "قسم المشتريات – المجلس المحلي كفر ياسيف",
    vision: {
      title: "رؤية القسم",
      paragraphs: [
        "يتولى قسم المشتريات والتعاقدات في المجلس المحلي إدارة وتخطيط ومراقبة جميع عمليات الشراء والتزويد والتعاقدات التي يجريها المجلس مع الموردين والمقاولين ومقدمي الخدمات. تُنفَّذ أعمال القسم وفق أحكام القانون وأنظمة السلطات المحلية وتعليمات الإدارة العامة، مع الحرص على مبادئ الشفافية والكفاءة والمهنية وتكافؤ الفرص.",
        "يُشكّل القسم عنصراً مركزياً في عمليات الإدارة التنظيمية للمجلس، ويعمل على ضمان تزويد منتظم وعالي الجودة بالمعدات والخدمات والأعمال اللازمة لتشغيل أقسام المجلس ومؤسساته، إلى جانب إدارة سليمة ومسؤولة لموارد الجمهور، مع الحفاظ على معايير مهنية عالية والامتثال لمتطلبات القانون والتعليمات الملزمة.",
        "يتولى القسم في إطار عمله نشر وإدارة المناقصات، واستلام وفحص عروض الأسعار، ومرافقة إجراءات التعاقد مع الموردين والمقاولين، والإشراف والرقابة على تنفيذ الطلبيات والتزويدات، فضلاً عن إدارة سجل الموردين وضمان سير العمل بشكل منظم وفعال.",
        "يعمل قسم المشتريات بتعاون وثيق مع جميع أقسام المجلس ووحداته، بهدف تقديم استجابة مهنية وعالية الجودة لاحتياجات المؤسسة، وتحسين إجراءات العمل، وتعزيز مبادئ الإدارة السليمة والشفافية العامة.",
      ],
    },
    responsibilities: {
      title: "مجالات المسؤولية الرئيسية",
      items: [
        "إدارة وتخطيط منظومة المشتريات والتعاقدات في المجلس.",
        "نشر المناقصات وإدارة إجراءات التعاقد وفق القانون والتعليمات.",
        "التعامل مع عروض الأسعار واختيار الموردين والمقاولين.",
        "إدارة ومراقبة الطلبيات والتزويدات واتفاقيات التعاقد.",
        "صيانة وإدارة سجل الموردين.",
        "الإشراف على تطبيق إجراءات الشراء والحفاظ على الشفافية والإدارة السليمة.",
        "تقديم مرافقة مهنية لأقسام المجلس في مواضيع الشراء والتعاقدات.",
      ],
    },
    supplierInfo: {
      title: "معلومات للموردين",
      paragraphs: [
        "يعتبر مجلس كفر ياسيف موردّيه شركاء في المسيرة. ندعو الموردين ومقدمي الخدمات إلى تقديم طلباتهم للانضمام إلى سجل الموردين لدينا.",
        "للعلم: كل تعاقد مع المجلس مشروط بتقديم المصادقات الإدارية السليمة (مسك الدفاتر، خصم الضريبة من المصدر وما شابه).",
      ],
    },
    contact: {
      title: "اتصلوا بنا",
      intro: "يسعدنا خدمتكم خلال ساعات العمل وبالتنسيق المسبق.",
      managerLabel: "مدير القسم:",
      officePhoneLabel: "هاتف المكتب:",
      mobilePhoneLabel: "الهاتف الجوال:",
      emailLabel: "البريد الإلكتروني:",
      hoursLabel: "ساعات استقبال الجمهور:",
      hoursText: "أيام الاثنين إلى الخميس، بين الساعة 08:30 – 15:00 (بالتنسيق المسبق).",
    },
  },
  en: {
    subtitle: "Procurement Department – Kafr Yasif Local Council",
    vision: {
      title: "Department Vision",
      paragraphs: [
        "The Council's Procurement and Contracts Department is responsible for managing, planning and overseeing all of the Council's procurement, supply and contracting processes with suppliers, contractors and service providers. The department operates in accordance with the law, local authority regulations and public administration procedures, while upholding the principles of transparency, efficiency, professionalism and equal opportunity.",
        "The department is a central factor in the Council's organizational management processes, working to ensure a regular, high-quality supply of equipment, services and works required to operate the Council's departments and institutions, alongside proper and responsible management of public resources, while maintaining high professional standards and complying with all applicable legal and procedural requirements.",
        "As part of its activity, the department is responsible for publishing and managing tenders, receiving and reviewing price quotes, guiding contracting processes with suppliers and contractors, overseeing and monitoring the execution of orders and deliveries, and managing the supplier registry to ensure orderly and efficient work processes.",
        "The Procurement Department works in close cooperation with all of the Council's divisions and units, in order to provide a professional, high-quality response to the organization's needs, streamline work processes, and strengthen the principles of proper administration and public transparency.",
      ],
    },
    responsibilities: {
      title: "Key Areas of Responsibility",
      items: [
        "Managing and planning the Council's procurement and contracting operations.",
        "Publishing tenders and managing contracting processes in accordance with law and procedure.",
        "Handling price quotes and selecting suppliers and contractors.",
        "Managing and monitoring orders, deliveries and contracting agreements.",
        "Maintaining and managing the supplier registry.",
        "Overseeing the implementation of procurement procedures and maintaining transparency and proper administration.",
        "Providing professional guidance to the Council's divisions on procurement and contracting matters.",
      ],
    },
    supplierInfo: {
      title: "Information for Suppliers",
      paragraphs: [
        "The Kafr Yasif Council regards its suppliers as partners. We invite suppliers and service providers to apply to join our supplier registry.",
        "Please note: any engagement with the Council is conditional on presenting valid administrative approvals (bookkeeping, withholding tax certificates, etc.).",
      ],
    },
    contact: {
      title: "Contact Us",
      intro: "We are happy to assist you during business hours, by prior arrangement.",
      managerLabel: "Department Manager:",
      officePhoneLabel: "Office Phone:",
      mobilePhoneLabel: "Mobile Phone:",
      emailLabel: "Email:",
      hoursLabel: "Reception Hours:",
      hoursText: "Sunday–Thursday, between 08:30 AM and 3:00 PM (by prior arrangement).",
    },
  },
};

export function ProcurementPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle} />

      <div className="space-y-4">
        <NumberedSection index={1} icon={ShoppingCart} title={c.vision.title}>
          {c.vision.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={2} icon={ClipboardList} title={c.responsibilities.title}>
          <BulletList items={c.responsibilities.items} />
        </NumberedSection>

        <NumberedSection index={3} icon={Handshake} title={c.supplierInfo.title}>
          {c.supplierInfo.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-6 text-ink-600">
              {p}
            </p>
          ))}
        </NumberedSection>

        <NumberedSection index={4} icon={Phone} title={c.contact.title}>
          <p className="text-sm leading-6 text-ink-600">{c.contact.intro}</p>
          <BulletList
            items={[
              <>
                <strong className="text-ink-900">{c.contact.managerLabel}</strong> עסאם פרח
              </>,
              <>
                <strong className="text-ink-900">{c.contact.officePhoneLabel}</strong>{" "}
                <a href="tel:04-9569825" className="text-teal-700 hover:underline">
                  04-9569825
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.contact.mobilePhoneLabel}</strong>{" "}
                <a href="tel:054-4484697" className="text-teal-700 hover:underline">
                  054-4484697
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.contact.emailLabel}</strong>{" "}
                <a href="mailto:isamf@kafr-yasif.muni.il" className="text-teal-700 hover:underline">
                  isamf@kafr-yasif.muni.il
                </a>
              </>,
              <>
                <strong className="text-ink-900">{c.contact.hoursLabel}</strong> {c.contact.hoursText}
              </>,
            ]}
          />
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
