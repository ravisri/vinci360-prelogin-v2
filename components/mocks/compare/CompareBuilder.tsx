"use client"

import { useId, useState, type ReactNode } from "react"
import { Check, Info, Plus, X } from "lucide-react"
import { m } from "motion/react"

import { MockFrame } from "@/components/mocks/MockFrame"
import { ReachNote } from "@/components/mocks/ReachNote"
import { BrandMarker, brandKeys, indexPct, largestRemainder, type BrandKey } from "@/components/mocks/compare/brand"
import { BrandStack } from "@/components/mocks/compare/BrandStack"
import { Reveal } from "@/components/motion/Reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { compareBuilder as c } from "@/content/features/brand-compare"
import { brands, compare, compareTopics, type CompareTopic } from "@/content/sample-data"
import { transition } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Metric = (typeof c.metrics)[number]["value"]
type IndexMetric = keyof typeof compare.raw

const indexMetrics: { value: IndexMetric; label: string }[] = [
  { value: "mentions", label: "Mentions" },
  { value: "engagement", label: "Engagement" },
  { value: "sentiment", label: "Sentiment" },
  { value: "reach", label: "Reach" },
]

const groupLabel = "text-xs font-semibold tracking-[0.03em] text-neutral-text uppercase"
const chip =
  "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-sm font-medium whitespace-nowrap hover:bg-cmp-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
const chipOn = "aria-pressed:border-cmp-text aria-pressed:bg-cmp-tint aria-pressed:font-bold aria-pressed:text-cmp-text"
const addChip = "border-dashed border-cmp-text bg-transparent font-semibold text-cmp-text"

const toggle = <T,>(list: readonly T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])
const others = (own: BrandKey) => brandKeys.filter((b) => b !== own)

/**
 * "Build your comparison": own brand, competitor set, topics, metrics and range drive a live
 * preview. Shares are mentions weighted by each brand's topic mix (largest remainder, 100%);
 * the index is each rival vs the own brand (= 100). An empty selection says why, never goes blank.
 * Desktop uses selects and checkboxes; 390 uses an accordion of chips over the same state.
 */
export function CompareBuilder() {
  const [own, setOwn] = useState<BrandKey>("aurora")
  const [comps, setComps] = useState<BrandKey[]>(others("aurora"))
  const [topics, setTopics] = useState<CompareTopic[]>([...compareTopics])
  const [metrics, setMetrics] = useState<Metric[]>(c.metrics.filter((x) => x.on).map((x) => x.value))
  const [range, setRange] = useState("30d")
  const [granularity, setGranularity] = useState(c.granularities[0])
  const ids = { own: useId(), range: useId(), gran: useId() }

  const chooseOwn = (b: BrandKey) => {
    setOwn(b)
    setComps(others(b))
  }
  const addable = others(own).filter((b) => !comps.includes(b))
  const rangeOption = c.ranges.find((r) => r.value === range)
  const rangeLabel = (rangeOption && "preview" in rangeOption ? rangeOption.preview : undefined) ?? rangeOption?.label ?? ""

  /* --------------------------------- Preview --------------------------------- */
  const weight = (b: BrandKey) => topics.reduce((sum, p) => sum + compare.topicShare[b][p] / 100, 0)
  const set = [own, ...comps]
  const shares = largestRemainder(set.map((b) => compare.raw.mentions[b] * weight(b)))
  const total = shares.reduce((a, b) => a + b, 0)
  const empty = !topics.length ? c.empty.platform : !comps.length ? c.empty.competitor : !metrics.length ? c.empty.metric : null
  const index = (metric: IndexMetric, b: BrandKey) => {
    const w = (x: BrandKey) => (metric === "sentiment" ? 1 : weight(x))
    return Math.round(((compare.raw[metric][b] * w(b)) / (compare.raw[metric][own] * w(own))) * 100)
  }
  const rows = indexMetrics.filter((x) => metrics.includes(x.value))
  const live = empty ?? c.live(set.map((b, i) => `${brands[b].name} ${shares[i]}%`).join(", "), total)

  /* --------------------------------- Controls --------------------------------- */
  const competitorChips = (
    <div className="flex flex-wrap gap-2">
      {comps.map((b) => (
        <button
          key={b}
          type="button"
          aria-label={c.remove(brands[b].name)}
          onClick={() => setComps((s) => s.filter((x) => x !== b))}
          className={cn(chip, "group py-1.5 pr-1.5 pl-3.5 font-semibold")}
        >
          <BrandMarker brand={b} tone="light" className="size-3" />
          {brands[b].name}
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-neutral-tint group-hover:bg-card">
            <X strokeWidth={2.2} className="size-3.5" />
          </span>
        </button>
      ))}
      {addable.map((b) => (
        <button key={b} type="button" onClick={() => setComps((s) => [...s, b])} className={cn(chip, addChip)}>
          <Plus aria-hidden="true" strokeWidth={2.2} className="size-3.5" />
          {c.add(brands[b].name)}
        </button>
      ))}
    </div>
  )

  const topicChips = (
    <div className="flex flex-wrap gap-2">
      {compareTopics.map((p) => {
        const on = topics.includes(p)
        return (
          <button key={p} type="button" aria-pressed={on} onClick={() => setTopics((s) => toggle(s, p))} className={cn(chip, chipOn, !on && "text-muted-foreground line-through")}>
            {p}
          </button>
        )
      })}
    </div>
  )

  const summary: Record<string, string> = {
    own: brands[own].name,
    comps: c.summary.selected(comps.length),
    platform: topics.length === compareTopics.length ? c.summary.allPlatforms : c.summary.selected(topics.length),
    metric: c.summary.selected(metrics.length),
    range: `${rangeLabel} · ${granularity}`,
  }

  const mobileItems: { value: string; label: string; body: ReactNode }[] = [
    {
      value: "own",
      label: c.own,
      body: (
        <div className="flex flex-wrap gap-2">
          {brandKeys.map((b) => (
            <button key={b} type="button" aria-pressed={own === b} onClick={() => chooseOwn(b)} className={cn(chip, chipOn)}>
              {brands[b].name}
            </button>
          ))}
        </div>
      ),
    },
    { value: "comps", label: c.competitors, body: competitorChips },
    { value: "platform", label: c.platform, body: topicChips },
    {
      value: "metric",
      label: c.metricMobile,
      body: (
        <div className="flex flex-wrap gap-2">
          {c.metrics.map((x) => {
            const on = metrics.includes(x.value)
            return (
              <button key={x.value} type="button" aria-pressed={on} onClick={() => setMetrics((s) => toggle(s, x.value))} className={cn(chip, chipOn)}>
                {on && <Check aria-hidden="true" strokeWidth={2.5} className="size-3.5" />}
                {x.label}
              </button>
            )
          })}
        </div>
      ),
    },
    {
      value: "range",
      label: c.rangeMobile,
      body: (
        <div className="flex flex-wrap gap-2">
          {c.ranges
            .filter((r) => r.mobile)
            .map((r) => (
              <button key={r.value} type="button" aria-pressed={range === r.value} onClick={() => setRange(r.value)} className={cn(chip, chipOn)}>
                {r.label.replace("…", "")}
              </button>
            ))}
        </div>
      ),
    },
  ]

  return (
    <section aria-labelledby="build-h" className="container-site flex flex-col gap-7 pt-14 md:pt-35">
      <Reveal className="flex max-w-170 flex-col gap-3">
        <h2 id="build-h" className="text-h3 md:text-h2">
          {c.title}
        </h2>
        <p className="text-base text-muted-foreground md:text-lg">
          <span className="md:hidden">{c.leadMobile}</span>
          <span className="max-md:hidden">{c.lead}</span>
        </p>
      </Reveal>

      {/* 390: accordion cards on the page canvas; from md one white card with controls and preview side by side. */}
      <Reveal className="flex flex-wrap gap-6 md:gap-8 md:rounded-lg md:bg-card md:p-8 md:shadow-card">
        {/* 390: accordion of chips (own brand and competitors open). */}
        <Accordion type="multiple" defaultValue={["own", "comps"]} className="gap-2.5 md:hidden">
          {mobileItems.map((item) => (
            <AccordionItem key={item.value} value={item.value} className="rounded-lg border border-border bg-card px-4 not-last:border-b">
              <AccordionTrigger className="min-h-13 items-center py-3 text-[0.9375rem] font-bold hover:no-underline">
                <span className="flex flex-1 items-center justify-between gap-3 pr-2">
                  {item.label}
                  <span className="text-sm font-semibold text-cmp-text">{summary[item.value]}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">{item.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Desktop controls. */}
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-5 max-md:hidden">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.own} className={groupLabel}>
              {c.own}
            </label>
            <Select value={own} onValueChange={(v) => chooseOwn(v as BrandKey)}>
              <SelectTrigger id={ids.own} className="w-64 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {brandKeys.map((b) => (
                  <SelectItem key={b} value={b}>
                    {brands[b].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={groupLabel}>{c.competitors}</span>
            {competitorChips}
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={groupLabel}>{c.platform}</span>
            {topicChips}
          </div>
          <fieldset className="flex flex-col gap-1.5">
            <legend className={cn(groupLabel, "mb-1.5")}>{c.metric}</legend>
            <div className="flex flex-wrap gap-2">
              {c.metrics.map((x) => (
                <label
                  key={x.value}
                  className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-sm border border-border bg-card px-3 text-[0.9375rem] hover:bg-cmp-tint has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
                >
                  <Checkbox checked={metrics.includes(x.value)} onCheckedChange={() => setMetrics((s) => toggle(s, x.value))} className="size-4.5 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                  {x.label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.range} className={groupLabel}>
                {c.range}
              </label>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger id={ids.range} className="w-48 bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {c.ranges.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.gran} className={groupLabel}>
                {c.granularity}
              </label>
              <Select value={granularity} onValueChange={(v) => setGranularity(v as typeof granularity)}>
                <SelectTrigger id={ids.gran} className="w-40 bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {c.granularities.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Live preview. */}
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <MockFrame
            title={
              <>
                {c.preview}
                <span className="max-md:hidden"> · {rangeLabel}</span>
              </>
            }
            caption={live}
            bodyClassName="gap-4"
          >
            {empty ? (
              <p className="flex items-center gap-2.5 rounded-sm border border-dashed border-border px-3 py-4.5 text-[0.8125rem]">
                <Info aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-chart-6" />
                {empty}
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground max-md:hidden">{c.sovTotal(total)}</p>
                  <BrandStack
                    height={28}
                    hatchKestrel
                    items={set.map((b, i) => ({ brand: b, pct: shares[i], label: shares[i] >= 10 ? `${brands[b].name.split(" ")[0]} ${shares[i]}%` : `${shares[i]}%` }))}
                  />
                  <p className="text-xs text-muted-foreground md:hidden">{c.sovTotalMobile(total)}</p>
                </div>
                {rows.length > 0 && (
                  <div className="flex flex-col gap-2 max-md:hidden">
                    <p className="text-xs text-muted-foreground">{c.indexed(brands[own].name)}</p>
                    <ul className="flex flex-col gap-1.5 text-xs tabular">
                      {rows.map((r) => (
                        <li key={r.value} className="grid grid-cols-[5.25rem_minmax(0,1fr)_8.5rem] items-center gap-3">
                          <span className="font-semibold">{r.label}</span>
                          <span aria-hidden="true" className="relative h-4">
                            <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border" />
                            <span className="absolute top-0 left-[62.5%] h-4 border-l-2 border-dashed border-chart-6" />
                            {comps.map((b) => (
                              <m.span
                                key={b}
                                className="absolute inset-0 block"
                                initial={false}
                                animate={{ x: `${Math.min(Math.max(indexPct(index(r.value, b)), 0), 100)}%` }}
                                transition={transition}
                              >
                                <BrandMarker brand={b} className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
                              </m.span>
                            ))}
                          </span>
                          <span className="text-[0.6875rem] text-muted-foreground">{comps.map((b) => `${brands[b].short} ${index(r.value, b)}`).join(" · ")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {rows.some((r) => r.value === "reach") && <ReachNote className="text-xs max-md:hidden" />}
                {(metrics.includes("topics") || metrics.includes("hashtags")) && (
                  <ul className="flex flex-col gap-1 text-xs max-md:hidden">
                    {metrics.includes("topics") && <li>{c.topics(compare.topicOverlap.sharedByAll + comps.length, comps.map((b) => brands[b].short).join(" & "))}</li>}
                    {metrics.includes("hashtags") && <li>{c.hashtags}</li>}
                  </ul>
                )}
              </>
            )}
            <p aria-live="polite" className="sr-only">
              {live}
            </p>
          </MockFrame>
          <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 max-md:hidden">
            <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-sm bg-cmp-tint text-cmp-text">
              <Info strokeWidth={2} className="size-4.5" />
            </span>
            <p className="text-sm">
              <strong className="font-bold">{c.note.title}</strong> {c.note.text}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
