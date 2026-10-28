import { Bell, CalendarPlus } from "lucide-react"

import { storiesSteps as c } from "@/content/features/promotable-stories"
import { stories } from "@/content/sample-data"

const lead = stories.candidates[0]

/** "How to use it" illustrations (decorative; HowToUse hides them from screen readers). */
export const storiesStepIllustrations = [
  <div key="bar" className="flex h-full flex-col justify-center gap-2">
    <span className="flex gap-1.5">
      <span className="rounded-full bg-stories-tint px-2.5 py-1 text-xs font-semibold text-stories-text">{c.filters[0]}</span>
      <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold">{c.filters[1]}</span>
    </span>
    <span className="relative h-2 rounded-full bg-border">
      <span className="absolute inset-y-0 left-0 w-3/5 rounded-full bg-stories" />
      <span className="absolute -top-1.25 left-3/5 -ml-2.25 size-4.5 rounded-full border-2 border-stories-text bg-card" />
    </span>
    <span className="text-[0.6875rem] text-neutral-text tabular">{c.bar(stories.threshold.step1)}</span>
  </div>,
  <div key="posts" className="flex h-full flex-col justify-center gap-1.5 text-[0.71875rem]">
    <strong className="text-[0.78125rem]">{lead.title}</strong>
    {c.quotes.map((q) => (
      <span key={q} className="flex items-center gap-1.5 rounded-[6px] bg-card p-1.5">
        <span className="size-4.5 flex-none rounded-full bg-border" />
        {q}
      </span>
    ))}
  </div>,
  <div key="accept" className="flex h-full flex-col justify-center gap-2">
    <span className="flex min-h-8 items-center justify-center rounded-sm bg-primary text-[0.78125rem] font-semibold text-primary-foreground">{c.accept}</span>
    <span className="flex items-center gap-1.5 text-xs font-semibold text-stories-text">
      <CalendarPlus strokeWidth={2} className="size-4" />
      {c.added(stories.calendarDate)}
    </span>
  </div>,
]

/** "Works with the rest" thumbnails: Trends, Sentiment & Keywords, Reports & Alerts. */
export const storiesRelatedThumbnails = [
  <svg key="trends" viewBox="0 0 160 60" className="h-14 w-40" fill="none">
    <polyline points="4,52 40,44 70,48 112,22 156,8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-trends-text" />
  </svg>,
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
  <Bell key="reports" className="size-11" strokeWidth={2} />,
]
