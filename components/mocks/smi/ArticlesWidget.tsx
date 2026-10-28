import { Download } from "lucide-react"

import { MockFrame } from "@/components/mocks/MockFrame"
import { PostCard } from "@/components/mocks/PostCard"
import { fmt } from "@/components/mocks/home/kpi"
import { frameChip } from "@/components/mocks/smi/styles"
import { smiWidgets } from "@/content/features/smi"
import { networks, smi } from "@/content/sample-data"
import { sentimentLabel } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = smiWidgets.articles

/** Widget 6 · Articles: the posts behind the numbers, newest first, with engagement and a link out. */
export function ArticlesWidget() {
  return (
    <MockFrame
      title={
        <span className="flex items-center gap-2.5">
          {c.title}
          <span className={cn(frameChip, "font-semibold")}>
            <Download aria-hidden="true" strokeWidth={2} className="size-3.25" />
            {c.export}
          </span>
        </span>
      }
      caption={`Sample article feed, newest first: ${smi.articles.map((a) => `${a.handle} on ${networks[a.network]}, ${a.time}, ${sentimentLabel[a.sentiment].toLowerCase()}: “${a.text}” ${fmt(a.likes)} likes, ${fmt(a.comments)} comments, ${fmt(a.shares)} shares, ${a.views} views`).join("; ")}.`}
    >
      {smi.articles.map((a) => (
        <PostCard
          key={a.handle}
          tone="dark"
          initials={a.initials}
          handle={a.handle}
          time={a.time}
          network={a.network}
          text={a.text}
          sentiment={a.sentiment}
          metrics={{ likes: fmt(a.likes), comments: fmt(a.comments), shares: fmt(a.shares), views: a.views }}
          linkLabel={c.viewOriginal}
        />
      ))}
    </MockFrame>
  )
}
