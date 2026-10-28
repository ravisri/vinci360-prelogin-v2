"use client"

import { useId } from "react"

/** Unique, url()-safe id for one chart's hatch pattern. */
export function useHatchId() {
  return `hatch-${useId().replace(/[^a-zA-Z0-9]/g, "")}`
}

/**
 * SVG twin of the `hatch-neg` utility: 3px stripes every 7px over the negative fill.
 * Every negative bar uses it, so negative never relies on colour alone.
 */
export function HatchPattern({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)">
        <rect width="7" height="7" className="fill-neg-fill" />
        <rect width="3" height="7" className="fill-neg-hatch" />
      </pattern>
    </defs>
  )
}
