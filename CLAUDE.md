# CLAUDE.md — vinci360° pre-login marketing site

Read this file fully before every task. It is the contract for this repo.

## 1. Product

- **vinci360°** — social media intelligence for brands. A product by **MSRcosmos**.
- **Never name individual sources** (YouTube API policy): no network names, logos or per-source splits anywhere on the site. Present outcomes Brand24-style (mentions, reach, interactions, sentiment, topics, hashtags, competitors).
- This repo is the **pre-login marketing site only** (no app, no auth backend). "Log in" is a UI page that hands off to the product.
- **Twelve modules in seven feature areas:**

| Feature area | Modules | Accent token |
|---|---|---|
| Social Media Intelligence | Social Media Intelligence | `smi` |
| Trends | Trending Topics, Trending Hashtags | `trends` |
| Sentiment & Keywords | Sentiment Analysis, Keyword Analysis | `sent` |
| Brand Compare | Brand Compare Analysis | `cmp` |
| Promotable Stories | Promotable Stories | `stories` |
| Reports & Alerts | SMA Reports | `reports` |
| Source Analysis | Interactions, Top content, Top voices, Amplification (views, not networks) | `channels` |

- **Audiences (Solutions):** Brand managers (`?role=brand`), PR & communications (`pr`), Agencies (`agencies`), Leadership (`leadership`).

## 2. Stack

- Next.js (App Router, TypeScript, React Server Components by default)
- Tailwind CSS v4: CSS-first config, all tokens in `app/globals.css`. There is **no** `tailwind.config` theme.
- shadcn/ui (components in `components/ui`, edited in place, never wrapped in duplicate copies)
- Motion (`motion/react`, formerly Framer Motion) for entrance, scroll and interactive animation
- next/font: Inter (`--font-inter`, body) and Plus Jakarta Sans (`--font-jakarta`, headings 700/800)
- lucide-react icons (stroke 1.8–2, `aria-hidden` when decorative)
- Package manager: npm (never pnpm or yarn). Use `npm install` and `npm run <script>`.

## 3. Design reference

- Mockups are exported to `/design-ref/*.dc.html` (one file per artboard; `*Mobile` = 390px; `*Errors|Sending|Success|…` = states).
- **Match the reference** for layout, copy, order and states. Do not redesign. Do not add sections.
- **Intentional divergence:** the references still show Facebook/X/YouTube/Instagram. Keep each section's layout and components, but swap any per-network dimension for topics, sub-topics or Source Analysis views (see §7).
- The "vinci360° Design System" board (`design-ref/DesignSystem.dc.html`) is the token source. `app/globals.css` mirrors it 1:1.

## 4. Folder structure

```
app/
  layout.tsx                 # fonts, <MotionConfig reducedMotion="user">, header, footer, JSON-LD Organization
  globals.css
  sitemap.ts  robots.ts  not-found.tsx  error.tsx
  (marketing)/
    page.tsx                                   # Home
    features/page.tsx                          # Features overview
    features/social-media-intelligence/page.tsx
    features/trends/page.tsx
    features/sentiment-keywords/page.tsx
    features/brand-compare/page.tsx
    features/promotable-stories/page.tsx
    features/reports-alerts/page.tsx
    features/source-analysis/page.tsx            # was channel-analysis (308 redirect in next.config.ts)
    solutions/page.tsx                         # ?role= deep links
    request-demo/page.tsx
    about/page.tsx
    contact/page.tsx
    login/page.tsx                             # noindex
    privacy-policy/page.tsx                    # LegalLayout
    terms/page.tsx                             # LegalLayout
components/
  ui/          # shadcn primitives
  layout/      # SiteHeader, MegaMenu, MobileNav, SiteFooter, LegalLayout
  sections/    # Hero, CtaBand, FeatureSplit, BenefitList, ModuleMap, FAQ, WhoUsesIt…
  mocks/       # dashboard illustrations (HTML/SVG, never screenshots)
  motion/      # Reveal, Stagger, CountUp, DrawPath, GrowBar, Float, Hotspot
content/       # page copy + sample data (typed TS objects)
lib/           # utils (cn), seo helpers, motion presets
public/og/     # OG images
```

## 5. Design tokens (hard rules)

- **Never write raw hex, rgb or arbitrary colour values in components.** Use token utilities only: `bg-primary`, `text-muted-foreground`, `bg-cta`, `text-trends-text`, `bg-sent-tint`, `border-cmp-200`, `text-pos`, `shadow-card`…
- Module colours come in four forms:
  - `{m}`: fill, dots, icons and large areas
  - `{m}-text`: text on light
  - `{m}-tint`: chips and panels
  - `{m}-200`: tint borders
- Never put text in the raw module fill colour on light backgrounds; use the `-text` form.
- Text on fills:
  - ink on amber, orange, sky or teal fills
  - white on primary or purple fills
  - white on magenta only for bold text ≥18.66px; otherwise use `reports-text` as the fill
- **CTA (`bg-cta`, amber #FFA10A, ink text):**
  - Only the filled "Request a demo / Free trial" button.
  - On hover it becomes `bg-cta-hover` with **white** text (`text-cta-hover-foreground`).
  - The navbar CTA is always this filled button on every page, including Request demo and the Login header.
- **Primary (`bg-primary`):** secondary conversion buttons ("Explore …", form submits other than demo), links, active tabs, focus.
- **Navy sections and mock frames:** add `className="on-dark"`. It re-skins shadcn tokens (`--card`, `--border`, `--muted-foreground`, `--ring`, `--pos/--neg`) automatically. Don't hand-pick dark colours.
- **Radius:**
  - `rounded-lg` (12px): cards, tiles, panels, frames
  - `rounded-sm` (8px): buttons, inputs
  - `rounded-full`: chips, pills
- **Elevation:** `shadow-card` for cards, `shadow-float` for floating cards, dark frames and sheets.
- **Layout:**
  - `container-site`: max 1200px, 24px gutters
  - `section-y`: 64px mobile, 96px desktop
  - `container-reading`: 720px, legal pages
  - card padding 24px (`p-6`), 4px spacing grid
- **Type:**

| Element | Desktop | Mobile |
|---|---|---|
| H1 | `text-h1` (56/1.06) | `text-h1-m` (32/1.1) |
| Login H1 | `text-h1-compact` | |
| H2 display / section | `text-display` / `text-h2` | |
| H3 block | `text-h3` (28) | |
| H3 small | `text-h4` (20) | |
| Body | `text-body` (16/1.55) | |
| Legal body | `text-legal` (17/1.7) | 16/1.65 |

  - Headings use `font-heading` (applied in base).
  - **All metrics use `tabular`.**
- **Patterns:** `dot-grid` / `dot-grid-dark` (decorative, `aria-hidden`), `hatch-neg` on every negative bar, `placeholder-inline` / `placeholder-block`, `skeleton-shimmer`.

### Button variants (`components/ui/button.tsx`, cva)

| Variant | Use |
|---|---|
| `cta` | `bg-cta text-cta-foreground hover:bg-cta-hover hover:text-cta-hover-foreground`, font-bold, min-h 44 (52 in hero) |
| `default` | primary blue, white text, hover `primary-700` |
| `outline` | white, `border-border`, ink text (secondary, e.g. "Take the product tour") |
| `ghost` | "Log in" in header |
| `link` | inline text links |
| `destructive` | `bg-destructive` with `text-destructive-foreground`. Not used for marketing actions |

All buttons: min touch target 44×44, visible 2px focus ring, and loading state = spinner + label kept + `aria-busy` + disabled.

## 6. Canonical components

- **Header (sticky, 64/72px):**
  - Logo "vinci360°".
  - **Platform**: links to `/features`. A mega menu on hover or focus lists the 7 feature pages with accent dots.
  - Then Solutions · About · Contact · ghost "Log in" · cta "Request a demo". (The product tour was retired: `/product-tour` 308-redirects to `/request-demo`; secondary hero buttons read "Explore the features".)
  - Active link: underline + bold + `aria-current="page"`.
  - Mobile: logo, Log in, menu button that opens a Sheet.
- **Footer:**
  - Platform (7 features) · Solutions (4 role deep links) · Company (About, Contact) · Legal (Privacy Policy, Terms & Conditions).
  - "Powered by **MSRcosmos**": an external placeholder link, focusable with the tooltip "Opens msrcosmos.com in a new tab", and no navigation until the URL is confirmed.
  - © 2026 Vinci360. All rights reserved.
- **Sample data chip:** every mock or illustration that shows numbers carries a visible "Sample data" chip.
- **Reach note:** "* Reach is an estimate based on audience size and observed amplification." appears wherever reach appears.
- **Hotspots** on mocks:
  - numbered button, ≥44px hit area
  - tooltip on hover or focus, `aria-describedby`
  - `animate-hotspot` ring
  - must not cover numbers or labels
- **Legal switch:** Privacy Policy / Terms segmented links under the legal header (current = check icon + bold + underline).
- **Forms (Demo, Contact, Login):**
  - label above field, `*` = required with a "Fields marked * are required." note
  - inline error text in `text-destructive` + `aria-invalid` + `aria-describedby`
  - error summary at top that moves focus
  - states: default, errors, submitting, success, failure

## 7. Content rules (strict)

- **Never invent facts:** no customer names, logos, metrics, prices, certifications, addresses, dates or testimonials.
- **No source names:** never mention Facebook, X/Twitter, YouTube, Instagram or network-only terms (Page, Channel, Subscribers, Reels, Reposts) in copy, data, alt text, captions or SEO. Use "across social media", topics, sub-topics and outcome metrics. The `twitter:` metadata tags are the only allowed exception.
- Unknown values keep the bracketed placeholder from the reference, e.g. `[Testimonial quote from a real client, to be supplied.]`, styled with `placeholder-inline` or `placeholder-block`.
- **Sample data only:** the fictional brand **Aurora Mobile** and competitors **Nimbus** and **Kestrel**. Keep all sample data in `content/sample-data.ts`.
- **Avatars are initials only** (e.g. "RK"), never photos of people.
- **No infrastructure wording:** never mention servers, cloud, pipelines, data centres or ingestion.
- Sentiment is never colour-only: always ▲ / ▼ / – plus a label.
- The copy is UK English as in the reference ("analysed", "colour").

## 8. Animation (Motion)

- Presets live in `lib/motion.ts` and the wrappers in `components/motion/*`. **Pages never define ad-hoc variants.**
  - `fadeUp` (y 16→0, opacity, 0.5s, ease-out-expo), `stagger` (0.06–0.08s)
  - `CountUp` for KPI numbers
  - `DrawPath` for SVG lines (`pathLength` 0→1)
  - `GrowBar` (`scaleY`/`scaleX` from origin)
  - `Float` for floating cards
  - `Hotspot` pulse
- Scroll reveals: `whileInView`, `viewport={{ once: true, amount: 0.3 }}`. Use scroll-linked (`useScroll`) motion only for hero visuals.
- Animate **only transform and opacity**. Reserve layout space so CLS = 0.
- Use `LazyMotion` + `m` components to keep the bundle small. Animated pieces are small `"use client"` islands; pages and sections stay server components.
- Respect reduced motion: `<MotionConfig reducedMotion="user">` in the root layout, plus the CSS fallback in globals. With reduced motion everything renders in its final state.
- Never hide content until JS runs. Server-rendered HTML must contain every word, for SEO and no-JS users.

## 9. Responsive

- Design widths: **390** (mobile), 768, 1024, **1440** (desktop). Mobile-first classes.
- No horizontal page scroll at any width; long tab strips scroll inside themselves (`scrollbar-none`).
- Multi-column grids collapse to one column below `md`. Floating cards must not cover text on mobile.
- Mobile forms: full-width fields; the submit bar may be sticky.

## 10. SEO

- Every page exports `metadata` or `generateMetadata`:
  - unique title (`"… | vinci360°"`)
  - description of 150–160 characters
  - canonical URL, Open Graph and Twitter tags, OG image from `public/og/`
- Indexing: `app/sitemap.ts` and `app/robots.ts`. `noindex` on `/login`, the 404 page and the error page.
- JSON-LD:
  - `Organization`: MSRcosmos and vinci360° (no unconfirmed fields)
  - `SoftwareApplication` on Home and Features
  - `BreadcrumbList` on feature, solutions and legal pages
  - `FAQPage` where an FAQ is visible
- Markup:
  - one H1 per page, logical heading order
  - landmarks: `header`, `nav`, `main`, `footer`
  - descriptive link text
- Mock dashboards are HTML/SVG with a `<figure>` and a screen-reader `<figcaption>` describing the data.
- Use next/image for raster images, with real `alt` text.

## 11. Accessibility (WCAG 2.2 AA minimum)

- Contrast: text ≥4.5:1, large text and UI ≥3:1. The token pairs in the design system are pre-checked, so don't create new pairs.
- Full keyboard support: mega menu, tabs (arrow keys, roving tabindex), accordion, sheet and tooltips. Focus is always visible.
- Add a skip link to `#main` and `aria-live` for form status. Respect `prefers-reduced-motion`.

## 12. Definition of done (every page)

- [ ] Matches `/design-ref` at 390 and 1440 (layout, copy, order, states)
- [ ] Only token utilities used, no raw colours (`grep -E "#[0-9a-fA-F]{3,6}" components app` returns only globals.css)
- [ ] Lighthouse ≥95 for Performance, Accessibility, Best Practices and SEO; CLS 0
- [ ] No axe violations; keyboard path tested
- [ ] Reduced-motion check passes
- [ ] Metadata and JSON-LD present
- [ ] Placeholders kept, nothing invented
- [ ] `npm run lint && npx tsc --noEmit && npm run build` pass

## 13. Working style for Claude Code

- One page per session. Start in plan mode, list the sections and the components you'll reuse, then implement.
- Reuse before creating: check `components/sections` and `components/mocks` first.
- Read `design-ref/slim/*` first for layout, copy and order; open the full `design-ref/**/*.dc.html` only when you need exact chart values or styles. Re-run `npm run slim-ref` after the references change.
- Read `components/REGISTRY.md` first, before creating any component; add one line (name — props — purpose) for every component you add or whose props change.
- Keep commits small, one section or component each, with clear messages.
- If the reference and this file conflict, **this file wins** for tokens and rules, and **the reference wins** for layout and copy. Flag the conflict in your summary.
