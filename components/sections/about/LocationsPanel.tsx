import { MapPin } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { aboutPage } from "@/content/about"
import { cn } from "@/lib/utils"

const loc = aboutPage.locations

/** "Where we are": tinted dot-grid panel; every location stays a placeholder until confirmed. */
export function LocationsPanel({ className }: { className?: string }) {
  return (
    <section aria-labelledby="loc-h" className={cn("container-site pt-10 lg:pt-24", className)}>
      <Reveal className="relative overflow-hidden rounded-lg bg-primary-tint px-4.5 py-5.5 md:p-10">
        <span aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
        <div className="relative flex flex-col gap-4.5 md:gap-5.5">
          <h2 id="loc-h" className="text-h3 md:text-h2">
            {loc.title}
          </h2>
          {loc.groups.map((g) => (
            <div key={g.title} className="flex flex-col gap-2.5 md:gap-3">
              <h3 className="text-[0.9375rem] font-bold md:text-base">{g.title}</h3>
              <p className="flex items-center gap-2">
                <MapPin aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-primary-700" />
                <PlaceholderInline>{g.placeholder}</PlaceholderInline>
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
