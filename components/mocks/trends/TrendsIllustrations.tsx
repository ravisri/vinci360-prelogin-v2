import { Check, Sparkles } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { trendsSteps as c } from "@/content/features/trends"
import { compare } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const chip = "rounded-full px-2.5 py-1 text-xs leading-[1.3] font-semibold"

/** Mini scoreboard rows for step 1: rank, bar, move (the breakout row highlighted). */
const boardRows = [
  { rank: 1, trend: "up", move: 2 },
  { rank: 3, trend: "up", move: 9, hot: true },
  { rank: 4, trend: "down", move: 2 },
] as const

/** "How to use it" illustrations (decorative; HowToUse hides them from screen readers). */
export const trendsStepIllustrations = [
  <div key="board" className="flex h-full flex-col justify-center gap-1.75 text-[0.6875rem] tabular">
    {boardRows.map((r) => (
      <span
        key={r.rank}
        className={cn(
          "flex items-center gap-2 text-muted-foreground",
          "hot" in r && "rounded-[5px] bg-border py-0.75 font-bold text-foreground shadow-[inset_3px_0_0_var(--color-trends)]",
        )}
      >
        <span className={cn("w-3.5", "hot" in r && "pl-1.25")}>{r.rank}</span>
        <span className={cn("h-1.5 flex-1 rounded-full", "hot" in r ? "bg-trends" : "bg-border")} />
        <Delta trend={r.trend} className={cn("hot" in r && "pr-1")}>
          {r.move}
        </Delta>
      </span>
    ))}
  </div>,
  <div key="makeup" className="flex h-full flex-col justify-center gap-2">
    <span className="flex flex-wrap gap-1.25">
      {c.tags.map((t) => (
        <span key={t} className={cn(chip, "bg-trends-tint text-trends-text")}>
          {t}
        </span>
      ))}
    </span>
    <span className="flex flex-wrap gap-1.25">
      <span className={cn(chip, "border border-border bg-card")}>{c.category}</span>
      <span className={cn(chip, "bg-pos text-primary-foreground")}>{c.positive}</span>
    </span>
  </div>,
  <div key="choose" className="flex h-full flex-col justify-center gap-2">
    <span className="flex h-3.5 gap-0.5 overflow-hidden rounded-sm">
      <span className="w-[24%] bg-chart-6" />
      <span className="w-[55%] bg-chart-3" />
      <span className="w-[21%] bg-chart-5" />
    </span>
    <span className="flex items-center gap-1.5 text-xs font-semibold">
      <Check aria-hidden="true" strokeWidth={2.5} className="size-3.5 text-pos" />
      {c.use}
    </span>
  </div>,
]

/** Brand Compare donut, from the share-of-voice split (Aurora · Nimbus · Kestrel). */
const sov = compare.shareOfVoice
const C = 2 * Math.PI * 50
const arcs = [
  { value: sov.aurora, className: "stroke-cmp-text" },
  { value: sov.nimbus, className: "stroke-chart-6" },
  { value: sov.kestrel, className: "stroke-cmp-200" },
]

/** "Works with the rest" thumbnails: Promotable Stories, Sentiment & Keywords, Brand Compare. */
export const trendsRelatedThumbnails = [
  <Sparkles key="stories" className="size-11" strokeWidth={2} />,
  <span key="sent" className="flex w-3/4 flex-col gap-2">
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
  <svg key="cmp" viewBox="0 0 140 140" className="size-17.5" aria-hidden="true">
    <g transform="rotate(-90 70 70)" fill="none" strokeWidth="22">
      {arcs.map((a, i) => {
        const offset = arcs.slice(0, i).reduce((s, x) => s + (x.value / 100) * C, 0)
        return <circle key={a.className} cx="70" cy="70" r="50" strokeDasharray={`${(a.value / 100) * C - 2} ${C}`} strokeDashoffset={-offset} className={a.className} />
      })}
    </g>
  </svg>,
]
