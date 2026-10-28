"use client"

import { DrawPath } from "@/components/motion/DrawPath"
import { cn } from "@/lib/utils"

const CX = 100
const CY = 105
const R = 80

/** Point on the gauge's upper half-circle, `share` 0 → 1 from left to right. */
function point(share: number) {
  const a = Math.PI * (1 - share)
  return `${(CX + R * Math.cos(a)).toFixed(2)} ${(CY - R * Math.sin(a)).toFixed(2)}`
}

/**
 * Half-circle net sentiment gauge (−100 … +100). The value arc draws itself once in view; the
 * number is decorative here, so pair it with a figcaption.
 */
export function NetGauge({ net, className }: { net: number; className?: string }) {
  const share = (net + 100) / 200
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={cn("block w-55", className)}>
      <path d={`M${point(0)} A${R} ${R} 0 0 1 ${point(1)}`} fill="none" strokeWidth="18" strokeLinecap="round" className="stroke-border" />
      <DrawPath d={`M${point(0)} A${R} ${R} 0 0 1 ${point(share)}`} fill="none" strokeWidth="18" strokeLinecap="round" className="stroke-pos-fill" />
      <text x={CX} y="92" textAnchor="middle" className="fill-foreground font-heading text-[2.125rem] font-extrabold tabular">
        {net > 0 ? "+" : net < 0 ? "−" : ""}
        {Math.abs(net)}
      </text>
    </svg>
  )
}
