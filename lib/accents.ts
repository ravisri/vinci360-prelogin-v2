import type { Accent } from "@/content/navigation"

export type { Accent }

type AccentClasses = {
  /** Module fill: dots, icons, large areas. */
  fill: string
  /** Text on light backgrounds. */
  text: string
  /** Chips and panels. */
  tint: string
  /** Tint borders. */
  border200: string
  /** Solid fill that can carry text, paired with `onFill` (CLAUDE.md §5). */
  solid: string
  onFill: string
  /** Icon / stroke colour on light. */
  stroke: string
  /** Inset accent border for selected rows or highlighted cards. */
  ring: string
  /** Underline of the active tab (text-safe shade, as in the Features tab strip). */
  tabActive: string
}

/** Literal class strings per module so Tailwind can see every one of them. */
export const accents: Record<Accent, AccentClasses> = {
  smi: {
    fill: "bg-smi",
    text: "text-smi-text",
    tint: "bg-smi-tint",
    border200: "border-smi-200",
    solid: "bg-smi",
    onFill: "text-primary-foreground",
    stroke: "stroke-smi",
    ring: "border-smi",
    tabActive: "data-[state=active]:border-primary",
  },
  trends: {
    fill: "bg-trends",
    text: "text-trends-text",
    tint: "bg-trends-tint",
    border200: "border-trends-200",
    solid: "bg-trends",
    onFill: "text-ink",
    stroke: "stroke-trends",
    ring: "border-trends",
    tabActive: "data-[state=active]:border-trends-text",
  },
  sent: {
    fill: "bg-sent",
    text: "text-sent-text",
    tint: "bg-sent-tint",
    border200: "border-sent-200",
    solid: "bg-sent",
    onFill: "text-primary-foreground",
    stroke: "stroke-sent",
    ring: "border-sent",
    tabActive: "data-[state=active]:border-sent-text",
  },
  cmp: {
    fill: "bg-cmp",
    text: "text-cmp-text",
    tint: "bg-cmp-tint",
    border200: "border-cmp-200",
    solid: "bg-cmp",
    onFill: "text-ink",
    stroke: "stroke-cmp",
    ring: "border-cmp",
    tabActive: "data-[state=active]:border-cmp-text",
  },
  stories: {
    fill: "bg-stories",
    text: "text-stories-text",
    tint: "bg-stories-tint",
    border200: "border-stories-200",
    solid: "bg-stories",
    onFill: "text-ink",
    stroke: "stroke-stories",
    ring: "border-stories",
    tabActive: "data-[state=active]:border-stories-text",
  },
  reports: {
    fill: "bg-reports",
    text: "text-reports-text",
    tint: "bg-reports-tint",
    border200: "border-reports-200",
    /** White on magenta fails below 18.66px bold, so text-carrying fills use reports-text. */
    solid: "bg-reports-text",
    onFill: "text-primary-foreground",
    stroke: "stroke-reports",
    ring: "border-reports",
    tabActive: "data-[state=active]:border-reports-text",
  },
  channels: {
    fill: "bg-channels",
    text: "text-channels-text",
    tint: "bg-channels-tint",
    border200: "border-channels-200",
    solid: "bg-channels",
    onFill: "text-ink",
    stroke: "stroke-channels",
    ring: "border-channels",
    tabActive: "data-[state=active]:border-channels-text",
  },
}
