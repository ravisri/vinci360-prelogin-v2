import { ExternalLink, Hand, Info, Layers, type LucideIcon } from "lucide-react"

/** About page copy (design-ref/About). Unconfirmed facts stay as bracketed placeholders. */

export type Principle = {
  id: "evidence" | "native" | "estimates" | "decide"
  icon: LucideIcon
  title: string
  /** Desktop: two lines. Mobile shows the first line, or `mobile` when it differs. */
  lines: readonly [string, string]
  mobile?: string
  caption: string
}

export const aboutPage = {
  meta: {
    title: "About",
    description:
      "Vinci360, a product by MSRcosmos, gives brands a real-time view of the conversation across social media. Read what we believe and how we work, and why.",
  },
  hero: {
    chip: "About",
    title: "Know first. Act before your competition does.",
    lead: "Vinci360 gives brands a real-time view of the conversation across social media, so they hear good and bad news early and can act before it spreads.",
    leadMobile: "A real-time view of the conversation across social media, so you hear good and bad news early.",
    primary: { label: "Request a demo", href: "/request-demo" },
    secondary: { label: "Meet the team", href: "#team" },
    caption: "Illustration: mentions, reach, interactions and sentiment, each connected to one Vinci360 dashboard.",
  },
  beliefs: {
    title: "What we believe",
    lead: "Four principles, taken from how the product works.",
    items: [
      {
        id: "evidence",
        icon: ExternalLink,
        title: "Evidence behind every number",
        lines: ["Every figure can be traced to the real posts behind it.", "Open the posts, read what people actually said."],
        caption: "Mini illustration: a figure of 3,104 mentions opening onto the posts behind it.",
      },
      {
        id: "native",
        icon: Layers,
        title: "Every metric in plain terms",
        lines: ["We report mentions, reach, interactions and sentiment the same clear way.", "Nothing is flattened into a single vanity score."],
        caption: "Mini illustration: metric chips.",
      },
      {
        id: "estimates",
        icon: Info,
        title: "Honest about estimates",
        lines: ["Reach is an estimate based on audience size and observed amplification.", "We label it that way, everywhere it appears."],
        mobile: "Reach is an estimate based on audience size and observed amplification, and we say so.",
        caption: "Mini illustration: a reach figure carrying an “estimate” tag.",
      },
      {
        id: "decide",
        icon: Hand,
        title: "You decide",
        lines: ["The platform suggests; people choose what to promote, report or act on.", "Nothing goes out without a person saying yes."],
        caption: "Mini illustration: a suggestion with Accept and Dismiss buttons.",
      },
    ] as readonly Principle[],
    art: {
      openPosts: "→ open the posts",
      mentions: "mentions",
      metrics: ["Mentions · volume", "Reach · estimated", "Interactions · by type", "Sentiment · ▲ ▼ –"],
      reach: "Reach",
      estimate: "Estimate",
      suggested: "Suggested story",
      accept: "Accept",
      dismiss: "Dismiss",
    },
  },
  does: {
    title: "What Vinci360 does",
    fact: "12 modules · one view",
    link: { label: "See all features", href: "/features" },
    /** Question per feature area, in navigation order. */
    questions: [
      "What is being said about us?",
      "What is rising right now?",
      "How do people feel, and why?",
      "How do we compare with rivals?",
      "What is worth promoting?",
      "What changed since last time?",
      "How is the conversation performing?",
    ],
  },
  msr: {
    title: "A product from MSRcosmos",
    placeholders: ["[About MSRcosmos: company description to be supplied]", "[Years in business, services and focus areas: to be supplied]"],
    visit: "Visit msrcosmos.com",
    logo: "MSRcosmos logo",
    logoLabel: "Placeholder for the MSRcosmos logo",
    poweredBy: "Powered by",
    caption: "Vinci360 is built and supported by MSRcosmos.",
  },
  how: {
    title: "How we work with you",
    link: { label: "Start with a demo request", href: "/request-demo" },
    steps: [
      { title: "You tell us your brand and competitors" },
      { title: "We show you Vinci360 on your own conversation" },
      { title: "Your team gets the pages that fit their roles" },
    ],
    art: { brand: "Your brand", rivals: "Two competitors", roles: ["Brand", "PR", "Agency", "Leadership"] },
  },
  team: {
    title: "Leadership",
    leaders: [
      { name: "[Name: to be confirmed]", role: "[Role: to be confirmed]", bio: "[Short bio: to be supplied]", email: "[Email: to be confirmed]" },
      { name: "[Name: to be confirmed]", role: "[Role: to be confirmed]", bio: "[Short bio: to be supplied]", email: "[Email: to be confirmed]" },
    ],
    note: "Details shown here are placeholders to confirm before publishing.",
  },
  locations: {
    title: "Where we are",
    groups: [
      { title: "Primary locations", placeholder: "[Primary locations: to be confirmed]" },
      { title: "Other offices", placeholder: "[Other offices: to be confirmed]" },
    ],
  },
  security: {
    title: "Questions and security",
    placeholder: "[Security and practices: to be confirmed]",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  explore: {
    title: "Keep exploring",
    items: [
      { id: "features", chip: "Features overview", text: "See what Vinci360 does.", link: "Explore the features", href: "/features" },
      { id: "source", chip: "Source Analysis", text: "Interactions, top content, voices and amplification.", link: "Explore Source Analysis", href: "/features/source-analysis" },
      { id: "contact", chip: "Contact", text: "Talk to us.", link: "Get in touch", href: "/contact" },
    ],
  },
  cta: {
    title: "See Vinci360 on your own brand.",
    lead: "Leave your work email and we’ll set up a walkthrough with your brand and two competitors.",
    label: "Work email",
    placeholder: "you@company.com",
    buttonLabel: "Request a demo",
    action: "/request-demo",
  },
} as const
