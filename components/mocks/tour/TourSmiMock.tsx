"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Bars } from "@/components/charts/Bars"
import { HBar } from "@/components/charts/HBar"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { FloatCard } from "@/components/mocks/FloatCard"
import { KpiCard } from "@/components/mocks/KpiCard"
import { PostCard } from "@/components/mocks/PostCard"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { kpiProps, fmt } from "@/components/mocks/home/kpi"
import { chip, hitArea, MoodLegend, Panel, TourFrame, TourHotspot } from "@/components/mocks/tour/TourFrame"
import { useTour } from "@/components/sections/tour/tour-context"
import { channelNetworks } from "@/content/channels-data"
import { home, tour } from "@/content/sample-data"
import { tourPage } from "@/content/tour"
import { cn } from "@/lib/utils"

const step = tourPage.steps[1]
const c = tourPage.mocks.smi
const w = tour.week

/** Step 2 · Social Media Intelligence: KPI row, clickable week timeline, top topics and sentiment split, article feed. "Try this": click Saturday. */
const topics = home.risingTopics.rows.slice(0, 4)

export function TourSmiMock() {
  const { range, view } = useTour()
  const [day, setDay] = useState<number | null>(null)
  const feed = day === tour.spikeDay ? tour.feed.spike : tour.feed.all
  const filters = step.filters.map((f) => (f.label === "View" && view ? { ...f, value: channelNetworks[view].name } : f))

  return (
    <TourFrame
      step={step}
      filters={filters}
      float={
        <FloatCard className="md:relative md:mt-3.5 md:w-80 xl:absolute xl:-right-3.5 xl:bottom-5 xl:mt-0 xl:w-67.5">
          <PostCard {...tour.post} engagement={`${tour.post.engagement} ${c.engagements}`} className="p-0" />
        </FloatCard>
      }
    >
      <div className="relative grid grid-cols-5 gap-2">
        {tour.kpis[range].map((k, i) => (
          <KpiCard
            key={`${k.label}-${range}`}
            size="sm"
            {...kpiProps(k)}
            delta={k.delta}
            spark={{ data: tour.sparks[i], className: "w-12.5" }}
            className="p-2.5 [&>p:nth-child(2)]:text-lg"
          />
        ))}
        <TourHotspot step={step} i={0} className="top-full left-[9%]" />
      </div>

      <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-2.5">
        <Panel>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-muted-foreground">
            <p className="text-[0.78125rem] font-semibold text-foreground">{c.week}</p>
            <span className="ml-auto inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2 w-2.5 rounded-xs bg-chart-1" />
              {c.mentions}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 14 6" className="w-3.5">
                <line x1="0" y1="3" x2="14" y2="3" strokeWidth="2" strokeDasharray="4 2" className="stroke-chart-5" />
              </svg>
              {c.net}
            </span>
          </div>
          <div className="relative">
            <Bars
              ariaLabel={`${c.mentions} per day this week, Monday to Sunday, peaking on ${w.full[tour.spikeDay]} while net sentiment dipped that day.`}
              labels={w.labels}
              data={[{ label: c.mentions, values: w.volume, tone: "chart-1" }]}
              highlight={day ?? undefined}
              highlightTone="chart-6"
              line={{ values: w.net, tone: "chart-5", max: 30 }}
              max={2410}
              width={420}
              height={130}
            />
            {/* One button per day over its bar and label; the chart itself stays a labelled image. */}
            <div role="group" aria-label={c.mentions} className="absolute inset-0 grid grid-cols-7 gap-1">
              {w.labels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={day === i}
                  aria-label={c.dayLabel(w.full[i], fmt(w.volume[i]), w.net[i])}
                  onClick={() => setDay((d) => (d === i ? null : i))}
                  className={cn("cursor-pointer rounded-sm hover:bg-foreground/5", day === i && "outline-2 outline-foreground")}
                />
              ))}
            </div>
            <TourHotspot step={step} i={1} className="top-[30%] left-[57%]" />
          </div>
        </Panel>

        <div className="flex min-w-0 flex-col gap-2.5">
          <Panel title={c.platforms} className="text-[0.71875rem]">
            <HBar
              ariaLabel={`${c.platforms}: ${topics.map((t) => `${t.topic} ${t.score}`).join(", ")}`}
              labelClassName="w-28"
              max={100}
              thickness={7}
              className="gap-1.75 text-[0.71875rem]"
              data={topics.map((t) => ({ label: t.topic, value: t.score, display: String(t.score) }))}
            />
          </Panel>
          <Panel title={c.sentiment}>
            <StackedBar100 data={tour.sentimentSplit} height={20} className="[&_text]:text-[0.6875rem]" />
            <MoodLegend />
          </Panel>
        </div>
      </div>

      <Panel className="gap-1.5 py-2.5">
        <div className="flex min-h-8 items-center gap-2">
          <p className="text-[0.78125rem] font-semibold">
            {c.feed} · {day === null ? c.latest : c.filtered(w.full[day])}
          </p>
          {day !== null && (
            <button type="button" onClick={() => setDay(null)} className={cn(chip, hitArea, "ml-auto cursor-pointer hover:border-on-dark-focus")}>
              <X aria-hidden="true" strokeWidth={2} className="size-3" />
              {c.clear}
            </button>
          )}
        </div>
        <ul aria-live="polite">
          {feed.map((a) => (
            <li key={a.handle} className="flex items-center gap-2.5 border-t border-border py-1.5 text-[0.78125rem]">
              <span aria-hidden="true" className="grid size-6.5 flex-none place-items-center rounded-full bg-border text-[0.625rem] font-bold">
                {a.initials}
              </span>
              <span className="flex-none font-semibold">{a.handle}</span>
              <span className="min-w-0 flex-1 truncate">{a.text}</span>
              <SentimentChip sentiment={a.sentiment} short />
            </li>
          ))}
        </ul>
        <TourHotspot step={step} i={2} className="top-0 left-[22%]" />
      </Panel>
    </TourFrame>
  )
}
