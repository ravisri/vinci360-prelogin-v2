"use client"

import { useState } from "react"

import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { kpiProps } from "@/components/mocks/home/kpi"
import { darkCard, overlayButton } from "@/components/mocks/smi/styles"
import { smiWidgets } from "@/content/features/smi"
import { smi } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = smiWidgets.kpi
const k = smi.kpis
const kpis = [k.mentions, k.engagement, k.reach, k.posts, k.sentiment]

/** Widget 1 · KPI cards: click a card to scope the page to that metric (click again to clear). */
export function KpiScopeWidget() {
  const [scope, setScope] = useState<string | null>(null)
  return (
    <MockFrame
      title={c.title}
      caption={`Sample KPI cards, last 30 days vs previous 30: ${kpis.map((x) => `${x.label} ${x.display}, ${x.trend} ${x.delta}`).join("; ")}.`}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {kpis.map((x, i) => {
          const on = scope === x.label
          return (
            <div key={x.label} className={cn("group relative", x === k.sentiment && "max-sm:col-span-2")}>
              <KpiCard
                size="md"
                {...kpiProps(x)}
                delta={x.delta}
                selected={on}
                spark={{ data: smi.kpiSparks[i], className: "max-md:hidden" }}
                className="h-full transition-colors group-hover:border-ring max-md:p-2.5"
              />
              <button
                type="button"
                aria-pressed={on}
                aria-label={c.scope(x.label)}
                onClick={() => setScope(on ? null : x.label)}
                className={overlayButton}
              />
            </div>
          )
        })}
        <p className={cn(darkCard, "flex flex-col justify-center gap-0.5 p-3 max-sm:col-span-2 max-sm:flex-row max-sm:items-baseline max-sm:gap-1.5 max-sm:border-0 max-sm:bg-transparent max-sm:p-0")}>
          <span className="text-[0.6875rem] text-muted-foreground">
            {c.scopedTo}
            <span className="sm:hidden">:</span>
          </span>
          <strong aria-live="polite" className="text-[0.6875rem] sm:text-sm">
            {scope ?? c.all}
          </strong>
        </p>
      </div>
    </MockFrame>
  )
}
