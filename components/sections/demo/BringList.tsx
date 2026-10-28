import { Reveal } from "@/components/motion/Reveal"
import { demoBring as b } from "@/content/demo"
import { cn } from "@/lib/utils"

/** "Bring these, and we'll do the rest": primary-tint panel, heading left and a white checklist card right. */
export function BringList({ className }: { className?: string }) {
  return (
    <section aria-labelledby="bring-h" className={cn("container-site", className)}>
      <Reveal className="grid items-center gap-6 rounded-lg bg-primary-tint p-5 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-10">
        <div className="flex flex-col gap-3">
          <h2 id="bring-h" className="text-h3 md:text-h2">
            {b.title}
          </h2>
          <p className="text-base text-neutral-text md:text-[1.0625rem]">{b.lead}</p>
        </div>
        <ul className="rounded-lg bg-card px-4 py-2 shadow-card md:px-6">
          {b.items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3.5 border-b border-muted py-3.5 font-semibold last:border-0">
              <span aria-hidden="true" className="grid size-10 flex-none place-items-center rounded-lg bg-primary-tint text-primary-700">
                <Icon strokeWidth={2} className="size-5" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
