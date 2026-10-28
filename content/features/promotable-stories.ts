/**
 * Promotable Stories feature page copy, verbatim from design-ref Stories.dc.html (1440) and
 * StoriesMobile.dc.html (390). Numbers live in content/sample-data.ts (`stories`).
 */
import { Clock, Flag, Info, Megaphone, PenLine, ShieldCheck, Sparkles } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { FeaturePageConfig, WalkthroughItem } from "@/content/features/types"

export const storiesPage = {
  slug: "promotable-stories",
  accent: "stories",
  seo: {
    title: "Promotable Stories",
    description:
      "Turn social conversation into content ideas backed by evidence: story candidates from trending hashtags across social media, with reach, sentiment and posts.",
  },
  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Promotable Stories" }],
    chip: { label: "Promotable Stories", variant: "tint", bordered: true },
    title: "Turn conversation into content ideas, backed by evidence.",
    lead: "Vinci360 reads what people are saying around your trending hashtags and proposes stories worth promoting, each with the proof behind it.",
    leadMobile: "Vinci360 proposes stories worth promoting from what people say around your trending hashtags, each with its proof.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Take the product tour", href: "/product-tour" },
  },
  personas: {
    title: "Who opens this page",
    items: [
      { icon: Megaphone, title: "Communications teams", text: "Proof points from what customers actually say." },
      { icon: PenLine, title: "Content teams", text: "Ideas grounded in observed conversation, not guesses." },
      { icon: Flag, title: "Campaign managers", text: "Campaign angles your audience is already warming to." },
    ] satisfies Benefit[],
  },
  steps: {
    title: "How to use it",
    items: [
      { title: "Set dates, topics and your evidence bar", text: "Decide how much proof an idea needs." },
      { title: "Open a suggestion and check its posts", text: "Read the proof before you commit.", dark: true },
      { title: "Accept and export to your calendar", text: "Keep the best, schedule them, move on." },
    ],
  },
  outcomes: {
    title: "What it does for your brand",
    items: [
      { icon: Sparkles, title: "Find angles grounded in real conversation", text: "Ideas come from what your audience is already saying." },
      { icon: ShieldCheck, title: "Show proof for every idea", text: "Volume, engagement, tone and real posts, attached." },
      { icon: Clock, title: "Spend less time hunting for what to post", text: "A ranked shortlist instead of a blank page." },
    ] satisfies Benefit[],
  },
  related: {
    title: "Works with the rest of Vinci360",
    items: [
      { accent: "trends", label: "Trends", prompt: "Start from what is rising.", href: "/features/trends", linkLabel: "Explore Trends" },
      { accent: "sent", label: "Sentiment & Keywords", prompt: "Check the tone before you promote.", href: "/features/sentiment-keywords", linkLabel: "Explore Sentiment & Keywords" },
      { accent: "reports", label: "Reports & Alerts", prompt: "Share the shortlist on a schedule.", href: "/features/reports-alerts", linkLabel: "Explore Reports & Alerts" },
    ],
  },
  cta: {
    title: "See what your own audience is giving you to promote.",
    lead: "Leave your work email and we will show you story ideas drawn from your own conversation.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} satisfies FeaturePageConfig

/* ------------------------------ Shared labels ------------------------------ */
export const storiesLabels = {
  ai: "AI-generated suggestion",
  aiPlural: "AI-generated suggestions",
  candidate: (n: number) => `Story candidate ${n}`,
  posts: "posts",
  eng: "eng.",
  engagements: "engagements",
  positive: "positive",
  accept: "Accept",
  dismiss: "Dismiss",
  viewOriginal: "View original",
}

/* -------------------------------- Hero mock -------------------------------- */
export const storiesHero = {
  chrome: "vinci360 · ",
  module: "Promotable Stories",
  stats: { volume: "Volume", engagement: "Engagement", engagementShort: "Engage.", sentiment: "Sentiment" },
  hotspots: [
    { title: "Suggested headline", text: "A starting idea drawn from what people are posting." },
    { title: "Evidence", text: "How many posts, how much engagement, and how people feel." },
  ],
  float: "3 sample posts support this idea",
  caption:
    "Sample Promotable Stories page with two story candidates. The first, “Night-mode photos fans can’t stop sharing”, is built from #AuroraNights and #ShotOnX2 with 3,420 posts, 214K engagements and 81% positive sentiment, and has Accept and Dismiss buttons.",
}

/* ------------------------------- Flow diagram ------------------------------ */
export const storiesFlow = {
  title: "From monitoring to material",
  steps: [
    { title: "Trending hashtags", text: "What is gaining speed around your brand." },
    { title: "The conversations behind them", text: "The real posts that use those tags." },
    { title: "A story candidate with its evidence", text: "A suggested angle, with the numbers behind it." },
    { title: "You decide", text: "Accept, dismiss or export. Nothing is published for you." },
  ],
  quote: "“Took this at 11 PM, no tripod.”",
  chip: "Story candidate",
  actions: ["✓ Accept", "Dismiss", "Export to calendar"],
  note: "Suggestions come from what people are actually saying, never from guesswork.",
}

/* ------------------------------ Review section ----------------------------- */
export const storiesReview = {
  chip: "Try it",
  title: "Review a story candidate",
  lead: "Pick a suggestion, check its proof, then decide.",
  leadMobile: "Swipe the cards, tap one to open its proof.",
  listLabel: "Story candidates",
  candidateOf: (n: number, total: number) => `Candidate ${n} of ${total}`,
  priority: (p: string) => `Priority: ${p}`,
  headline: "Suggested headline",
  builtFrom: "Built from",
  evidence: { volume: "Volume", engagement: "Engagement", reach: "Reach *", sentiment: "Sentiment" },
  postsDelta: "posts",
  pts: (n: number) => `${n} ${n === 1 ? "pt" : "pts"}`,
  split: (p: number, u: number, g: number) => `▲ ${p}% positive · – ${u}% neutral · ▼ ${g}% negative`,
  reachShort: "Reach is an estimate",
  representative: "Representative posts",
  supporting: (n: number) => `${n} supporting posts`,
  supportingInline: (n: number) => `${n} supporting`,
  showAll: (n: number) => `Show all ${n} supporting posts`,
  hideAll: "Hide extra posts",
  andMore: (n: number) => `…and ${n} more supporting posts`,
  inShortlist: "✓ In your shortlist",
  inShortlistShort: "✓ In shortlist",
  dismissed: "Dismissed ·",
  undo: "Undo",
  accepted: "Accepted · in shortlist",
  undoDismiss: "Undo dismiss",
  exportLabel: "Export to content calendar",
  exportShort: "To calendar",
  exported: (date: string) => `Added to calendar · ${date}`,
  shortlistTitle: "Accepted ideas appear in your shortlist",
  shortlistCount: (n: number) => `${n} in shortlist`,
  swipe: "Swipe for more ·",
  close: "Close details",
  trust: "Open any suggestion and you see its proof. You decide what to promote.",
  announce: {
    accepted: (t: string) => `${t} accepted and added to your shortlist.`,
    unaccepted: (t: string) => `${t} removed from your shortlist.`,
    dismissed: (t: string) => `${t} dismissed.`,
    restored: (t: string) => `${t} restored.`,
    exported: (t: string, date: string) => `${t} added to your content calendar for ${date}.`,
    unexported: (t: string) => `${t} removed from your content calendar.`,
  },
}

/* ------------------------------ What you'll see ----------------------------- */
export const storiesWalkthrough = {
  title: "What you’ll see",
  lead: "Four parts of one widget: Hashtag-based generated topics.",
  items: [
    {
      title: "The suggested topic",
      lead: "A headline you could promote, plus the hashtags and keywords it was built from.",
      tells: { label: "What it tells you:", text: "the angle your audience is already giving you, and where it came from." },
      metrics: ["Headline", "Source hashtags", "Keywords"],
      hint: "Click a source hashtag to see its trend.",
      hintMobile: "Tap a source hashtag to see its trend.",
    },
    {
      title: "The evidence",
      lead: "Volume, engagement, reach and sentiment for the idea, each with its change.",
      tells: { label: "What it tells you:", text: "how much real conversation stands behind the suggestion." },
      metrics: ["Volume", "Engagement", "Reach", "Sentiment"],
      hint: "Ideas are ranked by proof, not by opinion.",
      hintIcon: Info,
      insight: true,
    },
    {
      title: "The supporting posts",
      lead: "Representative posts that justify the idea, each one a click away from the original.",
      tells: { label: "What it tells you:", text: "exactly what people said, so you can quote it with confidence." },
      metrics: ["Handle", "Snippet", "Sentiment", "Engagement"],
      hint: "",
    },
    {
      title: "Your decision",
      lead: "Accept it, dismiss it, or send it to your content calendar.",
      tells: { label: "What it tells you:", text: "which ideas your team has agreed to take forward." },
      metrics: ["Accept", "Dismiss", "Export", "Shortlist"],
      hint: "Nothing is published without you.",
      hintIcon: ShieldCheck,
      insight: true,
    },
  ] satisfies WalkthroughItem[],
}

export const storiesWidgets = {
  topic: {
    tagsLabel: "Source hashtags",
    weeks: "· last 8 weeks",
    caption:
      "Suggested topic “Night-mode photos fans can’t stop sharing”, built from #AuroraNights, #ShotOnX2 and #NightModeTips; the selected tag’s trend is shown as a rising line.",
  },
  evidence: {
    title: "Evidence · last 30 days vs previous",
    labels: { volume: "Volume", engagement: "Engagement", reach: "Reach", sentiment: "Sentiment" },
    vsPrev: "vs prev.",
    positivePts: (n: number) => `${n} pts positive`,
    legend: "▲ positive · – neutral · ▼ negative · * estimate",
    hotspot: { title: "Reach is an estimate", text: "Based on audience size and observed amplification." },
    caption: "Evidence for the night-mode story: 3,420 posts up 64%, 214K engagements up 48%, estimated reach 1.8M up 31%, and 81% positive sentiment up 4 points.",
  },
  posts: {
    title: (n: number) => `Supporting posts · ${n}`,
    float: "Open the posts behind the suggestion.",
    caption: "Three positive sample posts about night-mode photos, with engagement counts and View original links.",
  },
  decision: {
    accept: "✓ Accept",
    exportLabel: "Export to content calendar",
    shortlist: "Shortlist",
    exported: (date: string) => `1 exported · ${date}`,
    caption: "Decision panel with Accept, Dismiss and Export to content calendar, and a shortlist sidebar holding two accepted ideas.",
  },
}

/* ------------------------------- Raise the bar ------------------------------ */
export const storiesBar = {
  title: "Raise the bar",
  lead: "Set the bar for proof, and weak suggestions never reach the list.",
  date: {
    label: "Date range",
    options: [
      { value: "today", label: "Today" },
      { value: "7", label: "Last 7 days" },
      { value: "30", label: "Last 30 days" },
      { value: "W", label: "Weekly" },
      { value: "M", label: "Monthly" },
      { value: "Q", label: "Quarterly" },
      { value: "Y", label: "Yearly" },
      { value: "custom", label: "Custom" },
    ],
  },
  platform: "Topic",
  topics: ["Camera", "Launch", "Battery", "Gifting"],
  sentiment: {
    label: "Sentiment",
    options: [
      { value: "pos", label: "Positive (default)" },
      { value: "all", label: "All tones" },
    ],
  },
  category: { label: "Category", options: ["All categories", "Product", "Service", "Industry", "Content"] },
  threshold: "Evidence threshold",
  thresholdShort: (ev: number) => (ev === 0 ? "Off" : `${ev}+`),
  thresholdValue: (ev: number) => (ev === 0 ? "Off · show every idea" : `Evidence score ${ev}+`),
  ends: ["Show everything", "Strong proof only"],
  minVolume: "Minimum volume",
  minEngagement: "Minimum engagement",
  pass: (n: number, total: number) => `${n} of ${total} ideas pass your bar`,
  passMobile: (total: number) => `of ${total} ideas pass your bar`,
  sentimentMobile: "Sentiment:",
  columns: "Columns: idea · volume · engagement · evidence score",
  scoreLabel: "Evidence score",
  why: {
    platform: "No topic selected: the Topic filter removed every idea. Pick at least one topic.",
    engagement: (n: string) => `The minimum engagement of ${n} removed every idea. Lower it to see suggestions.`,
    volume: (n: string) => `The minimum volume of ${n} posts removed every idea. Lower it to see suggestions.`,
    threshold: "The evidence threshold removed every idea. Lower it to see suggestions.",
  },
  aside: {
    title: "It tells you why",
    text: "If a filter leaves the list empty, Vinci360 says which filter caused it. Try a minimum volume of 5,000.",
  },
}

/* ------------------------- Steps and related thumbnails ------------------------ */
export const storiesSteps = {
  filters: ["Last 30 days", "All topics"],
  bar: (n: number) => `Evidence bar: ${n}`,
  quotes: ["“No tripod. Unreal.”", "“Beats my old camera.”"],
  accept: "✓ Accept",
  added: (date: string) => `Added to calendar · ${date}`,
}
