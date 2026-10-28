"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { tones, type ChartTone } from "@/components/charts/tones"
import { growX } from "@/lib/motion"
import { cn } from "@/lib/utils"

type ShareBarProps = {
  /** Segments in %, drawn left to right; a total under 100 leaves the track showing. */
  segs: readonly { share: number; tone: ChartTone }[]
  /** Omit when the shares are written out next to the bar. */
  ariaLabel?: string
  height?: number
  className?: string
}

/** Horizontal share bar (reactions by type, influence score, ratios) that grows from the left. Percent geometry, no inline styles. */
export function ShareBar({ segs, ariaLabel, height = 20, className }: ShareBarProps) {
  const starts = segs.map((_, i) => segs.slice(0, i).reduce((a, s) => a + s.share, 0))
  return (
    <ChartSvg ariaLabel={ariaLabel} width="100%" height={height} className={cn("overflow-hidden rounded-[5px]", className)}>
      <m.g data-motion="" variants={growX} className="transform-fill origin-left">
        {segs.map((s, i) => (
          <rect key={i} x={`${starts[i]}%`} width={`${s.share}%`} height={height} className={tones[s.tone].fill} />
        ))}
      </m.g>
    </ChartSvg>
  )
}
