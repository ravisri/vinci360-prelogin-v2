import { LineArea } from "@/components/charts/LineArea"
import { SentimentLegend, StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { home as copy } from "@/content/home"
import { home as data } from "@/content/sample-data"

const s = data.sentiment
const d = data.dashboard
const [pos, neu, neg] = d.sentimentSplit

/** Sentiment feature row: 30-day net sentiment line (charging spike called out), overall split + top negative keywords. */
export function SentimentPlatformMock() {
  return (
    <VisualPanel accent="sent" dots="tr" className="md:p-10 md:pb-24">
      <MockFrame
        title={copy.sentimentMock.title}
        caption={`Sample net sentiment over the last 30 days, steady until a sharp dip on 1 October (${d.spikeNote.toLowerCase()}) and recovering after. Overall split ${pos}% positive, ${neu}% neutral, ${neg}% negative. Top negative keywords: ${s.topNegativeKeywords.join(", ")}.`}
        className="md:w-[94%]"
        bodyClassName="gap-4"
      >
        <LineArea
          ariaLabel={`Net sentiment over 30 days with a sharp dip on 1 October: ${d.spikeNote}.`}
          max={200}
          height={140}
          xLabels={d.volumeAxis}
          annotation={{ index: d.spikeIndex, label: d.spikeNote }}
          data={[{ label: "Net sentiment", values: d.netSentimentSeries, tone: "chart-1", kind: "area" }]}
        />
        <SentimentLegend />
        <StackedBar100 data={d.sentimentSplit} ariaLabel={`Overall: positive ${pos}%, neutral ${neu}%, negative ${neg}%`} />
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
        <p className="text-xs text-muted-foreground">{copy.sentimentMock.callout}</p>
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
