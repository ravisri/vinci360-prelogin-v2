"use client"

import { useState } from "react"
import { ChartColumn } from "lucide-react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { HatchPattern, useHatchId } from "@/components/charts/Hatch"
import { tones, type ChartTone } from "@/components/charts/tones"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { signed } from "@/components/mocks/trends/data"
import { GrowRect } from "@/components/motion/GrowBar"
import { trendsTopicWidgets } from "@/content/features/trends"
import { brands, trends } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = trendsTopicWidgets.compare
type Metric = (typeof c.metrics)[number]["value"]
type Row = (typeof trends.competitors)[number]

const BRANDS = [
  { name: brands.aurora.name, tone: "chart-6" },
  { name: brands.nimbus.name, tone: "chart-3" },
  { name: brands.kestrel.name, tone: "chart-5" },
] as const satisfies readonly { name: string; tone: ChartTone }[]

/** Values, formatter, bar scale and gap unit per metric (the reference's logic). */
function view(r: Row, metric: Metric) {
  if (metric === "sov") {
    const total = r.mentions[0] + r.mentions[1] + r.mentions[2]
    const a = Math.round((r.mentions[0] / total) * 100)
    const n = Math.round((r.mentions[1] / total) * 100)
    return { vals: [a, n, 100 - a - n], fmt: (v: number) => `${v}%`, gapFmt: (v: number) => `${v} pts`, max: 100 }
  }
  if (metric === "mentions") return { vals: [...r.mentions], fmt, gapFmt: fmt, max: 9000 }
  if (metric === "engagement") return { vals: [...r.engagementK], fmt: (v: number) => `${v}K`, gapFmt: (v: number) => `${v}K`, max: 550 }
  return { vals: [...r.net], fmt: signed, gapFmt: (v: number) => `${v} pts`, max: 80 }
}

const cell = "border-b border-border px-3 py-2.5 align-middle"

/**
 * Block A7 · Compare with competitors: four trending topics side by side for the three brands, with
 * Aurora's gap to the leader. Wide table: from lg it fits; below, it scrolls with the topic pinned.
 */
export function CompareTopicsWidget() {
  const [metric, setMetric] = useState<Metric>("sov")
  const hatch = useHatchId()
  const note = metric === "sov" ? c.notes.sov : metric === "sentiment" ? c.notes.sentiment : c.notes.other

  return (
    <div className="relative">
      <MockFrame
        title={
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            <Segmented accent="trends" label={c.metricLabel} value={metric} options={c.metrics} onChange={setMetric} />
            <ul className="flex flex-wrap gap-x-3.5 gap-y-1 text-[0.71875rem] font-normal">
              {BRANDS.map((b) => (
                <li key={b.name} className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className={cn("size-2 rounded-full", tones[b.tone].bg)} />
                  {b.name}
                </li>
              ))}
            </ul>
          </div>
        }
        caption={c.caption}
        bodyClassName="gap-0 px-0 pt-4 pb-0 [&>div:first-child]:px-4 [&>div:first-child]:pb-3"
      >
        <div role="region" aria-label={c.regionLabel} tabIndex={0} className="overflow-x-auto">
          <table aria-live="polite" className="w-full min-w-176 table-fixed border-separate border-spacing-0 text-[0.78125rem] tabular">
            <colgroup>
              <col className="w-[24%]" />
              <col />
              <col />
              <col />
              <col className="w-[22%]" />
            </colgroup>
            <thead className="text-[0.6875rem] text-muted-foreground">
              <tr>
                <th scope="col" className={cn(cell, "sticky left-0 z-1 bg-background text-left font-normal")}>
                  {c.columns.topic}
                </th>
                {BRANDS.map((b) => (
                  <th key={b.name} scope="col" className={cn(cell, "text-left font-normal")}>
                    {b.name}
                  </th>
                ))}
                <th scope="col" className={cn(cell, "text-left font-normal")}>
                  {c.columns.gap}
                </th>
              </tr>
            </thead>
            <tbody>
              {trends.competitors.map((r) => {
                const v = view(r, metric)
                const gap = v.vals[0] - Math.max(v.vals[1], v.vals[2])
                const hl = r.highlight && "bg-muted"
                return (
                  <tr key={r.topic}>
                    <th scope="row" className={cn(cell, "sticky left-0 z-1 bg-background text-left font-bold", hl)}>
                      {r.topic}
                      <span className="block text-[0.65625rem] font-medium text-muted-foreground">{r.sub}</span>
                      {r.highlight && <Hotspot n="!" accent="trends" {...c.hotspot} className="top-1/2 right-0 translate-x-0" />}
                    </th>
                    {BRANDS.map((b, i) => {
                      const val = v.vals[i]
                      const w = Math.max(4, Math.round((Math.abs(val) / v.max) * 100))
                      return (
                        <td key={b.name} className={cn(cell, hl)}>
                          <span className="flex items-center gap-2">
                            <ChartSvg viewBox="0 0 100 8" preserveAspectRatio="none" className="h-1.75 max-w-27.5 min-w-0 flex-1 overflow-hidden rounded-full">
                              {val < 0 && <HatchPattern id={hatch} />}
                              <rect width="100" height="8" className="fill-border" />
                              <GrowRect axis="x" width={w} height="8" fill={val < 0 ? `url(#${hatch})` : undefined} className={val < 0 ? undefined : tones[b.tone].fill} />
                            </ChartSvg>
                            <strong>{v.fmt(val)}</strong>
                          </span>
                        </td>
                      )
                    })}
                    <td className={cn(cell, "font-bold", gap >= 0 ? "text-pos" : "text-neg", hl)}>
                      {gap >= 0 ? c.ahead : c.behind} {v.gapFmt(Math.abs(gap))}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-3 text-xs text-muted-foreground">{note}</p>
      </MockFrame>
      <FloatCard className="flex max-w-80 items-center gap-2.5 px-4 py-3 md:-right-13.5 md:-bottom-16">
        <ChartColumn aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-trends-text" />
        <span className="text-[0.84375rem] leading-[1.35] font-bold">{c.float}</span>
      </FloatCard>
    </div>
  )
}
