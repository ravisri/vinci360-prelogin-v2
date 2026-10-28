import { BarChart3, Sparkles } from "lucide-react"

import { reportsSteps as c } from "@/content/features/reports-alerts"
import { cn } from "@/lib/utils"

/** "How to use it" illustrations (decorative; HowToUse hides them from screen readers). */
export const reportsStepIllustrations = [
  <div key="what" className="flex h-full flex-col justify-center gap-2">
    <span className="rounded-sm border border-border bg-card px-2.5 py-2 text-xs font-semibold">{c.subject}</span>
    <span className="flex self-start overflow-hidden rounded-sm border border-border bg-card text-[0.71875rem] font-semibold">
      {c.periods.map((p, i) => (
        <span key={p} className={cn("px-2.5 py-1.5", i === 1 && "bg-reports-text text-primary-foreground")}>
          {p}
        </span>
      ))}
    </span>
  </div>,
  <div key="who" className="flex h-full flex-col justify-center gap-2">
    <span className="flex flex-wrap gap-1.5">
      {c.recipients.map((r) => (
        <span key={r} className="rounded-full bg-reports-tint px-3 py-1 text-xs font-semibold text-reports-text">
          {r}
        </span>
      ))}
    </span>
    <span className="text-xs font-semibold">
      {c.rule.before} <span className="text-reports-text">{c.rule.value}</span> {c.rule.after}
    </span>
  </div>,
  <div key="run" className="flex h-full flex-col justify-center gap-1.5 text-[0.71875rem]">
    <span className="flex items-center gap-1.5">
      <span className="grid size-5 place-items-center rounded-[6px] bg-muted font-bold text-neg">!</span>
      {c.alert}
    </span>
    <span className="self-end font-semibold text-on-dark-focus">{c.view}</span>
  </div>,
]

/** "Works with the rest" thumbnails: Brand Compare, Sentiment & Keywords, Promotable Stories. */
export const reportsRelatedThumbnails = [
  <BarChart3 key="cmp" className="size-11 text-cmp-text" strokeWidth={2} />,
  <span key="sent" className="flex w-full flex-col gap-2 px-6">
    <span className="flex h-3 overflow-hidden rounded-full">
      <span className="w-[55%] bg-sent-text" />
      <span className="w-1/4 bg-sent-300" />
      <span className="w-1/5 bg-sent-200" />
    </span>
    <span className="flex h-3 overflow-hidden rounded-full">
      <span className="w-[35%] bg-sent-text" />
      <span className="w-[30%] bg-sent-300" />
      <span className="w-[35%] bg-sent-200" />
    </span>
  </span>,
  <Sparkles key="stories" className="size-11 text-stories-text" strokeWidth={2} />,
]
