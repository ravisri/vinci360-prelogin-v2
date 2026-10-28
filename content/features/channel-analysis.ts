/**
 * Source Analysis feature page copy: four views on the conversation (Interactions, Top content,
 * Top voices, Amplification). Layout and order follow the design reference. Numbers live in
 * content/channels-data.ts.
 */
import { BadgeCheck, BarChart3, Info, Layers } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { FeaturePageConfig, WalkthroughItem } from "@/content/features/types"

export const channelsPage = {
  slug: "source-analysis",
  accent: "channels",
  seo: {
    title: "Source Analysis",
    description:
      "Break the conversation about your brand into focused views: mentions and reach, interactions by type, top content, top voices and amplification, side by side.",
  },
  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Source Analysis" }],
    chip: { label: "Source Analysis", variant: "tint", bordered: true },
    title: "See how the conversation performs, view by view.",
    lead: "Four focused views on the conversation about your brand: interactions, top content, top voices and amplification, each with its own measures instead of one blended score.",
    leadMobile: "Four focused views on the conversation: interactions, top content, top voices and amplification.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Explore the features", href: "/features" },
  },
  personas: {
    title: "Who opens this page",
    items: [
      { icon: BadgeCheck, title: "Profile and community owners", text: "who run one profile or account." },
      { icon: BarChart3, title: "Analysts responsible for one view", text: "who need its full detail." },
    ] satisfies Benefit[],
    aside: {
      label: "When to use it",
      title: "When to use it.",
      text: "Use the overview pages for the whole picture. Use Source Analysis when one view of the conversation needs to be understood on its own.",
      textMobile: "Use the overview pages for the whole picture. Use Source Analysis when one view needs to be understood on its own.",
    },
  },
  steps: {
    title: "How to use it",
    items: [
      { title: "Pick a view", text: "Interactions, top content, top voices or amplification." },
      { title: "Choose what to follow", text: "The profile, post or author, plus keywords or hashtags." },
      { title: "Read, then open the posts", text: "Read the metrics, then open the posts behind them.", dark: true },
    ],
  },
  outcomes: {
    title: "What it does for your brand",
    items: [
      { icon: Layers, title: "Understand each view on its own", text: "Interaction types, audience change, shares and influence, each counted separately." },
      { icon: BarChart3, title: "See the quality of engagement, not only the volume", text: "How people responded, not just how many did." },
      { icon: BadgeCheck, title: "Give each team a view that speaks their language", text: "No translating back from a blended score." },
    ] satisfies Benefit[],
  },
  related: {
    title: "Works with the rest of Vinci360",
    items: [
      { accent: "smi", label: "Social Media Intelligence", prompt: "See the whole conversation together.", href: "/features/social-media-intelligence", linkLabel: "Explore Social Media Intelligence" },
      { accent: "sent", label: "Sentiment & Keywords", prompt: "Compare the tone across views.", href: "/features/sentiment-keywords", linkLabel: "Explore Sentiment & Keywords" },
      { accent: "reports", label: "Reports & Alerts", prompt: "Send a source report on a schedule.", href: "/features/reports-alerts", linkLabel: "Explore Reports & Alerts" },
    ],
  },
  cta: {
    title: "See the conversation the way your team needs it.",
    lead: "Leave your work email and we will walk you through a Source Analysis view built on sample data for your brand.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} satisfies FeaturePageConfig

/* ------------------------------ How to use it (thumbnails) ------------------------------ */
export const channelsSteps = {
  tabs: ["Interactions", "Top content", "Top voices", "Amplification"],
  object: { label: "Profile", value: "Aurora Mobile" },
  chips: ["Night Mode", "#ShotOnX2"],
  read: { love: "Saves", loveDelta: "18%", angry: "Complaints", angryDelta: "2%", open: "Open the posts →" },
}

/* ------------------------------------ Hero ------------------------------------ */
export const channelsJump = { label: "Jump to a view" }

/* ---------------------------- Whole picture or depth? ---------------------------- */
export const channelsDepth = {
  title: "Whole picture or view depth?",
  cross: {
    title: "Overview pages",
    text: "All four views on shared measures, side by side. Best for the whole picture.",
    link: "Open Social Media Intelligence",
    href: "/features/social-media-intelligence",
  },
  channel: { title: "Source Analysis", chip: "You are here", text: "One view at a time, on its own objects and metrics. Best for depth." },
  closing: "Each view measures engagement differently. This page reports each one on its own measures.",
}

/* -------------------------------- Choose a view -------------------------------- */
export const channelsSwitcher = {
  chip: "Try it",
  title: "Choose a view",
  lead: "Each view gets its own page, built on what that view actually counts.",
  tabsLabel: "View",
  viewsLabel: "Breakdowns in this view",
  views: [
    { label: "Keywords", href: "#w1" },
    { label: "Entity", href: "#w2" },
    { label: "Communities", href: "#w3" },
    { label: "Hashtag-wise", href: "#w4" },
  ],
  frame: (name: string, obj: string) => `Source Analysis · ${name} · ${obj}`,
  frameMobile: (name: string, obj: string) => `${name} · ${obj}`,
  aside: {
    title: (name: string) => `Metrics · ${name}`,
    mainObject: "Main object:",
    metricsLabel: "What this view measures",
    tellsLabel: "What it tells you:",
    hint: "Use ← → to switch views when a tab is focused.",
  },
}

/* ---------------------------- Each view, in plain words ---------------------------- */
export const channelsTerms = {
  title: "Each view, in plain words",
  caption: "What Source Analysis reports for each view",
  rowHeader: "Row",
  rows: ["Main object analysed", "What it measures", "The detail that matters most"],
  rowsMobile: ["Main object", "What it measures", "Detail that matters most"],
  listLabel: "Views compared",
  swipe: "Swipe for the other views",
}

/* ---------------------------- Five breakdowns on every view ---------------------------- */
const tellsLabel = "What it tells you:"

export const channelsWalkthrough = {
  chip: "Walkthrough",
  title: "Five breakdowns on every view",
  lead: "The same five breakdowns open on each view. Use the view icons on each block to swap the sample.",
  items: [
    {
      id: "w1",
      title: "Keywords",
      lead: "Content in this view that matches the keywords you choose, with mentions, engagement, reach, sentiment and content volume for this view alone.",
      tells: { label: tellsLabel, text: "how a phrase is doing in one view, without the other three blending in." },
      metrics: ["Mentions", "Engagement", "Reach", "Sentiment", "Content volume"],
      hint: "Pick a view on the right to swap the sample.",
      hintMobile: "Pick a view above to swap the sample.",
    },
    {
      id: "w2",
      title: "Entity",
      lead: "Mentions and discussion about the brands, products, people or organisations you track, in this view, with engagement, sentiment and a trend line.",
      tells: { label: tellsLabel, text: "whether your brand is gaining or losing ground in this view against Nimbus and Kestrel." },
      metrics: ["Entity mentions", "Engagement", "Sentiment", "Trend"],
      hint: "Open any entity to see its posts in this view.",
    },
    {
      id: "w3",
      title: "Communities",
      lead: "Grouped conversation in the communities you follow: community name, mentions, engagement, sentiment and the dominant topic in each.",
      tells: { label: tellsLabel, text: "which communities talk about you most, and in what tone." },
      metrics: ["Community name", "Mentions", "Engagement", "Sentiment", "Dominant topics"],
      hint: "A community can be one you follow, or a set of profiles, accounts or communities you define.",
      hintIcon: Info,
      insight: true,
    },
    {
      id: "w4",
      title: "Hashtag-wise",
      lead: "Popularity, reach, engagement, growth and sentiment for each hashtag in this view.",
      tells: { label: tellsLabel, text: "which tags carry your message in this view, and which carry complaints." },
      metrics: ["Popularity", "Reach", "Engagement", "Growth %", "Sentiment"],
      hint: "Sort by growth to see what is rising here first.",
    },
    {
      id: "w5",
      title: "Main object: Profile",
      lead: "The view’s main object in full detail: the profile, post or author you follow, with its best and worst content and the posts behind each number.",
      tells: { label: tellsLabel, text: "which pieces of content drove the numbers, and how people answered them." },
      metrics: ["Posts", "Interactions by type", "Comments", "Shares", "Engagement rate"],
      hint: "Select “Open the posts” on any row to read them.",
    },
  ] satisfies (WalkthroughItem & { id: string })[],
  objectTitle: (obj: string) => `Main object: ${obj}`,
  keywordNote: { before: "The single-view counterpart of ", link: "Keyword Analysis", href: "/features/sentiment-keywords", after: "." },
  views: {
    keywords: {
      label: "Keywords",
      volume: (net: string) => `Content volume in ${net}:`,
      posts: "posts",
      range: "Last 30 days",
      cols: ["Keyword", "Mentions", "Engagement", "Reach *", "Sentiment"],
      hotspots: [
        { title: "Tone in this view only", text: "The same keyword can read positive in one view and negative in another." },
        { title: "Content volume", text: "How many posts in this view matched your keywords." },
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
      label: "Communities",
      cols: ["Community", "Mentions", "Engagement", "Sentiment", "Dominant topic"],
      hotspots: [
        { title: "Followed or defined", text: "The label says whether a community is one you follow or a set you built." },
        { title: "What each community talks about", text: "The single most discussed topic in that community for the period." },
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
      label: "the main object view",
      open: "Open the posts",
      hide: "Hide the posts",
      postsLabel: "Sample posts",
      hotspots: [
        { title: "Every number has posts behind it", text: "Open them to read what people actually said." },
        { title: "Profile, post or author", text: "The object each view is built around, shown in full detail." },
      ],
    },
  },
  picker: (view: string) => `Sample view for ${view}`,
  pickerItem: (name: string) => `Show ${name} sample`,
}

/* ------------------------------- One insight per view ------------------------------- */
export const channelsInsights = { title: "One insight per view", listLabel: "Insights" }

/* --------------------------------- Narrow it down --------------------------------- */
export const channelsFilters = {
  title: "Narrow it down",
  lead: "The same filter bar on every view. Only the object filter changes its name.",
  network: "View for the filter demo",
  labels: {
    range: "Date range",
    objNote: "(filter name changes by view)",
    kw: "Keyword or entity",
    grp: "Community",
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
