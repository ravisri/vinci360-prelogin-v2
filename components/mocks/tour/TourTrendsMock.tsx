"use client"

import { useState } from "react"
import { m } from "motion/react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { TagCloud } from "@/components/charts/TagCloud"
import { tones, type ChartTone } from "@/components/charts/tones"
import { Delta } from "@/components/mocks/Delta"
import { fmt } from "@/components/mocks/home/kpi"
import { catChip, MoodLegend, Panel, tagChip, TourFrame, TourHotspot } from "@/components/mocks/tour/TourFrame"
import { GrowRect } from "@/components/motion/GrowBar"
import { useTour } from "@/components/sections/tour/tour-context"
import { brands, tour } from "@/content/sample-data"
import { tourPage } from "@/content/tour"
import { growX } from "@/lib/motion"
import { cn } from "@/lib/utils"

const step = tourPage.steps[2]
const c = tourPage.mocks.trends
const TONES: ChartTone[] = ["chart-6", "chart-3", "chart-5"]
const names = tour.brandOrder.map((b) => brands[b])
const cols = "grid grid-cols-[1.375rem_2.875rem_minmax(0,1fr)_3.875rem_6rem] items-center gap-2"

/** Step 3 · Trending Topics: selectable momentum scoreboard, topic detail, topic cloud and "who owns it" strip. "Try this": pick a topic. */
export function TourTrendsMock() {
  const { range } = useTour()
  const [sel, setSel] = useState(tour.topicInitial)
  const topic = tour.topics[sel]
  const starts = topic.owners.map((_, i) => topic.owners.slice(0, i).reduce((a, b) => a + b, 0))

  return (
    <TourFrame step={step}>
      <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-2.5">
        <div className="relative min-w-0 overflow-hidden rounded-lg border border-border bg-card pt-1.5 text-xs tabular">
          <div className="flex items-center justify-between px-3 py-1.5">
            <p className="text-[0.78125rem] font-semibold">{c.scoreboard}</p>
            <p className="text-[0.6875rem] text-muted-foreground">{c.rank}</p>
          </div>
          <p aria-hidden="true" className={cn(cols, "border-b border-border px-2.5 py-1.5 text-[0.6875rem] text-muted-foreground")}>
            {c.columns.map((col, i) => (
              <span key={col} className={cn(i === 3 && "text-right")}>
                {col}
              </span>
            ))}
          </p>
          <ol>
            {tour.topics.map((t, i) => (
              <li key={t.name}>
                <button
                  type="button"
                  aria-pressed={sel === i}
                  onClick={() => setSel(i)}
                  className={cn(
                    cols,
                    "relative min-h-10 w-full cursor-pointer border-b border-border px-2.5 py-2 text-left font-medium hover:bg-muted",
                    sel === i && "bg-border font-bold before:absolute before:inset-y-0 before:left-0 before:w-0.75 before:bg-trends"
                  )}
                >
                  <span>{i + 1}</span>
                  <Delta trend={t.trend}>{t.move}</Delta>
                  <span className="truncate">{t.name}</span>
                  <span className="text-right">{fmt(t.mentions[range])}</span>
                  <span className="flex items-center gap-1.5">
                    <ChartSvg viewBox="0 0 100 6" preserveAspectRatio="none" className="h-1.5 min-w-0 flex-1">
                      <rect width="100" height="6" rx="3" className="fill-border" />
                      <GrowRect axis="x" width={t.momentum} height="6" rx="3" className="fill-trends" />
                    </ChartSvg>
                    <span className="w-5 text-right">{t.momentum}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <TourHotspot step={step} i={0} className="top-5 left-[60%]" />
        </div>

        <Panel className="gap-2.5" key={sel}>
          <p className="text-[0.6875rem] text-muted-foreground">{c.selected}</p>
          <p aria-live="polite" className="-mt-2 font-heading text-[1.0625rem] font-extrabold">
            {topic.name}
          </p>
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.6875rem] text-muted-foreground">{c.hashtags}</p>
            <ul className="flex flex-wrap gap-1.25">
              {topic.tags.map((h) => (
                <li key={h} className={cn(tagChip, "text-trends")}>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.6875rem] text-muted-foreground">{c.categories}</p>
            <ul className="flex flex-wrap gap-1.25">
              {topic.categories.map((cat) => (
                <li key={cat} className={catChip}>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.6875rem] text-muted-foreground">{c.sentiment}</p>
            <StackedBar100 data={topic.split} height={20} className="[&_text]:text-[0.6875rem]" />
            <MoodLegend />
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-2.5">
        <Panel>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.78125rem] font-semibold">{c.cloud}</p>
            <MoodLegend />
          </div>
          <TagCloud ariaLabel={`${c.cloud}, size shows volume`} data={tour.topicCloud} className="[&_ul]:gap-x-4" />
          <TourHotspot step={step} i={1} className="top-0 left-[45%]" />
        </Panel>

        <Panel title={c.compare(topic.name)}>
          <ChartSvg
            key={sel}
            ariaLabel={`${c.compare(topic.name)}: ${names.map((b, i) => `${b.short} ${topic.owners[i]}%`).join(", ")}`}
            width="100%"
            height={22}
            className="overflow-hidden rounded-[5px]"
          >
            <m.g data-motion="" variants={growX} className="transform-fill origin-left">
              {topic.owners.map((share, i) => (
                <svg key={names[i].short} x={`${starts[i]}%`} width={`${share}%`} height={22}>
                  <rect x={i ? 2 : 0} width="100%" height={22} className={tones[TONES[i]].fill} />
                  <text x={(i ? 2 : 0) + 6} y={11} dominantBaseline="central" fontSize="11" className="fill-ink font-bold tabular">
                    {names[i].short} {share}%
                  </text>
                </svg>
              ))}
            </m.g>
          </ChartSvg>
          <TourHotspot step={step} i={2} className="top-0 left-[70%]" />
        </Panel>
      </div>
    </TourFrame>
  )
}
