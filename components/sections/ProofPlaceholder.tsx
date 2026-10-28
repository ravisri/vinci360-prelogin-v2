import { PlaceholderBlock, PlaceholderInline } from "@/components/sections/PlaceholderBlock"

type ProofPlaceholderProps = {
  title: string
  badge: string
  /** "[Client logo]" box text. */
  logo: string
  logos?: number
  initials: string
  quote: string
  cite: string
  className?: string
}

/** "Trusted by…" block: logo slots and a testimonial, all kept as bracketed placeholders until real ones are supplied. */
export function ProofPlaceholder({ title, badge, logo, logos = 5, initials, quote, cite, className }: ProofPlaceholderProps) {
  return (
    <PlaceholderBlock title={title} badge={badge} className={className}>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {Array.from({ length: logos }, (_, i) => (
          <li key={i} className="grid h-16 place-items-center rounded-sm bg-muted text-[0.8125rem] font-semibold text-neutral-text">
            {logo}
          </li>
        ))}
      </ul>
      <figure className="flex gap-4 border-t border-border pt-7 md:gap-5">
        <span aria-hidden="true" className="grid size-13 flex-none place-items-center rounded-full bg-muted text-sm font-bold text-neutral-text">
          {initials}
        </span>
        <div className="flex flex-col gap-2">
          <blockquote className="font-heading text-lg leading-[1.45] font-semibold text-neutral-text md:text-xl">{quote}</blockquote>
          <figcaption className="text-sm text-muted-foreground">
            <PlaceholderInline>{cite}</PlaceholderInline>
          </figcaption>
        </div>
      </figure>
    </PlaceholderBlock>
  )
}
