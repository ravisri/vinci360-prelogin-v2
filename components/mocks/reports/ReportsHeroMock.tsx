import { Mail, Tag, TriangleAlert } from "lucide-react"

import { DrawPath } from "@/components/motion/DrawPath"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { kpiTile, paper } from "@/components/mocks/reports/styles"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { reportsHero as c } from "@/content/features/reports-alerts"
import { reports } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const e = reports.email
/** "0,58 60,50 …" → "M0 58 L60 50 …" */
export const pointsToPath = (points: string) => "M" + points.split(" ").map((p) => p.replace(",", " ")).join(" L")

const tiles = [
  { label: c.labels.mentions, short: c.labels.mentions, kpi: e.mentions },
  { label: c.labels.net, short: c.labels.netShort, kpi: e.netSentiment },
  { label: c.labels.engagement, short: c.labels.engagementShort, kpi: e.engagement },
]

/**
 * Reports & Alerts hero: the weekly brand report email (light sheet) with two hotspots, and the
 * "High alert" float. The float sits under the email from md (and in the flow below md), so it never
 * covers the subject line; hotspots sit in empty space beside the first KPI and the summary line.
 */
export function ReportsHeroMock() {
  return (
    <VisualPanel accent="reports" dots="bl" className="md:pb-28">
      <figure className={cn(paper, "md:ml-auto md:w-[92%]")}>
        <figcaption className="sr-only">{c.caption}</figcaption>
        <div className="flex items-center gap-2.5 border-b border-border px-3 py-3 md:px-4">
          <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-sm bg-reports-tint text-reports-text md:rounded-full">
            <Mail strokeWidth={2} className="size-4" />
          </span>
          <span className="min-w-0 flex-1 text-[0.8125rem] leading-[1.35]">
            <strong className="block">{c.subject}</strong>
            <span className="text-muted-foreground md:hidden">{c.fromMobile}</span>
            <span className="text-muted-foreground max-md:hidden">{c.from}</span>
          </span>
          <SampleDataChip tone="light" className="max-md:hidden" />
        </div>
        <div className="flex flex-col gap-3 p-3 md:p-4">
          <SampleDataChip tone="light" className="self-start md:hidden" />
          <div className="flex items-baseline justify-between gap-2 max-md:hidden">
            <span className="font-heading text-base font-extrabold">
              vinci360<span className="text-primary">°</span> {c.brief}
            </span>
            <span className="text-xs text-muted-foreground tabular">{e.range}</span>
          </div>
          <div className="relative">
            <dl className="grid grid-cols-3 gap-1.5 md:gap-2">
              {tiles.map(({ label, short, kpi }) => (
                <div key={label} className={kpiTile}>
                  <dt className="text-[0.65625rem] text-muted-foreground md:text-[0.6875rem]">
                    <span className="md:hidden">{short}</span>
                    <span className="max-md:hidden">{label}</span>
                  </dt>
                  <dd className="font-heading text-[0.9375rem] font-extrabold tabular md:text-lg">{kpi.display}</dd>
                  <dd className="text-[0.65625rem] md:text-[0.6875rem]">
                    <Delta trend={kpi.trend}>
                      {kpi.delta}
                      <span className="max-md:hidden"> {c.vsPrev}</span>
                    </Delta>
                  </dd>
                </div>
              ))}
            </dl>
            <Hotspot n={1} accent="reports" {...c.hotspots[0]} className="top-1/2 left-[27%]" />
          </div>
          <svg viewBox="0 0 420 80" aria-hidden="true" preserveAspectRatio="none" className="block h-16 w-full md:h-20">
            <line x1="0" y1="72" x2="420" y2="72" vectorEffect="non-scaling-stroke" className="stroke-border" />
            <path d={pointsToPath(reports.emailLines.lastWeek)} fill="none" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="stroke-neu-fill" />
            <DrawPath d={pointsToPath(reports.emailLines.thisWeek)} fill="none" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="stroke-reports-text md:stroke-primary" />
          </svg>
          <div aria-hidden="true" className="flex gap-3.5 text-[0.6875rem] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.75 w-3.5 bg-reports-text md:bg-primary" />
              {c.thisWeek}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 border-t-2 border-dashed border-neu-fill" />
              {c.lastWeek}
            </span>
          </div>
          <div className="relative max-md:hidden">
            <p className="pr-11 text-[0.78125rem] text-neutral-text">
              <strong className="text-foreground">{c.changedLabel}</strong> {c.changed}
            </p>
            <Hotspot n={2} accent="reports" {...c.hotspots[1]} className="top-1/2 left-[calc(100%-1.375rem)]" />
          </div>
        </div>
      </figure>

      <FloatCard enter className="flex items-center gap-2.5 px-3.5 py-3 md:-bottom-4 md:left-3 md:max-w-75">
        <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-sm bg-neg-tint text-neg">
          <TriangleAlert strokeWidth={2} className="size-4.5" />
        </span>
        <span role="status" className="text-[0.8125rem] leading-[1.35]">
          <strong className="block text-[0.6875rem] tracking-[0.04em] text-neg uppercase">{c.alert.label}</strong>
          <strong>
            {c.alert.text}{" "}
            <Delta trend="up" tone="neg">
              {c.alert.delta}
            </Delta>{" "}
            {c.alert.when}
          </strong>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tag aria-hidden="true" strokeWidth={2} className="size-3" />
            {reports.heroAlert.topic}
          </span>
        </span>
      </FloatCard>
    </VisualPanel>
  )
}
