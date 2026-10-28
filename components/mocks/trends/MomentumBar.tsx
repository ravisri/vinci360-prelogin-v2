import { ChartSvg } from "@/components/charts/ChartSvg"
import { GrowRect } from "@/components/motion/GrowBar"
import { cn } from "@/lib/utils"

type MomentumBarProps = {
  /** 0–100; the bar is that share of the track. */
  value: number
  /** Number after the bar (defaults to the value); false = bar only. */
  display?: string | number | false
  /** Track height class, e.g. "h-1.75". */
  heightClassName?: string
  /** Track width class; flexes by default. */
  trackClassName?: string
  /** Track colour class (darker inside a highlighted row). */
  trackFillClassName?: string
  className?: string
}

/** Orange momentum (or share) bar + its number. The bar grows once in view; the number is the label. */
export function MomentumBar({ value, display = value, heightClassName = "h-1.75", trackClassName = "min-w-0 flex-1", trackFillClassName = "fill-border", className }: MomentumBarProps) {
  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <ChartSvg viewBox="0 0 100 8" preserveAspectRatio="none" className={cn("overflow-hidden rounded-full", heightClassName, trackClassName)}>
        <rect width="100" height="8" className={trackFillClassName} />
        <GrowRect axis="x" width={Math.max(value, 1)} height="8" className="fill-trends" />
      </ChartSvg>
      {display !== false && <span className="tabular">{display}</span>}
    </span>
  )
}
