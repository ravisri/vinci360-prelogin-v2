"use client"

import { useId, useState } from "react"
import { Bell, Mail } from "lucide-react"

import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { fieldLabel, paper } from "@/components/mocks/reports/styles"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { reportsAlerts } from "@/content/features/reports-alerts"
import { reports } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = reportsAlerts.rule
type Rule = { metric: string; dir: string; val: string; win: string; subj: string }
type Field = keyof Rule

/** Amount options: a percentage for rises/falls, otherwise a level (net score or a count). */
function amounts(rule: Rule) {
  const pct = rule.dir === "rises by" || rule.dir === "falls by"
  if (pct) return reports.ruleValues.pct.map((v) => ({ value: v, label: `${v}%` }))
  if (rule.metric === "Net sentiment") return reports.ruleValues.net.map((v) => ({ value: v, label: v }))
  return reports.ruleValues.abs.map((v) => ({ value: v, label: Number(v).toLocaleString("en-US") }))
}

const switchOn = "data-[state=checked]:bg-reports-text"

/**
 * Part B · 1 · "New alert rule": a sentence of selects (what, which way, how much, how fast, for
 * what) that rewrites "In plain words" as it changes, an on/off switch and two saved rules.
 * Desktop reads as one inline sentence; 390 stacks the same fields with a label each.
 */
export function AlertRuleBuilder() {
  const [rule, setRule] = useState<Rule>({ metric: c.metrics[0], dir: c.dirs[0], val: "30", win: c.wins[1], subj: c.subjects[0] })
  const [on, setOn] = useState(true)
  const [saved, setSaved] = useState<boolean[]>([...reports.savedRulesOn])
  const base = useId()
  const id = (k: string) => `${base}-${k}`

  const vals = amounts(rule)
  const val = vals.some((o) => o.value === rule.val) ? rule.val : vals[0].value
  const valLabel = vals.find((o) => o.value === val)!.label
  const sentence = (on ? "" : c.paused) + c.sentence(rule.metric, rule.subj, rule.dir, valLabel, rule.win)
  const set = (k: Field) => (v: string) => setRule((r) => ({ ...r, [k]: v }))

  const options: Record<Field, readonly { value: string; label: string }[]> = {
    metric: c.metrics.map((v) => ({ value: v, label: v })),
    dir: c.dirs.map((v) => ({ value: v, label: v })),
    val: vals,
    win: c.wins.map((v) => ({ value: v, label: v })),
    subj: c.subjects.map((v) => ({ value: v, label: v })),
  }
  const value: Rule = { ...rule, val }

  const select = (k: Field, prefix: string, className?: string) => (
    <Select value={value[k]} onValueChange={set(k)}>
      <SelectTrigger id={id(prefix + k)} className={cn("bg-card font-semibold text-reports-text", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options[k].map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
  const label = (k: Field, prefix: string, text: string, className?: string) => (
    <label htmlFor={id(prefix + k)} className={className}>
      {text}
    </label>
  )
  const ruleSwitch = (labelId: string) => <Switch checked={on} onCheckedChange={setOn} aria-labelledby={labelId} className={switchOn} />

  return (
    <>
      {/* 390: stacked fields. */}
      <div className={cn(paper, "flex flex-col gap-2.5 p-4 md:hidden")}>
        <SampleDataChip tone="light" className="self-start" />
        {label("metric", "m-", c.notifyMobile, fieldLabel)}
        {select("metric", "m-", "w-full")}
        {label("subj", "m-", c.mobileLabels.subj, fieldLabel)}
        {select("subj", "m-", "w-full")}
        {label("dir", "m-", c.mobileLabels.dir, fieldLabel)}
        {select("dir", "m-", "w-full")}
        {label("val", "m-", c.mobileLabels.val, fieldLabel)}
        {select("val", "m-", "w-full")}
        {label("win", "m-", c.mobileLabels.win, fieldLabel)}
        {select("win", "m-", "w-full")}
        <p aria-live="polite" className="rounded-sm bg-reports-tint px-3 py-2.5 text-sm">
          <strong className="block text-xs text-reports-text">{c.plainMobile}</strong>
          {sentence}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span id={id("m-on")} className="text-sm font-semibold">
            {on ? c.on : c.off}
          </span>
          {ruleSwitch(id("m-on"))}
        </div>
      </div>

      {/* md+: one inline sentence. */}
      <div className={cn(paper, "flex flex-col gap-4 p-5.5 max-md:hidden")}>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-heading text-base font-extrabold">
            <Bell aria-hidden="true" strokeWidth={2} className="size-4.5 text-reports-text" />
            {c.title}
          </span>
          <span className="flex items-center gap-2 text-[0.8125rem] font-semibold">
            <span id={id("on")}>{on ? c.on : c.off}</span>
            {ruleSwitch(id("on"))}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
          <span>{c.notify}</span>
          {label("metric", "", c.labels.metric, "sr-only")}
          {select("metric", "")}
          {label("dir", "", c.labels.dir, "sr-only")}
          {select("dir", "")}
          {label("val", "", c.labels.val, "sr-only")}
          {select("val", "")}
          <span>{c.within}</span>
          {label("win", "", c.labels.win, "sr-only")}
          {select("win", "")}
          <span>{c.for}</span>
          {label("subj", "", c.labels.subj, "sr-only")}
          {select("subj", "")}
        </div>
        <p aria-live="polite" className="rounded-sm bg-background px-3 py-2.5 text-[0.84375rem]">
          <strong>{c.plain}</strong> {sentence}
        </p>
        <p className="flex items-center gap-2 text-[0.78125rem] text-neutral-text">
          <Mail aria-hidden="true" strokeWidth={2} className="size-4 text-reports-text" />
          {c.sendTo}
        </p>
        <div className="flex flex-col gap-2 border-t border-muted pt-3">
          <span className="text-xs font-bold tracking-[0.04em] text-neutral-text uppercase">{c.saved}</span>
          <ul className="flex flex-col gap-2">
            {c.savedRules.map((text, i) => (
              <li key={text} className="flex items-center gap-2.5 rounded-lg border border-muted px-3 py-2.5 text-[0.84375rem]">
                <span className="flex-1">{text}</span>
                <span id={id(`sv-${i}`)} className="sr-only">
                  {`${text}: ${c.state(saved[i])}`}
                </span>
                <Switch
                  checked={saved[i]}
                  onCheckedChange={(v) => setSaved((s) => s.map((x, j) => (j === i ? v : x)))}
                  aria-labelledby={id(`sv-${i}`)}
                  className={switchOn}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
