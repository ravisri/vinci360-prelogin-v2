"use client"

import { useId, useState } from "react"
import { AnimatePresence, m } from "motion/react"
import { Info } from "lucide-react"

import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { LayoutMotion } from "@/components/motion/LayoutMotion"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { storiesBar as c } from "@/content/features/promotable-stories"
import { networks, stories, type Network } from "@/content/sample-data"
import { crossFade, reorder } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Tone = "pos" | "all"
const order: Network[] = ["facebook", "x", "youtube", "instagram"]
const { min, max, step } = stories.threshold
const int = (v: number) => new Intl.NumberFormat("en-GB").format(Math.round(v))
const groupLabel = "text-xs font-semibold tracking-[0.03em] text-neutral-text uppercase"
const chip =
  "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-sm font-medium whitespace-nowrap hover:bg-stories-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-pressed:border-stories-text aria-pressed:bg-stories-tint aria-pressed:font-bold aria-pressed:text-stories-text"

/**
 * "Raise the bar": date, platform, sentiment and category filters plus an evidence threshold and
 * minimum volume / engagement. Ideas below the bar fade out of the list and the count updates
 * (announced politely). An empty list always says which filter emptied it.
 */
export function RaiseTheBar() {
  const ids = { slider: useId(), mSlider: useId(), cat: useId(), vol: useId(), eng: useId(), date: useId(), plat: useId() }
  const [preset, setPreset] = useState("30")
  const [platforms, setPlatforms] = useState<Network[]>(order)
  const [tone, setTone] = useState<Tone>("pos")
  const [category, setCategory] = useState(c.category.options[0])
  const [ev, setEv] = useState(min)
  const [minVol, setMinVol] = useState(0)
  const [minEng, setMinEng] = useState(0)

  const pool = stories.ideaPool.filter((x) => tone === "all" || x.tone === "pos")
  const afterEv = pool.filter((x) => x.score >= ev)
  const list = platforms.length ? afterEv.filter((x) => x.volume >= minVol && x.engagementK * 1000 >= minEng) : []
  const why = !platforms.length
    ? c.why.platform
    : afterEv.length
      ? pool.some((x) => x.volume >= minVol)
        ? c.why.engagement(int(minEng))
        : c.why.volume(int(minVol))
      : c.why.threshold
  const positivePool = stories.ideaPool.filter((x) => x.tone === "pos")
  const mobileCount = positivePool.filter((x) => x.score >= ev).length

  const slider = (id: string) => (
    <Slider
      id={id}
      min={min}
      max={max}
      step={step}
      value={[ev]}
      onValueChange={([v]) => setEv(v)}
      valueText={c.thresholdValue(ev)}
      rangeClassName="bg-stories"
      thumbClassName="border-stories-text"
    />
  )

  return (
    <section aria-labelledby="bar-h" className="container-site pt-11 md:pt-35">
      <div className="flex flex-col gap-3.5 md:gap-7">
        <Reveal>
          <SectionHeader id="bar-h" title={c.title} lead={c.lead} />
        </Reveal>

        {/* 390: the threshold alone, with a big count and one dot per positive idea. */}
        <div className="flex flex-col gap-3 rounded-lg bg-card p-4.5 shadow-card md:hidden">
          <label htmlFor={ids.mSlider} className="flex justify-between text-[0.8125rem] font-bold">
            {c.threshold} <span className="text-stories-text tabular">{c.thresholdShort(ev)}</span>
          </label>
          {slider(ids.mSlider)}
          <p aria-live="polite" className="flex items-baseline gap-2 tabular">
            <span className="font-heading text-4xl font-extrabold">{mobileCount}</span>
            <span className="text-[0.9375rem] text-neutral-text">{c.passMobile(positivePool.length)}</span>
          </p>
          <div aria-hidden="true" className="flex gap-1">
            {positivePool.map((x) => (
              <span key={x.title} className={cn("h-2.5 flex-1 rounded-xs transition-colors", x.score >= ev ? "bg-stories" : "bg-border")} />
            ))}
          </div>
          <span className="text-[0.78125rem] text-muted-foreground">
            {c.sentimentMobile} <strong className="text-stories-text">{c.sentiment.options[0].label}</strong>
          </span>
        </div>

        <Reveal className="flex flex-col gap-5.5 rounded-lg bg-card p-6 shadow-card max-md:hidden">
          <div className="flex flex-col gap-1.5">
            <span id={ids.date} className={groupLabel}>
              {c.date.label}
            </span>
            <Segmented label={c.date.label} tone="light" accent="stories" value={preset} options={c.date.options} onChange={setPreset} className="self-start" />
          </div>

          <div className="flex flex-wrap items-end gap-x-6 gap-y-4.5">
            <div className="flex flex-col gap-1.5">
              <span id={ids.plat} className={groupLabel}>
                {c.platform}
              </span>
              <div role="group" aria-labelledby={ids.plat} className="flex flex-wrap gap-1.5">
                {order.map((p) => {
                  const on = platforms.includes(p)
                  return (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPlatforms(on ? platforms.filter((x) => x !== p) : [...platforms, p])}
                      className={cn(chip, !on && "text-muted-foreground line-through")}
                    >
                      <NetworkIcon network={p} className="size-4" />
                      {networks[p]}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className={groupLabel}>{c.sentiment.label}</span>
              <Segmented label={c.sentiment.label} tone="light" accent="stories" value={tone} options={c.sentiment.options as { value: Tone; label: string }[]} onChange={setTone} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.cat} className={groupLabel}>
                {c.category.label}
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id={ids.cat} className="w-48 bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {c.category.options.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-x-6 gap-y-4.5 border-t border-border pt-4">
            <div className="flex min-w-65 flex-1 flex-col gap-1.5">
              <label htmlFor={ids.slider} className={cn(groupLabel, "flex justify-between")}>
                {c.threshold} <span className="tracking-normal text-stories-text normal-case tabular">{c.thresholdValue(ev)}</span>
              </label>
              {slider(ids.slider)}
              <span className="flex justify-between text-[0.71875rem] text-muted-foreground">
                <span>{c.ends[0]}</span>
                <span>{c.ends[1]}</span>
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.vol} className={groupLabel}>
                {c.minVolume}
              </label>
              <Input id={ids.vol} type="number" min={0} step={100} value={minVol} onChange={(e) => setMinVol(Math.max(0, parseInt(e.target.value, 10) || 0))} className="w-40 tabular" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.eng} className={groupLabel}>
                {c.minEngagement}
              </label>
              <Input id={ids.eng} type="number" min={0} step={1000} value={minEng} onChange={(e) => setMinEng(Math.max(0, parseInt(e.target.value, 10) || 0))} className="w-40 tabular" />
            </div>
          </div>

          <div className="flex flex-wrap items-stretch gap-6">
            <div className="on-dark flex min-w-0 flex-[999_1_560px] flex-col gap-2 rounded-lg bg-background p-4 text-foreground tabular">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span aria-live="polite" className="text-sm font-bold">
                  {c.pass(list.length, pool.length)}
                </span>
                <SampleDataChip />
              </div>
              <LayoutMotion>
                <ul aria-label={c.columns}>
                  <AnimatePresence initial={false}>
                    {list.map((x) => (
                      <m.li
                        key={x.title}
                        layout
                        variants={crossFade}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        transition={reorder}
                        className="grid grid-cols-[minmax(0,1fr)_4.375rem_4.375rem_7.5rem] items-center gap-2.5 border-b border-border px-1.5 py-2 text-[0.78125rem]"
                      >
                        <span>{x.title}</span>
                        <span className="text-right text-muted-foreground">
                          {int(x.volume)}
                          <span className="sr-only"> posts</span>
                        </span>
                        <span className="text-right text-muted-foreground">
                          {x.engagementK}K<span className="sr-only"> engagements</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span aria-hidden="true" className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                            <m.span initial={false} animate={{ scaleX: x.score / 100 }} className="block h-full origin-left rounded-full bg-stories" />
                          </span>
                          <span className="sr-only">{c.scoreLabel} </span>
                          {x.score}
                        </span>
                      </m.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </LayoutMotion>
              {list.length === 0 && (
                <p className="flex items-center gap-2.5 rounded-sm border border-dashed border-border p-4 text-[0.8125rem]">
                  <Info aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-amber-on-dark" />
                  {why}
                </p>
              )}
              <span className="text-[0.6875rem] text-muted-foreground">{c.columns}</span>
            </div>
            <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5 rounded-lg border border-border p-5">
              <span aria-hidden="true" className="grid size-10 place-items-center rounded-lg bg-stories-tint text-stories-text">
                <Info strokeWidth={2} className="size-5" />
              </span>
              <h3 className="text-lg font-bold">{c.aside.title}</h3>
              <p className="text-[0.90625rem] text-muted-foreground">{c.aside.text}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
