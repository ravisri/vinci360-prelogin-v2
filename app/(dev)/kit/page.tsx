import type { ReactNode } from "react"
import { Hash, Mail, TrendingUp } from "lucide-react"

import { Bars } from "@/components/charts/Bars"
import { Donut } from "@/components/charts/Donut"
import { HBar } from "@/components/charts/HBar"
import { LineArea } from "@/components/charts/LineArea"
import { SentimentLegend, StackedBar100 } from "@/components/charts/StackedBar100"
import { Sparkline } from "@/components/charts/Sparkline"
import { TagCloud } from "@/components/charts/TagCloud"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { PostCard } from "@/components/mocks/PostCard"
import { ReachNote } from "@/components/mocks/ReachNote"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { BenefitList } from "@/components/sections/BenefitList"
import { CtaBand } from "@/components/sections/CtaBand"
import { FaqAccordion } from "@/components/sections/FaqAccordion"
import { FeatureSplit } from "@/components/sections/FeatureSplit"
import { Hero } from "@/components/sections/Hero"
import { HowToUse } from "@/components/sections/HowToUse"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { OutcomeGrid } from "@/components/sections/OutcomeGrid"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { ProofPlaceholder } from "@/components/sections/ProofPlaceholder"
import { RelatedModules } from "@/components/sections/RelatedModules"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { WhoOpensThisPage } from "@/components/sections/WhoOpensThisPage"
import { kit } from "@/content/kit"
import { features } from "@/content/navigation"
import { home, kpis30d, smi, trends, type Kpi } from "@/content/sample-data"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: kit.title,
  description: "Internal showcase of the vinci360° shared sections, dashboard mocks and SVG charts, rendered with reference copy and sample data for review.",
  path: "/kit",
  noindex: true,
})

const compact: Intl.NumberFormatOptions = { notation: "compact", maximumFractionDigits: 2 }
const kpiProps = (k: Kpi) => ({
  label: k.label,
  value: k.value,
  format: k.value >= 1_000_000 ? compact : undefined,
  suffix: k.display.includes("/") ? k.display.slice(k.display.indexOf("/")) : undefined,
  delta: k.delta,
  trend: k.trend,
})
const fiveKpis = [kpis30d.mentions, kpis30d.engagement, kpis30d.reach, kpis30d.posts, kpis30d.sentiment]
const fmt = (n: number) => new Intl.NumberFormat("en-GB").format(n)

/** Dev-only label naming the component below it (not a heading, so page outline stays clean). */
function KitLabel({ children }: { children: ReactNode }) {
  return <p className="container-site mb-3 text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">{children}</p>
}

function KitBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-border pt-8">
      <KitLabel>{label}</KitLabel>
      {children}
    </div>
  )
}

export default function KitPage() {
  const w = smi.timeline.daily
  return (
    <>
      <div className="container-site pt-10 pb-6">
        <h1 className="text-h1-m md:text-h1-compact">{kit.title}</h1>
        <p className="mt-2 text-muted-foreground">{kit.intro}</p>
      </div>

      {/* ------------------------------ Sections ------------------------------ */}
      <KitBlock label="Hero · split (feature template) · VisualPanel · MockFrame · KpiCard · Bars · FloatCard + PostCard · Hotspot · metrics line">
        <Hero
          breadcrumb={kit.hero.breadcrumb}
          chip={{ label: kit.hero.chip, accent: "smi", variant: "solid" }}
          title={kit.hero.title}
          lead={kit.hero.lead}
          primary={kit.hero.primary}
          secondary={kit.hero.secondary}
          trailing={<p className="text-sm text-muted-foreground">{kit.hero.metricsLine}</p>}
          visual={
            <VisualPanel accent="smi" dots="br" className="md:pb-14">
              <div className="relative md:w-[94%]">
                <MockFrame
                  chrome={kit.hero.chrome}
                  caption={`Sample Social Media Intelligence dashboard for Aurora Mobile, last 30 days: ${fiveKpis.map((k) => `${k.label} ${k.display}, ${k.trend} ${k.delta}`).join("; ")}. Mentions this week by day: ${w.labels.map((d, i) => `${d} ${fmt(w.volume[i])}`).join(", ")}; Tuesday is a spike with net sentiment ${w.net[1]}.`}
                  bodyClassName="gap-2.5 p-3 md:p-4"
                >
                  <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
                    {fiveKpis.map((k) => (
                      <KpiCard key={k.label} size="sm" {...kpiProps(k)} delta={k.delta.replace(" vs prev.", "")} />
                    ))}
                  </div>
                  <div className="relative rounded-lg border border-border bg-card p-2.5">
                    <p className="mb-1.5 text-[0.71875rem] font-semibold">{kit.hero.barsTitle}</p>
                    <Bars
                      ariaLabel={`${kit.hero.barsTitle}: ${w.labels.map((d, i) => `${d} ${fmt(w.volume[i])}`).join(", ")}`}
                      labels={w.labels}
                      data={[{ label: kit.charts.mentions, values: w.volume, tone: "chart-1" }]}
                      highlight={1}
                      line={{ values: w.net, tone: "chart-5", max: 32 }}
                      height={90}
                    />
                    <Hotspot n={2} accent="smi" title={kit.hero.hotspots[1].title} text={kit.hero.hotspots[1].text} className="top-4 right-0" />
                  </div>
                </MockFrame>
                <Hotspot n={1} accent="smi" title={kit.hero.hotspots[0].title} text={kit.hero.hotspots[0].text} className="top-11 left-[2%] md:top-12.5" />
              </div>
              <FloatCard className="md:-right-3 md:-bottom-6 md:w-70">
                <PostCard
                  initials={smi.articles[0].initials}
                  handle={smi.articles[0].handle}
                  time={kit.hero.post.time}
                  text={kit.hero.post.text}
                  sentiment="neg"
                  engagement={kit.hero.post.engagement}
                  className="p-0"
                />
              </FloatCard>
            </VisualPanel>
          }
        />
      </KitBlock>

      <KitBlock label="SectionHeader">
        <div className="container-site flex flex-col gap-10">
          <SectionHeader title={kit.sectionHeader.title} lead={kit.sectionHeader.lead} />
        </div>
      </KitBlock>

      <KitBlock label="ModuleChip · tint / solid / outline · all seven accents">
        <div className="container-site flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <ModuleChip key={f.accent} accent={f.accent} label={f.label} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ModuleChip accent="smi" variant="solid" size="md" label={features[0].label} />
            <ModuleChip accent="trends" size="md" bordered label={features[1].label} />
            <span className="rounded-lg bg-trends px-4 py-3 text-ink">
              <ModuleChip accent="trends" variant="outline" label="Trending Topics" />
            </span>
          </div>
        </div>
      </KitBlock>

      <KitBlock label="FeatureSplit · chip + BenefitList + Explore (reverse)">
        <div className="container-site">
          <FeatureSplit
            reverse
            accent="trends"
            chip={kit.featureRow.chip}
            title={kit.featureRow.title}
            lead={kit.featureRow.lead}
            benefits={kit.featureRow.benefits}
            action={kit.featureRow.action}
            visual={
              <VisualPanel accent="trends" dots="bl">
                <MockFrame
                  title={kit.featureRow.frameTitle}
                  caption={`Sample topic leaderboard ranked by momentum: ${home.risingTopics.rows.map((r) => `${r.topic} ${r.score}, ${r.trend} ${r.move}`).join("; ")}.`}
                  className="md:ml-auto md:w-[90%]"
                >
                  <ol className="flex flex-col text-xs">
                    {home.risingTopics.rows.map((r) => (
                      <li key={r.rank} className="grid grid-cols-[20px_1fr_40px_48px] items-center gap-2 border-b border-border py-2 last:border-0">
                        <span className="text-muted-foreground tabular">{r.rank}</span>
                        <span className="truncate font-semibold">{r.topic}</span>
                        <span className="text-right font-bold tabular">{r.score}</span>
                        <Delta trend={r.trend} className="text-right">
                          {r.move}
                        </Delta>
                      </li>
                    ))}
                  </ol>
                </MockFrame>
              </VisualPanel>
            }
          />
        </div>
      </KitBlock>

      <KitBlock label="FeatureSplit · walkthrough row (badge, tells, metrics, hint)">
        <div className="container-site">
          <FeatureSplit
            accent="smi"
            badge={1}
            visualFirstOnMobile
            title={kit.walkthrough.title}
            lead={kit.walkthrough.lead}
            tells={kit.walkthrough.tells}
            metrics={kit.walkthrough.metrics}
            hint={kit.walkthrough.hint}
            note={<ReachNote />}
            visual={
              <VisualPanel accent="smi" dots="tr">
                <MockFrame
                  title={kit.walkthrough.title}
                  caption={`Sample KPI cards, last 30 days: ${fiveKpis.map((k) => `${k.label} ${k.display}, ${k.trend} ${k.delta}`).join("; ")}.`}
                >
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {fiveKpis.map((k, i) => (
                      <KpiCard
                        key={k.label}
                        size="md"
                        selected={i === 0}
                        {...kpiProps(k)}
                        delta={k.delta.replace(" vs prev.", "")}
                        spark={i === 0 ? { data: smi.mentionsSpark } : undefined}
                      />
                    ))}
                  </div>
                </MockFrame>
              </VisualPanel>
            }
          />
        </div>
      </KitBlock>

      <KitBlock label="BenefitList · 2 columns">
        <div className="container-site flex flex-col gap-8">
          <SectionHeader title={kit.builtIn.title} />
          <BenefitList items={kit.builtIn.items} accent="smi" />
        </div>
      </KitBlock>

      <KitBlock label="WhoOpensThisPage">
        <WhoOpensThisPage title={kit.who.title} items={kit.who.items} accent="smi" />
      </KitBlock>

      <KitBlock label="HowToUse">
        <HowToUse
          title={kit.howTo.title}
          accent="smi"
          className="pt-0 md:pt-0"
          steps={[
            {
              ...kit.howTo.steps[0],
              illustration: (
                <div className="flex flex-col gap-2">
                  <span className="rounded-sm border border-border bg-card px-3 py-2 text-xs font-semibold">{kit.howTo.search}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {kit.howTo.scopes.map((s, i) => (
                      <span key={s} className={i ? "rounded-full border border-border bg-card px-2 py-0.5 text-[0.6875rem]" : "rounded-full bg-primary px-2 py-0.5 text-[0.6875rem] font-semibold text-primary-foreground"}>
                        {s}
                      </span>
                    ))}
                  </span>
                </div>
              ),
            },
            {
              ...kit.howTo.steps[1],
              illustration: (
                <div className="flex h-full flex-col justify-between">
                  <span className="flex gap-1.5">
                    <span className="h-7.5 flex-1 rounded-sm border border-border bg-card" />
                    <span className="h-7.5 flex-1 rounded-sm border border-border bg-card" />
                    <span className="h-7.5 flex-1 rounded-sm border border-border bg-card" />
                  </span>
                  <Sparkline data={smi.mentionsSpark} className="w-full" width={200} height={40} strokeWidth={2.5} />
                </div>
              ),
            },
            {
              ...kit.howTo.steps[2],
              illustration: (
                <div className="flex flex-col gap-2">
                  {(["neg", "pos"] as const).map((s) => (
                    <span key={s} className="flex items-center gap-2 rounded-sm bg-card px-2 py-1.5">
                      <span className="size-5 rounded-full bg-primary-tint" />
                      <span className="h-1.5 flex-1 rounded-full bg-border" />
                      <SentimentChip sentiment={s} short />
                    </span>
                  ))}
                  <span className="flex gap-1.5">
                    {kit.howTo.actions.map((a) => (
                      <span key={a} className="rounded-full border border-border bg-card px-2 py-0.5 text-[0.6875rem] font-semibold">
                        {a}
                      </span>
                    ))}
                  </span>
                </div>
              ),
            },
          ]}
        />
      </KitBlock>

      <KitBlock label="OutcomeGrid">
        <OutcomeGrid title={kit.outcomes.title} items={kit.outcomes.items} accent="smi" className="pt-0 md:pt-0" />
      </KitBlock>

      <KitBlock label="RelatedModules">
        <RelatedModules
          title={kit.related.title}
          className="pt-0 md:pt-0"
          items={[
            { ...kit.related.items[0], thumbnail: <TrendingUp className="size-12" strokeWidth={2.5} /> },
            {
              ...kit.related.items[1],
              thumbnail: (
                <span className="flex w-3/4 flex-col gap-2">
                  <span className="flex h-3 gap-0.5 overflow-hidden rounded-full">
                    <span className="w-[55%] bg-sent-text" />
                    <span className="w-1/4 bg-sent-300" />
                    <span className="w-1/5 bg-sent-200" />
                  </span>
                  <span className="flex h-3 gap-0.5 overflow-hidden rounded-full">
                    <span className="w-[35%] bg-sent-text" />
                    <span className="w-[30%] bg-sent-300" />
                    <span className="w-[35%] bg-sent-200" />
                  </span>
                </span>
              ),
            },
            { ...kit.related.items[2], thumbnail: <Mail className="size-12" strokeWidth={2} /> },
          ]}
        />
      </KitBlock>

      <KitBlock label="PlaceholderBlock · PlaceholderInline">
        <div className="container-site flex flex-col gap-4">
          <ProofPlaceholder {...kit.proof} />
          <p>
            <PlaceholderInline>{kit.proof.cite}</PlaceholderInline>
          </p>
        </div>
      </KitBlock>

      <KitBlock label="FaqAccordion (+ FAQPage JSON-LD)">
        <FaqAccordion title={kit.faq.title} items={kit.faq.items} className="pt-0 md:pt-0" />
      </KitBlock>

      <KitBlock label="CtaBand">
        <CtaBand {...kit.cta} />
      </KitBlock>

      {/* ------------------------------- Mocks -------------------------------- */}
      <KitBlock label="KpiCard (lg) · SampleDataChip · SentimentChip · Delta · PostCard (dark) · FloatCard · ReachNote">
        <div className="container-site flex flex-col gap-6">
          <MockFrame
            chrome={kit.hero.chrome}
            caption={`Sample KPI row and posts: ${fiveKpis.map((k) => `${k.label} ${k.display}`).join(", ")}; three recent posts with sentiment.`}
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {fiveKpis.map((k) => (
                <KpiCard key={k.label} {...kpiProps(k)} spark={k === kpis30d.mentions ? { data: smi.mentionsSpark } : { data: trends.mentionsSpark, tone: k.trend === "down" ? "chart-5" : "chart-1" }} />
              ))}
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {smi.articles.map((p) => (
                <PostCard
                  key={p.handle}
                  tone="dark"
                  initials={p.initials}
                  handle={p.handle}
                  time={p.time}
                  text={p.text}
                  sentiment={p.sentiment}
                  metrics={{ likes: fmt(p.likes), comments: fmt(p.comments), shares: fmt(p.shares), views: p.views }}
                  linkLabel="View original"
                />
              ))}
            </div>
          </MockFrame>
          <div className="flex flex-wrap items-center gap-3">
            <SampleDataChip tone="light" />
            <SentimentChip sentiment="pos" />
            <SentimentChip sentiment="neu" />
            <SentimentChip sentiment="neg" />
            <Delta trend="up">18.4% vs prev.</Delta>
            <Delta trend="down">3 pts vs prev.</Delta>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
            <FloatCard className="md:static md:w-fit">
              <p className="flex items-center gap-2 text-[0.8125rem] font-bold">
                <TrendingUp aria-hidden="true" strokeWidth={2.2} className="size-4 text-neg" />
                {kit.floats.spike}
              </p>
            </FloatCard>
            <FloatCard float className="md:static md:w-fit">
              <p className="flex items-center gap-2.5">
                <Hash aria-hidden="true" strokeWidth={2} className="size-4.5 text-trends-text" />
                <span className="font-heading text-base font-extrabold">{kit.floats.hashtag.tag}</span>
                <Delta trend="up" className="text-sm">
                  {kit.floats.hashtag.growth}
                </Delta>
              </p>
            </FloatCard>
            <FloatCard className="md:static md:w-fit">
              <p className="text-xs text-muted-foreground">{kit.floats.stat.label}</p>
              <p className="flex items-baseline gap-2">
                <span className="font-heading text-xl font-extrabold tabular">{kit.floats.stat.value}</span>
                <Delta trend="up" className="text-xs">
                  {kit.floats.stat.delta}
                </Delta>
              </p>
            </FloatCard>
          </div>
          <ReachNote />
        </div>
      </KitBlock>

      {/* ------------------------------- Charts ------------------------------- */}
      <KitBlock label="Charts · LineArea · Bars (grouped) · HBar · StackedBar100 · Sparkline · Donut · TagCloud">
        <div className="container-site grid gap-5 pb-24 md:grid-cols-2">
          <MockFrame
            title="LineArea"
            caption={`Sample mentions volume over 30 days, ${home.dashboard.volumeAxis[0]} to ${home.dashboard.volumeAxis.at(-1)}, with net sentiment dashed; a spike on day 19: ${home.dashboard.spikeNote}.`}
          >
            <LineArea
              ariaLabel={`Mentions and net sentiment, ${home.dashboard.volumeAxis[0]} to ${home.dashboard.volumeAxis.at(-1)}. ${home.dashboard.spikeNote}.`}
              legend
              max={200}
              xLabels={home.dashboard.volumeAxis}
              annotation={{ index: home.dashboard.spikeIndex, label: home.dashboard.spikeNote }}
              data={[
                { label: kit.charts.volume, values: home.dashboard.volumeSeries, tone: "chart-1", kind: "area" },
                { label: kit.charts.net, values: home.dashboard.netSentimentSeries, tone: "chart-5", kind: "dashed" },
              ]}
            />
          </MockFrame>

          <MockFrame
            title="Bars · grouped"
            caption={`Sample share of mentions and engagement by topic: ${smi.topicBreakdown.map((p) => `${p.topic} ${p.share}% and ${p.engagementShare}%`).join("; ")}.`}
          >
            <Bars
              ariaLabel={`Mentions and engagement share by topic: ${smi.topicBreakdown.map((p) => `${p.topic} ${p.share}% / ${p.engagementShare}%`).join(", ")}`}
              legend
              width={480}
              height={140}
              labels={smi.topicBreakdown.map((p) => p.topic)}
              data={[
                { label: kit.charts.mentions, values: smi.topicBreakdown.map((p) => p.share), tone: "chart-1" },
                { label: kit.charts.engagement, values: smi.topicBreakdown.map((p) => p.engagementShare), tone: "chart-4" },
              ]}
              valueLabels={[smi.topicBreakdown.map((p) => `${p.share}%`), smi.topicBreakdown.map((p) => `${p.engagementShare}%`)]}
            />
          </MockFrame>

          <MockFrame
            title="HBar"
            caption={`Sample top topics by momentum: ${home.risingTopics.rows.slice(0, 4).map((t) => `${t.topic} ${t.score}`).join(", ")}. Overall sentiment: positive ${fmt(smi.sentiment.counts[0])}, neutral ${fmt(smi.sentiment.counts[1])}, negative ${fmt(smi.sentiment.counts[2])}.`}
          >
            <HBar
              ariaLabel={kit.charts.platformShare}
              labelClassName="w-32"
              max={100}
              data={home.risingTopics.rows.slice(0, 4).map((t) => ({ label: t.topic, value: t.score, display: String(t.score) }))}
            />
            <HBar
              ariaLabel={kit.charts.overall}
              thickness={14}
              labelClassName="w-21.5"
              className="mt-2"
              data={[
                { label: "▲ Positive", value: smi.sentiment.counts[0], display: fmt(smi.sentiment.counts[0]), tone: "pos" },
                { label: "– Neutral", value: smi.sentiment.counts[1], display: fmt(smi.sentiment.counts[1]), tone: "neu" },
                { label: "▼ Negative", value: smi.sentiment.counts[2], display: fmt(smi.sentiment.counts[2]), tone: "neg" },
              ]}
            />
          </MockFrame>

          <MockFrame
            title="StackedBar100"
            caption={`Sample sentiment by topic: ${smi.topics.map((t) => `${t.topic} positive ${t.split[0]}%, neutral ${t.split[1]}%, negative ${t.split[2]}%`).join("; ")}.`}
          >
            <ul className="flex flex-col gap-2.5">
              {smi.topics.map((t, i) => (
                <li key={t.topic} className="grid grid-cols-[120px_1fr] items-center gap-3 text-xs">
                  <span className="truncate font-semibold">{t.topic}</span>
                  <StackedBar100 data={t.split} height={18} highlight={i === 3} />
                </li>
              ))}
            </ul>
            <SentimentLegend />
          </MockFrame>

          <MockFrame title="Donut · Sparkline" caption={`Sample share of voice: Aurora ${home.shareOfVoice.current.aurora}%, Nimbus ${home.shareOfVoice.current.nimbus}%, Kestrel ${home.shareOfVoice.current.kestrel}%.`}>
            <div className="flex flex-wrap items-start gap-8">
              <div className="w-40">
                <Donut
                  ariaLabel={`${kit.charts.shareOfVoice}: Aurora ${home.shareOfVoice.current.aurora}%, Nimbus ${home.shareOfVoice.current.nimbus}%, Kestrel ${home.shareOfVoice.current.kestrel}%`}
                  center={`${home.shareOfVoice.current.aurora}%`}
                  sub="Aurora"
                  legend
                  data={[
                    { label: "Aurora Mobile", value: home.shareOfVoice.current.aurora, tone: "chart-6" },
                    { label: "Nimbus", value: home.shareOfVoice.current.nimbus, tone: "chart-3" },
                    { label: "Kestrel", value: home.shareOfVoice.current.kestrel, tone: "neu" },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-3">
                  <Sparkline ariaLabel={kit.charts.sparkline} data={smi.mentionsSpark} />
                  SMI
                </span>
                <span className="flex items-center gap-3">
                  <Sparkline ariaLabel={kit.charts.sparkline} data={trends.mentionsSpark} tone="trends" />
                  Trends
                </span>
                <span className="flex items-center gap-3">
                  <Sparkline ariaLabel="#AuroraLaunch usage trend" data={trends.auroraLaunchSpark} tone="trends" width={64} height={18} />
                  #AuroraLaunch
                </span>
              </div>
            </div>
          </MockFrame>

          <MockFrame
            title="TagCloud"
            caption={`Sample hashtag cloud, size shows volume: ${smi.hashtagCloud.map((t) => `${t.term} ${t.sentiment}`).join(", ")}. Topic cloud: ${trends.topicCloud.map((t) => `${t.term} ${t.sentiment}`).join(", ")}.`}
          >
            <TagCloud ariaLabel={kit.charts.hashtags} data={smi.hashtagCloud} />
            <TagCloud ariaLabel={kit.charts.topicCloud} data={trends.topicCloud} align="center" className="border-t border-border pt-3" />
          </MockFrame>
        </div>
      </KitBlock>
    </>
  )
}
