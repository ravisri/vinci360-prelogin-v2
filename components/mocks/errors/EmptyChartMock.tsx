"use client"

import { m, useReducedMotion } from "motion/react"

import { ErrorChartFrame } from "@/components/mocks/errors/ErrorChartFrame"
import { notFound } from "@/content/errors"
import { drawLine, flattenY, viewport } from "@/lib/motion"

const { chart } = notFound

/** 404 illustration: a mentions line draws in, then flattens onto zero ("No mentions found"). */
export function EmptyChartMock() {
  const reduced = useReducedMotion()
  return (
    <ErrorChartFrame {...chart}>
      <svg viewBox="0 0 400 130" className="h-32.5 w-full" aria-hidden="true">
        <path d="M0 20H400M0 60H400M0 100H400" className="stroke-dark-grid" />
        <text x="0" y="96" fontSize="11" className="fill-on-dark-muted">
          0
        </text>
        <m.g
          data-motion=""
          variants={flattenY}
          initial={reduced ? false : "hidden"}
          animate={reduced ? "show" : undefined}
          whileInView="show"
          viewport={viewport}
        >
          <m.path
            data-draw=""
            d="M16 84 L72 52 L128 70 L184 30 L240 58 L300 110 L400 110"
            variants={reduced ? undefined : drawLine}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="stroke-chart-1"
          />
        </m.g>
        <circle cx="300" cy="110" r="5" strokeWidth="2" className="fill-chart-1 stroke-background" />
      </svg>
    </ErrorChartFrame>
  )
}
