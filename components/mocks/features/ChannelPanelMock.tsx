import { Repeat2 } from "lucide-react"

import { HBar } from "@/components/charts/HBar"
import { LineArea } from "@/components/charts/LineArea"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { Hotspot } from "@/components/mocks/Hotspot"
import { MockFrame } from "@/components/mocks/MockFrame"
import { featuresOverview as copy, type Panel } from "@/content/features-overview"
import { featuresOverview as data } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = copy.mocks.channels
const fb = data.source
const reactions = Object.entries(fb.interactions).map(([k, v]) => ({
  label: k[0].toUpperCase() + k.slice(1),
  value: v,
}))

const caption = `Sample source analysis with the Mentions metric selected: top profiles ${fb.pages.map((p) => `${p.name} with ${p.followers} followers`).join(", ")}; interaction mix ${reactions.map((r) => `${r.label} ${r.value}%`).join(", ")}; audience growth ${fb.growth}. Smaller tiles show comment sentiment, top voices and shares.`

/** Source Analysis tab: metric switcher, top profiles, interaction mix, audience growth and three metric teasers. No network is named. */
export function ChannelPanelMock({ hotspots }: { hotspots: Panel["hotspots"] }) {
  return (
    <div className="relative">
      <MockFrame chrome={c.chrome} caption={caption} className="relative" bodyClassName="gap-3 p-2.5 md:p-4">
        <div className="relative flex flex-wrap gap-1.5" aria-hidden="true">
          {c.metrics.map((n, i) => (
            <span
              key={n}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm px-3 py-1.75 text-xs",
                i === 0 ? "bg-channels font-bold text-ink" : "border border-border text-muted-foreground"
              )}
            >
              {n}
            </span>
          ))}
        </div>

        <div className="relative grid gap-3 sm:grid-cols-2">
          <Hotspot n={1} accent="channels" {...hotspots[0]} className="-top-6 right-0 translate-x-0 md:right-auto md:left-[56%]" />
          <div className="flex flex-col rounded-lg border border-border bg-card p-3 text-xs tabular">
            <p className="mb-1.5 text-[0.78125rem] font-semibold">{c.pages}</p>
            <ul>
              {fb.pages.map((p) => (
                <li key={p.name} className="flex items-center gap-2 border-b border-border py-1.5 last:border-0">
                  <span aria-hidden="true" className="grid size-6 flex-none place-items-center rounded-[6px] bg-border text-[0.625rem] font-bold">
                    {p.initials}
                  </span>
                  <span className="min-w-0 flex-1">{p.name}</span>
                  <span>{p.followers}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-lg border border-border bg-card p-3">
            <p className="mb-2 text-[0.78125rem] font-semibold">{c.reactions}</p>
            <HBar
              ariaLabel={`${c.reactions}: ${reactions.map((r) => `${r.label} ${r.value}%`).join(", ")}`}
              tone="channels"
              thickness={7}
              labelClassName="w-16"
              className="gap-1.25 text-[0.71875rem]"
              data={reactions.map((r) => ({
                label: r.label,
                value: r.value,
                display: `${r.value}%`,
              }))}
            />
            <Hotspot n={2} accent="channels" {...hotspots[1]} className="top-0 right-0 translate-x-0" />
          </div>
        </div>

        <div className="relative rounded-lg border border-border bg-card p-3">
          <p className="mb-1.5 text-[0.78125rem] font-semibold">{c.growth}</p>
          <LineArea
            ariaLabel={`Follower growth over 30 days, ${fb.growth}`}
            max={90}
            width={600}
            height={90}
            gridlines={0}
            data={[
              {
                label: "Followers",
                values: data.followerGrowth,
                tone: "channels",
                kind: "line",
              },
            ]}
          />
          <Hotspot n={3} accent="channels" {...hotspots[2]} className="top-0 right-0 translate-x-0 md:right-auto md:left-[56%] md:-translate-x-1/2" />
        </div>

        <ul className="grid grid-cols-3 gap-2">
          {c.others.map((o) => (
            <li key={o.kind} className="flex min-w-0 flex-col gap-1 rounded-lg border border-border bg-card p-2.5 text-[0.6875rem] text-muted-foreground">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                {o.title}
              </span>
              {o.text}
              {o.kind === "sentiment" && (
                <StackedBar100
                  data={data.commentSplit}
                  height={6}
                  labels={false}
                  ariaLabel={`Comment sentiment: positive ${data.commentSplit[0]}%, neutral ${data.commentSplit[1]}%, negative ${data.commentSplit[2]}%`}
                />
              )}
              {o.kind === "voices" && (
                <span aria-hidden="true" className="flex gap-0.75">
                  <span className="size-4 rounded-full bg-border" />
                  <span className="size-4 rounded-full bg-border" />
                  <span className="size-4 rounded-full bg-border" />
                </span>
              )}
              {o.kind === "shares" && (
                <span aria-hidden="true" className="flex items-center gap-1.5">
                  <Repeat2 className="size-3.5" strokeWidth={1.8} />
                  <span className="h-1.25 w-10 rounded-full bg-border" />
                </span>
              )}
            </li>
          ))}
        </ul>
      </MockFrame>

      <FloatCard className="flex flex-col gap-0.5 px-4 py-3 md:relative md:mt-3 md:w-fit lg:absolute lg:-bottom-9 lg:-left-7 lg:mt-0">
        <p className="text-xs text-muted-foreground">{c.followers}</p>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-heading text-lg font-extrabold tabular">{data.followers.value}</span>
          <Delta trend="up" className="text-sm">
            {data.followers.delta}
          </Delta>
        </p>
      </FloatCard>
    </div>
  )
}
