import { Hash } from "lucide-react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { MomentumBar } from "@/components/mocks/trends/MomentumBar"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { trendsHero as c } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { cn } from "@/lib/utils"

/** The hero shows the top five by momentum (four at 390). */
const rows = [...trends.topics].sort((x, y) => y.momentum - x.momentum).slice(0, 5)
const cols =
  "grid grid-cols-[1rem_minmax(0,1fr)_4.375rem_2.125rem] items-center gap-2 md:grid-cols-[1.25rem_minmax(0,1.3fr)_3.375rem_minmax(0,1fr)_2.5rem_3.75rem]"

const caption = `Sample Trending Topics scoreboard for Aurora Mobile: ${rows
  .map((t, i) => `${i + 1}. ${t.topic}, volume ${fmt(t.volume)}, momentum ${t.momentum}, ${t.trend === "flat" ? "no change" : `${t.trend === "up" ? "climbed" : "fell"} ${t.move} ${t.move === 1 ? "place" : "places"}`}${t.breakout ? ", a breakout" : ""}, ${t.split[0]}% positive and ${t.split[2]}% negative`)
  .join("; ")}.`

/**
 * Trends hero: the Trending Topics scoreboard (momentum bars, rank movement, mood), Festive gifting
 * highlighted as the breakout. Hotspots sit on the frame's bottom edge under the Momentum and Move
 * columns, so they never cover a number or label.
 */
export function TrendsHeroMock() {
  return (
    <VisualPanel accent="trends" dots="bl" className="md:pb-14">
      <div className="relative md:ml-auto md:w-[94%]">
        <MockFrame
          chrome={
            <>
              <span className="max-md:hidden">{c.chrome}</span>
              {c.module}
            </>
          }
          caption={caption}
          bodyClassName="gap-0 px-2.5 pt-1.5 pb-2.5 md:px-3.5 md:pt-3 md:pb-3.5"
        >
          <div aria-hidden="true" className={cn(cols, "border-b border-border py-1.5 text-[0.65625rem] text-muted-foreground max-md:hidden")}>
            <span>{c.columns.rank}</span>
            <span>{c.columns.topic}</span>
            <span className="text-right">{c.columns.volume}</span>
            <span>{c.columns.momentum}</span>
            <span>{c.columns.move}</span>
            <span>{c.columns.mood}</span>
          </div>
          <ol aria-hidden="true" className="text-[0.71875rem] tabular md:text-xs">
            {rows.map((t, i) => (
              <li
                key={t.topic}
                className={cn(
                  cols,
                  "border-b border-border py-2 last:border-0",
                  i === 3 && "max-md:border-0",
                  i === 4 && "max-md:hidden",
                  t.breakout && "-mx-1.5 rounded-[6px] border-0 bg-border px-1.5 font-bold",
                )}
              >
                <span>{i + 1}</span>
                <span className="truncate">{t.topic}</span>
                <span className="text-right max-md:hidden">{fmt(t.volume)}</span>
                <MomentumBar value={t.momentum} trackClassName="w-10 md:w-auto md:min-w-0 md:flex-1" trackFillClassName={t.breakout ? "fill-background" : "fill-border"} />
                <Delta trend={t.trend}>{t.move}</Delta>
                <StackedBar100 data={t.split} height={10} labels={false} className="max-md:hidden" />
              </li>
            ))}
          </ol>
        </MockFrame>
        <Hotspot n={1} accent="trends" {...c.hotspots[0]} className="top-full left-[73%] md:left-[64%]" />
        <Hotspot n={2} accent="trends" {...c.hotspots[1]} className="top-full left-[90%] md:left-[81%]" />
      </div>
      <FloatCard enter className="flex items-center gap-2.5 px-4 py-3 tabular max-md:mt-7 md:-bottom-19 md:-left-10.5">
        <Hash aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-trends-text max-md:hidden" />
        <p className="font-heading text-[0.9375rem] font-extrabold md:text-base">
          {trends.heroCallout.tag}{" "}
          <Delta trend="up" className="font-extrabold">
            {trends.heroCallout.growth} {c.growth}
          </Delta>
        </p>
      </FloatCard>
    </VisualPanel>
  )
}
