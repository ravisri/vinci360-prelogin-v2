import { Check, Sparkles, TrendingUp, X } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { home as copy } from "@/content/home"
import { home as data } from "@/content/sample-data"

const st = data.story
const c = copy.storiesMock

/** Promotable Stories row (inside the navy band): story candidate card with evidence, sample posts and actions. */
export function StoryCandidateMock() {
  return (
    <div className="relative">
      <MockFrame
        title={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stories px-2.5 py-1 text-[0.6875rem] font-semibold text-ink">
            <Sparkles aria-hidden="true" strokeWidth={2} className="size-3.5" />
            {c.candidate}
          </span>
        }
        caption={`Sample story candidate card: suggested headline “${st.title}”, source hashtags, ${st.volume.display} posts, ${st.engagement.display} engagements, ${st.positive}% positive sentiment, three sample posts and Accept or Dismiss buttons.`}
        className="bg-card"
        bodyClassName="gap-4 p-5 md:p-5.5"
      >
        <div>
          <p className="text-xs text-muted-foreground">{c.headlineLabel}</p>
          <p className="mt-1 font-heading text-xl leading-[1.25] font-extrabold md:text-[1.375rem]">{st.title.replace("'", "’")}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {st.tags.map((t) => (
            <li key={t} className="rounded-full border border-current px-2.5 py-0.5 text-xs font-semibold text-amber-on-dark">
              {t}
            </li>
          ))}
        </ul>
        <dl className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-background p-2.5">
            <dt className="text-[0.6875rem] text-muted-foreground">{c.stats.volume}</dt>
            <dd className="font-heading text-lg font-extrabold tabular">{st.volume.display}</dd>
            <dd className="text-[0.6875rem] text-muted-foreground">{st.volume.unit}</dd>
          </div>
          <div className="rounded-lg bg-background p-2.5">
            <dt className="text-[0.6875rem] text-muted-foreground">{c.stats.engagement}</dt>
            <dd className="font-heading text-lg font-extrabold tabular">{st.engagement.display}</dd>
            <dd className="text-[0.6875rem] text-muted-foreground">{st.engagement.unit}</dd>
          </div>
          <div className="rounded-lg bg-background p-2.5">
            <dt className="text-[0.6875rem] text-muted-foreground">{c.stats.sentiment}</dt>
            <dd>
              <Delta trend="up" className="font-heading text-lg font-extrabold">
                {st.positive}%
              </Delta>
            </dd>
            <dd className="text-[0.6875rem] text-muted-foreground">{c.stats.positive}</dd>
          </div>
        </dl>
        <div>
          <p className="mb-2 text-xs text-muted-foreground">{c.postsLabel}</p>
          <ul className="flex flex-col gap-2">
            {st.posts.map((p) => (
              <li key={p.initials} className="flex items-center gap-2.5 text-xs">
                <span aria-hidden="true" className="grid size-7 flex-none place-items-center rounded-full bg-border text-[0.625rem] font-bold">
                  {p.initials}
                </span>
                <span className="min-w-0 flex-1">{p.text}</span>              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className="flex gap-2 text-sm font-bold">
          <span className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-sm bg-stories text-ink">
            <Check className="size-4" strokeWidth={2.4} />
            {c.accept}
          </span>
          <span className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-sm border border-border">
            <X className="size-4" strokeWidth={2.4} />
            {c.dismiss}
          </span>
        </div>
      </MockFrame>

      <FloatCard className="bg-primary-foreground text-ink md:-top-9 md:-left-7 md:w-fit">
        <p className="flex items-center gap-2 text-[0.8125rem] font-semibold">
          <TrendingUp aria-hidden="true" strokeWidth={2.2} className="size-4 text-stories-text" />
          {c.peak} {st.peak}
        </p>
      </FloatCard>
    </div>
  )
}
