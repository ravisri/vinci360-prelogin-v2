import type { Sentiment, Trend } from "@/content/sample-data"
import { sentimentText, trendGlyph, trendText, trendWord } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

type DeltaProps = {
  trend: Trend
  /** Colour override when the direction and its meaning differ, e.g. negative mentions ▲ = bad. */
  tone?: Sentiment
  children: React.ReactNode
  className?: string
}

/** "▲ 18.4% vs prev." — glyph + text + colour, with the direction spelled out for screen readers. */
export function Delta({ trend, tone, children, className }: DeltaProps) {
  return (
    <span className={cn("font-semibold tabular", tone ? sentimentText[tone] : trendText[trend], className)}>
      <span aria-hidden="true">{trendGlyph[trend]} </span>
      <span className="sr-only">{trendWord[trend]} </span>
      {children}
    </span>
  )
}
