"use client"

import { useState } from "react"
import { BellRing, Mail } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { fmt } from "@/components/mocks/home/kpi"
import { hitArea, Panel, TourFrame, TourHotspot } from "@/components/mocks/tour/TourFrame"
import { tour } from "@/content/sample-data"
import { tourPage } from "@/content/tour"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const step = tourPage.steps[6]
const c = tourPage.mocks.reports
const cols = "grid grid-cols-[minmax(0,1fr)_4.375rem_5.125rem_5.75rem] gap-2"

type ReportType = keyof typeof c.types
type Period = keyof typeof c.periods
type Output = keyof typeof c.outputs

const segment = "inline-flex overflow-hidden rounded-sm border border-border"
const segButton = (on: boolean) =>
  cn(hitArea, "min-h-8 cursor-pointer px-3 text-xs", on ? "bg-reports-text font-bold text-primary-foreground" : "text-muted-foreground hover:text-foreground")

/** Step 7 · SMA Reports: light report preview, report type / period / output settings, alert rule and delivery preview. */
export function TourReportsMock() {
  const [type, setType] = useState<ReportType>("keyword")
  const [period, setPeriod] = useState<Period>("weekly")
  const [outputs, setOutputs] = useState<Record<Output, boolean>>({ screen: true, pdf: true, excel: false, email: true })
  const p = tour.periods[period]
  const on = (Object.keys(c.outputs) as Output[]).filter((o) => outputs[o])

  return (
    <TourFrame step={step}>
      <div className="grid grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-2.5">
        <div className="on-light relative min-w-0 rounded-lg bg-card">
          <div className="flex items-center justify-between gap-2 border-b border-muted px-3.5 py-2.5">
            <p className="font-heading text-sm font-extrabold">{p.title}</p>
            <span className="rounded-full bg-reports-tint px-2.5 py-1 text-[0.6875rem] leading-[1.3] font-semibold text-reports-text">{c.types[type]}</span>
          </div>
          <div className="px-3.5 pt-1 pb-3 text-xs tabular">
            <p aria-hidden="true" className={cn(cols, "border-b border-muted py-1.75 text-muted-foreground")}>
              <span>{c.columnName[type]}</span>
              <span className="text-right">{c.mentions}</span>
              <span className="text-right">{p.vs}</span>
              <span>{c.sentiment}</span>
            </p>
            <ul aria-live="polite">
              {tour.report[type].map((r) => (
                <li key={r.name} className={cn(cols, "border-b border-muted py-2")}>
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-right">{fmt(Math.round(r.mentions * p.factor))}</span>
                  <Delta trend={r.trend} className="text-right">
                    {r.change}
                  </Delta>
                  <span className={cn("font-semibold", sentimentText[r.sentiment])}>
                    <span aria-hidden="true">{sentimentGlyph[r.sentiment]} </span>
                    {sentimentLabel[r.sentiment]}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2.5 font-semibold text-primary">{c.open}</p>
          </div>
          <TourHotspot step={step} i={0} className="top-23 left-[26%]" />
        </div>

        <div className="flex min-w-0 flex-col gap-2.5">
          <Panel title={c.settings} className="gap-2.5 text-xs">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">{c.type}</span>
              <div role="group" aria-label={c.type} className={cn(segment, "w-fit")}>
                {(Object.keys(c.types) as ReportType[]).map((t) => (
                  <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={segButton(type === t)}>
                    {c.types[t]}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative flex flex-col gap-1">
              <span className="text-muted-foreground">{c.period}</span>
              <div role="group" aria-label={c.period} className={cn(segment, "w-fit")}>
                {(Object.keys(c.periods) as Period[]).map((x) => (
                  <button key={x} type="button" aria-pressed={period === x} onClick={() => setPeriod(x)} className={segButton(period === x)}>
                    {c.periods[x]}
                  </button>
                ))}
              </div>
              <TourHotspot step={step} i={1} className="top-1/2 right-4 translate-x-0" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">{c.output}</span>
              <div role="group" aria-label={c.output} className="flex flex-wrap gap-1.5">
                {(Object.keys(c.outputs) as Output[]).map((o) => (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={outputs[o]}
                    onClick={() => setOutputs((s) => ({ ...s, [o]: !s[o] }))}
                    className={cn(
                      hitArea,
                      "inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-sm border px-2.5 text-xs",
                      outputs[o] ? "border-magenta-on-dark font-bold text-foreground" : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span aria-hidden="true">{outputs[o] ? "✓" : "+"}</span>
                    {c.outputs[o]}
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          <Panel className="border-reports">
            <div className="flex items-center justify-between">
              <p className="inline-flex items-center gap-1.5 text-[0.78125rem] font-semibold">
                <BellRing aria-hidden="true" strokeWidth={2} className="size-3.75 text-magenta-on-dark" />
                {c.rule.title}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold text-magenta-on-dark">
                {c.rule.on}
                <span role="img" aria-label={c.rule.onLabel} className="relative h-4.5 w-8 rounded-full bg-reports">
                  <span className="absolute top-0.5 right-0.5 size-3.5 rounded-full bg-primary-foreground" />
                </span>
              </span>
            </div>
            <p className="text-[0.8125rem] leading-[1.45]">
              {c.rule.when} <strong>{c.rule.metric}</strong> {c.rule.verb} <strong>{c.rule.threshold}</strong> {c.rule.tail}
            </p>
            <TourHotspot step={step} i={2} className="top-0 left-[60%]" />
          </Panel>
        </div>
      </div>

      <p className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-card px-3.5 py-2.5 text-[0.78125rem]">
        <Mail aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-magenta-on-dark" />
        <span className="flex-1">
          <strong>{c.delivery}</strong> “{p.title}” · {c.to} · {p.when}
        </span>
        <span aria-live="polite" className="text-muted-foreground">
          {on.length ? on.map((o) => c.outputs[o]).join(" · ") : c.noOutput}
        </span>
      </p>
    </TourFrame>
  )
}
