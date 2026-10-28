import { Bell, ChevronDown, Download, NotepadText, X } from "lucide-react"

import { BrandMarker } from "@/components/mocks/compare/brand"
import { compareSteps as c } from "@/content/features/brand-compare"
import { brands } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const chip = "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold"

/** "How to use it" illustrations (decorative; HowToUse hides them from screen readers). */
export const compareStepIllustrations = [
  <div key="choose" className="flex h-full flex-col justify-center gap-2">
    <span className="flex w-full items-center justify-between gap-2 rounded-sm border border-input bg-card px-2.5 py-1.5 text-xs font-semibold">
      {c.own}
      <ChevronDown strokeWidth={2} className="size-3.5" />
    </span>
    <span className="flex flex-wrap gap-1.5">
      {(["nimbus", "kestrel"] as const).map((b) => (
        <span key={b} className={cn(chip, b === "nimbus" ? "text-trends-text" : "text-sent-text")}>
          <BrandMarker brand={b} tone="light" />
          {brands[b].name}
          <X strokeWidth={2.2} className="size-3" />
        </span>
      ))}
    </span>
  </div>,
  <svg key="gap" viewBox="0 0 200 86" className="h-full w-full">
    <path d="M8 22 L60 18 L112 14 L164 10 L192 9 L192 40 L164 46 L112 54 L60 62 L8 70 Z" className="fill-chart-6/15" />
    <path d="M8 22 L60 18 L112 14 L164 10 L192 9" fill="none" strokeWidth="2.5" strokeDasharray="7 4" className="stroke-chart-2" />
    <path d="M8 70 L60 62 L112 54 L164 46 L192 40" fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-chart-6" />
  </svg>,
  <div key="overlap" className="flex h-full items-center justify-center gap-4">
    <svg viewBox="0 0 80 72" className="h-full max-h-20">
      <circle cx="30" cy="28" r="20" strokeWidth="2" className="fill-chart-6/15 stroke-cmp-text" />
      <circle cx="50" cy="28" r="20" strokeWidth="2" strokeDasharray="5 3" className="fill-chart-2/10 stroke-trends-text" />
      <circle cx="40" cy="46" r="20" strokeWidth="2" strokeDasharray="1.5 3" strokeLinecap="round" className="fill-chart-3/10 stroke-sent-text" />
    </svg>
    <span className={chip}>
      <Download strokeWidth={2} className="size-3.5" />
      {c.export}
    </span>
  </div>,
]

/** "Works with the rest" thumbnails: Trends, Reports & Alerts, Social Media Intelligence. */
export const compareRelatedThumbnails = [
  <svg key="trends" viewBox="0 0 160 60" className="h-14 w-40" fill="none">
    <polyline points="4,52 40,44 70,48 112,22 156,8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-trends-text" />
  </svg>,
  <Bell key="reports" className="size-11" strokeWidth={2} />,
  <NotepadText key="smi" className="size-11" strokeWidth={2} />,
]
