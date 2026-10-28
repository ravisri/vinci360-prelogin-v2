import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ModuleChip } from "@/components/sections/ModuleChip"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

export type RelatedModule = {
  accent: Accent
  /** Module name on the chip, e.g. "Trends". */
  label: string
  /** Question-style prompt, e.g. "Found a spike? See what is rising." */
  prompt: string
  href: string
  /** e.g. "Explore Trends". */
  linkLabel: string
  /** Small decorative illustration in the tinted thumbnail. */
  thumbnail?: ReactNode
}

/** "Works with the rest of Vinci360": three cards linking to other feature pages. */
export function RelatedModules({ title, items, className }: { title: string; items: readonly RelatedModule[]; className?: string }) {
  return (
    <section className={cn("container-site section-y flex flex-col gap-8", className)}>
      <SectionHeader title={title} />
      <ul className="grid gap-5 md:grid-cols-3">
        {items.map((item) => {
          const a = accents[item.accent]
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-3.5 rounded-lg bg-card p-6 text-foreground no-underline shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <span aria-hidden="true" className={cn("grid h-24 place-items-center overflow-hidden rounded-lg", a.tint, a.text)}>
                  {item.thumbnail}
                </span>
                <ModuleChip accent={item.accent} label={item.label} />
                <span className="text-base font-semibold">{item.prompt}</span>
                <span className={cn("mt-auto inline-flex items-center gap-1.5 font-semibold group-hover:underline", a.text)}>
                  {item.linkLabel}
                  <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
