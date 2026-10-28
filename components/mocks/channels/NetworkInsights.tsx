import { ShareBar } from "@/components/mocks/channels/ShareBar"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { channelInsights, channelNetworks, channelOrder, type ChannelInsight } from "@/content/channels-data"
import { channelsInsights as c } from "@/content/features/channel-analysis"
import { cn } from "@/lib/utils"

/** The small dark figure inside an insight card, one layout per insight kind. */
function InsightViz({ insight, compact }: { insight: ChannelInsight; compact?: boolean }) {
  switch (insight.kind) {
    case "split":
      return (
        <>
          {insight.rows.map((r) => (
            <div key={r.label} className="flex flex-col gap-1.5">
              <span>{compact ? r.labelShort : r.label}</span>
              <ShareBar segs={r.segs} height={compact ? 10 : 12} className="rounded-[3px]" />
            </div>
          ))}
          <span className="flex flex-wrap gap-x-2 text-muted-foreground">
            {insight.legend.map((l) => (
              <span key={l.label} className="inline-flex items-center gap-1">
                <span aria-hidden="true" className={cn("size-2 rounded-full", l.dot)} />
                {l.label}
              </span>
            ))}
          </span>
        </>
      )
    case "video":
      return compact ? (
        <>
          <span>{insight.mobile}</span>
          <SentimentChip sentiment={insight.sentiment} className="self-start" />
        </>
      ) : (
        <>
          <span>{insight.name}</span>
          <span className="grid grid-cols-[3.875rem_1fr] items-center gap-1.5">
            {insight.viewsLabel}
            <ShareBar segs={[{ share: insight.views, tone: "channels" }]} height={12} className="rounded-[3px]" />
          </span>
          <span className="grid grid-cols-[3.875rem_1fr] items-center gap-1.5">
            {insight.commentsLabel}
            <span className="justify-self-start">
              <SentimentChip sentiment={insight.sentiment} className="tabular" />
              <span className="ml-1 tabular">{insight.pct}%</span>
            </span>
          </span>
          <span className="text-muted-foreground">{insight.foot}</span>
        </>
      )
    case "accounts":
      return (
        <>
          {insight.rows.map((r) => (
            <span key={r.handle} className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
              <strong>{r.handle}</strong>
              <span className="text-muted-foreground">{r.followers}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[0.625rem] font-semibold", r.strong ? "bg-channels text-ink" : "bg-muted text-foreground")}>Infl. {r.score}</span>
            </span>
          ))}
          {!compact && <span className="text-muted-foreground">{insight.foot}</span>}
        </>
      )
    case "ratio":
      return (
        <>
          {insight.rows.map((r) => (
            <span key={r.label} className={cn("grid items-center gap-1.5", compact ? "grid-cols-[1fr_auto]" : "grid-cols-[4.75rem_1fr_2.25rem]")}>
              {r.label}
              {!compact && <ShareBar segs={[{ share: r.pct, tone: r.tone }]} height={12} className="rounded-[3px]" />}
              <strong className="text-right">{r.value}</strong>
            </span>
          ))}
          {!compact && <span className="text-muted-foreground">{insight.foot}</span>}
        </>
      )
  }
}

/** "One insight per network": four cards (4/2/1 grid from md; a swipe strip of compact cards below md). */
export function NetworkInsights() {
  return (
    <section aria-labelledby="insights-h" className="flex flex-col gap-3 pt-11 md:container-site md:gap-7 md:pt-24">
      <Reveal className="max-md:container-site">
        <SectionHeader id="insights-h" title={c.title} />
      </Reveal>
      <Reveal className="max-md:hidden">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {channelOrder.map((k) => {
            const item = channelInsights[k]
            return (
              <li key={k} className="flex flex-col gap-3.5 rounded-lg bg-card p-6 shadow-card">
                <span className="flex items-center gap-2 text-[0.8125rem] font-semibold">
                  <NetworkIcon network={k} className="size-4.5" />
                  {channelNetworks[k].name}
                </span>
                <figure className="on-dark relative flex flex-col gap-2 rounded-lg bg-background px-3.5 pt-3.5 pb-10 text-[0.6875rem] text-foreground tabular">
                  <SampleDataChip className="self-end text-[0.625rem]" />
                  <InsightViz insight={item.insight} />
                  <span className="absolute inset-x-2.5 -bottom-3.5 rounded-lg bg-primary-foreground px-2.5 py-1.5 text-[0.71875rem] font-bold text-ink shadow-card">
                    {item.label}
                  </span>
                  <figcaption className="sr-only">{item.caption}</figcaption>
                </figure>
                <h3 className="mt-2 text-lg">{item.title}</h3>
              </li>
            )
          })}
        </ul>
      </Reveal>
      <ul aria-label={c.listLabel} className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-1 pb-2 md:hidden">
        {channelOrder.map((k) => {
          const item = channelInsights[k]
          return (
            <li key={k} className="flex w-68 flex-none snap-start flex-col gap-2.5 rounded-lg bg-card p-4 shadow-card">
              <span className="text-xs font-semibold text-muted-foreground">
                {channelNetworks[k].name} · <SampleDataChip tone="light" className="px-2 py-0.5 text-[0.625rem]" />
              </span>
              <figure className="on-dark flex flex-col gap-1.5 rounded-sm bg-background p-2.5 text-[0.6875rem] text-foreground tabular">
                <InsightViz insight={item.insight} compact />
                <figcaption className="sr-only">{item.caption}</figcaption>
              </figure>
              <h3 className="text-base">{item.title}</h3>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
