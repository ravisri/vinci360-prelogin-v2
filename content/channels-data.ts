/**
 * Source Analysis sample data. One record per view (Interactions, Top content, Top voices,
 * Amplification) drives the view panel, the "Five breakdowns" walkthrough, the insight cards and
 * the filter demo. Numbers follow the design reference. Fictional brands only (Aurora, Nimbus, Kestrel).
 */
import type { ChartTone } from "@/components/charts/tones"
import type { Sentiment, Split, Trend } from "@/content/sample-data"

/** View order: Interactions, Top content, Top voices, Amplification. */
export const channelOrder = ["interactions", "content", "voices", "amplification"] as const

const compact = { notation: "compact", maximumFractionDigits: 1 } as const
const oneDp = { minimumFractionDigits: 1, maximumFractionDigits: 1 } as const

export type ChannelKpi = {
  label: string
  value: number
  format?: Intl.NumberFormatOptions
  prefix?: string
  suffix?: string
  /** Colours the number and its sub line (Amplification "▲ 44%" · "Positive"). */
  valueTone?: Sentiment
  delta?: { trend: Trend; text: string; tone?: Sentiment }
  /** Muted line instead of a delta, e.g. "this period". */
  sub?: string
}

/** Where a hotspot sits: on the left or right edge (or top corner) of one widget, clear of its numbers. */
export type HotspotSlot = "reactions" | "growth" | "sentiment" | "table" | "subs" | "influence" | "kpis" | "amplification"
export type ChannelHotspot = { title: string; text: string; at: HotspotSlot; side: "left" | "right" | "top-left" | "top-right" | "right-upper" | "right-lower" }

type Detail =
  | {
      kind: "reactions"
      title: string
      total: string
      items: readonly { label: string; share: number; tone: ChartTone; note?: string; delta?: { trend: Trend; text: string; tone?: Sentiment }; bold?: boolean }[]
      growth: { title: string; delta: string; deltaHero: string; series: readonly number[]; range: string }
    }
  | {
      kind: "videos"
      caption: string
      rows: readonly { title: string; views: string; likes: string; comments: string; sentiment: Sentiment; pct: number; flag?: string }[]
      subs: { title: string; series: readonly number[]; moves: string; net: string }
    }
  | {
      kind: "influence"
      followers: { label: string; value: number; delta: string }
      score: { label: string; labelShort: string; value: number }
      note: string
      top: { title: string; items: readonly { type: string; likes: string }[] }
    }
  | {
      kind: "amplification"
      sides: readonly { title: string; stats: readonly { label: string; value: string }[]; bars: readonly number[]; tone: ChartTone; outlined?: boolean }[]
    }

type Row = { name: string; sentiment: Sentiment; pct: number }

export type ChannelNetwork = {
  name: string
  /** The view's main object: Profile, Post or Author. */
  obj: string
  objLong: string
  owner: { initials: string; name: string; sub: string; subObject: string }
  pills: readonly { label: string; value: string }[]
  metrics: readonly string[]
  tells: string
  caption: string
  kpis: readonly ChannelKpi[]
  /** Top voices and Amplification open on their detail; Interactions and Top content on the KPI row. */
  detailFirst?: boolean
  detail: Detail
  sentiment?: { title?: string; split: Split }
  footnote?: string
  hotspots: readonly ChannelHotspot[]
  /** "Each view, in plain words". */
  terms: { measures: string; detail: string }
  walk: {
    keywords: { volume: string; rows: readonly (Row & { mentions: string; engagement: string; reach: string })[] }
    entities: readonly (Row & { mentions: string; engagement: string; series: readonly number[]; trend: Trend; change: string })[]
    groups: { kind: string; rows: readonly (Row & { mentions: string; engagement: string; topic: string })[] }
    hashtags: readonly (Row & { popularity: string; reach: string; engagement: string; growth: string; growthTrend: Trend })[]
    objects: readonly (Row & { type: string; metric: string })[]
  }
  filter: {
    objects: readonly string[]
    groups: readonly string[]
    contentTypes: readonly string[]
    base: { mentions: number; er: string; split: Split; top: string }
  }
}

export const channelNetworks: Record<(typeof channelOrder)[number], ChannelNetwork> = {
  interactions: {
    name: "Interactions",
    obj: "Profile",
    objLong: "Profiles",
    owner: { initials: "AM", name: "Aurora Mobile", sub: "Profile · 1.24M followers", subObject: "Profile · 1.24M followers" },
    pills: [
      { label: "Date", value: "Last 30 days" },
      { label: "Profile", value: "Aurora Mobile" },
      { label: "Keyword or entity", value: "All" },
      { label: "Content", value: "All" },
      { label: "Sort", value: "Engagement" },
    ],
    metrics: ["Posts", "Interactions by type", "Comments", "Shares", "Engagement rate", "Follower growth", "Audience sentiment"],
    tells: "how people engage with your profile, and how they feel when they respond.",
    caption:
      "Sample Interactions view for the Aurora Mobile profile: 46 posts, 182 thousand interactions of which saves are 22% and complaints 4%, 21.4 thousand comments, 9.8 thousand shares, a 3.9% engagement rate, followers up 3.2%, and audience response 61% positive.",
    kpis: [
      { label: "Posts", value: 46, delta: { trend: "up", text: "8%" } },
      { label: "Interactions", value: 182000, format: compact, delta: { trend: "up", text: "14%" } },
      { label: "Comments", value: 21400, format: compact, delta: { trend: "up", text: "6%" } },
      { label: "Shares", value: 9800, format: compact, delta: { trend: "down", text: "3%" } },
      { label: "Engagement rate", value: 3.9, format: oneDp, suffix: "%", delta: { trend: "up", text: "0.4 pts" } },
    ],
    detail: {
      kind: "reactions",
      title: "Interactions by type",
      total: "182K",
      items: [
        { label: "Likes", share: 58, tone: "chart-1", note: "105K" },
        { label: "Saves", share: 22, tone: "chart-4", delta: { trend: "up", text: "18%" }, bold: true },
        { label: "Mentions", share: 7, tone: "chart-6", note: "12.7K" },
        { label: "Link clicks", share: 6, tone: "chart-5", note: "10.9K" },
        { label: "Complaints", share: 4, tone: "chart-2", delta: { trend: "down", text: "2%", tone: "pos" } },
        { label: "Profile visits", share: 3, tone: "chart-3", note: "5.5K" },
      ],
      growth: {
        title: "Follower growth",
        delta: "38.2K",
        deltaHero: "38.2K (+3.2%)",
        series: [1.2, 1.203, 1.205, 1.209, 1.212, 1.215, 1.221, 1.224, 1.229, 1.233, 1.236, 1.24],
        range: "1.20M → 1.24M followers",
      },
    },
    sentiment: { title: "Sentiment of audience response", split: [61, 25, 14] },
    hotspots: [
      { title: "Interactions, split by type", text: "Saves rose 18% while complaints fell 2%. The quality of engagement shows, not only its volume.", at: "reactions", side: "left" },
      { title: "Profile followers", text: "Follower growth for the profile, over the date range you set.", at: "growth", side: "right" },
      { title: "How the audience responded", text: "Tone of comments on the profile’s posts, always shown with a label.", at: "sentiment", side: "left" },
    ],
    terms: { measures: "Posts, interactions by type, comments, shares, follower growth", detail: "The quality of engagement, not only its volume." },
    walk: {
      keywords: {
        volume: "2,840",
        rows: [
          { name: "Night Mode", mentions: "1,240", engagement: "38.2K", reach: "0.92M", sentiment: "pos", pct: 64 },
          { name: "battery life", mentions: "980", engagement: "22.6K", reach: "0.71M", sentiment: "neg", pct: 41 },
          { name: "X2 price", mentions: "620", engagement: "11.4K", reach: "0.40M", sentiment: "neu", pct: 46 },
        ],
      },
      entities: [
        { name: "Aurora Mobile", mentions: "4,820", engagement: "96K", sentiment: "pos", pct: 58, series: [6, 7, 9, 8, 11, 13, 15], trend: "up", change: "22%" },
        { name: "Nimbus", mentions: "3,910", engagement: "71K", sentiment: "neu", pct: 47, series: [10, 11, 10, 12, 11, 12, 12], trend: "up", change: "4%" },
        { name: "Kestrel", mentions: "2,140", engagement: "38K", sentiment: "neg", pct: 42, series: [9, 8, 8, 7, 6, 6, 5], trend: "down", change: "11%" },
      ],
      groups: {
        kind: "Communities",
        rows: [
          { name: "Aurora X2 Owners Club", mentions: "1,420", engagement: "26K", sentiment: "pos", pct: 69, topic: "Night photos" },
          { name: "Pune Phone Deals", mentions: "860", engagement: "9.2K", sentiment: "neu", pct: 51, topic: "Price drops" },
          { name: "Android Help Desk", mentions: "540", engagement: "4.1K", sentiment: "neg", pct: 47, topic: "Charging" },
        ],
      },
      hashtags: [
        { name: "#AuroraX2Launch", popularity: "2,140", reach: "1.4M", engagement: "61K", growth: "34%", growthTrend: "up", sentiment: "pos", pct: 59 },
        { name: "#ShotOnX2", popularity: "1,380", reach: "0.9M", engagement: "44K", growth: "22%", growthTrend: "up", sentiment: "pos", pct: 72 },
        { name: "#ChargerFail", popularity: "610", reach: "0.3M", engagement: "8.2K", growth: "48%", growthTrend: "up", sentiment: "neg", pct: 63 },
      ],
      objects: [
        { name: "X2 night shots, reader picks", type: "Photo post", metric: "24.6K interactions", sentiment: "pos", pct: 74 },
        { name: "Update 4.2 is rolling out", type: "Post", metric: "18.1K interactions", sentiment: "neg", pct: 52 },
        { name: "Store opening in Pune", type: "Event post", metric: "9.4K interactions", sentiment: "pos", pct: 81 },
      ],
    },
    filter: {
      objects: ["Aurora Mobile", "Aurora Mobile Care"],
      groups: ["All communities", "Aurora X2 Owners Club", "Pune Phone Deals"],
      contentTypes: ["All content", "Posts", "Photos", "Videos", "Links"],
      base: { mentions: 10870, er: "3.9%", split: [61, 25, 14], top: "X2 night shots, reader picks" },
    },
  },
  content: {
    name: "Top content",
    obj: "Post",
    objLong: "Posts",
    owner: { initials: "AO", name: "Aurora Mobile Official", sub: "Profile · 412K audience", subObject: "Profile · 412K audience" },
    pills: [
      { label: "Date", value: "Last 30 days" },
      { label: "Profile", value: "Aurora Mobile Official" },
      { label: "Content", value: "Long-form posts" },
      { label: "Sort", value: "Views" },
    ],
    metrics: ["Posts", "Views", "Likes", "Comments", "Comment sentiment", "Audience change", "Engagement rate"],
    tells: "whether a post’s views come with a good reception.",
    caption:
      "Sample Top content view for Aurora Mobile Official: 4.1 million views across 12 posts. The update explainer post has 940 thousand views but 54% negative comments. Audience net up 9.4 thousand.",
    kpis: [
      { label: "Posts", value: 12, sub: "this period" },
      { label: "Views", value: 4100000, format: compact, delta: { trend: "up", text: "21%" } },
      { label: "Likes", value: 171000, format: compact, delta: { trend: "up", text: "9%" } },
      { label: "Comments", value: 20600, format: compact, delta: { trend: "up", text: "15%" } },
      { label: "Engagement rate", value: 4.6, format: oneDp, suffix: "%", delta: { trend: "down", text: "0.3 pts" } },
    ],
    detail: {
      kind: "videos",
      caption: "Top 4 posts by views, with comment sentiment reported separately",
      rows: [
        { title: "X2 Night Mode: full camera test", views: "1.42M", likes: "61K", comments: "6.8K", sentiment: "pos", pct: 72 },
        { title: "X2 software update 4.2 explained", views: "0.94M", likes: "22K", comments: "5.9K", sentiment: "neg", pct: 54, flag: "Heavily viewed, badly received" },
        { title: "Aurora X2 battery: 3-day trek", views: "0.86M", likes: "38K", comments: "4.1K", sentiment: "pos", pct: 68 },
        { title: "Unboxing the Aurora X2", views: "0.38M", likes: "27K", comments: "1.4K", sentiment: "pos", pct: 64 },
      ],
      subs: { title: "Audience change", series: [402.6, 403.4, 404.1, 404.9, 405.8, 406.2, 407.5, 408.9, 409.6, 410.8, 412], moves: "Gained 12.1K · Lost 2.7K", net: "Net ▲ 9.4K audience" },
    },
    hotspots: [
      { title: "Views are not approval", text: "The update post is second by views, yet most of its comments are negative.", at: "table", side: "left" },
      { title: "Reported separately", text: "Comment sentiment sits in its own column, apart from views and likes.", at: "subs", side: "right-upper" },
      { title: "Gains and losses", text: "Audience gained and lost, not only the net figure.", at: "subs", side: "right-lower" },
    ],
    terms: { measures: "Posts, views, likes, comments, comment sentiment, audience change", detail: "Comment sentiment reported separately from views." },
    walk: {
      keywords: {
        volume: "894",
        rows: [
          { name: "Night Mode", mentions: "410", engagement: "52.0K", reach: "1.10M", sentiment: "pos", pct: 71 },
          { name: "battery life", mentions: "286", engagement: "18.9K", reach: "0.62M", sentiment: "pos", pct: 55 },
          { name: "X2 price", mentions: "198", engagement: "9.7K", reach: "0.33M", sentiment: "neg", pct: 44 },
        ],
      },
      entities: [
        { name: "Aurora Mobile", mentions: "1,260", engagement: "148K", sentiment: "pos", pct: 62, series: [5, 6, 8, 9, 12, 14, 18], trend: "up", change: "31%" },
        { name: "Nimbus", mentions: "1,480", engagement: "162K", sentiment: "pos", pct: 55, series: [12, 13, 12, 13, 14, 13, 14], trend: "up", change: "6%" },
        { name: "Kestrel", mentions: "610", engagement: "51K", sentiment: "neu", pct: 49, series: [6, 6, 7, 6, 6, 7, 6], trend: "flat", change: "0%" },
      ],
      groups: {
        kind: "Your defined set of profiles",
        rows: [
          { name: "Tech review creators", mentions: "620", engagement: "88K", sentiment: "pos", pct: 58, topic: "Camera tests" },
          { name: "Unboxing creators", mentions: "340", engagement: "41K", sentiment: "pos", pct: 66, topic: "First look" },
          { name: "Repair and DIY creators", mentions: "120", engagement: "9.6K", sentiment: "neg", pct: 52, topic: "Battery swaps" },
        ],
      },
      hashtags: [
        { name: "#X2Unboxing", popularity: "380", reach: "1.9M", engagement: "74K", growth: "41%", growthTrend: "up", sentiment: "pos", pct: 68 },
        { name: "#NightModeTips", popularity: "260", reach: "1.1M", engagement: "52K", growth: "18%", growthTrend: "up", sentiment: "pos", pct: 75 },
        { name: "#ChargerFail", popularity: "90", reach: "0.2M", engagement: "3.9K", growth: "26%", growthTrend: "up", sentiment: "neg", pct: 58 },
      ],
      objects: [
        { name: "X2 Night Mode: full camera test", type: "Long-form post", metric: "1.42M views", sentiment: "pos", pct: 72 },
        { name: "X2 software update 4.2 explained", type: "Long-form post", metric: "0.94M views", sentiment: "neg", pct: 54 },
        { name: "Aurora X2 battery: 3-day trek", type: "Long-form post", metric: "0.86M views", sentiment: "pos", pct: 68 },
      ],
    },
    filter: {
      objects: ["Aurora Mobile Official", "Aurora Mobile Tips"],
      groups: ["All creator sets", "Tech review creators", "Unboxing creators"],
      contentTypes: ["All content", "Long-form posts"],
      base: { mentions: 3350, er: "4.6%", split: [62, 22, 16], top: "X2 Night Mode: full camera test" },
    },
  },
  voices: {
    name: "Top voices",
    obj: "Author",
    objLong: "Authors",
    owner: { initials: "AM", name: "@aurora.mobile", sub: "Author · 2.1M followers", subObject: "Author · 2.1M followers · influence 71" },
    pills: [
      { label: "Date", value: "Last 30 days" },
      { label: "Author", value: "@aurora.mobile" },
      { label: "Content", value: "Posts and short-form posts" },
      { label: "Sort", value: "Engagement" },
    ],
    metrics: ["Posts", "Short-form posts", "Likes", "Comments", "Engagement rate", "Followers", "Influence score", "Mention sentiment"],
    tells: "how far an account reaches and how much weight it carries, as two separate things.",
    caption:
      "Sample Top voices view for the author @aurora.mobile: 2.1 million followers shown next to an influence score of 71 out of 100; 38 posts and 14 short-form posts; 486 thousand likes; 2.4% engagement rate; mentions 58% positive.",
    kpis: [
      { label: "Posts", value: 38, delta: { trend: "up", text: "4" } },
      { label: "Short-form *", value: 14, delta: { trend: "up", text: "3" } },
      { label: "Likes", value: 486000, format: compact, delta: { trend: "up", text: "11%" } },
      { label: "Comments", value: 12900, format: compact, delta: { trend: "up", text: "4%" } },
      { label: "Engagement rate", value: 2.4, format: oneDp, suffix: "%", delta: { trend: "up", text: "0.2 pts" } },
    ],
    detailFirst: true,
    detail: {
      kind: "influence",
      followers: { label: "Followers · reach", value: 2100000, delta: "1.8%" },
      score: { label: "Influence score · authority", labelShort: "Influence · authority", value: 71 },
      note: "Reach and authority are reported side by side, never merged.",
      top: {
        title: "Top content",
        items: [
          { type: "Short-form post", likes: "84K likes" },
          { type: "Post", likes: "52K likes" },
          { type: "Short-form post", likes: "31K likes" },
        ],
      },
    },
    sentiment: { title: "Sentiment of mentions", split: [58, 27, 15] },
    footnote: "* Short-form posts are counted separately from other posts.",
    hotspots: [
      { title: "Followers are not influence", text: "Follower count shows reach. The influence score shows how much weight the account carries.", at: "influence", side: "right" },
      { title: "Posts and short-form posts", text: "Short-form posts are counted apart from other posts.", at: "kpis", side: "top-left" },
      { title: "What people say about the account", text: "Tone of mentions, shown with a label as well as a colour.", at: "sentiment", side: "left" },
    ],
    terms: { measures: "Posts and short-form posts, likes, comments, followers, influence score", detail: "Influence reported next to follower count." },
    walk: {
      keywords: {
        volume: "2,860",
        rows: [
          { name: "Night Mode", mentions: "1,860", engagement: "121K", reach: "2.40M", sentiment: "pos", pct: 74 },
          { name: "battery life", mentions: "520", engagement: "24.1K", reach: "0.58M", sentiment: "neu", pct: 48 },
          { name: "X2 price", mentions: "480", engagement: "16.8K", reach: "0.51M", sentiment: "neu", pct: 45 },
        ],
      },
      entities: [
        { name: "Aurora Mobile", mentions: "6,140", engagement: "412K", sentiment: "pos", pct: 66, series: [8, 9, 11, 12, 14, 16, 17], trend: "up", change: "19%" },
        { name: "Nimbus", mentions: "4,880", engagement: "356K", sentiment: "pos", pct: 61, series: [11, 12, 13, 12, 13, 14, 14], trend: "up", change: "8%" },
        { name: "Kestrel", mentions: "1,920", engagement: "98K", sentiment: "neu", pct: 50, series: [7, 6, 7, 6, 5, 6, 5], trend: "down", change: "6%" },
      ],
      groups: {
        kind: "Your defined set of accounts",
        rows: [
          { name: "Photography creators", mentions: "1,180", engagement: "204K", sentiment: "pos", pct: 77, topic: "Night shots" },
          { name: "Travel creators", mentions: "640", engagement: "96K", sentiment: "pos", pct: 70, topic: "Trek battery" },
          { name: "Tech deal accounts", mentions: "410", engagement: "22K", sentiment: "neu", pct: 49, topic: "Pricing" },
        ],
      },
      hashtags: [
        { name: "#ShotOnX2", popularity: "4,620", reach: "3.8M", engagement: "288K", growth: "29%", growthTrend: "up", sentiment: "pos", pct: 78 },
        { name: "#AuroraNights", popularity: "2,910", reach: "2.2M", engagement: "164K", growth: "52%", growthTrend: "up", sentiment: "pos", pct: 81 },
        { name: "#ChargerFail", popularity: "420", reach: "0.3M", engagement: "6.1K", growth: "8%", growthTrend: "down", sentiment: "neg", pct: 55 },
      ],
      objects: [
        { name: "City lights at 11 PM", type: "Short-form post", metric: "84K likes", sentiment: "pos", pct: 79 },
        { name: "X2 in Dusk Blue", type: "Post", metric: "52K likes", sentiment: "pos", pct: 70 },
        { name: "Update 4.2 tips", type: "Short-form post", metric: "31K likes", sentiment: "neu", pct: 48 },
      ],
    },
    filter: {
      objects: ["@aurora.mobile", "@aurora.care"],
      groups: ["All account sets", "Photography creators", "Travel creators"],
      contentTypes: ["All content", "Posts", "Short-form posts", "Image sets"],
      base: { mentions: 13940, er: "2.4%", split: [58, 27, 15], top: "Short-form post · City lights at 11 PM" },
    },
  },
  amplification: {
    name: "Amplification",
    obj: "Post",
    objLong: "Posts",
    owner: { initials: "AM", name: "@AuroraMobile", sub: "Author · amplification", subObject: "Author · influence 64" },
    pills: [
      { label: "Date", value: "Last 7 days" },
      { label: "Author", value: "@AuroraMobile" },
      { label: "Content", value: "All posts" },
      { label: "Sort", value: "Engagement" },
    ],
    metrics: ["Posts", "Replies", "Shares", "Quote shares", "Impressions (where available)", "Engagement rate", "Influence score", "Sentiment"],
    tells: "who carries your message further, apart from who starts it.",
    caption:
      "Sample Amplification view for @AuroraMobile: 124 original posts and 312 replies, against 8.4 thousand shares and 1.9 thousand quote shares. Amplification far outweighs original posting. Impressions 4.8 million where available, influence score 64 out of 100, 44% positive.",
    kpis: [
      { label: "Impressions *", value: 4800000, format: compact, delta: { trend: "up", text: "26%" } },
      { label: "Engagement rate", value: 1.7, format: oneDp, suffix: "%", delta: { trend: "up", text: "0.1 pts" } },
      { label: "Influence score", value: 64, suffix: " / 100", sub: "authority" },
      { label: "Sentiment", value: 44, prefix: "▲ ", suffix: "%", valueTone: "pos", sub: "Positive" },
    ],
    detailFirst: true,
    detail: {
      kind: "amplification",
      sides: [
        {
          title: "Original posting",
          stats: [
            { label: "Posts", value: "124" },
            { label: "Replies", value: "312" },
          ],
          bars: [30, 42, 36, 48, 40, 28, 34],
          tone: "chart-1",
        },
        {
          title: "Amplification",
          stats: [
            { label: "Shares", value: "8.4K" },
            { label: "Quote shares", value: "1.9K" },
          ],
          bars: [44, 58, 100, 76, 62, 50, 40],
          tone: "channels",
          outlined: true,
        },
      ],
    },
    sentiment: { split: [44, 31, 25] },
    footnote: "* Impressions are shown where available.",
    hotspots: [
      { title: "Who amplifies, not only who posts", text: "Shares and quote shares are counted apart from original posts and replies.", at: "amplification", side: "right" },
      { title: "Impressions, where available", text: "Shown when the source provides them, and labelled when it does not.", at: "kpis", side: "top-left" },
      { title: "Influence score", text: "How much weight the account carries, separate from how often it posts.", at: "kpis", side: "top-right" },
    ],
    terms: { measures: "Posts, replies, shares, quote shares, impressions where available, influence", detail: "Amplification reported separately from original posting." },
    walk: {
      keywords: {
        volume: "5,420",
        rows: [
          { name: "Night Mode", mentions: "2,340", engagement: "31.5K", reach: "1.80M", sentiment: "pos", pct: 57 },
          { name: "battery life", mentions: "1,960", engagement: "18.2K", reach: "1.20M", sentiment: "neg", pct: 49 },
          { name: "X2 price", mentions: "1,120", engagement: "9.4K", reach: "0.74M", sentiment: "neg", pct: 43 },
        ],
      },
      entities: [
        { name: "Aurora Mobile", mentions: "8,920", engagement: "64K", sentiment: "neu", pct: 44, series: [12, 10, 14, 16, 13, 15, 17], trend: "up", change: "12%" },
        { name: "Nimbus", mentions: "7,310", engagement: "52K", sentiment: "neg", pct: 46, series: [9, 11, 12, 14, 13, 15, 16], trend: "up", change: "17%" },
        { name: "Kestrel", mentions: "3,050", engagement: "21K", sentiment: "neg", pct: 48, series: [7, 7, 6, 8, 7, 6, 6], trend: "down", change: "3%" },
      ],
      groups: {
        kind: "Your defined set of accounts and communities",
        rows: [
          { name: "Tech journalists", mentions: "860", engagement: "14K", sentiment: "neu", pct: 52, topic: "Launch coverage" },
          { name: "Pune tech accounts", mentions: "1,320", engagement: "9.8K", sentiment: "pos", pct: 54, topic: "Store opening" },
          { name: "Customer service watchers", mentions: "990", engagement: "6.1K", sentiment: "neg", pct: 57, topic: "Wait times" },
        ],
      },
      hashtags: [
        { name: "#AuroraX2Launch", popularity: "5,860", reach: "3.1M", engagement: "48K", growth: "37%", growthTrend: "up", sentiment: "neu", pct: 46 },
        { name: "#ChargerFail", popularity: "2,240", reach: "1.2M", engagement: "17K", growth: "61%", growthTrend: "up", sentiment: "neg", pct: 62 },
        { name: "#ShotOnX2", popularity: "1,170", reach: "0.7M", engagement: "12K", growth: "12%", growthTrend: "up", sentiment: "pos", pct: 64 },
      ],
      objects: [
        { name: "Update 4.2 thread", type: "Post", metric: "2.1K shares", sentiment: "neg", pct: 51 },
        { name: "Night Mode contest", type: "Post", metric: "1.8K shares", sentiment: "pos", pct: 66 },
        { name: "Pune store opening", type: "Post", metric: "640 shares", sentiment: "pos", pct: 72 },
      ],
    },
    filter: {
      objects: ["@AuroraMobile", "@AuroraCare"],
      groups: ["All account sets", "Tech journalists", "Pune tech accounts"],
      contentTypes: ["All content", "Posts", "Replies", "Quote shares"],
      base: { mentions: 19280, er: "1.7%", split: [44, 31, 25], top: "Night Mode contest" },
    },
  },
}

export type ChannelKey = (typeof channelOrder)[number]

/** Entity rows: Aurora is the highlight series in the module colour; competitors use other chart tones. */
export const entityTones: readonly ChartTone[] = ["channels", "chart-1", "chart-3"]
export const entityDots = ["bg-channels", "bg-chart-1", "bg-chart-3"] as const

/** Two sample posts behind each sentiment, opened from the main-object view. Initials only. */
export const channelPosts: Record<Sentiment, readonly { initials: string; text: string; sentiment: Sentiment }[]> = {
  pos: [
    { initials: "RK", text: "“Shot this at 11 PM, no tripod.”", sentiment: "pos" },
    { initials: "LM", text: "“Best camera update so far.”", sentiment: "pos" },
  ],
  neg: [
    { initials: "DV", text: "“Battery drains faster since 4.2.”", sentiment: "neg" },
    { initials: "SA", text: "“Rolled back. Not worth it yet.”", sentiment: "neg" },
  ],
  neu: [
    { initials: "PT", text: "“Has anyone tried these tips?”", sentiment: "neu" },
    { initials: "NB", text: "“Waiting for reviews before updating.”", sentiment: "neu" },
  ],
}

/* ------------------------------ Hero (Interactions view) ------------------------------ */
export const channelsHero = {
  network: "interactions" as const,
  caption:
    "Sample Interactions view for the Aurora Mobile profile: interactions split into likes 58%, saves 22%, mentions 7%, link clicks 6%, complaints 4% and profile visits 3%, and followers growing from 1.20 million to 1.24 million over 30 days.",
  pills: [
    { label: "Date", value: "Last 30 days" },
    { label: "Profile", value: "Aurora Mobile" },
    { label: "Content", value: "All" },
  ],
  hotspots: [
    { title: "How people responded, not only how many", text: "Saves, complaints and the other interaction types are counted separately.", at: "reactions", side: "left" },
    { title: "Follower growth for this profile", text: "Measured as profile followers over the date range you set.", at: "growth", side: "right" },
  ] satisfies ChannelHotspot[],
  float: { label: "Interactions:", love: { label: "Saves", delta: "18%" }, angry: { label: "Complaints", delta: "2%" }, sr: "(fewer complaints)" },
}

/* ---------------------------- Whole picture or depth? ---------------------------- */
export const depthCompare = {
  mentions: { title: "Mentions by view", values: [58, 24, 74, 92], caption: "Sample overview chart: mentions across the four views side by side." },
  reactions: {
    title: "Interactions · By type",
    caption: "Sample single-view detail: interactions split by type, with saves highlighted at 22%.",
    rows: [
      { label: "Likes", value: 58, tone: "chart-1" },
      { label: "Saves", value: 22, tone: "chart-4" },
      { label: "Mentions", value: 7, tone: "chart-6" },
      { label: "Complaints", value: 4, tone: "chart-2" },
    ] satisfies { label: string; value: number; tone: ChartTone }[],
  },
}

/* ------------------------------- One insight per view ------------------------------- */
export type ChannelInsight =
  | { kind: "split"; rows: readonly { label: string; labelShort: string; segs: readonly { share: number; tone: ChartTone }[] }[]; legend: readonly { label: string; dot: string }[] }
  | { kind: "video"; name: string; viewsLabel: string; commentsLabel: string; views: number; sentiment: Sentiment; pct: number; foot: string; mobile: string }
  | { kind: "accounts"; rows: readonly { handle: string; followers: string; score: number; strong?: boolean }[]; foot: string }
  | { kind: "ratio"; rows: readonly { label: string; value: string; pct: number; tone: ChartTone }[]; foot: string }

export const channelInsights: Record<ChannelKey, { title: string; label: string; caption: string; insight: ChannelInsight }> = {
  interactions: {
    title: "Not just how many responded, but how.",
    label: "Same total, different mood",
    caption: "Two sample posts each with 12 thousand interactions: post A is 46% saves and 3% complaints, post B is 8% saves and 31% complaints.",
    insight: {
      kind: "split",
      rows: [
        {
          label: "Post A · 12K interactions",
          labelShort: "Post A · 12K",
          segs: [
            { share: 46, tone: "chart-4" },
            { share: 51, tone: "chart-1" },
            { share: 3, tone: "chart-2" },
          ],
        },
        {
          label: "Post B · 12K interactions",
          labelShort: "Post B · 12K",
          segs: [
            { share: 8, tone: "chart-4" },
            { share: 61, tone: "chart-1" },
            { share: 31, tone: "chart-2" },
          ],
        },
      ],
      legend: [
        { label: "Saves", dot: "bg-chart-4" },
        { label: "Likes", dot: "bg-chart-1" },
        { label: "Complaints", dot: "bg-chart-2" },
      ],
    },
  },
  content: {
    title: "Heavily viewed, badly received.",
    label: "#2 by views, worst comments",
    caption: "Sample post with 940 thousand views, second highest for the profile, but 54% negative comments.",
    insight: {
      kind: "video",
      name: "Update 4.2 explained",
      viewsLabel: "Views",
      commentsLabel: "Comments",
      views: 88,
      sentiment: "neg",
      pct: 54,
      foot: "0.94M views · 5.9K comments",
      mobile: "0.94M views · #2 for the profile",
    },
  },
  voices: {
    title: "Followers are not influence.",
    label: "Fewer followers, more weight",
    caption: "Two sample accounts: @lena.shoots has 84 thousand followers and an influence score of 78; @deal.hub.daily has 610 thousand followers and an influence score of 41.",
    insight: {
      kind: "accounts",
      rows: [
        { handle: "@lena.shoots", followers: "84K", score: 78, strong: true },
        { handle: "@deal.hub.daily", followers: "610K", score: 41 },
      ],
      foot: "Followers · influence score out of 100",
    },
  },
  amplification: {
    title: "Who amplifies, not only who posts.",
    label: "83× more amplified than posted",
    caption: "Sample account: 124 original posts against 10.3 thousand shares and quote shares.",
    insight: {
      kind: "ratio",
      rows: [
        { label: "Original", value: "124", pct: 4, tone: "chart-1" },
        { label: "Shares + quote shares", value: "10.3K", pct: 100, tone: "channels" },
      ],
      foot: "Last 7 days",
    },
  },
}

/* --------------------------------- Narrow it down --------------------------------- */
export const channelFilters = {
  ranges: [
    { value: "Today", factor: 0.04 },
    { value: "Last 7 days", factor: 0.24 },
    { value: "Last 30 days", factor: 1 },
    { value: "Weekly", factor: 0.24 },
    { value: "Monthly", factor: 1 },
    { value: "Quarterly", factor: 2.9 },
    { value: "Yearly", factor: 11.6 },
    { value: "Custom range", factor: 1 },
  ],
  keywords: ["All", "Night Mode", "battery life", "Aurora X2"],
  hashtags: ["All hashtags", "#ShotOnX2", "#AuroraX2Launch", "#ChargerFail"],
  sentiments: ["All", "Positive", "Neutral", "Negative"],
  sorts: ["Volume", "Engagement", "Reach", "Growth", "Sentiment score"],
  /** Which of the four widgets (Mentions, Engagement rate, Sentiment, Top post) each filter updates. */
  updates: {
    net: [0, 1, 2, 3],
    range: [0, 1, 2, 3],
    obj: [0, 1, 2, 3],
    kw: [0, 1, 2, 3],
    grp: [0, 1, 2, 3],
    tag: [0, 1, 2, 3],
    ctype: [0, 1, 2, 3],
    sent: [0, 2, 3],
    sort: [3],
  },
  defaults: { range: "Last 30 days", kw: "All", tag: "All hashtags", sent: "All", ctype: "All content", sort: "Engagement" },
  empty: { title: "No negative posts in this range", text: "Profile: Aurora Mobile Official · Today. Try Last 7 days." },
} as const
