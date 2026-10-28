import { ExternalLink } from "lucide-react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { PostCard } from "@/components/mocks/PostCard"
import { darkCard } from "@/components/mocks/smi/styles"
import { darkAction, evTile } from "@/components/mocks/stories/styles"
import { CountUp } from "@/components/motion/CountUp"
import {
  storiesLabels as l,
  storiesWidgets as w,
} from "@/content/features/promotable-stories"
import { stories } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const lead = stories.candidates[0]
const compact = { notation: "compact", maximumFractionDigits: 1 } as const
const n = (v: number) => new Intl.NumberFormat("en-GB").format(v)

/** 2 · The evidence: volume, engagement, reach (estimated) and sentiment, each with its change. */
export function EvidenceWidget() {
  const e = w.evidence
  const tiles = [
    {
      label: e.labels.volume,
      value: <CountUp value={lead.volume} />,
      delta: `▲ ${lead.volumeDelta}% ${e.vsPrev}`,
    },
    {
      label: e.labels.engagement,
      value: (
        <CountUp value={lead.engagement} format={compact} locale="en-US" />
      ),
      delta: `▲ ${lead.engagementDelta}% ${e.vsPrev}`,
    },
    {
      label: (
        <>
          {e.labels.reach} <sup>*</sup>
        </>
      ),
      value: <CountUp value={lead.reach} format={compact} locale="en-US" />,
      delta: `▲ ${lead.reachDelta}% ${e.vsPrev}`,
    },
    {
      label: e.labels.sentiment,
      value: (
        <span className="text-pos">
          <span aria-hidden="true">▲ </span>
          <CountUp value={lead.split[0]} />%
        </span>
      ),
      delta: `▲ ${e.positivePts(lead.sentimentDelta)}`,
    },
  ]
  return (
    <MockFrame
      caption={e.caption}
      title={e.title}
      bodyClassName="gap-3.5 p-4 md:p-5"
    >
      <dl className="relative grid grid-cols-2 gap-2.5 tabular">
        {tiles.map((t, i) => (
          <div key={i} className={cn(evTile, "p-3.5")}>
            <dt className="text-[0.71875rem] text-muted-foreground">
              {t.label}
            </dt>
            <dd className="font-heading text-xl font-bold md:text-2xl">
              {t.value}
            </dd>
            <dd className="text-xs font-semibold text-pos">{t.delta}</dd>
          </div>
        ))}
        <Hotspot
          n="i"
          accent="stories"
          {...e.hotspot}
          className="top-1/2 left-1/2"
        />
      </dl>
      <StackedBar100 data={lead.split} height={12} labels={false} />
      <span className="text-[0.6875rem] text-muted-foreground">{e.legend}</span>
    </MockFrame>
  )
}

/** 3 · The supporting posts: three positive posts, each a click from the original. */
export function SupportingPostsWidget() {
  return (
    <div className="relative">
      <MockFrame
        caption={w.posts.caption}
        title={w.posts.title(lead.support)}
        bodyClassName="gap-2.5 p-4 md:p-4.5"
      >
        {lead.posts.map((p, i) => (
          <PostCard
            key={p.handle}
            tone="dark"
            initials={p.initials}
            handle={p.handle}
            text={`“${p.text}”`}
            sentiment="pos"
            metrics={
              i === 2
                ? {
                    likes: p.likes,
                    comments: p.comments,
                    shares: "",
                    views: stories.walkthroughViews,
                  }
                : { likes: p.likes, comments: p.comments, shares: p.shares }
            }
            linkLabel={l.viewOriginal}
          />
        ))}
      </MockFrame>
      <FloatCard className="flex items-center gap-2 px-3.5 py-2.5 md:-bottom-6 md:-left-4.5">
        <ExternalLink
          aria-hidden="true"
          strokeWidth={2}
          className="size-4 flex-none text-stories-text"
        />
        <span className="text-[0.84375rem] font-bold">{w.posts.float}</span>
      </FloatCard>
    </div>
  )
}

/** 4 · Your decision: Accept / Dismiss / Export on one candidate, and the shortlist beside it. */
export function DecisionWidget() {
  const d = w.decision
  const s = stories.candidates[stories.decision.candidate]
  return (
    <MockFrame caption={d.caption} bodyClassName="gap-3 p-4 md:p-4.5">
      <div className="grid items-start gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div
          aria-hidden="true"
          className={cn(darkCard, "flex flex-col gap-3 p-4")}
        >
          <span className="font-heading text-base font-extrabold">
            {s.title}
          </span>
          <span className="text-xs text-muted-foreground tabular">
            {n(s.volume)} {l.posts} ·{" "}
            {new Intl.NumberFormat("en-US", compact).format(s.engagement)}{" "}
            {l.engagements} ·{" "}
            <span className="text-pos">
              ▲ {s.split[0]}% {l.positive}
            </span>
          </span>
          <span className="flex min-h-10 items-center justify-center rounded-sm bg-primary text-[0.84375rem] font-semibold text-primary-foreground">
            {d.accept}
          </span>
          <span className={cn(darkAction, "min-h-10 text-[0.84375rem]")}>
            {l.dismiss}
          </span>
          <span
            className={cn(
              darkAction,
              "min-h-10 border-stories text-center text-[0.84375rem] text-amber-on-dark"
            )}
          >
            {d.exportLabel}
          </span>
        </div>
        <div className={cn(darkCard, "flex flex-col gap-2 p-3.5")}>
          <span className="text-[0.8125rem] font-semibold">{d.shortlist}</span>
          <ul className="flex flex-col items-start gap-2">
            {stories.decision.shortlist.map((i) => (
              <li
                key={i}
                className="rounded-full border border-pos px-2.5 py-1 text-xs font-semibold text-pos"
              >
                ✓ {stories.candidates[i].short}
              </li>
            ))}
          </ul>
          <span className="border-t border-border pt-2 text-[0.71875rem] text-muted-foreground">
            {d.exported(stories.calendarDate)}
          </span>
        </div>
      </div>
    </MockFrame>
  )
}
