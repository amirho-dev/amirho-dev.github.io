/**
 * Social channel data — the canonical source for the footer, the
 * contact page and the Lab terminal's `socials` command.
 *
 * Labels are Latin platform names, never localized (§7.4). Icons are
 * hand-authored 24×24 stroke-based SVG inner markup (no icon library,
 * no stock assets) rendered via set:html.
 */

export interface SocialLink {
  /** Latin platform name, e.g. 'GitHub'. */
  label: string;
  /** Absolute profile URL. */
  url: string;
  /** Latin handle for terminal output, e.g. '@amirho'. */
  handle: string;
  /** Inner SVG markup for a 24×24 stroke icon (rendered with set:html). */
  icon: string;
}

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/amirho-dev",
    handle: "@Amir-Ho-2050",
    icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />',
  },
  // {
  //   label: "LinkedIn",
  //   url: "https://www.linkedin.com/in/amirho",
  //   handle: "in/amirho",
  //   icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />',
  // },
  // {
  //   label: "X",
  //   url: "https://x.com/amirho",
  //   handle: "@amirho",
  //   icon: '<path d="M4 4l16 16" /><path d="M20 4 4 20" />',
  // },
  {
    label: "Telegram",
    url: "https://t.me/amirho",
    handle: "@amirho",
    icon: '<path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" />',
  },
];
