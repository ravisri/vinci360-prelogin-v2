"use client"

import { useState } from "react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { sentimentPartAWidgets } from "@/content/features/sentiment-keywords"
import { networks, sentiment, type Split } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = sentimentPartAWidgets.platform
const rows = sentiment.platforms
const maxTotal = Math.max(...rows.map((p) => p.total))
const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 0,
})

type Mode = "count" | "pct"

/** Plain "52%" in the segments, as in the reference; the legend above carries the ▲ – ▼ glyphs. */
const pctLabels = (split: Split) => split.map((v) => `${v}%`) as unknown as [string, string, string]

/** Counts in a segment, e.g. "12K"; empty when the segment is too short to hold a label. */
const countLabels = (total: number, split: Split, extent: number) =>
  split.map((share) => (share * extent >= 12 ? compact.format((total * share) / 100) : "")) as unknown as [string, string, string]

/**
 * Part A · 1 · Platform-wise sentiment. "100% stacked" compares the mix; "Counts" scales each bar to
 * the platform's volume, which shows why Instagram's slide moves the total. The hotspot sits under
 * the Instagram row, clear of every label.
 */
export function PlatformSentimentWidget() {
  const [mode, setMode] = useState<Mode>("pct")
  const counts = mode === "count"
  return (
    <div className="relative">
      <MockFrame
        title={<Segmented accent="sent" label={c.showAs} value={mode} options={c.options as { value: Mode; label: string }[]} onChange={setMode} />}
        caption={c.caption}
      >
        <p aria-hidden="true" className="flex flex-wrap gap-x-3 text-[0.6875rem]">
          <span className="text-pos">{c.legend.pos}</span>
          <span className="text-neu">{c.legend.neu}</span>
          <span className="text-neg">{c.legend.neg}</span>
        </p>
        <ul
          aria-live="polite"
          className="grid grid-cols-[4.875rem_minmax(0,1fr)] items-center gap-x-2.5 gap-y-3.5 text-xs tabular sm:grid-cols-[4.875rem_minmax(0,1fr)_7.5rem]"
        >
          {rows.map((p) => {
            const extent = counts ? Math.max(0.14, p.total / maxTotal) : 1
            return (
              <li key={p.network} className="contents">
                <span className={cn(p.slipping ? "font-bold" : "font-medium")}>
                  {networks[p.network]}
                  <span className="block text-[0.65625rem] font-normal text-muted-foreground">
                    {fmt(p.total)} {c.mentions}
                  </span>
                </span>
                <StackedBar100
                  data={p.split}
                  height={20}
                  extent={extent}
                  segmentLabels={counts ? countLabels(p.total, p.split, extent) : pctLabels(p.split)}
                  highlight={p.slipping}
                  ariaLabel={`${networks[p.network]}: ${p.split
                    .map((s, i) => `${["positive", "neutral", "negative"][i]} ${s}%${counts ? ` (${fmt(Math.round((p.total * s) / 100))})` : ""}`)
                    .join(", ")}`}
                />
                <span className="flex flex-col leading-[1.3] max-sm:col-start-2 max-sm:flex-row max-sm:gap-2">
                  <span>
                    {c.net} <strong>+{p.net}</strong>
                  </span>
                  <Delta trend={p.trend} className="font-semibold">
                    {p.change} {c.vsPrev}
                  </Delta>
                </span>
              </li>
            )
          })}
        </ul>
      </MockFrame>
      <Hotspot n="!" accent="sent" {...c.hotspot} className="top-full left-[46%]" />
    </div>
  )
}
