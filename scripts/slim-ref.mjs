#!/usr/bin/env node
/**
 * Writes token-light copies of the design references: design-ref/**\/<Name>.dc.html →
 * design-ref/slim/<Name>.html. Strips scripts, styles (<helmet>), data-* attributes, comments and
 * SVG geometry; keeps text, headings, classes, structure, aria labels and inline style values.
 * Re-run after the references change: `npm run slim-ref`.
 */
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { basename, join, relative } from "node:path"

const ROOT = join(import.meta.dirname, "..", "design-ref")
const OUT = join(ROOT, "slim")

/** All *.dc.html files under design-ref/, skipping the output folder. */
function findRefs(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return path === OUT ? [] : findRefs(path)
    return name.endsWith(".dc.html") ? [path] : []
  })
}

const BLOCK_TAGS = "section|div|h[1-6]|p|li|ul|ol|table|thead|tbody|tr|figure|figcaption|article|header|footer|nav|main|aside|form|fieldset|details|summary|label|button|svg"

function slim(html) {
  return (
    html
      // 1. Comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // 2. Scripts (inline and src)
      .replace(/<script\b[\s\S]*?<\/script>/gi, "")
      .replace(/<script\b[^>]*\/>/gi, "")
      // 3. Styles: <helmet> holds the <style> block and font links; then any stray <style>
      .replace(/<helmet\b[\s\S]*?<\/helmet>/gi, "")
      .replace(/<style\b[\s\S]*?<\/style>/gi, "")
      .replace(/<link\b[^>]*>/gi, "")
      // 4. data-* attributes
      .replace(/\s+data-[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g, "")
      // 5. SVG geometry
      .replace(/\s(d|points)\s*=\s*"[^"]*"/g, ' $1="…"')
      .replace(/\s(d|points)\s*=\s*'[^']*'/g, ' $1="…"')
      // 6. Whitespace
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .replace(new RegExp(`<(/?)(${BLOCK_TAGS})\\b`, "gi"), "\n<$1$2")
      .replace(/\n<\/(\w+)/g, "</$1")
      .replace(/\n{2,}/g, "\n")
      .trim()
  )
}

mkdirSync(OUT, { recursive: true })
let before = 0
let after = 0
const refs = findRefs(ROOT).sort()
for (const file of refs) {
  const src = readFileSync(file, "utf8")
  const out = `<!-- slim: ${relative(join(ROOT, ".."), file).replaceAll("\\", "/")} -->\n${slim(src)}\n`
  const name = basename(file, ".dc.html")
  writeFileSync(join(OUT, `${name}.html`), out)
  before += src.length
  after += out.length
  console.log(`${name.padEnd(28)} ${String(Math.round(src.length / 1024)).padStart(5)} KB → ${String(Math.round(out.length / 1024)).padStart(4)} KB`)
}
console.log(`\n${refs.length} files · ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB`)
