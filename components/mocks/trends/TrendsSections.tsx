import type { ReactNode } from "react"
import { Download, Info, Pointer } from "lucide-react"

import { PartHeader } from "@/components/feature-page/PartHeader"
import { WideWalkthroughRow } from "@/components/feature-page/WideWalkthroughRow"
import { ReachNote } from "@/components/mocks/ReachNote"
import { CategoriesWidget } from "@/components/mocks/trends/CategoriesWidget"
import { CompareTopicsWidget } from "@/components/mocks/trends/CompareTopicsWidget"
import { HashtagCloudWidget } from "@/components/mocks/trends/HashtagCloudWidget"
import { HashtagRankingWidget } from "@/components/mocks/trends/HashtagRankingWidget"
import { ScoreboardWidget } from "@/components/mocks/trends/ScoreboardWidget"
import { SelectedTagProvider } from "@/components/mocks/trends/SelectedTagProvider"
import { TagPostsWidget } from "@/components/mocks/trends/TagPostsWidget"
import { TopCards } from "@/components/mocks/trends/TopCards"
import { TopicCloudWidget } from "@/components/mocks/trends/TopicCloudWidget"
import { TopicSentimentWidget } from "@/components/mocks/trends/TopicSentimentWidget"
import { TrendBreakdownWidget } from "@/components/mocks/trends/TrendBreakdownWidget"
import { TrendKpisWidget } from "@/components/mocks/trends/TrendKpisWidget"
import { UsageGrowthWidget } from "@/components/mocks/trends/UsageGrowthWidget"
import { VolumeMomentumChart } from "@/components/mocks/trends/VolumeMomentumChart"
import { Reveal } from "@/components/motion/Reveal"
import { FeatureSplit } from "@/components/sections/FeatureSplit"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { VisualPanel } from "@/components/sections/VisualPanel"
import type { WalkthroughItem } from "@/content/features/types"
import { trendsExplainer, trendsHashtags, trendsTopics } from "@/content/features/trends"

const accent = "trends"

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

/** "Which tags carry the trend…" info pill under a block's text. */
function InfoPill({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex w-fit items-center gap-2 rounded-lg border border-trends-200 bg-card px-3 py-2 text-[0.84375rem] font-semibold">
      <Info aria-hidden="true" strokeWidth={2} className="size-4 flex-none text-trends-text" />
      {children}
    </p>
  )
}

/** Dashed hint used beside a wide block (FeatureSplit draws its own). */
function Hint({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 rounded-lg border border-dashed border-trends-200 bg-card px-3 py-2.5 text-sm text-neutral-text">
      <Pointer aria-hidden="true" strokeWidth={2} className="mt-px size-4.5 flex-none text-trends-text" />
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
  metrics?: readonly (string | { label: string; className?: string })[]
  hintIcon?: typeof Pointer
  note?: ReactNode
}

/** One alternating walkthrough row (text + tinted visual), visual first below md. */
function Block({ item, n, reverse, dots, visual, metrics, hintIcon, note }: BlockProps) {
  const metricList = metrics ?? item.metrics
  return (
    <FeatureSplit
      id={`trends-block-${n}`}
      accent={accent}
      badge={n}
      reverse={reverse}
      visualFirstOnMobile
      headingAs="h3"
      title={item.title}
      lead={item.lead}
      tells={{ label: item.tells.label, text: responsive(item.tells.text, item.tells.textMobile) }}
      metrics={metricList.length ? metricList : undefined}
      hint={item.hint ? responsive(item.hint, item.hintMobile) : undefined}
      hintIcon={hintIcon}
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
export function TrendsExplainer() {
  const c = trendsExplainer
  return (
    <section aria-labelledby="idea-h" className="container-site pt-14 md:pt-24">
      <Reveal className="flex flex-wrap items-center gap-8 rounded-lg border border-border bg-card p-4 md:gap-12 md:p-10">
        <figure className="min-w-0 flex-[1_1_480px]">
          <figcaption className="sr-only">{c.chart.caption}</figcaption>
          <VolumeMomentumChart />
        </figure>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4.5">
          <h2 id="idea-h" className="text-h3 md:text-h2">
            {c.title}
          </h2>
          <dl className="flex flex-col gap-3.5">
            {c.terms.map((t) => (
              <div key={t.term} className="grid grid-cols-[2px_1fr] gap-x-3.5 text-[0.9375rem]">
                <span aria-hidden="true" className="rounded-xs bg-trends" />
                <div>
                  <dt className="font-bold">{t.term}</dt>
                  <dd className="text-muted-foreground">{t.text}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="rounded-lg bg-trends-tint px-3.5 py-3 text-[0.90625rem] text-neutral-text">{c.note}</p>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------------------------- Part A · Topics ---------------------------- */
export function TrendsTopicsPart() {
  const c = trendsTopics
  const [scoreboard, kpis, breakdown, categories, sentiment, cloud] = c.items
  return (
    <section id="topics" aria-labelledby="pa-h" className="container-site flex scroll-mt-31 flex-col gap-14 pt-12 md:scroll-mt-21 md:gap-22 md:pt-24">
      <PartHeader
        id="pa-h"
        accent={accent}
        part={c.part}
        title={c.title}
        lead={c.lead}
        journey={{ label: c.journeyLabel, steps: c.journey }}
        className="max-md:-mb-10.5"
      />
      <Block
        item={scoreboard}
        n={1}
        dots="tr"
        visual={<ScoreboardWidget />}
        metrics={scoreboard.metrics.map((m) => (c.scoreboardMetricsMobile.includes(m) ? m : { label: m, className: "max-md:hidden" }))}
      />
      <Block item={kpis} n={2} reverse dots="bl" visual={<TrendKpisWidget />} note={<ReachNote />} />
      <Block item={breakdown} n={3} dots="tr" visual={<TrendBreakdownWidget />} note={<InfoPill>{c.breakdownNote}</InfoPill>} />
      <Block item={categories} n={4} reverse dots="bl" visual={<CategoriesWidget />} note={<InfoPill>{c.categoriesNote}</InfoPill>} />
      <Block item={sentiment} n={5} dots="tr" visual={<TopicSentimentWidget />} />
      <Block item={cloud} n={6} reverse dots="bl" visual={<TopicCloudWidget />} />
      <WideWalkthroughRow
        id="trends-compare-h"
        accent={accent}
        badge={7}
        size="lg"
        title={c.compare.title}
        lead={c.compare.lead}
        tells={c.compare.tells}
        aside={
          <ul className="flex flex-wrap gap-1.5">
            {c.compare.metrics.map((m) => (
              <li key={m}>
                <ModuleChip accent={accent} label={m} dot={false} />
              </li>
            ))}
          </ul>
        }
        panelClassName="md:p-10"
        visual={<CompareTopicsWidget />}
      />
    </section>
  )
}

/* --------------------------- Part B · Hashtags --------------------------- */
export function TrendsHashtagsPart() {
  const c = trendsHashtags
  const [usageGrowth, cloud, posts] = c.items
  return (
    <section id="hashtags" aria-labelledby="pb-h" className="container-site flex scroll-mt-31 flex-col gap-14 pt-14 md:scroll-mt-21 md:gap-22 md:pt-35">
      <PartHeader id="pb-h" accent={accent} part={c.part} title={c.title} lead={c.lead} className="max-md:-mb-10.5" />
      <SelectedTagProvider>
        <div className="flex flex-col gap-14 md:gap-22">
          <WideWalkthroughRow
            id="trends-ranking-h"
            accent={accent}
            badge={1}
            title={c.ranking.title}
            lead={c.ranking.lead}
            tells={c.ranking.tells}
            note={<TopCards className="md:hidden" />}
            aside={<Hint>{responsive(c.ranking.hint, c.ranking.hintMobile)}</Hint>}
            dots="none"
            visual={<HashtagRankingWidget />}
          />
          <Block item={usageGrowth} n={2} dots="bl" visual={<UsageGrowthWidget />} note={<TopCards className="max-md:hidden" />} />
          <Block item={cloud} n={3} reverse dots="tr" hintIcon={Download} visual={<HashtagCloudWidget />} />
          <Block item={posts} n={4} dots="bl" visual={<TagPostsWidget />} />
        </div>
      </SelectedTagProvider>
    </section>
  )
}
