import type { ReactNode } from "react"

import { Reveal } from "@/components/motion/Reveal"
import { FeatureSplit } from "@/components/sections/FeatureSplit"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { VisualPanel } from "@/components/sections/VisualPanel"
import type { WalkthroughItem } from "@/content/features/types"
import type { Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type WidgetWalkthroughProps = {
  accent: Accent
  title: string
  /** Intro under the H2 (desktop only, as in the 390 reference). */
  lead?: string
  items: readonly WalkthroughItem[]
  /** One mock per item, in order; each is wrapped in a tinted VisualPanel. */
  visuals: readonly ReactNode[]
  /** Chip above the H2, e.g. "Walkthrough". */
  eyebrow?: ReactNode
  /** Per-item title override (e.g. a live "Native object: Page" that follows its picker). */
  titles?: readonly (ReactNode | undefined)[]
  /** Extra line under an item's text, e.g. the reach note or an info box. */
  notes?: readonly (ReactNode | undefined)[]
  /** After the last row, e.g. an optional teaser. */
  after?: ReactNode
  id?: string
  className?: string
}

/** Mobile wording from the 390 reference where it differs; both versions stay in the HTML. */
function responsive(desktop: string, mobile?: string): ReactNode {
  if (!mobile) return desktop
  return (
    <>
      <span className="md:hidden">{mobile}</span>
      <span className="max-md:hidden">{desktop}</span>
    </>
  )
}

/**
 * "What you'll see": numbered widget rows that alternate text/visual from lg (visual first on
 * mobile). The dot grid sits on the outer corner of each panel, switching sides with the row.
 */
export function WidgetWalkthrough({ accent, title, lead, eyebrow, items, visuals, titles, notes, after, id = "widgets-h", className }: WidgetWalkthroughProps) {
  return (
    <section aria-labelledby={id} className={cn("container-site flex flex-col gap-14 pt-14 md:gap-24 md:pt-24", className)}>
      <Reveal>
        <SectionHeader id={id} title={title} lead={lead} eyebrow={eyebrow} className="max-md:[&>p]:hidden" />
      </Reveal>
      {items.map((item, i) => {
        const reverse = i % 2 === 1
        return (
          <FeatureSplit
            key={item.id ?? item.title}
            id={item.id}
            accent={accent}
            badge={i + 1}
            reverse={reverse}
            visualFirstOnMobile
            headingAs="h3"
            title={titles?.[i] ?? item.title}
            lead={item.lead}
            tells={{ label: item.tells.label, text: responsive(item.tells.text, item.tells.textMobile) }}
            metrics={item.metrics}
            hint={responsive(item.hint, item.hintMobile)}
            hintIcon={item.hintIcon}
            hintVariant={item.insight ? "insight" : "try"}
            note={notes?.[i]}
            visual={
              <VisualPanel accent={accent} dots={reverse ? "tr" : "bl"}>
                {visuals[i]}
              </VisualPanel>
            }
          />
        )
      })}
      {after}
    </section>
  )
}
