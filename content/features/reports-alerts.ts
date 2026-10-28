/**
 * Reports & Alerts feature page copy, verbatim from design-ref Reports.dc.html (1440) and
 * ReportsMobile.dc.html (390). Numbers live in content/sample-data.ts (`reports`).
 */
import { BarChart3, BadgeCheck, Bell, Mail, Megaphone } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { FeaturePageConfig, WalkthroughItem } from "@/content/features/types"

export const reportsPage = {
  slug: "reports-alerts",
  accent: "reports",
  seo: {
    title: "Reports & Alerts",
    description:
      "Standing reports for any keyword or brand, delivered daily, weekly or monthly, plus alerts when social volume or sentiment moves beyond its normal range.",
  },
  hero: {
    breadcrumb: [{ label: "Platform", href: "/features" }, { label: "Reports & Alerts" }],
    chip: { label: "Reports & Alerts", variant: "tint", bordered: true },
    title: "Insights that arrive on their own.",
    lead: "Standing reports for any keyword or brand, delivered daily, weekly or monthly, plus alerts when volume or sentiment moves beyond its normal range.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Take the product tour", href: "/product-tour" },
  },
  personas: {
    title: "Who opens this page",
    items: [
      { icon: BadgeCheck, title: "Executives and sponsors", text: "Receive the standing brief, without logging in." },
      { icon: BarChart3, title: "Analysts", text: "Set it up once and let it go out on schedule." },
      { icon: Megaphone, title: "Communications leads", text: "Get warned early when something moves." },
    ] satisfies Benefit[],
  },
  steps: {
    title: "How to use it",
    items: [
      { title: "Choose what and how often", text: "A keyword or a brand, daily, weekly or monthly." },
      { title: "Add recipients and thresholds", text: "Who gets it, and what counts as unusual." },
      { title: "Let it run, then open what moves", text: "Open the posts behind anything that moves.", dark: true },
    ],
  },
  outcomes: {
    title: "What it does for your brand",
    items: [
      { icon: Mail, title: "Keep leadership informed without extra work", text: "The brief arrives on its own, every time." },
      { icon: Bell, title: "Catch a sudden change the day it happens", text: "Alerts set against what is normal for each subject." },
      { icon: BarChart3, title: "Show change, not just a snapshot", text: "Every report compares against the previous period." },
    ] satisfies Benefit[],
  },
  related: {
    title: "Works with the rest of Vinci360",
    items: [
      { accent: "cmp", label: "Brand Compare", prompt: "Send the competitive view on a schedule.", href: "/features/brand-compare", linkLabel: "Explore Brand Compare" },
      { accent: "sent", label: "Sentiment & Keywords", prompt: "Alert on a keyword turning negative.", href: "/features/sentiment-keywords", linkLabel: "Explore Sentiment & Keywords" },
      { accent: "stories", label: "Promotable Stories", prompt: "Share the shortlist with the team.", href: "/features/promotable-stories", linkLabel: "Explore Promotable Stories" },
    ],
  },
  cta: {
    title: "Let the insights come to you.",
    lead: "Leave your work email and we will set up a sample report and alert for your brand.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} satisfies FeaturePageConfig

/* -------------------------------- Hero mock -------------------------------- */
export const reportsHero = {
  subject: "Weekly brand report: Aurora Mobile",
  from: "vinci360 Reports → leadership@example.com · Mon 8:45 AM",
  fromMobile: "to leadership@example.com · Mon 8:45 AM",
  brief: "Weekly brief",
  labels: { mentions: "Mentions", net: "Net sentiment", netShort: "Net sent.", engagement: "Engagement", engagementShort: "Engage." },
  vsPrev: "vs prev.",
  thisWeek: "This week",
  lastWeek: "Last week",
  changedLabel: "What changed:",
  changed: "Mentions peaked on Saturday; charging complaints eased after Wednesday.",
  hotspots: [
    { title: "Change, not just level", text: "Every number is compared with the period before." },
    { title: "What changed", text: "A one-line summary so the reader doesn’t have to hunt." },
  ],
  alert: { label: "High alert", text: "Negative mentions", delta: "+38%", when: "today" },
  caption:
    "Sample email: “Weekly brand report: Aurora Mobile” with 11,382 mentions up 12%, net sentiment +24 down 2 points, 446K engagement up 7%, and a small chart of mentions over the week.",
}

/* ------------------------------- Flow diagram ------------------------------ */
export const reportsFlow = {
  title: "From screen to inbox",
  steps: ["Choose a keyword or a brand", "Pick daily, weekly or monthly", "Pick the format", "It arrives, compared with last period"],
  keyword: "Night Mode",
  kinds: ["Keyword", "Brand"],
  periods: ["Daily", "Weekly", "Monthly"],
  formats: [
    { label: "On-screen", on: true },
    { label: "PDF", on: true },
    { label: "Excel", on: false },
    { label: "Email", on: true },
  ],
  email: "Weekly brief · Mon 8:45",
  note: "Everything the interactive pages show can become a standing report.",
}

/* ------------------------------ Report builder ----------------------------- */
export const reportsBuilder = {
  chip: "Try it",
  title: "Build a report",
  lead: "Change any setting and the preview on the right updates.",
  leadMobile: "Set it up, then switch to Preview to see the email.",
  tabs: { label: "Report builder", settings: "1 · Settings", preview: "2 · Preview", seePreview: "See the preview" },
  form: "Report settings",
  type: "Report type",
  types: [
    { value: "keyword", label: "Keyword-wise" },
    { value: "entity", label: "Entity-wise" },
  ] as const,
  subject: (kind: string) => `Subject (${kind})`,
  subjectKinds: { keyword: "keyword", entity: "brand, product, organisation or person" },
  subjectsLabel: "Subjects",
  search: "Search…",
  noMatch: "No match in the sample list.",
  period: "Period",
  periods: [
    { value: "D", label: "Daily", every: "every day" },
    { value: "W", label: "Weekly", every: "every Monday" },
    { value: "M", label: "Monthly", every: "on the 1st of each month" },
  ] as const,
  range: "Date range",
  ranges: [
    { value: "today", label: "Today", factor: 1 / 30, prev: "yesterday" },
    { value: "7", label: "Last 7 days", factor: 0.24, prev: "the previous 7 days" },
    { value: "30", label: "Last 30 days", factor: 1, prev: "the previous 30 days" },
    { value: "custom", label: "Custom…", factor: 1, prev: "the equivalent previous range" },
  ],
  rangeCustom: "Custom range",
  platform: "Topic",
  platforms: "Topics",
  platCount: (n: number) => `${n} of 4`,
  output: "Output",
  outputs: [
    { value: "screen", label: "On-screen" },
    { value: "pdf", label: "PDF" },
    { value: "excel", label: "Excel" },
    { value: "email", label: "Email" },
  ] as const,
  emailTo: "Email to",
  recipients: "Recipients",
  recipCount: (n: number) => `${n} recipients`,
  addRecipient: "Add a recipient",
  placeholder: "name@example.com",
  add: "Add",
  remove: (a: string) => `Remove ${a}`,
  schedule: "Schedule",
  scheduleAuto: "Send automatically",
  scheduleOff: "Off · on-demand only",
  scheduleText: (period: string, every: string, time: string) => `${period}, ${every} at ${time}`,
  time: "Time of day",
  times: [
    { value: "07:00", label: "7:00 AM" },
    { value: "08:45", label: "8:45 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "17:30", label: "5:30 PM" },
  ],
  preview: "Report preview",
  kind: (type: string, period: string) => `${type} · ${period} report`,
  vs: "vs",
  sentiment: "Sentiment",
  split: (p: number, n: number, g: number) => `▲ ${p}% positive · – ${n}% neutral · ▼ ${g}% negative`,
  topics: "Top topics",
  tags: "Top hashtags",
  tagsShort: "Hashtags",
  platformSplit: "Topic split",
  noPlatform: "No topic selected.",
  changed: "What changed:",
  filters: "Filters:",
  allPlatforms: "All topics",
  noPlatformShort: "No topic",
  outputLabel: "Output:",
  none: "none",
  sent: (every: string, time: string) => `Sent ${every} at ${time}`,
  vsPrev: "vs prev.",
  pdf: "Download PDF",
  excel: "Download Excel",
  send: "Send me this email",
  sentTo: (a: string) => `Sent to ${a}`,
  you: "you",
  alt: (period: string, name: string, range: string, mentions: string, delta: string, net: number) =>
    `${period} report preview for ${name}, ${range}: ${mentions} mentions ${delta}, net sentiment ${net}.`,
  footnote: "Each report compares against the preceding equivalent period, so you see change, not just level.",
}

/* -------------------------------- Part A · Reports ------------------------------- */
export const reportsPartA = {
  part: "Part A",
  title: "Reports",
  lead: "Two report shapes, one for a word and one for a name.",
  items: [
    {
      title: "Keyword-wise analysis",
      lead: "A complete report for the keywords you choose: mentions, sentiment, topics, hashtags, reach and engagement, on a daily, weekly or monthly cycle.",
      tells: { label: "What it tells you:", text: "how a campaign term or product phrase is doing, and how that changed since last time." },
      metrics: ["Mentions", "Sentiment", "Topics", "Hashtags", "Reach", "Engagement"],
      hint: "Export it, or schedule it to arrive on its own.",
    },
    {
      title: "Entity-wise analysis",
      lead: "The same report structure for a brand, product, organisation or person, across social media.",
      tells: { label: "What it tells you:", text: "how a name is being talked about, wherever it is mentioned." },
      metrics: ["Brand", "Product", "Organisation", "Person"],
      hint: "",
    },
  ] satisfies WalkthroughItem[],
  keyword: {
    title: "Keyword-wise · Weekly · 5–11 Oct",
    caption: "Keyword-wise weekly report",
    cols: ["Keyword", "Mentions", "vs prev. week", "Sentiment", "Engagement"],
    exports: ["PDF", "Excel"],
    hotspot: { title: "Change vs previous week", text: "Shows which keyword moved, not just which is biggest." },
    figcaption:
      "Sample keyword-wise report for four keywords: charging 3,104 mentions up 41% and negative; night mode 2,288 up 18% and positive; price 1,512 down 6% and neutral; store 640 up 9% and positive.",
  },
  entity: {
    title: "Entity-wise · Monthly · Aurora Mobile",
    typeLabel: "Entity type",
    types: ["Brand", "Product", "Organisation", "Person"],
    labels: { mentions: "Mentions", engagement: "Engagement", reach: "Reach *" },
    platforms: "Topic split",
    estimate: "* estimate",
    figcaption:
      "Sample entity-wise monthly report for the brand Aurora Mobile: 48,214 mentions up 18%, 1.92M engagement up 10%, 12.4M estimated reach up 6%, sentiment 54% positive, with Launch the largest topic.",
  },
}

/* -------------------------------- Part B · Alerts ------------------------------- */
export const reportsAlerts = {
  part: "Part B · Alerts",
  title: "Know the moment something moves",
  lead: "Alerts arrive by email and in the app. Nothing else.",
  items: [
    {
      title: "Alert rules",
      lead: "Write a rule as a sentence: what to watch, which way, how much, and how fast.",
      tells: { label: "What it tells you:", text: "exactly when you’ll be warned, in plain words." },
      metrics: [],
      hint: "Change any field and the rule rewrites itself.",
    },
    {
      title: "The alert itself",
      lead: "What moved, by how much, where and when, with a link straight to the posts behind it.",
      tells: { label: "What it tells you:", text: "whether to act now, and where to look first." },
      metrics: ["Severity", "Subject", "What moved", "Topic", "Time"],
      hint: "",
    },
  ] satisfies WalkthroughItem[],
  insight: "Thresholds set against what is normal for that subject.",
  rule: {
    title: "New alert rule",
    on: "On",
    off: "Off",
    notify: "Notify me when",
    notifyMobile: "Alert me when",
    labels: { metric: "Metric", dir: "Direction", val: "Amount", win: "Time window", subj: "Keyword or brand" },
    mobileLabels: { subj: "for", dir: "and it", val: "by / to", win: "within" },
    within: "within",
    for: "for",
    metrics: ["Negative mentions", "Mentions", "Net sentiment"],
    dirs: ["rises by", "falls by", "goes above", "goes below"],
    wins: ["1 hour", "1 day", "7 days"],
    subjects: ["Aurora Mobile", "#AuroraLaunch", "Night Mode", "Aurora Care Plus"],
    plain: "In plain words:",
    plainMobile: "In plain words",
    paused: "(Paused) ",
    sentence: (metric: string, subj: string, dir: string, val: string, win: string) =>
      `You’ll get an email and an in-app notification when ${metric.toLowerCase()} for ${subj} ${dir} ${val} within ${win}.`,
    sendTo: "Send to: email · in-app notification",
    saved: "Saved rules",
    savedRules: ["Mentions go above 2× the usual daily level for Night Mode", "Net sentiment falls by 10 pts within 7 days for Aurora Care Plus"],
    state: (on: boolean) => (on ? "on" : "off"),
  },
  notifications: {
    title: "Notifications",
    label: "Sample notifications",
    view: "View the posts",
    severity: { High: "▲ High", Medium: "● Medium", Info: "i Info" },
    float: "Drill from the alert to the posts behind it.",
    note: "Sample data · Severity is always shown as a word, not only a colour.",
    caption:
      "Three sample notifications: High, #AuroraLaunch, negative mentions up 38% in a day on Launch at 9:12 AM; Medium, Aurora Care Plus, net sentiment down 12 points in 7 days on Battery yesterday; Info, Night Mode, mentions 2.1 times the usual daily level on Camera on Monday.",
  },
}

/* ------------------------------ Control section ----------------------------- */
export const reportsControl = {
  title: "Control who sees what and when",
  titleMobile: "Control who sees what",
  lead: "Save the views you use, export with the filters printed, and give each role the right access.",
  leadMobile: "Give each role the right access.",
  views: {
    title: "Saved views",
    text: "Name a filter combination and make it your default.",
    items: ["Monday leadership read", "Battery · negative only"],
    default: "Default",
  },
  export: {
    title: "Export",
    text: "Any widget to Excel or CSV, any page to PDF, with the active filters printed on it.",
    filters: "Filters: Aurora Mobile · Last 30 days · All topics · Positive + Negative",
  },
  access: {
    title: "Role-based access",
    text: "Each role sees only the pages and names meant for it.",
    caption: "Sample access by role",
    canSee: "Can see",
    role: "Role",
    roles: ["Executive", "Analyst"],
    rows: [
      { label: "Reports", cells: ["yes", "yes"] },
      { label: "All modules", cells: ["no", "yes"] },
      { label: "Alert rules", cells: ["view", "edit"] },
      { label: "Aurora Care Plus", cells: ["no", "yes"] },
    ] as const,
    region: "Sample access by role, scrolls sideways",
    swipe: "Swipe the table · Sample data",
  },
}

/* ------------------------- Steps and related thumbnails ------------------------ */
export const reportsSteps = {
  subject: "Aurora Mobile",
  periods: ["Daily", "Weekly", "Monthly"],
  recipients: ["leadership@example.com", "brand-team@example.com"],
  rule: { before: "Alert when negative mentions", value: "rise 30%", after: "in a day" },
  alert: "Negative mentions ▲ +38%",
  view: "View the posts →",
}
