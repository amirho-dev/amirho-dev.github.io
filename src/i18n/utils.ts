/**
 * i18n utilities — translation access, path localization, hreflang
 * generation, date formatting and string templating (build brief §7).
 *
 * Design note: `t()` returns the FULLY-TYPED dictionary object rather
 * than taking a dot-path string. Dot access (`dict.nav.home`) is checked
 * at compile time and key parity between locales is enforced by
 * `fa.ts` satisfying `Dictionary`.
 */
import en from "./dictionaries/en";
import fa from "./dictionaries/fa";
import type { Dictionary } from "./dictionaries/en";
import {
  defaultLocale,
  localeConfigs,
  locales,
  type LocaleCode,
} from "./config";

const dictionaries: Record<LocaleCode, Dictionary> = { en, fa };

/**
 * Type guard for runtime locale strings (e.g. `Astro.currentLocale`).
 *
 * @example
 * const locale: LocaleCode = isLocale(input) ? input : defaultLocale;
 */
export function isLocale(value: unknown): value is LocaleCode {
  return (
    typeof value === "string" && (locales as readonly string[]).includes(value)
  );
}

/**
 * Returns the fully-typed dictionary for a locale.
 *
 * @example
 * const dict = t('fa');
 * dict.nav.about; // «درباره» — checked at compile time
 */
export function t(locale: LocaleCode): Dictionary {
  return dictionaries[locale];
}

/**
 * Replaces `{token}` placeholders in a dictionary template string.
 * Unknown tokens are left untouched (never rendered as "undefined").
 *
 * @example
 * format(dict.lab.unknownCommand, { command: 'rm -rf' });
 */
export function format(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}

/**
 * Normalizes any internal path to its canonical English (unprefixed)
 * form: strips a leading `/fa` segment and any trailing slash.
 *
 * @example
 * stripLocalePrefix('/fa/projects/'); // '/projects'
 * stripLocalePrefix('/fa');            // '/'
 */
export function stripLocalePrefix(path: string): string {
  let clean = path;
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }
  if (clean === "/fa") return "/";
  if (clean.startsWith("/fa/")) return clean.slice(3) || "/";
  return clean || "/";
}

/**
 * Localizes an internal path for a target locale:
 * English paths stay bare, Farsi paths gain the `/fa` prefix.
 * External URLs (`https:`, `mailto:`, `tel:`), protocol-relative URLs
 * and pure `#anchor`s pass through untouched.
 *
 * @example
 * getLocalizedPath('/projects', 'fa');   // '/fa/projects'
 * getLocalizedPath('/fa/blog', 'en');    // '/blog'
 */
export function getLocalizedPath(
  path: string,
  targetLocale: LocaleCode,
): string {
  if (
    /^[a-z][a-z0-9+.-]*:/i.test(path) ||
    path.startsWith("//") ||
    path.startsWith("#")
  ) {
    return path;
  }
  const base = stripLocalePrefix(path);
  if (targetLocale === defaultLocale) return base;
  return `/${targetLocale}${base === "/" ? "" : base}`;
}

/** One hreflang alternate entry for the page `<head>`. */
export interface AlternateLink {
  hreflang: "en" | "fa" | "x-default";
  url: string;
}

/**
 * Builds the hreflang set for a page path (§8): `en` + `fa` +
 * `x-default → en`. Both directions point at the paired URL, so the
 * set is only emitted for pages that exist in both locales — which is
 * every page in this build (§7.7).
 *
 * @param path Current page path (locale-prefixed or not).
 * @param site Site origin, e.g. 'https://amirho.github.io' (Astro.site.href).
 */
export function getAlternates(path: string, site: string): AlternateLink[] {
  const base = stripLocalePrefix(path);
  const origin = site.replace(/\/+$/, "");
  return [
    { hreflang: "en", url: `${origin}${getLocalizedPath(base, "en")}` },
    { hreflang: "fa", url: `${origin}${getLocalizedPath(base, "fa")}` },
    { hreflang: "x-default", url: `${origin}${getLocalizedPath(base, "en")}` },
  ];
}

/**
 * Locale-aware date formatting: long Gregorian for English
 * ("March 4, 2025"), long Jalali with Persian digits for Farsi
 * («۱۵ اسفند ۱۴۰۳») — driven by the `intlCode` in the locale config.
 * Dates render in UTC so static builds are deterministic.
 */
export function formatDate(date: Date, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(localeConfigs[locale].intlCode, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
