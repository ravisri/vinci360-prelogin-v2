"use client"

import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { MockFrame } from "@/components/mocks/MockFrame"
import {
  brandKeys,
  brandStyle,
  type BrandKey,
} from "@/components/mocks/compare/brand"
import {
  BrandHatchDefs,
  useBrandHatchId,
} from "@/components/mocks/compare/BrandStack"
import { darkCard } from "@/components/mocks/smi/styles"
import { compareWidgets } from "@/content/features/brand-compare"
import { brands, compare } from "@/content/sample-data"
import { fadeInLate, scaleIn, stagger } from "@/lib/motion"
import { cn } from "@/lib/utils"

const c = compareWidgets.overlap
const o = compare.topicOverlap
const r = o.regions

const circles: Record<BrandKey, { cx: number; cy: number; tint: string }> = {
  aurora: { cx: 95, cy: 80, tint: "fill-chart-6/15" },
  nimbus: { cx: 145, cy: 80, tint: "fill-chart-2/10" },
  kestrel: { cx: 120, cy: 125, tint: "fill-chart-3/10" },
}
const R = 62

/** Region counts, each placed inside its own region of the diagram. */
const counts = [
  { x: 62, y: 74, n: r.aurora },
  { x: 178, y: 74, n: r.nimbus },
  { x: 120, y: 168, n: r.kestrel },
  { x: 120, y: 50, n: r.auroraNimbus },
  { x: 85, y: 120, n: r.auroraKestrel },
  { x: 155, y: 120, n: r.nimbusKestrel },
]

const names = [
  { b: "aurora", x: 34, y: 12, anchor: "start" },
  { b: "nimbus", x: 206, y: 12, anchor: "end" },
  { b: "kestrel", x: 120, y: 204, anchor: "middle" },
] as const

function Venn() {
  return (
    <ChartSvg
      viewBox="0 0 240 210"
      variants={stagger(0.08)}
      className="mx-auto max-w-60"
    >
      {brandKeys.map((b) => (
        <m.circle
          key={b}
          data-motion=""
          variants={scaleIn}
          cx={circles[b].cx}
          cy={circles[b].cy}
          r={R}
          strokeWidth="2"
          strokeDasharray={
            b === "nimbus" ? "7 4" : b === "kestrel" ? "1.5 4" : undefined
          }
          strokeLinecap={b === "kestrel" ? "round" : "butt"}
          className={cn(circles[b].tint, brandStyle[b].stroke)}
        />
      ))}
      <m.g
        data-motion=""
        variants={fadeInLate}
        fontSize="15"
        className="font-heading font-extrabold tabular"
      >
        {counts.map((p) => (
          <text
            key={`${p.x}-${p.y}`}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-foreground"
          >
            {p.n}
          </text>
        ))}
        <circle cx="120" cy="95" r="13" className="fill-foreground" />
        <text
          x="120"
          y="95"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-background"
        >
          {o.sharedByAll}
        </text>
        {names.map((n) => (
          <text
            key={n.b}
            x={n.x}
            y={n.y}
            textAnchor={n.anchor}
            dominantBaseline="central"
            fontSize="12"
            className={cn("font-sans font-bold", brandStyle[n.b].fill)}
          >
            {brands[n.b].short}
          </text>
        ))}
      </m.g>
    </ChartSvg>
  )
}

function SharedOwnedBar({ brand }: { brand: BrandKey }) {
  const hatch = useBrandHatchId()
  const shared = o.sharedPct[brand]
  return (
    <svg
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
      className="block h-3 w-full overflow-hidden rounded-xs"
    >
      <BrandHatchDefs id={hatch} brand={brand} stretched />
      <rect width={shared} height="12" className={brandStyle[brand].fill} />
      <rect
        x={shared + 1}
        width={99 - shared}
        height="12"
        fill={`url(#${hatch})`}
      />
    </svg>
  )
}

/** 5 · Topic and hashtag overlap: Venn (circles scale in, counts after), shared vs owned bars, two lists. */
export function OverlapWidget() {
  return (
    <MockFrame caption={c.caption}>
      {/* The grid lives inside the body, so the frame header row (Sample data chip) stays on its own row. */}
      <div className="grid gap-4 md:grid-cols-[15rem_minmax(0,1fr)]">
        <div aria-hidden="true" className="flex flex-col gap-2">
          <p className="text-xs font-semibold">{c.venn}</p>
          <Venn />
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <p aria-hidden="true" className="text-xs font-semibold">
            {c.bars}
          </p>
          <ul
            aria-hidden="true"
            className="flex flex-col gap-2.5 text-xs tabular"
          >
            {brandKeys.map((b) => (
              <li
                key={b}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)_2.75rem] items-center gap-2"
              >
                <span className={cn("font-bold", brandStyle[b].text)}>
                  {brands[b].short}
                </span>
                <SharedOwnedBar brand={b} />
                <span className="text-right font-semibold">{o[b]}</span>
              </li>
            ))}
          </ul>
          <p
            aria-hidden="true"
            className="text-[0.6875rem] text-muted-foreground"
          >
            {c.barsNote}
          </p>
          <div className={cn(darkCard, "flex flex-col gap-1 p-3 text-xs")}>
            <p className="font-bold">{c.shared}</p>
            <p>{o.sharedTopics.join(" · ")}</p>
            <p className="text-muted-foreground">{o.sharedTags.join(" · ")}</p>
          </div>
          <div className={cn(darkCard, "flex flex-col gap-1 p-3 text-xs")}>
            <p className={cn("font-bold", brandStyle.aurora.text)}>{c.alone}</p>
            <p>{o.auroraTopics.join(" · ")}</p>
            <p className="text-muted-foreground">{o.auroraTags.join(" · ")}</p>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}
