/**
 * Channel Analysis feature page copy, verbatim from design-ref Channels.dc.html (1440) and
 * ChannelsMobile.dc.html (390). Numbers live in content/channels-data.ts.
 */
import { BadgeCheck, BarChart3, Info, Layers } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { FeaturePageConfig, WalkthroughItem } from "@/content/features/types"

export const channelsPage = {
  slug: "channel-analysis",
  accent: "channels",
  seo: {
    title: "Channel Analysis",
    description:
      "A dedicated page for Facebook, YouTube, Instagram and X, each reporting that network’s own metrics and objects instead of flattening them into one score.",
  },
  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Channel Analysis" }],
    chip: { label: "Channel Analysis", variant: "tint", bordered: true },
    title: "Go deeper on every network, in its own terms.",
    lead: "A dedicated page for Facebook, YouTube, Instagram and X, each reporting that network’s own metrics and objects instead of flattening them into one score.",
    leadMobile: "A dedicated page for Facebook, YouTube, Instagram and X, each reporting that network’s own metrics and objects.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Take the product tour", href: "/product-tour" },
  },
  personas: {
    title: "Who opens this page",
    items: [
      { icon: BadgeCheck, title: "Channel owners", text: "who run one Page, channel or account." },
      { icon: BarChart3, title: "Analysts responsible for one network", text: "who need its full detail." },
    ] satisfies Benefit[],
    aside: {
      label: "When to use it",
      title: "When to use it.",
      text: "Use the cross-platform pages for the whole picture. Use Channel Analysis when behaviour on one network needs to be understood on its own.",
      textMobile: "Use the cross-platform pages for the whole picture. Use Channel Analysis when one network needs to be understood on its own.",
    },
  },
  steps: {
    title: "How to use it",
    items: [
      { title: "Pick your network", text: "Facebook, YouTube, Instagram or X." },
      { title: "Choose what to follow", text: "The page, channel or user, plus keywords or hashtags." },
      { title: "Read, then open the posts", text: "Read the native metrics, then open the posts behind them.", dark: true },
    ],
  },
  outcomes: {
    title: "What it does for your brand",
    items: [
      { icon: Layers, title: "Understand each network on its own terms", text: "Reactions, subscribers, reposts and influence, as each network counts them." },
      { icon: BarChart3, title: "See the quality of engagement, not only the volume", text: "How people reacted, not just how many did." },
      { icon: BadgeCheck, title: "Give each channel owner a page that speaks their language", text: "No translating back from a blended score." },
    ] satisfies Benefit[],
  },
  related: {
    title: "Works with the rest of Vinci360",
    items: [
      { accent: "smi", label: "Social Media Intelligence", prompt: "See all four networks together.", href: "/features/social-media-intelligence", linkLabel: "Explore Social Media Intelligence" },
      { accent: "sent", label: "Sentiment & Keywords", prompt: "Compare the tone across networks.", href: "/features/sentiment-keywords", linkLabel: "Explore Sentiment & Keywords" },
      { accent: "reports", label: "Reports & Alerts", prompt: "Send a channel report on a schedule.", href: "/features/reports-alerts", linkLabel: "Explore Reports & Alerts" },
    ],
  },
  cta: {
    title: "See your network the way its owners do.",
    lead: "Leave your work email and we will walk you through a channel page built on sample data for your brand.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} satisfies FeaturePageConfig

/* ------------------------------ How to use it (thumbnails) ------------------------------ */
export const channelsSteps = {
  tabs: ["Facebook", "YouTube", "Instagram", "X"],
  object: { label: "Page", value: "Aurora Mobile" },
  chips: ["Night Mode", "#ShotOnX2"],
  read: { love: "Love", loveDelta: "18%", angry: "Angry", angryDelta: "2%", open: "Open the posts →" },
}

/* ------------------------------------ Hero ------------------------------------ */
export const channelsJump = { label: "Jump to a network" }

/* ---------------------------- Whole picture or depth? ---------------------------- */
export const channelsDepth = {
  title: "Whole picture or channel depth?",
  cross: {
    title: "Cross-platform pages",
    text: "All four networks on shared measures, side by side. Best for the whole picture.",
    link: "Open Social Media Intelligence",
    href: "/features/social-media-intelligence",
  },
  channel: { title: "Channel Analysis", chip: "You are here", text: "One network at a time, on that network’s own objects and metrics. Best for channel depth." },
  closing: "Each network measures engagement differently. This page reports it the way the network does.",
}

/* -------------------------------- Choose a network -------------------------------- */
export const channelsSwitcher = {
  chip: "Try it",
  title: "Choose a network",
  lead: "Each network gets its own page, built on what that network actually counts.",
  tabsLabel: "Network",
  viewsLabel: "Views on this network",
  views: [
    { label: "Keywords", href: "#w1" },
    { label: "Entity", href: "#w2" },
    { label: "Groups", href: "#w3" },
    { label: "Hashtag-wise", href: "#w4" },
  ],
  frame: (name: string, obj: string) => `Channel Analysis · ${name} · ${obj}`,
  frameMobile: (name: string, obj: string) => `${name} · ${obj}`,
  aside: {
    title: (name: string) => `Native metrics · ${name}`,
    mainObject: "Main object:",
    metricsLabel: "What this network measures",
    tellsLabel: "What it tells you:",
    hint: "Use ← → to switch networks when a tab is focused.",
  },
}

/* ---------------------------- Each network, in its own words ---------------------------- */
export const channelsTerms = {
  title: "Each network, in its own words",
  caption: "What Channel Analysis reports for each network",
  rowHeader: "Row",
  rows: ["Main object analysed", "What it measures", "The detail that matters most"],
  rowsMobile: ["Main object", "What it measures", "Detail that matters most"],
  listLabel: "Networks compared",
  swipe: "Swipe for the other networks",
}

/* ---------------------------- Five views on every network ---------------------------- */
const tellsLabel = "What it tells you:"

export const channelsWalkthrough = {
  chip: "Walkthrough",
  title: "Five views on every network",
  lead: "The same five views open on each network. Use the network icons on each block to swap the sample.",
  items: [
    {
      id: "w1",
      title: "Keywords",
      lead: "Content on this network that matches the keywords you choose, with mentions, engagement, reach, sentiment and content volume for this network alone.",
      tells: { label: tellsLabel, text: "how a phrase is doing on one network, without the other three blending in." },
      metrics: ["Mentions", "Engagement", "Reach", "Sentiment", "Content volume"],
      hint: "Pick a network on the right to swap the sample.",
      hintMobile: "Pick a network above to swap the sample.",
    },
    {
      id: "w2",
      title: "Entity",
      lead: "Mentions and discussion about the brands, products, people or organisations you track, on this network, with engagement, sentiment and a trend line.",
      tells: { label: tellsLabel, text: "whether your brand is gaining or losing ground on this network against Nimbus and Kestrel." },
      metrics: ["Entity mentions", "Engagement", "Sentiment", "Trend"],
      hint: "Open any entity to see its posts on this network.",
    },
    {
      id: "w3",
      title: "Groups",
      lead: "Grouped conversation in the communities you follow: group name, mentions, engagement, sentiment and the dominant topic in each.",
      tells: { label: tellsLabel, text: "which communities talk about you most, and in what tone." },
      metrics: ["Group name", "Mentions", "Engagement", "Sentiment", "Dominant topics"],
      hint: "On Facebook, groups are native communities. On YouTube, Instagram and X, a group is a set of channels, accounts or communities you define.",
      hintIcon: Info,
      insight: true,
    },
    {
      id: "w4",
      title: "Hashtag-wise",
      lead: "Popularity, reach, engagement, growth and sentiment for each hashtag on this network.",
      tells: { label: tellsLabel, text: "which tags carry your message on this network, and which carry complaints." },
      metrics: ["Popularity", "Reach", "Engagement", "Growth %", "Sentiment"],
      hint: "Sort by growth to see what is rising here first.",
    },
    {
      id: "w5",
      title: "Native object: Page",
      lead: "The network’s own object in full detail: the Page, Channel or User you follow, with its best and worst content and the posts behind each number.",
      tells: { label: tellsLabel, text: "which pieces of content drove the numbers, and how people answered them." },
      metrics: ["Posts", "Reactions by type", "Comments", "Shares", "Engagement rate"],
      hint: "Select “Open the posts” on any row to read them.",
    },
  ] satisfies (WalkthroughItem & { id: string })[],
  objectTitle: (obj: string) => `Native object: ${obj}`,
  keywordNote: { before: "The single-network counterpart of ", link: "Keyword Analysis", href: "/features/sentiment-keywords", after: "." },
  views: {
    keywords: {
      label: "Keywords",
      volume: (net: string) => `Content volume on ${net}:`,
      posts: "posts",
      range: "Last 30 days",
      cols: ["Keyword", "Mentions", "Engagement", "Reach *", "Sentiment"],
      hotspots: [
        { title: "Tone on this network only", text: "The same keyword can read positive on one network and negative on another." },
        { title: "Content volume", text: "How many posts on this network matched your keywords." },
      ],
    },
    entity: {
      label: "Entity",
      cols: ["Entity", "Mentions", "Engagement", "Sentiment", "Trend · 30 days"],
      hotspots: [
        { title: "Direction, not just size", text: "A smaller entity can still be the one growing fastest here." },
        { title: "Your brand in teal", text: "Aurora Mobile is the highlight series; competitors use other colours." },
      ],
    },
    groups: {
      label: "Groups",
      cols: ["Group", "Mentions", "Engagement", "Sentiment", "Dominant topic"],
      hotspots: [
        { title: "Native or defined", text: "The label says whether a group is a Facebook community or a set you built." },
        { title: "What each group talks about", text: "The single most discussed topic in that group for the period." },
      ],
    },
    hashtags: {
      label: "Hashtag-wise",
      cols: ["Hashtag", "Popularity", "Reach *", "Engagement", "Growth", "Sentiment"],
      note: "Popularity is the number of posts using the tag.",
      hotspots: [
        { title: "Growth versus the previous period", text: "A complaint tag can grow fastest while still being small." },
        { title: "Tone per tag", text: "Always shown with an arrow and a word, not colour alone." },
      ],
    },
    object: {
      label: "the native object view",
      open: "Open the posts",
      hide: "Hide the posts",
      postsLabel: "Sample posts",
      hotspots: [
        { title: "Every number has posts behind it", text: "Open them to read what people actually said." },
        { title: "Page, Channel or User", text: "The object each network is built around, not a generic “profile”." },
      ],
    },
  },
  picker: (view: string) => `Sample network for ${view}`,
  pickerItem: (name: string) => `Show ${name} sample`,
}

/* ------------------------------- One insight per network ------------------------------- */
export const channelsInsights = { title: "One insight per network", listLabel: "Insights" }

/* --------------------------------- Narrow it down --------------------------------- */
export const channelsFilters = {
  title: "Narrow it down",
  lead: "The same filter bar on every network. Only the object filter changes its name.",
  network: "Network for the filter demo",
  labels: {
    range: "Date range",
    objNote: "(filter name changes by network)",
    kw: "Keyword or entity",
    grp: "Group or community",
    tag: "Hashtag",
    sent: "Sentiment",
    ctype: "Content type",
    sort: "Sort by",
  },
  widgets: ["Mentions", "Engagement rate", "Sentiment", "Top post"],
  only: { Positive: "Positive only", Neutral: "Neutral only", Negative: "Negative only" },
  splitNote: "pos / neu / neg",
  by: (sort: string) => `by ${sort.toLowerCase()}`,
  updated: "Updated",
  footer: "Change a filter and every widget on the page updates together.",
  emptyIntro: "If a filter leaves a widget empty, it says why instead of going blank.",
}
