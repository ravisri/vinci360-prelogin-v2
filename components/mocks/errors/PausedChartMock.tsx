"use client"

import { Pause } from "lucide-react"

import { DrawPath } from "@/components/motion/DrawPath"
import { ErrorChartFrame } from "@/components/mocks/errors/ErrorChartFrame"
import { serverError } from "@/content/errors"

const { chart } = serverError

/** 500 illustration: the mentions line draws in and stops part-way at a dashed pause line with a warning marker. */
export function PausedChartMock() {
  return (
    <ErrorChartFrame {...chart} noteIcon={<Pause strokeWidth={2} className="size-4" />}>
      <svg viewBox="0 0 400 130" className="h-32.5 w-full" aria-hidden="true">
        <path d="M0 20H400M0 60H400M0 100H400" className="stroke-dark-grid" />
        <DrawPath
          d="M16 96 L64 78 L112 86 L160 58 L220 66"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-chart-1"
        />
        <path d="M220 52V122" strokeWidth="2" strokeDasharray="4 4" className="stroke-on-dark-muted" />
        <circle cx="220" cy="66" r="5" strokeWidth="2" className="fill-chart-1 stroke-background" />
        <path d="M220 10 L236 38 L204 38 Z" strokeLinejoin="round" strokeWidth="2" className="fill-amber-on-dark stroke-amber-on-dark" />
        <text x="220" y="34" textAnchor="middle" fontSize="15" fontWeight="800" className="fill-ink">
          !
        </text>
        <text x="244" y="30" fontSize="12" fontWeight="700" className="fill-on-dark-strong">
          {chart.marker}
        </text>
      </svg>
    </ErrorChartFrame>
  )
}
