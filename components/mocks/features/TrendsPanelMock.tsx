import { ChartSvg } from "@/components/charts/ChartSvg"
import { TagCloud } from "@/components/charts/TagCloud"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { GrowRect } from "@/components/motion/GrowBar"
import { featuresOverview as copy, type Panel } from "@/content/features-overview"
import { featuresOverview as data } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = copy.mocks.trends
const rows = data.trendingTopics.map((t, i) => ({
  ...t,
  rank: i + 1,
  ...data.topicMoves[i],
}))
const cols = "grid grid-cols-[1.25rem_2.5rem_minmax(0,1fr)_4.5rem] items-center gap-2 md:grid-cols-[1.625rem_3.5rem_minmax(0,1fr)_5rem_8.125rem]"
const SENTIMENTS = ["pos", "neu", "neg"] as const

const caption = `Sample Trending Topics scoreboard: ${rows
  .map((r) => `${r.topic} rank ${r.rank} ${r.trend === "flat" ? "unchanged" : `${r.trend} ${r.move}`}, momentum ${r.score}, ${fmt(r.mentions)} mentions`)
  .join("; ")}. Below, a hashtag cloud marked by sentiment.`

/** Trends tab: momentum scoreboard + hashtag cloud, and the "Top by volume ≠ top by growth" float. */
export function TrendsPanelMock({ hotspots }: { hotspots: Panel["hotspots"] }) {
  return (
    <div className="relative">
      <MockFrame chrome={c.chrome} caption={caption} className="relative" bodyClassName="gap-2.5 p-2.5 md:gap-3 md:p-4">
        <div className="relative rounded-lg border border-border bg-card px-3 py-1.5 text-xs md:px-3.5 md:text-[0.78125rem]">
          <p aria-hidden="true" className={cn(cols, "border-b border-border py-2 text-muted-foreground")}>
            {c.columns.map((col, i) => (
              <span key={col} className={cn(i === 3 && "text-right max-md:hidden")}>
                {col}
              </span>
            ))}
          </p>
          <ol>
            {rows.map((r, i) => (
              <li
                key={r.topic}
                className={cn(cols, "border-b border-border py-2.25 tabular last:border-0", i === 1 && "-mx-3 bg-muted px-3 font-bold md:-mx-3.5 md:px-3.5")}
              >
                <span>{r.rank}</span>
                <Delta trend={r.trend}>{r.move}</Delta>
                <span className="truncate">{r.topic}</span>
                <span className="text-right max-md:hidden">{fmt(r.mentions)}</span>
                <span className="flex items-center gap-1.5">
                  <ChartSvg viewBox="0 0 100 6" preserveAspectRatio="none" className="h-1.5 min-w-0 flex-1">
                    <rect width="100" height="6" rx="3" className="fill-border" />
                    <GrowRect axis="x" width={r.score} height="6" rx="3" className="fill-trends" />
                  </ChartSvg>
                  <span className="w-5 text-right">{r.score}</span>
                </span>
              </li>
            ))}
          </ol>
          <Hotspot n={1} accent="trends" {...hotspots[0]} className="top-4 left-[50%] md:left-[38%]" />
          <Hotspot n={2} accent="trends" {...hotspots[1]} className="top-4 left-[63%] md:right-5 md:left-auto md:translate-x-0" />
        </div>

        <div className="relative flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3 md:p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.8125rem] font-semibold">{c.hashtags}</p>
            <ul aria-hidden="true" className="flex gap-3 text-[0.6875rem]">
              {SENTIMENTS.map((s) => (
                <li key={s} className={sentimentText[s]}>
                  {sentimentGlyph[s]} {sentimentLabel[s]}
                </li>
              ))}
            </ul>
          </div>
          <TagCloud ariaLabel="Trending hashtags, size shows volume" data={data.hashtagCloud} />
          <Hotspot n={3} accent="trends" {...hotspots[2]} className="top-0 left-[62%] md:left-[38%]" />
        </div>
      </MockFrame>

      <FloatCard className="flex flex-col gap-2 px-4 md:relative md:mt-3 md:w-82.5 lg:absolute lg:-bottom-25 lg:-left-7 lg:mt-0">
        <p className="font-heading text-[0.9375rem] font-extrabold">{c.callout.title}</p>
        <div className="grid grid-cols-2 gap-2 text-xs tabular">
          <p className="rounded-sm bg-background p-2">
            <span className="block text-muted-foreground">{c.callout.volume}</span>
            <strong className="block">{data.growthCallout.volume.tag}</strong>
            <span className="block text-muted-foreground">
              {data.growthCallout.volume.mentions} {c.callout.mentions}
            </span>
          </p>
          <p className="rounded-sm bg-trends-tint p-2">
            <span className="block text-muted-foreground">{c.callout.growth}</span>
            <strong className="block">{data.growthCallout.growth.tag}</strong>
            <Delta trend="up" className="block">
              {data.growthCallout.growth.delta} {c.callout.window}
            </Delta>
          </p>
        </div>
      </FloatCard>
    </div>
  )
}
