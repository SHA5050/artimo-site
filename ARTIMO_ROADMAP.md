# ARTIMO Premium Homepage Upgrade — Official Roadmap

**Benchmark reference:** `attached_assets/ARTIMO_Product_Visual_Reference_-_Copy_1785418268830.jpeg`
**Governance:** ARTIMO Visual DNA · AMOS · Engineering First. Supply Second.
**Architecture constraint:** Flat HTML/CSS/JS — no frameworks, no build tools

---

## Phase 1 — Functional Foundation
**Status:** Approved. Implementation pending.

| Item | Scope | Files |
|---|---|---|
| 1. Mobile navigation | Hamburger toggle, `nav.open` dropdown, aria attributes | `style.css`, `script.js`, all 7 HTML headers |
| 2. RFQ structured form | Static frontend form on `contact.html`, `data-amos-*` attributes for future AMOS pipeline, `mailto:` pre-population, inline success state | `contact.html`, `script.js`, `style.css` |
| 3. PVIS connection | Wire existing `searchProduct()` JS to `product-search.html` — add trigger buttons + `#product-results` container. Fix dead `.visible` CSS rule | `product-search.html`, `style.css` |
| 4. Favicon & SEO | `favicon.svg` from ARTIMO logo identity. Favicon `<link>` on all 7 pages. OG meta tags. Canonical URL tags (domain configurable — placeholder, not hardcoded). `<main>` wrapper on inner pages | `favicon.svg` (new), all 7 HTML `<head>` blocks |

**Execution order:** SEO/Favicon → Mobile nav → PVIS → RFQ form

---

## Phase 2 — ARTIMO Premium Visual Upgrade
**Status:** Recorded. Activate after Phase 1 complete.
**Benchmark gap analysis:** Completed 2026-07-30.

### 2.1 — Hero Industrial Visual
- Full-bleed industrial fastener photography in hero section
- Source: `assets/images/ChatGPT Image Jul 25, 2026, 12_10_52 AM.png` (1536×1024) — sanitize filename before use
- Typographic colour split: "Supply Second." rendered in `--red` (#d62f2f)
- Trust credential bar below hero CTAs: Engineering Expertise · Global Supply Network · Quality Assured (checkmark icons)

### 2.2 — Trust & Proof Statistics
- Stats row on homepage: 32+ Years · 100+ Clients · 50+ Countries · 5000+ Projects
- Positioned before or within final RFQ section as conversion reinforcement
- Styled with existing token system (`--card`, `--red`, `--text`)
- Zero hardcoded values — all stats editable in HTML

### 2.3 — Product Photography Presentation
- Homepage product section: expand from 3 to 5 categories (add Stud Bolts, Special Fasteners)
- Product images from `assets/products/` used on homepage cards (currently only on `products.html`)
- Card layout: landscape orientation, photo at top, "Explore Products →" arrow link pattern
- Special Fasteners card: icon if no photo available

### 2.4 — Industry Visual Section
- Upgrade industry grid from text tiles to photo cards
- Populate `assets/industries/` with 6–8 industry images
- Target: Railway · Oil & Gas · Power Generation · Steel Industry · Mining · Marine & Offshore
- Overlay text on dark photo cards — matching benchmark layout

### 2.5 — Homepage PVIS Upload Entry Point
- New homepage section: "Don't Know the Exact Fastener?"
- Upload UI component (image / drawing / specification) surfaced on homepage
- Reduces commitment barrier — soft entry before formal RFQ
- Links to `product-search.html` PVIS module
- 4-step visual flow below upload: Identify → Validate → Source → Supply (icon-driven)

### 2.6 — Logo Mark Alignment
- Evaluate CSS-drawn square logo mark against benchmark geometric chevron
- Apply ART-VIS-001 / ART-VIS-002 / ART-VIS-003 naming convention to integrated assets
- Colour alignment: `artimo-logo-mark.svg` uses `#b00020` — align to site token `--red: #d62f2f`

---

## Visual DNA Locks (never override)
- Dark industrial palette: `--bg: #090d12` through `--card2: #1b2530`
- Brand red: `--red: #d62f2f` / `--red-dark: #9e2020`
- Headline: **Engineering First. Supply Second.** — unchanged
- AMOS governance: PVIS · PIS · VMS · AMOS system architecture preserved
- Flat HTML/CSS/JS — no frameworks, no build tools, no external dependencies
- Homepage (`index.html`) is the locked visual benchmark for all inner pages

---

## Asset Registry

| Asset | Path | Status | Phase |
|---|---|---|---|
| Product images (×4) | `assets/products/` | ✅ Active | — |
| Logo wordmark SVG | `assets/images/artimo-logo-mark.svg` | ⚠️ Unused, colour mismatch | 2.6 |
| Hero image candidate | `assets/images/ChatGPT Image Jul 25, 2026, 12_10_52 AM.png` | ⚠️ Unused, unsafe filename | 2.1 |
| Fastener placeholder SVG | `assets/images/industrial-fastener-placeholder.svg` | ⚠️ Unused, light bg | 2.3 |
| Visual reference JPEG | `assets/images/ARTIMO_Product_Visual_Reference_-_Copy.jpeg` | ℹ️ Internal ref | — |
| Visual assets ZIP | `assets/images/ARTIMO_Visual_Assets_v1.0.zip` | ⚠️ Redundant binary | Remove |
| Hero directory | `assets/images/hero/` | ❌ Empty | 2.1 |
| Industries directory | `assets/industries/` | ❌ Empty | 2.4 |
| Favicon | `favicon.svg` | ❌ Missing | 1.4 |
| ART-VIS-001 | — | ❌ Undefined | 2.6 |
| ART-VIS-002 | — | ❌ Undefined | 2.6 |
| ART-VIS-003 | — | ❌ Undefined | 2.6 |

---

*Roadmap recorded: 2026-07-30*
*Benchmark analysis completed: 2026-07-30*
*Next action: Phase 1 implementation (approved)*
