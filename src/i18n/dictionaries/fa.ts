/**
 * Farsi dictionary — must satisfy the `Dictionary` type defined by en.ts.
 * Any missing or extra key fails `astro check`, so parity is enforced
 * at build time (§7.3).
 *
 * Style rules applied here (§7.5): correct نیم‌فاصله (ZWNJ) throughout,
 * Persian punctuation ، ؛ ؟ and guillemets « », professional first
 * person, Persian digits for prose numbers, Latin digits for versions
 * and tech terms. Values that are intentionally identical to English
 * (terminal commands, tech names, machine output) are marked inline —
 * these are §7.4 design decisions, not translation drift.
 */
import type { Dictionary } from "./en";

const fa: Dictionary = {
  nav: {
    home: "خانه",
    about: "درباره",
    projects: "پروژه‌ها",
    blog: "بلاگ",
    lab: "آزمایشگاه",
    contact: "تماس",
  },

  hero: {
    greeting: "سلام، من",
    /** Completes the Farsi sentence after the Latin name: «… من AmirHo هستم». */
    nameSuffix: "هستم",
    roles: [
      "توسعه‌دهنده فول‌استک",
      "توسعه‌دهنده موبایل",
      "مهندس هوش مصنوعی",
      "طراح رابط و تجربه کاربری",
      "مدیر سیستم لینوکس",
      "تولیدکننده محتوا",
    ],
    tagline:
      "محصولات دیجیتالِ سریع، دسترس‌پذیر و دوزبانه می‌سازم — از پیکسل تا پروداکشن.",
    ctaProjects: "مشاهده پروژه‌ها",
    ctaContact: "تماس با من",
    skipIntro: "رد کردن مقدمه",
    scroll: "اسکرول",
    // Commands stay Latin (§7.4); output text is localized.
    bootWhoamiCmd: "whoami",
    bootWhoamiOut: "amirho — توسعه‌دهنده فول‌استک",
    bootSkillsCmd: "cat ~/skills.txt | head -3",
    bootSkillsOut: "typescript · react · astro · node.js · linux",
    bootInitCmd: "./init portfolio --lang=fa",
    bootInitOut: "[ ok ] پورتفولیو آماده است — در حال اجرا…",
  },

  home: {
    featuredTitle: "پروژه‌های منتخب",
    featuredViewAll: "مشاهده همه پروژه‌ها",
    expertiseTitle: "کاری که می‌کنم",
    expertiseSubtitle:
      "شش حوزه، یک مهندس — یک تخصص را استخدام کنید یا کل استک را.",
    expertiseItems: [
      {
        title: "وب فول‌استک",
        text: "برنامه‌های وب سرتاسری با Next.js، Astro و Node.js — تایپ‌شده، تست‌شده و آماده‌ی پروداکشن.",
      },
      {
        title: "توسعه موبایل",
        text: "اپلیکیشن‌های چندسکویی با React Native و Expo که در iOS و Android حس بومی دارند — و هر جا لازم بود، آفلاین‌محور.",
      },
      {
        title: "مهندسی هوش مصنوعی",
        text: "قابلیت‌های مبتنی بر LLM که در پروداکشن دوام می‌آورند: طراحی پرامپت، خطوط RAG و دانستن اینکه فاین‌تیونینگ چه زمانی پاسخ اشتباه است.",
      },
      {
        title: "طراحی رابط و تجربه کاربری",
        text: "رابط‌های دوزبانه و دسترس‌پذیر؛ طراحی‌شده در فیگما و ساخته‌شده بر اساس استانداردهای WCAG — با راست‌چینِ واقعی، نه فکرِ بعدی.",
      },
      {
        title: "مدیریت سیستم لینوکس",
        text: "سرورهایی که با Ansible راه‌اندازی و سخت‌سازی می‌شوند و با پایش، سرحال نگه داشته می‌شوند — از هوم‌لب منزل تا ناوگانی با بیش از ۳۰ سرور.",
      },
      {
        title: "تولید محتوا",
        text: "نوشتن فنی به انگلیسی و فارسی؛ ساعت‌های دیباگِ سخت را به راهنماهایی تبدیل می‌کند که دیگران واقعاً بتوانند دنبال کنند.",
      },
    ],
    postsTitle: "آخرین نوشته‌ها",
    postsViewAll: "مشاهده همه نوشته‌ها",
    ctaTitle: "پروژه‌ای در ذهن دارید؟",
    ctaText:
      "در حال حاضر برای فریلنس و همکاری تمام‌وقت آماده‌ام. بگویید چه می‌سازید — استک، تست و آپتایمش با من.",
    ctaButton: "شروع گفت‌وگو",
  },

  about: {
    title: "درباره من",
    lead: "توسعه‌دهنده فول‌استک، سیس‌آدمنِ ناخواسته و سازنده‌ی تمام‌وقتِ چیزهای دوزبانه — این نسخه‌ی صادقانه است؛ بدون جلای آژانسی و بدون عنوان‌های متورم.",
    storyTitle: "داستان تا اینجا",
    paragraphs: [
      "اولین خط HTML عمرم را در ۲۰۱۹ نوشتم؛ فقط می‌خواستم امضای انجمن یک بازی را شخصی‌سازی کنم. اما آن کنجکاوی دیگر تمام نشد. تا سال ۲۰۲۰ برای کسب‌وکارهای کوچک وب‌سایت می‌ساختم و روی سخت‌افزارهای قدیمی، هوم‌لب دبیان راه انداخته بودم — شب‌ها خرابش می‌کردم و صبح‌ها درستش می‌کردم.",
      "از آن زمان از صفحات استاتیک به محصول‌های کامل رسیدم: APIهای تایپ‌شده با Node.js، فرانت‌اندهای React و Next.js، اپلیکیشن موبایلی که فارسی را آفلاین آموزش می‌دهد و ابزار پایش مبتنی بر LLM که لاگ‌های سرور را بهتر از من می‌خواند.",
      "اما چیزی که برایم مهم است تغییر نکرده است: نرم‌افزار سریع و دسترس‌پذیر که به کاربر احترام بگذارد. روی جزئیات وسواس دارم — امتیازهای Lighthouse، ناوبری با کیبورد، راست‌چینِ واقعی — چون تفاوتِ «کار می‌کند» و «خوب کار می‌کند» همین جاست.",
      "هر روز با دو زبان انگلیسی و فارسی کار می‌کنم و محصولاتی می‌سازم که هر دو را هم‌ارز می‌بینند. وقتی کد نمی‌نویسم، درباره‌اش می‌نویسم — تجربه‌هایی را که به سختی به دست آورده‌ام به راهنماهایی تبدیل می‌کنم که ساعت‌ها دیباگ را از دوش دیگران برمی‌دارد.",
    ],
    timelineTitle: "مسیر",
    skillsTitle: "ماتریس صادقانه‌ی مهارت‌ها",
    skillsSubtitle:
      "دیواری از لوگو نیست — تقسیم صادقانه‌ی چیزهایی که هر روز استفاده می‌کنم، چیزهایی که وقتی کار لازم دارد با آن‌ها می‌سازم و چیزهایی که هنوز یاد می‌گیرم.",
    skillsDaily: "روزانه",
    skillsDailyHint: "ابزارهایی که هر روز سراغشان می‌روم.",
    skillsComfortable: "مسلط",
    skillsComfortableHint: "ابزارهایی که وقتی کار لازم دارد، با آن‌ها می‌سازم.",
    skillsExploring: "در حال یادگیری",
    skillsExploringHint:
      "چیزهایی که فعلاً یاد می‌گیرم — شش ماه دیگر دوباره بپرسید.",
    resumeTitle: "رزومه",
    resumeText: "یک صفحه، بدون حاشیه — همان داستان بالا، این بار در قالب PDF.",
    resumeButton: "دانلود رزومه (PDF)",
    resumeOther: "نسخه‌ی انگلیسی نیز موجود است.",
    creatorTitle: "فراتر از کد",
    creatorText:
      "محتوای فنی به انگلیسی و فارسی می‌نویسم — بررسی‌های عمیق، چک‌لیست‌های سخت‌سازی و یادداشت‌های صادقانه درباره‌ی هوش مصنوعی در پروداکشن. آموزش‌دادن، راه من برای مطمئن شدن از فهمیدنِ واقعیِ یک موضوع است.",
    creatorLink: "خواندن بلاگ",
  },

  projects: {
    title: "پروژه‌ها",
    subtitle:
      "سه سیستم پروداکشن — مسئله، فرایند و نتایج اندازه‌گیری‌شده. بدون موکاپ، بدون وعده‌ی توخالی.",
    filterGroup: "فیلتر پروژه‌ها بر اساس حوزه",
    filterAll: "نمایش همه پروژه‌ها",
    filterWeb: "نمایش پروژه‌های وب",
    filterMobile: "نمایش پروژه‌های موبایل",
    filterAi: "نمایش پروژه‌های هوش مصنوعی",
    resultsCount: "نمایش {count} پروژه از ۳ پروژه",
    readCaseStudy: "مشاهده مطالعه موردی",
    metaRole: "نقش",
    metaStack: "تکنولوژی‌ها",
    metaYear: "سال",
    metaDomain: "حوزه",
    problem: "مسئله",
    process: "فرایند",
    solution: "راه‌حل",
    results: "نتایج",
    backToAll: "همه‌ی پروژه‌ها",
    prevProject: "پروژه‌ی قبلی",
    nextProject: "پروژه‌ی بعدی",
  },

  blog: {
    title: "بلاگ",
    subtitle:
      "یادداشت‌های بلند درباره‌ی چیزهایی که واقعاً می‌سازم — بیلدهای دوزبانه‌ی Astro، سرورهای سخت‌سازی‌شده و هوش مصنوعی‌ای که جای خودش را در پروداکشن درست می‌کند.",
    published: "انتشار",
    updated: "به‌روزرسانی",
    toc: "در این صفحه",
    backToAll: "همه‌ی نوشته‌ها",
    prevPost: "نوشته‌ی قبلی",
    nextPost: "نوشته‌ی بعدی",
    tags: "برچسب‌ها",
  },

  contact: {
    title: "تماس",
    subtitle:
      "پروژه‌ی فریلنس، موقعیت تمام‌وقت یا حتی یک سؤال درباره‌ی یک نوشته — اینباکس من باز است و من واقعاً جواب می‌دهم.",
    formTitle: "ارسال پیام",
    nameLabel: "نام",
    namePlaceholder: "نام شما",
    emailLabel: "ایمیل",
    emailPlaceholder: "آدرس ایمیل شما",
    subjectLabel: "موضوع",
    subjectPlaceholder: "پروژه، همکاری — یا فقط یک سلام",
    messageLabel: "پیام",
    messagePlaceholder: "درباره‌ی پروژه‌تان بگویید — هدف، زمان‌بندی و بودجه.",
    submit: "ارسال پیام",
    sending: "در حال ارسال…",
    success: "پیام ارسال شد — حداکثر تا یک روز دیگر پاسخ می‌دهم.",
    error: "مشکلی پیش آمد. دوباره تلاش کنید یا مستقیم به من ایمیل بزنید.",
    errNameRequired: "لطفاً نامتان را وارد کنید.",
    errEmailRequired: "لطفاً آدرس ایمیلتان را وارد کنید.",
    errEmailInvalid: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
    errMessageRequired: "لطفاً پیامتان را بنویسید.",
    errMessageShort: "پیام باید حداقل ۲۰ کاراکتر باشد.",
    fallbackTitle: "ایمیل ساده را ترجیح می‌دهید؟",
    fallbackText:
      "این فرم اختیاری است — این دکمه برنامه‌ی ایمیل شما را با موضوع و پیام از پیش پرشده باز می‌کند.",
    fallbackButton: "باز کردن برنامه‌ی ایمیل",
    emailHeading: "ایمیل مستقیم",
    responseTime: "زمان پاسخ معمول: کمتر از ۲۴ ساعت.",
  },

  lab: {
    title: "آزمایشگاه",
    subtitle:
      "ترمینال sandbox که کاملاً در مرورگر شما اجرا می‌شود — بدون سرور، بدون کوکی؛ فقط جاوااسکریپت. برای شروع help را تایپ کنید.",
    hint: "help، whoami و neofetch را امتحان کنید — یا sudo hire-me.",
    introLines: [
      "به آزمایشگاه خوش آمدید — ترمینال sandbox که کاملاً در مرورگر شما اجرا می‌شود.",
      "برای دیدن فرمان‌های موجود «help» را تایپ کنید.",
    ],
    historyHint: "با ↑ / ↓ در تاریخچه‌ی فرمان‌ها جابه‌جا شوید.",
    helpHeader: "فرمان‌های موجود:",
    // Commands stay Latin (§10.7); descriptions are localized.
    helpDescriptions: {
      help: "نمایش همین راهنما",
      whoami: "معرفی کوتاه من",
      skills: "فهرست مهارت‌های فنی من",
      projects: "فهرست مطالعات موردی من",
      contact: "نمایش راه‌های ارتباطی",
      socials: "نمایش پروفایل‌های اجتماعی من",
      neofetch: "اطلاعات سیستم با هنر ASCII",
      theme: "تغییر حالت روشن/تاریک",
      clear: "پاک کردن صفحه‌ی ترمینال",
      ls: "فهرست بخش‌های سایت",
      hireMe: "خب، این که واضح است.",
    },
    whoamiOutput: [
      "amirho — توسعه‌دهنده فول‌استک، موبایل و مهندس هوش مصنوعی.",
      "از ۲۰۲۰ محصولات دوزبانه می‌سازم — از پیکسل تا پروداکشن.",
    ],
    skillsIntro: "استک فعلی من:",
    projectsIntro: "مطالعات موردی من:",
    socialsIntro: "من را اینجا پیدا کنید:",
    contactIntro: "سریع‌ترین راه ارتباط با من:",
    contactNote: "کمتر از ۲۴ ساعت پاسخ می‌دهم — معمولاً خیلی سریع‌تر.",
    themeSwitched: "حالت به {theme} تغییر کرد.",
    unknownCommand:
      "فرمان «{command}» پیدا نشد — برای دیدن فهرست فرمان‌ها «help» را تایپ کنید.",
    sudoOutput: [
      "[sudo] password for guest: ********",
      "دسترسی تأیید شد — در حال باز کردن صفحه‌ی تماس…",
    ],
    neofetch: {
      os: "سیستم‌عامل",
      host: "میزبان",
      kernel: "کرنل",
      uptime: "آپتایم",
      shell: "پوسته",
      theme: "حالت",
      lang: "زبان",
      // machine values — Latin in both locales (§7.4)
      osValue: "AmirHo Linux x86_64",
      hostValue: "amirho.github.io",
      kernelValue: "astro 5 · tailwind 4 · gsap 3",
      uptimeValue: "از ۲۰۲۰ تاکنون",
      shellValue: "bash (طبعاً)",
    },
  },

  footer: {
    tagline: "وب، موبایل و هوش مصنوعی — مهندسی‌شده به دو زبان.",
    navigation: "ناوبری",
    builtWith: "ساخته‌شده با Astro، Tailwind CSS و GSAP",
    rights: "همه‌ی حقوق محفوظ است.",
    rss: "فید RSS",
  },

  theme: {
    light: "روشن",
    dark: "تاریک",
  },

  a11y: {
    skipToContent: "پرش به محتوای اصلی",
    primaryNav: "ناوبری اصلی",
    mobileNav: "ناوبری موبایل",
    openMenu: "باز کردن منو",
    closeMenu: "بستن منو",
    switchLanguage: "تغییر زبان",
    languageOptions: "گزینه‌های زبان",
    scrollDown: "اسکرول به بخش بعدی",
    techMarquee: "تکنولوژی‌هایی که با آن‌ها کار می‌کنم",
    availability: "وضعیت دسترس‌پذیری",
    copyEmail: "کپی آدرس ایمیل",
    socialLinks: "لینک‌های شبکه‌های اجتماعی",
    terminal: "ترمینال تعاملی",
    terminalOutput: "خروجی ترمینال",
    terminalInput: "یک فرمان تایپ کنید و Enter بزنید",
    formErrors: "خطاهای فرم",
    newTab: "(در تب جدید باز می‌شود)",
    themeToggleLight: "تغییر به حالت روشن",
    themeToggleDark: "تغییر به حالت تاریک",
    emailLink: "ارسال ایمیل به AmirHo",
  },

  "404": {
    title: "صفحه پیدا نشد",
    text: "مسیری که درخواست کردید وجود ندارد — شاید جابه‌جا شده، تغییر نام داده یا هرگز منتشر نشده باشد.",
    home: "بازگشت به خانه",
    projects: "مشاهده‌ی پروژه‌ها",
  },

  meta: {
    home: {
      title: "AmirHo — توسعه‌دهنده فول‌استک، موبایل و مهندس هوش مصنوعی",
      description:
        "توسعه‌دهنده فول‌استک دوزبانه؛ ساخت محصولات وب و موبایلِ سریع و دسترس‌پذیر با مهندسی واقعی هوش مصنوعی — از پیکسل تا پروداکشن، به انگلیسی و فارسی.",
    },
    about: {
      title: "درباره من — AmirHo | توسعه‌دهنده فول‌استک",
      description:
        "داستان AmirHo: از هوم‌لب لینوکس و طراحی وب فریلنس در ۲۰۲۰ تا مهندسی فول‌استک — با ماتریس صادقانه‌ی مهارت‌ها، تایم‌لاین واقعی و رزومه‌ی قابل دانلود.",
    },
    projects: {
      title: "پروژه‌ها — AmirHo | مطالعات موردی",
      description:
        "سه مطالعه‌ی موردی پروداکشن: ShopStream تحلیل بلادرنگ فروش، ParsLingo آموزش آفلاین موبایل و SysWatch پایش هوشمند سرور — مسئله، فرایند و نتیجه.",
    },
    blog: {
      title: "بلاگ — AmirHo | نوشته‌های فنی",
      description:
        "نوشته‌های فنی AmirHo درباره‌ی ساخت پورتفولیو دوزبانه با Astro، راست‌چینِ درست، سخت‌سازی سرور با Ansible و پرامپت در برابر فاین‌تیون — به دو زبان.",
    },
    contact: {
      title: "تماس — AmirHo | برقراری ارتباط",
      description:
        "برای فریلنس یا همکاری تمام‌وقت با AmirHo در تماس باشید — فرم تماس اعتبارسنجی‌شده، ایمیل مستقیم و همه‌ی شبکه‌های اجتماعی؛ پاسخ در کمتر از ۲۴ ساعت.",
    },
    lab: {
      title: "آزمایشگاه — AmirHo | ترمینال تعاملی",
      description:
        "در آزمایشگاه AmirHo بازی کنید: ترمینالی تعاملی و کیبوردپسند که در مرورگر شما اجرا می‌شود. help و neofetch را امتحان کنید — یا ایستر اگ sudo hire-me.",
    },
    notFound: {
      title: "صفحه پیدا نشد — AmirHo | ۴۰۴",
      description:
        "۴۰۴ — صفحه‌ی درخواستی شما وجود ندارد. به خانه برگردید، پروژه‌ها و نوشته‌های دوزبانه را ببینید یا ترمینال آزمایشگاه را باز کنید و کاوش را ادامه دهید.",
    },
    rss: {
      title: "بلاگ AmirHo",
      description:
        "یادداشت‌های فنی AmirHo درباره‌ی بیلدهای دوزبانه‌ی Astro، سخت‌سازی سرور لینوکس و هوش مصنوعی کاربردی.",
    },
  },

  common: {
    back: "بازگشت",
    backToTop: "بازگشت به بالا",
    prev: "قبلی",
    next: "بعدی",
    copy: "کپی",
    copied: "کپی شد!",
    minRead: "دقیقه مطالعه",
    readMore: "ادامه مطلب",
    viewAll: "مشاهده همه",
    home: "خانه",
    email: "ایمیل",
    available: "آماده‌ی فریلنس و همکاری تمام‌وقت",
    elsewhere: "جاهای دیگر",
  },
};

export default fa;
