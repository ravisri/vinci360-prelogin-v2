"use client"

import { useEffect, useRef, useState, type ComponentProps, type FormEvent, type KeyboardEvent } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, CircleAlert, Eye, EyeOff, Info, Mail } from "lucide-react"

import { ErrorSummary, type SummaryError } from "@/components/forms/ErrorSummary"
import { FormField } from "@/components/forms/FormField"
import { FormLive } from "@/components/forms/FormStatus"
import { FormStateSwap } from "@/components/forms/FormStateSwap"
import { SubmitButton } from "@/components/forms/SubmitButton"
import { Input } from "@/components/ui/input"
import { login } from "@/content/login"
import { emailError, mockLogin, mockReset, passwordError, validateLogin, type LoginErrors } from "@/lib/login-schema"
import { cn } from "@/lib/utils"

type View = "login" | "forgot" | "sent"
type Status = "idle" | "submitting" | "invalid" | "redirecting"

const textLink = "inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary-700 no-underline hover:underline"
const alertBox = "flex items-start gap-3 rounded-lg px-4 py-3.5 text-sm text-foreground outline-none"
const infoBox = cn(alertBox, "border border-primary-200 bg-primary-tint")
const labels = login.fields

/**
 * Log in card: one state machine for log in → invalid credentials → forgot password → sent.
 * Views cross-fade while the card eases to the new height (FormStateSwap); focus moves to each
 * view's heading. Actions are mocked with a 1s delay (password "wrong" fails); no real auth.
 */
export function LoginCard() {
  const signedOut = useSearchParams().get("signed-out") === "1"
  const [view, setView] = useState<View>("login")
  const [status, setStatus] = useState<Status>("idle")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [caps, setCaps] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [focusKey, setFocusKey] = useState(0)
  const [resetEmail, setResetEmail] = useState("")
  const [resetError, setResetError] = useState<string>()
  const [sending, setSending] = useState(false)
  const [live, setLive] = useState("")

  const alertRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)

  const loggingIn = status === "submitting" || status === "redirecting"

  // Focus each new view's heading (not on first load, where the email field has autofocus).
  useEffect(() => {
    if (!moved.current) return
    if (view === "login") document.getElementById("lh")?.focus()
    else headingRef.current?.focus()
  }, [view])

  useEffect(() => {
    if (status === "invalid") alertRef.current?.focus()
  }, [status])

  const go = (next: View) => {
    moved.current = true
    setLive("")
    setResetError(undefined)
    if (next === "forgot") setResetEmail((v) => v || email)
    if (next === "login") setStatus("idle")
    setView(next)
  }

  const summary: SummaryError[] = (["email", "password"] as const).flatMap((k) =>
    errors[k] ? [{ id: k === "email" ? "l-email" : "l-pw", label: labels[k], message: errors[k] }] : [],
  )

  async function onLogin(ev: FormEvent) {
    ev.preventDefault()
    const found = validateLogin({ email, password })
    const n = Object.keys(found).length
    setAttempted(true)
    setErrors(found)
    if (n) {
      setStatus("idle")
      setFocusKey((k) => k + 1)
      setLive(`Please fix ${n} ${n === 1 ? "field" : "fields"}`)
      return
    }
    setStatus("submitting")
    setLive("Logging in")
    const { ok } = await mockLogin(password)
    if (ok) {
      setStatus("redirecting")
      setLive(login.redirecting)
    } else {
      setPassword("")
      setStatus("invalid")
      setLive("")
    }
  }

  async function onForgot(ev: FormEvent) {
    ev.preventDefault()
    const er = emailError(resetEmail)
    setResetError(er)
    if (er) {
      document.getElementById("f-email")?.focus()
      setLive(`${labels.email}: ${er}`)
      return
    }
    setSending(true)
    setLive(login.forgot.live)
    await mockReset()
    setSending(false)
    go("sent")
  }

  async function onResend() {
    setSending(true)
    setLive(login.forgot.live)
    await mockReset()
    setSending(false)
    setLive(login.sent.resent)
  }

  const onCaps = (ev: KeyboardEvent<HTMLInputElement>) => setCaps(ev.getModifierState("CapsLock"))

  const viewLink = (to: View, label: string, className: string) => (
    <a
      href={`#${to}`}
      className={className}
      onClick={(ev) => {
        ev.preventDefault()
        go(to)
      }}
    >
      {to === "login" && <ArrowLeft aria-hidden="true" strokeWidth={2} className="size-4" />}
      {label}
    </a>
  )
  const backToLogin = viewLink("login", login.backToLogin, cn(textLink, "self-start"))

  return (
    <div className="mt-2 rounded-lg bg-card px-4.5 py-5.5 text-card-foreground shadow-float md:p-8">
      <FormLive>{live}</FormLive>
      <FormStateSwap stateKey={view}>
        {view === "login" && (
          <form noValidate onSubmit={onLogin} aria-label="Log in" aria-busy={loggingIn} className="flex flex-col gap-4">
            {signedOut && status === "idle" && (
              <div role="status" className={infoBox}>
                <Info aria-hidden="true" strokeWidth={2} className="size-5 flex-none text-primary-700" />
                <p>{login.signedOut}</p>
              </div>
            )}
            {status === "invalid" && (
              <div
                ref={alertRef}
                tabIndex={-1}
                role="alert"
                className={cn(alertBox, "border-2 border-destructive bg-neg-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring")}
              >
                <CircleAlert aria-hidden="true" strokeWidth={2.2} className="size-5 flex-none text-destructive" />
                <p>
                  {login.invalid} {viewLink("forgot", login.forgotLink, "font-bold text-foreground underline")}
                </p>
              </div>
            )}
            {status === "redirecting" && (
              <div className={infoBox}>
                <Info aria-hidden="true" strokeWidth={2} className="size-5 flex-none text-primary-700" />
                <p className="placeholder-inline">{login.redirecting}</p>
              </div>
            )}
            <ErrorSummary errors={summary} focusKey={focusKey} />

            <fieldset disabled={loggingIn} className="flex min-w-0 flex-col gap-4">
              <legend className="sr-only">Your details</legend>
              <FormField id="l-email" label={labels.email} error={errors.email}>
                <Input
                  type="email"
                  inputMode="email"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value)
                    if (attempted) setErrors((er) => ({ ...er, email: emailError(ev.target.value) }))
                  }}
                />
              </FormField>
              <div className="flex flex-col gap-1">
                <FormField id="l-pw" label={labels.password} error={errors.password} describedBy={caps ? "l-caps" : undefined}>
                  <PasswordInput
                    show={showPw}
                    onToggle={() => setShowPw((s) => !s)}
                    value={password}
                    onKeyDown={onCaps}
                    onKeyUp={onCaps}
                    onValue={(v) => {
                      setPassword(v)
                      if (attempted) setErrors((er) => ({ ...er, password: passwordError(v) }))
                    }}
                  />
                </FormField>
                {caps && (
                  <p id="l-caps" className="mt-1 flex items-center gap-1.5 self-start rounded-[6px] bg-muted px-2 py-1 text-[0.8125rem] font-semibold">
                    <Info aria-hidden="true" strokeWidth={2} className="size-4" />
                    {login.caps}
                  </p>
                )}
                <div className="flex justify-end">{viewLink("forgot", login.forgotLink, textLink)}</div>
              </div>
            </fieldset>

            <SubmitButton variant="default" submitting={loggingIn} sendingLabel={status === "redirecting" ? login.redirecting : login.submitting}>
              {login.submit}
            </SubmitButton>
            <p className="placeholder-inline self-center text-[0.71875rem]">{login.sso}</p>
          </form>
        )}

        {view === "forgot" && (
          <form noValidate onSubmit={onForgot} aria-labelledby="f-h" aria-busy={sending} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <h2 id="f-h" ref={headingRef} tabIndex={-1} className="text-[1.375rem] font-extrabold outline-none">
                {login.forgot.title}
              </h2>
              <p id="f-help" className="text-[0.90625rem] text-muted-foreground">
                {login.forgot.help}
              </p>
            </div>
            <fieldset disabled={sending} className="flex min-w-0 flex-col gap-4">
              <legend className="sr-only">Reset password</legend>
              <FormField id="f-email" label={labels.email} error={resetError} describedBy="f-help">
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="username"
                  value={resetEmail}
                  onChange={(ev) => {
                    setResetEmail(ev.target.value)
                    if (resetError) setResetError(emailError(ev.target.value))
                  }}
                />
              </FormField>
            </fieldset>
            <SubmitButton variant="default" submitting={sending} sendingLabel={login.forgot.submitting}>
              {login.forgot.submit}
            </SubmitButton>
            {backToLogin}
          </form>
        )}

        {view === "sent" && (
          <div className="flex flex-col items-start gap-4">
            <span aria-hidden="true" className="grid size-13 place-items-center rounded-lg bg-primary-tint text-primary-700">
              <Mail strokeWidth={2} className="size-6.5" />
            </span>
            <h2 id="sent-h" ref={headingRef} tabIndex={-1} className="text-[1.375rem] font-extrabold outline-none">
              {login.sent.title}
            </h2>
            <p className="text-[0.9375rem]">{login.sent.body}</p>
            <span className="placeholder-inline text-[0.71875rem]">{login.sent.delivery}</span>
            <button type="button" disabled={sending} aria-busy={sending || undefined} onClick={onResend} className={cn(textLink, "disabled:opacity-60")}>
              {login.sent.resend}
            </button>
            {backToLogin}
          </div>
        )}
      </FormStateSwap>
    </div>
  )
}

type PasswordInputProps = Omit<ComponentProps<"input">, "onChange" | "type"> & {
  show: boolean
  onToggle: () => void
  onValue: (value: string) => void
}

/** Password field with a Show / Hide toggle; FormField's Slot passes id + aria props through. */
function PasswordInput({ show, onToggle, onValue, id, ...props }: PasswordInputProps) {
  const Icon = show ? EyeOff : Eye
  return (
    <div className="relative">
      <Input
        {...props}
        id={id}
        type={show ? "text" : "password"}
        name="password"
        autoComplete="current-password"
        onChange={(ev) => onValue(ev.target.value)}
        className="pr-22"
      />
      <button
        type="button"
        aria-pressed={show}
        aria-controls={id}
        onClick={onToggle}
        className="absolute top-1/2 right-1 inline-flex min-h-10 min-w-11 -translate-y-1/2 items-center gap-1.5 rounded-[6px] px-2.5 text-sm font-semibold text-primary-700 outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Icon aria-hidden="true" strokeWidth={2} className="size-4.5" />
        {show ? login.hide : login.show}
        <span className="sr-only"> password</span>
      </button>
    </div>
  )
}
