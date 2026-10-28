"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

import { channelNetworks, type ChannelKey } from "@/content/channels-data"
import { channelsWalkthrough } from "@/content/features/channel-analysis"

export type ViewKey = "keywords" | "entity" | "groups" | "hashtags" | "object"

type ChannelState = {
  /** Network open in "Choose a network" (the hero chips set it too). */
  net: ChannelKey
  setNet: (net: ChannelKey) => void
  /** Sample network picked on each walkthrough block. */
  views: Record<ViewKey, ChannelKey>
  setView: (view: ViewKey, net: ChannelKey) => void
}

const Ctx = createContext<ChannelState | null>(null)

const initialViews: Record<ViewKey, ChannelKey> = { keywords: "facebook", entity: "facebook", groups: "facebook", hashtags: "facebook", object: "facebook" }

/** Shared state for the Channel Analysis page: the hero "Jump to a network" chips, the switcher and the walkthrough pickers. */
export function ChannelStateProvider({ children }: { children: ReactNode }) {
  const [net, setNet] = useState<ChannelKey>("facebook")
  const [views, setViews] = useState(initialViews)
  const value = useMemo<ChannelState>(
    () => ({ net, setNet, views, setView: (view, n) => setViews((v) => (v[view] === n ? v : { ...v, [view]: n })) }),
    [net, views],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useChannelState() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useChannelState must be used inside ChannelStateProvider")
  return ctx
}

/** Walkthrough block 5 title: "Native object: Page | Channel | User", following that block's picker. */
export function NativeObjectTitle() {
  const { views } = useChannelState()
  return <>{channelsWalkthrough.objectTitle(channelNetworks[views.object].obj)}</>
}
