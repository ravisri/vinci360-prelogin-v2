"use client"

import { createContext, useContext } from "react"

import type { ChannelKey } from "@/content/channels-data"
import type { TourRange } from "@/content/sample-data"

export type TourState = {
  /** Shared date window; every step's numbers follow it. */
  range: TourRange
  toggleRange: () => void
  /** Set by the Source Analysis view modules in free explore; shown as the View filter on step 2. */
  view: ChannelKey | null
  /** Idle nudge on the active step's first hotspot. */
  nudge: boolean
}

export const TourContext = createContext<TourState>({ range: "30d", toggleRange: () => {}, view: null, nudge: false })

/** Tour state for the step mocks, provided by TourStepper. */
export const useTour = () => useContext(TourContext)
