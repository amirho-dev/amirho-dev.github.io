import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * Content collections — projects (case studies) and blog posts (§9, §10).
 *
 * Pairing convention (§7.7): every entry exists in BOTH locales under
 * the SAME filename — `en/shopstream.mdx` pairs with `fa/shopstream.mdx`.
 * The glob loader derives ids from the path minus the extension, so ids
 * read `en/shopstream` / `fa/shopstream`; pages split on the locale
 * folder to recover the shared slug. An entry that exists in only one
 * locale is legal but renders in that locale alone (pairing rules are
 * documented in the README).
 *
 * Both schemas carry a `locale` field that MUST match the file's folder —
 * list pages, routes and feeds partition content by that field rather
 * than by string-matching ids.
 */

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      /** Brand-style project name — Latin in both locales (§7.4). */
      title: z.string(),
      /** Localized one-to-two sentence summary for cards and list views. */
      description: z.string(),
      /** Localized role line for the case-study meta row. */
      role: z.string(),
      /** Filter domain (§10.3) — drives the projects index filter bar. */
      domain: z.enum(["web", "mobile", "ai"]),
      /** Latin tech names in display order (§7.4). */
      stack: z.array(z.string()),
      /** Gregorian year — Latin digits in both locales (§7.5). */
      year: z.number().int(),
      /**
       * Hand-authored SVG mockup, shared by BOTH locale files (they
       * reference the same asset under src/assets/projects/). The
       * `image()` helper resolves the frontmatter path relative to this
       * entry and returns ImageMetadata. The SVGs must carry explicit
       * width/height attributes for metadata to resolve.
       */
      image: image(),
      /** Translated alt text for the mockup (required by §11 Phase 5). */
      heroAlt: z.string(),
      /** Language of THIS file — must match its folder. */
      locale: z.enum(["en", "fa"]),
      /** Draft entries are excluded from every list, route and feed. */
      draft: z.boolean().default(false),
      /** Per-locale page title + meta description (§8). */
      seo: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    /** Localized post title. */
    title: z.string(),
    /** Localized excerpt for list views, SEO and RSS. */
    description: z.string(),
    /** Publication date — rendered Gregorian EN / Jalali FA (§7.5). */
    pubDate: z.coerce.date(),
    /** Optional date of a meaningful update. */
    updated: z.coerce.date().optional(),
    /** Latin topic tags — never localized (§7.4). */
    tags: z.array(z.string()).default([]),
    /** Language of THIS file — must match its folder. */
    locale: z.enum(["en", "fa"]),
    /** Draft entries are excluded from every list, route and feed. */
    draft: z.boolean().default(false),
    /** Per-locale page title + meta description (§8). */
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const collections = { projects, blog };
