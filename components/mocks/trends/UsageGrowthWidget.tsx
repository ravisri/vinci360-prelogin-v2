"use client"

import { useState } from "react"
import { m } from "motion/react"

import { MockFrame } from "@/components/mocks/MockFrame"
import { fmt } from "@/components/mocks/home/kpi"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { MomentumBar } from "@/components/mocks/trends/MomentumBar"
import { LayoutMotion } from "@/components/motion/LayoutMotion"
import { trendsHashtagWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"
import { reorder } from "@/lib/motion"
import { cn } from "@/lib/utils"

const c = trendsHashtagWidgets.usageGrowth
type By = (typeof c.options)[number]["value"]

/** Block B2 · Usage vs growth: the same six tags, re-ranked by absolute usage or by growth rate. */
export function UsageGrowthWidget() {
  const [by, setBy] = useState<By>("usage")
  const value = (t: (typeof trends.hashtags)[number]) => (by === "usage" ? t.usage : t.growth)
  const rows = [...trends.hashtags].sort((x, y) => value(y) - value(x))
  const max = value(rows[0])

  return (
    <MockFrame
      title={<Segmented accent="trends" label={c.label} value={by} options={c.options} onChange={setBy} />}
      caption={c.caption}
      bodyClassName="gap-0 px-0 pt-3.5 pb-0 [&>div:first-child]:px-3.5 [&>div:first-child]:pb-2.5"
    >
      <LayoutMotion>
        <ol aria-live="polite" className="h-66 text-xs tabular">
          {rows.map((t, i) => (
            <m.li
              key={t.tag}
              layout="position"
              transition={reorder}
              className={cn(
                "grid h-11 grid-cols-[1.375rem_minmax(0,1.6fr)_minmax(0,0.8fr)_3.5rem] items-center gap-2.5 border-b border-border px-3 sm:grid-cols-[1.375rem_minmax(0,1.2fr)_minmax(0,1fr)_4rem]",
                i === 0 && "bg-border",
              )}
            >
              <span className="text-muted-foreground">{i + 1}</span>
              <span className="truncate font-semibold">{t.tag}</span>
              <MomentumBar value={Math.round((value(t) / max) * 100)} display={false} trackFillClassName={i === 0 ? "fill-background" : "fill-border"} />
              <span className="text-right font-bold">
                {by === "usage" ? (
                  fmt(t.usage)
                ) : (
                  <>
                    <span aria-hidden="true">▲ </span>
                    <span className="sr-only">up </span>
                    {t.growth}%
                  </>
                )}
              </span>
            </m.li>
          ))}
        </ol>
      </LayoutMotion>
    </MockFrame>
  )
}
