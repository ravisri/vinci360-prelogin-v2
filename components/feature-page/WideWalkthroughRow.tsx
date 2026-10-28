import type { ReactNode } from "react"

import { Reveal } from "@/components/motion/Reveal"
import { StepBadge } from "@/components/sections/StepBadge"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type WideWalkthroughRowProps = {
  accent: Accent
  badge: number
  title: string
  /** A node so the page can swap in the shorter 390 wording. */
  lead: ReactNode
  tells: { label: string; text: ReactNode }
  /** Right of the text on desktop (metric chips or a hint); under the text on mobile. */
  aside?: ReactNode
  /** Extra lines under the text (e.g. mobile-only cards). */
  note?: ReactNode
  /** The mock, full width under the text (above it on mobile, as in the 390 reference). */
  visual: ReactNode
  /** lg = the 36px "climax" heading · md = the 28px block heading. */
  size?: "md" | "lg"
  dots?: "tr" | "tl" | "br" | "bl" | "none"
  panelClassName?: string
  id?: string
  className?: string
}

/**
 * A walkthrough block whose mock needs the full container width (wide tables): text row with the
 * chips or hint on the right, then the tinted panel. Badge + title sit side by side below md.
 */
export function WideWalkthroughRow({ accent, badge, title, lead, tells, aside, note, visual, size = "md", dots = "tr", panelClassName, id, className }: WideWalkthroughRowProps) {
  const a = accents[accent]
  return (
    <article aria-labelledby={id} className={cn("flex flex-col gap-3.5 md:gap-6", size === "lg" && "md:gap-7", className)}>
      <Reveal className="flex flex-wrap items-end justify-between gap-x-14 gap-y-5 max-md:px-0">
        <div className="flex max-w-140 flex-col gap-3 md:gap-3.5">
          <div className="flex items-center gap-2.5 md:flex-col md:items-start md:gap-3.5">
            <StepBadge n={badge} accent={accent} />
            <h3 id={id} className={cn("text-[1.375rem] leading-[1.2]", size === "lg" ? "md:text-[2.25rem] md:leading-[1.15]" : "md:text-h3")}>
              {title}
            </h3>
          </div>
          <p className="text-[0.96875rem] text-muted-foreground md:text-[1.0625rem]">{lead}</p>
          <p className="grid grid-cols-[2px_1fr] gap-x-3 text-[0.90625rem] md:gap-x-3.5 md:text-[0.9375rem]">
            <span aria-hidden="true" className={cn("rounded-xs", a.fill)} />
            <span>
              <strong>{tells.label}</strong> {tells.text}
            </span>
          </p>
          {note}
        </div>
        {aside && <div className="w-full md:w-auto md:max-w-105">{aside}</div>}
      </Reveal>
      <Reveal preset="scaleIn" className="max-md:order-first">
        {dots === "none" ? (
          <div className={cn("relative rounded-lg p-3.5 md:p-8", a.tint, panelClassName)}>{visual}</div>
        ) : (
          <VisualPanel accent={accent} dots={dots} className={cn("max-md:p-3.5", panelClassName)}>
            {visual}
          </VisualPanel>
        )}
      </Reveal>
    </article>
  )
}
