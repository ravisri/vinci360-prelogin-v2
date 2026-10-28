"use client"

import type { ReactNode } from "react"
import { Bookmark, CalendarDays, ChevronDown, MoveHorizontal } from "lucide-react"

import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { useTour } from "@/components/sections/tour/tour-context"
import { tour } from "@/content/sample-data"
import { tourPage, type TourFilter, type TourStep } from "@/content/tour"
import { sentimentGlyph, sentimentLabel, sentimentShort, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const ui = tourPage.stage

/** Grows a small in-mock control's hit area to 44px tall without changing how it looks. */
export const hitArea = "relative after:absolute after:inset-x-0 after:-inset-y-1.5"

/** Dark filter chip ("fch" in the reference). */
export const chip = "inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-xs leading-none font-medium whitespace-nowrap text-on-dark-strong"
const chipButton = "cursor-pointer hover:border-on-dark-focus"
const chipActive = "border-primary bg-primary font-bold text-primary-foreground hover:border-primary"

export type FrameFilter = TourFilter & { onClick?: () => void }

type TourFrameProps = {
  step: TourStep
  /** Defaults to the step's filters; a filter with onClick renders as the active chip button. */
  filters?: FrameFilter[]
  children: ReactNode
  /** Floating insight card: overhangs the frame from xl, in the flow below it. */
  float?: ReactNode
  /** Under the frame, e.g. the reach note. */
  after?: ReactNode
}

function RangeButton({ className }: { className?: string }) {
  const { range, toggleRange } = useTour()
  return (
    <button type="button" onClick={toggleRange} aria-label={ui.rangeLabel(tour.ranges[range])} className={cn(chip, chipButton, hitArea, className)}>
      <CalendarDays aria-hidden="true" strokeWidth={2} className="size-3.25" />
      <span className="md:hidden">{tour.rangesChip[range]}</span>
      <span className="max-md:hidden">{tour.ranges[range]}</span>
      <ChevronDown aria-hidden="true" strokeWidth={2} className="size-3" />
    </button>
  )
}

/**
 * Dark dashboard window shared by the seven tour steps: chrome, page header with the date window
 * and saved view, the filter bar, then the step's widgets. Below md the dashboard keeps its 620px
 * layout and pans sideways inside the frame, as in TourMobile.
 */
export function TourFrame({ step, filters = step.filters, children, float, after }: TourFrameProps) {
  return (
    <div className="relative">
      <MockFrame
        caption={step.alt}
        chrome={
          <>
            <span className="max-md:hidden">vinci360 · </span>
            {step.module}
          </>
        }
        bodyClassName="p-0"
      >
        {/* Scrollable at 390 only; focusable so keyboard users can pan it. */}
        <div role="region" aria-label={ui.scrollRegion} tabIndex={0} className="overflow-x-auto focus-visible:-outline-offset-2">
          <div className="relative flex min-w-155 flex-col gap-2.5 p-3 md:min-w-0 md:px-4 md:pt-3.5 md:pb-4 xl:min-h-150">
            <div className="flex flex-wrap items-center gap-2.5 max-md:hidden">
              <span className="font-heading text-[1.0625rem] font-bold">{step.module}</span>
              <RangeButton />
              <span className={cn(chip, "ml-auto")}>
                <Bookmark aria-hidden="true" strokeWidth={2} className="size-3.25" />
                <span className="text-muted-foreground">{ui.savedView}</span> {ui.savedViewName}
              </span>
            </div>
            <div className="flex gap-1.5 border-border md:mb-0.5 md:flex-wrap md:border-b md:pb-3">
              <RangeButton className="md:hidden" />
              {filters.map((f) => {
                const label = (
                  <>
                    <span className={cn("max-md:hidden", f.onClick ? "text-on-dark-strong font-medium" : "text-muted-foreground")}>{f.label}:</span>
                    <span className={cn("md:hidden", f.onClick ? "text-on-dark-strong font-medium" : "text-muted-foreground")}>{f.mobileLabel ?? f.label}:</span>
                  </>
                )
                return f.onClick ? (
                  <button
                    key={f.label}
                    type="button"
                    onClick={f.onClick}
                    aria-label={ui.filterLabel(f.label, f.value)}
                    className={cn(chip, chipButton, chipActive, hitArea, f.mobile === false && "max-md:hidden")}
                  >
                    {label} {f.value}
                    <ChevronDown aria-hidden="true" strokeWidth={2} className="size-3" />
                  </button>
                ) : (
                  <span key={f.label} className={cn(chip, f.mobile === false && "max-md:hidden")}>
                    {label} {f.value}
                  </span>
                )
              })}
            </div>
            {children}
          </div>
        </div>
      </MockFrame>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-[0.78125rem] text-muted-foreground md:hidden">
        <MoveHorizontal aria-hidden="true" strokeWidth={2} className="size-4" />
        {ui.swipe}
      </p>
      {float}
      {after}
    </div>
  )
}

/** Dark widget panel inside the frame ("dk" in the reference). */
export function Panel({ title, children, className }: { title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-card p-3 tabular", className)}>
      {title && <p className="text-[0.78125rem] font-semibold">{title}</p>}
      {children}
    </div>
  )
}

/** Step hotspot i (0–2) with the step's copy and accent; only the first pulses and carries the idle nudge. */
export function TourHotspot({ step, i, className }: { step: TourStep; i: 0 | 1 | 2; className?: string }) {
  const { nudge } = useTour()
  return (
    <Hotspot
      n={i + 1}
      accent={step.accent}
      {...step.hotspots[i]}
      pulse={i === 0}
      nudge={i === 0 && nudge ? ui.nudge : undefined}
      className={className}
    />
  )
}

/** Outlined hashtag chip and filled category chip used across the steps. */
export const tagChip = "inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs leading-[1.3] font-semibold"
export const catChip = "inline-flex items-center rounded-full bg-border px-2.5 py-1 text-xs leading-[1.3] font-medium text-on-dark-strong"

const MOODS = ["pos", "neu", "neg"] as const

/** "▲ Positive – Neutral ▼ Negative" in the mood colours, under a sentiment bar. */
export function MoodLegend({ short, className }: { short?: boolean; className?: string }) {
  return (
    <ul aria-hidden="true" className={cn("flex justify-between gap-3 text-[0.6875rem]", className)}>
      {MOODS.map((s) => (
        <li key={s} className={sentimentText[s]}>
          {sentimentGlyph[s]} {short ? sentimentShort[s] : sentimentLabel[s]}
        </li>
      ))}
    </ul>
  )
}
