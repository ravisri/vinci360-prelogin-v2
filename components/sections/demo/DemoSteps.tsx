import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { StepBadge } from "@/components/sections/StepBadge"
import { demoSteps as s } from "@/content/demo"
import { cn } from "@/lib/utils"

/** Decorative step art (cards from md). */
const art = [
  <div key="1" className="flex h-full flex-col justify-center gap-1.5 text-xs font-semibold">
    <span className="rounded-sm border border-border bg-card px-2.5 py-1.5">{s.art.brand}</span>
    <span className="rounded-sm border border-border bg-card px-2.5 py-1.5">{s.art.rivals}</span>
  </div>,
  <div key="2" className="flex h-full items-center justify-center gap-2 text-xs font-semibold">
    {s.art.chips.map((c, i) => (
      <span key={c} className={cn("rounded-full px-2.5 py-1.5", i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card")}>
        {c}
      </span>
    ))}
  </div>,
  <div key="3" className="flex h-full items-end gap-1.5">
    {["h-[40%]", "h-[60%]", "h-[52%]", "h-[88%]"].map((h, i) => (
      <span key={h} className={cn("flex-1 rounded-t-[3px]", h, i === 3 ? "bg-chart-1" : "bg-dark-border")} />
    ))}
  </div>,
]

/** "What happens next": three numbered cards with art (md+), compact badge rows at 390. */
export function DemoSteps({ className }: { className?: string }) {
  return (
    <section aria-labelledby="how-h" className={cn("container-site flex flex-col gap-5 md:gap-7", className)}>
      <div className="flex flex-wrap items-center gap-3.5">
        <h2 id="how-h" className="text-h3 md:text-h2">
          {s.title}
        </h2>
        <PlaceholderInline>{s.timing}</PlaceholderInline>
      </div>
      <Stagger as="ol" className="grid gap-2.5 md:grid-cols-3 md:gap-5">
        {s.steps.map((step, i) => (
          <StaggerItem as="li" key={step.title} className="flex flex-col gap-3.5 rounded-lg bg-card p-4 shadow-card md:p-6">
            <div aria-hidden="true" className={cn("hidden h-25 rounded-lg p-3 md:block", i === 2 ? "on-dark bg-background" : "bg-background")}>
              {art[i]}
            </div>
            <div className="flex items-center gap-2.5">
              <StepBadge n={i + 1} accent="smi" />
              <h3 className="text-base leading-[1.25] font-bold md:text-[1.1875rem]">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
            </div>
            <p className="hidden text-[0.9375rem] text-muted-foreground md:block">{step.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
