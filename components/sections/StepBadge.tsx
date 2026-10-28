import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

/** Numbered square badge for walkthrough rows and steps: solid on SMI and Brand Compare, tint + accent border elsewhere. */
export function StepBadge({ n, accent, className }: { n: number; accent: Accent; className?: string }) {
  const a = accents[accent]
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-8 flex-none place-items-center rounded-sm font-heading text-sm font-extrabold tabular md:size-9 md:rounded-lg md:text-[0.9375rem]",
        accent === "smi" || accent === "cmp" ? [a.solid, a.onFill] : [a.tint, a.text, "border-[1.5px]", a.ring],
        className,
      )}
    >
      {n}
    </span>
  )
}
