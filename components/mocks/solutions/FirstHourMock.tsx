import { Mail } from "lucide-react"

import { Donut } from "@/components/charts/Donut"
import { HBar } from "@/components/charts/HBar"
import { LineArea } from "@/components/charts/LineArea"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { avatar, dk, dtab, fpill, wt } from "@/components/mocks/channels/styles"
import { BrandMarker } from "@/components/mocks/compare/brand"
import { Hotspot } from "@/components/mocks/Hotspot"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { ReachNote } from "@/components/mocks/ReachNote"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { aiChipDark } from "@/components/mocks/stories/styles"
import { brands, solutions as data, type SolutionsStat } from "@/content/sample-data"
import { solutionsPage, type Role } from "@/content/solutions"
import { sentimentText, trendGlyph, trendText, trendWord } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const BRANDS = [
  { key: "aurora", tone: "chart-6" },
  { key: "nimbus", tone: "chart-2" },
  { key: "kestrel", tone: "chart-3" },
] as const

/** Glyph + words + colour; the glyph is hidden and the direction spelled out for screen readers. */
function Move({ trend, tone, children, className }: { trend: SolutionsStat["trend"]; tone?: SolutionsStat["tone"]; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-semibold tabular", tone ? sentimentText[tone] : trendText[trend], className)}>
      <span aria-hidden="true">{trendGlyph[trend]} </span>
      <span className="sr-only">{trendWord[trend]}: </span>
      {children}
    </span>
  )
}

/** Compact stat tile (the 2×2 KPI grid the 390 reference shows above each role's widget). */
function StatTile({ stat }: { stat: SolutionsStat }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 rounded-lg border border-border bg-card px-3 py-2.5 text-[0.71875rem]">
      <span className="truncate text-muted-foreground">{stat.label}</span>
      <strong className="font-heading text-[1.1875rem] leading-tight font-bold tabular">{stat.display}</strong>
      <Move trend={stat.trend} tone={stat.tone}>
        {stat.note}
      </Move>
    </div>
  )
}

/** The 2×2 stat grid that only the mobile layout shows (desktop shows the full widgets instead). */
function MobileStats({ stats }: { stats: readonly SolutionsStat[] }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 md:hidden">
      {stats.map((s) => (
        <StatTile key={s.label} stat={s} />
      ))}
    </div>
  )
}

/* ---- Brand managers ------------------------------------------------------------------------ */

function BrandView() {
  const b = data.brand
  return (
    <>
      <div className="flex flex-wrap gap-1.5 max-md:hidden">
        {b.filters.map((f) => (
          <span key={f.k} className={fpill}>
            <b>{f.k}</b>
            {f.v}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2.5">
        {b.kpis.map((k) => (
          <KpiCard
            key={k.label}
            size="md"
            label={k.label}
            value={k.value}
            prefix={k.prefix}
            format={k.compact ? { notation: "compact", maximumFractionDigits: 2 } : undefined}
            delta={k.note}
            trend={k.trend}
          />
        ))}
      </div>
      <div className="grid gap-2.5 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className={dk}>
          <p className={wt}>Topic scoreboard</p>
          <table className={cn(dtab, "mt-1.5")}>
            <caption className="sr-only">Topics ranked by mentions with rank movement</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Topic</th>
                <th scope="col" className="r max-md:sr-only">
                  Mentions
                </th>
                <th scope="col">Move</th>
              </tr>
            </thead>
            <tbody>
              {b.topics.map((t) => (
                <tr key={t.topic}>
                  <td>{t.rank}</td>
                  <td className={cn(t.lead && "font-bold")}>{t.topic}</td>
                  <td className="r max-md:sr-only">{t.mentions}</td>
                  <td className="whitespace-nowrap">
                    <Move trend={t.trend}>{t.move}</Move>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={cn(dk, "flex flex-col gap-2 max-md:hidden")}>
          <p className={wt}>Hashtag growth</p>
          <HBar
            ariaLabel={`Hashtag growth: ${b.hashtags.map((h) => `${h.tag} up ${h.growth}%`).join(", ")}`}
            labelClassName="w-24"
            className="text-xs"
            data={b.hashtags.map((h) => ({ label: h.tag, value: h.growth, display: `▲ ${h.growth}%`, tone: "chart-1" }))}
          />
        </div>
        <div className={cn(dk, "flex flex-col items-start gap-2 max-md:hidden")}>
          <p className={wt}>Story candidate</p>
          <span className={cn(aiChipDark, "text-[0.65625rem]")}>
            <span aria-hidden="true">✦</span> AI-generated suggestion
          </span>
          <strong className="font-heading text-[0.9375rem] leading-[1.3]">{b.story.title}</strong>
          <span className="text-xs text-muted-foreground tabular">{b.story.evidence}</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-current px-2 py-0.5 text-[0.6875rem] font-semibold text-pos tabular">
            <span aria-hidden="true">▲</span>
            {b.story.positive}
          </span>
        </div>
      </div>
      <ReachNote className="text-[0.6875rem]" />
    </>
  )
}

/* ---- PR & communications ------------------------------------------------------------------- */

const level = {
  high: { glyph: "▲", label: "High", className: "text-neg" },
  medium: { glyph: "●", label: "Medium", className: "text-amber-on-dark" },
  info: { glyph: "i", label: "Info", className: "text-muted-foreground" },
} as const

function PrView() {
  const p = data.pr
  return (
    <>
      <MobileStats stats={p.kpis} />
      <div className="grid gap-2.5 md:grid-cols-[1fr_1.1fr_1.2fr]">
        <div className={cn(dk, "flex flex-col gap-2 max-md:hidden")}>
          <p className={wt}>Alerts</p>
          <ul className="flex flex-col gap-2">
            {p.alerts.map((a) => (
              <li
                key={a.subject}
                className={cn("flex flex-col items-start gap-0.5 rounded-sm border border-border bg-background px-2.5 py-2 text-xs", a.level === "high" && "border-neg")}
              >
                <span className={cn("inline-flex items-center gap-1 rounded-full border border-current px-2 py-0.5 text-[0.625rem] font-semibold", level[a.level].className)}>
                  <span aria-hidden="true">{level[a.level].glyph}</span>
                  {level[a.level].label}
                </span>
                <strong>{a.subject}</strong>
                <span>
                  {a.metric}{" "}
                  <Move trend={a.trend} tone={a.tone}>
                    {a.change}
                  </Move>{" "}
                  {a.when}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(dk, "flex flex-col gap-2.5")}>
          <p className={wt}>Sentiment by topic</p>
          <ul className="flex flex-col gap-2.5">
            {p.topics.map((row) => {
              const neg = row.slipping
              return (
                <li
                  key={row.label}
                  className={cn("grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-2 text-xs md:grid-cols-[6.5rem_minmax(0,1fr)_4.75rem]", neg && "rounded-xs font-bold outline-2 outline-offset-4 outline-neg")}
                >
                  <span className="leading-tight">{row.label}</span>
                  <StackedBar100
                    data={row.split}
                    height={10}
                    labels={false}
                    ariaLabel={`${row.label}: ${row.split[0]}% positive, ${row.split[1]}% neutral, ${row.split[2]}% negative`}
                  />
                  <span className={cn("max-md:hidden", neg ? "text-neg" : "text-pos")}>
                    <span aria-hidden="true">{neg ? "▼" : "▲"} </span>
                    {neg ? `${row.split[2]}% Neg` : `${row.split[0]}% Pos`}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="text-xs font-bold text-neg">{p.xNote}</p>
        </div>
        <div className={cn(dk, "flex flex-col gap-2 max-md:hidden")}>
          <p className={wt}>Negative posts</p>
          <ul className="flex flex-col gap-2">
            {p.posts.map((post) => (
              <li key={post.text} className="flex items-center gap-2 rounded-sm bg-background p-2 text-[0.78125rem]">
                <span aria-hidden="true" className={cn(avatar, "size-7 bg-border text-[0.625rem]")}>
                  {post.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.6875rem] text-muted-foreground">
                    {post.time}
                  </span>
                  “{post.text}”
                </span>
                <SentimentChip sentiment="neg" className="text-[0.625rem]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

/* ---- Agencies ------------------------------------------------------------------------------ */

function AgenciesView() {
  const a = data.agencies
  return (
    <>
      <MobileStats stats={a.kpis} />
      <div className="grid gap-2.5 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className={cn(dk, "flex flex-col gap-2 max-md:hidden")}>
          <p className={wt}>Indexed comparison · mentions (week 1 = 100)</p>
          <LineArea
            ariaLabel={`Mentions indexed to week 1 = 100 over eight weeks: ${BRANDS.map((b) => `${brands[b.key].name} ${a.index[b.key][a.index[b.key].length - 1]}`).join(", ")}`}
            min={90}
            max={122}
            gridlines={2}
            width={360}
            height={140}
            data={BRANDS.map((b, i) => ({ label: brands[b.key].name, values: a.index[b.key], tone: b.tone, kind: i === 0 ? "line" : "dashed" }))}
          />
          <p className="flex flex-wrap gap-x-3.5 gap-y-1 text-[0.71875rem] tabular">
            {BRANDS.map((b) => (
              <span key={b.key} className="inline-flex items-center gap-1.5">
                <BrandMarker brand={b.key} />
                {brands[b.key].name} <strong>{a.index[b.key][a.index[b.key].length - 1]}</strong>
              </span>
            ))}
          </p>
        </div>
        <div className="on-light flex flex-col gap-2 rounded-lg bg-card p-3 text-xs max-md:hidden">
          <strong className="text-[0.8125rem]">{a.report.title}</strong>
          <span className="text-muted-foreground">{a.report.to}</span>
          <span className="grid grid-cols-2 gap-1.5">
            {a.report.stats.map((s) => (
              <span key={s.label} className="rounded-sm bg-background p-2">
                <span className="text-muted-foreground">{s.label}</span>
                <strong className="block text-[0.9375rem] tabular">{s.display}</strong>
                <Move trend={s.trend}>{s.note}</Move>
              </span>
            ))}
          </span>
          <span>
            <strong>{a.report.topicsLabel}</strong> {a.report.topics}
          </span>
        </div>
        <div className={cn(dk, "flex flex-col gap-2")}>
          <p className={wt}>Scheduled reports</p>
          <ul className="flex flex-col gap-2">
            {a.schedules.map((s) => (
              <li
                key={s.name}
                className={cn("flex flex-col gap-0.5 rounded-sm border border-border bg-background px-2.5 py-2 text-xs", !s.short && "max-md:hidden")}
              >
                <strong>{s.name}</strong>
                <span className="text-muted-foreground">{s.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

/* ---- Leadership ---------------------------------------------------------------------------- */

function LeadershipView() {
  const l = data.leadership
  return (
    <>
      <MobileStats stats={l.kpis} />
      <div className="grid gap-2.5 md:grid-cols-[1fr_1.3fr_1fr]">
        <div className={cn(dk, "flex flex-col gap-2")}>
          <p className={wt}>Share of voice · last 30 days</p>
          <Donut
            ariaLabel={`Share of voice: ${BRANDS.map((b) => `${brands[b.key].name} ${l.shareOfVoice[b.key]}%`).join(", ")}`}
            legend
            thickness={16}
            className="w-28"
            data={BRANDS.map((b) => ({ label: `${brands[b.key].name} ${l.shareOfVoice[b.key]}%`, value: l.shareOfVoice[b.key], tone: b.tone }))}
          />
        </div>
        <div className={cn(dk, "flex flex-col gap-2 max-md:hidden")}>
          <p className={wt}>Gap to Nimbus · share of voice points</p>
          <LineArea
            ariaLabel={`Aurora's lead over Nimbus in share-of-voice points over eight weeks: ${l.gap.join(", ")}`}
            min={0}
            max={8}
            gridlines={2}
            width={320}
            height={110}
            data={[{ label: "Gap to Nimbus", values: l.gap, tone: "chart-6", kind: "line" }]}
          />
          <p className="text-[0.78125rem] font-bold text-pos">
            <span aria-hidden="true">▲ </span>
            {l.gapNote}
          </p>
        </div>
        <div className="on-light flex flex-col gap-2 rounded-lg bg-card p-3 text-xs max-md:hidden">
          <span className="flex items-center gap-2">
            <Mail aria-hidden="true" strokeWidth={2} className="size-4 text-primary-700" />
            <strong className="text-[0.8125rem]">{l.brief.title}</strong>
          </span>
          <span className="text-muted-foreground">{l.brief.to}</span>
          {l.brief.rows.map((r) => (
            <span key={r.label} className="tabular">
              {r.label} <strong>{r.display}</strong> <Move trend={r.trend}>{r.note}</Move>
            </span>
          ))}
          <span className="rounded-sm bg-primary-tint px-2 py-1.5">
            <strong>{l.brief.changedLabel}</strong> {l.brief.changed}
          </span>
        </div>
      </div>
    </>
  )
}

const views = { brand: BrandView, pr: PrView, agencies: AgenciesView, leadership: LeadershipView }

/** Hotspot positions on the frame edge, clear of numbers and labels (left · right, as in the reference). */
const spots = {
  brand: ["top-[38%] left-0", "top-[70%] left-full"],
  pr: ["top-[62%] left-0", "top-[22%] left-full"],
  agencies: ["top-[34%] left-0", "top-[34%] left-full"],
  leadership: ["top-[34%] left-0", "top-[34%] left-full"],
} as const

/**
 * "Your first-hour view": ONE data-driven mock for every role (dark frame, Sample data chip,
 * two hotspots on the frame edge). Desktop shows the role's three widgets; 390 shows a 2×2 KPI grid
 * and the one widget the mobile reference keeps.
 */
export function FirstHourMock({ role }: { role: Role }) {
  const View = views[role.key]
  return (
    <div className="relative">
      <MockFrame
        chrome={`${solutionsPage.roles.firstHourBar} · ${role.label}`}
        caption={role.firstHour.caption}
        bodyClassName="gap-2.5 p-3 md:gap-3.5 md:p-4.5"
      >
        <View />
      </MockFrame>
      {role.firstHour.hotspots.map((h, i) => (
        <Hotspot key={h.title} n={i + 1} pulse={i === 0} title={h.title} text={h.text} className={spots[role.key][i]} />
      ))}
    </div>
  )
}
