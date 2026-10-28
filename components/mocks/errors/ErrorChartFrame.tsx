import type { ReactNode } from "react"
import { ArrowRight, CircleHelp, Info } from "lucide-react"

import { FloatCard } from "@/components/mocks/FloatCard"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"

type ErrorChartFrameProps = {
  caption: string
  title: string
  value: string
  delta: string
  note: string
  noteIcon?: ReactNode
  hint: string
  floatTitle: string
  floatChip: string
  /** The 400×130 chart SVG. */
  children: ReactNode
}

/** Shared shell of the 404/500 illustrations: dark chart card, "Sample data", big value, note, hint chip and a float card. */
export function ErrorChartFrame({ caption, title, value, delta, note, noteIcon, hint, floatTitle, floatChip, children }: ErrorChartFrameProps) {
  return (
    <>
      <figure className="on-dark tabular relative m-0 flex flex-col gap-3 rounded-lg border border-border bg-background p-4.5 shadow-float">
        <figcaption className="sr-only">{caption}</figcaption>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.8125rem] font-bold">{title}</span>
          <SampleDataChip />
        </div>
        <div aria-hidden="true" className="flex items-baseline gap-3">
          <span className="font-heading text-[2.75rem] leading-none font-extrabold">{value}</span>
          <span className="text-[0.8125rem] font-semibold text-neu">{delta}</span>
        </div>
        {children}
        <p aria-hidden="true" className="flex items-center gap-2 text-sm font-semibold">
          {noteIcon ?? <Info strokeWidth={2} className="size-4" />}
          {note}
        </p>
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-card px-2.75 py-1.25 text-xs font-semibold text-accent-foreground"
        >
          <ArrowRight strokeWidth={2} className="size-3.5" />
          {hint}
        </span>
      </figure>
      <FloatCard enter className="flex flex-col gap-2 md:bottom-5.5 md:-left-6 md:w-70">
        <div aria-hidden="true" className="flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <span className="grid size-7.5 place-items-center rounded-full bg-primary-tint text-[0.8125rem] font-extrabold text-primary-700">
              ?
            </span>
            <strong className="text-sm">{floatTitle}</strong>
          </span>
          <span className="inline-flex items-center gap-1 self-start rounded-full bg-neutral-tint px-2.5 py-1 text-[0.71875rem] font-semibold text-neutral-text">
            <CircleHelp strokeWidth={2.2} className="size-3" />
            {floatChip}
          </span>
        </div>
      </FloatCard>
    </>
  )
}
