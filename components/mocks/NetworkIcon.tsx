import type { Network } from "@/content/sample-data"
import { cn } from "@/lib/utils"

/** Simplified stroke glyphs (lucide ships no brand icons). Decorative: the network name is always in text nearby. */
const glyphs: Record<Network, React.ReactNode> = {
  facebook: <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />,
  x: (
    <>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" />
    </>
  ),
}

export function NetworkIcon({ network, className }: { network: Network; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 flex-none", className)}
    >
      {glyphs[network]}
    </svg>
  )
}

/** A network glyph shaped like a lucide icon, for icon slots such as BenefitList. */
export const networkGlyph = (network: Network) => {
  function Glyph({ className }: { className?: string; strokeWidth?: number; "aria-hidden"?: boolean | "true" | "false" }) {
    return <NetworkIcon network={network} className={className} />
  }
  Glyph.displayName = `NetworkGlyph(${network})`
  return Glyph
}
