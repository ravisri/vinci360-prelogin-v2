/**
 * Sentiment & Keywords feature page copy, verbatim from design-ref Sentiment.dc.html (1440) and
 * SentimentMobile.dc.html (390). Numbers live in content/sample-data.ts (`sentiment`).
 */
import { Flag, Headset, Megaphone, Reply, ShieldCheck, TriangleAlert } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { FeaturePageConfig, WalkthroughItem } from "@/content/features/types"

export const sentimentPage = {
  slug: "sentiment-keywords",
  accent: "sent",
  seo: {
    title: "Sentiment & Keywords",
    description:
      "See how people feel about your brand across social media, by topic and hashtag, and how any keyword or campaign term performs across its sub-topics over time.",
  },
  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Sentiment & Keywords" }],
    chip: { label: "Sentiment & Keywords", variant: "tint", bordered: true },
    title: "Find the problem before it reaches the headline number.",
    lead: "See where the favourable and adverse conversation sits, and how any keyword or campaign term performs across every topic.",
    leadMobile: "See where the favourable and adverse conversation sits, and how any keyword performs across every topic.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Take the product tour", href: "/product-tour" },
  },
  personas: {
    title: "Who opens this page",
    items: [
      {
        icon: ShieldCheck,
        title: "Brand and reputation managers",
        text: "Act on an emerging issue while it is still small.",
      },
      {
        icon: Headset,
        title: "Customer experience teams",
        text: "See which complaints are growing, and where.",
      },
      {
        icon: Megaphone,
        title: "Campaign managers and product teams",
        text: "Measure how a message or product name lands.",
      },
    ] satisfies Benefit[],
  },
  steps: {
    title: "How to use it",
    items: [
      {
        title: "Check sentiment by topic and by hashtag",
        text: "Find the topic or tag that is moving the wrong way.",
        dark: true,
      },
      {
        title: "Open the posts behind the dip",
        text: "Read what people actually said, so you know why.",
      },
      {
        title: "Pick your campaign keyword and compare sub-topics",
        text: "See where the message lands and where it doesn’t.",
      },
    ],
  },
  outcomes: {
    title: "What it does for your brand",
    items: [
      {
        icon: TriangleAlert,
        title: "Catch trouble early",
        text: "Spot an adverse topic or tag before it reaches the headline.",
      },
      {
        icon: Reply,
        title: "Respond with context",
        text: "Read the real posts before drafting a reply.",
      },
      {
        icon: Flag,
        title: "Prove what the message achieved",
        text: "See how a campaign term performs per sub-topic and category.",
      },
    ] satisfies Benefit[],
  },
  related: {
    title: "Works with the rest of Vinci360",
    items: [
      {
        accent: "reports",
        label: "Reports & Alerts",
        prompt: "Get notified when sentiment moves.",
        href: "/features/reports-alerts",
        linkLabel: "Explore Reports & Alerts",
      },
      {
        accent: "stories",
        label: "Promotable Stories",
        prompt: "Turn the positive conversation into content ideas.",
        href: "/features/promotable-stories",
        linkLabel: "Explore Promotable Stories",
      },
      {
        accent: "channels",
        label: "Source Analysis",
        prompt: "Go deeper on mentions, reach and interactions.",
        href: "/features/source-analysis",
        linkLabel: "Explore Source Analysis",
      },
    ],
  },
  cta: {
    title: "See what hides beneath your sentiment score.",
    lead: "Leave your work email and we will show you your own topics, tags and keywords.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} satisfies FeaturePageConfig

/* ------------------------------ On this page ------------------------------ */
export const sentimentSubnav = {
  label: "On this page",
  items: [
    { id: "sentiment", label: "Sentiment" },
    { id: "keywords", label: "Keywords" },
  ],
} as const

/* -------------------------------- Hero mock -------------------------------- */
export const sentimentHero = {
  chrome: "vinci360 · ",
  module: "Sentiment Analysis",
  title: "Sentiment by topic · last 30 days",
  legend: { pos: "▲ Pos", neu: "– Neu", neg: "▼ Neg (hatched)" },
  legendMobile: "▲ positive · – neutral · ▼ negative (hatched)",
  net: "net",
  hotspots: [
    {
      title: "Slipping topic",
      text: "Battery & charging’s tone is falling while the others hold steady.",
    },
    {
      title: "Net sentiment",
      text: "Positive share minus negative share, with the direction it moved.",
    },
  ],
  float: {
    label: "Battery & charging net sentiment",
    delta: "−12 pts",
    vs: "vs last period",
  },
}

/* ------------------------------- Explainer ------------------------------- */
export const sentimentExplainer = {
  title: "A healthy score can hide a problem.",
  lead: "Aggregate sentiment hides where the trouble is. Vinci360 shows you where.",
  view: {
    label: "View",
    options: [
      { value: "overall", label: "Overall" },
      { value: "under", label: "Underneath" },
    ],
  },
  overall: {
    chip: "1 · Overall",
    line: "▲ Net sentiment +34 · up 2 pts",
    ask: "Looks healthy. Is it?",
    askMobile: "Looks healthy. Tap “Underneath”.",
    caption: "Overall net sentiment is +34, up 2 points: a reassuring headline number.",
  },
  under: {
    chipPlatform: "2 · Underneath: by topic",
    chipHashtag: "by hashtag",
    callout: "Moving the wrong way",
    reveal: "Look underneath",
    heading: "Underneath the overall score",
    caption:
      "Underneath the overall score: Battery & charging’s net sentiment is +9, down 12 points, and the campaign tag #SampleCampaign has turned negative at −14, down 22 points. Both are moving the wrong way.",
  },
  key: "Bar key: ▲ positive (green) · – neutral (grey) · ▼ negative (red, hatched). Purple outlines mark what needs attention; they never mean a sentiment.",
}

/* ------------------------------ Shared labels ------------------------------ */
const tellsLabel = "What it tells you:"

/* --------------------------- Part A · Sentiment --------------------------- */
export const sentimentPartA = {
  part: "Part A",
  title: "Sentiment Analysis",
  lead: "How people feel, separated from how much they talk, by topic and by hashtag.",
  items: [
    {
      title: "Topic-wise sentiment",
      lead: "Positive, neutral and negative for each of your top topics, side by side.",
      tells: {
        label: tellsLabel,
        text: "which topic is pulling your sentiment up, and which is dragging it down.",
      },
      metrics: ["Positive", "Neutral", "Negative", "Net sentiment", "Change vs previous"],
      hint: "Switch between real counts and 100% stacked bars.",
    },
    {
      title: "Hashtag-wise overall sentiment",
      lead: "Every hashtag around your brand with its mood, its direction and how much it is used.",
      tells: {
        label: tellsLabel,
        text: "which tag communities are on your side, and which are turning.",
      },
      metrics: ["Sentiment split", "Net sentiment", "Trend", "Volume"],
      hint: "",
    },
    {
      title: "Sentiment threshold",
      lead: "Choose how confident the system must be before a post counts as positive or negative; everything below is shown as neutral.",
      tells: {
        label: tellsLabel,
        text: "how much of your sentiment is clear-cut, and how much is borderline.",
      },
      metrics: [],
      hint: "Drag the slider and watch the chart change.",
    },
  ] satisfies WalkthroughItem[],
  platformNote: "Audiences feel differently about each topic; this explains movements that look inexplicable in the total.",
  hashtagNote: "A campaign tag turning negative shows up here before it shows in any total.",
  drill: {
    chip: "Drill into the posts",
    title: "Click the negative segment, read why.",
    lead: "Every bar opens the real posts behind it, so you understand the dip before you respond.",
    negative: "▼ Negative",
    posts: "posts",
    viewOriginal: "View original",
    viewOriginalTitle: "Opens the original post in the product",
    caption: "Sample negative posts about charging and support, each with engagement and a View original link.",
  },
}

/** Copy inside the Part A mocks. */
export const sentimentPartAWidgets = {
  platform: {
    showAs: "Show as",
    options: [
      { value: "count", label: "Counts" },
      { value: "pct", label: "100% stacked" },
    ],
    legend: {
      pos: "▲ Positive",
      neu: "– Neutral",
      neg: "▼ Negative (hatched)",
    },
    mentions: "mentions",
    net: "Net",
    vsPrev: "pts vs prev.",
    hotspot: {
      title: "Biggest topic, weakest tone",
      text: "Battery & charging carries most mentions, so its slide moves the total.",
    },
    caption:
      "Sample topic-wise sentiment with counts or percentages. Battery & charging has by far the most mentions and the largest negative share at 32%, with net sentiment +9, down 12 points; Night photography is the most positive at +43.",
  },
  hashtags: {
    title: "Hashtags · last 30 days",
    columns: {
      tag: "Hashtag",
      split: "Split ▲ – ▼",
      net: "Net",
      trend: "Trend",
      volume: "Volume",
    },
    trend: { up: "▲ rising", down: "▼ falling", flat: "– steady" },
    float: "#SampleCampaign turning negative",
    caption:
      "Sample hashtag-wise sentiment: #ShotOnX2 net +64 and rising; #NightModeTips +58 rising; #AuroraLaunch +29 flat; #SampleCampaign has turned negative at −14 and is falling; #ChargerFail −72 and falling.",
  },
  threshold: {
    title: "Sentiment threshold",
    label: "Confidence required",
    confidence: "% confidence",
    relaxed: "Relaxed",
    strict: "Strict",
    belowLine: (n: number) => `${n}% of posts are below the line and shown as neutral.`,
    caption:
      "Sentiment threshold control. A strict threshold leaves fewer posts counted as positive or negative and more as neutral; a relaxed threshold counts more posts as positive or negative.",
  },
}

/* ---------------------------- Part B · Keywords ---------------------------- */
export const sentimentPartB = {
  part: "Part B",
  title: "Keyword Analysis",
  lead: "Pick one keyword — a campaign term, a product name, a slogan or an emerging phrase — and every widget on the page is about that term.",
  leadMobile: "Pick one keyword and every widget is about that term.",
  picker: {
    label: "Keyword (one at a time)",
    placeholder: "Search a keyword…",
    listLabel: "Keywords",
    none: "No sample keyword matches. Try “Night”.",
    quickPicks: "Quick picks",
    quickPicksMobile: "Sample keywords",
    now: "Every widget is now about",
  },
  /** The nine widgets of the keyword page; `mobile` = one of the six on the 390 grid. */
  widgets: [
    {
      id: "kpis",
      name: "KPI cards",
      desc: "Headline numbers",
      mobile: "KPI cards",
    },
    {
      id: "platforms",
      name: "Sub-topic breakdown",
      desc: "Where it is used",
      mobile: "Sub-topic breakdown",
    },
    {
      id: "sentiment",
      name: "Sentiment bar graphs",
      desc: "How people feel",
      mobile: "Sentiment bars",
    },
    {
      id: "articles",
      name: "Articles",
      desc: "Every post with it",
      mobile: "Articles",
    },
    {
      id: "trending",
      name: "Trending hashtags",
      desc: "Tags around it",
      mobile: "Hashtags",
    },
    {
      id: "topics",
      name: "Topics",
      desc: "Themes it appears in",
      mobile: "Topics",
    },
    {
      id: "hashtagSentiment",
      name: "Hashtag-wise sentiment",
      desc: "Mood per tag",
    },
    { id: "categories", name: "Category graph", desc: "Business lines" },
    { id: "handles", name: "Top handles", desc: "Who talks about it" },
  ],
  widgetValues: {
    mentions: "mentions",
    posts: "posts",
    positive: "positive",
    optional: "Optional",
  },
  items: [
    {
      title: "KPI cards",
      lead: "The headline numbers for one keyword, against the previous period.",
      tells: {
        label: tellsLabel,
        text: "whether your term is being talked about more, further and more warmly.",
      },
      metrics: ["Mentions", "Engagement", "Reach", "Sentiment", "Content volume"],
      hint: "",
    },
    {
      title: "Sentiment bar graphs",
      lead: "Positive, neutral and negative for conversation that contains your keyword.",
      tells: {
        label: tellsLabel,
        text: "whether people like the message, not just whether they repeat it.",
      },
      metrics: [],
      hint: "Switch between Count and Percentage.",
    },
    {
      title: "Hashtag-wise sentiment and trending hashtags",
      lead: "The tag communities that gather around your keyword, and how each one feels.",
      tells: {
        label: tellsLabel,
        text: "which communities are favourable and which are adverse.",
      },
      metrics: ["Usage", "Growth %", "Reach", "Net sentiment"],
      hint: "",
    },
    {
      title: "Topics and categories",
      lead: "The themes your keyword appears in, and the business lines the conversation belongs to.",
      tells: {
        label: tellsLabel,
        text: "whether your term is being used as intended, or pulled into an unrelated conversation.",
      },
      metrics: ["Topics", "Product", "Service", "Industry"],
      hint: "",
    },
  ] satisfies WalkthroughItem[],
  platforms: {
    title: "Sub-topic breakdown",
    lead: "What your keyword is used with, sub-topic by sub-topic: mentions, engagement and share of total.",
    leadMobile: "What your keyword is used with, sub-topic by sub-topic.",
    tells: { label: tellsLabel, text: "same term, very different results." },
    metrics: ["Mentions", "Engagement", "Share of total", "Net sentiment"],
    /** The 390 reference drops Net sentiment. */
    metricsMobile: ["Mentions", "Engagement", "Share of total"],
  },
  teasers: {
    articles: {
      title: "Articles",
      text: "Every post containing the keyword, in one feed.",
    },
    handles: {
      title: "Top handles",
      text: "Accounts discussing the keyword, with follower counts.",
      optional: "Optional",
      show: "Show ▾",
      followers: "followers",
    },
    export: {
      title: "Export",
      text: "Any widget to Excel or CSV, ready for your report.",
    },
  },
}

/** Copy inside the Part B mocks. */
export const sentimentPartBWidgets = {
  kpis: { title: "Keyword:", vs: "vs prev." },
  platforms: {
    title: "by sub-topic · last 30 days",
    titleMobile: "by sub-topic",
    share: "share of total",
    mentions: "Mentions",
    engagement: "Engagement",
    net: "Net sentiment",
    netShort: "net",
    same: "Same term, very different results.",
  },
  sentiment: {
    label: "Show values as",
    options: [
      { value: "count", label: "Count" },
      { value: "pct", label: "Percentage" },
    ],
    rows: { pos: "▲ Positive", neu: "– Neutral", neg: "▼ Negative" },
    net: "Net sentiment",
  },
  hashtags: {
    title: "Hashtags with",
    columns: {
      tag: "Hashtag",
      usage: "Usage",
      growth: "Growth",
      reach: "Reach",
      sentiment: "Sentiment",
    },
    caption:
      "Sample hashtags used with the selected keyword, with usage, growth, reach and net sentiment; some tag communities are favourable and one is adverse.",
  },
  topics: {
    topics: "Topics",
    categories: "Category graph",
    onMessage: "✓ on-message",
    offMessage: "⚑ off-message",
    caption:
      "Sample topics and categories for the selected keyword: the main themes it appears in and a category graph attributing the conversation to product, service and industry lines.",
  },
}

/* ----------------------------- Narrow it down ----------------------------- */
export const sentimentFilters = {
  title: "Narrow it down",
  lead: "Separate filters for each module. Try switching a topic off.",
  tabsLabel: "Filter sets",
  tabs: [
    { value: "sent", label: "Sentiment filters" },
    { value: "key", label: "Keyword filters" },
  ],
  date: { label: "Date range", value: "Last 30 days" },
  platform: {
    label: "Topic",
    items: ["Launch", "Price", "Night", "Battery"],
    included: (n: string) => `${n} included`,
    excluded: (n: string) => `${n} excluded`,
  },
  keywordEntity: {
    label: "Keyword or entity",
    placeholder: "e.g. Aurora Care",
  },
  hashtag: { label: "Hashtag", value: "Any" },
  threshold: "Sentiment threshold ·",
  language: { label: "Language", value: "All" },
  keyword: { label: "Keyword", required: "(required)" },
  sentiment: { label: "Sentiment", value: "All" },
  category: { label: "Category", value: "All" },
  canvasTitle: "Change a filter and every widget updates together.",
  without: "✓ Updated without",
  allPlatforms: "All topics",
  updated: "↻ updated",
  widgets: {
    sent: ["Topic-wise sentiment", "Hashtag-wise sentiment", "Sentiment threshold", "Overall sentiment", "Posts behind a segment", "Sentiment trend"],
    key: ["KPI cards", "Sub-topic breakdown", "Sentiment bars", "Hashtags", "Topics", "Category graph"],
  },
  side: {
    title: "Never a blank widget",
    text: "If a filter leaves a widget empty, it says why instead of going blank.",
    example: "e.g. “No posts with this keyword in the last 7 days. Widen the date range to see more.”",
  },
}

/* ------------------------------ How to use it ------------------------------ */
export const sentimentSteps = {
  tag: "#AuroraLaunch",
  negShort: "▼ Neg",
}
