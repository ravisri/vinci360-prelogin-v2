"use client"

import type { ComponentProps } from "react"
import { m, useReducedMotion } from "motion/react"

import { staggerFast, viewport } from "@/lib/motion"

/** HTML counterpart of ChartSvg for charts laid out in rows (HBar, TagCloud). */
export function ChartRoot(props: ComponentProps<typeof m.div>) {
  const reduced = useReducedMotion()
  return (
    <m.div variants={staggerFast} initial={reduced ? false : "hidden"} whileInView="show" viewport={viewport} {...props} />
  )
}
