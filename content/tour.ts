/** Product tour copy, verbatim from design-ref Tour.dc.html (1440) and TourMobile.dc.html (390). Numbers live in sample-data.ts. */
import { LayoutGrid, Target, Users, type LucideIcon } from "lucide-react"

import type { Accent } from "@/content/navigation"
import type { Network } from "@/content/sample-data"

export type TourHotspot = { title: string; text: string }

/** A filter chip in the frame's filter bar. `mobile: false` hides it at 390, as in TourMobile. */
export type TourFilter = { label: string; value: string; mobileLabel?: string; mobile?: boolean }

export type TourStep = {
  n: number
  /** Rail and focus heading. */
  title: string
  /** Mobile step chip. */
  short: string
  sub: string
  area: string
  accent: Accent
  /** Module name in the frame chrome and page header. */
  module: string
  time: string
  seeing: string
  tries: string[]
  why: string
  /** Screen-reader figcaption describing the mock. */
  alt: string
  hotspots: [TourHotspot, TourHotspot, TourHotspot]
  filters: TourFilter[]
}

export type TourModule = { name: string; step: number; channel?: Network }

const steps: TourStep[] = [
  {
    n: 1,
    title: "Where do we stand?",
    short: "Where do we stand?",
    sub: "Your share vs Nimbus and Kestrel",
    area: "Brand Compare",
    accent: "cmp",
    module: "Brand Compare Analysis",
    time: "2 min",
    seeing: "Your share of the conversation next to Nimbus and Kestrel. Aurora leads on mentions, but Nimbus earns more engagement.",
    tries: ["Switch Metric to Engagement in the filter bar", "Change the date range to Last 7 days"],
    why: "You know which competitor to watch, and on which measure, before your next planning meeting.",
    alt: "Sample Brand Compare page for Aurora Mobile vs Nimbus and Kestrel: a share-of-voice donut totalling 100%, an indexed comparison against a category average of 100, weekly gap-trend lines and a figure table.",
    hotspots: [
      { title: "Share of voice", text: "Your slice of the category conversation, adding up to 100% with your competitors." },
      { title: "Trend of the gap", text: "Whether your lead is growing or shrinking week by week." },
      { title: "Figure table", text: "The exact numbers behind every chart, ready to export." },
    ],
    filters: [
      { label: "Own brand", value: "Aurora Mobile", mobile: false },
      { label: "Competitor set", mobileLabel: "Competitors", value: "Nimbus, Kestrel" },
      { label: "Platform", value: "All", mobile: false },
      { label: "Metric", value: "" },
      { label: "Granularity", value: "Weekly" },
    ],
  },
  {
    n: 2,
    title: "What is being said about us?",
    short: "What is said?",
    sub: "Every mention, one view",
    area: "Social Media Intelligence",
    accent: "smi",
    module: "Social Media Intelligence",
    time: "2 min",
    seeing: "Every mention of Aurora across four networks, with headline numbers on top. Saturday’s spike lines up with a dip in sentiment.",
    tries: ["Click Saturday on the timeline to filter the feed", "Switch the date range to Last 7 days"],
    why: "You spot a problem the day it starts, not when it shows up in a monthly report.",
    alt: "Sample Social Media Intelligence page: five KPI cards with change and sparklines, a weekly mention timeline with a sentiment line that dips on Saturday, platform breakdown led by Instagram, a sentiment split of 54% positive, 28% neutral and 18% negative, and an article feed.",
    hotspots: [
      { title: "KPI row", text: "Your headline numbers and how they moved since last period." },
      { title: "Timeline spike", text: "Saturday’s spike came with a sentiment dip. Click it to see why." },
      { title: "Article feed", text: "The real posts behind every number, each with its sentiment." },
    ],
    filters: [
      { label: "Brand", value: "Aurora Mobile" },
      { label: "Platform", value: "All" },
      { label: "Sentiment", value: "All" },
      { label: "Keyword", value: "Any" },
    ],
  },
  {
    n: 3,
    title: "What is rising right now?",
    short: "What is rising?",
    sub: "Topics by speed of growth",
    area: "Trends",
    accent: "trends",
    module: "Trending Topics",
    time: "1 min",
    seeing: "Topics ranked by how fast they are growing, not just how big they are. Night photography is climbing fastest.",
    tries: ["Select “Battery & charging” in the scoreboard", "Check who owns that topic in the compare strip"],
    why: "You can join a rising conversation while it still matters.",
    alt: "Sample Trending Topics page: a scoreboard of five topics with rank movement and momentum scores, a detail panel for the selected topic with hashtags, product categories and sentiment, a topic cloud marked by sentiment, and a compare strip against Nimbus and Kestrel.",
    hotspots: [
      { title: "Scoreboard row", text: "Momentum out of 100 and how the rank moved since yesterday." },
      { title: "Topic cloud", text: "Size is volume; the mark and colour show the mood." },
      { title: "Compare strip", text: "How much of this topic belongs to you vs competitors." },
    ],
    filters: [
      { label: "Brand", value: "Aurora Mobile" },
      { label: "Platform", value: "All" },
      { label: "Sort", value: "Momentum" },
    ],
  },
  {
    n: 4,
    title: "Where is the tone turning?",
    short: "Tone turning?",
    sub: "Sentiment by platform and tag",
    area: "Sentiment Analysis",
    accent: "sent",
    module: "Sentiment Analysis",
    time: "2 min",
    seeing: "Overall sentiment looks healthy, but Instagram and the #BrightNights campaign tag are slipping. The threshold flags anything below your line.",
    tries: ["Drag the threshold slider to 20", "Switch to Last 7 days to see if it is getting worse"],
    why: "You catch the problem before it pulls down the headline number.",
    alt: "Sample Sentiment Analysis page: overall net sentiment that looks healthy, 100% stacked sentiment bars per platform with net scores where Instagram is slipping, a hashtag-wise list where the #BrightNights campaign tag is falling, and a sentiment threshold slider.",
    hotspots: [
      { title: "Slipping platform", text: "Instagram’s net sentiment fell the most since last period." },
      { title: "Slipping campaign tag", text: "#BrightNights is losing goodwill even as volume grows." },
      { title: "Threshold slider", text: "Set the line; anything below it is flagged for you." },
    ],
    filters: [
      { label: "Brand", value: "Aurora Mobile" },
      { label: "Platform", value: "All" },
      { label: "Compare", value: "Previous period" },
    ],
  },
  {
    n: 5,
    title: "How is our campaign term performing?",
    short: "Campaign term",
    sub: "One keyword, every widget",
    area: "Keyword Analysis",
    accent: "sent",
    module: "Keyword Analysis",
    time: "1 min",
    seeing: "One keyword, the “Bright Nights” campaign line, on every widget. It is loved on YouTube but barely noticed, and slightly negative, on X.",
    tries: ["Switch the date range to Last 7 days", "Check which categories the campaign is linked with"],
    why: "You know where to put the next round of campaign spend.",
    alt: "Sample Keyword Analysis page for the fictional campaign line “Bright Nights”: KPI cards, platform breakdown showing YouTube strongest and X weakest, sentiment bars, articles, hashtag-wise sentiment, a category graph led by Camera, trending hashtags and topics.",
    hotspots: [
      { title: "Platform breakdown", text: "Strong on YouTube, weak and slightly negative on X." },
      { title: "Hashtag sentiment", text: "Which campaign tags people like, and which they don’t." },
      { title: "Category graph", text: "The product lines the campaign is being linked with." },
    ],
    filters: [
      { label: "Keyword", value: "“Bright Nights”" },
      { label: "Platform", value: "All" },
      { label: "Language", value: "All" },
    ],
  },
  {
    n: 6,
    title: "What is worth promoting?",
    short: "Worth promoting?",
    sub: "Story ideas with evidence",
    area: "Promotable Stories",
    accent: "stories",
    module: "Promotable Stories",
    time: "1 min",
    seeing: "Story ideas drawn from posts people are already sharing. Each one shows the evidence behind it.",
    tries: ["Raise the evidence threshold to 1,000 posts", "Click “Add to content calendar”"],
    why: "Your content team starts from proof, not guesswork.",
    alt: "Sample Promotable Stories page: an evidence threshold control, an expanded AI-generated story candidate with suggested headline, source hashtags and keywords, volume, engagement, reach and sentiment, three sample posts and Accept, Dismiss and Add to content calendar buttons, plus three more candidates.",
    hotspots: [
      { title: "Suggested headline", text: "A starting idea for your content team, drawn from real posts." },
      { title: "Evidence numbers", text: "How many posts, how much engagement and reach, and the mood." },
      { title: "Sample posts", text: "Real examples you can point to when you pitch the idea." },
    ],
    filters: [
      { label: "Brand", value: "Aurora Mobile" },
      { label: "Status", value: "New" },
      { label: "Sentiment", value: "Positive" },
    ],
  },
  {
    n: 7,
    title: "What arrives without us asking?",
    short: "Arrives on its own",
    sub: "Reports and alerts",
    area: "Reports & Alerts",
    accent: "reports",
    module: "SMA Reports",
    time: "1 min",
    seeing: "A keyword-wise weekly brief and an alert rule, set once and delivered on their own.",
    tries: ["Switch the period to Monthly", "Change the report type to Entity-wise"],
    why: "The right people get the right numbers without anyone logging in.",
    alt: "Sample Reports and Alerts page: a keyword-wise report preview with period-on-period change and sentiment, report settings for type, period and output, an alert rule for negative mentions rising 30% in a day, and an email delivery preview.",
    hotspots: [
      { title: "Report preview", text: "Each keyword’s volume, change vs last period and mood." },
      { title: "Schedule control", text: "Daily, weekly or monthly, on screen, PDF, Excel or email." },
      { title: "Alert rule", text: "You hear about a jump in negative mentions the same day." },
    ],
    filters: [
      { label: "Brand", value: "Aurora Mobile" },
      { label: "Recipients", value: "Brand team" },
    ],
  },
]

export const tourPage = {
  meta: {
    title: "Product tour",
    description:
      "Take the vinci360° product tour as the brand manager at Aurora Mobile: seven guided steps from brand compare and trends to sentiment, stories and reports.",
  },
  hero: {
    chip: "Product tour · about 15 minutes",
    title: "Take the tour as the brand manager at Aurora Mobile.",
    leadStart: "Follow one story in seven steps, from where you stand",
    leadDesktop: " against competitors",
    leadEnd: " to the report that arrives on its own.",
    guided: { label: "Start the guided tour", href: "#step-1" },
    free: { label: "Explore freely", href: "#explore" },
    sample: "Sample data",
    sampleNote: "Nothing here is a real brand.",
  },
  stage: {
    label: "Interactive product tour",
    stepsLabel: "Tour steps",
    modulesLabel: "Modules",
    progressLabel: "Tour progress",
    stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
    duration: "about 15 min",
    exploreFreely: "Explore freely",
    backToGuided: "Back to guided tour",
    allModules: "All modules",
    completed: "Completed: ",
    freeBanner: { strong: "Free explore.", text: " Pick any module on the left; hover or focus the numbered dots to learn what each widget tells you." },
    seeing: "What you’re seeing",
    tryThis: "Try this",
    why: "Why it matters for your brand",
    whyShort: "Why it matters:",
    back: "Back",
    next: "Next step",
    lastCta: { label: "Request a demo", href: "/request-demo" },
    tip: "Tip: use ← → keys to move between steps",
    swipe: "Swipe the dashboard sideways to see more",
    scrollRegion: "Dashboard, scroll sideways",
    nudge: "Click here",
    savedView: "Saved view:",
    savedViewName: "Weekly review",
    rangeLabel: (range: string) => `Date window: ${range}. Click to switch.`,
    filterLabel: (label: string, value: string) => `${label}: ${value}. Click to change.`,
  },
  steps,
  /** Free explore: every module, mapped to the step that shows it. */
  menu: [
    { area: "Social Media Intelligence", accent: "smi", modules: [{ name: "Social Media Intelligence", step: 2 }] },
    { area: "Trends", accent: "trends", modules: [{ name: "Trending Topics", step: 3 }, { name: "Trending Hashtags", step: 3 }] },
    { area: "Sentiment & Keywords", accent: "sent", modules: [{ name: "Sentiment Analysis", step: 4 }, { name: "Keyword Analysis", step: 5 }] },
    { area: "Brand Compare", accent: "cmp", modules: [{ name: "Brand Compare Analysis", step: 1 }] },
    { area: "Promotable Stories", accent: "stories", modules: [{ name: "Promotable Stories", step: 6 }] },
    { area: "Reports & Alerts", accent: "reports", modules: [{ name: "SMA Reports", step: 7 }] },
    {
      area: "Channel Analysis",
      accent: "channels",
      modules: [
        { name: "Facebook analysis", step: 2, channel: "facebook" },
        { name: "YouTube analysis", step: 2, channel: "youtube" },
        { name: "Instagram analysis", step: 2, channel: "instagram" },
        { name: "X analysis", step: 2, channel: "x" },
      ],
    },
  ] as { area: string; accent: Accent; modules: TourModule[] }[],

  /** Strings used inside the step mocks. */
  mocks: {
    compare: {
      sov: "Share of voice",
      index: "Indexed vs category average (100)",
      gap: "Trend of the gap",
      gapUnit: "share, % per week",
      total: "Total 100%",
      columns: ["Brand", "Mentions", "Engagement", "Net sentiment"],
      columnsMobile: ["Brand", "Mentions", "Engagement", "Net sent."],
      share: "Share",
      metrics: { mentions: "Mentions", engagement: "Engagement" },
      insight: (gap: number) => `Nimbus is ahead on engagement by ${gap} pts`,
      insightMeta: "Insight",
    },
    smi: {
      week: "This week · click a day to filter the feed",
      mentions: "Mentions",
      net: "Net sentiment",
      platforms: "Platform breakdown",
      sentiment: "Sentiment",
      feed: "Article feed",
      latest: "latest posts",
      filtered: (day: string) => `filtered to ${day}`,
      clear: "Clear day filter",
      dayLabel: (day: string, mentions: string, net: number) => `${day}: ${mentions} mentions, net sentiment +${net}. Filter feed.`,
      engagements: "engagements",
    },
    trends: {
      scoreboard: "Scoreboard · select a topic",
      rank: "Rank vs yesterday",
      columns: ["#", "Move", "Topic", "Mentions", "Momentum"],
      selected: "Selected topic",
      hashtags: "Hashtags",
      categories: "Product categories",
      sentiment: "Sentiment",
      cloud: "Topic cloud",
      compare: (topic: string) => `Compare · who owns “${topic}”`,
    },
    sentiment: {
      overall: "Overall net sentiment",
      healthy: "Looks healthy at a glance.",
      threshold: "Sentiment threshold",
      below: (n: number) => `net below +${n}`,
      flagged: (n: number) => `${n} ${n === 1 ? "platform" : "platforms"} flagged below your line`,
      byPlatform: "Sentiment by platform",
      legend: ["▲ Pos", "– Neu", "▼ Neg (hatched)"],
      net: "Net",
      flag: "⚑ Below threshold",
      hashtags: "Hashtag-wise sentiment",
      float: { network: "Instagram", metric: "Net sentiment", vs: "vs last period" },
    },
    keyword: {
      keyword: "Keyword",
      line: "Campaign line",
      platforms: "Platform breakdown",
      strongest: "Strongest:",
      weakest: "Weakest:",
      net: "net",
      sentiment: "Sentiment",
      articles: "Articles",
      hashtags: "Hashtag-wise sentiment",
      categories: "Category graph",
      trending: "Trending hashtags",
      topics: "Topics",
    },
    stories: {
      evidence: "Evidence threshold",
      min: (n: string) => `min. ${n} posts`,
      showing: (n: number, total: number) => `Showing ${n} of ${total} candidates`,
      candidate: "Story candidate 1",
      ai: "AI-generated suggestion",
      headline: "Suggested headline",
      sources: "Sources:",
      stats: { volume: "Volume", engagement: "Engagement", reach: "Reach *", sentiment: "Sentiment", positive: "positive" },
      accept: "Accept",
      dismiss: "Dismiss",
      calendar: "Add to content calendar",
      decisions: {
        accepted: "✓ Accepted. Your content team will see it in their queue.",
        dismissed: "✕ Dismissed. It won’t be suggested again this month.",
        calendar: "✓ Added to the content calendar for Fri 17 Oct.",
      },
      more: "More candidates",
      meta: (posts: string) => `${posts} posts · ▲ positive`,
      below: "Below threshold · hidden from team",
    },
    reports: {
      settings: "Report settings",
      type: "Report type",
      types: { keyword: "Keyword-wise", entity: "Entity-wise" },
      columnName: { keyword: "Keyword", entity: "Entity" },
      mentions: "Mentions",
      sentiment: "Sentiment",
      open: "Open full report →",
      period: "Period",
      periods: { daily: "Daily", weekly: "Weekly", monthly: "Monthly" },
      output: "Output",
      outputs: { screen: "On-screen", pdf: "PDF", excel: "Excel", email: "Email" },
      noOutput: "No output selected",
      rule: { title: "Alert rule", on: "On", onLabel: "Rule is on", when: "Notify me when", metric: "negative mentions", verb: "rise", threshold: "30%", tail: "in a day." },
      delivery: "Delivery preview:",
      to: "to Brand team",
    },
  },

  trace: {
    title: "Every number can be traced",
    items: [
      { id: "point", text: "Click a chart point to see the posts behind it." },
      { id: "filter", text: "Change a filter and every widget updates together." },
      { id: "export", text: "Export any widget to Excel or CSV, any page to PDF." },
    ],
  },
  after: {
    title: "After the tour",
    items: [
      { icon: Target, tone: "trends", title: "Request a demo on your own brand", text: "See these same pages with your brand and your competitors.", action: { label: "Request a demo", href: "/request-demo", variant: "default" } },
      { icon: LayoutGrid, tone: "primary", title: "See all features", text: "The full module map, with every widget explained.", action: { label: "Features overview →", href: "/features", variant: "outline" } },
      { icon: Users, tone: "primary", title: "Explore by role", text: "How brand, PR, agency and leadership teams use Vinci360.", action: { label: "Solutions →", href: "/solutions", variant: "outline" } },
    ] as { icon: LucideIcon; tone: "trends" | "primary"; title: string; text: string; action: { label: string; href: string; variant: "default" | "outline" } }[],
  },
  cta: {
    title: "Run this tour on your own brand.",
    lead: "Leave your work email and we will set it up with your brand and competitors.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
}
