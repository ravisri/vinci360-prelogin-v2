"use client"

import { m, useReducedMotion } from "motion/react"

import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { VisualPanel } from "@/components/sections/VisualPanel"
import { MiniBars } from "@/components/sections/solutions/MiniBars"
import type { Network } from "@/content/sample-data"
import { drawLine, pulseOnce, ringOnce, stagger, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

const networks: readonly Network[] = ["facebook", "x", "youtube", "instagram"]

/** Node centres in the 560×440 artboard; classes and path starts share them so the lines meet the nodes at any width. */
const nodes = [
  { y: 123, top: "top-[28%]" },
  { y: 188, top: "top-[42.7%]" },
  { y: 252, top: "top-[57.3%]" },
  { y: 316, top: "top-[71.8%]" },
] as const
const hub = { x: 326, y: 220 }
const connector = (y: number) => `M108 ${y} C 210 ${y}, 230 ${hub.y}, ${hub.x} ${hub.y}`

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("rounded-lg bg-card font-heading leading-none font-extrabold text-foreground shadow-card", className)}>
      vinci360<span className="text-primary">°</span>
    </span>
  )
}

function NetDot({ network, className, iconClassName }: { network: Network; className?: string; iconClassName?: string }) {
  return (
    <span className={cn("grid place-items-center rounded-full bg-card text-primary shadow-card", className)}>
      <NetworkIcon network={network} className={iconClassName} />
    </span>
  )
}

/** About hero: Facebook, X, YouTube and Instagram wired into one dashboard; the dashed connectors draw in, then the hub pulses once. */
export function NetworksHeroVisual({ caption }: { caption: string }) {
  const reduced = useReducedMotion()
  return (
    <figure className="m-0">
      <figcaption className="sr-only">{caption}</figcaption>

      {/* md+: the artboard, aspect-locked so the SVG connectors stay on the nodes. */}
      <VisualPanel accent="smi" dots="br" className="hidden overflow-hidden p-0 md:block md:p-0">
        <div aria-hidden="true" className="relative aspect-[560/440] w-full">
          <m.svg
            data-motion=""
            viewBox="0 0 560 440"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
            variants={stagger(0.15)}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={viewport}
          >
            <defs>
              {nodes.map((n, i) => (
                <mask key={n.y} id={`about-net-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="440">
                  <m.path data-draw="" variants={drawLine} d={connector(n.y)} fill="none" strokeWidth="8" className="stroke-primary-foreground" />
                </mask>
              ))}
            </defs>
            {nodes.map((n, i) => (
              <path
                key={n.y}
                d={connector(n.y)}
                mask={`url(#about-net-${i})`}
                fill="none"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="stroke-on-dark-focus"
              />
            ))}
          </m.svg>

          <Wordmark className="absolute top-[6%] left-[5%] px-4 py-3 text-[1.375rem]" />

          {networks.map((network, i) => (
            <NetDot
              key={network}
              network={network}
              className={cn("absolute left-[15%] size-12 -translate-x-1/2 -translate-y-1/2", nodes[i].top)}
              iconClassName="size-6"
            />
          ))}

          <span className="absolute top-1/2 left-[58.2%] -translate-x-1/2 -translate-y-1/2">
            <m.span
              className="absolute inset-0 rounded-full border-2 border-primary opacity-0"
              whileInView={reduced ? undefined : ringOnce.animate}
              transition={ringOnce.transition}
              viewport={viewport}
            />
            <m.span
              className="block size-4 rounded-full border-4 border-card bg-primary"
              whileInView={reduced ? undefined : pulseOnce.animate}
              transition={pulseOnce.transition}
              viewport={viewport}
            />
          </span>

          <div className="on-dark absolute top-1/2 left-[59%] flex w-[36%] -translate-y-1/2 flex-col gap-2.5 rounded-lg bg-background p-3.5 shadow-float">
            <span className="flex gap-1.25">
              {[0, 1, 2].map((d) => (
                <span key={d} className="size-1.75 rounded-full bg-border" />
              ))}
            </span>
            <span className="grid grid-cols-2 gap-1.5">
              <span className="h-8.5 rounded-sm border border-border bg-card" />
              <span className="h-8.5 rounded-sm border border-border bg-card" />
            </span>
            <MiniBars variant="dark" bars={[40, 55, 50, 70, 95]} className="h-17.5 p-0" />
            <span className="h-2 w-[70%] rounded-full bg-border" />
          </div>
        </div>
      </VisualPanel>

      {/* 390: networks column beside the wordmark and a compact dashboard. */}
      <VisualPanel accent="smi" dots="br" className="p-4.5 md:hidden">
        <div aria-hidden="true" className="grid grid-cols-[auto_1fr] items-center gap-4">
          <span className="flex flex-col gap-2.5">
            {networks.map((network) => (
              <NetDot key={network} network={network} className="size-10" iconClassName="size-5" />
            ))}
          </span>
          <span className="flex flex-col gap-2.5">
            <Wordmark className="self-start px-3 py-2 text-lg" />
            <span className="on-dark block rounded-lg bg-background p-3 shadow-float">
              <MiniBars variant="dark" bars={[40, 56, 50, 90]} className="h-21.5 p-0" />
            </span>
          </span>
        </div>
      </VisualPanel>
    </figure>
  )
}
