import { Heart, LayoutGrid, Repeat2, Users, type LucideIcon } from "lucide-react"

import type { ChannelKey } from "@/content/channels-data"
import { cn } from "@/lib/utils"

const icons: Record<ChannelKey, LucideIcon> = {
  interactions: Heart,
  content: LayoutGrid,
  voices: Users,
  amplification: Repeat2,
}

/** Source Analysis view glyph (decorative), same footprint as the old network icon: 20px, stroke 1.7. */
export function ViewIcon({ view, className }: { view: ChannelKey; className?: string }) {
  const Icon = icons[view]
  return <Icon aria-hidden="true" strokeWidth={1.7} className={cn("size-5 flex-none", className)} />
}
