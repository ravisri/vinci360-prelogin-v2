"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type SegmentedProps<T extends string> = {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
  /** dark = inside a mock frame (small, 44px hit area) · light = page filter bar (44px tall). */
  tone?: "dark" | "light"
  /** smi = filled primary "on" state · other modules = tint + text-safe accent, as in their references. */
  accent?: Accent
  className?: string
}

const primaryOn =
  "data-[state=on]:bg-primary data-[state=on]:font-bold data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary data-[state=on]:hover:text-primary-foreground"

/** Tint "on" states per module (literal strings so Tailwind sees them). Dark = inset ring, light = bottom bar. */
const tintOn: Partial<Record<Accent, { dark: string; light: string }>> = {
  trends: {
    dark: "data-[state=on]:bg-trends-tint data-[state=on]:font-extrabold data-[state=on]:text-trends-text data-[state=on]:inset-ring-2 data-[state=on]:inset-ring-trends-text data-[state=on]:hover:bg-trends-tint data-[state=on]:hover:text-trends-text",
    light:
      "data-[state=on]:bg-trends-tint data-[state=on]:font-bold data-[state=on]:text-trends-text data-[state=on]:shadow-[inset_0_-3px_0_var(--color-trends-text)] data-[state=on]:hover:bg-trends-tint data-[state=on]:hover:text-trends-text",
  },
  /** Brand Compare: filled pill on dark · tint + cmp-text + bottom bar on light (the "lseg" control in its reference). */
  cmp: {
    /** Filled cmp pill inside dark frames (ink on the sky-blue fill, per the token rules). */
    dark: "data-[state=on]:bg-cmp data-[state=on]:font-bold data-[state=on]:text-ink data-[state=on]:hover:bg-cmp data-[state=on]:hover:text-ink",
    light:
      "data-[state=on]:bg-cmp-tint data-[state=on]:font-extrabold data-[state=on]:text-cmp-text data-[state=on]:shadow-[inset_0_-3px_0_var(--color-cmp-text)] data-[state=on]:hover:bg-cmp-tint data-[state=on]:hover:text-cmp-text",
  },
  /** Promotable Stories: ink on the amber fill (dark) · tint + stories-text + bottom bar (light). */
  stories: {
    dark: "data-[state=on]:bg-stories data-[state=on]:font-bold data-[state=on]:text-ink data-[state=on]:hover:bg-stories data-[state=on]:hover:text-ink",
    light:
      "data-[state=on]:bg-stories-tint data-[state=on]:font-bold data-[state=on]:text-stories-text data-[state=on]:shadow-[inset_0_-3px_0_var(--color-stories-text)] data-[state=on]:hover:bg-stories-tint data-[state=on]:hover:text-stories-text",
  },
  /** Reports & Alerts: white on the text-safe magenta (reports-text) fill, as the "lseg" control in its reference. */
  reports: {
    dark: "data-[state=on]:bg-reports-text data-[state=on]:font-bold data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-reports-text data-[state=on]:hover:text-primary-foreground",
    light: "data-[state=on]:bg-reports-text data-[state=on]:font-bold data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-reports-text data-[state=on]:hover:text-primary-foreground",
  },
  /** Sentiment & Keywords: filled purple with white text (both tones), as in its reference. */
  sent: {
    dark: "data-[state=on]:bg-sent data-[state=on]:font-bold data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-sent data-[state=on]:hover:text-primary-foreground",
    light: "data-[state=on]:bg-sent data-[state=on]:font-bold data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-sent data-[state=on]:hover:text-primary-foreground",
  },
}

/** Single-choice segmented control (Radix toggle group: arrow keys move, one item always selected). */
export function Segmented<T extends string>({ label, value, options, onChange, tone = "dark", accent = "smi", className }: SegmentedProps<T>) {
  const dark = tone === "dark"
  const on = tintOn[accent]?.[tone] ?? primaryOn
  return (
    <ToggleGroup
      type="single"
      spacing={0}
      aria-label={label}
      value={value}
      onValueChange={(v) => v && onChange(v as T)}
      className={cn(
        "border",
        dark ? "flex-wrap rounded-sm border-border bg-card p-0.5" : "overflow-hidden rounded-lg border-border bg-card",
        className,
      )}
    >
      {options.map((o) => (
        <ToggleGroupItem
          key={o.value}
          value={o.value}
          className={cn(
            "cursor-pointer font-medium",
            on,
            dark
              ? "relative h-6.5 rounded-[6px] px-2.5 text-[0.71875rem] text-muted-foreground after:absolute after:inset-x-0 after:-inset-y-2 hover:bg-muted hover:text-foreground group-data-[spacing=0]/toggle-group:rounded-[6px]"
              : "h-11 rounded-none border-l border-border px-4 text-sm text-foreground first:border-l-0 hover:bg-primary-tint hover:text-foreground",
          )}
        >
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
