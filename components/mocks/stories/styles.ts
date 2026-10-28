/** Class strings shared by the Promotable Stories mocks (plain module, usable from server and client components). */

/** "AI-generated suggestion" chip inside a dark frame (amber on dark). */
export const aiChipDark =
  "inline-flex items-center gap-1.5 rounded-full border border-amber-on-dark px-2.5 py-1 text-xs leading-[1.3] font-semibold text-amber-on-dark"

/** Same chip on light backgrounds (hero), in the tint + text-safe accent. */
export const aiChipLight =
  "inline-flex items-center gap-1.5 rounded-full border border-stories-200 bg-stories-tint px-3.5 py-1.5 text-[0.8125rem] leading-[1.3] font-semibold text-stories-text"

/** Source hashtag chip ("tagc"). */
export const tagChip = "inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs leading-[1.3] font-semibold text-amber-on-dark"

/** Keyword chip ("kwc"). */
export const kwChip = "inline-flex items-center rounded-full bg-border px-2.5 py-1 text-xs leading-[1.3] font-medium text-on-dark-strong"

/** Evidence tile ("ev"). */
export const evTile = "rounded-sm bg-background px-2.5 py-2"

/** Solid "Story candidate" chip: ink on the amber fill. */
export const candidateChip = "inline-flex items-center rounded-full bg-stories px-2.5 py-1 text-xs leading-[1.3] font-semibold text-ink"

/** Priority pill per level ("prio" in the reference). */
export const priorityChip = {
  High: "border-stories bg-stories text-ink",
  Medium: "border-stories text-amber-on-dark",
  Low: "border-border text-muted-foreground",
} as const

/** Dark action button (Dismiss / Export) inside a frame. */
export const darkAction =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
