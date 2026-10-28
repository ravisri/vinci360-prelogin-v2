"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"

import { Bars } from "@/components/charts/Bars"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { fmt } from "@/components/mocks/home/kpi"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { darkCard } from "@/components/mocks/smi/styles"
import { smiWidgets } from "@/content/features/smi"
import { smi } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = smiWidgets.timeline
type Granularity = keyof typeof smi.timeline

const W = 420
const H = 130

/**
 * Widget 2 · Timeline: mentions per interval with the spike called out and the net-sentiment line
 * dashed over it. Each bar is a button that filters the posts box; the granularity switch redraws it.
 */
export function TimelineWidget() {
  const [gran, setGran] = useState<Granularity>("weekly")
  const [sel, setSel] = useState<number | null>(null)
  const t = smi.timeline[gran]
  const posts = sel === t.spike ? smi.timelinePosts.spike : smi.timelinePosts.all
  const max = Math.max(...t.volume)
  // Spike ring: centre of the spike bar's top, in the chart's own coordinates.
  const ringX = (t.spike + 0.5) * (W / t.labels.length)
  const ringY = H - (t.volume[t.spike] / max) * (H - 4)

  return (
    <div className="relative">
      <MockFrame
        title={
          <Segmented
            label={c.granularity}
            value={gran}
            options={c.options as { value: Granularity; label: string }[]}
            onChange={(v) => {
              setGran(v)
              setSel(null)
            }}
          />
        }
        caption={`Sample mentions timeline with net sentiment, ${gran}: ${t.full.map((n, i) => `${n} ${fmt(t.volume[i])} mentions, net +${t.net[i]}`).join("; ")}. ${t.note}.`}
      >
        <ul aria-hidden="true" className="flex flex-wrap gap-x-3.5 gap-y-1 text-[0.6875rem] text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-xs bg-chart-1" />
            {c.mentions}
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-xs bg-neg-dark" />
            {c.spike}
          </li>
          <li className="flex items-center gap-1.5">
            <svg viewBox="0 0 14 6" className="w-3.5">
              <line x1="0" y1="3" x2="14" y2="3" strokeWidth="2" strokeDasharray="4 2" className="stroke-chart-5" />
            </svg>
            {c.net}
          </li>
        </ul>
        <div className="relative">
          <Bars
            key={gran}
            ariaLabel={`${c.mentions} and ${c.net.toLowerCase()} by ${gran.replace("ly", "")}: ${t.note}.`}
            labels={t.labels}
            data={[{ label: c.mentions, values: t.volume, tone: "chart-1" }]}
            highlight={t.spike}
            line={{ values: t.net, tone: "chart-5", max: 32 }}
            width={W}
            height={H}
          />
          {gran === "weekly" && (
            <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-x-0 top-0 w-full overflow-visible">
              <circle cx={ringX} cy={ringY} r="12" fill="none" strokeWidth="2" className="transform-fill origin-center animate-hotspot stroke-neg-dark [animation-iteration-count:3]" />
            </svg>
          )}
          {/* One button per interval over its bar and label; the chart itself stays a labelled image. */}
          <div role="group" aria-label={c.mentions} className="absolute inset-0 grid auto-cols-fr grid-flow-col gap-1">
            {t.labels.map((label, i) => (
              <button
                key={label + i}
                type="button"
                aria-pressed={sel === i}
                aria-label={c.bar(t.full[i], fmt(t.volume[i]), t.net[i], i === t.spike)}
                onClick={() => setSel((s) => (s === i ? null : i))}
                className={cn(
                  "min-h-11 cursor-pointer rounded-sm hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-ring",
                  sel === i && "outline-2 outline-foreground",
                )}
              />
            ))}
          </div>
        </div>
        <div className={cn(darkCard, "flex flex-col gap-1.5 p-3")}>
          <p className="text-[0.75rem] font-semibold" aria-live="polite">
            {sel === null ? c.postsAll : c.postsFiltered(t.full[sel])}
          </p>
          <ul className="flex flex-col">
            {posts.map((p) => (
              <li key={p.initials} className="flex items-center gap-2 border-t border-border py-1.5 text-[0.75rem]">
                <span aria-hidden="true" className="grid size-5.5 flex-none place-items-center rounded-full bg-border text-[0.5625rem] font-bold">
                  {p.initials}
                </span>
                <span className="min-w-0 flex-1 truncate">{p.text}</span>
                <SentimentChip sentiment={p.sentiment} short className="text-[0.625rem]" />
              </li>
            ))}
          </ul>
        </div>
      </MockFrame>
      {/* Below the frame's bottom edge (in the panel padding), so it never covers the posts. */}
      <FloatCard className="md:-bottom-12 md:-left-4.5">
        <p className="flex items-center gap-2 text-[0.8125rem] font-bold">
          <TrendingUp aria-hidden="true" strokeWidth={2.2} className="size-4 text-neg" />
          {t.note}
        </p>
      </FloatCard>
    </div>
  )
}
