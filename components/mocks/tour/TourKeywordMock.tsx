"use client"

import { ChevronDown } from "lucide-react"

import { HBar } from "@/components/charts/HBar"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { KpiCard } from "@/components/mocks/KpiCard"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { kpiProps } from "@/components/mocks/home/kpi"
import { catChip, MoodLegend, Panel, tagChip, TourFrame, TourHotspot } from "@/components/mocks/tour/TourFrame"
import { useTour } from "@/components/sections/tour/tour-context"
import { networks, tour } from "@/content/sample-data"
import { tourPage } from "@/content/tour"
import { sentimentGlyph, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const step = tourPage.steps[4]
const c = tourPage.mocks.keyword
const k = tour.keyword

/** Step 5 · Keyword Analysis: the "Bright Nights" campaign line on every widget. "Try this": the shared date window. */
export function TourKeywordMock() {
  const { range } = useTour()
  return (
    <TourFrame step={step}>
      <div className="flex items-stretch gap-2.5">
        <Panel className="min-w-42.5 flex-none gap-0.5 px-3 py-2.5">
          <p className="text-[0.6875rem] text-muted-foreground">{c.keyword}</p>
          <p className="flex items-center gap-1.5 text-sm font-bold">
            {k.term}
            <ChevronDown aria-hidden="true" strokeWidth={2} className="size-3" />
          </p>
          <p className="text-[0.65625rem] text-muted-foreground">{c.line}</p>
        </Panel>
        <div className="grid flex-1 grid-cols-4 gap-2">
          {k.kpis[range].map((kpi) => (
            <KpiCard key={`${kpi.label}-${range}`} size="sm" {...kpiProps(kpi)} delta={kpi.delta} className="px-2.5 [&>p:nth-child(2)]:text-base" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <Panel title={c.platforms} className="text-[0.71875rem]">
          <HBar
            ariaLabel={`${c.platforms}: ${k.platforms.map((p) => `${networks[p.network]} ${p.share}%`).join(", ")}`}
            tone="chart-3"
            thickness={7}
            labelClassName="w-15.5"
            className="gap-1.5 text-[0.71875rem]"
            data={k.platforms.map((p) => ({ label: networks[p.network], value: p.share, display: `${p.share}%` }))}
          />
          <div className="flex flex-col gap-1 border-t border-border pt-2">
            <p className="flex justify-between">
              <span>
                {c.strongest} {networks[k.strongest.network]}
              </span>
              <span className={sentimentText.pos}>
                {sentimentGlyph.pos} {c.net} {k.strongest.net}
              </span>
            </p>
            <p className="flex justify-between">
              <span>
                {c.weakest} {networks[k.weakest.network]}
              </span>
              <span className={sentimentText.neg}>
                {sentimentGlyph.neg} {c.net} {k.weakest.net}
              </span>
            </p>
          </div>
          <TourHotspot step={step} i={0} className="top-0 left-[78%]" />
        </Panel>

        <Panel title={c.sentiment} className="text-[0.71875rem]">
          <StackedBar100 data={k.split} height={20} className="[&_text]:text-[0.6875rem]" />
          <MoodLegend short />
          <p className="mt-1 text-[0.78125rem] font-semibold">{c.articles}</p>
          <ul>
            {k.articles.map((a) => (
              <li key={a.text} className="flex items-center gap-1.5 border-t border-border py-1.5">
                <NetworkIcon network={a.network} className="size-3.25 text-muted-foreground" />
                <span className="sr-only">{networks[a.network]}</span>
                <span className="flex-1">{a.text}</span>
                <SentimentChip sentiment={a.sentiment} short className="text-[0.625rem]" />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={c.hashtags} className="gap-1.5 text-[0.71875rem]">
          <ul className="flex flex-col gap-1.5">
            {k.hashtags.map((h) => (
              <li key={h.tag} className="flex justify-between">
                <span>{h.tag}</span>
                <span className={sentimentText[h.sentiment]}>
                  {sentimentGlyph[h.sentiment]} {h.net}
                </span>
              </li>
            ))}
          </ul>
          <div className="relative mt-1.5 flex flex-col gap-1.5">
            <p className="text-[0.78125rem] font-semibold">{c.categories}</p>
            <HBar
              ariaLabel={`${c.categories}: ${k.categories.map((x) => `${x.label} ${x.share}%`).join(", ")}`}
              thickness={7}
              labelClassName="w-18"
              className="gap-1.25 text-[0.71875rem]"
              data={k.categories.map((x) => ({ label: x.label, value: x.share, display: `${x.share}%` }))}
            />
            <TourHotspot step={step} i={2} className="top-2 right-3 translate-x-0" />
          </div>
          <TourHotspot step={step} i={1} className="top-0 right-6 translate-x-0" />
        </Panel>
      </div>

      <Panel className="flex-row flex-wrap items-center gap-x-4 gap-y-2 py-2.5 text-xs">
        <p className="text-[0.78125rem] font-semibold">{c.trending}</p>
        <ul className="flex flex-wrap gap-2">
          {k.trending.map((h) => (
            <li key={h} className={cn(tagChip, "text-chart-3")}>
              {h}
            </li>
          ))}
        </ul>
        <p className="ml-2 text-[0.78125rem] font-semibold">{c.topics}</p>
        <ul className="flex flex-wrap gap-2">
          {k.topics.map((t) => (
            <li key={t} className={catChip}>
              {t}
            </li>
          ))}
        </ul>
      </Panel>
    </TourFrame>
  )
}
