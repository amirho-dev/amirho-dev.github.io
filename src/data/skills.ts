/**
 * Skills matrix data (§10.5) — Latin tech names only, never localized
 * (§7.4). Group labels and hints come from the dictionaries
 * (`about.skillsDaily` etc.); this file owns the names themselves.
 *
 * Honest by design: "daily" means used every working day, "comfortable"
 * means shipped with when the job calls for it, "exploring" means
 * actively learning. No logo walls, no inflation.
 */

/** The three honesty tiers of the matrix. */
export type SkillLevel = "daily" | "comfortable" | "exploring";

export interface SkillGroupData {
  /** Maps to the dictionary keys `about.skillsDaily` / `…Comfortable` / `…Exploring`. */
  level: SkillLevel;
  /** Latin tech names in display order. */
  skills: string[];
}

export const SKILL_GROUPS: SkillGroupData[] = [
  {
    level: "daily",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Astro",
      "Node.js",
      "React Native",
      "Tailwind",
      "Git",
      "Linux/Bash",
      "Docker",
    ],
  },
  {
    level: "comfortable",
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "GSAP",
      "Figma",
      "Ansible",
      "Nginx",
      "CI/CD",
    ],
  },
  {
    level: "exploring",
    skills: ["Rust", "LLM fine-tuning & RAG", "Kubernetes", "Three.js"],
  },
];

/**
 * Tech marquee items for the home page strip — the union of all three
 * groups, ordered daily → comfortable → exploring so the strip leads
 * with the strongest claims. Consumed by components/home/TechMarquee.
 */
export const TECH_MARQUEE_ITEMS: string[] = SKILL_GROUPS.flatMap(
  (group) => group.skills,
);
