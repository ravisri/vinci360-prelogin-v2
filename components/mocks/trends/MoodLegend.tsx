import type { Sentiment } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const ORDER: Sentiment[] = ["pos", "neu", "neg"]

/** "▲ Positive – Neutral ▼ Negative" key for the clouds (glyph + word + colour). */
export function MoodLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex gap-3 text-[0.71875rem] font-normal", className)}>
      {ORDER.map((s) => (
        <li key={s} className={sentimentText[s]}>
          {sentimentGlyph[s]} {sentimentLabel[s]}
        </li>
      ))}
    </ul>
  )
}
