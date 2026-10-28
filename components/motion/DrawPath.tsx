"use client"

import type { ComponentProps } from "react"
import { m, useReducedMotion } from "motion/react"

import { transition, viewport } from "@/lib/motion"

/** SVG path that draws itself (pathLength 0→1) when scrolled into view; `delay` sequences several paths. */
export function DrawPath({ duration = 1.2, delay = 0, ...props }: ComponentProps<typeof m.path> & { duration?: number; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <m.path
      data-motion=""
      data-draw=""
      initial={reduced ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={viewport}
      transition={{ ...transition, duration, delay }}
      {...props}
    />
  )
}
