import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { cn } from "@/lib/utils"

type IconGridProps = {
  title: string
  items: readonly { icon: LucideIcon; title: string; text: string }[]
  /** Optional line under the grid, e.g. the ReachNote. */
  after?: ReactNode
  className?: string
}

/** White strip: centred H2 + four items, each an icon tile beside a bold title and one line. */
export function IconGrid({ title, items, after, className }: IconGridProps) {
  return (
    <section className={cn("border-y border-border bg-card py-16", className)}>
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <h2 className="text-center text-h4 md:text-[2rem] md:leading-[1.15]">{title}</h2>
        <Stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title: itemTitle, text }) => (
            <StaggerItem as="li" key={itemTitle} className="flex items-start gap-3.5">
              <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-lg bg-muted text-foreground">
                <Icon strokeWidth={1.8} className="size-5.5" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-[1.0625rem] leading-tight font-bold">{itemTitle}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        {after}
      </div>
    </section>
  )
}
