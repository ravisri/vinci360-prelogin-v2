import Link from "next/link"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { ModuleChip } from "@/components/sections/ModuleChip"
import type { MapTile } from "@/content/features-overview"
import type { Network } from "@/content/sample-data"
import { accents } from "@/lib/accents"
import { cn } from "@/lib/utils"

const WIDE = new Set<MapTile["glyph"]>(["smi", "channels"])
const SPAN: Partial<Record<MapTile["glyph"], string>> = {
  smi: "col-span-2",
  reports: "col-span-2 lg:col-span-1",
  channels: "col-span-2",
}
const CHANNEL_GLYPHS: Network[] = ["facebook", "youtube", "instagram", "x"]

/** Decorative tile drawings in currentColor, as in the reference. They lift on tile hover (transform only). */
function Glyph({ kind }: { kind: MapTile["glyph"] }) {
  const motion =
    "transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
  if (kind === "smi") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 150" fill="none" className={cn("h-37.5 w-50 flex-none self-center", motion)}>
        <rect x="1" y="1" width="60" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
        <rect x="70" y="1" width="60" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
        <rect x="139" y="1" width="60" height="40" rx="6" fill="currentColor" />
        <polyline
          points="2,140 30,120 58,128 86,100 114,108 142,70 170,82 198,56"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (kind === "channels") {
    return (
      <span aria-hidden="true" className={cn("grid flex-none grid-cols-[repeat(2,4rem)] gap-3 self-center", motion)}>
        {CHANNEL_GLYPHS.map((n) => (
          <span key={n} className="grid h-16 place-items-center rounded-lg border-2 border-current">
            <NetworkIcon network={n} className="size-7" />
          </span>
        ))}
      </span>
    )
  }
  const small = cn("flex-none", motion)
  switch (kind) {
    case "trends":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 44 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("h-7.5 w-11", small)}
        >
          <polyline points="2,28 14,20 24,23 42,4" />
          <path d="M32 3h10v10" />
        </svg>
      )
    case "sent":
      return (
        <svg aria-hidden="true" viewBox="0 0 44 30" fill="none" className={cn("h-7.5 w-11", small)}>
          <rect x="1" y="2" width="42" height="9" rx="4.5" stroke="currentColor" strokeWidth="2" />
          <rect x="1" y="2" width="18" height="9" rx="4.5" fill="currentColor" />
          <rect x="1" y="18" width="42" height="9" rx="4.5" stroke="currentColor" strokeWidth="2" />
          <rect x="1" y="18" width="30" height="9" rx="4.5" fill="currentColor" />
        </svg>
      )
    case "cmp":
      return (
        <svg aria-hidden="true" viewBox="0 0 34 34" fill="none" strokeWidth="5" className={cn("size-8.5", small)}>
          <circle cx="17" cy="17" r="13" stroke="currentColor" strokeOpacity=".3" />
          <path d="M17 4a13 13 0 0 1 11.3 19.4" stroke="currentColor" />
        </svg>
      )
    case "stories":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={cn("size-7.5", small)}>
          <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
        </svg>
      )
    case "reports":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("size-7.5", small)}
        >
          <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
          <path d="M10 20.5h4" />
        </svg>
      )
  }
}

/** "The module map": seven solid-accent tiles (SMI and Channels wide), each with its modules and a link to its page. */
export function ModuleMap({ tiles, link, className }: { tiles: readonly MapTile[]; link: string; className?: string }) {
  return (
    <Stagger as="ul" className={cn("grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5", className)}>
      {tiles.map((t) => {
        const a = accents[t.accent]
        const wide = WIDE.has(t.glyph)
        // Small tiles are 2-up on 390, with tighter type and chips.
        const compact = !wide && t.glyph !== "reports"
        return (
          <StaggerItem as="li" key={t.href} className={cn("flex", SPAN[t.glyph])}>
            <Link
              href={t.href}
              className={cn(
                "group flex w-full gap-7 rounded-lg no-underline transition-transform duration-200 hover:-translate-y-1 hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-62.5 lg:p-7",
                compact ? "p-4.5" : "p-5.5",
                a.solid,
                a.onFill
              )}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-3 lg:gap-3.5">
                <span className="flex items-start justify-between gap-3">
                  <span className={cn("font-bold tracking-[0.05em] uppercase lg:text-[0.8125rem]", wide ? "text-xs" : "text-[0.71875rem]")}>{t.eyebrow}</span>
                  {!wide && (
                    <span className="max-md:hidden">
                      <Glyph kind={t.glyph} />
                    </span>
                  )}
                </span>
                <h3
                  className={cn(
                    "font-extrabold",
                    wide ? "text-xl leading-[1.25] lg:text-[1.625rem] lg:leading-[1.2]" : "text-base leading-[1.25] lg:text-[1.3125rem]"
                  )}
                >
                  {t.titleMobile ? (
                    <>
                      <span className="md:hidden">{t.titleMobile}</span>
                      <span className="max-md:hidden">{t.title}</span>
                    </>
                  ) : (
                    t.title
                  )}
                </h3>
                <span className={cn("flex flex-wrap", compact ? "gap-1 md:gap-1.5" : "gap-1.5")}>
                  {t.modules.map((m) => (
                    <ModuleChip
                      key={m}
                      accent={t.accent}
                      label={m}
                      variant="outline"
                      className={cn("whitespace-nowrap", compact && "max-md:px-2.25 max-md:whitespace-normal max-md:py-0.75 max-md:text-[0.71875rem]")}
                    />
                  ))}
                </span>
                <span className={cn("mt-auto font-semibold underline underline-offset-3", compact && "max-md:text-sm")}>
                  {link} <span aria-hidden="true">→</span>
                </span>
              </span>
              {wide && (
                <span className="flex self-center max-md:hidden">
                  <Glyph kind={t.glyph} />
                </span>
              )}
            </Link>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}
