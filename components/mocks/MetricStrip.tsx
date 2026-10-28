import { KpiCard } from "@/components/mocks/KpiCard"
import { ReachNote } from "@/components/mocks/ReachNote"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import type { OverviewKpi } from "@/content/sample-data"
import { cn } from "@/lib/utils"

type MetricStripProps = {
  items: readonly OverviewKpi[]
  size?: "sm" | "md" | "lg"
  /** Standalone strips carry their own "Sample data" chip; strips inside a MockFrame don't. */
  sampleChip?: boolean
  /** Chip colour: light sections vs on-dark frames. */
  tone?: "light" | "dark"
  className?: string
}

const compact = { notation: "compact", maximumFractionDigits: 2 } as const satisfies Intl.NumberFormatOptions

/**
 * Source-agnostic KPI row (Mentions · Social media reach · Interactions · Positive · Negative).
 * Colours come from the surrounding scope, so it works in light sections and `on-dark` frames.
 */
export function MetricStrip({ items, size = "lg", sampleChip, tone = "light", className }: MetricStripProps) {
  const hasReach = items.some((i) => i.key === "reach")
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <figcaption className="sr-only">
        Sample data. {items.map((i) => `${i.label}: ${i.display}, ${i.trend === "flat" ? "no change" : i.trend} ${i.delta}`).join(". ")}.
      </figcaption>
      {sampleChip && <SampleDataChip tone={tone} className="self-end" />}
      <div aria-hidden="true" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 [&>*:last-child:nth-child(odd)]:col-span-2 sm:[&>*:last-child:nth-child(odd)]:col-span-1">
        {items.map((i) => (
          <KpiCard
            key={i.key}
            label={i.label}
            value={i.value}
            format={i.value >= 100000 ? compact : undefined}
            delta={i.delta}
            trend={i.trend}
            tone={i.tone}
            size={size}
          />
        ))}
      </div>
      {hasReach && <ReachNote />}
    </figure>
  )
}
