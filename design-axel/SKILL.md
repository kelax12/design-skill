---
name: design-axel
description: "Design UI/UX and visual assets with a committed art direction. Use to design, redesign, critique or finalize an interface (landing page, dashboard, SaaS, website, mobile app), to produce visuals (banners, social posts and carousels, stories, slides, logos, brand identity, icons), or to choose colors, typography, spacing and layout. Also covers design tokens, shadcn/ui + Tailwind, accessibility and dark mode."
argument-hint: "[deliverable] [context]  ·  --safe for a deliberately conventional result"
license: MIT
metadata:
  author: claudekit (fork)
  version: "4.0.0"
---

# design-axel

Unified design skill. Corrected fork of `claudekit/design`: search engine repaired,
mobile-only scope unlocked, duplicates removed, and above all **one explicit doctrine**
in place of three that contradicted each other.

## Doctrine — the order is not negotiable

```
0. preflight   →  find out what actually works on this machine
1. project     →  inherit before inventing (BRAND.md, DESIGN.md, tokens in the code)
2. DIRECTION   →  concept + signature element + anti-default critique   ← references/direction.md
3. production  →  build exactly the concept you committed to
4. QA          →  ui-ux-pro-max as corrector, checklist per deliverable ← references/qa.md
5. verify      →  screenshot, look at it, fix. One batched pass.
```

**What changed from the original:** `ui-ux-pro-max` is no longer the source of ideas, it is
the corrector at the end of the chain. Its style and palette recommendations are the
statistical average of a product category — which is exactly what produces work that is
correct and forgettable. **Step 2 is never skipped**, not even for a single banner.

## Step 0 — Preflight (once per session)

```bash
node ~/.claude/skills/design-axel/scripts/preflight.mjs
```

It prints the `PY` and `SKILL` values to use afterwards, and reports which modules are
actually available. Every command in this skill assumes:

```bash
PY=$(command -v python3 || command -v python)   # Windows: python, not python3
SKILL=~/.claude/skills/design-axel
```

## Step 1 — Inherit the project's visual truth

```bash
ls BRAND.md BRANDING.md DESIGN.md STYLEGUIDE.md PRODUCT.md design-system/MASTER.md docs/design*.md 2>/dev/null
```

If any of these exists, **it is the source of truth**: the direction gets adapted, not
reinvented. Also check the tokens actually in the code (`tailwind.config`, `:root`,
`theme.css`) — a project's visual truth lives in its code, not in a filename.
Details in `references/direction.md` §0.

## Step 2 — Art direction (mandatory)

**Load `references/direction.md` and follow it.** Expected output before a single line of
code: 4-6 named hex values · 2-3 type families with distinct roles · a layout concept ·
**one** signature element · the anti-default critique, written down.

## Routing by deliverable

| Deliverable | Modules to load | QA |
|---|---|---|
| Landing page, website, dashboard, SaaS | `references/direction.md` → `ui-styling/REFERENCE.md` | `references/qa.md` §A+§B |
| Mobile / React Native app | `references/direction.md` → `ui-ux-pro-max/REFERENCE.md` (Quick Reference) | `references/qa.md` §A+§C |
| Banner, cover, header, ad | `references/direction.md` → `banner-design/REFERENCE.md` | `references/qa.md` §A |
| Social post, carousel, story | `references/direction.md` → `references/social-photos-design.md` | `references/qa.md` §A |
| Presentation, pitch deck | `references/direction.md` → `slides/REFERENCE.md` | `references/qa.md` §A |
| Brand identity, voice, assets | `brand/REFERENCE.md` | `references/qa.md` §A |
| Tokens, CSS variables, themes | `design-system/REFERENCE.md` | `references/qa.md` §A+§D |
| Review / audit of existing UI | `ui-ux-pro-max/REFERENCE.md` Quick Reference | `references/qa.md` |
| Typography choice | `ui-styling/references/fonts-catalog.md` (29 libre families, pairings) | `references/qa.md` §A |

Routing by *question* rather than by deliverable: `references/design-routing.md`.

One canonical path per task: the modules (`slides/`, `banner-design/`, …) are the reference;
`references/` only holds what has no dedicated module.

## Step 4 — QA (corrector, not director)

**Load `references/qa.md`** and apply only the checklist for this deliverable.
Never impose native-app rules (44 pt targets, safe areas, gestures, haptics) on a static
visual or a web page — they do not apply and they flatten the composition.

```bash
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<product industry tone>" --design-system   # baseline to beat
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<topic>" --domain ux                       # anti-patterns, a11y
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<topic>" --stack <stack>                   # 16 stacks available
```

Domains: `product` `style` `color` `typography` `landing` `chart` `ux` `google-fonts`
`react` `web` `prompt`. Stacks: `html-tailwind` `shadcn` `react` `nextjs` `vue` `nuxtjs`
`nuxt-ui` `svelte` `angular` `astro` `react-native` `flutter` `swiftui` `jetpack-compose`
`threejs` `laravel`.

## No AI image generation

This skill generates **no images with AI**. Logos, brand identity and icons are produced in
**pure HTML/CSS/SVG**, exported through Playwright: deterministic, reproducible, diffable in
plain text, crisp at any size, and dependent on no API key or quota.

- **Logo / brand**: hand-drawn SVG. If the project already has a logo (often in `assets/`,
  `public/`, or named in the brand doc), **reuse it** instead of inventing one.
- **Icons**: take a consistent existing set (Lucide, Heroicons) or draw SVG. One family, one
  stroke weight (see `references/qa.md` §A).
- **Mockups / product shots**: HTML/CSS composition (shadow, perspective, mask), or a photo
  supplied by the client.

## Scripts

| Script | Purpose |
|---|---|
| `scripts/preflight.mjs` | Machine state — run this first |
| `ui-ux-pro-max/scripts/search.py` | Design search engine (styles, palettes, type, UX, stacks) |
| `brand/scripts/` · `design-system/scripts/` | Brand context injection, token generation and validation |

## `--safe` mode

A deliberately conventional result (conservative client, internal tool). Steps 2 and 3 still
apply: distinction then comes from **precision** — spacing rhythm, type scale, quality of
states — instead of expression. A restrained design is not a default design.
