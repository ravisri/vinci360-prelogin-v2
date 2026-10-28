import { FeaturePageTemplate, featureMetadata } from "@/components/feature-page/FeaturePageTemplate"
import { ReportBuilder } from "@/components/mocks/reports/ReportBuilder"
import { ReportsControl } from "@/components/mocks/reports/ReportsControl"
import { ReportsFlow } from "@/components/mocks/reports/ReportsFlow"
import { ReportsHeroMock } from "@/components/mocks/reports/ReportsHeroMock"
import { reportsRelatedThumbnails, reportsStepIllustrations } from "@/components/mocks/reports/ReportsIllustrations"
import { ReportsAlertsPart, ReportsPartA } from "@/components/mocks/reports/ReportsSections"
import { reportsPage } from "@/content/features/reports-alerts"

export const metadata = featureMetadata(reportsPage)

export default function ReportsAlertsPage() {
  return (
    <FeaturePageTemplate
      config={reportsPage}
      heroVisual={<ReportsHeroMock />}
      stepIllustrations={reportsStepIllustrations}
      relatedThumbnails={reportsRelatedThumbnails}
    >
      <ReportsFlow />
      <ReportBuilder />
      <ReportsPartA />
      <ReportsAlertsPart />
      <ReportsControl />
    </FeaturePageTemplate>
  )
}
