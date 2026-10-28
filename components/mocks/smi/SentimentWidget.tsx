"use client"

import { useState } from "react"

import { HBar } from "@/components/charts/HBar"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { smiWidgets } from "@/content/features/smi"
import { smi, trends } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = smiWidgets.sentiment
const s = smi.sentiment
const TOPICS = trends.topics.slice(0, 4)
const ROWS = [
  { label: "▲ Positive", tone: "pos" },
  { label: "– Neutral", tone: "neu" },
  { label: "▼ Negative", tone: "neg" },
] as const

type Values = "count" | "pct"
type View = "overall" | "topic"

/** Widget 5 · Sentiment bar graphs: net score tile plus overall bars or a per-topic split. */
export function SentimentWidget() {
  const [values, setValues] = useState<Values>("pct")
  const [view, setView] = useState<View>("overall")
  return (
    <MockFrame
      title={
        <span className="flex flex-wrap gap-2">
          <Segmented label={c.values.label} value={values} options={c.values.options as { value: Values; label: string }[]} onChange={setValues} />
          <Segmented label={c.view.label} value={view} options={c.view.options as { value: View; label: string }[]} onChange={setView} />
        </span>
      }
      caption={`Sample sentiment, last 30 days: net sentiment ${s.net}; positive ${s.split[0]}% (${fmt(s.counts[0])}), neutral ${s.split[1]}% (${fmt(s.counts[1])}), negative ${s.split[2]}% (${fmt(s.counts[2])}). By topic: ${TOPICS.map((t) => `${t.topic} ${t.split.join("/")}`).join(", ")} (positive/neutral/negative %).`}
    >
      <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <div className="rounded-lg bg-card px-4 py-3">
          <p className="text-[0.6875rem] text-muted-foreground">{c.net}</p>
          <p className="font-heading text-[1.75rem] leading-[1.1] font-extrabold text-pos tabular">▲ {s.net}</p>
          <p className="text-[0.6875rem] text-muted-foreground">{c.netSub}</p>
        </div>
        <div aria-live="polite">
          {view === "overall" ? (
            <HBar
              ariaLabel={`${c.overall}: ${ROWS.map((r, i) => `${r.label.slice(2)} ${values === "pct" ? `${s.split[i]}%` : fmt(s.counts[i])}`).join(", ")}`}
              thickness={14}
              labelClassName="w-21.5"
              data={ROWS.map((r, i) => ({
                label: r.label,
                value: s.counts[i],
                display: values === "pct" ? `${s.split[i]}%` : fmt(s.counts[i]),
                tone: r.tone,
              }))}
            />
          ) : (
            <ul aria-label={c.byPlatform} className="flex flex-col gap-2">
              {TOPICS.map(({ topic, split }) => {
                return (
                  <li key={topic} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-2 text-xs">
                    <span className="truncate text-muted-foreground">{topic}</span>
                    <StackedBar100 data={split} height={18} ariaLabel={`${topic}: positive ${split[0]}%, neutral ${split[1]}%, negative ${split[2]}%`} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <p className={cn("text-[0.65625rem] text-muted-foreground", view === "overall" && "invisible")}>{c.caption}</p>
    </MockFrame>
  )
}
