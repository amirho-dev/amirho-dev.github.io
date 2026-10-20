/**
 * Locale configuration — the application-side single source of truth
 * for everything locale-specific (build brief §7.2).
 *
 * Note: `astro.config.mjs` repeats the raw locale codes because Astro's
 * i18n routing is framework-level config; this module is the richer,
 * typed mirror used by every component and util.
 *
 * Font token overrides for Farsi are NOT duplicated here — they live in
 * `src/styles/global.css` §2c under `html[lang='fa']`, keyed off the
 * `htmlLang` field below, keeping typography in exactly one place.
 */

export const locales = ["en", "fa"] as const;
export type LocaleCode = (typeof locales)[number];

export const defaultLocale: LocaleCode = "en";

export interface LocaleConfig {
  /** ISO code — also the URL path segment for non-default locales. */
  code: LocaleCode;
  /** Document direction for this locale. */
  dir: "ltr" | "rtl";
  /** Value for the `<html lang>` attribute (drives font swaps in CSS). */
  htmlLang: string;
  /** Locale name in its own language ("English" / "فارسی"). */
  nativeLabel: string;
  /** Compact label for the language switcher ("EN" / "فارسی") — §7.6. */
  switcherLabel: string;
  /** Open Graph locale code. */
  ogLocale: string;
  /** BCP 47 tag for Intl formatting (Jalali calendar for Farsi). */
  intlCode: string;
}

export const localeConfigs: Record<LocaleCode, LocaleConfig> = {
  en: {
    code: "en",
    dir: "ltr",
    htmlLang: "en",
    nativeLabel: "English",
    switcherLabel: "EN",
    ogLocale: "en_US",
    intlCode: "en-US",
  },
  fa: {
    code: "fa",
    dir: "rtl",
    htmlLang: "fa",
    nativeLabel: "فارسی",
    switcherLabel: "فارسی",
    ogLocale: "fa_IR",
    intlCode: "fa-IR-u-ca-persian",
  },
};

/** Convenience accessor — typed lookup for a locale's full config. */
export function getLocaleConfig(locale: LocaleCode): LocaleConfig {
  return localeConfigs[locale];
}
