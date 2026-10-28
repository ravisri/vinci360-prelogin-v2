import { contactExplore } from "@/content/contact"
import { cn } from "@/lib/utils"

/** "Keep exploring" thumbnails: tour steps, feature grid and role pills (decorative). */
export const contactExploreThumbnails = [
  <span key="tour" className="flex items-center gap-2">
    {[0, 1, 2].map((i) => (
      <span key={i} className="flex items-center gap-2">
        {i > 0 && <span className="h-0.5 w-6 bg-primary-200" />}
        <span className={cn("size-3.5 rounded-full", i < 2 ? "bg-primary" : "border-2 border-primary bg-card")} />
      </span>
    ))}
  </span>,
  <span key="features" className="grid size-full grid-cols-4 gap-1.5 p-3.5">
    {Array.from({ length: 8 }, (_, i) => (
      <span key={i} className={cn("rounded-xs", i === 1 ? "bg-primary" : "bg-card")} />
    ))}
  </span>,
  <span key="roles" className="flex flex-wrap items-center justify-center gap-1.5 p-3 text-xs font-semibold text-foreground">
    {contactExplore.roles.map((r, i) => (
      <span key={r} className={cn("rounded-full px-2.5 py-1.5", i === 0 ? "bg-primary text-primary-foreground" : "bg-card")}>
        {r}
      </span>
    ))}
  </span>,
]
