import { Bookmark, CalendarDays } from "lucide-react"

import { Bars } from "@/components/charts/Bars"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { PostCard } from "@/components/mocks/PostCard"
import { fmt, kpiProps } from "@/components/mocks/home/kpi"
import { darkCard, frameChip } from "@/components/mocks/smi/styles"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { smiHero as c } from "@/content/features/smi"
import { smi, type Kpi } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const k = smi.kpis
const kpis = [k.mentions, k.engagement, k.reach, k.posts, k.sentiment]
/** The 390 reference keeps three cards: Mentions, Engagement, Sentiment. */
const mobileHidden = new Set<Kpi>([k.reach, k.posts])
const w = smi.timeline.daily
const post = smi.articles[0]

/**
 * SMI hero: dashboard window with the five KPI cards and this week's mentions (Tuesday spike, tone
 * line dipping), two hotspots, and the negative post behind the spike floating over the corner.
 */
export function SmiHeroMock() {
  return (
    <VisualPanel accent="smi" dots="br" className="md:pb-14">
      <div className="relative md:w-[94%]">
        <MockFrame
          chrome={
            <>
              <span className="max-md:hidden">{c.chrome}</span>
              {c.module}
            </>
          }
          caption={`Sample Social Media Intelligence dashboard for Aurora Mobile, last 30 days: ${kpis.map((x) => `${x.label} ${x.display}, ${x.trend} ${x.delta}`).join("; ")}. ${c.barsTitle} by day: ${w.labels.map((d, i) => `${d} ${fmt(w.volume[i])}`).join(", ")}. The Tuesday spike was mostly negative: net sentiment fell to ${w.net[w.spike]}.`}
          bodyClassName="gap-2.5 p-3 md:p-3.5"
        >
          <div className="flex items-center gap-2 max-md:hidden">
            <span className="font-heading text-[0.9375rem] font-bold">{c.module}</span>
            <span className={frameChip}>
              <CalendarDays aria-hidden="true" strokeWidth={2} className="size-3.25" />
              {c.range}
            </span>
            <span className={cn(frameChip, "ml-auto")}>
              <Bookmark aria-hidden="true" strokeWidth={2} className="size-3.25" />
              <span className="text-muted-foreground">{c.savedView.label}</span> {c.savedView.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className={cn(frameChip, "md:hidden")}>{c.range}</span>
            {c.filters.map((f) => (
              <span key={f.label} className={cn(frameChip, f.desktopOnly && "max-md:hidden")}>
                <span className="text-muted-foreground">{f.label}</span> {f.value}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5 md:grid-cols-5">
            {kpis.map((x) => (
              <KpiCard
                key={x.label}
                size="sm"
                {...kpiProps(x)}
                label={x === k.sentiment ? "Sentiment" : x.label}
                delta={x.delta.replace(" vs prev.", "")}
                className={cn(mobileHidden.has(x) && "max-md:hidden")}
              />
            ))}
          </div>
          <div className={cn(darkCard, "relative p-2.5")}>
            <p className="mb-1.5 text-[0.71875rem] font-semibold max-md:hidden">{c.barsTitle}</p>
            <Bars
              ariaLabel={`${c.barsTitle}: ${w.labels.map((d, i) => `${d} ${fmt(w.volume[i])}`).join(", ")}; net sentiment dips on Tuesday.`}
              labels={w.labels}
              data={[{ label: "Mentions", values: w.volume, tone: "chart-1" }]}
              highlight={w.spike}
              line={{ values: w.net, tone: "chart-5", max: 32 }}
              axis={false}
              height={100}
            />
            {/* On top of Tuesday's spike bar (the chart draws no numbers or axis labels). */}
            <Hotspot n={2} accent="smi" title={c.hotspots[1].title} text={c.hotspots[1].text} className="top-5 left-[22%] md:top-10" />
          </div>
        </MockFrame>
        {/* On the frame's left edge beside the KPI strip: the dot sits in the body padding, clear of the card labels. */}
        <Hotspot n={1} accent="smi" title={c.hotspots[0].title} text={c.hotspots[0].text} className="top-27 left-0 md:top-40" />
      </div>
      <FloatCard enter className="md:-right-3 md:-bottom-6 md:w-70 hidden">
        <PostCard
          initials={post.initials}
          handle={post.handle}
          time={c.post.time}
          text={c.post.text}
          sentiment="neg"
          engagement={c.post.engagement}
          className="p-0 max-md:[&_footer>span:last-child]:hidden"
        />
      </FloatCard>
    </VisualPanel>
  )
}
