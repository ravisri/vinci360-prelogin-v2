"use client"

import { Download } from "lucide-react"

import { MockFrame } from "@/components/mocks/MockFrame"
import { PostCard } from "@/components/mocks/PostCard"
import { useSelectedTag } from "@/components/mocks/trends/SelectedTagProvider"
import { trendsHashtagWidgets } from "@/content/features/trends"
import { trends } from "@/content/sample-data"

const c = trendsHashtagWidgets.posts

/** Block B4 · Posts behind a tag: the posts carrying the tag picked in the ranking (B1). */
export function TagPostsWidget() {
  const { tag } = useSelectedTag()
  const posts = trends.tagPosts[tag] ?? []
  return (
    <MockFrame
      title={
        <span aria-live="polite">
          {c.title} {tag}
        </span>
      }
      actions={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.25 text-xs font-semibold text-on-dark-strong">
          <Download aria-hidden="true" strokeWidth={2} className="size-3" />
          {c.export}
        </span>
      }
      caption={c.caption}
      bodyClassName="gap-2.5"
    >
      {posts.map((p) => (
        <PostCard
          key={p.handle + p.time}
          tone="dark"
          initials={p.initials}
          handle={p.handle}
          time={p.time}
          text={p.text}
          sentiment={p.sentiment}
          metrics={{ likes: p.likes, comments: p.comments, shares: p.shares }}
        />
      ))}
    </MockFrame>
  )
}
