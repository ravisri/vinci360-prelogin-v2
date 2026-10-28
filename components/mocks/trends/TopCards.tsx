import { Delta } from "@/components/mocks/Delta"
import { fmt } from "@/components/mocks/home/kpi"
import { trendsHashtags } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = trendsHashtags.topCards
const byUsage = [...trends.hashtags].sort((x, y) => y.usage - x.usage)[0]
const byGrowth = [...trends.hashtags].sort((x, y) => y.growth - x.growth)[0]

/** "Top by usage" vs "Top by growth": two white cards, the growth one outlined in the accent fill. */
export function TopCards({ className }: { className?: string }) {
  const card = "flex flex-col rounded-lg bg-card p-3 shadow-card md:p-3.5"
  return (
    <div className={cn("grid grid-cols-2 gap-2.5 tabular", className)}>
      <p className={card}>
        <span className="text-[0.71875rem] text-muted-foreground md:text-xs">{c.usage}</span>
        <strong className="font-heading text-[0.9375rem] md:text-[1.0625rem]">{byUsage.tag}</strong>
        <span className="text-[0.78125rem] md:text-[0.8125rem]">
          {fmt(byUsage.usage)} {c.posts}
        </span>
      </p>
      <p className={cn(card, "border-[1.5px] border-trends")}>
        <span className="text-[0.71875rem] text-muted-foreground md:text-xs">{c.growth}</span>
        <strong className="font-heading text-[0.9375rem] md:text-[1.0625rem]">{byGrowth.tag}</strong>
        <Delta trend="up" className="text-[0.78125rem] md:text-[0.8125rem]">
          {byGrowth.growth}%
        </Delta>
      </p>
    </div>
  )
}
