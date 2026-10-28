"use client"

import { useState } from "react"

import { TagCloud } from "@/components/charts/TagCloud"
import { MockFrame } from "@/components/mocks/MockFrame"
import { MoodLegend } from "@/components/mocks/trends/MoodLegend"
import { trendsTopicWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel } from "@/lib/sentiment"

const c = trendsTopicWidgets.cloud

/** Block A6 · Topic cloud: click a term to filter the section; a list version sits under the cloud. */
export function TopicCloudWidget() {
  const [term, setTerm] = useState<string | null>(null)
  return (
    <MockFrame
      title={<MoodLegend />}
      caption="Sample topic cloud. The most frequent terms are night mode and launch, both positive; charger is frequent and negative; price is neutral. A list version is available below the cloud."
    >
      <div role="group" aria-label={c.groupLabel} className="flex min-h-37.5 items-center py-2.5">
        <TagCloud
          ariaLabel={c.groupLabel}
          data={trends.topicCloud}
          align="center"
          selected={term}
          onSelect={(t) => setTerm((cur) => (cur === t ? null : t))}
          selectLabel={(t) => c.select(t.term, sentimentLabel[t.sentiment].toLowerCase())}
          className="w-full [&_ul]:gap-x-1.5"
        />
      </div>
      <div className="flex min-h-8 items-center justify-between gap-2 border-t border-border pt-2 text-xs">
        <p aria-live="polite" className="text-muted-foreground">
          {c.filteredTo} <strong className="text-foreground">{term ? `“${term}”` : c.all}</strong>
        </p>
        {term && (
          <button
            type="button"
            onClick={() => setTerm(null)}
            className="relative min-h-8 cursor-pointer rounded-full border border-border px-2.5 text-xs font-medium text-on-dark-strong after:absolute after:inset-x-0 after:-inset-y-1.5 hover:bg-muted"
          >
            {c.clear}
          </button>
        )}
      </div>
      <details className="text-xs">
        <summary className="flex min-h-8 cursor-pointer items-center text-on-dark-focus">{c.viewList}</summary>
        <ul className="mt-1.5 grid list-disc grid-cols-2 gap-x-3 gap-y-0.5 pl-4.5">
          {trends.topicCloud.map((t) => (
            <li key={t.term}>
              {t.term} — {sentimentGlyph[t.sentiment]} {sentimentLabel[t.sentiment]}
            </li>
          ))}
        </ul>
      </details>
    </MockFrame>
  )
}
