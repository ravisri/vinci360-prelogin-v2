/**
 * Sample data for every mock and illustration. Fictional brand Aurora Mobile vs Nimbus and Kestrel.
 * Values are copied verbatim from /design-ref. The references are not consistent with each other
 * (share of voice, competitor totals, platform split…), so data is grouped by the page whose
 * reference it comes from. Never "fix" a value here without checking the reference first.
 *
 * Main.dc.html and Features.dc.html name the third brand "Vertex Devices"; CLAUDE.md §7 limits
 * competitors to Nimbus and Kestrel, so it is renamed to Kestrel with the reference values kept.
 */

export type Trend = "up" | "down" | "flat"
export type Sentiment = "pos" | "neu" | "neg"
export type Network = "facebook" | "x" | "youtube" | "instagram"

/** Positive / neutral / negative shares in %. */
export type Split = readonly [pos: number, neu: number, neg: number]

export type Kpi = {
  label: string
  value: number
  display: string
  delta: string
  trend: Trend
}

export const sampleDataLabel = "Sample data"
export const reachNote = "* Reach is an estimate based on audience size and observed amplification."

export const brands = {
  aurora: { name: "Aurora Mobile", short: "Aurora" },
  nimbus: { name: "Nimbus", short: "Nimbus" },
  kestrel: { name: "Kestrel", short: "Kestrel" },
} as const

export const networks: Record<Network, string> = {
  facebook: "Facebook",
  x: "X",
  youtube: "YouTube",
  instagram: "Instagram",
}

/* --------------------------------------------------------------------------
   Shared: the 30-day Aurora Mobile KPIs (Main, Features, SMI, Compare, Tour)
   -------------------------------------------------------------------------- */
export const kpis30d = {
  mentions: { label: "Mentions", value: 48214, display: "48,214", delta: "18.4% vs prev.", trend: "up" },
  engagement: { label: "Engagement", value: 1920000, display: "1.92M", delta: "9.6% vs prev.", trend: "up" },
  reach: { label: "Reach", value: 12400000, display: "12.4M", delta: "6.1% vs prev.", trend: "up" },
  posts: { label: "Posts", value: 9861, display: "9,861", delta: "3.2% vs prev.", trend: "up" },
  sentiment: { label: "Sentiment score", value: 62, display: "62/100", delta: "3 pts vs prev.", trend: "down" },
} satisfies Record<string, Kpi>

/* --------------------------------------------------------------------------
   Source-agnostic overview (Brand24-style KPIs). No network is named or split out.
   Positive / negative counts are kpis30d.mentions × home.dashboard.sentimentSplit (54 / 18 %).
   -------------------------------------------------------------------------- */
export type OverviewKpi = Kpi & {
  key: "mentions" | "reach" | "interactions" | "positive" | "negative"
  /** Delta colour when the direction and its meaning differ (negative mentions ▲ = bad). */
  tone?: Sentiment
}

export const overview = {
  range: "Last 30 days",
  kpis: [
    { key: "mentions", ...kpis30d.mentions },
    { key: "reach", ...kpis30d.reach, label: "Social media reach" },
    { key: "interactions", ...kpis30d.engagement, label: "Interactions" },
    { key: "positive", label: "Positive mentions", value: 26036, display: "26,036", delta: "12.1% vs prev.", trend: "up", tone: "pos" },
    { key: "negative", label: "Negative mentions", value: 8679, display: "8,679", delta: "31.0% vs prev.", trend: "up", tone: "neg" },
  ] as readonly OverviewKpi[],
  alert: { label: "Alert · just now", text: "Mentions +212% vs normal" },
} as const

/** Weekly snapshot "5–11 Oct" (Main, Reports, Solutions, Tour 7d). */
export const weekly = {
  range: "5–11 Oct",
  mentions: { label: "Mentions", value: 11382, display: "11,382", delta: "12%", trend: "up" },
  engagement: { label: "Engagement", value: 446000, display: "446K", delta: "7%", trend: "up" },
  netSentiment: { label: "Net sentiment", value: 24, display: "+24", delta: "2 pts", trend: "down" },
  insight: "Instagram drove 38% of mentions this week.",
} as const

/** Sentiment by platform, pos/neu/neg % (Main, Features, SMI, Sentiment, Tour). */
export const sentimentByPlatform: Record<Network, Split> = {
  facebook: [52, 30, 18],
  x: [38, 34, 28],
  youtube: [57, 29, 14],
  instagram: [41, 27, 32],
}

/** Keyword-wise report rows "5–11 Oct" (Features, Reports, Tour). */
export const keywordReport = [
  { keyword: "charging", mentions: 3104, display: "3,104", change: "41%", trend: "up", sentiment: "neg", engagement: "96K" },
  { keyword: "night mode", mentions: 2288, display: "2,288", change: "18%", trend: "up", sentiment: "pos", engagement: "142K" },
  { keyword: "price", mentions: 1512, display: "1,512", change: "6%", trend: "down", sentiment: "neu", engagement: "38K" },
  { keyword: "store", mentions: 640, display: "640", change: "9%", trend: "up", sentiment: "pos", engagement: "21K" },
] as const

/** Lead promotable story (Main, Features, Stories, Solutions). */
export const leadStory = {
  title: "Night-mode photos fans can't stop sharing",
  volume: { value: 3420, display: "3,420", unit: "posts" },
  engagement: { value: 214000, display: "214K", unit: "interactions" },
  positive: 81,
  reach: "1.8M",
  peak: "Sat 9 PM · 1,180 posts/hr",
  evidence: "Evidence threshold met · 3,420 posts (min. 500)",
} as const

/* --------------------------------------------------------------------------
   Home (Main.dc.html, Mobile.dc.html)
   -------------------------------------------------------------------------- */
export const home = {
  dashboard: {
    title: "Social Media Intelligence",
    brand: "Aurora Mobile",
    filters: ["Last 30 days", "All platforms", "All sentiment"],
    kpis: [kpis30d.mentions, kpis30d.engagement, kpis30d.reach, kpis30d.posts, kpis30d.sentiment],
    /** KPI sparklines in the same order as `kpis` (shape only, 0–24 plot units). */
    sparks: [
      [4, 6, 5, 9, 8, 12, 11, 15, 14, 19, 22],
      [6, 7, 6, 9, 10, 9, 12, 13, 12, 15, 17],
      [8, 8, 9, 10, 9, 11, 12, 12, 13, 14, 15],
      [10, 11, 10, 12, 11, 12, 13, 12, 13, 14, 14],
      [18, 17, 18, 16, 17, 15, 14, 15, 12, 11, 10],
    ],
    volumeAxis: ["13 Sep", "21 Sep", "1 Oct", "12 Oct"],
    spikeNote: "Spike: charging complaints",
    /** 30 daily points read off the reference SVG (plot units, 0–200 scale, not counts). */
    volumeSeries: [60.5, 68, 64.2, 71.8, 83, 80.5, 76.8, 85.5, 95.5, 90.5, 88, 98, 108, 103, 100.5, 94.2, 99.2, 118, 183, 158, 126.8, 115.5, 110.5, 106.8, 113, 120.5, 116.8, 123, 128, 134.2],
    netSentimentSeries: [142.8, 138.6, 147, 134.4, 130.2, 138.6, 151.2, 142.8, 134.4, 138.6, 147, 142.8, 138.6, 130.2, 134.4, 142.8, 138.6, 117.6, 46.2, 71.4, 100.8, 113.4, 121.8, 126, 130.2, 126, 134.4, 130.2, 134.4, 134.4],
    spikeIndex: 18,
    sentimentSplit: [54, 28, 18] as Split,
    platformShare: [
      { network: "instagram", share: 38 },
      { network: "x", share: 27 },
      { network: "facebook", share: 21 },
      { network: "youtube", share: 14 },
    ] as { network: Network; share: number }[],
    feedPost: { handle: "@riya.k", initials: "RK", time: "2 min ago", sentiment: "neg" as Sentiment, engagement: "2.4K" },
    alert: { label: "Alert · just now", text: "Mentions +212% vs normal", network: "instagram" as Network },
  },
  snapshot: {
    label: "This week · Aurora Mobile",
    mentions: weekly.mentions,
    engagement: weekly.engagement,
    netSentiment: weekly.netSentiment,
    peakDay: "Sat",
    /** Mentions per day, Mon–Sun: relative bar heights read off the reference SVG (not counts). */
    daily: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], short: ["M", "T", "W", "T", "F", "S", "S"], values: [48, 56, 52, 64, 70, 92, 74], peak: 5 },
    feed: [
      { network: "youtube", text: "“X2 night mode review — honestly stunning.”", short: "“X2 night mode review, stunning.”", sentiment: "pos" },
      { network: "x", text: "“Aurora store opening in Pune this weekend.”", short: null, sentiment: "neu" },
      { network: "facebook", text: "“Charger died again after the update.”", short: "“Charger died again after the update.”", sentiment: "neg" },
    ] as { network: Network; text: string; short: string | null; sentiment: Sentiment }[],
  },
  risingTopics: {
    label: "Rising topics · last 24h",
    rows: [
      { rank: 1, topic: "#AuroraX2Launch", score: 94, move: 2, trend: "up" },
      { rank: 2, topic: "#SampleTag", score: 91, move: 9, trend: "up" },
      { rank: 3, topic: "Battery life", score: 82, move: 1, trend: "up" },
      { rank: 4, topic: "Camera night mode", score: 74, move: 1, trend: "down" },
      { rank: 5, topic: "Price drop", score: 63, move: 0, trend: "flat" },
    ] as { rank: number; topic: string; score: number; move: number; trend: Trend }[],
    callout: { tag: "#SampleTag", growth: "+184%", text: "growth in mentions, last 24 hours" },
    /** Reference colours map to mood: orange/blue/purple tags read as positive, the rest neutral. */
    cloud: [
      { term: "#AuroraX2Launch", weight: 18, sentiment: "pos", mobile: 15 },
      { term: "#SampleTag", weight: 15, sentiment: "neu", mobile: 13 },
      { term: "#NightMode", weight: 12, sentiment: "neu", mobile: 11 },
      { term: "#ShotOnX2", weight: 14, sentiment: "pos", mobile: null },
      { term: "#FastCharge", weight: 12, sentiment: "neu", mobile: null },
      { term: "#AuroraNights", weight: 16, sentiment: "pos", mobile: 13 },
      { term: "#Unboxing", weight: 12, sentiment: "neu", mobile: null },
    ] as { term: string; weight: number; sentiment: Sentiment; mobile: number | null }[],
  },
  sentiment: {
    byPlatform: sentimentByPlatform,
    topNegativeKeywords: ["charging", "support ticket", "update"],
    callout: { network: "instagram" as Network, label: "Instagram · this week", metric: "Net sentiment", delta: "−12 pts", trend: "down" as Trend, driver: "Main driver: “charging”" },
  },
  shareOfVoice: {
    label: "Share of voice · 8 weeks",
    current: { aurora: 42, nimbus: 33, kestrel: 25 },
    trend: { aurora: [38, 44], nimbus: [35, 31], kestrel: [27, 25] },
    /** Weekly share of voice, Wk 33–Wk 40 (8 points per brand, endpoints from the reference). */
    weeks: {
      aurora: [38, 38.5, 39.5, 40, 41, 42, 43, 44],
      nimbus: [35, 34.5, 34.5, 33.5, 33, 32.5, 31.5, 31],
      kestrel: [27, 27, 26.5, 26.5, 26, 25.5, 25.5, 25],
    },
    axis: ["Wk 33", "Wk 40"],
    callout: { label: "Lead over Nimbus", value: "13 pts", delta: "+10 in 8 weeks" },
  },
  story: {
    ...leadStory,
    tags: ["#AuroraNights", "#ShotOnX2", "#NightMode"],
    posts: [
      { initials: "AM", network: "instagram", text: "“Took this at 11 PM with no tripod. Unreal.”" },
      { initials: "JS", network: "x", text: "“Night mode on the X2 beats my old camera.”" },
      { initials: "PN", network: "youtube", text: "“City lights test, 4 shots, zero editing.”" },
    ] as { initials: string; network: Network; text: string }[],
  },
  brief: {
    range: "5–11 Oct",
    mentions: weekly.mentions,
    netSentiment: weekly.netSentiment,
    topRising: { tag: "#AuroraX2Launch", delta: "2 ranks", trend: "up" as Trend },
    insight: weekly.insight,
  },
  alertRule: "When Instagram mentions go above 2× the 7-day average",
}

/* --------------------------------------------------------------------------
   Features overview (Features.dc.html)
   -------------------------------------------------------------------------- */
export const featuresOverview = {
  trendingTopics: [
    { topic: "#AuroraX2Launch", mentions: 6210, score: 94 },
    { topic: "#SampleTag", mentions: 1940, score: 91 },
    { topic: "Battery life", mentions: 4885, score: 82 },
    { topic: "Camera night mode", mentions: 3402, score: 74 },
    { topic: "Price drop", mentions: 2760, score: 63 },
  ],
  keyword: {
    term: "charging",
    mentions: { display: "3,104", delta: "41%", trend: "up" as Trend },
    netSentiment: { display: "−38", delta: "9 pts", trend: "down" as Trend },
    negativeShare: { display: "61%", delta: "worse by 7", trend: "down" as Trend },
    hashtags: [
      { tag: "#ShotOnX2", net: 64 },
      { tag: "#AuroraX2Launch", net: 41 },
      { tag: "#Unboxing", net: 8 },
      { tag: "#ChargerFail", net: -72 },
    ],
  },
  compare: {
    shareOfVoice: { aurora: 42, nimbus: 33, kestrel: 25 },
    indexVsCategory: [
      { metric: "Mentions", aurora: 128, nimbus: 104, kestrel: 68 },
      { metric: "Engagement", aurora: 116, nimbus: 109, kestrel: 75 },
      { metric: "Sentiment", aurora: 112, nimbus: 96, kestrel: 92 },
    ],
  },
  stories: [
    { title: "Night-mode photos fans can't stop sharing", posts: 3420, positive: 81, met: true },
    { title: "Unboxing videos rising in Pune", posts: 1120, positive: 74, met: true },
    { title: "Battery lasts the full trek", posts: 860, positive: 69, met: true },
    { title: "Store staff shout-outs", posts: 410, positive: null, met: false },
  ],
  facebook: {
    pages: [
      { name: "Aurora Mobile India", initials: "AM", followers: "1.2M" },
      { name: "Aurora Care", initials: "AC", followers: "214K" },
      { name: "Aurora Fans Club", initials: "FC", followers: "58K", group: true },
    ],
    reactions: { like: 61, love: 18, wow: 8, haha: 5, sad: 4, angry: 4 },
    growth: "+4.8% this month",
  },
  filterChips: ["Last 30 days", "Instagram", "Negative", "Keyword: charging"],

  /** Hero: 30 daily mention points read off the reference polyline (plot units, 0–140 scale, not counts). */
  heroKpis: [kpis30d.mentions, kpis30d.engagement, kpis30d.reach, kpis30d.sentiment],
  heroSeries: [40.5, 45.2, 42.8, 47.5, 54.5, 53, 50.6, 56, 62.3, 59.2, 57.6, 63.9, 70.1, 67, 65.4, 61.5, 64.6, 76.4, 117.1, 101.4, 81.9, 74.8, 71.7, 69.4, 73.2, 77.9, 75.6, 79.5, 82.6, 86.5],

  /** SMI tab: bars this week (0–120 plot units) and the net sentiment line (0–140), read off the reference SVG. */
  smiWeek: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    short: ["M", "T", "W", "T", "F", "S", "S"],
    volume: [73.7, 80.7, 77.2, 89.1, 93.6, 120, 101.6],
    net: [102.7, 95.3, 99, 80.7, 88, 44, 73.3],
    peak: 5,
  },
  smiKpis: [kpis30d.mentions, kpis30d.engagement, kpis30d.reach, kpis30d.posts, { ...kpis30d.sentiment, label: "Sentiment" }] as Kpi[],
  platformShare: [
    { network: "instagram", share: 38 },
    { network: "x", share: 27 },
    { network: "facebook", share: 21 },
    { network: "youtube", share: 14 },
  ] as { network: Network; share: number }[],
  post: {
    handle: "@riya.k",
    initials: "RK",
    time: "Sat · 9:12 PM",
    network: "instagram" as Network,
    sentiment: "neg" as Sentiment,
    engagement: "2.4K",
    text: "Third Aurora X2 charger this year. Support keeps closing my ticket without a fix.",
  },

  /** Trends tab: rank moves as in Main.dc.html; cloud sizes in px as drawn. */
  topicMoves: [
    { move: 2, trend: "up" },
    { move: 9, trend: "up" },
    { move: 1, trend: "up" },
    { move: 1, trend: "down" },
    { move: 0, trend: "flat" },
  ] as { move: number; trend: Trend }[],
  hashtagCloud: [
    { term: "#AuroraX2Launch", weight: 20, sentiment: "pos" },
    { term: "#SampleTag", weight: 16, sentiment: "pos" },
    { term: "#ChargerFail", weight: 15, sentiment: "neg" },
    { term: "#Unboxing", weight: 13, sentiment: "neu" },
    { term: "#ShotOnX2", weight: 17, sentiment: "pos" },
    { term: "#TechTuesday", weight: 12, sentiment: "neu" },
    { term: "#SupportFail", weight: 13, sentiment: "neg" },
    { term: "#AuroraNights", weight: 14, sentiment: "pos" },
  ] as { term: string; weight: number; sentiment: Sentiment }[],
  growthCallout: { volume: { tag: "#AuroraX2Launch", mentions: "6,210" }, growth: { tag: "#SampleTag", delta: "+184%" } },

  hashtagSentiment: [
    { tag: "#ShotOnX2", net: "+64", sentiment: "pos" },
    { tag: "#AuroraX2Launch", net: "+41", sentiment: "pos" },
    { tag: "#Unboxing", net: "+8", sentiment: "neu" },
    { tag: "#ChargerFail", net: "−72", sentiment: "neg" },
  ] as { tag: string; net: string; sentiment: Sentiment }[],

  /** Channel tab: follower growth read off the reference polyline (0–90 plot units). */
  followerGrowth: [12, 16, 18, 24, 28, 32, 40, 46, 56, 64, 76],
  youtubeSplit: [58, 27, 15] as Split,
  followers: { value: "1.2M", delta: "+4.8% this month" },
}

/* --------------------------------------------------------------------------
   Social Media Intelligence (SMI.dc.html)
   -------------------------------------------------------------------------- */
export const smi = {
  kpis: kpis30d,
  /** Mentions KPI sparkline, read off the reference SVG (24 − y). */
  mentionsSpark: [2, 4, 4.5, 7, 10, 7.4, 4.2, 9.3, 8.5, 7.5, 14.2, 15.5, 20.6, 22],
  netSentiment: 36,
  /** KPI card sparklines in card order (Mentions, Engagement, Reach, Posts, Sentiment score), read off the reference SVGs (24 − y). */
  kpiSparks: [
    [2, 4, 4.5, 7, 10, 7.4, 4.2, 9.3, 8.5, 7.5, 14.2, 15.5, 20.6, 22],
    [3.4, 2, 4.4, 8.6, 10.1, 13.4, 16, 14, 17.3, 19.3, 19.1, 16.7, 20.9, 22],
    [2, 5.1, 7.3, 10.7, 11, 13.7, 14.4, 17.8, 20.9, 19.6, 18.5, 17.8, 21.4, 22],
    [3.4, 2.4, 2.9, 2.6, 2, 3.1, 4.2, 7.7, 9.5, 13.1, 16.2, 20.3, 22, 20],
    [19.7, 15.3, 22, 14.6, 9.3, 16.4, 20, 19.1, 14.2, 19, 15.9, 15.1, 9, 2],
  ],
  /** Timeline by granularity. `spike` is the called-out bar; `full` names each interval for screen readers. */
  timeline: {
    weekly: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], full: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], volume: [1480, 2610, 1720, 1690, 1810, 1950, 1700], net: [26, 6, 18, 22, 24, 25, 23], spike: 1, note: "Spike on Tue · mostly negative" },
    monthly: { labels: ["Wk 37", "Wk 38", "Wk 39", "Wk 40", "Wk 41"], full: ["Week 37", "Week 38", "Week 39", "Week 40", "Week 41"], volume: [9800, 11200, 13900, 12400, 10900], net: [24, 22, 9, 18, 21], spike: 2, note: "Spike in Wk 39 · mostly negative" },
    quarterly: { labels: ["Aug", "Sep", "Oct"], full: ["August", "September", "October"], volume: [41200, 46800, 48214], net: [26, 22, 20], spike: 2, note: "Highest: Oct · tone cooling" },
    yearly: { labels: ["N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O"], full: ["November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October"], volume: [28000, 31000, 35000, 30000, 33000, 36000, 38000, 37000, 40000, 41200, 46800, 48214], net: [30, 29, 28, 30, 31, 29, 27, 28, 26, 26, 22, 20], spike: 11, note: "Highest: Oct · tone cooling" },
  },
  /** "Posts below" the timeline: the spike interval's posts, or the whole period. */
  timelinePosts: {
    spike: [
      { initials: "RK", text: "Third Aurora X2 charger this year. Support keeps closing my ticket.", sentiment: "neg" },
      { initials: "AB", text: "Is anyone else’s X2 charger overheating after the update?", sentiment: "neg" },
    ],
    all: [
      { initials: "MV", text: "X2 night mode review: shot a whole city walk with no tripod.", sentiment: "pos" },
      { initials: "TN", text: "Aurora confirms a new flagship store in Pune.", sentiment: "neu" },
    ],
  } as Record<"spike" | "all", { initials: string; text: string; sentiment: Sentiment }[]>,
  topics: [
    { topic: "Battery & charging", volume: 8420, engagement: "312K", split: [22, 30, 48] as Split },
    { topic: "Night photography", volume: 6980, engagement: "488K", split: [78, 17, 5] as Split },
    { topic: "X2 launch", volume: 6210, engagement: "402K", split: [64, 25, 11] as Split },
    { topic: "Price & offers", volume: 4130, engagement: "148K", split: [40, 45, 15] as Split },
    { topic: "Customer support", volume: 3040, engagement: "96K", split: [18, 32, 50] as Split },
  ],
  platforms: [
    { network: "instagram", mentions: 29890, engagement: "1.11M", share: 62, engagementShare: 58 },
    { network: "x", mentions: 8680, engagement: "173K", share: 18, engagementShare: 9 },
    { network: "facebook", mentions: 6270, engagement: "269K", share: 13, engagementShare: 14 },
    { network: "youtube", mentions: 3374, engagement: "365K", share: 7, engagementShare: 19 },
  ] as { network: Network; mentions: number; engagement: string; share: number; engagementShare: number }[],
  sentiment: { split: [54, 28, 18] as Split, counts: [26036, 13500, 8678], net: "+36" },
  articles: [
    { handle: "@riya.k", initials: "RK", time: "Tue 9:12 PM", network: "instagram", sentiment: "neg", text: "Third Aurora X2 charger this year. Support keeps closing my ticket without a fix.", likes: 1920, comments: 311, shares: 164, views: "48K" },
    { handle: "@meera.v", initials: "MV", time: "Mon 6:40 PM", network: "youtube", sentiment: "pos", text: "X2 night mode review: shot an entire city walk with no tripod.", likes: 8450, comments: 620, shares: 1040, views: "212K" },
    { handle: "@technest", initials: "TN", time: "Mon 11:05 AM", network: "x", sentiment: "neu", text: "Aurora confirms a new flagship store in Pune opening this weekend.", likes: 402, comments: 38, shares: 96, views: "14K" },
  ] as { handle: string; initials: string; time: string; network: Network; sentiment: Sentiment; text: string; likes: number; comments: number; shares: number; views: string }[],
  hashtags: [
    { tag: "#AuroraX2Launch", usage: 4820, reach: "3.4M", growth: 22, sentiment: "pos" },
    { tag: "#ShotOnX2", usage: 3110, reach: "2.1M", growth: 64, sentiment: "pos" },
    { tag: "#ChargerFail", usage: 2460, reach: "1.2M", growth: 184, sentiment: "neg" },
    { tag: "#FestiveDeals", usage: 1980, reach: "0.9M", growth: 12, sentiment: "neu" },
    { tag: "#AuroraNights", usage: 1240, reach: "0.8M", growth: 41, sentiment: "pos" },
  ] as { tag: string; usage: number; reach: string; growth: number; sentiment: Sentiment }[],
  /** Hashtag cloud: font size in px as drawn in the reference, plus mood. */
  hashtagCloud: [
    { term: "#AuroraX2Launch", weight: 20, sentiment: "pos" },
    { term: "#ShotOnX2", weight: 17, sentiment: "pos" },
    { term: "#ChargerFail", weight: 15, sentiment: "neg" },
    { term: "#FestiveDeals", weight: 14, sentiment: "neu" },
    { term: "#AuroraNights", weight: 13, sentiment: "pos" },
    { term: "#SupportFail", weight: 12, sentiment: "neg" },
    { term: "#Unboxing", weight: 12, sentiment: "neu" },
  ] as { term: string; weight: number; sentiment: Sentiment }[],
  topHandles: [
    { handle: "@technest", initials: "TN", followers: "412K", influence: 3 },
    { handle: "@meera.v", initials: "MV", followers: "186K", influence: 3 },
    { handle: "@gadgetdesk", initials: "GD", followers: "94K", influence: 2 },
  ],
}

/* --------------------------------------------------------------------------
   Trends (Trends.dc.html)
   -------------------------------------------------------------------------- */
export const trends = {
  /** Mentions KPI sparkline and #AuroraLaunch usage trend, read off the reference SVGs. */
  mentionsSpark: [4, 6, 5, 10, 9, 14, 16, 18, 22],
  auroraLaunchSpark: [2, 3, 3, 5, 7, 10, 14, 16],
  /** KPI card sparklines in card order (Mentions, Engagement, Reach, Net sentiment), read off the reference SVGs (24 − y). */
  kpiSparks: [
    [4, 6, 5, 10, 9, 14, 16, 18, 22],
    [6, 5, 8, 9, 12, 12, 15, 17, 19],
    [8, 9, 8, 11, 12, 12, 14, 15, 17],
    [18, 19, 17, 18, 16, 15, 16, 14, 13],
  ],
  /**
   * "Big is not the same as rising" bubble chart, in the reference's 520×320 viewBox.
   * `kind` picks the mark style; `label` places the name (dx/dy from the centre, anchor).
   */
  explainer: [
    { topic: "Price & offers", cx: 452, cy: 232, r: 22, kind: "flat", label: { x: 452, y: 226, anchor: "middle" } },
    { topic: "Festive gifting", cx: 140, cy: 44, r: 13, kind: "breakout", label: { x: 160, y: 48, anchor: "start" } },
    { topic: "Night photography", cx: 370, cy: 58, r: 17, kind: "rising", label: { x: 370, y: 92, anchor: "middle" } },
    { topic: "Aurora X2 launch", cx: 420, cy: 104, r: 19, kind: "risingSoft", label: { x: 420, y: 134, anchor: "middle" } },
    { topic: "Battery & charging", cx: 440, cy: 196, r: 20, kind: "muted", label: { x: 400, y: 200, anchor: "end" } },
    { topic: "Low-light video", cx: 110, cy: 116, r: 10, kind: "risingSoft", label: { x: 126, y: 120, anchor: "start" } },
  ] as { topic: string; cx: number; cy: number; r: number; kind: "flat" | "breakout" | "rising" | "risingSoft" | "muted"; label: { x: number; y: number; anchor: "start" | "middle" | "end" } }[],
  kpis: [
    { label: "Mentions", value: 36200, display: "36,200", delta: "21%", trend: "up" },
    { label: "Engagement", value: 1600000, display: "1.6M", delta: "14%", trend: "up" },
    { label: "Reach", value: 20400000, display: "20.4M", delta: "9%", trend: "up" },
    { label: "Net sentiment", value: 31, display: "+31", delta: "2 pts", trend: "down" },
  ] satisfies Kpi[],
  heroCallout: { tag: "#AuroraLaunch", growth: "+184%" },
  topics: [
    { topic: "Night photography", volume: 6980, engagement: "488K", reach: "4.1M", growth: 62, momentum: 94, move: 2, trend: "up", split: [78, 17, 5] },
    { topic: "Aurora X2 launch", volume: 8210, engagement: "402K", reach: "5.6M", growth: 38, momentum: 91, move: 1, trend: "up", split: [64, 25, 11] },
    { topic: "Festive gifting", volume: 2140, engagement: "156K", reach: "1.3M", growth: 146, momentum: 88, move: 9, trend: "up", split: [70, 24, 6], breakout: true },
    { topic: "Battery & charging", volume: 8420, engagement: "312K", reach: "4.8M", growth: 12, momentum: 71, move: 2, trend: "down", split: [22, 30, 48] },
    { topic: "Low-light video", volume: 1320, engagement: "92K", reach: "0.7M", growth: 41, momentum: 64, move: 4, trend: "up", split: [66, 28, 6] },
    { topic: "Price & offers", volume: 9130, engagement: "148K", reach: "3.9M", growth: 3, momentum: 58, move: 0, trend: "flat", split: [38, 24, 38] },
  ] as { topic: string; volume: number; engagement: string; reach: string; growth: number; momentum: number; move: number; trend: Trend; split: Split; breakout?: boolean }[],
  categories: [
    { label: "Smartphones", share: 46, split: [61, 27, 12] as Split },
    { label: "Camera & imaging", share: 24, split: [78, 17, 5] as Split },
    { label: "Accessories", share: 16, split: [24, 30, 46] as Split },
    { label: "Retail & offers", share: 9, split: [38, 24, 38] as Split },
    { label: "Service", share: 5, split: [18, 32, 50] as Split },
  ],
  /** "Topics and hashtags together": sub-topics and attached tags for three trends. */
  breakdowns: {
    night: {
      label: "Night photography",
      subs: [["Low-light portraits", 2310], ["City nights", 1880], ["No-tripod shots", 1460], ["Astro attempts", 820]],
      tags: [["#NightModeTips", "2,940", "1.9M", "142K", 88], ["#ShotOnX2", "2,410", "1.6M", "121K", 41], ["#PhotoOfTheDay", "1,120", "0.4M", "9K", 3]],
    },
    launch: {
      label: "Aurora X2 launch",
      subs: [["Unboxing", 2900], ["Price", 1950], ["Camera specs", 1710], ["Pre-orders", 1240]],
      tags: [["#AuroraLaunch", "4,120", "3.1M", "210K", 184], ["#X2Unboxing", "1,980", "1.2M", "96K", 52], ["#TechNews", "1,450", "0.6M", "7K", 2]],
    },
    gift: {
      label: "Festive gifting",
      subs: [["Gift guides", 820], ["Bundles", 610], ["Delivery times", 390], ["Wrapping", 320]],
      tags: [["#GiftWithAurora", "760", "0.5M", "48K", 210], ["#FestiveDeals", "1,310", "0.8M", "22K", 12], ["#SampleTag", "540", "0.2M", "3K", 1]],
    },
  } as Record<"night" | "launch" | "gift", { label: string; subs: [string, number][]; tags: [tag: string, freq: string, reach: string, engagement: string, growth: number][] }>,
  /** A tag "carries the trend" from this growth % up. */
  carriesFrom: 20,
  topicCloud: (
    [
      ["night mode", "pos", 30], ["launch", "pos", 26], ["charger", "neg", 24], ["price", "neu", 22], ["camera", "pos", 20], ["gift", "pos", 18],
      ["battery", "neg", 18], ["unboxing", "pos", 16], ["offers", "neu", 15], ["support", "neg", 14], ["tripod", "pos", 13], ["delivery", "neu", 12],
    ] as [string, Sentiment, number][]
  ).map(([term, sentiment, weight]) => ({ term, sentiment, weight })),
  /** Aurora · Nimbus · Kestrel per trending topic. `highlight` = the industry-wide trend called out. */
  competitors: [
    { topic: "Night photography", sub: "Aurora-led", mentions: [6980, 4120, 1900], engagementK: [488, 301, 96], net: [73, 58, 40] },
    { topic: "Flagship launches", sub: "Close race", mentions: [8210, 7400, 3100], engagementK: [402, 520, 140], net: [53, 47, 30] },
    { topic: "Festive gifting", sub: "Industry-wide", mentions: [2140, 4860, 1800], engagementK: [156, 402, 98], net: [64, 59, 48], highlight: true },
    { topic: "Battery & charging", sub: "Aurora-heavy, negative", mentions: [8420, 3900, 2700], engagementK: [312, 190, 88], net: [-26, 8, 12] },
  ] as { topic: string; sub: string; mentions: [number, number, number]; engagementK: [number, number, number]; net: [number, number, number]; highlight?: boolean }[],
  /** Platform split order is Instagram · X · YouTube · Facebook, as in the reference's bar. */
  hashtags: [
    { tag: "#AuroraLaunch", usage: 4120, mentions: 6300, engagement: "210K", reach: "3.1M", growth: 184, sentiment: "pos", spark: [2, 3, 3, 5, 7, 10, 14, 16], split: { instagram: 52, x: 28, youtube: 12, facebook: 8 } },
    { tag: "#NightModeTips", usage: 2940, mentions: 4100, engagement: "142K", reach: "1.9M", growth: 88, sentiment: "pos", spark: [4, 5, 5, 6, 8, 9, 10, 12], split: { instagram: 61, x: 14, youtube: 18, facebook: 7 } },
    { tag: "#ShotOnX2", usage: 2410, mentions: 3560, engagement: "121K", reach: "1.6M", growth: 41, sentiment: "pos", spark: [6, 7, 6, 8, 8, 9, 9, 10], split: { instagram: 70, x: 10, youtube: 12, facebook: 8 } },
    { tag: "#ChargerFail", usage: 2280, mentions: 3900, engagement: "64K", reach: "1.1M", growth: 122, sentiment: "neg", spark: [2, 2, 3, 4, 6, 8, 11, 13], split: { instagram: 18, x: 48, youtube: 8, facebook: 26 } },
    { tag: "#FestiveDeals", usage: 1310, mentions: 1980, engagement: "22K", reach: "0.8M", growth: 12, sentiment: "neu", spark: [7, 7, 8, 7, 8, 8, 8, 9], split: { instagram: 30, x: 18, youtube: 8, facebook: 44 } },
    { tag: "#GiftWithAurora", usage: 760, mentions: 1020, engagement: "48K", reach: "0.5M", growth: 210, sentiment: "pos", spark: [1, 1, 2, 2, 4, 6, 9, 12], split: { instagram: 64, x: 10, youtube: 6, facebook: 20 } },
  ] as { tag: string; usage: number; mentions: number; engagement: string; reach: string; growth: number; sentiment: Sentiment; spark: number[]; split: Record<Network, number> }[],
  /** Hashtag cloud (presentation view): font size in px as drawn in the reference, plus mood. */
  hashtagCloud: [
    { term: "#AuroraLaunch", weight: 28, sentiment: "pos", usage: 4120 },
    { term: "#NightModeTips", weight: 22, sentiment: "pos", usage: 2940 },
    { term: "#ShotOnX2", weight: 20, sentiment: "pos", usage: 2410 },
    { term: "#ChargerFail", weight: 19, sentiment: "neg", usage: 2280 },
    { term: "#FestiveDeals", weight: 15, sentiment: "neu", usage: 1310 },
    { term: "#GiftWithAurora", weight: 13, sentiment: "pos", usage: 760 },
    { term: "#SampleTag", weight: 12, sentiment: "neu", usage: 540 },
    { term: "#SupportFail", weight: 12, sentiment: "neg", usage: 480 },
  ] as { term: string; weight: number; sentiment: Sentiment; usage: number }[],
  /** Posts carrying each tag (initials only). */
  tagPosts: {
    "#AuroraLaunch": [
      { initials: "PN", handle: "@priya.n", time: "Mon 7:10 PM", network: "instagram", text: "Unboxed the X2 today. That camera bump is worth it. #AuroraLaunch", sentiment: "pos", likes: "4,210", comments: "312", shares: "188" },
      { initials: "TN", handle: "@technest", time: "Mon 11:05 AM", network: "x", text: "Launch-day prices for the X2 are out. Thread below. #AuroraLaunch", sentiment: "neu", likes: "902", comments: "144", shares: "410" },
      { initials: "MV", handle: "@meera.v", time: "Sun 6:40 PM", network: "youtube", text: "First 24 hours with the X2: full review. #AuroraLaunch", sentiment: "pos", likes: "8,450", comments: "620", shares: "1,040" },
    ],
    "#NightModeTips": [
      { initials: "AM", handle: "@arun.m", time: "Tue 11:02 PM", network: "instagram", text: "Hold still for 3 seconds and let the X2 do the rest. #NightModeTips", sentiment: "pos", likes: "2,880", comments: "204", shares: "96" },
      { initials: "JS", handle: "@jas.s", time: "Mon 10:30 PM", network: "youtube", text: "Five night-mode settings nobody talks about. #NightModeTips", sentiment: "pos", likes: "5,120", comments: "388", shares: "612" },
      { initials: "LP", handle: "@lena.p", time: "Mon 9:15 PM", network: "x", text: "Turn off the flash, trust the sensor. #NightModeTips", sentiment: "pos", likes: "640", comments: "41", shares: "88" },
    ],
    "#ShotOnX2": [
      { initials: "AM", handle: "@arun.m", time: "Tue 11:02 PM", network: "instagram", text: "City lights, no tripod. #ShotOnX2", sentiment: "pos", likes: "3,410", comments: "220", shares: "140" },
      { initials: "DS", handle: "@dev.s", time: "Mon 8:12 PM", network: "instagram", text: "Rain at night actually looks good now. #ShotOnX2", sentiment: "pos", likes: "1,980", comments: "96", shares: "54" },
      { initials: "GD", handle: "@gadgetdesk", time: "Sun 2:00 PM", network: "youtube", text: "X2 vs last year’s flagship, night samples. #ShotOnX2", sentiment: "neu", likes: "6,020", comments: "512", shares: "730" },
    ],
    "#ChargerFail": [
      { initials: "RK", handle: "@riya.k", time: "Tue 9:12 PM", network: "x", text: "Third charger this year. Support keeps closing my ticket. #ChargerFail", sentiment: "neg", likes: "1,920", comments: "311", shares: "164" },
      { initials: "AB", handle: "@arjun.b", time: "Tue 6:48 PM", network: "x", text: "Anyone else’s charger overheating after the update? #ChargerFail", sentiment: "neg", likes: "840", comments: "226", shares: "98" },
      { initials: "NK", handle: "@nikhil.k", time: "Mon 4:20 PM", network: "facebook", text: "Replacement arrived in 2 days, credit where due. #ChargerFail", sentiment: "pos", likes: "310", comments: "44", shares: "12" },
    ],
    "#FestiveDeals": [
      { initials: "SR", handle: "@shop.radar", time: "Tue 9:00 AM", network: "facebook", text: "Every phone deal this festive week, one list. #FestiveDeals", sentiment: "neu", likes: "1,240", comments: "96", shares: "388" },
      { initials: "PN", handle: "@priya.n", time: "Mon 6:10 PM", network: "instagram", text: "Got the X2 bundle with earbuds. #FestiveDeals", sentiment: "pos", likes: "620", comments: "38", shares: "14" },
      { initials: "TN", handle: "@technest", time: "Mon 10:00 AM", network: "x", text: "Are festive discounts real this year? #FestiveDeals", sentiment: "neu", likes: "402", comments: "160", shares: "52" },
    ],
    "#GiftWithAurora": [
      { initials: "KA", handle: "@kavya.a", time: "Tue 8:25 PM", network: "instagram", text: "Wrapped the X2 for my dad. He cried. #GiftWithAurora", sentiment: "pos", likes: "3,880", comments: "264", shares: "120" },
      { initials: "MV", handle: "@meera.v", time: "Mon 5:30 PM", network: "instagram", text: "Gift guide: phones for parents who hate tech. #GiftWithAurora", sentiment: "pos", likes: "2,140", comments: "140", shares: "210" },
      { initials: "RJ", handle: "@rahul.j", time: "Mon 1:15 PM", network: "facebook", text: "Delivery promised before the festival, fingers crossed. #GiftWithAurora", sentiment: "neu", likes: "220", comments: "31", shares: "8" },
    ],
  } as Record<string, { initials: string; handle: string; time: string; network: Network; text: string; sentiment: Sentiment; likes: string; comments: string; shares: string }[]>,
  /** "Narrow it down": slider range and the growth % a topic needs to pass "Growth only". */
  filters: { minVolume: { min: 0, max: 10000, step: 250 }, minUsage: 100, growthOnlyFrom: 20 },
  ranges: ["Today", "7 days", "30 days", "Custom"],
}

/* --------------------------------------------------------------------------
   Sentiment & Keywords (Sentiment.dc.html)
   -------------------------------------------------------------------------- */
export type SentimentKeywordId = "launch" | "night" | "care"

type SentKpi = { label: string; value: number; format?: "compact" | "net"; delta: string; trend: Trend }
type SentKeyword = {
  name: string
  kind: string
  kpis: readonly SentKpi[]
  /** Platform breakdown, in the reference's order (largest share first). */
  platforms: readonly { network: Network; share: number; mentions: number; engagement: string; net: number; tag?: string }[]
  /** Index of the strongest (solid outline) and weakest (dashed outline) platform tile. */
  strong: number
  weak: number
  card: string
  note: string
  split: Split
  total: number
  hashtags: readonly { tag: string; usage: string; growth: number; reach: string; sentiment: Sentiment }[]
  topics: readonly { name: string; onMessage: boolean }[]
  categories: readonly { name: string; share: number }[]
}

export const sentiment = {
  overall: { net: 34, change: 2, trend: "up" as Trend },
  /** Hero and Part A · Platform-wise (Instagram is the slipping platform). */
  platforms: [
    { network: "facebook", total: 6270, split: sentimentByPlatform.facebook, net: 34, change: 2, trend: "up" },
    { network: "x", total: 8680, split: sentimentByPlatform.x, net: 10, change: 1, trend: "down" },
    { network: "youtube", total: 3374, split: sentimentByPlatform.youtube, net: 43, change: 3, trend: "up" },
    { network: "instagram", total: 29890, split: sentimentByPlatform.instagram, net: 9, change: 12, trend: "down", slipping: true },
  ] as { network: Network; total: number; split: Split; net: number; change: number; trend: Trend; slipping?: boolean }[],
  /** Explainer "Underneath" card. The reference shows X at 44/34/22 (net +22) here, unlike the hero. */
  underneath: {
    platforms: [
      { network: "facebook", split: [52, 30, 18], net: 34, tone: "pos" },
      { network: "x", split: [44, 34, 22], net: 22, tone: "neu" },
      { network: "youtube", split: [57, 29, 14], net: 43, tone: "pos" },
      { network: "instagram", split: [41, 27, 32], net: 9, tone: "neg", change: -12, flagged: true },
    ] as { network: Network; split: Split; net: number; tone: Sentiment; change?: number; flagged?: boolean }[],
    hashtags: [
      { tag: "#ShotOnX2", net: 64, tone: "pos" },
      { tag: "#AuroraLaunch", net: 29, tone: "neu" },
      { tag: "#SampleCampaign", net: -14, tone: "neg", change: -22, flagged: true },
    ] as { tag: string; net: number; tone: Sentiment; change?: number; flagged?: boolean }[],
  },
  /** Part A · Hashtag-wise overall sentiment; `spark` is the 7-point trend line. */
  hashtags: [
    { tag: "#ShotOnX2", split: [74, 16, 10] as Split, net: 64, trend: "up" as Trend, spark: [4, 5, 6, 6, 8, 9, 10], volume: 3110 },
    { tag: "#NightModeTips", split: [66, 26, 8] as Split, net: 58, trend: "up" as Trend, spark: [5, 5, 6, 7, 7, 8, 9], volume: 2940 },
    { tag: "#AuroraLaunch", split: [52, 25, 23] as Split, net: 29, trend: "flat" as Trend, spark: [7, 8, 7, 8, 7, 8, 8], volume: 4120 },
    { tag: "#SampleCampaign", split: [30, 26, 44] as Split, net: -14, trend: "down" as Trend, spark: [9, 9, 8, 7, 5, 4, 2], volume: 1860, flagged: true },
    { tag: "#ChargerFail", split: [8, 12, 80] as Split, net: -72, trend: "down" as Trend, spark: [6, 5, 5, 4, 3, 3, 2], volume: 2280 },
  ] as { tag: string; split: Split; net: number; trend: Trend; spark: number[]; volume: number; flagged?: boolean }[],
  /**
   * Part A · Sentiment threshold (confidence %). Positive and negative shrink linearly as the
   * threshold rises: share = base − (t − min) × slope; neutral takes the rest.
   */
  threshold: {
    min: 50,
    max: 95,
    step: 5,
    initial: 70,
    pos: { base: 58, slope: 0.6 },
    neg: { base: 22, slope: 0.25 },
    relaxed: { at: 60, split: [52, 28, 20] as Split },
    strict: { at: 90, split: [34, 54, 12] as Split },
  },
  /** Part A · "Drill into the posts": the negative Instagram segment. */
  drill: {
    network: "instagram" as Network,
    count: 9565,
    posts: [
      { initials: "RK", text: "Third X2 charger this year. Support keeps closing my ticket.", engagement: "2.4K" },
      { initials: "SV", text: "The #SampleCampaign ad promised all-day battery. Mine lasts till lunch.", engagement: "1.1K" },
      { initials: "AB", text: "Two weeks waiting for a replacement cable.", engagement: "640" },
    ],
  },
  /** Part B · one sparkline per KPI card (shared by every keyword, as in the reference). */
  kpiSparks: [
    [2, 4, 6, 7, 11, 12, 16, 18, 21],
    [4, 5, 7, 9, 10, 14, 15, 18, 20],
    [6, 7, 8, 10, 11, 12, 14, 15, 16],
    [18, 17, 18, 15, 14, 12, 11, 9, 7],
    [5, 6, 8, 9, 11, 13, 14, 16, 18],
  ],
  keywordOrder: ["launch", "night", "care"] as SentimentKeywordId[],
  keywords: {
    launch: {
      name: "#AuroraLaunch",
      kind: "Campaign hashtag",
      kpis: [
        { label: "Mentions", value: 12480, delta: "38%", trend: "up" },
        { label: "Engagement", value: 640000, format: "compact", delta: "22%", trend: "up" },
        { label: "Reach", value: 7900000, format: "compact", delta: "17%", trend: "up" },
        { label: "Net sentiment", value: 29, format: "net", delta: "4 pts", trend: "down" },
        { label: "Content volume", value: 3960, delta: "26% posts", trend: "up" },
      ],
      platforms: [
        { network: "instagram", share: 54, mentions: 6740, engagement: "402K", net: 41, tag: "Strong" },
        { network: "youtube", share: 21, mentions: 2620, engagement: "148K", net: 47 },
        { network: "facebook", share: 15, mentions: 1870, engagement: "64K", net: 22 },
        { network: "x", share: 10, mentions: 1250, engagement: "26K", net: -6, tag: "Fading · ▼ 31%" },
      ],
      strong: 0,
      weak: 3,
      card: "Strong on Instagram, fading on X",
      note: "Instagram carries over half the mentions and the warmest tone; on X the term is shrinking and slightly negative.",
      split: [52, 25, 23],
      total: 12480,
      hashtags: [
        { tag: "#X2Unboxing", usage: "1,980", growth: 52, reach: "1.2M", sentiment: "pos" },
        { tag: "#AuroraLaunch", usage: "4,120", growth: 38, reach: "3.1M", sentiment: "pos" },
        { tag: "#TechNews", usage: "1,450", growth: 2, reach: "0.6M", sentiment: "neu" },
        { tag: "#LaunchDayFail", usage: "640", growth: 88, reach: "0.3M", sentiment: "neg" },
      ],
      topics: [
        { name: "Unboxing", onMessage: true },
        { name: "Camera", onMessage: true },
        { name: "Pricing", onMessage: true },
        { name: "Delivery delays", onMessage: false },
      ],
      categories: [
        { name: "Smartphones", share: 58 },
        { name: "Accessories", share: 18 },
        { name: "Retail", share: 14 },
        { name: "Service", share: 10 },
      ],
    },
    night: {
      name: "Night Mode",
      kind: "Product feature",
      kpis: [
        { label: "Mentions", value: 8960, delta: "24%", trend: "up" },
        { label: "Engagement", value: 512000, format: "compact", delta: "31%", trend: "up" },
        { label: "Reach", value: 5200000, format: "compact", delta: "12%", trend: "up" },
        { label: "Net sentiment", value: 62, format: "net", delta: "3 pts", trend: "up" },
        { label: "Content volume", value: 2710, delta: "19% posts", trend: "up" },
      ],
      platforms: [
        { network: "instagram", share: 61, mentions: 5470, engagement: "318K", net: 64, tag: "Strong" },
        { network: "youtube", share: 24, mentions: 2150, engagement: "162K", net: 70, tag: "Strong" },
        { network: "facebook", share: 9, mentions: 810, engagement: "22K", net: 48 },
        { network: "x", share: 6, mentions: 530, engagement: "10K", net: 21, tag: "Quiet" },
      ],
      strong: 1,
      weak: 3,
      card: "Loved on YouTube, quiet on X",
      note: "Video reviews drive the warmest conversation; on X the feature barely registers.",
      split: [71, 20, 9],
      total: 8960,
      hashtags: [
        { tag: "#NightModeTips", usage: "2,940", growth: 88, reach: "1.9M", sentiment: "pos" },
        { tag: "#ShotOnX2", usage: "2,410", growth: 41, reach: "1.6M", sentiment: "pos" },
        { tag: "#AuroraNights", usage: "1,240", growth: 41, reach: "0.8M", sentiment: "pos" },
        { tag: "#BlurryNights", usage: "310", growth: 12, reach: "0.1M", sentiment: "neg" },
      ],
      topics: [
        { name: "Low-light photos", onMessage: true },
        { name: "City nights", onMessage: true },
        { name: "Astro shots", onMessage: true },
        { name: "Battery drain", onMessage: false },
      ],
      categories: [
        { name: "Camera & imaging", share: 72 },
        { name: "Smartphones", share: 21 },
        { name: "Accessories", share: 5 },
        { name: "Service", share: 2 },
      ],
    },
    care: {
      name: "Aurora Care Plus",
      kind: "Service plan",
      kpis: [
        { label: "Mentions", value: 2140, delta: "8%", trend: "down" },
        { label: "Engagement", value: 48000, format: "compact", delta: "12%", trend: "down" },
        { label: "Reach", value: 1100000, format: "compact", delta: "5%", trend: "down" },
        { label: "Net sentiment", value: -18, format: "net", delta: "9 pts", trend: "down" },
        { label: "Content volume", value: 860, delta: "4% posts", trend: "down" },
      ],
      platforms: [
        { network: "facebook", share: 44, mentions: 940, engagement: "21K", net: -4, tag: "Most used" },
        { network: "x", share: 31, mentions: 660, engagement: "14K", net: -41, tag: "Negative" },
        { network: "instagram", share: 17, mentions: 360, engagement: "9K", net: 6 },
        { network: "youtube", share: 8, mentions: 180, engagement: "4K", net: 12 },
      ],
      strong: 0,
      weak: 1,
      card: "Mostly on Facebook, negative on X",
      note: "Facebook questions are neutral; on X the plan is mostly mentioned in complaints.",
      split: [24, 34, 42],
      total: 2140,
      hashtags: [
        { tag: "#AuroraCare", usage: "520", growth: 6, reach: "0.3M", sentiment: "neu" },
        { tag: "#ChargerFail", usage: "410", growth: 122, reach: "0.4M", sentiment: "neg" },
        { tag: "#WarrantyHelp", usage: "180", growth: 14, reach: "0.1M", sentiment: "neu" },
        { tag: "#SupportFail", usage: "160", growth: 40, reach: "0.1M", sentiment: "neg" },
      ],
      topics: [
        { name: "Repairs", onMessage: true },
        { name: "Claim process", onMessage: true },
        { name: "Wait times", onMessage: true },
        { name: "Charger recall rumours", onMessage: false },
      ],
      categories: [
        { name: "Service", share: 64 },
        { name: "Accessories", share: 22 },
        { name: "Smartphones", share: 10 },
        { name: "Retail", share: 4 },
      ],
    },
  } satisfies Record<SentimentKeywordId, SentKeyword> as Record<SentimentKeywordId, SentKeyword>,
  /** Part B teaser · Top handles (optional widget). */
  topHandles: [
    { handle: "@technest", followers: "412K" },
    { handle: "@meera.v", followers: "186K" },
    { handle: "@gadgetdesk", followers: "94K" },
  ],
}

/* --------------------------------------------------------------------------
   Brand Compare (Compare.dc.html)
   -------------------------------------------------------------------------- */
export const compare = {
  shareOfVoice: { aurora: 38, nimbus: 36, kestrel: 26 },
  /** Raw 30-day figures the index, share of voice and builder are computed from. */
  raw: {
    mentions: { aurora: 48214, nimbus: 45680, kestrel: 33010 },
    engagement: { aurora: 1.92, nimbus: 2.19, kestrel: 1.1 },
    sentiment: { aurora: 62, nimbus: 58, kestrel: 51 },
    reach: { aurora: 12.4, nimbus: 13.1, kestrel: 8.2 },
  },
  /** Indexed vs Aurora (= 100) on a 50–130 scale. */
  indexScale: { min: 50, max: 130 },
  indexVsAurora: [
    { metric: "Mentions", nimbus: 95, kestrel: 68 },
    { metric: "Engagement", nimbus: 114, kestrel: 57 },
    { metric: "Sentiment", nimbus: 94, kestrel: 82 },
    { metric: "Reach", nimbus: 106, kestrel: 66 },
  ],
  figures: [
    { metric: "Mentions", metricShort: "Mentions", values: ["48,214", "45,680", "33,010"], gap: "Aurora ahead of Nimbus by 2,534", gapShort: "Aurora +2,534", gapTrend: "up", change: "18.4%", changeTrend: "up" },
    { metric: "Engagement", metricShort: "Engagement", values: ["1.92M", "2.19M", "1.10M"], gap: "Nimbus ahead by 270K", gapShort: "Nimbus +270K", gapTrend: "down", change: "9.6%", changeTrend: "up" },
    { metric: "Sentiment score", metricShort: "Sentiment", values: ["62", "58", "51"], gap: "Aurora ahead of Nimbus by 4", gapShort: "Aurora +4", gapTrend: "up", change: "3 pts", changeTrend: "down" },
    { metric: "Reach", metricShort: "Reach", values: ["12.4M", "13.1M", "8.2M"], gap: "Nimbus ahead by 0.7M", gapShort: "Nimbus +0.7M", gapTrend: "down", change: "6.1%", changeTrend: "up" },
    { metric: "Share of voice", metricShort: "Share of voice", values: ["38%", "36%", "26%"], gap: "Aurora ahead of Nimbus by 2 pts", gapShort: "Aurora +2 pts", gapTrend: "up", change: "3 pts", changeTrend: "up" },
  ] as { metric: string; metricShort: string; values: [string, string, string]; gap: string; gapShort: string; gapTrend: Trend; change: string; changeTrend: Trend }[],
  engagementTrend: {
    weekly: { labels: ["W34", "W35", "W36", "W37", "W38", "W39", "W40", "W41"], aurora: [400, 415, 425, 440, 450, 458, 465, 490], nimbus: [500, 510, 520, 528, 535, 548, 558, 559], kestrel: [260, 262, 258, 265, 270, 268, 272, 275], unit: "K per week" },
    monthly: { labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"], aurora: [1.45, 1.52, 1.6, 1.71, 1.82, 1.92], nimbus: [1.88, 1.94, 2.01, 2.08, 2.12, 2.19], kestrel: [1.02, 1.04, 1.05, 1.07, 1.09, 1.1], unit: "M per month" },
    quarterly: { labels: ["Q4 25", "Q1 26", "Q2 26", "Q3 26"], aurora: [4.1, 4.4, 4.9, 5.4], nimbus: [5.6, 5.9, 6.2, 6.4], kestrel: [3.0, 3.1, 3.2, 3.3], unit: "M per quarter" },
    yearly: { labels: ["2024", "2025", "2026 YTD"], aurora: [12.1, 15.8, 19.6], nimbus: [18.4, 21.0, 23.5], kestrel: [10.2, 11.4, 12.6], unit: "M per year" },
    notes: ["Gap to Nimbus narrowed from 25 to 14 pts", "Nimbus leads engagement by 14 pts"],
  },
  /** Posts behind a selected point on the gap trend. */
  pointPosts: [
    { brand: "nimbus", text: "“Nimbus fast-charge challenge is everywhere this week”", meta: "Nimbus · Instagram" },
    { brand: "aurora", text: "“Aurora X2 night-mode review, full walkthrough”", meta: "Aurora · YouTube" },
  ] as const,
  platformShare: {
    aurora: { instagram: 62, x: 18, facebook: 13, youtube: 7 },
    nimbus: { instagram: 48, x: 22, facebook: 18, youtube: 12 },
    kestrel: { instagram: 40, x: 30, facebook: 20, youtube: 10 },
  },
  topicOverlap: {
    aurora: "12 · 7",
    nimbus: "13 · 9",
    kestrel: "9 · 5",
    /** Shared / owned split in % (solid = shared, hatched = owned). */
    sharedPct: { aurora: 63, nimbus: 59, kestrel: 64 },
    /** Venn region counts. */
    regions: { aurora: 7, nimbus: 9, kestrel: 5, auroraNimbus: 6, auroraKestrel: 2, nimbusKestrel: 3 },
    sharedByAll: 4,
    sharedTopics: ["Night photography", "Festive offers", "Battery life", "Launch events"],
    sharedTags: ["#NightMode", "#FestiveDeals"],
    auroraTopics: ["Camera tutorials", "Care Plus", "Pune store"],
    auroraTags: ["#ShotOnX2", "#AuroraNights"],
  },
}

/* --------------------------------------------------------------------------
   Promotable Stories (Stories.dc.html)
   -------------------------------------------------------------------------- */
export type StoryPriority = "High" | "Medium" | "Low"
export type StoryPost = { initials: string; handle: string; network: Network; text: string; likes: string; comments: string; shares: string }
export type StoryCandidate = {
  title: string
  /** Shortlist label. */
  short: string
  priority: StoryPriority
  tags: readonly string[]
  keywords: readonly string[]
  volume: number
  volumeDelta: number
  engagement: number
  engagementDelta: number
  reach: number
  reachDelta: number
  split: Split
  /** Change in positive share, in points. */
  sentimentDelta: number
  /** Supporting posts in total. */
  support: number
  posts: readonly StoryPost[]
  more: readonly string[]
}

export const stories = {
  candidates: [
    {
      title: "Night-mode photos fans can’t stop sharing", short: "Night-mode photos", priority: "High",
      tags: ["#AuroraNights", "#ShotOnX2", "#NightModeTips"], keywords: ["night mode", "no tripod"],
      volume: 3420, volumeDelta: 64, engagement: 214000, engagementDelta: 48, reach: 1800000, reachDelta: 31, split: [81, 14, 5], sentimentDelta: 4, support: 42,
      posts: [
        { initials: "AM", handle: "@arun.m", network: "instagram", text: "Took this at 11 PM with no tripod. Unreal.", likes: "3,410", comments: "220", shares: "140" },
        { initials: "JS", handle: "@jas.s", network: "x", text: "Night mode on the X2 beats my old camera.", likes: "1,120", comments: "84", shares: "210" },
        { initials: "PN", handle: "@priya.n", network: "youtube", text: "City lights test, 4 shots, zero editing.", likes: "6,020", comments: "512", shares: "730" },
      ],
      more: ["“Rain at night actually looks good now.”", "“Shot my daughter’s recital in a dark hall. Clear.”", "“Astro attempt #3 — getting there!”"],
    },
    {
      title: "Unboxing videos are rising in Pune", short: "Unboxing in Pune", priority: "Medium",
      tags: ["#X2Unboxing", "#PuneTech"], keywords: ["unboxing", "Pune store"],
      volume: 1120, volumeDelta: 74, engagement: 62000, engagementDelta: 40, reach: 600000, reachDelta: 22, split: [72, 22, 6], sentimentDelta: 2, support: 18,
      posts: [
        { initials: "RJ", handle: "@rahul.j", network: "youtube", text: "Pune store had the X2 in stock on day one. Unboxing inside.", likes: "2,140", comments: "188", shares: "96" },
        { initials: "KA", handle: "@kavya.a", network: "instagram", text: "The box design alone. Love it.", likes: "980", comments: "54", shares: "20" },
        { initials: "TN", handle: "@technest", network: "x", text: "Pune queues for the X2 were longer than expected.", likes: "402", comments: "61", shares: "88" },
      ],
      more: ["“First impressions from FC Road.”", "“Staff walked me through setup.”", "“Unboxed with my dad, he loved it.”"],
    },
    {
      title: "Battery lasts the whole trek", short: "Trek battery", priority: "Medium",
      tags: ["#TrekWithAurora", "#BatteryLife"], keywords: ["battery", "trek"],
      volume: 860, volumeDelta: 69, engagement: 41000, engagementDelta: 35, reach: 400000, reachDelta: 18, split: [77, 18, 5], sentimentDelta: 6, support: 14,
      posts: [
        { initials: "NK", handle: "@nikhil.k", network: "instagram", text: "Three days on the trail, 22% battery left.", likes: "1,260", comments: "73", shares: "40" },
        { initials: "SV", handle: "@sana.v", network: "facebook", text: "Took 600 photos on the trek and still had charge.", likes: "540", comments: "38", shares: "22" },
        { initials: "DS", handle: "@dev.s", network: "x", text: "Battery saver mode is the trek hero nobody talks about.", likes: "310", comments: "19", shares: "46" },
      ],
      more: ["“Navigation all day, no power bank.”", "“Cold weather didn’t drain it.”", "“Summit selfie at 8%.”"],
    },
    {
      title: "Parents love the simple mode", short: "Simple mode", priority: "Low",
      tags: ["#GiftWithAurora", "#EasyMode"], keywords: ["simple mode", "parents"],
      volume: 640, volumeDelta: 52, engagement: 28000, engagementDelta: 21, reach: 300000, reachDelta: 9, split: [84, 13, 3], sentimentDelta: 3, support: 11,
      posts: [
        { initials: "MV", handle: "@meera.v", network: "facebook", text: "Set up simple mode for my mum in 2 minutes.", likes: "880", comments: "64", shares: "30" },
        { initials: "AB", handle: "@arjun.b", network: "instagram", text: "Dad finally video-calls us on his own.", likes: "1,420", comments: "96", shares: "18" },
        { initials: "LP", handle: "@lena.p", network: "youtube", text: "Simple mode walkthrough for grandparents.", likes: "2,010", comments: "140", shares: "220" },
      ],
      more: ["“Big icons, no confusion.”", "“Best gift this festive season.”", "“My aunt asked where to buy one.”"],
    },
    {
      title: "Store staff shout-outs", short: "Store staff", priority: "Low",
      tags: ["#AuroraStore", "#PuneLaunch"], keywords: ["store staff", "helpful"],
      volume: 410, volumeDelta: 33, engagement: 12000, engagementDelta: 10, reach: 200000, reachDelta: 5, split: [88, 10, 2], sentimentDelta: 1, support: 7,
      posts: [
        { initials: "GD", handle: "@gadgetdesk", network: "x", text: "Shout-out to the Aurora store team for the transfer help.", likes: "220", comments: "12", shares: "30" },
        { initials: "PN", handle: "@priya.n", network: "instagram", text: "Staff stayed late to set up my phone.", likes: "640", comments: "41", shares: "8" },
        { initials: "RK", handle: "@riya.k", network: "facebook", text: "Finally, a store that listens.", likes: "180", comments: "22", shares: "6" },
      ],
      more: ["“Patient and friendly.”", "“Explained every setting.”", "“Fixed my old phone too.”"],
    },
  ] satisfies StoryCandidate[] as readonly StoryCandidate[],
  /** "Raise the bar" pool: posts, engagement (K), evidence score, tone ("mix" = mixed sentiment). */
  ideaPool: [
    { title: "Night-mode photos fans can’t stop sharing", volume: 3420, engagementK: 214, score: 92, tone: "pos" },
    { title: "Unboxing videos are rising in Pune", volume: 1120, engagementK: 62, score: 88, tone: "pos" },
    { title: "Battery lasts the whole trek", volume: 860, engagementK: 41, score: 81, tone: "pos" },
    { title: "Parents love the simple mode", volume: 640, engagementK: 28, score: 76, tone: "pos" },
    { title: "Store staff shout-outs", volume: 410, engagementK: 12, score: 64, tone: "pos" },
    { title: "Festive bundle reactions", volume: 380, engagementK: 9, score: 55, tone: "pos" },
    { title: "Low-light video tips", volume: 290, engagementK: 8, score: 47, tone: "pos" },
    { title: "Case colour debates", volume: 180, engagementK: 4, score: 38, tone: "pos" },
    { title: "First-week reviews roundup", volume: 140, engagementK: 3, score: 30, tone: "pos" },
    { title: "Price comparison threads", volume: 520, engagementK: 14, score: 58, tone: "mix" },
    { title: "Delivery time questions", volume: 330, engagementK: 6, score: 42, tone: "mix" },
  ] as const,
  /** Source hashtags of the lead story with their 8-week trend (shape only). */
  sourceTags: [
    { tag: "#AuroraNights", growth: 88, series: [3, 4, 4, 6, 7, 9, 12, 15] },
    { tag: "#ShotOnX2", growth: 41, series: [6, 7, 7, 8, 8, 9, 9, 11] },
    { tag: "#NightModeTips", growth: 64, series: [2, 3, 4, 5, 5, 7, 8, 10] },
  ],
  /** "From monitoring to material" step 1. */
  flowTags: [
    { tag: "#AuroraNights", growth: 88 },
    { tag: "#ShotOnX2", growth: 41 },
    { tag: "#X2Unboxing", growth: 52 },
  ],
  /** Walkthrough widget 3: the YouTube post shows views instead of shares. */
  walkthroughViews: "48K",
  /** Walkthrough widget 4: the candidate on the decision panel and the two shortlisted ideas. */
  decision: { candidate: 2, shortlist: [0, 1] },
  calendarDate: "Fri 17 Oct",
  /** Evidence score slider; `step1` is the "How to use it" illustration value. */
  threshold: { min: 0, max: 75, step: 5, step1: 40 },
}

/* --------------------------------------------------------------------------
   Reports & Alerts (Reports.dc.html)
   -------------------------------------------------------------------------- */
export const reports = {
  email: { ...weekly, range: "5–11 Oct vs 28 Sep–4 Oct", sent: "Mon 8:45 AM", schedule: "Every Monday 8:45" },
  heroAlert: { severity: "High", text: "Negative mentions ▲ +38% today", network: "instagram" as Network },
  keywordReport,
  entityMonthly: {
    brand: "Aurora Mobile",
    kpis: [
      { key: "mentions", display: "48,214", delta: "18%", trend: "up" as Trend },
      { key: "engagement", display: "1.92M", delta: "10%", trend: "up" as Trend },
      { key: "reach", display: "12.4M", delta: "6%", trend: "up" as Trend },
    ],
    platforms: [
      { network: "instagram" as Network, share: 62 },
      { network: "x" as Network, share: 18 },
      { network: "facebook" as Network, share: 13 },
      { network: "youtube" as Network, share: 7 },
    ],
  },
  notifications: [
    { severity: "High", subject: "#AuroraLaunch", time: "9:12 AM", metric: "Negative mentions", delta: "+38%", trend: "up" as Trend, tone: "neg" as Sentiment, tail: "in a day", network: "instagram" as Network },
    { severity: "Medium", subject: "Aurora Care Plus", time: "Yesterday", metric: "Net sentiment", delta: "12 pts", trend: "down" as Trend, tone: "neg" as Sentiment, tail: "in 7 days", network: "x" as Network },
    { severity: "Info", subject: "Night Mode", time: "Mon", metric: "Mentions", delta: "2.1×", trend: "up" as Trend, tone: "pos" as Sentiment, tail: "the usual daily level", network: "youtube" as Network },
  ],
  defaultRule: "negative mentions rise 30% within 1 day",
  /** Hero email chart: mentions this week vs last week (viewBox 420×80, y down). */
  emailLines: {
    thisWeek: "0,58 60,50 120,54 180,38 240,40 300,22 360,30 420,26",
    lastWeek: "0,64 60,62 120,60 180,58 240,56 300,54 360,54 420,52",
  },
  /** Report builder subjects (Reports.dc.html script): 30-day figures, scaled by range and platforms. */
  builder: {
    keyword: [
      { name: "Night Mode", kind: "Keyword", m: 8960, dm: 24, s: 62, ds: 3, e: 512000, de: 31, sp: [71, 20, 9] as Split, topics: ["Low-light photos", "City nights", "Astro shots"], tags: ["#NightModeTips", "#ShotOnX2", "#AuroraNights"], pl: { instagram: 61, youtube: 24, facebook: 9, x: 6 }, changed: "Engagement grew fastest on YouTube; tone stayed positive." },
      { name: "#AuroraLaunch", kind: "Keyword", m: 12480, dm: 38, s: 29, ds: -4, e: 640000, de: 22, sp: [52, 25, 23] as Split, topics: ["Unboxing", "Camera", "Pricing"], tags: ["#AuroraLaunch", "#X2Unboxing", "#LaunchDayFail"], pl: { instagram: 54, youtube: 21, facebook: 15, x: 10 }, changed: "Volume up 38%, but the negative share rose on X." },
      { name: "Aurora Care Plus", kind: "Keyword", m: 2140, dm: -8, s: -18, ds: -9, e: 48000, de: -12, sp: [24, 34, 42] as Split, topics: ["Repairs", "Claim process", "Wait times"], tags: ["#AuroraCare", "#ChargerFail", "#WarrantyHelp"], pl: { facebook: 44, x: 31, instagram: 17, youtube: 8 }, changed: "Complaints about wait times pulled sentiment down." },
    ],
    entity: [
      { name: "Aurora Mobile", kind: "Brand", m: 48214, dm: 18, s: 36, ds: -3, e: 1920000, de: 10, sp: [54, 28, 18] as Split, topics: ["Battery & charging", "Night photography", "X2 launch"], tags: ["#AuroraX2Launch", "#ShotOnX2", "#ChargerFail"], pl: { instagram: 62, x: 18, facebook: 13, youtube: 7 }, changed: "Mentions up 18%; charging complaints kept sentiment from rising." },
      { name: "Aurora X2", kind: "Product", m: 31200, dm: 26, s: 41, ds: 2, e: 1300000, de: 14, sp: [58, 25, 17] as Split, topics: ["Camera", "Battery", "Price"], tags: ["#ShotOnX2", "#X2Unboxing", "#NightModeTips"], pl: { instagram: 60, youtube: 18, x: 14, facebook: 8 }, changed: "Camera praise outweighed battery complaints." },
      { name: "Aurora Care", kind: "Organisation", m: 3880, dm: -4, s: -10, ds: -6, e: 82000, de: -9, sp: [30, 30, 40] as Split, topics: ["Support tickets", "Repairs", "Store visits"], tags: ["#AuroraCare", "#SupportFail", "#WarrantyHelp"], pl: { facebook: 46, x: 30, instagram: 16, youtube: 8 }, changed: "Support response times are the main complaint." },
    ],
    recipients: ["leadership@example.com", "brand-team@example.com"],
  },
  /** Alert rule amounts per direction (percentage) or absolute level. */
  ruleValues: {
    pct: ["10", "20", "30", "50"],
    net: ["-10", "0", "+10", "+30"],
    abs: ["500", "1000", "2000", "5000"],
  },
  savedRulesOn: [true, false],
}

export type ReportSubject = (typeof reports.builder.keyword)[number]

/* --------------------------------------------------------------------------
   Channel Analysis (Channels.dc.html)
   -------------------------------------------------------------------------- */
export const channels = {
  facebook: {
    page: "Aurora Mobile",
    followers: "1.24M",
    kpis: [
      { label: "Posts", display: "46", delta: "8%", trend: "up" },
      { label: "Reactions", display: "182K", delta: "14%", trend: "up" },
      { label: "Comments", display: "21.4K", delta: "6%", trend: "up" },
      { label: "Shares", display: "9.8K", delta: "3%", trend: "down" },
      { label: "Engagement rate", display: "3.9%", delta: "0.4 pts", trend: "up" },
    ],
    reactions: { like: 58, love: 22, wow: 7, haha: 6, angry: 4, sad: 3 },
    followerGrowth: { delta: "38.2K", pct: "+3.2%", from: "1.20M", to: "1.24M" },
    sentiment: [61, 25, 14] as Split,
  },
  youtube: {
    channel: "Aurora Mobile Official",
    subscribers: "412K",
    videos: 12,
    kpis: [
      { label: "Views", display: "4.1M", delta: "21%", trend: "up" },
      { label: "Likes", display: "171K", delta: "9%", trend: "up" },
      { label: "Comments", display: "20.6K", delta: "15%", trend: "up" },
      { label: "Engagement rate", display: "4.6%", delta: "0.3 pts", trend: "down" },
    ],
    topVideos: [
      { title: "X2 Night Mode: full camera test", views: "1.42M", likes: "61K", comments: "6.8K", positive: 72, sentiment: "pos" },
      { title: "X2 software update 4.2 explained", views: "0.94M", likes: "22K", comments: "5.9K", negative: 54, sentiment: "neg" },
      { title: "Aurora X2 battery: 3-day trek", views: "0.86M", likes: "38K", comments: "4.1K", positive: 68, sentiment: "pos" },
      { title: "Unboxing the Aurora X2", views: "0.38M", likes: "27K", comments: "1.4K", positive: 64, sentiment: "pos" },
    ],
    subscribersFlow: { gained: "12.1K", lost: "2.7K", net: "+9.4K" },
  },
  instagram: {
    handle: "@aurora.mobile",
    followers: "2.1M",
    followerDelta: "1.8%",
    influence: 71,
    kpis: [
      { label: "Posts", display: "38", delta: "4", trend: "up" },
      { label: "Reels", display: "14", delta: "3", trend: "up" },
      { label: "Likes", display: "486K", delta: "11%", trend: "up" },
      { label: "Comments", display: "12.9K", delta: "4%", trend: "up" },
      { label: "Engagement rate", display: "2.4%", delta: "0.2", trend: "up" },
    ],
    sentiment: [58, 27, 15] as Split,
    topContent: [{ type: "Reel", engagement: "84K" }, { type: "Post", engagement: "52K" }, { type: "Reel", engagement: "31K" }],
  },
  x: {
    handle: "@AuroraMobile",
    range: "Last 7 days",
    kpis: [
      { label: "Posts", display: "124" },
      { label: "Replies", display: "312" },
      { label: "Reposts", display: "8.4K" },
      { label: "Quotes", display: "1.9K" },
      { label: "Impressions", display: "4.8M", delta: "26%", trend: "up" },
      { label: "Engagement rate", display: "1.7%", delta: "0.1", trend: "up" },
    ],
    influence: 64,
    sentiment: [44, 31, 25] as Split,
    amplification: "Original 124 · Reposts + quotes 10.3K · 83× more amplified",
  },
  entityByNetwork: {
    facebook: [{ brand: "aurora", mentions: "4,820", engagement: "96K", change: "22%", trend: "up" }, { brand: "nimbus", mentions: "3,910", engagement: "71K", change: "4%", trend: "up" }, { brand: "kestrel", mentions: "2,140", engagement: "38K", change: "11%", trend: "down" }],
    youtube: [{ brand: "aurora", mentions: "1,260", engagement: "148K", change: "31%", trend: "up" }, { brand: "nimbus", mentions: "1,480", engagement: "162K", change: "6%", trend: "up" }, { brand: "kestrel", mentions: "610", engagement: "51K", change: "0%", trend: "flat" }],
    instagram: [{ brand: "aurora", mentions: "6,140", engagement: "412K", change: "19%", trend: "up" }, { brand: "nimbus", mentions: "4,880", engagement: "356K", change: "8%", trend: "up" }, { brand: "kestrel", mentions: "1,920", engagement: "98K", change: "6%", trend: "down" }],
    x: [{ brand: "aurora", mentions: "8,920", engagement: "64K", change: "12%", trend: "up" }, { brand: "nimbus", mentions: "7,310", engagement: "52K", change: "17%", trend: "up" }, { brand: "kestrel", mentions: "3,050", engagement: "21K", change: "3%", trend: "down" }],
  },
  filterPreview: {
    facebook: { mentions: 10870, engagementRate: "3.9%", split: [61, 25, 14] as Split },
    youtube: { mentions: 3350, engagementRate: "4.6%", split: [62, 22, 16] as Split },
    instagram: { mentions: 13940, engagementRate: "2.4%", split: [58, 27, 15] as Split },
    x: { mentions: 19280, engagementRate: "1.7%", split: [44, 31, 25] as Split },
  },
}

/* --------------------------------------------------------------------------
   Product tour (Tour.dc.html, TourMobile.dc.html). Two date windows: "30d" and "7d".
   -------------------------------------------------------------------------- */
export type TourRange = "30d" | "7d"
export type TourMetric = "mentions" | "engagement"
export type TourBrand = keyof typeof brands
type Three = readonly [number, number, number]

const kpis7d = {
  mentions: { label: "Mentions", value: 11382, display: "11,382", delta: "12.0%", trend: "up" },
  engagement: { label: "Engagement", value: 446000, display: "446K", delta: "7.1%", trend: "up" },
  reach: { label: "Reach", value: 2900000, display: "2.9M", delta: "4.0%", trend: "up" },
  posts: { label: "Posts", value: 2301, display: "2,301", delta: "2.2%", trend: "up" },
  sentiment: { label: "Sentiment score", value: 60, display: "60/100", delta: "2 pts", trend: "down" },
} satisfies Record<string, Kpi>

const tourKpis = (k: Record<"mentions" | "engagement" | "reach" | "posts" | "sentiment", Kpi>): Kpi[] =>
  [k.mentions, k.engagement, k.reach, k.posts, k.sentiment].map((x) => ({ ...x, delta: x.delta.replace(" vs prev.", "") }))

export const tour = {
  ranges: { "30d": "Last 30 days · 14 Sep – 13 Oct", "7d": "Last 7 days · 7 – 13 Oct" } as Record<TourRange, string>,
  rangesShort: { "30d": "last 30 days", "7d": "last 7 days" } as Record<TourRange, string>,
  rangesChip: { "30d": "Last 30 days", "7d": "Last 7 days" } as Record<TourRange, string>,

  /* Step 1 · Brand Compare (series always in this order) */
  brandOrder: ["aurora", "nimbus", "kestrel"] as TourBrand[],
  competitors: {
    "30d": [
      { mentions: "48,214", engagement: "1.92M", net: "+24" },
      { mentions: "41,160", engagement: "2.74M", net: "+19" },
      { mentions: "28,230", engagement: "1.16M", net: "+11" },
    ],
    "7d": [
      { mentions: "11,382", engagement: "446K", net: "+22" },
      { mentions: "9,002", engagement: "604K", net: "+18" },
      { mentions: "6,088", engagement: "262K", net: "+10" },
    ],
  } as Record<TourRange, { mentions: string; engagement: string; net: string }[]>,
  /** Share of voice, adds up to 100. */
  shareOfVoice: {
    mentions: { "30d": [41, 35, 24], "7d": [43, 34, 23] },
    engagement: { "30d": [33, 47, 20], "7d": [34, 46, 20] },
  } as Record<TourMetric, Record<TourRange, Three>>,
  /** Indexed vs category average (100); bars are drawn against 150. */
  indexVsCategory: [
    { metric: "Mentions", values: [123, 105, 72] as Three },
    { metric: "Engagement", values: [99, 141, 60] as Three },
    { metric: "Sentiment", values: [108, 101, 91] as Three },
  ],
  /** Weekly share, Wk 34–Wk 41. */
  gap: {
    mentions: [
      [37, 38, 40, 39, 41, 42, 42, 41],
      [36, 36, 35, 36, 35, 34, 35, 35],
      [27, 26, 25, 25, 24, 24, 23, 24],
    ],
    engagement: [
      [36, 35, 35, 34, 34, 33, 33, 33],
      [40, 41, 42, 44, 44, 45, 46, 47],
      [24, 24, 23, 22, 22, 22, 21, 20],
    ],
  } as Record<TourMetric, readonly (readonly number[])[]>,
  gapAxis: ["Wk 34", "Wk 41"],

  /* Step 2 · Social Media Intelligence */
  kpis: { "30d": tourKpis(kpis30d), "7d": tourKpis(kpis7d) } as Record<TourRange, Kpi[]>,
  /** KPI sparklines in KPI order (shape only, 0–24 plot units: 24 − y from the reference). */
  sparks: [
    [2, 4, 4.5, 7, 10, 7.4, 4.2, 9.3, 8.5, 7.5, 14.2, 15.5, 20.6, 22],
    [3.4, 2, 4.4, 8.6, 10.1, 13.4, 16, 14, 17.3, 19.3, 19.1, 16.7, 20.9, 22],
    [2, 5.1, 7.3, 10.7, 11, 13.7, 14.4, 17.8, 20.9, 19.6, 18.5, 17.8, 21.4, 22],
    [3.4, 2.4, 2.9, 2.6, 2, 3.1, 4.2, 7.7, 9.5, 13.1, 16.2, 20.3, 22, 20],
    [19.7, 15.3, 22, 14.6, 9.3, 16.4, 20, 19.1, 14.2, 19, 15.9, 15.1, 9, 2],
  ],
  week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    full: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    short: ["M", "T", "W", "T", "F", "S", "S"],
    volume: [1480, 1620, 1550, 1790, 1880, 2410, 2040],
    /** Net sentiment per day, drawn on a 0–30 scale. */
    net: [28, 26, 27, 22, 24, 12, 20],
  },
  platformShare: featuresOverview.platformShare,
  sentimentSplit: [54, 28, 18] as Split,
  feed: {
    all: [
      { initials: "MV", handle: "@meera.v", text: "X2 night mode review is honestly stunning.", network: "youtube", sentiment: "pos" },
      { initials: "TN", handle: "@technest", text: "Aurora opening a flagship store in Pune this weekend.", network: "x", sentiment: "neu" },
      { initials: "DS", handle: "@dev.s", text: "Charger died again after the update.", network: "facebook", sentiment: "neg" },
    ],
    /** Saturday, the spike day. */
    spike: [
      { initials: "RK", handle: "@riya.k", text: "Third Aurora X2 charger this year. Support keeps closing my ticket.", network: "instagram", sentiment: "neg" },
      { initials: "AB", handle: "@arjun.b", text: "Is anyone else’s X2 charger overheating after the update?", network: "x", sentiment: "neg" },
      { initials: "LP", handle: "@lena.p", text: "Aurora support replied in 10 minutes, fixed it.", network: "instagram", sentiment: "pos" },
    ],
  } as Record<"all" | "spike", { initials: string; handle: string; text: string; network: Network; sentiment: Sentiment }[]>,
  spikeDay: 5,
  post: {
    initials: "RK",
    handle: "@riya.k",
    time: "Sat · 9:12 PM",
    network: "instagram" as Network,
    text: "Third Aurora X2 charger this year. Support keeps closing my ticket.",
    sentiment: "neg" as Sentiment,
    engagement: "2.4K",
  },

  /* Step 3 · Trending Topics */
  topics: [
    { name: "#AuroraX2Launch", momentum: 94, move: 2, trend: "up", mentions: { "30d": 6210, "7d": 1690 }, tags: ["#AuroraX2Launch", "#X2Unboxing", "#ShotOnX2"], categories: ["Smartphones", "Accessories"], split: [64, 25, 11], owners: [62, 24, 14] },
    { name: "Night photography", momentum: 91, move: 9, trend: "up", mentions: { "30d": 3402, "7d": 1240 }, tags: ["#ShotOnX2", "#NightMode", "#AuroraNights"], categories: ["Smartphones", "Camera"], split: [78, 17, 5], owners: [55, 30, 15] },
    { name: "Battery & charging", momentum: 82, move: 4, trend: "up", mentions: { "30d": 4885, "7d": 1410 }, tags: ["#ChargerFail", "#FastCharge", "#BatteryLife"], categories: ["Accessories", "Service"], split: [22, 30, 48], owners: [48, 38, 14] },
    { name: "Price drop", momentum: 74, move: 1, trend: "down", mentions: { "30d": 2760, "7d": 610 }, tags: ["#FestiveDeals", "#PriceDrop"], categories: ["Smartphones"], split: [40, 45, 15], owners: [33, 41, 26] },
    { name: "Store openings", momentum: 63, move: 0, trend: "flat", mentions: { "30d": 1210, "7d": 330 }, tags: ["#AuroraStore", "#PuneLaunch"], categories: ["Retail"], split: [70, 26, 4], owners: [80, 12, 8] },
  ] as { name: string; momentum: number; move: number; trend: Trend; mentions: Record<TourRange, number>; tags: string[]; categories: string[]; split: Split; owners: Three }[],
  /** Selected on load: Night photography. */
  topicInitial: 1,
  topicCloud: [
    { term: "#AuroraX2Launch", weight: 21, sentiment: "pos" },
    { term: "Night photography", weight: 19, sentiment: "pos" },
    { term: "Battery & charging", weight: 18, sentiment: "neg" },
    { term: "#ChargerFail", weight: 14, sentiment: "neg" },
    { term: "Price drop", weight: 16, sentiment: "neu" },
    { term: "#FestiveDeals", weight: 13, sentiment: "neu" },
    { term: "#ShotOnX2", weight: 17, sentiment: "pos" },
    { term: "Store openings", weight: 13, sentiment: "pos" },
    { term: "Support tickets", weight: 13, sentiment: "neg" },
  ] as { term: string; weight: number; sentiment: Sentiment }[],

  /* Step 4 · Sentiment Analysis */
  overall: {
    "30d": { net: 24, delta: "1 pt vs last period", trend: "up" },
    "7d": { net: 21, delta: "2 pts vs last period", trend: "down" },
  } as Record<TourRange, { net: number; delta: string; trend: Trend }>,
  platformNet: [
    { network: "facebook", net: { "30d": 34, "7d": 31 }, delta: { "30d": 2, "7d": -3 } },
    { network: "x", net: { "30d": 10, "7d": 8 }, delta: { "30d": -1, "7d": -3 } },
    { network: "youtube", net: { "30d": 43, "7d": 40 }, delta: { "30d": 3, "7d": 1 } },
    { network: "instagram", net: { "30d": 9, "7d": 4 }, delta: { "30d": -12, "7d": -17 } },
  ] as { network: Network; net: Record<TourRange, number>; delta: Record<TourRange, number> }[],
  threshold: { min: 0, max: 50, initial: 15 },
  hashtagNet: [
    { tag: "#ShotOnX2", net: "+64", move: "5", trend: "up", note: "" },
    { tag: "#AuroraX2Launch", net: "+41", move: "2", trend: "up", note: "" },
    { tag: "#BrightNights", net: "+6", move: "18", trend: "down", note: "Campaign tag · slipping" },
    { tag: "#ChargerFail", net: "−72", move: "4", trend: "down", note: "" },
  ] as { tag: string; net: string; move: string; trend: Trend; note: string }[],

  /* Step 5 · Keyword Analysis ("Bright Nights" campaign line) */
  keyword: {
    term: "“Bright Nights”",
    kpis: {
      "30d": [
        { label: "Mentions", value: 6840, display: "6,840", delta: "220%", trend: "up" },
        { label: "Engagement", value: 388000, display: "388K", delta: "140%", trend: "up" },
        { label: "Reach", value: 3100000, display: "3.1M", delta: "96%", trend: "up" },
        { label: "Net sentiment", value: 18, display: "+18", delta: "6 pts", trend: "down" },
      ],
      "7d": [
        { label: "Mentions", value: 2110, display: "2,110", delta: "64%", trend: "up" },
        { label: "Engagement", value: 121000, display: "121K", delta: "38%", trend: "up" },
        { label: "Reach", value: 940000, display: "940K", delta: "30%", trend: "up" },
        { label: "Net sentiment", value: 12, display: "+12", delta: "9 pts", trend: "down" },
      ],
    } as Record<TourRange, Kpi[]>,
    platforms: [
      { network: "instagram", share: 46 },
      { network: "youtube", share: 28 },
      { network: "facebook", share: 20 },
      { network: "x", share: 6 },
    ] as { network: Network; share: number }[],
    strongest: { network: "youtube" as Network, net: "+52" },
    weakest: { network: "x" as Network, net: "−8" },
    split: [49, 30, 21] as Split,
    articles: [
      { network: "youtube", text: "“Bright Nights ad is gorgeous.”", sentiment: "pos" },
      { network: "x", text: "“Another ad, still no charger fix.”", sentiment: "neg" },
    ] as { network: Network; text: string; sentiment: Sentiment }[],
    hashtags: [
      { tag: "#NightMode", net: "+44", sentiment: "pos" },
      { tag: "#AuroraNights", net: "+37", sentiment: "pos" },
      { tag: "#BrightNights", net: "+18", sentiment: "neu" },
      { tag: "#CampaignAd", net: "−12", sentiment: "neg" },
    ] as { tag: string; net: string; sentiment: Sentiment }[],
    categories: [
      { label: "Camera", share: 54 },
      { label: "Smartphones", share: 31 },
      { label: "Accessories", share: 9 },
      { label: "Service", share: 6 },
    ],
    trending: ["#BrightNights", "#NightMode", "#AuroraNights"],
    topics: ["Night photography", "Low-light video", "Festive lights"],
  },

  /* Step 6 · Promotable Stories */
  evidence: { min: 100, max: 2000, step: 100, initial: 500 },
  candidates: [
    { title: "Night-mode photos fans can’t stop sharing", posts: 3420 },
    { title: "Unboxing videos rising in Pune", posts: 1120 },
    { title: "Battery lasts the full trek", posts: 860 },
    { title: "Store staff shout-outs", posts: 410 },
  ],
  story: {
    tags: ["#AuroraNights", "#ShotOnX2"],
    keywords: ["night mode", "no tripod"],
    volume: leadStory.volume,
    engagement: leadStory.engagement,
    reach: { value: 1800000, display: leadStory.reach, unit: "estimated" },
    positive: leadStory.positive,
    posts: home.story.posts,
  },

  /* Step 7 · SMA Reports */
  report: {
    keyword: keywordReport.map((r) => ({ name: r.keyword, mentions: r.mentions, change: r.change, trend: r.trend as Trend, sentiment: r.sentiment as Sentiment })),
    entity: [
      { name: "Aurora X2", mentions: 8420, change: "22%", trend: "up", sentiment: "pos" },
      { name: "Aurora Care", mentions: 1960, change: "35%", trend: "up", sentiment: "neg" },
      { name: "Pune store", mentions: 540, change: "12%", trend: "up", sentiment: "pos" },
      { name: "Aurora Buds", mentions: 410, change: "4%", trend: "down", sentiment: "neu" },
    ] as { name: string; mentions: number; change: string; trend: Trend; sentiment: Sentiment }[],
  },
  /** Mentions scale with the period: a day is a seventh of the week, a month 4.3 weeks. */
  periods: {
    daily: { factor: 1 / 7, title: "Daily brief · 12 Oct", vs: "vs prev. day", when: "Every morning, 8:45 AM" },
    weekly: { factor: 1, title: "Weekly brief · 5–11 Oct", vs: "vs prev. week", when: "Every Monday, 8:45 AM" },
    monthly: { factor: 4.3, title: "Monthly brief · September", vs: "vs prev. month", when: "1st of each month, 8:45 AM" },
  },
}

/* --------------------------------------------------------------------------
   Solutions (Solutions.dc.html)
   -------------------------------------------------------------------------- */
/** A small stat tile: display string, change line and its direction (mobile first-hour KPIs). */
export type SolutionsStat = { label: string; display: string; note: string; trend: Trend; tone?: Sentiment }

export const solutions = {
  monday: { title: "Your Monday view", when: "Weekly brief · 8:45 AM", mentions: "11,382", mentionsDelta: "12%", sov: "42%", sovDelta: "2 pts" },
  brand: {
    filters: [
      { k: "Brand", v: "Aurora Mobile" },
      { k: "Date", v: "Last 7 days" },
      { k: "Networks", v: "All four" },
    ],
    kpis: [
      { label: "Mentions", value: 48214, display: "48,214", note: "18%", trend: "up" },
      { label: "Engagement", value: 1920000, display: "1.92M", note: "10%", trend: "up", compact: true },
      { label: "Net sentiment", value: 36, display: "+36", note: "3 pts", trend: "down", prefix: "+" },
      { label: "Reach *", value: 12400000, display: "12.4M", note: "9%", trend: "up", compact: true },
    ] as readonly (SolutionsStat & { value: number; compact?: boolean; prefix?: string })[],
    topics: [
      { rank: 1, topic: "Battery & charging", mentions: "3,104", trend: "flat", move: "Same" },
      { rank: 2, topic: "Night photography", mentions: "2,288", trend: "up", move: "Up 2", lead: true },
      { rank: 3, topic: "X2 launch", mentions: "1,940", trend: "down", move: "Down 1" },
      { rank: 4, topic: "Pricing", mentions: "1,512", trend: "down", move: "Down 1" },
    ] as readonly { rank: number; topic: string; mentions: string; trend: Trend; move: string; lead?: boolean }[],
    hashtags: [
      { tag: "#AuroraNights", growth: 52 },
      { tag: "#ChargerFail", growth: 48 },
      { tag: "#ShotOnX2", growth: 29 },
      { tag: "#X2Unboxing", growth: 21 },
    ],
    story: { title: "Night-mode photos fans can’t stop sharing", evidence: "3,420 posts · 214K engagements", positive: "81% Positive" },
  },
  pr: {
    kpis: [
      { label: "Alerts today", display: "1 High", note: "#AuroraLaunch", trend: "up", tone: "neg" },
      { label: "Negative mentions", display: "+38%", note: "in a day", trend: "up", tone: "neg" },
      { label: "Net sentiment", display: "+36", note: "3 pts", trend: "down" },
      { label: "Networks slipping", display: "1 of 4", note: "X", trend: "flat" },
    ] as readonly SolutionsStat[],
    alerts: [
      { level: "high", subject: "#AuroraLaunch", metric: "Negative mentions", change: "+38%", trend: "up", tone: "neg", when: "in a day" },
      { level: "medium", subject: "Aurora Care Plus", metric: "Net sentiment", change: "12 pts", trend: "down", tone: "neg", when: "in 7 days" },
      { level: "info", subject: "Night Mode", metric: "Mentions", change: "2.1×", trend: "up", tone: "pos", when: "usual level" },
    ] as readonly { level: "high" | "medium" | "info"; subject: string; metric: string; change: string; trend: Trend; tone: Sentiment; when: string }[],
    platforms: [
      { network: "facebook", split: [54, 28, 18] },
      { network: "youtube", split: [61, 22, 17] },
      { network: "instagram", split: [63, 24, 13] },
      { network: "x", split: [38, 27, 35], slipping: true },
    ] as readonly { network: Network; split: Split; slipping?: boolean }[],
    xNote: "X positive share ▼ 9 pts this week",
    posts: [
      { initials: "KR", network: "x", time: "9:04 AM", text: "Update 4.2 drained my battery overnight." },
      { initials: "TS", network: "x", time: "8:41 AM", text: "Still no reply from support after 3 days." },
      { initials: "MA", network: "facebook", time: "8:12 AM", text: "Charger stopped working after a week." },
    ] as readonly { initials: string; network: Network; time: string; text: string }[],
  },
  agencies: {
    kpis: [
      { label: "Aurora index", display: "118", note: "from 100", trend: "up" },
      { label: "Nimbus index", display: "106", note: "from 100", trend: "up" },
      { label: "Kestrel index", display: "94", note: "from 100", trend: "down" },
      { label: "#AuroraLaunch", display: "12,480", note: "38%", trend: "up" },
    ] as readonly SolutionsStat[],
    /** Mentions indexed to week 1 = 100, read off the reference polylines (ends 118 · 106 · 94). */
    index: {
      aurora: [100, 101, 103, 106, 108, 111, 114, 118],
      nimbus: [100, 100, 101, 102, 103, 104, 105, 106],
      kestrel: [100, 99, 98, 97, 97, 96, 95, 94],
    },
    report: {
      title: "Weekly keyword report: #AuroraLaunch",
      to: "to client@example.com · Mon 8:45 AM",
      stats: [
        { label: "Mentions", display: "12,480", note: "38%", trend: "up" },
        { label: "Net sentiment", display: "+29", note: "4 pts", trend: "down" },
      ] as readonly SolutionsStat[],
      topicsLabel: "Top topics:",
      topics: "Unboxing · Camera · Pricing",
    },
    schedules: [
      { name: "Weekly client brief", when: "Every Monday · 8:45 AM · PDF", short: "Weekly client brief · Mon 8:45 AM · PDF" },
      { name: "Competitor snapshot", when: "Monthly · 1st · Excel", short: "Competitor snapshot · Monthly · Excel" },
      { name: "#AuroraLaunch keyword report", when: "Every Monday · 9:00 AM · PDF" },
    ] as readonly { name: string; when: string; short?: string }[],
  },
  leadership: {
    kpis: [
      { label: "Share of voice", display: "42%", note: "2 pts", trend: "up" },
      { label: "Gap to Nimbus", display: "+7 pts", note: "from +2", trend: "up" },
      { label: "Mentions", display: "11,382", note: "12%", trend: "up" },
      { label: "Net sentiment", display: "+24", note: "2 pts", trend: "down" },
    ] as readonly SolutionsStat[],
    shareOfVoice: { aurora: 42, nimbus: 35, kestrel: 23 },
    /** Aurora's lead over Nimbus in share-of-voice points over eight weeks (2 → 7). */
    gap: [2, 3, 3, 4, 5, 5, 6, 7],
    gapNote: "Gap widened from 2 to 7 pts in Aurora’s favour",
    brief: {
      title: "Weekly brief: Aurora Mobile",
      to: "to leadership@example.com · Mon 8:45 AM",
      rows: [
        { label: "Mentions", display: "11,382", note: "12%", trend: "up" },
        { label: "Net sentiment", display: "+24", note: "2 pts", trend: "down" },
        { label: "Share of voice", display: "42%", note: "2 pts", trend: "up" },
      ] as readonly SolutionsStat[],
      changedLabel: "What changed:",
      changed: "charging complaints kept sentiment from rising.",
    },
  },
  /** "One number, one meaning": the same figure in two places. */
  sameNumber: { metric: "Share of voice · Aurora Mobile", value: "42%", delta: "2 pts vs last period" },
}

/* --------------------------------------------------------------------------
   About (About.dc.html) illustration
   -------------------------------------------------------------------------- */
export const about = { mentions: "3,104 mentions", reach: "1.8M", scope: "12 modules · 4 networks" }

/* --------------------------------------------------------------------------
   Request a demo (Demo.dc.html) hero preview
   -------------------------------------------------------------------------- */
export const demoPreview = {
  title: "Aurora Mobile · Last 30 days",
  kpis: [
    { label: "Mentions", value: 48214, prefix: "", suffix: "", delta: "18%", trend: "up" },
    { label: "Net sentiment", value: 36, prefix: "+", suffix: "", delta: "3 pts", trend: "down" },
    { label: "Share of voice", value: 42, prefix: "", suffix: "%", delta: "2 pts", trend: "up" },
  ] as const,
  shareOfVoice: { aurora: 42, nimbus: 35, kestrel: 23 },
  caption:
    "Sample preview: Aurora Mobile mentions 48,214 up 18%, net sentiment +36 down 3 points, share of voice 42% against Nimbus 35% and Kestrel 23%.",
} as const

/** About · "What we believe" mini illustrations. */
export const aboutPrinciples = {
  mentions: 3104,
  posts: [
    { initials: "KR", text: "“Battery drains faster since 4.2.”" },
    { initials: "LM", text: "“Night shots are unreal.”" },
  ],
  reach: "1.8M",
} as const

/* --------------------------------------------------------------------------
   Log in preview (Login.dc.html): the weekly KPIs plus mention volume by day.
   -------------------------------------------------------------------------- */
export const loginPreview = {
  filters: ["Last 7 days", "All networks", "Brand: Aurora Mobile"],
  /** Mention volume line, Mon–Sun (0–100 plot units), peaking on Thursday. */
  volume: [38, 46, 58, 86, 70, 54, 62],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  /** KPI sparklines (Mentions, Engagement, Net sentiment), shape only. */
  sparks: [
    [4, 6, 5, 9, 12, 14, 18],
    [6, 5, 8, 9, 11, 10, 14],
    [16, 14, 15, 12, 13, 10, 11],
  ],
  mention: { initials: "KR", handle: "@kr_tech", network: "x", text: "“Update 4.2 drained my battery overnight.”", sentiment: "neg" },
} as const
