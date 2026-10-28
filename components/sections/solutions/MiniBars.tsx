import { GrowBar } from "@/components/motion/GrowBar"
import { cn } from "@/lib/utils"

/** Literal height classes for the bar values the reference uses (Tailwind must see each one). */
const heights: Record<number, string> = {
  20: "h-[20%]",
  30: "h-[30%]",
  38: "h-[38%]",
  40: "h-[40%]",
  42: "h-[42%]",
  44: "h-[44%]",
  45: "h-[45%]",
  50: "h-[50%]",
  55: "h-[55%]",
  56: "h-[56%]",
  60: "h-[60%]",
  64: "h-[64%]",
  66: "h-[66%]",
  70: "h-[70%]",
  80: "h-[80%]",
  84: "h-[84%]",
  90: "h-[90%]",
  95: "h-[95%]",
  100: "h-full",
}

const tone = {
  light: { box: "bg-background", bar: "bg-primary-200", last: "bg-primary" },
  dark: { box: "on-dark bg-background", bar: "bg-border", last: "bg-on-dark-focus" },
} as const

/** Decorative mini bar chart for a module card (last bar highlighted); bars grow from the baseline. */
export function MiniBars({ bars, variant = "light", className }: { bars: readonly number[]; variant?: "light" | "dark"; className?: string }) {
  const t = tone[variant]
  return (
    <div aria-hidden="true" className={cn("flex items-end gap-1.5 rounded-sm px-2.5 py-2", t.box, className)}>
      {bars.map((h, i) => (
        <GrowBar
          key={i}
          axis="y"
          delay={i * 0.06}
          className={cn("flex-1 rounded-t-[3px]", heights[h] ?? "h-1/2", i === bars.length - 1 ? t.last : t.bar)}
        />
      ))}
    </div>
  )
}
