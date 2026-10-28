import { Info } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import { SectionHeader } from "@/components/sections/SectionHeader"
import type { PersonasAside } from "@/content/features/types"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type WhoOpensThisPageProps = {
  title: string
  items: readonly Benefit[]
  accent: Accent
  columns?: 3 | 4
  /** Tinted "When to use it" box beside the pills (Channels: two pills + aside). */
  aside?: PersonasAside
  className?: string
}

/** "Who opens this page": pill cards with an accent icon, a role and one line on why. */
export function WhoOpensThisPage({ title, items, accent, columns = 4, aside, className }: WhoOpensThisPageProps) {
  const a = accents[accent]
  const list = (
    <ul className={cn("grid gap-3 md:grid-cols-2 md:gap-4", aside ? "lg:flex-[2_1_0]" : columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map(({ icon: Icon, title: role, text }) => (
        <li key={role} className="flex items-start gap-3 rounded-full border border-border bg-card px-5 py-3.5">
          <Icon aria-hidden="true" strokeWidth={2} className={cn("mt-px size-5.5 flex-none", a.text)} />
          <span>
            <strong className="block text-[0.9375rem]">{role}</strong>
            <span className="block text-[0.84375rem] text-muted-foreground">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <section className={cn("container-site flex flex-col gap-4 pb-6", className)}>
      <SectionHeader title={title} size="small" />
      {aside ? (
        <div className="flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-stretch">
          {list}
          <aside aria-label={aside.label} className={cn("flex items-start gap-2.5 rounded-lg px-4.5 py-3.5 text-sm lg:flex-[1_1_0]", a.tint)}>
            <Info aria-hidden="true" strokeWidth={2} className={cn("mt-px size-5 flex-none", a.text)} />
            <span>
              <strong>{aside.title}</strong>{" "}
              {aside.textMobile ? (
                <>
                  <span className="md:hidden">{aside.textMobile}</span>
                  <span className="max-md:hidden">{aside.text}</span>
                </>
              ) : (
                aside.text
              )}
            </span>
          </aside>
        </div>
      ) : (
        list
      )}
    </section>
  )
}
