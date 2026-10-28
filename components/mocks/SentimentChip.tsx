import type { Sentiment } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentShort } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const filled: Record<Sentiment, string> = {
  pos: "bg-pos text-primary-foreground",
  neu: "bg-neu text-primary-foreground",
  neg: "bg-neg text-primary-foreground",
}

/**
 * "▼ Negative" chip. Filled on light; inside `.on-dark` the sentiment tokens turn bright, so the chip
 * switches to coloured text with a matching border (the pre-checked "on dark card" pairs).
 */
export function SentimentChip({
  sentiment,
  short,
  className,
}: {
  sentiment: Sentiment
  /** "▲ Pos" instead of "▲ Positive". */
  short?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-none items-center gap-1 rounded-full border border-transparent px-2 py-0.5 text-[0.6875rem] leading-[1.3] font-semibold",
        filled[sentiment],
        "on-dark:border-current on-dark:bg-transparent",
        sentiment === "pos" && "on-dark:text-pos",
        sentiment === "neu" && "on-dark:text-neu",
        sentiment === "neg" && "on-dark:text-neg",
        className,
      )}
    >
      <span aria-hidden="true">{sentimentGlyph[sentiment]}</span>
      {short ? (
        <>
          <span aria-hidden="true">{sentimentShort[sentiment]}</span>
          <span className="sr-only">{sentimentLabel[sentiment]}</span>
        </>
      ) : (
        sentimentLabel[sentiment]
      )}
    </span>
  )
}
