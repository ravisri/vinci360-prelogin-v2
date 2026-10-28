import { Fragment } from "react"
import { KeyRound, Mail } from "lucide-react"

import { DrawPath } from "@/components/motion/DrawPath"
import { Reveal } from "@/components/motion/Reveal"
import { Delta } from "@/components/mocks/Delta"
import { plainChip, tintChip } from "@/components/mocks/reports/styles"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { reportsFlow as c } from "@/content/features/reports-alerts"
import { reports } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const e = reports.email
const circled = (i: number) => String.fromCharCode(0x2460 + i)

/** Small decorative illustration above each step (the step title says it all). */
const illustrations = [
  <div key="subject" className="flex h-27.5 flex-col justify-center gap-2 rounded-lg bg-background p-3">
    <span className="flex items-center gap-1.5 rounded-sm border-[1.5px] border-reports-text bg-card px-2.5 py-2 text-xs font-semibold">
      <KeyRound strokeWidth={2} className="size-3.5 text-reports-text" />
      {c.keyword}
    </span>
    <span className="flex gap-1.5">
      <span className={tintChip}>{c.kinds[0]}</span>
      <span className={plainChip}>{c.kinds[1]}</span>
    </span>
  </div>,
  <div key="period" className="grid h-27.5 place-items-center rounded-lg bg-background p-3">
    <span className="flex overflow-hidden rounded-sm border border-border bg-card text-xs font-semibold">
      {c.periods.map((p, i) => (
        <span key={p} className={cn("px-2.5 py-2", i === 1 && "bg-reports-text text-primary-foreground")}>
          {p}
        </span>
      ))}
    </span>
  </div>,
  <div key="format" className="flex h-27.5 flex-wrap content-center justify-center gap-1.5 rounded-lg bg-background p-3">
    {c.formats.map((f) => (
      <span key={f.label} className={f.on ? tintChip : plainChip}>
        {f.on ? `✓ ${f.label}` : f.label}
      </span>
    ))}
  </div>,
  <div key="email" className="flex h-27.5 flex-col justify-center gap-1.5 rounded-lg bg-background p-2.5 tabular">
    <span className="flex items-center gap-1.5 text-[0.71875rem] font-bold">
      <Mail strokeWidth={2} className="size-3.5 text-reports-text" />
      {c.email}
    </span>
    <span className="flex justify-between rounded-[6px] bg-card px-2 py-1.5 text-[0.6875rem]">
      {e.mentions.label} {e.mentions.display}
      <Delta trend={e.mentions.trend}>{e.mentions.delta}</Delta>
    </span>
    <span className="flex justify-between rounded-[6px] bg-card px-2 py-1.5 text-[0.6875rem]">
      {e.netSentiment.label} {e.netSentiment.display}
      <Delta trend={e.netSentiment.trend}>{e.netSentiment.delta}</Delta>
    </span>
  </div>,
]

/** Arrow between two steps; drawn after the previous one (right from lg, down below it). */
function Connector({ i }: { i: number }) {
  return (
    <li aria-hidden="true" className="grid place-items-center py-1 text-reports-text lg:py-0">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="size-5.5 stroke-current max-lg:rotate-90">
        <DrawPath d="M4 12 H19 M13 6 L19 12 L13 18" duration={0.6} delay={0.3 + i * 0.5} />
      </svg>
    </li>
  )
}

function Step({ i, title }: { i: number; title: string }) {
  return (
    <>
      <div aria-hidden="true">{illustrations[i]}</div>
      <h3 className="text-base font-bold">
        <span aria-hidden="true" className="text-reports-text">
          {circled(i)}
        </span>{" "}
        <span className="sr-only">Step {i + 1}: </span>
        {title}
      </h3>
    </>
  )
}

/**
 * "From screen to inbox": subject → period → format → the email. The connectors draw one after
 * another, then the email card slides in last.
 */
export function ReportsFlow() {
  const last = c.steps.length - 1
  return (
    <section aria-labelledby="flow-h" className="container-site pt-16 md:pt-24">
      <Reveal className="flex flex-col gap-7">
        <SectionHeader id="flow-h" title={c.title} />
        <ol className="grid gap-0 lg:grid-cols-[1fr_2rem_1fr_2rem_1fr_2rem_1fr]">
          {c.steps.map((title, i) => (
            <Fragment key={title}>
              {i > 0 && <Connector i={i - 1} />}
              <li className="flex">
                {i === last ? (
                  <Reveal preset="slideInLate" className="flex flex-1 flex-col gap-3 rounded-lg bg-card p-4.5 shadow-card">
                    <Step i={i} title={title} />
                  </Reveal>
                ) : (
                  <div className="flex flex-1 flex-col gap-3 rounded-lg bg-card p-4.5 shadow-card">
                    <Step i={i} title={title} />
                  </div>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
        <p className="self-start rounded-lg bg-reports-tint px-4 py-3 text-[0.9375rem] text-neutral-text">{c.note}</p>
      </Reveal>
    </section>
  )
}
