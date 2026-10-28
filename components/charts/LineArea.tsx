"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { LabelLayer } from "@/components/charts/LabelLayer"
import { linePath, tones, type ChartTone } from "@/components/charts/tones"
import { drawLine, fadeInLate } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type LineSeries = {
  label: string
  values: readonly number[]
  tone: ChartTone
  /** area = filled line · line = solid · dashed = secondary series (fades in, no draw). */
  kind?: "area" | "line" | "dashed"
}

type LineAreaProps = {
  data: readonly LineSeries[]
  ariaLabel: string
  /** Spread evenly under the plot. */
  xLabels?: readonly string[]
  /** Scale ceiling; defaults to the largest value. */
  max?: number
  /** Scale floor (default 0), for series that live in a narrow band, e.g. share of voice. */
  min?: number
  gridlines?: number
  annotation?: { index: number; label: string; series?: number }
  legend?: boolean
  width?: number
  height?: number
  className?: string
}

/** Line (+ optional area) chart: the line draws, then the area fades in under it. */
export function LineArea({
  data,
  ariaLabel,
  xLabels,
  max,
  min = 0,
  gridlines = 4,
  annotation,
  legend,
  width = 640,
  height = 200,
  className,
}: LineAreaProps) {
  const ceiling = max ?? Math.max(...data.flatMap((s) => s.values))
  const point = (values: readonly number[], i: number) =>
    [(i / Math.max(values.length - 1, 1)) * width, height - ((values[i] - min) / (ceiling - min)) * height] as const
  const pointsOf = (values: readonly number[]) => values.map((_, i) => point(values, i))

  const annotated = annotation && data[annotation.series ?? 0]
  const [ax, ay] = annotated ? point(annotated.values, annotation.index) : [0, 0]
  const labelLeft = ax > width * 0.7

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {legend && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" aria-hidden="true">
          {data.map((s) => (
            <li key={s.label} className="flex items-center gap-1.5">
              {s.kind === "dashed" ? (
                <svg viewBox="0 0 16 4" className="w-4">
                  <line x1="0" y1="2" x2="16" y2="2" strokeWidth="2" strokeDasharray="5 3" className={tones[s.tone].stroke} />
                </svg>
              ) : (
                <span className={cn("h-2 w-3 rounded-xs", tones[s.tone].bg)} />
              )}
              {s.label}
            </li>
          ))}
        </ul>
      )}
      <div className="relative">
        <ChartSvg ariaLabel={ariaLabel} viewBox={`0 0 ${width} ${height}`}>
          {Array.from({ length: gridlines }, (_, i) => {
            const y = ((i + 1) / gridlines) * height
            return <line key={i} x1="0" x2={width} y1={y} y2={y} strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-border" />
          })}

          {data.map((s) => {
            const line = linePath(pointsOf(s.values))
            const t = tones[s.tone]
            if (s.kind === "dashed") {
              return (
                <m.path
                  key={s.label}
                  data-motion=""
                  variants={fadeInLate}
                  d={line}
                  fill="none"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                  className={cn(t.stroke, "max-md:stroke-[3.5] max-md:[stroke-dasharray:9_7]")}
                />
              )
            }
            return (
              <g key={s.label}>
                {s.kind !== "line" && (
                  <m.path data-motion="" variants={fadeInLate} d={`${line} L${width} ${height} L0 ${height} Z`} fillOpacity="0.22" className={t.fill} />
                )}
                <m.path
                  data-motion=""
                  data-draw=""
                  variants={drawLine}
                  d={line}
                  fill="none"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className={cn(t.stroke, "max-md:stroke-4")}
                />
              </g>
            )
          })}

          {annotated && (
            <m.circle
              data-motion=""
              variants={fadeInLate}
              cx={ax}
              cy={ay}
              r="4.5"
              strokeWidth="2.5"
              className={cn("fill-background max-md:[r:7]", tones[annotated.tone].stroke)}
            />
          )}
        </ChartSvg>
        {annotated && (
          <LabelLayer
            width={width}
            height={height}
            labels={[
              // Narrow charts: right of centre, the label goes left of the point so it stays inside.
              { x: ax, y: ay, dx: labelLeft || ax > width / 2 ? -11 : 11, dy: 4, anchor: labelLeft || ax > width / 2 ? "end" : "start", text: annotation.label, className: "fill-foreground md:hidden" },
              { x: ax, y: ay, dx: labelLeft ? -11 : 11, dy: 4, anchor: labelLeft ? "end" : "start", text: annotation.label, className: "fill-foreground max-md:hidden" },
            ]}
          />
        )}
      </div>
      {xLabels && (
        <div aria-hidden="true" className="flex justify-between text-[0.6875rem] text-muted-foreground">
          {xLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  )
}
