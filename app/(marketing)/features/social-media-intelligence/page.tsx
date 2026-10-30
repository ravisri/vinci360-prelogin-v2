import { FeaturePageTemplate, featureMetadata } from "@/components/feature-page/FeaturePageTemplate"
import { WidgetWalkthrough } from "@/components/feature-page/WidgetWalkthrough"
import { ReachNote } from "@/components/mocks/ReachNote"
import { ArticlesWidget } from "@/components/mocks/smi/ArticlesWidget"
import { HashtagsWidget } from "@/components/mocks/smi/HashtagsWidget"
import { KpiScopeWidget } from "@/components/mocks/smi/KpiScopeWidget"
import { PlatformWidget } from "@/components/mocks/smi/PlatformWidget"
import { SentimentWidget } from "@/components/mocks/smi/SentimentWidget"
import { SmiFilterShowcase } from "@/components/mocks/smi/SmiFilterShowcase"
import { SmiHeroMock } from "@/components/mocks/smi/SmiHeroMock"
import { smiRelatedThumbnails, smiStepIllustrations } from "@/components/mocks/smi/SmiIllustrations"
import { TimelineWidget } from "@/components/mocks/smi/TimelineWidget"
import { TopHandlesTeaser } from "@/components/mocks/smi/TopHandlesTeaser"
import { TopicsWidget } from "@/components/mocks/smi/TopicsWidget"
import { smiPage, smiWalkthrough } from "@/content/features/smi"

export const metadata = featureMetadata(smiPage)

export default function SocialMediaIntelligencePage() {
  return (
    <FeaturePageTemplate
      config={smiPage}
      heroVisual={<SmiHeroMock />}
      stepIllustrations={smiStepIllustrations}
      relatedThumbnails={smiRelatedThumbnails}
    >
      <WidgetWalkthrough
        accent={smiPage.accent}
        title={smiWalkthrough.title}
        lead={smiWalkthrough.lead}
        items={smiWalkthrough.items}
        visuals={[
          <KpiScopeWidget key="kpi" />,
          <TimelineWidget key="timeline" />,
          <TopicsWidget key="topics" />,
          <PlatformWidget key="platforms" />,
          <SentimentWidget key="sentiment" />,
          <ArticlesWidget key="articles" />,
          <HashtagsWidget key="hashtags" />,
        ]}
        notes={[
          <ReachNote key="kpi" />,
          undefined,
          <p key="topics" className="rounded-lg bg-primary-tint px-3.5 py-3 text-sm text-neutral-text">
            {smiWalkthrough.topicsNote}
          </p>,
          undefined,
          undefined,
          undefined,
          <ReachNote key="hashtags" />,
        ]}
        // after={<TopHandlesTeaser />}
      />
      <SmiFilterShowcase />
    </FeaturePageTemplate>
  )
}
