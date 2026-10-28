import type { ReactNode } from "react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { featuresOverview as copy, type Panel } from "@/content/features-overview"
import { featuresOverview as data, home, networks, sentimentByPlatform, type Network, type Trend } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = copy.mocks.sent
const k = data.keyword
const callout = home.sentiment.callout
const ORDER: Network[] = ["facebook", "x", "youtube", "instagram"]

const caption = `Sample Sentiment and Keyword page. Keyword deep-dive for “${k.term}”: ${k.mentions.display} mentions up ${k.mentions.delta}, net sentiment ${k.netSentiment.display} down ${k.netSentiment.delta}, ${k.negativeShare.display} negative. Platform sentiment bars (positive, neutral, negative %): ${ORDER.map((n) => `${networks[n]} ${sentimentByPlatform[n].join(", ")}`).join("; ")}. Hashtag sentiment: ${data.hashtagSentiment.map((h) => `${h.tag} net ${h.net}`).join(", ")}.`

function Stat({ label, value, delta, trend, className }: { label: string; value: string; delta: ReactNode; trend?: Trend; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-0.5 rounded-lg border border-border bg-card p-2 md:p-2.5", className)}>
      <p className="truncate text-[0.625rem] text-muted-foreground md:text-[0.6875rem]">{label}</p>
      <p className="font-heading text-[0.9375rem] leading-[1.15] font-bold tabular md:text-[1.0625rem]">{value}</p>
      {trend ? (
        <Delta trend={trend} className="text-[0.625rem] md:text-[0.65625rem]">
          {delta}
        </Delta>
      ) : (
        <p className="text-[0.625rem] text-muted-foreground md:text-[0.65625rem]">{delta}</p>
      )}
    </div>
  )
}

/** Sentiment tab: "charging" keyword deep-dive, sentiment by platform, hashtag-wise sentiment and the Instagram float. */
export function SentimentPanelMock({ hotspots }: { hotspots: Panel["hotspots"] }) {
  return (
    <div className="relative">
      <MockFrame chrome={c.chrome} caption={caption} className="relative" bodyClassName="gap-2.5 p-2.5 md:gap-3 md:p-4">
        <div className="relative grid grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2">
          <Stat label={c.keyword} value={k.term} delta={c.deepDive} className="border-chart-3" />
          <Stat label={c.mentions} value={k.mentions.display} delta={k.mentions.delta} trend={k.mentions.trend} />
          <Stat label={c.net} value={k.netSentiment.display} delta={k.netSentiment.delta} trend={k.netSentiment.trend} />
          <Stat label={c.negShare} value={k.negativeShare.display} delta={k.negativeShare.delta} trend={k.negativeShare.trend} />
          <Hotspot n={1} accent="sent" {...hotspots[0]} className="top-full left-[30%] md:left-[18%]" />
        </div>

        <div className="grid gap-2.5 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-3">
          <div className="relative flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3 md:p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <p className="text-[0.8125rem] font-semibold">{c.byPlatform}</p>
              <p aria-hidden="true" className="flex gap-2.5 text-[0.65625rem] text-on-dark-strong">
                <span>▲ Pos</span>
                <span>– Neu</span>
                <span>▼ Neg (hatched)</span>
              </p>
            </div>
            <ul className="flex flex-col gap-2.25">
              {ORDER.map((n) => (
                <li key={n} className="grid grid-cols-[4.375rem_minmax(0,1fr)] items-center gap-2 text-[0.71875rem]">
                  <span className={cn(n === "instagram" && "font-bold")}>{networks[n]}</span>
                  <StackedBar100
                    data={sentimentByPlatform[n]}
                    height={22}
                    highlight={n === "instagram"}
                    className="[&_text]:text-[0.6875rem]"
                    ariaLabel={`${networks[n]}: positive ${sentimentByPlatform[n][0]}%, neutral ${sentimentByPlatform[n][1]}%, negative ${sentimentByPlatform[n][2]}%`}
                  />
                </li>
              ))}
            </ul>
            <Hotspot n={2} accent="sent" {...hotspots[1]} className="top-full left-[56%]" />
          </div>

          <div className="relative flex flex-col gap-1 rounded-lg border border-border bg-card p-3 text-xs md:p-3.5">
            <p className="mb-1 text-[0.8125rem] font-semibold">{c.hashtags}</p>
            <ul>
              {data.hashtagSentiment.map((h) => (
                <li key={h.tag} className="flex justify-between gap-2 border-b border-border py-1.5 tabular last:border-0">
                  <span>{h.tag}</span>
                  <span className={cn("font-semibold", sentimentText[h.sentiment])}>
                    <span aria-hidden="true">{sentimentGlyph[h.sentiment]} </span>
                    {h.net} {sentimentLabel[h.sentiment].toLowerCase()}
                  </span>
                </li>
              ))}
            </ul>
            <Hotspot n={3} accent="sent" {...hotspots[2]} className="top-0 right-0 translate-x-0" />
          </div>
        </div>
      </MockFrame>

      <FloatCard className="flex flex-col gap-1 px-4 md:relative md:mt-3 md:w-65 lg:absolute lg:-right-5 lg:-bottom-16 lg:mt-0">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <NetworkIcon network={callout.network} className="size-3.5" />
          {callout.label}
        </p>
        <p className="font-heading text-lg font-extrabold">
          {callout.metric}{" "}
          <Delta trend={callout.trend} className="font-extrabold">
            {callout.delta}
          </Delta>
        </p>
        <p className="text-xs text-muted-foreground">{callout.driver}</p>
      </FloatCard>
    </div>
  )
}
