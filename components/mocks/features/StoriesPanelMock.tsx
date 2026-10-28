import { Check, Sparkles, X } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { fmt } from "@/components/mocks/home/kpi"
import { featuresOverview as copy, type Panel } from "@/content/features-overview"
import { featuresOverview as data, home, leadStory, networks } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = copy.mocks.stories
const st = home.story
const more = data.stories.slice(1)
const title = leadStory.title.replace("'", "’")

const caption = `Sample Promotable Stories page: an AI-generated story candidate titled “${title}”, from hashtags ${st.tags.join(", ")}, with ${leadStory.volume.display} posts, ${leadStory.engagement.display} engagements and ${leadStory.positive}% positive sentiment, three sample posts, and Accept or Dismiss buttons. More candidates: ${more
  .map((s) => `${s.title}, ${fmt(s.posts)} posts${s.met ? `, up ${s.positive}%` : ", below threshold"}`)
  .join("; ")}.`

/** Stories tab: story candidate with evidence, sample posts and actions, the candidate list, and the threshold float. */
export function StoriesPanelMock({ hotspots }: { hotspots: Panel["hotspots"] }) {
  return (
    <div className="relative">
      <MockFrame chrome={c.chrome} caption={caption} className="relative" bodyClassName="p-2.5 md:p-4">
        <div className="grid gap-2.5 md:grid-cols-[minmax(0,1fr)_10.625rem] md:gap-3">
          <div className="flex flex-col gap-3.5 rounded-lg border border-border bg-card p-4 md:p-4.5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-stories px-2.5 py-1 text-xs leading-[1.3] font-semibold text-ink">{c.candidate}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-current px-2.5 py-1 text-xs leading-[1.3] font-semibold text-amber-on-dark">
                <Sparkles aria-hidden="true" strokeWidth={2} className="size-3" />
                {c.ai}
              </span>
            </div>
            <div className="relative">
              <p className="text-[0.6875rem] text-muted-foreground">{c.headline}</p>
              <p className="mt-1 font-heading text-lg leading-[1.25] font-extrabold md:text-xl">{title}</p>
              <Hotspot n={1} accent="stories" {...hotspots[0]} className="top-1.5 left-[62%]" />
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {st.tags.map((t) => (
                <li key={t} className="rounded-full border border-border px-2.5 py-1 text-xs leading-[1.3] font-semibold text-amber-on-dark">
                  {t}
                </li>
              ))}
            </ul>
            <dl className="relative grid grid-cols-3 gap-2 tabular">
              <div className="rounded-sm bg-background px-2.5 py-2">
                <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.volume}</dt>
                <dd className="font-heading text-base font-bold">{leadStory.volume.display}</dd>
                <dd className="text-[0.65625rem] text-muted-foreground">{leadStory.volume.unit}</dd>
              </div>
              <div className="rounded-sm bg-background px-2.5 py-2">
                <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.engagement}</dt>
                <dd className="font-heading text-base font-bold">{leadStory.engagement.display}</dd>
                <dd className="text-[0.65625rem] text-muted-foreground">{leadStory.engagement.unit}</dd>
              </div>
              <div className="rounded-sm bg-background px-2.5 py-2">
                <dt className="text-[0.65625rem] text-muted-foreground">{c.stats.sentiment}</dt>
                <dd>
                  <Delta trend="up" className="font-heading text-base font-bold">
                    {leadStory.positive}%
                  </Delta>
                </dd>
                <dd className="text-[0.65625rem] text-muted-foreground">{c.stats.positive}</dd>
              </div>
              <Hotspot n={2} accent="stories" {...hotspots[1]} className="top-full left-[90%] md:left-[62%]" />
            </dl>
            <ul className="flex flex-col gap-2 text-[0.78125rem]">
              {st.posts.map((p) => (
                <li key={p.initials} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="grid size-6.5 flex-none place-items-center rounded-full bg-border text-[0.625rem] font-bold">
                    {p.initials}
                  </span>
                  <span className="min-w-0 flex-1">{p.text}</span>
                  <NetworkIcon network={p.network} className="size-3.75 text-muted-foreground" />
                  <span className="sr-only">{networks[p.network]}</span>
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className="flex gap-2.5 text-sm font-semibold">
              <span className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-stories text-ink">
                <Check className="size-4.5" strokeWidth={2.2} />
                {c.accept}
              </span>
              <span className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-sm border border-border">
                <X className="size-4.5" strokeWidth={2} />
                {c.dismiss}
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-2">
            <p className="text-[0.6875rem] text-muted-foreground">{c.more}</p>
            <ul className="flex flex-col gap-2">
              {more.map((s) => (
                <li key={s.title} className={cn("flex flex-col gap-1 rounded-lg border border-border bg-card p-2.5 text-xs", !s.met && "opacity-70")}>
                  <span className="font-semibold">{s.title}</span>
                  <span className="text-muted-foreground tabular">
                    {fmt(s.posts)} {c.posts} ·{" "}
                    {s.met ? (
                      <>
                        <span aria-hidden="true">▲ </span>
                        <span className="sr-only">up </span>
                        {s.positive}%
                      </>
                    ) : (
                      c.below
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <Hotspot n={3} accent="stories" {...hotspots[2]} className="top-2 right-0 translate-x-0" />
          </div>
        </div>
      </MockFrame>

      <FloatCard className="flex items-center gap-2 px-3.5 py-2.5 md:relative md:mt-3 md:w-fit lg:absolute lg:-right-5 lg:-bottom-5 lg:mt-0">
        <Check aria-hidden="true" strokeWidth={2.2} className="size-4 flex-none text-pos" />
        <span className="text-[0.8125rem] font-semibold tabular">{leadStory.evidence}</span>
      </FloatCard>
    </div>
  )
}
