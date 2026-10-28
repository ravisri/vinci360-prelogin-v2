import { sampleDataLabel } from "@/content/sample-data"
import { cn } from "@/lib/utils"

/** "Sample data" chip carried by every mock that shows numbers. Dark by default (inside MockFrame). */
export function SampleDataChip({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex flex-none items-center rounded-full px-2.5 py-1 text-[0.6875rem] leading-[1.3] font-semibold",
        tone === "dark" ? "bg-dark-border text-on-dark-strong" : "bg-neutral-tint text-neutral-text",
        className,
      )}
    >
      {sampleDataLabel}
    </span>
  )
}
