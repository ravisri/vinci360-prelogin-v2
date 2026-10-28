import { ExternalLink, Eye, Heart, MessageCircle, Repeat2 } from "lucide-react"

import { SentimentChip } from "@/components/mocks/SentimentChip"
import type { Sentiment } from "@/content/sample-data"
import { cn } from "@/lib/utils"

type PostMetrics = { likes: string; comments: string; shares: string; views?: string }

type PostCardProps = {
  /** Avatars are initials only, never photos. */
  initials: string
  handle: string
  /** Omitted when the reference shows no time (Promotable Stories posts). */
  time?: string
  text: string
  sentiment: Sentiment
  /** Light card footer, e.g. "2.4K engagements". */
  engagement?: string
  /** Dark feed row footer. */
  metrics?: PostMetrics
  /** Dark feed rows only, e.g. "View original". */
  linkLabel?: string
  /** light = floating white card; dark = feed row inside a MockFrame. */
  tone?: "light" | "dark"
  className?: string
}

type PostRowProps = Pick<PostCardProps, "initials" | "text" | "sentiment" | "linkLabel" | "className"> & {
  /** e.g. "2.4K". */
  engagement: string
  /** Tooltip on the link label, e.g. "Opens the original post in the product". */
  linkTitle?: string
}

/**
 * One-line dark post row (avatar · text · sentiment · engagement · link), as in the
 * "posts behind a segment" lists. Wraps below sm so the text keeps a readable width.
 */
export function PostRow({ initials, text, sentiment, engagement, linkLabel, linkTitle, className }: PostRowProps) {
  return (
    <article className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-t border-border py-2 text-[0.78125rem] sm:flex-nowrap", className)}>
      <span aria-hidden="true" className="grid size-7 flex-none place-items-center rounded-full bg-border text-[0.625rem] font-bold">
        {initials}
      </span>
      <p className="min-w-0 flex-[1_1_12rem]">{text}</p>
      <SentimentChip sentiment={sentiment} className="text-[0.65625rem]" />
      <span className="text-[0.6875rem] text-muted-foreground tabular">
        {engagement}
        <span className="sr-only"> engagements</span>
      </span>
      {linkLabel && (
        <span title={linkTitle} className="inline-flex min-h-8 items-center gap-0.75 text-[0.71875rem] text-on-dark-focus">
          {linkLabel}
          <ExternalLink aria-hidden="true" strokeWidth={2} className="size-2.75" />
        </span>
      )}
    </article>
  )
}

const metricIcons = [
  { key: "likes", Icon: Heart, label: "likes" },
  { key: "comments", Icon: MessageCircle, label: "comments" },
  { key: "shares", Icon: Repeat2, label: "shares" },
  { key: "views", Icon: Eye, label: "views" },
] as const

/** Social post: initials avatar, handle, time, text, sentiment and engagement. */
export function PostCard({ initials, handle, time, text, sentiment, engagement, metrics, linkLabel, tone = "light", className }: PostCardProps) {
  const dark = tone === "dark"
  return (
    <article className={cn("flex flex-col gap-2 rounded-lg bg-card", dark ? "border border-border p-3" : "p-3.5", className)}>
      <header className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            "grid flex-none place-items-center rounded-full font-bold",
            dark ? "size-7.5 bg-border text-[0.6875rem] text-foreground" : "size-8.5 bg-primary-tint text-xs text-primary",
          )}
        >
          {initials}
        </span>
        <p className="min-w-0 flex-1 leading-tight">
          <span className={cn("font-semibold", dark ? "text-[0.8125rem]" : "block text-sm")}>{handle}</span>
          {time && (
            <span className={cn("text-muted-foreground", dark ? "text-[0.71875rem]" : "block text-xs")}>
              {dark ? " · " : null}
              {time}
            </span>
          )}
        </p>
        <span className={cn("flex items-center gap-2", dark && "text-muted-foreground")}>
          {dark && <SentimentChip sentiment={sentiment} />}
        </span>
      </header>
      <p className={cn("leading-[1.45]", dark ? "text-[0.8125rem]" : "text-[0.84375rem]")}>{text}</p>
      {!dark && (
        <footer className="flex items-center justify-between gap-2">
          <SentimentChip sentiment={sentiment} />
          {engagement && <span className="text-xs text-muted-foreground tabular">{engagement}</span>}
        </footer>
      )}
      {dark && metrics && (
        <footer className="flex flex-wrap items-center gap-3.5 text-[0.71875rem] text-muted-foreground tabular">
          {metricIcons.map(({ key, Icon, label }) =>
            metrics[key] ? (
              <span key={key} className="flex items-center gap-1">
                <Icon aria-hidden="true" strokeWidth={2} className="size-3.25" />
                {metrics[key]}
                <span className="sr-only"> {label}</span>
              </span>
            ) : null,
          )}
          {linkLabel && (
            <span className="ml-auto flex items-center gap-1 font-semibold text-on-dark-focus">
              {linkLabel}
              <ExternalLink aria-hidden="true" strokeWidth={2} className="size-3.25" />
            </span>
          )}
        </footer>
      )}
    </article>
  )
}
