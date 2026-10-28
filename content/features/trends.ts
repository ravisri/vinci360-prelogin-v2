/**
 * Trends feature page copy, verbatim from design-ref Trends.dc.html (1440) and TrendsMobile.dc.html
 * (390). Numbers live in content/sample-data.ts (`trends`).
 */
import { CalendarDays, ChartColumn, Compass, Hash, PenLine, TrendingUp } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { FeaturePageConfig, WalkthroughItem } from "@/content/features/types"

export const trendsPage = {
  slug: "trends",
  accent: "trends",
  seo: {
    title: "Trends",
    description:
      "Spot which topics and hashtags are rising across social media, ranked by momentum, with sentiment, reach and a side-by-side competitor view of every trend.",
  },
  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Trends" }],
    chip: { label: "Trends", variant: "tint", bordered: true },
    title: "Spot what is rising, not just what is big.",
    lead: "Topics and hashtags ranked by momentum, so you can decide which conversations to join this week.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Take the product tour", href: "/product-tour" },
  },
  personas: {
    title: "Who opens this page",
    items: [
      { icon: CalendarDays, title: "Campaign planners", text: "Pick the moments worth building a campaign around." },
      { icon: PenLine, title: "Content teams", text: "Know which topics and tags to post into this week." },
      { icon: Compass, title: "Strategists", text: "Tell a passing spike from a shift worth acting on." },
    ] satisfies Benefit[],
  },
  steps: {
    title: "How to use it",
    items: [
      { title: "Check the scoreboard for breakouts", text: "Look for big climbers, not just the biggest topics.", dark: true },
      { title: "Open a trend to see its make-up", text: "Its hashtags, categories and tone, in one place." },
      { title: "Compare, then choose your tags", text: "See who owns the trend, then pick the tags to use." },
    ],
  },
  outcomes: {
    title: "What it does for your brand",
    items: [
      { icon: TrendingUp, title: "Join the right conversation early", text: "Breakouts show up while there is still room to stand out." },
      { icon: Hash, title: "Choose campaign tags with evidence", text: "Usage, growth, reach and tone for every tag before you use it." },
      { icon: ChartColumn, title: "Know if it’s your trend or the whole industry’s", text: "See who owns each trend before you invest in it." },
    ] satisfies Benefit[],
  },
  related: {
    title: "Works with the rest of Vinci360",
    items: [
      { accent: "stories", label: "Promotable Stories", prompt: "Turn a rising tag into a content idea.", href: "/features/promotable-stories", linkLabel: "Explore Promotable Stories" },
      { accent: "sent", label: "Sentiment & Keywords", prompt: "Check the tone before you jump in.", href: "/features/sentiment-keywords", linkLabel: "Explore Sentiment & Keywords" },
      { accent: "cmp", label: "Brand Compare", prompt: "See where you stand overall.", href: "/features/brand-compare", linkLabel: "Explore Brand Compare" },
    ],
  },
  cta: {
    title: "Find your next conversation before your competitors do.",
    lead: "Leave your work email and we will show you what is rising around your brand.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} satisfies FeaturePageConfig

/* ------------------------------ On this page ------------------------------ */
export const trendsSubnav = {
  label: "On this page",
  items: [
    { id: "topics", label: "Topics" },
    { id: "hashtags", label: "Hashtags" },
  ],
} as const

/* -------------------------------- Hero mock -------------------------------- */
export const trendsHero = {
  chrome: "vinci360 · ",
  module: "Trending Topics",
  columns: { rank: "#", topic: "Topic", volume: "Volume", momentum: "Momentum", move: "Move", mood: "Mood" },
  hotspots: [
    { title: "Momentum score", text: "How fast a topic is growing, out of 100. Not the same as size." },
    { title: "Rank movement", text: "Places gained or lost since the previous period." },
  ],
  growth: "growth",
}

/* ------------------------------- Explainer ------------------------------- */
export const trendsExplainer = {
  title: "Big is not the same as rising.",
  terms: [
    { term: "Volume", text: "How much a topic is talked about in the period." },
    { term: "Momentum", text: "How fast volume and engagement are changing." },
    { term: "Rank movement", text: "Places gained or lost since the last period (▲ up, ▼ down, – no change)." },
  ],
  note: "A trending topic is scored on popularity, volume, engagement and momentum together.",
  chart: {
    x: "Conversation volume →",
    y: "Momentum →",
    quadrants: { bigRising: "Big and rising", bigFlat: "Big but flat", smallSurging: "Small but surging" },
    flat: "FLAT",
    breakout: "· breakout",
    caption:
      "Sample chart of six topics by conversation volume and momentum. Price and offers is the largest but almost flat. Festive gifting is small but surging, a breakout. Night photography is both large and fast-growing.",
  },
}

/* ------------------------------ Shared labels ------------------------------ */
const tellsLabel = "What it tells you:"

/* ---------------------------- Part A · Topics ---------------------------- */
export const trendsTopics = {
  part: "Part A",
  title: "Trending Topics",
  lead: "From spotting a breakout to judging it against competitors.",
  journeyLabel: "Topics journey",
  journey: ["Scoreboard", "Analytics", "Compare"],
  items: [
    {
      title: "Scoreboard",
      lead: "Every trending topic in one ranked leaderboard, with how far each one moved.",
      tells: { label: tellsLabel, text: "which conversations are breaking out, and which are fading." },
      metrics: ["Volume", "Engagement", "Momentum", "Rank movement", "Sentiment"],
      hint: "Re-sort by volume, engagement, reach, growth or sentiment.",
    },
    {
      title: "Analytics KPI cards",
      lead: "The headline numbers for the whole trending set, against the previous period.",
      tells: { label: tellsLabel, text: "whether this week’s trends are bigger, louder and warmer than last week’s." },
      metrics: ["Mentions", "Engagement", "Reach", "Sentiment"],
      hint: "",
    },
    {
      title: "Topics and hashtags together",
      lead: "Open a trend to see the sub-topics inside it and the hashtags attached to it.",
      tells: { label: tellsLabel, text: "what the trend is really about, and which tags move it." },
      metrics: ["Frequency", "Reach", "Engagement", "Growth %"],
      hint: "",
    },
    {
      title: "Product categories",
      lead: "Trending conversation grouped into the business lines it belongs to.",
      tells: { label: tellsLabel, text: "which product team should care about this week’s trends." },
      metrics: ["Share of total", "Sentiment"],
      hint: "",
    },
    {
      title: "Sentiment per topic",
      lead: "How people feel about each trending topic, with a net score you can compare.",
      tells: { label: tellsLabel, text: "which trends are safe to join, and which need care." },
      metrics: ["Positive", "Neutral", "Negative", "Net sentiment"],
      hint: "",
    },
    {
      title: "Topic cloud",
      lead: "The most-used terms in trending conversation: size is how often, colour and glyph are how people feel.",
      tells: { label: tellsLabel, text: "the words your audience is using, at a glance." },
      metrics: ["Frequency", "Sentiment"],
      hint: "Click a term to filter the whole section.",
      hintMobile: "Tap a term to filter the whole section.",
    },
  ] satisfies WalkthroughItem[],
  /** Scoreboard metric chips on the 390 reference (no Engagement). */
  scoreboardMetricsMobile: ["Volume", "Momentum", "Rank movement", "Sentiment"],
  breakdownNote: "Which tags carry the trend, and which only tag along.",
  categoriesNote: "Attribute a trend to a business line.",
  compare: {
    title: "Compare with competitors",
    lead: "The same trending topics, side by side for Aurora Mobile, Nimbus and Kestrel.",
    tells: { label: tellsLabel, text: "whether a trend is yours, or the whole industry’s, and who is winning it." },
    metrics: ["Mentions", "Engagement", "Sentiment", "Share of voice", "Gap"],
  },
}

/** Copy inside the Part A mocks. */
export const trendsTopicWidgets = {
  scoreboard: {
    sortLabel: "Sort scoreboard by",
    sorts: [
      { value: "momentum", label: "Momentum" },
      { value: "volume", label: "Volume" },
      { value: "engagement", label: "Engagement" },
      { value: "reach", label: "Reach" },
      { value: "growth", label: "Growth" },
      { value: "sentiment", label: "Sentiment" },
    ],
    columns: { rank: "#", topic: "Topic", volume: "Volume", engagement: "Engage.", momentum: "Momentum", move: "Move", mood: "Mood ▲–▼" },
    sortedBy: "Sorted by",
    period: "· last 30 days",
    sortedMobile: "Sorted by momentum",
    breakout: "Breakout",
    regionLabel: "Scoreboard table, scroll sideways",
    swipe: "Swipe the table for more columns",
    float: { move: "9", text: "Breakout: climbed 9 places this week" },
  },
  kpis: { title: "All trending topics · last 30 days", vs: "vs prev." },
  breakdown: {
    selectLabel: "Select trend",
    subs: "Sub-topics",
    columns: { tag: "Hashtag", freq: "Freq.", reach: "Reach", engagement: "Eng.", growth: "Growth" },
    carries: "● carries the trend",
    tagsAlong: "○ tags along",
  },
  categories: {
    title: "Trending conversation by category",
    columns: { category: "Category", share: "Share of total", mood: "▲ – ▼ mood" },
    legend: "Mood bar: ▲ positive (green) · – neutral (grey) · ▼ negative (red, hatched)",
  },
  sentiment: {
    title: "Sentiment by topic",
    net: "net",
    flag: { topic: "Price & offers", strong: "Price & offers is mixed", text: "— read the posts before responding." },
  },
  cloud: {
    groupLabel: "Topic terms, click to filter",
    filteredTo: "Section filtered to:",
    all: "all terms",
    clear: "Clear",
    viewList: "View as list",
    select: (term: string, mood: string) => `${term}, ${mood}, filter section`,
  },
  compare: {
    metricLabel: "Compare metric",
    metrics: [
      { value: "sov", label: "Share of voice" },
      { value: "mentions", label: "Mentions" },
      { value: "engagement", label: "Engagement" },
      { value: "sentiment", label: "Sentiment" },
    ],
    columns: { topic: "Trending topic", gap: "Gap (Aurora vs leader)" },
    ahead: "▲ Aurora ahead by",
    behind: "▼ Aurora behind by",
    notes: {
      sov: "Share of voice for each topic adds up to 100% across the three brands.",
      sentiment: "Net sentiment: positive share minus negative share.",
      other: "Last 30 days.",
    },
    hotspot: { title: "Industry-wide trend", text: "Everyone is talking about festive gifting, but Nimbus owns most of it." },
    float: "Industry-wide trend, but Nimbus leads on it",
    regionLabel: "Competitor comparison table, scroll sideways",
    caption:
      "Sample comparison of four trending topics across Aurora Mobile, Nimbus and Kestrel. Aurora leads Night photography and Battery and charging on share of voice; Flagship launches are close between Aurora and Nimbus; Festive gifting is an industry-wide trend that Nimbus leads with 55% share of voice against Aurora’s 24%.",
  },
}

/* --------------------------- Part B · Hashtags --------------------------- */
export const trendsHashtags = {
  part: "Part B",
  title: "Trending Hashtags",
  lead: "Choose the tags to use, with evidence.",
  ranking: {
    title: "Hashtag ranking",
    lead: "Every trending tag with how much it is used, how far it travels and where it lives.",
    tells: { label: tellsLabel, text: "which tags are worth adding to your next post." },
    hint: "Click a tag to see the posts carrying it (block 4).",
    hintMobile: "Tap a tag to see the posts carrying it.",
  },
  items: [
    {
      title: "Usage vs growth",
      lead: "Flip the ranking between how much a tag is used and how fast it is growing.",
      tells: { label: tellsLabel, text: "the top tag by volume and the top tag by growth are rarely the same." },
      metrics: [],
      hint: "",
    },
    {
      title: "Hashtag cloud",
      lead: "The same ranking as a presentation view, sized by use and marked by mood.",
      tells: { label: tellsLabel, text: "the shape of the conversation in one picture." },
      metrics: [],
      hint: "Use it in decks and reports.",
    },
    {
      title: "Posts behind a tag",
      lead: "Click any tag and read the actual posts carrying it.",
      tells: { label: tellsLabel, text: "what a tag really means before you put your brand on it." },
      metrics: ["Handle", "Snippet", "Sentiment", "Engagement"],
      hint: "",
    },
  ] satisfies WalkthroughItem[],
  topCards: { usage: "Top by usage", growth: "Top by growth", posts: "posts" },
}

/** Copy inside the Part B mocks. */
export const trendsHashtagWidgets = {
  ranking: {
    title: "Trending hashtags · last 30 days",
    titleMobile: "By usage · last 30 days",
    columns: {
      tag: "Hashtag",
      usage: "Usage",
      mentions: "Mentions",
      engagement: "Engage.",
      reach: "Reach",
      growth: "Growth",
      trend: "Trend",
      sentiment: "Sentiment",
      platforms: "Share of mentions",
      topPlatform: "Share",
    },
    platformOrder: "Share of all ranked-hashtag mentions, last 30 days",
    selected: "Selected:",
    select: (tag: string) => `Show posts with ${tag}`,
    regionLabel: "Hashtag table, scroll sideways",
    swipe: "Swipe the table for more columns",
  },
  usageGrowth: {
    label: "Rank by",
    options: [
      { value: "usage", label: "Absolute usage" },
      { value: "growth", label: "Growth rate" },
    ],
    caption:
      "Sample ranking that reorders when you switch between absolute usage and growth rate. By usage #AuroraLaunch leads; by growth #GiftWithAurora leads and #ShotOnX2 drops.",
  },
  cloud: {
    viewList: "View as list",
    export: "Export as image",
    caption:
      "Sample hashtag cloud: #AuroraLaunch is largest and positive, #NightModeTips and #ShotOnX2 are large and positive, #ChargerFail is medium and negative, #FestiveDeals neutral, #GiftWithAurora small and positive.",
  },
  posts: {
    title: "Posts with",
    export: "Export",
    caption: "Sample posts carrying the selected hashtag, each with handle, snippet, sentiment and engagement, with an Export button.",
  },
}

/* ----------------------------- Narrow it down ----------------------------- */
export const trendsFilters = {
  title: "Narrow it down",
  lead: "One filter bar for topics and hashtags. Try the minimum volume slider.",
  date: {
    label: "Date range",
    options: [
      { value: "today", label: "Today" },
      { value: "7", label: "7 days" },
      { value: "30", label: "30 days" },
      { value: "custom", label: "Custom" },
    ],
  },
  chips: [
    { label: "Topic", value: "All" },
    { label: "Category", value: "All" },
    { label: "Sentiment", value: "All" },
  ],
  growthOnly: "Growth only",
  minVolume: "Minimum volume",
  mentions: "mentions",
  minUsage: "Minimum usage",
  competitors: { label: "Competitor set", note: "(Compare only)", value: "Nimbus, Kestrel" },
  sortBy: { label: "Sort by", value: "Momentum" },
  boardTitle: "Suppress noise so the scoreboard shows only material conversation.",
  empty: (min: string) => `No topics reach ${min} mentions in this period. Lower the minimum volume to see more.`,
  hidden: (n: number) => `${n} ${n === 1 ? "topic" : "topics"} hidden below your threshold.`,
  allShown: (n: number) => `All ${n} topics shown.`,
  side: {
    title: "Never a blank widget",
    text: "If a filter leaves a widget empty, it says why instead of going blank. Try sliding the minimum volume to the right.",
  },
}

/* ------------------------------ How to use it ------------------------------ */
export const trendsSteps = {
  tags: ["#GiftWithAurora", "#FestiveDeals"],
  category: "Smartphones",
  positive: "▲ 70% positive",
  use: "Use #GiftWithAurora",
}
