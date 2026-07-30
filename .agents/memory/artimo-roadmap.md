---
name: ARTIMO Upgrade Roadmap
description: Two-phase homepage upgrade plan — Phase 1 functional foundation (approved), Phase 2 premium visual upgrade (recorded). Benchmark image is the official visual target.
---

# ARTIMO Upgrade Roadmap

**Why:** User defined an official two-phase upgrade roadmap with a visual benchmark image.

## Phase 1 — Functional Foundation (APPROVED, not yet implemented)
1. Mobile nav — hamburger toggle, `nav.open`, aria — all 7 HTML headers + style.css + script.js
2. RFQ form — static frontend, `data-amos-*` attributes for future pipeline, mailto pre-population — contact.html
3. PVIS connection — wire existing `searchProduct()` JS — add `#product-results` + trigger buttons to product-search.html; fix dead `.visible` CSS rule
4. Favicon/SEO — `favicon.svg` from ARTIMO logo, OG tags, canonical (domain configurable — NO hardcoding), `<main>` on inner pages

## Phase 2 — Premium Visual Upgrade (recorded in ARTIMO_ROADMAP.md)
- Hero photography (sanitize ChatGPT image filename first)
- "Supply Second." in --red typographic split
- Trust credential bar + stats row (32+/100+/50+/5000+)
- Product cards expanded to 5 categories with photos on homepage
- Industry photo cards (populate assets/industries/)
- Homepage PVIS upload entry point
- Logo mark colour alignment (#b00020 → #d62f2f)
- ART-VIS-001/002/003 naming TBD

## Key constraints
- Never hardcode canonical domain (artimo.engineering) — leave configurable
- Never touch index.html body — it is the locked benchmark
- ARTIMO Visual DNA: dark palette, --red: #d62f2f, Engineering First. Supply Second.
- Flat HTML/CSS/JS only — no frameworks

**How to apply:** Before any ARTIMO work, check this file and ARTIMO_ROADMAP.md for phase status and constraints.
