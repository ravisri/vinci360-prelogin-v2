"use client"

import { useState } from "react"

import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { MomentumBar } from "@/components/mocks/trends/MomentumBar"
import { darkCard } from "@/components/mocks/smi/styles"
import { trendsTopicWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = trendsTopicWidgets.breakdown
type TrendKey = keyof typeof trends.breakdowns
const options = (Object.keys(trends.breakdowns) as TrendKey[]).map((k) => ({ value: k, label: trends.breakdowns[k].label }))
/** Below sm Reach and Eng. drop out so tag names never truncate. */
const tagCols = "grid grid-cols-[minmax(0,1fr)_2.75rem_3.125rem] items-center gap-1.5 sm:grid-cols-[minmax(0,1.3fr)_2.75rem_2.375rem_2.625rem_3.125rem]"

/**
 * Block A3 · Topics and hashtags together: pick a trend, see its sub-topics and the tags attached
 * to it. Tags growing fast enough "carry the trend"; the rest only tag along.
 */
export function TrendBreakdownWidget() {
  const [trend, setTrend] = useState<TrendKey>("night")
  const t = trends.breakdowns[trend]
  const max = t.subs[0][1]

  return (
    <MockFrame
      title={<Segmented accent="trends" label={c.selectLabel} value={trend} options={options} onChange={setTrend} />}
      caption="Sample breakdown of a selected trend into sub-topics and attached hashtags, with frequency, reach, engagement and growth. Tags with high growth and engagement are marked as carrying the trend; tags with flat growth only tag along."
    >
      <div aria-live="polite" className="grid gap-2.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]">
        <div className={cn(darkCard, "flex flex-col gap-1.5 p-3 text-xs")}>
          <p className="text-[0.78125rem] font-semibold">
            {c.subs}
            <span className="sr-only">: {t.label}</span>
          </p>
          <ul>
            {t.subs.map(([name, n]) => (
              <li key={name} className="flex flex-col gap-1 border-t border-border py-1.25">
                <span className="flex justify-between gap-2">
                  <span>{name}</span>
                  <span className="tabular">{fmt(n)}</span>
                </span>
                <MomentumBar value={Math.round((n / max) * 100)} display={false} heightClassName="h-1.25" />
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(darkCard, "px-2.5 py-1 text-[0.71875rem]")}>
          <table className="w-full tabular">
            <thead className="text-muted-foreground">
              <tr className={cn(tagCols, "border-b border-border py-1.75")}>
                <th scope="col" className="text-left font-normal">{c.columns.tag}</th>
                <th scope="col" className="text-right font-normal">{c.columns.freq}</th>
                <th scope="col" className="text-right font-normal max-sm:hidden">{c.columns.reach}</th>
                <th scope="col" className="text-right font-normal max-sm:hidden">{c.columns.engagement}</th>
                <th scope="col" className="text-right font-normal">{c.columns.growth}</th>
              </tr>
            </thead>
            <tbody>
              {t.tags.map(([tag, freq, reach, eng, growth]) => {
                const carries = growth >= trends.carriesFrom
                return (
                  <tr key={tag} className={cn(tagCols, "border-b border-dark-grid py-1.75 last:border-0")}>
                    <th scope="row" className="flex min-w-0 flex-col text-left font-normal">
                      <span className="truncate font-bold">{tag}</span>
                      <span className={cn("text-[0.65625rem] font-semibold", carries ? "text-pos" : "text-muted-foreground")}>{carries ? c.carries : c.tagsAlong}</span>
                    </th>
                    <td className="text-right">{freq}</td>
                    <td className="text-right max-sm:hidden">{reach}</td>
                    <td className="text-right max-sm:hidden">{eng}</td>
                    <td className={cn("text-right whitespace-nowrap", carries ? "text-pos" : "text-neu")}>▲ {growth}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </MockFrame>
  )
}
