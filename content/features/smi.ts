/**
 * Social Media Intelligence feature page copy, verbatim from design-ref SMI.dc.html (1440) and
 * SMIMobile.dc.html (390). Numbers live in content/sample-data.ts (`smi`).
 */
import { BadgeCheck, Bell, Briefcase, Flag, MapPin, Megaphone, ShieldCheck } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { FeaturePageConfig, WalkthroughItem } from "@/content/features/types"

export const smiPage = {
  slug: "social-media-intelligence",
  accent: "smi",
  seo: {
    title: "Social Media Intelligence",
    description:
      "See every mention of your brand across social media in one view: volume, reach, interactions, sentiment, topics, hashtags and the posts behind them.",
  },
  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Social Media Intelligence" }],
    chip: { label: "Social Media Intelligence", variant: "solid" },
    title: "Everything being said about your brand, in one view.",
    lead: "See what people are saying about you, about what, and in what tone, right now.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Explore the features", href: "/features" },
    metricsLine: "Mentions · Reach · Interactions · Sentiment, analysed in one place",
  },
  personas: {
    title: "Who opens this page",
    items: [
      { icon: Megaphone, title: "Communications leads", text: "A morning read of what changed overnight." },
      { icon: Flag, title: "Brand managers", text: "A weekly pulse of volume, reach and tone." },
      { icon: Briefcase, title: "Agency account teams", text: "Client-ready numbers without building a deck." },
      { icon: BadgeCheck, title: "Executives", text: "Five numbers that say how the brand is doing." },
    ] satisfies Benefit[],
  },
  steps: {
    title: "How to use it",
    items: [
      { title: "Pick what to watch", text: "Choose a brand, product, person or keyword." },
      { title: "Read the headline numbers and the timeline", text: "See at a glance what moved and when.", dark: true },
      { title: "Drill into the posts behind any number", text: "Then export them, or schedule a report to arrive on its own." },
    ],
  },
  outcomes: {
    title: "What it does for your brand",
    items: [
      { icon: Bell, title: "Know first", text: "See sudden spikes and tone shifts before they become headlines." },
      { icon: MapPin, title: "See where it’s happening", text: "Which topics and hashtags carry the conversation." },
      { icon: ShieldCheck, title: "Report with confidence", text: "Every number traces back to real posts." },
    ] satisfies Benefit[],
  },
  related: {
    title: "Works with the rest of Vinci360",
    items: [
      { accent: "trends", label: "Trends", prompt: "Found a spike? See what is rising.", href: "/features/trends", linkLabel: "Explore Trends" },
      { accent: "sent", label: "Sentiment & Keywords", prompt: "Tone dropped? Find the words behind it.", href: "/features/sentiment-keywords", linkLabel: "Explore Sentiment & Keywords" },
      { accent: "reports", label: "Reports & Alerts", prompt: "Want this every Monday? Have it sent to you.", href: "/features/reports-alerts", linkLabel: "Explore Reports & Alerts" },
    ],
  },
  cta: {
    title: "See this page on your own brand.",
    lead: "Leave your work email and we will show you your own mentions, sentiment and topics.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} satisfies FeaturePageConfig

/* ------------------------------- Hero mock ------------------------------- */
export const smiHero = {
  chrome: "vinci360 · ",
  module: "Social Media Intelligence",
  range: "Last 30 days",
  savedView: { label: "Saved view:", name: "Daily read" },
  filters: [
    { label: "Brand:", value: "Aurora Mobile", desktopOnly: true },
    { label: "Topic:", value: "All" },
    { label: "Sentiment:", value: "All" },
    { label: "Topic:", value: "Any", desktopOnly: true },
  ],
  barsTitle: "Mentions this week",
  hotspots: [
    { title: "KPI cards", text: "Your five headline numbers and how they moved." },
    { title: "Timeline spike", text: "Tuesday’s jump came with a drop in tone." },
  ],
  post: { time: "Tue · 9:12 PM", text: "Third Aurora X2 charger this year. Support keeps closing my ticket.", engagement: "2.4K engagements" },
}

/* ---------------------------- What you'll see ---------------------------- */
const tellsLabel = "What it tells you:"

export const smiWalkthrough = {
  title: "What you’ll see",
  lead: "Seven widgets, from the headline numbers down to the posts behind them. Everything below is clickable sample data.",
  items: [
    {
      title: "KPI cards",
      lead: "Five headline numbers for the period you choose, each compared with the period before.",
      tells: {
        label: tellsLabel,
        text: "whether the conversation about you is growing, and whether it is getting warmer or colder.",
        textMobile: "whether the conversation is growing, and getting warmer or colder.",
      },
      metrics: ["Mentions", "Engagement", "Reach", "Posts", "Sentiment score"],
      hint: "Click a card to scope the whole page to that metric.",
      hintMobile: "Tap a card to scope the whole page to that metric.",
    },
    {
      title: "Weekly timeline",
      lead: "How much people talked about you over time, with a line showing how they felt.",
      tells: { label: tellsLabel, text: "when a spike happened and whether it was good news or bad." },
      metrics: ["Volume", "Net sentiment", "Weekly · Monthly · Quarterly · Yearly"],
      hint: "Click a point to filter the posts below to that interval.",
    },
    {
      title: "Topics",
      lead: "The subjects people talk about most when they mention you, ranked, with how they feel about each.",
      tells: { label: tellsLabel, text: "which themes carry the conversation, and which ones are hurting you." },
      metrics: ["Volume", "Engagement", "Sentiment split"],
      hint: "Select a topic to filter the whole page.",
    },
    {
      title: "Topic breakdown",
      lead: "How the conversation splits across your top topics.",
      tells: { label: tellsLabel, text: "what your audience actually talks about, and where the engagement really happens." },
      metrics: ["Mentions", "Engagement", "Share of total"],
      hint: "Click a topic to see only its posts.",
    },
    {
      title: "Sentiment bar graphs",
      lead: "How many mentions are positive, neutral or negative, overall or topic by topic.",
      tells: { label: tellsLabel, text: "the overall mood in one number, and where it is weakest." },
      metrics: ["Positive", "Neutral", "Negative", "Net sentiment"],
      hint: "Switch between Count and Percentage, or view it by topic.",
    },
    {
      title: "Articles",
      lead: "Every post behind the numbers, from across social media, in one feed.",
      tells: { label: tellsLabel, text: "exactly what people said, who said it and how far it travelled." },
      metrics: ["Likes", "Comments", "Shares", "Views"],
      hint: "Open the original post, or export the list to Excel.",
    },
    {
      title: "Trending hashtags",
      lead: "The tags attached to your conversation, ranked by use, with how fast each is growing.",
      tells: { label: tellsLabel, text: "which tags to join, and which ones signal trouble." },
      metrics: ["Usage", "Reach", "Growth %", "Sentiment"],
      hint: "Click a hashtag to see the posts that use it.",
    },
  ] satisfies WalkthroughItem[],
  topicsNote: "Topics are picked out of the posts themselves, so new themes appear without any setup.",
}

/** Copy inside the seven walkthrough mocks. */
export const smiWidgets = {
  kpi: {
    title: "Last 30 days vs previous 30",
    scopedTo: "Page scoped to",
    all: "All metrics",
    scope: (metric: string) => `Scope the page to ${metric}`,
  },
  timeline: {
    granularity: "Granularity",
    options: [
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "quarterly", label: "Quarterly" },
      { value: "yearly", label: "Yearly" },
    ],
    mentions: "Mentions",
    spike: "Spike",
    net: "Net sentiment",
    bar: (name: string, n: string, net: number, spike: boolean) =>
      `${name}: ${n} mentions, net sentiment +${net}${spike ? ", spike" : ""}. Filter posts.`,
    postsAll: "Posts below · all of this period",
    postsFiltered: (name: string) => `Posts below · filtered to ${name}`,
  },
  topics: {
    title: "Topics · last 30 days",
    columns: { rank: "#", topic: "Topic", volume: "Volume", engagement: "Engage.", sentiment: "Sentiment ▲ – ▼" },
    filteredTo: "Page filtered to:",
    all: "All topics",
    select: (topic: string) => `Filter the page to ${topic}`,
    hotspot: { title: "Your biggest topic is a complaint", text: "Battery & charging leads on volume and is mostly negative." },
  },
  platforms: {
    title: "Mentions vs engagement by topic",
    mentions: "Mentions %",
    engagement: "Engagement %",
    columns: { topic: "Topic", mentions: "Mentions", engagement: "Engagement", share: "Share" },
    float: "62% of mentions come from one topic",
  },
  sentiment: {
    values: { label: "Values", options: [{ value: "count", label: "Count" }, { value: "pct", label: "Percentage" }] },
    view: { label: "View", options: [{ value: "overall", label: "Overall" }, { value: "topic", label: "By topic" }] },
    net: "Net sentiment",
    netSub: "positive overall",
    overall: "Overall sentiment",
    byPlatform: "Sentiment by topic",
    caption: "▲ positive · – neutral · ▼ negative (hatched)",
  },
  articles: { title: "Articles · newest first", export: "Export", viewOriginal: "View original" },
  hashtags: {
    columns: { tag: "Hashtag", usage: "Usage", reach: "Reach", growth: "Growth", mood: "Mood" },
    cloud: "Hashtag cloud",
    float: "Growing fastest ≠ used most",
  },
  topHandles: {
    badge: "Optional",
    title: "Top handles",
    text: "the accounts driving the conversation, with follower count and an authority indicator.",
    followers: "followers",
    authority: "Authority",
  },
}

/* ---------------------------- Slice it your way ---------------------------- */
export const smiFilters = {
  title: "Slice it your way",
  lead: "One filter bar at the top of the page. Try it: change anything below.",
  leadMobile: "Change a filter and every widget updates together.",
  date: {
    label: "Date range",
    options: [
      { value: "today", label: "Today", change: "Today" },
      { value: "7d", label: "7 days", change: "Last 7 days" },
      { value: "30d", label: "30 days", change: "" },
      { value: "custom", label: "Custom", change: "Custom range" },
    ],
  },
  platform: { label: "Topic", items: ["Launch", "Camera", "Battery", "Pricing"], included: (n: string) => `${n} included`, excluded: (n: string) => `${n} excluded`, without: "without" },
  sentiment: { label: "Sentiment", options: ["All", "Positive", "Neutral", "Negative"], only: "only" },
  search: "Keyword or brand",
  more: ["Topic: Any", "Hashtag: Any", "Language: All", "Sort by: Newest"],
  moreMobile: ["Topic: All", "Keyword", "Sentiment", "Hashtag", "Language", "Sort by: Newest"],
  reset: "Reset filters",
  stripLabel: "Filters",
  swipe: "Swipe for more filters",
  canvasTitle: "Change a filter and every widget updates together.",
  idle: "Showing: last 30 days · all topics · all sentiment",
  updatedFor: "✓ Updated for:",
  updated: "↻ updated",
  widgets: [
    { name: "KPI cards", span: "col-span-2 md:col-span-4", bar: "h-4.5", mobile: true },
    { name: "Timeline", span: "md:col-span-2", bar: "h-11.5", mobile: true },
    { name: "Topics", span: "", bar: "h-11.5", mobile: true },
    { name: "Topic breakdown", span: "", bar: "h-11.5", mobile: false },
    { name: "Sentiment", span: "", bar: "h-7.5", mobile: true },
    { name: "Articles", span: "md:col-span-2", bar: "h-7.5", mobile: true },
    { name: "Hashtags", span: "", bar: "h-7.5", mobile: false },
  ],
  saved: {
    title: "Saved views",
    text: "Name a filter combination and make it your default landing state.",
    items: [
      { name: "Daily read", tag: "Default" },
      { name: "Battery · negative only" },
      { name: "Launch week · #AuroraX2Launch" },
    ],
  },
}

/* ------------------------------ How to use it ------------------------------ */
export const smiSteps = {
  search: "Aurora Mobile",
  scopes: ["Brand", "Product", "Person", "Keyword"],
  actions: ["Export", "Schedule report"],
}
