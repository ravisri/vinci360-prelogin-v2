"use client"

import type { ComponentProps } from "react"
import { m, useReducedMotion } from "motion/react"

import { staggerFast, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

type ChartSvgProps = ComponentProps<typeof m.svg> & {
  /** Read by screen readers instead of the marks. Omit only for decorative charts. */
  ariaLabel?: string
}

/**
 * Root of every chart: an `img` with a label, revealed once on scroll. Children use the
 * chart presets in lib/motion and inherit hidden/show; reduced motion renders the final state.
 */
export function ChartSvg({ ariaLabel, className, children, ...props }: ChartSvgProps) {
  const reduced = useReducedMotion()
  return (
    <m.svg
      {...(ariaLabel ? { role: "img", "aria-label": ariaLabel } : { "aria-hidden": true })}
      focusable="false"
      variants={staggerFast}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      className={cn("block w-full overflow-visible", className)}
      {...props}
    >
      {children}
    </m.svg>
  )
}
