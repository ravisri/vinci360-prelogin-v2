"use client"

import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { easeOutExpo, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

type CountUpProps = {
  value: number
  format?: Intl.NumberFormatOptions
  locale?: string
  duration?: number
  /**
   * Where a re-count starts when `value` changes after the first view: zero (default) or the value
   * shown before, so a live control (a slider, a keyword switch) tweens instead of restarting.
   */
  from?: "zero" | "previous"
  className?: string
}

/** KPI number that counts up when in view; server HTML and screen readers get the final value. */
export function CountUp({ value, format, locale = "en-GB", duration = 1.2, from = "zero", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useRef<number | null>(null)
  const inView = useInView(ref, viewport)
  const reduced = useReducedMotion()
  // Integers stay whole while counting (no "48,151.258" mid-animation).
  const fmt = new Intl.NumberFormat(locale, format ?? (Number.isInteger(value) ? { maximumFractionDigits: 0 } : undefined))
  const final = fmt.format(value)

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return
    if (!inView) {
      node.textContent = fmt.format(0)
      return
    }
    const start = from === "previous" && shown.current !== null ? shown.current : 0
    const controls = animate(start, value, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => {
        shown.current = v
        node.textContent = fmt.format(v)
      },
    })
    return () => controls.stop()
    // fmt is derived from locale/format; re-running on its identity would restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, duration, from])

  return (
    <span className={cn("tabular", className)}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  )
}
