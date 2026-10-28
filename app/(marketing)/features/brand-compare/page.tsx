import { FeaturePageTemplate, featureMetadata } from "@/components/feature-page/FeaturePageTemplate"
import { WidgetWalkthrough } from "@/components/feature-page/WidgetWalkthrough"
import { ReachNote } from "@/components/mocks/ReachNote"
import { BrandLegend } from "@/components/mocks/compare/brand"
import { CompareBuilder } from "@/components/mocks/compare/CompareBuilder"
import { CompareHeroMock } from "@/components/mocks/compare/CompareHeroMock"
import { compareRelatedThumbnails, compareStepIllustrations } from "@/components/mocks/compare/CompareIllustrations"
import { CompareThreeViews } from "@/components/mocks/compare/CompareThreeViews"
import { CompareTrust } from "@/components/mocks/compare/CompareTrust"
import { FiguresWidget, IndexWidget } from "@/components/mocks/compare/CompareWidgets"
import { GapTrendWidget } from "@/components/mocks/compare/GapTrendWidget"
import { OverlapWidget } from "@/components/mocks/compare/OverlapWidget"
import { ShareOfVoiceWidget } from "@/components/mocks/compare/ShareOfVoiceWidget"
import { compareLegend, comparePage, compareWalkthrough } from "@/content/features/brand-compare"

export const metadata = featureMetadata(comparePage)

export default function BrandComparePage() {
  return (
    <FeaturePageTemplate
      config={comparePage}
      heroVisual={<CompareHeroMock />}
      heroTrailing={<BrandLegend variant="line" tone="light" full label={compareLegend.label} className="max-md:hidden" />}
      stepIllustrations={compareStepIllustrations}
      relatedThumbnails={compareRelatedThumbnails}
    >
      <CompareThreeViews />
      <WidgetWalkthrough
        accent="cmp"
        title={compareWalkthrough.title}
        lead={compareWalkthrough.lead}
        items={compareWalkthrough.items}
        visuals={[<IndexWidget key="index" />, <ShareOfVoiceWidget key="sov" />, <GapTrendWidget key="gap" />, <FiguresWidget key="figures" />, <OverlapWidget key="overlap" />]}
        notes={[<ReachNote key="reach-index" />, undefined, undefined, <ReachNote key="reach-figures" />, undefined]}
      />
      <CompareBuilder />
      <CompareTrust />
    </FeaturePageTemplate>
  )
}
