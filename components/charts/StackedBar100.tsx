"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { HatchPattern, useHatchId } from "@/components/charts/Hatch"
import type { Sentiment, Split } from "@/content/sample-data"
import { growX } from "@/lib/motion"
import { sentimentGlyph, sentimentLabel } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

type StackedBar100Props = {
  /** Positive / neutral / negative shares in %. */
  data: Split
  /** Defaults to "Positive 52%, Neutral 30%, Negative 18%". */
  ariaLabel?: string
  /** Bar height in px; labels show from 18px up, on segments of 12% or more. */
  height?: number
  labels?: boolean
  /** Text inside each segment instead of "▲ 52%", e.g. compact counts ("15.6K"); empty = no label. */
  segmentLabels?: readonly [string, string, string]
  /** Share of the track the whole bar fills (0–1), e.g. a row scaled to its volume in a counts view. */
  extent?: number
  /** Outlined to call this row out (e.g. a mixed topic). */
  highlight?: boolean
  className?: string
}

const ORDER: Sentiment[] = ["pos", "neu", "neg"]
const FILL: Record<Sentiment, string> = { pos: "fill-pos-fill", neu: "fill-neu-fill", neg: "" }
const TEXT: Record<Sentiment, string> = { pos: "fill-ink", neu: "fill-ink", neg: "fill-primary-foreground" }
const GAP = 2

/** 100% stacked sentiment bar. Negative is hatched (SVG pattern) so it never relies on colour. */
export function StackedBar100({ data, ariaLabel, height = 24, labels = height >= 18, segmentLabels, extent = 1, highlight, className }: StackedBar100Props) {
  const hatch = useHatchId()
  const label = ariaLabel ?? ORDER.map((s, i) => `${sentimentLabel[s]} ${data[i]}%`).join(", ")
  const starts = ORDER.map((_, i) => data.slice(0, i).reduce((a, b) => a + b, 0) * extent)

  return (
    <div className={cn("rounded-sm", highlight && "outline-2 outline-offset-2 outline-chart-3", className)}>
      <ChartSvg ariaLabel={label} width="100%" height={height} className="overflow-hidden rounded-sm">
        <HatchPattern id={hatch} />
        <m.g data-motion="" variants={growX} className="transform-fill origin-left">
          {ORDER.map((s, i) => {
            const share = data[i]
            if (!share) return null
            const width = share * extent
            const inset = i ? GAP : 0
            const text = segmentLabels ? segmentLabels[i] : `${sentimentGlyph[s]} ${share}%`
            return (
              <svg key={s} x={`${starts[i]}%`} width={`${width}%`} height={height}>
                <rect x={inset} width="100%" height={height} className={FILL[s]} fill={s === "neg" ? `url(#${hatch})` : undefined} />
                {labels && width >= 12 && text && (
                  <text x={inset + 5} y={height / 2} dominantBaseline="central" fontSize="12" className={cn("font-semibold tabular max-sm:hidden", TEXT[s])}>
                    {text}
                  </text>
                )}
              </svg>
            )
          })}
        </m.g>
      </ChartSvg>
    </div>
  )
}

/** Legend for StackedBar100: "▲ Positive · – Neutral · ▼ Negative (hatched)". */
export function SentimentLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground", className)}>
      <li className="flex items-center gap-1.5">
        <span aria-hidden="true" className="size-3 rounded-xs bg-pos-fill" />▲ Positive
      </li>
      <li className="flex items-center gap-1.5">
        <span aria-hidden="true" className="size-3 rounded-xs bg-neu-fill" />– Neutral
      </li>
      <li className="flex items-center gap-1.5">
        <span aria-hidden="true" className="hatch-neg size-3 rounded-xs" />▼ Negative (hatched)
      </li>
    </ul>
  )
}
