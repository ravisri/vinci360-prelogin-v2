import { Newspaper, Sparkles } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { aiChipDark, aiChipLight, candidateChip, evTile, kwChip, tagChip } from "@/components/mocks/stories/styles"
import { darkCard } from "@/components/mocks/smi/styles"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { storiesHero as c, storiesLabels as l } from "@/content/features/promotable-stories"
import { stories } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const [lead, second] = stories.candidates
const n = (v: number) => new Intl.NumberFormat("en-GB").format(v)
const compact = (v: number) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v)

/** "AI-generated suggestions" chip beside the module chip in the hero. */
export function StoriesAiChip() {
  return (
    <span className={aiChipLight}>
      <Sparkles aria-hidden="true" strokeWidth={2} className="size-3" />
      {l.aiPlural}
    </span>
  )
}

/**
 * Promotable Stories hero: two story candidates, the first with its headline, sources, evidence and
 * the Accept / Dismiss actions. Hotspot 1 sits at the end of the chip row and hotspot 2 beside the
 * actions, so neither covers the headline or a number.
 */
export function StoriesHeroMock() {
  return (
    <VisualPanel accent="stories" dots="tr" className="max-md:pb-16.5 md:pb-15">
      <MockFrame
        chrome={
          <>
            <span className="max-md:hidden">{c.chrome}</span>
            {c.module}
          </>
        }
        caption={c.caption}
        className="md:w-[94%]"
        bodyClassName="gap-2.5 p-3 md:p-3.5"
      >
        <div className={cn(darkCard, "relative flex flex-col gap-2.5 border-stories p-3 md:p-3.5")}>
          <div className="relative flex flex-wrap items-center gap-2">
            <span className={cn(candidateChip, "max-md:hidden")}>{l.candidate(1)}</span>
            <span className={aiChipDark}>
              <Sparkles aria-hidden="true" strokeWidth={2} className="size-2.75" />
              {l.ai}
            </span>
            <Hotspot n={1} accent="stories" {...c.hotspots[0]} className="top-1/2 left-[88%]" />
          </div>
          <p className="font-heading text-base leading-[1.25] font-extrabold md:text-lg">{lead.title}</p>
          <div className="relative">
            <ul className="flex flex-wrap gap-1.5">
              {lead.tags.slice(0, 2).map((t) => (
                <li key={t} className={tagChip}>
                  {t}
                </li>
              ))}
              <li className={cn(kwChip, "max-md:hidden")}>{lead.keywords[0]}</li>
            </ul>
            <Hotspot n={2} accent="stories" {...c.hotspots[1]} className="top-1/2 left-[88%]" />
          </div>
          <dl className="grid grid-cols-3 gap-1.5 tabular">
            <div className={evTile}>
              <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.volume}</dt>
              <dd className="text-sm font-bold md:text-[0.9375rem]">{n(lead.volume)}</dd>
            </div>
            <div className={evTile}>
              <dt className="text-[0.65625rem] text-muted-foreground">
                <span className="md:hidden">{c.stats.engagementShort}</span>
                <span className="max-md:hidden">{c.stats.engagement}</span>
              </dt>
              <dd className="text-sm font-bold md:text-[0.9375rem]">{compact(lead.engagement)}</dd>
            </div>
            <div className={evTile}>
              <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.sentiment}</dt>
              <dd>
                <Delta trend="up" className="text-sm font-bold md:text-[0.9375rem]">
                  {lead.split[0]}%
                </Delta>
              </dd>
            </div>
          </dl>
          <div aria-hidden="true" className="relative flex gap-2 text-[0.8125rem] font-semibold">
            <span className="inline-flex min-h-9 items-center justify-center rounded-sm bg-primary px-3.5 text-primary-foreground max-md:flex-1">{l.accept}</span>
            <span className="inline-flex min-h-9 items-center justify-center rounded-sm border border-border px-3.5 max-md:flex-1">{l.dismiss}</span>
          </div>
        </div>
        <div className={cn(darkCard, "flex items-center justify-between gap-2.5 px-3.5 py-3 max-md:hidden")}>
          <span className="text-[0.8125rem] font-semibold">{second.title}</span>
          <span className="flex-none text-[0.71875rem] text-muted-foreground tabular">
            {n(second.volume)} {l.posts} ·{" "}
            <Delta trend="up">
              {second.split[0]}% {l.positive}
            </Delta>
          </span>
        </div>
      </MockFrame>
      <FloatCard enter className="flex items-center gap-2 px-3.5 py-2.5 max-md:absolute max-md:inset-x-0 max-md:-bottom-12.5 max-md:mt-0 md:-bottom-11 md:-left-3">
        <Newspaper aria-hidden="true" strokeWidth={2} className="size-4 flex-none text-stories-text" />
        <span className="text-[0.84375rem] font-bold">{c.float}</span>
      </FloatCard>
    </VisualPanel>
  )
}
