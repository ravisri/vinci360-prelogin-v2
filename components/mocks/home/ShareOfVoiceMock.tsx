import { Donut } from "@/components/charts/Donut"
import { LineArea } from "@/components/charts/LineArea"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { home as copy } from "@/content/home"
import { brands, home as data } from "@/content/sample-data"

const v = data.shareOfVoice

/** Brand Compare feature row: share-of-voice donut + 8-week lines and the "Lead over Nimbus" float. */
export function ShareOfVoiceMock() {
  return (
    <VisualPanel accent="cmp" dots="tl" className="md:p-10 md:pb-20">
      <MockFrame
        title={v.label}
        caption={`Sample share of voice: ${brands.aurora.name} ${v.current.aurora}%, ${brands.nimbus.name} ${v.current.nimbus}%, ${brands.kestrel.name} ${v.current.kestrel}%. Over eight weeks Aurora rose from ${v.trend.aurora[0]}% to ${v.trend.aurora[1]}% while Nimbus fell from ${v.trend.nimbus[0]}% to ${v.trend.nimbus[1]}% and Kestrel from ${v.trend.kestrel[0]}% to ${v.trend.kestrel[1]}%.`}
        className="md:ml-auto md:w-[90%]"
      >
        <div className="grid items-center gap-4 sm:grid-cols-[9.5rem_minmax(0,1fr)]">
          <Donut
            ariaLabel={`Share of voice: Aurora ${v.current.aurora}%, Nimbus ${v.current.nimbus}%, Kestrel ${v.current.kestrel}%`}
            center={`${v.current.aurora}%`}
            sub={brands.aurora.short}
            legend
            className="w-30"
            data={[
              { label: brands.aurora.short, value: v.current.aurora, tone: "chart-6" },
              { label: brands.nimbus.short, value: v.current.nimbus, tone: "chart-3" },
              { label: brands.kestrel.short, value: v.current.kestrel, tone: "neu" },
            ]}
          />
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-2 text-xs font-semibold">{copy.compareMock.lineTitle}</p>
            <LineArea
              ariaLabel={`Share of voice per week, ${v.axis[0]} to ${v.axis[1]}: Aurora ${v.trend.aurora.join(" to ")}%, Nimbus ${v.trend.nimbus.join(" to ")}%, Kestrel ${v.trend.kestrel.join(" to ")}%`}
              legend
              max={50}
              width={280}
              height={120}
              gridlines={3}
              xLabels={v.axis}
              data={[
                { label: brands.aurora.short, values: v.weeks.aurora, tone: "chart-6", kind: "line" },
                { label: brands.nimbus.short, values: v.weeks.nimbus, tone: "chart-3", kind: "dashed" },
                { label: brands.kestrel.short, values: v.weeks.kestrel, tone: "neu", kind: "dashed" },
              ]}
            />
          </div>
        </div>
      </MockFrame>

      <FloatCard className="md:-bottom-14 md:-left-3.5 md:w-fit">
        <p className="text-xs text-muted-foreground">{v.callout.label}</p>
        <p className="flex items-baseline gap-2">
          <span className="font-heading text-xl font-extrabold tabular">{v.callout.value}</span>
          <Delta trend="up" className="text-base">
            {v.callout.delta}
          </Delta>
        </p>
      </FloatCard>
    </VisualPanel>
  )
}
