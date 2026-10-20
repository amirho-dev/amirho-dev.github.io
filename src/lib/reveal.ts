/**
 * Scroll-reveal factory (§6.3, §11 Phase 4).
 *
 * Design rules baked in:
 *  · Elements are NEVER hidden via CSS — the "from" state is applied by
 *    GSAP at init. If JS fails or is delayed, all content stays visible.
 *  · `once: true` — every element reveals exactly one time.
 *  · Reduced motion: the factory returns a no-op, so nothing is ever
 *    hidden or animated (complements the CSS kill switch in global.css).
 *  · Direction-aware: the `start` slide variant enters from the
 *    inline-start side (left in LTR, right in RTL — §7.4).
 *  · Everything runs inside gsap.context(); the returned disposer
 *    reverts it (for embed/test contexts — static pages may ignore it).
 *
 * Markup API (attributes added by pages/sections, not by shared
 * components, so each context controls its own choreography):
 *  · data-reveal="up|start|fade"   single-element reveal (default "up")
 *  · data-reveal-delay="0.15"     per-element start delay in seconds
 *  · data-reveal-group            a parent whose items stagger together
 *  · data-reveal-item             a child of a data-reveal-group
 */
import { gsap } from "./gsap";

/** True when the visitor asked the OS for reduced motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type RevealVariant = "up" | "start" | "fade";

/** §6.3 — scroll reveals run 400–700ms with power3.out. */
const DURATIONS: Record<RevealVariant, number> = {
  up: 0.6,
  start: 0.6,
  fade: 0.5,
};

function parseVariant(value: string | undefined): RevealVariant {
  return value === "start" || value === "fade" ? value : "up";
}

/**
 * Initializes all scroll reveals under a root (defaults to the whole
 * document) and returns a disposer that reverts them.
 *
 * @param root A document or element to scan; defaults to `document`.
 * @returns A cleanup function (gsap.context revert). Static pages may
 *          safely ignore the return value.
 */
export function initReveals(root: ParentNode = document): () => void {
  if (prefersReducedMotion()) return () => undefined;

  const isRtl = document.documentElement.dir === "rtl";

  const ctx = gsap.context(() => {
    // 1 · Single-element reveals.
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      // Guard: [data-reveal] inside a group would double-animate —
      // grouped children use [data-reveal-item] instead.
      if (el.closest("[data-reveal-group]")) return;

      const variant = parseVariant(el.dataset.reveal);
      const delay = Number.parseFloat(el.dataset.revealDelay ?? "") || 0;

      const from: gsap.TweenVars = { opacity: 0 };
      if (variant === "up") from.y = 24;
      // Enter from the inline-start side: left in LTR, right in RTL.
      if (variant === "start") from.x = isRtl ? 40 : -40;

      gsap.from(el, {
        ...from,
        duration: DURATIONS[variant],
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // 2 · Group reveals — items of a [data-reveal-group] stagger in.
    root
      .querySelectorAll<HTMLElement>("[data-reveal-group]")
      .forEach((group) => {
        const items = Array.from(
          group.querySelectorAll<HTMLElement>("[data-reveal-item]"),
        );
        if (items.length === 0) return;

        gsap.from(items, {
          opacity: 0,
          y: 24,
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });
  });

  return () => ctx.revert();
}
