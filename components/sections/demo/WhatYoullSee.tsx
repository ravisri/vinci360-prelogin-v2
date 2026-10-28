import Link from "next/link"
import { Info } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { demoSee as s } from "@/content/demo"
import { accents } from "@/lib/accents"
import { cn } from "@/lib/utils"

function Timeline({ className }: { className?: string }) {
  return (
    <Stagger
      as="ol"
      className={cn(
        "relative flex-col gap-3 before:absolute before:top-5.5 before:bottom-5.5 before:left-5.25 before:w-0.5 before:bg-primary-200",
        className,
      )}
    >
      {s.items.map((item, i) => (
        <StaggerItem as="li" key={item.title} className="relative grid grid-cols-[44px_1fr] items-center gap-3.5">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-full bg-primary font-heading text-[0.9375rem] font-extrabold text-primary-foreground ring-5 ring-background"
          >
            {i + 1}
          </span>
          <div className="flex flex-col gap-0.5 rounded-lg border border-border bg-card px-3 py-2.5 text-[0.90625rem] text-neutral-text md:px-4 md:py-3">
            <strong className="flex items-center gap-2 text-base text-foreground">
              <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", accents[item.accent].fill)} />
              {item.title}
            </strong>
            <span>{item.text}</span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

/** "What you'll see": sticky intro + seven-stop numbered timeline (lg); one disclosure holding the timeline below lg. */
export function WhatYoullSee({ className }: { className?: string }) {
  return (
    <section aria-labelledby="see-h" className={cn("container-site grid items-start gap-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-14", className)}>
      <div className="flex flex-col gap-3.5 lg:sticky lg:top-24">
        <h2 id="see-h" className="text-h3 md:text-h2">
          {s.title}
        </h2>
        <p className="text-base text-muted-foreground md:text-[1.0625rem]">{s.lead}</p>
        <p className="flex items-center gap-2 rounded-lg bg-primary-tint px-3 py-2.5 text-[0.9375rem] font-semibold">
          <Info aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-primary-700" />
          {s.note}
        </p>
        <p className="text-[0.9375rem]">
          {s.tour.before}
          <Link href={s.tour.href} className="font-semibold text-primary-700 hover:underline">
            {s.tour.label}
          </Link>
        </p>
      </div>
      <Timeline className="hidden lg:flex" />
      <Accordion type="single" collapsible className="lg:hidden">
        <AccordionItem value="stops" className="rounded-lg border border-border bg-card">
          <AccordionTrigger className="min-h-14 items-center px-4.5 py-3 font-heading text-[1.0625rem] font-bold hover:no-underline">
            {s.summary}
          </AccordionTrigger>
          <AccordionContent forceMount className="px-4.5 pb-4.5 in-data-[state=closed]:hidden">
            <Timeline className="flex" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
