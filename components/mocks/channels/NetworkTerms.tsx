import { MoveHorizontal } from "lucide-react"

import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { channelNetworks, channelOrder } from "@/content/channels-data"
import { channelsTerms as c } from "@/content/features/channel-analysis"

/**
 * "Each network, in its own words": a semantic comparison table from md; below md the same rows as
 * swipeable cards (the strip scrolls inside itself, never the page).
 */
export function NetworkTerms() {
  const cells = channelOrder.map((k) => {
    const n = channelNetworks[k]
    return { k, name: n.name, values: [n.objLong, n.terms.measures, n.terms.detail] }
  })
  return (
    <section aria-labelledby="terms-h" className="flex flex-col gap-3 pt-11 md:container-site md:gap-7 md:pt-24">
      <Reveal className="max-md:container-site">
        <SectionHeader id="terms-h" title={c.title} />
      </Reveal>

      <Reveal className="max-md:hidden">
        <table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg bg-card text-left text-[0.9375rem] shadow-card">
          <caption className="sr-only">{c.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[18%] border-b border-border p-4">
                <span className="sr-only">{c.rowHeader}</span>
              </th>
              {cells.map((cell) => (
                <th key={cell.k} scope="col" className="border-b border-border p-4 font-heading text-base font-bold">
                  <span className="inline-flex items-center gap-2">
                    <NetworkIcon network={cell.k} />
                    {cell.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row, r) => (
              <tr key={row}>
                <th scope="row" className="border-b border-border p-4 align-top text-sm font-semibold text-neutral-text [tr:last-child_&]:border-b-0">
                  {row}
                </th>
                {cells.map((cell) => (
                  <td key={cell.k} className="border-b border-border p-4 align-top [tr:last-child_&]:border-b-0">
                    {r === 0 ? <strong>{cell.values[r]}</strong> : r === 2 ? <span className="font-bold text-channels-text">{cell.values[r]}</span> : cell.values[r]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <ul aria-label={c.listLabel} className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-1 pb-2 md:hidden">
        {cells.map((cell) => (
          <li key={cell.k} className="flex w-68 flex-none snap-start flex-col gap-3 rounded-lg bg-card p-4 shadow-card">
            <h3 className="flex items-center gap-2 text-[1.0625rem]">
              <NetworkIcon network={cell.k} />
              {cell.name}
            </h3>
            <dl className="flex flex-col gap-2 text-sm [&_dt]:text-xs [&_dt]:font-semibold [&_dt]:text-neutral-text">
              {c.rowsMobile.map((label, r) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt>{label}</dt>
                  <dd className={r === 0 ? "font-bold" : r === 2 ? "font-bold text-channels-text" : undefined}>{cell.values[r]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-1.5 px-4 text-xs text-muted-foreground md:hidden">
        <MoveHorizontal aria-hidden="true" strokeWidth={2} className="size-3.5" />
        {c.swipe}
      </p>
    </section>
  )
}
