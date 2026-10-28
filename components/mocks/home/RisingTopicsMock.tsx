import { Hash } from "lucide-react"

import { ChartSvg } from "@/components/charts/ChartSvg"
import { TagCloud } from "@/components/charts/TagCloud"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { GrowRect } from "@/components/motion/GrowBar"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { home as copy } from "@/content/home"
import { home as data } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const t = data.risingTopics
const cols = "grid grid-cols-[1.25rem_2.5rem_minmax(0,1fr)_2rem] items-center gap-2 md:grid-cols-[1.25rem_2.75rem_minmax(0,1fr)_7.5rem] md:gap-3"

/** Trends feature row: momentum leaderboard + hashtag cloud and the "#SampleTag ▲ +184%" float. */
export function RisingTopicsMock() {
  return (
    <VisualPanel accent="trends" dots="bl" className="md:p-10 md:pt-28">
      <MockFrame
        title={
          <>
            <span className="md:hidden">{copy.trendsMock.titleMobile}</span>
            <span className="max-md:hidden">{t.label}</span>
          </>
        }
        caption={`Sample topic leaderboard ranked by momentum: ${t.rows.map((r) => `${r.topic} ${r.score} ${r.trend === "flat" ? "unchanged" : `${r.trend} ${r.move}`}`).join(", ")}; plus a hashtag cloud.`}
        className="md:ml-auto md:w-[90%]"
      >
        <div className="text-xs">
          <p aria-hidden="true" className={cn(cols, "border-b border-border pb-2 text-[0.6875rem] text-muted-foreground max-md:hidden")}>
            {copy.trendsMock.columns.map((c, i) => (
              <span key={c} className={cn(i === 3 && "text-right")}>
                {c}
              </span>
            ))}
          </p>
          <ol>
            {t.rows.map((r, i) => (
              <li
                key={r.rank}
                className={cn(cols, "rounded-sm border-b border-border px-1 py-2 last:border-0", i === 1 && "bg-card font-semibold", i === 4 && "max-md:hidden")}
              >
                <span className="text-muted-foreground tabular">{r.rank}</span>
                <Delta trend={r.trend}>{r.move}</Delta>
                <span className="truncate">{r.topic}</span>
                <span className="flex items-center justify-end gap-2">
                  <ChartSvg viewBox="0 0 100 6" preserveAspectRatio="none" className="h-1.5 flex-1 max-md:hidden">
                    <rect width="100" height="6" rx="3" className="fill-border" />
                    <GrowRect axis="x" width={r.score} height="6" rx="3" className="fill-trends" />
                  </ChartSvg>
                  <span className="w-6 text-right font-bold tabular">{r.score}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <TagCloud
          ariaLabel="Hashtag cloud, size shows volume"
          data={t.cloud}
          className="border-t border-border pt-3 max-md:hidden"
        />
        <TagCloud
          ariaLabel="Hashtag cloud, size shows volume"
          data={t.cloud.filter((c) => c.mobile).map((c) => ({ ...c, weight: c.mobile ?? c.weight }))}
          className="border-t border-border pt-3 md:hidden"
        />
      </MockFrame>

      <FloatCard className="md:-top-22 md:-left-3.5 md:w-fit md:max-w-60">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <Hash aria-hidden="true" strokeWidth={2} className="size-4 self-center text-trends-text" />
          <span className="font-heading text-base font-extrabold">{t.callout.tag}</span>
          <Delta trend="up" className="font-heading text-base font-extrabold md:text-xl">
            {t.callout.growth}
          </Delta>
        </p>
        <p className="mt-1 text-xs text-muted-foreground max-md:hidden">{t.callout.text}</p>
      </FloatCard>
    </VisualPanel>
  )
}
