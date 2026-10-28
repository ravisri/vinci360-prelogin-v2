import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PlaceholderBlockProps = {
  title?: string
  /** Warning chip, e.g. "PLACEHOLDER — add real client logos and testimonial". */
  badge?: string
  headingAs?: "h2" | "h3"
  children: ReactNode
  className?: string
}

/** Dashed block for content still to be supplied. Bracketed copy from the reference is kept verbatim. */
export function PlaceholderBlock({ title, badge, headingAs: Heading = "h2", children, className }: PlaceholderBlockProps) {
  return (
    <div className={cn("placeholder-block flex flex-col gap-5 md:p-10", className)}>
      {(title || badge) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {title && <Heading className="text-2xl">{title}</Heading>}
          {badge && (
            <span className="rounded-full border border-stories-200 bg-stories-tint px-2.5 py-1 text-xs font-semibold text-stories-text">
              {badge}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

/** Inline "[… to be supplied]" text. */
export function PlaceholderInline({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("placeholder-inline text-[0.9em]", className)}>{children}</span>
}
