import Link from "next/link"
import { ArrowRight, Mail, Users } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { CtaBand } from "@/components/sections/CtaBand"
import { Hero } from "@/components/sections/Hero"
import { HowToUse } from "@/components/sections/HowToUse"
import { RelatedModules } from "@/components/sections/RelatedModules"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { FeatureTiles } from "@/components/sections/about/FeatureTiles"
import { LeaderCards } from "@/components/sections/about/LeaderCards"
import { LocationsPanel } from "@/components/sections/about/LocationsPanel"
import { MsrcosmosBlock } from "@/components/sections/about/MsrcosmosBlock"
import { NetworksHeroVisual } from "@/components/sections/about/NetworksHeroVisual"
import { PrincipleCards } from "@/components/sections/about/PrincipleCards"
import { SecurityCard } from "@/components/sections/about/SecurityCard"
import { MiniBars } from "@/components/sections/solutions/MiniBars"
import { Button } from "@/components/ui/button"
import { aboutPage as page } from "@/content/about"
import { breadcrumb, buildMetadata, JsonLd } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = buildMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/about",
})

const art = page.how.art

/** "How we work with you" illustrations, redrawn with tokens (decorative; HowToUse hides them). */
const stepArt = [
  <div key="1" className="flex h-full flex-col justify-center gap-1.5 text-xs font-semibold">
    <span className="rounded-sm border-2 border-primary bg-card px-2.5 py-1.5">{art.brand}</span>
    <span className="rounded-sm border border-border bg-card px-2.5 py-1.5">{art.rivals}</span>
  </div>,
  <MiniBars key="2" variant="dark" bars={[40, 60, 50, 90]} className="h-full p-0" />,
  <div key="3" className="flex h-full flex-wrap content-center items-center justify-center gap-1.5 text-xs font-semibold">
    {art.roles.map((r, i) => (
      <span key={r} className={cn("rounded-full px-2.5 py-1.5", i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card")}>
        {r}
      </span>
    ))}
  </div>,
]

/** "Keep exploring" thumbnails (decorative). */
const exploreArt: Record<string, React.ReactNode> = {
  features: (
    <span className="grid h-full w-full grid-cols-4 gap-1.5 p-3.5">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className={cn("rounded-[4px]", i === 1 ? "bg-primary" : "bg-card")} />
      ))}
    </span>
  ),
  source: (
    <span className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="h-0.5 w-6 bg-primary-200" />}
          <span className={cn("size-3.5 rounded-full", i < 2 ? "bg-primary" : "border-2 border-primary bg-card")} />
        </span>
      ))}
    </span>
  ),
  contact: <Mail strokeWidth={2} className="size-11" />,
}

export default function AboutPage() {
  const { hero, does } = page

  return (
    <>
      <Hero
        chip={{ label: hero.chip, accent: "smi", bordered: true }}
        title={hero.title}
        lead={
          <>
            <span className="hidden md:inline">{hero.lead}</span>
            <span className="md:hidden">{hero.leadMobile}</span>
          </>
        }
        primary={hero.primary}
        secondary={{ ...hero.secondary, icon: Users }}
        visual={<NetworksHeroVisual caption={hero.caption} />}
        className="pb-0 md:pb-20"
      />

      <section aria-labelledby="bel-h" className="container-site flex flex-col gap-3.5 pt-11 md:gap-7 md:pt-14">
        <Reveal>
          <SectionHeader id="bel-h" title={page.beliefs.title} lead={page.beliefs.lead} size="display" className="max-w-190 [&>p]:hidden md:[&>p]:block" />
        </Reveal>
        <PrincipleCards />
      </section>

      <section aria-labelledby="does-h" className="container-site flex flex-col gap-3 pt-11 md:gap-5.5 lg:pt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <h2 id="does-h" className="text-h3 md:text-h2">
              {does.title}
            </h2>
            <p className="text-sm font-semibold text-muted-foreground tabular">{does.fact}</p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href={does.link.href}>
              {does.link.label}
              <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
            </Link>
          </Button>
        </Reveal>
        <Reveal>
          <FeatureTiles />
        </Reveal>
        <Link href={does.link.href} className="inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-primary-700 md:hidden">
          {does.link.label}
          <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
        </Link>
      </section>

      <MsrcosmosBlock />

      <HowToUse
        title={page.how.title}
        action={page.how.link}
        accent="smi"
        className="pb-0 lg:pb-0"
        steps={page.how.steps.map((s, i) => ({ ...s, illustration: stepArt[i], dark: i === 1 }))}
      />

      <LeaderCards />
      <LocationsPanel />
      <SecurityCard />

      <RelatedModules
        title={page.explore.title}
        items={page.explore.items.map((e) => ({
          accent: "smi",
          label: e.chip,
          prompt: e.text,
          href: e.href,
          linkLabel: e.link,
          thumbnail: exploreArt[e.id],
        }))}
      />

      <div id="demo" className="scroll-mt-16">
        <CtaBand {...page.cta} />
      </div>

      {/* Organization JSON-LD (confirmed fields only) is emitted once by the root layout. */}
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: page.meta.title, path: "/about" },
        ])}
      />
    </>
  )
}
