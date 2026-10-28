"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { Delta } from "@/components/mocks/Delta"
import { indexPct, SvgMarker } from "@/components/mocks/compare/brand"
import { compareHero, compareViews } from "@/content/features/brand-compare"
import { compare } from "@/content/sample-data"
import { scaleIn } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Size = "sm" | "md" | "lg"

const dims: Record<Size, { h: number; font: number; r: number; label: string }> = {
  sm: { h: 38, font: 10.5, r: 5, label: "text-[0.6875rem] font-medium text-muted-foreground" },
  md: { h: 46, font: 11, r: 6, label: "text-xs font-medium text-muted-foreground" },
  lg: { h: 54, font: 12, r: 6.5, label: "text-[0.8125rem] font-semibold text-foreground" },
}

/** Literal grid templates per layout (label · track · optional reading column). */
const cols = {
  sm: "grid-cols-[4.5rem_minmax(0,1fr)]",
  md: "grid-cols-[5.375rem_minmax(0,1fr)]",
  lg: "grid-cols-[5rem_minmax(0,1fr)] md:grid-cols-[6.25rem_minmax(0,1fr)]",
  lgReading: "grid-cols-[5rem_minmax(0,1fr)] md:grid-cols-[6.25rem_minmax(0,1fr)_12.5rem]",
} as const

type IndexTrackProps = {
  size?: Size
  /** "▲ Aurora ahead of both" / "▼ Nimbus ahead by 14 pts" beside each row (desktop). */
  reading?: boolean
  className?: string
}

/**
 * Indexed comparison: Aurora fixed at 100 (dashed baseline), Nimbus (square) and Kestrel (triangle)
 * placed on a 50–130 scale. Nimbus's value sits above its marker and Kestrel's below, so the two
 * labels never collide. Decorative: the frame's figcaption carries the numbers.
 */
export function IndexTrack({ size = "md", reading, className }: IndexTrackProps) {
  const d = dims[size]
  const mid = d.h / 2
  const grid = size === "lg" ? (reading ? cols.lgReading : cols.lg) : cols[size]
  const base = `${indexPct(100)}%`
  return (
    <div aria-hidden="true" className={cn("flex flex-col tabular", className)}>
      {compare.indexVsAurora.map((row) => (
        <div key={row.metric} className={cn("grid items-center gap-3", grid)}>
          <span className={d.label}>{row.metric}</span>
          <ChartSvg width="100%" height={d.h} className="overflow-visible">
            <rect x="0" y={mid - 0.5} width="100%" height="1" className="fill-border" />
            <line x1={base} x2={base} y1="2" y2={d.h - 2} strokeWidth="2" strokeDasharray="4 4" className="stroke-chart-6" />
            <svg x={base} y="0" overflow="visible">
              <SvgMarker brand="aurora" y={mid} r={d.r} />
            </svg>
            {(["nimbus", "kestrel"] as const).map((b) => (
              <m.g key={b} data-motion="" variants={scaleIn}>
                <svg x={`${indexPct(row[b])}%`} y="0" overflow="visible">
                  <SvgMarker brand={b} y={mid} r={d.r} />
                  <text
                    y={b === "nimbus" ? mid - d.r - 4 : mid + d.r + 4}
                    textAnchor="middle"
                    dominantBaseline={b === "nimbus" ? "auto" : "hanging"}
                    fontSize={d.font}
                    className={cn("font-bold", b === "nimbus" ? "fill-chart-2" : "fill-chart-3")}
                  >
                    {row[b]}
                  </text>
                </svg>
              </m.g>
            ))}
          </ChartSvg>
          {reading && (
            <span className="text-[0.8125rem] max-md:hidden">
              {row.nimbus > 100 ? (
                <Delta trend="down" className="font-normal">{compareViews.reading.behind(row.nimbus - 100)}</Delta>
              ) : (
                <Delta trend="up" className="font-normal">{compareViews.reading.ahead}</Delta>
              )}
            </span>
          )}
        </div>
      ))}
      <div className={cn("grid gap-3 pt-1 text-[0.6875rem] text-muted-foreground", grid)}>
        <span />
        <span className="relative h-4">
          <span className="absolute left-0">{compareHero.axis.min}</span>
          <span className="absolute left-[62.5%] -translate-x-1/2 font-bold whitespace-nowrap text-chart-6">{compareHero.axis.mid}</span>
          <span className="absolute right-0">{compareHero.axis.max}</span>
        </span>
      </div>
    </div>
  )
}
