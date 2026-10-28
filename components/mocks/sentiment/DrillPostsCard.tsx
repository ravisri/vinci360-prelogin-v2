import { MockFrame } from "@/components/mocks/MockFrame"
import { PostRow } from "@/components/mocks/PostCard"
import { fmt } from "@/components/mocks/home/kpi"
import { Reveal } from "@/components/motion/Reveal"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { sentimentPartA } from "@/content/features/sentiment-keywords"
import { networks, sentiment } from "@/content/sample-data"

const c = sentimentPartA.drill
const d = sentiment.drill

/** Part A · "Drill into the posts": the negative Instagram segment opened as its posts. */
export function DrillPostsCard() {
  return (
    <Reveal className="flex flex-wrap items-start gap-6 rounded-lg bg-card p-4 shadow-card md:p-6">
      <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-2.5">
        <ModuleChip accent="sent" label={c.chip} dot={false} />
        <h3 className="text-[1.375rem] leading-[1.2]">{c.title}</h3>
        <p className="text-[0.9375rem] text-muted-foreground">{c.lead}</p>
      </div>
      <MockFrame
        className="min-w-0 flex-[2_1_520px]"
        bodyClassName="gap-2 p-3.5"
        title={
          <>
            {networks[d.network]} · <span className="text-neg">{c.negative}</span> · {fmt(d.count)} {c.posts}
          </>
        }
        caption={c.caption}
      >
        <div className="flex flex-col">
          {d.posts.map((p) => (
            <PostRow key={p.initials} {...p} network={d.network} sentiment="neg" linkLabel={c.viewOriginal} linkTitle={c.viewOriginalTitle} />
          ))}
        </div>
      </MockFrame>
    </Reveal>
  )
}
