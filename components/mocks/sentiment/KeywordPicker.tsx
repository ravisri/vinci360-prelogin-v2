"use client"

import { useId, useRef, useState, type KeyboardEvent } from "react"
import { ChartColumn, Gauge, Hash, KeyRound, Layers, Newspaper, PieChart, Search, Smile, Users, type LucideIcon } from "lucide-react"

import { useSentimentState } from "@/components/mocks/sentiment/SentimentStateProvider"
import { SampleDataChip } from "@/components/mocks/SampleDataChip"
import { fmt } from "@/components/mocks/home/kpi"
import { sentimentPartB } from "@/content/features/sentiment-keywords"
import { networks, sentiment, type SentimentKeywordId } from "@/content/sample-data"
import { sentimentGlyph } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

const c = sentimentPartB
const ids = sentiment.keywordOrder
const kw = sentiment.keywords

const icons: Record<(typeof c.widgets)[number]["id"], LucideIcon> = {
  kpis: Gauge,
  platforms: ChartColumn,
  sentiment: Smile,
  articles: Newspaper,
  trending: Hash,
  topics: Layers,
  hashtagSentiment: Hash,
  categories: PieChart,
  handles: Users,
}

/** One-line value per widget for the selected keyword, as in the reference grid. */
function widgetValue(id: (typeof c.widgets)[number]["id"], k: SentimentKeywordId) {
  const K = kw[k]
  const strong = K.platforms[K.strong]
  const v = c.widgetValues
  switch (id) {
    case "kpis":
      return `${fmt(K.kpis[0].value)} ${v.mentions}`
    case "platforms":
      return `${networks[strong.network]} ${strong.share}%`
    case "sentiment":
      return `${sentimentGlyph.pos} ${K.split[0]}% ${v.positive}`
    case "articles":
      return `${fmt(K.kpis[4].value)} ${v.posts}`
    case "trending":
      return K.hashtags[0].tag
    case "topics":
      return K.topics[0].name
    case "hashtagSentiment":
      return `${K.hashtags[3].tag} ${sentimentGlyph[K.hashtags[3].sentiment]}`
    case "categories":
      return `${K.categories[0].name} ${K.categories[0].share}%`
    case "handles":
      return v.optional
  }
}

const chipClass = (on: boolean) =>
  cn(
    "inline-flex min-h-11 flex-none cursor-pointer items-center rounded-full border px-3.5 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:px-4",
    on ? "border-sent-text bg-sent-tint font-bold text-sent-text" : "border-sent-200 bg-card font-medium text-foreground hover:border-sent-text",
  )

/**
 * Part B keyword picker: a combobox (type to filter, arrow keys + Enter to pick, Escape to close),
 * quick-pick chips, and the nine widgets the page holds, each showing its value for the keyword.
 * 390: chips scroll sideways and six widgets sit in two columns.
 */
export function KeywordPicker() {
  const { keyword, setKeyword } = useSentimentState()
  const [query, setQuery] = useState<string>(kw[keyword].name)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const uid = useId()
  const listId = `${uid}-list`
  const optionId = (id: string) => `${uid}-opt-${id}`

  const q = query.toLowerCase().trim()
  const matches = ids.filter((id) => !q || kw[id].name.toLowerCase().includes(q))
  const K = kw[keyword]

  const pick = (id: SentimentKeywordId) => {
    setKeyword(id)
    setQuery(kw[id].name)
    setOpen(false)
  }
  const openList = () => {
    setQuery("")
    setActive(Math.max(0, ids.indexOf(keyword)))
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
    setQuery(kw[keyword].name)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      if (!open) return openList()
      if (!matches.length) return
      setActive((i) => (i + (e.key === "ArrowDown" ? 1 : -1) + matches.length) % matches.length)
    } else if (e.key === "Enter" && open && matches[active]) {
      e.preventDefault()
      pick(matches[active])
    } else if (e.key === "Escape" && open) {
      e.preventDefault()
      close()
    }
  }

  return (
    <div className="flex flex-col gap-3.5 md:gap-5.5 md:rounded-lg md:border md:border-border md:bg-card md:p-7">
      <div className="flex flex-col gap-x-7 gap-y-4 md:flex-row md:flex-wrap md:items-end">
        {/* Combobox (desktop; the 390 reference offers the sample chips only). */}
        <div className="relative max-w-130 min-w-0 flex-[1_1_360px] max-md:hidden">
          <label htmlFor={`${uid}-input`} className="mb-1.5 block text-xs font-semibold tracking-[0.03em] text-neutral-text uppercase">
            {c.picker.label}
          </label>
          <Search aria-hidden="true" strokeWidth={2} className="pointer-events-none absolute bottom-4 left-3.5 size-5 text-sent-text" />
          <input
            ref={inputRef}
            id={`${uid}-input`}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open && matches[active] ? optionId(matches[active]) : undefined}
            value={query}
            placeholder={c.picker.placeholder}
            onFocus={openList}
            onBlur={close}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
              setOpen(true)
            }}
            onKeyDown={onKeyDown}
            className="h-13 w-full rounded-lg border-[1.5px] border-sent-text bg-card pr-4 pl-11 text-base font-medium placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          <ul
            id={listId}
            role="listbox"
            aria-label={c.picker.listLabel}
            hidden={!open}
            className="absolute inset-x-0 top-full z-20 mt-1.5 flex flex-col rounded-lg bg-card p-1.5 shadow-float"
          >
            {matches.map((id, i) => (
              <li
                key={id}
                id={optionId(id)}
                role="option"
                aria-selected={keyword === id}
                // mousedown, not click: keeps focus in the input so blur doesn't close the list first.
                onMouseDown={(e) => {
                  e.preventDefault()
                  pick(id)
                }}
                onMouseMove={() => setActive(i)}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-sm px-3 text-[0.9375rem] font-medium",
                  i === active && "bg-sent-tint",
                  keyword === id && "font-bold",
                )}
              >
                <KeyRound aria-hidden="true" strokeWidth={2} className="size-4 text-sent-text" />
                {kw[id].name}
                <span className="ml-auto text-xs font-normal text-muted-foreground">{kw[id].kind}</span>
              </li>
            ))}
            {!matches.length && <li className="p-3 text-sm text-muted-foreground">{c.picker.none}</li>}
          </ul>
        </div>

        <div
          role="group"
          aria-label={c.picker.quickPicks}
          className="scrollbar-none flex gap-2 max-md:-mx-6 max-md:overflow-x-auto max-md:px-6 max-md:pt-0.5 max-md:pb-1.5 md:flex-wrap"
        >
          {ids.map((id) => (
            <button key={id} type="button" aria-pressed={keyword === id} onClick={() => pick(id)} className={chipClass(keyword === id)}>
              {kw[id].name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2.5 max-md:hidden">
        <p className="text-[0.9375rem]">
          {c.picker.now} <strong className="text-sent-text">{K.name}</strong> <span className="text-muted-foreground">· {K.kind}</span>
        </p>
        <SampleDataChip tone="light" />
      </div>

      <ul aria-live="polite" className="grid grid-cols-2 gap-2 tabular md:gap-3.5 lg:grid-cols-3">
        {c.widgets.map((w) => {
          const Icon = icons[w.id]
          const value = widgetValue(w.id, keyword)
          const hot = w.id === "platforms"
          return (
            <li
              key={w.id}
              className={cn(
                "flex items-start gap-2 rounded-lg border bg-card p-2.5 md:gap-3.5 md:border-border md:p-4",
                hot ? "border-[1.5px] border-sent-text md:border" : "border-border",
                !w.mobile && "max-md:hidden",
              )}
            >
              <span aria-hidden="true" className="flex-none text-sent-text md:grid md:size-11 md:place-items-center md:rounded-lg md:bg-ink md:text-chart-3">
                <Icon strokeWidth={2} className="size-4.5 md:size-5.5" />
              </span>
              <span className="min-w-0 text-[0.78125rem] md:text-sm">
                <strong className="block md:text-[0.9375rem]">
                  <span className="md:hidden">{w.mobile}</span>
                  <span className="max-md:hidden">{w.name}</span>
                </strong>
                <span className="block text-[0.84375rem] text-muted-foreground max-md:hidden">{w.desc}</span>
                <span className="block md:mt-1 md:font-bold">{value}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
