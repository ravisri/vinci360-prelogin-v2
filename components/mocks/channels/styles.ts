/** Shared in-mock styles for the Channel Analysis page (colours come from the frame's `on-dark` scope). */

/** Dark widget panel inside a frame ("dk" in the reference). */
export const dk = "rounded-lg border border-border bg-card p-3"

/** Widget title. */
export const wt = "text-xs font-semibold"

/** "Date · Last 30 days" filter pill in the frame header. */
export const fpill = "inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[0.6875rem] [&>b]:font-semibold [&>b]:text-muted-foreground"

/** Initials avatar. */
export const avatar = "grid size-9 flex-none place-items-center rounded-full bg-muted text-xs font-bold"

/** Dark data table: semantic, tabular numbers, right-aligned figures via `[&_.r]:text-right`. */
export const dtab =
  "w-full border-collapse text-left text-xs tabular [&_.r]:text-right [&_td]:border-t [&_td]:border-border [&_td]:px-2 [&_td]:py-2 [&_th]:px-2 [&_th]:pb-1.5 [&_th]:font-semibold [&_th]:text-muted-foreground"

/** Metric chip on light ("mchip"). */
export const mchip = "inline-flex items-center rounded-full bg-channels-tint px-2.5 py-1 text-xs font-semibold text-channels-text"

/** Icon-only network picker button ("nsel"): 44px target, tint + check when on. */
export const pickerItem =
  "relative size-11 cursor-pointer rounded-sm border border-border bg-card text-foreground hover:bg-channels-tint data-[state=on]:border-2 data-[state=on]:border-channels-text data-[state=on]:bg-channels-tint data-[state=on]:text-channels-text"

/** Small check badge on the selected picker or tab. */
export const checkBadge = "absolute -top-1.5 -right-1.5 hidden size-4 place-items-center rounded-full bg-channels-text text-primary-foreground in-data-[state=on]:grid"

/**
 * Hotspot centred on the frame edge beside a widget (widgets sit 16px in, the frame's body padding),
 * so the 36px ring lands in the padding and never covers a number or label. NetworkPanel's frame is
 * overflow-visible for this. Hotspot translates -50%, so right-side values add its 44px width.
 */
export const hotspotSide = {
  left: "top-1/2 -left-4",
  right: "top-1/2 -right-15",
  "top-left": "top-0 -left-4",
  "top-right": "top-0 -right-15",
  "right-upper": "top-1/4 -right-15",
  "right-lower": "top-3/4 -right-15",
} as const
