import { Bookmark, Download, Lock, MoveHorizontal, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { reportsControl as c } from "@/content/features/reports-alerts"
import { cn } from "@/lib/utils"

type Cell = (typeof c.access.rows)[number]["cells"][number]

/** Access cell: glyph + word (the word is visible at 390 and screen-reader only in the compact desktop card). */
function AccessCell({ v, full }: { v: Cell; full?: boolean }) {
  const allowed = v === "yes" || v === "edit"
  const text = { yes: ["✓", "Yes"], no: ["–", "No"], view: ["View", "only"], edit: ["✓", "Edit"] }[v]
  return (
    <td className={cn("px-3 py-2.5 font-semibold whitespace-nowrap", allowed ? "text-pos" : "font-normal text-muted-foreground")}>
      {v === "edit" ? (
        "✓ Edit"
      ) : full ? (
        `${text[0]} ${text[1]}`
      ) : (
        <>
          {text[0]}
          <span className="sr-only"> {text[1].toLowerCase()}</span>
        </>
      )}
    </td>
  )
}

function Card({ icon: Icon, title, text, children, className }: { icon: LucideIcon; title: string; text: string; children: React.ReactNode; className?: string }) {
  return (
    <li className={cn("flex flex-col gap-3 rounded-lg bg-card p-6 shadow-card", className)}>
      <span aria-hidden="true" className="grid size-11 place-items-center rounded-lg bg-reports-tint text-reports-text">
        <Icon strokeWidth={2} className="size-5.5" />
      </span>
      <h3 className="text-[1.1875rem] font-bold">{title}</h3>
      <p className="text-[0.90625rem] text-muted-foreground">{text}</p>
      <div className="mt-auto">{children}</div>
    </li>
  )
}

/**
 * "Control who sees what and when": saved views, export with the filters printed, and the sample
 * access matrix. At 390 only the access matrix shows, transposed (one row per role) and scrolling sideways.
 */
export function ReportsControl() {
  const a = c.access
  return (
    <section aria-labelledby="ctl-h" className="container-site flex flex-col gap-7 pt-12 md:pt-35">
      <Reveal className="flex max-w-180 flex-col gap-3">
        <h2 id="ctl-h" className="text-2xl leading-[1.2] md:text-h2">
          <span className="md:hidden">{c.titleMobile}</span>
          <span className="max-md:hidden">{c.title}</span>
        </h2>
        <p className="text-[0.9375rem] text-muted-foreground md:text-lg">
          <span className="md:hidden">{c.leadMobile}</span>
          <span className="max-md:hidden">{c.lead}</span>
        </p>
      </Reveal>

      {/* md+: three cards. */}
      <Reveal className="max-md:hidden">
        <ul className="grid items-stretch gap-6 lg:grid-cols-3">
          <Card icon={Bookmark} title={c.views.title} text={c.views.text}>
            <div className="flex flex-col gap-1.5 text-[0.8125rem]">
              <span className="flex justify-between rounded-sm bg-reports-tint px-2.5 py-2 font-bold">
                {c.views.items[0]}
                <span className="text-reports-text">{c.views.default}</span>
              </span>
              <span className="rounded-sm bg-background px-2.5 py-2">{c.views.items[1]}</span>
            </div>
          </Card>
          <Card icon={Download} title={c.export.title} text={c.export.text}>
            <p className="rounded-sm border border-dashed border-border p-2.5 text-[0.71875rem] text-neutral-text">{c.export.filters}</p>
          </Card>
          <Card icon={Lock} title={a.title} text={a.text}>
            <table className="w-full border-collapse text-[0.8125rem] tabular">
              <caption className="sr-only">{a.caption}</caption>
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th scope="col" className="px-3 py-2 font-medium first:pl-0">
                    {a.canSee}
                  </th>
                  {a.roles.map((r) => (
                    <th key={r} scope="col" className="px-3 py-2 font-medium">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {a.rows.map((row) => (
                  <tr key={row.label} className="border-b border-muted last:border-0">
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium">
                      {row.label}
                    </th>
                    {row.cells.map((v, i) => (
                      <AccessCell key={a.roles[i]} v={v} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </ul>
      </Reveal>

      {/* 390: one row per role, scrolls sideways inside its card. */}
      <div className="flex flex-col gap-2.5 md:hidden">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div tabIndex={0} role="region" aria-label={a.region} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-ring">
            <table className="w-full border-collapse text-[0.8125rem] tabular">
              <caption className="sr-only">{a.caption}</caption>
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    {a.role}
                  </th>
                  {a.rows.map((row) => (
                    <th key={row.label} scope="col" className="px-3 py-2.5 font-medium whitespace-nowrap">
                      {row.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {a.roles.map((role, ri) => (
                  <tr key={role} className="border-b border-muted last:border-0">
                    <th scope="row" className="px-3 py-2.5 text-left font-semibold">
                      {role}
                    </th>
                    {a.rows.map((row) => (
                      <AccessCell key={row.label} v={row.cells[ri]} full />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MoveHorizontal aria-hidden="true" strokeWidth={2} className="size-3.5" />
          {a.swipe}
        </p>
      </div>
    </section>
  )
}

