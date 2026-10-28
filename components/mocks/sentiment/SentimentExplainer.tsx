"use client"

import { useRef, useState } from "react"
import { ArrowRight, TriangleAlert } from "lucide-react"

import { StackedBar100 } from "@/components/charts/StackedBar100"
import { NetGauge } from "@/components/mocks/sentiment/NetGauge"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { Button } from "@/components/ui/button"
import { sentimentExplainer as c } from "@/content/features/sentiment-keywords"
import { sentiment } from "@/content/sample-data"
import { sentimentGlyph, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

type View = "overall" | "under"
const u = sentiment.underneath
const signed = (n: number) => `${n < 0 ? "−" : "+"}${Math.abs(n)}`

/** Purple "needs attention" outline; never a sentiment colour. */
const flag = "rounded-[6px] outline-2 outline-offset-3 outline-sent"
/** Opacity-only swap (no layout shift); instant with reduced motion. */
const fade = "transition-[opacity,visibility] duration-450 ease-out motion-reduce:transition-none"
const chip = "self-start rounded-full bg-neutral-tint px-2.5 py-1 text-xs leading-[1.3] font-semibold text-neutral-text"

/**
 * "A healthy score can hide a problem." Desktop: the overall gauge, an arrow, then the platform and
 * hashtag breakdown, laid out from the start under a tinted cover; "Look underneath" fades the cover
 * and moves focus to the breakdown. 390: the two panes share one grid cell (height reserved by the
 * taller one) and cross-fade. Every word is in the server HTML either way.
 */
export function SentimentExplainer() {
  const [view, setView] = useState<View>("overall")
  const underRef = useRef<HTMLHeadingElement>(null)
  const under = view === "under"

  const reveal = () => {
    setView("under")
    // The cover button is about to disappear; land keyboard and screen-reader users on what it revealed.
    requestAnimationFrame(() => underRef.current?.focus())
  }

  return (
    <div className="flex flex-col gap-3.5 md:gap-7 md:rounded-lg md:border md:border-border md:bg-card md:p-10">
      <div className="flex flex-col gap-3.5 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-4">
        <div className="flex max-w-160 flex-col gap-3.5 md:gap-2">
          <h2 id="ex-h" className="text-[1.625rem] leading-[1.15] md:text-h2">
            {c.title}
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground md:text-[1.0625rem]">{c.lead}</p>
        </div>
        <Segmented
          tone="light"
          accent="sent"
          label={c.view.label}
          value={view}
          options={c.view.options as { value: View; label: string }[]}
          onChange={setView}
          className="max-md:w-full max-md:*:flex-1 max-md:*:text-[0.9375rem]"
        />
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_3.75rem_minmax(0,1.6fr)]">
        {/* Pane 1 · Overall */}
        <figure
          className={cn(
            fade,
            "col-start-1 row-start-1 flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-5 text-center tabular max-md:justify-center md:gap-2.5 md:border-0 md:bg-background md:p-6",
            under && "max-md:invisible max-md:opacity-0",
          )}
        >
          <figcaption className="sr-only">{c.overall.caption}</figcaption>
          <span className={cn(chip, "max-md:hidden")}>{c.overall.chip}</span>
          <NetGauge net={sentiment.overall.net} className="w-50 md:w-55" />
          <span className="font-bold text-pos">{c.overall.line}</span>
          <span className="text-sm text-muted-foreground">
            <span className="md:hidden">{c.overall.askMobile}</span>
            <span className="max-md:hidden">{c.overall.ask}</span>
          </span>
        </figure>

        <div aria-hidden="true" className="grid place-items-center text-sent-text max-md:hidden">
          <ArrowRight strokeWidth={2.5} className="size-8" />
        </div>

        {/* Pane 2 · Underneath (same grid cell as pane 1 below md) */}
        <figure className={cn(fade, "relative col-start-1 row-start-1 md:col-start-3", !under && "max-md:invisible max-md:opacity-0")}>
          <figcaption className="sr-only">{c.under.caption}</figcaption>
          <div className="flex flex-col gap-3.5 rounded-lg border border-border bg-card p-4.5 tabular md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-5 md:border-0 md:bg-background md:p-5.5">
            <h3 ref={underRef} tabIndex={-1} className="sr-only">
              {c.under.heading}
            </h3>
            <div className="flex flex-col gap-2.5">
              <span className={cn(chip, "max-md:hidden")}>{c.under.chipPlatform}</span>
              <ul className="grid grid-cols-[6rem_minmax(0,1fr)_4.375rem] items-center gap-x-2 gap-y-2.25 text-[0.78125rem] md:grid-cols-[6.5rem_minmax(0,1fr)_4.875rem]">
                {u.topics.map((p) => (
                  <li key={p.label} className="contents">
                    <span className={cn(p.flagged && "font-bold")}>{p.label}</span>
                    <StackedBar100 data={p.split} height={12} labels={false} className={cn(p.flagged && flag)} />
                    <span className={cn(sentimentText[p.tone], p.flagged ? "font-bold" : "font-semibold")}>
                      {sentimentGlyph[p.tone]} {signed(p.net)}
                      {p.change !== undefined && <span className="max-md:hidden"> ({signed(p.change)})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2.5 max-md:border-t max-md:border-neutral-tint max-md:pt-2.5">
              <span className={cn(chip, "max-md:hidden")}>{c.under.chipHashtag}</span>
              <ul className="flex flex-col gap-1.5 text-[0.78125rem] md:gap-2">
                {u.hashtags.map((h) => (
                  <li key={h.tag} className={cn("flex justify-between px-2 py-1.5", h.flagged && cn(flag, "font-bold"))}>
                    {h.tag}
                    <span className={cn(sentimentText[h.tone], !h.flagged && "font-semibold")}>
                      {sentimentGlyph[h.tone]} {signed(h.net)}
                      {h.change !== undefined && ` (${signed(h.change)})`}
                    </span>
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-sent px-3 py-1.5 text-xs leading-[1.2] font-bold text-primary-foreground md:px-2.5 md:py-1 md:text-[0.71875rem]">
                <TriangleAlert aria-hidden="true" strokeWidth={2.5} className="size-3.25" />
                {c.under.callout}
              </span>
            </div>
          </div>

          {/* Desktop cover: fades away to reveal the breakdown laid out beneath it. */}
          <div
            className={cn(
              fade,
              "absolute inset-0 z-3 grid place-items-center rounded-lg bg-sent-tint/85 backdrop-blur-xs max-md:hidden",
              under && "invisible opacity-0",
            )}
          >
            <Button
              type="button"
              variant="outline"
              onClick={reveal}
              className="border-sent-text text-sent-text hover:border-sent-text hover:bg-sent-tint hover:text-sent-text"
            >
              {c.under.reveal}
              <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4.5" />
            </Button>
          </div>
        </figure>
      </div>

      <p className="text-[0.8125rem] text-muted-foreground max-md:hidden">{c.key}</p>
    </div>
  )
}
