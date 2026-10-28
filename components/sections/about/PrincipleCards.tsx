import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { aboutPage, type Principle } from "@/content/about"
import { aboutPrinciples as sample } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const art = aboutPage.beliefs.art

const chip = "rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium"

/** Decorative mini illustrations, one per principle (described by each card's figcaption). */
const illustrations: Record<Principle["id"], React.ReactNode> = {
  evidence: (
    <span className="flex flex-col gap-1.5 text-xs">
      <span className="font-bold">
        <span className="tabular">{sample.mentions.toLocaleString("en-GB")}</span> {art.mentions}{" "}
        <span className="text-primary-700">{art.openPosts}</span>
      </span>
      {sample.posts.map((p) => (
        <span key={p.initials} className="flex items-center gap-2 rounded-sm bg-card px-2 py-1.5">
          <span className="grid size-6 flex-none place-items-center rounded-full bg-primary-tint text-[0.625rem] font-bold text-primary-700">
            {p.initials}
          </span>
          {p.text}
        </span>
      ))}
    </span>
  ),
  native: (
    <span className="flex flex-wrap gap-1.5">
      {art.metrics.map((label) => (
        <span key={label} className={chip}>
          {label}
        </span>
      ))}
    </span>
  ),
  estimates: (
    <span className="flex items-center gap-2.5 text-[0.8125rem]">
      <span className="font-heading text-[1.375rem] leading-none font-extrabold tabular">{sample.reach}</span>
      <span>{art.reach}</span>
      <span className="rounded-full border border-dashed border-neutral-text bg-neutral-tint px-2.5 py-1 text-xs font-semibold text-foreground">
        {art.estimate}
      </span>
    </span>
  ),
  decide: (
    <span className="flex flex-wrap items-center gap-2 text-[0.78125rem]">
      <span className="font-semibold">{art.suggested}</span>
      <span className="rounded-sm bg-primary px-3 py-1.5 font-bold text-primary-foreground">{art.accept}</span>
      <span className="rounded-sm border border-border bg-card px-3 py-1.5 font-semibold">{art.dismiss}</span>
    </span>
  ),
}

/** Principles that show a figure carry the "Sample data" chip. */
const showsNumbers: Principle["id"][] = ["evidence", "estimates"]

/** "What we believe": four principle cards (icon, title, line) with a mini illustration from md; staggered reveal. */
export function PrincipleCards({ className }: { className?: string }) {
  return (
    <Stagger as="ul" className={cn("grid gap-3 md:grid-cols-2 md:gap-5", className)}>
      {aboutPage.beliefs.items.map(({ id, icon: Icon, title, lines, mobile, caption }) => (
        <StaggerItem as="li" key={id} className="flex flex-col gap-3 rounded-lg bg-card p-5 shadow-card md:p-6">
          <span aria-hidden="true" className="grid size-11 place-items-center rounded-lg bg-primary-tint text-primary-700">
            <Icon strokeWidth={2} className="size-5.5" />
          </span>
          <h3 className="text-lg font-extrabold md:text-h4">{title}</h3>
          <p className="text-[0.9375rem] text-muted-foreground">
            <span className={cn(mobile && "hidden md:inline")}>{lines[0]}</span>
            {mobile && <span className="md:hidden">{mobile}</span>}
            <span className="hidden md:inline">
              <br />
              {lines[1]}
            </span>
          </p>
          <figure className="mt-auto hidden flex-col gap-2.5 rounded-lg bg-background p-3.5 md:flex">
            <figcaption className="sr-only">{caption}</figcaption>
            {showsNumbers.includes(id) && <SampleDataChip tone="light" className="self-end" />}
            <div aria-hidden="true">{illustrations[id]}</div>
          </figure>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
