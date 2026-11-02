/** One dot per feature area: seven areas, one view. Literal classes so Tailwind picks them up. */
const waveDots = ["bg-smi", "bg-trends", "bg-sent", "bg-cmp", "bg-stories", "bg-reports", "bg-channels"]

/**
 * Route loader for marketing pages: the vinci360° app mark with its ° orbiting a full 360°, a soft
 * "listening" signal behind it and a seven-dot wave. CSS-only; fades in after 150ms so fast
 * navigations never flash it; rests on a static mark under reduced motion.
 */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="container-site grid min-h-[70vh] animate-loader-in place-items-center">
      <div aria-hidden className="flex flex-col items-center">
        <div className="relative grid size-40 place-items-center">
          <div className="absolute inset-4 rounded-full bg-primary-tint opacity-70 blur-2xl" />
          <div className="absolute size-24 animate-signal rounded-full border border-primary-200" />
          <div className="absolute size-24 animate-signal rounded-full border border-primary-200 [animation-delay:-1.2s]" />

          {/* App mark: the "V" from the favicon on an ink tile. */}
          <div className="relative grid size-18 animate-mark-breathe place-items-center rounded-2xl bg-ink shadow-float">
            <svg viewBox="4 14 44 44" className="size-12 fill-white">
              <path d="M8 20h11.5L26 38.5 32.5 20H44L31.5 52h-11z" />
            </svg>
          </div>

          {/* The ° leaves the mark and travels 360° around it, starting and ending top-right. */}
          <div className="absolute size-28 rotate-45">
            <div className="size-full animate-mark-orbit">
              <span className="absolute top-0 left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-primary bg-background" />
            </div>
          </div>
        </div>

        <p className="mt-2 font-heading text-[1.4375rem] leading-none font-extrabold tracking-[-0.02em] text-foreground">
          vinci360<span className="text-primary">°</span>
        </p>

        <div className="mt-5 flex h-3 items-end gap-1.5">
          {waveDots.map((dot, i) => (
            <span key={dot} className={`size-1.5 animate-wave rounded-full ${dot}`} style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  )
}
