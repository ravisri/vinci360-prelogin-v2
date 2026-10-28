import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type ModuleChipProps = {
  accent: Accent
  label: string
  /** tint = feature label · solid = hero chip on SMI · outline = module name inside coloured tiles. */
  variant?: "tint" | "solid" | "outline"
  size?: "sm" | "md"
  /** Leading accent dot (tint only). */
  dot?: boolean
  /** Tint border, as on the Trends hero chip. */
  bordered?: boolean
  className?: string
}

/** Module pill: tint + text-safe accent, optional dot in the module fill. */
export function ModuleChip({ accent, label, variant = "tint", size = "sm", dot = variant === "tint", bordered, className }: ModuleChipProps) {
  const a = accents[accent]
  return (
    <span
      className={cn(
        "inline-flex w-fit flex-none items-center gap-1.5 rounded-full leading-[1.3] font-semibold",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-[0.8125rem] md:px-3.5",
        variant === "tint" && [a.tint, a.text],
        variant === "solid" && [a.solid, a.onFill],
        variant === "outline" && "border-[1.5px] border-current bg-transparent",
        bordered && ["border", a.border200],
        className,
      )}
    >
      {dot && variant === "tint" && (
        <span aria-hidden="true" className={cn("flex-none rounded-full", size === "sm" ? "size-2" : "size-1.75 md:size-2", a.fill)} />
      )}
      {label}
    </span>
  )
}
