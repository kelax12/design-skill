# Routing — which module for which question

This file used to describe 8 separate sub-skills (`→ brand`, `→ logo-design`, …) with paths
like `node .claude/skills/brand/scripts/…`. Those skills no longer exist: everything became an
**internal module** of `design-axel`. The authoritative routing table is the one in `SKILL.md`.
This file keeps only the routing *by question*, which is still useful.

**Doctrine reminder:** whatever the entry point, `references/direction.md` comes first for any
visual deliverable. The modules below execute a direction that has already been decided.

## By question

| Question | Where to go |
|---|---|
| "What should this look like?" | `references/direction.md` — **always here first** |
| "What color for this?" | `brand/REFERENCE.md` if a brand system exists, otherwise `direction.md` §2 |
| "How do I create a token for X?" | `design-system/REFERENCE.md` |
| "Should this be a CSS variable?" | `design-system/references/token-architecture.md` |
| "How do I build this component?" | `ui-styling/REFERENCE.md` |
| "How do I add dark mode?" | `ui-styling/references/shadcn-theming.md` |
| "Which typeface should I use?" | `ui-styling/references/fonts-catalog.md` |
| "Is this on brand?" | `brand/references/consistency-checklist.md` |
| "Is this UI any good?" (audit) | `ui-ux-pro-max/REFERENCE.md` Quick Reference + `references/qa.md` |
| "Why does this look cheap / generic?" | `references/direction.md` §3 (anti-default critique) |
| "What size for this platform?" | `banner-design/references/banner-sizes-and-styles.md` or `references/social-photos-design.md` |
| "Create a logo" | `references/direction.md`, then hand-drawn SVG |
| "Stationery / corporate identity mockups" | HTML/CSS composition + Playwright export |
| "Generate SVG icons" | existing set (Lucide/Heroicons) or drawn SVG |
| "Build a pitch deck" | `slides/REFERENCE.md` |

## Common sequences

**New project, end to end**
`direction.md` → `brand/` (formalize) → `design-system/` (tokens) → `ui-styling/` (implement) → `qa.md`

**Existing project to evolve**
Read the brand doc and the tokens in the code → `direction.md` §0 (inherit) → module for the
deliverable → `qa.md`

**Visual campaign (several formats)**
`direction.md` **once** → adapt to each format via `banner-design/` or
`references/social-photos-design.md` → `qa.md` §A on each export.
One concept for the whole campaign: that is what makes it recognizable.

**Brand package**
`direction.md` **once** → SVG logo → applications (stationery, avatar, banner) →
`slides/` for the deck. One concept for the whole package.

## Commands

```bash
PY=$(command -v python3 || command -v python)
SKILL=~/.claude/skills/design-axel

node $SKILL/scripts/preflight.mjs                                       # machine state
$PY  $SKILL/ui-ux-pro-max/scripts/search.py "<query>" --design-system   # baseline to beat
node $SKILL/brand/scripts/inject-brand-context.cjs                      # brand doc → context
node $SKILL/design-system/scripts/generate-tokens.cjs -c tokens.json
node $SKILL/design-system/scripts/validate-tokens.cjs -d src/
npx shadcn@latest add button card input
```
