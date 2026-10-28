import { Rows3 } from "lucide-react"

import { Bars } from "@/components/charts/Bars"
import { FloatCard } from "@/components/mocks/FloatCard"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { kpiProps } from "@/components/mocks/home/kpi"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { home as copy } from "@/content/home"
import { home as data, networks } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const s = data.snapshot
const kpis = [s.mentions, s.engagement, s.netSentiment]

/** SMI feature row: weekly KPIs + mentions per day (Sat peak) and the "Unified feed" float. */
export function SnapshotMock() {
  return (
    <VisualPanel accent="smi" dots="tr" className="md:p-10 md:pb-44">
      <MockFrame
        title={
          <>
            <span className="md:hidden">{copy.smiMock.titleMobile}</span>
            <span className="max-md:hidden">{s.label}</span>
          </>
        }
        caption={`Sample weekly snapshot: ${s.mentions.display} mentions up ${s.mentions.delta}, ${s.engagement.display} engagement up ${s.engagement.delta}, net sentiment ${s.netSentiment.display} down ${s.netSentiment.delta}, and daily mentions for Monday to Sunday peaking on Saturday.`}
        className="md:w-[88%]"
      >
        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k) => (
            <KpiCard
              key={k.label}
              size="md"
              {...kpiProps(k)}
              label={
                k === s.netSentiment ? (
                  <>
                    <span className="text-[0.625rem] md:hidden">{copy.smiMock.netShort}</span>
                    <span className="max-md:hidden">{k.label}</span>
                  </>
                ) : (
                  <span className="max-md:text-[0.625rem]">{k.label}</span>
                )
              }
              delta={k.delta}
            />
          ))}
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="mb-2 text-[0.75rem] font-semibold max-md:hidden">{copy.smiMock.chartTitle}</p>
          <Bars
            ariaLabel={`${copy.smiMock.chartTitle}, Monday to Sunday, peaking on Saturday`}
            labels={s.daily.labels}
            data={[{ label: copy.hero.mentions, values: s.daily.values, tone: "chart-1" }]}
            highlight={s.daily.peak}
            highlightTone="chart-3"
            max={100}
            width={280}
            height={90}
          />
        </div>
      </MockFrame>

      <FloatCard className="md:-right-4 md:-bottom-40 md:w-70">
        <p className="mb-2 flex items-center gap-2 text-[0.8125rem] font-bold">
          <Rows3 aria-hidden="true" strokeWidth={2} className="size-4 text-primary" />
          {copy.smiMock.feedTitle}
        </p>
        <ul className="flex flex-col">
          {s.feed.map((p) => (
            <li
              key={p.network}
              className={cn("flex items-start gap-2 border-t border-muted py-2 first:border-0 first:pt-0 last:pb-0", !p.short && "max-md:hidden")}
            >
              <NetworkIcon network={p.network} className="mt-0.5 size-4 flex-none" />
              <span className="sr-only">{networks[p.network]}: </span>
              <span className="min-w-0 flex-1 text-xs leading-[1.4]">
                {p.short && p.short !== p.text ? (
                  <>
                    <span className="md:hidden">{p.short}</span>
                    <span className="max-md:hidden">{p.text}</span>
                  </>
                ) : (
                  p.text
                )}
              </span>
              <SentimentChip sentiment={p.sentiment} short />
            </li>
          ))}
        </ul>
      </FloatCard>
    </VisualPanel>
  )
}
