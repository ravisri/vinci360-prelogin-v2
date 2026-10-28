import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { MsrcosmosLink } from "@/components/layout/MsrcosmosLink"
import { buttonVariants } from "@/components/ui/button"
import { contactMsr as msr } from "@/content/contact"
import { cn } from "@/lib/utils"

/** "Powered by MSRcosmos": logo placeholder, About / Privacy / Terms links and the placeholder "Visit msrcosmos.com" (tooltip, no navigation). */
export function MsrcosmosCard({ className }: { className?: string }) {
  return (
    <section aria-labelledby="msr-h" className={cn("container-site", className)}>
      <div className="flex flex-wrap items-center gap-6 rounded-lg bg-card px-6.5 py-5.5 shadow-card">
        <div role="img" aria-label={msr.logoLabel} className="placeholder-block grid h-18 w-50 flex-none place-items-center p-0 text-sm font-bold">
          {msr.logo}
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
        <MsrcosmosLink className={cn(buttonVariants({ variant: "outline" }), "cursor-help")}>
          {msr.visit}
          <ExternalLink aria-hidden="true" strokeWidth={2} className="size-4" />
        </MsrcosmosLink>
      </div>
    </section>
  )
}
