"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { tones, type ChartTone } from "@/components/charts/tones"
import { fadeIn } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type DonutSlice = { label: string; value: number; tone: ChartTone }

type DonutProps = {
  data: readonly DonutSlice[]
  ariaLabel?: string
  /** Big centre value, e.g. "42%", and its caption, e.g. "Aurora". */
  center?: string
  sub?: string
  thickness?: number
  /** Gap between slices in viewBox units. */
  gap?: number
  legend?: boolean
  /** Size classes for the ring, e.g. "w-36". */
  className?: string
}

const SIZE = 140
const C = SIZE / 2

/** Ring chart; slices fade in one after another. */
export function Donut({ data, ariaLabel, center, sub, thickness = 20, gap = 0, legend, className }: DonutProps) {
  const r = 64 - thickness / 2
  const circ = 2 * Math.PI * r
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const starts = data.map((_, i) => data.slice(0, i).reduce((a, d) => a + (d.value / total) * circ, 0))

  return (
    <div className="flex flex-col items-center gap-3">
      <ChartSvg ariaLabel={ariaLabel} viewBox={`0 0 ${SIZE} ${SIZE}`} className={cn("w-36", className)}>
        <g transform={`rotate(-90 ${C} ${C})`}>
          {data.map((d, i) => {
            const len = (d.value / total) * circ
            return (
              <m.circle
                key={d.label}
                data-motion=""
                variants={fadeIn}
                cx={C}
                cy={C}
                r={r}
                fill="none"
                strokeWidth={thickness}
                strokeDasharray={`${Math.max(len - gap, 0)} ${circ}`}
                strokeDashoffset={-starts[i]}
                className={tones[d.tone].stroke}
              />
            )
          })}
        </g>
        {center && (
          <text x={C} y={sub ? C + 2 : C} textAnchor="middle" dominantBaseline={sub ? "auto" : "central"} fontSize="22" className="fill-foreground font-heading font-extrabold tabular">
            {center}
          </text>
        )}
        {sub && (
          <text x={C} y={C + 18} textAnchor="middle" fontSize="10" className="fill-muted-foreground">
            {sub}
          </text>
        )}
      </ChartSvg>
      {legend && (
        <ul className="flex w-full flex-col gap-1.5 text-xs" aria-hidden="true">
          {data.map((d) => (
            <li key={d.label} className="flex items-center gap-2">
              <span className={cn("size-2.5 rounded-xs", tones[d.tone].bg)} />
              <span className="text-muted-foreground">{d.label}</span>
              <span className="ml-auto font-semibold tabular">{Math.round((d.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
