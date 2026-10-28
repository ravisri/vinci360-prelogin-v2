import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import type { Benefit } from "@/components/sections/BenefitList"
import { cn } from "@/lib/utils"

/** White icon cards in a 3/2/1 grid: 44px primary-tint icon tile, bold title, one muted line. */
export function IconCardGrid({ items, className }: { items: readonly Benefit[]; className?: string }) {
  return (
    <Stagger as="ul" className={cn("grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3", className)}>
      {items.map(({ icon: Icon, title, text }) => (
        <StaggerItem as="li" key={title} className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-card">
          <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-lg bg-primary-tint text-primary">
            <Icon className="size-5.5" strokeWidth={2} />
          </span>
          <span>
            <strong className="block">{title}</strong>
            <span className="block text-sm text-muted-foreground">{text}</span>
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
