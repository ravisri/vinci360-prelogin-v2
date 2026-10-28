"use client"

// Client module: the icons are components, which cannot be passed from a server component.
import { KeyRound, Smile } from "lucide-react"

import { PageSubnav } from "@/components/feature-page/PageSubnav"
import { sentimentSubnav as c } from "@/content/features/sentiment-keywords"

const icons = { sentiment: Smile, keywords: KeyRound } as const
const items = c.items.map((i) => ({ ...i, icon: icons[i.id] }))

/** "On this page" pills (Sentiment · Keywords): in the hero on desktop, pinned under the header at 390. */
export function SentimentSubnav({ variant = "hero", className }: { variant?: "hero" | "sticky"; className?: string }) {
  return <PageSubnav label={c.label} items={items} accent="sent" variant={variant} className={className} />
}
