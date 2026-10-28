import type { ComponentProps, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type" | "loading"> & {
  /** Spinner + aria-busy + disabled; the label stays (or swaps to `sendingLabel`). */
  submitting?: boolean
  sendingLabel?: ReactNode
}

/** Form submit: cta by default (demo forms), `default` for other submits. */
export function SubmitButton({ variant = "cta", submitting, sendingLabel, children, className, ...props }: SubmitButtonProps) {
  return (
    <Button type="submit" variant={variant} loading={submitting} className={cn("w-full", className)} {...props}>
      {submitting && sendingLabel ? sendingLabel : children}
    </Button>
  )
}
