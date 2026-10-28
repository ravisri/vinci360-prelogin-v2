import { Delta } from "@/components/mocks/Delta"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { Reveal } from "@/components/motion/Reveal"
import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { solutions as data } from "@/content/sample-data"
import { solutionsPage } from "@/content/solutions"

const copy = solutionsPage.glossary

/** "One number, one meaning": the same share-of-voice figure seen by two roles, then the shared definitions. */
export function OneNumber() {
  const n = data.sameNumber
  return (
    <>
      <Reveal className="grid items-center gap-4.5 rounded-lg bg-primary-tint p-4 md:grid-cols-[1fr_auto_1fr] md:p-7">
        {copy.cards.map((c, i) => (
          <div key={c.who} className="contents">
            {i === 1 && (
              <span className="text-center font-heading text-[1.75rem] font-extrabold text-primary-700">
                <span aria-hidden="true">=</span>
                <span className="sr-only">{copy.equals}</span>
              </span>
            )}
            <div className="flex flex-col gap-1.5 rounded-lg bg-card p-6 shadow-card tabular">
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[0.8125rem] font-bold text-primary-700">{c.who}</span>
                <SampleDataChip tone="light" />
              </span>
              <span className="text-[0.8125rem] text-muted-foreground">{n.metric}</span>
              <strong className="font-heading text-4xl">{n.value}</strong>
              <Delta trend="up" className="font-bold">
                {n.delta}
              </Delta>
            </div>
          </div>
        ))}
      </Reveal>
      <Stagger as="dl" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((g) => (
          <StaggerItem key={g.term} className="rounded-lg border border-border bg-card p-4.5">
            <dt className="mb-1.5 font-heading text-[1.0625rem] leading-[1.3] font-extrabold">{g.term}</dt>
            <dd className="text-[0.90625rem] text-muted-foreground">{g.text}</dd>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal>
        <p className="font-semibold">{copy.footer}</p>
      </Reveal>
    </>
  )
}
