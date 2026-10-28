"use client"

import { useState, type ReactNode } from "react"
import { AnimatePresence, m, useIsPresent } from "motion/react"

import { ReachNote } from "@/components/mocks/ReachNote"
import { MockFrame } from "@/components/mocks/MockFrame"
import { BrandLegend } from "@/components/mocks/compare/brand"
import { FigureTable } from "@/components/mocks/compare/FigureTable"
import { GapTrendChart } from "@/components/mocks/compare/GapTrendChart"
import { IndexTrack } from "@/components/mocks/compare/IndexTrack"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { compareTable, compareViews as c, type CompareView } from "@/content/features/brand-compare"
import { compare } from "@/content/sample-data"
import { crossFade } from "@/lib/motion"

const weekly = compare.engagementTrend.weekly

/** The outgoing view stays inert while it fades out (same pattern as the tour stepper). */
function Pane({ children }: { children: ReactNode }) {
  const present = useIsPresent()
  return (
    <m.div variants={crossFade} initial="hidden" animate="show" exit="exit" inert={!present} aria-hidden={present ? undefined : true} className="col-start-1 row-start-1 min-w-0">
      {children}
    </m.div>
  )
}

function ViewBody({ view }: { view: CompareView }) {
  if (view === "headline") return <IndexTrack size="lg" reading className="gap-1 py-2" />
  if (view === "trend")
    return (
      <div className="flex flex-col gap-3">
        <GapTrendChart data={weekly} axis={false} />
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground max-md:hidden">{c.trendCaption}</span>
          <span className="rounded-full bg-dark-border px-2.5 py-1 font-semibold text-on-dark-strong">
            <span aria-hidden="true" className="text-pos">
              ▼{" "}
            </span>
            {compare.engagementTrend.notes[0]}
          </span>
        </div>
      </div>
    )
  return <FigureTable changeLabel={compareTable.changeViews} />
}

/**
 * "One comparison, three ways to read it.": Headline (index) · Trend (gap) · Figures (table),
 * cross-fading in one grid cell so the section never jumps.
 */
export function CompareThreeViews() {
  const [view, setView] = useState<CompareView>("headline")
  const title = c.titles[view]
  return (
    <section aria-labelledby="views-h" className="container-site pt-12 md:pt-24">
      {/* 390: the section sits on the page canvas; from md it is one white card, as in the references. */}
      <Reveal className="flex flex-col gap-4 md:gap-5 md:rounded-lg md:border md:border-border md:bg-card md:p-10 md:shadow-card">
        <SectionHeader id="views-h" title={c.title} className="max-w-225" />
        <Segmented
          tone="light"
          accent="cmp"
          label={c.toggleLabel}
          value={view}
          options={c.options}
          onChange={setView}
          className="max-md:w-full max-md:*:flex-1 md:w-fit md:*:h-12 md:*:px-5! md:*:text-base"
        />
        <p className="text-[0.9375rem] text-muted-foreground">{c.sub}</p>
        <div className="flex flex-wrap items-start gap-6">
          <div className="grid min-w-0 flex-[999_1_640px]">
            <AnimatePresence initial={false}>
              <Pane key={view}>
                <MockFrame
                  title={
                    title.mobile ? (
                      <>
                        <span className="md:hidden">{title.mobile}</span>
                        <span className="max-md:hidden">{title.desktop}</span>
                      </>
                    ) : (
                      title.desktop
                    )
                  }
                  actions={<BrandLegend className="max-md:hidden" />}
                  caption={c.captions[view]}
                  className="min-h-75 md:min-h-100"
                  bodyClassName="gap-3.5"
                >
                  <BrandLegend variant="marker" className="md:hidden" />
                  <ViewBody view={view} />
                </MockFrame>
              </Pane>
            </AnimatePresence>
          </div>
          <div className="flex flex-[1_1_200px] flex-col gap-2.5 max-md:hidden">
            <p className="text-xs font-bold tracking-[0.05em] text-neutral-text uppercase">{c.sideLabel}</p>
            <ul className="flex flex-col gap-2">
              {c.sideItems.map((item) => (
                <li key={item} className="flex h-9 w-full max-w-50 items-center rounded-full bg-cmp-tint px-3.5 text-sm font-semibold text-cmp-text">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ReachNote />
      </Reveal>
    </section>
  )
}
