import type { ReactNode } from "react"
import { Hand, Info } from "lucide-react"

import { PartHeader } from "@/components/feature-page/PartHeader"
import { ReachNote } from "@/components/mocks/ReachNote"
import { AlertNotifications } from "@/components/mocks/reports/AlertNotifications"
import { AlertRuleBuilder } from "@/components/mocks/reports/AlertRuleBuilder"
import { EntityReportWidget, KeywordReportWidget } from "@/components/mocks/reports/ReportWidgets"
import { FeatureSplit } from "@/components/sections/FeatureSplit"
import { VisualPanel } from "@/components/sections/VisualPanel"
import type { WalkthroughItem } from "@/content/features/types"
import { reportsAlerts, reportsPartA } from "@/content/features/reports-alerts"

const accent = "reports"

type RowProps = { item: WalkthroughItem; n: number; visual: ReactNode; note?: ReactNode; hintIcon?: typeof Hand }

/** One alternating walkthrough row (text + tinted visual), visual first below lg. */
function Row({ item, n, visual, note, hintIcon = Hand }: RowProps) {
  const reverse = n % 2 === 0
  return (
    <FeatureSplit
      accent={accent}
      badge={n}
      reverse={reverse}
      visualFirstOnMobile
      headingAs="h3"
      title={item.title}
      lead={item.lead}
      tells={item.tells}
      metrics={item.metrics.length ? item.metrics : undefined}
      hint={item.hint || undefined}
      hintIcon={hintIcon}
      note={note}
      visual={
        <VisualPanel accent={accent} dots={reverse ? "bl" : "tr"}>
          {visual}
        </VisualPanel>
      }
    />
  )
}

/** "Part A · Reports": keyword-wise and entity-wise report shapes. */
export function ReportsPartA() {
  const [keyword, entity] = reportsPartA.items
  return (
    <section aria-labelledby="pa-h" className="container-site flex flex-col gap-14 pt-16 md:gap-20 md:pt-24">
      <PartHeader id="pa-h" accent={accent} part={reportsPartA.part} title={reportsPartA.title} lead={reportsPartA.lead} />
      <Row item={keyword} n={1} visual={<KeywordReportWidget />} />
      <Row item={entity} n={2} visual={<EntityReportWidget />} note={<ReachNote />} />
    </section>
  )
}

/** "Part B · Alerts": the rule builder, then the alert itself. */
export function ReportsAlertsPart() {
  const [rules, alert] = reportsAlerts.items
  return (
    <section id="alerts" aria-labelledby="pb-h" className="container-site flex flex-col gap-14 pt-12 md:gap-20 md:pt-35">
      <PartHeader id="pb-h" accent={accent} part={reportsAlerts.part} title={reportsAlerts.title} lead={reportsAlerts.lead} />
      <Row
        item={{ ...rules, hint: "" }}
        n={1}
        visual={<AlertRuleBuilder />}
        note={
          <>
            <p className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-semibold">
              <Info aria-hidden="true" strokeWidth={2} className="mt-px size-4.5 flex-none text-reports-text" />
              {reportsAlerts.insight}
            </p>
            <p className="flex items-start gap-2.5 rounded-lg border border-dashed border-reports-200 bg-card px-3 py-2.5 text-sm text-neutral-text">
              <Hand aria-hidden="true" strokeWidth={2} className="mt-px size-4.5 flex-none text-reports-text" />
              {rules.hint}
            </p>
          </>
        }
      />
      <Row item={alert} n={2} visual={<AlertNotifications />} />
    </section>
  )
}
