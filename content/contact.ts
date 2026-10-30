import type { Faq } from "@/components/sections/FaqAccordion"

/* Contact page copy. Office names, addresses, phone numbers and emails stay bracketed placeholders until confirmed. */

export const contactMeta = {
  title: "Contact",
  description:
    "Contact the Vinci360 team about a demo, a partnership, a media request or a general question, and we’ll point you to the right person to help you quickly.",
  path: "/contact",
} as const

export const contactHero = {
  chip: "Contact",
  title: "Let’s talk.",
  lead: "Whether you have a question, an idea for working together or a request for the press, tell us what you need and we’ll point you to the right person.",
  responseTime: "[Typical response time: to be confirmed]",
} as const

/* ------------------------------ Routing cards ------------------------------ */

export const contactTopics = ["General question", "Partnership", "Media or press", "Feedback about the website", "Other"] as const
export type ContactTopic = (typeof contactTopics)[number]

export const contactRoles = ["Brand manager", "PR & communications", "Agency", "Leadership", "Other"] as const

export type ContactRoute = {
  id: string
  title: string
  text: string
  icon: "play" | "lock" | "users" | "message"
  button: string
  /** Link routes leave the page; form routes pick a topic and jump to #form. */
  href?: string
  topic?: ContactTopic
  placeholder?: string
}

export const contactRoutes = {
  title: "What do you need?",
  items: [
    { id: "demo", title: "See Vinci360 on your brand", text: "Tell us your brand and two competitors.", icon: "play", button: "Request a demo", href: "/request-demo" },
    // {
    //   id: "users",
    //   title: "I already use Vinci360",
    //   text: "Sign in to your account.",
    //   icon: "lock",
    //   button: "Log in",
    //   href: "/login",
    //   placeholder: "[Help for existing users: route to be confirmed]",
    // },
    { id: "partners", title: "Partnerships and media", text: "Working together or writing about Vinci360?", icon: "users", button: "Send a message", topic: "Partnership" },
    { id: "other", title: "Something else", text: "A general question about the product or the company.", icon: "message", button: "Send a message", topic: "General question" },
  ] as readonly ContactRoute[],
} as const

/* ---------------------------------- Form ---------------------------------- */

export const contactForm = {
  title: "Send us a message",
  required: "Fields marked * are required.",
  legend: "Your message",
  fields: {
    topic: "Topic",
    first: "First name",
    last: "Last name",
    email: "Work email",
    company: "Company",
    role: "Your role",
    message: "Message",
  },
  /** Short names used in the error summary. */
  summaryLabels: { first: "First name", last: "Last name", email: "Work email", message: "Message", consent: "Consent" },
  errors: {
    first: "Enter your first name",
    last: "Enter your last name",
    email: "Enter your work email",
    emailInvalid: "Enter a valid work email",
    message: "Please write a short message",
    consent: "Please agree to continue",
  },
  rolePlaceholder: "Choose your role",
  messageMax: 1000,
  consent: { before: "I agree to be contacted about my message and accept the ", link: "Privacy Policy", href: "/privacy-policy", after: "." },
  honeypot: "Leave this field empty",
  submit: "Send message",
  sending: "Sending…",
  privacy: "We’ll only use your details to respond to this message.",
  live: { sending: "Sending your message", sent: "Message sent", failed: "Something went wrong." },
} as const

export const contactSuccess = {
  title: (name: string) => `Thanks, ${name}. We’ve got your message.`,
  labels: { topic: "Topic", email: "Reply to" },
  responseTime: "[Typical response time: to be confirmed]",
  tour: { label: "Explore the features", href: "/features" },
  home: { label: "Back to home", href: "/" },
} as const

export const contactFailure = {
  title: "Something went wrong.",
  lead: "Please try again or email us.",
  email: "[Contact email: to be confirmed]",
  kept: "Your message is still filled in.",
  retry: "Retry",
} as const

/* --------------------------------- Offices --------------------------------- */

export type OfficeRegion = "r1" | "r2" | "r3"

export type Office = {
  label: string
  primary?: boolean
  region: OfficeRegion
  /** Map dot, as literal % classes over the 1152×520 map. */
  dot: string
  /** Label pill centre (xl+), as literal % classes. */
  pill: string
  /** Leader line from the dot to the pill, in map units. */
  line: readonly [x1: number, y1: number, x2: number, y2: number]
}

export const contactOffices = {
  title: "Our offices",
  caption: "Map of Vinci360 office locations.",
  /** Shared by every office until the details are confirmed. */
  details: ["[Address: to be confirmed]", "[Phone: to be confirmed]", "[Email: to be confirmed]"],
  primaryNote: "Primary location, to be confirmed",
  legend: { primary: "Primary locations", primaryPlaceholder: "[to be confirmed]", other: "Other offices" },
  items: [
    { label: "[City 1]", primary: true, region: "r1", dot: "left-[15.85%] top-[32.25%]", pill: "left-[26.18%] top-[46.1%]", line: [182.6, 167.7, 301.6, 239.7] },
    { label: "[City 2]", primary: true, region: "r1", dot: "left-[28.57%] top-[30.38%]", pill: "left-[39.6%] top-[21.92%]", line: [329.1, 158, 456.1, 114] },
    { label: "[City 3]", region: "r1", dot: "left-[15.65%] top-[32.46%]", pill: "left-[23.46%] top-[54.77%]", line: [180.3, 168.8, 270.3, 284.8] },
    { label: "[City 4]", region: "r1", dot: "left-[21.94%] top-[35.9%]", pill: "left-[29.14%] top-[37.06%]", line: [252.7, 186.7, 335.7, 192.7] },
    { label: "[City 5]", region: "r1", dot: "left-[17.11%] top-[25.15%]", pill: "left-[24.62%] top-[17.85%]", line: [197.1, 130.8, 283.7, 92.8] },
    { label: "[City 6]", region: "r2", dot: "left-[70.51%] top-[47.48%]", pill: "left-[62.33%] top-[39.02%]", line: [812.3, 246.9, 717.9, 202.9] },
    { label: "[City 7]", region: "r2", dot: "left-[71.16%] top-[48.13%]", pill: "left-[79.67%] top-[56.6%]", line: [819.8, 250.3, 917.8, 294.3] },
    { label: "[City 8]", region: "r3", dot: "left-[89.34%] top-[85.35%]", pill: "left-[82.17%] top-[82.65%]", line: [1029.2, 443.8, 946.6, 429.8] },
  ] as readonly Office[],
  /** Below xl the pins group by region so every 44px target stays clear of the others. */
  regions: [
    { id: "r1", label: "[Region 1]", pos: "left-[20%] top-[31.7%]" },
    { id: "r2", label: "[Region 2]", pos: "left-[70.8%] top-[47.7%]" },
    { id: "r3", label: "[Region 3]", pos: "left-[89.34%] top-[85.35%]" },
  ] as readonly { id: OfficeRegion; label: string; pos: string }[],
} as const

/* ------------------------------- Lower sections ------------------------------ */

export const contactFaq = {
  title: "Before you write",
  lead: "Three quick answers.",
  items: [
    { question: "What does Vinci360 monitor?", answer: "Public social media conversation about your brand, products and competitors: mentions, reach, interactions, sentiment, trends and hashtags." },
    { question: "Can I see my own brand in a demo?", answer: "Yes. Use the Request a demo page to tell us your brand and up to two competitors." },
    { question: "Is reach an exact number?", answer: "No. Reach is an estimate based on audience size and observed amplification." },
  ] as readonly Faq[],
  pricing: "[Pricing and trial terms: to be confirmed]",
} as const

export const contactMsr = {
  title: "Powered by MSRcosmos",
  logoAlt: "MSRcosmos",
  links: [
    { label: "About", href: "/about" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  visit: "Visit msrcosmos.com",
} as const

export const contactExplore = {
  title: "Keep exploring",
  items: [
    { accent: "smi", label: "Request a demo", prompt: "See it on your own brand and two competitors.", href: "/request-demo", linkLabel: "Request a demo" },
    { accent: "smi", label: "Features overview", prompt: "See what Vinci360 does.", href: "/features", linkLabel: "Explore the features" },
    { accent: "smi", label: "Solutions", prompt: "Find your role.", href: "/solutions", linkLabel: "See solutions by role" },
  ],
  roles: ["Brand", "PR", "Agency", "Leadership"],
} as const

export const contactBand = {
  title: "Ready to see it on your own brand?",
  button: { label: "Request a demo", href: "/request-demo" },
} as const
