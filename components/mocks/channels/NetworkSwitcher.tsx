"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { m, useReducedMotion } from "motion/react"

import { useChannelState } from "@/components/mocks/channels/ChannelStateProvider"
import { NetworkPanel } from "@/components/mocks/channels/NetworkPanel"
import { mchip } from "@/components/mocks/channels/styles"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { ReachNote } from "@/components/mocks/ReachNote"
import { Reveal } from "@/components/motion/Reveal"
import { ModuleChip } from "@/components/sections/ModuleChip"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { channelNetworks, channelOrder, type ChannelKey } from "@/content/channels-data"
import { channelsSwitcher as c } from "@/content/features/channel-analysis"
import { crossFade } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * "Choose a network": Radix tabs (←/→/Home/End, roving tabindex). Every panel is force-mounted so
 * all copy is in the server HTML; the incoming NetworkPanel cross-fades and, being re-keyed,
 * re-runs its charts and counters.
 */
export function NetworkSwitcher() {
  const { net, setNet } = useChannelState()
  const reduced = useReducedMotion()
  const [swaps, setSwaps] = useState(0)
  const [prev, setPrev] = useState(net)
  // Tabs or the hero chips changed the network: count a swap so the incoming panel animates.
  if (prev !== net) {
    setPrev(net)
    setSwaps((s) => s + 1)
  }

  return (
    <section id="switch" aria-labelledby="switch-h" className="container-site flex scroll-mt-20 flex-col gap-6 pt-16 md:pt-24">
      <Reveal>
        <SectionHeader id="switch-h" eyebrow={<ModuleChip accent="channels" label={c.chip} dot={false} />} title={c.title} lead={c.lead} size="display" />
      </Reveal>
      <Tabs value={net} onValueChange={(v) => setNet(v as ChannelKey)} className="flex-col gap-4.5">
        <TabsList
          variant="line"
          aria-label={c.tabsLabel}
          className="-mx-6 scrollbar-none h-auto w-auto justify-start gap-2 overflow-x-auto rounded-none px-6 py-1 group-data-horizontal/tabs:h-auto md:mx-0 md:px-0"
        >
          {channelOrder.map((k) => (
            <TabsTrigger
              key={k}
              value={k}
              className="relative h-12 flex-none gap-2 rounded-full border border-border bg-card px-4.5 text-[0.9375rem] font-semibold text-foreground after:hidden hover:bg-channels-tint focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[state=active]:border-2 data-[state=active]:border-channels-text data-[state=active]:bg-channels-tint data-[state=active]:font-bold data-[state=active]:text-channels-text"
            >
              <NetworkIcon network={k} />
              {channelNetworks[k].name}
              <span aria-hidden="true" className="hidden size-4.5 place-items-center rounded-full bg-channels-text text-primary-foreground in-data-[state=active]:grid">
                <Check strokeWidth={3} className="size-3" />
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {channelOrder.map((k) => {
          const n = channelNetworks[k]
          const active = k === net
          return (
            <TabsContent key={k} value={k} forceMount className="flex flex-col gap-4.5 text-base data-[state=inactive]:hidden">
              <nav aria-label={c.viewsLabel}>
                <ul className="-mx-6 scrollbar-none flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
                  {c.views.map((v) => (
                    <li key={v.href} className="flex-none">
                      <a href={v.href} className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-semibold hover:bg-channels-tint">
                        {v.label}
                      </a>
                    </li>
                  ))}
                  <li className="flex-none">
                    <a
                      href="#switch"
                      aria-current="true"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-channels-text bg-channels-tint px-4 text-sm font-bold text-channels-text"
                    >
                      <Check aria-hidden="true" strokeWidth={3} className="size-3.5" />
                      {n.obj}
                    </a>
                  </li>
                </ul>
              </nav>
              <m.div
                key={active ? swaps : "idle"}
                variants={crossFade}
                initial={reduced || !swaps ? false : "hidden"}
                animate="show"
                className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
              >
                <NetworkPanel network={k} />
                <aside aria-labelledby={`nm-${k}`} className="flex flex-col gap-3.5 rounded-lg bg-card p-4 shadow-card md:p-6">
                  <div className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-lg bg-channels-tint text-ink max-md:hidden">
                      <NetworkIcon network={k} />
                    </span>
                    <h3 id={`nm-${k}`} className="text-base md:text-lg">
                      {c.aside.title(n.name)}
                    </h3>
                  </div>
                  <p className="text-[0.8125rem] text-muted-foreground max-md:hidden">
                    {c.aside.mainObject} <strong className="text-foreground">{n.objLong}</strong>
                  </p>
                  <ul aria-label={c.aside.metricsLabel} className="flex flex-wrap gap-1.5">
                    {n.metrics.map((metric) => (
                      <li key={metric} className={mchip}>
                        {metric}
                      </li>
                    ))}
                  </ul>
                  <p className="grid grid-cols-[2px_1fr] gap-x-3 text-sm">
                    <span aria-hidden="true" className="rounded-xs bg-channels" />
                    <span>
                      <strong>{c.aside.tellsLabel}</strong> {n.tells}
                    </span>
                  </p>
                  <p className={cn("border-t border-neutral-tint pt-2.5 text-xs text-muted-foreground max-md:hidden")}>{c.aside.hint}</p>
                </aside>
              </m.div>
            </TabsContent>
          )
        })}
      </Tabs>
      <ReachNote className="-mt-2" />
    </section>
  )
}
