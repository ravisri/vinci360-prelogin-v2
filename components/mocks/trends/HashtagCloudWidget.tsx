import { Download } from "lucide-react"

import { TagCloud } from "@/components/charts/TagCloud"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { MoodLegend } from "@/components/mocks/trends/MoodLegend"
import { trendsHashtagWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel } from "@/lib/sentiment"

const c = trendsHashtagWidgets.cloud

/** Block B3 · Hashtag cloud: the ranking as a presentation view, sized by use and marked by mood. */
export function HashtagCloudWidget() {
  return (
    <MockFrame title={<MoodLegend />} caption={c.caption} bodyClassName="p-4.5">
      <div className="flex min-h-37.5 items-center py-3.5">
        <TagCloud ariaLabel={c.caption} data={trends.hashtagCloud} align="center" className="w-full" />
      </div>
      <details className="text-xs">
        <summary className="flex min-h-8 cursor-pointer items-center text-on-dark-focus">{c.viewList}</summary>
        <ul className="mt-1.5 grid list-disc grid-cols-1 gap-x-3 gap-y-0.5 pl-4.5 tabular sm:grid-cols-2">
          {trends.hashtagCloud.map((t) => (
            <li key={t.term}>
              {t.term} — {fmt(t.usage)} · {sentimentGlyph[t.sentiment]} {sentimentLabel[t.sentiment].toLowerCase()}
            </li>
          ))}
        </ul>
      </details>
      <span className="inline-flex items-center gap-1.5 self-end rounded-full border border-border px-2.5 py-1.5 text-xs font-semibold text-on-dark-strong">
        <Download aria-hidden="true" strokeWidth={2} className="size-3" />
        {c.export}
      </span>
    </MockFrame>
  )
}
