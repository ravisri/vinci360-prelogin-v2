import type { ReactNode } from "react"
import Link from "next/link"
import { LayoutGrid, type LucideIcon } from "lucide-react"

import { ModuleChip } from "@/components/sections/ModuleChip"
import { Button } from "@/components/ui/button"
import type { Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

export type Action = { label: string; href: string; icon?: LucideIcon }
export type Crumb = { label: string; href?: string }

type HeroProps = {
  /** center = Home (stacked, centred) · split = Features and feature pages (text left, visual right). */
  variant?: "center" | "split"
  breadcrumb?: readonly Crumb[]
  chip?: { label: string; accent: Accent; variant?: "tint" | "solid"; bordered?: boolean }
  /** Extra chip beside the module chip, e.g. "AI-generated suggestions" on Promotable Stories. */
  chipExtra?: ReactNode
  title: string
  lead: ReactNode
  /** Filled CTA ("Request a demo"). */
  primary: Action
  /** Outline button with an icon (default grid, e.g. "Explore the features"). */
  secondary?: Action
  /** Under the buttons: network row, "On this page" pills… */
  trailing?: ReactNode
  /** Usually a VisualPanel (split) or a MockFrame (center). */
  visual?: ReactNode
  /** Full-width row under both columns (split), e.g. the network row on Features. */
  after?: ReactNode
  className?: string
}

function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-muted-foreground md:gap-2 md:text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5 md:gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-8 items-center text-primary no-underline hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Page hero: chip, H1, lead, CTA + secondary buttons, optional trailing line and visual. */
export function Hero({ variant = "split", breadcrumb, chip, chipExtra, title, lead, primary, secondary, trailing, visual, after, className }: HeroProps) {
  const center = variant === "center"
  const SecondaryIcon = secondary?.icon ?? LayoutGrid
  const moduleChip = chip && <ModuleChip size="md" accent={chip.accent} label={chip.label} variant={chip.variant} bordered={chip.bordered} />
  const text = (
    <div className={cn("flex flex-col gap-4 md:gap-5", center ? "mx-auto max-w-235 items-center text-center" : "min-w-0 lg:flex-[1_1_440px]")}>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      {chipExtra ? (
        <div className="flex flex-wrap items-center gap-2">
          {moduleChip}
          {chipExtra}
        </div>
      ) : (
        moduleChip
      )}
      <h1 className="text-h1-m tracking-[-0.025em] md:text-h1 md:tracking-[-0.03em]">{title}</h1>
      <p className={cn("text-base text-muted-foreground md:text-[1.1875rem]", center ? "max-w-175 md:text-xl" : "max-w-130")}>{lead}</p>
      <div className={cn("mt-1 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3", center && "sm:justify-center")}>
        <Button asChild variant="cta" size="lg">
          <Link href={primary.href}>{primary.label}</Link>
        </Button>
        {secondary && (
          <Button asChild variant="outline" size="lg">
            <Link href={secondary.href}>
              <SecondaryIcon aria-hidden="true" strokeWidth={1.8} className="size-5" />
              {secondary.label}
            </Link>
          </Button>
        )}
      </div>
      {trailing}
    </div>
  )

  if (center) {
    return (
      <section className={cn("overflow-hidden pt-10 md:pt-18", className)}>
        <div className="container-site">
          {text}
          {visual && <div className="relative mt-14">{visual}</div>}
        </div>
      </section>
    )
  }

  return (
    <section className={cn("pt-6 pb-16 md:pt-12 md:pb-18", className)}>
      <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
        {text}
        {visual && <div className="min-w-0 lg:flex-[1_1_560px]">{visual}</div>}
      </div>
      {after && <div className="container-site">{after}</div>}
    </section>
  )
}
