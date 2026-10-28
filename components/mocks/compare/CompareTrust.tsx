import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { compareTrust as c } from "@/content/features/brand-compare"
import { cn } from "@/lib/utils"

const thumb = "grid h-24 place-items-center overflow-hidden rounded-lg"

/** Decorative thumbnails: a slice traced to its posts · an export sheet with its filters · a schedule. */
const thumbnails = [
  <span key="trace" className={cn(thumb, "justify-items-start bg-background px-3")}>
    <span className="flex w-full items-center gap-3">
      <svg viewBox="0 0 40 40" className="size-14 flex-none">
        <g transform="rotate(-90 20 20)" fill="none" strokeWidth="6">
          <circle cx="20" cy="20" r="15" strokeDasharray="35.8 94.2" className="stroke-cmp-text" />
          <circle cx="20" cy="20" r="15" strokeDasharray="33.9 94.2" strokeDashoffset="-35.8" className="stroke-trends-text" />
          <circle cx="20" cy="20" r="15" strokeDasharray="24.5 94.2" strokeDashoffset="-69.7" className="stroke-sent-text" />
        </g>
      </svg>
      <ArrowRight strokeWidth={2} className="size-5 flex-none text-cmp-text" />
      <span className="flex flex-1 flex-col gap-2">
        <span className="h-2 rounded-full bg-border" />
        <span className="h-2 w-3/5 rounded-full bg-border" />
        <span className="h-2 w-5/6 rounded-full bg-border" />
      </span>
    </span>
  </span>,
  <span key="sheet" className={cn(thumb, "justify-items-start bg-background px-3")}>
    <span className="flex items-center gap-3">
      <span className="flex w-16 flex-col gap-0.5 rounded-xs border border-border bg-card p-1.5 text-[0.5625rem] leading-tight">
        <span className="font-bold text-cmp-text">{c.sheet.title}</span>
        {c.sheet.rows.map((r) => (
          <span key={r} className="text-muted-foreground">
            {r}
          </span>
        ))}
      </span>
      <span className="flex gap-2">
        {c.sheet.formats.map((f) => (
          <span key={f} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-bold">
            {f}
          </span>
        ))}
      </span>
    </span>
  </span>,
  <span key="schedule" className={cn(thumb, "bg-reports-tint text-reports-text")}>
    <CalendarDays strokeWidth={1.8} className="size-11" />
  </span>,
]

/** "A result you can stand behind": three trust cards; the third links to Reports & Alerts. */
export function CompareTrust() {
  return (
    <section aria-labelledby="trust-h" className="container-site flex flex-col gap-8 pt-16 md:pt-24">
      <SectionHeader id="trust-h" title={c.title} />
      <Stagger as="ul" className="grid gap-5 md:grid-cols-3">
        {c.items.map((item, i) => (
          <StaggerItem
            as="li"
            key={item.title}
            className={cn("relative flex flex-col gap-3 rounded-lg bg-card p-6 shadow-card", item.href && "transition-transform duration-300 hover:-translate-y-1")}
          >
            <span aria-hidden="true">{thumbnails[i]}</span>
            <h3 className="text-[1.1875rem] leading-[1.25] font-bold">{item.title}</h3>
            <p className="text-[0.9375rem] text-muted-foreground">{item.text}</p>
            {item.href && (
              <Link
                href={item.href}
                className="mt-auto inline-flex items-center gap-1.5 font-semibold text-reports-text after:absolute after:inset-0 after:rounded-lg hover:underline"
              >
                {item.linkLabel}
                <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
              </Link>
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
