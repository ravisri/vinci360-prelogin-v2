import { BellRing, Download } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { featuresOverview as copy, type Panel } from "@/content/features-overview"
import { keywordReport } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentText, trendWord } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = copy.mocks.reports
const cols = "grid grid-cols-[minmax(0,1fr)_4rem_3.75rem_5.75rem] gap-2"

const caption = `Sample SMA Reports page: weekly keyword-wise report preview for 5 to 11 October with ${keywordReport
  .map((r) => `${r.keyword} ${r.display} ${trendWord[r.trend]} ${r.change} ${sentimentLabel[r.sentiment].toLowerCase()}`)
  .join(", ")}; a schedule selector set to weekly; export buttons for PDF and Excel; and an alert rule.`

/** Reports tab: schedule selector, export chips, light keyword-wise brief, and the "Alert rule" float. */
export function ReportsPanelMock({ hotspots }: { hotspots: Panel["hotspots"] }) {
  const r = c.rule
  return (
    <div className="relative">
      <MockFrame chrome={c.chrome} caption={caption} className="relative" bodyClassName="gap-3 p-2.5 md:p-4">
        <div className="relative flex flex-wrap items-center gap-2.5">
          <span className="text-xs text-muted-foreground">{c.schedule}</span>
          <span role="img" aria-label={c.scheduleLabel} className="inline-flex overflow-hidden rounded-sm border border-border text-xs">
            {c.scheduleOptions.map((o, i) => (
              <span
                key={o}
                aria-hidden="true"
                className={cn("px-3 py-1.5", i === 1 ? "bg-reports-text font-bold text-primary-foreground" : "text-muted-foreground")}
              >
                {o}
              </span>
            ))}
          </span>
          <span className="ml-auto flex gap-1.5 max-md:w-full max-md:justify-end">
            {c.exports.map((e) => (
              <span
                key={e}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs leading-[1.3] font-semibold text-on-dark-strong"
              >
                <Download aria-hidden="true" strokeWidth={2} className="size-3.25" />
                {e}
              </span>
            ))}
          </span>
          <Hotspot n={1} accent="reports" {...hotspots[0]} className="top-[75%] left-[10%] md:top-1/2 md:left-[47%]" />
          <Hotspot n={3} accent="reports" {...hotspots[2]} className="top-[75%] left-[36%] md:top-1/2 md:right-[9.25rem] md:left-auto md:translate-x-0" />
        </div>

        <div className="on-light relative rounded-lg bg-card md:w-[78%]">
          <p className="border-b border-muted px-3.5 py-2.5 text-[0.71875rem] text-muted-foreground">
            <strong className="text-foreground">{c.briefTitle}</strong> · {c.briefMeta}
          </p>
          <div className="px-3.5 pt-1.5 pb-3 text-xs tabular">
            <p aria-hidden="true" className={cn(cols, "border-b border-muted py-1.5 text-muted-foreground")}>
              {c.columns.map((col, i) => (
                <span key={col} className={cn((i === 1 || i === 2) && "text-right")}>
                  {col}
                </span>
              ))}
            </p>
            <ul>
              {keywordReport.map((row) => (
                <li key={row.keyword} className={cn(cols, "border-b border-muted py-1.75 last:border-0")}>
                  <span className="font-semibold">{row.keyword}</span>
                  <span className="text-right">{row.display}</span>
                  <Delta trend={row.trend} className="text-right font-normal">
                    {row.change}
                  </Delta>
                  <span className={cn("font-semibold", sentimentText[row.sentiment])}>
                    <span aria-hidden="true">{sentimentGlyph[row.sentiment]} </span>
                    {sentimentLabel[row.sentiment]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Hotspot n={2} accent="reports" {...hotspots[1]} className="top-14 right-0 translate-x-0 md:top-[3.25rem] md:right-auto md:left-[30%] md:-translate-x-1/2" />
        </div>
      </MockFrame>

      <FloatCard className="flex flex-col gap-2.5 p-4 md:relative md:mt-3 md:w-72.5 lg:absolute lg:-right-5 lg:-bottom-26 lg:mt-0">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[0.8125rem] font-bold">
            <BellRing aria-hidden="true" strokeWidth={2} className="size-4 text-reports-text" />
            {r.title}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-reports-text">
            {r.on}
            <span role="img" aria-label={r.onLabel} className="relative h-5 w-9 rounded-full bg-reports">
              <span className="absolute top-0.5 right-0.5 size-4 rounded-full bg-primary-foreground" />
            </span>
          </span>
        </div>
        <p className="text-sm leading-[1.45]">
          {r.when} <strong>{r.metric}</strong> {r.verb} <strong className="tabular">{r.threshold}</strong> {r.tail}
        </p>
        <p className="text-xs text-muted-foreground">{r.sendTo}</p>
      </FloatCard>
    </div>
  )
}
