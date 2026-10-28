import { BarChart3 } from "lucide-react"

import { NetworkPanel } from "@/components/mocks/channels/NetworkPanel"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { channelsHero } from "@/content/channels-data"

/**
 * Source Analysis hero: the Interactions view (interaction types, audience growth) with two
 * hotspots on the widget edges, and the "Reactions" float below the frame (never over a number).
 */
export function ChannelsHeroMock() {
  const f = channelsHero.float
  return (
    <VisualPanel accent="channels" dots="bl" className="md:pb-20">
      <NetworkPanel network={channelsHero.network} variant="hero" className="md:ml-auto md:w-[94%]" />
      <FloatCard enter float className="flex items-center gap-2.5 px-4 py-3 md:-bottom-15 md:left-0">
        <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-sm bg-channels-tint text-channels-text">
          <BarChart3 strokeWidth={2} className="size-4.5" />
        </span>
        <span className="text-sm">
          <strong>{f.label}</strong> {f.love.label}{" "}
          <Delta trend="up" className="font-bold">
            {f.love.delta}
          </Delta>{" "}
          · {f.angry.label}{" "}
          <Delta trend="down" tone="pos" className="font-bold">
            {f.angry.delta}
          </Delta>
          <span className="sr-only"> {f.sr}</span>
        </span>
      </FloatCard>
    </VisualPanel>
  )
}
