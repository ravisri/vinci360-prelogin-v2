import { CalendarDays } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { CtaBand } from "@/components/sections/CtaBand"
import { Hero } from "@/components/sections/Hero"
import { HowToUse } from "@/components/sections/HowToUse"
import { RelatedModules } from "@/components/sections/RelatedModules"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { HeroRoleList } from "@/components/sections/solutions/HeroRoleList"
import { OneNumber } from "@/components/sections/solutions/OneNumber"
import { RoleMatrix } from "@/components/sections/solutions/RoleMatrix"
import { RolePanel } from "@/components/sections/solutions/RolePanel"
import { RoleTabs } from "@/components/sections/solutions/RoleTabs"
import { StartPicker } from "@/components/sections/solutions/StartPicker"
import { parseRole, roleKeys, roles, solutionsPage as page } from "@/content/solutions"
import { breadcrumb, buildMetadata, JsonLd } from "@/lib/seo"
import { cn } from "@/lib/utils"

/** Canonical is /solutions for every ?role= view. */
export const metadata = buildMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/solutions",
})

type Props = { searchParams: Promise<{ role?: string | string[] }> }

const art = page.steps.art

/** "How to get started" illustrations, redrawn with tokens (decorative; HowToUse hides them). */
const stepArt = [
  <div key="1" className="flex h-full flex-col justify-center gap-1.5 text-xs font-semibold">
    <span className="rounded-sm border-2 border-primary bg-card px-2.5 py-1.5">{art.brand}</span>
    <span className="rounded-sm border border-border bg-card px-2.5 py-1.5">{art.rivals}</span>
  </div>,
  <div key="2" className="flex h-full flex-col justify-center gap-1.5 text-xs">
    <span className="text-muted-foreground">{art.sov}</span>
    <span>{art.legend}</span>
    <span className="flex h-2.5 overflow-hidden rounded-full">
      <span className="w-[42%] bg-chart-6" />
      <span className="w-[35%] bg-chart-2" />
      <span className="w-[23%] bg-chart-3" />
    </span>
  </div>,
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
  tour: (
    <span className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="h-0.5 w-6 bg-primary-200" />}
          <span className={cn("size-3.5 rounded-full", i < 2 ? "bg-primary" : "border-2 border-primary bg-card")} />
        </span>
      ))}
    </span>
  ),
  demo: <CalendarDays strokeWidth={2} className="size-11" />,
}

export default async function SolutionsPage({ searchParams }: Props) {
  const role = parseRole((await searchParams).role)
  const { hero } = page

  return (
    <>
      <Hero
        chip={{ label: hero.chip, accent: "smi", bordered: true }}
        title={hero.title}
        lead={hero.lead}
        primary={hero.primary}
        secondary={hero.secondary}
        visual={<HeroRoleList />}
      />

      <section id="roles" aria-labelledby="roles-h" className="container-site flex scroll-mt-20 flex-col gap-4 md:gap-7 md:pt-14">
        <Reveal>
          <SectionHeader id="roles-h" title={page.roles.title} lead={page.roles.lead} size="display" />
        </Reveal>
        <RoleTabs
          label={page.roles.tablistLabel}
          active={role}
          items={roleKeys.map((k) => ({ key: k, label: roles[k].label, initial: roles[k].initial, question: roles[k].question }))}
        />
        <RolePanel role={roles[role]} />
      </section>

      <section aria-labelledby="matrix-h" className="container-site flex flex-col gap-6 pt-16 lg:pt-24">
        <Reveal>
          <SectionHeader id="matrix-h" title={page.matrix.title} lead={page.matrix.lead} />
        </Reveal>
        <RoleMatrix active={role} />
      </section>

      <section aria-labelledby="glossary-h" className="container-site flex flex-col gap-6 pt-16 lg:pt-24">
        <Reveal>
          <SectionHeader id="glossary-h" title={page.glossary.title} />
        </Reveal>
        <OneNumber />
      </section>

      <section aria-labelledby="pick-h" className="container-site flex flex-col gap-3.5 pt-16 md:gap-6 lg:pt-24">
        <Reveal className="flex flex-col gap-2.5">
          <h2 id="pick-h" className="text-h3 md:text-h2">
            {page.picker.title}
          </h2>
          <p id="pick-d" className="text-base text-muted-foreground md:text-[1.0625rem]">
            {page.picker.lead}
          </p>
        </Reveal>
        <StartPicker labelledBy="pick-h" describedBy="pick-d" />
      </section>

      <section aria-labelledby="team-h" className="container-site flex flex-col gap-7 pt-16 lg:pt-24">
        <SectionHeader id="team-h" title={page.team.title} />
        <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {page.team.items.map(({ icon: Icon, title, text }) => (
            <StaggerItem as="li" key={title} className="flex flex-col gap-3 rounded-lg bg-card p-6 shadow-card">
              <span aria-hidden="true" className="grid size-11 place-items-center rounded-lg bg-primary-tint text-primary-700">
                <Icon strokeWidth={2} className="size-5.5" />
              </span>
              <h3 className="text-lg font-extrabold">{title}</h3>
              <p className="text-[0.90625rem] text-muted-foreground">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <HowToUse
        title={page.steps.title}
        accent="smi"
        className="pb-0 lg:pb-0"
        steps={page.steps.items.map((s, i) => ({ ...s, illustration: stepArt[i], dark: i === 1 }))}
      />

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

      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: page.meta.title, path: "/solutions" },
        ])}
      />
    </>
  )
}
