"use client"

import type { ReactNode } from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const msrcosmosUrl = "https://www.msrcosmos.com/"
const hint = "Opens msrcosmos.com in a new tab"

/** "MSRcosmos" external link: opens msrcosmos.com in a new tab, with a tooltip saying so. `className` replaces the inline style (e.g. button classes on About). */
export function MsrcosmosLink({ children = "MSRcosmos", className }: { children?: ReactNode; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={msrcosmosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={className ?? "rounded-xs font-bold text-foreground underline decoration-dotted underline-offset-3 hover:decoration-solid"}
        >
          {children}
          <span className="sr-only"> ({hint})</span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        {hint}
      </TooltipContent>
    </Tooltip>
  )
}
