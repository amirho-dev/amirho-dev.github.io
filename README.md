# AmirHo — Portfolio

> Web · Mobile · AI — engineered in two languages.

Production portfolio for **AmirHo** — full-stack developer, mobile & AI engineer. One codebase, two languages: English at `/`, Farsi mirrored under `/fa/` with full right-to-left layout, Jalali dates and native copy. Dark/light themes, terminal aesthetic, GSAP motion, and complete technical SEO — shipped as a fully static site on GitHub Pages.

**Live:** https://amirho-dev.github.io

Built with Astro, Tailwind CSS & GSAP.

---

## Features

- **Bilingual by construction** — one component tree renders both locales; `/fa/*` pages are thin wrappers passing `locale="fa"`, so content can never drift.
- **Real RTL** — logical CSS properties everywhere, mirrored directional icons, direction-aware GSAP motion, word-level (never character-level) SplitText for Farsi, RTL-reversed marquee.
- **Typed dictionaries** — `en.ts` defines the `Dictionary` type; `fa.ts` must satisfy it. A missing translation fails `bun run check` instead of shipping a blank.
- **Dark / light themes** — class-based, no-flash inline bootstrap before first paint, persisted per visitor.
- **GSAP motion with escape hatches** — context-wrapped, `once: true` reveals, reduced-motion no-ops, JS-applied from-states, so no-JS visitors see full content.
- **Interactive terminal lab** — eleven commands, ↑/↓ history, `aria-live` output, ASCII neofetch, and a `sudo hire-me` easter egg.
- **Complete SEO** — per-locale titles/descriptions, canonical URLs, hreflang (en / fa / x-default), sitemap with i18n alternates, JSON-LD (Person, WebSite, CreativeWork, Article), two RSS feeds, generated OG images.
- **Honest contact form** — Web3Forms when configured, a complete `mailto:` fallback when not.
- **Hand-authored assets** — every image (project mockups, OG art, favicon, logo) is custom SVG.

## Tech stack

| Layer     | Choice                                                                                          |
| :-------- | :---------------------------------------------------------------------------------------------- |
| Framework | Astro 7 (`output: 'static'`), strict TypeScript                                                 |
| Styling   | Tailwind CSS v4 via `@tailwindcss/vite` — CSS-first, `@theme` tokens in `src/styles/global.css` |
| Animation | GSAP 3.15 (ScrollTrigger, SplitText, ScrambleTextPlugin — all free)                             |
| Fonts     | Self-hosted via Fontsource (Inter, Space Grotesk, JetBrains Mono, Vazirmatn)                    |
| Content   | Astro Content Collections + MDX                                                                 |
| SEO       | `@astrojs/sitemap` (i18n), `@astrojs/rss` ×2, hand-authored `robots.txt`, JSON-LD               |
| Form      | Web3Forms (`PUBLIC_FORM_ENDPOINT`) with a complete `mailto:` fallback                           |
| Analytics | Cloudflare Web Analytics (`PUBLIC_ANALYTICS_TOKEN`), skipped when absent                        |
| Deploy    | GitHub Actions → GitHub Pages                                                                   |

## Quick start

Prerequisites: **Node.js ≥ 22** and **bun**.

```bash
git clone https://github.com/amirho-dev/amirho-dev.github.io.git
cd amirho-dev.github.io
bun install                             # commit the lockfile — the deploy action uses it
cp .env.example .env                    # optional: both variables may stay empty
bun run og:generate                     # renders public/og-en.png + public/og-fa.png
bun run dev                             # http://localhost:4321/ · http://localhost:4321/fa/
```

Check before pushing:

```bash
bun run check      # astro check — 0 errors (also proves EN/FA dictionary parity)
bun run build      # static build into dist/
bun run preview    # serve the built site
```

## Environment variables

Copy `.env.example` to `.env`. **Both variables are optional** — every consumer ships a complete fallback path.

| Variable                 | Purpose                                   | Behavior when absent                                                                             |
| :----------------------- | :---------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `PUBLIC_FORM_ENDPOINT`   | Web3Forms access key for the contact form | Form validates as usual, then composes a prefilled `mailto:` — no network calls, no fake success |
| `PUBLIC_ANALYTICS_TOKEN` | Cloudflare Web Analytics beacon token     | The analytics script is never rendered                                                           |

For production builds via GitHub Actions, add the same values as **repository secrets** — the deploy workflow maps them into the build environment.

## Commands

| Command               | What it does                                                     |
| :-------------------- | :--------------------------------------------------------------- |
| `bun run dev`         | Local dev server with HMR                                        |
| `bun run build`       | Static build → `dist/`                                           |
| `bun run preview`     | Preview the built site                                           |
| `bun run check`       | `astro check` — TypeScript + content schemas + dictionary parity |
| `bun run og:generate` | Rasterize `src/assets/og-{en,fa}.svg` → `public/og-{en,fa}.png`  |

## Open Graph images

- Sources: `src/assets/og-en.svg`, `src/assets/og-fa.svg` (1200×630) — hand-authored, edit these, never the PNGs.
- Output: `public/og-en.png`, `public/og-fa.png` — gitignored build artifacts.
- Rasterization: `@resvg/resvg-js` with static TTFs from `@expo-google-fonts/*` packages (Fontsource ships woff2; resvg needs TTF). System fonts are disabled so output is deterministic.

## Resume PDFs

Drop `resume-en.pdf` and `resume-fa.pdf` into `public/`. The about page links each locale to its own file. The PDFs are not in the repo — they're personal documents you supply.

## Content authoring

Projects and blog posts are paired by filename across locales:

```
src/content/projects/en/<slug>.mdx  ⟷  src/content/projects/fa/<slug>.mdx
src/content/blog/en/<slug>.mdx      ⟷  src/content/blog/fa/<slug>.mdx
```

- Slugs are Latin, lowercase, kebab-case — they drive the URL and hreflang alternates.
- **Machine fields must match across the pair** — `domain`, `stack`, `year`, `pubDate`, `tags`. Translated fields differ; the numbers must not.
- Always add or move **both** files together.
- Blog standard: ≥600 words per locale, code blocks byte-identical across locales.

**Project frontmatter**

| Field                          | Type                      | Notes                                                              |
| :----------------------------- | :------------------------ | :----------------------------------------------------------------- |
| `title`                        | string                    | Brand-style Latin name (same in both locales)                      |
| `description`                  | string                    | 1–2 sentence summary — localized                                   |
| `role`                         | string                    | Role line for the meta row — localized                             |
| `domain`                       | `web` \| `mobile` \| `ai` | Filter domain — shared                                             |
| `stack`                        | `string[]`                | Latin tech names — shared                                          |
| `year`                         | number                    | Gregorian — shared                                                 |
| `image`                        | path                      | `../../../assets/projects/<slug>.svg` — same file for both locales |
| `heroAlt`                      | string                    | Translated alt text                                                |
| `locale`                       | `en` \| `fa`              | Must match the file's folder                                       |
| `draft`                        | boolean                   | Default `false`; drafts vanish from every list, route and feed     |
| `seo.title`, `seo.description` | strings                   | Localized per-locale page meta                                     |

**Blog frontmatter**

| Field                          | Type         | Notes                                            |
| :----------------------------- | :----------- | :----------------------------------------------- |
| `title`                        | string       | Localized post title                             |
| `description`                  | string       | Localized excerpt (lists, SEO, RSS)              |
| `pubDate`                      | date         | Gregorian; rendered Gregorian (EN) / Jalali (FA) |
| `updated`                      | date?        | Optional meaningful-update date                  |
| `tags`                         | `string[]`   | Latin topic tags — never localized               |
| `locale`                       | `en` \| `fa` | Must match the file's folder                     |
| `draft`                        | boolean      | Default `false`                                  |
| `seo.title`, `seo.description` | strings      | Localized per-locale page meta                   |

## UI copy & dictionaries

All interface strings live in `src/i18n/dictionaries/`. `en.ts` defines the `Dictionary` type; `fa.ts` must satisfy it — `bun run check` enforces parity. Add every new key to both files in the same change.

Farsi style rules: proper نیم‌فاصله, Persian punctuation (، ؛ ؟), guillemets (« »), no letter-spacing or uppercase transforms on Persian, Persian digits in prose but Latin digits for versions, stats and code.

## Site data

| File                     | Owns                                                            |
| :----------------------- | :-------------------------------------------------------------- |
| `src/config/site.ts`     | Name, production URL, email, availability switch, resume paths  |
| `src/data/skills.ts`     | Skills matrix (daily / comfortable / exploring) + marquee items |
| `src/data/socials.ts`    | Social channels (URLs, handles, icons)                          |
| `src/data/experience.ts` | About-page timeline milestones (bilingual)                      |

## Deploying to GitHub Pages

1. **Repository must be named `amirho-dev.github.io`** — that is what `site: 'https://amirho-dev.github.io'` in `astro.config.mjs` and `SITE.url` in `src/config/site.ts` assume. It serves the site at the domain root with clean canonical URLs.
2. **Commit your lockfile** (`bun.lockb` or `bun.lock`) — `withastro/action` auto-detects the package manager from it.
3. **In the repository:** Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. **Push to `main`.** `.github/workflows/deploy.yml` runs: checkout → Node 22 → install → `og:generate` → `build` → upload → deploy. First run takes ~1 minute.
5. **Optional build-time env:** add `PUBLIC_FORM_ENDPOINT` / `PUBLIC_ANALYTICS_TOKEN` as repository secrets; the workflow maps them into the build environment.

## Custom domain (optional)

If you move off `amirho-dev.github.io`, update:

- `site` in `astro.config.mjs`
- `SITE.url` in `src/config/site.ts`
- Sitemap URL in `public/robots.txt`
- Add a `CNAME` file to `public/`

## QA checklist

Before every release:

- `bun run check` → 0 errors · `bun run build` → success
- `bun run og:generate` → both PNGs at 1200×630
- All URLs render in both locales (spot-check home, a case study, a post, lab, 404)
- hreflang pairs point both directions, `x-default` → EN; `/sitemap-index.xml` carries en/fa alternates
- `/rss.xml` and `/fa/rss.xml` parse, with `<language>en</language>` / `<language>fa</language>`
- `public/robots.txt` points at the sitemap index
- Theme: toggle persists; reload without flash, both locales
- RTL sweep 320 → 1920 px on `/fa/`: arrows mirrored, terminal windows and code blocks stay LTR
- Keyboard: skip link, tab order, visible focus, mobile-nav focus trap, filter chips, terminal
- Reduced motion: no hero boot intro, marquee frozen, timeline rail fully drawn
- Contact form behaves in both modes (with and without `PUBLIC_FORM_ENDPOINT`)
- Lighthouse ≥ 95 across all four categories, both locales

## Troubleshooting

| Symptom                            | Fix                                                                                                               |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `og:generate` reports no TTF fonts | Run `bun install` (the `@expo-google-fonts/*` packages provide them), or drop your own TTFs into `scripts/fonts/` |
| Deploy workflow fails on install   | Your lockfile is missing or out of sync — run `bun install` locally and commit it                                 |
| OG images 404 locally              | They're gitignored artifacts — run `bun run og:generate` once                                                     |
| Farsi shows boxes in the PNG       | Vazirmatn TTFs weren't registered — check the "Fonts registered:" line the script prints                          |

## Project structure

```
amirho-dev.github.io/
├── .github/workflows/deploy.yml
├── .env.example
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
├── scripts/generate-og.mjs
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── assets/logo.svg
└── src/
    ├── env.d.ts
    ├── content.config.ts
    ├── config/site.ts
    ├── i18n/
    │   ├── config.ts
    │   ├── utils.ts
    │   └── dictionaries/{en.ts, fa.ts}
    ├── styles/global.css
    ├── lib/{gsap.ts, reveal.ts}
    ├── layouts/{BaseLayout.astro, ProjectLayout.astro, BlogPostLayout.astro}
    ├── data/{skills.ts, experience.ts, socials.ts}
    ├── assets/
    │   ├── og-en.svg
    │   ├── og-fa.svg
    │   └── projects/{}
    ├── components/
    │   ├── SEO.astro, JsonLd.astro, Header.astro, Footer.astro
    │   ├── ThemeToggle.astro, LanguageSwitcher.astro, MobileNav.astro
    │   ├── LocalizedLink.astro, SectionHeading.astro, Button.astro
    │   ├── TagChip.astro, ProjectCard.astro, TechMarquee.astro
    │   ├── TerminalWindow.astro, AvailabilityBadge.astro
    │   ├── CopyEmailButton.astro, ContactForm.astro
    │   ├── TimelineItem.astro, SkillGroup.astro
    │   ├── home/{Hero.astro, TechMarquee.astro, FeaturedProjects.astro, ExpertiseGrid.astro, LatestPosts.astro, CtaBanner.astro}
    │   └── lab/Terminal.ts
    ├── content/
    │   ├── projects/{en,fa}/{}.mdx
    │   └── blog/{en,fa}/{}.mdx
    └── pages/
        ├── index.astro, about.astro, lab.astro, contact.astro, 404.astro
        ├── projects/{index.astro, [slug].astro}
        ├── blog/{index.astro, [slug].astro}
        ├── rss.xml.ts
        └── fa/
            ├── index.astro, about.astro, lab.astro, contact.astro
            ├── projects/{index.astro, [slug].astro}
            ├── blog/{index.astro, [slug].astro}
            └── rss.xml.ts
```

---

© AmirHo — all rights reserved.

---
