import { ShieldCheck, ListChecks } from "lucide-react";
import { PageArticle, Breadcrumb, Hero, NumberedSection, BulletList } from "../premium/Shared";
import type { Locale } from "@/i18n/config";

type Props = {
  title: string;
  locale: Locale;
};

type LocaleContent = {
  subtitle: string;
  heroText: string;
  responsibleTitle: string;
  responsiblePoints: string[];
  commitmentTitle: string;
  commitmentParagraph: string;
};

const CONTENT: Record<Locale, LocaleContent> = {
  he: {
    subtitle: "היחידה לביטחון קהילתי – מועצה מקומית כפר יאסיף",
    heroText:
      "היחידה לביטחון קהילתי פועלת לחיזוק תחושת הביטחון האישי ביישוב באמצעות תכנון, פיתוח ויישום של תכניות מניעה, הסברה וחינוך. מטרת היחידה היא להפחית תופעות אלימות, עבריינות ושימוש בחומרים מסוכנים, וליצור קהילה בטוחה, ערכית ומחוברת.",
    responsibleTitle: "היחידה אחראית על",
    responsiblePoints: [
      "יישום תכניות מניעה והסברה בנושאי אלימות, סמים ואלכוהול.",
      "יצירת שיתופי פעולה עם גורמי חינוך, אכיפה, רווחה ועמותות קהילתיות.",
      "תיאום וריכוז כל הפעולות הנדרשות מצד הרשות המקומית והקהילה להשגת מטרות הביטחון הקהילתי.",
      "ייזום פרויקטים ופעילויות המקדמות מעורבות קהילתית ומנהיגות צעירה.",
    ],
    commitmentTitle: "מחויבות היחידה",
    commitmentParagraph:
      "היחידה פועלת מתוך מחויבות לשמירה על איכות החיים של תושבי כפר יאסיף, תוך בניית מרחב בטוח, תומך ומשותף לכל חלקי הקהילה.",
  },
  ar: {
    subtitle: "وحدة الأمن المجتمعي – المجلس المحلي كفر ياسيف",
    heroText:
      "تعمل وحدة الأمن المجتمعي على تعزيز الشعور بالأمان الشخصي في البلدة من خلال تخطيط وتطوير وتنفيذ برامج الوقاية والتوعية والتربية. تهدف الوحدة إلى الحد من ظواهر العنف والجنوح واستخدام المواد الخطرة، وبناء مجتمع آمن وقيمي ومتماسك.",
    responsibleTitle: "الوحدة مسؤولة عن",
    responsiblePoints: [
      "تنفيذ برامج وقاية وتوعية في مواضيع العنف والمخدرات والكحول.",
      "بناء شراكات مع جهات التعليم والإنفاذ والرعاية الاجتماعية والجمعيات الأهلية.",
      "تنسيق وتجميع كافة الإجراءات المطلوبة من السلطة المحلية والمجتمع لتحقيق أهداف الأمن المجتمعي.",
      "المبادرة بمشاريع وأنشطة تعزز المشاركة المجتمعية والقيادة الشبابية.",
    ],
    commitmentTitle: "التزام الوحدة",
    commitmentParagraph:
      "تعمل الوحدة انطلاقاً من التزامها بالحفاظ على جودة حياة سكان كفر ياسيف، مع بناء مساحة آمنة وداعمة ومشتركة لجميع فئات المجتمع.",
  },
  en: {
    subtitle: "Community Security Unit – Kafr Yasif Local Council",
    heroText:
      "The Community Security Unit works to strengthen residents' sense of personal safety through the planning, development and implementation of prevention, awareness and education programs. The Unit's goal is to reduce violence, delinquency and the use of dangerous substances, and to build a safe, values-driven and connected community.",
    responsibleTitle: "The Unit is Responsible For",
    responsiblePoints: [
      "Implementing prevention and awareness programs on violence, drugs and alcohol.",
      "Building partnerships with education, law enforcement, welfare and community organization bodies.",
      "Coordinating and consolidating all actions required from the local authority and the community to achieve community security goals.",
      "Initiating projects and activities that promote community involvement and youth leadership.",
    ],
    commitmentTitle: "The Unit's Commitment",
    commitmentParagraph:
      "The Unit operates out of a commitment to preserving the quality of life of Kafr Yasif's residents, while building a safe, supportive space shared by all parts of the community.",
  },
};

export function CommunitySecurityPageView({ title, locale }: Props) {
  const c = CONTENT[locale];

  return (
    <PageArticle>
      <Breadcrumb title={title} locale={locale} />

      <Hero title={title} subtitle={c.subtitle}>
        {c.heroText}
      </Hero>

      <div className="space-y-4">
        <NumberedSection index={1} icon={ListChecks} title={c.responsibleTitle}>
          <BulletList items={c.responsiblePoints} />
        </NumberedSection>

        <NumberedSection index={2} icon={ShieldCheck} title={c.commitmentTitle}>
          <p className="text-sm leading-6 text-ink-600">{c.commitmentParagraph}</p>
        </NumberedSection>
      </div>
    </PageArticle>
  );
}
