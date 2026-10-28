"use client"

import type { ComponentProps } from "react"
import { m, useReducedMotion } from "motion/react"

import { presets, viewport, type Preset } from "@/lib/motion"

/** Scroll-reveal wrapper (fadeUp by default); renders final state with reduced motion or no JS. */
export function Reveal({ preset = "fadeUp", ...props }: ComponentProps<typeof m.div> & { preset?: Preset }) {
  const reduced = useReducedMotion()
  return (
    <m.div
      data-motion=""
      variants={presets[preset]}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      {...props}
    />
  )
}
