import { Bars } from "@/components/charts/Bars"
import { HBar } from "@/components/charts/HBar"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { PostCard } from "@/components/mocks/PostCard"
import { ReachNote } from "@/components/mocks/ReachNote"
import { kpiProps } from "@/components/mocks/home/kpi"
import { featuresOverview as copy, type Panel } from "@/content/features-overview"
import { featuresOverview as data, networks } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = copy.mocks.smi
const w = data.smiWeek

const caption = `Sample Social Media Intelligence page: five KPIs (${data.smiKpis
  .map((k) => `${k.display} ${k.label.toLowerCase()} ${k.trend} ${k.delta.replace(" vs prev.", "")}`)
  .join(
    ", "
  )}), a weekly mention timeline peaking on Saturday with a sentiment dip that day, and a platform breakdown led by Instagram at ${data.platformShare[0].share}%.`

/** SMI tab: 5 KPIs (3 on mobile), week bars with net sentiment, platform breakdown, and the @riya.k post float. */
export function SmiPanelMock({ hotspots }: { hotspots: Panel["hotspots"] }) {
  return (
    <>
      <div className="relative">
        <MockFrame chrome={c.chrome} caption={caption} className="relative" bodyClassName="gap-2 p-2.5 md:gap-3 md:p-4">
          <div className="relative">
            <div className="grid grid-cols-3 gap-1.5 md:grid-cols-5 md:gap-2">
              {data.smiKpis.map((k) => (
                <KpiCard
                  key={k.label}
                  size="sm"
                  {...kpiProps(k)}
                  delta={k.delta.replace(" vs prev.", "")}
                  className={cn(
                    "md:p-2.5 md:[&>p:nth-child(2)]:text-[1.0625rem]",
                    (k.label === "Reach" || k.label === "Posts") && "max-md:hidden",
                    k.label === "Sentiment" && "border-chart-1"
                  )}
                />
              ))}
            </div>
            <Hotspot n={1} accent="smi" {...hotspots[0]} className="top-full left-[26%] md:left-[15.5%]" />
          </div>

          <div className="grid gap-2 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-3">
            <div className="relative rounded-lg border border-border bg-card p-2.5 md:p-3.5">
              <div className="mb-2 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[0.6875rem] text-muted-foreground">
                <span className="text-[0.71875rem] font-semibold text-foreground md:text-[0.8125rem]">
                  <span className="md:hidden">{c.weekMobile}</span>
                  <span className="max-md:hidden">{c.week}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 max-md:hidden">
                  <span aria-hidden="true" className="h-2 w-2.5 rounded-xs bg-chart-1" />
                  {c.mentions}
                </span>
                <span className="inline-flex items-center gap-1.5 max-md:hidden">
                  <svg aria-hidden="true" viewBox="0 0 14 6" className="w-3.5">
                    <line x1="0" y1="3" x2="14" y2="3" strokeWidth="2" strokeDasharray="4 2" className="stroke-chart-5" />
                  </svg>
                  {c.net}
                </span>
              </div>
              <Bars
                ariaLabel="Mentions per day this week, Monday to Sunday, peaking on Saturday while net sentiment dipped that day."
                labels={w.labels}
                labelsShort={w.short}
                data={[{ label: c.mentions, values: w.volume, tone: "chart-1" }]}
                highlight={w.peak}
                highlightTone="on-dark-focus"
                line={{ values: w.net, tone: "chart-5", max: 140 }}
                max={120}
                width={420}
                height={124}
              />
              <Hotspot n={2} accent="smi" {...hotspots[1]} className="top-[46%] left-[64%]" />
            </div>

            <div className="relative rounded-lg border border-border bg-card p-2.5 md:p-3.5">
              <p className="mb-2.5 text-[0.8125rem] font-semibold max-md:hidden">{c.platforms}</p>
              <HBar
                ariaLabel={`${c.platforms}: ${data.platformShare.map((p) => `${networks[p.network]} ${p.share}%`).join(", ")}`}
                labelClassName="w-15 md:w-16"
                data={data.platformShare.map((p) => ({
                  label: networks[p.network],
                  value: p.share,
                  display: `${p.share}%`,
                  icon: <NetworkIcon network={p.network} className="size-3.5 text-foreground md:size-4" />,
                }))}
                className="max-md:[&>div:nth-child(4)]:hidden"
              />
              <Hotspot n={3} accent="smi" {...hotspots[2]} className="top-0 right-0 translate-x-0 max-md:top-full max-md:right-auto max-md:left-[58%]" />
            </div>
          </div>
        </MockFrame>

        <FloatCard className="md:relative md:mt-3 md:w-80 lg:absolute lg:-bottom-28 lg:-left-7 lg:mt-0 lg:w-75">
          <PostCard
            initials={data.post.initials}
            handle={data.post.handle}
            time={data.post.time}
            network={data.post.network}
            text={data.post.text}
            sentiment={data.post.sentiment}
            engagement={`${data.post.engagement} ${c.engagements}`}
            className="p-0"
          />
        </FloatCard>
      </div>

      {/* From lg the post float overhangs the left; the note sits to its right. */}
      <ReachNote className="mt-3 max-md:hidden lg:ml-auto lg:max-w-[calc(100%-18rem)] lg:text-right" />
    </>
  )
}
