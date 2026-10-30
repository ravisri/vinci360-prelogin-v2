import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CtaEmailForm } from "@/components/sections/CtaEmailForm"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FullBandProps = {
  variant?: "full"
  title: string
  lead: string
  /** Field label, e.g. "Work email". */
  label: string
  placeholder: string
  buttonLabel: string
  /** @deprecated Unused: the email now goes to support@vinci360.com via the walkthrough server action. */
  action?: string
  id?: string
  className?: string
}

type SlimBandProps = {
  /** Slim band: H2 and the filled CTA link on one row, no email field (Contact). */
  variant: "slim"
  title: string
  buttonLabel: string
  href: string
  className?: string
}

type CtaBandProps = FullBandProps | SlimBandProps

/** Navy closing band: H2, lead, work-email field (walkthrough request email) and the filled CTA; or the slim H2 + CTA row. */
export function CtaBand(props: CtaBandProps) {
  if (props.variant === "slim") {
    const { title, buttonLabel, href, className } = props
    return (
      <section aria-labelledby="band-h" className={cn("on-dark bg-background py-11", className)}>
        <div className="container-site flex flex-wrap items-center justify-between gap-5">
          <h2 id="band-h" className="text-2xl font-extrabold">
            {title}
          </h2>
          <Button asChild variant="cta">
            <Link href={href}>
              {buttonLabel}
              <ArrowRight aria-hidden="true" strokeWidth={2} />
            </Link>
          </Button>
        </div>
      </section>
    )
  }

  const { title, lead, label, placeholder, buttonLabel, id = "cta-email", className } = props
  return (
    <section className={cn("on-dark relative overflow-hidden bg-background section-y", className)}>
      <span aria-hidden="true" className="dot-grid-dark absolute bottom-0 left-0 h-60 w-90" />
      <div className="relative container-site">
        <div className="mx-auto flex max-w-205 flex-col items-center gap-5 text-center">
          <h2 className="text-h3 md:text-display">{title}</h2>
          <p className="text-base text-muted-foreground md:text-lg">{lead}</p>
          <CtaEmailForm id={id} label={label} placeholder={placeholder} buttonLabel={buttonLabel} />
        </div>
      </div>
    </section>
  )
}
