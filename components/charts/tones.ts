/** Chart colours as literal token classes (Tailwind must see each one). Never raw hex. */
export type ChartTone =
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "chart-6"
  | "pos"
  | "neu"
  | "neg"
  | "neg-dark"
  | "muted"
  | "on-dark-focus"
  | "smi"
  | "trends"
  | "sent"
  | "cmp"
  | "stories"
  | "reports"
  | "channels"
  | "cmp-text"
  | "cmp-200"
  | "sent-text"
  | "sent-200"
  | "sent-300"

type ToneClasses = { fill: string; stroke: string; text: string; bg: string }

export const tones: Record<ChartTone, ToneClasses> = {
  "chart-1": { fill: "fill-chart-1", stroke: "stroke-chart-1", text: "text-chart-1", bg: "bg-chart-1" },
  "chart-2": { fill: "fill-chart-2", stroke: "stroke-chart-2", text: "text-chart-2", bg: "bg-chart-2" },
  "chart-3": { fill: "fill-chart-3", stroke: "stroke-chart-3", text: "text-chart-3", bg: "bg-chart-3" },
  "chart-4": { fill: "fill-chart-4", stroke: "stroke-chart-4", text: "text-chart-4", bg: "bg-chart-4" },
  "chart-5": { fill: "fill-chart-5", stroke: "stroke-chart-5", text: "text-chart-5", bg: "bg-chart-5" },
  "chart-6": { fill: "fill-chart-6", stroke: "stroke-chart-6", text: "text-chart-6", bg: "bg-chart-6" },
  pos: { fill: "fill-pos-fill", stroke: "stroke-pos-fill", text: "text-pos", bg: "bg-pos-fill" },
  neu: { fill: "fill-neu-fill", stroke: "stroke-neu-fill", text: "text-neu", bg: "bg-neu-fill" },
  neg: { fill: "fill-neg-fill", stroke: "stroke-neg-fill", text: "text-neg", bg: "bg-neg-fill" },
  "neg-dark": { fill: "fill-neg-dark", stroke: "stroke-neg-dark", text: "text-neg-dark", bg: "bg-neg-dark" },
  muted: { fill: "fill-muted-foreground", stroke: "stroke-muted-foreground", text: "text-muted-foreground", bg: "bg-muted-foreground" },
  "on-dark-focus": { fill: "fill-on-dark-focus", stroke: "stroke-on-dark-focus", text: "text-on-dark-focus", bg: "bg-on-dark-focus" },
  smi: { fill: "fill-smi", stroke: "stroke-smi", text: "text-smi-text", bg: "bg-smi" },
  trends: { fill: "fill-trends", stroke: "stroke-trends", text: "text-trends-text", bg: "bg-trends" },
  sent: { fill: "fill-sent", stroke: "stroke-sent", text: "text-sent-text", bg: "bg-sent" },
  cmp: { fill: "fill-cmp", stroke: "stroke-cmp", text: "text-cmp-text", bg: "bg-cmp" },
  stories: { fill: "fill-stories", stroke: "stroke-stories", text: "text-stories-text", bg: "bg-stories" },
  reports: { fill: "fill-reports", stroke: "stroke-reports", text: "text-reports-text", bg: "bg-reports" },
  channels: { fill: "fill-channels", stroke: "stroke-channels", text: "text-channels-text", bg: "bg-channels" },
  "cmp-text": { fill: "fill-cmp-text", stroke: "stroke-cmp-text", text: "text-cmp-text", bg: "bg-cmp-text" },
  "cmp-200": { fill: "fill-cmp-200", stroke: "stroke-cmp-200", text: "text-cmp-text", bg: "bg-cmp-200" },
  "sent-text": { fill: "fill-sent-text", stroke: "stroke-sent-text", text: "text-sent-text", bg: "bg-sent-text" },
  "sent-200": { fill: "fill-sent-200", stroke: "stroke-sent-200", text: "text-sent-text", bg: "bg-sent-200" },
  "sent-300": { fill: "fill-sent-300", stroke: "stroke-sent-300", text: "text-sent-text", bg: "bg-sent-300" },
}

/** Line / polyline path through points. */
export function linePath(points: readonly (readonly [number, number])[]) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")
}
