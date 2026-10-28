import { ContactForm } from "@/components/sections/contact/ContactForm"
import { contactExploreThumbnails } from "@/components/sections/contact/ExploreThumbnails"
import { MsrcosmosCard } from "@/components/sections/contact/MsrcosmosCard"
import { OfficeMap } from "@/components/sections/contact/OfficeMap"
import { ContactTopicProvider, RouteCards } from "@/components/sections/contact/RouteCards"
import { CtaBand } from "@/components/sections/CtaBand"
import { FaqAccordion } from "@/components/sections/FaqAccordion"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { RelatedModules } from "@/components/sections/RelatedModules"
import { contactBand, contactExplore, contactFaq, contactHero as h, contactMeta } from "@/content/contact"
import { breadcrumb, buildMetadata, JsonLd } from "@/lib/seo"

export const metadata = buildMetadata(contactMeta)

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: contactMeta.title, path: contactMeta.path },
        ])}
      />

      <section id="top" aria-labelledby="hero-h" className="pt-10 pb-8 md:pt-16 md:pb-12">
        <div className="container-site mx-auto flex max-w-205 flex-col items-center gap-4.5 text-center">
          <ModuleChip accent="smi" label={h.chip} size="md" dot={false} bordered />
          <h1 id="hero-h" className="text-h1-m tracking-[-0.025em] md:text-h1 md:tracking-[-0.03em]">
            {h.title}
          </h1>
          <p className="text-base text-muted-foreground md:text-[1.1875rem]">{h.lead}</p>
          <PlaceholderInline>{h.responseTime}</PlaceholderInline>
        </div>
      </section>

      <ContactTopicProvider>
        <RouteCards className="pt-2" />
        <ContactForm className="pt-12 md:pt-22" />
      </ContactTopicProvider>

      <OfficeMap className="pt-12 md:pt-24" />

      <FaqAccordion
        title={contactFaq.title}
        lead={contactFaq.lead}
        items={contactFaq.items}
        className="pb-0 md:pb-0"
        after={
          <div className="rounded-lg border border-dashed border-placeholder-border bg-placeholder px-4.5 py-4">
            <PlaceholderInline>{contactFaq.pricing}</PlaceholderInline>
          </div>
        }
      />

      <MsrcosmosCard className="pt-16 md:pt-22" />

      <RelatedModules
        title={contactExplore.title}
        items={contactExplore.items.map((item, i) => ({ ...item, thumbnail: contactExploreThumbnails[i] }))}
      />

      <CtaBand variant="slim" title={contactBand.title} buttonLabel={contactBand.button.label} href={contactBand.button.href} />
    </>
  )
}
