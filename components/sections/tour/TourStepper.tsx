"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import Link from "next/link"
import { AnimatePresence, m, useIsPresent } from "motion/react"
import { ArrowLeft, ArrowRight, Check, Compass, Hand } from "lucide-react"

import { ModuleChip } from "@/components/sections/ModuleChip"
import { TourContext, type TourState } from "@/components/sections/tour/tour-context"
import { Button } from "@/components/ui/button"
import type { ChannelKey } from "@/content/channels-data"
import type { TourRange } from "@/content/sample-data"
import { tourPage, type TourModule, type TourStep } from "@/content/tour"
import { accents, type Accent } from "@/lib/accents"
import { crossFade, transition } from "@/lib/motion"
import { cn } from "@/lib/utils"

const { steps, stage: ui, menu } = tourPage
const TOTAL = steps.length
const NUDGE_AFTER_MS = 6000

/** Underline colour of the current step title (text-safe accent shade, as in the reference). */
const underline: Record<Accent, string> = {
  smi: "decoration-smi-text",
  trends: "decoration-trends-text",
  sent: "decoration-sent-text",
  cmp: "decoration-cmp-text",
  stories: "decoration-stories-text",
  reports: "decoration-reports-text",
  channels: "decoration-channels-text",
}

const label = "font-sans text-[0.8125rem] font-bold tracking-[0.05em] text-neutral-text uppercase"
const textLink = "min-h-8 text-[0.78125rem] font-semibold underline"

type Mode = "guided" | "free"
type GoOptions = { focus?: boolean; module?: TourModule }

const clampStep = (n: number) => Math.min(TOTAL, Math.max(1, n))

/** Mock wrapper inside AnimatePresence: the outgoing copy is inert while it fades out. */
function Pane({ children }: { children: ReactNode }) {
  const present = useIsPresent()
  return (
    <m.div variants={crossFade} initial="hidden" animate="show" exit="exit" inert={!present} aria-hidden={present ? undefined : true} className="min-w-0">
      {children}
    </m.div>
  )
}

function Progress({ step, className }: { step: number; className?: string }) {
  return (
    <div role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={step} aria-label={ui.progressLabel} className={cn("h-1.5 overflow-hidden rounded-full bg-border", className)}>
      <m.span className="block h-full origin-left rounded-full bg-primary" initial={false} animate={{ scaleX: step / TOTAL }} transition={transition} />
    </div>
  )
}

function StepNumber({ s, on, done, size }: { s: TourStep; on: boolean; done: boolean; size: "rail" | "chip" }) {
  const a = accents[s.accent]
  return (
    <span
      className={cn(
        "grid flex-none place-items-center rounded-full border-border bg-card font-bold text-neutral-text tabular",
        size === "rail" ? "size-7 border-2 text-[0.8125rem]" : "size-5.5 border-[1.5px] text-[0.6875rem]",
        on && [a.solid, a.onFill, a.ring],
        done && "border-ink bg-ink text-primary-foreground"
      )}
    >
      {done ? (
        <>
          <Check aria-hidden="true" strokeWidth={3} className="size-3.5" />
          <span className="sr-only">{ui.completed}</span>
        </>
      ) : (
        s.n
      )}
    </span>
  )
}

/** Step heading: the area chip, named for screen readers. Focus lands here after Back/Next and ←/→. */
function StepHeading({ s, className, chipClassName }: { s: TourStep; className?: string; chipClassName?: string }) {
  return (
    <h2 data-step-heading="" tabIndex={-1} className={cn("w-fit rounded-full font-sans", className)}>
      <ModuleChip accent={s.accent} label={s.area} className={chipClassName} />
      <span className="sr-only">
        {`. ${ui.stepOf(s.n, TOTAL)}: ${s.title}`}
      </span>
    </h2>
  )
}

/**
 * The tour stage: step rail (or module menu in free explore), the active step's dark mock, and the
 * "What you're seeing / Try this / Why it matters" panel. Step 1 renders on the server; every step's
 * copy is in the HTML. The step follows the URL hash (#step-3, #explore) so links can be shared.
 */
export function TourStepper({ mocks }: { mocks: ReactNode[] }) {
  const [step, setStep] = useState(1)
  const [mode, setMode] = useState<Mode>("guided")
  const [range, setRange] = useState<TourRange>("30d")
  const [view, setView] = useState<ChannelKey | null>(null)
  const [moduleName, setModuleName] = useState<string | null>(null)
  const [nudge, setNudge] = useState(false)

  const stageRef = useRef<HTMLElement>(null)
  const chipsRef = useRef<HTMLOListElement>(null)
  const focusPending = useRef(false)
  const interacted = useRef(false)
  const nudged = useRef(false)

  const cur = steps[step - 1]
  const guided = mode === "guided"

  const goTo = useCallback((n: number, { focus, module }: GoOptions = {}) => {
    const next = clampStep(n)
    setStep(next)
    setView(module?.view ?? null)
    setModuleName(module?.name ?? null)
    setNudge(false)
    focusPending.current = !!focus
    window.history.replaceState(null, "", `#step-${next}`)
  }, [])

  const switchMode = (next: Mode) => {
    setMode(next)
    setModuleName(null)
    setView(null)
    window.history.replaceState(null, "", next === "free" ? "#explore" : `#step-${step}`)
  }

  // Deep links: #step-n or #explore on load and on in-page hash changes (hero buttons, pasted links).
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash
      const match = /^#step-(\d+)$/.exec(hash)
      if (match) {
        setMode("guided")
        setStep(clampStep(Number(match[1])))
        setView(null)
      } else if (hash === "#explore") {
        setMode("free")
      } else {
        return
      }
      // Nothing on the page has these ids, so the browser doesn't scroll; bring the stage into view.
      stageRef.current?.scrollIntoView({ block: "start" })
    }
    apply()
    window.addEventListener("hashchange", apply)
    return () => window.removeEventListener("hashchange", apply)
  }, [])

  // After Back/Next or ←/→, focus the visible step heading; keep the active chip in its scroll row.
  useEffect(() => {
    if (focusPending.current) {
      focusPending.current = false
      const headings = stageRef.current?.querySelectorAll<HTMLElement>("[data-step-heading]") ?? []
      Array.from(headings).find((h) => h.offsetParent !== null)?.focus()
    }
    const row = chipsRef.current
    const chip = row?.querySelector<HTMLElement>("[aria-current]")
    if (row && chip && (chip.offsetLeft < row.scrollLeft || chip.offsetLeft + chip.offsetWidth > row.scrollLeft + row.clientWidth)) {
      row.scrollTo({ left: chip.offsetLeft - 16 })
    }
  }, [step, mode])

  // One idle nudge per visit: "Click here" on the first hotspot if nobody has touched the stage.
  useEffect(() => {
    if (nudged.current) return
    const id = window.setTimeout(() => {
      if (interacted.current || nudged.current) return
      nudged.current = true
      setNudge(true)
    }, NUDGE_AFTER_MS)
    return () => window.clearTimeout(id)
  }, [step])

  const onInteract = () => {
    interacted.current = true
    setNudge(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    onInteract()
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    const target = e.target as HTMLElement
    // Sliders and fields use the arrows themselves; so does the dashboard while it pans at 390.
    if (target.closest("input, textarea, select, [contenteditable='true']")) return
    if (target.getAttribute("role") === "region" && target.scrollWidth > target.clientWidth) return
    e.preventDefault()
    goTo(step + (e.key === "ArrowRight" ? 1 : -1), { focus: true })
  }

  const ctx = useMemo<TourState>(() => ({ range, toggleRange: () => setRange((r) => (r === "30d" ? "7d" : "30d")), view, nudge }), [range, view, nudge])

  const modules = menu.flatMap((g) => g.modules.map((mod) => ({ ...mod, accent: g.accent })))

  const nav = (compact?: boolean) => (
    <div className={cn("flex", compact ? "gap-2.5" : "w-full gap-2")}>
      <Button type="button" variant="outline" size={compact ? "lg" : "default"} disabled={step === 1} onClick={() => goTo(step - 1, { focus: true })} className="flex-1 px-3">
        <ArrowLeft aria-hidden="true" strokeWidth={2} className="size-4" />
        {ui.back}
      </Button>
      {step < TOTAL ? (
        <Button type="button" size={compact ? "lg" : "default"} onClick={() => goTo(step + 1, { focus: true })} className="flex-[1.4] px-3">
          {ui.next}
          <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
        </Button>
      ) : (
        <Button asChild variant="cta" size={compact ? "lg" : "default"} className="flex-[1.4] px-3">
          <Link href={ui.lastCta.href}>{ui.lastCta.label}</Link>
        </Button>
      )}
    </div>
  )

  return (
    <TourContext.Provider value={ctx}>
      <section id="stage" ref={stageRef} aria-label={ui.label} className="md:px-5">
        <div
          onKeyDown={onKeyDown}
          onPointerDown={onInteract}
          className={cn(
            "mx-auto max-w-350 md:rounded-lg md:border md:border-border md:bg-card md:p-5 md:shadow-float xl:grid xl:gap-5",
            guided ? "xl:grid-cols-[16.25rem_minmax(0,1fr)_18.75rem]" : "xl:grid-cols-[16.25rem_minmax(0,1fr)]"
          )}
        >
          {/* A. Rail (xl): steps with progress, or the module menu in free explore */}
          <div className="flex min-w-0 flex-col gap-3.5 max-xl:hidden">
            {guided ? (
              <>
                <div className="flex flex-col gap-2 px-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span aria-live="polite" className="text-[0.8125rem] font-bold tabular">
                      {ui.stepOf(step, TOTAL)}
                    </span>
                    <button type="button" onClick={() => switchMode("free")} className={cn(textLink, "cursor-pointer text-primary")}>
                      {ui.exploreFreely}
                    </button>
                  </div>
                  <Progress step={step} />
                </div>
                <nav aria-label={ui.stepsLabel}>
                  <ol className="flex flex-col gap-0.5">
                    {steps.map((s) => {
                      const on = s.n === step
                      return (
                        <li key={s.n}>
                          <button
                            type="button"
                            aria-current={on ? "step" : undefined}
                            onClick={() => goTo(s.n)}
                            className={cn(
                              "grid min-h-11 w-full cursor-pointer grid-cols-[2rem_minmax(0,1fr)] items-start gap-2.5 rounded-lg p-2.5 text-left hover:bg-muted",
                              on && "bg-muted"
                            )}
                          >
                            <StepNumber s={s} on={on} done={s.n < step} size="rail" />
                            <span className="min-w-0">
                              <span className={cn("block text-sm leading-[1.3] font-semibold", on && ["font-extrabold underline decoration-2 underline-offset-4", underline[s.accent]])}>
                                {s.title}
                              </span>
                              <span className="mt-0.5 block text-[0.78125rem] leading-[1.35] text-muted-foreground">{s.sub}</span>
                              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[0.6875rem] font-semibold text-neutral-text">
                                <span aria-hidden="true" className={cn("size-1.75 rounded-full", accents[s.accent].fill)} />
                                {s.area} · {s.time}
                              </span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ol>
                </nav>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between px-1.5 py-1">
                  <span className="text-[0.8125rem] font-bold">{ui.allModules}</span>
                  <button type="button" onClick={() => switchMode("guided")} className={cn(textLink, "cursor-pointer text-primary")}>
                    {ui.backToGuided}
                  </button>
                </div>
                <nav aria-label={ui.modulesLabel} className="flex flex-col gap-2.5">
                  {menu.map((g) => (
                    <div key={g.area}>
                      <p className="flex items-center gap-2 px-2.5 pb-1 text-[0.71875rem] font-bold tracking-[0.05em] text-neutral-text uppercase">
                        <span aria-hidden="true" className={cn("size-2 rounded-full", accents[g.accent].fill)} />
                        {g.area}
                      </p>
                      <ul>
                        {g.modules.map((mod) => {
                          const on = moduleName === mod.name
                          return (
                            <li key={mod.name}>
                              <button
                                type="button"
                                aria-current={on ? "page" : undefined}
                                onClick={() => goTo(mod.step, { module: mod })}
                                className={cn(
                                  "flex min-h-11 w-full cursor-pointer items-center rounded-sm px-2.5 py-1.5 text-left text-sm leading-[1.2] font-medium hover:bg-muted",
                                  on && "bg-accent font-bold underline underline-offset-4"
                                )}
                              >
                                {mod.name}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </>
            )}
          </div>

          {/* A′. Compact step nav below xl, pinned under the header; chips scroll inside their row */}
          <nav
            aria-label={guided ? ui.stepsLabel : ui.modulesLabel}
            className="sticky top-(--header-h) z-20 border-y border-border bg-background pt-2 pb-2.5 md:-mx-5 md:-mt-5 md:rounded-t-lg md:border-t-0 md:bg-card md:pt-4 xl:hidden"
          >
            <div className="flex items-center justify-between px-4 pb-1.5 md:px-5">
              {guided ? (
                <>
                  <span aria-live="polite" className="text-[0.8125rem] font-bold tabular">
                    {ui.stepOf(step, TOTAL)}
                  </span>
                  <span className="flex items-center gap-3 text-xs text-muted-foreground">
                    {ui.duration}
                    <button type="button" onClick={() => switchMode("free")} className={cn(textLink, "cursor-pointer text-primary")}>
                      {ui.exploreFreely}
                    </button>
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[0.8125rem] font-bold">{ui.allModules}</span>
                  <button type="button" onClick={() => switchMode("guided")} className={cn(textLink, "cursor-pointer text-primary")}>
                    {ui.backToGuided}
                  </button>
                </>
              )}
            </div>
            {guided && <Progress step={step} className="mx-4 mb-2 h-1.25 md:mx-5" />}
            {/* relative: the chips’ sr-only spans are absolute and must be clipped by this row, not the page. */}
            <ol ref={chipsRef} className="relative flex scrollbar-none gap-2 overflow-x-auto px-4 md:px-5">
              {guided
                ? steps.map((s) => {
                    const on = s.n === step
                    return (
                      <li key={s.n} className="flex-none">
                        <button
                          type="button"
                          aria-current={on ? "step" : undefined}
                          onClick={() => goTo(s.n)}
                          className={cn(
                            "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm leading-none font-medium whitespace-nowrap",
                            on && ["border-foreground font-extrabold underline decoration-2 underline-offset-5", underline[s.accent]]
                          )}
                        >
                          <StepNumber s={s} on={on} done={false} size="chip" />
                          <span className="sr-only">{s.title} (</span>
                          <span aria-hidden="true">{s.short}</span>
                          <span className="sr-only">)</span>
                        </button>
                      </li>
                    )
                  })
                : modules.map((mod) => {
                    const on = moduleName === mod.name
                    return (
                      <li key={mod.name} className="flex-none">
                        <button
                          type="button"
                          aria-current={on ? "page" : undefined}
                          onClick={() => goTo(mod.step, { module: mod })}
                          className={cn(
                            "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm leading-none font-medium whitespace-nowrap",
                            on && "border-foreground font-extrabold underline decoration-2 underline-offset-5"
                          )}
                        >
                          <span aria-hidden="true" className={cn("size-2 rounded-full", accents[mod.accent].fill)} />
                          {mod.name}
                        </button>
                      </li>
                    )
                  })}
            </ol>
          </nav>

          {/* B. Centre: free-explore banner, then the active step's mock (cross-fades on change) */}
          <div className="relative flex min-w-0 flex-col gap-3 px-4 pt-5 md:px-0 xl:pt-0">
            <StepHeading s={cur} className="xl:hidden" />
            {!guided && (
              <p className="flex flex-wrap items-center gap-2.5 rounded-lg bg-muted px-3.5 py-2.5 text-[0.84375rem]">
                <Compass aria-hidden="true" strokeWidth={2} className="size-4.5 text-primary" />
                <span>
                  <strong>{ui.freeBanner.strong}</strong>
                  {ui.freeBanner.text}
                </span>
              </p>
            )}
            <div className="grid grid-cols-[minmax(0,1fr)] *:col-start-1 *:row-start-1">
              <AnimatePresence initial={false}>
                <Pane key={step}>{mocks[step - 1]}</Pane>
              </AnimatePresence>
            </div>
          </div>

          {/* C. About this step (guided only). Every step's copy is in the HTML; inactive ones are hidden. */}
          {guided && (
            <aside
              aria-label="About this step"
              className="mt-6 flex flex-col gap-4 rounded-t-[1.25rem] bg-card px-4 pt-4 shadow-card md:rounded-lg md:border md:border-border md:pb-4 md:shadow-none xl:mt-0 xl:self-start xl:bg-background xl:p-5"
            >
              <span aria-hidden="true" className="h-1 w-10 self-center rounded-full bg-border md:hidden" />
              <StepHeading s={cur} className="max-xl:hidden" chipClassName="border border-border bg-card" />
              {steps.map((s) => (
                <div key={s.n} hidden={s.n !== step} className="flex flex-col gap-3 xl:gap-4">
                  <div className="flex flex-col gap-1 xl:gap-1.5">
                    <h3 className={cn(label, "max-xl:text-xs")}>{ui.seeing}</h3>
                    <p className="text-[0.90625rem] leading-normal xl:text-[0.9375rem]">{s.seeing}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className={cn(label, "max-xl:text-xs")}>{ui.tryThis}</h3>
                    <ul className="flex flex-col gap-1.5">
                      {s.tries.map((t) => (
                        <li key={t} className="flex items-start gap-2 text-sm leading-[1.4]">
                          <Hand aria-hidden="true" strokeWidth={2} className="mt-0.5 size-4 flex-none text-primary" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3 max-xl:hidden">
                    <h3 className={label}>{ui.why}</h3>
                    <p className="text-sm leading-normal">{s.why}</p>
                  </div>
                  <p className="rounded-lg bg-background px-3 py-2.5 text-[0.84375rem] xl:hidden">
                    <strong>{ui.whyShort}</strong> {s.why.charAt(0).toLowerCase() + s.why.slice(1)}
                  </p>
                </div>
              ))}
              <div className="mt-auto flex flex-col gap-3 max-xl:hidden">
                {nav()}
                <p className="text-center text-xs text-muted-foreground">{ui.tip}</p>
              </div>
            </aside>
          )}

          {/* Back / Next bar below xl: sticky while the stage is on screen, covering nothing but itself */}
          {guided && (
            <div className="sticky bottom-0 z-20 border-t border-border bg-card px-4 py-3 md:-mx-5 md:-mb-5 md:mt-4 md:rounded-b-lg md:px-5 xl:hidden">
              {nav(true)}
            </div>
          )}
        </div>
      </section>
    </TourContext.Provider>
  )
}
