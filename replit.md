# ARTIMO Engineering Procurement Partner

## Project Overview

Static HTML/CSS/JS website for ARTIMO, an engineering procurement partner specializing in industrial fastening solutions. No build step or framework — pure static files served directly.

## Stack

- HTML, CSS, JavaScript (vanilla)
- Static file serving via Python's built-in HTTP server

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage / hero |
| `products.html` | Product catalogue |
| `product-search.html` | PVIS-001 Product Visual Identification System |
| `engineering-library.html` | Engineering reference library |
| `quality.html` | Quality framework |
| `about.html` | About ARTIMO |
| `contact.html` | Contact / RFQ |

## Assets

- `style.css` — global styles
- `script.js` — site-wide JS (AMOS system)
- `assets/products/` — product images (hex-bolt, hex-nut, stud-bolt, flat-washer)
- `assets/imagesindustries/` — industry images

## Running Locally

```
python3 -m http.server 5000
```

The workflow **Start application** runs this automatically.

## Deployment

Originally deployed on **Cloudflare Pages** (main branch). See `deployment-guide.txt` for notes.

## User Preferences

- Preserve ARTIMO Visual DNA
- Follow AMOS Governance — no simplification of core modules
- Maintain engineering-first positioning
- Keep website lightweight and conversion focused
