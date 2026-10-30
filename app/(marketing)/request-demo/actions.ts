"use server"

import type { SubmitResult } from "@/components/forms/useFormState"
import { demoSchema, type DemoValues } from "@/lib/demo-schema"
import { deliver, type MailRow } from "@/lib/mail"

/**
 * Request-a-demo submission: validates again, then emails the details to CONTACT_TO
 * (support@vinci360.com) under a "Request a demo: …" subject, Reply-To the visitor.
 * Honeypot hits "succeed" silently. See `deliver` for the no-SMTP case.
 */
export async function requestDemo(values: DemoValues): Promise<SubmitResult> {
  const parsed = demoSchema.safeParse(values)
  if (!parsed.success) return { ok: false }
  const v = parsed.data
  if (v.website) return { ok: true }

  const rows: MailRow[] = [
    ["Request type", "Demo request"],
    ["Name", `${v.first} ${v.last}`],
    ["Work email", v.email],
    ["Company", v.company],
    ...(v.keyword ? [["Keyword", v.keyword] as const] : []),
    ...(v.notes.trim() ? [["Notes", v.notes.trim()] as const] : []),
    ["Privacy consent", v.consent ? "Yes" : "No"],
  ]
  const ok = await deliver("demo", {
    subject: `Request a demo: ${v.first} ${v.last}, ${v.company}`,
    heading: "New demo request",
    replyTo: v.email,
    rows,
  })
  return { ok }
}
