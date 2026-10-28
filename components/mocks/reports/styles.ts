/** Class strings shared by the Reports & Alerts mocks (plain module, usable from server and client components). */

/** Light report / email sheet ("paper" in the reference). */
export const paper = "relative rounded-lg border border-border bg-card text-card-foreground shadow-card"

/** KPI tile inside a report sheet. */
export const kpiTile = "rounded-sm bg-background p-2.5"

/** Chip in the reports tint ("Keyword", "✓ PDF", "Every Monday 8:45"). */
export const tintChip = "inline-flex items-center gap-1.5 rounded-full bg-reports-tint px-2.5 py-1 text-xs leading-[1.3] font-semibold text-reports-text"

/** Neutral outlined chip ("Brand", "Excel"). */
export const plainChip = "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs leading-[1.3] font-semibold text-foreground"

/** Selected chip on the text-safe magenta fill (white on reports-text). */
export const solidChip = "inline-flex items-center gap-1.5 rounded-full bg-reports-text px-2.5 py-1 text-xs leading-[1.3] font-semibold text-primary-foreground"

/** Toggle chip in the builder (topic / output): 44px target, pressed = tint + magenta border. */
export const toggleChip =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-reports-tint aria-pressed:border-reports-text aria-pressed:bg-reports-tint aria-pressed:text-reports-text"

/** Field label above a builder control. */
export const fieldLabel = "text-sm font-semibold text-foreground"

/** Recipient chip with a remove button. */
export const recipChip = "inline-flex items-center gap-0.5 rounded-full bg-reports-tint py-0 pl-3 text-[0.8125rem] font-semibold text-reports-text"
