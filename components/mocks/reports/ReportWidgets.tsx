import { Clock, Download } from "lucide-react"

import { HBar } from "@/components/charts/HBar"
import { Delta } from "@/components/mocks/Delta"
import { Hotspot } from "@/components/mocks/Hotspot"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { kpiTile, paper, plainChip, solidChip, tintChip } from "@/components/mocks/reports/styles"
import { reportsPartA as c } from "@/content/features/reports-alerts"
import { reports } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

/**
 * Part A · 1 · Keyword-wise weekly report: semantic table with tabular numbers, change and
 * sentiment as glyph + word, export chips and the schedule. The hotspot sits beside the
 * "vs prev. week" header, clear of every number.
 */
export function KeywordReportWidget() {
  const k = c.keyword
  return (
    <figure className={cn(paper, "m-0 flex flex-col gap-3 p-4 md:p-5")}>
      <figcaption className="sr-only">{k.figcaption}</figcaption>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-heading text-[0.9375rem] font-extrabold">{k.title}</span>
        <SampleDataChip tone="light" />
      </div>
      <div className="-mx-1 overflow-x-auto scrollbar-none px-1">
        <table className="w-full min-w-110 border-collapse text-[0.78125rem] tabular">
          <caption className="sr-only">{k.caption}</caption>
          <thead>
            <tr className="text-[0.6875rem] text-muted-foreground">
              <th scope="col" className="py-1.5 text-left font-medium">
                {k.cols[0]}
              </th>
              <th scope="col" className="text-right font-medium">
                {k.cols[1]}
              </th>
              <th scope="col" className="text-right font-medium">
                <div className="inline-flex items-center gap-1">
                  {k.cols[2]}
                  <div className="relative size-6">
                    <Hotspot n="i" accent="reports" {...k.hotspot} className="top-1/2 left-1/2" />
                  </div>
                </div>
              </th>
              <th scope="col" className="pl-3 text-left font-medium">
                {k.cols[3]}
              </th>
              <th scope="col" className="text-right font-medium">
                {k.cols[4]}
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.keywordReport.map((r) => (
              <tr key={r.keyword} className="border-t border-muted">
                <th scope="row" className="py-2 text-left font-semibold">
                  {r.keyword}
                </th>
                <td className="text-right">{r.display}</td>
                <td className="text-right">
                  <Delta trend={r.trend}>{r.change}</Delta>
                </td>
                <td className={cn("pl-3 font-semibold", sentimentText[r.sentiment])}>
                  <span aria-hidden="true">{sentimentGlyph[r.sentiment]} </span>
                  {sentimentLabel[r.sentiment]}
                </td>
                <td className="text-right">{r.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {k.exports.map((x) => (
          <span key={x} className={cn(plainChip, "bg-background")}>
            <Download aria-hidden="true" strokeWidth={2} className="size-3" />
            {x}
          </span>
        ))}
        <span className={tintChip}>
          <Clock aria-hidden="true" strokeWidth={2} className="size-3" />
          {reports.email.schedule}
        </span>
      </div>
    </figure>
  )
}

/** Part A · 2 · Entity-wise monthly report for Aurora Mobile: entity type, 3 KPIs (reach marked as an estimate) and the topic split. */
export function EntityReportWidget() {
  const en = c.entity
  const data = reports.entityMonthly
  return (
    <figure className={cn(paper, "m-0 flex flex-col gap-3 p-4 md:p-5")}>
      <figcaption className="sr-only">{en.figcaption}</figcaption>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-heading text-[0.9375rem] font-extrabold">{en.title}</span>
        <SampleDataChip tone="light" />
      </div>
      <ul aria-label={en.typeLabel} className="flex flex-wrap gap-1.5">
        {en.types.map((t, i) => (
          <li key={t} className={i === 0 ? solidChip : plainChip}>
            {t}
          </li>
        ))}
      </ul>
      <dl className="grid grid-cols-3 gap-2 tabular">
        {data.kpis.map((k) => (
          <div key={k.key} className={kpiTile}>
            <dt className="text-[0.6875rem] text-muted-foreground">{en.labels[k.key as keyof typeof en.labels]}</dt>
            <dd className="font-heading text-base font-extrabold md:text-lg">{k.display}</dd>
            <dd className="text-[0.6875rem]">
              <Delta trend={k.trend}>{k.delta}</Delta>
            </dd>
          </div>
        ))}
      </dl>
      <HBar
        data={data.topics.map((p) => ({ label: p.label, value: p.share, display: `${p.share}%` }))}
        ariaLabel={`${en.platforms}: ${data.topics.map((p) => `${p.label} ${p.share}%`).join(", ")}`}
        tone="chart-1"
        labelClassName="w-18"
        className="gap-1.5"
      />
      <span className="text-[0.6875rem] text-muted-foreground">{en.estimate}</span>
    </figure>
  )
}
