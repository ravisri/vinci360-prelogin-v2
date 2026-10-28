"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { MountFade } from "@/components/motion/MountFade"
import { MiniBars } from "@/components/sections/solutions/MiniBars"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { featureRefs, picks, solutionsPage } from "@/content/solutions"
import { accents } from "@/lib/accents"
import { cn } from "@/lib/utils"

const copy = solutionsPage.picker

/**
 * "Which page should I start with?": pick a goal (toggle group, one always selected, arrow keys
 * move) and see the recommended page with its link, plus the one to try next. Announced politely.
 */
export function StartPicker({ labelledBy, describedBy }: { labelledBy: string; describedBy: string }) {
  const [i, setI] = useState(0)
  const p = picks[i]
  const start = featureRefs[p.start]
  const then = featureRefs[p.then]

  return (
    <>
      <ToggleGroup
        type="single"
        value={String(i)}
        onValueChange={(v) => v && setI(Number(v))}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        spacing={2}
        className="w-full flex-wrap md:gap-2.5"
      >
        {picks.map((x, n) => (
          <ToggleGroupItem
            key={x.label}
            value={String(n)}
            className={cn(
              "h-auto min-h-11 rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground hover:border-primary hover:bg-card hover:text-foreground md:min-h-12 md:px-4.5 md:text-[0.9375rem]",
              "data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:font-extrabold data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary data-[state=on]:hover:text-primary-foreground",
            )}
          >
            <Check aria-hidden="true" strokeWidth={3} className="hidden size-3.5 in-data-[state=on]:inline" />
            {x.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div aria-live="polite">
        <MountFade key={i} className="grid gap-2.5 md:gap-4.5 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid items-center gap-2.5 rounded-lg bg-card p-4.5 shadow-card sm:grid-cols-[minmax(0,1fr)_12.5rem] md:gap-5.5 md:p-6">
            <div className="flex flex-col gap-2.5 md:gap-3">
              <span className="text-xs font-bold tracking-[0.05em] text-muted-foreground uppercase md:text-[0.8125rem] md:font-semibold">{copy.start}</span>
              <h3 className="flex items-center gap-2.5 text-[1.3125rem] font-extrabold md:text-[1.625rem]">
                <span aria-hidden="true" className={cn("size-3 flex-none rounded-full", accents[p.start].fill)} />
                {start.name}
              </h3>
              <p className="text-[0.9375rem] text-muted-foreground md:text-base">{p.why}</p>
              <Button asChild className="self-stretch sm:self-start">
                <Link href={start.href}>
                  {copy.go}
                  <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4.5" />
                </Link>
              </Button>
            </div>
            <MiniBars bars={start.bars} variant="dark" className="h-17.5 rounded-lg p-2.5 sm:h-37.5 sm:gap-2 sm:p-3.5" />
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-background p-3.5 md:gap-2.5 md:p-6">
            <span className="text-xs font-bold tracking-[0.05em] text-muted-foreground uppercase md:text-[0.8125rem] md:font-semibold">{copy.then}</span>
            <h3 className="flex items-center gap-2.5 font-extrabold md:text-xl">
              <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", accents[p.then].fill)} />
              {then.name}
            </h3>
            <p className="text-sm text-muted-foreground md:text-[0.9375rem]">{p.thenWhy}</p>
            <Link href={then.href} className="mt-auto inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-700 no-underline hover:underline">
              {copy.open} {then.name}
              <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
            </Link>
          </div>
        </MountFade>
      </div>
    </>
  )
}
