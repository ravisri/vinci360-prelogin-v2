import { ArrowUp } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { RoleSwitchButton } from "@/components/sections/solutions/RoleTabs"
import { featureOrder, featureRefs, levels, matrix, roleKeys, roles, solutionsPage, type Level, type RoleKey } from "@/content/solutions"
import { accents } from "@/lib/accents"
import { cn } from "@/lib/utils"

const copy = solutionsPage.matrix

/** ● / ◐ / ○ mark plus the level in words, so the matrix never relies on the glyph alone. */
function LevelMark({ level }: { level: Level }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="text-base leading-none text-primary">
        {levels[level].glyph}
      </span>
      {levels[level].label}
    </span>
  )
}

function FeatureName({ accent }: { accent: (typeof featureOrder)[number] }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", accents[accent].fill)} />
      {featureRefs[accent].name}
    </span>
  )
}

/**
 * "Who uses what": role × feature matrix. Desktop = semantic table whose column headers open that
 * role above; below md = one stacked card per role. Rows / cards reveal in a stagger.
 */
export function RoleMatrix({ active }: { active: RoleKey }) {
  return (
    <>
      <div className="max-md:hidden">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-lg bg-card text-[0.90625rem] shadow-card">
          <caption className="caption-bottom pt-3.5 text-left text-[0.9375rem] font-semibold">{copy.caption}</caption>
          <thead>
            <tr className="[&>th]:border-b [&>th]:border-muted [&>th]:px-4 [&>th]:py-3 [&>th]:text-left [&>th]:text-[0.8125rem] [&>th]:text-neutral-text">
              <th scope="col">{copy.feature}</th>
              {roleKeys.map((k) => (
                <th key={k} scope="col">
                  <RoleSwitchButton role={k} pressed={k === active}>
                    {roles[k].label}
                    <span className="sr-only">
                      {" "}
                      ({copy.openRole} {roles[k].label} {copy.openRoleEnd})
                    </span>
                    <ArrowUp aria-hidden="true" strokeWidth={2.4} className="size-3.5" />
                  </RoleSwitchButton>
                </th>
              ))}
            </tr>
          </thead>
          <Stagger as="tbody" delay={0.06}>
            {featureOrder.map((f) => (
              <StaggerItem
                as="tr"
                key={f}
                className="hover:[&>*]:bg-neutral-tint [&>*]:border-b [&>*]:border-muted [&>*]:px-4 [&>*]:py-3 [&>*]:text-left last:[&>*]:border-b-0"
              >
                <th scope="row" className="font-semibold whitespace-nowrap">
                  <FeatureName accent={f} />
                </th>
                {matrix[f].map((lv, c) => (
                  <td key={roleKeys[c]} className={cn(roleKeys[c] === active && "bg-primary-tint")}>
                    <LevelMark level={lv} />
                  </td>
                ))}
              </StaggerItem>
            ))}
          </Stagger>
        </table>
      </div>

      <Stagger as="ul" className="flex flex-col gap-3 md:hidden">
        {roleKeys.map((k, c) => (
          <StaggerItem as="li" key={k} className={cn("flex flex-col gap-3 rounded-lg bg-card p-4 shadow-card", k === active && "ring-2 ring-primary")}>
            <h3 className="text-h4">{roles[k].label}</h3>
            <dl className="flex flex-col text-sm">
              {featureOrder.map((f) => (
                <div key={f} className="flex items-center justify-between gap-3 border-t border-muted py-2">
                  <dt>
                    <FeatureName accent={f} />
                  </dt>
                  <dd>
                    <LevelMark level={matrix[f][c]} />
                  </dd>
                </div>
              ))}
            </dl>
            <RoleSwitchButton role={k} pressed={k === active} className="self-start">
              {copy.openRole} {roles[k].label} {copy.openRoleEnd}
              <ArrowUp aria-hidden="true" strokeWidth={2.4} className="size-3.5" />
            </RoleSwitchButton>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="text-center text-[0.9375rem] font-semibold md:hidden">{copy.caption}</p>

      <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-muted-foreground">
        {([2, 1, 0] as const).map((lv) => (
          <span key={lv}>
            <span aria-hidden="true">{levels[lv].glyph} </span>
            {levels[lv].legend}
          </span>
        ))}
      </p>
    </>
  )
}
