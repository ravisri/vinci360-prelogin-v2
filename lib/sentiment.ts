import type { Sentiment, Trend } from "@/content/sample-data"

/** Sentiment is never colour-only: every mark carries a glyph and a word. */
export const sentimentGlyph: Record<Sentiment, string> = { pos: "▲", neu: "–", neg: "▼" }
export const sentimentLabel: Record<Sentiment, string> = { pos: "Positive", neu: "Neutral", neg: "Negative" }
export const sentimentShort: Record<Sentiment, string> = { pos: "Pos", neu: "Neu", neg: "Neg" }

/** Text on light; re-skinned to the dark variants inside `.on-dark`. */
export const sentimentText: Record<Sentiment, string> = { pos: "text-pos", neu: "text-neu", neg: "text-neg" }

export const trendGlyph: Record<Trend, string> = { up: "▲", down: "▼", flat: "–" }
export const trendWord: Record<Trend, string> = { up: "up", down: "down", flat: "no change" }
export const trendText: Record<Trend, string> = { up: "text-pos", down: "text-neg", flat: "text-neu" }
