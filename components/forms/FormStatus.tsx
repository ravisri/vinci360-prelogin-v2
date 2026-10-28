"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { Check, CircleAlert, RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FormStatusProps = {
  variant: "success" | "error"
  title: ReactNode
  children?: ReactNode
  /** Error panel: shows a Retry button. */
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

/**
 * Success and failure panels. The heading takes focus when the panel appears; announcements go
 * through the form's own `aria-live` status region (see FormLive).
 */
export function FormStatus({ variant, title, children, onRetry, retryLabel = "Retry", className }: FormStatusProps) {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    heading.current?.focus()
  }, [])

  if (variant === "success")
    return (
      <div className={cn("flex flex-col gap-3.5", className)}>
        <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check strokeWidth={3} className="size-7.5" />
        </span>
        <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 text-[1.625rem] leading-[1.2] font-extrabold outline-none">
          {title}
        </h2>
        {children}
      </div>
    )

  return (
    <div className={cn("flex items-start gap-3.5 rounded-lg border border-neg-tint-border bg-neg-tint p-4.5", className)}>
      <span aria-hidden="true" className="grid size-10 flex-none place-items-center rounded-lg bg-card text-destructive">
        <CircleAlert strokeWidth={2.2} className="size-5.5" />
      </span>
      <div className="flex flex-col gap-2">
        <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 text-h4 font-extrabold outline-none">
          {title}
        </h2>
        {children}
        {onRetry && (
          <Button type="button" variant="outline" onClick={onRetry} className="self-start">
            <RotateCw aria-hidden="true" />
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

/** Polite live region for a form's status messages ("Sending…", "Request sent", "Please fix 3 fields"). */
export function FormLive({ children }: { children?: ReactNode }) {
  return (
    <div className="sr-only" role="status" aria-live="polite">
      {children}
    </div>
  )
}
