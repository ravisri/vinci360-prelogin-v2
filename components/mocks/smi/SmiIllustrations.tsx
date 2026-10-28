import { Mail, TrendingUp } from "lucide-react"

import { Sparkline } from "@/components/charts/Sparkline"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { smiSteps as c } from "@/content/features/smi"
import { smi } from "@/content/sample-data"

const pill = "rounded-full border border-border bg-card px-2 py-0.5 text-[0.6875rem]"

/** "How to use it" illustrations (decorative; HowToUse hides them from screen readers). */
export const smiStepIllustrations = [
  <div key="pick" className="flex flex-col gap-2">
    <span className="rounded-sm border border-border bg-card px-3 py-2 text-xs font-semibold">{c.search}</span>
    <span className="flex flex-wrap gap-1.5">
      {c.scopes.map((s, i) => (
        <span key={s} className={i ? pill : "rounded-full bg-primary px-2 py-0.5 text-[0.6875rem] font-semibold text-primary-foreground"}>
          {s}
        </span>
      ))}
    </span>
  </div>,
  <div key="read" className="flex h-full flex-col justify-between">
    <span className="flex gap-1.5">
      <span className="h-7.5 flex-1 rounded-sm border border-border bg-card" />
      <span className="h-7.5 flex-1 rounded-sm border border-border bg-card" />
      <span className="h-7.5 flex-1 rounded-sm border border-border bg-card" />
    </span>
    <Sparkline data={smi.mentionsSpark} className="w-full" width={200} height={40} strokeWidth={2.5} />
  </div>,
  <div key="drill" className="flex flex-col gap-1.5">
    {(["neg", "pos"] as const).map((s) => (
      <span key={s} className="flex items-center gap-2 rounded-sm bg-card px-2 py-1">
        <span className="size-4.5 rounded-full bg-primary-tint" />
        <span className="h-1.5 flex-1 rounded-full bg-border" />
        <SentimentChip sentiment={s} short />
      </span>
    ))}
    <span className="flex gap-1.5">
      {c.actions.map((a) => (
        <span key={a} className={`${pill} font-semibold`}>
          {a}
        </span>
      ))}
    </span>
  </div>,
]

/** "Works with the rest" thumbnails: Trends, Sentiment & Keywords, Reports & Alerts. */
export const smiRelatedThumbnails = [
  <TrendingUp key="trends" className="size-12" strokeWidth={2.5} />,
  <span key="sent" className="flex w-3/4 flex-col gap-2">
    <span className="flex h-3 gap-0.5 overflow-hidden rounded-full">
      <span className="w-[55%] bg-sent-text" />
      <span className="w-1/4 bg-sent-300" />
      <span className="w-1/5 bg-sent-200" />
    </span>
    <span className="flex h-3 gap-0.5 overflow-hidden rounded-full">
      <span className="w-[35%] bg-sent-text" />
      <span className="w-[30%] bg-sent-300" />
      <span className="w-[35%] bg-sent-200" />
    </span>
  </span>,
  <Mail key="reports" className="size-12" strokeWidth={2} />,
]
