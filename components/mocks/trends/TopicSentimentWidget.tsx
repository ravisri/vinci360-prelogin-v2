import { Flag } from "lucide-react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { MockFrame } from "@/components/mocks/MockFrame"
import { net, netTrend, signed } from "@/components/mocks/trends/data"
import { trendsTopicWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = trendsTopicWidgets.sentiment
/** The five topics in the reference, warmest first (Low-light video is not shown). */
const rows = trends.topics
  .filter((t) => t.topic !== "Low-light video")
  .map((t) => ({ ...t, net: net(t) }))
  .sort((x, y) => y.net - x.net)

/** Block A5 · Sentiment per topic: split bar + net score; the mixed topic is outlined and flagged. */
export function TopicSentimentWidget() {
  return (
    <MockFrame
      title={c.title}
      caption={`Sample sentiment per topic: ${rows.map((t) => `${t.topic} net ${signed(t.net)}`).join(", ")}. ${c.flag.strong} ${c.flag.text}`}
    >
      <ul aria-hidden="true" className="grid grid-cols-[6.5rem_minmax(0,1fr)_4.75rem] items-center gap-x-3 gap-y-2.5 text-xs sm:grid-cols-[8.125rem_minmax(0,1fr)_5.75rem]">
        {rows.map((t) => {
          const flagged = t.topic === c.flag.topic
          return (
            <li key={t.topic} className="contents">
              <span className={cn(flagged && "font-bold")}>{t.topic}</span>
              <StackedBar100 data={t.split} height={18} className={cn(flagged && "outline-2 outline-offset-2 outline-trends")} />
              <Delta trend={netTrend(t.net)} className="font-bold">
                {c.net} {signed(t.net)}
              </Delta>
            </li>
          )
        })}
      </ul>
      <p className="flex items-center gap-2 rounded-sm bg-border px-3 py-2.5 text-[0.78125rem]">
        <Flag aria-hidden="true" strokeWidth={2.2} className="size-4 flex-none text-chart-2" />
        <span>
          <strong>{c.flag.strong}</strong> {c.flag.text}
        </span>
      </p>
    </MockFrame>
  )
}
