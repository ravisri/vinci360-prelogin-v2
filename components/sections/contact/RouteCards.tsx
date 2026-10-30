"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Check, Lock, MessageSquare, Play, Users } from "lucide-react"

import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "@/components/ui/radio-group"
import { contactRoutes, type ContactTopic } from "@/content/contact"
import { cn } from "@/lib/utils"

const icons = { play: Play, lock: Lock, users: Users, message: MessageSquare } as const

/** A topic request from a routing card; `n` changes on every pick so the same topic can be re-applied. */
type TopicRequest = { topic: ContactTopic; n: number } | null

const TopicContext = createContext<{ request: TopicRequest; pick: (topic: ContactTopic) => void }>({ request: null, pick: () => {} })

/** Shares the topic picked on a routing card with the contact form below it. */
export function ContactTopicProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<TopicRequest>(null)
  const pick = (topic: ContactTopic) => setRequest((r) => ({ topic, n: (r?.n ?? 0) + 1 }))
  return <TopicContext.Provider value={{ request, pick }}>{children}</TopicContext.Provider>
}

export const useContactTopic = () => useContext(TopicContext).request

/** "What do you need?": four routing cards (radio group: arrows move, the card's action links on). */
export function RouteCards({ className }: { className?: string }) {
  const { pick } = useContext(TopicContext)
  const [route, setRoute] = useState(contactRoutes.items[0].id)

  return (
    <section aria-labelledby="need-h" className={cn("container-site flex flex-col gap-5", className)}>
      <h2 id="need-h" className="text-[1.375rem] md:text-h3">
        {contactRoutes.title}
      </h2>
      <RadioGroup value={route} onValueChange={setRoute} aria-labelledby="need-h" className="grid gap-2.5 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {contactRoutes.items.map((r) => {
          const Icon = icons[r.icon]
          const on = r.id === route
          return (
            <div
              key={r.id}
              className={cn(
                "flex flex-col gap-4 rounded-lg border bg-card p-5 transition-shadow md:p-6",
                on ? "border-primary shadow-card" : "border-border",
              )}
            >
              <RadioGroupItem value={r.id} className="flex min-h-11 cursor-pointer flex-col items-start gap-2 rounded-sm text-left">
                <span className="flex w-full items-start justify-between">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-lg bg-primary-tint text-primary">
                    <Icon strokeWidth={2} className="size-5.5" />
                  </span>
                  <RadioGroupIndicator className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check aria-hidden="true" strokeWidth={3.2} className="size-3.5" />
                  </RadioGroupIndicator>
                </span>
                <span className={cn("font-heading text-lg leading-tight", on ? "font-extrabold" : "font-bold")}>{r.title}</span>
                <span className="text-[0.90625rem] text-neutral-text">{r.text}</span>
              </RadioGroupItem>
              <div className="mt-auto flex flex-col items-start gap-2">
                {r.href ? (
                  <Button asChild variant="outline">
                    <Link href={r.href}>
                      {r.button}
                      <ArrowRight aria-hidden="true" strokeWidth={2} />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <a
                      href="#form"
                      onClick={() => {
                        setRoute(r.id)
                        if (r.topic) pick(r.topic)
                      }}
                    >
                      {r.button}
                      <ArrowRight aria-hidden="true" strokeWidth={2} />
                    </a>
                  </Button>
                )}
                {r.placeholder && <PlaceholderInline className="text-[0.71875rem]">{r.placeholder}</PlaceholderInline>}
              </div>
            </div>
          )
        })}
      </RadioGroup>
    </section>
  )
}
