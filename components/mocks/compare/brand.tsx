import { brands } from "@/content/sample-data"
import { cn } from "@/lib/utils"

export type BrandKey = keyof typeof brands
export const brandKeys: readonly BrandKey[] = ["aurora", "nimbus", "kestrel"]

type BrandStyle = {
  /** Fills on dark frames (series colours). */
  bg: string
  fill: string
  stroke: string
  /** Text on dark frames. */
  text: string
  /** Marker and text on light backgrounds (text-safe shades). */
  bgLight: string
  textLight: string
  strokeLight: string
  /** Line style: Aurora solid, Nimbus dashed, Kestrel dotted, so series never rely on colour. */
  dash?: string
  shape: "circle" | "square" | "triangle"
}

/**
 * Brand encoding across the Brand Compare page, as in its reference: colour + marker shape + line
 * style. Aurora = sky / circle / solid, Nimbus = orange / square / dashed, Kestrel = violet /
 * triangle / dotted. Literal class strings so Tailwind sees them.
 */
export const brandStyle: Record<BrandKey, BrandStyle> = {
  aurora: {
    bg: "bg-chart-6",
    fill: "fill-chart-6",
    stroke: "stroke-chart-6",
    text: "text-chart-6",
    bgLight: "bg-cmp-text",
    textLight: "text-cmp-text",
    strokeLight: "stroke-cmp-text",
    shape: "circle",
  },
  nimbus: {
    bg: "bg-chart-2",
    fill: "fill-chart-2",
    stroke: "stroke-chart-2",
    text: "text-chart-2",
    bgLight: "bg-trends-text",
    textLight: "text-trends-text",
    strokeLight: "stroke-trends-text",
    dash: "8 5",
    shape: "square",
  },
  kestrel: {
    bg: "bg-chart-3",
    fill: "fill-chart-3",
    stroke: "stroke-chart-3",
    text: "text-chart-3",
    bgLight: "bg-sent-text",
    textLight: "text-sent-text",
    strokeLight: "stroke-sent-text",
    dash: "2 5",
    shape: "triangle",
  },
}

const shapeClass = {
  circle: "rounded-full",
  square: "rounded-[2px]",
  triangle: "[clip-path:polygon(50%_0,100%_100%,0_100%)]",
} as const

/** HTML marker (circle, square or triangle) in the brand colour. Decorative: the name always sits beside it. */
export function BrandMarker({ brand, tone = "dark", className }: { brand: BrandKey; tone?: "dark" | "light"; className?: string }) {
  const s = brandStyle[brand]
  return <span aria-hidden="true" className={cn("inline-block size-2.5 flex-none", shapeClass[s.shape], tone === "dark" ? s.bg : s.bgLight, className)} />
}

/** SVG marker centred on (x, y). */
export function SvgMarker({ brand, x = 0, y = 0, r = 5, className }: { brand: BrandKey; x?: number; y?: number; r?: number; className?: string }) {
  const s = brandStyle[brand]
  const cls = cn(s.fill, className)
  if (s.shape === "circle") return <circle cx={x} cy={y} r={r} className={cls} />
  if (s.shape === "square") return <rect x={x - r * 0.9} y={y - r * 0.9} width={r * 1.8} height={r * 1.8} rx={1} className={cls} />
  return <polygon points={`${x},${y - r * 1.1} ${x + r * 1.1},${y + r * 0.9} ${x - r * 1.1},${y + r * 0.9}`} className={cls} />
}

/** Short line in the brand's line style, for legends. */
export function LineSwatch({ brand, tone = "dark", className }: { brand: BrandKey; tone?: "dark" | "light"; className?: string }) {
  const s = brandStyle[brand]
  return (
    <svg aria-hidden="true" viewBox="0 0 24 6" className={cn("h-1.5 w-6 flex-none overflow-visible", className)}>
      <line
        x1="1"
        x2="23"
        y1="3"
        y2="3"
        strokeWidth={brand === "aurora" ? 3 : 2.5}
        strokeDasharray={brand === "nimbus" ? "6 4" : brand === "kestrel" ? "1 4" : undefined}
        strokeLinecap={brand === "kestrel" ? "round" : "butt"}
        className={tone === "dark" ? s.stroke : s.strokeLight}
      />
    </svg>
  )
}

type BrandLegendProps = {
  /** swatch = line + marker + name (desktop) · marker = marker + name (390 frames). */
  variant?: "swatch" | "marker" | "line"
  tone?: "dark" | "light"
  /** Full names ("Aurora Mobile (you)") instead of short ones. */
  full?: boolean
  label?: string
  className?: string
}

/** "Aurora · Nimbus · Kestrel" legend; sits beside or below a chart, never over it. */
export function BrandLegend({ variant = "swatch", tone = "dark", full, label, className }: BrandLegendProps) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs font-bold", className)}>
      {brandKeys.map((b) => {
        const s = brandStyle[b]
        return (
          <li key={b} className={cn("flex items-center gap-1.5", tone === "dark" ? s.text : s.textLight)}>
            {variant !== "marker" && <LineSwatch brand={b} tone={tone} />}
            {variant !== "line" && <BrandMarker brand={b} tone={tone} />}
            {full ? (b === "aurora" ? `${brands.aurora.name} (you)` : brands[b].name) : brands[b].short}
          </li>
        )
      })}
    </ul>
  )
}

/** Whole-number shares that always add up to 100 (largest remainder). */
export function largestRemainder(values: readonly number[]): number[] {
  const total = values.reduce((a, b) => a + b, 0)
  if (!total) return values.map(() => 0)
  const exact = values.map((v) => (v / total) * 100)
  const floors = exact.map(Math.floor)
  let left = 100 - floors.reduce((a, b) => a + b, 0)
  const order = exact.map((v, i) => [v - Math.floor(v), i] as const).sort((a, b) => b[0] - a[0])
  for (const [, i] of order) {
    if (left <= 0) break
    floors[i] += 1
    left -= 1
  }
  return floors
}

/** Position of an index value on the 50–130 track, in %. */
export const indexPct = (v: number, min = 50, max = 130) => ((v - min) / (max - min)) * 100
