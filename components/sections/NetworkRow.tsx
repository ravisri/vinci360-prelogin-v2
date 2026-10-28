import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import type { Network } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const ORDER: Network[] = ["facebook", "x", "youtube", "instagram"]

/** Four network glyphs + a line of text, e.g. "Facebook · X · YouTube · Instagram, analysed in one place". */
export function NetworkRow({ label, align = "left", className }: { label: string; align?: "left" | "center"; className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-col gap-2.5 text-[0.8125rem] text-muted-foreground sm:flex-row sm:items-center sm:gap-3.5 md:text-sm",
        align === "center" ? "items-center justify-center text-center" : "items-start",
        className,
      )}
    >
      <span className="flex gap-2.5 text-foreground">
        {ORDER.map((n) => (
          <NetworkIcon key={n} network={n} />
        ))}
      </span>
      {label}
    </p>
  )
}
