"use client"

import { useId, useState } from "react"
import { ChevronDown, Info } from "lucide-react"
import { m, useAnimationControls, useReducedMotion } from "motion/react"

import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { useSentimentState } from "@/components/mocks/sentiment/SentimentStateProvider"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sentimentFilters as c } from "@/content/features/sentiment-keywords"
import { networks, sentiment, type Network } from "@/content/sample-data"
import { widgetPulse } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Tab = "sent" | "key"
const NETWORKS: Network[] = ["facebook", "x", "youtube", "instagram"]
const t = sentiment.threshold

const groupLabel = "text-xs font-semibold tracking-[0.03em] text-neutral-text uppercase"
const chipBase =
  "inline-flex min-h-11 flex-none items-center gap-1.5 rounded-full border px-3.5 text-sm leading-none whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
const chipOn = "border-sent-text bg-sent-tint font-bold text-sent-text"
const chipStatic = "border-border bg-card font-medium"

function StaticChip({ label, value, on, note }: { label: string; value: string; on?: boolean; note?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className={groupLabel}>
        {label}
        {note && <span className="tracking-normal text-neg normal-case"> {note}</span>}
      </span>
      <span className={cn(chipBase, on ? chipOn : chipStatic)}>
        {value}
        <ChevronDown aria-hidden="true" strokeWidth={2} className="size-3.5" />
      </span>
    </div>
  )
}

/** Platform toggles, shared by both filter sets (switching one off updates every widget). */
function PlatformChips({ off, onToggle }: { off: readonly Network[]; onToggle: (n: Network) => void }) {
  const labelId = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <span id={labelId} className={groupLabel}>
        {c.platform.label}
      </span>
      <div role="group" aria-labelledby={labelId} className="flex flex-wrap gap-1.5">
        {NETWORKS.map((n) => {
          const on = !off.includes(n)
          return (
            <button
              key={n}
              type="button"
              aria-pressed={on}
              aria-label={on ? c.platform.included(networks[n]) : c.platform.excluded(networks[n])}
              onClick={() => onToggle(n)}
              className={cn(
                chipBase,
                "cursor-pointer",
                on ? chipOn : "border-border bg-card font-medium text-muted-foreground line-through hover:border-sent-text",
              )}
            >
              <NetworkIcon network={n} className="size-4" />
              {networks[n]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * "Narrow it down": separate filter sets for the Sentiment and Keyword modules (tabs, arrow keys).
 * Switching a platform off pulses every widget sketch once and tags it "↻ updated"; the threshold
 * slider is the same control as Part A block 3; when a filter would empty a widget, it says why.
 */
export function SentimentFilterShowcase() {
  const { threshold, setThreshold, keyword, off, toggleNetwork } = useSentimentState()
  const [tab, setTab] = useState<Tab>("sent")
  const controls = useAnimationControls()
  const reduced = useReducedMotion()
  const ids = { entity: useId(), threshold: useId() }

  const toggle = (n: Network) => {
    toggleNetwork(n)
    if (!reduced)
      controls.start((i: number) => ({
        ...widgetPulse,
        transition: { ...widgetPulse.transition, delay: i * 0.04 },
      }))
  }

  const updated = off.length > 0
  const note = updated
    ? `${c.without} ${NETWORKS.filter((n) => off.includes(n))
        .map((n) => networks[n])
        .join(", ")}`
    : c.allPlatforms
  const valueText = `${threshold}% confidence`
  const kwName = sentiment.keywords[keyword].name

  return (
    <section aria-labelledby="narrow-h" className="container-site flex flex-col gap-7 pt-14 md:pt-35">
      <Reveal>
        <SectionHeader id="narrow-h" title={c.title} lead={c.lead} />
      </Reveal>
      <Reveal className="flex flex-col gap-5.5 rounded-lg bg-card px-4 pb-4 shadow-card md:px-7 md:pb-7">
        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="flex-col gap-5.5">
          <TabsList
            variant="line"
            aria-label={c.tabsLabel}
            className="scrollbar-none h-auto w-full justify-start gap-1 overflow-x-auto rounded-none border-b border-border p-0"
          >
            {c.tabs.map((x) => (
              <TabsTrigger
                key={x.value}
                value={x.value}
                className="min-h-12 flex-none cursor-pointer rounded-none border-0 border-b-3 border-transparent px-4.5 text-[0.9375rem] text-neutral-text after:hidden hover:text-foreground focus-visible:ring-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[state=active]:border-sent-text data-[state=active]:font-bold data-[state=active]:text-foreground"
              >
                {x.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="sent" className="flex flex-wrap items-end gap-x-5.5 gap-y-4.5 text-base">
            <StaticChip label={c.date.label} value={c.date.value} />
            <PlatformChips off={off} onToggle={toggle} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.entity} className={groupLabel}>
                {c.keywordEntity.label}
              </label>
              <input
                id={ids.entity}
                type="text"
                placeholder={c.keywordEntity.placeholder}
                className="h-11 w-45 rounded-full border border-input bg-card px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
            </div>
            <StaticChip label={c.hashtag.label} value={c.hashtag.value} />
            <div className="flex min-w-50 flex-col gap-1.5">
              <span id={ids.threshold} className={groupLabel}>
                {c.threshold} <span className="tabular">{valueText}</span>
              </span>
              <Slider
                min={t.min}
                max={t.max}
                step={t.step}
                value={[threshold]}
                onValueChange={([v]) => setThreshold(v)}
                aria-labelledby={ids.threshold}
                valueText={valueText}
                rangeClassName="bg-sent-text"
                thumbClassName="border-sent-text"
              />
            </div>
            <StaticChip label={c.language.label} value={c.language.value} />
          </TabsContent>

          <TabsContent value="key" className="flex flex-wrap items-end gap-x-5.5 gap-y-4.5 text-base">
            <StaticChip label={c.keyword.label} note={c.keyword.required} value={kwName} on />
            <StaticChip label={c.date.label} value={c.date.value} />
            <PlatformChips off={off} onToggle={toggle} />
            <StaticChip label={c.sentiment.label} value={c.sentiment.value} />
            <StaticChip label={c.category.label} value={c.category.value} />
            <StaticChip label={c.hashtag.label} value={c.hashtag.value} />
            <StaticChip label={c.language.label} value={c.language.value} />
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap items-stretch gap-6">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-2.5 rounded-lg bg-background p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold">{c.canvasTitle}</p>
              <p aria-live="polite" className="text-[0.8125rem] font-semibold text-sent-text">
                {note}
              </p>
            </div>
            <div aria-hidden="true" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {c.widgets[tab].map((name, i) => (
                <m.div
                  key={name}
                  custom={i}
                  animate={controls}
                  className={cn(
                    "relative flex flex-col gap-1.5 rounded-lg border-[1.5px] bg-card p-2.5 text-xs font-semibold transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none",
                    updated ? "border-sent-text ring-3 ring-sent-tint" : "border-border",
                  )}
                >
                  <span className={cn(updated && "pr-16")}>{name}</span>
                  {updated && <span className="absolute top-2 right-2 text-[0.65625rem] font-bold text-sent-text">{c.updated}</span>}
                  <span className="block h-7.5 rounded-[6px] bg-sent-tint" />
                </m.div>
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5 rounded-lg border border-border p-5">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-lg bg-sent-tint text-sent-text">
              <Info strokeWidth={2} className="size-5" />
            </span>
            <h3 className="text-lg font-bold">{c.side.title}</h3>
            <p className="text-[0.90625rem] text-muted-foreground">{c.side.text}</p>
            <p className="rounded-sm bg-background px-3 py-2.5 text-[0.8125rem] text-neutral-text">{c.side.example}</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
