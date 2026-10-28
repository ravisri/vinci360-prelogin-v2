"use client"

import { useState } from "react"
import { ChartColumn, Info } from "lucide-react"

import { HBar } from "@/components/charts/HBar"
import { ChartSvg } from "@/components/charts/ChartSvg"
import { FloatCard } from "@/components/mocks/FloatCard"
import { KpiCard } from "@/components/mocks/KpiCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { SentimentChip } from "@/components/mocks/SentimentChip"
import { fmt } from "@/components/mocks/home/kpi"
import { useSentimentState } from "@/components/mocks/sentiment/SentimentStateProvider"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { darkCard } from "@/components/mocks/smi/styles"
import { GrowRect } from "@/components/motion/GrowBar"
import { sentimentPartBWidgets as c } from "@/content/features/sentiment-keywords"
import { networks, sentiment, type Sentiment } from "@/content/sample-data"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const signed = (n: number) => `${n < 0 ? "−" : "+"}${Math.abs(n)}`
/** Net score tone: clearly positive above +15, negative below zero, neutral between. */
const netTone = (n: number): Sentiment => (n > 15 ? "pos" : n < 0 ? "neg" : "neu")

function useKeyword() {
  const { keyword } = useSentimentState()
  return sentiment.keywords[keyword]
}

/* ------------------------------- B1 · KPI cards ------------------------------- */
const compactFormat: Intl.NumberFormatOptions = {
  notation: "compact",
  maximumFractionDigits: 1,
}

/** Part B · 1 · KPI cards for the keyword; the numbers count up again when the keyword changes. */
export function KeywordKpisWidget() {
  const K = useKeyword()
  return (
    <MockFrame
      title={`${c.kpis.title} ${K.name}`}
      caption={`Sample KPI cards for ${K.name}: ${fmt(K.kpis[0].value)} mentions, up ${K.kpis[0].delta}; net sentiment ${signed(K.kpis[3].value)}, ${K.kpis[3].trend} ${K.kpis[3].delta}.`}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {K.kpis.map((k, i) => (
          <KpiCard
            key={k.label}
            size="md"
            label={k.label}
            value={Math.abs(k.value)}
            format={k.format === "compact" ? compactFormat : undefined}
            prefix={k.format === "net" ? (k.value < 0 ? "−" : "+") : undefined}
            delta={`${k.delta} ${c.kpis.vs}`}
            trend={k.trend}
            spark={{ data: sentiment.kpiSparks[i], tone: "chart-3", className: "max-sm:hidden" }}
            className={cn(i === 4 && "col-span-2")}
          />
        ))}
      </div>
    </MockFrame>
  )
}

/* -------------------------- B2 · Platform breakdown -------------------------- */
/**
 * Part B · 2 · Platform breakdown: one tile per network with its share of the keyword's mentions.
 * The strongest network gets a solid outline, the weakest a dashed one (plus ▲ / ▼ words).
 */
export function KeywordPlatformWidget() {
  const K = useKeyword()
  return (
    <>
      <MockFrame
        title={
          <>
            {K.name} <span className="max-md:hidden">{c.platforms.title}</span>
            <span className="md:hidden">{c.platforms.titleMobile}</span>
          </>
        }
        caption={`Sample platform breakdown for ${K.name}: ${K.platforms.map((p) => `${networks[p.network]} ${p.share}% of mentions, net sentiment ${signed(p.net)}`).join("; ")}. ${K.note}`}
        bodyClassName="gap-3.5 p-3 md:p-5"
      >
        <ul aria-hidden="true" className="grid grid-cols-2 gap-2 tabular md:grid-cols-4 md:gap-3">
          {K.platforms.map((p, i) => {
            const strong = i === K.strong
            const weak = i === K.weak
            const tone = netTone(p.net)
            const tag = p.tag ? `${weak ? "▼ " : strong ? "▲ " : ""}${p.tag}` : ""
            return (
              <li
                key={p.network}
                className={cn(
                  darkCard,
                  "flex flex-col gap-0.5 p-2.5 md:gap-2.5 md:p-4",
                  strong && "outline-2 outline-offset-2 outline-pos",
                  weak && "outline-2 outline-offset-2 outline-neg outline-dashed",
                )}
              >
                <span className="flex items-center gap-1.5 text-[0.78125rem] font-bold md:gap-2 md:text-sm">
                  <NetworkIcon network={p.network} className="size-3.75 md:size-4.5" />
                  {networks[p.network]}
                </span>
                <span className="font-heading text-[1.375rem] leading-[1.15] font-extrabold md:text-[1.75rem]">{p.share}%</span>
                <span className="-mt-2 text-[0.6875rem] text-muted-foreground max-md:hidden">{c.platforms.share}</span>
                <ChartSvg viewBox="0 0 100 8" preserveAspectRatio="none" className="h-2 overflow-hidden rounded-full max-md:hidden">
                  <rect width="100" height="8" className="fill-border" />
                  <GrowRect axis="x" width={p.share} height="8" className="fill-chart-3" />
                </ChartSvg>
                <span className="flex justify-between text-xs max-md:hidden">
                  <span className="text-muted-foreground">{c.platforms.mentions}</span>
                  <strong>{fmt(p.mentions)}</strong>
                </span>
                <span className="flex justify-between text-xs max-md:hidden">
                  <span className="text-muted-foreground">{c.platforms.engagement}</span>
                  <strong>{p.engagement}</strong>
                </span>
                <span className="flex justify-between text-xs max-md:hidden">
                  <span className="text-muted-foreground">{c.platforms.net}</span>
                  <strong className={sentimentText[tone]}>
                    {sentimentGlyph[tone]} {signed(p.net)}
                  </strong>
                </span>
                <span className={cn("text-[0.71875rem] font-bold max-md:hidden", weak ? "text-neg" : "text-pos")}>{tag}</span>
                {/* 390: one summary line per tile. */}
                <span className={cn("text-[0.6875rem] md:hidden", sentimentText[weak ? "neg" : tone])}>
                  {sentimentGlyph[weak ? "neg" : tone]} {c.platforms.netShort} {signed(p.net)}
                  {/* "Fading 31%": the desktop tag repeats the glyph, which the line already leads with. */}
                  {p.tag && ` · ${p.tag.replace(" · ▼ ", " ")}`}
                </span>
              </li>
            )
          })}
        </ul>
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-lg bg-muted px-3.5 py-2.5 text-[0.8125rem] max-md:hidden">
          <Info aria-hidden="true" strokeWidth={2} className="size-4 text-chart-3" />
          <strong>{c.platforms.same}</strong>
          <span className="text-muted-foreground">{K.note}</span>
        </p>
      </MockFrame>
      {/* Over the frame's top-right corner, in the panel padding. */}
      <FloatCard className="flex items-center gap-2.5 px-3.5 py-2.5 md:-top-15.5 md:-right-13.5 md:px-4 md:py-3">
        <ChartColumn aria-hidden="true" strokeWidth={2} className="size-4.5 text-sent-text max-md:hidden" />
        <span className="text-[0.84375rem] font-bold md:text-sm">{K.card}</span>
      </FloatCard>
    </>
  )
}

/* ------------------------ B3 · Sentiment bar graphs ------------------------ */
type Mode = "count" | "pct"
const order: Sentiment[] = ["pos", "neu", "neg"]

/** Part B · 3 · Positive / neutral / negative for posts with the keyword, as a count or a percentage. */
export function KeywordSentimentWidget() {
  const K = useKeyword()
  const [mode, setMode] = useState<Mode>("pct")
  const net = K.split[0] - K.split[2]
  const display = (i: number) => (mode === "count" ? fmt(Math.round((K.total * K.split[i]) / 100)) : `${K.split[i]}%`)
  return (
    <MockFrame
      title={
        <Segmented accent="sent" label={c.sentiment.label} value={mode} options={c.sentiment.options as { value: Mode; label: string }[]} onChange={setMode} />
      }
      caption={`Sample sentiment for ${K.name}: ${K.split[0]}% positive, ${K.split[1]}% neutral, ${K.split[2]}% negative.`}
      bodyClassName="gap-3.5"
    >
      <HBar
        ariaLabel={order.map((s, i) => `${sentimentLabel[s]} ${display(i)}`).join(", ")}
        max={100}
        thickness={16}
        labelClassName="w-22"
        data={order.map((s, i) => ({
          label: c.sentiment.rows[s],
          value: K.split[i],
          display: display(i),
          tone: s,
        }))}
        className="text-[0.78125rem]"
      />
      <p className={cn("text-[0.8125rem] font-bold", net >= 0 ? "text-pos" : "text-neg")}>
        {net >= 0 ? sentimentGlyph.pos : sentimentGlyph.neg} {c.sentiment.net} {signed(net)}
      </p>
    </MockFrame>
  )
}

/* ------------------- B4 · Hashtag-wise sentiment and trending ------------------- */
/** Part B · 4 · The hashtags used with the keyword: usage, growth, reach and how each community feels. */
export function KeywordHashtagsWidget() {
  const K = useKeyword()
  const h = c.hashtags
  return (
    <MockFrame
      title={`${h.title} ${K.name}`}
      caption={`${h.caption} ${K.hashtags.map((t) => `${t.tag}: ${t.usage} uses, up ${t.growth}%, reach ${t.reach}, ${sentimentLabel[t.sentiment].toLowerCase()}`).join("; ")}.`}
    >
      <table className="w-full table-fixed text-xs tabular">
        <colgroup>
          <col />
          <col className="w-12 sm:w-14" />
          <col className="w-13 sm:w-15" />
          <col className="w-10 sm:w-12" />
          <col className="w-21 sm:w-26" />
        </colgroup>
        <thead className="border-b border-border text-[0.65625rem] text-muted-foreground">
          <tr>
            <th scope="col" className="py-1.5 text-left font-normal">
              {h.columns.tag}
            </th>
            <th scope="col" className="py-1.5 text-right font-normal">
              {h.columns.usage}
            </th>
            <th scope="col" className="py-1.5 text-right font-normal">
              {h.columns.growth}
            </th>
            <th scope="col" className="py-1.5 text-right font-normal">
              {h.columns.reach}
            </th>
            <th scope="col" className="py-1.5 pl-2.5 text-left font-normal">
              {h.columns.sentiment}
            </th>
          </tr>
        </thead>
        <tbody>
          {K.hashtags.map((t) => (
            <tr key={t.tag} className="border-b border-border last:border-0">
              <th scope="row" title={t.tag} className="truncate py-2.5 text-left font-semibold">
                {t.tag}
              </th>
              <td className="py-2.5 text-right">{t.usage}</td>
              <td className="py-2.5 text-right whitespace-nowrap text-pos">▲ {t.growth}%</td>
              <td className="py-2.5 text-right">{t.reach}</td>
              <td className="py-2.5 pl-2.5">
                <SentimentChip sentiment={t.sentiment} short className="sm:hidden" />
                <SentimentChip sentiment={t.sentiment} className="max-sm:hidden" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MockFrame>
  )
}

/* ------------------------- B5 · Topics and categories ------------------------- */
/** Part B · 5 · Themes the keyword appears in (on- or off-message) and the category graph. */
export function KeywordTopicsWidget() {
  const K = useKeyword()
  const t = c.topics
  return (
    <MockFrame
      caption={`${t.caption} Topics: ${K.topics.map((x) => `${x.name} (${x.onMessage ? "on-message" : "off-message"})`).join(", ")}. Categories: ${K.categories.map((x) => `${x.name} ${x.share}%`).join(", ")}.`}
    >
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className={cn(darkCard, "flex flex-col gap-2 p-3")}>
          <p className="text-[0.78125rem] font-semibold">{t.topics}</p>
          <ul className="flex flex-col text-xs">
            {K.topics.map((x) => (
              <li key={x.name} className="flex justify-between gap-2 border-t border-border py-1.5">
                <span>{x.name}</span>
                <span className={cn("whitespace-nowrap", x.onMessage ? "text-pos" : "text-neg")}>{x.onMessage ? t.onMessage : t.offMessage}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(darkCard, "flex flex-col gap-2 p-3")}>
          <p className="text-[0.78125rem] font-semibold">{t.categories}</p>
          <HBar
            ariaLabel={`${t.categories}: ${K.categories.map((x) => `${x.name} ${x.share}%`).join(", ")}`}
            tone="chart-3"
            max={100}
            thickness={9}
            labelClassName="w-24"
            data={K.categories.map((x) => ({
              label: x.name,
              value: x.share,
              display: `${x.share}%`,
            }))}
          />
        </div>
      </div>
    </MockFrame>
  )
}
