import { Bookmark, Download, ExternalLink, Lock } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import { features, type Accent } from "@/content/navigation"

/* --------------------------------------------------------------------------
   Solutions by role (Solutions.dc.html · SolutionsMobile.dc.html)
   -------------------------------------------------------------------------- */

export const roleKeys = ["brand", "pr", "agencies", "leadership"] as const
export type RoleKey = (typeof roleKeys)[number]

/** Older short keys the reference also accepts. */
const aliases: Record<string, RoleKey> = { agency: "agencies", lead: "leadership" }

/** `?role=` → a valid role; anything unknown falls back to Brand managers. */
export function parseRole(value: string | string[] | undefined): RoleKey {
  const v = Array.isArray(value) ? value[0] : value
  if (!v) return "brand"
  const key = aliases[v] ?? v
  return (roleKeys as readonly string[]).includes(key) ? (key as RoleKey) : "brand"
}

/** Feature pages in the reference order, with the mini-bar heights (%) the reference draws for each. */
export const featureOrder: readonly Accent[] = ["smi", "trends", "sent", "cmp", "stories", "reports", "channels"]

const bars: Record<Accent, readonly number[]> = {
  smi: [30, 45, 40, 60, 55, 80],
  trends: [20, 30, 45, 60, 80, 100],
  sent: [70, 60, 66, 50, 44, 38],
  cmp: [80, 60, 40, 84, 64, 42],
  stories: [40, 90, 50, 70, 30, 60],
  reports: [50, 50, 50, 95, 50, 50],
  channels: [60, 40, 30, 20, 70, 50],
}

export type FeatureRef = { accent: Accent; name: string; href: string; bars: readonly number[] }

export const featureRefs = Object.fromEntries(
  features.map((f) => [f.accent, { accent: f.accent, name: f.label, href: f.href, bars: bars[f.accent] }]),
) as Record<Accent, FeatureRef>

export type FirstHourHotspot = { title: string; text: string }

export type Role = {
  key: RoleKey
  label: string
  initial: string
  question: string
  sub: string
  questions: readonly string[]
  toolkit: readonly { feature: Accent; use: string }[]
  persona: { initials: string; title: string; chip: string }
  week: readonly string[]
  outcome: string
  tiles: readonly [{ title: string; text: string }, { title: string; text: string }]
  firstHour: { caption: string; hotspots: readonly [FirstHourHotspot, FirstHourHotspot] }
}

export const roles: Record<RoleKey, Role> = {
  brand: {
    key: "brand",
    label: "Brand managers",
    initial: "B",
    question: "What is rising right now?",
    sub: "includes campaign planners and content teams",
    questions: ["What is being said about us?", "What is rising right now?", "How is our campaign term performing?"],
    toolkit: [
      { feature: "smi", use: "Read the headline numbers and the mention timeline each morning." },
      { feature: "trends", use: "Spot rising topics and hashtags while there is still time to join." },
      { feature: "sent", use: "See how your campaign term is landing, network by network." },
      { feature: "stories", use: "Pick content ideas that come with the posts behind them." },
    ],
    persona: { initials: "MK", title: "MK · Brand Manager, Aurora Mobile", chip: "Fictional persona" },
    week: [
      "Read the headline numbers and the timeline.",
      "Check trending topics and hashtags.",
      "Review the campaign keyword by network.",
      "Accept story ideas worth promoting.",
      "Export the week’s findings.",
    ],
    outcome: "Join the right conversations early and prove what your messages achieved.",
    tiles: [
      { title: "See what is rising before it peaks", text: "Topics and hashtags ranked by momentum." },
      { title: "Show results with evidence", text: "Every number links to the posts behind it." },
    ],
    firstHour: {
      caption:
        "Sample first-hour view for a brand manager: Aurora Mobile mentions 48,214 up 18%, engagement 1.92 million up 10%, net sentiment +36 down 3 points; night photography climbed two places to second; #AuroraNights grew 52%; one story candidate with 81% positive sentiment.",
      hotspots: [
        { title: "Every number has a direction", text: "Each KPI is compared with the previous period." },
        { title: "An idea, with proof", text: "Story candidates come with the posts that support them." },
      ],
    },
  },
  pr: {
    key: "pr",
    label: "PR & communications",
    initial: "P",
    question: "Is something going wrong?",
    sub: "reputation, press and response",
    questions: ["Is something going wrong?", "Who is saying it, and where?", "What do I respond with?"],
    toolkit: [
      { feature: "sent", use: "See which network’s tone is slipping, and the keywords driving it." },
      { feature: "smi", use: "Find who is saying it, where, and how widely it travelled." },
      { feature: "reports", use: "Get an alert by email and in the app when negative mentions jump." },
      { feature: "channels", use: "Read the channel where it started, in that network’s own terms." },
    ],
    persona: { initials: "SR", title: "SR · Head of Communications", chip: "Fictional persona" },
    week: [
      "See the weekend’s sentiment by platform.",
      "An alert arrives; open the posts behind it.",
      "Check the channel in depth.",
      "Draft the response with context.",
      "Send the standing report.",
    ],
    outcome: "Catch trouble early and respond with the real posts in front of you.",
    tiles: [
      { title: "See the spike the day it starts", text: "Alerts set against what is normal for each subject." },
      { title: "Answer with context, not guesses", text: "Who said it, where, and what tone it took." },
    ],
    firstHour: {
      caption:
        "Sample first-hour view for PR: a high alert for negative mentions up 38% on #AuroraLaunch; positive sentiment on X slipped 9 points to 38% while the other networks stay above 54%; three negative posts about battery drain, support delays and a charger.",
      hotspots: [
        { title: "One network is slipping", text: "X turned more negative while the other three held steady." },
        { title: "The real posts, in front of you", text: "Respond to what people actually said, not to a number." },
      ],
    },
  },
  agencies: {
    key: "agencies",
    label: "Agencies",
    initial: "A",
    question: "How do I show the client what we achieved?",
    sub: "reporting to brand clients",
    questions: ["How do I show the client what we achieved?", "How does the client compare with rivals?", "How do I keep reporting off my desk?"],
    toolkit: [
      { feature: "cmp", use: "Show the client against two rivals on one indexed view." },
      { feature: "reports", use: "Schedule the weekly report so it goes out on its own." },
      { feature: "smi", use: "Pull the evidence posts for the client review." },
      { feature: "trends", use: "Bring the client what is rising this week." },
    ],
    persona: { initials: "JD", title: "JD · Account Director, digital agency", chip: "Fictional persona" },
    week: [
      "Set up the client’s brand and two competitors.",
      "Read the comparison.",
      "Check the campaign keyword.",
      "Schedule the weekly report.",
      "Export the review pack.",
    ],
    outcome: "Report with evidence and spend less time assembling slides.",
    tiles: [
      { title: "Comparisons a client reads at a glance", text: "Indexed so every brand starts from the same line." },
      { title: "Reports that send themselves", text: "Weekly or monthly, as PDF or Excel." },
    ],
    firstHour: {
      caption:
        "Sample first-hour view for an agency: mentions indexed to 100 eight weeks ago, Aurora Mobile now at 118, Nimbus at 106 and Kestrel at 94; a weekly keyword report for #AuroraLaunch; three scheduled reports.",
      hotspots: [
        { title: "Indexed so sizes compare fairly", text: "Each brand starts at 100, so the client’s growth is easy to read against rivals." },
        { title: "Reporting off your desk", text: "Set it once and the report goes out on its own." },
      ],
    },
  },
  leadership: {
    key: "leadership",
    label: "Leadership",
    initial: "L",
    question: "Where do we stand?",
    sub: "marketing and business leaders",
    questions: ["Where do we stand?", "Is the gap closing?", "What do I get without opening the tool?"],
    toolkit: [
      { feature: "cmp", use: "Track share of voice and the gap to each rival." },
      { feature: "reports", use: "Receive the standing brief by email every Monday." },
      { feature: "smi", use: "Open the headline view when you want more detail." },
    ],
    persona: { initials: "VN", title: "VN · Chief Marketing Officer", chip: "Fictional persona" },
    week: [
      "The standing brief arrives.",
      "Scan the headline index.",
      "Ask the team to drill into one number.",
      "Review the comparison.",
      "Decide where to put attention next.",
    ],
    outcome: "Know where you stand without opening a dashboard.",
    tiles: [
      { title: "One view that answers “are we ahead?”", text: "Share of voice and the gap to rivals, side by side." },
      { title: "Questions go to the team with the number attached", text: "Everyone reads the same figure the same way." },
    ],
    firstHour: {
      caption:
        "Sample first-hour view for leadership: share of voice Aurora Mobile 42%, Nimbus 35%, Kestrel 23%; the gap to Nimbus widened from 2 to 7 points over eight weeks; the weekly brief shows 11,382 mentions up 12%.",
      hotspots: [
        { title: "Where we stand", text: "Your share of all mentions across you and the two rivals. It always adds up to 100%." },
        { title: "Without opening the tool", text: "The standing brief arrives by email every Monday." },
      ],
    },
  },
}

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const

/** 2 = core, 1 = useful, 0 = optional; columns follow `roleKeys`. */
export type Level = 0 | 1 | 2
export const levels: Record<Level, { label: string; glyph: string; legend: string }> = {
  2: { label: "Core", glyph: "●", legend: "Core: used every week" },
  1: { label: "Useful", glyph: "◐", legend: "Useful: used often" },
  0: { label: "Optional", glyph: "○", legend: "Optional: there when needed" },
}

export const matrix: Record<Accent, readonly [Level, Level, Level, Level]> = {
  smi: [2, 2, 2, 2],
  trends: [2, 1, 2, 0],
  sent: [2, 2, 1, 0],
  cmp: [1, 1, 2, 2],
  stories: [2, 0, 1, 0],
  reports: [1, 2, 2, 2],
  channels: [1, 2, 1, 0],
}

export type Pick = { label: string; start: Accent; why: string; then: Accent; thenWhy: string }

export const picks: readonly Pick[] = [
  { label: "Know what is being said", start: "smi", why: "Every mention across Facebook, X, YouTube and Instagram in one view, with sentiment and reach.", then: "channels", thenWhy: "Go deeper on one network in its own terms." },
  { label: "Find what is rising", start: "trends", why: "Topics and hashtags ranked by momentum, so you see what is growing first.", then: "stories", thenWhy: "Turn a rising conversation into a content idea." },
  { label: "Spot a problem", start: "sent", why: "See where tone is turning negative, and which keywords are driving it.", then: "reports", thenWhy: "Get an alert the day it happens next time." },
  { label: "Compare with competitors", start: "cmp", why: "Your brand against Nimbus and Kestrel on share of voice, sentiment and growth.", then: "smi", thenWhy: "See the conversation behind each brand." },
  { label: "Find content ideas", start: "stories", why: "Story candidates drawn from real posts, each with its evidence.", then: "trends", thenWhy: "Check what is rising before you commit." },
  { label: "Get regular reports", start: "reports", why: "Daily, weekly or monthly reports by email, plus alerts when something moves.", then: "cmp", thenWhy: "Add the competitive view to the report." },
]

export const solutionsPage = {
  meta: {
    title: "Solutions by role",
    description:
      "See how brand managers, PR teams, agencies and leadership use vinci360°: the questions they ask, the pages they open and what their first hour looks like.",
  },
  hero: {
    chip: "Solutions",
    title: "Built for the people who speak for the brand.",
    lead: "Whether you manage the brand, protect its reputation, report to clients or answer to the board, Vinci360 gives you the view you need.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Take the product tour", href: "/product-tour" },
    listLabel: "The four roles",
    /** The reference highlights PR & communications in the hero illustration. */
    highlight: "pr" as RoleKey,
  },
  roles: {
    title: "Choose your role",
    lead: "See the questions you ask, the pages you would use and what your first hour looks like.",
    tablistLabel: "Role",
    questions: "Questions you ask",
    toolkit: "Your Vinci360 toolkit",
    learnMore: "Learn more",
    firstHour: "Your first-hour view",
    firstHourBar: "First-hour view",
    week: "A week with Vinci360",
    get: "What you get",
  },
  matrix: {
    title: "Who uses what",
    lead: "Select a role in the header to open it above.",
    caption: "Everyone starts where they need to and can reach the rest.",
    feature: "Feature",
    openRole: "Open the",
    openRoleEnd: "view above",
  },
  glossary: {
    title: "One number, one meaning",
    cards: [
      { who: "PR & communications · in Brand Compare" },
      { who: "Leadership · in the Monday brief" },
    ],
    equals: "is the same as",
    items: [
      { term: "Mentions", text: "Posts that name your brand, product or keyword." },
      { term: "Engagement", text: "Likes, reactions, comments, shares and other interactions on those posts." },
      { term: "Reach", text: "How many people could have seen the posts: an estimate based on audience size and observed amplification." },
      { term: "Share of voice", text: "Your mentions as a share of all mentions for you and the competitors you chose. Always adds up to 100%." },
      { term: "Net sentiment", text: "Positive share minus negative share, from −100 to +100." },
      { term: "Momentum", text: "How fast mentions are changing compared with the previous period." },
    ],
    footer: "Every page uses the same definitions, so numbers from different pages can be compared.",
  },
  picker: {
    title: "Which page should I start with?",
    lead: "Pick what you want to do first.",
    start: "Start here",
    go: "Go to this page",
    then: "Then try",
    open: "Open",
  },
  team: {
    title: "Works for the whole team",
    items: [
      { icon: Bookmark, title: "Saved views", text: "Name a filter combination and make it your default landing state." },
      { icon: ExternalLink, title: "Drill down to the posts", text: "Open the original posts behind any number." },
      { icon: Download, title: "Export and scheduled reports", text: "Export to Excel, CSV or PDF, or schedule a report by email." },
      { icon: Lock, title: "Role-based access", text: "Each person sees the modules, entities and competitor sets that suit their role." },
    ] satisfies Benefit[],
  },
  steps: {
    title: "How to get started",
    items: [
      { title: "Tell us your brand and two competitors", text: "That is all we need to prepare the demo." },
      { title: "See your own names in the demo", text: "The walkthrough uses your brand and rivals, not ours." },
      { title: "Your team gets pages that match their roles", text: "Each person lands on the view they need." },
    ],
    art: {
      brand: "Your brand: Aurora Mobile",
      rivals: "Competitors: Nimbus, Kestrel",
      sov: "Share of voice",
      legend: "● Your brand · ■ Rival 1 · ▲ Rival 2",
      roles: ["Brand managers", "PR", "Agencies", "Leadership"],
    },
  },
  explore: {
    title: "Keep exploring",
    items: [
      { id: "features", chip: "Features overview", text: "See all twelve modules.", link: "Explore the features", href: "/features" },
      { id: "tour", chip: "Product tour", text: "Follow one story in seven steps.", link: "Take the tour", href: "/product-tour" },
      { id: "demo", chip: "Demo", text: "See it with your own brand and rivals.", link: "Request a demo", href: "#demo" },
    ],
  },
  cta: {
    title: "See Vinci360 through your own role.",
    lead: "Leave your work email and tell us your role. We will walk you through the pages you would use.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
}

/** Shared by the client tablist and the server panel (ids must match for aria-controls / aria-labelledby). */
export const rolePanelId = "role-panel"
export const roleTabId = (key: RoleKey) => `rtab-${key}`
