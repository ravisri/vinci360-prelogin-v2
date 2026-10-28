"use client"

import { useEffect, useId, useRef, useState } from "react"
import { animate, useReducedMotion } from "motion/react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { MockFrame } from "@/components/mocks/MockFrame"
import { thresholdSplit, useSentimentState } from "@/components/mocks/sentiment/SentimentStateProvider"
import { darkCard } from "@/components/mocks/smi/styles"
import { Slider } from "@/components/ui/slider"
import { sentimentPartAWidgets } from "@/content/features/sentiment-keywords"
import { sentiment, type Split } from "@/content/sample-data"
import { easeOutExpo } from "@/lib/motion"
import { sentimentGlyph } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = sentimentPartAWidgets.threshold
const t = sentiment.threshold
const glyphs = [sentimentGlyph.pos, sentimentGlyph.neu, sentimentGlyph.neg] as const

/** Tweens a split towards `target` (0.45s), so the bar and its % counts move together; instant with reduced motion. */
function useTweenedSplit(target: Split): Split {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState<Split>(target)
  const from = useRef<Split>(target)

  useEffect(() => {
    if (reduced) {
      from.current = target
      return
    }
    const start = from.current
    const controls = animate(0, 1, {
      duration: 0.45,
      ease: easeOutExpo,
      onUpdate: (p) => {
        const next = start.map((v, i) => v + (target[i] - v) * p) as unknown as Split
        from.current = next
        setShown(next)
      },
    })
    return () => controls.stop()
    // The split is derived from the threshold; compare by value, not identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target[0], target[1], target[2], reduced])

  return reduced ? target : shown
}

function Compare({ label, split }: { label: string; split: Split }) {
  return (
    <div className={cn(darkCard, "flex flex-col gap-2 p-3")}>
      <span className="text-[0.71875rem] font-semibold">{label}</span>
      <StackedBar100 data={split} height={16} labels={false} />
      <span className="text-[0.65625rem] text-muted-foreground">{split.map((v, i) => `${glyphs[i]} ${v}%`).join(" · ")}</span>
    </div>
  )
}

/**
 * Part A · 3 · Sentiment threshold. The slider (shared with the filter bar) sets the confidence a
 * post needs to count as positive or negative; the bar and its ▲ – ▼ percentages tween to the new
 * split, and the live note says how much is now below the line.
 */
export function ThresholdWidget() {
  const { threshold, setThreshold } = useSentimentState()
  const target = thresholdSplit(threshold)
  const shown = useTweenedSplit(target)
  const rounded = shown.map(Math.round) as unknown as Split
  const labelId = useId()
  const valueText = `${threshold}${c.confidence}`

  return (
    <MockFrame title={c.title} caption={c.caption} bodyClassName="gap-3.5 p-4.5">
      <div className={cn(darkCard, "flex flex-col gap-2.5 p-3.5")}>
        <p className="flex justify-between gap-3 text-[0.78125rem] font-semibold">
          <span id={labelId}>{c.label}</span>
          <span className="text-chart-3 tabular">{valueText}</span>
        </p>
        <Slider
          min={t.min}
          max={t.max}
          step={t.step}
          value={[threshold]}
          onValueChange={([v]) => setThreshold(v)}
          aria-labelledby={labelId}
          valueText={valueText}
          rangeClassName="bg-chart-3"
          thumbClassName="border-chart-3"
          className="h-8"
        />
        <p aria-hidden="true" className="flex justify-between text-[0.65625rem] text-muted-foreground">
          <span>{c.relaxed}</span>
          <span>{c.strict}</span>
        </p>
        <StackedBar100
          data={shown}
          height={24}
          segmentLabels={rounded.map((v, i) => `${glyphs[i]} ${v}%`) as unknown as [string, string, string]}
          ariaLabel={`Positive ${target[0]}%, neutral ${target[1]}%, negative ${target[2]}%`}
        />
        <p aria-live="polite" className="text-[0.71875rem] text-muted-foreground">
          {c.belowLine(target[1])}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Compare label={`${c.relaxed} (${t.relaxed.at}%)`} split={t.relaxed.split} />
        <Compare label={`${c.strict} (${t.strict.at}%)`} split={t.strict.split} />
      </div>
    </MockFrame>
  )
}
