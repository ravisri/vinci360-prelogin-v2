"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Play } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { demoFailure, demoForm as f, demoSuccess, requestTypes } from "@/content/demo"
import { demoDefaults, demoErrorOrder, demoSchema, type DemoValues } from "@/lib/demo-schema"
import { cn } from "@/lib/utils"

const fid = (name: string) => `f-${name}`

/** The form only requests a demo (the free-trial option is hidden). */
const demo = requestTypes[0]

/** "Tell us about you": the request-a-demo form with its errors, sending, success and failure states. */
export function DemoForm() {
  const form = useForm<DemoValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: demoDefaults,
    mode: "onTouched",
    shouldFocusError: false,
  })
  const { register, control, handleSubmit, getValues, formState } = form
  const { errors, submitCount } = formState

  const state = useFormState(requestDemo)
  const [summaryKey, setSummaryKey] = useState(0)
  const [announce, setAnnounce] = useState("")

  const notes = useWatch({ control, name: "notes" })
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

              <FormField id={fid("kw")} label={f.fields.keyword} optional>
                <Input type="text" autoComplete="off" {...register("keyword")} />
              </FormField>

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
                {demo.button}
              </SubmitButton>
              <p className="mt-2 text-center text-[0.78125rem] text-muted-foreground">{f.privacy}</p>
            </div>
          </form>
        )}
      </FormStateSwap>
    </div>
  )
}

function SuccessPanel({ values }: { values: DemoValues }) {
  const s = demoSuccess
  const rows = [
    [s.labels.type, demo.summary],
    [s.labels.company, values.company.trim()],
    [s.labels.email, values.email.trim()],
  ] as const

  return (
    <FormStatus variant="success" title={s.title(values.first.trim() || "there")}>
      <p className="text-sm text-muted-foreground">{s.lead}</p>
      <dl className="grid gap-2.5 rounded-lg bg-background p-3.5 md:grid-cols-2">
        {rows.map(([dt, dd]) => (
          <div key={dt}>
            <dt className="text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">{dt}</dt>
            <dd className="mt-0.5 text-[0.90625rem] font-semibold break-all">{dd}</dd>
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
