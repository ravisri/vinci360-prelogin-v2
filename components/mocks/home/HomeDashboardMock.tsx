import { BellRing, CalendarDays, ChevronDown, Download, LayoutGrid, Search, Smile } from "lucide-react"

import { HBar } from "@/components/charts/HBar"
import { LineArea } from "@/components/charts/LineArea"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { PostCard } from "@/components/mocks/PostCard"
import { ReachNote } from "@/components/mocks/ReachNote"
import { kpiProps } from "@/components/mocks/home/kpi"
import { home as copy } from "@/content/home"
import { home as data, overview } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const d = data.dashboard
const h = copy.hero
const filterIcons = [CalendarDays, LayoutGrid, Smile]
const SENTIMENTS = ["pos", "neu", "neg"] as const
const topics = data.risingTopics.rows.slice(0, 4)

const caption = `Sample Social Media Intelligence dashboard for the fictional brand ${d.brand}: filters for last 30 days, all keywords and all sentiment; five KPI cards showing ${d.kpis
  .map((k) => `${k.display} ${k.label.toLowerCase()} ${k.trend} ${k.delta.replace(" vs prev.", "")}`)
  .join(", ")}; a 30-day mention volume chart with a sentiment line showing a spike on 1 October; a sentiment split of ${d.sentimentSplit[0]}% positive, ${d.sentimentSplit[1]}% neutral and ${d.sentimentSplit[2]}% negative; and top topics by momentum led by ${topics[0].topic} at ${topics[0].score}.`

/** Home hero: the SMI dashboard frame with hotspots, the alert and post float cards, and the reach note. */
export function HomeDashboardMock() {
  return (
    <div className="relative lg:pb-0">
      <span aria-hidden="true" className="dot-grid absolute -inset-x-4 -top-5 h-50 md:-inset-x-10 md:-top-9 md:h-90" />

      {/* Alert: in flow above the frame below lg, overhanging the top-right corner from lg. */}
      <FloatCard
        enter
        className="mt-0 mb-3 ml-auto w-fit p-3 md:relative md:mb-3 lg:absolute lg:top-21 lg:-right-3 lg:mb-0"
      >
        {/* Two lines so it clears the KPI row it overhangs (no numbers covered). */}
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-lg bg-reports-tint text-reports-text">
            <BellRing className="size-4.5" strokeWidth={2} />
          </span>
          <p className="flex min-w-0 flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{overview.alert.label}</span>
            <span className="text-sm font-bold whitespace-nowrap tabular">
              <span aria-hidden="true" className="text-pos">
                ▲{" "}
              </span>
              <span className="sr-only">Up: </span>
              {overview.alert.text}
            </span>
          </p>
        </div>
      </FloatCard>

      <MockFrame
        chrome={
          <>
            <span className="md:hidden">{h.chromeMobile}</span>
            <span className="max-md:hidden">{h.chrome}</span>
          </>
        }
        caption={caption}
        className="relative lg:h-150 lg:rounded-b-none lg:border-b-0"
        bodyClassName="gap-3 p-3 md:gap-3.5 md:p-5"
      >
        <div className="hidden items-center gap-3.5 md:flex">
          <p className="font-heading text-lg font-bold">{d.title}</p>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold">
            {d.brand}
            <ChevronDown aria-hidden="true" className="size-3.5" strokeWidth={2} />
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold">
            <Download aria-hidden="true" className="size-3.5" strokeWidth={2} />
            {h.export}
          </span>
        </div>

        <ul aria-hidden="true" className="flex gap-2 overflow-hidden text-[0.6875rem] md:text-xs">
          {d.filters.map((f, i) => {
            const Icon = filterIcons[i]
            return (
              <li
                key={f}
                className={cn(
                  "inline-flex flex-none items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold",
                  i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
                )}
              >
                <Icon className="size-3.5" strokeWidth={2} />
                {f}
              </li>
            )
          })}
          <li className="hidden min-w-50 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground md:inline-flex">
            <Search className="size-3.5" strokeWidth={2} />
            {h.search}
          </li>
        </ul>

        <div className="relative mt-2">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-5">
            {d.kpis.map((k, i) => (
              <KpiCard
                key={k.label}
                {...kpiProps(k)}
                delta={
                  <>
                    {k.delta.replace(" vs prev.", "")}
                    <span className="max-lg:hidden"> vs prev.</span>
                  </>
                }
                spark={{ data: d.sparks[i], tone: k.trend === "down" ? "chart-5" : "chart-1", className: "max-lg:hidden" }}
                className={cn(k.label === "Posts" && "max-sm:hidden")}
              />
            ))}
          </div>
          <Hotspot n={1} title={h.hotspots[0].title} text={h.hotspots[0].text} className="top-0 left-1/2 sm:left-1/3 lg:left-1/5" />
        </div>

        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <div className="relative rounded-lg border border-border bg-card p-3 md:p-4">
            <p className="mb-2 text-[0.8125rem] font-semibold">{h.volumeTitle}</p>
            <LineArea
              ariaLabel="Mention volume over 30 days rising from about 1,600 to 2,400 a day, with a spike near 5,600 on 1 October while net sentiment dipped."
              legend
              max={200}
              height={220}
              xLabels={d.volumeAxis}
              annotation={{ index: d.spikeIndex, label: d.spikeNote }}
              data={[
                { label: h.mentions, values: d.volumeSeries, tone: "chart-1", kind: "area" },
                { label: h.net, values: d.netSentimentSeries, tone: "chart-5", kind: "dashed" },
              ]}
            />
            <Hotspot n={2} title={h.hotspots[1].title} text={h.hotspots[1].text} className="top-[58%] left-[44%]" />
          </div>

          <div className="hidden gap-3 md:grid md:grid-cols-2 lg:grid-cols-1 lg:content-start">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="mb-3 text-[0.8125rem] font-semibold">{h.splitTitle}</p>
              <StackedBar100 data={d.sentimentSplit} height={14} labels={false} />
              <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground tabular">
                {SENTIMENTS.map((s, i) => (
                  <li key={s}>
                    {sentimentGlyph[s]} {sentimentLabel[s]} {d.sentimentSplit[i]}%
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-lg border border-border bg-card p-4">
              <p className="mb-3 text-[0.8125rem] font-semibold">{h.platformTitle}</p>
              <HBar
                ariaLabel={`Top topics by momentum: ${topics.map((t) => `${t.topic} ${t.score}`).join(", ")}`}
                labelClassName="w-32"
                max={100}
                data={topics.map((t) => ({ label: t.topic, value: t.score, display: String(t.score) }))}
              />
              <Hotspot n={3} title={h.hotspots[2].title} text={h.hotspots[2].text} className="top-1 right-0 translate-x-0" />
            </div>
          </div>
        </div>
      </MockFrame>

      {/* Post: in flow under the frame below lg (never over the axis labels), overhanging the left edge from lg. */}
      <FloatCard enter className="mr-6 ml-2 md:relative md:mt-3 md:w-80 lg:absolute lg:top-100 lg:-left-3 lg:mt-0 lg:ml-0 hidden">

        <PostCard
          initials={d.feedPost.initials}
          handle={d.feedPost.handle}
          time={d.feedPost.time}
          text={h.postText}
          sentiment={d.feedPost.sentiment}
          engagement={`${d.feedPost.engagement} ${h.engagements}`}
          className="p-0"
        />
      </FloatCard>

      {/* <ReachNote className="mt-3 text-center lg:mt-4" /> */}
    </div>
  )
}
