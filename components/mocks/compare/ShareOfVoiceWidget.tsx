"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

import { Donut } from "@/components/charts/Donut"
import { MockFrame } from "@/components/mocks/MockFrame"
import { BrandMarker, brandStyle, largestRemainder, type BrandKey } from "@/components/mocks/compare/brand"
import { BrandStack } from "@/components/mocks/compare/BrandStack"
import { compareWidgets } from "@/content/features/brand-compare"
import { brands, compare } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = compareWidgets.sov
const rivals = ["nimbus", "kestrel"] as const
/** Larger in-frame chip (40px+ tall), as in the reference share-of-voice control. */
const chip = "inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background text-[0.9375rem] font-bold whitespace-nowrap max-sm:text-sm"
const tones = { aurora: "chart-6", nimbus: "chart-2", kestrel: "chart-3" } as const

/**
 * 2 · Share of voice. Remove a competitor and the shares recalculate from mentions (largest
 * remainder, always 100%): 38/36/26 → 51/49 or 59/41. At least one competitor stays in.
 */
export function ShareOfVoiceWidget() {
  const [included, setIncluded] = useState<Record<(typeof rivals)[number], boolean>>({ nimbus: true, kestrel: true })
  const set: BrandKey[] = ["aurora", ...rivals.filter((b) => included[b])]
  const shares = largestRemainder(set.map((b) => compare.raw.mentions[b]))
  const pct = Object.fromEntries(set.map((b, i) => [b, shares[i]])) as Partial<Record<BrandKey, number>>
  const onlyOne = set.length === 2
  const live = c.live(set.map((b) => `${brands[b].name} ${pct[b]}%`).join(", "))

  return (
    <MockFrame title={c.title} caption={live} bodyClassName="gap-4">
      <div role="group" aria-label={c.group} className="flex flex-wrap gap-2">
        <span className={cn(chip, "px-3.5")}>
          <BrandMarker brand="aurora" className="size-3" />
          {brands.aurora.name} (you)
        </span>
        {rivals.map((b) => {
          const on = included[b]
          const locked = on && onlyOne
          return (
            <button
              key={b}
              type="button"
              disabled={locked}
              aria-label={locked ? c.keep : on ? c.remove(brands[b].name) : c.add(brands[b].name)}
              onClick={() => setIncluded((s) => ({ ...s, [b]: !s[b] }))}
              className={cn(
                chip,
                "group cursor-pointer py-1.5 pr-1.5 pl-3.5 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed",
                !on && "opacity-55",
              )}
            >
              <BrandMarker brand={b} className="size-3" />
              <span className={cn(!on && "line-through")}>{brands[b].name}</span>
              <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-border group-hover:bg-muted-foreground/30">
                {on ? <X strokeWidth={2.2} className="size-3.5" /> : <Plus strokeWidth={2.2} className="size-3.5" />}
              </span>
            </button>
          )
        })}
      </div>
      <div className="grid items-center gap-5 sm:grid-cols-[9.375rem_minmax(0,1fr)]">
        <Donut
          key={set.join()}
          data={set.map((b) => ({ label: brands[b].short, value: pct[b] ?? 0, tone: tones[b] }))}
          center={`${pct.aurora}%`}
          sub={brands.aurora.short}
          thickness={18}
          gap={2}
          className="w-32 max-sm:mx-auto"
        />
        <div className="flex min-w-0 flex-col gap-3">
          <BrandStack items={set.map((b) => ({ brand: b, pct: pct[b] ?? 0, label: `${pct[b]}%` }))} hatchKestrel />
          <ul aria-hidden="true" className="flex flex-col gap-1.5 text-xs tabular">
            {set.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <BrandMarker brand={b} />
                <span className={cn("font-semibold", brandStyle[b].text)}>{brands[b].name}</span>
                <span className="ml-auto font-bold">{pct[b]}%</span>
              </li>
            ))}
            <li className="flex items-center gap-2 border-t border-border pt-1.5 text-muted-foreground">
              {c.total}
              <span className="ml-auto font-bold text-foreground">100%</span>
            </li>
          </ul>
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {live}
      </p>
    </MockFrame>
  )
}
