import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import type { NavItem } from "@/content/navigation"
import { cn } from "@/lib/utils"

type RolePillsProps = {
  title: string
  titleId?: string
  /** Role deep links, e.g. /solutions?role=brand. */
  items: readonly NavItem[]
  icons: readonly LucideIcon[]
  className?: string
}

/** "Who uses it": one white strip with a small H2 and a pill per audience. */
export function RolePills({ title, titleId, items, icons, className }: RolePillsProps) {
  return (
    <Reveal className={cn("flex flex-wrap items-center gap-x-6 gap-y-4 rounded-lg border border-border bg-card px-5 py-6 md:px-7", className)}>
      <h2 id={titleId} className="mr-2 text-h4 font-extrabold">
        {title}
      </h2>
      <ul className="flex flex-wrap gap-3 md:gap-4">
        {items.map((item, i) => {
          const Icon = icons[i]
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-card px-5 font-semibold text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
              >
                {Icon && <Icon aria-hidden="true" strokeWidth={2} className="size-4.5 text-primary" />}
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </Reveal>
  )
}
