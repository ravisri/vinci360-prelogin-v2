import type { TargetAndTransition, Transition, Variants } from "motion/react"

/** Matches --ease-out-expo in globals.css. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const transition: Transition = { duration: 0.5, ease: easeOutExpo }

/** Scroll reveals fire once, when 30% of the element is visible. */
export const viewport = { once: true, amount: 0.3 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition },
}

/** Container variant that staggers its children (0.06–0.08s per CLAUDE.md). */
export const stagger = (delay = 0.07): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

/* ---- Chart presets (SVG). Children of a `stagger` container inherit hidden/show. ---- */

/** Vertical bar growing from its baseline. Origin lives here: Motion writes transform-origin inline on SVG. */
export const growY: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  show: { scaleY: 1, originY: 1, transition },
}

/** Horizontal bar growing from its start. */
export const growX: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, originX: 0, transition },
}

/** Line drawing time; `fadeInLate` waits for it so areas appear after their line. */
export const drawDuration = 1.2

export const drawLine: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { ...transition, duration: drawDuration } },
}

/** 404 chart: the drawn line collapses onto its baseline once the draw has finished (pair with non-scaling strokes). */
export const flattenY: Variants = {
  hidden: { scaleY: 1, originY: 1 },
  show: { scaleY: 0.01, originY: 1, transition: { ...transition, duration: 0.6, delay: drawDuration + 0.3 } },
}

export const fadeInLate: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { ...transition, delay: drawDuration * 0.75 } },
}

/** Faster stagger for many small marks (bars, tags). */
export const staggerFast = stagger(0.06)

/** Floating cards drift in after the hero visual has started (0.4s). */
export const floatIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { ...transition, delay: 0.4 } },
}

/** Tab panel swap: the incoming panel fades up 8px (0.35s), as in the Features tab strip. */
export const panelIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { ...transition, duration: 0.35 } },
}

/** Tour step swap: the outgoing mock fades out while the incoming one fades in, stacked in one cell. */
export const crossFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { ...transition, duration: 0.35 } },
  exit: { opacity: 0, transition: { ...transition, duration: 0.25 } },
}

/** Rows re-ranking under a sort toggle (Motion `layout`, see components/motion/LayoutMotion). */
export const reorder: Transition = { duration: 0.45, ease: easeOutExpo }

/** Breakout row: an accent ring that flashes twice (opacity only). */
export const flashTwice: { animate: TargetAndTransition; transition: Transition } = {
  animate: { opacity: [0, 1, 0] },
  transition: { duration: 1.1, ease: "easeInOut", repeat: 1 },
}

/** "Click here" nudge over a hotspot: a small bob (static with reduced motion). */
export const nudgeBob: { animate: TargetAndTransition; transition: Transition } = {
  animate: { y: [0, -5, 0] },
  transition: { duration: 1.2, ease: "easeInOut", repeat: Infinity },
}

/** One pulse when a shared filter changes: every widget dips and returns together (opacity + scale only). */
export const widgetPulse = {
  opacity: [1, 0.45, 1],
  scale: [1, 0.985, 1],
  transition: { duration: 0.6, ease: easeOutExpo },
}

/** Last card of a drawn flow: slides in from the left once the connectors before it have drawn. */
export const slideInLate: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { ...transition, delay: 1.9 } },
}

/** About hero hub: one pulse once the connectors have drawn (transform + opacity only). */
export const pulseOnce: { animate: TargetAndTransition; transition: Transition } = {
  animate: { scale: [1, 1.35, 1] },
  transition: { duration: 0.9, ease: "easeInOut", delay: 1.5 },
}

/** Ring that expands and fades out once, alongside `pulseOnce`. */
export const ringOnce: { animate: TargetAndTransition; transition: Transition } = {
  animate: { scale: [1, 2.4], opacity: [0.6, 0] },
  transition: { duration: 1.1, ease: easeOutExpo, delay: 1.5 },
}

export const presets = { fadeUp, fadeIn, scaleIn, floatIn, slideInLate } as const
export type Preset = keyof typeof presets

/** Form state swap (form → success | error): the card eases to its new height while the content cross-fades. */
export const heightSwap: Transition = { duration: 0.4, ease: easeOutExpo }
