/** Features overview copy, verbatim from design-ref Features.dc.html (1440) and FeaturesMobile.dc.html (390). Numbers live in sample-data.ts. */
import {
  BadgeCheck,
  Bell,
  Bookmark,
  Briefcase,
  CalendarDays,
  ChartColumn,
  ChartColumnBig,
  ChartLine,
  Check,
  Download,
  Flag,
  Folder,
  Gauge,
  Hash,
  Heart,
  KeyRound,
  Languages,
  Layers,
  LayoutGrid,
  Lock,
  Mail,
  Megaphone,
  PieChart,
  Radio,
  Repeat2,
  Rows3,
  Share,
  Smile,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Users,
  ZoomIn,
  type LucideIcon,
} from "lucide-react"

import type { Benefit, BenefitIcon } from "@/components/sections/BenefitList"
import type { Accent } from "@/content/navigation"

export type TabId = "smi" | "trends" | "sent" | "cmp" | "stories" | "reports" | "channels"

export type MapTile = {
  accent: Accent
  eyebrow: string
  title: string
  /** Shorter question on 390, where the mobile reference has one. */
  titleMobile?: string
  modules: readonly string[]
  glyph: "smi" | "trends" | "sent" | "cmp" | "stories" | "reports" | "channels"
  href: string
}

export type Hotspot = { title: string; text: string }

export type Panel = {
  id: TabId
  accent: Accent
  /** Tab label. */
  name: string
  chip: string
  title: string
  lead: string
  benefits: readonly Benefit[]
  benefitsMobile?: readonly string[]
  action: { label: string; href: string }
  hotspots: readonly [Hotspot, Hotspot, Hotspot]
}

export type GlossaryItem = {
  name: string
  text: string
  area: TabId
  icon: BenefitIcon
}

export const featuresOverview = {
  meta: {
    title: "Features",
    description:
      "Explore all twelve vinci360° modules: social listening, trends, sentiment, brand compare, promotable stories, reports and source analysis, in one clear view.",
  },

  hero: {
    chip: "Platform",
    title: "Twelve modules. One clear picture of your brand.",
    lead: "Every Vinci360 module answers a different question about the conversation around your brand",
    /** Desktop only: 390 ends the lead at "brand." */
    leadTail: ", from what is being said to what is worth promoting",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Take the product tour", href: "/product-tour" },
    metricsLine: "Mentions · Reach · Interactions · Sentiment, analysed in one place",
    chrome: "vinci360 · Aurora Mobile",
    chromeMobile: "Aurora Mobile",
    timeline: "Mentions · last 30 days",
    switcher: {
      title: "Switch module",
      selected: "Selected",
      items: [
        { label: "Trending Topics", accent: "trends" },
        { label: "Sentiment Analysis", accent: "sent" },
        { label: "Brand Compare Analysis", accent: "cmp" },
      ] as { label: string; accent: Accent }[],
    },
  },

  map: {
    title: "The module map",
    lead: "Seven feature areas, twelve modules. Start with the question you need answered.",
    leadMobile: "Seven feature areas, twelve modules. Start with your question.",
    link: "Learn more",
    tiles: [
      {
        accent: "smi",
        eyebrow: "Social Media Intelligence",
        title: "What is being said about us, where, and in what tone?",
        modules: ["Social Media Intelligence"],
        glyph: "smi",
        href: "/features/social-media-intelligence",
      },
      {
        accent: "trends",
        eyebrow: "Trends",
        title: "What is gaining momentum right now?",
        titleMobile: "What is gaining momentum?",
        modules: ["Trending Topics", "Trending Hashtags"],
        glyph: "trends",
        href: "/features/trends",
      },
      {
        accent: "sent",
        eyebrow: "Sentiment & Keywords",
        title: "How do people feel, and which words drive it?",
        titleMobile: "How do people feel, and why?",
        modules: ["Sentiment Analysis", "Keyword Analysis"],
        glyph: "sent",
        href: "/features/sentiment-keywords",
      },
      {
        accent: "cmp",
        eyebrow: "Brand Compare",
        title: "Where do we stand against competitors?",
        titleMobile: "Where do we stand?",
        modules: ["Brand Compare Analysis"],
        glyph: "cmp",
        href: "/features/brand-compare",
      },
      {
        accent: "stories",
        eyebrow: "Promotable Stories",
        title: "What is worth turning into content?",
        titleMobile: "What is worth promoting?",
        modules: ["Promotable Stories"],
        glyph: "stories",
        href: "/features/promotable-stories",
      },
      {
        accent: "reports",
        eyebrow: "Reports & Alerts",
        title: "What do I need to know without logging in?",
        modules: ["SMA Reports"],
        glyph: "reports",
        href: "/features/reports-alerts",
      },
      {
        accent: "channels",
        eyebrow: "Source Analysis",
        title: "How is the conversation performing?",
        modules: ["Mentions & reach", "Interactions", "Audience growth", "Top voices"],
        glyph: "channels",
        href: "/features/channel-analysis",
      },
    ] as MapTile[],
  },

  tour: {
    title: "See it in action",
    lead: "Pick a feature area to see its real screens, in sample data.",
    tabsLabel: "Feature areas",
    panels: [
      {
        id: "smi",
        accent: "smi",
        name: "Social Media Intelligence",
        chip: "Social Media Intelligence",
        title: "Everything being said about you, in one view.",
        lead: "Mentions, engagement and sentiment from across social media on one filterable page.",
        benefits: [
          {
            icon: Gauge,
            title: "Headline numbers first",
            text: "Five KPIs with change vs the previous period.",
          },
          {
            icon: TrendingUp,
            title: "Volume and mood together",
            text: "See if a spike is good news or bad.",
          },
          {
            icon: Rows3,
            title: "Read the posts behind it",
            text: "Every number opens the original mentions.",
          },
        ],
        benefitsMobile: ["Five KPIs with change vs last period."],
        action: {
          label: "Explore Social Media Intelligence",
          href: "/features/social-media-intelligence",
        },
        hotspots: [
          {
            title: "KPI cards",
            text: "Your headline numbers and how they moved.",
          },
          {
            title: "Timeline with sentiment",
            text: "Shows whether a busy day was a good or bad one.",
          },
          {
            title: "Top topics",
            text: "Which topics drive the conversation.",
          },
        ],
      },
      {
        id: "trends",
        accent: "trends",
        name: "Trends",
        chip: "Trends",
        title: "Spot what is rising, not just what is big.",
        lead: "Trending Topics and Trending Hashtags rank conversation by how fast it is growing.",
        benefits: [
          {
            icon: TrendingUp,
            title: "Momentum score",
            text: "Rewards speed of growth, not size alone.",
          },
          {
            icon: ChartColumn,
            title: "Rank movement",
            text: "Arrows show what climbed or fell since yesterday.",
          },
          {
            icon: Hash,
            title: "Hashtags with a mood",
            text: "Each tag marked positive, neutral or negative.",
          },
        ],
        action: { label: "Explore Trends", href: "/features/trends" },
        hotspots: [
          {
            title: "Topic scoreboard",
            text: "Ranks topics and shows how they moved since yesterday.",
          },
          {
            title: "Momentum score",
            text: "How fast a topic is growing, out of 100.",
          },
          {
            title: "Hashtag cloud",
            text: "Bigger means more mentions; the mark shows the mood.",
          },
        ],
      },
      {
        id: "sent",
        accent: "sent",
        name: "Sentiment & Keywords",
        chip: "Sentiment & Keywords",
        title: "Find the problem before it reaches the headline number.",
        lead: "Sentiment Analysis and Keyword Analysis show where opinion is turning, and the words behind it.",
        benefits: [
          {
            icon: Smile,
            title: "Sentiment by topic",
            text: "Positive, neutral and negative for each topic.",
          },
          {
            icon: Hash,
            title: "Hashtag-wise sentiment",
            text: "Which tags carry praise and which carry complaints.",
          },
          {
            icon: KeyRound,
            title: "Keyword deep-dive",
            text: "Pick one word and see its volume, mood and trend.",
          },
        ],
        action: {
          label: "Explore Sentiment & Keywords",
          href: "/features/sentiment-keywords",
        },
        hotspots: [
          {
            title: "Keyword deep-dive",
            text: "Volume and mood for one word you care about.",
          },
          {
            title: "Sentiment by topic",
            text: "Shows which topic is turning negative.",
          },
          {
            title: "Hashtag-wise sentiment",
            text: "Which tags carry praise or complaints.",
          },
        ],
      },
      {
        id: "cmp",
        accent: "cmp",
        name: "Brand Compare",
        chip: "Brand Compare",
        title: "See exactly where you stand against competitors.",
        lead: "Brand Compare Analysis puts you next to two competitors on the measures that matter.",
        benefits: [
          {
            icon: PieChart,
            title: "Share of voice",
            text: "Your slice of the category conversation.",
          },
          {
            icon: ChartColumnBig,
            title: "Indexed comparison",
            text: "Each brand scored against a category average of 100.",
          },
          {
            icon: ChartLine,
            title: "Gap over time",
            text: "Week-by-week lines show who is gaining ground.",
          },
        ],
        action: {
          label: "Explore Brand Compare",
          href: "/features/brand-compare",
        },
        hotspots: [
          {
            title: "Share of voice",
            text: "Your part of the category conversation.",
          },
          {
            title: "Indexed comparison",
            text: "Above 100 means better than the category average.",
          },
          {
            title: "Gap trend",
            text: "Whether your lead is growing or shrinking.",
          },
        ],
      },
      {
        id: "stories",
        accent: "stories",
        name: "Promotable Stories",
        chip: "Promotable Stories",
        title: "Turn conversation into content ideas, backed by evidence.",
        lead: "Promotable Stories finds positive moments your audience is already sharing and suggests how to use them.",
        benefits: [
          {
            icon: Sparkles,
            title: "Suggested headlines",
            text: "A starting line for your content team.",
          },
          {
            icon: ChartColumn,
            title: "Evidence threshold",
            text: "Only ideas with enough posts behind them appear.",
          },
          {
            icon: Check,
            title: "You decide",
            text: "Accept or dismiss each idea in one click.",
          },
        ],
        action: {
          label: "Explore Promotable Stories",
          href: "/features/promotable-stories",
        },
        hotspots: [
          {
            title: "Suggested headline",
            text: "A starting idea, drawn from real posts.",
          },
          {
            title: "Evidence numbers",
            text: "How many posts, how much engagement, and the mood.",
          },
          {
            title: "Evidence threshold",
            text: "Ideas with too few posts are held back.",
          },
        ],
      },
      {
        id: "reports",
        accent: "reports",
        name: "Reports & Alerts",
        chip: "Reports & Alerts",
        title: "Insights that arrive on their own.",
        lead: "SMA Reports send keyword-wise briefs on your schedule, and alerts reach you the moment a rule is crossed.",
        benefits: [
          {
            icon: Mail,
            title: "Keyword-wise reports",
            text: "Each keyword and entity with its own numbers.",
          },
          {
            icon: Bell,
            title: "Alerts on your rules",
            text: "Set a threshold once; hear about it straight away.",
          },
          {
            icon: Share,
            title: "Schedule and export",
            text: "Daily, weekly or monthly, as PDF or Excel.",
          },
        ],
        action: {
          label: "Explore Reports & Alerts",
          href: "/features/reports-alerts",
        },
        hotspots: [
          {
            title: "Schedule selector",
            text: "Choose how often the report lands in your inbox.",
          },
          {
            title: "Keyword-wise report",
            text: "Each keyword’s volume, change and mood.",
          },
          { title: "Export", text: "Download the report as PDF or Excel." },
        ],
      },
      {
        id: "channels",
        accent: "channels",
        name: "Source Analysis",
        chip: "Source Analysis",
        title: "See how the conversation performs, metric by metric.",
        lead: "Mentions, reach, interactions and engagement rate, each with the measures that explain it.",
        benefits: [
          {
            icon: Radio,
            title: "Mentions & reach",
            text: "Volume, estimated reach and top profiles.",
          },
          {
            icon: Heart,
            title: "Interactions",
            text: "Likes, comments, shares and how commenters feel.",
          },
          {
            icon: Users,
            title: "Top voices",
            text: "Influential authors, replies and shares.",
          },
        ],
        action: {
          label: "Explore Source Analysis",
          href: "/features/channel-analysis",
        },
        hotspots: [
          {
            title: "Metric switcher",
            text: "Jump between mentions, reach and interactions.",
          },
          {
            title: "Interaction mix",
            text: "How people interact, beyond a simple like.",
          },
          {
            title: "Audience growth",
            text: "Whether your audience is growing month on month.",
          },
        ],
      },
    ] as Panel[],
  },

  /** Text inside the tab-panel mocks. */
  mocks: {
    smi: {
      chrome: "Social Media Intelligence",
      week: "This week",
      weekMobile: "This week · mentions & net sentiment",
      mentions: "Mentions",
      net: "Net sentiment",
      platforms: "Top topics",
      engagements: "engagements",
    },
    trends: {
      chrome: "Trending Topics",
      columns: ["#", "Move", "Topic", "Mentions", "Momentum"],
      hashtags: "Trending hashtags",
      callout: {
        title: "Top by volume ≠ top by growth",
        volume: "#1 by volume",
        growth: "#1 by growth",
        mentions: "mentions",
        window: "in 24h",
      },
    },
    sent: {
      chrome: "Keyword Analysis · “charging”",
      keyword: "Keyword",
      deepDive: "deep-dive",
      mentions: "Mentions",
      net: "Net sentiment",
      negShare: "Negative share",
      byPlatform: "Sentiment by topic",
      calloutLabel: "Battery & charging · this week",
      hashtags: "Hashtag-wise sentiment",
    },
    cmp: {
      chrome: "Brand Compare Analysis",
      sov: "Share of voice",
      index: "Indexed vs category average (100)",
      gap: "Gap trend · share of voice, % per week",
    },
    stories: {
      chrome: "Promotable Stories",
      candidate: "Story candidate",
      ai: "AI-generated suggestion",
      headline: "Suggested headline",
      stats: {
        volume: "Volume",
        engagement: "Engagement",
        sentiment: "Sentiment",
        positive: "positive",
      },
      accept: "Accept",
      dismiss: "Dismiss",
      more: "More candidates",
      posts: "posts",
      below: "below threshold",
    },
    reports: {
      chrome: "SMA Reports",
      schedule: "Schedule",
      scheduleOptions: ["Daily", "Weekly", "Monthly"],
      scheduleLabel: "Schedule: weekly selected",
      exports: ["PDF", "Excel"],
      briefTitle: "Weekly brief",
      briefMeta: "Aurora Mobile · 5–11 Oct · keyword-wise",
      columns: ["Keyword", "Mentions", "Change", "Sentiment"],
      rule: {
        title: "Alert rule",
        on: "On",
        onLabel: "Rule is on",
        when: "Notify me when",
        metric: "negative mentions",
        verb: "rise",
        threshold: "30%",
        tail: "in a day.",
        sendTo: "Send to: Email · Brand team",
      },
    },
    channels: {
      chrome: "Source analysis",
      metrics: ["Mentions", "Reach", "Interactions", "Engagement rate"],
      pages: "Top profiles",
      reactions: "Interaction mix",
      growth: "Audience growth · 30 days",
      others: [
        { kind: "sentiment", title: "Comment sentiment", text: "How commenters feel" },
        { kind: "voices", title: "Top voices", text: "Authors + influence" },
        { kind: "shares", title: "Shares", text: "Replies + shares" },
      ] as const,
      followers: "Aurora Mobile India · followers",
    },
  },

  anatomy: {
    title: "Every page works the same way",
    lead: "Learn one module and you know them all. Change a filter and every widget on the page updates together.",
    caption:
      "Diagram of a generic Vinci360 module page with three zones: 1, the page header with module name, active date window and saved views; 2, the filter bar; 3, the widget canvas with headline KPIs above detail charts, and detail above the raw posts. The filter chips can be toggled to see every widget update.",
    header: {
      label: "Page header",
      module: "Module name",
      date: "5 – 11 Oct 2026",
      saved: "Saved views",
    },
    filterBar: { label: "Filter bar", hint: "— try clicking a chip" },
    canvas: {
      label: "Widget canvas",
      idle: "All widgets share the same filters",
      updated: "✓ Updated for:",
      kpiNote: "↓ Headline KPIs above detail",
      detailNote: "↓ Detail above raw posts",
    },
    filters: {
      title: "Filters you can apply",
      lead: "Change a filter and every widget on the page updates together.",
      items: [
        { icon: CalendarDays, label: "Date range" },
        { icon: LayoutGrid, label: "Source" },
        { icon: KeyRound, label: "Keyword or brand" },
        { icon: Layers, label: "Topic" },
        { icon: Hash, label: "Hashtag" },
        { icon: Smile, label: "Sentiment" },
        { icon: Folder, label: "Category" },
        { icon: Languages, label: "Language" },
      ] as { icon: LucideIcon; label: string }[],
    },
  },

  builtIn: {
    title: "Built into every page",
    items: [
      {
        icon: Bookmark,
        title: "Saved views",
        text: "Save a set of filters and reopen it in one click.",
      },
      {
        icon: Download,
        title: "Export to Excel / CSV / PDF",
        text: "Take any table or chart into your own deck.",
      },
      {
        icon: ZoomIn,
        title: "Drill down to the original posts",
        text: "Click any number to read what people actually wrote.",
      },
      {
        icon: Mail,
        title: "Scheduled email reports",
        text: "Any page, sent to anyone, on your schedule.",
      },
      {
        icon: Bell,
        title: "Threshold alerts",
        text: "Hear about it the moment a number crosses your line.",
      },
      {
        icon: Lock,
        title: "Role-based access",
        text: "Everyone sees the brands and pages meant for them.",
      },
    ] as Benefit[],
  },

  glossary: {
    title: "Feature glossary",
    lead: "Every building block you will meet in Vinci360, in plain words.",
    filterLabel: "Filter glossary by feature area",
    all: "All",
    areaPrefix: "Feature area:",
    items: [
      {
        name: "KPI cards",
        text: "Headline numbers with change vs the last period.",
        area: "smi",
        icon: Gauge,
      },
      {
        name: "Topic detection",
        text: "Groups posts into the subjects people discuss.",
        area: "trends",
        icon: Layers,
      },
      {
        name: "Top topics",
        text: "Which topics drive the conversation.",
        area: "smi",
        icon: LayoutGrid,
      },
      {
        name: "Sentiment bar graphs",
        text: "Positive, neutral and negative side by side.",
        area: "sent",
        icon: Smile,
      },
      {
        name: "Timeline graph",
        text: "Mentions day by day, with mood overlaid.",
        area: "smi",
        icon: TrendingUp,
      },
      {
        name: "Unified article feed",
        text: "Posts from across social media in one list.",
        area: "smi",
        icon: Rows3,
      },
      {
        name: "Trending hashtags",
        text: "Tags gaining the most speed right now.",
        area: "trends",
        icon: Hash,
      },
      {
        name: "Top handles",
        text: "The accounts driving the most conversation.",
        area: "trends",
        icon: Users,
      },
      {
        name: "Topic cloud",
        text: "The biggest subjects at a glance.",
        area: "trends",
        icon: Layers,
      },
      {
        name: "Product categories",
        text: "Conversation grouped by product line.",
        area: "smi",
        icon: Folder,
      },
      {
        name: "Competitor comparison",
        text: "Your brand next to two rivals.",
        area: "cmp",
        icon: ChartColumnBig,
      },
      {
        name: "Share of voice",
        text: "Your slice of the category conversation.",
        area: "cmp",
        icon: PieChart,
      },
      {
        name: "Momentum score",
        text: "How fast a topic is growing, out of 100.",
        area: "trends",
        icon: TrendingUp,
      },
      {
        name: "Story suggestions",
        text: "Content ideas drawn from positive posts.",
        area: "stories",
        icon: Sparkles,
      },
      {
        name: "Evidence threshold",
        text: "Only ideas with enough posts behind them.",
        area: "stories",
        icon: Check,
      },
      {
        name: "Keyword deep-dive",
        text: "Volume, mood and trend for one word.",
        area: "sent",
        icon: KeyRound,
      },
      {
        name: "Hashtag-wise sentiment",
        text: "How people feel about each tag.",
        area: "sent",
        icon: Hash,
      },
      {
        name: "Sentiment threshold",
        text: "An alert when mood drops past your line.",
        area: "reports",
        icon: TriangleAlert,
      },
      {
        name: "Keyword & entity reports",
        text: "Scheduled briefs per keyword or name.",
        area: "reports",
        icon: Mail,
      },
      {
        name: "Mentions & reach",
        text: "Volume and estimated reach over time.",
        area: "channels",
        icon: Radio,
      },
      {
        name: "Interactions & comment sentiment",
        text: "Likes, comments, shares and how commenters feel.",
        area: "channels",
        icon: Heart,
      },
      {
        name: "Top voices & influence",
        text: "Who has the most sway in your space.",
        area: "channels",
        icon: Users,
      },
      {
        name: "Replies & shares",
        text: "How your posts travel and get answered.",
        area: "channels",
        icon: Repeat2,
      },
      {
        name: "Period-on-period comparison",
        text: "This week vs last, this month vs last.",
        area: "cmp",
        icon: CalendarDays,
      },
    ] as GlossaryItem[],
  },

  roles: {
    title: "Who uses it",
    icons: [Flag, Megaphone, Briefcase, BadgeCheck] as LucideIcon[],
  },

  cta: {
    title: "See Vinci360 on your own brand.",
    lead: "Leave your work email and we will walk you through every module.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
}
