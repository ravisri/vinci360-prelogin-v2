import { Check } from "lucide-react"

import { LineArea } from "@/components/charts/LineArea"
import { FloatCard } from "@/components/mocks/FloatCard"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { ReachNote } from "@/components/mocks/ReachNote"
import { kpiProps } from "@/components/mocks/home/kpi"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { featuresOverview as copy } from "@/content/features-overview"
import { brands, featuresOverview as data } from "@/content/sample-data"
import { accents } from "@/lib/accents"
import { cn } from "@/lib/utils"

const h = copy.hero

const caption = `Sample Vinci360 dashboard fragment for the fictional brand ${brands.aurora.name}: ${data.heroKpis
  .map((k) => `${k.display} ${k.label.toLowerCase()} ${k.trend} ${k.delta.replace(" vs prev.", "")}`)
  .join(", ")}, and a 30-day mention timeline.`

/** Features hero: 2×2 KPIs + 30-day timeline, with the "Switch module" float clear of the Sample data chip. */
export function FeaturesHeroMock() {
  return (
    <div className="flex flex-col gap-3">
      <VisualPanel accent="smi" dots="br" className="p-5 md:p-9">
        <MockFrame
          chrome={
            <>
              <span className="md:hidden">{h.chromeMobile}</span>
              <span className="max-md:hidden">{h.chrome}</span>
            </>
          }
          caption={caption}
          className="md:w-[88%]"
          bodyClassName="gap-2 p-2.5 md:gap-2.5 md:p-3.5"
        >
          <div className="grid grid-cols-2 gap-1.5 md:gap-2">
            {data.heroKpis.map((k) => (
              <KpiCard
                key={k.label}
                size="md"
                {...kpiProps(k)}
                label={
                  k.label === "Sentiment score" ? (
                    <>
                      <span className="md:hidden">Sentiment</span>
                      <span className="max-md:hidden">{k.label}</span>
                    </>
                  ) : (
                    k.label
                  )
                }
                delta={
                  <>
                    {k.delta.replace(" vs prev.", "")}
                    <span className="max-md:hidden"> vs prev.</span>
                  </>
                }
                className="p-2 md:px-3 md:py-2.5"
              />
            ))}
          </div>
          <div className="md:rounded-lg md:border md:border-border md:bg-card md:px-3 md:py-2.5">
            <p className="mb-1 text-[0.6875rem] text-muted-foreground max-md:hidden">{h.timeline}</p>
            <LineArea
              ariaLabel="Mentions over the last 30 days, rising steadily with one sharp spike about two thirds of the way through."
              max={140}
              width={640}
              height={140}
              gridlines={0}
              data={[
                {
                  label: "Mentions",
                  values: data.heroSeries,
                  tone: "chart-1",
                  kind: "area",
                },
              ]}
            />
          </div>
        </MockFrame>

        {/* Below the chrome (never over the Sample data chip), over the empty right side of the KPI cells. */}
        <FloatCard enter className="ml-4 flex flex-col gap-0.5 p-3 md:top-15 md:-right-11.5 md:ml-0 md:w-59 md:gap-1 md:p-3.5">
          <p className="px-2 pb-1 text-[0.65625rem] font-semibold tracking-[0.05em] text-muted-foreground uppercase md:pb-1.5 md:text-[0.6875rem]">
            {h.switcher.title}
          </p>
          <ul className="flex flex-col gap-0.5 md:gap-1">
            {h.switcher.items.map((item, i) => (
              <li
                key={item.label}
                className={cn(
                  "flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-[0.8125rem] md:py-2 md:text-sm",
                  i === 0 && [accents[item.accent].tint, "font-bold"]
                )}
              >
                <span aria-hidden="true" className={cn("size-2 flex-none rounded-full", accents[item.accent].fill)} />
                {item.label}
                {i === 0 && (
                  <>
                    <Check aria-hidden="true" strokeWidth={2.2} className="ml-auto size-4" />
                    <span className="sr-only">({h.switcher.selected})</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </FloatCard>
      </VisualPanel>
      <ReachNote className="text-[0.71875rem] md:text-[0.8125rem]" />
    </div>
  )
}
