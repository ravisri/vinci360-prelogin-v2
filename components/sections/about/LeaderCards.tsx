import { Mail, User } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { PlaceholderInline } from "@/components/sections/PlaceholderBlock"
import { aboutPage } from "@/content/about"
import { cn } from "@/lib/utils"

const team = aboutPage.team

/** "Leadership" (#team): two cards whose name, role, bio and email stay placeholders; the avatar slot waits for confirmed initials. */
export function LeaderCards({ className }: { className?: string }) {
  return (
    <section id="team" aria-labelledby="team-h" className={cn("container-site flex scroll-mt-22 flex-col gap-3 pt-10 md:gap-6 lg:pt-24", className)}>
      <Reveal>
        <h2 id="team-h" className="text-h3 md:text-h2">
          {team.title}
        </h2>
      </Reveal>
      <Reveal>
        <ul className="grid gap-3 md:grid-cols-2 md:gap-5">
          {team.leaders.map((l, i) => (
            <li key={i} className="flex items-start gap-3.5 rounded-lg bg-card p-4.5 shadow-card md:gap-4.5 md:p-6">
              <span
                aria-hidden="true"
                className="grid size-14 flex-none place-items-center rounded-full border-2 border-dashed border-placeholder-border bg-placeholder text-placeholder-foreground md:size-16"
              >
                <User strokeWidth={1.8} className="size-6" />
              </span>
              <div className="flex min-w-0 flex-col gap-1.5 md:gap-2">
                <h3 className="text-lg font-extrabold md:text-[1.3125rem]">
                  <PlaceholderInline>{l.name}</PlaceholderInline>
                </h3>
                <p className="font-semibold text-primary-700">
                  <PlaceholderInline>{l.role}</PlaceholderInline>
                </p>
                <p>
                  <PlaceholderInline>{l.bio}</PlaceholderInline>
                </p>
                <p className="flex items-center gap-2 text-[0.90625rem]">
                  <Mail aria-hidden="true" strokeWidth={2} className="hidden size-4 text-primary-700 md:block" />
                  <PlaceholderInline>{l.email}</PlaceholderInline>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
      <p className="text-[0.8125rem] text-muted-foreground md:text-[0.84375rem]">{team.note}</p>
    </section>
  )
}
