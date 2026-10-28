import { cn } from "@/lib/utils"

export type ChartLabel = {
  /** Position in the chart's viewBox units. */
  x: number
  y: number
  text: string
  anchor?: "start" | "middle" | "end"
  /** Pixel nudge, applied after scaling. */
  dx?: number
  dy?: number
  className?: string
}

/**
 * Text for a viewBox chart, drawn in an unscaled SVG laid over it. Positions are converted to
 * percentages, so labels track the marks while staying 11px at any chart width.
 */
export function LabelLayer({ width, height, labels, className }: { width: number; height: number; labels: readonly ChartLabel[]; className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={cn("pointer-events-none absolute inset-0 size-full overflow-visible", className)}>
      {labels.map((l, i) => (
        <text
          key={i}
          x={`${(l.x / width) * 100}%`}
          y={`${(l.y / height) * 100}%`}
          dx={l.dx}
          dy={l.dy}
          textAnchor={l.anchor ?? "middle"}
          fontSize="11"
          className={cn("fill-muted-foreground", l.className)}
        >
          {l.text}
        </text>
      ))}
    </svg>
  )
}
