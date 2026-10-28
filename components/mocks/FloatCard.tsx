import type { ReactNode } from "react"

import { Float } from "@/components/motion/Float"
import { Reveal } from "@/components/motion/Reveal"
import { cn } from "@/lib/utils"

type FloatCardProps = {
  children: ReactNode
  /** Desktop position, md+ only, e.g. "md:-right-4 md:-bottom-6 md:w-80". */
  className?: string
  /** Gentle bob (static with reduced motion). */
  float?: boolean
  delay?: number
  /** Drift in 0.4s after the visual enters (hero float cards). */
  enter?: boolean
}

/**
 * White card that overhangs a visual. From md it is absolutely positioned by the caller; below md it
 * sits in the normal flow under the visual, so it can never cover text or numbers on mobile.
 */
export function FloatCard({ children, className, float, delay, enter }: FloatCardProps) {
  const classes = cn(
    "relative mt-3 rounded-lg bg-card p-3.5 text-card-foreground shadow-float md:absolute md:z-10 md:mt-0",
    className,
  )
  if (enter) {
    return (
      <Reveal preset="floatIn" className={classes}>
        {float ? <Float delay={delay}>{children}</Float> : children}
      </Reveal>
    )
  }
  if (float) {
    return (
      <Float delay={delay} className={classes}>
        {children}
      </Float>
    )
  }
  return <div className={classes}>{children}</div>
}
