# Quality control — per deliverable

QA comes **after** art direction (`direction.md`), never before. It corrects; it does not design.

**Core rule: apply only the column for your deliverable.** The original version of this skill
imposed native-app rules (44×44 pt, safe areas, gestures, haptics) on every deliverable —
including Instagram PNGs and slides. Touch constraints on a still image protect nothing: they
flatten the composition.

| Deliverable | Checklist to apply | What to ignore |
|---|---|---|
| **Social visual** (banner, post, carousel, story, slide) | §A below | Anything about touch, OS safe areas, interaction states, navigation |
| **Web** (landing, dashboard, SaaS, site) | §A + §B | iOS/Android rules (haptics, hitSlop, tab bar, system gestures) |
| **Native / React Native app** | §A + §C + Quick Reference in `../ui-ux-pro-max/REFERENCE.md` | Desktop patterns (hover as primary interaction, breadcrumbs) |
| **Tokens / brand system** | §A + §D | §B and §C |

---

## §A — Common floor (every deliverable)

- [ ] The result matches the written concept (`direction.md` step 2) — colors, families, signature. No ad-hoc values.
- [ ] Text contrast: ≥ 4.5:1 for body, ≥ 3:1 for large headings. Measured, not assumed.
- [ ] The hierarchy holds without color (size, weight, space).
- [ ] One icon family, one stroke weight. No emoji standing in for icons.
- [ ] Consistent spacing rhythm (4/8 scale), no arbitrary values.
- [ ] No truncated text and no overflow at the actual output size.
- [ ] One visible boldness. If two elements shout, remove one.

## §B — Web

- [ ] Responsive verified at 375 px and at large widths; no horizontal scroll.
- [ ] Body text ≥ 16 px, measure of 60–75 characters per line on desktop.
- [ ] Visible keyboard focus on every interactive element (never remove the focus ring).
- [ ] `prefers-reduced-motion` respected.
- [ ] Images have dimensions (width/height or aspect-ratio) — no layout shift.
- [ ] Hover / active / disabled states defined, and distinct in both light and dark.
- [ ] One primary CTA per screen.

## §C — Native app

- [ ] Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android), 8 px between them.
- [ ] Safe areas respected (notch, Dynamic Island, gesture bar).
- [ ] Visual feedback on tap within 100 ms, with no layout shift.
- [ ] Light and dark tested separately, not inferred from one another.
- [ ] Dynamic Type / system text scaling without breakage.
- [ ] Screen reader order matches visual order; labels are descriptive.

## §D — Tokens / brand system

- [ ] Three layers respected: primitive → semantic → component.
- [ ] No raw hex inside components.
- [ ] Every semantic token has a value defined in **both** light and dark.
- [ ] Validation: `node $SKILL/design-system/scripts/validate-tokens.cjs --dir src/`

---

## Automatable checks

```bash
# anti-patterns and targeted UX rules
$PY $SKILL/ui-ux-pro-max/scripts/search.py "accessibility contrast loading states" --domain ux

# guidelines for the stack actually being shipped
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<topic>" --stack <html-tailwind|react|nextjs|react-native|...>
```

## Visual verification

Mandatory for **every** visual deliverable, banners and slides included (the original version
only asked for it on social photos — which is why composition defects slipped through).

1. Render or screenshot the deliverable at its final size.
2. **Look at it.** One batched pass: every size at once.
3. Fix everything the pass reveals.
4. At most one confirmation pass. No loop.

## Fonts fail silently

Declaring `font-family` loads nothing. An unloaded family falls back to `system-ui` with no
warning at all — the most common and most invisible defect. After loading, verify:

```js
await page.evaluate(() => document.fonts.ready);
const ok = await page.evaluate(() => document.fonts.check('700 74px "Bricolage Grotesque"'));
```

See `../ui-styling/references/fonts-catalog.md`.
