/** Site navigation: header, mega menu, mobile sheet, footer and sitemap all read from here. */

export type Accent = "smi" | "trends" | "sent" | "cmp" | "stories" | "reports" | "channels"

export type NavItem = { label: string; href: string }

export type FeatureNavItem = NavItem & {
  blurb: string
  accent: Accent
  /** Literal class so Tailwind picks it up. */
  dotClass: string
}

export const features: FeatureNavItem[] = [
  { label: "Social Media Intelligence", href: "/features/social-media-intelligence", blurb: "Every mention, one view", accent: "smi", dotClass: "bg-smi" },
  { label: "Trends", href: "/features/trends", blurb: "What is rising right now", accent: "trends", dotClass: "bg-trends" },
  { label: "Sentiment & Keywords", href: "/features/sentiment-keywords", blurb: "How people feel, and why", accent: "sent", dotClass: "bg-sent" },
  { label: "Brand Compare", href: "/features/brand-compare", blurb: "You vs your competitors", accent: "cmp", dotClass: "bg-cmp" },
  { label: "Promotable Stories", href: "/features/promotable-stories", blurb: "Content ideas with evidence", accent: "stories", dotClass: "bg-stories" },
  { label: "Reports & Alerts", href: "/features/reports-alerts", blurb: "Insights that come to you", accent: "reports", dotClass: "bg-reports" },
  { label: "Source Analysis", href: "/features/source-analysis", blurb: "Interactions, top content, voices and amplification", accent: "channels", dotClass: "bg-channels" },
]

export const platformLink: NavItem = { label: "Platform", href: "/features" }

/** Last row of the Platform mega menu and mobile sheet. */
export const overviewLink = {
  label: "Explore all features",
  href: "/features",
  blurb: "Twelve modules, one clear picture",
}

/** Header links after "Platform" (which opens the mega menu). */
export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const solutionsNav: NavItem[] = [
  { label: "Brand managers", href: "/solutions?role=brand" },
  { label: "PR & communications", href: "/solutions?role=pr" },
  { label: "Agencies", href: "/solutions?role=agencies" },
  { label: "Leadership", href: "/solutions?role=leadership" },
]

export const companyNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
]

export const ctaLink: NavItem = { label: "Request a demo", href: "/request-demo" }
/** CTA band email field states (walkthrough request to support@vinci360.com). */
export const ctaBandForm = {
  invalid: "Enter a work email like you@company.com",
  error: "Something went wrong. Please try again or email support@vinci360.com.",
  success: (email: string) => `Thanks! We’ll email ${email} to set up your walkthrough of Vinci360.`,
}

export const loginLink: NavItem = { label: "Log in", href: "/login" }
/** Header, mobile sheet and 404 "Log in" links are hidden for now; /login itself stays live. Set true to bring them back. */
export const showLogin = false

export const footerBlurb = "Social media intelligence for your brand: mentions, reach, sentiment and trends in one view."

export const footerColumns: { id: string; heading: string; items: NavItem[] }[] = [
  { id: "ft-p", heading: "Platform", items: features },
  { id: "ft-s", heading: "Solutions", items: solutionsNav },
  { id: "ft-c", heading: "Company", items: companyNav },
  { id: "ft-l", heading: "Legal", items: legalNav },
]

export const copyright = "© 2026 Vinci360. All rights reserved."
