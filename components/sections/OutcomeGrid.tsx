import type { Benefit } from "@/components/sections/BenefitList"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type OutcomeGridProps = {
  title: string
  /** Three outcomes: the first tile is the solid module fill, then tint, then neutral tint. */
  items: readonly Benefit[]
  accent: Accent
  className?: string
}

/** "What it does for your brand": three large outcome tiles. */
export function OutcomeGrid({ title, items, accent, className }: OutcomeGridProps) {
  const a = accents[accent]
  const tile = [cn(a.solid, a.onFill), a.tint, "bg-neutral-tint"]
  return (
    <section className={cn("container-site section-y flex flex-col gap-8", className)}>
      <SectionHeader title={title} />
      <ul className="grid gap-5 md:grid-cols-3">
        {items.map(({ icon: Icon, title: heading, text }, i) => (
          <li key={heading} className={cn("flex min-h-55 flex-col gap-3.5 rounded-lg p-7", tile[i % 3])}>
            <Icon aria-hidden="true" strokeWidth={2} className={cn("size-8", i % 3 === 0 ? "text-current" : a.text)} />
            <h3 className="text-2xl leading-[1.2]">{heading}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
