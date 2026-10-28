import { Hand } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { brandKeys } from "@/components/mocks/compare/brand"
import { compareTable as c } from "@/content/features/brand-compare"
import { brands, compare } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const cell = "border-b border-border px-2.5 py-2.5 text-left align-middle whitespace-nowrap md:px-3"
const num = "text-right"
/** Sticky first column, so the metric stays in place while the table scrolls. */
const sticky = "sticky left-0 z-1 bg-background"

/**
 * Figures for the three brands: semantic table, tabular numbers, gap and change with ▲/▼ + words.
 * 390: scrolls sideways inside itself (metric column pinned), shorter gap text, no change column.
 */
export function FigureTable({ changeLabel, className }: { changeLabel: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div role="region" aria-label={c.scrollLabel} tabIndex={0} className="scrollbar-none overflow-x-auto rounded-sm focus-visible:outline-2 focus-visible:outline-ring">
        <table className="w-full border-collapse text-[0.8125rem] tabular">
          <caption className="sr-only">{c.caption}</caption>
          <thead>
            <tr className="text-[0.6875rem] text-muted-foreground">
              <th scope="col" className={cn(cell, sticky, "font-medium")}>
                {c.metric}
              </th>
              {brandKeys.map((b) => (
                <th key={b} scope="col" className={cn(cell, num, "font-medium")}>
                  <span className="inline-flex items-center gap-1.5">
                    {b === "aurora" ? (
                      <>
                        <span className="md:hidden">{brands.aurora.short}</span>
                        <span className="max-md:hidden">{brands.aurora.name}</span>
                      </>
                    ) : (
                      brands[b].name
                    )}
                  </span>
                </th>
              ))}
              <th scope="col" className={cn(cell, num, "font-medium")}>
                {c.gap}
              </th>
              <th scope="col" className={cn(cell, num, "font-medium max-md:hidden")}>
                {changeLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {compare.figures.map((r) => (
              <tr key={r.metric}>
                <th scope="row" className={cn(cell, sticky, "font-semibold")}>
                  <span className="md:hidden">{r.metricShort}</span>
                  <span className="max-md:hidden">{r.metric}</span>
                </th>
                {r.values.map((v, i) => (
                  <td key={brandKeys[i]} className={cn(cell, num, i === 0 && "font-bold")}>
                    {v}
                  </td>
                ))}
                <td className={cn(cell, num)}>
                  <Delta trend={r.gapTrend}>
                    <span className="md:hidden">{r.gapShort}</span>
                    <span className="max-md:hidden">{r.gap}</span>
                  </Delta>
                </td>
                <td className={cn(cell, num, "max-md:hidden")}>
                  <Delta trend={r.changeTrend}>{r.change}</Delta>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground md:hidden">
        <Hand aria-hidden="true" strokeWidth={2} className="size-3.5" />
        {c.swipe}
      </p>
    </div>
  )
}
