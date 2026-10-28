import { Mail } from "lucide-react"

import { mchip } from "@/components/mocks/channels/styles"
import { NetworkIcon } from "@/components/mocks/NetworkIcon"
import { channelsSteps as c } from "@/content/features/channel-analysis"
import { cn } from "@/lib/utils"

/** "How to use it" illustrations (decorative; HowToUse hides them from screen readers). */
export const channelsStepIllustrations = [
  <div key="pick" className="flex h-full items-center justify-center gap-1 text-xs font-semibold">
    {c.tabs.map((t, i) => (
      <span key={t} className={cn("inline-flex items-center gap-1.5 px-2.5 py-2", i === 0 ? "border-b-3 border-channels-text font-extrabold" : "text-neutral-text")}>
        {i === 0 && <NetworkIcon network="facebook" className="size-3.5" />}
        {t}
        {i === 0 && " ✓"}
      </span>
    ))}
  </div>,
  <div key="follow" className="flex h-full flex-col justify-center gap-2">
    <span className="flex items-center gap-1.5 rounded-sm border-2 border-channels-text bg-card px-2.5 py-2 text-xs font-semibold">
      <span className="text-channels-text">{c.object.label}</span> {c.object.value}
    </span>
    <span className="flex gap-1.5">
      {c.chips.map((chip) => (
        <span key={chip} className={mchip}>
          {chip}
        </span>
      ))}
    </span>
  </div>,
  <div key="read" className="flex h-full flex-col justify-center gap-1.5 text-xs">
    <span>
      {c.read.love} <span className="text-pos">▲ {c.read.loveDelta}</span> · {c.read.angry} <span className="text-pos">▼ {c.read.angryDelta}</span>
    </span>
    <span className="self-end font-semibold text-on-dark-focus">{c.read.open}</span>
  </div>,
]

/** "Works with the rest" thumbnails: Social Media Intelligence, Sentiment & Keywords, Reports & Alerts. */
export const channelsRelatedThumbnails = [
  <span key="smi" className="flex h-full items-end justify-center gap-2.5 pb-1">
    <span className="h-[40%] w-5.5 rounded-xs bg-smi" />
    <span className="h-[70%] w-5.5 rounded-xs bg-smi" />
    <span className="h-[55%] w-5.5 rounded-xs bg-smi" />
    <span className="h-[90%] w-5.5 rounded-xs bg-smi" />
  </span>,
  <span key="sent" className="flex w-full flex-col gap-2 px-6">
    <span className="flex h-3 overflow-hidden rounded-full">
      <span className="w-[55%] bg-sent-text" />
      <span className="w-1/4 bg-sent-300" />
      <span className="w-1/5 bg-sent-200" />
    </span>
    <span className="flex h-3 overflow-hidden rounded-full">
      <span className="w-[35%] bg-sent-text" />
      <span className="w-[30%] bg-sent-300" />
      <span className="w-[35%] bg-sent-200" />
    </span>
  </span>,
  <Mail key="reports" className="size-11 text-reports-text" strokeWidth={2} />,
]
