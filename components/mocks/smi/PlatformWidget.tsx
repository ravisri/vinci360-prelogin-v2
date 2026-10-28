import { Bars } from "@/components/charts/Bars"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { darkCard } from "@/components/mocks/smi/styles"
import { smiWidgets } from "@/content/features/smi"
import { smi } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = smiWidgets.platforms
const p = smi.topicBreakdown
const cols = "grid grid-cols-[minmax(0,1fr)_3.5rem_4.25rem_2.5rem] items-center gap-1.5 sm:grid-cols-[minmax(0,1fr)_5rem_5rem_4.375rem] sm:gap-2"

/** Widget 4 · Topic breakdown: share of mentions vs share of engagement per topic, plus the table. */
export function PlatformWidget() {
  return (
    <div className="relative">
      <MockFrame
        title={c.title}
        caption={`Sample topic breakdown: ${p.map((x) => `${x.topic} ${fmt(x.mentions)} mentions (${x.share}% of total), ${x.engagement} engagement (${x.engagementShare}%)`).join("; ")}.`}
      >
        <Bars
          ariaLabel={`${c.mentions} and ${c.engagement} by topic: ${p.map((x) => `${x.topic} ${x.share}% and ${x.engagementShare}%`).join(", ")}`}
          legend
          width={480}
          height={140}
          labels={p.map((x) => x.topic)}
          data={[
            { label: c.mentions, values: p.map((x) => x.share), tone: "chart-1" },
            { label: c.engagement, values: p.map((x) => x.engagementShare), tone: "chart-4" },
          ]}
          valueLabels={[p.map((x) => `${x.share}%`), p.map((x) => `${x.engagementShare}%`)]}
        />
        <div className={cn(darkCard, "px-3 py-1 text-xs")}>
          <table className="w-full">
            <thead className="text-muted-foreground">
              <tr className={cn(cols, "py-1.5 text-left font-normal")}>
                <th scope="col" className="font-normal">{c.columns.topic}</th>
                <th scope="col" className="text-right font-normal">{c.columns.mentions}</th>
                <th scope="col" className="text-right font-normal">{c.columns.engagement}</th>
                <th scope="col" className="text-right font-normal">{c.columns.share}</th>
              </tr>
            </thead>
            <tbody>
              {p.map((x, i) => (
                <tr key={x.topic} className={cn(cols, "border-t border-border py-1.5", i === 0 && "font-bold")}>
                  <th scope="row" className="flex min-w-0 items-center gap-2 text-left font-[inherit]">
                    <span className="truncate">{x.topic}</span>
                  </th>
                  <td className="text-right tabular">{fmt(x.mentions)}</td>
                  <td className="text-right tabular">{x.engagement}</td>
                  <td className="text-right tabular">{x.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MockFrame>
      {/* Below the frame's bottom edge, so it never covers the table. */}
      <FloatCard className="md:-bottom-12 md:-left-4.5">
        <p className="flex items-center gap-2 text-[0.8125rem] font-bold">
          {c.float}
        </p>
      </FloatCard>
    </div>
  )
}
