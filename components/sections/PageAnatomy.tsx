"use client"

import { useState } from "react"
import { Bookmark, CalendarDays } from "lucide-react"
import { m, useAnimationControls, useReducedMotion } from "motion/react"

import { Reveal } from "@/components/motion/Reveal"
import { featuresOverview as copy } from "@/content/features-overview"
import { featuresOverview as data } from "@/content/sample-data"
import { widgetPulse } from "@/lib/motion"
import { cn } from "@/lib/utils"

const a = copy.anatomy

function Zone({ n, label, children }: { n: number; label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-3 md:grid-cols-[2.25rem_minmax(0,1fr)]">
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full bg-ink font-heading text-[0.9375rem] font-extrabold text-primary-foreground"
      >
        {n}
      </span>
      <div className="flex min-w-0 flex-col gap-2">
        {label}
        {children}
      </div>
    </div>
  )
}

const zoneLabel = "text-xs font-bold tracking-[0.05em] text-muted-foreground uppercase"
const bar = "block rounded-[3px] bg-border"

/**
 * "Every page works the same way": the three-zone page anatomy. Filter chips are real toggles; changing
 * one marks every widget skeleton as updated and pulses them together, with the change announced politely.
 */
export function PageAnatomy({ className }: { className?: string }) {
  const [on, setOn] = useState<Record<string, boolean>>({})
  const controls = useAnimationControls()
  const reduced = useReducedMotion()
  const active = data.filterChips.filter((f) => on[f])
  const updated = active.length > 0

  const toggle = (f: string) => {
    setOn((prev) => ({ ...prev, [f]: !prev[f] }))
    if (!reduced)
      controls.start((i: number) => ({
        ...widgetPulse,
        transition: { ...widgetPulse.transition, delay: i * 0.04 },
      }))
  }

  const widget = cn(
    "rounded-lg border-[1.5px] bg-card transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none",
    updated ? "border-primary ring-3 ring-primary-tint" : "border-border"
  )
  const kpiWidths = ["w-[70%]", "w-[60%]", "w-[65%]", "w-[55%]"]

  return (
    <div className={cn("grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18.75rem]", className)}>
      <Reveal>
        <figure className="flex flex-col gap-3.5 rounded-lg border border-border bg-card p-4 md:p-6">
          <figcaption className="sr-only">{a.caption}</figcaption>

          <Zone n={1} label={<span className={zoneLabel}>{a.header.label}</span>}>
            <div className={cn(widget, "flex flex-wrap items-center gap-3 px-3.5 py-3")}>
              <span className="font-heading text-base font-bold">{a.header.module}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs leading-[1.3] font-semibold tabular">
                <CalendarDays aria-hidden="true" strokeWidth={2} className="size-3.25" />
                {a.header.date}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs leading-[1.3] font-semibold sm:ml-auto">
                <Bookmark aria-hidden="true" strokeWidth={2} className="size-3.25" />
                {a.header.saved}
              </span>
            </div>
          </Zone>

          <Zone
            n={2}
            label={
              <span className={zoneLabel}>
                {a.filterBar.label} <span className="font-medium tracking-normal normal-case">{a.filterBar.hint}</span>
              </span>
            }
          >
            <div className="flex flex-wrap gap-2 rounded-lg bg-background p-2.5">
              {data.filterChips.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={!!on[f]}
                  onClick={() => toggle(f)}
                  className={cn(
                    // 36px pill as drawn, with the hit area extended to 44px.
                    "relative inline-flex min-h-9 cursor-pointer items-center rounded-full border px-3 text-[0.8125rem] leading-none transition-colors before:absolute before:inset-x-0 before:-inset-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    on[f]
                      ? "border-primary bg-primary font-bold text-primary-foreground"
                      : "border-dashed border-input bg-card font-medium text-foreground hover:border-primary"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </Zone>

          <Zone
            n={3}
            label={
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className={zoneLabel}>{a.canvas.label}</span>
                <span aria-live="polite" className="text-xs font-semibold text-primary tabular">
                  {updated ? `${a.canvas.updated} ${active.join(" · ")}` : a.canvas.idle}
                </span>
              </span>
            }
          >
            <div aria-hidden="true" className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {kpiWidths.map((w, i) => (
                  <m.div key={w} custom={i} animate={controls} className={cn(widget, "h-15.5 p-2.5")}>
                    <span className={cn(bar, "h-1.5 w-1/2")} />
                    <span className={cn(bar, "mt-2 h-3.5 rounded-sm", w)} />
                  </m.div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{a.canvas.kpiNote}</p>
              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <m.div custom={4} animate={controls} className={cn(widget, "h-30 p-3")}>
                  <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="h-22.5 w-full">
                    <polyline
                      points="0,70 40,62 80,66 120,50 160,54 200,30 240,40 300,22"
                      fill="none"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      className="stroke-input"
                    />
                  </svg>
                </m.div>
                <m.div custom={5} animate={controls} className={cn(widget, "flex h-30 flex-col justify-center gap-2 p-3")}>
                  {["w-[90%]", "w-[70%]", "w-1/2", "w-[30%]"].map((w) => (
                    <span key={w} className={cn(bar, "h-2.5 rounded-sm", w)} />
                  ))}
                </m.div>
              </div>
              <p className="text-xs text-muted-foreground">{a.canvas.detailNote}</p>
              <m.div custom={6} animate={controls} className={cn(widget, "flex flex-col gap-2 px-3 py-2.5")}>
                {[0, 1].map((r) => (
                  <span key={r} className="flex items-center gap-2.5">
                    <span className="size-6 rounded-full bg-primary-tint" />
                    <span className={cn(bar, "h-2 flex-1 rounded-sm")} />
                    <span className="h-3.5 w-12 rounded-full bg-primary-tint" />
                  </span>
                ))}
              </m.div>
            </div>
          </Zone>
        </figure>
      </Reveal>

      <Reveal className="flex flex-col gap-1.5 rounded-lg bg-card p-6 shadow-card">
        <h3 className="mb-1 text-h4 font-bold">{a.filters.title}</h3>
        <p className="mb-2.5 text-sm text-muted-foreground">{a.filters.lead}</p>
        <ul className="flex flex-col">
          {a.filters.items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 border-b border-muted py-2.25 last:border-0">
              <Icon aria-hidden="true" strokeWidth={2} className="size-4.5 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
