"use client"

import { useId } from "react"
import { AnimatePresence, m } from "motion/react"

import { brandStyle, type BrandKey } from "@/components/mocks/compare/brand"
import { crossFade, transition } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Brand-coloured hatch (base fill + dark stripes) for "owned alone" bars and the Kestrel segment. */
export function BrandHatchDefs({ id, brand, stretched, scaleX = 1 }: { id: string; brand: BrandKey; stretched?: boolean; scaleX?: number }) {
  // In a stretched (preserveAspectRatio="none") 0–100 viewBox, upright stripes 1.6 units apart read as a hatch.
  const w = stretched ? 1.6 : 6
  return (
    <defs>
      <pattern id={id} patternUnits="userSpaceOnUse" width={w} height="6" patternTransform={stretched ? (scaleX !== 1 ? `scale(${1 / scaleX} 1)` : undefined) : "rotate(45)"}>
        <rect width={w} height="6" className={brandStyle[brand].fill} />
        <rect width={w * 0.4} height="6" className="fill-background/45" />
      </pattern>
    </defs>
  )
}

export const useBrandHatchId = () => `bh-${useId().replace(/[^a-zA-Z0-9]/g, "")}`

export type StackItem = { brand: BrandKey; pct: number; label: string }

type BrandStackProps = {
  items: readonly StackItem[]
  /** Bar height in px. */
  height?: number
  /** Hatch the Kestrel segment (desktop reference); solid otherwise. */
  hatchKestrel?: boolean
  className?: string
}

/**
 * 100% stacked bar of brand shares. Segments slide and resize (transform only) when the set or
 * the shares change; labels fade in at their new place. Decorative: callers give the figures as text.
 */
export function BrandStack({ items, height = 30, hatchKestrel, className }: BrandStackProps) {
  const hatch = useBrandHatchId()
  const starts = items.map((_, i) => items.slice(0, i).reduce((a, it) => a + it.pct, 0))
  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden rounded-sm bg-border", className)}>
      <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" width="100%" height={height} className="block">
        {/* The segment is drawn full width and scaled down, so the pattern is scaled back up to keep its spacing. */}
        {hatchKestrel && <BrandHatchDefs id={hatch} brand="kestrel" stretched scaleX={Math.max((items.find((it) => it.brand === "kestrel")?.pct ?? 100) / 100, 0.01)} />}
        {items.map((it, i) => (
          <m.rect
            key={it.brand}
            width="100"
            height={height}
            initial={{ x: starts[i], scaleX: 0, originX: 0 }}
            animate={{ x: starts[i], scaleX: it.pct / 100, originX: 0 }}
            transition={transition}
            // A fill class would override the pattern attribute, so hatched segments take the attribute only.
            className={hatchKestrel && it.brand === "kestrel" ? undefined : brandStyle[it.brand].fill}
            fill={hatchKestrel && it.brand === "kestrel" ? `url(#${hatch})` : undefined}
          />
        ))}
      </svg>
      <svg width="100%" height={height} className="absolute inset-0 block overflow-visible">
        <AnimatePresence initial={false}>
          {items.map((it, i) =>
            it.label && it.pct > 0 ? (
              <m.text
                key={`${it.brand}-${starts[i]}-${it.pct}`}
                variants={crossFade}
                initial="hidden"
                animate="show"
                exit="exit"
                x={`${starts[i]}%`}
                dx={i ? 7 : 6}
                y={height / 2}
                dominantBaseline="central"
                fontSize="12"
                className="fill-ink font-bold tabular"
              >
                {it.label}
              </m.text>
            ) : null,
          )}
        </AnimatePresence>
      </svg>
    </div>
  )
}
