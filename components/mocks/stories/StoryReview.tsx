"use client"

import { useRef, useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "motion/react"
import { CalendarPlus, Check, ChevronDown, ListChecks, MoveHorizontal, ShieldCheck, Sparkles, Undo2, X } from "lucide-react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { PostCard } from "@/components/mocks/PostCard"
import { ReachNote } from "@/components/mocks/ReachNote"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { aiChipDark, candidateChip, darkAction, evTile, kwChip, priorityChip, tagChip } from "@/components/mocks/stories/styles"
import { CountUp } from "@/components/motion/CountUp"
import { Reveal } from "@/components/motion/Reveal"
import { storiesLabels as l, storiesReview as c } from "@/content/features/promotable-stories"
import { stories, type StoryCandidate } from "@/content/sample-data"
import { fadeIn, panelIn } from "@/lib/motion"
import { cn } from "@/lib/utils"

const list = stories.candidates
const compact = { notation: "compact", maximumFractionDigits: 1 } as const
const n = (v: number) => new Intl.NumberFormat("en-GB").format(v)
const date = stories.calendarDate

type Flags = Record<number, boolean>

function without(flags: Flags, i: number): Flags {
  const next = { ...flags }
  delete next[i]
  return next
}

function Evidence({ s }: { s: StoryCandidate }) {
  const tiles = [
    { label: c.evidence.volume, value: <CountUp value={s.volume} from="previous" />, delta: `▲ ${s.volumeDelta}% ${c.postsDelta}` },
    { label: c.evidence.engagement, value: <CountUp value={s.engagement} format={compact} locale="en-US" from="previous" />, delta: `▲ ${s.engagementDelta}%` },
    { label: c.evidence.reach, value: <CountUp value={s.reach} format={compact} locale="en-US" from="previous" />, delta: `▲ ${s.reachDelta}%` },
    {
      label: c.evidence.sentiment,
      value: (
        <span className="text-pos">
          <span aria-hidden="true">▲ </span>
          <CountUp value={s.split[0]} from="previous" />%<span className="sr-only"> {l.positive}</span>
        </span>
      ),
      delta: (
        <>
          <span className="md:hidden">{l.positive}</span>
          <span className="max-md:hidden">▲ {c.pts(s.sentimentDelta)}</span>
        </>
      ),
    },
  ]
  return (
    <dl className="grid grid-cols-2 gap-2 tabular md:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.label} className={evTile}>
          <dt className="text-[0.6875rem] text-muted-foreground">{t.label}</dt>
          <dd className="font-heading text-base font-bold md:text-[1.1875rem]">{t.value}</dd>
          <dd className="text-[0.6875rem] font-semibold text-pos">{t.delta}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * "Review a story candidate": candidate list (a swipe strip below md) and the open candidate with its
 * evidence, representative posts and the Accept / Dismiss / Export decision. Every choice animates the
 * state change and is announced in a polite live region; accepted ideas collect in the shortlist.
 */
export function StoryReview() {
  const reduced = useReducedMotion()
  const [sel, setSel] = useState(0)
  const [accepted, setAccepted] = useState<Flags>({})
  const [order, setOrder] = useState<number[]>([])
  const [gone, setGone] = useState<Flags>({})
  const [exported, setExported] = useState<Flags>({})
  const [showAll, setShowAll] = useState(false)
  const [message, setMessage] = useState("")
  /** 390 only: the detail is a sheet that can be closed and reopened from a card. */
  const [open, setOpen] = useState(true)
  const cards = useRef<(HTMLButtonElement | null)[]>([])

  const s = list[sel]
  const isAccepted = !!accepted[sel]
  const isGone = !!gone[sel]
  const isExported = !!exported[sel]

  const pick = (i: number) => {
    setSel(i)
    setShowAll(false)
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
    cards.current[sel]?.focus()
  }
  const accept = (i: number) => {
    if (accepted[i]) {
      setAccepted(without(accepted, i))
      setOrder(order.filter((x) => x !== i))
      setMessage(c.announce.unaccepted(list[i].title))
    } else {
      setAccepted({ ...accepted, [i]: true })
      setOrder([...order, i])
      setGone(without(gone, i))
      setMessage(c.announce.accepted(list[i].title))
    }
  }
  const dismiss = (i: number) => {
    if (gone[i]) {
      setGone(without(gone, i))
      setMessage(c.announce.restored(list[i].title))
    } else {
      setGone({ ...gone, [i]: true })
      setAccepted(without(accepted, i))
      setOrder(order.filter((x) => x !== i))
      setMessage(c.announce.dismissed(list[i].title))
    }
  }
  const exportTo = (i: number) => {
    setExported({ ...exported, [i]: !exported[i] })
    setMessage(exported[i] ? c.announce.unexported(list[i].title) : c.announce.exported(list[i].title, date))
  }

  return (
    <section id="review" aria-labelledby="rev-h" className="pt-16 md:container-site md:pt-24">
      <Reveal className="on-dark relative flex flex-col gap-6 overflow-hidden bg-background py-7 text-foreground md:rounded-lg md:p-10">
        <span aria-hidden="true" className="dot-grid-dark absolute top-0 right-0 h-50 w-80 max-md:hidden" />
        <p aria-live="polite" className="sr-only">
          {message}
        </p>

        <div className="relative flex flex-wrap items-end justify-between gap-4 max-md:px-4">
          <div className="flex flex-col gap-2">
            <span className={cn(candidateChip, "self-start max-md:hidden")}>{c.chip}</span>
            <h2 id="rev-h" className="text-h4 md:text-h2">
              {c.title}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              <span className="md:hidden">{c.leadMobile}</span>
              <span className="max-md:hidden">{c.lead}</span>
            </p>
          </div>
          <SampleDataChip className="text-xs" />
        </div>

        <div className="relative grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
          <nav aria-label={c.listLabel} className="min-w-0">
            <ul className="flex gap-2.5 max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-2 max-md:scrollbar-none md:flex-col">
              {list.map((x, i) => {
                const on = sel === i
                return (
                  <m.li
                    key={x.title}
                    animate={{ opacity: gone[i] ? 0.6 : 1 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                    className="flex flex-col gap-1 max-md:w-65 max-md:flex-none max-md:snap-start"
                  >
                    <button
                      ref={(el) => {
                        cards.current[i] = el
                      }}
                      type="button"
                      aria-current={on ? "true" : undefined}
                      onClick={() => pick(i)}
                      className={cn(
                        "flex h-full w-full cursor-pointer flex-col gap-1.5 rounded-lg border bg-card p-3.5 text-left transition-colors hover:border-stories",
                        on ? "border-stories inset-ring-1 inset-ring-stories max-md:border-2" : "border-border",
                      )}
                    >
                      <span className="flex items-start justify-between gap-2">
                        <span className={cn("text-sm leading-[1.3] font-bold", gone[i] && "line-through")}>{x.title}</span>
                        <span className={cn("flex-none rounded-full border px-2 py-0.5 text-[0.65625rem] font-semibold max-md:hidden", priorityChip[x.priority])}>
                          {x.priority}
                          <span className="sr-only"> priority</span>
                        </span>
                      </span>
                      <span className="flex flex-wrap items-center gap-3 text-[0.71875rem] text-muted-foreground tabular">
                        <span>
                          {n(x.volume)} {l.posts}
                        </span>
                        <span>
                          {new Intl.NumberFormat("en-US", compact).format(x.engagement)} {l.eng}
                        </span>
                        <span className="rounded-full border border-current px-1.75 py-px text-[0.625rem] font-semibold text-pos">▲ {x.split[0]}% Positive</span>
                      </span>
                      <AnimatePresence initial={false}>
                        {accepted[i] && (
                          <m.span key="in" variants={fadeIn} initial="hidden" animate="show" exit="hidden" className="text-[0.6875rem] font-bold text-pos">
                            <span className="md:hidden">{c.inShortlistShort}</span>
                            <span className="max-md:hidden">{c.inShortlist}</span>
                          </m.span>
                        )}
                      </AnimatePresence>
                      {gone[i] && <span className="sr-only">, dismissed</span>}
                    </button>
                    {gone[i] && (
                      <span className="flex items-center gap-2 pl-1.5 text-xs text-muted-foreground max-md:hidden">
                        {c.dismissed}
                        <button
                          type="button"
                          onClick={() => dismiss(i)}
                          className="inline-flex min-h-8 cursor-pointer items-center gap-1 font-semibold text-on-dark-focus underline"
                        >
                          <Undo2 aria-hidden="true" strokeWidth={2} className="size-3.25" />
                          {c.undo}
                          <span className="sr-only"> {x.title}</span>
                        </button>
                      </span>
                    )}
                  </m.li>
                )
              })}
            </ul>
            <p className="mt-1 flex items-center gap-1.5 px-4 text-[0.71875rem] text-muted-foreground md:hidden">
              <MoveHorizontal aria-hidden="true" strokeWidth={2} className="size-3.5" />
              {c.swipe} {c.shortlistCount(order.length)}
            </p>
          </nav>

          <AnimatePresence mode="wait" initial={false}>
            <m.article
              key={sel}
              variants={panelIn}
              initial="hidden"
              animate="show"
              exit="hidden"
              aria-labelledby="cd-title"
              className={cn(
                "flex min-w-0 flex-col gap-3 border border-border bg-card max-md:mx-2 max-md:rounded-t-[1.25rem] max-md:rounded-b-lg max-md:px-3.5 max-md:pt-2.5 max-md:pb-4 md:gap-4.5 md:rounded-lg md:p-6",
                !open && "max-md:hidden",
              )}
            >
              <span aria-hidden="true" className="h-1 w-10 self-center rounded-full bg-border md:hidden" />
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn(candidateChip, "max-md:hidden")}>{c.candidateOf(sel + 1, list.length)}</span>
                <span className={aiChipDark}>
                  <Sparkles aria-hidden="true" strokeWidth={2} className="size-2.75" />
                  {l.ai}
                </span>
                <span className={cn("ml-auto rounded-full border px-2.5 py-0.5 text-xs font-semibold max-md:hidden", priorityChip[s.priority])}>{c.priority(s.priority)}</span>
                <button
                  type="button"
                  onClick={close}
                  aria-label={c.close}
                  className="ml-auto grid size-11 cursor-pointer place-items-center rounded-full bg-border text-foreground md:hidden"
                >
                  <X aria-hidden="true" strokeWidth={2.4} className="size-4" />
                </button>
              </div>
              <div>
                <span className="block text-xs text-muted-foreground max-md:sr-only">{c.headline}</span>
                <h3 id="cd-title" className="text-[1.1875rem] leading-[1.25] md:mt-1 md:text-[1.625rem] md:leading-[1.2]">
                  {s.title}
                </h3>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground max-md:sr-only">{c.builtFrom}</span>
                <ul className="flex flex-wrap gap-1.5">
                  {s.tags.map((t, i) => (
                    <li key={t} className={cn(tagChip, i > 1 && "max-md:hidden")}>
                      {t}
                    </li>
                  ))}
                  {s.keywords.map((k) => (
                    <li key={k} className={cn(kwChip, "max-md:hidden")}>
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
              <Evidence s={s} />
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-col gap-1.5 max-md:hidden">
                  <StackedBar100 data={s.split} height={12} labels={false} />
                  <p className="text-[0.71875rem] text-muted-foreground tabular">
                    {c.split(...s.split)} · <sup>*</sup>
                    {c.reachShort}
                  </p>
                </div>
                <ReachNote className="text-[0.65625rem] md:hidden" />
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-[0.8125rem] font-bold md:text-[0.9375rem]">
                    {c.representative}
                    <span className="md:hidden"> · {c.supportingInline(s.support)}</span>
                  </h4>
                  <span className="rounded-full border border-stories px-2.5 py-1 text-xs font-bold text-amber-on-dark tabular max-md:hidden">{c.supporting(s.support)}</span>
                </div>
                {s.posts.slice(0, 2).map((p) => (
                  <div key={`m-${p.handle}`} className="flex items-center gap-2 rounded-sm bg-background p-2 text-[0.78125rem] md:hidden">
                    <span aria-hidden="true" className="grid size-6.5 flex-none place-items-center rounded-full bg-border text-[0.625rem] font-bold">
                      {p.initials}
                    </span>
                    <span className="min-w-0 flex-1">“{p.text}”</span>
                    <SentimentChip sentiment="pos" short className="text-[0.625rem]" />
                  </div>
                ))}
                {s.posts.map((p, i) => (
                  <PostCard
                    key={p.handle + i}
                    tone="dark"
                    initials={p.initials}
                    handle={p.handle}
                    network={p.network}
                    text={p.text}
                    sentiment="pos"
                    metrics={{ likes: p.likes, comments: p.comments, shares: p.shares }}
                    linkLabel={l.viewOriginal}
                    className="bg-background max-md:hidden"
                  />
                ))}
                <button
                  type="button"
                  aria-expanded={showAll}
                  aria-controls="cd-more"
                  onClick={() => setShowAll(!showAll)}
                  className="flex min-h-11 max-md:hidden cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-border text-[0.8125rem] font-semibold text-on-dark-strong"
                >
                  {showAll ? c.hideAll : c.showAll(s.support)}
                  <ChevronDown aria-hidden="true" strokeWidth={2} className={cn("size-3.5 transition-transform", showAll && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {showAll && (
                    <m.ul
                      id="cd-more"
                      variants={panelIn}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="flex flex-col gap-1.5 rounded-lg bg-background px-3.5 py-3 text-[0.78125rem] tabular max-md:hidden"
                    >
                      {s.more.map((q) => (
                        <li key={q} className="flex gap-2">
                          <span aria-hidden="true" className="text-pos">
                            ▲
                          </span>
                          {q}
                        </li>
                      ))}
                      <li className="text-muted-foreground">{c.andMore(s.support - 6)}</li>
                    </m.ul>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 md:border-t md:border-border md:pt-4 max-md:flex-col max-md:items-stretch max-md:gap-2">
                <button
                  type="button"
                  aria-pressed={isAccepted}
                  onClick={() => accept(sel)}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-sm px-5 text-[0.9375rem] font-semibold transition-colors",
                    isAccepted ? "bg-pos text-ink" : "bg-primary text-primary-foreground hover:bg-primary-700",
                  )}
                >
                  <m.span key={String(isAccepted)} initial={reduced ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}>
                    <Check aria-hidden="true" strokeWidth={2.4} className="size-4.5" />
                  </m.span>
                  {isAccepted ? c.accepted : l.accept}
                </button>
                <div className="flex gap-2.5 max-md:gap-2">
                  <button type="button" aria-pressed={isGone} onClick={() => dismiss(sel)} className={cn(darkAction, "max-md:flex-1")}>
                    {isGone ? <Undo2 aria-hidden="true" strokeWidth={2} className="size-4.5" /> : <X aria-hidden="true" strokeWidth={2} className="size-4.5" />}
                    {isGone ? c.undoDismiss : l.dismiss}
                    <span className="sr-only"> {s.title}</span>
                  </button>
                  <button type="button" aria-pressed={isExported} onClick={() => exportTo(sel)} className={cn(darkAction, "border-stories text-amber-on-dark max-md:flex-[1.4]")}>
                    <CalendarPlus aria-hidden="true" strokeWidth={2} className="size-4.5" />
                    {isExported ? (
                      c.exported(date)
                    ) : (
                      <>
                        <span className="md:hidden">{c.exportShort}</span>
                        <span className="max-md:hidden">{c.exportLabel}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </m.article>
          </AnimatePresence>
        </div>

        <div className="relative flex flex-wrap items-center gap-3.5 rounded-lg border border-border bg-card px-4.5 py-3.5 max-md:hidden">
          <ListChecks aria-hidden="true" strokeWidth={2} className="size-4.5 text-amber-on-dark" />
          <span className="text-sm font-semibold">{c.shortlistTitle}</span>
          <span className={cn(candidateChip, "text-[0.78125rem] tabular")}>{c.shortlistCount(order.length)}</span>
          <ul className="flex flex-wrap gap-1.5">
            <AnimatePresence initial={false}>
              {order.map((i) => (
                <m.li
                  key={i}
                  variants={fadeIn}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="inline-flex items-center gap-1 rounded-full border border-pos px-2.5 py-1 text-xs font-semibold text-pos"
                >
                  <Check aria-hidden="true" strokeWidth={2.6} className="size-3" />
                  {list[i].short}
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </Reveal>

      <Reveal className="mt-5 hidden items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 md:inline-flex">
        <ShieldCheck aria-hidden="true" strokeWidth={2} className="size-5 flex-none text-stories-text" />
        <span className="text-[0.9375rem] font-semibold">{c.trust}</span>
      </Reveal>
    </section>
  )
}
