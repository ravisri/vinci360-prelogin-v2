"use client"

import { MoveHorizontal } from "lucide-react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { Sparkline } from "@/components/charts/Sparkline"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { ReachNote } from "@/components/mocks/ReachNote"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { fmt } from "@/components/mocks/home/kpi"
import { useSelectedTag } from "@/components/mocks/trends/SelectedTagProvider"
import { trendsHashtagWidgets } from "@/content/features/trends"
import { networks, trends, type Network } from "@/content/sample-data"
import { sentimentLabel } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = trendsHashtagWidgets.ranking
type Tag = (typeof trends.hashtags)[number]

/** Platform bar order and shades (light → dark), as in the reference legend. */
const PLATFORMS: { network: Network; fill: string }[] = [
  { network: "instagram", fill: "fill-on-dark-strong" },
  { network: "x", fill: "fill-on-dark-muted" },
  { network: "youtube", fill: "fill-neu-fill" },
  { network: "facebook", fill: "fill-neutral-text" },
]

const topPlatform = (t: Tag) => PLATFORMS.map((p) => p.network).reduce((best, n) => (t.split[n] > t.split[best] ? n : best))

const cols =
  "grid grid-cols-[minmax(0,1.4fr)_3.625rem_4rem_3.625rem_3.125rem_4rem_4.375rem_4.625rem_minmax(0,1.3fr)] items-center gap-2.5"

const caption =
  "Sample hashtag ranking of six tags with usage, mentions, engagement, reach, growth, a trend line, sentiment and platform split. #AuroraLaunch is used most and growing 184%; #GiftWithAurora is growing fastest at 210%; #ChargerFail is growing 122% and is negative, mostly on X."

function PlatformSplit({ tag }: { tag: Tag }) {
  const top = topPlatform(tag)
  const starts = PLATFORMS.map((_, i) => PLATFORMS.slice(0, i).reduce((sum, p) => sum + tag.split[p.network], 0))
  return (
    <span className="flex flex-col gap-0.75">
      <ChartSvg viewBox="0 0 100 8" preserveAspectRatio="none" className="h-2 overflow-hidden rounded-[3px]">
        {PLATFORMS.map((p, i) => (
          <rect key={p.network} x={starts[i]} width={Math.max(tag.split[p.network] - 0.8, 0)} height="8" className={p.fill} />
        ))}
      </ChartSvg>
      <span className="flex items-center gap-1.5 text-[0.625rem] text-muted-foreground">
        <NetworkIcon network={top} className="size-2.75" />
        {networks[top]} {tag.split[top]}%
      </span>
    </span>
  )
}

/**
 * Block B1 · Hashtag ranking. From lg: nine columns, every row a toggle that picks the tag for
 * "Posts behind a tag". Below lg: the 390 reference's six-column table, scrolling with the tag pinned.
 */
export function HashtagRankingWidget() {
  const { tag: selected, setTag } = useSelectedTag()
  return (
    <div>
      <MockFrame
        title={
          <>
            <span className="lg:hidden">{c.titleMobile}</span>
            <span className="max-lg:hidden">{c.title}</span>
          </>
        }
        caption={caption}
        bodyClassName="gap-0 px-0 pt-2.5 pb-0 lg:pt-3.5 [&>div:first-child]:px-2.5 [&>div:first-child]:pb-1.5 lg:[&>div:first-child]:px-4 lg:[&>div:first-child]:pb-2.5"
      >
        {/* ---------- lg+: full ranking ---------- */}
        <div className="max-lg:hidden">
          <div aria-hidden="true" className={cn(cols, "border-b border-border px-4 py-1.75 text-[0.65625rem] text-muted-foreground")}>
            <span>{c.columns.tag}</span>
            <span className="text-right">{c.columns.usage}</span>
            <span className="text-right">{c.columns.mentions}</span>
            <span className="text-right">{c.columns.engagement}</span>
            <span className="text-right">{c.columns.reach}</span>
            <span className="text-right">{c.columns.growth}</span>
            <span>{c.columns.trend}</span>
            <span>{c.columns.sentiment}</span>
            <span>{c.columns.platforms}</span>
          </div>
          <ul className="text-xs tabular">
            {trends.hashtags.map((t) => {
              const on = selected === t.tag
              return (
                <li key={t.tag}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTag(t.tag)}
                    className={cn(
                      cols,
                      "min-h-11.5 w-full cursor-pointer border-b border-border px-4 py-2.25 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                      on ? "bg-border font-bold shadow-[inset_3px_0_0_var(--color-trends)]" : "hover:bg-muted",
                    )}
                  >
                    <span className="font-bold">{t.tag}</span>
                    <span className="text-right">{fmt(t.usage)}</span>
                    <span className="text-right">{fmt(t.mentions)}</span>
                    <span className="text-right">{t.engagement}</span>
                    <span className="text-right">{t.reach}</span>
                    <span className="text-right font-bold text-pos">▲ {t.growth}%</span>
                    <Sparkline data={t.spark} tone="trends" width={64} height={18} className="w-16" />
                    <SentimentChip sentiment={t.sentiment} short className="justify-self-start text-[0.65625rem]" />
                    <PlatformSplit tag={t} />
                    <span className="sr-only">
                      {`, growing ${t.growth}%, ${sentimentLabel[t.sentiment].toLowerCase()}, top platform ${networks[topPlatform(t)]} ${t.split[topPlatform(t)]}%. `}
                      {c.select(t.tag)}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="flex flex-wrap gap-x-3.5 gap-y-1 px-4 py-2.5 text-[0.6875rem] text-muted-foreground">
            <span>{c.platformOrder}</span>
            <span aria-live="polite">
              {c.selected} <strong className="text-foreground">{selected}</strong>
            </span>
          </p>
        </div>

        {/* ---------- below lg: scroll table, tag column pinned ---------- */}
        <div role="region" aria-label={c.regionLabel} tabIndex={0} className="overflow-x-auto lg:hidden">
          <table className="border-separate border-spacing-0 text-xs whitespace-nowrap tabular">
            <thead>
              <tr className="text-[0.65625rem] text-muted-foreground">
                {[c.columns.tag, c.columns.usage, c.columns.reach, c.columns.growth, c.columns.sentiment, c.columns.topPlatform].map((h, i) => (
                  <th key={h} scope="col" className={cn("border-b border-border px-2.5 py-2.5 font-medium", i === 0 ? "sticky left-0 z-1 bg-background text-left shadow-card" : "text-right")}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trends.hashtags.map((t) => {
                const on = selected === t.tag
                const cell = cn("border-b border-border px-2.5 py-2.5 text-right", on && "bg-muted")
                const top = topPlatform(t)
                return (
                  <tr key={t.tag}>
                    <th scope="row" className={cn(cell, "sticky left-0 z-1 bg-background p-0 text-left font-normal shadow-card", on && "bg-muted font-bold")}>
                      <button type="button" aria-pressed={on} onClick={() => setTag(t.tag)} className="min-h-11 w-full cursor-pointer px-2.5 text-left">
                        {t.tag}
                      </button>
                    </th>
                    <td className={cell}>{fmt(t.usage)}</td>
                    <td className={cell}>{t.reach}</td>
                    <td className={cn(cell, "text-pos")}>▲ {t.growth}%</td>
                    <td className={cell}>
                      <SentimentChip sentiment={t.sentiment} className="text-[0.625rem]" />
                    </td>
                    <td className={cell}>
                      <span className="inline-flex items-center gap-1">
                        <NetworkIcon network={top} className="size-3.25" />
                        {networks[top]} {t.split[top]}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </MockFrame>
      <ReachNote className="mt-1.5 text-[0.71875rem] md:mt-2.5 md:text-[0.8125rem]" />
      <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-neutral-text lg:hidden">
        <MoveHorizontal aria-hidden="true" strokeWidth={2} className="size-4" />
        {c.swipe}
      </p>
    </div>
  )
}
