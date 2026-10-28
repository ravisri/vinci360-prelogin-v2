"use client"

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import { ArrowRight, Check, Download, FileText, Info, Mail, Monitor, Plus, Search, X } from "lucide-react"
import { m } from "motion/react"

import { HBar } from "@/components/charts/HBar"
import { StackedBar100 } from "@/components/charts/StackedBar100"
import { Delta } from "@/components/mocks/Delta"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { largestRemainder } from "@/components/mocks/compare/brand"
import { fieldLabel, kpiTile, paper, recipChip, toggleChip } from "@/components/mocks/reports/styles"
import { Segmented } from "@/components/mocks/smi/Segmented"
import { Reveal } from "@/components/motion/Reveal"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { reportsBuilder as c } from "@/content/features/reports-alerts"
import { reports, reportTopics, type ReportSubject, type ReportTopic } from "@/content/sample-data"
import { crossFade } from "@/lib/motion"
import { cn } from "@/lib/utils"

type ReportType = (typeof c.types)[number]["value"]
type Period = (typeof c.periods)[number]["value"]
type Output = (typeof c.outputs)[number]["value"]

const outputIcon: Record<Output, ReactNode> = {
  screen: <Monitor strokeWidth={1.8} className="size-4" />,
  pdf: <FileText strokeWidth={1.8} className="size-4" />,
  excel: <FileText strokeWidth={1.8} className="size-4" />,
  email: <Mail strokeWidth={1.8} className="size-4" />,
}

const int = (n: number) => Math.round(n).toLocaleString("en-US")
function big(n: number) {
  if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/0$/, "").replace(/\.0$/, "") + "M"
  if (n >= 1e3) return Math.round(n / 1e3) + "K"
  return String(Math.round(n))
}
const signed = (n: number) => (n >= 0 ? "+" : "−") + Math.abs(n)
const trendOf = (n: number) => (n >= 0 ? "up" : "down") as "up" | "down"

type State = {
  type: ReportType
  si: number
  period: Period
  range: string
  plats: Record<ReportTopic, boolean>
  outs: Record<Output, boolean>
  sched: boolean
  tod: string
}

/** Everything the preview shows, derived from the settings (same maths as the reference script). */
function derive(s: State, recipients: readonly string[]) {
  const S: ReportSubject = reports.builder[s.type][s.si]
  const R = c.ranges.find((r) => r.value === s.range) ?? c.ranges[1]
  const P = c.periods.find((p) => p.value === s.period) ?? c.periods[1]
  const time = c.times.find((t) => t.value === s.tod)?.label ?? ""
  const platOn = reportTopics.filter((n) => s.plats[n])
  const f = R.factor * (platOn.reduce((a, n) => a + S.pl[n], 0) / 100)
  const shares = largestRemainder(platOn.map((n) => S.pl[n]))
  const outOn = c.outputs.filter((o) => s.outs[o.value]).map((o) => o.label)
  const rangeLabel = R.value === "custom" ? c.rangeCustom : R.label
  const mentions = int(S.m * f)
  const dm = `${Math.abs(S.dm)}% ${c.vsPrev}`
  return {
    S,
    kind: c.kind(c.types.find((t) => t.value === s.type)!.label, P.label),
    rangeLabel,
    prev: R.prev,
    kpis: [
      { label: "Mentions", short: "Mentions", val: mentions, delta: dm, trend: trendOf(S.dm) },
      { label: "Net sentiment", short: "Net sent.", val: signed(S.s), delta: `${Math.abs(S.ds)} pts ${c.vsPrev}`, trend: trendOf(S.ds) },
      { label: "Engagement", short: "Engage.", val: big(S.e * f), delta: `${Math.abs(S.de)}% ${c.vsPrev}`, trend: trendOf(S.de) },
    ],
    plats: platOn.map((n, i) => ({ label: n, value: shares[i], display: `${shares[i]}%` })),
    schedText: s.sched ? c.scheduleText(P.label, P.every, time) : c.scheduleOff,
    filters: [
      S.name,
      rangeLabel,
      platOn.length === 4 ? c.allPlatforms : platOn.join(", ") || c.noPlatformShort,
      `${c.outputLabel} ${outOn.join(", ") || c.none}`,
      ...(s.sched ? [c.sent(P.every, time)] : []),
    ].join(" · "),
    outLabel: outOn.join(", ") || c.none,
    alt: c.alt(P.label, S.name, rangeLabel, mentions, `${trendOf(S.dm)} ${dm}`, S.s),
    sendTo: recipients[0] ?? c.you,
  }
}

type Derived = ReturnType<typeof derive>

/** The report sheet; re-keyed on every change so it cross-fades (opacity only). */
function Preview({ d, version, compact }: { d: Derived; version: number; compact?: boolean }) {
  const S = d.S
  return (
    <figure aria-live="polite" className="m-0">
      <figcaption className="sr-only">{d.alt}</figcaption>
      <m.div key={version} variants={crossFade} initial="hidden" animate="show" className={cn(paper, "flex flex-col tabular", compact ? "gap-0" : "gap-4 p-6")}>
        {compact ? (
          <div className="border-b border-border p-3 text-[0.78125rem] leading-[1.35]">
            <strong className="block">{S.name}</strong>
            <span className="text-muted-foreground">{d.schedText}</span>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-2.5 border-b-2 border-reports-text pb-2.5">
            <div>
              <span className="block text-[0.6875rem] font-bold tracking-[0.05em] text-reports-text uppercase">{d.kind}</span>
              <span className="block font-heading text-xl leading-[1.2] font-extrabold">{S.name}</span>
              <span className="text-[0.78125rem] text-muted-foreground">
                {d.rangeLabel} · {c.vs} {d.prev}
              </span>
            </div>
            <span className="font-heading text-sm font-extrabold">
              vinci360<span className="text-primary">°</span>
            </span>
          </div>
        )}
        <div className={cn("flex flex-col", compact ? "gap-2.5 p-3" : "gap-4")}>
          {compact && <SampleDataChip tone="light" className="self-start" />}
          <dl className="grid grid-cols-3 gap-1.5 md:gap-2">
            {d.kpis.map((k) => (
              <div key={k.label} className={kpiTile}>
                <dt className="text-[0.65625rem] text-muted-foreground md:text-[0.6875rem]">{compact ? k.short : k.label}</dt>
                <dd className="font-heading text-[0.9375rem] font-extrabold md:text-[1.1875rem]">{k.val}</dd>
                <dd className="text-[0.65625rem] md:text-[0.6875rem]">
                  <Delta trend={k.trend}>{k.delta}</Delta>
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold">{c.sentiment}</span>
            <StackedBar100 data={S.sp} height={compact ? 10 : 14} labels={false} />
            <span className="text-[0.71875rem] text-neutral-text">{c.split(...S.sp)}</span>
          </div>
          <div className={cn("grid gap-3 text-xs", compact ? "grid-cols-1" : "grid-cols-3")}>
            <div>
              <span className="mb-1 block font-bold">{c.topics}</span>
              {compact ? (
                <span className="text-muted-foreground">{S.topics.join(", ")}</span>
              ) : (
                <ul>
                  {S.topics.map((t) => (
                    <li key={t} className="border-b border-muted py-0.75">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <span className="mb-1 block font-bold">{compact ? c.tagsShort : c.tags}</span>
              {compact ? (
                <span className="text-muted-foreground">{S.tags.join(" ")}</span>
              ) : (
                <ul>
                  {S.tags.map((t) => (
                    <li key={t} className="border-b border-muted py-0.75 font-semibold text-reports-text">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <span className="mb-1 block font-bold">{c.platformSplit}</span>
              {d.plats.length ? (
                <HBar data={d.plats} ariaLabel={`${c.platformSplit}: ${d.plats.map((p) => `${p.label} ${p.display}`).join(", ")}`} tone="chart-1" thickness={6} labelClassName="w-15" className="gap-1 text-[0.6875rem]" />
              ) : (
                <span className="text-[0.71875rem] text-neg">{c.noPlatform}</span>
              )}
            </div>
          </div>
          <p className="rounded-sm bg-reports-tint px-3 py-2.5 text-[0.8125rem]">
            <strong className={cn(compact && "text-reports-text")}>{c.changed}</strong> {S.changed}
          </p>
          <p className="border-t border-muted pt-2 text-[0.65625rem] text-muted-foreground">
            {c.filters} {d.filters}
          </p>
        </div>
      </m.div>
    </figure>
  )
}

/** Subject combobox: type to filter, ↑/↓ to move, Enter to pick, Escape to close. */
function SubjectPicker({ type, si, onPick }: { type: ReportType; si: number; onPick: (i: number) => void }) {
  const list = reports.builder[type]
  const [query, setQuery] = useState(list[si].name)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const id = useId()
  const listId = `${id}-list`
  const q = query.toLowerCase().trim()
  const matches = list.map((x, i) => ({ x, i })).filter(({ x }) => !open || !q || x.name.toLowerCase().includes(q))

  const pick = (i: number) => {
    onPick(i)
    setQuery(list[i].name)
    setOpen(false)
  }
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      if (!open) setOpen(true)
      const n = matches.length || 1
      setActive((a) => (e.key === "ArrowDown" ? (a + 1) % n : (a - 1 + n) % n))
    } else if (e.key === "Enter" && open && matches[active]) {
      e.preventDefault()
      pick(matches[active].i)
    } else if (e.key === "Escape") {
      setOpen(false)
      setQuery(list[si].name)
    }
  }

  return (
    <div className="relative flex flex-col gap-1.5">
      <label htmlFor={id} className={fieldLabel}>
        {c.subject(c.subjectKinds[type])}
      </label>
      <Search aria-hidden="true" strokeWidth={2} className="pointer-events-none absolute bottom-3.25 left-3 size-4.5 text-reports-text" />
      <Input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && matches[active] ? `${id}-o${matches[active].i}` : undefined}
        value={query}
        placeholder={c.search}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          setActive(0)
        }}
        onFocus={() => {
          setOpen(true)
          setActive(0)
          setQuery("")
        }}
        onBlur={() => {
          setOpen(false)
          setQuery(list[si].name)
        }}
        onKeyDown={onKey}
        className="border-reports-text pl-10"
      />
      {open && (
        <ul id={listId} role="listbox" aria-label={c.subjectsLabel} className="absolute inset-x-0 top-full z-20 mt-1 flex flex-col rounded-lg border border-border bg-card p-1 shadow-float">
          {matches.map(({ x, i }, n) => (
            <li
              key={x.name}
              id={`${id}-o${i}`}
              role="option"
              aria-selected={i === si}
              onMouseDown={(e) => {
                e.preventDefault()
                pick(i)
              }}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2 rounded-sm px-3 text-sm",
                n === active && "bg-reports-tint",
                i === si && "font-bold text-reports-text",
              )}
            >
              {x.name}
              <span className="ml-auto text-xs font-normal text-muted-foreground">{x.kind}</span>
            </li>
          ))}
          {!matches.length && <li className="p-3 text-sm text-muted-foreground">{c.noMatch}</li>}
        </ul>
      )}
    </div>
  )
}

/**
 * "Build a report": report type, subject, period, range, topics, output, recipients and the
 * schedule drive a live preview of the report email. From md the form and the preview sit side by
 * side in one card; at 390 they are two tabs (Settings with an accordion per group, then Preview).
 */
export function ReportBuilder() {
  const [s, setS] = useState<State>({
    type: "keyword",
    si: 0,
    period: "W",
    range: "7",
    plats: { Launch: true, Camera: true, Battery: true, Pricing: true },
    outs: { screen: true, pdf: true, excel: false, email: true },
    sched: true,
    tod: "08:45",
  })
  const [version, setVersion] = useState(0)
  const [recips, setRecips] = useState<string[]>([...reports.builder.recipients])
  const [draft, setDraft] = useState("")
  const [sent, setSent] = useState(false)
  const [tab, setTab] = useState("settings")
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const ids = { range: useId(), tod: useId(), addr: useId(), sched: useId(), mSubj: useId(), mRange: useId(), mTod: useId(), mAddr: useId(), mSched: useId() }

  useEffect(() => () => clearTimeout(timer.current), [])

  const update = (patch: Partial<State>) => {
    setS((prev) => ({ ...prev, ...patch }))
    setVersion((v) => v + 1)
  }
  const d = derive(s, recips)

  const addRecip = () => {
    const v = draft.trim()
    if (!v || !v.includes("@") || recips.includes(v)) return
    setRecips((r) => [...r, v])
    setDraft("")
  }
  const send = () => {
    setSent(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSent(false), 2500)
  }

  /* ---- Shared control bodies (desktop form and 390 accordion) ---- */
  const typeControl = (
    <Segmented
      label={c.type}
      tone="light"
      accent="reports"
      value={s.type}
      options={c.types}
      onChange={(t) => update({ type: t, si: 0 })}
      className="self-start"
    />
  )
  const periodControl = (
    <Segmented label={c.period} tone="light" accent="reports" value={s.period} options={c.periods} onChange={(p) => update({ period: p })} className="self-start" />
  )
  const rangeControl = (id: string) => (
    <Select value={s.range} onValueChange={(v) => update({ range: v })}>
      <SelectTrigger id={id} className="w-44 bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {c.ranges.map((r) => (
          <SelectItem key={r.value} value={r.value}>
            {r.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
  const platformControl = (
    <div role="group" aria-label={c.platform} className="flex flex-wrap gap-1.5">
      {reportTopics.map((n) => (
        <button key={n} type="button" aria-pressed={s.plats[n]} onClick={() => update({ plats: { ...s.plats, [n]: !s.plats[n] } })} className={toggleChip}>
          {n}
        </button>
      ))}
    </div>
  )
  const outputControl = (
    <div role="group" aria-label={c.output} className="flex flex-wrap gap-1.5">
      {c.outputs.map((o) => (
        <button key={o.value} type="button" aria-pressed={s.outs[o.value]} onClick={() => update({ outs: { ...s.outs, [o.value]: !s.outs[o.value] } })} className={toggleChip}>
          <span aria-hidden="true">{outputIcon[o.value]}</span>
          {o.label}
        </button>
      ))}
    </div>
  )
  const recipientList = (
    <ul aria-label={c.recipients} className="contents">
      {recips.map((a) => (
        <li key={a} className={recipChip}>
          {a}
          <button type="button" aria-label={c.remove(a)} onClick={() => setRecips((r) => r.filter((x) => x !== a))} className="grid size-9 cursor-pointer place-items-center rounded-full hover:bg-card">
            <X aria-hidden="true" strokeWidth={2.4} className="size-3.5" />
          </button>
        </li>
      ))}
    </ul>
  )
  const timeControl = (id: string) => (
    <Select value={s.tod} onValueChange={(v) => update({ tod: v })} disabled={!s.sched}>
      <SelectTrigger id={id} className="w-32 bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {c.times.map((t) => (
          <SelectItem key={t.value} value={t.value}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
  const sendButton = (className?: string) => (
    <Button type="button" variant={sent ? "default" : "outline"} onClick={send} className={className}>
      {sent ? <Check aria-hidden="true" strokeWidth={2} /> : <Mail aria-hidden="true" strokeWidth={2} />}
      {sent ? c.sentTo(d.sendTo) : c.send}
    </Button>
  )

  const mobileGroups = [
    {
      value: "type",
      label: c.type,
      summary: c.types.find((t) => t.value === s.type)!.label,
      body: (
        <div className="flex flex-col gap-3">
          {typeControl}
          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.mSubj} className={fieldLabel}>
              {c.subject(c.subjectKinds[s.type]).split(" (")[0]}
            </label>
            <Select value={String(s.si)} onValueChange={(v) => update({ si: Number(v) })}>
              <SelectTrigger id={ids.mSubj} className="w-full bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reports.builder[s.type].map((x, i) => (
                  <SelectItem key={x.name} value={String(i)}>
                    {x.name} · {x.kind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      value: "period",
      label: c.period,
      summary: `${c.periods.find((p) => p.value === s.period)!.label} · ${d.rangeLabel}`,
      body: (
        <div className="flex flex-col gap-3">
          {periodControl}
          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.mRange} className={fieldLabel}>
              {c.range}
            </label>
            {rangeControl(ids.mRange)}
          </div>
        </div>
      ),
    },
    { value: "platforms", label: c.platforms, summary: c.platCount(d.plats.length), body: platformControl },
    { value: "output", label: c.output, summary: d.outLabel, body: outputControl },
    {
      value: "email",
      label: c.emailTo,
      summary: c.recipCount(recips.length),
      body: (
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-1.5">{recipientList}</div>
          <label htmlFor={ids.mAddr} className={fieldLabel}>
            {c.addRecipient}
          </label>
          <div className="flex gap-1.5">
            <Input id={ids.mAddr} type="email" placeholder={c.placeholder} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addRecip()} />
            <Button type="button" onClick={addRecip} className="flex-none px-4">
              {c.add}
            </Button>
          </div>
        </div>
      ),
    },
    {
      value: "schedule",
      label: c.schedule,
      summary: d.schedText,
      body: (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <span id={ids.mSched} className="text-sm font-semibold">
              {c.scheduleAuto}
            </span>
            <Switch checked={s.sched} onCheckedChange={(v) => update({ sched: v })} aria-labelledby={ids.mSched} className="data-[state=checked]:bg-reports-text" />
          </div>
          <label htmlFor={ids.mTod} className={fieldLabel}>
            {c.time}
          </label>
          {timeControl(ids.mTod)}
        </div>
      ),
    },
  ]

  return (
    <section id="builder" aria-labelledby="bld-h" className="pt-11 md:container-site md:pt-24">
      <Reveal className="flex max-w-180 flex-col gap-2.5 px-4 pb-3 md:px-0 md:pb-5">
        <ModuleChip accent="reports" label={c.chip} dot={false} className="self-start" />
        <h2 id="bld-h" className="text-[1.625rem] leading-[1.15] md:text-h2">
          {c.title}
        </h2>
        <p className="text-[0.9375rem] text-muted-foreground md:text-[1.0625rem]">
          <span className="md:hidden">{c.leadMobile}</span>
          <span className="max-md:hidden">{c.lead}</span>
        </p>
      </Reveal>

      {/* 390: Settings / Preview tabs. */}
      <Tabs value={tab} onValueChange={setTab} className="gap-0 md:hidden">
        <TabsList variant="line" aria-label={c.tabs.label} className="h-auto! w-full justify-start gap-0 border-b border-border px-4">
          {[
            { v: "settings", l: c.tabs.settings },
            { v: "preview", l: c.tabs.preview },
          ].map((t) => (
            <TabsTrigger key={t.v} value={t.v} className={cn("min-h-11 flex-none px-4 text-[0.9375rem] font-semibold data-active:text-reports-text", "after:bg-reports-text")}>
              {t.l}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="settings" className="flex flex-col gap-2 px-4 pt-3.5">
          <Accordion type="multiple" defaultValue={["type"]} className="gap-2">
            {mobileGroups.map((g) => (
              <AccordionItem key={g.value} value={g.value} className="rounded-lg border border-border bg-card px-4 not-last:border-b">
                <AccordionTrigger className="min-h-13 items-center py-3 text-[0.9375rem] font-bold hover:no-underline">
                  <span className="flex flex-1 items-center justify-between gap-3 pr-2">
                    {g.label}
                    <span className="truncate text-sm font-semibold text-reports-text">{g.summary}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">{g.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button type="button" onClick={() => setTab("preview")} className="mt-1.5">
            {c.tabs.seePreview}
            <ArrowRight aria-hidden="true" strokeWidth={2} />
          </Button>
        </TabsContent>
        <TabsContent value="preview" className="flex flex-col gap-2.5 px-4 pt-3.5">
          <Preview d={d} version={version} compact />
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1">
              <FileText aria-hidden="true" strokeWidth={2} />
              PDF
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              <FileText aria-hidden="true" strokeWidth={2} />
              Excel
            </Button>
          </div>
          {sendButton("w-full")}
          <p role="status" className="text-center text-xs text-muted-foreground">
            {sent ? c.sentTo(d.sendTo) : ""}
          </p>
        </TabsContent>
      </Tabs>

      {/* md+: form left, live preview right. */}
      <Reveal className="grid overflow-visible rounded-lg bg-card shadow-card max-md:hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <form aria-label={c.form} onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5 border-border p-7 max-lg:border-b lg:border-r">
          <h3 className="text-h4 font-extrabold">{c.form}</h3>
          <div className="flex flex-col gap-1.5">
            <span className={fieldLabel}>{c.type}</span>
            {typeControl}
          </div>
          <SubjectPicker key={s.type} type={s.type} si={s.si} onPick={(i) => update({ si: i })} />
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1.5">
              <span className={fieldLabel}>{c.period}</span>
              {periodControl}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.range} className={fieldLabel}>
                {c.range}
              </label>
              {rangeControl(ids.range)}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={fieldLabel}>{c.platform}</span>
            {platformControl}
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={fieldLabel}>{c.output}</span>
            {outputControl}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.addr} className={fieldLabel}>
              {c.emailTo}
            </label>
            <div className="flex min-h-13 flex-wrap items-center gap-1.5 rounded-lg border border-border p-1.5">
              {recipientList}
              <input
                id={ids.addr}
                type="email"
                value={draft}
                placeholder={c.placeholder}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addRecip()
                  }
                }}
                className="h-10 min-w-40 flex-1 bg-transparent px-1.5 text-sm outline-offset-2 placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
              />
              <Button type="button" variant="outline" onClick={addRecip} className="min-h-10 px-3 text-[0.8125rem]">
                <Plus aria-hidden="true" strokeWidth={2.4} className="size-3.5" />
                {c.add}
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3.5 rounded-lg bg-background px-3.5 py-3">
            <Switch checked={s.sched} onCheckedChange={(v) => update({ sched: v })} aria-labelledby={ids.sched} className="data-[state=checked]:bg-reports-text" />
            <span id={ids.sched} className="text-[0.90625rem] font-semibold">
              {c.schedule} · <span className="text-reports-text">{d.schedText}</span>
            </span>
            <label htmlFor={ids.tod} className="sr-only">
              {c.time}
            </label>
            <span className="ml-auto">{timeControl(ids.tod)}</span>
          </div>
        </form>

        <div className="flex flex-col gap-3.5 rounded-b-lg bg-background p-7 lg:rounded-r-lg lg:rounded-bl-none">
          <div className="flex items-center justify-between">
            <h3 className="text-h4 font-extrabold">{c.preview}</h3>
            <SampleDataChip tone="light" />
          </div>
          <Preview d={d} version={version} />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline">
              <Download aria-hidden="true" strokeWidth={2} />
              {c.pdf}
            </Button>
            <Button type="button" variant="outline">
              <Download aria-hidden="true" strokeWidth={2} />
              {c.excel}
            </Button>
            {sendButton()}
          </div>
          <p role="status" className="sr-only">
            {sent ? c.sentTo(d.sendTo) : ""}
          </p>
        </div>
      </Reveal>

      <p className="mt-5 flex items-center gap-2 px-4 text-sm text-neutral-text max-md:hidden md:px-0">
        <Info aria-hidden="true" strokeWidth={2} className="size-4 flex-none text-reports-text" />
        {c.footnote}
      </p>
    </section>
  )
}
