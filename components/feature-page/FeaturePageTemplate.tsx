import type { ReactNode } from "react"

import { NetworkRow } from "@/components/sections/NetworkRow"
import { CtaBand } from "@/components/sections/CtaBand"
import { Hero } from "@/components/sections/Hero"
import { HowToUse } from "@/components/sections/HowToUse"
import { OutcomeGrid } from "@/components/sections/OutcomeGrid"
import { RelatedModules } from "@/components/sections/RelatedModules"
import { WhoOpensThisPage } from "@/components/sections/WhoOpensThisPage"
import type { FeaturePageConfig } from "@/content/features/types"
import { breadcrumb, buildMetadata, JsonLd, softwareApp } from "@/lib/seo"

type FeaturePageTemplateProps = {
  config: FeaturePageConfig
  /** The page's hero mock, usually a VisualPanel holding a MockFrame, hotspots and a float card. */
  heroVisual: ReactNode
  /** Extra chip beside the module chip, e.g. "AI-generated suggestions". */
  heroChipExtra?: ReactNode
  /** Replaces the network row under the hero buttons, e.g. the Trends "On this page" pills. */
  heroTrailing?: ReactNode
  /** One small illustration per step, in order. */
  stepIllustrations?: readonly ReactNode[]
  /** One tinted thumbnail per related module, in order. */
  relatedThumbnails?: readonly ReactNode[]
  /** The page's own sections (walkthrough, filters, explainers…), rendered after the audience strip. */
  children?: ReactNode
}

export const featurePath = (config: FeaturePageConfig) => `/features/${config.slug}`

/** Page metadata for a feature page: "{title} | vinci360°", canonical /features/{slug}. */
export function featureMetadata(config: FeaturePageConfig) {
  return buildMetadata({ ...config.seo, path: featurePath(config) })
}

/**
 * Shared skeleton of the seven feature pages, in the reference order:
 * Hero → Who opens this page → [page sections] → How to use it → What it does for your brand →
 * Works with the rest of Vinci360 → CTA band, plus BreadcrumbList and SoftwareApplication JSON-LD.
 */
export function FeaturePageTemplate({ config, heroVisual, heroChipExtra, heroTrailing, stepIllustrations, relatedThumbnails, children }: FeaturePageTemplateProps) {
  const { accent, hero, personas, steps, outcomes, related, cta, seo } = config
  return (
    <>
      <Hero
        breadcrumb={hero.breadcrumb}
        chip={{ ...hero.chip, accent }}
        chipExtra={heroChipExtra}
        title={hero.title}
        lead={
          hero.leadMobile ? (
            <>
              <span className="md:hidden">{hero.leadMobile}</span>
              <span className="max-md:hidden">{hero.lead}</span>
            </>
          ) : (
            hero.lead
          )
        }
        primary={hero.primary}
        secondary={hero.secondary}
        trailing={
          heroTrailing ??
          (hero.metricsLine ? (
            <p className="text-sm text-muted-foreground">{hero.metricsLine}</p>
          ) : hero.networks ? (
            <NetworkRow label={hero.networks} />
          ) : undefined)
        }
        visual={heroVisual}
      />

      <WhoOpensThisPage
        title={personas.title}
        items={personas.items}
        accent={accent}
        columns={personas.items.length === 3 ? 3 : 4}
        aside={personas.aside}
      />

      {children}

      {/* Reference sections are 96px apart (top padding only); RelatedModules keeps its bottom padding before the band. */}
      <HowToUse
        title={steps.title}
        accent={accent}
        steps={steps.items.map((step, i) => ({ ...step, illustration: stepIllustrations?.[i] }))}
        className="pt-16 pb-0 md:pt-24 md:pb-0"
      />
      <OutcomeGrid title={outcomes.title} items={outcomes.items} accent={accent} className="pt-16 pb-0 md:pt-24 md:pb-0" />
      <RelatedModules
        title={related.title}
        items={related.items.map((item, i) => ({ ...item, thumbnail: relatedThumbnails?.[i] }))}
        className="pt-16 md:pt-24"
      />
      <CtaBand {...cta} />

      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: seo.title, path: featurePath(config) },
        ])}
      />
      <JsonLd data={softwareApp()} />
    </>
  )
}
