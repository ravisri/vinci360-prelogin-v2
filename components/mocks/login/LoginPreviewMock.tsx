import { LineArea } from "@/components/charts/LineArea"
import { SentimentLegend } from "@/components/charts/StackedBar100"
import { FloatCard } from "@/components/mocks/FloatCard"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { PostCard } from "@/components/mocks/PostCard"
import { login } from "@/content/login"
import { loginPreview, networks, weekly, type Network } from "@/content/sample-data"

const p = login.preview
const kpis = [weekly.mentions, weekly.engagement, weekly.netSentiment] as const
const kpiFormats = [undefined, { notation: "compact" } as const, { signDisplay: "always" } as const]

/**
 * Log in right panel: a 3-KPI Social Media Intelligence preview for Aurora Mobile (this week), the
 * mention volume line and a negative @kr_tech mention floating off the bottom-left corner, clear of
 * the KPI labels. Followed by the tagline and the four networks.
 */
export function LoginPreviewMock() {
  const mention = loginPreview.mention
  return (
    <div className="flex flex-col gap-7">
      <div className="relative pb-8">
        <span aria-hidden="true" className="dot-grid-dark absolute -top-1.5 -right-1.5 h-27 w-37" />
        <MockFrame caption={p.caption} chrome={p.chrome} className="relative" bodyClassName="gap-3 p-3.5">
          <div className="flex flex-wrap gap-1.5" aria-hidden="true">
            {loginPreview.filters.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-2.5 py-1 text-[0.6875rem] text-muted-foreground">
                {f}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((k, i) => (
              <KpiCard
                key={k.label}
                size="md"
                label={k.label}
                value={k.value}
                format={kpiFormats[i]}
                delta={k.delta}
                trend={k.trend}
                spark={{ data: loginPreview.sparks[i], tone: (["chart-1", "chart-2", "chart-3"] as const)[i] }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3 pb-10">
            <p className="text-[0.78125rem] font-semibold">{p.chart}</p>
            <LineArea
              ariaLabel={`${p.chart}, Monday to Sunday, peaking on Thursday`}
              data={[{ label: "Mentions", values: loginPreview.volume, tone: "chart-1", kind: "area" }]}
              xLabels={loginPreview.days}
              max={100}
              width={480}
              height={120}
            />
            <SentimentLegend className="text-[0.71875rem]" />
          </div>
        </MockFrame>
        <FloatCard enter className="on-light md:-bottom-2 md:-left-7 md:w-75">
          <PostCard
            initials={mention.initials}
            handle={mention.handle}
            network={mention.network as Network}
            text={mention.text}
            sentiment={mention.sentiment}
            className="p-0"
          />
        </FloatCard>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-heading text-2xl leading-[1.25] font-extrabold">{p.tagline}</p>
        <p className="flex items-center gap-3 text-[0.90625rem] text-muted-foreground">
          <span aria-hidden="true" className="flex gap-2.5">
            {(Object.keys(networks) as Network[]).map((n) => (
              <NetworkIcon key={n} network={n} className="size-5" />
            ))}
          </span>
          {p.networks}
        </p>
      </div>
    </div>
  )
}
