"use client"

import { useId, useState } from "react"
import { m, useReducedMotion } from "motion/react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { accents, type Accent } from "@/lib/accents"
import { nudgeBob } from "@/lib/motion"
import { cn } from "@/lib/utils"

type HotspotProps = {
  /** Number (or "!") shown in the dot. */
  n: number | string
  title: string
  text: string
  accent?: Accent
  /** Pulsing ring (default on). The tour pulses only its first hotspot per step. */
  pulse?: boolean
  /** Short bubble above the dot, e.g. "Click here" after the visitor has been idle. Decorative. */
  nudge?: string
  /** Position inside a `relative` parent; place it clear of numbers and labels, e.g. "top-[22%] left-[18%]". */
  className?: string
}

/**
 * Numbered hotspot over a mock: 44px hit area, pulsing ring, white tooltip on hover or focus.
 * The description is always linked with aria-describedby, so touch and screen-reader users get it too.
 */
export function Hotspot({ n, title, text, accent = "smi", pulse = true, nudge, className }: HotspotProps) {
  const id = useId()
  const a = accents[accent]
  const reduced = useReducedMotion()
  // Controlled so a tap toggles it too (Radix tooltips only open on hover and keyboard focus).
  const [open, setOpen] = useState(false)
  return (
    <div className={cn("absolute z-10 -translate-x-1/2 -translate-y-1/2", className)}>
      {nudge && (
        <span aria-hidden="true" className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2">
          <m.span
            {...(reduced ? {} : nudgeBob)}
            className="relative mb-1.5 block rounded-sm bg-chart-5 px-3 py-2 text-[0.8125rem] leading-none font-bold whitespace-nowrap text-ink after:absolute after:top-full after:left-1/2 after:-ml-1.5 after:border-6 after:border-b-0 after:border-transparent after:border-t-chart-5"
          >
            {nudge}
          </m.span>
        </span>
      )}
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-describedby={id}
            aria-expanded={open}
            onClick={(e) => {
              // Skip Radix's close-on-click so the click acts as a toggle.
              e.preventDefault()
              setOpen((o) => !o)
            }}
            className="relative grid size-11 cursor-pointer place-items-center rounded-full"
          >
            {pulse && <span aria-hidden="true" className="absolute inset-1.5 animate-hotspot rounded-full border-2 border-primary-foreground" />}
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-primary-foreground/75">
              <span className="grid size-8 place-items-center rounded-full bg-ink">
                <span className={cn("grid size-6.5 place-items-center rounded-full text-[0.8125rem] leading-none font-bold tabular", a.solid, a.onFill)}>
                  {n}
                </span>
              </span>
            </span>
            <span className="sr-only">{`${n}. ${title}`}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent
          arrow={false}
          side="top"
          sideOffset={2}
          className="w-60 max-w-60 flex-col items-start gap-0.5 rounded-lg bg-popover px-3 py-2.5 text-[0.8125rem] leading-[1.4] font-medium text-popover-foreground shadow-card"
        >
          <strong className="block font-bold">{title}</strong>
          {text}
        </TooltipContent>
      </Tooltip>
      <span id={id} className="sr-only">
        {text}
      </span>
    </div>
  )
}
