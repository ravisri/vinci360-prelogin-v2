"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { linePath } from "@/components/charts/tones"
import { brandKeys, brandStyle, SvgMarker, type BrandKey } from "@/components/mocks/compare/brand"
import { brands } from "@/content/sample-data"
import { drawLine, fadeIn, fadeInLate } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type GapSeries = {
  labels: readonly string[]
  aurora: readonly number[]
  nimbus: readonly number[]
  kestrel: readonly number[]
}

const W = 600
const H = 240
const PAD_Y = 18
const X0 = 20
const XW = 500
const LABEL_X = 526

/** Literal column counts for the point-button overlay (8 weeks · 6 months · 4 quarters · 3 years). */
const gridCols: Record<number, string> = { 3: "grid-cols-3", 4: "grid-cols-4", 6: "grid-cols-6", 8: "grid-cols-8" }

/** Nimbus's lead over Aurora at point i, in index points (Aurora = 100). */
export const leadAt = (s: GapSeries, i: number) => Math.round((s.nimbus[i] / s.aurora[i]) * 100 - 100)

type GapTrendChartProps = {
  data: GapSeries
  /** Clickable columns: one button per point, labelled by `pointLabel`. */
  selected?: number | null
  onSelect?: (i: number) => void
  pointLabel?: (i: number) => string
  /** Period labels under the chart. */
  axis?: boolean
  className?: string
}

/**
 * Three brands over time with the distance between Nimbus (the leader) and Aurora shaded. Aurora
 * draws in (solid); Nimbus (dashed) and Kestrel (dotted) fade in, because a drawn line would lose
 * its dash pattern. Points sit at column centres so the overlay buttons line up with them.
 */
export function GapTrendChart({ data, selected = null, onSelect, pointLabel, axis = true, className }: GapTrendChartProps) {
  const n = data.labels.length
  const all = brandKeys.flatMap((b) => data[b])
  const min = Math.min(...all)
  const max = Math.max(...all)
  const pad = (max - min) * 0.08
  const lo = min - pad
  const hi = max + pad
  const x = (i: number) => X0 + ((i + 0.5) * XW) / n
  const y = (v: number) => PAD_Y + (1 - (v - lo) / (hi - lo)) * (H - PAD_Y * 2)
  const pts = (b: BrandKey) => data[b].map((v, i) => [x(i), y(v)] as const)

  const gap = [...pts("nimbus"), ...[...pts("aurora")].reverse()]
  const gapPath = `${linePath(gap)} Z`

  // End labels, nudged apart so they never overlap.
  const ends = brandKeys.map((b) => ({ b, y: y(data[b][n - 1]) })).sort((a, z) => a.y - z.y)
  for (let i = 1; i < ends.length; i++) ends[i].y = Math.max(ends[i].y, ends[i - 1].y + 15)

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="relative">
        <ChartSvg key={data.labels.join()} viewBox={`0 0 ${W} ${H}`} className="h-auto">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={X0} x2={X0 + XW} y1={H * f} y2={H * f} strokeWidth="1" className="stroke-border" />
          ))}
          {selected !== null && <rect x={x(selected) - XW / n / 2 + 2} y="2" width={XW / n - 4} height={H - 4} rx="6" strokeWidth="1.5" className="fill-chart-6/10 stroke-chart-6" />}
          <m.path data-motion="" variants={fadeInLate} d={gapPath} className="fill-chart-6/15" />
          {(["kestrel", "nimbus"] as const).map((b) => (
            <m.path
              key={b}
              data-motion=""
              variants={fadeIn}
              d={linePath(pts(b))}
              fill="none"
              strokeWidth="2.5"
              strokeDasharray={brandStyle[b].dash}
              strokeLinecap={b === "kestrel" ? "round" : "butt"}
              className={brandStyle[b].stroke}
            />
          ))}
          <m.path data-motion="" variants={drawLine} d={linePath(pts("aurora"))} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={brandStyle.aurora.stroke} />
          <m.g data-motion="" variants={fadeInLate}>
            {brandKeys.map((b) => pts(b).map(([px, py], i) => <SvgMarker key={`${b}-${i}`} brand={b} x={px} y={py} r={b === "aurora" ? 4.5 : 4} />))}
            {ends.map((e) => (
              <text key={e.b} x={LABEL_X} y={e.y} dominantBaseline="central" fontSize="11.5" className={cn("font-semibold", brandStyle[e.b].fill)}>
                {brands[e.b].short}
              </text>
            ))}
          </m.g>
        </ChartSvg>
        {onSelect && pointLabel && (
          <div className={cn("absolute inset-y-0 left-[3.333%] grid w-[83.333%]", gridCols[n])}>
            {data.labels.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={selected === i}
                aria-label={pointLabel(i)}
                onClick={() => onSelect(i)}
                className="cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
              />
            ))}
          </div>
        )}
      </div>
      {axis && (
        <div aria-hidden="true" className={cn("ml-[3.333%] grid w-[83.333%] text-center text-[0.6875rem] text-muted-foreground tabular", gridCols[n])}>
          {data.labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  )
}
