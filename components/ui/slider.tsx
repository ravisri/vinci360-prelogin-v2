"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  /** Filled part of the track, e.g. "bg-sent-text" (defaults to primary). */
  rangeClassName?: string
  /** Thumb border colour, e.g. "border-sent-text". */
  thumbClassName?: string
  /** Read out instead of the raw number, e.g. "70% confidence". */
  valueText?: string
  /** Accessible name when no <label for> points at the thumb. */
  "aria-label"?: string
  "aria-labelledby"?: string
}

/**
 * Range slider (Radix): arrow keys step, Page Up/Down jump, Home/End go to the ends. The 20px
 * thumb has a 44px hit area and the standard 2px focus ring. Labels attach to the thumb, which is
 * the focusable element.
 */
function Slider({
  className,
  rangeClassName,
  thumbClassName,
  valueText,
  defaultValue,
  value,
  min = 0,
  max = 100,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SliderProps) {
  const values = React.useMemo(() => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min]), [value, defaultValue, min])

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn("relative flex h-11 w-full touch-none items-center select-none data-[disabled]:opacity-50", className)}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className="relative h-1.5 grow overflow-hidden rounded-full bg-border">
        <SliderPrimitive.Range data-slot="slider-range" className={cn("absolute h-full bg-primary", rangeClassName)} />
      </SliderPrimitive.Track>
      {values.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          id={i === 0 ? id : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-valuetext={valueText}
          data-slot="slider-thumb"
          className={cn(
            "relative block size-5 cursor-grab rounded-full border-2 border-primary bg-card shadow-card transition-transform after:absolute after:-inset-3 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:cursor-grabbing motion-reduce:transition-none",
            thumbClassName,
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
