"use client"

import { useState } from "react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { overlayButton } from "@/components/mocks/smi/styles"
import { smiWidgets } from "@/content/features/smi"
import { smi } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = smiWidgets.topics
const cols = "grid grid-cols-[1rem_minmax(0,1.3fr)_3.25rem_3rem_minmax(0,0.6fr)] items-center gap-2 sm:grid-cols-[1.375rem_minmax(0,1.3fr)_4rem_4rem_minmax(0,1.3fr)] sm:gap-2.5"

/** Widget 3 · Topics: ranked table with a sentiment split per topic; select a row to filter the page. */
export function TopicsWidget() {
  const [topic, setTopic] = useState<string | null>(null)
  return (
    <div className="relative">
      <MockFrame
        title={c.title}
        caption={`Sample topics, last 30 days, ranked by volume: ${smi.topics.map((t, i) => `${i + 1}. ${t.topic}, ${fmt(t.volume)} mentions, ${t.engagement} engagement, ${t.split[0]}% positive, ${t.split[1]}% neutral, ${t.split[2]}% negative`).join("; ")}.`}
        bodyClassName="gap-0 px-0 pt-3 pb-0 [&>div:first-child]:px-4 [&>div:first-child]:pb-3"
      >
        <div className={cn(cols, "border-y border-border px-3 py-2 text-[0.6875rem] text-muted-foreground")} aria-hidden="true">
          <span>{c.columns.rank}</span>
          <span>{c.columns.topic}</span>
          <span className="text-right">{c.columns.volume}</span>
          <span className="text-right">{c.columns.engagement}</span>
          <span className="truncate">{c.columns.sentiment}</span>
        </div>
        <ol>
          {smi.topics.map((t, i) => {
            const on = topic === t.topic
            return (
              <li
                key={t.topic}
                className={cn(
                  cols,
                  "relative min-h-11 border-b border-border px-3 py-2.25 text-xs transition-colors",
                  on ? "bg-muted font-bold before:absolute before:inset-y-0 before:left-0 before:w-0.75 before:bg-on-dark-focus" : "hover:bg-muted/60",
                )}
              >
                <span className="text-muted-foreground tabular">{i + 1}</span>
                {/* Wraps to two lines at 390 rather than cutting the name; one truncated line from sm. */}
                <span className="leading-tight font-semibold sm:truncate">{t.topic}</span>
                <span className="text-right tabular">{fmt(t.volume)}</span>
                <span className="text-right tabular">{t.engagement}</span>
                <StackedBar100 data={t.split} height={18} />
                <button type="button" aria-pressed={on} aria-label={c.select(t.topic)} onClick={() => setTopic(on ? null : t.topic)} className={cn(overlayButton, "rounded-none")} />
              </li>
            )
          })}
        </ol>
        <p className="px-4 py-3 text-xs text-muted-foreground">
          {c.filteredTo}{" "}
          <strong aria-live="polite" className="text-foreground">
            {topic ?? c.all}
          </strong>
        </p>
      </MockFrame>
      {/* On the header's top edge, right of the title: clear of every label and number. */}
      <Hotspot n="!" accent="smi" title={c.hotspot.title} text={c.hotspot.text} className="top-0 left-[58%]" />
    </div>
  )
}
