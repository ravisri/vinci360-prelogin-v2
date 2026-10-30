import Link from "next/link"
import { Check } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { BringList } from "@/components/sections/demo/BringList"
import { DemoForm } from "@/components/sections/demo/DemoForm"
import { DemoPreviewMock } from "@/components/sections/demo/DemoPreviewMock"
import { DemoSteps } from "@/components/sections/demo/DemoSteps"
import { LinkBand } from "@/components/sections/demo/LinkBand"
import { TalkToPerson } from "@/components/sections/demo/TalkToPerson"
import { WhatYoullSee } from "@/components/sections/demo/WhatYoullSee"
import { FaqAccordion } from "@/components/sections/FaqAccordion"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { demoBand, demoFaq, demoHero as h, demoMeta } from "@/content/demo"
import { breadcrumb, buildMetadata, JsonLd } from "@/lib/seo"

export const metadata = buildMetadata(demoMeta)

export default function RequestDemoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: demoMeta.title, path: demoMeta.path },
        ])}
      />

      {/* Hero: intro (left) · form (right) · ticks + preview (left, sticky). Below lg: intro → form → ticks. */}
      <section id="top" aria-labelledby="hero-h" className="pt-6 pb-16 md:pt-12 md:pb-24">
        <div className="container-site grid items-start gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-y-5">
          <div className="flex flex-col gap-3 md:gap-5 lg:col-start-1 lg:row-start-1">
            <ModuleChip accent="smi" label={h.chip} size="md" dot={false} bordered />
            <h1 id="hero-h" className="text-h1-m md:text-h1">
              {h.title}
            </h1>
            <p className="max-w-135 text-base text-muted-foreground md:hidden">{h.leadMobile}</p>
            <p className="hidden max-w-135 text-[1.1875rem] text-muted-foreground md:block">{h.lead}</p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <DemoForm />
          </div>

          <section aria-label={h.ticksLabel} className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-start-1 lg:row-start-2">
            <ul className="flex flex-col gap-3 font-semibold">
              {h.ticks.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span aria-hidden="true" className="grid size-6.5 flex-none place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check strokeWidth={3} className="size-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            {/* <PlaceholderInline className="self-start">{h.responseTime}</PlaceholderInline> */}
            <Reveal className="mt-2 hidden lg:block">
              <DemoPreviewMock />
            </Reveal>
          </section>
        </div>
      </section>

      <DemoSteps className="md:pt-10" />
      <WhatYoullSee className="pt-16 md:pt-24" />
      <BringList className="pt-16 md:pt-24" />
      <FaqAccordion
        title={demoFaq.title}
        items={demoFaq.items}
        className="pb-0 md:pb-0"
        // after={
        //   <Link
        //     href={demoFaq.pricing.href}
        //     className="flex flex-col items-start gap-1.5 rounded-lg border border-dashed border-placeholder-border bg-placeholder px-4.5 py-4 text-foreground no-underline"
        //   >
        //     <PlaceholderInline>{demoFaq.pricing.placeholder}</PlaceholderInline>
        //     <span className="text-sm font-semibold text-primary-700">{demoFaq.pricing.link}</span>
        //   </Link>
        // }
      />
      {/* <TalkToPerson className="section-y" /> */}
      <LinkBand title={demoBand.title} links={demoBand.links} className="max-md:hidden mt-10" />
    </>
  )
}
