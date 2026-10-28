import Link from "next/link"
import { Bell, ExternalLink, Info, TriangleAlert, type LucideIcon } from "lucide-react"

import { Delta } from "@/components/mocks/Delta"
import { FloatCard } from "@/components/mocks/FloatCard"
import { MockFrame } from "@/components/mocks/MockFrame"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { reportsAlerts } from "@/content/features/reports-alerts"
import { networks, reports } from "@/content/sample-data"
import { cn } from "@/lib/utils"

const c = reportsAlerts.notifications
type Severity = keyof typeof c.severity

/** Severity is a word + glyph, never colour only. */
const severity: Record<Severity, { icon: LucideIcon; iconClass: string; chip: string }> = {
  High: { icon: TriangleAlert, iconClass: "text-neg", chip: "border border-neg text-neg" },
  Medium: { icon: Bell, iconClass: "text-amber-on-dark", chip: "bg-stories-text text-primary-foreground" },
  Info: { icon: Info, iconClass: "text-on-dark-focus", chip: "border border-border text-muted-foreground" },
}

/**
 * Part B · 2 · The alert itself: three notifications (High / Medium / Info) in a dark frame, each
 * with what moved, by how much, where and when, and a link to the posts behind it; plus the
 * "Drill from the alert…" float.
 */
export function AlertNotifications() {
  return (
    <div className="relative md:pb-6">
      <MockFrame
        caption={c.caption}
        title={
          <h4 className="flex items-center gap-2 text-sm font-bold">
            <Bell aria-hidden="true" strokeWidth={2} className="size-4 text-magenta-on-dark" />
            {c.title}
          </h4>
        }
        bodyClassName="gap-2.5 p-4.5"
      >
        <ul aria-label={c.label} className="flex flex-col gap-2">
          {reports.notifications.map((n, i) => {
            const sev = severity[n.severity as Severity]
            const Icon = sev.icon
            return (
              <li key={n.subject} className={cn("grid grid-cols-[2.125rem_minmax(0,1fr)] gap-2.5 rounded-lg border bg-card p-3", i === 0 ? "border-neg" : "border-border")}>
                <span aria-hidden="true" className={cn("grid size-8 place-items-center rounded-sm bg-muted", sev.iconClass)}>
                  <Icon strokeWidth={2} className="size-4.5" />
                </span>
                <div className="flex flex-col gap-0.75 text-[0.8125rem]">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className={cn("rounded-full px-2 py-0.5 text-[0.65625rem] font-semibold", sev.chip)}>{c.severity[n.severity as Severity]}</span>
                    <strong>{n.subject}</strong>
                    <span className="ml-auto text-[0.71875rem] text-muted-foreground">{n.time}</span>
                  </span>
                  <span>
                    {n.metric}{" "}
                    <Delta trend={n.trend} tone={n.tone} className="font-bold">
                      {n.delta}
                    </Delta>{" "}
                    {n.tail}
                  </span>
                  <span className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <NetworkIcon network={n.network} className="size-3.25" />
                      {networks[n.network]}
                    </span>
                    <Link
                      href="/features/sentiment-keywords"
                      className="ml-auto inline-flex min-h-11 items-center gap-1 font-semibold text-on-dark-focus underline-offset-4 hover:underline"
                    >
                      {c.view}
                      <span className="sr-only">: {n.subject}</span>
                      <ExternalLink aria-hidden="true" strokeWidth={2} className="size-3" />
                    </Link>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </MockFrame>
      <p className="mt-2 text-xs text-muted-foreground md:hidden">{c.note}</p>
      <FloatCard className="flex items-center gap-2 px-3.5 py-2.5 max-md:hidden md:-right-4 md:-bottom-6">
        <ExternalLink aria-hidden="true" strokeWidth={2} className="size-4 flex-none text-reports-text" />
        <span className="text-[0.84375rem] font-bold">{c.float}</span>
      </FloatCard>
    </div>
  )
}
