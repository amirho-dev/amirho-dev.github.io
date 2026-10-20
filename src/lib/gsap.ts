/**
 * GSAP bootstrap — plugins registered exactly once (build brief §5, §12).
 *
 * Contract:
 *  · ANY code that uses ScrollTrigger, SplitText or ScrambleTextPlugin
 *    MUST import them (and gsap) from THIS module, never from 'gsap'
 *    directly — importing this file guarantees registration happens
 *    before the first tween is created, on every page that needs it.
 *  · Consumers that only need plain gsap core (e.g. MobileNav's overlay
 *    timeline) may keep importing { gsap } from 'gsap' — the core needs
 *    no registration and stays out of plugin-free page bundles.
 *
 * All plugins listed are free as of GSAP 3.13.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin };
