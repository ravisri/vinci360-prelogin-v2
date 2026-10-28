"use client"

import { useId, useState, type ReactNode } from "react"
import { Check, ExternalLink, Users } from "lucide-react"
import { m, useReducedMotion } from "motion/react"

import { Sparkline } from "@/components/charts/Sparkline"
import { useChannelState, type ViewKey } from "@/components/mocks/channels/ChannelStateProvider"
import { avatar, checkBadge, dk, dtab, pickerItem } from "@/components/mocks/channels/styles"
import { Delta } from "@/components/mocks/Delta"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { ReachNote } from "@/components/mocks/ReachNote"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { channelNetworks, channelOrder, channelPosts, entityDots, entityTones, type ChannelKey } from "@/content/channels-data"
import { channelsWalkthrough as c } from "@/content/features/channel-analysis"
import type { Sentiment } from "@/content/sample-data"
import { crossFade } from "@/lib/motion"
import { sentimentGlyph, sentimentLabel, sentimentShort, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const copy = {
  keywords: c.views.keywords,
  entity: c.views.entity,
  groups: c.views.groups,
  hashtags: c.views.hashtags,
  object: c.views.object,
} as const

/** "▲ 64% Positive" chip in the on-dark style: glyph + share + word. */
function SentPct({ sentiment, pct, short }: { sentiment: Sentiment; pct: number; short?: boolean }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-current px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap tabular", sentimentText[sentiment])}>
      {sentimentGlyph[sentiment]} {pct}%{" "}
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

/**
 * Hotspots sit outside the frame (which clips overflow), centred on its left or right edge so the dot
 * lands in the frame's padding, clear of every number and label. Hotspot translates -50%, hence -right-11.
 */
const spots: Record<ViewKey, readonly [string, string]> = {
  keywords: ["top-[55%] -right-11", "top-[24%] left-0"],
  entity: ["top-1/2 -right-11", "top-[44%] left-0"],
  groups: ["top-[24%] left-0", "top-[58%] -right-11"],
  hashtags: ["top-[38%] left-0", "top-[62%] -right-11"],
  object: ["top-[42%] -right-11", "top-[20%] left-0"],
}

function Table({ caption, cols, numeric, children }: { caption: string; cols: readonly string[]; numeric: readonly number[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className={cn(dtab, "min-w-110")}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {cols.map((col, i) => (
              <th key={col} scope="col" className={numeric.includes(i) ? "r" : undefined}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function caption(view: ViewKey, k: ChannelKey) {
  const n = channelNetworks[k]
  const w = n.walk
  const s = (r: { sentiment: Sentiment; pct: number }) => `${r.pct}% ${sentimentLabel[r.sentiment]}`
  switch (view) {
    case "keywords":
      return `Sample keyword table on ${n.name}: ${w.keywords.rows.map((r) => `${r.name} ${r.mentions} mentions, ${s(r)}`).join("; ")}.`
    case "entity":
      return `Sample entity table on ${n.name}: ${w.entities.map((r) => `${r.name} ${r.mentions} mentions, trend ${r.trend === "down" ? "down" : r.trend === "up" ? "up" : "flat"} ${r.change}`).join("; ")}.`
    case "groups":
      return `Sample groups on ${n.name} (${w.groups.kind}): ${w.groups.rows.map((r) => `${r.name}, mostly about ${r.topic}`).join("; ")}.`
    case "hashtags":
      return `Sample hashtags on ${n.name}: ${w.hashtags.map((r) => `${r.name} growth ${r.growthTrend === "down" ? "down" : "up"} ${r.growth}, ${s(r)}`).join("; ")}.`
    case "object":
      return `Sample ${n.obj} view on ${n.name} for ${n.owner.name}: ${w.objects.map((r) => `${r.name}, ${r.metric}, ${s(r)}`).join("; ")}.`
  }
}

/**
 * One walkthrough visual for all five views (Keywords · Entity · Groups · Hashtag-wise · Native
 * object). Each block has its own network picker; the sample cross-fades when it changes.
 */
export function NetworkViewMock({ view }: { view: ViewKey }) {
  const { views, setView } = useChannelState()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(-1)
  const [swaps, setSwaps] = useState(0)
  const postsId = useId()
  const k = views[view]
  const n = channelNetworks[k]
  const w = n.walk
  const label = view === "object" ? n.obj : copy[view].label

  let body: ReactNode
  if (view === "keywords") {
    body = (
      <>
        <p className="relative text-[0.78125rem] text-muted-foreground">
          {c.views.keywords.volume(n.name)}{" "}
          <strong className="text-foreground tabular">
            {w.keywords.volume} {c.views.keywords.posts}
          </strong>{" "}
          · {c.views.keywords.range}
        </p>
        <div className="relative">
          <Table caption={`Keywords on ${n.name}`} cols={c.views.keywords.cols} numeric={[1, 2, 3]}>
            {w.keywords.rows.map((r) => (
              <tr key={r.name}>
                <td className="font-semibold">{r.name}</td>
                <td className="r">{r.mentions}</td>
                <td className="r">{r.engagement}</td>
                <td className="r">{r.reach}</td>
                <td>
                  <SentPct sentiment={r.sentiment} pct={r.pct} />
                </td>
              </tr>
            ))}
          </Table>
        </div>
        <ReachNote className="text-[0.6875rem]" />
      </>
    )
  } else if (view === "entity") {
    body = (
      <div className="relative">
        <Table caption={`Entities on ${n.name}`} cols={c.views.entity.cols} numeric={[1, 2]}>
          {w.entities.map((r, i) => (
            <tr key={r.name}>
              <td className="font-semibold whitespace-nowrap">
                <span aria-hidden="true" className={cn("mr-1.5 inline-block size-2 rounded-full", entityDots[i])} />
                {r.name}
              </td>
              <td className="r">{r.mentions}</td>
              <td className="r">{r.engagement}</td>
              <td>
                <SentPct sentiment={r.sentiment} pct={r.pct} short />
              </td>
              <td>
                <Sparkline data={r.series} tone={entityTones[i]} width={92} height={28} strokeWidth={2.4} className="w-23" />
                <Delta trend={r.trend} className="block text-[0.6875rem]">
                  {r.change}
                </Delta>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    )
  } else if (view === "groups") {
    body = (
      <>
        <span className="relative inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-card px-2.5 py-1 text-[0.71875rem] font-semibold">
          <Users aria-hidden="true" strokeWidth={2} className="size-3.5" />
          {w.groups.kind}
        </span>
        <div className="relative">
          <Table caption={`Groups on ${n.name}`} cols={c.views.groups.cols} numeric={[1, 2]}>
            {w.groups.rows.map((r) => (
              <tr key={r.name}>
                <td className="font-semibold">{r.name}</td>
                <td className="r">{r.mentions}</td>
                <td className="r">{r.engagement}</td>
                <td>
                  <SentPct sentiment={r.sentiment} pct={r.pct} short />
                </td>
                <td>{r.topic}</td>
              </tr>
            ))}
          </Table>
        </div>
      </>
    )
  } else if (view === "hashtags") {
    body = (
      <>
        <div className="relative">
          <Table caption={`Hashtags on ${n.name}`} cols={c.views.hashtags.cols} numeric={[1, 2, 3, 4]}>
            {w.hashtags.map((r) => (
              <tr key={r.name}>
                <td className="font-semibold">{r.name}</td>
                <td className="r">{r.popularity}</td>
                <td className="r">{r.reach}</td>
                <td className="r">{r.engagement}</td>
                <td className="r">
                  <Delta trend={r.growthTrend} className="font-normal text-foreground">
                    {r.growth}
                  </Delta>
                </td>
                <td>
                  <SentPct sentiment={r.sentiment} pct={r.pct} short />
                </td>
              </tr>
            ))}
          </Table>
        </div>
        <div className="flex flex-col gap-0.5">
          <ReachNote className="text-[0.6875rem]" />
          <p className="text-[0.6875rem] text-muted-foreground">{c.views.hashtags.note}</p>
        </div>
      </>
    )
  } else {
    body = (
      <>
        <div className="relative flex items-center gap-2.5">
          <span aria-hidden="true" className={avatar}>
            {n.owner.initials}
          </span>
          <span className="leading-[1.3]">
            <strong className="block text-sm">{n.owner.name}</strong>
            <span className="text-xs text-muted-foreground">{n.owner.subObject}</span>
          </span>
        </div>
        <ul className="relative flex flex-col gap-1.5">
          {w.objects.map((r, i) => {
            const isOpen = open === i
            return (
              <li key={r.name} className={cn(dk, "flex flex-col gap-2 px-3 py-2")}>
                <div className="flex flex-wrap items-center gap-x-2.5">
                  <span className="min-w-0 flex-[1_1_180px] text-[0.8125rem] font-semibold">
                    {r.name}
                    <span className="block text-[0.71875rem] font-normal text-muted-foreground tabular">
                      {r.type} · {r.metric}
                    </span>
                  </span>
                  <SentPct sentiment={r.sentiment} pct={r.pct} />
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${postsId}-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-1 text-[0.8125rem] font-semibold text-on-dark-focus hover:underline"
                  >
                    {isOpen ? c.views.object.hide : c.views.object.open}
                    <ExternalLink aria-hidden="true" strokeWidth={2} className="size-3.5" />
                  </button>
                </div>
                <ul id={`${postsId}-${i}`} aria-label={c.views.object.postsLabel} hidden={!isOpen} className="flex flex-col gap-1.5">
                  {channelPosts[r.sentiment].map((p) => (
                    <li key={p.initials} className="flex items-center gap-2 rounded-sm bg-background p-2 text-[0.78125rem]">
                      <span aria-hidden="true" className="grid size-6.5 flex-none place-items-center rounded-full bg-muted text-[0.625rem] font-bold">
                        {p.initials}
                      </span>
                      <span className="flex-1">{p.text}</span>
                      <span className={cn("text-[0.625rem] font-semibold", sentimentText[p.sentiment])}>
                        {sentimentGlyph[p.sentiment]} {sentimentShort[p.sentiment]}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-3.5">
      <ToggleGroup
        type="single"
        spacing={2}
        aria-label={c.picker(copy[view].label)}
        value={k}
        onValueChange={(v) => {
          if (!v) return
          setView(view, v as ChannelKey)
          setOpen(-1)
          setSwaps((s) => s + 1)
        }}
        className="self-end"
      >
        {channelOrder.map((key) => (
          <ToggleGroupItem key={key} value={key} aria-label={c.pickerItem(channelNetworks[key].name)} className={pickerItem}>
            <NetworkIcon network={key} />
            <span aria-hidden="true" className={checkBadge}>
              <Check strokeWidth={3.5} className="size-2.5" />
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="relative">
        <MockFrame caption={caption(view, k)} chrome={`${n.name} · ${label}`} className="tabular">
          <m.div key={k} variants={crossFade} initial={reduced || !swaps ? false : "hidden"} animate="show" className="flex flex-col gap-2.5">
            {body}
          </m.div>
        </MockFrame>
        {copy[view].hotspots.map((h, i) => (
          <Hotspot key={h.title} n={i + 1} title={h.title} text={h.text} accent="channels" pulse={i === 0} className={spots[view][i]} />
        ))}
      </div>
    </div>
  )
}
