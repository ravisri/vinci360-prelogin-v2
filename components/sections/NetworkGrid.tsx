import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import type { Network } from "@/content/sample-data"
import { cn } from "@/lib/utils"

type NetworkGridProps = {
  title: string
  items: readonly { network: Network; title: string; text: string }[]
  className?: string
}

/** White strip: centred H2 + the four networks, each with an icon tile, name and one line. */
export function NetworkGrid({ title, items, className }: NetworkGridProps) {
  return (
    <section className={cn("border-y border-border bg-card py-16", className)}>
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <h2 className="text-center text-h4 md:text-[2rem] md:leading-[1.15]">{title}</h2>
        <Stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StaggerItem as="li" key={item.network} className="flex flex-col gap-3">
              <span aria-hidden="true" className="grid size-11 place-items-center rounded-lg bg-muted text-foreground">
                <NetworkIcon network={item.network} className="size-5.5" />
              </span>
              <h3 className="text-[1.0625rem] leading-tight font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
