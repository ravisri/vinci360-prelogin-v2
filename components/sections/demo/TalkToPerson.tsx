import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { demoContact as c } from "@/content/demo"
import { cn } from "@/lib/utils"

/** "Prefer to talk to a person?": two contact cards (all placeholders until supplied), offices line, link to /contact. */
export function TalkToPerson({ className }: { className?: string }) {
  return (
    <section id="contact" aria-labelledby="ct-h" className={cn("container-site flex flex-col gap-6", className)}>
      <h2 id="ct-h" className="text-h3 md:text-h2">
        {c.title}
      </h2>
      <Stagger as="ul" className="grid gap-4 md:grid-cols-2 md:gap-5">
        {c.people.map((p) => (
          <StaggerItem as="li" key={p.name} className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-card">
            <span
              aria-hidden="true"
              className="grid size-11 flex-none place-items-center rounded-lg bg-primary-tint font-heading text-[1.0625rem] font-extrabold text-primary-700"
            >
              ?
            </span>
            <div className="flex min-w-0 flex-col gap-1.5">
              <strong className="font-heading text-[1.1875rem]">
                <PlaceholderInline>{p.name}</PlaceholderInline>
              </strong>
              <span className="text-muted-foreground">
                <PlaceholderInline>{p.role}</PlaceholderInline>
              </span>
              <span className="flex items-center gap-2 text-[0.9375rem]">
                <Mail aria-hidden="true" strokeWidth={2} className="size-4 flex-none text-primary-700" />
                <PlaceholderInline>{p.email}</PlaceholderInline>
              </span>
              <span className="flex items-center gap-2 text-[0.9375rem]">
                <Phone aria-hidden="true" strokeWidth={2} className="size-4 flex-none text-primary-700" />
                <PlaceholderInline>{p.phone}</PlaceholderInline>
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
        <MapPin aria-hidden="true" strokeWidth={2} className="size-4.5 flex-none text-primary-700" />
        {c.offices.label}
        <PlaceholderInline>{c.offices.placeholder}</PlaceholderInline>
      </p>
      <p className="text-[0.9375rem]">
        {c.more.before}
        <Link href={c.more.href} className="font-semibold text-primary-700 hover:underline">
          {c.more.label}
        </Link>
        {c.more.after}
      </p>
    </section>
  )
}
