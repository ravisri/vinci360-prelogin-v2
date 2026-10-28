import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type LinkBandProps = {
  title: string
  links: readonly { label: string; href: string }[]
  className?: string
}

/** Slim navy closing band: one H2 and outline arrow links ("Still deciding? …"). */
export function LinkBand({ title, links, className }: LinkBandProps) {
  return (
    <section aria-labelledby="band-h" className={cn("on-dark bg-background py-11 text-foreground", className)}>
      <div className="container-site flex flex-wrap items-center justify-between gap-5">
        <h2 id="band-h" className="text-2xl font-extrabold">
          {title}
        </h2>
        <div className="flex flex-wrap gap-3">
          {links.map((l) => (
            <Button
              key={l.href}
              asChild
              variant="outline"
              className="border-on-dark-focus bg-transparent text-foreground hover:border-foreground hover:text-foreground"
            >
              <Link href={l.href}>
                {l.label}
                <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
