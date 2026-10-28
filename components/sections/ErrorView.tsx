import type { ReactNode } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  ChartColumn,
  ChartLine,
  CirclePlay,
  House,
  LayoutGrid,
  Mail,
  RotateCcw,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react"

import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { Button } from "@/components/ui/button"
import {
  errorTiles,
  errorTilesTitle,
  lostLinks,
  lostTitle,
  reportProblem,
  type ErrorActionIcon,
  type ErrorTile,
  type ErrorTileIcon,
} from "@/content/errors"
import { cn } from "@/lib/utils"

const tileIcons: Record<ErrorTileIcon, LucideIcon> = {
  grid: LayoutGrid,
  play: CirclePlay,
  users: Users,
  chart: ChartLine,
  trend: TrendingUp,
  compare: ChartColumn,
  calendar: CalendarDays,
  mail: Mail,
}

const actionIcons: Record<ErrorActionIcon, LucideIcon> = { home: House, grid: LayoutGrid, retry: RotateCcw }

const accentDot: Record<NonNullable<ErrorTile["accent"]>, string> = { smi: "bg-smi", trends: "bg-trends", cmp: "bg-cmp" }

export type ErrorAction = { label: string; icon: ErrorActionIcon; href?: string; onClick?: () => void }

type ErrorViewProps = {
  variant: "404" | "500"
  chip: string
  title: string
  text: string
  illustration: ReactNode
  primary: ErrorAction
  secondary?: ErrorAction
}

function Action({ action, variant }: { action: ErrorAction; variant: "default" | "outline" }) {
  const Icon = actionIcons[action.icon]
  const content = (
    <>
      <Icon aria-hidden="true" strokeWidth={2} className="size-5" />
      {action.label}
    </>
  )
  const className = "max-md:min-h-12 max-md:w-full"
  if (action.href) {
    return (
      <Button variant={variant} size="lg" className={className} asChild>
        <Link href={action.href}>{content}</Link>
      </Button>
    )
  }
  return (
    <Button type="button" variant={variant} size="lg" className={className} onClick={action.onClick}>
      {content}
    </Button>
  )
}

/** 404/500 page body: chip, H1, lead, actions + chart illustration; "Where do you want to go?" tiles; "Still lost?" links. */
export function ErrorView({ variant, chip, title, text, illustration, primary, secondary }: ErrorViewProps) {
  return (
    <div data-error={variant} className="container-site flex flex-col gap-7 pt-6 pb-14 md:gap-10 md:pt-0 md:pb-24">
      <section aria-labelledby="error-title" className="grid items-center gap-6 lg:min-h-160 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-4.5">
          <span className="self-start rounded-full border border-primary-200 bg-primary-tint px-3 py-1.5 text-[0.8125rem] font-semibold text-primary-700">
            {chip}
          </span>
          <h1 id="error-title" tabIndex={-1} className="text-h1-m font-extrabold tracking-[-0.03em] outline-none md:text-h1">
            {title}
          </h1>
          <p className="max-w-130 text-base text-muted-foreground md:text-[1.1875rem]">{text}</p>
          <div className="flex flex-col flex-wrap gap-3 md:flex-row">
            <Action action={primary} variant="default" />
            {secondary && <Action action={secondary} variant="outline" />}
          </div>
          <p className="text-[0.90625rem] text-muted-foreground">
            {reportProblem.lead} <PlaceholderInline>{reportProblem.placeholder}</PlaceholderInline>
          </p>
        </div>
        <div className="relative rounded-lg bg-primary-tint p-4 md:px-9 md:pt-9 md:pb-19">
          <div aria-hidden="true" className="dot-grid absolute top-4 right-4 h-30 w-42.5" />
          {illustration}
        </div>
      </section>

      <section
        aria-labelledby="error-tiles"
        className="flex flex-col gap-4.5 rounded-lg border border-border bg-card p-4.5 shadow-card md:p-6"
      >
        <h2 id="error-tiles" className="text-[1.375rem] font-extrabold md:text-h3">
          {errorTilesTitle}
        </h2>
        <ul className="grid grid-cols-2 gap-2.5 md:gap-3.5 lg:grid-cols-4">
          {errorTiles.map((tile) => {
            const Icon = tileIcons[tile.icon]
            return (
              <li key={tile.href}>
                <Link
                  href={tile.href}
                  className="group relative flex h-full min-h-11 flex-col gap-1.5 rounded-lg border border-border bg-card p-3.5 text-foreground no-underline transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-card focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transform-none md:gap-2 md:p-4.5"
                >
                  <span aria-hidden="true" className="grid size-10 place-items-center rounded-lg bg-primary-tint text-primary-700">
                    <Icon strokeWidth={2} className="size-5" />
                  </span>
                  <strong className="flex items-center gap-2 text-base group-hover:underline group-focus-visible:underline">
                    {tile.accent && (
                      <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", accentDot[tile.accent])} />
                    )}
                    {tile.label}
                  </strong>
                  <span className="text-[0.8125rem] text-neutral-text md:text-sm">{tile.line}</span>
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="absolute top-4.5 right-4 hidden size-4.5 text-primary-700 md:block"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <nav
        aria-labelledby="error-lost"
        className="flex flex-col items-start rounded-lg bg-primary-tint px-6 py-5 md:flex-row md:flex-wrap md:items-center md:gap-x-7 md:gap-y-2.5"
      >
        <h2 id="error-lost" className="text-[1.0625rem] font-extrabold">
          {lostTitle}
        </h2>
        {lostLinks.map((link) => (
          <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center font-semibold text-primary-700">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
