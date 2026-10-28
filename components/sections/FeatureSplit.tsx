import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Pointer, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { BenefitList, type Benefit } from "@/components/sections/BenefitList"
import type { Action } from "@/components/sections/Hero"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { StepBadge } from "@/components/sections/StepBadge"
import { Button } from "@/components/ui/button"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type FeatureSplitProps = {
  accent: Accent
  /** Visual on the left from lg (stacks normally below). */
  reverse?: boolean
  /** Mobile order: visual above the text, as in the feature-page walkthroughs. */
  visualFirstOnMobile?: boolean
  /** Module chip label (Home / Features rows) … */
  chip?: string
  /** solid = filled chip, as on the navy Stories band. */
  chipVariant?: "tint" | "solid"
  /** … or a step number (feature-page walkthrough rows). */
  badge?: number
  title: ReactNode
  lead: string
  benefits?: readonly Benefit[]
  /** Icon tile override for the benefit list (navy Stories band). */
  benefitIconClassName?: string
  /** "What it tells you:" + text, behind a 2px accent rule. */
  tells?: { label: string; text: ReactNode }
  /** Metric chips, e.g. Mentions · Engagement · Reach; an object form can hide a chip at one size. */
  metrics?: readonly (string | { label: string; className?: string })[]
  /** Dashed "try it" hint with a pointer icon. */
  hint?: ReactNode
  /** Icon of the hint, when it is not a "click here" (e.g. a download hint). */
  hintIcon?: LucideIcon
  /** try = dashed "try it" box · insight = solid box with a bold takeaway (Brand Compare reference). */
  hintVariant?: "try" | "insight"
  note?: ReactNode
  /** "Explore …" primary button. */
  action?: Action
  visual: ReactNode
  /** h2 for page-level rows, h3 for walkthrough rows under a section header. */
  headingAs?: "h2" | "h3"
  /** row = Home / feature-page rows · panel = Features tab panel (narrow text column, top-aligned, 32px H3). */
  variant?: "row" | "panel"
  id?: string
  className?: string
}

/** Text + visual side by side. Covers the Home feature rows and the feature-page widget walkthrough. */
export function FeatureSplit({
  accent,
  reverse,
  visualFirstOnMobile,
  chip,
  chipVariant,
  badge,
  title,
  lead,
  benefits,
  benefitIconClassName,
  tells,
  metrics,
  hint,
  hintIcon: HintIcon = Pointer,
  hintVariant = "try",
  note,
  action,
  visual,
  headingAs: Heading = chip ? "h2" : "h3",
  variant = "row",
  id,
  className,
}: FeatureSplitProps) {
  const a = accents[accent]
  const panel = variant === "panel"
  return (
    <article id={id} className={cn("flex flex-col gap-8 lg:flex-row lg:gap-16", panel ? "lg:items-start lg:gap-14" : "lg:items-center", className)}>
      <Reveal className={cn("flex min-w-0 flex-col gap-4 lg:flex-1 lg:gap-5", panel ? "lg:max-w-105 lg:flex-[1_1_360px]" : chip ? "lg:max-w-none" : "lg:max-w-120")}>
        {chip && <ModuleChip accent={accent} label={chip} variant={chipVariant} />}
        {badge !== undefined && <StepBadge n={badge} accent={accent} />}
        <Heading className={panel ? "text-2xl leading-[1.2] md:text-[2rem] md:leading-[1.15]" : chip ? "text-h3 md:text-h2" : "text-[1.375rem] leading-[1.2] md:text-h3"}>{title}</Heading>
        <p className={cn("text-muted-foreground", panel ? "text-base md:text-[1.0625rem]" : chip ? "text-base md:text-lg" : "text-[0.96875rem] md:text-[1.0625rem]")}>{lead}</p>
        {tells && (
          <p className="grid grid-cols-[2px_1fr] gap-x-3 text-[0.90625rem] md:gap-x-3.5 md:text-[0.9375rem]">
            <span aria-hidden="true" className={cn("rounded-xs", a.fill)} />
            <span>
              <strong>{tells.label}</strong> {tells.text}
            </span>
          </p>
        )}
        {metrics && (
          <ul className="flex flex-wrap gap-1.5">
            {metrics.map((m) => {
              const { label, className } = typeof m === "string" ? { label: m, className: undefined } : m
              return (
                <li key={label} className={className}>
                  <ModuleChip accent={accent} label={label} dot={false} />
                </li>
              )
            })}
          </ul>
        )}
        {hint && (
          <p
            className={cn(
              "flex items-start gap-2.5 rounded-lg border bg-card px-3 py-2.5 text-sm",
              hintVariant === "insight" ? "border-border font-semibold text-foreground" : ["border-dashed text-neutral-text", accent === "smi" ? "border-input" : a.border200],
            )}
          >
            <HintIcon aria-hidden="true" strokeWidth={2} className={cn("mt-px size-4.5 flex-none", a.text)} />
            {hint}
          </p>
        )}
        {benefits && <BenefitList items={benefits} accent={accent} columns={1} iconClassName={benefitIconClassName} />}
        {note}
        {action && (
          <Button asChild className="w-full sm:w-fit">
            <Link href={action.href}>
              {action.label}
              <ArrowRight aria-hidden="true" strokeWidth={2} />
            </Link>
          </Button>
        )}
      </Reveal>
      <Reveal preset="scaleIn" className={cn("min-w-0 lg:flex-1", panel && "relative lg:flex-[999_1_560px]", reverse && "lg:order-first", visualFirstOnMobile && "max-lg:order-first")}>
        {visual}
      </Reveal>
    </article>
  )
}
