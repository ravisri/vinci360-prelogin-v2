import { Download, Newspaper, Users, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { sentimentPartB } from "@/content/features/sentiment-keywords"
import { sentiment } from "@/content/sample-data"

const c = sentimentPartB.teasers

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span aria-hidden="true" className="grid size-10 flex-none place-items-center rounded-lg bg-sent-tint text-sent-text">
      <Icon strokeWidth={2} className="size-5" />
    </span>
  )
}

/** Part B closing row: Articles, Top handles (optional, expandable) and Export. */
export function KeywordTeasers() {
  return (
    <Reveal>
      <ul className="grid gap-5 md:grid-cols-3">
        <li className="flex flex-col gap-2.5 rounded-lg bg-card p-6 shadow-card">
          <IconTile icon={Newspaper} />
          <h3 className="text-lg font-bold">{c.articles.title}</h3>
          <p className="text-[0.90625rem] text-muted-foreground">{c.articles.text}</p>
        </li>
        <li>
          <details className="group h-full rounded-lg bg-card p-6 shadow-card">
            <summary className="flex min-h-11 cursor-pointer list-none flex-col gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between">
                <IconTile icon={Users} />
                <span className="rounded-full bg-neutral-tint px-2.5 py-1 text-xs leading-[1.3] font-semibold text-neutral-text">{c.handles.optional}</span>
              </span>
              {/* A <summary> holds phrasing content, so the title is styled rather than an <h3>. */}
              <span className="font-heading text-lg font-bold">{c.handles.title}</span>
              <span className="text-[0.90625rem] text-muted-foreground">
                {c.handles.text} <span className="font-semibold text-sent-text group-open:hidden">{c.handles.show}</span>
              </span>
            </summary>
            <ul className="mt-3 flex flex-col gap-1.5 text-[0.84375rem] tabular">
              {sentiment.topHandles.map((h) => (
                <li key={h.handle} className="flex justify-between rounded-sm bg-background px-2.5 py-2">
                  <strong>{h.handle}</strong>
                  {h.followers} {c.handles.followers}
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li className="flex flex-col gap-2.5 rounded-lg bg-card p-6 shadow-card">
          <IconTile icon={Download} />
          <h3 className="text-lg font-bold">{c.export.title}</h3>
          <p className="text-[0.90625rem] text-muted-foreground">{c.export.text}</p>
        </li>
      </ul>
    </Reveal>
  )
}
