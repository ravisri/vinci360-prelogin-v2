"use client"

import type { ReactNode } from "react"
import { CircleAlert } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

type FormFieldProps = {
  /** Control id; help and error ids derive from it (`{id}-help`, `{id}-err`). */
  id: string
  label: ReactNode
  required?: boolean
  /** Show "Optional" after the label (fields that are not required). */
  optional?: boolean
  help?: ReactNode
  error?: string
  /** Right side of the label row, e.g. a "0 / 500" counter. */
  aside?: ReactNode
  /** Extra ids for aria-describedby (e.g. the counter). */
  describedBy?: string
  /** Rendered between the label and the control (e.g. competitor chips). */
  before?: ReactNode
  /** The control; receives id, aria-invalid, aria-required and aria-describedby. */
  children: ReactNode
  className?: string
}

export const errorId = (id: string) => `${id}-err`

/** Required / optional marks after a label: "*" is visual only, the word is read out. */
export function FieldMark({ required, optional }: { required?: boolean; optional?: boolean }) {
  if (required)
    return (
      <>
        <span aria-hidden="true" className="font-extrabold">
          *
        </span>
        <span className="sr-only">Required</span>
      </>
    )
  if (optional) return <span className="text-xs font-medium text-muted-foreground">Optional</span>
  return null
}

/** Inline error under a field: alert icon + text in `text-destructive`. */
export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null
  return (
    <p id={id} className="flex items-center gap-1.5 text-[0.84375rem] font-semibold text-destructive">
      <CircleAlert aria-hidden="true" strokeWidth={2.2} className="size-4 flex-none" />
      {children}
    </p>
  )
}

/** Label above, `*` for required, help text, inline error wired with aria-describedby + aria-invalid. */
export function FormField({ id, label, required, optional, help, error, aside, describedBy, before, children, className }: FormFieldProps) {
  const helpId = help ? `${id}-help` : undefined
  const errId = error ? errorId(id) : undefined
  const ids = [errId, helpId, describedBy].filter(Boolean).join(" ") || undefined

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="flex flex-wrap items-baseline gap-1.5 text-sm font-semibold text-foreground">
          {label} <FieldMark required={required} optional={optional} />
        </label>
        {aside}
      </div>
      {before}
      <Slot.Root id={id} aria-invalid={error ? true : undefined} aria-required={required || undefined} aria-describedby={ids}>
        {children}
      </Slot.Root>
      <FieldError id={errorId(id)}>{error}</FieldError>
      {help && (
        <p id={helpId} className="text-[0.78125rem] text-muted-foreground">
          {help}
        </p>
      )}
    </div>
  )
}
