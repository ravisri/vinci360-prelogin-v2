import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { sentimentHero as c } from "@/content/features/sentiment-keywords"
import { networks, sentiment, type Split } from "@/content/sample-data"
import { trendGlyph, trendText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const rows = sentiment.platforms
/** Plain "52%" in the segments, as in the reference; the legend carries the ▲ – ▼ glyphs. */
const pctLabels = (split: Split) => split.map((v) => `${v}%`) as unknown as [string, string, string]
const caption = `Sample platform-wise sentiment for Aurora Mobile as 100% stacked bars. ${rows
  .map((p) => `${networks[p.network]} ${p.split[0]}% positive, ${p.split[1]}% neutral, ${p.split[2]}% negative, net +${p.net}`)
  .join("; ")}. Instagram’s net sentiment fell 12 points versus the last period.`

/**
 * Sentiment hero: platform-wise 100% stacked bars with the net score per network, Instagram outlined
 * as the slipping platform. Hotspots sit on the frame's edges (under the Instagram row, beside the
 * net column), so they never cover a number or label.
 */
export function SentimentHeroMock() {
  return (
    <VisualPanel accent="sent" dots="tr" className="max-md:pb-4 md:pb-15">
      <div className="relative md:w-[94%]">
        <MockFrame
          chrome={
            <>
              <span className="max-md:hidden">{c.chrome}</span>
              {c.module}
            </>
          }
          caption={caption}
          bodyClassName="gap-3 p-3 md:p-4"
        >
          <div aria-hidden="true" className="flex items-center justify-between gap-2 max-md:hidden">
            <span className="text-[0.78125rem] font-semibold">{c.title}</span>
            <span className="flex gap-2.5 text-[0.65625rem]">
              <span className="text-pos">{c.legend.pos}</span>
              <span className="text-neu">{c.legend.neu}</span>
              <span className="text-neg">{c.legend.neg}</span>
            </span>
          </div>
          <ul
            aria-hidden="true"
            className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-x-2 gap-y-2.5 text-[0.71875rem] tabular md:grid-cols-[4.5rem_minmax(0,1fr)_5.75rem] md:gap-x-2.5 md:gap-y-3 md:text-xs"
          >
            {rows.map((p) => (
              <li key={p.network} className="contents">
                <span className={cn(p.slipping && "font-bold")}>{networks[p.network]}</span>
                <StackedBar100 data={p.split} height={20} segmentLabels={pctLabels(p.split)} highlight={p.slipping} />
                <span className={cn("max-md:hidden", trendText[p.trend], p.slipping && "font-bold")}>
                  {trendGlyph[p.trend]} {c.net} +{p.net}
                </span>
              </li>
            ))}
            <li className="col-span-full text-[0.625rem] text-muted-foreground md:hidden">{c.legendMobile}</li>
          </ul>
        </MockFrame>
        <Hotspot n={1} accent="sent" {...c.hotspots[0]} className="top-full left-[58%] md:left-[52%]" />
        <Hotspot n={2} accent="sent" {...c.hotspots[1]} className="top-[4.75rem] left-full md:top-[5.25rem]" />
      </div>
      <FloatCard enter className="flex items-center gap-2.5 px-3.5 py-2.5 tabular max-md:mt-7 md:-bottom-20.5 md:-left-10.5 md:px-4 md:py-3">
        <NetworkIcon network="instagram" className="size-4.5 flex-none max-md:hidden" />
        <p className="text-[0.84375rem] font-bold md:font-heading md:text-[0.9375rem] md:font-extrabold">
          {c.float.label} <Delta trend="down">{c.float.delta}</Delta>{" "}
          <span className="text-[0.8125rem] font-medium text-muted-foreground md:font-sans">{c.float.vs}</span>
        </p>
      </FloatCard>
    </VisualPanel>
  )
}
