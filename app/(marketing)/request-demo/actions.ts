"use server"

import type { SubmitResult } from "@/components/forms/useFormState"
import { demoSchema, type DemoValues } from "@/lib/demo-schema"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mocked request-a-demo submission: validates again, waits 1.2s, and fails when the email
 * contains "fail" (for testing the failure state). No data is stored or sent anywhere.
 */
export async function requestDemo(values: DemoValues): Promise<SubmitResult> {
  const parsed = demoSchema.safeParse(values)
  if (!parsed.success) return { ok: false }
  await delay(1200)
  if (parsed.data.email.toLowerCase().includes("fail")) return { ok: false }
  return { ok: true }
}
