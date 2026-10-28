/**
 * Brand Compare feature page copy, verbatim from design-ref Compare.dc.html (1440) and
 * CompareMobile.dc.html (390). Numbers live in content/sample-data.ts (`compare`).
 *
 * The reference builder also offers a fourth brand ("Orion"); CLAUDE.md §7 limits sample brands to
 * Aurora Mobile, Nimbus and Kestrel, so it is left out.
 */
import { BadgeCheck, Briefcase, ChartColumnBig, ChartLine, Download, Flag, Info, ShieldCheck } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { FeaturePageConfig, WalkthroughItem } from "@/content/features/types"

export const comparePage = {
  slug: "brand-compare",
  accent: "cmp",
  seo: {
    title: "Brand Compare",
    description:
      "Measure your brand against named competitors on Facebook, X, YouTube and Instagram: share of voice, indexed engagement, sentiment, reach and topic overlap.",
  },
  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Brand Compare" }],
    chip: { label: "Brand Compare", variant: "tint", bordered: true },
    title: "See exactly where you stand against your competitors.",
    lead: "Your brand and named competitors measured side by side on mentions, engagement, sentiment, reach and share of voice.",
    leadMobile: "Your brand and named competitors side by side on mentions, engagement, sentiment, reach and share of voice.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Take the product tour", href: "/product-tour" },
  },
  personas: {
    title: "Who opens this page",
    items: [
      { icon: BadgeCheck, title: "Marketing leadership", text: "The competitive read for the board, on one scale." },
      { icon: Flag, title: "Brand managers", text: "A monthly competitive review without a spreadsheet." },
      { icon: Briefcase, title: "Agency teams", text: "Client-versus-category reports, ready to present." },
    ] satisfies Benefit[],
  },
  steps: {
    title: "How to use it",
    items: [
      { title: "Choose your brand and competitors", text: "Pick the brands you are measured against." },
      { title: "Read the index, then watch the gap", text: "Where you stand today, and which way it is moving.", dark: true },
      { title: "Check overlap, then export", text: "See shared and owned topics, then take it to your review." },
    ],
  },
  outcomes: {
    title: "What it does for your brand",
    items: [
      { icon: ChartColumnBig, title: "Know where you rank", text: "One scale for every competitor." },
      { icon: ChartLine, title: "See whether the gap is closing", text: "Movement, not just a snapshot." },
      { icon: ShieldCheck, title: "Walk into the review with evidence", text: "Figures traced to real posts, ready for board reporting." },
    ] satisfies Benefit[],
  },
  related: {
    title: "Works with the rest of Vinci360",
    items: [
      { accent: "trends", label: "Trends", prompt: "See which trends competitors are winning.", href: "/features/trends", linkLabel: "Explore Trends" },
      { accent: "reports", label: "Reports & Alerts", prompt: "Send the comparison to leadership on a schedule.", href: "/features/reports-alerts", linkLabel: "Explore Reports & Alerts" },
      { accent: "smi", label: "Social Media Intelligence", prompt: "Zoom into your own brand’s conversation.", href: "/features/social-media-intelligence", linkLabel: "Explore Social Media Intelligence" },
    ],
  },
  cta: {
    title: "Compare your brand with two real competitors.",
    lead: "Bring your brand and two rivals; we’ll show you where you stand.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} satisfies FeaturePageConfig

/* ------------------------------ Shared labels ------------------------------ */
export const compareLegend = {
  label: "Brands in this sample",
  you: "(you)",
  baseline: "Aurora = 100",
}

/* -------------------------------- Hero mock -------------------------------- */
export const compareHero = {
  chrome: "vinci360 · ",
  module: "Brand Compare Analysis",
  sov: "Share of voice",
  indexed: "Indexed vs Aurora (= 100)",
  axis: { min: "50", mid: "100 = Aurora", max: "130" },
  hotspots: [
    { title: "Share of voice", text: "Your slice of all mentions across you and the rivals you picked. Always 100% in total." },
    { title: "Indexed comparison", text: "Aurora is 100. Above 100 means a rival is ahead on that measure." },
  ],
  leads: "Nimbus leads engagement by 14 pts",
  gap: { label: "Your gap:", value: "narrowing" },
  caption:
    "Sample Brand Compare page: share of voice is Aurora Mobile 38%, Nimbus 36%, Kestrel 26%. Indexed against Aurora at 100, Nimbus scores 114 on engagement and 106 on reach, but below Aurora on mentions and sentiment; Kestrel is below Aurora on every measure.",
  captionMobile: "Sample share of voice: Aurora Mobile 38%, Nimbus 36%, Kestrel 26%, totalling 100%.",
}

/* ---------------------------- Three ways to read ---------------------------- */
export type CompareView = "headline" | "trend" | "figures"

export const compareViews = {
  title: "One comparison, three ways to read it.",
  toggleLabel: "Choose a view",
  options: [
    { value: "headline", label: "Headline" },
    { value: "trend", label: "Trend" },
    { value: "figures", label: "Figures" },
  ] satisfies { value: CompareView; label: string }[],
  sub: "Same data, three reads: the headline, the movement, and the numbers.",
  titles: {
    headline: { desktop: "Headline · indexed vs Aurora (= 100)" },
    trend: { desktop: "Trend · engagement per week, gap to the leader", mobile: "Trend · engagement, 8 weeks" },
    figures: { desktop: "Figures · last 30 days" },
  } as Record<CompareView, { desktop: string; mobile?: string }>,
  captions: {
    headline:
      "Indexed comparison with Aurora at 100: Nimbus is ahead on engagement (114) and reach (106); Aurora leads on mentions and sentiment; Kestrel is behind on all four.",
    trend: "Weekly engagement for the three brands over 8 weeks. Nimbus leads, but the gap to Aurora narrowed from 25 to 14 index points.",
    figures: "Table of figures for the three brands across five metrics, with the gap and change.",
  } as Record<CompareView, string>,
  reading: { ahead: "Aurora ahead of both", behind: (n: number) => `Nimbus ahead by ${n} pts` },
  trendCaption: "Engagement per week, 8 weeks · shaded = gap to the leader",
  sideLabel: "What you can compare",
  sideItems: ["Mentions", "Engagement", "Sentiment", "Reach", "Topics", "Hashtags", "Share of voice"],
}

/* ------------------------------ Figure table ------------------------------ */
export const compareTable = {
  caption: "Brand comparison figures, last 30 days",
  metric: "Metric",
  gap: "Gap vs Aurora",
  changeViews: "Aurora vs previous",
  changeWidget: "Change vs prev.",
  scrollLabel: "Figure table, scroll sideways",
  swipe: "Swipe the table; the metric stays in place.",
}

/* ---------------------------- What you'll see ---------------------------- */
const tellsLabel = "What it tells you:"

export const compareWalkthrough = {
  title: "What you’ll see",
  lead: "Five widgets, from the headline index to the conversations you share.",
  items: [
    {
      title: "Indexed comparison chart",
      lead: "Your brand is set to 100; each competitor is placed on the same scale for every metric you choose.",
      tells: { label: tellsLabel, text: "on which measures a rival is ahead of you, and by how much." },
      metrics: ["Mentions", "Engagement", "Sentiment", "Reach"],
      hint: "A single scale for the headline read.",
      hintIcon: Info,
      insight: true,
    },
    {
      title: "Share of voice",
      lead: "Your mentions as a share of all mentions across you and the competitors you picked.",
      tells: { label: tellsLabel, text: "how loud you are in your category, compared with the rivals that matter." },
      metrics: ["Donut", "Stacked bar", "Always 100%"],
      hint: "Remove a competitor and watch the shares recalculate.",
    },
    {
      title: "Trend of the gap",
      lead: "Each brand over time, with the distance to the leader shaded.",
      tells: { label: tellsLabel, text: "whether the gap is closing, not just where it stands today." },
      metrics: ["Weekly", "Monthly", "Quarterly", "Yearly"],
      hint: "Click a point to see the posts behind it.",
      hintMobile: "Tap a point to see the posts behind it.",
    },
    {
      title: "Detailed figure table",
      lead: "Every number behind the charts, with the gap and the change since last period.",
      tells: { label: tellsLabel, text: "the exact figures to quote in a review." },
      metrics: ["Mentions", "Engagement", "Sentiment score", "Reach", "Share of voice"],
      hint: "Export to Excel or CSV.",
      hintIcon: Download,
    },
    {
      title: "Topic and hashtag overlap",
      lead: "The topics and hashtags each brand owns, and the ones you share.",
      tells: { label: tellsLabel, text: "where you compete for the same conversation, and where you are alone." },
      metrics: ["Topics", "Hashtags", "Shared", "Owned"],
      hint: "Where you are competing for the same conversation, and where you are alone.",
      hintIcon: Info,
      insight: true,
    },
  ] satisfies WalkthroughItem[],
}

/** Copy inside the five walkthrough mocks. */
export const compareWidgets = {
  index: {
    float: "Nimbus index 114 on engagement",
    caption:
      "Indexed comparison with Aurora Mobile at 100: Nimbus 95 on mentions, 114 on engagement, 94 on sentiment, 106 on reach; Kestrel 68, 57, 82 and 66.",
  },
  sov: {
    title: "Share of voice · mentions · last 30 days",
    group: "Competitors included",
    remove: (name: string) => `Remove ${name} from share of voice`,
    add: (name: string) => `Add ${name} back`,
    keep: "Keep at least one competitor",
    total: "Total",
    live: (parts: string) => `Share of voice: ${parts}. Total 100%.`,
  },
  gap: {
    granularity: "Granularity",
    options: [
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "quarterly", label: "Quarterly" },
      { value: "yearly", label: "Yearly" },
    ],
    title: (unit: string) => `Engagement · ${unit}`,
    /** The ▼ (narrowed) / ▲ (widened) glyph comes from Delta. */
    chip: (delta: number, now: number) => `Gap ${delta} pts vs last period · Nimbus +${now}`,
    point: (label: string, a: number, n: number, k: number) => `${label}: Aurora ${a}, Nimbus ${n}, Kestrel ${k}. Show posts.`,
    idle: "Click a point on the chart to see the posts behind it",
    idleMobile: "Tap a point on the chart to see the posts behind it",
    postsFor: (label: string) => `Posts behind ${label}`,
    caption: (label: string, first: number, now: number) =>
      `${label} engagement for the three brands. Nimbus leads; its lead over Aurora moved from ${first} to ${now} index points.`,
  },
  figures: { title: "Figures · last 30 days", export: "Export" },
  overlap: {
    venn: "Topic overlap",
    bars: "Shared vs owned topics",
    barsNote: "Solid = shared · hatched = owned alone",
    shared: "Shared by all three",
    alone: "Aurora alone",
    caption:
      "Topic overlap: 4 topics are shared by all three brands; Aurora and Nimbus share 6 more; Aurora owns 7 topics alone, Nimbus 9 and Kestrel 5.",
  },
}

/* --------------------------- Build your comparison --------------------------- */
export const compareBuilder = {
  title: "Build your comparison",
  lead: "Pick your brand, pick your rivals, pick the metrics. Everything on the page updates together.",
  leadMobile: "Pick your brand, your rivals and the metrics. Everything updates together.",
  own: "Own brand",
  competitors: "Competitor set",
  remove: (name: string) => `Remove ${name}`,
  add: (name: string) => `Add ${name}`,
  addShort: "Add",
  platform: "Platform",
  metric: "Metric",
  metricMobile: "Metrics",
  metrics: [
    { value: "mentions", label: "Mentions", on: true },
    { value: "engagement", label: "Engagement", on: true },
    { value: "sentiment", label: "Sentiment", on: true },
    { value: "reach", label: "Reach", on: false },
    { value: "topics", label: "Topics", on: false },
    { value: "hashtags", label: "Hashtags", on: false },
    { value: "sov", label: "Share of voice", on: true },
  ],
  range: "Date range",
  rangeMobile: "Date range & granularity",
  ranges: [
    { value: "today", label: "Today", mobile: true },
    { value: "7d", label: "Last 7 days", mobile: true },
    { value: "30d", label: "Last 30 days", mobile: true },
    { value: "weekly", label: "Weekly", mobile: false },
    { value: "monthly", label: "Monthly", mobile: false },
    { value: "quarterly", label: "Quarterly", mobile: true },
    { value: "yearly", label: "Yearly", mobile: true },
    { value: "custom", label: "Custom…", preview: "Custom range", mobile: true },
  ],
  granularity: "Granularity",
  granularities: ["Weekly", "Monthly", "Quarterly", "Yearly"],
  summary: {
    selected: (n: number) => `${n} selected`,
    allPlatforms: "All four",
  },
  preview: "Live preview",
  sovTotal: (total: number) => `Share of voice (total ${total}%)`,
  sovTotalMobile: (total: number) => `Share of voice · total ${total}%`,
  indexed: (own: string) => `Indexed vs ${own} (= 100)`,
  topics: (n: number, names: string) => `Topics: ${n} shared with ${names}`,
  hashtags: "Hashtags: #NightMode and #FestiveDeals shared by all",
  empty: {
    platform: "No platform selected. Pick at least one network to compare.",
    competitor: "No competitor in the set. Add at least one rival to compare against.",
    metric: "No metric selected. Tick at least one metric to see a comparison.",
  },
  live: (parts: string, total: number) => `Preview: share of voice ${parts}, total ${total}%.`,
  note: { title: "Never a blank widget.", text: "If a selection leaves a widget empty, it says why instead of going blank. Try unticking every metric." },
}

/* ------------------------- A result you can stand behind ------------------------- */
export const compareTrust = {
  title: "A result you can stand behind",
  items: [
    { title: "Trace any number to real posts", text: "Click any slice, bar or point to read the posts behind it." },
    { title: "Export to Excel, CSV or PDF", text: "With the filters printed on it, so nobody misreads the scope." },
    { title: "Schedule it as a standing report", text: "The same comparison in leadership’s inbox every month.", href: "/features/reports-alerts", linkLabel: "Reports & Alerts" },
  ],
  sheet: { title: "Filters", rows: ["30 days", "All platforms", "Nimbus, Kestrel"], formats: ["XLS", "CSV", "PDF"] },
}

/* ------------------------------ How to use it ------------------------------ */
export const compareSteps = {
  own: "Aurora Mobile",
  export: "Export",
}
