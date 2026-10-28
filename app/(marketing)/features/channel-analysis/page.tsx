import Link from "next/link"
import { Info } from "lucide-react"

import { FeaturePageTemplate, featureMetadata } from "@/components/feature-page/FeaturePageTemplate"
import { WidgetWalkthrough } from "@/components/feature-page/WidgetWalkthrough"
import { ChannelsFilterShowcase } from "@/components/mocks/channels/ChannelsFilterShowcase"
import { ChannelsHeroMock } from "@/components/mocks/channels/ChannelsHeroMock"
import { channelsRelatedThumbnails, channelsStepIllustrations } from "@/components/mocks/channels/ChannelsIllustrations"
import { ChannelStateProvider, NativeObjectTitle } from "@/components/mocks/channels/ChannelStateProvider"
import { DepthCompare } from "@/components/mocks/channels/DepthCompare"
import { NetworkInsights } from "@/components/mocks/channels/NetworkInsights"
import { NetworkJumpLinks } from "@/components/mocks/channels/NetworkJumpLinks"
import { NetworkSwitcher } from "@/components/mocks/channels/NetworkSwitcher"
import { NetworkTerms } from "@/components/mocks/channels/NetworkTerms"
import { NetworkViewMock } from "@/components/mocks/channels/NetworkViewMock"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { channelsPage, channelsWalkthrough as w } from "@/content/features/channel-analysis"

export const metadata = featureMetadata(channelsPage)

export default function ChannelAnalysisPage() {
  return (
    <ChannelStateProvider>
      <FeaturePageTemplate
        config={channelsPage}
        heroVisual={<ChannelsHeroMock />}
        heroTrailing={<NetworkJumpLinks />}
        stepIllustrations={channelsStepIllustrations}
        relatedThumbnails={channelsRelatedThumbnails}
      >
        <DepthCompare />
        <NetworkSwitcher />
        <NetworkTerms />
        <WidgetWalkthrough
          id="views-h"
          accent="channels"
          eyebrow={<ModuleChip accent="channels" label={w.chip} dot={false} />}
          title={w.title}
          lead={w.lead}
          items={w.items}
          titles={[undefined, undefined, undefined, undefined, <NativeObjectTitle key="obj" />]}
          visuals={[
            <NetworkViewMock key="keywords" view="keywords" />,
            <NetworkViewMock key="entity" view="entity" />,
            <NetworkViewMock key="groups" view="groups" />,
            <NetworkViewMock key="hashtags" view="hashtags" />,
            <NetworkViewMock key="object" view="object" />,
          ]}
          notes={[
            <p key="kw" className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-semibold">
              <Info aria-hidden="true" strokeWidth={2} className="mt-px size-4.5 flex-none text-channels-text" />
              <span>
                {w.keywordNote.before}
                <Link href={w.keywordNote.href} className="text-channels-text underline underline-offset-4">
                  {w.keywordNote.link}
                </Link>
                {w.keywordNote.after}
              </span>
            </p>,
          ]}
        />
        <NetworkInsights />
        <ChannelsFilterShowcase />
      </FeaturePageTemplate>
    </ChannelStateProvider>
  )
}
