"use client"

import { useId, useState } from "react"
import { CalendarPlus, Check, Sparkles, X } from "lucide-react"

import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { ReachNote } from "@/components/mocks/ReachNote"
import { fmt } from "@/components/mocks/home/kpi"
import { catChip, hitArea, Panel, tagChip, TourFrame, TourHotspot } from "@/components/mocks/tour/TourFrame"
import { CountUp } from "@/components/motion/CountUp"
import { networks, tour } from "@/content/sample-data"
import { tourPage } from "@/content/tour"
import { cn } from "@/lib/utils"

const step = tourPage.steps[5]
const c = tourPage.mocks.stories
const ev = tour.evidence
const s = tour.story
const [lead, ...more] = tour.candidates
const compact = { notation: "compact", maximumFractionDigits: 2 } as const
const action = cn(hitArea, "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-sm border px-3.5 text-[0.8125rem] font-semibold")

type Decision = keyof typeof c.decisions

/** Step 6 · Promotable Stories: evidence threshold, the lead candidate with its evidence and actions, and the other candidates. */
export function TourStoriesMock() {
  const id = useId()
  const [min, setMin] = useState(ev.initial)
  const [decision, setDecision] = useState<Decision | null>(null)
  const shown = tour.candidates.filter((x) => x.posts >= min).length

  return (
    <TourFrame step={step} after={<ReachNote className="mt-3 xl:text-right" />}>
      <Panel className="flex-row flex-wrap items-center gap-x-4 gap-y-1 py-2.5">
        <label htmlFor={id} className="flex-none text-[0.78125rem] font-semibold">
          {c.evidence}
        </label>
        <input
          id={id}
          type="range"
          min={ev.min}
          max={ev.max}
          step={ev.step}
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="h-7 min-w-40 flex-1 cursor-pointer accent-chart-5"
        />
        <span className="flex-none text-xs font-bold text-amber-on-dark">{c.min(fmt(min))}</span>
        <span aria-live="polite" className="flex-none text-xs text-muted-foreground">
          {c.showing(shown, tour.candidates.length)}
        </span>
      </Panel>

      <div className="grid grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] gap-2.5">
        <div className="relative flex min-w-0 flex-col gap-3 rounded-lg border border-stories bg-card p-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-stories px-2.5 py-1 text-xs leading-[1.3] font-semibold text-ink">{c.candidate}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-on-dark px-2.5 py-1 text-xs leading-[1.3] font-semibold text-amber-on-dark">
              <Sparkles aria-hidden="true" strokeWidth={2} className="size-3" />
              {c.ai}
            </span>
          </div>
          <div className="relative">
            <p className="text-[0.6875rem] text-muted-foreground">{c.headline}</p>
            <p className="mt-0.5 font-heading text-[1.1875rem] leading-[1.25] font-extrabold">{lead.title}</p>
            <TourHotspot step={step} i={0} className="top-1 left-[56%]" />
          </div>
          <div className="flex flex-wrap items-center gap-1.25 text-[0.6875rem]">
            <span className="text-muted-foreground">{c.sources}</span>
            {s.tags.map((t) => (
              <span key={t} className={cn(tagChip, "text-amber-on-dark")}>
                {t}
              </span>
            ))}
            {s.keywords.map((t) => (
              <span key={t} className={catChip}>
                {t}
              </span>
            ))}
          </div>
          <dl className="relative grid grid-cols-4 gap-1.5 tabular">
            <div className="rounded-sm bg-background p-2">
              <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.volume}</dt>
              <dd className="font-heading text-[0.9375rem] font-bold">
                <CountUp value={s.volume.value} />
              </dd>
              <dd className="text-[0.625rem] text-muted-foreground">{s.volume.unit}</dd>
            </div>
            <div className="rounded-sm bg-background p-2">
              <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.engagement}</dt>
              <dd className="font-heading text-[0.9375rem] font-bold">
                <CountUp value={s.engagement.value} format={compact} locale="en-US" />
              </dd>
              <dd className="text-[0.625rem] text-muted-foreground">{s.engagement.unit}</dd>
            </div>
            <div className="rounded-sm bg-background p-2">
              <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.reach}</dt>
              <dd className="font-heading text-[0.9375rem] font-bold">
                <CountUp value={s.reach.value} format={compact} locale="en-US" />
              </dd>
              <dd className="text-[0.625rem] text-muted-foreground">{s.reach.unit}</dd>
            </div>
            <div className="rounded-sm bg-background p-2">
              <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.sentiment}</dt>
              <dd className="font-heading text-[0.9375rem] font-bold text-pos">
                <span aria-hidden="true">▲ </span>
                {s.positive}%
              </dd>
              <dd className="text-[0.625rem] text-muted-foreground">{c.stats.positive}</dd>
            </div>
            <TourHotspot step={step} i={1} className="top-3 right-0.5 translate-x-0" />
          </dl>
          <ul className="relative flex flex-col gap-1.5 text-xs">
            {s.posts.map((p) => (
              <li key={p.initials} className="flex items-center gap-2">
                <span aria-hidden="true" className="grid size-6 flex-none place-items-center rounded-full bg-border text-[0.625rem] font-bold">
                  {p.initials}
                </span>
                <span className="flex-1">{p.text}</span>
                <NetworkIcon network={p.network} className="size-3.5 text-muted-foreground" />
                <span className="sr-only">{networks[p.network]}</span>
              </li>
            ))}
            <TourHotspot step={step} i={2} className="top-1/2 left-[84%]" />
          </ul>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={decision === "accepted"} onClick={() => setDecision("accepted")} className={cn(action, "border-stories bg-stories text-ink")}>
              <Check aria-hidden="true" strokeWidth={2.2} className="size-4" />
              {c.accept}
            </button>
            <button type="button" aria-pressed={decision === "dismissed"} onClick={() => setDecision("dismissed")} className={cn(action, "border-border text-foreground hover:border-on-dark-focus")}>
              <X aria-hidden="true" strokeWidth={2} className="size-4" />
              {c.dismiss}
            </button>
            <button type="button" aria-pressed={decision === "calendar"} onClick={() => setDecision("calendar")} className={cn(action, "border-stories text-amber-on-dark")}>
              <CalendarPlus aria-hidden="true" strokeWidth={2} className="size-4" />
              {c.calendar}
            </button>
          </div>
          <p aria-live="polite" className="min-h-4.5 text-xs font-semibold text-amber-on-dark">
            {decision ? c.decisions[decision] : ""}
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-[0.6875rem] text-muted-foreground">{c.more}</p>
          <ul className="flex flex-col gap-2">
            {more.map((x) => {
              const below = x.posts < min
              return (
                // Dimmed with the muted token, not opacity, so the text keeps its contrast.
                <li key={x.title} className={cn("flex flex-col gap-1 rounded-lg border border-border bg-card px-3 py-2.5 text-xs", below && "border-dashed bg-background")}>
                  <span className={cn("font-semibold", below && "text-muted-foreground")}>{x.title}</span>
                  <span className="text-muted-foreground tabular">{c.meta(fmt(x.posts))}</span>
                  {below && <span className="text-[0.6875rem] font-semibold text-amber-on-dark">{c.below}</span>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </TourFrame>
  )
}
