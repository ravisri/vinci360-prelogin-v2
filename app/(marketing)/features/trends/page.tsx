import { FeaturePageTemplate, featureMetadata } from "@/components/feature-page/FeaturePageTemplate"
import { TrendsFilterShowcase } from "@/components/mocks/trends/TrendsFilterShowcase"
import { TrendsHeroMock } from "@/components/mocks/trends/TrendsHeroMock"
import { trendsRelatedThumbnails, trendsStepIllustrations } from "@/components/mocks/trends/TrendsIllustrations"
import { TrendsExplainer, TrendsHashtagsPart, TrendsTopicsPart } from "@/components/mocks/trends/TrendsSections"
import { TrendsSubnav } from "@/components/mocks/trends/TrendsSubnav"
import { trendsPage } from "@/content/features/trends"

export const metadata = featureMetadata(trendsPage)

export default function TrendsPage() {
  return (
    <>
      {/* 390: Topics / Hashtags pinned under the header; from md the same pills sit in the hero. */}
      <TrendsSubnav variant="sticky" className="md:hidden" />
      <FeaturePageTemplate
        config={trendsPage}
        heroVisual={<TrendsHeroMock />}
        heroTrailing={<TrendsSubnav className="max-md:hidden" />}
        stepIllustrations={trendsStepIllustrations}
        relatedThumbnails={trendsRelatedThumbnails}
      >
        <TrendsExplainer />
        <TrendsTopicsPart />
        <TrendsHashtagsPart />
        <TrendsFilterShowcase />
      </FeaturePageTemplate>
    </>
  )
}
