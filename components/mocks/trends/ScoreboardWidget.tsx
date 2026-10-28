"use client"

import { useState } from "react"
import { MoveHorizontal } from "lucide-react"
import { m, useReducedMotion } from "motion/react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { MomentumBar } from "@/components/mocks/trends/MomentumBar"
import { byMomentum, moveWords, net, parseCompact, type TrendTopic } from "@/components/mocks/trends/data"
import { LayoutMotion } from "@/components/motion/LayoutMotion"
import { trendsTopicWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { flashTwice, reorder, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

const c = trendsTopicWidgets.scoreboard
type Sort = (typeof c.sorts)[number]["value"]

const key: Record<Sort, (t: TrendTopic) => number> = {
  momentum: (t) => t.momentum,
  volume: (t) => t.volume,
  engagement: (t) => parseCompact(t.engagement),
  reach: (t) => parseCompact(t.reach),
  growth: (t) => t.growth,
  sentiment: net,
}

const cols = "grid grid-cols-[1.25rem_minmax(0,1.4fr)_3.125rem_3rem_minmax(0,1fr)_2.5rem_4rem] items-center gap-2"

const rowSentence = (t: TrendTopic, rank: number) =>
  `Rank ${rank}: ${t.topic}, volume ${fmt(t.volume)}, engagement ${t.engagement}, momentum ${t.momentum}, ${moveWords(t)}, ${t.split[0]}% positive, ${t.split[2]}% negative.`

/**
 * Block A1 · Scoreboard. From md: six sort buttons re-rank the rows with a layout animation (DOM order
 * follows the rank, so screen readers read the new order). Below md: the reference's sideways-scrolling
 * table with the topic column pinned.
 */
export function ScoreboardWidget() {
  const [sort, setSort] = useState<Sort>("momentum")
  const reduced = useReducedMotion()
  const rows = [...trends.topics].sort((x, y) => key[sort](y) - key[sort](x))
  const sortName = c.sorts.find((s) => s.value === sort)?.label

  return (
    <div className="relative">
      <MockFrame
        title={
          <>
            <span className="md:hidden">{c.sortedMobile}</span>
            <Segmented accent="trends" label={c.sortLabel} value={sort} options={c.sorts} onChange={setSort} className="max-md:hidden" />
          </>
        }
        caption="Sample Trending Topics leaderboard of six topics. Sorted by momentum, Night photography leads at 94; Festive gifting is a breakout that climbed 9 places with momentum 88 despite low volume; Price and offers has the highest volume but momentum 58 and mixed sentiment. Use the sort buttons to re-rank."
        bodyClassName="gap-0 px-0 pt-2.5 pb-0 md:pt-3.5 [&>div:first-child]:px-2.5 [&>div:first-child]:pb-1.5 md:[&>div:first-child]:px-3.5 md:[&>div:first-child]:pb-2.5"
      >
        {/* ---------- md+: sortable rows ---------- */}
        <div className="max-md:hidden">
          <div aria-hidden="true" className={cn(cols, "border-b border-border px-3 py-1.5 text-[0.65625rem] text-muted-foreground")}>
            <span>{c.columns.rank}</span>
            <span>{c.columns.topic}</span>
            <span className="text-right">{c.columns.volume}</span>
            <span className="text-right">{c.columns.engagement}</span>
            <span>{c.columns.momentum}</span>
            <span>{c.columns.move}</span>
            <span>{c.columns.mood}</span>
          </div>
          <LayoutMotion>
            <ol className="h-69 text-xs tabular">
              {rows.map((t, i) => (
                <m.li
                  key={t.topic}
                  layout="position"
                  transition={reorder}
                  className={cn(cols, "relative h-11.5 border-b border-border px-3", t.breakout && "bg-border font-bold")}
                >
                  <span className="sr-only">{rowSentence(t, i + 1)}</span>
                  <span aria-hidden="true" className="contents">
                    <span>{i + 1}</span>
                    <span className="truncate font-semibold">{t.topic}</span>
                    <span className="text-right">{fmt(t.volume)}</span>
                    <span className="text-right">{t.engagement}</span>
                    <MomentumBar value={t.momentum} trackFillClassName={t.breakout ? "fill-background" : "fill-border"} />
                    <Delta trend={t.trend}>{t.move}</Delta>
                    <StackedBar100 data={t.split} height={10} labels={false} />
                  </span>
                  {t.breakout && !reduced && (
                    <m.span
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      whileInView={flashTwice.animate}
                      viewport={viewport}
                      transition={flashTwice.transition}
                      className="pointer-events-none absolute inset-0 inset-ring-2 inset-ring-trends"
                    />
                  )}
                </m.li>
              ))}
            </ol>
          </LayoutMotion>
          <p aria-live="polite" className="px-3.5 py-2.5 text-[0.71875rem] text-muted-foreground">
            {c.sortedBy} <strong className="text-foreground">{sortName}</strong> {c.period}
          </p>
        </div>

        {/* ---------- 390: scroll table, topic column pinned ---------- */}
        <div role="region" aria-label={c.regionLabel} tabIndex={0} className="overflow-x-auto md:hidden">
          <table className="border-separate border-spacing-0 text-xs whitespace-nowrap tabular">
            <thead>
              <tr className="text-[0.65625rem] text-muted-foreground">
                {[c.columns.topic, c.columns.volume, c.columns.engagement, c.columns.momentum, c.columns.move, c.columns.mood].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={cn("border-b border-border px-2.5 py-2.5 font-medium", i === 0 ? "sticky left-0 z-1 bg-background text-left shadow-card" : "text-right")}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {byMomentum.map((t, i) => {
                const cell = cn("border-b border-border px-2.5 py-2.5 text-right", t.breakout && "bg-muted")
                const name = `${i + 1} · ${t.topic}`
                return (
                  <tr key={t.topic}>
                    <th
                      scope="row"
                      className={cn(cell, "sticky left-0 z-1 max-w-35 bg-background text-left font-normal whitespace-normal shadow-card", t.breakout && "bg-muted")}
                    >
                      {t.breakout ? <strong>{name}</strong> : name}
                      {t.breakout && <span className="block text-[0.625rem] text-chart-2">{c.breakout}</span>}
                    </th>
                    <td className={cell}>{fmt(t.volume)}</td>
                    <td className={cell}>{t.engagement}</td>
                    <td className={cell}>
                      <MomentumBar value={t.momentum} trackClassName="w-15" heightClassName="h-1.5" className="justify-end" />
                    </td>
                    <td className={cell}>
                      <Delta trend={t.trend}>{t.move}</Delta>
                    </td>
                    <td className={cell}>
                      <StackedBar100 data={t.split} height={9} labels={false} className="ml-auto w-14" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </MockFrame>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-neutral-text md:hidden">
        <MoveHorizontal aria-hidden="true" strokeWidth={2} className="size-4" />
        {c.swipe}
      </p>
      <FloatCard className="flex items-center gap-2 px-3.5 py-2.5 max-md:hidden md:-bottom-14.5 md:-left-12.5">
        <Delta trend="up" className="font-extrabold">
          {c.float.move}
        </Delta>
        <span className="text-[0.8125rem] font-bold">{c.float.text}</span>
      </FloatCard>
    </div>
  )
}
