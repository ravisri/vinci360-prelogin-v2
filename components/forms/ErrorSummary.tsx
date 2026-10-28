"use client"

import { useEffect, useRef } from "react"
import { CircleAlert } from "lucide-react"

import { cn } from "@/lib/utils"

export type SummaryError = { id: string; label: string; message: string }

type ErrorSummaryProps = {
  errors: readonly SummaryError[]
  /** Changes on every failed submit, so focus moves back to the summary each time. */
  focusKey: number
  className?: string
}

/** Error summary at the top of a form: takes focus, and each link moves focus to its field. */
export function ErrorSummary({ errors, focusKey, className }: ErrorSummaryProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (focusKey > 0) ref.current?.focus()
  }, [focusKey])

  if (!errors.length) return null
  const n = errors.length

  return (
    <div
      ref={ref}
      tabIndex={-1}
      aria-labelledby="err-sum-h"
      className={cn("scroll-mt-28 rounded-lg border-2 border-destructive bg-neg-tint px-4 py-3.5 text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", className)}
    >
      <p id="err-sum-h" className="flex items-center gap-2 text-[0.9375rem] font-extrabold text-destructive">
        <CircleAlert aria-hidden="true" strokeWidth={2.2} className="size-5 flex-none" />
        Please fix {n} {n === 1 ? "field" : "fields"}
      </p>
      <ul className="mt-2 flex flex-col gap-0.5 pl-7 text-sm">
        {errors.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className="inline-block py-1 text-foreground underline"
              onClick={(ev) => {
                ev.preventDefault()
                const el = document.getElementById(e.id)
                el?.focus()
                el?.scrollIntoView({ block: "center" })
              }}
            >
              {e.label}: {e.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
