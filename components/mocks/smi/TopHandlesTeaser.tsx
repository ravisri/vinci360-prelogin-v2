import { ChevronDown, Users } from "lucide-react"

import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { smiWidgets } from "@/content/features/smi"
import { smi } from "@/content/sample-data"

const c = smiWidgets.topHandles

/** Optional "Top handles" teaser after the walkthrough: a native disclosure, so it works without JS. */
export function TopHandlesTeaser() {
  return (
    <details className="group rounded-lg border border-dashed border-input bg-card">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-lg px-4 py-4 md:px-5.5 [&::-webkit-details-marker]:hidden">
        <span className="rounded-full bg-neutral-tint px-2.5 py-0.5 text-xs font-semibold text-neutral-text">{c.badge}</span>
        <Users aria-hidden="true" strokeWidth={2} className="size-5 flex-none text-primary" />
        <span className="min-w-0 flex-1 text-[0.9375rem]">
          <strong>{c.title}</strong> — {c.text}
        </span>
        <ChevronDown aria-hidden="true" strokeWidth={2} className="size-5 flex-none transition-transform group-open:rotate-180 motion-reduce:transition-none" />
      </summary>
      <div className="flex flex-col gap-3 px-4 pb-5 md:px-5.5">
        <SampleDataChip tone="light" className="self-end" />
        <ul className="grid gap-3 md:grid-cols-3">
          {smi.topHandles.map((h) => (
            <li key={h.handle} className="flex items-center gap-3 rounded-lg bg-background p-3">
              <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-full bg-primary-tint text-xs font-bold text-primary">
                {h.initials}
              </span>
              <span className="min-w-0 text-sm">
                <strong className="block">{h.handle}</strong>
                <span className="block text-muted-foreground tabular">
                  {h.followers} {c.followers} · {c.authority}{" "}
                  <span aria-hidden="true">{"●".repeat(h.influence) + "○".repeat(4 - h.influence)}</span>
                  <span className="sr-only">{`${h.influence} of 4`}</span>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
