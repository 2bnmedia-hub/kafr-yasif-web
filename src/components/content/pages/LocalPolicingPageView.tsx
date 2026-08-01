import { Siren, Users, Phone } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  heroSubtitle: string;
  heroIntro: string;
  contactTitle: string;
  inspectorsTitle: string;
  inspectors: string[];
  activityTitle: string;
  activityText: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    heroSubtitle: "שיטור מקומי – מועצה מקומית כפר יאסיף",
    heroIntro:
      "יחידת השיטור מקומי היא יחידה הפועלת בשיתוף פעולה בין משטרת ישראל לבין הרשות המקומית, ומטרתה לחזק את תחושת הביטחון האישי של התושבים ולשמור על הסדר הציבורי במרחב המקומי. היחידה מתמקדת באכיפת החוק ובטיפול בעבירות הפוגעות באיכות החיים של התושבים, כגון רעש, ונדליזם, הפרות סדר ועבירות על חוקי העזר המקומי. באמצעות סיורים, תגובה מהירה לאירועים ועבודה משותפת עם הקהילה, פועלת היחידה למניעת עבירות, לשמירה על הסדר הציבורי ולהגברת תחושת הביטחון בעיר.",
    contactTitle: "טלפון ליצירת קשר",
    inspectorsTitle: "הפקחים המוסמכים כפקחים מקומיים",
    inspectors: ["מגד סביתה", "מועתסם נג'ם", "באסל נג'ם", "נאג'י עביד", "תמיר עזאם"],
    activityTitle: "פעילות הפקחים",
    activityText:
      "הפקחים פועלים ברחבי היישוב לאורך כל שעות הפעילות, מעניקים מענה מהיר לפניות הציבור ומבצעים אכיפה בהתאם להנחיות ולחוקי העזר של המועצה.",
  },
  ar: {
    heroSubtitle: "الشرطة المحلية – المجلس المحلي كفر ياسيف",
    heroIntro:
      "وحدة الشرطة المحلية هي وحدة تعمل بالتعاون بين شرطة إسرائيل والسلطة المحلية، وهدفها تعزيز الشعور بالأمن الشخصي لدى السكان والحفاظ على النظام العام في المجال المحلي. تركز الوحدة على إنفاذ القانون ومعالجة المخالفات التي تمس بجودة حياة السكان، مثل الضجيج والتخريب وخرق النظام ومخالفة القوانين المساعدة المحلية. من خلال الدوريات والاستجابة السريعة للأحداث والعمل المشترك مع المجتمع، تعمل الوحدة على منع المخالفات، والحفاظ على النظام العام، وتعزيز الشعور بالأمان في البلدة.",
    contactTitle: "هاتف للتواصل",
    inspectorsTitle: "المفتشون المعتمدون كمفتشين محليين",
    inspectors: ["מגד סביתה", "מועתסם נג'ם", "באסל נג'ם", "נאג'י עביד", "תמיר עזאם"],
    activityTitle: "نشاط المفتشين",
    activityText:
      "يعمل المفتشون في أنحاء البلدة على مدار ساعات العمل، ويقدمون استجابة سريعة لطلبات الجمهور وينفذون الإنفاذ وفق تعليمات وقوانين المجلس المساعدة.",
  },
  en: {
    heroSubtitle: "Local Policing – Kafr Yasif Local Council",
    heroIntro:
      "The Local Policing Unit operates in cooperation between the Israel Police and the local authority, with the goal of strengthening residents' sense of personal security and maintaining public order in the local area. The unit focuses on law enforcement and handling offenses that affect residents' quality of life, such as noise, vandalism, disturbances of the peace and violations of local bylaws. Through patrols, rapid response to incidents and joint work with the community, the unit acts to prevent offenses, maintain public order and increase the sense of safety in the town.",
    contactTitle: "Contact Phone Number",
    inspectorsTitle: "Inspectors Authorized as Local Inspectors",
    inspectors: ["מגד סביתה", "מועתסם נג'ם", "באסל נג'ם", "נאג'י עביד", "תמיר עזאם"],
    activityTitle: "Inspectors' Activity",
    activityText:
      "The inspectors operate throughout the town during all operating hours, providing a rapid response to public inquiries and carrying out enforcement in accordance with the council's guidelines and bylaws.",
  },
};

export function LocalPolicingPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.heroSubtitle}>
        {c.heroIntro}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={Phone} title={c.contactTitle}>
          <p className="text-sm leading-6 text-ink-600">
            <a href="tel:050-2735589" className="text-teal-700 hover:underline">
              050-2735589
            </a>
          </p>
        </NumberedSection>

        <NumberedSection index={2} icon={Users} title={c.inspectorsTitle}>
          <BulletList items={c.inspectors} />
        </NumberedSection>

        <NumberedSection index={3} icon={Siren} title={c.activityTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.activityText}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
