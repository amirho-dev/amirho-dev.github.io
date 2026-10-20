~/AmirHo

    Web · Mobile · AI — engineered in two languages.

Production portfolio for AmirHo — full-stack developer, mobile & AI engineer.One codebase, two languages: English lives at /, Farsi is mirrored under /fa/with full right-to-left layout, Jalali dates and native copy. Dark and lightthemes, a terminal aesthetic, GSAP motion, and complete technical SEO — shippedas a fully static site on GitHub Pages.

Built with Astro, Tailwind CSS & GSAP.
Features

    Bilingual by construction — one component tree renders both locales; /fa/* pages are thin wrappers passing locale="fa", so content can never drift.
    Real RTL — logical CSS properties everywhere, mirrored directional icons, direction-aware GSAP motion, word-level (never character-level) SplitText for Farsi, RTL-reversed marquee.
    Typed dictionaries — the English dictionary is the type; the Farsi dictionary must satisfy it, so a missing translation fails npm run check instead of shipping a blank.
    Dark / light themes — class-based, no-flash inline bootstrap before first paint, persisted per visitor.
    GSAP motion with escape hatches — context-wrapped, once: true reveals, reduced-motion no-ops, and JS-applied from-states, so no-JS visitors see full content.
    Interactive terminal lab — eleven commands, ↑/↓ history, aria-live output, an ASCII neofetch, and a classic sudo hire-me easter egg.
    Complete SEO — per-locale titles/descriptions, canonical URLs, hreflang (en / fa / x-default), sitemap with i18n alternates, JSON-LD (Person, WebSite, CreativeWork, Article), two RSS feeds, generated OG images.
    A contact form that never fakes success — Web3Forms when configured, a fully-coded mailto: flow when not.
    No stock assets — every image on the site (project mockups, OG art, favicon, logo) is hand-authored SVG.

Tech stack
Layer Choice
Framework Astro 5 (output: 'static'), strict TypeScript
Styling Tailwind CSS v4 via @tailwindcss/vite (CSS-first; @theme tokens in src/styles/global.css)
Animation GSAP 3.13 (ScrollTrigger, SplitText, ScrambleTextPlugin — all free)
Fonts Self-hosted via Fontsource (Inter, Space Grotesk, JetBrains Mono, Vazirmatn)
Content Astro Content Collections + MDX
SEO @astrojs/sitemap (i18n), @astrojs/rss ×2, hand-authored robots.txt, JSON-LD
Form Web3Forms (PUBLIC_FORM_ENDPOINT) with a complete mailto fallback
Analytics Cloudflare Web Analytics (PUBLIC_ANALYTICS_TOKEN), skipped when absent
Deploy GitHub Actions → GitHub Pages
Quick start

Prerequisites: Node.js ≥ 20 and npm.

git clone https://github.com/amirho/amirho.github.io.gitcd amirho.github.ionpm install # also generates package-lock.json — commit it (the deploy workflow uses npm ci)cp .env.example .env # optional: both variables may stay empty (see below)npm run og:generate # renders public/og-en.png + public/og-fa.png (gitignored build artifacts)npm run dev # http://localhost:4321/ (EN) · http://localhost:4321/fa/ (FA, RTL)

Checks before pushing:

npm run check # astro check — 0 errors (this also proves EN/FA dictionary parity)npm run build # static build into dist/npm run preview # serve the built site

Environment variables

Copy .env.example to .env. Both variables are optional — every consumer ships a complete fallback path, so the site is fully functional with an empty .env.
Variable Purpose Behavior when absent
PUBLIC_FORM_ENDPOINT Web3Forms access key for the contact form (create a form at web3forms.com to receive one) The form validates as usual, then composes a prefilled mailto: (subject + body) and opens the visitor's mail app — no network calls, no fake success states
PUBLIC_ANALYTICS_TOKEN Cloudflare Web Analytics beacon token The analytics script is never rendered at all

For production builds via GitHub Actions, set the same values as repository secrets — the deploy workflow maps them into the build environment (see Deploying below). They are non-secret public values, but secrets keep them out of the repo.
Commands
Command What it does
npm run dev Local dev server with HMR
npm run build Static build → dist/
npm run preview Preview the built site
npm run check astro check — TypeScript + content schemas + dictionary parity
npm run og:generate Rasterize src/assets/og-{en,fa}.svg → public/og-{en,fa}.png
Open Graph images

Every page references /og-en.png or /og-fa.png (1200×630) in its OG/Twitter meta. They are build artifacts, not committed files:

    The artwork is hand-authored SVG — src/assets/og-en.svg and src/assets/og-fa.svg. Edit those, never the PNGs.
    npm run og:generate rasterizes them with @resvg/resvg-js.
    resvg renders SVG <text> from font files it is handed — it never sees the site's Fontsource woff2 webfonts. The brand faces therefore come from three @expo-google-fonts/* packages, which ship raw static TTFs (JetBrains Mono, Space Grotesk, Vazirmatn). That is why those dependencies exist: the pages load woff2 via Fontsource, the OG rasterizer loads TTFs via expo-google-fonts — two pipelines, same typefaces. The * version spec on those three packages is deliberate: their versioning is per-font and independent, and your committed package-lock.json pins the exact resolved versions.
    System fonts are not loaded (loadSystemFonts: false), so output is deterministic — identical bytes on any machine. If no TTFs are found, the script exits with a message explaining the fix (escape hatch: drop your own TTFs into scripts/fonts/).

Résumé PDFs

The about page links each locale to its own file — /resume-en.pdf and /resume-fa.pdf. Place both PDFs in public/ and they deploy as-is. (The binary PDFs are not part of this repository; they are personal documents you supply.)
Editing content
Pairing rules — read this first

All launch content ships in both locales, paired by filename:

    src/content/projects/en/shopstream.mdx ⟷ src/content/projects/fa/shopstream.mdx — one case study, two languages. Same rule for blog posts.
    The slug (filename) is the pairing key: it drives the URL (/projects/shopstream · /fa/projects/shopstream) and the hreflang alternates.
    Keep slugs Latin, lowercase, kebab-case.
    Machine fields must match across the pair — domain, stack, year, pubDate, tags. Translated fields (description, role, heroAlt, seo, prose) differ; the numbers must not, or the two locales quietly disagree.
    An entry that exists in only one locale is technically legal (it renders in that locale alone, without alternates) — but this site's contract is bilingual: always add or move both files together.

Adding a project

    Author the mockup: src/assets/projects/<slug>.svg — 16:10 ratio, explicit width/height attributes (the content schema's image() helper needs them), dark canvas, terminal palette (#0C1219, #16212B, #22303D, #FE7743, #93A7B4, #E8EDF2).
    Create src/content/projects/en/<slug>.mdx and src/content/projects/fa/<slug>.mdx with the frontmatter below; both point at the same SVG.
    Done — the projects grid, the filter bar, the case-study route, the home featured section and the Lab projects command all pick the new entry up automatically.

Adding a blog post

Create src/content/blog/en/<slug>.mdx and src/content/blog/fa/<slug>.mdx. Headings (##, ###) feed the desktop table of contents. Keep code blocks byte-identical across locales — code is the single source of truth; only the prose is translated. Site standard: ≥600 words per locale.
Frontmatter reference — projects
Field Type Notes
title string Brand-style Latin name (same in both locales)
description string 1–2 sentence summary — localized
role string Role line for the meta row — localized
domain web | mobile | ai Filter domain — shared
stack string[] Latin tech names — shared
year number Gregorian — shared; Latin digits in both locales
image path ../../../assets/projects/<slug>.svg — the same file for both locale entries
heroAlt string Translated alt text
locale en | fa Must match the file's folder
draft boolean Default false; drafts vanish from every list, route and feed
seo.title, seo.description strings Localized per-locale page meta
Frontmatter reference — blog
Field Type Notes
title string Localized post title
description string Localized excerpt (lists, SEO, RSS)
pubDate date Gregorian; rendered Gregorian (EN) / Jalali with Persian digits (FA)
updated date? Optional meaningful-update date
tags string[] Latin topic tags — never localized
locale en | fa Must match the file's folder
draft boolean Default false
seo.title, seo.description strings Localized per-locale page meta
UI copy & dictionaries

All interface strings live in src/i18n/dictionaries/. en.ts defines the Dictionary type; fa.ts must satisfy it — npm run check enforces parity, so add every new key to both files in the same change. Farsi style rules: proper نیم‌فاصله, Persian punctuation (، ؛ ؟), guillemets (« »), no letter-spacing or uppercase transforms on Persian, Persian digits in prose but Latin digits for versions, stats and code. Values that are intentionally Latin in both files (terminal commands, tech names, machine output) carry a comment saying so.
Site data files
File Owns
src/config/site.ts Name, production URL, email, availability switch, résumé paths
src/data/skills.ts Skills matrix (daily / comfortable / exploring) + marquee items
src/data/socials.ts Social channels (URLs, handles, icons)
src/data/experience.ts About-page timeline milestones (bilingual)
Deploying to GitHub Pages

    The repository must be named amirho.github.io (a user site) — that is what site: 'https://amirho.github.io' in astro.config.mjs and SITE.url in src/config/site.ts assume, and it serves the site at the domain root with clean canonical URLs.
    Commit package-lock.json — the workflow installs with npm ci, which requires it.
    In the repository: Settings → Pages → Build and deployment → Source: GitHub Actions.
    Push to main. .github/workflows/deploy.yml runs: checkout → Node → npm ci → npm run og:generate → npm run build → upload → deploy. The first run takes a minute; Pages serves the static output afterwards.
    Optional build-time env: add PUBLIC_FORM_ENDPOINT / PUBLIC_ANALYTICS_TOKEN as repository secrets; the workflow maps them into the build environment so the deployed site gets the live form and analytics paths.

Custom domain (optional)

If you move off amirho.github.io: update site in astro.config.mjs, SITE.url in src/config/site.ts, and the sitemap URL in public/robots.txt, then add your CNAME file to public/. GitHub Pages serves under the new origin from then on.
QA checklist

Run before every release (mirrors the project's global definition of done):

     npm run check → 0 errors · npm run build → success
     npm run og:generate → both PNGs at 1200×630
     All ~26 URLs render in both locales (spot-check home, a case study, a post, lab, 404)
     hreflang pairs point both directions, x-default → EN; /sitemap-index.xml carries en/fa alternates
     /rss.xml and /fa/rss.xml parse, with <language>en</language> / <language>fa</language>
     public/robots.txt points at the sitemap index
     Theme: toggle persists; reload without flash, in both locales
     RTL sweep 320 → 1920 px on /fa/: arrows mirrored, terminal windows and code blocks stay LTR
     Keyboard: skip link, tab order, visible focus, mobile-nav focus trap, filter chips, terminal
     Reduced motion: no hero boot intro, marquee frozen, timeline rail fully drawn
     Contact form behaves in both modes (with and without PUBLIC_FORM_ENDPOINT)
     Forbidden-token sweep over the repository returns zero matches (the R3 list from the build brief)
     Lighthouse ≥ 95 across all four categories, both locales

Troubleshooting

    og:generate reports no TTF fonts → run npm install (the @expo-google-fonts/* packages provide them), or drop your own TTFs into scripts/fonts/.
    npm ci fails in the workflow → package-lock.json is missing or out of sync; run npm install locally and commit the lockfile.
    OG images 404 locally → they are gitignored artifacts; run npm run og:generate once.
    Farsi shows boxes in the PNG → the Vazirmatn TTFs were not registered; check the Fonts registered: line the script prints.

Project structure

amirho-portfolio/├── .github/workflows/deploy.yml├── .env.example├── .gitignore├── .vscode/extensions.json├── astro.config.mjs├── package.json├── tsconfig.json├── README.md├── scripts/generate-og.mjs├── public/│ ├── favicon.svg│ ├── robots.txt│ └── assets/logo.svg├── src/│ ├── env.d.ts│ ├── content.config.ts│ ├── config/site.ts│ ├── i18n/│ │ ├── config.ts│ │ ├── utils.ts│ │ └── dictionaries/{en.ts, fa.ts}│ ├── styles/global.css│ ├── lib/{gsap.ts, reveal.ts}│ ├── layouts/{BaseLayout.astro, ProjectLayout.astro, BlogPostLayout.astro}│ ├── data/{skills.ts, experience.ts, socials.ts}│ ├── assets/│ │ ├── og-en.svg│ │ ├── og-fa.svg│ │ └── projects/{shopstream.svg, parslingo.svg, syswatch.svg}│ ├── components/│ │ ├── SEO.astro, JsonLd.astro, Header.astro, Footer.astro│ │ ├── ThemeToggle.astro, LanguageSwitcher.astro, MobileNav.astro│ │ ├── LocalizedLink.astro, SectionHeading.astro, Button.astro│ │ ├── TagChip.astro, ProjectCard.astro, TechMarquee.astro│ │ ├── TerminalWindow.astro, AvailabilityBadge.astro│ │ ├── CopyEmailButton.astro, ContactForm.astro│ │ ├── TimelineItem.astro, SkillGroup.astro│ │ ├── home/{Hero.astro, TechMarquee.astro, FeaturedProjects.astro, ExpertiseGrid.astro, LatestPosts.astro, CtaBanner.astro}│ │ └── lab/Terminal.ts│ ├── content/│ │ ├── projects/en/{shopstream, parslingo, syswatch}.mdx│ │ ├── projects/fa/{shopstream, parslingo, syswatch}.mdx│ │ ├── blog/en/{bilingual-astro-rtl, ansible-server-hardening, prompting-vs-finetuning}.mdx│ │ └── blog/fa/{bilingual-astro-rtl, ansible-server-hardening, prompting-vs-finetuning}.mdx│ └── pages/│ ├── index.astro, about.astro, lab.astro, contact.astro, 404.astro│ ├── projects/{index.astro, [slug].astro}│ ├── blog/{index.astro, [slug].astro}│ ├── rss.xml.ts│ └── fa/│ ├── index.astro, about.astro, lab.astro, contact.astro│ ├── projects/{index.astro, [slug].astro}│ ├── blog/{index.astro, [slug].astro}│ └── rss.xml.ts

© 2025 AmirHo — all rights reserved.
