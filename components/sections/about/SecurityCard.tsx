import Link from "next/link"

import { Reveal } from "@/components/motion/Reveal"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { Button } from "@/components/ui/button"
import { aboutPage } from "@/content/about"
import { cn } from "@/lib/utils"

const sec = aboutPage.security

/** "Questions and security": one card with the placeholder line and outline links to the legal pages. */
export function SecurityCard({ className }: { className?: string }) {
  return (
    <section aria-labelledby="sec-h" className={cn("container-site pt-10 md:pt-14", className)}>
      <Reveal className="flex flex-wrap items-center justify-between gap-4.5 rounded-lg bg-card px-5 py-5.5 shadow-card md:px-6.5">
        <div className="flex flex-col gap-1.5">
          <h2 id="sec-h" className="text-h4 font-extrabold">
            {sec.title}
          </h2>
          <p>
            <PlaceholderInline>{sec.placeholder}</PlaceholderInline>
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {sec.links.map((l) => (
            <Button key={l.href} asChild variant="outline">
              <Link href={l.href}>{l.label}</Link>
            </Button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
