import { ChartLine } from "lucide-react"

import { Donut } from "@/components/charts/Donut"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { brandKeys, BrandMarker } from "@/components/mocks/compare/brand"
import { IndexTrack } from "@/components/mocks/compare/IndexTrack"
import { darkCard } from "@/components/mocks/smi/styles"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { compareHero as c } from "@/content/features/brand-compare"
import { brands, compare } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const sov = compare.shareOfVoice
const tones = { aurora: "chart-6", nimbus: "chart-2", kestrel: "chart-3" } as const

/**
 * Brand Compare hero: share of voice (donut) and, from md, the indexed comparison (Aurora = 100).
 * Hotspots sit on the frame's bottom edge and the float cards sit outside the frame (above its
 * top-right corner and below its bottom-left), so nothing covers the window title, the Sample data
 * chip, a number or a label.
 */
export function CompareHeroMock() {
  return (
    <VisualPanel accent="cmp" dots="br" className="md:pt-14 md:pb-22">
      <div className="relative md:ml-auto md:w-[94%]">
        <MockFrame
          chrome={
            <>
              <span className="max-md:hidden">{c.chrome}</span>
              {c.module}
            </>
          }
          caption={c.caption}
          bodyClassName="grid gap-3 p-3 md:grid-cols-[10.625rem_minmax(0,1fr)] md:p-3.5"
        >
          <div className={cn(darkCard, "flex flex-col gap-2.5 p-3")}>
            <p className="text-xs font-semibold">{c.sov}</p>
            <div className="flex flex-col items-stretch gap-3 md:gap-2.5">
              <Donut
                data={brandKeys.map((b) => ({ label: brands[b].short, value: sov[b], tone: tones[b] }))}
                center={`${sov.aurora}%`}
                sub={brands.aurora.short}
                thickness={18}
                gap={2}
                className="mx-auto w-32 md:w-28"
              />
              <ul aria-hidden="true" className="flex flex-col gap-1.5 text-xs tabular max-md:gap-2 max-md:text-sm">
                {brandKeys.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <BrandMarker brand={b} className="size-3" />
                    <span className="font-semibold text-foreground">
                      {b === "aurora" ? (
                        <>
                          <span className="md:hidden">{brands.aurora.name} (you)</span>
                          <span className="max-md:hidden">{brands.aurora.short}</span>
                        </>
                      ) : (
                        brands[b].short
                      )}
                    </span>
                    <span className="ml-auto font-bold">{sov[b]}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={cn(darkCard, "flex flex-col gap-1.5 p-3 max-md:hidden")}>
            <p className="text-xs font-semibold">{c.indexed}</p>
            <IndexTrack size="sm" />
          </div>
        </MockFrame>
        <Hotspot n={1} accent="cmp" {...c.hotspots[0]} className="top-full left-[62%] md:left-[18%]" />
        <Hotspot n={2} accent="cmp" {...c.hotspots[1]} className="top-full left-[74%] max-md:hidden" />
      </div>
      <FloatCard enter className="flex items-center gap-2 px-3.5 py-2.5 max-md:mt-9 md:-top-12 md:right-2">
        <BrandMarker brand="nimbus" tone="light" className="max-md:hidden" />
        <p className="text-sm font-bold tabular">
          {c.leads} <span className="text-neg">▲</span>
        </p>
      </FloatCard>
      <FloatCard enter delay={0.2} className="items-center gap-2 px-3.5 py-2.5 max-md:hidden md:-bottom-17 md:-left-3 md:flex">
        <ChartLine aria-hidden="true" strokeWidth={2} className="size-4 text-pos" />
        <p className="text-sm font-bold">
          {c.gap.label} <span className="text-pos">▼ {c.gap.value}</span>
        </p>
      </FloatCard>
    </VisualPanel>
  )
}
