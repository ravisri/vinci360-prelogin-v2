// One-off: copy the base world map (viewBox 0 0 1152 520) from the Contact reference into public/images/office-map.svg.
import { readFileSync, writeFileSync } from "node:fs"

const src = "design-ref/Contact — Desktop 1440 · reviewed-html/Contact.dc.html"
const html = readFileSync(src, "utf8")
const at = html.indexOf('viewBox="0 0 1152 520"')
if (at < 0) throw new Error("Map SVG not found")
const path = html.slice(at).match(/<path d="([^"]+)"[^>]*>/)
if (!path) throw new Error("Map path not found")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 520" width="1152" height="520"><path d="${path[1]}" fill="#FFFFFF" stroke="#C5CCFF" stroke-width="1"/></svg>\n`
writeFileSync("public/images/office-map.svg", svg)
console.log(`office-map.svg written (${svg.length} bytes)`)
