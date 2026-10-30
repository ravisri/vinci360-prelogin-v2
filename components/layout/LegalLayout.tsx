import Link from "next/link"
import { Check, ChevronRight, ExternalLink, Mail } from "lucide-react"

import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { legalUi as ui, type Inline, type LegalBlock, type LegalDoc } from "@/content/legal"
import { cn } from "@/lib/utils"

const linkClass = "font-semibold break-words text-primary-700 underline underline-offset-3 hover:text-primary"

function Rich({ parts }: { parts: Inline[] }) {
  return parts.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : part.external ? (
      <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {part.label}
        <ExternalLink aria-hidden="true" strokeWidth={2} className="ml-1 inline size-3.5 align-[-0.1em]" />
        <span className="sr-only"> {ui.newTab}</span>
      </a>
    ) : (
      <a key={i} href={part.href} className={linkClass}>
        {part.label}
      </a>
    ),
  )
}

function Block({ block }: { block: LegalBlock }) {
  if ("list" in block)
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-primary">
        {block.list.map((item, i) => (
          <li key={i}>
            <Rich parts={item} />
          </li>
        ))}
      </ul>
    )
  if ("term" in block)
    return (
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold">{block.term}</h3>
        <p>
          <Rich parts={block.p} />
        </p>
      </div>
    )
  return (
    <p>
      <Rich parts={block.p} />
    </p>
  )
}

function TocList({ doc }: { doc: LegalDoc }) {
  return (
    <ol className="flex flex-col gap-0.5 text-sm">
      {doc.sections.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex min-h-11 items-center rounded-sm px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  )
}

/** Privacy Policy / Terms page: breadcrumb, H1, legal switch, "On this page" contents (sticky lg+, accordion below) and the 720px reading column. */
export function LegalLayout({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="container-site flex flex-col gap-4 pt-10 pb-8 md:pt-16 md:pb-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground hover:underline">
                  {ui.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight strokeWidth={2} className="size-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-foreground">
                {doc.title}
              </li>
            </ol>
          </nav>
          <h1 className="text-h1-m md:text-h1">{doc.title}</h1>
          <p className="max-w-(--reading-max) text-body text-muted-foreground md:text-lg">{doc.lead}</p>
          {/* <p className="text-sm text-muted-foreground">
            {ui.updated} <PlaceholderInline>{ui.updatedValue}</PlaceholderInline>
          </p> */}
          <nav aria-label={ui.switchLabel} className="mt-2 self-start">
            <ul className="flex flex-wrap gap-1 rounded-full border border-border bg-background p-1">
              {ui.switch.map((item) => {
                const current = item.href === doc.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        current && "bg-primary-tint font-bold text-primary-700 underline underline-offset-4 hover:text-primary-700",
                      )}
                    >
                      {current && <Check aria-hidden="true" strokeWidth={3} className="size-4" />}
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>

      <div className="container-site section-y grid gap-8 lg:grid-cols-[13.75rem_minmax(0,var(--reading-max))] lg:justify-center lg:gap-14">
        <aside className="lg:hidden">
          <Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-4">
            <AccordionItem value="toc" className="border-0">
              <AccordionTrigger className="text-sm font-bold">{ui.toc}</AccordionTrigger>
              <AccordionContent>
                <nav aria-label={ui.toc}>
                  <TocList doc={doc} />
                </nav>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
        <nav aria-labelledby="toc-h" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] flex flex-col gap-2">
            <h2 id="toc-h" className="px-3 text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">
              {ui.toc}
            </h2>
            <TocList doc={doc} />
          </div>
        </nav>

        <article className="flex min-w-0 flex-col gap-10 text-base/[1.65] md:text-legal">
          {doc.highlights && (
            <section aria-labelledby="hl-h" className="flex flex-col gap-3 rounded-lg bg-primary-tint p-6">
              <h2 id="hl-h" className="text-h4">
                {ui.highlightsTitle}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {doc.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <Check aria-hidden="true" strokeWidth={2.6} className="mt-1 size-4.5 flex-none text-primary-700" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="flex flex-col gap-4">
              <h2 id={`${s.id}-h`} className="text-h4 md:text-h3">
                {s.title}
              </h2>
              {s.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </section>
          ))}

          <aside className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-card">
            <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-lg bg-primary-tint text-primary-700">
              <Mail strokeWidth={2} className="size-5.5" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-extrabold">{ui.contact.title}</h2>
              <p className="text-[0.9375rem] text-muted-foreground">
                {ui.contact.text}
                <Rich parts={[ui.contact.email]} />.
              </p>
            </div>
          </aside>
        </article>
      </div>
    </>
  )
}
