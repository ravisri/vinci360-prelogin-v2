"use client"

import { useState } from "react"

import { MockFrame } from "@/components/mocks/MockFrame"
import { BrandMarker } from "@/components/mocks/compare/brand"
import { GapTrendChart, leadAt } from "@/components/mocks/compare/GapTrendChart"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { darkCard } from "@/components/mocks/smi/styles"
import { compareWidgets } from "@/content/features/brand-compare"
import { compare } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = compareWidgets.gap
type Granularity = keyof Omit<typeof compare.engagementTrend, "notes">

/**
 * 3 · Trend of the gap: granularity switch, shaded gap to the leader, and a clickable column per
 * period that lists the posts behind it (click again to clear; a new granularity resets it).
 */
export function GapTrendWidget() {
  const [g, setG] = useState<Granularity>("weekly")
  const [selected, setSelected] = useState<number | null>(null)
  const data = compare.engagementTrend[g]
  const n = data.labels.length
  const now = leadAt(data, n - 1)
  const prev = leadAt(data, n - 2)
  const first = leadAt(data, 0)
  const delta = prev - now
  const label = c.options.find((o) => o.value === g)?.label ?? ""

  return (
    <MockFrame
      title={
        <Segmented
          label={c.granularity}
          value={g}
          options={c.options as { value: Granularity; label: string }[]}
          accent="cmp"
          onChange={(v) => {
            setG(v)
            setSelected(null)
          }}
        />
      }
      caption={c.caption(label, first, now)}
      bodyClassName="gap-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.8125rem] font-semibold">{c.title(data.unit)}</p>
        <span className="rounded-full bg-dark-border px-2.5 py-1 text-xs font-semibold text-on-dark-strong tabular">
          <span aria-hidden="true" className={delta >= 0 ? "text-pos" : "text-neg"}>
            {delta >= 0 ? "▼ " : "▲ "}
          </span>
          {c.chip(Math.abs(delta), now)}
        </span>
      </div>
      <GapTrendChart
        data={data}
        selected={selected}
        onSelect={(i) => setSelected((s) => (s === i ? null : i))}
        pointLabel={(i) => c.point(data.labels[i], data.aurora[i], data.nimbus[i], data.kestrel[i])}
      />
      <div className={cn(darkCard, "flex flex-col gap-2 p-3")}>
        <p aria-live="polite" className="text-xs font-semibold">
          {selected === null ? (
            <>
              <span className="md:hidden">{c.idleMobile}</span>
              <span className="max-md:hidden">{c.idle}</span>
            </>
          ) : (
            c.postsFor(data.labels[selected])
          )}
        </p>
        {selected !== null && (
          <ul className="flex flex-col gap-2">
            {compare.pointPosts.map((p) => (
              <li key={p.meta} className="flex items-start gap-2 text-xs">
                <BrandMarker brand={p.brand} className="mt-1" />
                <span>
                  {p.text}
                  <span className="block text-muted-foreground">{p.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MockFrame>
  )
}
