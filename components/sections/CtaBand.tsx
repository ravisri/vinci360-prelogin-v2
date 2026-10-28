import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FullBandProps = {
  variant?: "full"
  title: string
  lead: string
  /** Field label, e.g. "Work email". */
  label: string
  placeholder: string
  buttonLabel: string
  /** Where the email is handed off (GET ?email=), so the form works without JS. */
  action: string
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

/** Navy closing band: H2, lead, work-email field and the filled CTA; or the slim H2 + CTA row. */
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

  const { title, lead, label, placeholder, buttonLabel, action, id = "cta-email", className } = props
  return (
    <section className={cn("on-dark relative overflow-hidden bg-background section-y", className)}>
      <span aria-hidden="true" className="dot-grid-dark absolute bottom-0 left-0 h-60 w-90" />
      <div className="relative container-site">
        <div className="mx-auto flex max-w-205 flex-col items-center gap-5 text-center">
          <h2 className="text-h3 md:text-display">{title}</h2>
          <p className="text-base text-muted-foreground md:text-lg">{lead}</p>
          <form action={action} method="get" className="mt-2 flex w-full max-w-140 flex-col gap-3 text-left sm:flex-row sm:items-end">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Label htmlFor={id} className="text-sm font-medium text-on-dark-strong">
                {label}
              </Label>
              <Input
                id={id}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={placeholder}
                className="h-13 rounded-sm border-dark-border bg-secondary px-4 text-base text-secondary-foreground placeholder:text-neutral-text md:text-base"
              />
            </div>
            <Button type="submit" variant="cta" size="lg">
              {buttonLabel}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
