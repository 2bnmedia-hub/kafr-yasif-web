import { contentPages, type ContentPage, type NavSection } from "./pages-data";
import type { Locale } from "@/i18n/config";

const bySlug = new Map<string, ContentPage>(contentPages.map((p) => [p.slug, p]));

export function getPageBySlug(slug: string): ContentPage | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return contentPages.map((p) => p.slug);
}

export function getPagesBySection(section: NavSection): ContentPage[] {
  return contentPages.filter((p) => p.navSection === section);
}

export const sectionLabelsByLocale: Record<Locale, Record<NavSection, string>> = {
  he: {
    "info-center": "מרכזי מידע",
    departments: "מחלקות המועצה",
    "resident-services": "שירותי תושב",
    emergency: "ביטחון וחירום",
    contact: "צור קשר",
    other: "מידע נוסף",
  },
  ar: {
    "info-center": "مركز المعلومات",
    departments: "أقسام المجلس",
    "resident-services": "خدمات المقيمين",
    emergency: "الأمن والطوارئ",
    contact: "اتصل بنا",
    other: "معلومات إضافية",
  },
  en: {
    "info-center": "Information Center",
    departments: "Council Departments",
    "resident-services": "Resident Services",
    emergency: "Security & Emergency",
    contact: "Contact Us",
    other: "More Information",
  },
};

/** Hebrew-only labels for the (Hebrew-only) admin dashboard; public pages use sectionLabelsByLocale. */
export const sectionLabels: Record<NavSection, string> = sectionLabelsByLocale.he;

export const sectionHrefs: Record<NavSection, string> = {
  "info-center": "/מרכזמידע",
  departments: "/מחלקות-המועצה",
  "resident-services": "/שירותי-תושב",
  emergency: "/ביטחוןוחירום",
  contact: "/צור-קשר",
  other: "/",
};
