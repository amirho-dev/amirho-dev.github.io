/**
 * English dictionary — the canonical shape of every UI string.
 *
 * Rules (build brief §7.3):
 *  · This file DEFINES the `Dictionary` type via `typeof en`.
 *  · `fa.ts` must satisfy the exact same shape — a missing or extra key
 *    is a TypeScript error, so key parity is enforced at build time.
 *  · Do NOT add `as const`: values must widen to `string` / `string[]`
 *    so the Farsi file can supply its own translations.
 *  · Terminal machine output (commands, tech names, some boot lines) is
 *    intentionally Latin in BOTH dictionaries — §7.4 design decision.
 *  · Strings containing dynamic parts use `{token}` placeholders,
 *    rendered with `format()` from `src/i18n/utils.ts`.
 */
const en = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    lab: "Lab",
    contact: "Contact",
  },

  hero: {
    greeting: "Hi, I'm",
    /** Empty in English — grammar needs no tail after the name. */
    nameSuffix: "",
    roles: [
      "Full-Stack Developer",
      "Mobile Developer",
      "AI Engineer",
      "UI/UX Designer",
      "Linux Administrator",
      "Content Creator",
    ],
    tagline:
      "I build fast, accessible, bilingual digital products — from pixel to production.",
    ctaProjects: "View projects",
    ctaContact: "Contact me",
    skipIntro: "Skip intro",
    scroll: "scroll",
    // Terminal boot sequence — commands stay Latin in both locales (§7.4);
    // human-language output text is localized.
    bootWhoamiCmd: "whoami",
    bootWhoamiOut: "amirho — full-stack developer",
    bootSkillsCmd: "cat ~/skills.txt | head -3",
    bootSkillsOut: "typescript · react · astro · node.js · linux",
    bootInitCmd: "./init portfolio --lang=en",
    bootInitOut: "[ ok ] portfolio ready — launching…",
  },

  home: {
    featuredTitle: "Featured projects",
    featuredViewAll: "View all projects",
    expertiseTitle: "What I do",
    expertiseSubtitle:
      "Six disciplines, one engineer — hire a single lane or the whole stack.",
    expertiseItems: [
      {
        title: "Full-Stack Web",
        text: "End-to-end web applications with Next.js, Astro and Node.js — typed, tested, and shipped to production.",
      },
      {
        title: "Mobile Development",
        text: "Cross-platform apps with React Native and Expo that feel at home on iOS and Android — offline-first when it matters.",
      },
      {
        title: "AI Engineering",
        text: "LLM-powered features that survive production: prompt design, RAG pipelines, and knowing when fine-tuning is the wrong answer.",
      },
      {
        title: "UI/UX Design",
        text: "Bilingual, accessible interfaces designed in Figma and built to WCAG — with RTL treated as a first-class citizen, not an afterthought.",
      },
      {
        title: "Linux Administration",
        text: "Servers provisioned and hardened with Ansible, kept honest with monitoring — from a basement homelab to 30-server fleets.",
      },
      {
        title: "Content Creation",
        text: "Technical writing in English and Farsi that turns hard-won debugging hours into guides other people can actually follow.",
      },
    ],
    postsTitle: "Latest posts",
    postsViewAll: "View all posts",
    ctaTitle: "Have a project in mind?",
    ctaText:
      "I'm currently open to freelance and full-time work. Tell me what you're building — I'll bring the stack, the tests and the uptime.",
    ctaButton: "Start a conversation",
  },

  about: {
    title: "About me",
    lead: "Full-stack developer, reluctant sysadmin, and full-time builder of bilingual things. This is the honest version — no agency polish, no inflated titles.",
    storyTitle: "The story so far",
    paragraphs: [
      "I wrote my first line of HTML in 2019, customizing the signature of a game forum. The curiosity never really stopped. By 2020 I was building websites for local businesses and running a Debian homelab on repurposed hardware — breaking things at night, fixing them by morning.",
      "Since then I have gone from static pages to full products: typed APIs with Node.js, React and Next.js front-ends, a React Native app that teaches Farsi offline, and an LLM-backed monitoring tool that reads server logs better than I do.",
      "What I care about has not changed, though: fast, accessible software that respects the user. I sweat the details — Lighthouse scores, keyboard navigation, honest RTL support — because that is the difference between 'works' and 'works well'.",
      "I work in two languages every day, English and Farsi, and I build products that treat both as first-class citizens. When I am not shipping code, I am writing about it — turning hard-won lessons into guides that save other people the debugging.",
    ],
    timelineTitle: "The journey",
    skillsTitle: "An honest skills matrix",
    skillsSubtitle:
      "Not a wall of logos — what I use daily, what I ship with when the job calls for it, and what I'm still learning.",
    skillsDaily: "Daily",
    skillsDailyHint: "Tools I reach for every single day.",
    skillsComfortable: "Comfortable",
    skillsComfortableHint: "Tools I ship with when the job calls for them.",
    skillsExploring: "Exploring",
    skillsExploringHint:
      "Tools I'm actively learning — ask me again in six months.",
    resumeTitle: "Resume",
    resumeText: "One page, no fluff — the same story as above, in PDF form.",
    resumeButton: "Download resume (PDF)",
    resumeOther: "Farsi version also available.",
    creatorTitle: "Beyond the code",
    creatorText:
      "Technical content in English and Farsi — deep dives, hardening checklists, and honest notes about AI in production. Teaching is how I make sure I have actually understood something.",
    creatorLink: "Read the blog",
  },

  projects: {
    title: "Projects",
    subtitle:
      "Three production systems — the problem, the process, and the measured results. No mockups, no vaporware.",
    filterGroup: "Filter projects by domain",
    filterAll: "Show all projects",
    filterWeb: "Show web projects",
    filterMobile: "Show mobile projects",
    filterAi: "Show AI projects",
    resultsCount: "Showing {count} of 3 projects",
    readCaseStudy: "Read case study",
    metaRole: "Role",
    metaStack: "Stack",
    metaYear: "Year",
    metaDomain: "Domain",
    problem: "Problem",
    process: "Process",
    solution: "Solution",
    results: "Results",
    backToAll: "All projects",
    prevProject: "Previous project",
    nextProject: "Next project",
  },

  blog: {
    title: "Blog",
    subtitle:
      "Long-form notes on the things I actually ship — bilingual Astro builds, hardened servers, and AI that earns its place in production.",
    published: "Published",
    updated: "Updated",
    toc: "On this page",
    backToAll: "All posts",
    prevPost: "Previous post",
    nextPost: "Next post",
    tags: "Tags",
  },

  contact: {
    title: "Contact",
    subtitle:
      "A freelance project, a full-time role, or a question about a post — my inbox is open, and I actually reply.",
    formTitle: "Send a message",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "Your email address",
    subjectLabel: "Subject",
    subjectPlaceholder: "Project, collaboration — or just a hello",
    messageLabel: "Message",
    messagePlaceholder:
      "Tell me about your project — goals, timeline and budget.",
    submit: "Send message",
    sending: "Sending…",
    success: "Message sent — I'll get back to you within a day.",
    error: "Something went wrong. Please try again, or email me directly.",
    errNameRequired: "Please enter your name.",
    errEmailRequired: "Please enter your email address.",
    errEmailInvalid: "Please enter a valid email address.",
    errMessageRequired: "Please write a message.",
    errMessageShort: "Your message should be at least 20 characters.",
    fallbackTitle: "Prefer plain email?",
    fallbackText:
      "The form is optional — this button opens your mail app with the subject and message pre-filled.",
    fallbackButton: "Open mail app",
    emailHeading: "Direct email",
    responseTime: "Typical response time: under 24 hours.",
  },

  lab: {
    title: "Lab",
    subtitle:
      "A sandbox terminal that runs entirely in your browser — no server, no cookies, just JavaScript. Type help to begin.",
    hint: "Try help, whoami, neofetch — or sudo hire-me.",
    introLines: [
      "Welcome to the lab — a sandbox terminal running entirely in your browser.",
      'Type "help" to see the available commands.',
    ],
    historyHint: "↑ / ↓ cycles through your command history.",
    helpHeader: "available commands:",
    // help descriptions — lowercase by design (terminal output, §10.7)
    helpDescriptions: {
      help: "show this help",
      whoami: "who is AmirHo?",
      skills: "list my technical skills",
      projects: "list my case studies",
      contact: "show contact channels",
      socials: "show social profiles",
      neofetch: "system info with ASCII art",
      theme: "toggle dark/light theme",
      clear: "clear the terminal",
      ls: "list site sections",
      hireMe: "you know what this does",
    },
    whoamiOutput: [
      "amirho — full-stack developer, mobile & AI engineer.",
      "building bilingual products from pixel to production since 2020.",
    ],
    skillsIntro: "my current stack:",
    projectsIntro: "my case studies:",
    socialsIntro: "find me on:",
    contactIntro: "the fastest way to reach me:",
    contactNote: "replies in under 24 hours — usually much faster.",
    themeSwitched: "Theme switched to {theme}.",
    unknownCommand:
      'bash: {command}: command not found — type "help" for the list.',
    sudoOutput: [
      "[sudo] password for guest: ********",
      "access granted — opening the contact page…",
    ],
    neofetch: {
      os: "OS",
      host: "Host",
      kernel: "Kernel",
      uptime: "Uptime",
      shell: "Shell",
      theme: "Theme",
      lang: "Language",
      // machine values — Latin in both locales (§7.4)
      osValue: "AmirHo Linux x86_64",
      hostValue: "amirho.github.io",
      kernelValue: "astro 5 · tailwind 4 · gsap 3",
      uptimeValue: "since 2020",
      shellValue: "bash (obviously)",
    },
  },

  footer: {
    tagline: "Web · Mobile · AI — engineered in two languages.",
    navigation: "Navigation",
    builtWith: "Built with Astro, Tailwind CSS & GSAP",
    rights: "All rights reserved.",
    rss: "RSS feed",
  },

  theme: {
    light: "Light",
    dark: "Dark",
  },

  a11y: {
    skipToContent: "Skip to main content",
    primaryNav: "Primary navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
    languageOptions: "Language options",
    scrollDown: "Scroll to the next section",
    techMarquee: "Technologies I work with",
    availability: "Availability status",
    copyEmail: "Copy email address",
    socialLinks: "Social links",
    terminal: "Interactive terminal",
    terminalOutput: "Terminal output",
    terminalInput: "Type a command and press Enter",
    formErrors: "Form errors",
    newTab: "(opens in a new tab)",
    themeToggleLight: "Switch to light theme",
    themeToggleDark: "Switch to dark theme",
    emailLink: "Email AmirHo",
  },

  "404": {
    title: "Page not found",
    text: "The route you requested doesn't exist — it may have been moved, renamed, or never shipped in the first place.",
    home: "Go home",
    projects: "Browse projects",
  },

  meta: {
    home: {
      title: "AmirHo — Full-Stack Developer, Mobile & AI Engineer",
      description:
        "AmirHo — bilingual full-stack developer building fast, accessible web and mobile products with real AI engineering, from pixel to production, in English and Farsi.",
    },
    about: {
      title: "About — AmirHo | Full-Stack Developer",
      description:
        "The story behind AmirHo: from a 2020 Linux homelab and freelance web design to full-stack engineering — with an honest skills matrix, real timeline, and downloadable resume.",
    },
    projects: {
      title: "Projects — AmirHo | Case Studies",
      description:
        "Three production case studies by AmirHo: ShopStream real-time analytics, ParsLingo offline mobile learning, and SysWatch AI server monitoring — problem, process, results.",
    },
    blog: {
      title: "Blog — AmirHo | Technical Writing",
      description:
        "Technical writing by AmirHo on bilingual Astro builds, RTL done right, Ansible server hardening, and prompting versus fine-tuning — written in English and Farsi.",
    },
    contact: {
      title: "Contact — AmirHo | Get in Touch",
      description:
        "Get in touch with AmirHo about freelance or full-time work — a validated contact form, direct email, and every social channel, with replies in under 24 hours.",
    },
    lab: {
      title: "Lab — AmirHo | Interactive Terminal",
      description:
        "Play in AmirHo's lab: a fully interactive, keyboard-friendly terminal running in your browser. Try help, neofetch — or the classic sudo hire-me easter egg.",
    },
    notFound: {
      title: "Page Not Found — AmirHo | 404",
      description:
        "404 — the page you requested does not exist. Head back home, browse the bilingual projects and blog, or open the terminal lab and keep exploring.",
    },
    rss: {
      title: "AmirHo — Blog",
      description:
        "Technical notes by AmirHo on bilingual Astro builds, Linux server hardening and applied AI.",
    },
  },

  common: {
    back: "Back",
    backToTop: "Back to top",
    prev: "Previous",
    next: "Next",
    copy: "Copy",
    copied: "Copied!",
    minRead: "min read",
    readMore: "Read more",
    viewAll: "View all",
    home: "Home",
    email: "Email",
    available: "Open to freelance & full-time work",
    elsewhere: "Elsewhere",
  },
};

export type Dictionary = typeof en;
export default en;
