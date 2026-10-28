"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

import { sentiment, type SentimentKeywordId, type Split } from "@/content/sample-data"

type SentimentState = {
  /** Confidence % a post needs to count as positive or negative (Part A block 3 and the filter bar). */
  threshold: number
  setThreshold: (t: number) => void
  /** The one keyword every Part B widget is about. */
  keyword: SentimentKeywordId
  setKeyword: (k: SentimentKeywordId) => void
  /** Topics switched off in "Narrow it down". */
  off: readonly string[]
  toggleTopic: (n: string) => void
}

const t = sentiment.threshold

/** Split at a confidence threshold: positive and negative shrink linearly, neutral takes the rest. */
export function thresholdSplit(at: number): Split {
  const pos = Math.round(t.pos.base - (at - t.min) * t.pos.slope)
  const neg = Math.round(t.neg.base - (at - t.min) * t.neg.slope)
  return [pos, 100 - pos - neg, neg]
}

const Ctx = createContext<SentimentState>({
  threshold: t.initial,
  setThreshold: () => {},
  keyword: sentiment.keywordOrder[0],
  setKeyword: () => {},
  off: [],
  toggleTopic: () => {},
})

/**
 * Shared state for the Sentiment & Keywords page, so the threshold slider, the keyword picker and
 * the filter bar stay in sync across sections. Server children pass through unchanged.
 */
export function SentimentStateProvider({ children }: { children: ReactNode }) {
  const [threshold, setThreshold] = useState(t.initial)
  const [keyword, setKeyword] = useState<SentimentKeywordId>(sentiment.keywordOrder[0])
  const [off, setOff] = useState<readonly string[]>([])
  const value = useMemo(
    () => ({
      threshold,
      setThreshold,
      keyword,
      setKeyword,
      off,
      toggleTopic: (n: string) => setOff((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n])),
    }),
    [threshold, keyword, off],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useSentimentState = () => useContext(Ctx)
