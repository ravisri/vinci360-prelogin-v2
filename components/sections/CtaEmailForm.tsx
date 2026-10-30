"use client"

import { useActionState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { CircleCheck } from "lucide-react"

import { requestWalkthrough, type WalkthroughState } from "@/app/(marketing)/walkthrough/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ctaBandForm as copy } from "@/content/navigation"

type CtaEmailFormProps = { id: string; label: string; placeholder: string; buttonLabel: string }

const initial: WalkthroughState = { status: "idle", email: "" }

/** CTA band email field: sends a walkthrough request (server action, works without JS) and swaps to a success row in place. */
export function CtaEmailForm({ id, label, placeholder, buttonLabel }: CtaEmailFormProps) {
  const [state, formAction, pending] = useActionState(requestWalkthrough, initial)
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const errId = `${id}-err`
  const message = state.status === "invalid" ? copy.invalid : state.status === "error" ? copy.error : ""

  useEffect(() => {
    if (state.status === "invalid" || state.status === "error") inputRef.current?.focus()
  }, [state])

  return (
    <div aria-live="polite" className="mt-2 w-full max-w-140">
      {state.status === "success" ? (
        <p className="flex min-h-13 items-center justify-center gap-2.5 rounded-sm border border-dark-border px-4 py-3 text-base font-semibold">
          <CircleCheck aria-hidden="true" strokeWidth={2} className="size-5.5 flex-none text-pos" />
          {copy.success(state.email)}
        </p>
      ) : (
        <form action={formAction} className="flex flex-col gap-3 text-left sm:flex-row sm:items-end">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Label htmlFor={id} className="text-sm font-medium text-on-dark-strong">
              {label}
            </Label>
            <Input
              ref={inputRef}
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={state.email}
              placeholder={placeholder}
              aria-invalid={message ? true : undefined}
              aria-describedby={message ? errId : undefined}
              className="h-13 rounded-sm border-dark-border bg-secondary px-4 text-base text-secondary-foreground placeholder:text-neutral-text md:text-base"
            />
          </div>
          <input type="hidden" name="source" value={pathname} />
          {/* Honeypot: hidden from people and assistive tech */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <Button type="submit" variant="cta" size="lg" loading={pending}>
            {buttonLabel}
          </Button>
        </form>
      )}
      {message && (
        <p id={errId} className="mt-2 text-left text-sm font-medium text-neg">
          {message}
        </p>
      )}
    </div>
  )
}
