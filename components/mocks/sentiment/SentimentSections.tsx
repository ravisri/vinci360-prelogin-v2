import type { ReactNode } from "react"
import { Info } from "lucide-react"

import { PartHeader } from "@/components/feature-page/PartHeader"
import { WideWalkthroughRow } from "@/components/feature-page/WideWalkthroughRow"
import { ReachNote } from "@/components/mocks/ReachNote"
import { DrillPostsCard } from "@/components/mocks/sentiment/DrillPostsCard"
import { HashtagSentimentWidget } from "@/components/mocks/sentiment/HashtagSentimentWidget"
import { KeywordPicker } from "@/components/mocks/sentiment/KeywordPicker"
import { KeywordTeasers } from "@/components/mocks/sentiment/KeywordTeasers"
import {
  KeywordHashtagsWidget,
  KeywordKpisWidget,
  KeywordPlatformWidget,
  KeywordSentimentWidget,
  KeywordTopicsWidget,
} from "@/components/mocks/sentiment/KeywordWidgets"
import { PlatformSentimentWidget } from "@/components/mocks/sentiment/PlatformSentimentWidget"
import { SentimentExplainer } from "@/components/mocks/sentiment/SentimentExplainer"
import { ThresholdWidget } from "@/components/mocks/sentiment/ThresholdWidget"
import { Reveal } from "@/components/motion/Reveal"
import { FeatureSplit } from "@/components/sections/FeatureSplit"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { sentimentPartA, sentimentPartB } from "@/content/features/sentiment-keywords"
import type { WalkthroughItem } from "@/content/features/types"

const accent = "sent"

/** Mobile wording from the 390 reference where it differs; both versions stay in the HTML. */
function responsive(desktop: string, mobile?: string): ReactNode {
  if (!mobile) return desktop
  return (
    <>
      <span className="md:hidden">{mobile}</span>
      <span className="max-md:hidden">{desktop}</span>
    </>
  )
}

/** Solid-border info line under a block's text ("Audiences behave differently by network…"). */
function InfoPill({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-sent-200 bg-card px-3 py-2.5 text-sm font-semibold">
      <Info aria-hidden="true" strokeWidth={2} className="mt-0.75 size-4 flex-none text-sent-text" />
      {children}
    </p>
  )
}

type BlockProps = {
  item: WalkthroughItem
  n: number
  reverse?: boolean
  dots: "tr" | "bl"
  visual: ReactNode
  note?: ReactNode
}

/** One alternating walkthrough row (text + tinted visual), visual first below md. */
function Block({ item, n, reverse, dots, visual, note }: BlockProps) {
  return (
    <FeatureSplit
      accent={accent}
      badge={n}
      reverse={reverse}
      visualFirstOnMobile
      headingAs="h3"
      title={item.title}
      lead={item.lead}
      tells={{
        label: item.tells.label,
        text: responsive(item.tells.text, item.tells.textMobile),
      }}
      metrics={item.metrics.length ? item.metrics : undefined}
      hint={item.hint ? responsive(item.hint, item.hintMobile) : undefined}
      note={note}
      visual={
        <VisualPanel accent={accent} dots={dots} className="max-md:p-3.5">
          {visual}
        </VisualPanel>
      }
    />
  )
}

/* ------------------------------- Explainer ------------------------------- */
export function SentimentExplainerSection() {
  return (
    <section aria-labelledby="ex-h" className="container-site pt-12 md:pt-24">
      <Reveal>
        <SentimentExplainer />
      </Reveal>
    </section>
  )
}

/* --------------------------- Part A · Sentiment --------------------------- */
export function SentimentPart() {
  const c = sentimentPartA
  const [platform, hashtags, threshold] = c.items
  return (
    <section aria-labelledby="pa-h" className="container-site flex flex-col gap-14 pt-16 md:gap-22 md:pt-24">
      <PartHeader id="pa-h" accent={accent} part={c.part} title={c.title} lead={c.lead} className="max-md:-mb-6" />
      <Block item={platform} n={1} dots="bl" visual={<PlatformSentimentWidget />} note={<InfoPill>{c.platformNote}</InfoPill>} />
      <Block item={hashtags} n={2} reverse dots="tr" visual={<HashtagSentimentWidget />} note={<InfoPill>{c.hashtagNote}</InfoPill>} />
      <Block item={threshold} n={3} dots="bl" visual={<ThresholdWidget />} />
      <DrillPostsCard />
    </section>
  )
}

/* ---------------------------- Part B · Keywords ---------------------------- */
export function KeywordsPart() {
  const c = sentimentPartB
  const [kpis, bars, hashtags, topics] = c.items
  const p = c.platforms
  return (
    <section id="keywords" aria-labelledby="pb-h" className="container-site flex scroll-mt-31 flex-col gap-14 pt-14 md:scroll-mt-21 md:pt-35">
      <div className="flex max-w-190 flex-col gap-3.5">
        <PartHeader id="pb-h" accent={accent} part={c.part} title={c.title} lead={c.lead} />
        <p className="text-[0.9375rem] text-muted-foreground md:hidden">{c.leadMobile}</p>
      </div>
      <Reveal className="-mt-10 md:mt-0">
        <KeywordPicker />
      </Reveal>
      <Block item={kpis} n={1} dots="tr" visual={<KeywordKpisWidget />} note={<ReachNote />} />
      <WideWalkthroughRow
        id="kw-platforms-h"
        accent={accent}
        badge={2}
        size="lg"
        title={p.title}
        lead={responsive(p.lead, p.leadMobile)}
        tells={p.tells}
        aside={
          <ul className="flex max-w-95 flex-wrap gap-1.5">
            {p.metrics.map((m) => (
              <li key={m} className={p.metricsMobile.includes(m) ? undefined : "max-md:hidden"}>
                <ModuleChip accent={accent} label={m} dot={false} />
              </li>
            ))}
          </ul>
        }
        dots="bl"
        panelClassName="max-md:p-3.5 md:p-10"
        visual={<KeywordPlatformWidget />}
      />
      <Block item={bars} n={3} dots="bl" visual={<KeywordSentimentWidget />} />
      <Block item={hashtags} n={4} reverse dots="tr" visual={<KeywordHashtagsWidget />} note={<ReachNote />} />
      <Block item={topics} n={5} dots="bl" visual={<KeywordTopicsWidget />} />
      <KeywordTeasers />
    </section>
  )
}
