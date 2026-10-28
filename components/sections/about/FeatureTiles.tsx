import Link from "next/link"

import { aboutPage } from "@/content/about"
import { features } from "@/content/navigation"
import { cn } from "@/lib/utils"

/** "What Vinci360 does": seven feature link tiles (accent dot, name, question); a sideways-scrolling strip below md. */
export function FeatureTiles({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "mx-[calc(var(--container-pad)*-1)] flex snap-x snap-mandatory gap-3 overflow-x-auto scrollbar-none px-(--container-pad) pt-1 pb-2",
        "md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:p-0 lg:grid-cols-4",
        className,
      )}
    >
      {features.map((f, i) => (
        <li key={f.href} className="w-60 flex-none snap-start md:w-auto">
          <Link
            href={f.href}
            className="flex h-full flex-col gap-1.5 rounded-lg bg-card p-5 text-foreground no-underline shadow-card transition-transform duration-300 hover:-translate-y-0.5"
          >
            <strong className="flex items-center gap-2 font-semibold">
              <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", f.dotClass)} />
              {f.label}
            </strong>
            <span className="text-sm text-muted-foreground">{aboutPage.does.questions[i]}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
