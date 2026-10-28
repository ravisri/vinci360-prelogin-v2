"use client"

import type { ReactNode } from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/** "MSRcosmos" placeholder link: focusable with a tooltip, no navigation until the URL is confirmed. `className` replaces the inline style (e.g. button classes on About). */
export function MsrcosmosLink({ children = "MSRcosmos", className }: { children?: ReactNode; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          role="link"
          tabIndex={0}
          aria-disabled="true"
          className={className ?? "cursor-help rounded-xs font-bold text-foreground underline decoration-dotted underline-offset-3"}
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        Opens msrcosmos.com in a new tab
      </TooltipContent>
    </Tooltip>
  )
}
