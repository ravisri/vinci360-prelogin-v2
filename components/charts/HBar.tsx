"use client"

import type { ReactNode } from "react"

import { ChartRoot } from "@/components/charts/ChartRoot"
import { HatchPattern, useHatchId } from "@/components/charts/Hatch"
import { tones, type ChartTone } from "@/components/charts/tones"
import { GrowRect } from "@/components/motion/GrowBar"
import { cn } from "@/lib/utils"

export type HBarRow = {
  label: string
  value: number
  /** Text shown at the end of the row, e.g. "62%" or "26,036". */
  display: string
  icon?: ReactNode
  /** Per-row colour; "neg" rows are hatched. */
  tone?: ChartTone
}

type HBarProps = {
  data: readonly HBarRow[]
  ariaLabel: string
  tone?: ChartTone
  /** Bars are relative to this; defaults to the largest value. */
  max?: number
  /** Track height in px. */
  thickness?: number
  /** Width class of the label column. */
  labelClassName?: string
  className?: string
}

/**
 * Horizontal bars, one per row. Bars use percentage geometry inside an SVG, so they stay crisp
 * at any width without stretching; labels stay HTML.
 */
export function HBar({ data, ariaLabel, tone = "chart-1", max, thickness = 8, labelClassName = "w-20", className }: HBarProps) {
  const ceiling = max ?? Math.max(...data.map((r) => r.value))
  const hatch = useHatchId()
  return (
    <ChartRoot role="img" aria-label={ariaLabel} className={cn("flex flex-col gap-2.5 text-xs", className)}>
      {data.map((row) => {
        const t = row.tone ?? tone
        const pct = `${(row.value / ceiling) * 100}%`
        return (
          <div key={row.label} className="flex items-center gap-2" aria-hidden="true">
            {row.icon && <span className="flex w-5.5 flex-none justify-center text-muted-foreground">{row.icon}</span>}
            <span className={cn("flex-none truncate text-muted-foreground", labelClassName)}>{row.label}</span>
            <svg width="100%" height={thickness} className="block min-w-0 flex-1 overflow-hidden rounded-full">
              {t === "neg" && <HatchPattern id={hatch} />}
              <rect width="100%" height={thickness} className="fill-border" />
              <GrowRect axis="x" width={pct} height={thickness} rx={thickness / 2} fill={t === "neg" ? `url(#${hatch})` : undefined} className={t === "neg" ? undefined : tones[t].fill} />
            </svg>
            <span className="w-11 flex-none text-right font-semibold tabular">{row.display}</span>
          </div>
        )
      })}
    </ChartRoot>
  )
}
