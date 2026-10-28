import type { ChartTone } from "@/components/charts/tones"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { kpiProps } from "@/components/mocks/home/kpi"
import { trendsTopicWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"

const c = trendsTopicWidgets.kpis
/** Spark colours in card order, as drawn in the reference. */
const tones: ChartTone[] = ["chart-2", "chart-1", "chart-1", "chart-5"]

/** Block A2 · Analytics KPI cards: four headline numbers for the whole trending set, 2×2. */
export function TrendKpisWidget() {
  return (
    <MockFrame
      title={c.title}
      caption={`Sample KPI cards for all trending topics: ${trends.kpis.map((k) => `${k.display} ${k.label.toLowerCase()} ${k.trend} ${k.delta}`).join(", ")}.`}
    >
      <div className="grid grid-cols-2 gap-2.5">
        {trends.kpis.map((k, i) => (
          <KpiCard key={k.label} {...kpiProps(k)} delta={`${k.delta} ${c.vs}`} spark={{ data: trends.kpiSparks[i], tone: tones[i], className: "w-17.5 max-sm:hidden" }} />
        ))}
      </div>
    </MockFrame>
  )
}
