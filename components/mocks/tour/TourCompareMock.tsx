"use client"

import { useState } from "react"
import { Target } from "lucide-react"

import { Donut } from "@/components/charts/Donut"
import { HBar } from "@/components/charts/HBar"
import { LineArea } from "@/components/charts/LineArea"
import { tones, type ChartTone } from "@/components/charts/tones"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Panel, TourFrame, TourHotspot } from "@/components/mocks/tour/TourFrame"
import { useTour } from "@/components/sections/tour/tour-context"
import { brands, tour, type TourMetric } from "@/content/sample-data"
import { tourPage } from "@/content/tour"
import { cn } from "@/lib/utils"

const step = tourPage.steps[0]
const c = tourPage.mocks.compare
/** Aurora, Nimbus, Kestrel, as in the tour reference. */
const TONES: ChartTone[] = ["chart-6", "chart-3", "chart-5"]
const names = tour.brandOrder.map((b) => brands[b])

/** Step 1 · Brand Compare: share-of-voice donut, indexed comparison, gap trend and figure table. "Try this": the Metric chip. */
export function TourCompareMock() {
  const { range } = useTour()
  const [metric, setMetric] = useState<TourMetric>("mentions")
  const sov = tour.shareOfVoice[metric][range]
  const gap = tour.gap[metric]
  const all = gap.flat()
  const lead = tour.shareOfVoice.engagement[range][1] - tour.shareOfVoice.engagement[range][0]
  const metricName = c.metrics[metric]
  const filters = step.filters.map((f) =>
    f.label === "Metric" ? { ...f, value: metricName, onClick: () => setMetric((m) => (m === "mentions" ? "engagement" : "mentions")) } : f
  )

  return (
    <TourFrame
      step={step}
      filters={filters}
      float={
        <FloatCard className="flex items-start gap-2.5 px-3.5 py-3 md:relative md:mt-3.5 xl:absolute xl:top-37.5 xl:-right-3.5 xl:mt-0 xl:w-57.5">
          <span aria-hidden="true" className="grid size-7.5 flex-none place-items-center rounded-sm bg-cmp-tint text-cmp-text">
            <Target strokeWidth={2} className="size-4" />
          </span>
          <span className="text-sm leading-[1.4] tabular xl:text-[0.8125rem]">
            <strong className="block">{c.insight(lead)}</strong>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {c.insightMeta} · {tour.rangesShort[range]}
            </span>
          </span>
        </FloatCard>
      }
    >
      <div className="grid grid-cols-[14.375rem_minmax(0,1fr)] gap-2.5 md:grid-cols-[15.625rem_minmax(0,1fr)]">
        <Panel title={`${c.sov} · ${metricName}`}>
          <div className="flex items-center gap-3">
            <Donut
              key={`${metric}-${range}`}
              ariaLabel={`${c.sov} by ${metricName.toLowerCase()}: ${names.map((b, i) => `${b.short} ${sov[i]}%`).join(", ")}`}
              center={`${sov[0]}%`}
              sub={names[0].short}
              gap={2}
              className="w-24 md:w-27"
              data={names.map((b, i) => ({ label: b.short, value: sov[i], tone: TONES[i] }))}
            />
            <ul aria-hidden="true" className="flex flex-1 flex-col gap-1.5 text-xs">
              {names.map((b, i) => (
                <li key={b.short} className="flex items-center gap-1.5">
                  <span className={cn("size-2 rounded-xs", tones[TONES[i]].bg)} />
                  {b.short}
                  <strong className="ml-auto">{sov[i]}%</strong>
                </li>
              ))}
              <li className="border-t border-border pt-1 text-[0.6875rem] text-muted-foreground max-md:hidden">{c.total}</li>
            </ul>
          </div>
          <TourHotspot step={step} i={0} className="top-[62%] left-5" />
        </Panel>

        <Panel className="text-[0.71875rem] max-md:hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.78125rem] font-semibold">{c.index}</p>
            <ul aria-hidden="true" className="flex gap-2.5 text-[0.6875rem] text-muted-foreground">
              {names.map((b, i) => (
                <li key={b.short}>
                  ■ <span className={tones[TONES[i]].text}>{b.short}</span>
                </li>
              ))}
            </ul>
          </div>
          <dl className="grid grid-cols-[5.375rem_minmax(0,1fr)] items-center gap-x-2.5 gap-y-1.5">
            {tour.indexVsCategory.map((r) => (
              <div key={r.metric} className="contents">
                <dt className="text-muted-foreground">{r.metric}</dt>
                <dd>
                  <HBar
                    ariaLabel={`${r.metric}: ${names.map((b, i) => `${b.short} ${r.values[i]}`).join(", ")}`}
                    max={150}
                    thickness={9}
                    labelClassName="sr-only"
                    className="gap-0.75 text-[0.71875rem]"
                    data={names.map((b, i) => ({ label: b.short, value: r.values[i], display: String(r.values[i]), tone: TONES[i] }))}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title={<>{c.gap}<span className="max-md:hidden"> · {metricName} {c.gapUnit}</span></>} className="md:col-span-2">
          <LineArea
            key={metric}
            ariaLabel={`${metricName} share per week, ${tour.gapAxis.join(" to ")}: ${names.map((b, i) => `${b.short} ${gap[i][0]}% to ${gap[i][gap[i].length - 1]}%`).join(", ")}`}
            legend
            min={Math.min(...all) - 2}
            max={Math.max(...all) + 2}
            width={680}
            height={130}
            gridlines={3}
            xLabels={tour.gapAxis}
            data={names.map((b, i) => ({ label: b.short, values: gap[i], tone: TONES[i], kind: i === 0 ? "line" : "dashed" }))}
          />
          <TourHotspot step={step} i={1} className="top-1/2 left-[52%]" />
        </Panel>
      </div>

      <div className="relative rounded-lg border border-border bg-card px-3 pt-1 pb-1.5 text-xs tabular">
        <table className="w-full">
          <thead className="text-muted-foreground">
            <tr className="border-b border-border">
              {c.columns.map((col, i) => (
                <th key={col} scope="col" className={cn("py-2 font-normal", i ? "text-right" : "text-left")}>
                  {col === c.columnsMobile[i] ? (
                    col
                  ) : (
                    <>
                      <span className="md:hidden">{c.columnsMobile[i]}</span>
                      <span className="max-md:hidden">{col}</span>
                    </>
                  )}
                </th>
              ))}
              <th scope="col" className="py-2 text-right font-normal max-md:hidden">
                {c.share} ({metricName.toLowerCase()})
              </th>
            </tr>
          </thead>
          <tbody>
            {tour.competitors[range].map((row, i) => (
              <tr key={names[i].name} className="border-b border-dark-grid last:border-0">
                <th scope="row" className="py-2 text-left font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span aria-hidden="true" className={cn("size-2 rounded-full", tones[TONES[i]].bg)} />
                    {names[i].name}
                  </span>
                </th>
                <td className="py-2 text-right">{row.mentions}</td>
                <td className="py-2 text-right">{row.engagement}</td>
                <td className="py-2 text-right">{row.net}</td>
                <td className="py-2 text-right font-bold max-md:hidden">{sov[i]}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <TourHotspot step={step} i={2} className="top-0 left-[26%] max-md:hidden" />
      </div>
    </TourFrame>
  )
}
