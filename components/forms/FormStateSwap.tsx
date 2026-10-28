"use client"

import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, m, useReducedMotion } from "motion/react"

import { crossFade, heightSwap } from "@/lib/motion"
import { cn } from "@/lib/utils"

type FormStateSwapProps = {
  /** Changes when the form switches state (form · success · error); the old view fades out first. */
  stateKey: string
  children: ReactNode
  className?: string
}

/**
 * Animates a form card between its states with no layout jump: the box eases to the measured height
 * of the incoming view while the views cross-fade. Clips vertically only (`overflow-y: clip` keeps
 * sticky children working and lets bleed elements overhang sideways). Instant with reduced motion.
 */
export function FormStateSwap({ stateKey, children, className }: FormStateSwapProps) {
  const reduced = useReducedMotion()
  const inner = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | "auto">("auto")

  useLayoutEffect(() => {
    const el = inner.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <m.div
      data-motion=""
      className={cn("overflow-y-clip", className)}
      initial={false}
      animate={{ height }}
      transition={reduced ? { duration: 0 } : heightSwap}
    >
      <div ref={inner}>
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={stateKey} variants={crossFade} initial={reduced ? false : "hidden"} animate="show" exit="exit">
            {children}
          </m.div>
        </AnimatePresence>
      </div>
    </m.div>
  )
}
