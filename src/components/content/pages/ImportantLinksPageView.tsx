import { Landmark, School, Users } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, DocumentList } from "../premium/Shared";
import type { DocumentItem } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  heroSubtitle: string;
  heroIntro: string;
  govLinksTitle: string;
  govLinks: DocumentItem[];
  schoolLinksTitle: string;
  schoolLinks: DocumentItem[];
  parentLinksTitle: string;
  parentLinks: DocumentItem[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "מועצה מקומית כפר יאסיף",
    heroIntro: "בעמוד זה רוכזו קישורים שימושיים לאתרים ממשלתיים, למוסדות חינוך בכפר יאסיף ולמידע להורים.",
    govLinksTitle: "אתרים ממשלתיים שימושיים",
    govLinks: [
      { title: "אורח חיים בריא – משרד החינוך", href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page" },
      { title: "ביטוח לאומי – סניף ירכא", href: "https://www.btl.gov.il/snifim/Pages/Yirka.aspx" },
      { title: "בריאות – כל בריאות", href: "https://call.gov.il/" },
      { title: "פורטל הבחירות לרשויות המקומיות מידע והנחיות לבחירות", href: "https://bchirot-muni.moin.gov.il/APP/" },
    ],
    schoolLinksTitle: "בתי ספר בכפר יאסיף",
    schoolLinks: [
      { title: "בית ספר תיכון על שם יני" },
      { title: "בית ספר יסודי א'" },
      { title: "בית ספר יסודי ב' אלבוסתאן" },
      { title: "בית ספר אלעין - مدرسة العين الاعدادية" },
    ],
    parentLinksTitle: "מידע להורים",
    parentLinks: [
      { title: "תכנית ניצנים" },
      { title: "שלום כיתה א'", href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page" },
      { title: "תמיכה לימודית לילד חולה - תמיכה לימודית – זכאות ובקה\"ש" },
    ],
  },
  ar: {
    heroSubtitle: "المجلس المحلي كفر ياسيف",
    heroIntro: "جُمعت في هذه الصفحة روابط مفيدة لمواقع حكومية، لمؤسسات التعليم في كفر ياسيف ولمعلومات موجهة للأهالي.",
    govLinksTitle: "مواقع حكومية مفيدة",
    govLinks: [
      { title: "أسلوب حياة صحي – وزارة التربية والتعليم", href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page" },
      { title: "التأمين الوطني – فرع يركا", href: "https://www.btl.gov.il/snifim/Pages/Yirka.aspx" },
      { title: "الصحة – كل الصحة", href: "https://call.gov.il/" },
      { title: "بوابة انتخابات السلطات المحلية - معلومات وتعليمات للانتخابات", href: "https://bchirot-muni.moin.gov.il/APP/" },
    ],
    schoolLinksTitle: "المدارس في كفر ياسيف",
    schoolLinks: [
      { title: "المدرسة الثانوية باسم ياني" },
      { title: "المدرسة الابتدائية أ" },
      { title: "المدرسة الابتدائية ب - البستان" },
      { title: "مدرسة العين الإعدادية" },
    ],
    parentLinksTitle: "معلومات للأهالي",
    parentLinks: [
      { title: "برنامج نيتسانيم" },
      { title: "شلوم لصف أ'", href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page" },
      { title: "دعم تعليمي للطفل المريض - دعم تعليمي – أهلية وطلب" },
    ],
  },
  en: {
    heroSubtitle: "Kafr Yasif Local Council",
    heroIntro: "This page brings together useful links to government websites, to educational institutions in Kafr Yasif and to information for parents.",
    govLinksTitle: "Useful Government Websites",
    govLinks: [
      { title: "Healthy Lifestyle – Ministry of Education", href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page" },
      { title: "National Insurance Institute – Yirka Branch", href: "https://www.btl.gov.il/snifim/Pages/Yirka.aspx" },
      { title: "Health – Kol Briut", href: "https://call.gov.il/" },
      { title: "Local Authority Elections Portal – Information and Guidelines", href: "https://bchirot-muni.moin.gov.il/APP/" },
    ],
    schoolLinksTitle: "Schools in Kafr Yasif",
    schoolLinks: [
      { title: "Yani High School" },
      { title: "Elementary School A" },
      { title: "Elementary School B – Al-Bustan" },
      { title: "Al-Ein Junior High School" },
    ],
    parentLinksTitle: "Information for Parents",
    parentLinks: [
      { title: "Nitzanim Program" },
      { title: "Shalom Grade A", href: "https://www.gov.il/he/departments/ministry-of-education/govil-landing-page" },
      { title: "Educational Support for a Sick Child - Educational Support: Eligibility and Application" },
    ],
  },
};

export function ImportantLinksPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroIntro}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Landmark} title={c.govLinksTitle}>
          <DocumentList items={c.govLinks} locale={locale} />
        </NumberedSection>

        <NumberedSection index={2} icon={School} title={c.schoolLinksTitle}>
          <DocumentList items={c.schoolLinks} locale={locale} />
        </NumberedSection>

        <NumberedSection index={3} icon={Users} title={c.parentLinksTitle}>
          <DocumentList items={c.parentLinks} locale={locale} />
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
