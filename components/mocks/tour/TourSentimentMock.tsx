"use client"

import { useId, useState } from "react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { Panel, TourFrame, TourHotspot } from "@/components/mocks/tour/TourFrame"
import { CountUp } from "@/components/motion/CountUp"
import { useTour } from "@/components/sections/tour/tour-context"
import { networks, sentimentByPlatform, tour } from "@/content/sample-data"
import { tourPage } from "@/content/tour"
import { sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const step = tourPage.steps[3]
const c = tourPage.mocks.sentiment
const t = tour.threshold

/** Step 4 · Sentiment Analysis: overall net, threshold slider that flags platforms, platform bars and hashtag-wise sentiment. */
export function TourSentimentMock() {
  const { range } = useTour()
  const id = useId()
  const [thr, setThr] = useState(t.initial)
  const overall = tour.overall[range]
  const rows = tour.platformNet.map((p) => ({ ...p, n: p.net[range], d: p.delta[range], flag: p.net[range] < thr }))
  const flagged = rows.filter((r) => r.flag).length
  const ig = tour.platformNet.find((p) => p.network === "instagram")!

  return (
    <TourFrame
      step={step}
      float={
        <FloatCard className="flex flex-col gap-0.5 px-3.5 py-3 tabular md:relative md:mt-3.5 md:w-fit xl:absolute xl:-right-3.5 xl:bottom-7.5 xl:mt-0 xl:w-60">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <NetworkIcon network="instagram" className="size-3.25" />
            {c.float.network}
          </p>
          <p className="font-heading text-base font-extrabold">
            {c.float.metric} <Delta trend="down" className="font-extrabold">−{Math.abs(ig.delta[range])} pts</Delta>
          </p>
          <p className="text-xs text-muted-foreground">{c.float.vs}</p>
        </FloatCard>
      }
    >
      <div className="grid grid-cols-2 gap-2.5">
        <Panel className="flex-row items-center gap-3.5">
          <span className="font-heading text-3xl font-extrabold">
            +<CountUp key={range} value={overall.net} />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[0.78125rem] font-semibold">{c.overall}</span>
            <Delta trend={overall.trend} className="text-xs font-normal">
              {overall.delta}
            </Delta>
            <span className="text-[0.71875rem] text-muted-foreground">{c.healthy}</span>
          </span>
        </Panel>
        <Panel className="gap-0.5">
          <label htmlFor={id} className="flex justify-between text-[0.78125rem] font-semibold">
            {c.threshold} <span className="text-chart-3">{c.below(thr)}</span>
          </label>
          <input
            id={id}
            type="range"
            min={t.min}
            max={t.max}
            step={1}
            value={thr}
            onChange={(e) => setThr(Number(e.target.value))}
            className="h-7 w-full cursor-pointer accent-chart-3"
          />
          <span aria-live="polite" className="text-[0.6875rem] text-muted-foreground">
            {c.flagged(flagged)}
          </span>
          <TourHotspot step={step} i={2} className="top-0 left-[72%]" />
        </Panel>
      </div>

      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-2.5">
        <Panel className="gap-2.5 text-[0.71875rem]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.78125rem] font-semibold">{c.byPlatform}</p>
            <p aria-hidden="true" className="flex gap-2.5 text-[0.65625rem]">
              {c.legend.map((l, i) => (
                <span key={l} className={sentimentText[(["pos", "neu", "neg"] as const)[i]]}>
                  {l}
                </span>
              ))}
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {rows.map((r) => (
              <li key={r.network} className="grid grid-cols-[4.375rem_minmax(0,1fr)_7rem] items-center gap-2">
                <span className="font-semibold">{networks[r.network]}</span>
                <StackedBar100
                  data={sentimentByPlatform[r.network]}
                  height={20}
                  className={cn("[&_text]:text-[0.6875rem]", r.flag && "outline-2 outline-offset-2 outline-amber-on-dark")}
                  ariaLabel={`${networks[r.network]}: positive ${sentimentByPlatform[r.network][0]}%, neutral ${sentimentByPlatform[r.network][1]}%, negative ${sentimentByPlatform[r.network][2]}%`}
                />
                <span className="flex flex-col leading-[1.25]">
                  <span>
                    {c.net} <strong>+{r.n}</strong>{" "}
                    <Delta trend={r.d >= 0 ? "up" : "down"} className="font-normal">
                      {Math.abs(r.d)} pts
                    </Delta>
                  </span>
                  {r.flag && <span className="text-[0.65625rem] font-bold text-amber-on-dark">{c.flag}</span>}
                </span>
              </li>
            ))}
          </ul>
          <TourHotspot step={step} i={0} className="top-0 left-[40%]" />
        </Panel>

        <Panel title={c.hashtags} className="gap-1 text-xs">
          <ul className="flex flex-col gap-1">
            {tour.hashtagNet.map((h) => (
              <li
                key={h.tag}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-[6px] px-2 py-1.75",
                  h.note ? "bg-border outline-1 outline-neg" : "rounded-none border-b border-border"
                )}
              >
                <span className="flex flex-col">
                  <span className="font-semibold">{h.tag}</span>
                  {h.note && <span className="text-[0.65625rem] text-muted-foreground">{h.note}</span>}
                </span>
                <span className="text-right">
                  <strong>{h.net}</strong>{" "}
                  <Delta trend={h.trend} className="font-normal">
                    {h.move}
                  </Delta>
                </span>
              </li>
            ))}
          </ul>
          <TourHotspot step={step} i={1} className="top-0 right-6 translate-x-0" />
        </Panel>
      </div>
    </TourFrame>
  )
}
