/**
 * Career timeline data (§10.5) — three milestones, bilingual.
 * The timeline UI (Phase 11) picks the string for the active locale;
 * years are Gregorian and render with Latin digits in both locales
 * (§7.5 stats rule).
 */

/** A localized string pair for inline bilingual data. */
export interface Localized {
  en: string;
  fa: string;
}

export interface ExperienceEntry {
  /** Gregorian year — Latin digits in both locales (§7.5). */
  year: number;
  title: Localized;
  description: Localized;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    year: 2020,
    title: {
      en: "Freelance Web Design & Linux Homelab",
      fa: "طراحی وب فریلنس و هوم‌لب لینوکس",
    },
    description: {
      en: "Started building websites for local businesses while running a Debian homelab on repurposed hardware — learning by breaking things at night and fixing them by morning.",
      fa: "برای کسب‌وکارهای محلی وب‌سایت می‌ساختم و هم‌زمان روی سخت‌افزارهای بازیافتی، هوم‌لب دبیان اجرا می‌کردم — با خراب‌کردن شبانه و درست‌کردن صبحگاهی یاد می‌گرفتم.",
    },
  },
  {
    year: 2022,
    title: {
      en: "Full-Stack Web & Mobile Developer",
      fa: "توسعه‌دهنده فول‌استک وب و موبایل",
    },
    description: {
      en: "Moved from static pages to complete products: typed Node.js APIs, React and Next.js front-ends, and cross-platform mobile apps with React Native and Expo.",
      fa: "از صفحات استاتیک به محصول‌های کامل رسیدم: APIهای تایپ‌شده‌ی Node.js، فرانت‌اندهای React و Next.js و اپ‌های چندسکویی موبایل با React Native و Expo.",
    },
  },
  {
    year: 2024,
    title: {
      en: "Independent Engineer & Content Creator",
      fa: "مهندس مستقل و تولیدکننده محتوا",
    },
    description: {
      en: "Went independent — shipping bilingual products end to end, adding AI engineering to the stack, and writing about all of it in English and Farsi.",
      fa: "مستقل شدم — محصولات دوزبانه را سرتاسری منتشر می‌کنم، مهندسی هوش مصنوعی را به استک اضافه کرده‌ام و درباره‌ی همه‌ی این‌ها به انگلیسی و فارسی می‌نویسم.",
    },
  },
];
