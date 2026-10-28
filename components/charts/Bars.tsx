"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { LabelLayer, type ChartLabel } from "@/components/charts/LabelLayer"
import { linePath, tones, type ChartTone } from "@/components/charts/tones"
import { GrowRect } from "@/components/motion/GrowBar"
import { fadeInLate } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type BarSeries = { label: string; values: readonly number[]; tone: ChartTone }

type BarsProps = {
  /** One series = simple bars; several = grouped bars per label. */
  data: readonly BarSeries[]
  labels: readonly string[]
  /** Shorter axis labels below md, e.g. M T W for Mon Tue Wed. */
  labelsShort?: readonly string[]
  ariaLabel: string
  /** Index of the bar to call out (first series): own tone + bold label. */
  highlight?: number
  highlightTone?: ChartTone
  /** Dashed overlay (e.g. net sentiment) on its own 0–max scale. */
  line?: { values: readonly number[]; tone: ChartTone; max?: number }
  /** Pre-formatted text above each bar, per series then per bar (functions can't cross the server boundary). */
  valueLabels?: readonly (readonly string[])[]
  max?: number
  legend?: boolean
  /** Category labels under the bars (off for small hero sketches that draw none). */
  axis?: boolean
  width?: number
  height?: number
  className?: string
}

/** Vertical bars that grow from the baseline with a stagger. */
export function Bars({
  data,
  labels,
  labelsShort,
  ariaLabel,
  highlight,
  highlightTone = "neg-dark",
  line,
  valueLabels,
  max,
  legend,
  axis = true,
  width = 420,
  height = 100,
  className,
}: BarsProps) {
  const top = valueLabels ? 18 : 4
  const ceiling = max ?? Math.max(...data.flatMap((s) => s.values))
  const pitch = width / labels.length
  const k = data.length
  const gap = 4
  const bw = k === 1 ? pitch * 0.53 : pitch * 0.28
  const groupW = k * bw + (k - 1) * gap
  const barX = (i: number, s: number) => i * pitch + (pitch - groupW) / 2 + s * (bw + gap)
  const barH = (v: number) => (v / ceiling) * (height - top)

  const lmax = line ? (line.max ?? Math.max(...line.values)) : 1
  const linePts = line?.values.map((v, i) => [i * pitch + pitch / 2, height - (v / lmax) * (height - top)] as const)

  const values: ChartLabel[] = valueLabels
    ? data.flatMap((s, si) =>
        s.values.map((v, i) => ({
          x: barX(i, si) + bw / 2,
          y: height - barH(v),
          dy: -5,
          // Grouped bars: nudge the outer labels apart so neighbours never touch on narrow charts.
          dx: k > 1 ? (si === 0 ? -2 : si === k - 1 ? 2 : 0) : 0,
          text: valueLabels[si]?.[i] ?? "",
          className: cn("tabular max-md:text-[10px]", si === 0 ? "fill-foreground" : "fill-muted-foreground", si === 0 && i === 0 && "font-bold"),
        })),
      )
    : []

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {legend && (
        <ul className="flex flex-wrap gap-x-3.5 gap-y-1 text-xs text-muted-foreground" aria-hidden="true">
          {data.map((s) => (
            <li key={s.label} className="flex items-center gap-1.5">
              <span className={cn("size-2.5 rounded-xs", tones[s.tone].bg)} />
              {s.label}
            </li>
          ))}
        </ul>
      )}
      <div className="relative">
        <ChartSvg ariaLabel={ariaLabel} viewBox={`0 0 ${width} ${height}`}>
          <line x1="0" x2={width} y1={height} y2={height} strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-border" />
          {data.map((s, si) =>
            s.values.map((v, i) => {
              const h = barH(v)
              const tone = si === 0 && i === highlight ? highlightTone : s.tone
              return <GrowRect key={`${s.label}-${i}`} x={barX(i, si)} y={height - h} width={bw} height={h} rx={k === 1 ? 4 : 3} className={tones[tone].fill} />
            }),
          )}
          {linePts && line && (
            <m.path
              data-motion=""
              variants={fadeInLate}
              d={linePath(linePts)}
              fill="none"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              className={cn(tones[line.tone].stroke, "max-md:stroke-3 max-md:[stroke-dasharray:7_5]")}
            />
          )}
        </ChartSvg>
        {values.length > 0 && <LabelLayer width={width} height={height} labels={values} />}
      </div>
      {axis && <div aria-hidden="true" className="grid auto-cols-fr grid-flow-col text-center text-[0.6875rem] text-muted-foreground">
        {labels.map((label, i) => (
          <span key={label + i} className={cn(i === highlight && "font-bold text-foreground")}>
            {labelsShort ? (
              <>
                <span className="md:hidden">{labelsShort[i]}</span>
                <span className="max-md:hidden">{label}</span>
              </>
            ) : (
              label
            )}
          </span>
        ))}
      </div>}
    </div>
  )
}
