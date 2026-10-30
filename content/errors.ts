/** Copy for the 404 (app/not-found.tsx) and 500 (app/error.tsx) pages. Shared tiles and links follow the 404 reference. */
import { showLogin } from "@/content/navigation"

export type ErrorTileIcon = "grid" | "play" | "users" | "chart" | "trend" | "compare" | "calendar" | "mail"
export type ErrorActionIcon = "home" | "grid" | "retry"

export type ErrorTile = {
  label: string
  line: string
  href: string
  icon: ErrorTileIcon
  /** Feature accent dot before the label. */
  accent?: "smi" | "trends" | "cmp"
}

export const errorTilesTitle = "Where do you want to go?"

export const errorTiles: ErrorTile[] = [
  { label: "Features", line: "See everything Vinci360 does", href: "/features", icon: "grid" },
  { label: "Contact", line: "Talk to us", href: "/contact", icon: "mail" },
  { label: "Solutions", line: "Find the view for your role", href: "/solutions", icon: "users" },
  {
    label: "Social Media Intelligence",
    line: "Everything said about your brand",
    href: "/features/social-media-intelligence",
    icon: "chart",
    accent: "smi",
  },
  { label: "Trends", line: "What is rising right now", href: "/features/trends", icon: "trend", accent: "trends" },
  {
    label: "Brand Compare",
    line: "Where you stand against competitors",
    href: "/features/brand-compare",
    icon: "compare",
    accent: "cmp",
  },
  { label: "Request a demo", line: "See it on your own brand", href: "/request-demo", icon: "calendar" },
  { label: "Contact", line: "Talk to a person", href: "/contact", icon: "mail" },
]

export const lostTitle = "Still lost?"

export const lostLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Log in", href: "/login" },
].filter((l) => showLogin || l.href !== "/login")

export const reportProblem = {
  lead: "Think something is broken?",
  placeholder: "[Report a problem: route to be confirmed]",
}

export const notFound = {
  chip: "Error 404",
  title: "We couldn’t find that page.",
  text: "The link may be broken or the page may have moved. Here are some ways back.",
  primary: { label: "Back to home", href: "/", icon: "home" as ErrorActionIcon },
  secondary: { label: "Explore the features", href: "/features", icon: "grid" as ErrorActionIcon },
  chart: {
    caption: "A chart showing no results for this page: zero mentions, a flat line and the note “No mentions found”.",
    title: "Mentions · This page",
    value: "0",
    delta: "▼ no data",
    note: "No mentions found",
    hint: "Try a different path",
    floatTitle: "Looking for something?",
    floatChip: "Not found",
  },
}

export const serverError = {
  chip: "Error 500",
  title: "Something went wrong on our side.",
  text: "This page couldn’t load just now. Try again, or pick another way in below.",
  primary: { label: "Try again", icon: "retry" as ErrorActionIcon },
  secondary: { label: "Back to home", href: "/", icon: "home" as ErrorActionIcon },
  chart: {
    caption: "A paused chart for this page: the line stops part-way with a warning marker and the note “Data paused”.",
    title: "Mentions · This page",
    value: "–",
    delta: "– paused",
    marker: "Paused",
    note: "Data paused",
    hint: "Try again in a moment",
    floatTitle: "Something went wrong",
    floatChip: "Temporarily unavailable",
  },
}
