import Link from "next/link"

import { Bars } from "@/components/charts/Bars"
import { HBar } from "@/components/charts/HBar"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { Reveal } from "@/components/motion/Reveal"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { channelOrder, channelNetworks, depthCompare as data } from "@/content/channels-data"
import { channelsDepth as c } from "@/content/features/channel-analysis"

/** "Whole picture or channel depth?": the cross-platform view (links to SMI) next to this page's single-network depth. */
export function DepthCompare() {
  return (
    <section aria-labelledby="depth-h" className="container-site flex flex-col gap-7 pt-16 md:pt-24">
      <Reveal>
        <SectionHeader id="depth-h" title={c.title} />
      </Reveal>
      <Reveal className="grid gap-6 md:grid-cols-2">
        <Link
          href={c.cross.href}
          className="flex flex-col gap-4 rounded-lg border-2 border-transparent bg-card p-6 text-foreground shadow-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <figure className="flex flex-col gap-2.5 rounded-lg bg-background p-4.5 tabular">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.78125rem] font-bold">{data.mentions.title}</span>
              <SampleDataChip tone="light" />
            </div>
            <Bars
              data={[{ label: data.mentions.title, values: data.mentions.values, tone: "smi" }]}
              labels={channelOrder.map((k) => channelNetworks[k].name)}
              ariaLabel={data.mentions.title}
              max={100}
              height={110}
            />
            <figcaption className="sr-only">{data.mentions.caption}</figcaption>
          </figure>
          <h3 className="text-h4 md:text-2xl">{c.cross.title}</h3>
          <p className="text-muted-foreground">{c.cross.text}</p>
          <span className="mt-auto font-semibold text-primary">
            {c.cross.link} <span aria-hidden="true">→</span>
          </span>
        </Link>
        <div className="flex flex-col gap-4 rounded-lg border-2 border-channels-text bg-card p-6 shadow-card">
          <figure className="on-dark flex flex-col gap-2.5 rounded-lg bg-background p-4.5 text-foreground tabular">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.78125rem] font-bold">{data.reactions.title}</span>
              <SampleDataChip />
            </div>
            <HBar
              data={data.reactions.rows.map((r) => ({ label: r.label, value: r.value, display: `${r.value}%`, tone: r.tone }))}
              ariaLabel={data.reactions.title}
              max={58}
              thickness={10}
              labelClassName="w-12"
            />
            <figcaption className="sr-only">{data.reactions.caption}</figcaption>
          </figure>
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-h4 md:text-2xl">{c.channel.title}</h3>
            <ModuleChip accent="channels" label={c.channel.chip} dot={false} />
          </div>
          <p className="text-muted-foreground">{c.channel.text}</p>
        </div>
      </Reveal>
      <Reveal>
        <p className="text-center text-[1.0625rem] font-semibold">{c.closing}</p>
      </Reveal>
    </section>
  )
}
