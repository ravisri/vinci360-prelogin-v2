import type { LucideIcon } from "lucide-react"

import type { Benefit } from "@/components/sections/BenefitList"
import type { Action, Crumb } from "@/components/sections/Hero"
import type { Step } from "@/components/sections/HowToUse"
import type { RelatedModule } from "@/components/sections/RelatedModules"
import type { Accent } from "@/content/navigation"

export type FeatureSlug =
  | "social-media-intelligence"
  | "trends"
  | "sentiment-keywords"
  | "brand-compare"
  | "promotable-stories"
  | "reports-alerts"
  | "channel-analysis"

/**
 * Everything FeaturePageTemplate needs to render the shared blocks of a feature page. Data only:
 * illustrations and mocks are passed to the template as nodes, so content files stay plain `.ts`.
 */
export type FeaturePageConfig = {
  slug: FeatureSlug
  /** Drives the hero chip, persona icons, step badges, outcome tiles and panel tints. */
  accent: Accent
  seo: {
    /** Page title without the " | vinci360°" suffix; also the last breadcrumb. */
    title: string
    /** 150–160 characters. */
    description: string
    /** OG image in public/og/. */
    image?: string
  }
  hero: {
    /** Visual trail, e.g. Platform / Social Media Intelligence. */
    breadcrumb: readonly Crumb[]
    /** solid on SMI; tint + bordered on the other features. */
    chip: { label: string; variant?: "tint" | "solid"; bordered?: boolean }
    title: string
    lead: string
    /** Shorter lead below md, when the 390 reference differs (both stay in the HTML). */
    leadMobile?: string
    primary: Action
    secondary?: Action
    /** "Facebook · X · YouTube · Instagram" under the buttons (omitted when the page passes `heroTrailing`). */
    networks?: string
  }
  /** "Who opens this page": 2–4 role pills, plus an optional tinted "When to use it" box (Channels). */
  personas: { title: string; items: readonly Benefit[]; aside?: PersonasAside }
  /** "How to use it": three steps; illustrations come from the page. */
  steps: { title: string; items: readonly Omit<Step, "illustration" | "icon">[] }
  /** "What it does for your brand": accent, tint, neutral tiles. */
  outcomes: { title: string; items: readonly Benefit[] }
  /** "Works with the rest of Vinci360": thumbnails come from the page. */
  related: { title: string; items: readonly Omit<RelatedModule, "thumbnail">[] }
  /** Navy email band. */
  cta: { title: string; lead: string; label: string; placeholder: string; buttonLabel: string; action: string }
}

/** Tinted info box beside the role pills. */
export type PersonasAside = {
  /** aria-label of the aside. */
  label: string
  title: string
  text: string
  /** Shorter line below md, as in the 390 reference. */
  textMobile?: string
}

/** One numbered widget row in a "What you'll see"-style walkthrough (SMI, Compare, Stories, Channels). */
export type WalkthroughItem = {
  /** Anchor of the row (e.g. "w1"), for in-page links. */
  id?: string
  title: string
  lead: string
  tells: {
    label: string
    text: string
    /** Shorter line used below md, as in the 390 reference. */
    textMobile?: string
  }
  metrics: readonly string[]
  hint: string
  /** e.g. "Tap a card…" instead of "Click a card…" below md. */
  hintMobile?: string
  /** Hint icon when it is not a "click here" (e.g. Info for an insight, Download for an export). */
  hintIcon?: LucideIcon
  /** Solid "insight" box instead of the dashed "try it" hint. */
  insight?: boolean
}
