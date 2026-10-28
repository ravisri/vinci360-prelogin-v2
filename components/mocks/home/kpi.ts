import type { Kpi } from "@/content/sample-data"

const compact: Intl.NumberFormatOptions = { notation: "compact", maximumFractionDigits: 2 }

/** Sample KPI → KpiCard props: "1.92M" compact for millions, "/100" kept as a suffix. */
export const kpiProps = (k: Kpi) => ({
  label: k.label,
  value: k.value,
  format: k.value >= 1_000_000 ? compact : k.display.endsWith("K") ? { notation: "compact" as const } : undefined,
  prefix: k.display.startsWith("+") ? "+" : undefined,
  suffix: k.display.includes("/") ? k.display.slice(k.display.indexOf("/")) : undefined,
  trend: k.trend,
})

export const fmt = (n: number) => new Intl.NumberFormat("en-GB").format(n)
