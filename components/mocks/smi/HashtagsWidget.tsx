import { TrendingUp } from "lucide-react"

import { TagCloud } from "@/components/charts/TagCloud"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { darkCard } from "@/components/mocks/smi/styles"
import { smiWidgets } from "@/content/features/smi"
import { smi } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentShort, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = smiWidgets.hashtags
const spotlight = "#ChargerFail"

/**
 * Widget 7 · Trending hashtags: ranked table plus a cloud. The table is fixed-layout: the name column
 * flexes and truncates, every numeric column has a fixed width, so nothing can overlap at any size.
 */
export function HashtagsWidget() {
  return (
    <div className="relative">
      <MockFrame
        caption={`Sample trending hashtags, by usage: ${smi.hashtags.map((h) => `${h.tag} used ${fmt(h.usage)} times, reach ${h.reach}, growth up ${h.growth}%, ${sentimentLabel[h.sentiment].toLowerCase()}`).join("; ")}. Cloud size shows volume.`}
      >
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className={cn(darkCard, "px-2.5 py-1.5")}>
            <table className="w-full table-fixed text-[0.71875rem]">
              <colgroup>
                <col />
                <col className="w-11" />
                <col className="w-10" />
                <col className="w-14" />
                <col className="w-11" />
              </colgroup>
              <thead className="text-muted-foreground">
                <tr>
                  <th scope="col" className="py-1.5 text-left font-normal">{c.columns.tag}</th>
                  <th scope="col" className="py-1.5 pl-1.5 text-right font-normal">{c.columns.usage}</th>
                  <th scope="col" className="py-1.5 pl-1.5 text-right font-normal">{c.columns.reach}</th>
                  <th scope="col" className="py-1.5 pl-1.5 text-right font-normal">{c.columns.growth}</th>
                  <th scope="col" className="py-1.5 pl-2 text-left font-normal">{c.columns.mood}</th>
                </tr>
              </thead>
              <tbody>
                {smi.hashtags.map((h, i) => {
                  const hot = h.tag === spotlight
                  return (
                    <tr key={h.tag} className={cn("border-t border-border", hot && "bg-muted")}>
                      <th scope="row" title={h.tag} className={cn("truncate py-1.75 pr-1 pl-1 text-left", i === 0 || hot ? "font-bold" : "font-medium")}>
                        {h.tag}
                      </th>
                      <td className="py-1.75 pl-1.5 text-right tabular">{fmt(h.usage)}</td>
                      <td className="py-1.75 pl-1.5 text-right tabular">{h.reach}</td>
                      <td className={cn("py-1.75 pl-1.5 text-right whitespace-nowrap text-pos tabular", hot && "font-bold")}>▲ {h.growth}%</td>
                      <td className={cn("py-1.75 pl-2 whitespace-nowrap", sentimentText[h.sentiment])}>
                        <span aria-hidden="true">
                          {sentimentGlyph[h.sentiment]} {sentimentShort[h.sentiment]}
                        </span>
                        <span className="sr-only">{sentimentLabel[h.sentiment]}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className={cn(darkCard, "flex flex-col gap-2 p-3")}>
            <p className="text-[0.75rem] font-semibold">{c.cloud}</p>
            <TagCloud ariaLabel={c.cloud} data={smi.hashtagCloud} />
          </div>
        </div>
      </MockFrame>
      {/* Below the frame's bottom-right edge, in the panel padding. */}
      <FloatCard className="md:-right-3.5 md:-bottom-12">
        <p className="flex items-center gap-2 text-[0.8125rem] font-bold">
          <TrendingUp aria-hidden="true" strokeWidth={2.2} className="size-4 text-smi-text" />
          {c.float}
        </p>
      </FloatCard>
    </div>
  )
}
