"use client"

import { createContext, useContext } from "react"

import type { Network, TourRange } from "@/content/sample-data"

export type TourState = {
  /** Shared date window; every step's numbers follow it. */
  range: TourRange
  toggleRange: () => void
  /** Set by the Channel modules in free explore; shown as the Platform filter on step 2. */
  channel: Network | null
  /** Idle nudge on the active step's first hotspot. */
  nudge: boolean
}

export const TourContext = createContext<TourState>({ range: "30d", toggleRange: () => {}, channel: null, nudge: false })

/** Tour state for the step mocks, provided by TourStepper. */
export const useTour = () => useContext(TourContext)
