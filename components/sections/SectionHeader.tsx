import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: string
  lead?: string
  /** Chip or label above the title, e.g. a "Part A" ModuleChip. */
  eyebrow?: ReactNode
  align?: "left" | "center"
  /** section = 40px H2 · display = 44px H2 · small = 20px strip heading. */
  size?: "section" | "display" | "small"
  as?: "h2" | "h3"
  id?: string
  className?: string
}

const titleSize = {
  section: "text-h3 md:text-h2",
  display: "text-h3 md:text-display",
  small: "text-h4",
} as const

/** H2 + optional lead. Used above grids and splits; the caller adds the gap to the content. */
export function SectionHeader({ title, lead, eyebrow, align = "left", size = "section", as: Heading = "h2", id, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:gap-3",
        align === "center" ? "mx-auto max-w-155 items-center text-center" : "max-w-170",
        className,
      )}
    >
      {eyebrow}
      <Heading id={id} className={titleSize[size]}>
        {title}
      </Heading>
      {lead && <p className="text-base text-muted-foreground md:text-lg">{lead}</p>}
    </div>
  )
}
