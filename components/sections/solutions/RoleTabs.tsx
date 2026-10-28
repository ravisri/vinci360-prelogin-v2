"use client"

import { useOptimistic, useRef, useTransition, type KeyboardEvent, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Check } from "lucide-react"

import { rolePanelId, roleTabId, type RoleKey } from "@/content/solutions"
import { cn } from "@/lib/utils"

/**
 * Replaces `?role=` without a scroll jump; the server re-renders the panel for the new role.
 * `selected` shows the new role at once and settles on `active` when the navigation lands.
 */
function useRoleNav(active: RoleKey) {
  const router = useRouter()
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()
  const [selected, setSelected] = useOptimistic(active)
  const go = (key: RoleKey) =>
    startTransition(() => {
      setSelected(key)
      router.replace(`${pathname}?role=${key}`, { scroll: false })
    })
  return { go, pending, selected }
}

type TabItem = { key: RoleKey; label: string; initial: string; question: string }

/**
 * "Choose your role": four role cards as a tablist (←/→/Home/End move and select, roving tabindex).
 * The selection shows at once; the panel below is a server component that follows `?role=`.
 * Below md the row scrolls sideways inside itself and sticks under the header.
 */
export function RoleTabs({ label, items, active }: { label: string; items: readonly TabItem[]; active: RoleKey }) {
  const { go, pending, selected } = useRoleNav(active)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number) => {
    if (items[i].key !== selected) go(items[i].key)
  }

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const n = items.length
    const next = { ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, ArrowLeft: (i + n - 1) % n, ArrowUp: (i + n - 1) % n, Home: 0, End: n - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    refs.current[next]?.focus()
    select(next)
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      aria-busy={pending || undefined}
      className={cn(
        "flex gap-2.5 max-md:sticky max-md:top-16 max-md:z-20 max-md:-mx-6 max-md:scrollbar-none max-md:overflow-x-auto max-md:border-b max-md:border-border max-md:bg-background max-md:px-6 max-md:py-3",
        "md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4",
      )}
    >
      {items.map((item, i) => {
        const on = item.key === selected
        return (
          <button
            key={item.key}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={roleTabId(item.key)}
            aria-selected={on}
            aria-controls={rolePanelId}
            tabIndex={on ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "group flex min-h-11 flex-none cursor-pointer flex-col items-start gap-1 rounded-lg border border-border bg-card p-3 text-left text-foreground shadow-card transition-[transform,box-shadow,background-color] duration-200 hover:border-primary motion-reduce:transition-none",
              "max-md:w-56 md:gap-2.5 md:p-5",
              "aria-selected:border-primary aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:shadow-float md:aria-selected:-translate-y-1.5",
            )}
          >
            <span className="flex w-full items-center justify-between gap-2">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-lg bg-primary-tint font-heading text-base font-extrabold text-primary max-md:hidden group-aria-selected:bg-primary-foreground"
              >
                {item.initial}
              </span>
              <span className="font-heading text-[0.9375rem] leading-tight font-semibold group-aria-selected:font-extrabold md:hidden">{item.label}</span>
              <span
                aria-hidden="true"
                className="hidden size-5 flex-none place-items-center rounded-full bg-primary-foreground text-primary group-aria-selected:grid md:size-6.5"
              >
                <Check strokeWidth={3} className="size-3.5 md:size-4" />
              </span>
            </span>
            <span className="font-heading text-[1.1875rem] leading-tight font-semibold group-aria-selected:font-extrabold max-md:hidden">{item.label}</span>
            <span className="text-[0.8125rem] text-muted-foreground group-aria-selected:text-primary-foreground md:text-[0.90625rem]">“{item.question}”</span>
          </button>
        )
      })}
    </div>
  )
}

/** Column-header button in "Who uses what": opens that role in the panel above and scrolls to it. */
export function RoleSwitchButton({ role, pressed, children, className }: { role: RoleKey; pressed: boolean; children: ReactNode; className?: string }) {
  const { go } = useRoleNav(role)
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => {
        if (!pressed) go(role)
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        document.getElementById("roles")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
      }}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-sm border border-border bg-card px-3 text-sm font-semibold text-foreground hover:border-primary",
        "aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground",
        className,
      )}
    >
      {children}
    </button>
  )
}
