import type { LocaleCode } from "../i18n/config";

/**
 * Site-wide configuration — the single source of truth for identity
 * data used across layouts, components and pages (§11 Phase 5).
 *
 * Locale-specific strings (taglines, role lists, UI copy) live in the
 * dictionaries under `src/i18n/dictionaries/`; this file holds only
 * locale-NEUTRAL facts. `astro.config.mjs` repeats the production URL
 * because framework config cannot import app modules — the two values
 * are kept in sync manually and both point at the GitHub Pages origin.
 */
export const SITE = {
  /** Display name used in meta tags, JSON-LD and copy. */
  name: "AmirHo",

  /** Production origin — kept in sync with astro.config.mjs. */
  url: "https://amirho.github.io",

  /** Public contact address. */
  email: "contact@amirho.dev",

  /**
   * Availability switch — the single source behind the
   * AvailabilityBadge (renders nothing when false) and the contact
   * page's availability block. Flip to false when not looking for work;
   * every consumer follows automatically.
   */
  availableForWork: true,

  /**
   * Per-locale résumé PDFs served from /public. Place both files in
   * `public/` (setup guide in README) — the about page links each locale
   * to its own file via getResumePath().
   */
  resume: {
    en: "/resume-en.pdf",
    fa: "/resume-fa.pdf",
  },
} as const;

/** Résumé path for a locale (about page download buttons, §10.5). */
export function getResumePath(locale: LocaleCode): string {
  return SITE.resume[locale];
}
