"use server"

import type { SubmitResult } from "@/components/forms/useFormState"
import { contactDefaults, contactSchema, type ContactValues } from "@/lib/contact-schema"
import { deliver, type MailRow } from "@/lib/mail"

/**
 * Contact submission: validates again, then emails the details to CONTACT_TO (support@vinci360.com)
 * with Reply-To set to the visitor. Honeypot hits "succeed" silently. See `deliver` for the no-SMTP case.
 */
export async function sendContactMessage(values: ContactValues): Promise<SubmitResult> {
  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) return { ok: false }
  const v = parsed.data
  if (v.website) return { ok: true }

  const rows: MailRow[] = [
    ["Name", `${v.first} ${v.last}`],
    ["Email", v.email],
    ...(v.topic !== contactDefaults.topic ? [["Topic", v.topic] as const] : []),
    ["Message", v.message],
    ["Privacy consent", v.consent ? "Yes" : "No"],
  ]
  const ok = await deliver("contact", { subject: `Contact form: ${v.first} ${v.last}`, heading: "New contact form message", replyTo: v.email, rows })
  return { ok }
}
