import { Fragment } from "react"

import { DrawPath } from "@/components/motion/DrawPath"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { candidateChip } from "@/components/mocks/stories/styles"
import { storiesFlow as c, storiesLabels as l } from "@/content/features/promotable-stories"
import { stories } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const lead = stories.candidates[0]
const n = (v: number) => new Intl.NumberFormat("en-GB").format(v)
const compact = (v: number) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v)
const circled = (i: number) => String.fromCharCode(0x2460 + i)

/** Small decorative illustration above each step (the step text says it all). */
const illustrations = [
  <div key="tags" className="on-dark flex h-30 flex-col justify-center gap-1.5 rounded-lg bg-background p-2.5 text-[0.71875rem] text-foreground tabular">
    {stories.flowTags.map((t, i) => (
      <span key={t.tag} className="flex justify-between">
        <span>
          {i + 1} {t.tag}
        </span>
        <span className="text-pos">▲ {t.growth}%</span>
      </span>
    ))}
  </div>,
  <div key="posts" className="relative h-30">
    <span className="absolute top-0 right-0 left-4 h-10 rounded-sm bg-border" />
    <span className="absolute inset-x-2 top-5 h-11 rounded-sm bg-border" />
    <span className="absolute top-11 right-4 left-0 flex items-center gap-1.5 rounded-sm border border-border bg-card p-2.5 text-[0.71875rem]">
      <span className="size-5 flex-none rounded-full bg-stories-tint" />
      {c.quote}
    </span>
  </div>,
  <div key="candidate" className="flex h-30 flex-col justify-center gap-1.5 rounded-lg border-2 border-stories bg-stories-tint p-2.5">
    <span className={cn(candidateChip, "self-start text-[0.65625rem]")}>{c.chip}</span>
    <strong className="text-[0.8125rem] leading-[1.3]">{lead.title}</strong>
    <span className="text-[0.6875rem] text-neutral-text tabular">
      {n(lead.volume)} {l.posts} · {compact(lead.engagement)} · ▲ {lead.split[0]}%
    </span>
  </div>,
  <div key="decide" className="flex h-30 flex-col justify-center gap-1.5 text-[0.78125rem] font-semibold">
    {c.actions.map((a, i) => (
      <span
        key={a}
        className={cn("flex min-h-8 items-center justify-center rounded-sm px-3", i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card")}
      >
        {a}
      </span>
    ))}
  </div>,
]

/** Arrow between two steps; drawn after the previous one (right from lg, down below it). */
function Connector({ i }: { i: number }) {
  return (
    <li aria-hidden="true" className="grid place-items-center py-1 text-stories-text lg:py-0">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="size-5.5 stroke-current max-lg:rotate-90">
        <DrawPath d="M4 12 H19 M13 6 L19 12 L13 18" duration={0.6} delay={0.3 + i * 0.5} />
      </svg>
    </li>
  )
}

/** "From monitoring to material": hashtags → conversations → story candidate → your decision. */
export function StoriesFlow() {
  return (
    <section aria-labelledby="flow-h" className="container-site pt-16 md:pt-24">
      <Reveal className="flex flex-col gap-7">
        <SectionHeader id="flow-h" title={c.title} />
        <ol className="grid gap-0 lg:grid-cols-[1fr_2rem_1fr_2rem_1fr_2rem_1fr]">
          {c.steps.map((step, i) => (
            <Fragment key={step.title}>
              {i > 0 && <Connector i={i - 1} />}
              <li className="flex flex-col gap-3 rounded-lg bg-card p-4.5 shadow-card">
                <div aria-hidden="true">{illustrations[i]}</div>
                <h3 className="text-base font-bold">
                  <span aria-hidden="true" className="text-stories-text">
                    {circled(i)}
                  </span>{" "}
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </li>
            </Fragment>
          ))}
        </ol>
        <p className="self-start rounded-lg bg-stories-tint px-4 py-3 text-[0.9375rem] text-neutral-text">{c.note}</p>
      </Reveal>
    </section>
  )
}
