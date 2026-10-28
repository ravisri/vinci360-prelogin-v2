"use client"

import { useId, useState } from "react"
import { ChevronDown, Info } from "lucide-react"
import { AnimatePresence, m } from "motion/react"

import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { fmt } from "@/components/mocks/home/kpi"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { MomentumBar } from "@/components/mocks/trends/MomentumBar"
import { byMomentum } from "@/components/mocks/trends/data"
import { LayoutMotion } from "@/components/motion/LayoutMotion"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { Switch } from "@/components/ui/switch"
import { trendsFilters as c } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { fadeIn, reorder } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Preset = (typeof c.date.options)[number]["value"]
const f = trends.filters

const groupLabel = "text-xs font-semibold tracking-[0.03em] text-neutral-text uppercase"
const staticChip = "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-sm font-medium whitespace-nowrap"

function StaticChip({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className={groupLabel}>
        {label}
        {note && <span className="font-medium tracking-normal normal-case"> {note}</span>}
      </span>
      <span className={staticChip}>
        {value}
        <ChevronDown aria-hidden="true" strokeWidth={2} className="size-3.5" />
      </span>
    </div>
  )
}

/**
 * "Narrow it down": one filter bar for topics and hashtags. The minimum-volume slider and the
 * "Growth only" switch filter a live mini scoreboard; when nothing passes, it says why.
 */
export function TrendsFilterShowcase() {
  const [preset, setPreset] = useState<Preset>("30")
  const [minVolume, setMinVolume] = useState(f.minVolume.min)
  const [growthOnly, setGrowthOnly] = useState(false)
  const ids = { volume: useId(), usage: useId(), growth: useId() }

  const shown = byMomentum.filter((t) => t.volume >= minVolume && (!growthOnly || t.growth >= f.growthOnlyFrom))
  const hidden = byMomentum.length - shown.length

  return (
    <section aria-labelledby="narrow-h" className="container-site flex flex-col gap-7 pt-14 md:pt-35">
      <Reveal>
        <SectionHeader id="narrow-h" title={c.title} lead={c.lead} />
      </Reveal>
      <Reveal className="flex flex-col gap-5.5 rounded-lg bg-card p-4 shadow-card md:p-6">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-4.5">
          <div className="flex flex-col gap-1.5">
            <span className={groupLabel}>{c.date.label}</span>
            <Segmented tone="light" accent="trends" label={c.date.label} value={preset} options={c.date.options} onChange={setPreset} />
          </div>
          {c.chips.map((chip) => (
            <StaticChip key={chip.label} {...chip} />
          ))}
          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.growth} className={groupLabel}>
              {c.growthOnly}
            </label>
            <span className="flex min-h-11 items-center">
              <Switch id={ids.growth} checked={growthOnly} onCheckedChange={setGrowthOnly} className="data-[state=checked]:bg-trends-text" />
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-x-6 gap-y-4.5 border-t border-neutral-tint pt-4">
          <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-1.5">
            <label htmlFor={ids.volume} className={cn(groupLabel, "flex justify-between gap-3")}>
              {c.minVolume}
              <span className="text-trends-text tabular normal-case tracking-normal">
                {fmt(minVolume)} {c.mentions}
              </span>
            </label>
            <input
              id={ids.volume}
              type="range"
              min={f.minVolume.min}
              max={f.minVolume.max}
              step={f.minVolume.step}
              value={minVolume}
              onChange={(e) => setMinVolume(Number(e.target.value))}
              aria-valuetext={`${fmt(minVolume)} ${c.mentions}`}
              className="h-8 w-full cursor-pointer accent-trends-text"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.usage} className={groupLabel}>
              {c.minUsage}
            </label>
            <input
              id={ids.usage}
              type="number"
              min={0}
              defaultValue={f.minUsage}
              className="h-11 w-30 rounded-lg border border-input bg-card px-3 text-[0.9375rem] tabular focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
          </div>
          <StaticChip label={c.competitors.label} note={c.competitors.note} value={c.competitors.value} />
          <StaticChip label={c.sortBy.label} value={c.sortBy.value} />
        </div>

        <div className="flex flex-wrap items-stretch gap-6">
          <div className="on-dark flex min-w-0 flex-[999_1_560px] flex-col gap-2.5 rounded-lg bg-background p-4 text-foreground tabular">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold">{c.boardTitle}</p>
              <SampleDataChip />
            </div>
            <LayoutMotion>
              <ol aria-live="polite" className="flex flex-col">
                <AnimatePresence initial={false} mode="popLayout">
                  {shown.map((t, i) => (
                    <m.li
                      key={t.topic}
                      layout="position"
                      variants={fadeIn}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      transition={reorder}
                      className="grid grid-cols-[1.25rem_minmax(0,1fr)_3rem_4rem] items-center gap-2.5 border-b border-border px-1 py-2 text-[0.78125rem] sm:grid-cols-[1.25rem_minmax(0,1fr)_4.375rem_7.5rem]"
                    >
                      <span className="text-muted-foreground">{i + 1}</span>
                      <span className="truncate">{t.topic}</span>
                      <span className="text-right">{fmt(t.volume)}</span>
                      <MomentumBar value={t.momentum} />
                    </m.li>
                  ))}
                </AnimatePresence>
              </ol>
              {shown.length === 0 && (
                <p className="flex items-center gap-2.5 rounded-sm border border-dashed border-border px-3 py-4.5 text-[0.8125rem]">
                  <Info aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-chart-2" />
                  {c.empty(fmt(minVolume))}
                </p>
              )}
            </LayoutMotion>
            <p className="text-xs text-muted-foreground">{hidden ? c.hidden(hidden) : c.allShown(byMomentum.length)}</p>
          </div>
          <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5 rounded-lg border border-border p-5">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-lg bg-trends-tint text-trends-text">
              <Info strokeWidth={2} className="size-5" />
            </span>
            <h3 className="text-lg font-bold">{c.side.title}</h3>
            <p className="text-[0.90625rem] text-muted-foreground">{c.side.text}</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
