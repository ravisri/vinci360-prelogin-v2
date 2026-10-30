import Image from "next/image"
import { ExternalLink } from "lucide-react"

import { MsrcosmosLink } from "@/components/layout/MsrcosmosLink"
import { Reveal } from "@/components/motion/Reveal"
import { buttonVariants } from "@/components/ui/button"
import { aboutPage } from "@/content/about"
import { cn } from "@/lib/utils"

const msr = aboutPage.msr

/** "A product from MSRcosmos": company description, the "Visit msrcosmos.com" link (new tab) and the logo card. */
export function MsrcosmosBlock({ className }: { className?: string }) {
  return (
    <section aria-labelledby="msr-h" className={cn("container-site pt-16 lg:pt-24", className)}>
      <Reveal className="grid items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-12">
        <div className="flex flex-col gap-4">
          <h2 id="msr-h" className="text-h3 md:text-h2">
            {msr.title}
          </h2>
          {msr.paragraphs.map((p) => (
            <p key={p} className="text-[1.0625rem]">
              {p}
            </p>
          ))}
          <MsrcosmosLink className={cn(buttonVariants({ variant: "outline" }), "self-start")}>
            {msr.visit}
            <ExternalLink aria-hidden="true" strokeWidth={2} className="size-4" />
          </MsrcosmosLink>
        </div>
        <figure className="m-0 flex flex-col items-center gap-4.5 rounded-lg bg-card p-7 shadow-card">
          <div className="grid h-35 w-full place-items-center">
            <Image src="/images/msrcosmos-logo.svg" alt={msr.logoAlt} width={218} height={61} unoptimized className="h-auto w-full max-w-56" />
          </div>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {msr.poweredBy} <strong className="text-foreground">MSRcosmos</strong>
          </p>
          <figcaption className="text-center text-[0.9375rem] font-semibold">{msr.caption}</figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
