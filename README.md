# design-axel

A Claude Code skill for UI/UX design. Corrected fork of the `design` skill from
[claudekit](https://github.com/carlrannaberg/claudekit), which bundled several UI/UX skills
into one.

The fork exists for a specific reason: **the original produced generic work**, and not by
accident. Three causes, all fixed here.

## What was broken

### 1. The search engine never ran

`ui-ux-pro-max/scripts` and `ui-ux-pro-max/data` were **unresolved git symlinks**: on Windows,
two text files of 31 and 34 bytes. The database of 161 palettes, 57 type pairings and 99 UX
rules was therefore unreachable, and the model improvised.

Every command also invoked `python3`, which does not exist on Windows.

Fixed: symlinks replaced with real directories, a `$PY` / `$SKILL` convention, and a preflight
(`scripts/preflight.mjs`) that checks the machine before you start.

### 2. Three doctrines contradicted each other, with no arbiter

`ui-ux-pro-max` prescribes *sticking to* your product category: style recommended by industry,
palette pulled from a database, consistency above all. Alongside it, Anthropic's design skills
(`frontend-design`) ask for the opposite: avoid defaults, commit to a point of view. Nothing
arbitrated, so the model followed the most tickable doctrine and shipped **the statistical
average of the category**.

A real example, query "productivity saas all-in-one":

```
Colors:     #0D9488 (teal) + #EA580C (orange)
Typography: Plus Jakarta Sans for display AND body
Style:      Motion-Driven
```

Fixed: an explicit, ordered doctrine, with `ui-ux-pro-max` **demoted to corrector**:

```
0. preflight   -> what works on this machine
1. project     -> inherit before inventing (BRAND.md, DESIGN.md, tokens in the code)
2. DIRECTION   -> concept + signature element + anti-default critique  (references/direction.md)
3. production  -> build exactly the concept you committed to
4. QA          -> ui-ux-pro-max as corrector                           (references/qa.md)
5. verify      -> screenshot, look at it, fix. One batched pass.
```

Step 2 did not exist. It is what was missing most: the pipeline ran
`brief -> database lookup -> HTML -> export`, which always means the first idea.

### 3. React Native scope hard-coded

`ui-ux-pro-max` declared "Stack: React Native (this project's only tech stack)" and exposed a
single stack, while **16** exist in its database. Two scope notices explicitly excluded the
web. The result: 44x44 pt targets, safe areas and haptics enforced on banners and web pages.

Fixed: 16 stacks exposed, native rules conditioned on the deliverable type
(`references/qa.md` applies one checklist per deliverable).

## Other changes

- Size: **25 MB to 2.5 MB**, 106 files. Removed because nothing reached them:
  `_claude-nested-copies.disabled/` (6.6 MB of complete copies of the sub-skills), 6 reference
  files duplicated byte for byte, the upstream scaffolding for Warp/Windsurf/Cursor, upstream
  unit tests and a `.coverage` artifact.
- **54 TTF files (5.6 MB) replaced by a catalogue.** No script ever loaded them: their only
  use was being browsed to choose from. `ui-styling/references/fonts-catalog.md` now lists the
  29 families with their character, their uses and starting pairings, in 3 KB; fonts are
  loaded from Google Fonts at compose time.
- `references/design-routing.md` rewritten: it described 8 sub-skills that no longer exist.
- `SKILL.md`: 307 to 128 lines, a router instead of a command catalogue.
- **AI image generation removed.** The logo / CIP / icon modules called the Gemini API. Logos,
  icons and mockups are now produced in pure HTML/CSS/SVG exported through Playwright:
  deterministic, reproducible, diffable, with no key and no quota.
- Fully English, and free of any reference to the project it was developed against.

## Installation

```bash
git clone https://github.com/kelax12/design-skill.git
cp -r design-skill/design-axel ~/.claude/skills/
node ~/.claude/skills/design-axel/scripts/preflight.mjs
```

The preflight must print `No blockers`. It also gives the `PY` and `SKILL` values the skill's
commands assume:

```bash
PY=$(command -v python3 || command -v python)   # Windows: python, not python3
SKILL=~/.claude/skills/design-axel
```

Invoke with `/design-axel <deliverable> <context>`, or `--safe` for a deliberately
conventional result (the direction pass still applies, the boldness drops one notch).

**Renaming it**: the directory name and the `name:` field in `SKILL.md` must match. Change
both, or the skill will not load.

## Requirements

| Needed | For |
|---|---|
| Python 3 | the `ui-ux-pro-max` engine (styles, palettes, type, UX, stacks) |
| Node 18+ | preflight |
| Playwright | PNG export of visuals, `npx playwright install chromium` |

## Structure

```
design-axel/
  SKILL.md                    router + doctrine
  LICENSE
  references/
    direction.md              THE art direction pass (mandatory)
    qa.md                     quality checklists, one per deliverable type
    design-routing.md         routing by question
    social-photos-design.md
  ui-ux-pro-max/              design search engine (corrector, not director)
  ui-styling/                 shadcn/ui + Tailwind, catalogue of 29 libre typefaces
  design-system/              three-layer tokens, component specs
  brand/                      identity, voice, consistency
  banner-design/              social / ad / web / print banners
  slides/                     HTML presentations + Chart.js
  scripts/preflight.mjs       machine state
```

## Licensing and attribution

This repository redistributes third-party work, kept with its licenses:

- the `design` skill and its sub-skills, from [claudekit](https://github.com/carlrannaberg/claudekit), MIT
- the `ui-ux-pro-max` module, see `design-axel/ui-ux-pro-max/LICENSE`
- the 29 families named in `fonts-catalog.md` are under the SIL Open Font License; this
  repository no longer redistributes the binaries, it only names them

Fork-specific additions (`references/direction.md`, `references/qa.md`,
`scripts/preflight.mjs`, `SKILL.md`) are MIT. See `design-axel/LICENSE`.
