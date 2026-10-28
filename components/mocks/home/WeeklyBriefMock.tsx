import { ArrowRight, BellRing } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { home as copy } from "@/content/home"
import { home as data } from "@/content/sample-data"

const b = data.brief
const r = copy.reportsMock

/** Reports & Alerts row: the weekly brief email (light card) and the navy "Alert rule" float. */
export function WeeklyBriefMock() {
  return (
    <VisualPanel accent="reports" dots="tr" className="md:p-10 md:pb-28">
      <figure className="flex flex-col gap-4 rounded-lg bg-card p-5 shadow-card md:w-[86%]">
        <div className="flex flex-col gap-0.5 border-b border-border pb-3 text-xs text-muted-foreground">
          <p>
            <strong className="text-foreground">From:</strong> {r.from}
          </p>
          <p>
            <strong className="text-foreground">Subject:</strong> {r.subject}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-heading text-[1.0625rem] font-extrabold">
            vinci360<span className="text-primary">°</span> {r.brief}
          </p>
          <SampleDataChip tone="light" />
        </div>
        <dl className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-background p-2.5">
            <dt className="text-[0.6875rem] text-muted-foreground">{b.mentions.label}</dt>
            <dd className="font-heading text-lg font-extrabold tabular">{b.mentions.display}</dd>
            <dd className="text-xs">
              <Delta trend={b.mentions.trend}>{b.mentions.delta}</Delta>
            </dd>
          </div>
          <div className="rounded-lg bg-background p-2.5">
            <dt className="text-[0.6875rem] text-muted-foreground">{b.netSentiment.label}</dt>
            <dd className="font-heading text-lg font-extrabold tabular">{b.netSentiment.display}</dd>
            <dd className="text-xs">
              <Delta trend={b.netSentiment.trend}>{b.netSentiment.delta}</Delta>
            </dd>
          </div>
          <div className="min-w-0 rounded-lg bg-background p-2.5">
            <dt className="text-[0.6875rem] text-muted-foreground">{r.topRising}</dt>
            <dd className="text-xs font-bold [overflow-wrap:anywhere]">{b.topRising.tag}</dd>
            <dd className="text-xs">
              <Delta trend={b.topRising.trend}>{b.topRising.delta}</Delta>
            </dd>
          </div>
        </dl>
        <ul className="flex list-disc flex-col gap-1 pl-4 text-[0.8125rem]">
          {r.bullets.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p aria-hidden="true" className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-primary">
          {r.open}
          <ArrowRight className="size-3.5" strokeWidth={2} />
        </p>
        <figcaption className="sr-only">
          {`Sample weekly report email for Aurora Mobile covering 5 to 11 October: ${b.mentions.display} mentions up ${b.mentions.delta}, net sentiment plus 24 down ${b.netSentiment.delta}, top rising topic ${b.topRising.tag}.`}
        </figcaption>
      </figure>

      <FloatCard className="on-dark bg-background text-foreground md:-right-4 md:-bottom-24 md:w-70">
        <AlertRuleCard />
      </FloatCard>
    </VisualPanel>
  )
}

/** Navy alert rule: "When Instagram mentions go above 2× the 7-day average", notify Email + Brand team. */
export function AlertRuleCard() {
  const [when, metric, verb, threshold] = r.rule.parts
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-[0.8125rem] font-bold">
          <BellRing aria-hidden="true" strokeWidth={2} className="size-4 text-magenta-on-dark" />
          {r.rule.title}
        </p>
        <span role="img" aria-label={r.rule.on} className="relative h-5 w-9 rounded-full bg-reports">
          <span className="absolute top-0.5 right-0.5 size-4 rounded-full bg-primary-foreground" />
        </span>
      </div>
      <p className="text-[0.8125rem] leading-[1.45] text-muted-foreground">
        {when} <strong className="text-foreground">{metric}</strong> {verb} <strong className="text-foreground">{threshold}</strong>
      </p>
      <p className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {r.rule.notify}
        {r.rule.channels.map((ch) => (
          <span key={ch} className="rounded-full border border-border bg-card px-2 py-0.5 font-semibold text-foreground">
            {ch}
          </span>
        ))}
      </p>
    </div>
  )
}
