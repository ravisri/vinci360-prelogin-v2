import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { MsrcosmosLink } from "@/components/layout/MsrcosmosLink"
import { buttonVariants } from "@/components/ui/button"
import { contactMsr as msr } from "@/content/contact"
import { cn } from "@/lib/utils"

/** "Powered by MSRcosmos": the MSRcosmos logo, About / Privacy / Terms links and "Visit msrcosmos.com" (new tab). */
export function MsrcosmosCard({ className }: { className?: string }) {
  return (
    <section aria-labelledby="msr-h" className={cn("container-site", className)}>
      <div className="flex flex-wrap items-center gap-6 rounded-lg bg-card px-6.5 py-5.5 shadow-card">
        <div className="grid h-18 w-50 flex-none place-items-center">
          <Image src="/images/msrcosmos-logo.svg" alt={msr.logoAlt} width={218} height={61} unoptimized className="h-auto w-full max-w-50" />
        </div>
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-1.5">
          <h2 id="msr-h" className="text-h4">
            {msr.title}
          </h2>
          <p className="flex flex-wrap gap-x-4 text-[0.90625rem]">
            {msr.links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center font-semibold text-primary-700">
                {l.label}
              </Link>
            ))}
          </p>
        </div>
        <MsrcosmosLink className={buttonVariants({ variant: "outline" })}>
          {msr.visit}
          <ExternalLink aria-hidden="true" strokeWidth={2} className="size-4" />
        </MsrcosmosLink>
      </div>
    </section>
  )
}
