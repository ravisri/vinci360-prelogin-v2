"use client"

import type { ComponentProps } from "react"
import { m, useReducedMotion } from "motion/react"

import { crossFade } from "@/lib/motion"

/**
 * Fades its children in every time it mounts. Give it a `key` (e.g. the selected role) so a swap
 * remounts the subtree: the new content cross-fades in and its charts and counters re-animate.
 */
export function MountFade(props: ComponentProps<typeof m.div>) {
  const reduced = useReducedMotion()
  return <m.div data-motion="" variants={crossFade} initial={reduced ? false : "hidden"} animate="show" {...props} />
}
