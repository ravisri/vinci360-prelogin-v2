import { Bell, Heart, MessageSquare, Radio, Sparkles, Users } from "lucide-react"

import { SentimentChip } from "@/components/mocks/SentimentChip"
import { sentimentSteps as c } from "@/content/features/sentiment-keywords"
import { cn } from "@/lib/utils"

/** Thin three-part sentiment bar (step sketches); negative is hatched, as everywhere. */
function MiniSplit({ pos, neu, neg, flagged }: { pos: string; neu: string; neg: string; flagged?: boolean }) {
  return (
    <span className={cn("flex h-2.5 gap-px overflow-hidden rounded-xs", flagged && "outline-2 outline-offset-2 outline-chart-3")}>
      <span className={cn("bg-pos", pos)} />
      <span className={cn("bg-neu", neu)} />
      <span className={cn("hatch-neg", neg)} />
    </span>
  )
}

/** "How to use it" illustrations (decorative; HowToUse hides them from screen readers). */
export const sentimentStepIllustrations = [
  <div key="platforms" className="flex h-full flex-col justify-center gap-2.25">
    <MiniSplit pos="w-[52%]" neu="w-[30%]" neg="w-[18%]" />
    <MiniSplit pos="w-[41%]" neu="w-[27%]" neg="w-[32%]" flagged />
    <MiniSplit pos="w-[57%]" neu="w-[29%]" neg="w-[14%]" />
  </div>,
  <div key="posts" className="flex h-full flex-col justify-center gap-1.5">
    {[0, 1].map((i) => (
      <span key={i} className="flex items-center gap-2 rounded-sm bg-card px-2 py-1.5">
        <span className="size-5 flex-none rounded-full bg-sent-tint" />
        <span className="h-1.5 flex-1 rounded-full bg-border" />
        <SentimentChip sentiment="neg" short className="px-1.5 py-px text-[0.59375rem]" />
      </span>
    ))}
  </div>,
  <div key="keyword" className="flex h-full flex-col justify-center gap-2">
    <span className="rounded-sm border-[1.5px] border-sent-text bg-card px-2.5 py-2 text-xs font-bold text-sent-text">{c.tag}</span>
    <span className="grid h-7.5 grid-cols-4 items-end gap-1">
      <span className="h-full rounded-[3px] bg-chart-3" />
      <span className="h-[45%] rounded-[3px] bg-chart-3" />
      <span className="h-[30%] rounded-[3px] bg-chart-3" />
      <span className="h-[15%] rounded-[3px] bg-chart-3" />
    </span>
  </div>,
]

/** "Works with the rest" thumbnails: Reports & Alerts, Promotable Stories, Source Analysis. */
export const sentimentRelatedThumbnails = [
  <Bell key="reports" className="size-11" strokeWidth={2} />,
  <Sparkles key="stories" className="size-11" strokeWidth={2} />,
  <span key="channels" className="flex gap-2.5">
    {[MessageSquare, Radio, Heart, Users].map((Icon, i) => (
      <Icon key={i} aria-hidden="true" strokeWidth={1.8} className="size-7.5" />
    ))}
  </span>,
]
