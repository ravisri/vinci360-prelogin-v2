import type { ReactNode } from "react"

import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

const dotPosition = {
  tr: "top-3 right-3 md:top-5 md:right-5",
  tl: "top-3 left-3 md:top-5 md:left-5",
  br: "right-3 bottom-3 md:right-4 md:bottom-4",
  bl: "bottom-3 left-3 md:bottom-4 md:left-4",
} as const

type VisualPanelProps = {
  accent: Accent
  /** Corner of the decorative dot grid. */
  dots?: keyof typeof dotPosition
  children: ReactNode
  className?: string
}

/** Tinted panel that holds a mock frame, its float cards and hotspots (Hero, FeatureSplit). */
export function VisualPanel({ accent, dots = "tr", children, className }: VisualPanelProps) {
  return (
    <div className={cn("relative rounded-lg p-4 md:p-8", accents[accent].tint, className)}>
      <span aria-hidden="true" className={cn("dot-grid absolute h-20 w-28 md:h-30 md:w-40", dotPosition[dots])} />
      <div className="relative">{children}</div>
    </div>
  )
}
