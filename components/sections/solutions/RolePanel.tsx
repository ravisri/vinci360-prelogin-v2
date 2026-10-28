import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { FirstHourMock } from "@/components/mocks/solutions/FirstHourMock"
import { MountFade } from "@/components/motion/MountFade"
import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { MiniBars } from "@/components/sections/solutions/MiniBars"
import { featureRefs, rolePanelId, roleTabId, solutionsPage, weekDays, type Role } from "@/content/solutions"
import { accents } from "@/lib/accents"
import { cn } from "@/lib/utils"

const copy = solutionsPage.roles

/** Toolkit grid: one column per tool from xl (the reference sizes it to the role's 3 or 4 tools). */
const toolkitCols = { 3: "xl:grid-cols-3", 4: "xl:grid-cols-4" } as const

/**
 * The selected role's panel, rendered on the server from `?role=` so every word is crawlable:
 * questions, toolkit, first-hour view, a week with Vinci360 and what you get. Keyed by role, so a
 * switch cross-fades the panel in and its charts and counters animate again.
 */
export function RolePanel({ role }: { role: Role }) {
  return (
    <div id={rolePanelId} role="tabpanel" aria-labelledby={roleTabId(role.key)} tabIndex={0} className="rounded-lg pt-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
      <MountFade key={role.key} className="flex flex-col gap-7 md:gap-11">
        <div className="flex flex-col gap-2.5 md:gap-3.5">
          <h3 className="text-lg font-extrabold md:text-[1.375rem]">
            {copy.questions} <span className="text-[0.9375rem] font-medium text-muted-foreground max-md:hidden">· {role.sub}</span>
          </h3>
          <ul className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-2.5">
            {role.questions.map((q) => (
              <li
                key={q}
                className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-2.5 pr-4.5 pl-2.5 text-[0.9375rem] font-semibold md:py-3 md:text-base"
              >
                <span aria-hidden="true" className="grid size-7 flex-none place-items-center rounded-full bg-primary-tint font-heading text-sm font-extrabold text-primary">
                  ?
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2.5 md:gap-3.5">
          <h3 className="text-lg font-extrabold md:text-[1.375rem]">{copy.toolkit}</h3>
          <Stagger as="ul" className={cn("grid gap-2 md:grid-cols-2 md:gap-4", toolkitCols[role.toolkit.length as 3 | 4])}>
            {role.toolkit.map((t) => {
              const f = featureRefs[t.feature]
              return (
                <StaggerItem as="li" key={t.feature} className="flex flex-col gap-1 rounded-lg bg-card p-3.5 shadow-card md:gap-3 md:p-6">
                  <span className="flex items-center gap-2 font-bold">
                    <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", accents[t.feature].fill)} />
                    {f.name}
                  </span>
                  <MiniBars bars={f.bars} className="h-12 max-md:hidden" />
                  <p className="text-sm text-muted-foreground md:text-[0.90625rem]">{t.use}</p>
                  <Link href={f.href} className="mt-auto inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary-700 no-underline hover:underline md:text-[0.90625rem]">
                    {copy.learnMore}
                    <span className="sr-only"> about {f.name}</span>
                    <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
                  </Link>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>

        <div className="flex flex-col gap-2.5 md:gap-3.5">
          <h3 className="text-lg font-extrabold md:text-[1.375rem]">{copy.firstHour}</h3>
          <FirstHourMock role={role} />
        </div>

        <div className="flex flex-col gap-2.5 md:gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-lg font-extrabold md:text-[1.375rem]">{copy.week}</h3>
            <span className="inline-flex items-center gap-2 text-[0.8125rem] text-muted-foreground md:text-sm">
              <span aria-hidden="true" className="grid size-7.5 place-items-center rounded-lg bg-primary-tint font-heading text-[0.6875rem] font-extrabold text-primary md:size-8 md:text-xs">
                {role.persona.initials}
              </span>
              {role.persona.title}
              <span className="rounded-full bg-neutral-tint px-2.5 py-1 text-[0.6875rem] leading-[1.3] font-semibold text-neutral-text max-md:hidden">{role.persona.chip}</span>
            </span>
          </div>
          <Stagger
            as="ol"
            className="relative grid gap-4 before:absolute before:top-5.5 before:bottom-5.5 before:left-5.5 before:w-0.5 before:bg-primary-200 md:grid-cols-5 md:gap-3 md:before:inset-x-6 md:before:top-5.5 md:before:bottom-auto md:before:h-0.5 md:before:w-auto"
          >
            {role.week.map((text, i) => (
              <StaggerItem as="li" key={text} className="relative flex items-center gap-3 md:flex-col md:items-start md:px-1">
                <span className="grid size-11.5 flex-none place-items-center rounded-full bg-primary font-heading text-[0.8125rem] font-extrabold text-primary-foreground ring-5 ring-background">
                  {weekDays[i]}
                </span>
                <span className="text-[0.90625rem] md:text-[0.9375rem]">{text}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="flex flex-col gap-2.5 md:gap-3.5">
          <h3 className="text-lg font-extrabold md:text-[1.375rem]">{copy.get}</h3>
          <ul className="grid gap-5 lg:grid-cols-3">
            <li className="flex flex-col gap-2.5 rounded-lg bg-primary p-5 text-primary-foreground md:min-h-42.5 md:p-6.5">
              <Check aria-hidden="true" strokeWidth={2} className="size-7" />
              <p className="font-heading text-xl leading-[1.3] font-extrabold md:text-[1.375rem] md:leading-[1.25]">{role.outcome}</p>
            </li>
            {role.tiles.map((t, i) => (
              <li key={t.title} className={cn("flex flex-col gap-2.5 rounded-lg p-6.5 max-md:hidden md:min-h-42.5", i === 0 ? "bg-primary-tint" : "bg-neutral-tint")}>
                <p className="font-heading text-[1.1875rem] leading-[1.3] font-extrabold">{t.title}</p>
                <p className="text-[0.9375rem] text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </MountFade>
    </div>
  )
}
