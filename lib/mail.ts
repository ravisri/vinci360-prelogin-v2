import nodemailer from "nodemailer"

/** Where form submissions go; override with CONTACT_TO. */
export const contactTo = process.env.CONTACT_TO || "support@vinci360.com"

/** True when the SMTP settings in .env.local are present. */
export const mailConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

type Mail = { to: string; subject: string; text: string; html: string; replyTo?: string }

/** Sends one email over SMTP (server only). Throws on a delivery error. */
export async function sendMail({ to, subject, text, html, replyTo }: Mail) {
  const port = Number(process.env.SMTP_PORT) || 587
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  await transport.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to, subject, text, html, replyTo })
}

/** Escapes user input for the HTML body. */
export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

export type MailRow = readonly [label: string, value: string]

/**
 * Emails a form submission to CONTACT_TO as a label/value table (text + HTML), Reply-To the visitor.
 * Without SMTP settings it logs the email in development and fails in production. Returns success.
 */
export async function deliver(tag: string, { subject, heading, replyTo, rows }: { subject: string; heading: string; replyTo: string; rows: MailRow[] }) {
  const all: MailRow[] = [...rows, ["Submitted", new Date().toUTCString()]]
  const mail = {
    to: contactTo,
    replyTo,
    subject,
    text: all.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<h2>${escapeHtml(heading)}</h2><table cellpadding="6">${all
      .map(([k, v]) => `<tr><th align="left" valign="top">${k}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join("")}</table>`,
  }

  if (!mailConfigured) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[${tag}] SMTP is not configured; message not sent.`)
      return false
    }
    console.warn(`[${tag}] SMTP not configured; logging instead of sending:\nSubject: ${subject}\n${mail.text}`)
    return true
  }

  try {
    await sendMail(mail)
    return true
  } catch (err) {
    console.error(`[${tag}] send failed`, err)
    return false
  }
}
