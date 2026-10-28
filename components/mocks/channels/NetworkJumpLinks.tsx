"use client"

import { useChannelState } from "@/components/mocks/channels/ChannelStateProvider"
import { ViewIcon } from "@/components/mocks/channels/ViewIcon"
import { channelNetworks, channelOrder } from "@/content/channels-data"
import { channelsJump } from "@/content/features/channel-analysis"

/** Hero "Jump to a network": each chip opens that network in "Choose a network" (#switch). */
export function NetworkJumpLinks() {
  const { setNet } = useChannelState()
  return (
    <div className="mt-1 flex flex-col gap-2 max-md:hidden">
      <span className="text-[0.8125rem] font-semibold text-neutral-text">{channelsJump.label}</span>
      <ul className="flex flex-wrap gap-2">
        {channelOrder.map((k) => (
          <li key={k}>
            <a
              href="#switch"
              onClick={() => setNet(k)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground hover:border-channels-text hover:bg-channels-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ViewIcon view={k} className="size-4.5" />
              {channelNetworks[k].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
