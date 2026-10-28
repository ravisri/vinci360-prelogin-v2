import { BadgeCheck, GitCompareArrows, Gauge, Hash, Layers, Smile, TrendingUp, Users, type LucideIcon } from "lucide-react"

import type { Faq } from "@/components/sections/FaqAccordion"
import type { Accent } from "@/content/navigation"

/** Copy for /request-demo, verbatim from design-ref/Demo*.dc.html. Sample numbers live in sample-data.ts (demoPreview). */

export const demoMeta = {
  title: "Request a demo",
  description:
    "Request a Vinci360 demo or free trial on your own brand and two competitors, and see where you stand across social media, step by step, in one clear view.",
  path: "/request-demo",
} as const

export const demoHero = {
  chip: "Get started",
  title: "See Vinci360 on your own brand.",
  lead: "Tell us your brand and two competitors, and we’ll show you where you stand across social media.",
  leadMobile: "Your brand and two competitors, across social media.",
  ticks: [
    "Your own brand and two competitors, not sample data",
    "A walkthrough of the pages that matter to your role",
    "Questions answered on the spot",
  ],
  ticksLabel: "What you get",
  responseTime: "[Typical response time: to be confirmed]",
  previewNote: "In your demo, this view shows your brand and your competitors.",
} as const

/* ---------------------------------- Form ---------------------------------- */

export type RequestType = "demo" | "trial"

export const requestTypes: readonly { value: RequestType; label: string; help: string; button: string; summary: string }[] = [
  { value: "demo", label: "Request a demo", help: "A guided walkthrough with your own brand.", button: "Request my demo", summary: "Demo" },
  { value: "trial", label: "Start a free trial", help: "We’ll get in touch to set up your trial.", button: "Start my free trial", summary: "Free trial" },
]

export const demoRoles = ["Brand manager", "PR & communications", "Agency", "Leadership", "Other"] as const

/** "What matters most to you" (optional): the areas the demo should focus on. */
export const demoFocus = ["Brand health", "Sentiment", "Trends & hashtags", "Competitors"] as const
export const demoFocusIcons: Record<(typeof demoFocus)[number], LucideIcon> = {
  "Brand health": Gauge,
  Sentiment: Smile,
  "Trends & hashtags": TrendingUp,
  Competitors: GitCompareArrows,
}

export const demoForm = {
  title: "Tell us about you",
  required: "Fields marked * are required.",
  legend: "Your request",
  requestType: "Request type",
  fields: {
    first: "First name",
    last: "Last name",
    email: "Work email",
    company: "Company",
    role: "Your role",
    brand: "Which brand should we look at?",
    competitors: "Up to two competitors",
    keyword: "A campaign keyword or hashtag you care about",
    focus: "What matters most to you",
    notes: "Anything else we should know?",
  },
  /** Short names used in the error summary. */
  summaryLabels: { first: "First name", last: "Last name", email: "Work email", company: "Company", brand: "Brand", consent: "Consent" },
  errors: {
    first: "Enter your first name",
    last: "Enter your last name",
    email: "Enter your work email",
    emailInvalid: "Enter a valid work email",
    company: "Company is required",
    brand: "Tell us which brand to look at",
    consent: "Please agree to continue",
  },
  rolePlaceholder: "Choose your role",
  competitors: {
    max: 2,
    placeholder: "e.g. Nimbus",
    placeholderFull: "Two competitors added",
    help: "Type a name, then press Enter or Add.",
    helpFull: "You’ve added two. Remove one to change it.",
    add: "Add",
    listLabel: "Competitors added",
  },
  focusHelp: "Leave empty for everything.",
  notesMax: 500,
  consent: { before: "I agree to be contacted about Vinci360 and accept the ", link: "Privacy Policy", href: "/privacy-policy", after: "." },
  honeypot: "Leave this field empty",
  sending: "Sending…",
  privacy: "We’ll only use your details to respond to this request.",
  live: { sending: "Sending your request", sent: "Request sent", failed: "Something went wrong." },
} as const

export const demoSuccess = {
  title: (name: string) => `Thanks, ${name}. We’ve got your request.`,
  lead: "Here is what you sent us.",
  labels: { type: "Request", brand: "Brand", competitors: "Competitors", focus: "Focus" },
  noCompetitors: "None added",
  allFocus: "Everything (none selected)",
  nextTitle: "What happens next",
  next: ["We read your details and your brand.", "We set up your brand and competitors.", "You see Vinci360 on your own conversation."],
  responseTime: "[Typical response time: to be confirmed]",
  tour: { label: "Explore the features", href: "/features" },
  home: { label: "Back to home", href: "/" },
} as const

export const demoFailure = {
  title: "Something went wrong.",
  before: "Please try again or email us at ",
  email: "[Sales email: to be confirmed]",
  after: ".",
  kept: "Your details are still filled in.",
  retry: "Retry",
} as const

/* -------------------------------- Sections -------------------------------- */

export const demoSteps = {
  title: "What happens next",
  timing: "[Timing: to be confirmed]",
  art: { brand: "Brand: Aurora Mobile", rivals: "Competitors: Nimbus, Kestrel", chips: ["● Your brand", "■ Rival 1", "▲ Rival 2"] },
  steps: [
    { title: "We get your details and your brand", text: "Your request reaches the team with everything you told us." },
    { title: "We set up your brand and competitors", text: "So the demo opens on names you know." },
    { title: "You see Vinci360 on your own conversation", text: "We walk through it together and answer your questions." },
  ],
} as const

export const demoSee = {
  title: "What you’ll see",
  lead: "The demo follows one story, from where you stand to the report that arrives on its own.",
  note: "The demo adapts to your role.",
  tour: { before: "Prefer to look around first? ", label: "Explore the features.", href: "/features" },
  /** Mobile: one disclosure holding the seven stops. */
  summary: "The seven stops of the demo",
  items: [
    { accent: "cmp", title: "Brand Compare", text: "Where you stand against competitors." },
    { accent: "smi", title: "Social Media Intelligence", text: "The headline numbers and timeline." },
    { accent: "trends", title: "Trends", text: "What is rising, and by how much." },
    { accent: "sent", title: "Sentiment Analysis", text: "Where the tone is turning." },
    { accent: "sent", title: "Keyword Analysis", text: "How your campaign term performs across its sub-topics." },
    { accent: "stories", title: "Promotable Stories", text: "Ideas worth promoting, with the proof." },
    { accent: "reports", title: "SMA Reports", text: "The standing report that arrives on its own." },
  ] as readonly { accent: Accent; title: string; text: string }[],
} as const

export const demoBring = {
  title: "Bring these, and we’ll do the rest",
  lead: "Even a short history is enough to show something useful.",
  items: [
    { icon: BadgeCheck, label: "Your brand name" },
    { icon: Users, label: "Up to two competitors" },
    { icon: Hash, label: "A campaign keyword or hashtag you want to test" },
    { icon: Layers, label: "The areas you care about most" },
  ] as readonly { icon: LucideIcon; label: string }[],
} as const

export const demoFaq = {
  title: "Questions people ask",
  items: [
    { question: "What does Vinci360 monitor?", answer: "Public social media conversation about your brand, products and competitors: mentions, reach, interactions, sentiment, trends and hashtags." },
    { question: "Will I see my own brand?", answer: "Yes. In the demo we look at your brand and the competitors you choose." },
    { question: "Is reach an exact number?", answer: "No. Reach is an estimate based on audience size and observed amplification." },
    { question: "Do I need to install anything?", answer: "No. Vinci360 is a service you use in your browser." },
  ] as readonly Faq[],
  pricing: { placeholder: "[Pricing and trial terms: to be confirmed]", link: "See Terms: Fees, trials and payment →", href: "/terms#fees-trials-payment" },
} as const

export const demoContact = {
  title: "Prefer to talk to a person?",
  people: [
    { name: "[Contact name 1]", role: "[Title]", email: "[Email: to be confirmed]", phone: "[Phone: to be confirmed]" },
    { name: "[Contact name 2]", role: "[Title]", email: "[Email: to be confirmed]", phone: "[Phone: to be confirmed]" },
  ],
  offices: { label: "Offices: ", placeholder: "[Office locations from the current site footer: to be confirmed]" },
  more: { before: "All contact options are on the ", label: "Contact page", href: "/contact", after: "." },
} as const

export const demoBand = {
  title: "Still deciding? See how teams use Vinci360.",
  links: [
    { label: "Solutions by role", href: "/solutions" },
    { label: "Features", href: "/features" },
  ],
} as const
