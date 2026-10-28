"use client"

// Client module: the icons are components, which cannot be passed from a server component.
import { Hash, Layers } from "lucide-react"

import { PageSubnav } from "@/components/feature-page/PageSubnav"
import { trendsSubnav as c } from "@/content/features/trends"

const icons = { topics: Layers, hashtags: Hash } as const
const items = c.items.map((i) => ({ ...i, icon: icons[i.id] }))

/**
 * "On this page" pills (Topics · Hashtags). hero = inline under the hero buttons (desktop) ·
 * sticky = full-width bar pinned under the 64px header (390), marking the section in view.
 */
export function TrendsSubnav({ variant = "hero", className }: { variant?: "hero" | "sticky"; className?: string }) {
  return <PageSubnav label={c.label} items={items} accent="trends" variant={variant} className={className} />
}
