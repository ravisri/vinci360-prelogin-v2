"use client"

import Image from "next/image"

import { Reveal } from "@/components/motion/Reveal"
import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { contactOffices as o, type Office } from "@/content/contact"
import { cn } from "@/lib/utils"

/** Address, phone and email for one office, all placeholders until confirmed. */
function OfficeDetails({ office }: { office: Office }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-heading text-base font-extrabold">{office.label}</p>
      {office.primary && <p className="text-xs font-semibold text-primary-700">{o.primaryNote}</p>}
      <ul className="flex flex-col gap-1">
        {o.details.map((d) => (
          <li key={d}>
            <PlaceholderInline>{d}</PlaceholderInline>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * "Our offices": the base map (next/image) with HTML pins laid over it by percentage.
 * xl+: one label-pill button per office (leader line to its dot). Below xl: one 44px button per region,
 * so targets never overlap. Every button opens a Popover with the office placeholders.
 */
export function OfficeMap({ className }: { className?: string }) {
  return (
    <section aria-labelledby="loc-h" className={cn("container-site flex flex-col gap-3 md:gap-4.5", className)}>
      <h2 id="loc-h" className="text-[1.375rem] md:text-h2">
        {o.title}
      </h2>

      <Reveal className="overflow-hidden rounded-lg bg-primary-tint p-2.5 md:p-6">
        <figure className="relative m-0">
          <figcaption className="sr-only">{o.caption}</figcaption>
          <Image src="/images/office-map.svg" alt="" width={1152} height={520} unoptimized className="block h-auto w-full" />

          {/* Leader lines from each dot to its label (xl+) */}
          <svg viewBox="0 0 1152 520" aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 hidden size-full xl:block">
            {o.items.map((office) => {
              const [x1, y1, x2, y2] = office.line
              return <line key={office.label} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.5} className="stroke-primary-700" />
            })}
          </svg>

          {/* Dots drop in one after another; primary locations carry a pulse ring */}
          <Stagger aria-hidden="true" className="pointer-events-none absolute inset-0">
            {o.items.map((office) => (
              <StaggerItem key={office.label} className={cn("absolute -translate-x-1/2 -translate-y-1/2", office.dot)}>
                {office.primary ? (
                  <span className="relative grid size-4.5 place-items-center">
                    <span className="absolute inset-0 animate-hotspot rounded-full border-2 border-primary" />
                    <span className="size-4.5 rounded-full border-3 border-card bg-primary" />
                  </span>
                ) : (
                  <span className="block size-3.5 rounded-full border-3 border-card bg-primary-700" />
                )}
              </StaggerItem>
            ))}
          </Stagger>

          {/* xl+: label pills are the buttons */}
          <Stagger className="absolute inset-0 hidden xl:block" delay={0.08}>
            {o.items.map((office) => (
              <StaggerItem key={office.label} className={cn("absolute -translate-x-1/2 -translate-y-1/2", office.pill)}>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      aria-label={office.label}
                      className={cn(
                        "relative flex cursor-pointer items-center rounded-full border-[1.5px] border-primary px-3.5 whitespace-nowrap after:absolute after:inset-x-0 after:content-[''] hover:shadow-card",
                        office.primary
                          ? "h-7.5 bg-primary text-[0.9375rem] font-extrabold text-primary-foreground after:-inset-y-1.75"
                          : "h-6.5 bg-card text-[0.84375rem] font-semibold text-foreground after:-inset-y-2.25",
                      )}
                    >
                      {office.label}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="w-64">
                    <OfficeDetails office={office} />
                  </PopoverContent>
                </Popover>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Below xl: one pin per region */}
          <Stagger className="absolute inset-0 xl:hidden">
            {o.regions.map((region) => {
              const offices = o.items.filter((office) => office.region === region.id)
              return (
                <StaggerItem key={region.id} className={cn("absolute -translate-x-1/2 -translate-y-1/2", region.pos)}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-label={`${region.label}, ${offices.length} offices: ${offices.map((office) => office.label).join(", ")}`}
                        className="grid size-11 cursor-pointer place-items-center rounded-full border-2 border-primary bg-primary/10 font-heading text-xs font-extrabold text-primary-700 tabular"
                      >
                        <span aria-hidden="true">{offices.length}</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="top" collisionPadding={16} className="max-h-80 w-64 overflow-y-auto">
                      <p className="text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">{region.label}</p>
                      {offices.map((office) => (
                        <OfficeDetails key={office.label} office={office} />
                      ))}
                    </PopoverContent>
                  </Popover>
                </StaggerItem>
              )
            })}
          </Stagger>

          <ul className="sr-only">
            {o.items.map((office) => (
              <li key={office.label}>
                {office.label}
                {office.primary && ` (${o.primaryNote.toLowerCase()})`}
              </li>
            ))}
          </ul>
        </figure>
      </Reveal>

      <p className="flex flex-wrap items-center gap-x-5.5 gap-y-2 text-sm text-neutral-text">
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="size-4 rounded-full bg-primary ring-3 ring-card outline-[1.5px] outline-offset-3 outline-primary" />
          {o.legend.primary} <PlaceholderInline>{o.legend.primaryPlaceholder}</PlaceholderInline>
        </span>
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="size-3 rounded-full bg-primary-700 ring-[2.5px] ring-card" />
          {o.legend.other}
        </span>
      </p>

      <ul aria-hidden="true" className="flex flex-wrap gap-2 xl:hidden">
        {o.items.map((office) => (
          <li
            key={office.label}
            className={cn(
              "rounded-full border px-3 py-1 text-[0.8125rem]",
              office.primary ? "border-primary bg-primary text-primary-foreground font-bold" : "border-primary-200 bg-card font-semibold",
            )}
          >
            {office.label}
          </li>
        ))}
      </ul>
    </section>
  )
}
