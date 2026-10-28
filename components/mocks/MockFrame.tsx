import type { ReactNode } from "react"

import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { cn } from "@/lib/utils"

type MockFrameProps = {
  /** Screen-reader description of every number the mock shows. */
  caption: string
  /** Window chrome with this text in the address pill, e.g. "vinci360 · Social Media Intelligence". */
  chrome?: ReactNode
  /** Header row title for frames without chrome, e.g. "Mentions this week". */
  title?: ReactNode
  /** Extra chips in the header row, before "Sample data" (e.g. an Export chip). */
  actions?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

/**
 * Dark dashboard window. `on-dark` re-skins every shadcn token inside, so children use the normal
 * `bg-card`, `border-border`, `text-muted-foreground` and `text-pos/neg` utilities.
 */
export function MockFrame({ caption, chrome, title, actions, children, className, bodyClassName }: MockFrameProps) {
  return (
    <figure className={cn("on-dark overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-float", className)}>
      {chrome ? (
        <div className="flex h-9 items-center gap-3 border-b border-border px-3.5 md:h-10">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-border md:size-2.5" />
            <span className="size-2 rounded-full bg-border md:size-2.5" />
            <span className="size-2 rounded-full bg-border md:size-2.5" />
          </span>
          <span aria-hidden="true" className="mx-auto block h-6 max-w-85 min-w-0 flex-1 truncate rounded-[6px] bg-card px-3 text-center text-[0.6875rem] leading-6 text-muted-foreground md:text-xs">
            {chrome}
          </span>
          <SampleDataChip />
        </div>
      ) : null}
      <div className={cn("flex flex-col gap-3 p-4", bodyClassName)}>
        {!chrome && (
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            {title && <div className="min-w-0 text-[0.8125rem] font-semibold">{title}</div>}
            <span className="ml-auto flex items-center gap-2">
              {actions}
              <SampleDataChip />
            </span>
          </div>
        )}
        {children}
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  )
}
