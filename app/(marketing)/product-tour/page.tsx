import Link from "next/link"
import { Compass, PlayCircle } from "lucide-react"

import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { TourCompareMock } from "@/components/mocks/tour/TourCompareMock"
import { TourKeywordMock } from "@/components/mocks/tour/TourKeywordMock"
import { TourReportsMock } from "@/components/mocks/tour/TourReportsMock"
import { TourSentimentMock } from "@/components/mocks/tour/TourSentimentMock"
import { TourSmiMock } from "@/components/mocks/tour/TourSmiMock"
import { TourStoriesMock } from "@/components/mocks/tour/TourStoriesMock"
import { TourTrendsMock } from "@/components/mocks/tour/TourTrendsMock"
import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { CtaBand } from "@/components/sections/CtaBand"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { TourStepper } from "@/components/sections/tour/TourStepper"
import { Button } from "@/components/ui/button"
import { tourPage as page } from "@/content/tour"
import { breadcrumb, buildMetadata, JsonLd } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = buildMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/product-tour",
})

/** Small decorative illustrations for "Every number can be traced", redrawn with tokens. */
const TRACE_ART: Record<string, React.ReactNode> = {
  point: (
    <>
      <rect width="220" height="80" rx="8" className="fill-muted" />
      <polyline points="14,62 50,52 86,56 122,30 158,42 196,24" fill="none" strokeWidth="2.5" strokeLinejoin="round" className="stroke-primary" />
      <circle cx="122" cy="30" r="6" strokeWidth="2.5" className="fill-card stroke-primary" />
      <rect x="134" y="8" width="72" height="34" rx="5" className="fill-card stroke-border" />
      <rect x="140" y="15" width="48" height="5" rx="2.5" className="fill-border" />
      <rect x="140" y="25" width="58" height="5" rx="2.5" className="fill-border" />
    </>
  ),
  filter: (
    <>
      <rect width="220" height="80" rx="8" className="fill-muted" />
      <rect x="12" y="10" width="54" height="16" rx="8" className="fill-primary" />
      <rect x="72" y="10" width="44" height="16" rx="8" className="fill-card stroke-border" />
      {[12, 80, 148].map((x) => (
        <rect key={x} x={x} y="36" width="60" height="34" rx="5" strokeWidth="2" className="fill-card stroke-primary" />
      ))}
    </>
  ),
  export: (
    <>
      <rect width="220" height="80" rx="8" className="fill-muted" />
      {[
        { x: 18, label: "XLS", tone: "fill-channels-text" },
        { x: 84, label: "CSV", tone: "fill-neutral-text" },
        { x: 150, label: "PDF", tone: "fill-destructive" },
      ].map((f) => (
        <g key={f.label}>
          <rect x={f.x} y="14" width="52" height="52" rx="6" className="fill-card stroke-border" />
          <text x={f.x + 26} y="46" textAnchor="middle" fontSize="12" className={cn("font-bold", f.tone)}>
            {f.label}
          </text>
        </g>
      ))}
    </>
  ),
}

const ICON_TILE = { trends: "bg-trends-tint text-trends-text", primary: "bg-primary-tint text-primary" } as const

export default function ProductTourPage() {
  const { hero, trace, after } = page
  return (
    <>
      <section aria-labelledby="hero-h" className="container-site pt-9 pb-7 max-md:px-4 md:pt-16 md:pb-10">
        <div className="mx-auto flex max-w-215 flex-col items-center gap-4 text-center md:gap-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-tint px-3 py-1.5 text-xs leading-[1.3] font-semibold text-primary md:px-3.5 md:text-[0.8125rem]">
            <Compass aria-hidden="true" strokeWidth={2} className="size-3.5" />
            {hero.chip}
          </span>
          <h1 id="hero-h" className="text-h1-m tracking-[-0.025em] md:text-h1 md:tracking-[-0.03em]">
            {hero.title}
          </h1>
          <p className="max-w-170 text-base text-muted-foreground md:text-[1.1875rem]">
            {hero.leadStart}
            <span className="max-md:hidden">{hero.leadDesktop}</span>
            {hero.leadEnd}
          </p>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
            <Button asChild size="lg">
              <a href={hero.guided.href}>
                <PlayCircle aria-hidden="true" strokeWidth={1.8} className="size-5" />
                {hero.guided.label}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={hero.free.href}>
                <Compass aria-hidden="true" strokeWidth={1.8} className="size-5" />
                {hero.free.label}
              </a>
            </Button>
          </div>
          <p className="inline-flex items-center gap-2 text-[0.8125rem] text-muted-foreground md:text-sm">
            <SampleDataChip tone="light" className="max-md:hidden" />
            <span className="md:hidden">{hero.sample}.</span>
            {hero.sampleNote}
          </p>
        </div>
      </section>

      <TourStepper
        mocks={[
          <TourCompareMock key="1" />,
          <TourSmiMock key="2" />,
          <TourTrendsMock key="3" />,
          <TourSentimentMock key="4" />,
          <TourKeywordMock key="5" />,
          <TourStoriesMock key="6" />,
          <TourReportsMock key="7" />,
        ]}
      />

      <section aria-labelledby="trace-h" className="container-site flex flex-col gap-7 pt-16 lg:pt-24">
        <SectionHeader id="trace-h" title={trace.title} />
        <Stagger as="ul" className="grid gap-5 md:grid-cols-3">
          {trace.items.map((item) => (
            <StaggerItem as="li" key={item.id} className="flex flex-col gap-3.5 rounded-lg bg-card p-6 shadow-card">
              <svg viewBox="0 0 220 80" aria-hidden="true" focusable="false" className="block h-20 w-full">
                {TRACE_ART[item.id]}
              </svg>
              <p className="font-semibold">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-labelledby="after-h" className="container-site flex flex-col gap-7 section-y">
        <SectionHeader id="after-h" title={after.title} />
        <Stagger as="ul" className="grid gap-5 md:grid-cols-3">
          {after.items.map(({ icon: Icon, tone, title, text, action }) => (
            <StaggerItem as="li" key={title} className="flex flex-col gap-3.5 rounded-lg bg-card p-6 shadow-card">
              <span aria-hidden="true" className={cn("grid size-11 place-items-center rounded-lg", ICON_TILE[tone])}>
                <Icon strokeWidth={2} className="size-5.5" />
              </span>
              <h3 className="text-h4">{title}</h3>
              <p className="text-[0.9375rem] text-muted-foreground">{text}</p>
              <Button asChild variant={action.variant} className="mt-auto self-start">
                <Link href={action.href}>{action.label}</Link>
              </Button>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand {...page.cta} />

      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: page.meta.title, path: "/product-tour" },
        ])}
      />
    </>
  )
}
