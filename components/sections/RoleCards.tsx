import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { cn } from "@/lib/utils"

export type RoleCard = { icon: LucideIcon; title: string; text: string; link: string; href: string }

/** "Built for": four audience cards, each deep-linking to /solutions?role=… */
export function RoleCards({ items, className }: { items: readonly RoleCard[]; className?: string }) {
  return (
    <Stagger as="ul" className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map(({ icon: Icon, title, text, link, href }) => (
        <StaggerItem
          as="li"
          key={href}
          className="flex flex-col gap-3.5 rounded-lg bg-card p-6 shadow-card transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <span aria-hidden="true" className="grid size-11 place-items-center rounded-lg bg-primary-tint text-primary">
            <Icon className="size-5.5" strokeWidth={1.8} />
          </span>
          <h3 className="text-[1.1875rem] leading-[1.25] font-bold">{title}</h3>
          <p className="text-[0.9375rem] text-muted-foreground">{text}</p>
          <Link href={href} className="mt-auto inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-700 no-underline hover:underline">
            {link}
            <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
