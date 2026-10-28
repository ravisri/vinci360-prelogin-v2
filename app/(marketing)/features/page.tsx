import { ChannelPanelMock } from "@/components/mocks/features/ChannelPanelMock"
import { ComparePanelMock } from "@/components/mocks/features/ComparePanelMock"
import { FeaturesHeroMock } from "@/components/mocks/features/FeaturesHeroMock"
import { ReportsPanelMock } from "@/components/mocks/features/ReportsPanelMock"
import { SentimentPanelMock } from "@/components/mocks/features/SentimentPanelMock"
import { SmiPanelMock } from "@/components/mocks/features/SmiPanelMock"
import { StoriesPanelMock } from "@/components/mocks/features/StoriesPanelMock"
import { TrendsPanelMock } from "@/components/mocks/features/TrendsPanelMock"
import { Reveal } from "@/components/motion/Reveal"
import type { Benefit } from "@/components/sections/BenefitList"
import { CtaBand } from "@/components/sections/CtaBand"
import { FeatureSplit } from "@/components/sections/FeatureSplit"
import { FeatureTabs } from "@/components/sections/FeatureTabs"
import { GlossaryFilter } from "@/components/sections/GlossaryFilter"
import { Hero } from "@/components/sections/Hero"
import { IconCardGrid } from "@/components/sections/IconCardGrid"
import { ModuleMap } from "@/components/sections/ModuleMap"
import { PageAnatomy } from "@/components/sections/PageAnatomy"
import { RolePills } from "@/components/sections/RolePills"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { featuresOverview as page, type Panel, type TabId } from "@/content/features-overview"
import { solutionsNav } from "@/content/navigation"
import { breadcrumb, buildMetadata, JsonLd, softwareApp } from "@/lib/seo"

export const metadata = buildMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/features",
})

const MOCKS: Record<TabId, (props: { hotspots: Panel["hotspots"] }) => React.ReactNode> = {
  smi: SmiPanelMock,
  trends: TrendsPanelMock,
  sent: SentimentPanelMock,
  cmp: ComparePanelMock,
  stories: StoriesPanelMock,
  reports: ReportsPanelMock,
  channels: ChannelPanelMock,
}

/** The 390 reference shortens some benefit lines; both versions are in the HTML, one shown per width. */
function withMobileText(items: readonly Benefit[], mobile?: readonly string[]): Benefit[] {
  return items.map((b, i) =>
    mobile?.[i]
      ? {
          ...b,
          text: (
            <>
              <span className="md:hidden">{mobile[i]}</span>
              <span className="max-md:hidden">{b.text}</span>
            </>
          ),
        }
      : b
  )
}

export default function FeaturesPage() {
  const { hero, map, tour } = page
  const panels = Object.fromEntries(
    tour.panels.map((p) => {
      const Mock = MOCKS[p.id]
      return [
        p.id,
        <FeatureSplit
          key={p.id}
          variant="panel"
          headingAs="h3"
          accent={p.accent}
          chip={p.chip}
          title={p.title}
          lead={p.lead}
          benefits={withMobileText(p.benefits, p.benefitsMobile)}
          action={p.action}
          visual={<Mock hotspots={p.hotspots} />}
        />,
      ]
    })
  )

  return (
    <>
      <Hero
        chip={{ label: hero.chip, accent: "smi" }}
        title={hero.title}
        lead={
          <>
            {hero.lead}
            <span className="max-md:hidden">{hero.leadTail}</span>.
          </>
        }
        primary={hero.primary}
        secondary={hero.secondary}
        visual={<FeaturesHeroMock />}
        after={<p className="mt-4 text-sm text-muted-foreground lg:mt-10 lg:border-t lg:border-border lg:pt-5">{hero.metricsLine}</p>}
        className="pt-9 pb-0 md:pt-18 md:pb-10"
      />

      <section aria-labelledby="map-h" className="container-site flex flex-col gap-4 pt-14 md:gap-9 lg:pt-24">
        <Reveal>
          <SectionHeader id="map-h" title={map.title} className="max-w-170 max-md:[&>p]:hidden" lead={map.lead} />
          <p className="mt-3 text-base text-muted-foreground md:hidden">{map.leadMobile}</p>
        </Reveal>
        <ModuleMap tiles={map.tiles} link={map.link} />
      </section>

      <section id="tour" aria-labelledby="tour-h" className="container-site scroll-mt-35 pt-14 lg:pt-24">
        <Reveal className="mb-4 md:mb-7">
          <SectionHeader id="tour-h" title={tour.title} lead={tour.lead} className="max-md:[&>p]:hidden" />
        </Reveal>
        <FeatureTabs
          label={tour.tabsLabel}
          tabs={tour.panels.map(({ id, name, accent }) => ({
            id,
            name,
            accent,
          }))}
          panels={panels}
        />
      </section>

      <section aria-labelledby="same-h" className="container-site flex flex-col gap-9 pt-16 lg:pt-35">
        <Reveal>
          <SectionHeader id="same-h" title={page.anatomy.title} lead={page.anatomy.lead} className="max-w-180" />
        </Reveal>
        <PageAnatomy />
      </section>

      <section aria-labelledby="built-h" className="container-site flex flex-col gap-8 pt-14 lg:pt-24">
        <Reveal>
          <SectionHeader id="built-h" title={page.builtIn.title} />
        </Reveal>
        <IconCardGrid items={page.builtIn.items} />
      </section>

      <section aria-labelledby="gl-h" className="container-site flex flex-col gap-6 pt-14 lg:pt-24">
        <Reveal>
          <SectionHeader id="gl-h" title={page.glossary.title} lead={page.glossary.lead} />
        </Reveal>
        <GlossaryFilter />
      </section>

      <section id="solutions" aria-labelledby="who-h" className="container-site pt-14 pb-16 lg:pt-20 lg:pb-24">
        <RolePills title={page.roles.title} titleId="who-h" items={solutionsNav} icons={page.roles.icons} />
      </section>

      <CtaBand {...page.cta} />

      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: page.meta.title, path: "/features" },
        ])}
      />
      <JsonLd data={softwareApp()} />
    </>
  )
}
