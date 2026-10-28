"use client"

import type { ComponentProps } from "react"
import { m, useReducedMotion } from "motion/react"

import { growX, growY, transition, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Bar that grows from its origin (left for x, bottom for y); size it with classes, not styles. */
export function GrowBar({
  axis = "x",
  delay = 0,
  className,
  ...props
}: ComponentProps<typeof m.div> & { axis?: "x" | "y"; delay?: number }) {
  const reduced = useReducedMotion()
  const key = axis === "x" ? "scaleX" : "scaleY"
  return (
    <m.div
      data-motion=""
      className={cn(axis === "x" ? "origin-left" : "origin-bottom", className)}
      initial={reduced ? false : { [key]: 0 }}
      whileInView={{ [key]: 1 }}
      viewport={viewport}
      transition={{ ...transition, delay }}
      {...props}
    />
  )
}

/**
 * SVG rect that grows from its origin. Inherits hidden/show from a parent that animates
 * (e.g. ChartSvg), so a set of bars staggers; `transform-fill` measures the origin (set in the
 * growX/growY presets) from the bar itself.
 */
export function GrowRect({
  axis = "y",
  className,
  ...props
}: ComponentProps<typeof m.rect> & { axis?: "x" | "y" }) {
  return (
    <m.rect
      data-motion=""
      variants={axis === "x" ? growX : growY}
      className={cn("transform-fill", className)}
      {...props}
    />
  )
}
