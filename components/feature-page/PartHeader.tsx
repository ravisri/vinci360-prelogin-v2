import { Reveal } from "@/components/motion/Reveal"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type PartHeaderProps = {
  id: string
  accent: Accent
  /** "Part A". Hidden below md, as in the 390 reference. */
  part: string
  title: string
  lead: string
  /** Numbered journey on the right (desktop), e.g. Scoreboard → Analytics → Compare. */
  journey?: { label: string; steps: readonly string[] }
  className?: string
}

/** Header of a multi-block part of a feature page: chip, 44px H2, lead and an optional journey. */
export function PartHeader({ id, accent, part, title, lead, journey, className }: PartHeaderProps) {
  const a = accents[accent]
  return (
    <Reveal className={cn("flex flex-wrap items-end justify-between gap-5", className)}>
      <div className="flex flex-col gap-2.5">
        <ModuleChip accent={accent} label={part} dot={false} className="max-md:hidden" />
        <h2 id={id} className="text-[1.625rem] leading-[1.15] md:text-display">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-md:hidden">{lead}</p>
      </div>
      {journey && (
        <ol aria-label={journey.label} className="flex items-center gap-2 text-sm font-semibold max-md:hidden">
          {journey.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className={cn("w-9 border-t-2", a.border200)} />}
              <span aria-hidden="true" className={cn("grid size-7 place-items-center rounded-full border-[1.5px] tabular", a.tint, a.text, "border-current")}>
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      )}
    </Reveal>
  )
}
