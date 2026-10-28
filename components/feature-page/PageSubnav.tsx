"use client"

import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Literal class strings per module so Tailwind sees them. */
const tones = {
  trends: {
    pill: "border-trends-200 text-trends-text hover:bg-trends-tint hover:text-trends-text",
    on: "border-trends-text bg-trends-tint",
  },
  sent: {
    pill: "border-sent-200 text-sent-text hover:bg-sent-tint hover:text-sent-text",
    on: "border-sent-text bg-sent-tint",
  },
} as const

export type PageSubnavItem = { id: string; label: string; icon: LucideIcon }

type PageSubnavProps = {
  label: string
  items: readonly PageSubnavItem[]
  accent: keyof typeof tones
  /** hero = inline under the hero buttons (desktop) · sticky = full-width bar pinned under the 64px header (390). */
  variant?: "hero" | "sticky"
  className?: string
}

/**
 * "On this page" pills for a two-part feature page. The sticky variant marks the section in view
 * with aria-current once its top passes ~40% of the viewport.
 */
export function PageSubnav({ label, items, accent, variant = "hero", className }: PageSubnavProps) {
  const sticky = variant === "sticky"
  const t = tones[accent]
  const [current, setCurrent] = useState(items[0]?.id)

  useEffect(() => {
    if (!sticky) return
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id)
      },
      { rootMargin: "0px 0px -60% 0px" },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [sticky, items])

  return (
    <nav aria-label={label} className={cn("flex gap-2.5", sticky && "sticky top-16 z-30 gap-2 border-b border-border bg-background px-4 py-2", className)}>
      {items.map(({ id, label: text, icon: Icon }) => {
        const on = sticky && current === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={on ? "true" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border bg-card px-4 text-sm font-semibold no-underline",
              t.pill,
              sticky && "flex-1",
              on && cn(t.on, "font-extrabold underline underline-offset-4"),
            )}
          >
            <Icon aria-hidden="true" strokeWidth={2} className="size-4" />
            {text}
          </a>
        )
      })}
    </nav>
  )
}
