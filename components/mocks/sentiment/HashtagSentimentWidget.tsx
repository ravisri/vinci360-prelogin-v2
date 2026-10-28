import { Sparkline } from "@/components/charts/Sparkline"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { sentimentPartAWidgets } from "@/content/features/sentiment-keywords"
import { sentiment } from "@/content/sample-data"
import { trendText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = sentimentPartAWidgets.hashtags
const cols =
  "grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_2.5rem_3.75rem] items-center gap-2.5 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_3.25rem_4.625rem_3.5rem]"
const signed = (n: number) => `${n < 0 ? "−" : "+"}${Math.abs(n)}`

/**
 * Part A · 2 · Hashtag-wise overall sentiment: split bar, net, direction with a sparkline, volume.
 * #SampleCampaign is outlined as the tag that has turned negative.
 */
export function HashtagSentimentWidget() {
  return (
    <>
      <MockFrame title={c.title} caption={c.caption} bodyClassName="gap-1.5">
        <div aria-hidden="true" className={cn(cols, "border-b border-border px-2 pb-1.5 text-[0.65625rem] text-muted-foreground")}>
          <span>{c.columns.tag}</span>
          <span>{c.columns.split}</span>
          <span className="text-right">{c.columns.net}</span>
          <span>{c.columns.trend}</span>
          <span className="text-right max-sm:hidden">{c.columns.volume}</span>
        </div>
        <ul aria-hidden="true" className="flex flex-col text-xs tabular">
          {sentiment.hashtags.map((h) => (
            <li
              key={h.tag}
              className={cn(cols, "rounded-[6px] px-2 py-2.25", h.flagged ? "my-0.5 bg-muted outline-2 outline-chart-3" : "border-b border-border")}
            >
              <span className="truncate font-semibold">{h.tag}</span>
              <StackedBar100 data={h.split} height={10} labels={false} />
              <span className={cn("text-right font-bold", trendText[h.trend])}>{signed(h.net)}</span>
              <span className="flex items-center gap-1">
                <span className={cn("font-bold whitespace-nowrap", trendText[h.trend])}>{c.trend[h.trend]}</span>
                <Sparkline data={h.spark} tone="chart-3" strokeWidth={1.8} width={48} height={16} className="w-12 max-sm:hidden" />
              </span>
              <span className="text-right max-sm:hidden">{fmt(h.volume)}</span>
            </li>
          ))}
        </ul>
      </MockFrame>
      {/* Below the frame's bottom-left corner, in the panel padding. */}
      <FloatCard className="flex items-center gap-2 px-3.5 py-2.5 md:-bottom-14.5 md:-left-12.5">
        <span aria-hidden="true" className="font-extrabold text-neg">
          ▼
        </span>
        <span className="text-[0.84375rem] font-bold">{c.float}</span>
      </FloatCard>
    </>
  )
}
