import type { ReactNode } from "react"

import { Sparkline } from "@/components/charts/Sparkline"
import type { ChartTone } from "@/components/charts/tones"
import { Delta } from "@/components/mocks/Delta"
import { CountUp } from "@/components/motion/CountUp"
import type { Sentiment, Trend } from "@/content/sample-data"
import { cn } from "@/lib/utils"

type KpiCardProps = {
  label: ReactNode
  value: number
  /** Intl options, e.g. { notation: "compact", maximumFractionDigits: 2 } for "1.92M". */
  format?: Intl.NumberFormatOptions
  prefix?: string
  /** e.g. "/100" for the sentiment score. */
  suffix?: string
  /** Text after the glyph, e.g. "18.4% vs prev.". */
  delta: ReactNode
  trend: Trend
  /** Delta colour override, e.g. "neg" for negative mentions ▲. */
  tone?: Sentiment
  spark?: { data: readonly number[]; tone?: ChartTone; className?: string }
  size?: "sm" | "md" | "lg"
  selected?: boolean
  className?: string
}

const sizes = {
  sm: { box: "gap-0.5 p-2", label: "text-[0.625rem]", value: "text-[0.9375rem]", delta: "text-[0.625rem]", spark: "w-12" },
  md: { box: "gap-1 p-3", label: "text-[0.6875rem]", value: "text-xl", delta: "text-[0.6875rem]", spark: "w-14" },
  lg: { box: "gap-1.5 px-3.5 pt-3.5 pb-2.5", label: "text-xs", value: "text-2xl", delta: "text-xs", spark: "w-20" },
} as const

/**
 * Dark KPI tile for mock frames (colours come from the frame's `on-dark` scope).
 * The number counts up once in view; server HTML and screen readers get the final value.
 * Compact numbers use en-US so they read "1.92M" as in the reference (en-GB gives "1.92m").
 */
export function KpiCard({ label, value, format, prefix, suffix, delta, trend, tone, spark, size = "lg", selected, className }: KpiCardProps) {
  const s = sizes[size]
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col rounded-lg border border-border bg-card",
        s.box,
        selected && "border-ring bg-muted ring-2 ring-ring",
        className,
      )}
    >
      <p className={cn("truncate text-muted-foreground", s.label)}>{label}</p>
      <p className={cn("font-heading leading-[1.1] font-bold", s.value)}>
        {prefix}
        <CountUp value={value} format={format} locale={format?.notation === "compact" ? "en-US" : "en-GB"} />
        {suffix}
      </p>
      <div className="flex items-center justify-between gap-2">
        <Delta trend={trend} tone={tone} className={cn("whitespace-nowrap", s.delta)}>
          {delta}
        </Delta>
        {spark && <Sparkline data={spark.data} tone={spark.tone ?? (trend === "down" ? "chart-5" : "chart-1")} className={cn(s.spark, spark.className)} />}
      </div>
    </div>
  )
}
