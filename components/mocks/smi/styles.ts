/** Class strings shared by the SMI mocks (plain module, so server and client components can both import it). */

/** Dark filter chip inside a mock frame ("fch" in the reference). */
export const frameChip =
  "inline-flex min-h-7.5 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-[0.71875rem] leading-none font-medium whitespace-nowrap text-on-dark-strong max-md:min-h-6.5 max-md:px-2 max-md:text-[0.65625rem]"

/** Grows a small in-mock control's hit area to 44px tall without changing how it looks. */
export const hitArea = "relative after:absolute after:inset-x-0 after:-inset-y-2"

/** Inner dark card ("dk" in the reference). */
export const darkCard = "rounded-lg border border-border bg-card"

/** Full-cover button laid over a row or card that holds block content (buttons can only hold phrasing content). */
export const overlayButton =
  "absolute inset-0 z-1 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
