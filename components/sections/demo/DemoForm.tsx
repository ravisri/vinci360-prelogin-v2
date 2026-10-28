"use client"

import { useState, type KeyboardEvent, type ReactNode } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Play, Plus, Sparkles, X } from "lucide-react"
import { Controller, useForm, useWatch, type FieldErrors } from "react-hook-form"

import { requestDemo } from "@/app/(marketing)/request-demo/actions"
import { ErrorSummary, type SummaryError } from "@/components/forms/ErrorSummary"
import { errorId, FieldError, FieldMark, FormField } from "@/components/forms/FormField"
import { FormLive, FormStatus } from "@/components/forms/FormStatus"
import { FormStateSwap } from "@/components/forms/FormStateSwap"
import { SubmitButton } from "@/components/forms/SubmitButton"
import { useFormState } from "@/components/forms/useFormState"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { demoFailure, demoFocus, demoFocusIcons, demoForm as f, demoRoles, demoSuccess, requestTypes, type RequestType } from "@/content/demo"
import { demoDefaults, demoErrorOrder, demoSchema, type DemoValues } from "@/lib/demo-schema"
import { cn } from "@/lib/utils"

const typeIcon = { demo: Play, trial: Sparkles } as const

const fid = (name: string) => `f-${name}`

/** "Tell us about you": the request-a-demo form with its errors, sending, success and failure states. */
export function DemoForm() {
  const form = useForm<DemoValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: demoDefaults,
    mode: "onTouched",
    shouldFocusError: false,
  })
  const { register, control, handleSubmit, setValue, getValues, formState } = form
  const { errors, submitCount } = formState

  const state = useFormState(requestDemo)
  const [summaryKey, setSummaryKey] = useState(0)
  const [draft, setDraft] = useState("")
  const [announce, setAnnounce] = useState("")

  const type = useWatch({ control, name: "type" })
  const competitors = useWatch({ control, name: "competitors" })
  const notes = useWatch({ control, name: "notes" })
  const active = requestTypes.find((t) => t.value === type) ?? requestTypes[0]
  const full = competitors.length >= f.competitors.max
  const sending = state.submitting

  const summary: SummaryError[] =
    submitCount > 0
      ? demoErrorOrder.flatMap((k) => (errors[k]?.message ? [{ id: fid(k), label: f.summaryLabels[k], message: errors[k].message }] : []))
      : []

  const onValid = async (values: DemoValues) => {
    if (values.website) {
      state.setStatus("success")
      return
    }
    setAnnounce(f.live.sending)
    await state.submit(values)
  }

  const onInvalid = (errs: FieldErrors<DemoValues>) => {
    const n = demoErrorOrder.filter((k) => errs[k]).length
    setAnnounce(`Please fix ${n} ${n === 1 ? "field" : "fields"}`)
    setSummaryKey((k) => k + 1)
  }

  const addCompetitor = () => {
    const name = draft.trim()
    const list = getValues("competitors")
    if (!name || full || list.some((c) => c.toLowerCase() === name.toLowerCase())) return
    setValue("competitors", [...list, name])
    setDraft("")
    setAnnounce(`${name} added. ${list.length + 1} of ${f.competitors.max}.`)
  }

  const removeCompetitor = (name: string) => {
    setValue(
      "competitors",
      getValues("competitors").filter((c) => c !== name),
    )
    setAnnounce(`${name} removed.`)
    document.getElementById(fid("comp"))?.focus()
  }

  const onCompetitorKey = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      ev.preventDefault()
      addCompetitor()
    }
  }

  const live =
    state.status === "submitting" ? f.live.sending : state.status === "success" ? f.live.sent : state.status === "error" ? f.live.failed : announce

  const view = state.status === "success" ? "success" : state.status === "error" ? "error" : "form"

  return (
    <div
      id="form"
      className={cn(
        "scroll-mt-24 rounded-lg bg-card px-4 pt-5 shadow-float transition-opacity md:p-7",
        view !== "form" && "pb-5",
        sending && "opacity-90",
      )}
    >
      <FormLive>{live}</FormLive>
      <FormStateSwap stateKey={view}>
        {view === "success" ? (
          <SuccessPanel values={getValues()} />
        ) : view === "error" ? (
          <FormStatus variant="error" title={demoFailure.title} onRetry={state.retry} retryLabel={demoFailure.retry}>
            <p className="text-[0.9375rem]">
              {demoFailure.before}
              <PlaceholderInline>{demoFailure.email}</PlaceholderInline>
              {demoFailure.after}
            </p>
            <p className="text-[0.78125rem] text-muted-foreground">{demoFailure.kept}</p>
          </FormStatus>
        ) : (
          <form noValidate onSubmit={handleSubmit(onValid, onInvalid)} aria-labelledby="form-h" aria-describedby="form-req" aria-busy={sending || undefined}>
            <h2 id="form-h" className="text-2xl font-extrabold">
              {f.title}
            </h2>
            <p id="form-req" className="mt-1 text-[0.78125rem] text-muted-foreground">
              {f.required}
            </p>

            <ErrorSummary errors={summary} focusKey={summaryKey} className="mt-4" />

            <fieldset disabled={sending} className="mt-5 flex min-w-0 flex-col gap-5">
              <legend className="sr-only">{f.legend}</legend>

              {/* Request type */}
              <div className="flex flex-col gap-2">
                <span id="rt-l" className="text-sm font-semibold">
                  {f.requestType}
                </span>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={(v) => field.onChange(v as RequestType)}
                      aria-labelledby="rt-l"
                      aria-describedby="rt-help"
                      className="grid-cols-2 gap-1 rounded-lg bg-muted p-1"
                    >
                      {requestTypes.map((t) => {
                        const Icon = typeIcon[t.value]
                        return (
                          <RadioGroupItem
                            key={t.value}
                            value={t.value}
                            className="relative flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent px-2.5 text-[0.90625rem] leading-tight font-semibold text-neutral-text hover:text-foreground data-[state=checked]:border-primary data-[state=checked]:bg-card data-[state=checked]:font-extrabold data-[state=checked]:text-foreground data-[state=checked]:shadow-card"
                          >
                            <Icon aria-hidden="true" strokeWidth={2} className="size-4.5" />
                            {t.label}
                            <RadioGroupIndicator className="grid size-4.5 place-items-center rounded-full bg-primary text-primary-foreground">
                              <Check aria-hidden="true" strokeWidth={3.5} className="size-2.75" />
                            </RadioGroupIndicator>
                          </RadioGroupItem>
                        )
                      })}
                    </RadioGroup>
                  )}
                />
                <p id="rt-help" className="text-[0.78125rem] text-muted-foreground">
                  {active.help}
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 md:gap-3.5">
                <FormField id={fid("first")} label={f.fields.first} required error={errors.first?.message}>
                  <Input type="text" autoComplete="given-name" {...register("first")} />
                </FormField>
                <FormField id={fid("last")} label={f.fields.last} required error={errors.last?.message}>
                  <Input type="text" autoComplete="family-name" {...register("last")} />
                </FormField>
              </div>

              <FormField id={fid("email")} label={f.fields.email} required error={errors.email?.message}>
                <Input type="email" inputMode="email" autoComplete="email" {...register("email")} />
              </FormField>

              <FormField id={fid("company")} label={f.fields.company} required error={errors.company?.message}>
                <Input type="text" autoComplete="organization" {...register("company")} />
              </FormField>

              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <RoleSelect value={field.value} onChange={field.onChange}>
                    <FormField id={fid("role")} label={f.fields.role} optional>
                      <SelectTrigger className="w-full" onBlur={field.onBlur} ref={field.ref}>
                        <SelectValue placeholder={f.rolePlaceholder} />
                      </SelectTrigger>
                    </FormField>
                  </RoleSelect>
                )}
              />

              <FormField id={fid("brand")} label={f.fields.brand} required error={errors.brand?.message}>
                <Input type="text" autoComplete="off" {...register("brand")} />
              </FormField>

              {/* Competitors: chip input */}
              <FormField
                id={fid("comp")}
                label={f.fields.competitors}
                optional
                help={full ? f.competitors.helpFull : f.competitors.help}
                describedBy="f-comp-cnt"
                aside={
                  <span id="f-comp-cnt" className="text-[0.78125rem] text-neutral-text tabular">
                    {competitors.length} of {f.competitors.max}
                  </span>
                }
                before={
                  competitors.length > 0 && (
                    <ul aria-label={f.competitors.listLabel} className="flex flex-wrap gap-2">
                      {competitors.map((c) => (
                        <li key={c} className="inline-flex items-center gap-0.5 rounded-full bg-primary-tint pl-3.5 text-sm leading-none font-semibold">
                          {c}
                          <button
                            type="button"
                            aria-label={`Remove ${c}`}
                            onClick={() => removeCompetitor(c)}
                            className="grid size-10 cursor-pointer place-items-center rounded-full text-primary-700 outline-none focus-visible:outline-2 focus-visible:outline-ring"
                          >
                            <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-card">
                              <X strokeWidth={2.6} className="size-3" />
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )
                }
              >
                <CompetitorInput
                  value={draft}
                  disabled={full}
                  placeholder={full ? f.competitors.placeholderFull : f.competitors.placeholder}
                  onChange={setDraft}
                  onKeyDown={onCompetitorKey}
                  onAdd={addCompetitor}
                />
              </FormField>

              <FormField id={fid("kw")} label={f.fields.keyword} optional>
                <Input type="text" autoComplete="off" {...register("keyword")} />
              </FormField>

              {/* Focus areas */}
              <fieldset aria-describedby="f-net-help" className="flex min-w-0 flex-col gap-2">
                <legend className="mb-2 flex items-baseline gap-1.5 text-sm font-semibold">
                  {f.fields.focus} <FieldMark optional />
                </legend>
                <Controller
                  control={control}
                  name="focus"
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2">
                      {demoFocus.map((n) => {
                        const Icon = demoFocusIcons[n]
                        const checked = field.value.includes(n)
                        return (
                          <label
                            key={n}
                            className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-sm border border-neutral-text/60 bg-card px-3 text-[0.90625rem] font-medium has-[[data-state=checked]]:border-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-tint has-[[data-state=checked]]:font-bold"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(on) => field.onChange(on ? [...field.value, n] : field.value.filter((v) => v !== n))}
                              className="size-5"
                            />
                            <Icon aria-hidden="true" strokeWidth={1.8} className="size-4.5 flex-none" />
                            {n}
                          </label>
                        )
                      })}
                    </div>
                  )}
                />
                <p id="f-net-help" className="text-[0.78125rem] text-muted-foreground">
                  {f.focusHelp}
                </p>
              </fieldset>

              <FormField
                id={fid("notes")}
                label={f.fields.notes}
                optional
                describedBy="f-notes-cnt"
                aside={
                  <span id="f-notes-cnt" aria-live="polite" className="text-[0.78125rem] text-neutral-text tabular">
                    {notes.length} / {f.notesMax}
                  </span>
                }
              >
                <Textarea rows={4} maxLength={f.notesMax} className="min-h-24" {...register("notes")} />
              </FormField>

              {/* Consent */}
              <Controller
                control={control}
                name="consent"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex min-h-11 items-start gap-3 py-2 text-sm">
                      <Checkbox
                        id={fid("consent")}
                        ref={field.ref}
                        checked={field.value}
                        onCheckedChange={(on) => field.onChange(on === true)}
                        onBlur={field.onBlur}
                        aria-required
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? errorId(fid("consent")) : undefined}
                        className="mt-px size-5.5"
                      />
                      <label htmlFor={fid("consent")} className="cursor-pointer">
                        {f.consent.before}
                        <Link href={f.consent.href} className="text-primary-700 underline">
                          {f.consent.link}
                        </Link>
                        {f.consent.after} <FieldMark required />
                      </label>
                    </div>
                    <FieldError id={errorId(fid("consent"))}>{errors.consent?.message}</FieldError>
                  </div>
                )}
              />
            </fieldset>

            {/* Honeypot: hidden from people and assistive tech */}
            <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor="f-hp">{f.honeypot}</label>
              <input id="f-hp" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <div className="sticky bottom-0 z-5 -mx-4 mt-5 rounded-b-lg border-t border-border bg-card px-4 pt-3 pb-4 shadow-card md:static md:mx-0 md:mt-6 md:border-0 md:p-0 md:shadow-none">
              <SubmitButton submitting={sending} sendingLabel={f.sending} className="min-h-13.5 text-[1.03rem] font-extrabold">
                {active.button}
              </SubmitButton>
              <p className="mt-2 text-center text-[0.78125rem] text-muted-foreground">{f.privacy}</p>
            </div>
          </form>
        )}
      </FormStateSwap>
    </div>
  )
}

/** Role select kept in sync with the form ("" = no role chosen). */
function RoleSelect({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: ReactNode }) {
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      {children}
      <SelectContent position="popper">
        {demoRoles.map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type CompetitorInputProps = {
  value: string
  disabled: boolean
  placeholder: string
  onChange: (v: string) => void
  onKeyDown: (ev: KeyboardEvent<HTMLInputElement>) => void
  onAdd: () => void
  id?: string
  "aria-describedby"?: string
}

/** Text field + "Add" button; FormField's id and aria props land on the input. */
function CompetitorInput({ value, disabled, placeholder, onChange, onKeyDown, onAdd, ...aria }: CompetitorInputProps) {
  return (
    <div className="flex gap-2">
      <Input
        {...aria}
        type="text"
        autoComplete="off"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(ev) => onChange(ev.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button type="button" variant="outline" onClick={onAdd} disabled={disabled} className="flex-none">
        <Plus aria-hidden="true" strokeWidth={2.4} className="size-4" />
        {f.competitors.add}
      </Button>
    </div>
  )
}

function SuccessPanel({ values }: { values: DemoValues }) {
  const t = requestTypes.find((r) => r.value === values.type) ?? requestTypes[0]
  const s = demoSuccess
  const rows = [
    [s.labels.type, t.summary],
    [s.labels.brand, values.brand.trim() || "—"],
    [s.labels.competitors, values.competitors.length ? values.competitors.join(", ") : s.noCompetitors],
    [s.labels.focus, values.focus.length ? values.focus.join(", ") : s.allFocus],
  ] as const

  return (
    <FormStatus variant="success" title={s.title(values.first.trim() || "there")}>
      <p className="text-sm text-muted-foreground">{s.lead}</p>
      <dl className="grid gap-2.5 rounded-lg bg-background p-3.5 md:grid-cols-2">
        {rows.map(([dt, dd]) => (
          <div key={dt}>
            <dt className="text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">{dt}</dt>
            <dd className="mt-0.5 text-[0.90625rem] font-semibold">{dd}</dd>
          </div>
        ))}
      </dl>
      <h3 className="text-[1.0625rem] font-extrabold">{s.nextTitle}</h3>
      <ol className="flex flex-col gap-2 text-[0.90625rem]">
        {s.next.map((step, i) => (
          <li key={step} className="flex items-center gap-2.5">
            <span aria-hidden="true" className="grid size-6.5 flex-none place-items-center rounded-full bg-primary-tint font-heading text-xs font-extrabold text-primary-700">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <PlaceholderInline className="self-start">{s.responseTime}</PlaceholderInline>
      <div className="mt-1.5 flex flex-wrap gap-2.5">
        <Button asChild>
          <Link href={s.tour.href}>
            <Play aria-hidden="true" strokeWidth={1.8} />
            {s.tour.label}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={s.home.href}>{s.home.label}</Link>
        </Button>
      </div>
    </FormStatus>
  )
}
