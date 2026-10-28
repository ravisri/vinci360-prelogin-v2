import { reachNote } from "@/content/sample-data"
import { cn } from "@/lib/utils"

/** Required wherever reach appears. */
export function ReachNote({ className }: { className?: string }) {
  return <p className={cn("text-[0.8125rem] text-muted-foreground", className)}>{reachNote}</p>
}
