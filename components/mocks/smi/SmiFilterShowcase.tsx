"use client"

import { useState } from "react"
import { Bookmark, CalendarDays, ChevronDown, MoveHorizontal, Search } from "lucide-react"
import { m, useAnimationControls, useReducedMotion } from "motion/react"

import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { smiFilters as c } from "@/content/features/smi"
import { networks, type Network } from "@/content/sample-data"
import { widgetPulse } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Range = "today" | "7d" | "30d" | "custom"
const NETWORKS: Network[] = ["facebook", "x", "youtube", "instagram"]
const DEFAULTS = { range: "30d" as Range, off: [] as Network[], mood: 0 }
/** The 390 strip leads with the active default, as in the reference. */
const MOBILE_RANGES: Range[] = ["30d", "7d", "today", "custom"]

const groupLabel = "text-xs font-semibold tracking-[0.03em] text-neutral-text uppercase"
const chipBase =
  "inline-flex min-h-11 flex-none cursor-pointer items-center gap-2 rounded-full border px-4 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
const chipOn = "border-primary bg-primary font-bold text-primary-foreground"
const chipOff = "border-border bg-card font-medium text-foreground hover:border-primary hover:text-primary"
const staticChip = "inline-flex min-h-11 flex-none items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-medium whitespace-nowrap"

/**
 * "Slice it your way": a working filter bar. Changing any filter pulses every widget sketch once and
 * tags it "↻ updated", and the live note says what changed. Desktop shows grouped controls; below md
 * the reference's swipeable chip strip. Both share one state.
 */
export function SmiFilterShowcase() {
  const [range, setRange] = useState<Range>(DEFAULTS.range)
  const [off, setOff] = useState<Network[]>(DEFAULTS.off)
  const [mood, setMood] = useState(DEFAULTS.mood)
  const controls = useAnimationControls()
  const reduced = useReducedMotion()

  const pulse = () => {
    if (!reduced) controls.start((i: number) => ({ ...widgetPulse, transition: { ...widgetPulse.transition, delay: i * 0.04 } }))
  }
  const changeRange = (r: Range) => {
    setRange(r)
    pulse()
  }
  const toggleNetwork = (n: Network) => {
    setOff((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]))
    pulse()
  }
  const cycleMood = () => {
    setMood((x) => (x + 1) % c.sentiment.options.length)
    pulse()
  }
  const reset = () => {
    setRange(DEFAULTS.range)
    setOff(DEFAULTS.off)
    setMood(DEFAULTS.mood)
    pulse()
  }

  const changes = [
    c.date.options.find((o) => o.value === range)?.change,
    off.length ? `${c.platform.without} ${NETWORKS.filter((n) => off.includes(n)).map((n) => networks[n]).join(", ")}` : "",
    mood ? `${c.sentiment.options[mood]} ${c.sentiment.only}` : "",
  ].filter(Boolean)
  const updated = changes.length > 0
  const moodLabel = `${c.sentiment.label}: ${c.sentiment.options[mood]}`

  const widget = (span: string) =>
    cn(
      "relative flex flex-col gap-2 rounded-lg border-[1.5px] bg-card p-2.5 transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none",
      updated ? "border-primary ring-3 ring-primary-tint" : "border-border",
      span,
    )
  const updatedTag = <span className="text-[0.65625rem] font-semibold text-primary">{c.updated}</span>

  return (
    <section aria-labelledby="slice-h" className="flex flex-col gap-3.5 pt-14 pb-2 md:container-site md:gap-7 md:pt-24 md:pb-0">
      <Reveal className="max-md:px-4">
        <SectionHeader id="slice-h" title={c.title} lead={c.lead} className="max-md:[&>p]:hidden" />
        <p className="mt-3 text-[0.9375rem] text-muted-foreground md:hidden">{c.leadMobile}</p>
      </Reveal>

      {/* ---------------- 390: swipeable chip strip ---------------- */}
      <div className="flex flex-col gap-2 md:hidden">
        <div role="group" aria-label={c.stripLabel} className="scrollbar-none flex gap-2 overflow-x-auto px-4 pt-1 pb-2">
          {MOBILE_RANGES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => changeRange(r)}
              className={cn(chipBase, range === r ? chipOn : chipOff)}
            >
              {r === "30d" && <CalendarDays aria-hidden="true" strokeWidth={2} className="size-4" />}
              {c.date.options.find((o) => o.value === r)?.label}
            </button>
          ))}
          <span className={staticChip}>
            {c.moreMobile[0]}
            <ChevronDown aria-hidden="true" strokeWidth={2} className="size-4" />
          </span>
          <span className={staticChip}>
            <Search aria-hidden="true" strokeWidth={2} className="size-4" />
            {c.search}
          </span>
          {c.moreMobile.slice(1).map((label) => (
            <span key={label} className={staticChip}>
              {label}
              <ChevronDown aria-hidden="true" strokeWidth={2} className="size-4" />
            </span>
          ))}
        </div>
        <p className="flex items-center gap-1.5 px-4 text-xs text-muted-foreground">
          <MoveHorizontal aria-hidden="true" strokeWidth={2} className="size-4" />
          {c.swipe}
        </p>
      </div>

      {/* ---------------- 1440: grouped filter bar ---------------- */}
      <Reveal className="flex flex-col gap-6 rounded-lg bg-card p-4 shadow-card max-md:mx-4 md:p-6">
        <div className="flex flex-col gap-4 max-md:hidden">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-5">
            <div className="flex flex-col gap-2">
              <span className={groupLabel}>{c.date.label}</span>
              <Segmented
                tone="light"
                label={c.date.label}
                value={range}
                options={c.date.options as { value: Range; label: string }[]}
                onChange={changeRange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className={groupLabel}>{c.platform.label}</span>
              <div role="group" aria-label={c.platform.label} className="flex flex-wrap gap-2">
                {NETWORKS.map((n) => {
                  const on = !off.includes(n)
                  return (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={on}
                      aria-label={on ? c.platform.included(networks[n]) : c.platform.excluded(networks[n])}
                      onClick={() => toggleNetwork(n)}
                      className={cn(chipBase, on ? chipOn : cn(chipOff, "text-muted-foreground line-through"))}
                    >
                      <NetworkIcon network={n} className="size-4" />
                      {networks[n]}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={groupLabel}>{c.sentiment.label}</span>
              <button type="button" onClick={cycleMood} aria-label={moodLabel} className={cn(chipBase, mood ? chipOn : chipOff)}>
                {c.sentiment.options[mood]}
                <ChevronDown aria-hidden="true" strokeWidth={2} className="size-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 border-t border-neutral-tint pt-4">
            <label className="relative">
              <span className="sr-only">{c.search}</span>
              <Search aria-hidden="true" strokeWidth={2} className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder={c.search}
                className="h-11 w-48 rounded-full border border-border bg-card pr-4 pl-9.5 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
            </label>
            {c.more.map((label) => (
              <span key={label} className={staticChip}>
                {label}
                <ChevronDown aria-hidden="true" strokeWidth={2} className="size-4" />
              </span>
            ))}
            <button
              type="button"
              onClick={reset}
              className="ml-auto inline-flex min-h-11 cursor-pointer items-center px-1 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-700"
            >
              {c.reset}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="min-w-0 flex-[999_1_560px] rounded-lg bg-background p-4 max-md:hidden">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-bold">{c.canvasTitle}</p>
              <p aria-live="polite" className="text-[0.8125rem] font-semibold text-primary">
                {updated ? `${c.updatedFor} ${changes.join(" · ")}` : c.idle}
              </p>
            </div>
            <div aria-hidden="true" className="grid grid-cols-4 gap-2">
              {c.widgets.map((w, i) => (
                <m.div key={w.name} custom={i} animate={controls} className={widget(w.span.replace("col-span-2 ", ""))}>
                  <span className="text-xs font-semibold">{w.name}</span>
                  <span className={cn("block rounded-sm bg-primary-tint", w.bar)} />
                  {updated && <span className="absolute top-2 right-2.5">{updatedTag}</span>}
                </m.div>
              ))}
            </div>
          </div>

          {/* 390: five widgets, two columns, names only. */}
          <div aria-hidden="true" className="grid w-full grid-cols-2 gap-2 md:hidden">
            {c.widgets
              .filter((w) => w.mobile)
              .map((w, i) => (
                <m.div
                  key={w.name}
                  custom={i}
                  animate={controls}
                  className={cn(widget(i === 0 ? "col-span-2 flex-row items-center justify-between" : ""), "gap-0.5")}
                >
                  <span className="text-[0.8125rem] font-semibold">{w.name}</span>
                  {updated && updatedTag}
                </m.div>
              ))}
          </div>

          <div className="flex flex-[1_1_260px] gap-3 rounded-lg border border-border p-4 max-md:items-start md:flex-col md:p-5">
            <span aria-hidden="true" className="grid size-10 flex-none place-items-center rounded-lg bg-primary-tint text-primary">
              <Bookmark strokeWidth={2} className="size-5" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold md:text-lg">{c.saved.title}</h3>
              <p className="text-sm md:text-[0.90625rem]">{c.saved.text}</p>
            </div>
            <ul className="flex flex-col gap-1.5 text-[0.8125rem] max-md:hidden">
              {c.saved.items.map((s, i) => (
                <li key={s.name} className={cn("flex items-center justify-between gap-2 rounded-sm px-3 py-2", i === 0 ? "bg-primary-tint font-bold" : "bg-background")}>
                  {s.name}
                  {s.tag && <span className="text-primary">{s.tag}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
      {/* Mobile screen readers: the canvas is hidden on 390, so announce changes here too. */}
      <p aria-live="polite" className="sr-only md:hidden">
        {updated ? `${c.updatedFor} ${changes.join(" · ")}` : ""}
      </p>
    </section>
  )
}
