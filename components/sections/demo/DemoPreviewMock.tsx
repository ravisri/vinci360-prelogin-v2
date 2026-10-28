import { Donut } from "@/components/charts/Donut"
import { BrandMarker } from "@/components/mocks/compare/brand"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { demoHero } from "@/content/demo"
import { brands, demoPreview as p } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const sov = [
  { brand: "aurora", label: brands.aurora.name, value: p.shareOfVoice.aurora, tone: "chart-6" },
  { brand: "nimbus", label: brands.nimbus.name, value: p.shareOfVoice.nimbus, tone: "chart-2" },
  { brand: "kestrel", label: brands.kestrel.name, value: p.shareOfVoice.kestrel, tone: "chart-3" },
] as const

/** Hero "sample preview": three 30-day KPIs and the share-of-voice ring, in a dark frame on the primary tint. */
export function DemoPreviewMock({ className }: { className?: string }) {
  return (
    <VisualPanel accent="smi" dots="br" className={cn("md:p-6", className)}>
      <MockFrame caption={p.caption} chrome={p.title} bodyClassName="grid grid-cols-3 gap-2 p-3.5 tabular">
        {p.kpis.map((k) => (
          <KpiCard key={k.label} size="md" label={k.label} value={k.value} prefix={k.prefix} suffix={k.suffix} delta={k.delta} trend={k.trend} />
        ))}
        <div className="col-span-full flex items-center gap-4 rounded-lg border border-border bg-card p-3">
          <Donut data={sov} thickness={16} className="w-23 flex-none" />
          <div className="flex flex-col gap-1 text-[0.78125rem]" aria-hidden="true">
            <strong className="text-[0.8125rem]">Share of voice</strong>
            {sov.map((s) => (
              <span key={s.brand} className="flex items-center gap-1.5">
                <BrandMarker brand={s.brand} />
                {s.label} {s.value}%
              </span>
            ))}
          </div>
        </div>
      </MockFrame>
      <p className="mt-3 text-[0.84375rem] font-semibold">{demoHero.previewNote}</p>
    </VisualPanel>
  )
}
