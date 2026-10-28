"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { linePath, tones, type ChartTone } from "@/components/charts/tones"
import { drawLine } from "@/lib/motion"
import { cn } from "@/lib/utils"

type SparklineProps = {
  data: readonly number[]
  /** Omit when the number next to it already says it all; the line is then decorative. */
  ariaLabel?: string
  tone?: ChartTone
  width?: number
  height?: number
  strokeWidth?: number
  /** Size classes, e.g. "w-14". Height follows the viewBox ratio. */
  className?: string
}

/** Tiny trend line with no axes; draws itself once in view. */
export function Sparkline({ data, ariaLabel, tone = "chart-1", width = 80, height = 24, strokeWidth = 2, className }: SparklineProps) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const pad = strokeWidth
  const pts = data.map((v, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * width
    const y = height - pad - ((v - min) / (max - min || 1)) * (height - pad * 2)
    return [x, y] as const
  })

  return (
    <ChartSvg ariaLabel={ariaLabel} viewBox={`0 0 ${width} ${height}`} className={cn("w-20", className)}>
      <m.path
        data-motion=""
        data-draw=""
        variants={drawLine}
        d={linePath(pts)}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={tones[tone].stroke}
      />
    </ChartSvg>
  )
}
