import { Download } from "lucide-react"

import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { BrandMarker } from "@/components/mocks/compare/brand"
import { FigureTable } from "@/components/mocks/compare/FigureTable"
import { IndexTrack } from "@/components/mocks/compare/IndexTrack"
import { frameChip } from "@/components/mocks/smi/styles"
import { compareLegend, compareHero, compareTable, compareWidgets as c } from "@/content/features/brand-compare"
import { brands } from "@/content/sample-data"
import { cn } from "@/lib/utils"

/** 1 · Indexed comparison chart. The float card sits under the frame, clear of the legend. */
export function IndexWidget() {
  return (
    <div className="relative md:pb-12">
      <MockFrame title={compareHero.indexed} caption={c.index.caption} bodyClassName="gap-2">
        <IndexTrack size="md" />
        <ul aria-hidden="true" className="flex flex-wrap gap-x-4 gap-y-1.5 pl-24 text-xs font-bold max-md:pl-0">
          <li className="flex items-center gap-1.5 text-chart-6">
            <BrandMarker brand="aurora" />
            {compareLegend.baseline}
          </li>
          <li className="flex items-center gap-1.5 text-chart-2">
            <BrandMarker brand="nimbus" />
            {brands.nimbus.short}
          </li>
          <li className="flex items-center gap-1.5 text-chart-3">
            <BrandMarker brand="kestrel" />
            {brands.kestrel.short}
          </li>
        </ul>
      </MockFrame>
      <FloatCard className="flex items-center gap-2 px-3.5 py-2.5 md:-bottom-1 md:left-6">
        <BrandMarker brand="nimbus" tone="light" />
        <p className="text-sm font-bold tabular">{c.index.float}</p>
      </FloatCard>
    </div>
  )
}

/** 4 · Detailed figure table, with the Export chip in the frame header. */
export function FiguresWidget() {
  return (
    <MockFrame
      title={c.figures.title}
      caption={compareTable.caption}
      actions={
        <span className={cn(frameChip, "bg-transparent")}>
          <Download aria-hidden="true" strokeWidth={2} className="size-3.5" />
          {c.figures.export}
        </span>
      }
    >
      <FigureTable changeLabel={compareTable.changeWidget} />
    </MockFrame>
  )
}
