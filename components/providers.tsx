"use client"

import type { ReactNode } from "react"
import { domAnimation, LazyMotion, MotionConfig } from "motion/react"

import { TooltipProvider } from "@/components/ui/tooltip"

/** Client providers: lazy-loaded Motion features, reduced-motion respect, shared tooltip delay. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
