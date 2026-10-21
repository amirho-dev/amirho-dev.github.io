/**
 * Lab terminal engine (§10.7) — vanilla TypeScript, zero dependencies.
 *
 * Architecture:
 *  · The page renders an empty [data-terminal] mount plus a JSON config
 *    script (built server-side from the dictionaries + data modules);
 *    this class builds all of its DOM and owns all behavior.
 *  · Commands stay ENGLISH in both locales (§10.7); every human-language
 *    output string arrives via config.strings, pre-translated.
 *  · Output lines render with dir="auto": a line starting with Farsi
 *    gets an RTL base (correct sentence run-order), Latin-first lines
 *    stay LTR. Neofetch rows force dir="ltr" — the ASCII-art column must
 *    not reflow. The window itself is LTR in both locales (§7.4).
 *  · Output is built exclusively with DOM APIs and textContent — the
 *    echoed command (user input) is never injected as HTML.
 *  · History: ↑/↓ cycles previously submitted commands (in-memory);
 *    Ctrl+L clears (a terminal classic).
 *  · Accessibility: the log is role="log" aria-live="polite"; the input
 *    carries a translated aria-label; the blinking block cursor is a
 *    decorative mirror-span (frozen solid by the reduced-motion CSS
 *    kill switch). The native caret is hidden; the mirror-span cursor
 *    tracks the exact text end.
 *  · `format()` is reimplemented locally (3 lines) instead of importing
 *    src/i18n/utils.ts — that module imports BOTH dictionaries, which
 *    would drag them into every terminal page's client bundle.
 */

// ── Public contract ────────────────────────────────────────────────────

export interface TerminalStrings {
  introLines: string[];
  helpHeader: string;
  helpDescriptions: Record<
    | "help"
    | "whoami"
    | "skills"
    | "projects"
    | "contact"
    | "socials"
    | "neofetch"
    | "theme"
    | "clear"
    | "ls"
    | "hireMe",
    string
  >;
  whoamiOutput: string[];
  skillsIntro: string;
  projectsIntro: string;
  socialsIntro: string;
  contactIntro: string;
  contactNote: string;
  unknownCommand: string;
  themeSwitched: string;
  sudoOutput: string[];
  neofetch: {
    os: string;
    host: string;
    kernel: string;
    uptime: string;
    shell: string;
    theme: string;
    lang: string;
    osValue: string;
    hostValue: string;
    kernelValue: string;
    uptimeValue: string;
    shellValue: string;
  };
  themeDark: string;
  themeLight: string;
  a11yTerminal: string;
  a11yOutput: string;
  a11yInput: string;
}

export interface TerminalConfig {
  /** Current locale — feeds neofetch's live "lang" value. */
  localeCode: "en" | "fa";
  strings: TerminalStrings;
  /** Latin tech names (data/skills.ts). */
  skills: string[];
  /** Social channels (data/socials.ts). */
  socials: { label: string; url: string; handle: string }[];
  /** Contact address (config/site.ts). */
  email: string;
  /** Case studies: Latin name + domain + localized URL. */
  projects: { name: string; domain: string; url: string }[];
  /** Site sections for `ls`: localized label + localized path. */
  sections: { label: string; path: string }[];
  /** Localized /contact URL — `sudo hire-me` lands here. */
  contactUrl: string;
}

interface TerminalPart {
  text: string;
  kind: "text" | "muted" | "link";
  href?: string;
  external?: boolean;
}

type CommandHandler = (args: string[]) => void;

const PROMPT = "guest@amirho:~$";

// Block-letter "AH" — pairs with the neofetch info column at runtime.
const NEOFETCH_ART: readonly string[] = [
  " █████ ██   ██",
  "██   ██ ██   ██",
  "███████ ███████",
  "██   ██ ██   ██",
  "██   ██ ██   ██",
];

export class Terminal {
  private readonly root: HTMLElement;
  private readonly cfg: TerminalConfig;
  private readonly output: HTMLElement;
  private readonly input: HTMLInputElement;
  private readonly mirror: HTMLElement;
  private readonly cursor: HTMLElement;
  private readonly history: string[] = [];
  private historyIndex = 0;
  private readonly commands: Map<string, CommandHandler>;

  constructor(root: HTMLElement, config: TerminalConfig) {
    this.root = root;
    this.cfg = config;

    const built = this.build();
    this.output = built.output;
    this.input = built.input;
    this.mirror = built.mirror;
    this.cursor = built.cursor;
    this.cursor.classList.add("invisible"); // shown when the input is focused

    this.commands = new Map<string, CommandHandler>([
      ["help", () => this.runHelp()],
      ["whoami", () => this.printLines(this.cfg.strings.whoamiOutput)],
      ["skills", () => this.runSkills()],
      ["projects", () => this.runProjects()],
      ["contact", () => this.runContact()],
      ["socials", () => this.runSocials()],
      ["neofetch", () => this.runNeofetch()],
      ["theme", () => this.runTheme()],
      ["clear", () => this.runClear()],
      ["ls", () => this.runLs()],
      ["sudo", (args) => this.runSudo(args)],
    ]);

    this.bindEvents();
    this.printLines(this.cfg.strings.introLines);
    this.scrollToEnd();
  }

  // ── DOM construction ────────────────────────────────────────────────

  private build(): {
    output: HTMLElement;
    input: HTMLInputElement;
    mirror: HTMLElement;
    cursor: HTMLElement;
  } {
    this.root.setAttribute("role", "group");
    this.root.setAttribute("aria-label", this.cfg.strings.a11yTerminal);
    this.root.className = "flex flex-col gap-3";

    // Scrollable output log (aria-live, §10.7).
    const output = document.createElement("div");
    output.setAttribute("role", "log");
    output.setAttribute("aria-live", "polite");
    output.setAttribute("aria-label", this.cfg.strings.a11yOutput);
    output.className =
      "flex min-h-56 max-h-[60vh] flex-col gap-1 overflow-auto pe-1";
    this.root.appendChild(output);

    // Prompt line: mirrored-text block cursor + real (invisible-caret)
    // input overlaying it. The mirror duplicates the input's text in the
    // same font, so the cursor always sits exactly at the text end.
    const line = document.createElement("div");
    line.className = "flex items-center gap-2";

    const prompt = document.createElement("span");
    prompt.className =
      "shrink-0 select-none font-mono text-base text-term-muted";
    prompt.textContent = PROMPT;

    const wrapper = document.createElement("span");
    wrapper.className =
      "relative flex min-w-0 flex-1 items-center overflow-hidden";

    const mirror = document.createElement("span");
    mirror.className =
      "invisible whitespace-pre font-mono text-base leading-relaxed";
    mirror.setAttribute("aria-hidden", "true");

    const cursor = document.createElement("span");
    cursor.className = "animate-blink font-mono text-base text-accent";
    cursor.textContent = "▌";
    cursor.setAttribute("aria-hidden", "true");

    // text-base (16px) — keeps iOS Safari from zooming on focus.
    const input = document.createElement("input");
    input.type = "text";
    input.className =
      "absolute inset-0 h-full w-full border-0 bg-transparent p-0 font-mono text-base leading-relaxed text-term-text caret-transparent";
    input.setAttribute("dir", "ltr");
    input.setAttribute("aria-label", this.cfg.strings.a11yInput);
    input.autocomplete = "off";
    input.autocapitalize = "off";
    input.spellcheck = false;

    wrapper.append(mirror, cursor, input);
    line.append(prompt, wrapper);
    this.root.appendChild(line);

    return { output, input, mirror, cursor };
  }

  private bindEvents(): void {
    this.input.addEventListener("input", () => {
      this.mirror.textContent = this.input.value;
    });

    this.input.addEventListener("keydown", (event) =>
      this.handleKeydown(event),
    );

    this.input.addEventListener("focus", () =>
      this.cursor.classList.remove("invisible"),
    );
    this.input.addEventListener("blur", () =>
      this.cursor.classList.add("invisible"),
    );

    // Click anywhere in the terminal focuses the input — unless the
    // click follows a text selection (so copying output stays possible)
    // or targets a link.
    this.root.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) return;
      if (event.target === this.input) return;
      if (window.getSelection()?.toString()) return;
      this.input.focus();
    });
  }

  // ── Input handling ──────────────────────────────────────────────────

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = this.input.value;
      this.input.value = "";
      this.mirror.textContent = "";
      this.execute(value);
    } else if (event.key === "ArrowUp") {
      if (this.history.length === 0) return;
      event.preventDefault();
      this.historyIndex = Math.max(0, this.historyIndex - 1);
      this.setHistoryValue(this.history[this.historyIndex] ?? "");
    } else if (event.key === "ArrowDown") {
      if (this.history.length === 0) return;
      event.preventDefault();
      this.historyIndex = Math.min(this.history.length, this.historyIndex + 1);
      const value =
        this.historyIndex >= this.history.length
          ? ""
          : (this.history[this.historyIndex] ?? "");
      this.setHistoryValue(value);
    } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      this.runClear();
    }
  }

  private setHistoryValue(value: string): void {
    this.input.value = value;
    this.mirror.textContent = value;
    const end = value.length;
    this.input.setSelectionRange(end, end);
  }

  private execute(raw: string): void {
    const command = raw.trim();
    this.echo(command);
    if (command === "") {
      this.scrollToEnd();
      return;
    }

    this.history.push(command);
    this.historyIndex = this.history.length;

    const parts = command.split(/\s+/);
    const name = (parts[0] ?? "").toLowerCase();
    const args = parts.slice(1);

    const handler = this.commands.get(name);
    if (handler) {
      handler(args);
    } else {
      this.printError(
        this.format(this.cfg.strings.unknownCommand, {
          command: parts[0] ?? command,
        }),
      );
    }
    this.scrollToEnd();
  }

  // ── Output primitives ───────────────────────────────────────────────

  /** A bare output row. dir="auto": Farsi-first lines render RTL. */
  private line(className?: string): HTMLElement {
    const el = document.createElement("div");
    if (className) el.className = className;
    el.dir = "auto";
    this.output.appendChild(el);
    return el;
  }

  private print(
    text: string,
    className = "whitespace-pre-wrap wrap-break-word",
  ): void {
    this.line(className).textContent = text;
  }

  private printLines(lines: string[], className?: string): void {
    lines.forEach((l) => this.print(l, className));
  }

  private printError(text: string): void {
    this.print(text, "whitespace-pre-wrap break-words text-term-danger");
  }

  /** The submitted command, echoed with the prompt (never innerHTML). */
  private echo(command: string): void {
    const row = this.line("whitespace-pre-wrap break-words");
    row.dir = "ltr";
    const prompt = document.createElement("span");
    prompt.className = "select-none text-term-muted";
    prompt.textContent = `${PROMPT} `;
    prompt.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.textContent = command;
    row.append(prompt, text);
  }

  private partSpan(part: TerminalPart): HTMLSpanElement | HTMLAnchorElement {
    if (part.kind === "link" && part.href) {
      const anchor = document.createElement("a");
      anchor.href = part.href;
      anchor.textContent = part.text;
      anchor.className =
        "text-accent underline decoration-accent/40 underline-offset-2 transition-colors duration-200 hover:decoration-accent";
      if (part.external) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }
      return anchor;
    }
    const span = document.createElement("span");
    span.textContent = part.text;
    span.className =
      part.kind === "muted" ? "text-term-muted" : "text-term-text";
    return span;
  }

  private printParts(
    parts: TerminalPart[],
    className = "whitespace-pre-wrap wrap-break-word",
  ): void {
    const row = this.line(className);
    parts.forEach((part) => row.appendChild(this.partSpan(part)));
  }

  private scrollToEnd(): void {
    this.output.scrollTop = this.output.scrollHeight;
  }

  /** {token} templating — local copy, see file docstring. */
  private format(template: string, vars: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (match, key: string) =>
      Object.prototype.hasOwnProperty.call(vars, key)
        ? (vars[key] ?? match)
        : match,
    );
  }

  // ── Commands ────────────────────────────────────────────────────────

  private runHelp(): void {
    const d = this.cfg.strings.helpDescriptions;
    this.print(
      this.cfg.strings.helpHeader,
      "whitespace-pre-wrap break-words text-term-muted",
    );

    const rows: [string, string][] = [
      ["help", d.help],
      ["whoami", d.whoami],
      ["skills", d.skills],
      ["projects", d.projects],
      ["contact", d.contact],
      ["socials", d.socials],
      ["neofetch", d.neofetch],
      ["theme", d.theme],
      ["ls", d.ls],
      ["clear", d.clear],
      ["sudo hire-me", d.hireMe],
    ];
    const width = rows.reduce((max, [name]) => Math.max(max, name.length), 0);
    rows.forEach(([name, description]) => {
      this.print(`${name.padEnd(width)}  ${description}`);
    });
  }

  private runSkills(): void {
    this.print(
      this.cfg.strings.skillsIntro,
      "whitespace-pre-wrap break-words text-term-muted",
    );
    this.print(this.cfg.skills.join(" · "));
  }

  private runProjects(): void {
    this.print(
      this.cfg.strings.projectsIntro,
      "whitespace-pre-wrap break-words text-term-muted",
    );
    this.cfg.projects.forEach((project) => {
      this.printParts([
        { text: project.name, kind: "link", href: project.url },
        { text: ` · ${project.domain}`, kind: "muted" },
      ]);
    });
  }

  private runContact(): void {
    this.print(
      this.cfg.strings.contactIntro,
      "whitespace-pre-wrap break-words text-term-muted",
    );
    this.printParts([
      { text: this.cfg.email, kind: "link", href: `mailto:${this.cfg.email}` },
    ]);
    this.print(
      this.cfg.strings.contactNote,
      "whitespace-pre-wrap break-words text-term-muted",
    );
  }

  private runSocials(): void {
    this.print(
      this.cfg.strings.socialsIntro,
      "whitespace-pre-wrap break-words text-term-muted",
    );
    this.cfg.socials.forEach((social) => {
      this.printParts([
        { text: social.label, kind: "link", href: social.url, external: true },
        { text: ` — ${social.handle}`, kind: "muted" },
      ]);
    });
  }

  private runTheme(): void {
    // Reuse the site's real toggle (persistence + labels come with it);
    // the direct-class fallback covers a DOM without the button.
    const toggle = document.querySelector<HTMLButtonElement>(
      "[data-theme-toggle]",
    );
    if (toggle) {
      toggle.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
    } else {
      const next = document.documentElement.classList.contains("dark")
        ? "light"
        : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("amirho:theme", next);
      } catch {
        /* storage unavailable — the toggle still applies for this view */
      }
    }
    const label = document.documentElement.classList.contains("dark")
      ? this.cfg.strings.themeDark
      : this.cfg.strings.themeLight;
    this.print(this.format(this.cfg.strings.themeSwitched, { theme: label }));
  }

  private runClear(): void {
    this.output.replaceChildren();
  }

  private runLs(): void {
    this.cfg.sections.forEach((section) => {
      this.printParts([
        { text: section.label, kind: "link", href: section.path },
        { text: `  ${section.path}`, kind: "muted" },
      ]);
    });
  }

  private runSudo(args: string[]): void {
    if (args[0] === "hire-me") {
      this.printLines(this.cfg.strings.sudoOutput);
      this.scrollToEnd();
      // A beat to read the output, then land on the contact page
      // (instant under reduced motion).
      const delay = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? 0
        : 900;
      window.setTimeout(
        () => window.location.assign(this.cfg.contactUrl),
        delay,
      );
    } else {
      this.printError(
        this.format(this.cfg.strings.unknownCommand, {
          command: args[0] ?? "sudo",
        }),
      );
    }
  }

  private runNeofetch(): void {
    const nf = this.cfg.strings.neofetch;
    const theme = document.documentElement.classList.contains("dark")
      ? this.cfg.strings.themeDark
      : this.cfg.strings.themeLight;

    const info: string[] = [
      "guest@amirho",
      "───────────────",
      `${nf.os}: ${nf.osValue}`,
      `${nf.host}: ${nf.hostValue}`,
      `${nf.kernel}: ${nf.kernelValue}`,
      `${nf.uptime}: ${nf.uptimeValue}`,
      `${nf.shell}: ${nf.shellValue}`,
      `${nf.theme}: ${theme}`,
      `${nf.lang}: ${this.cfg.localeCode}`,
    ];

    const artWidth =
      NEOFETCH_ART.reduce((max, l) => Math.max(max, l.length), 0) + 2;
    const rows = Math.max(NEOFETCH_ART.length, info.length);

    for (let i = 0; i < rows; i++) {
      // Forced LTR: the art column must not reflow under dir="auto".
      const row = this.line("whitespace-pre");
      row.dir = "ltr";

      const art = document.createElement("span");
      art.className = "text-accent";
      art.textContent = (NEOFETCH_ART[i] ?? "").padEnd(artWidth);

      const text = document.createElement("span");
      text.textContent = info[i] ?? "";
      if (i === 0) text.className = "font-bold";
      else if (i === 1) text.className = "text-term-muted";

      row.append(art, text);
    }
  }
}
