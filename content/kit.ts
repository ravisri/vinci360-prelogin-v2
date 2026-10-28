/**
 * Copy for the /kit component showcase. Every string is verbatim from /design-ref
 * (SMI.dc.html, Trends.dc.html, Main.dc.html, Features.dc.html, Demo.dc.html).
 * Numbers come from content/sample-data.ts.
 */
import {
  BadgeCheck,
  Bell,
  Briefcase,
  Download,
  Flag,
  Gauge,
  Hash,
  Megaphone,
  MousePointerClick,
  Bookmark,
  MapPin,
  ShieldCheck,
  Mail,
  Users,
  ListOrdered,
} from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { Faq } from "@/components/sections/FaqAccordion"
import type { Step } from "@/components/sections/HowToUse"

export const kit = {
  title: "Component kit",
  intro: "Every shared section, mock and chart, rendered once with reference copy and sample data.",

  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Social Media Intelligence" }],
    chip: "Social Media Intelligence",
    title: "Everything being said about your brand, in one view.",
    lead: "See what people are saying about you, about what, and in what tone, right now.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Explore the features", href: "/features" },
    metricsLine: "Mentions · Reach · Interactions · Sentiment, analysed in one place",
    chrome: "vinci360 · Social Media Intelligence",
    barsTitle: "Mentions this week",
    post: {
      text: "Third Aurora X2 charger this year. Support keeps closing my ticket.",
      time: "Tue · 9:12 PM",
      engagement: "2.4K engagements",
    },
    hotspots: [
      { title: "KPI cards", text: "Your five headline numbers and how they moved." },
      { title: "Timeline spike", text: "Tuesday’s jump came with a drop in tone." },
    ],
  },

  sectionHeader: {
    title: "What you’ll see",
    lead: "Seven widgets, from the headline numbers down to the posts behind them. Everything below is clickable sample data.",
  },

  featureRow: {
    chip: "Trends",
    title: "Spot what is rising, not just what is big.",
    lead: "Momentum scores surface the topics and hashtags gaining speed, so you can act while they still matter.",
    benefits: [
      { icon: Gauge, title: "Momentum, not just volume", text: "A score that rewards speed of growth, not size alone." },
      { icon: ListOrdered, title: "Rank movement daily", text: "See which topics climbed or fell since yesterday." },
      { icon: Hash, title: "Hashtags in context", text: "Open any tag to read the posts behind it." },
    ] satisfies Benefit[],
    action: { label: "Explore Trends", href: "/features/trends" },
    frameTitle: "Rising topics · last 24h",
  },

  walkthrough: {
    title: "KPI cards",
    lead: "Five headline numbers for the period you choose, each compared with the period before.",
    tells: {
      label: "What it tells you:",
      text: "whether the conversation about you is growing, and whether it is getting warmer or colder.",
    },
    metrics: ["Mentions", "Engagement", "Reach", "Posts", "Sentiment score"],
    hint: "Click a card to scope the whole page to that metric.",
  },

  builtIn: {
    title: "Built into every page",
    items: [
      { icon: Bookmark, title: "Saved views", text: "Save a set of filters and reopen it in one click." },
      { icon: Download, title: "Export to Excel / CSV / PDF", text: "Take any table or chart into your own deck." },
      { icon: MousePointerClick, title: "Drill down to the original posts", text: "Click any number to read what people actually wrote." },
      { icon: Mail, title: "Scheduled email reports", text: "Any page, sent to anyone, on your schedule." },
      { icon: Bell, title: "Threshold alerts", text: "Hear about it the moment a number crosses your line." },
      { icon: Users, title: "Role-based access", text: "Everyone sees the brands and pages meant for them." },
    ] satisfies Benefit[],
  },

  who: {
    title: "Who opens this page",
    items: [
      { icon: Megaphone, title: "Communications leads", text: "A morning read of what changed overnight." },
      { icon: Flag, title: "Brand managers", text: "A weekly pulse of volume, reach and tone." },
      { icon: Briefcase, title: "Agency account teams", text: "Client-ready numbers without building a deck." },
      { icon: BadgeCheck, title: "Executives", text: "Five numbers that say how the brand is doing." },
    ] satisfies Benefit[],
  },

  howTo: {
    title: "How to use it",
    steps: [
      { title: "Pick what to watch", text: "Choose a brand, product, person or keyword." },
      { title: "Read the headline numbers and the timeline", text: "See at a glance what moved and when.", dark: true },
      { title: "Drill into the posts behind any number", text: "Then export them, or schedule a report to arrive on its own." },
    ] satisfies Step[],
    search: "Aurora Mobile",
    scopes: ["Brand", "Product", "Person", "Keyword"],
    actions: ["Export", "Schedule report"],
  },

  outcomes: {
    title: "What it does for your brand",
    items: [
      { icon: Bell, title: "Know first", text: "See sudden spikes and tone shifts before they become headlines." },
      { icon: MapPin, title: "See where it’s happening", text: "Which topics and hashtags carry the conversation." },
      { icon: ShieldCheck, title: "Report with confidence", text: "Every number traces back to real posts." },
    ] satisfies Benefit[],
  },

  related: {
    title: "Works with the rest of Vinci360",
    items: [
      { accent: "trends", label: "Trends", prompt: "Found a spike? See what is rising.", href: "/features/trends", linkLabel: "Explore Trends" },
      { accent: "sent", label: "Sentiment & Keywords", prompt: "Tone dropped? Find the words behind it.", href: "/features/sentiment-keywords", linkLabel: "Explore Sentiment & Keywords" },
      { accent: "reports", label: "Reports & Alerts", prompt: "Want this every Monday? Have it sent to you.", href: "/features/reports-alerts", linkLabel: "Explore Reports & Alerts" },
    ] as const,
  },

  cta: {
    title: "See this page on your own brand.",
    lead: "Leave your work email and we will show you your own mentions, sentiment and topics.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },

  proof: {
    title: "Trusted by teams who need to know",
    badge: "PLACEHOLDER — add real client logos and testimonial",
    logo: "[Client logo]",
    initials: "[AB]",
    quote: "“[Testimonial quote from a real client, to be supplied.]”",
    cite: "[Name], [Role], [Company]",
  },

  faq: {
    title: "Questions people ask",
    items: [
      { question: "What does Vinci360 monitor?", answer: "Public social media conversation about your brand, products and competitors: mentions, reach, interactions, sentiment, trends and hashtags." },
      { question: "Will I see my own brand?", answer: "Yes. In the demo we look at your brand and the competitors you choose." },
      { question: "Is reach an exact number?", answer: "No. Reach is an estimate based on audience size and observed amplification." },
      { question: "Do I need to install anything?", answer: "No. Vinci360 is a service you use in your browser." },
    ] satisfies Faq[],
  },

  floats: {
    spike: "Spike on Tue · mostly negative",
    hashtag: { tag: "#AuroraLaunch", growth: "+184% growth" },
    stat: { label: "Lead over Nimbus", value: "13 pts", delta: "+10 in 8 weeks" },
  },

  charts: {
    volume: "Mentions",
    net: "Net sentiment",
    mentions: "Mentions",
    engagement: "Engagement",
    spike: "Spike",
    shareOfVoice: "Share of voice · 8 weeks",
    topics: "Topic sentiment",
    platformShare: "Top topics by momentum",
    overall: "Overall sentiment",
    hashtags: "Hashtag cloud",
    topicCloud: "Topic cloud",
    sparkline: "Mentions trend",
  },
}
