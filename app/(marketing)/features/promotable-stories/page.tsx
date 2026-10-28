import { FeaturePageTemplate, featureMetadata } from "@/components/feature-page/FeaturePageTemplate"
import { WidgetWalkthrough } from "@/components/feature-page/WidgetWalkthrough"
import { ReachNote } from "@/components/mocks/ReachNote"
import { RaiseTheBar } from "@/components/mocks/stories/RaiseTheBar"
import { StoriesAiChip, StoriesHeroMock } from "@/components/mocks/stories/StoriesHeroMock"
import { StoriesFlow } from "@/components/mocks/stories/StoriesFlow"
import { storiesRelatedThumbnails, storiesStepIllustrations } from "@/components/mocks/stories/StoriesIllustrations"
import { DecisionWidget, EvidenceWidget, SupportingPostsWidget } from "@/components/mocks/stories/StoriesWidgets"
import { StoryReview } from "@/components/mocks/stories/StoryReview"
import { SuggestedTopicWidget } from "@/components/mocks/stories/SuggestedTopicWidget"
import { storiesPage, storiesWalkthrough } from "@/content/features/promotable-stories"

export const metadata = featureMetadata(storiesPage)

export default function PromotableStoriesPage() {
  return (
    <FeaturePageTemplate
      config={storiesPage}
      heroVisual={<StoriesHeroMock />}
      heroChipExtra={<StoriesAiChip />}
      stepIllustrations={storiesStepIllustrations}
      relatedThumbnails={storiesRelatedThumbnails}
    >
      <StoriesFlow />
      <StoryReview />
      <WidgetWalkthrough
        accent="stories"
        title={storiesWalkthrough.title}
        lead={storiesWalkthrough.lead}
        items={storiesWalkthrough.items}
        visuals={[<SuggestedTopicWidget key="topic" />, <EvidenceWidget key="evidence" />, <SupportingPostsWidget key="posts" />, <DecisionWidget key="decision" />]}
        notes={[undefined, <ReachNote key="reach" />, undefined, undefined]}
      />
      <RaiseTheBar />
    </FeaturePageTemplate>
  )
}
