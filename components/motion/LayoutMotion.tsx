"use client"

import type { ReactNode } from "react"
import { domMax, LazyMotion } from "motion/react"

/**
 * Wrap widgets whose rows re-order with `layout`. The root provider ships only domAnimation; the
 * layout features are bundled with the (few) client islands that import this wrapper, so pages
 * without re-ordering lists never load them.
 */
export function LayoutMotion({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  )
}
