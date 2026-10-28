import { HomeDashboardMock } from "@/components/mocks/home/HomeDashboardMock"
import { RisingTopicsMock } from "@/components/mocks/home/RisingTopicsMock"
import { SentimentPlatformMock } from "@/components/mocks/home/SentimentPlatformMock"
import { ShareOfVoiceMock } from "@/components/mocks/home/ShareOfVoiceMock"
import { SnapshotMock } from "@/components/mocks/home/SnapshotMock"
import { StoryCandidateMock } from "@/components/mocks/home/StoryCandidateMock"
import { WeeklyBriefMock } from "@/components/mocks/home/WeeklyBriefMock"
import { Reveal } from "@/components/motion/Reveal"
import type { Benefit } from "@/components/sections/BenefitList"
import { CtaBand } from "@/components/sections/CtaBand"
import { FeatureSplit } from "@/components/sections/FeatureSplit"
import { Hero } from "@/components/sections/Hero"
import { HowToUse } from "@/components/sections/HowToUse"
import { NetworkGrid } from "@/components/sections/NetworkGrid"
import { NetworkRow } from "@/components/sections/NetworkRow"
import { ProofPlaceholder } from "@/components/sections/ProofPlaceholder"
import { QuestionTiles } from "@/components/sections/QuestionTiles"
import { RoleCards } from "@/components/sections/RoleCards"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { home } from "@/content/home"
import { buildMetadata, JsonLd, softwareApp } from "@/lib/seo"

export const metadata = buildMetadata({
  title: home.meta.title,
  description: home.meta.description,
  path: "/",
})

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
      : b,
  )
}

export default function HomePage() {
  const { hero } = home
  return (
    <>
      <Hero
        variant="center"
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
        trailing={<NetworkRow label={hero.networks} align="center" />}
        visual={<HomeDashboardMock />}
      />

      <NetworkGrid title={home.networks.title} items={home.networks.items} />

      <section className="container-site flex flex-col gap-8 pt-16 md:gap-10 lg:pt-24">
        <Reveal>
          <SectionHeader title={home.questions.title} lead={home.questions.lead} align="center" />
        </Reveal>
        <QuestionTiles items={home.questions.items} />
      </section>

      <div id="tour" className="container-site flex flex-col gap-16 section-y lg:gap-24">
        <FeatureSplit
          {...home.smi}
          benefits={withMobileText(home.smi.benefits, home.smi.benefitsMobile)}
          visual={<SnapshotMock />}
        />
        <FeatureSplit
          reverse
          {...home.trends}
          benefits={withMobileText(home.trends.benefits, home.trends.benefitsMobile)}
          visual={<RisingTopicsMock />}
        />
        <FeatureSplit {...home.sentiment} visual={<SentimentPlatformMock />} />
        <FeatureSplit reverse {...home.compare} visual={<ShareOfVoiceMock />} />

        <div className="on-dark relative overflow-hidden rounded-lg bg-background px-5 py-12 text-foreground md:px-14 md:py-16">
          <span aria-hidden="true" className="dot-grid-dark absolute top-0 right-0 h-55 w-85" />
          <FeatureSplit
            {...home.stories}
            chipVariant="solid"
            benefitIconClassName="bg-card text-amber-on-dark"
            visual={<StoryCandidateMock />}
            className="relative"
          />
        </div>

        <FeatureSplit {...home.reports} visual={<WeeklyBriefMock />} />
      </div>

      <div className="border-y border-border bg-card">
        <HowToUse title={home.how.title} lead={home.how.lead} steps={home.how.steps} accent="smi" variant="plain" />
      </div>

      <section id="solutions" className="container-site flex flex-col gap-8 section-y md:gap-10">
        <Reveal>
          <SectionHeader title={home.roles.title} align="center" />
        </Reveal>
        <RoleCards items={home.roles.items} />
      </section>

      <section className="container-site pb-16 lg:pb-24">
        <ProofPlaceholder {...home.proof} />
      </section>

      <CtaBand {...home.cta} />

      <JsonLd data={softwareApp()} />
    </>
  )
}
