"use client"

import { useState } from "react"
import { LazyMotion, m } from "motion/react"

import { ReachNote } from "@/components/mocks/ReachNote"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { featuresOverview as copy, type TabId } from "@/content/features-overview"
import { accents } from "@/lib/accents"
import { transition } from "@/lib/motion"
import { cn } from "@/lib/utils"

const g = copy.glossary
const AREAS = copy.tour.panels.map((p) => ({
  id: p.id,
  name: p.name,
  accent: p.accent,
}))
const AREA_NAME = Object.fromEntries(AREAS.map((a) => [a.id, a.name])) as Record<TabId, string>
const ACCENT = Object.fromEntries(AREAS.map((a) => [a.id, a.accent])) as Record<TabId, (typeof AREAS)[number]["accent"]>

/** Layout animation needs domMax; it loads with this island only, not with the site-wide domAnimation. */
const loadDomMax = () => import("motion/react").then((mod) => mod.domMax)

/**
 * Feature glossary with an area filter. Matching cards slide to the front (layout animation) and the
 * rest dim; every card always renders, so the grid keeps its height and nothing below it moves.
 */
export function GlossaryFilter({ className }: { className?: string }) {
  const [area, setArea] = useState<"all" | TabId>("all")
  const matches = (id: TabId) => area === "all" || area === id
  const ordered = area === "all" ? g.items : [...g.items.filter((it) => matches(it.area)), ...g.items.filter((it) => !matches(it.area))]

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <ToggleGroup type="single" value={area} onValueChange={(v) => v && setArea(v as "all" | TabId)} aria-label={g.filterLabel} className="w-full flex-wrap">
        {[{ id: "all" as const, name: g.all }, ...AREAS].map((f) => (
          <ToggleGroupItem
            key={f.id}
            value={f.id}
            className="h-auto min-h-11 gap-2 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-foreground hover:border-primary hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:font-bold data-[state=on]:text-primary-foreground"
          >
            {f.id !== "all" && <span aria-hidden="true" className={cn("size-2 flex-none rounded-full", accents[ACCENT[f.id]].fill)} />}
            {f.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <LazyMotion features={loadDomMax}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((it) => {
            const Icon = it.icon
            const dim = !matches(it.area)
            return (
              <m.li
                key={it.name}
                layout="position"
                transition={transition}
                className={cn(
                  "flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-opacity duration-200 motion-reduce:transition-none",
                  dim && "opacity-32",
                )}
              >
                <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-lg bg-muted text-primary">
                  <Icon className="size-4.5" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-[0.9375rem]">{it.name}</strong>
                  <span className="block text-[0.84375rem] leading-[1.45] text-muted-foreground">{it.text}</span>
                </span>
                <span aria-hidden="true" title={AREA_NAME[it.area]} className={cn("mt-1.5 size-2 flex-none rounded-full", accents[ACCENT[it.area]].fill)} />
                <span className="sr-only">
                  {g.areaPrefix} {AREA_NAME[it.area]}
                </span>
              </m.li>
            )
          })}
        </ul>
      </LazyMotion>

      <ReachNote />
    </div>
  )
}
