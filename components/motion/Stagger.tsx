"use client"

import type { ComponentProps } from "react"
import { m, useReducedMotion } from "motion/react"

import { fadeUp, stagger, viewport } from "@/lib/motion"

type ListTag = "div" | "ol" | "ul" | "tbody" | "dl"
type ItemTag = "div" | "li" | "tr"

/** Container that reveals its StaggerItem children one after another. `as` keeps list and table semantics (ol/ul + li, tbody + tr). */
export function Stagger({ delay, as = "div", ...props }: ComponentProps<typeof m.div> & { delay?: number; as?: ListTag }) {
  const reduced = useReducedMotion()
  const Tag = m[as] as typeof m.div
  return (
    <Tag
      data-motion=""
      variants={stagger(delay)}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      {...props}
    />
  )
}

/** Child of Stagger; inherits the parent's hidden/show state. */
export function StaggerItem({ as = "div", ...props }: ComponentProps<typeof m.div> & { as?: ItemTag }) {
  const Tag = m[as] as typeof m.div
  return <Tag data-motion="" variants={fadeUp} {...props} />
}
