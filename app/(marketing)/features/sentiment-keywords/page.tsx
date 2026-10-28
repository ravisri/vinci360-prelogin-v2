import { FeaturePageTemplate, featureMetadata } from "@/components/feature-page/FeaturePageTemplate"
import { SentimentFilterShowcase } from "@/components/mocks/sentiment/SentimentFilterShowcase"
import { SentimentHeroMock } from "@/components/mocks/sentiment/SentimentHeroMock"
import { sentimentRelatedThumbnails, sentimentStepIllustrations } from "@/components/mocks/sentiment/SentimentIllustrations"
import { KeywordsPart, SentimentExplainerSection, SentimentPart } from "@/components/mocks/sentiment/SentimentSections"
import { SentimentStateProvider } from "@/components/mocks/sentiment/SentimentStateProvider"
import { SentimentSubnav } from "@/components/mocks/sentiment/SentimentSubnav"
import { sentimentPage } from "@/content/features/sentiment-keywords"

export const metadata = featureMetadata(sentimentPage)

export default function SentimentKeywordsPage() {
  return (
    <>
      {/* 390: Sentiment / Keywords pinned under the header; from md the same pills sit in the hero. */}
      <SentimentSubnav variant="sticky" className="md:hidden" />
      <FeaturePageTemplate
        config={sentimentPage}
        heroVisual={<SentimentHeroMock />}
        heroTrailing={<SentimentSubnav className="max-md:hidden" />}
        stepIllustrations={sentimentStepIllustrations}
        relatedThumbnails={sentimentRelatedThumbnails}
      >
        {/* Threshold, keyword and platform filters are shared across the sections below. */}
        <SentimentStateProvider>
          {/* "Sentiment" target: the explainer and Part A form one region for the subnav. */}
          <div id="sentiment" className="scroll-mt-31 md:scroll-mt-21">
            <SentimentExplainerSection />
            <SentimentPart />
          </div>
          <KeywordsPart />
          <SentimentFilterShowcase />
        </SentimentStateProvider>
      </FeaturePageTemplate>
    </>
  )
}
