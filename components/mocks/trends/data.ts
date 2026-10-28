/** Helpers shared by the Trends mocks (plain module: server and client components both import it). */
import { trends, type Trend } from "@/content/sample-data"

export type TrendTopic = (typeof trends.topics)[number]

/** "488K" / "4.1M" → 488000 / 4100000, for sorting the reference's display strings. */
export function parseCompact(s: string) {
  const n = parseFloat(s)
  if (s.endsWith("M")) return n * 1_000_000
  if (s.endsWith("K")) return n * 1_000
  return n
}

/** Net sentiment = positive share minus negative share. */
export const net = (t: { split: readonly number[] }) => t.split[0] - t.split[2]

export const netTrend = (n: number): Trend => (n > 0 ? "up" : n < 0 ? "down" : "flat")

/** "+73" · "0" · "−26" (true minus sign, as in the reference). */
export const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0")

/** Screen-reader wording for rank movement. */
export const moveWords = (t: TrendTopic) =>
  t.trend === "flat" ? "no change" : `${t.trend} ${t.move} ${t.move === 1 ? "place" : "places"}`

export const byMomentum = [...trends.topics].sort((x, y) => y.momentum - x.momentum)
