import { Check } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { solutions as data } from "@/content/sample-data"
import { roleKeys, roles, solutionsPage } from "@/content/solutions"
import { cn } from "@/lib/utils"

const hero = solutionsPage.hero

/** Solutions hero visual: the four roles with their question (one highlighted) and the "Your Monday view" float. */
export function HeroRoleList() {
  const m = data.monday
  return (
    <VisualPanel accent="smi" className="md:pb-20">
      <ul aria-label={hero.listLabel} className="flex flex-col gap-2 md:w-[88%] md:gap-3">
        {roleKeys.map((k) => {
          const on = k === hero.highlight
          return (
            <li
              key={k}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 md:gap-3.5 md:px-4.5 md:py-3.5",
                on ? "bg-primary text-primary-foreground shadow-card md:translate-x-6" : "bg-card shadow-card",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-10 flex-none place-items-center rounded-lg font-heading text-base font-extrabold",
                  on ? "bg-primary-foreground text-primary" : "bg-primary-tint text-primary",
                )}
              >
                {roles[k].initial}
              </span>
              <span className="flex-1 text-[0.8125rem] leading-[1.35] md:text-sm">
                <strong className="block text-sm md:text-base">{roles[k].label}</strong>
                <span className={cn(!on && "text-muted-foreground")}>“{roles[k].question}”</span>
              </span>
              {on && <Check aria-hidden="true" strokeWidth={2.6} className="size-5 flex-none md:size-5.5" />}
            </li>
          )
        })}
      </ul>
      <FloatCard float enter className="flex flex-col gap-1.5 md:right-0 md:-bottom-14 md:w-65">
        <span className="flex items-center justify-between gap-2">
          <strong className="text-sm">{m.title}</strong>
          <SampleDataChip tone="light" />
        </span>
        <span className="text-xs text-muted-foreground max-md:hidden">{m.when}</span>
        <span className="text-[0.84375rem] tabular">
          Mentions <strong>{m.mentions}</strong>{" "}
          <Delta trend="up" className="font-bold">
            {m.mentionsDelta}
          </Delta>
        </span>
        <span className="text-[0.84375rem] tabular">
          Share of voice <strong>{m.sov}</strong>{" "}
          <Delta trend="up" className="font-bold">
            {m.sovDelta}
          </Delta>
        </span>
      </FloatCard>
    </VisualPanel>
  )
}
