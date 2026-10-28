import type { ReactNode } from "react"

import { Bars } from "@/components/charts/Bars"
import { Sparkline } from "@/components/charts/Sparkline"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { tones } from "@/components/charts/tones"
import { ShareBar } from "@/components/mocks/channels/ShareBar"
import { avatar, dk, dtab, fpill, hotspotSide, wt } from "@/components/mocks/channels/styles"
import { Delta } from "@/components/mocks/Delta"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { CountUp } from "@/components/motion/CountUp"
import { channelNetworks, channelsHero, type ChannelHotspot, type ChannelKey, type ChannelKpi, type HotspotSlot } from "@/content/channels-data"
import { channelsSwitcher as c } from "@/content/features/channel-analysis"
import type { Split } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

type NetworkPanelProps = {
  network: ChannelKey
  /** hero = Facebook reactions + follower growth only · switcher = the full native page. */
  variant?: "hero" | "switcher"
  className?: string
}

/** `hide` = switcher hotspots, absent below md as in the 390 reference. */
type Spot = ChannelHotspot & { n: number; hide?: boolean }

const localeFor = (k: { format?: Intl.NumberFormatOptions }) => (k.format?.notation === "compact" ? "en-US" : "en-GB")

/** Widget wrapper that carries the hotspots anchored to it, on its edge so they never cover its numbers. */
function Slot({ at, spots, className, children }: { at: HotspotSlot; spots: readonly Spot[]; className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {spots
        .filter((s) => s.at === at)
        .map((s) => (
          <Hotspot key={s.n} n={s.n} title={s.title} text={s.text} accent="channels" pulse={s.n === 1} className={cn(hotspotSide[s.side], s.hide && "max-md:hidden")} />
        ))}
    </div>
  )
}

function Kpi({ k }: { k: ChannelKpi }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 rounded-lg border border-border bg-card p-2.5">
      <span className="truncate text-[0.6875rem] text-muted-foreground">{k.label}</span>
      <strong className={cn("font-heading text-lg leading-tight font-bold tabular", k.valueTone && sentimentText[k.valueTone])}>
        {k.prefix && <span aria-hidden="true">{k.prefix}</span>}
        <CountUp value={k.value} format={k.format} locale={localeFor(k)} />
        {k.suffix && <span className={k.suffix.startsWith(" ") ? "text-xs font-medium text-muted-foreground" : undefined}>{k.suffix}</span>}
      </strong>
      {k.delta ? (
        <Delta trend={k.delta.trend} tone={k.delta.tone} className="text-[0.6875rem]">
          {k.delta.text}
        </Delta>
      ) : (
        <span className={cn("text-[0.6875rem]", k.valueTone ? [sentimentText[k.valueTone], "font-semibold"] : "text-muted-foreground")}>{k.sub}</span>
      )}
    </div>
  )
}

/** "▲ 61% Positive · – 25% Neutral · ▼ 14% Negative" under a sentiment bar: never colour alone. */
function SplitWords({ split, stacked }: { split: Split; stacked?: boolean }) {
  return (
    <span className={cn("flex gap-x-1.5 text-xs tabular", stacked ? "flex-col" : "flex-wrap")}>
      {(["pos", "neu", "neg"] as const).map((s, i) => (
        <span key={s} className={sentimentText[s]}>
          {sentimentGlyph[s]} {split[i]}% {sentimentLabel[s]}
          {!stacked && i < 2 && <span className="text-muted-foreground"> ·</span>}
        </span>
      ))}
    </span>
  )
}

/**
 * The single data-driven network panel (content/channels-data.ts): frame, owner, filter pills,
 * native KPIs, the network's own detail (reactions · videos · influence · amplification),
 * sentiment and hotspots. Extras the 390 reference leaves out are hidden below md.
 */
export function NetworkPanel({ network, variant = "switcher", className }: NetworkPanelProps) {
  const n = channelNetworks[network]
  const hero = variant === "hero"
  const spots: Spot[] = (hero ? channelsHero.hotspots : n.hotspots).map((h, i) => ({ ...h, n: i + 1, hide: !hero }))
  const d = n.detail
  const desktopOnly = hero ? undefined : "max-md:hidden"

  const kpis = hero ? null : (
    <Slot at="kpis" spots={spots}>
      <div className={cn("grid grid-cols-2 gap-2", n.kpis.length === 4 ? "md:grid-cols-4" : "md:grid-cols-5")}>
        {n.kpis.map((k, i) => (
          <div key={k.label} className={cn("grid", i === 4 && "max-md:hidden")}>
            <Kpi k={k} />
          </div>
        ))}
      </div>
    </Slot>
  )

  const sentiment =
    hero || !n.sentiment ? null : (
      <Slot at="sentiment" spots={spots} className={cn(d.kind !== "reactions" && "max-md:hidden", d.kind === "influence" && "md:flex-1")}>
        <div className={cn(dk, "flex h-full flex-col gap-2")}>
          {n.sentiment.title && <span className={wt}>{n.sentiment.title}</span>}
          <StackedBar100 data={n.sentiment.split} height={12} labels={false} />
          <SplitWords split={n.sentiment.split} stacked={d.kind === "influence"} />
        </div>
      </Slot>
    )

  let detail: ReactNode = null
  if (d.kind === "reactions") {
    detail = (
      <div className={cn("grid gap-2.5", hero ? "grid-cols-1" : "md:grid-cols-[1.2fr_1fr]", desktopOnly)}>
        <Slot at="reactions" spots={spots}>
          <div className={cn(dk, "flex h-full flex-col gap-2")}>
            <span className={wt}>
              {d.title}
              {hero && <span className="tabular"> · {d.total}</span>}
            </span>
            <ShareBar segs={d.items} height={hero ? 18 : 20} />
            {hero ? (
              <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[0.71875rem] tabular">
                {d.items.map((r) => (
                  <li key={r.label} className={cn("flex items-center gap-1.5", r.bold && "font-bold")}>
                    <span aria-hidden="true" className={cn("size-2 rounded-full", tones[r.tone].bg)} />
                    <span className="whitespace-nowrap">
                      {r.label} {r.share}%
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs tabular">
                {d.items.map((r) => (
                  <li key={r.label} className={cn("flex items-center gap-1.5", r.bold && "font-bold")}>
                    <span aria-hidden="true" className={cn("size-2 flex-none rounded-full", tones[r.tone].bg)} />
                    <span className="whitespace-nowrap">
                      {r.label} {r.share}%{" "}
                      {r.delta ? (
                        <Delta trend={r.delta.trend} tone={r.delta.tone}>
                          {r.delta.text}
                        </Delta>
                      ) : (
                        <span className="font-normal text-muted-foreground">· {r.note}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Slot>
        <Slot at="growth" spots={spots}>
          <div className={cn(dk, "flex h-full flex-col gap-1.5")}>
            <div className="flex items-baseline justify-between gap-3">
              <span className={wt}>{d.growth.title}</span>
              <Delta trend="up" className="text-xs">
                {hero ? d.growth.deltaHero : d.growth.delta}
              </Delta>
            </div>
            <Sparkline data={d.growth.series} tone="channels" width={hero ? 400 : 300} height={hero ? 80 : 100} strokeWidth={3} className="w-full" />
            {!hero && <span className="text-[0.6875rem] text-muted-foreground tabular">{d.growth.range}</span>}
          </div>
        </Slot>
      </div>
    )
  } else if (d.kind === "videos") {
    const flagged = d.rows.find((r) => r.flag)
    detail = (
      <>
        {flagged && (
          <div className={cn(dk, "flex flex-col gap-1.5 border-channels md:hidden")}>
            <span className="text-[0.6875rem] font-bold text-channels">{flagged.flag}</span>
            <strong className="text-[0.8125rem]">{flagged.title}</strong>
            <span className="text-[0.71875rem] tabular">
              {flagged.views} views · {flagged.likes} likes · {flagged.comments} comments
            </span>
            <SentimentChip sentiment={flagged.sentiment} className="self-start" />
          </div>
        )}
        <div className="grid gap-2.5 max-md:hidden md:grid-cols-[1.75fr_1fr]">
          <Slot at="table" spots={spots}>
            <div className="h-full rounded-lg border border-border bg-card px-1 py-1.5">
              <table className={dtab}>
                <caption className="sr-only">{d.caption}</caption>
                <thead>
                  <tr>
                    <th scope="col">Video</th>
                    <th scope="col" className="r">
                      Views
                    </th>
                    <th scope="col" className="r">
                      Likes
                    </th>
                    <th scope="col" className="r">
                      Comments
                    </th>
                    <th scope="col" className="border-l border-border">
                      Comment sentiment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {d.rows.map((r) => (
                    <tr key={r.title} className={cn(r.flag && "bg-muted outline-2 -outline-offset-2 outline-channels")}>
                      <td>
                        <span className="block">{r.title}</span>
                        {r.flag && <span className="text-[0.6875rem] font-bold text-channels">{r.flag}</span>}
                      </td>
                      <td className="r">{r.views}</td>
                      <td className="r">{r.likes}</td>
                      <td className="r">{r.comments}</td>
                      <td className="border-l border-border">
                        <SentimentChip sentiment={r.sentiment} className="whitespace-nowrap" />
                        <span className="sr-only"> {r.pct}%</span>
                        <span aria-hidden="true" className="ml-1 text-[0.6875rem] text-muted-foreground">
                          {r.pct}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Slot>
          <Slot at="subs" spots={spots}>
            <div className={cn(dk, "flex h-full flex-col gap-1.5")}>
              <span className={wt}>{d.subs.title}</span>
              <Sparkline data={d.subs.series} tone="channels" width={220} height={110} strokeWidth={3} className="w-full" />
              <span className="text-xs tabular">{d.subs.moves}</span>
              <span className="text-[0.8125rem] font-bold text-pos tabular">{d.subs.net}</span>
            </div>
          </Slot>
        </div>
      </>
    )
  } else if (d.kind === "influence") {
    detail = (
      <div className="flex flex-col gap-1.5">
        <Slot at="influence" spots={spots}>
          <div className="grid grid-cols-2 gap-2.5">
            <div className={cn(dk, "flex flex-col gap-1")}>
              <span className="text-xs text-muted-foreground">{d.followers.label}</span>
              <strong className="font-heading text-xl font-bold tabular md:text-[1.75rem]">
                <CountUp value={d.followers.value} format={{ notation: "compact", maximumFractionDigits: 1 }} locale="en-US" />
              </strong>
              <Delta trend="up" className="text-xs">
                {d.followers.delta}
              </Delta>
            </div>
            <div className={cn(dk, "flex flex-col gap-1.5 border-channels")}>
              <span className="text-xs text-muted-foreground">
                <span className="md:hidden">{d.score.labelShort}</span>
                <span className="max-md:hidden">{d.score.label}</span>
              </span>
              <strong className="font-heading text-xl font-bold tabular md:text-[1.75rem]">
                <CountUp value={d.score.value} />
                <span className="text-xs font-medium text-muted-foreground md:text-[0.9375rem]"> / 100</span>
              </strong>
              <div aria-hidden="true" className="overflow-hidden rounded-full bg-border max-md:hidden">
                <ShareBar segs={[{ share: d.score.value, tone: "channels" }]} height={8} className="rounded-full" />
              </div>
            </div>
          </div>
        </Slot>
        <p className="text-[0.71875rem] text-muted-foreground max-md:hidden">{d.note}</p>
      </div>
    )
  } else {
    detail = (
      <Slot at="amplification" spots={spots}>
        <div className="grid grid-cols-2 gap-2.5">
          {d.sides.map((side) => (
            <div key={side.title} className={cn(dk, "flex flex-col gap-2", side.outlined && "border-channels")}>
              <span className={wt}>{side.title}</span>
              <div className="flex flex-wrap gap-x-4.5 gap-y-1 text-xs">
                {side.stats.map((s) => (
                  <span key={s.label}>
                    <span className="text-muted-foreground">{s.label}</span>
                    <strong className="block font-heading text-lg font-bold tabular md:text-[1.375rem]">{s.value}</strong>
                  </span>
                ))}
              </div>
              <Bars
                data={[{ label: side.title, values: side.bars, tone: side.tone }]}
                labels={side.bars.map((_, i) => `Day ${i + 1}`)}
                ariaLabel={`${side.title} by day, last 7 days`}
                axis={false}
                max={100}
                height={70}
                width={240}
                className="max-md:hidden"
              />
            </div>
          ))}
        </div>
      </Slot>
    )
  }

  const pills = hero ? channelsHero.pills : n.pills

  return (
    <MockFrame
      caption={hero ? channelsHero.caption : n.caption}
      chrome={
        <>
          <span className="md:hidden">{c.frameMobile(n.name, n.obj)}</span>
          <span className="max-md:hidden">{c.frame(n.name, n.obj)}</span>
        </>
      }
      className={cn("overflow-visible tabular", className)}
      bodyClassName="gap-3.5"
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className={avatar}>
          {n.owner.initials}
        </span>
        <span className="leading-[1.3]">
          <strong className="block text-sm md:text-[0.9375rem]">{n.owner.name}</strong>
          <span className="text-xs text-muted-foreground">{n.owner.sub}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 max-md:hidden">
        {pills.map((p) => (
          <span key={p.label} className={fpill}>
            <b>{p.label}</b>
            {p.value}
          </span>
        ))}
      </div>
      {n.detailFirst ? (
        <>
          {detail}
          {kpis}
        </>
      ) : (
        <>
          {kpis}
          {detail}
        </>
      )}
      {d.kind === "influence" && !hero ? (
        <div className="flex gap-2.5 max-md:hidden">
          {sentiment}
          <div className={cn(dk, "flex flex-[1.2] flex-col gap-2")}>
            <span className={wt}>{d.top.title}</span>
            <ul className="grid grid-cols-3 gap-1.5 text-[0.6875rem]">
              {d.top.items.map((t, i) => (
                <li key={i} className="flex h-18 flex-col justify-end rounded-sm bg-muted p-2">
                  {t.type}
                  <strong className="text-[0.8125rem] tabular">{t.likes}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        sentiment
      )}
      {n.footnote && !hero && <p className="text-[0.71875rem] text-muted-foreground">{n.footnote}</p>}
    </MockFrame>
  )
}
