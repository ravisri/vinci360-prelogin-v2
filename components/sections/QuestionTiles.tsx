import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

export type QuestionTile = {
  accent: Accent
  eyebrow: string
  title: string
  glyph: "bars" | "rise" | "meters" | "doc"
  link: string
  href: string
}

/** Small decorative drawings in currentColor (120×52), as in the reference tiles. */
function Glyph({ kind }: { kind: QuestionTile["glyph"] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 52" className="mt-auto h-13 w-30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {kind === "bars" && (
        <g stroke="none" fill="currentColor">
          <rect x="0" y="4" width="26" height="48" rx="3" />
          <rect x="34" y="20" width="26" height="32" rx="3" opacity="0.45" />
          <rect x="68" y="34" width="26" height="18" rx="3" opacity="0.25" />
        </g>
      )}
      {kind === "rise" && (
        <>
          <path d="M2 46 L30 34 L50 40 L78 18 L104 8" />
          <path d="M92 6 L106 7 L103 21" />
        </>
      )}
      {kind === "meters" && (
        <>
          <rect x="1.5" y="8" width="100" height="12" rx="6" />
          <rect x="1.5" y="8" width="70" height="12" rx="6" fill="currentColor" stroke="none" />
          <rect x="1.5" y="32" width="100" height="12" rx="6" />
          <rect x="1.5" y="32" width="38" height="12" rx="6" fill="currentColor" stroke="none" />
        </>
      )}
      {kind === "doc" && (
        <>
          <rect x="1.5" y="2" width="64" height="48" rx="6" />
          <path d="M14 16 H52 M14 26 H52 M14 36 H38" />
          <path d="M92 10 L97 21 L109 22 L100 30 L103 42 L92 36 L81 42 L84 30 L75 22 L87 21 Z" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  )
}

/** "Four questions, answered": solid-accent link tiles, each opening its feature page. */
export function QuestionTiles({ items, className }: { items: readonly QuestionTile[]; className?: string }) {
  return (
    <Stagger as="ul" className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((q) => {
        const a = accents[q.accent]
        return (
          <StaggerItem as="li" key={q.href} className="flex">
            <Link
              href={q.href}
              className={cn(
                "group flex min-h-62 w-full flex-col gap-5 rounded-lg px-6 py-7 no-underline transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-72.5",
                a.solid,
                a.onFill,
              )}
            >
              <span className="text-[0.8125rem] font-bold tracking-[0.06em] uppercase">{q.eyebrow}</span>
              <h3 className="text-[1.625rem] leading-[1.15] font-extrabold">{q.title}</h3>
              <Glyph kind={q.glyph} />
              <span className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4">
                {q.link}
                <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}
