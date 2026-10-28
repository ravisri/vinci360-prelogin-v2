/** Home page copy, verbatim from design-ref Main.dc.html (1440) and Mobile.dc.html (390). Numbers live in sample-data.ts. */
import {
  BadgeCheck,
  BellRing,
  Briefcase,
  Check,
  Filter,
  Flag,
  Gauge,
  GitCompareArrows,
  Hash,
  Heart,
  KeyRound,
  LayoutGrid,
  ListOrdered,
  Mail,
  Megaphone,
  MessageSquare,
  MessageSquareWarning,
  PieChart,
  Radio,
  Rows3,
  Share2,
  Smile,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Waves,
  type LucideIcon,
} from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { Accent } from "@/content/navigation"

type Feature = {
  accent: Accent
  chip: string
  title: string
  lead: string
  benefits: readonly Benefit[]
  /** Shorter benefit lines on 390, where the mobile reference has them. */
  benefitsMobile?: readonly string[]
  action: { label: string; href: string }
}

export const home = {
  meta: {
    title: "Social media intelligence for your brand",
    description:
      "See every conversation about your brand across social media. Track mentions, reach, sentiment, trends and competitors in one view with vinci360° by MSRcosmos.",
  },

  hero: {
    chip: "Social media intelligence",
    title: "See every conversation about your brand, across social media.",
    lead: "Vinci360 brings your mentions together in real time and shows you how people feel, what is trending and how you compare with competitors",
    /** Desktop only: 390 ends the lead at "competitors." */
    leadTail: ", on one screen",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Explore the features", href: "/features" },
    chrome: "vinci360 · Social Media Intelligence",
    chromeMobile: "Social Media Intelligence",
    export: "Export",
    search: "Search keywords",
    volumeTitle: "Mention volume & sentiment",
    mentions: "Mentions",
    net: "Net sentiment",
    splitTitle: "Sentiment split",
    platformTitle: "Top topics",
    engagements: "engagements",
    postText: "Third Aurora X2 charger this year. Support keeps closing my ticket without a fix.",
    hotspots: [
      { title: "Headline KPIs", text: "Headline KPIs with change vs last period" },
      { title: "Volume timeline", text: "Volume timeline with sentiment overlay" },
      { title: "Topics", text: "Top topics by momentum" },
    ],
  },

  overview: {
    title: "Every metric that matters. One view.",
    items: [
      { icon: MessageSquare, title: "Mentions", text: "Every public post, comment and reply that names your brand." },
      { icon: Radio, title: "Social media reach*", text: "How many people the conversation about you could reach." },
      { icon: Heart, title: "Interactions", text: "Likes, comments and shares that show what resonates." },
      { icon: Smile, title: "Sentiment", text: "Positive, neutral and negative mentions, and how they shift." },
    ] as { icon: LucideIcon; title: string; text: string }[],
  },

  questions: {
    title: "Four questions, answered",
    lead: "The questions every brand team asks on Monday morning, each with its own view.",
    items: [
      { accent: "cmp", eyebrow: "Brand Compare", title: "Where do we stand?", glyph: "bars", link: "Explore Brand Compare", href: "/features/brand-compare" },
      { accent: "trends", eyebrow: "Trends", title: "What is rising?", glyph: "rise", link: "Explore Trends", href: "/features/trends" },
      { accent: "sent", eyebrow: "Sentiment & Keywords", title: "What is going wrong?", glyph: "meters", link: "Explore Sentiment", href: "/features/sentiment-keywords" },
      { accent: "stories", eyebrow: "Promotable Stories", title: "What is worth promoting?", glyph: "doc", link: "Explore Stories", href: "/features/promotable-stories" },
    ] as { accent: Accent; eyebrow: string; title: string; glyph: "bars" | "rise" | "meters" | "doc"; link: string; href: string }[],
  },

  smi: {
    accent: "smi",
    chip: "Social Media Intelligence",
    title: "Everything being said about you, in one view.",
    lead: "Mentions, engagement and sentiment from across social media arrive in a single, filterable dashboard.",
    benefits: [
      { icon: Rows3, title: "One unified feed", text: "Posts, comments and videos side by side, newest first." },
      { icon: Gauge, title: "Headline numbers at a glance", text: "Mentions, reach and sentiment, with change vs last period." },
      { icon: Filter, title: "Filter in one click", text: "Narrow by date, topic, sentiment or keyword." },
    ],
    benefitsMobile: ["Posts, comments and videos side by side.", "With change vs last period.", "By date, topic, sentiment or keyword."],
    action: { label: "Explore Social Media Intelligence", href: "/features/social-media-intelligence" },
  } satisfies Feature,
  smiMock: { titleMobile: "This week", chartTitle: "Mentions per day", netShort: "Net sent.", feedTitle: "Unified feed" },

  trends: {
    accent: "trends",
    chip: "Trends",
    title: "Spot what is rising, not just what is big.",
    lead: "Momentum scores surface the topics and hashtags gaining speed, so you can act while they still matter.",
    benefits: [
      { icon: TrendingUp, title: "Momentum, not just volume", text: "A score that rewards speed of growth, not size alone." },
      { icon: ListOrdered, title: "Rank movement daily", text: "See which topics climbed or fell since yesterday." },
      { icon: Hash, title: "Hashtags in context", text: "Open any tag to read the posts behind it." },
    ],
    benefitsMobile: ["Rewards speed of growth, not size alone.", "What climbed or fell since yesterday.", "Open any tag to read the posts behind it."],
    action: { label: "Explore Trends", href: "/features/trends" },
  } satisfies Feature,
  trendsMock: { titleMobile: "Rising topics · 24h", columns: ["#", "Move", "Topic", "Momentum"] },

  sentiment: {
    accent: "sent",
    chip: "Sentiment & Keywords",
    title: "Find the problem before it reaches the headline number.",
    lead: "Follow sentiment over time and by keyword to see exactly where opinion is turning, and why.",
    benefits: [
      { icon: Smile, title: "Sentiment over time", text: "Positive, neutral and negative, day by day." },
      { icon: KeyRound, title: "Keywords that drive it", text: "The words most linked to praise or complaints." },
      { icon: MessageSquareWarning, title: "Catch the shift early", text: "Week-on-week change flags opinion turning sour." },
    ],
    action: { label: "Explore Sentiment & Keywords", href: "/features/sentiment-keywords" },
  } satisfies Feature,
  sentimentMock: { title: "Sentiment over time", keywords: "Top negative keywords:", callout: "Net sentiment · this week" },

  compare: {
    accent: "cmp",
    chip: "Brand Compare",
    title: "See exactly where you stand against competitors.",
    lead: "Put your brand next to up to two competitors and watch the gap open or close over time.",
    benefits: [
      { icon: PieChart, title: "Share of voice", text: "Your slice of the conversation in your category." },
      { icon: Waves, title: "Gap over time", text: "Week-by-week lines show who is gaining ground." },
      { icon: GitCompareArrows, title: "Sentiment side by side", text: "Compare how people feel about each brand." },
    ],
    action: { label: "Explore Brand Compare", href: "/features/brand-compare" },
  } satisfies Feature,
  compareMock: { lineTitle: "Share of voice, % per week" },

  stories: {
    accent: "stories",
    chip: "Promotable Stories",
    title: "Turn conversation into content ideas, backed by evidence.",
    lead: "Vinci360 spots the positive moments your audience is already sharing and packages them as ready-to-review story ideas.",
    benefits: [
      { icon: Sparkles, title: "Ideas from real posts", text: "Each idea comes from what people are already saying." },
      { icon: Trophy, title: "Evidence attached", text: "Volume, engagement and sentiment for every idea." },
      { icon: Check, title: "Accept or dismiss", text: "Your team decides; accepted ideas go to your plan." },
    ],
    action: { label: "Explore Promotable Stories", href: "/features/promotable-stories" },
  } satisfies Feature,
  storiesMock: {
    candidate: "Story candidate",
    headlineLabel: "Suggested headline",
    stats: { volume: "Volume", engagement: "Engagement", sentiment: "Sentiment", positive: "positive" },
    postsLabel: "Sample posts",
    accept: "Accept",
    dismiss: "Dismiss",
    peak: "Peak:",
  },

  reports: {
    accent: "reports",
    chip: "Reports & Alerts",
    title: "Insights that arrive on their own.",
    lead: "Weekly briefs land in your inbox and alerts reach you the moment something unusual happens.",
    benefits: [
      { icon: Mail, title: "Scheduled reports", text: "Daily, weekly or monthly briefs for each audience." },
      { icon: BellRing, title: "Threshold alerts", text: "Set the rule once; we tell you when it is crossed." },
      { icon: Share2, title: "Export and share", text: "Send PDF or spreadsheet copies to anyone." },
    ],
    action: { label: "Explore Reports & Alerts", href: "/features/reports-alerts" },
  } satisfies Feature,
  reportsMock: {
    from: "Vinci360 Reports",
    subject: "Your weekly brand brief · Aurora Mobile · 5–11 Oct",
    brief: "Weekly brief",
    topRising: "Top rising",
    bullets: ["Mentions peaked on Saturday.", "Charging complaints eased after Wednesday."],
    open: "Open full report",
    rule: {
      title: "Alert rule",
      on: "Rule is on",
      parts: ["When", "Aurora Mobile mentions", "go above", "2× the 7-day average"],
      notify: "Notify:",
      channels: ["Email", "Brand team"],
    },
  },

  how: {
    title: "How it works for you",
    lead: "Three steps from first login to the insight in your inbox.",
    steps: [
      { icon: Target, title: "Choose what to track", text: "Add your brand, products, competitors and the keywords and hashtags that matter." },
      { icon: LayoutGrid, title: "See everything in one place", text: "Mentions, sentiment, trends and comparisons from across social media on one screen." },
      { icon: Share2, title: "Act and share", text: "Get reports and alerts automatically, and export findings for your team." },
    ] as { icon: LucideIcon; title: string; text: string }[],
  },

  roles: {
    title: "Built for",
    items: [
      { icon: Flag, title: "Brand managers", text: "Know how your brand is perceived every day, not once a quarter.", link: "See the Brand view", href: "/solutions?role=brand" },
      { icon: Megaphone, title: "PR & communications", text: "Hear about an issue early enough to shape the response.", link: "See the PR view", href: "/solutions?role=pr" },
      { icon: Briefcase, title: "Agencies", text: "Report on every client from one place, with reports that send themselves.", link: "See the Agencies view", href: "/solutions?role=agencies" },
      { icon: BadgeCheck, title: "Leadership", text: "See where you stand against competitors in a two-minute read.", link: "See the Leadership view", href: "/solutions?role=leadership" },
    ] as { icon: LucideIcon; title: string; text: string; link: string; href: string }[],
  },

  proof: {
    title: "Trusted by teams who need to know",
    badge: "PLACEHOLDER — add real client logos and testimonial",
    logo: "[Client logo]",
    logos: 5,
    initials: "[AB]",
    quote: "“[Testimonial quote from a real client, to be supplied.]”",
    cite: "[Name], [Role], [Company]",
  },

  cta: {
    title: "Know what is being said about your brand, as it happens.",
    lead: "Leave your work email and we will set up a walkthrough of Vinci360.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} as const
