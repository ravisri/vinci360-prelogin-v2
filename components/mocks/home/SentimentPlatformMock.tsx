import { SentimentLegend, StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { home as copy } from "@/content/home"
import { home as data, networks, type Network } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const s = data.sentiment
const ORDER: Network[] = ["facebook", "x", "youtube", "instagram"]

/** Sentiment feature row: 100% stacked bars per platform (Instagram called out) + top negative keywords. */
export function SentimentPlatformMock() {
  return (
    <VisualPanel accent="sent" dots="tr" className="md:p-10 md:pb-24">
      <MockFrame
        title={copy.sentimentMock.title}
        caption={`Sample sentiment by platform as 100% stacked bars. ${ORDER.map((n) => `${networks[n]} ${s.byPlatform[n].join(", ")}`).join(". ")} (positive, neutral, negative %).`}
        className="md:w-[94%]"
        bodyClassName="gap-4"
      >
        <SentimentLegend />
        <ul className="flex flex-col gap-3">
          {ORDER.map((n) => (
            <li key={n} className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 text-xs">
              <span className={cn(n === "instagram" && "font-bold")}>{networks[n]}</span>
              <StackedBar100 data={s.byPlatform[n]} ariaLabel={`${networks[n]}: positive ${s.byPlatform[n][0]}%, neutral ${s.byPlatform[n][1]}%, negative ${s.byPlatform[n][2]}%`} highlight={n === "instagram"} />
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">{copy.sentimentMock.keywords}</span>
          {s.topNegativeKeywords.map((k) => (
            <span key={k} className="rounded-full border border-border bg-card px-2.5 py-1 font-semibold">
              {k}
            </span>
          ))}
        </div>
      </MockFrame>

      <FloatCard className="md:-right-4 md:-bottom-20 md:w-62.5">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <NetworkIcon network={s.callout.network} className="size-4 text-foreground" />
          {s.callout.label}
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-sm font-semibold">
          {s.callout.metric}
          <Delta trend={s.callout.trend} className="font-heading text-lg font-extrabold">
            {s.callout.delta}
          </Delta>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{s.callout.driver}</p>
      </FloatCard>
    </VisualPanel>
  )
}
