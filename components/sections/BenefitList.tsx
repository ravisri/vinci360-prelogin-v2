import type { ComponentType, ReactNode } from "react"

import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

/** Any lucide icon, or a NetworkIcon glyph (lucide ships no brand icons). */
export type BenefitIcon = ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean | "true" | "false" }>

export type Benefit = { icon: BenefitIcon; title: string; text: ReactNode }

type BenefitListProps = {
  items: readonly Benefit[]
  accent: Accent
  /** 2 = two-column grid from md (default); 1 = stacked list, as inside FeatureSplit. */
  columns?: 1 | 2
  /** Overrides the tinted icon tile, e.g. the dark tile + amber icon in the navy Stories band. */
  iconClassName?: string
  className?: string
}

/** 40px tinted icon tile + bold title + muted line. */
export function BenefitList({ items, accent, columns = 2, iconClassName, className }: BenefitListProps) {
  const a = accents[accent]
  return (
    <ul className={cn("grid gap-4 md:gap-4.5", columns === 2 && "md:grid-cols-2 md:gap-x-8", className)}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-3 py-1 md:gap-x-3.5">
          <span aria-hidden="true" className={cn("grid size-10 place-items-center rounded-lg", a.tint, a.text, iconClassName)}>
            <Icon className="size-5" strokeWidth={2} />
          </span>
          <span>
            <strong className="block text-[0.9375rem] font-bold md:text-base">{title}</strong>
            <span className="block text-sm text-muted-foreground md:text-[0.9375rem]">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
