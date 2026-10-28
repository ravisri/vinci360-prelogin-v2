"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { trendsExplainer } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { scaleIn } from "@/lib/motion"
import { cn } from "@/lib/utils"

const c = trendsExplainer.chart
type Kind = (typeof trends.explainer)[number]["kind"]

const mark: Record<Kind, string> = {
  flat: "fill-card stroke-neutral-text [stroke-width:2.5]",
  breakout: "fill-trends stroke-ink [stroke-width:2]",
  rising: "fill-chart-1",
  risingSoft: "fill-chart-1 opacity-70",
  muted: "fill-on-dark-muted",
}

/* SVG text sizes in viewBox units; a little larger below sm, where the chart is drawn at ~60%. */
const axis = "fill-neutral-text text-[13px] font-semibold max-sm:text-[15px]"
const quadrant = "fill-muted-foreground text-[11px] max-sm:text-[13px]"
const label = "fill-foreground text-[12px] max-sm:text-[14px]"

/**
 * "Big is not the same as rising": topics by volume (x) and momentum (y), bubble size = volume.
 * Everything is drawn inside the 520×320 viewBox, so no axis label can overflow at any width.
 */
export function VolumeMomentumChart() {
  return (
    <ChartSvg viewBox="0 0 520 320" className="overflow-hidden font-sans">
      <rect x="50" y="10" width="460" height="260" rx="8" className="fill-background" />
      <line x1="280" y1="10" x2="280" y2="270" strokeDasharray="4 4" className="stroke-border" />
      <line x1="50" y1="140" x2="510" y2="140" strokeDasharray="4 4" className="stroke-border" />
      <line x1="50" y1="270" x2="510" y2="270" strokeWidth="1.5" className="stroke-neutral-text" />
      <line x1="50" y1="10" x2="50" y2="270" strokeWidth="1.5" className="stroke-neutral-text" />
      <text x="280" y="300" textAnchor="middle" className={axis}>
        {c.x}
      </text>
      <text x="22" y="140" textAnchor="middle" transform="rotate(-90 22 140)" className={axis}>
        {c.y}
      </text>
      <text x="500" y="30" textAnchor="end" className={quadrant}>
        {c.quadrants.bigRising}
      </text>
      <text x="500" y="262" textAnchor="end" className={quadrant}>
        {c.quadrants.bigFlat}
      </text>
      <text x="62" y="30" className={quadrant}>
        {c.quadrants.smallSurging}
      </text>
      {trends.explainer.map((b) => (
        <g key={b.topic}>
          <m.circle data-motion="" variants={scaleIn} cx={b.cx} cy={b.cy} r={b.r} className={cn("transform-fill origin-center", mark[b.kind])} />
          {b.kind === "flat" && (
            <text x={b.cx} y={b.cy + 12} textAnchor="middle" className="fill-neutral-text text-[10px] font-bold">
              {c.flat}
            </text>
          )}
          <text
            x={b.label.x}
            y={b.label.y}
            textAnchor={b.label.anchor}
            className={cn(label, b.kind === "flat" && "font-bold", b.kind === "breakout" && "fill-trends-text text-[12.5px] font-extrabold max-sm:text-[14px]")}
          >
            {b.topic}
            {b.kind === "breakout" && ` ${c.breakout}`}
          </text>
        </g>
      ))}
    </ChartSvg>
  )
}
