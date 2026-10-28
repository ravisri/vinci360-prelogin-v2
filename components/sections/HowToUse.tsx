import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { StepBadge } from "@/components/sections/StepBadge"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

export type Step = {
  title: string
  text?: string
  /** Small decorative illustration (110px box). */
  illustration?: ReactNode
  /** Navy illustration box (`on-dark`) instead of the light canvas. */
  dark?: boolean
  /** Icon beside the number (plain variant, Home "How it works for you"). */
  icon?: LucideIcon
}

type HowToUseProps = {
  title: string
  lead?: string
  steps: readonly Step[]
  accent: Accent
  /** card = white cards with illustration (feature pages) · plain = canvas cards with number circle + icon (Home). */
  variant?: "card" | "plain"
  /** Link beside the heading, e.g. "Start with a demo request" (About). */
  action?: { label: string; href: string }
  className?: string
}

/** Three numbered step cards with an illustration or icon, badge, title and line. */
export function HowToUse({ title, lead, steps, accent, variant = "card", action, className }: HowToUseProps) {
  const plain = variant === "plain"
  const a = accents[accent]
  return (
    <section className={cn("container-site section-y flex flex-col gap-8 md:gap-10", className)}>
      {action ? (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader title={title} lead={lead} />
          <Link href={action.href} className={cn("inline-flex min-h-11 items-center gap-1.5 font-semibold no-underline hover:underline", a.text)}>
            {action.label}
            <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
          </Link>
        </div>
      ) : (
        <SectionHeader title={title} lead={lead} align={plain ? "center" : "left"} />
      )}
      <Stagger as="ol" className="grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <StaggerItem
              as="li"
              key={step.title}
              className={cn("flex flex-col gap-3.5 rounded-lg p-6", plain ? "bg-background md:p-7" : "bg-card shadow-card")}
            >
              {step.illustration && (
                <div
                  aria-hidden="true"
                  className={cn("h-27.5 overflow-hidden rounded-lg p-3", step.dark ? "on-dark bg-background" : "bg-background")}
                >
                  {step.illustration}
                </div>
              )}
              {plain ? (
                <>
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className={cn("grid size-10 place-items-center rounded-full font-heading font-extrabold tabular", a.solid, a.onFill)}>
                      {i + 1}
                    </span>
                    {Icon && <Icon aria-hidden="true" strokeWidth={1.8} className={cn("size-6", a.text)} />}
                  </div>
                  <h3 className="text-h4 font-bold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                </>
              ) : (
                <div className="flex items-center gap-2.5">
                  <StepBadge n={i + 1} accent={accent} />
                  <h3 className="text-[1.1875rem] leading-[1.25] font-bold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                </div>
              )}
              {step.text && <p className="text-[0.9375rem] text-muted-foreground">{step.text}</p>}
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}
