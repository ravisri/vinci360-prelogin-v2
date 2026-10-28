"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"

import { Sparkline } from "@/components/charts/Sparkline"
import { MockFrame } from "@/components/mocks/MockFrame"
import { darkCard, hitArea } from "@/components/mocks/smi/styles"
import { aiChipDark, kwChip, tagChip } from "@/components/mocks/stories/styles"
import { storiesLabels as l, storiesWidgets as w } from "@/content/features/promotable-stories"
import { stories } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const lead = stories.candidates[0]
const tags = stories.sourceTags

/** 1 · The suggested topic: headline, source hashtags (pick one to see its 8-week trend) and keywords. */
export function SuggestedTopicWidget() {
  const [selected, setSelected] = useState(0)
  const tag = tags[selected]
  return (
    <MockFrame
      caption={w.topic.caption}
      title={
        <span className={aiChipDark}>
          <Sparkles aria-hidden="true" strokeWidth={2} className="size-2.75" />
          {l.ai}
        </span>
      }
      bodyClassName="gap-3.5 p-4 md:p-5"
    >
      <p className="font-heading text-lg leading-[1.25] font-extrabold md:text-[1.375rem]">{lead.title}</p>
      <div role="group" aria-label={w.topic.tagsLabel} className="flex flex-wrap gap-1.5">
        {tags.map((t, i) => (
          <button
            key={t.tag}
            type="button"
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
            className={cn(tagChip, hitArea, "min-h-9 cursor-pointer transition-colors", selected === i ? "border-stories bg-stories text-ink" : "hover:border-stories")}
          >
            {t.tag}
          </button>
        ))}
        {lead.keywords.map((k) => (
          <span key={k} className={cn(kwChip, "min-h-9")}>
            {k}
          </span>
        ))}
      </div>
      <div className={cn(darkCard, "p-3")}>
        <div className="flex justify-between text-xs tabular">
          <span aria-live="polite" className="font-semibold">
            {tag.tag} {w.topic.weeks}
          </span>
          <span className="font-bold text-pos">▲ {tag.growth}%</span>
        </div>
        <Sparkline key={tag.tag} data={tag.series} tone="chart-5" width={400} height={90} strokeWidth={3} className="mt-1.5 w-full" />
      </div>
    </MockFrame>
  )
}
