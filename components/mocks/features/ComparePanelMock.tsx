import { Donut } from "@/components/charts/Donut"
import { HBar } from "@/components/charts/HBar"
import { LineArea } from "@/components/charts/LineArea"
import type { ChartTone } from "@/components/charts/tones"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { featuresOverview as copy, type Panel } from "@/content/features-overview"
import { brands, featuresOverview as data, home } from "@/content/sample-data"

const c = copy.mocks.cmp
const sov = data.compare.shareOfVoice
const v = home.shareOfVoice
const BRANDS = [
  { key: "aurora", tone: "chart-6" },
  { key: "nimbus", tone: "chart-3" },
  { key: "kestrel", tone: "neu" },
] as const satisfies readonly { key: keyof typeof brands; tone: ChartTone }[]

const caption = `Sample Brand Compare page for ${brands.aurora.name} vs ${brands.nimbus.name} and ${brands.kestrel.name}. Share of voice: ${BRANDS.map((b) => `${brands[b.key].short} ${sov[b.key]}%`).join(", ")}. Indexed vs category average 100: ${data.compare.indexVsCategory
  .map((r) => `${r.metric.toLowerCase()} ${BRANDS.map((b) => `${brands[b.key].short} ${r[b.key]}`).join(", ")}`)
  .join(
    "; "
  )}. Over eight weeks Aurora rose from ${v.trend.aurora[0]}% to ${v.trend.aurora[1]}% share, Nimbus fell from ${v.trend.nimbus[0]}% to ${v.trend.nimbus[1]}%, Kestrel from ${v.trend.kestrel[0]}% to ${v.trend.kestrel[1]}%.`

/** Brand Compare tab: share-of-voice donut, indexed comparison, 8-week gap trend and the "Lead over Nimbus" float. */
export function ComparePanelMock({ hotspots }: { hotspots: Panel["hotspots"] }) {
  return (
    <div className="relative">
      <MockFrame chrome={c.chrome} caption={caption} className="relative" bodyClassName="gap-2.5 p-2.5 md:gap-3 md:p-4">
        <div className="grid gap-2.5 sm:grid-cols-[10.625rem_minmax(0,1fr)] md:gap-3">
          <div className="relative flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
            <p className="text-xs font-semibold">{c.sov}</p>
            <Donut
              ariaLabel={`${c.sov}: ${BRANDS.map((b) => `${brands[b.key].short} ${sov[b.key]}%`).join(", ")}`}
              center={`${sov.aurora}%`}
              sub={brands.aurora.short}
              legend
              className="w-28"
              data={BRANDS.map((b) => ({
                label: brands[b.key].short,
                value: sov[b.key],
                tone: b.tone,
              }))}
            />
            <Hotspot n={1} accent="cmp" {...hotspots[0]} className="top-[38%] left-[14%]" />
          </div>

          <div className="relative flex flex-col gap-2 rounded-lg border border-border bg-card p-3 text-[0.71875rem]">
            <p className="text-xs font-semibold">{c.index}</p>
            <dl className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-2.5 gap-y-2">
              {data.compare.indexVsCategory.map((r) => (
                <div key={r.metric} className="contents">
                  <dt className="text-muted-foreground">{r.metric}</dt>
                  <dd>
                    <HBar
                      ariaLabel={`${r.metric}: ${BRANDS.map((b) => `${brands[b.key].short} ${r[b.key]}`).join(", ")}`}
                      max={168}
                      thickness={9}
                      labelClassName="sr-only"
                      className="gap-1 text-[0.71875rem]"
                      data={BRANDS.map((b) => ({
                        label: brands[b.key].short,
                        value: r[b.key],
                        display: String(r[b.key]),
                        tone: b.tone,
                      }))}
                    />
                  </dd>
                </div>
              ))}
            </dl>
            <Hotspot n={2} accent="cmp" {...hotspots[1]} className="top-0 right-0 translate-x-0" />
          </div>
        </div>

        <div className="relative rounded-lg border border-border bg-card p-3">
          <p className="mb-2 text-xs font-semibold">{c.gap}</p>
          <LineArea
            ariaLabel={`Share of voice per week, ${v.axis[0]} to ${v.axis[1]}: Aurora ${v.trend.aurora.join(" to ")}%, Nimbus ${v.trend.nimbus.join(" to ")}%, Kestrel ${v.trend.kestrel.join(" to ")}%`}
            legend
            min={20}
            max={48}
            width={700}
            height={150}
            gridlines={3}
            xLabels={v.axis}
            data={[
              {
                label: `${brands.aurora.short} ${v.trend.aurora[1]}%`,
                values: v.weeks.aurora,
                tone: "chart-6",
                kind: "line",
              },
              {
                label: `${brands.nimbus.short} ${v.trend.nimbus[1]}%`,
                values: v.weeks.nimbus,
                tone: "chart-3",
                kind: "dashed",
              },
              {
                label: `${brands.kestrel.short} ${v.trend.kestrel[1]}%`,
                values: v.weeks.kestrel,
                tone: "neu",
                kind: "dashed",
              },
            ]}
          />
          <Hotspot n={3} accent="cmp" {...hotspots[2]} className="top-0 right-0 translate-x-0 md:right-auto md:left-[62%] md:-translate-x-1/2" />
        </div>
      </MockFrame>

      <FloatCard className="flex flex-col gap-0.5 px-4 py-3 md:relative md:mt-3 md:w-fit lg:absolute lg:-bottom-12 lg:-left-7 lg:mt-0">
        <p className="text-xs text-muted-foreground">{v.callout.label}</p>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-heading text-xl font-extrabold tabular">{v.callout.value}</span>
          <Delta trend="up" className="text-[0.9375rem]">
            {v.callout.delta}
          </Delta>
        </p>
      </FloatCard>
    </div>
  )
}
