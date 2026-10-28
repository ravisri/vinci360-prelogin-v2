"use client"

import { useState, type ReactNode } from "react"
import { m, useReducedMotion } from "motion/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { accents, type Accent } from "@/lib/accents"
import { panelIn } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type FeatureTab = { id: string; name: string; accent: Accent }

type FeatureTabsProps = {
  label: string
  tabs: readonly FeatureTab[]
  /** Server-rendered panel per tab id. */
  panels: Record<string, ReactNode>
  className?: string
}

/**
 * Feature-area tab strip (Radix: roving tabindex, ←/→/Home/End). Every panel is force-mounted so
 * all copy is in the server HTML; inactive ones are `hidden`. The incoming panel fades up, and
 * re-keying it remounts its charts so they animate again.
 */
export function FeatureTabs({ label, tabs, panels, className }: FeatureTabsProps) {
  const [value, setValue] = useState(tabs[0].id)
  const [swaps, setSwaps] = useState(0)
  const reduced = useReducedMotion()

  return (
    <Tabs
      value={value}
      onValueChange={(v) => {
        setValue(v)
        setSwaps((n) => n + 1)
      }}
      className={cn("flex-col gap-0", className)}
    >
      <TabsList
        variant="line"
        aria-label={label}
        className="-mx-6 scrollbar-none h-auto w-auto justify-start gap-0.5 overflow-x-auto rounded-none bg-background px-4 py-0 shadow-[inset_0_-1px_0_var(--border)] group-data-horizontal/tabs:h-auto md:sticky md:top-(--header-h) md:z-30 md:mx-0 md:w-full md:px-0"
      >
        {tabs.map((t) => (
          <TabsTrigger
            key={t.id}
            value={t.id}
            className={cn(
              "h-auto min-h-12 flex-none gap-2 rounded-none border-0 border-b-3 border-transparent px-3.5 text-sm font-medium text-muted-foreground after:hidden hover:text-foreground focus-visible:ring-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[state=active]:font-bold data-[state=active]:text-foreground md:min-h-13 md:px-2.5 md:text-[0.9375rem]",
              accents[t.accent].tabActive
            )}
          >
            <span aria-hidden="true" className={cn("size-2 flex-none rounded-full", accents[t.accent].fill)} />
            {t.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((t) => {
        const active = t.id === value
        return (
          <TabsContent key={t.id} value={t.id} forceMount className="pt-6 text-base data-[state=inactive]:hidden md:pt-10">
            <m.div key={active ? swaps : "idle"} variants={panelIn} initial={reduced || !swaps ? false : "hidden"} animate="show">
              {panels[t.id]}
            </m.div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
