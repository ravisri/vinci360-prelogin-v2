"use client"

import { useCallback, useRef, useState } from "react"

export type FormStatus = "idle" | "submitting" | "success" | "error"

export type SubmitResult = { ok: boolean }

/**
 * Submission state for every form: idle → submitting → success | error.
 * `retry` resends the last values, so a failure never loses what was typed.
 */
export function useFormState<T>(action: (values: T) => Promise<SubmitResult>) {
  const [status, setStatus] = useState<FormStatus>("idle")
  const last = useRef<T | null>(null)

  const submit = useCallback(
    async (values: T) => {
      last.current = values
      setStatus("submitting")
      try {
        const result = await action(values)
        setStatus(result.ok ? "success" : "error")
      } catch {
        setStatus("error")
      }
    },
    [action],
  )

  const retry = useCallback(() => {
    if (last.current) void submit(last.current)
  }, [submit])

  const reset = useCallback(() => setStatus("idle"), [])

  return { status, submitting: status === "submitting", submit, retry, reset, setStatus }
}
