"use client"

import { useId, useState } from "react"
import { Check, Filter, Info } from "lucide-react"
import { m, useReducedMotion } from "motion/react"

import { checkBadge, pickerItem } from "@/components/mocks/channels/styles"
import { ViewIcon } from "@/components/mocks/channels/ViewIcon"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { channelFilters as f, channelNetworks, channelOrder, type ChannelKey } from "@/content/channels-data"
import { channelsFilters as c } from "@/content/features/channel-analysis"
import type { Sentiment } from "@/content/sample-data"
import { widgetPulse } from "@/lib/motion"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

type FilterKey = keyof typeof f.updates
type State = {
  net: ChannelKey
  range: string
  obj: number
  kw: string
  grp: number
  tag: string
  sent: string
  ctype: string
  sort: string
  upd: readonly number[]
  flip: number
}

const labelClass = "text-xs font-semibold tracking-[0.03em] text-neutral-text uppercase"

function Field({ label, value, options, onChange, highlight }: { label: React.ReactNode; value: string; options: readonly string[]; onChange: (v: string) => void; highlight?: boolean }) {
  const id = useId()
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <Label htmlFor={id} className={cn(labelClass, highlight && "text-channels-text")}>
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className={cn("w-full bg-card", highlight && "border-2 border-channels-text")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

/**
 * "Narrow it down": the same filter bar on every view; only the object filter (Profile, Post or
 * Author) changes its name. Four widgets recompute together, flag "Updated" and pulse once; the
 * results are announced politely. Ends with the "says why instead of going blank" empty state.
 */
export function ChannelsFilterShowcase() {
  const reduced = useReducedMotion()
  const [s, setS] = useState<State>({ net: "interactions", obj: 0, grp: 0, ...f.defaults, upd: f.updates.net, flip: 0 })
  const n = channelNetworks[s.net]
  const nf = n.filter

  const set = (key: FilterKey, patch: Partial<State>) =>
    setS((prev) => ({ ...prev, ...patch, ...(key === "net" ? { obj: 0, grp: 0, ctype: f.defaults.ctype } : {}), upd: f.updates[key], flip: prev.flip + 1 }))

  const factor = f.ranges.find((r) => r.value === s.range)?.factor ?? 1
  const sIdx = (f.sentiments as readonly string[]).indexOf(s.sent)
  const share = sIdx > 0 ? nf.base.split[sIdx - 1] / 100 : 1
  const mentions = Math.max(0, Math.round(nf.base.mentions * factor * share)).toLocaleString("en-US")
  const only: Sentiment | null = sIdx === 1 ? "pos" : sIdx === 2 ? "neu" : sIdx === 3 ? "neg" : null
  const sentTone: Sentiment = only ?? "pos"
  const sentValue = only ? `${sentimentGlyph[only]} ${c.only[sentimentLabel[only] as keyof typeof c.only]}` : `${sentimentGlyph.pos} ${nf.base.split[0]}% ${sentimentLabel.pos}`

  const widgets = [
    { t: c.widgets[0], v: mentions, sub: s.range },
    { t: c.widgets[1], v: nf.base.er, sub: s.ctype },
    { t: c.widgets[2], v: sentValue, sub: `${nf.base.split.join(" / ")} ${c.splitNote}`, tone: sentTone },
    { t: c.widgets[3], v: nf.base.top, sub: c.by(s.sort) },
  ]

  return (
    <section aria-labelledby="narrow-h" className="container-site flex flex-col gap-6 pt-16 md:pt-24">
      <Reveal>
        <SectionHeader id="narrow-h" title={c.title} lead={c.lead} />
      </Reveal>
      <Reveal className="flex flex-col gap-5 rounded-lg bg-card p-4 shadow-card md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ToggleGroup
            type="single"
            spacing={2}
            aria-label={c.network}
            value={s.net}
            onValueChange={(v) => v && v !== s.net && set("net", { net: v as ChannelKey })}
            className="flex-wrap"
          >
            {channelOrder.map((k) => (
              <ToggleGroupItem key={k} value={k} className={cn(pickerItem, "w-auto gap-2 px-3.5 text-sm font-semibold")}>
                <ViewIcon view={k} className="size-4.5" />
                {channelNetworks[k].name}
                <span aria-hidden="true" className={checkBadge}>
                  <Check strokeWidth={3.5} className="size-2.5" />
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <SampleDataChip tone="light" />
        </div>

        <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <Field label={c.labels.range} value={s.range} options={f.ranges.map((r) => r.value)} onChange={(v) => set("range", { range: v })} />
          <Field
            highlight
            label={
              <>
                {n.obj} <span className="sr-only">{c.labels.objNote}</span>
              </>
            }
            value={nf.objects[s.obj]}
            options={nf.objects}
            onChange={(v) => set("obj", { obj: Math.max(0, nf.objects.indexOf(v)) })}
          />
          <Field label={c.labels.kw} value={s.kw} options={f.keywords} onChange={(v) => set("kw", { kw: v })} />
          <Field label={c.labels.grp} value={nf.groups[s.grp]} options={nf.groups} onChange={(v) => set("grp", { grp: Math.max(0, nf.groups.indexOf(v)) })} />
          <Field label={c.labels.tag} value={s.tag} options={f.hashtags} onChange={(v) => set("tag", { tag: v })} />
          <Field label={c.labels.sent} value={s.sent} options={f.sentiments} onChange={(v) => set("sent", { sent: v })} />
          <Field label={c.labels.ctype} value={s.ctype} options={nf.contentTypes} onChange={(v) => set("ctype", { ctype: v })} />
          <Field label={c.labels.sort} value={s.sort} options={f.sorts} onChange={(v) => set("sort", { sort: v })} />
        </div>

        <div aria-live="polite" className="on-dark grid gap-3 rounded-lg tabular sm:grid-cols-2 lg:grid-cols-4">
          {widgets.map((w, i) => {
            const updated = s.upd.includes(i)
            return (
              <m.div
                key={`${i}-${updated ? s.flip : 0}`}
                animate={updated && s.flip && !reduced ? widgetPulse : undefined}
                className={cn("flex min-w-0 flex-col gap-1 rounded-lg border bg-background p-3.5 text-foreground", updated ? "border-channels" : "border-border")}
              >
                <span className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  {w.t}
                  {updated && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-channels px-2 py-0.5 text-[0.625rem] font-semibold text-ink">
                      <Check aria-hidden="true" strokeWidth={3} className="size-2.5" />
                      {c.updated}
                    </span>
                  )}
                </span>
                <strong className={cn("font-heading text-base leading-tight font-bold md:text-lg", w.tone && sentimentText[w.tone])}>{w.v}</strong>
                <span className="text-xs text-muted-foreground">{w.sub}</span>
              </m.div>
            )
          })}
        </div>
        <p className="flex items-center gap-2 text-[0.9375rem] font-semibold">
          <Filter aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-channels-text" />
          {c.footer}
        </p>
      </Reveal>
      <Reveal className="flex flex-wrap items-center gap-4 rounded-lg bg-channels-tint px-5 py-4">
        <Info aria-hidden="true" strokeWidth={2} className="size-5.5 flex-none text-channels-text" />
        <p className="flex-[1_1_320px] text-[0.9375rem] font-bold">{c.emptyIntro}</p>
        <div className="on-dark flex flex-[0_1_420px] flex-col gap-0.5 rounded-lg bg-background px-3.5 py-3 text-[0.78125rem] text-foreground">
          <strong>{f.empty.title}</strong>
          <span className="text-muted-foreground">{f.empty.text}</span>
        </div>
      </Reveal>
    </section>
  )
}
