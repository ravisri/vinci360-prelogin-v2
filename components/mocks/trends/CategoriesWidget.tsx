import { StackedBar100 } from "@/components/charts/StackedBar100"
import { MockFrame } from "@/components/mocks/MockFrame"
import { MomentumBar } from "@/components/mocks/trends/MomentumBar"
import { trendsTopicWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = trendsTopicWidgets.categories
const max = Math.max(...trends.categories.map((x) => x.share))
const cols = "grid grid-cols-[6.75rem_minmax(0,1fr)_2.25rem_3.5rem] items-center gap-x-2.5 sm:grid-cols-[7.5rem_minmax(0,1fr)_2.5rem_5.625rem] sm:gap-x-3"

/** Block A4 · Product categories: share of trending conversation per business line, with its mood. */
export function CategoriesWidget() {
  return (
    <MockFrame
      title={c.title}
      caption={`Sample product categories: ${trends.categories.map((x) => `${x.label} ${x.share}% of trending conversation, ${x.split[0]}% positive, ${x.split[2]}% negative`).join("; ")}.`}
    >
      <div aria-hidden="true" className={cn(cols, "text-[0.65625rem] text-muted-foreground")}>
        <span>{c.columns.category}</span>
        <span>{c.columns.share}</span>
        <span />
        <span>{c.columns.mood}</span>
      </div>
      <ul aria-hidden="true" className="flex flex-col gap-2.5 text-xs">
        {trends.categories.map((x) => (
          <li key={x.label} className={cols}>
            <span className="truncate">{x.label}</span>
            <MomentumBar value={Math.round((x.share / max) * 100)} display={false} heightClassName="h-3" />
            <span className="text-right font-bold tabular">{x.share}%</span>
            <StackedBar100 data={x.split} height={10} labels={false} />
          </li>
        ))}
      </ul>
      <p className="text-[0.6875rem] text-muted-foreground">{c.legend}</p>
    </MockFrame>
  )
}
