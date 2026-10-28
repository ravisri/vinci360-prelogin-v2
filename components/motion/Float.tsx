"use client"

import type { ComponentProps } from "react"
import { m, useReducedMotion } from "motion/react"

/** Gentle vertical bob for floating cards; static when reduced motion is on. */
export function Float({ delay = 0, ...props }: ComponentProps<typeof m.div> & { delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <m.div
      animate={reduced ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay }}
      {...props}
    />
  )
}
