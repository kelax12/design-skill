# Font catalogue — 29 libre families, chosen for their character

A curated selection, all under the **SIL Open Font License** and all available on
[Google Fonts](https://fonts.google.com). This file replaced a folder of 54 TTF files (5.6 MB)
that no script ever loaded: their only real use was **browsing the list to choose**. That is
what this catalogue does, in 3 KB.

## How to use it

Load at compose time, never from disk:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Instrument+Sans:wght@400;500&display=block" rel="stylesheet">
```

Use `display=block` rather than `swap` for a visual exported to PNG: you want the real face at
render time, not a fallback frozen into the image. And **verify** after loading, otherwise
failure is silent:

```js
await page.evaluate(() => document.fonts.ready);
const ok = await page.evaluate(() => document.fonts.check('700 74px "Bricolage Grotesque"'));
```

> Declaring `font-family` loads nothing. An unloaded family falls back to `system-ui` with no
> warning whatsoever — the most common defect, and the most invisible.

## Display — carry the personality

| Family | Character | Good for |
|---|---|---|
| **Bricolage Grotesque** | Grotesque with irregular widths, optical sizing. Personality without reaching for a serif | Editorial headlines, products that want character without being tame |
| **Young Serif** | Stocky serif, blunt slabs, very present | Food, craft, warm editorial headlines |
| **Gloock** | Didone with extreme contrast, strong verticals | Luxury, fashion, culture. Large sizes only |
| **Italiana** | Fine roman, elegant, almost engraved | Beauty, jewellery, invitations |
| **Poiret One** | Geometric Art Deco, hairline strokes | Posters, facades, 1920s |
| **Boldonse** | Experimental display, compressed forms | One line, very large. Illegible small |
| **Erica One** | Heavy, rounded, fairground | Promotions, events, exuberant tone |
| **Big Shoulders** | American condensed, very tall | Dense headlines, wayfinding, sport |
| **Tektur** | Technical, cut corners, machined look | Gaming, industry, restrained sci-fi |
| **Smooch Sans** | Light condensed, elongated | Fashion editorial, overlays |
| **Arsenal SC** | Small caps, humanist | Subheads, pull quotes, section markers |

## Text — get out of the way

| Family | Character | Good for |
|---|---|---|
| **Instrument Sans** | Neutral grotesque, clean drawing, excellent small | Body copy, interfaces. The safe choice |
| **Work Sans** | Supple humanist, quiet warmth | Long copy, institutional sites |
| **Outfit** | Even geometric, modern | SaaS, consumer tech products |
| **Jura** | Sans with a technical skeleton, light | Data, dashboards, scientific tone |
| **National Park** | Drawn from US national park signage | Outdoor, travel, cartography |
| **Lora** | Reading serif, calligraphic italics | Long articles, blogs, content meant to be read |
| **Crimson Pro** | Classic text serif, fine italic | Books, essays, academic docs |
| **Libre Baskerville** | Baskerville cut for screens, wide | Traditional body copy, press |
| **IBM Plex Serif** | Corporate serif with a frank drawing | Readable technical documentation |
| **Instrument Serif** | Fine display serif, high contrast | Article titles, standfirsts |

## Mono — figures, code, dashboards

All have **tabular figures**: essential as soon as a value changes and must not make the
layout dance.

| Family | Character | Good for |
|---|---|---|
| **Geist Mono** | Neutral, open, very legible small | Data, captions, interface labels |
| **JetBrains Mono** | Drawn for code, generous x-height | Code blocks, terminals |
| **IBM Plex Mono** | Corporate mono, slight warmth | Documentation, technical excerpts |
| **DM Mono** | Geometric mono, elegant italic | Labels, technical editorial |
| **Red Hat Mono** | Contemporary mono, wide forms | Developer interfaces |

## Accents — one word, not a paragraph

| Family | Character | Good for |
|---|---|---|
| **Silkscreen** | 8-bit bitmap | Retro, gaming, badges. One word maximum |
| **Pixelify Sans** | More legible than Silkscreen | Gaming with actual text |
| **Nothing You Could Do** | Ballpoint handwriting, slanted | Annotation, signature, margin note |

## Starting pairings

Three families with distinct roles beat one family in several weights — see
`../../references/direction.md` §2. **Identical display and body is a failure**: it is the
recommendation engine's default reflex.

| Intent | Display | Text | Data |
|---|---|---|---|
| Product with character | Bricolage Grotesque | Instrument Sans | Geist Mono |
| Warm editorial | Young Serif | Lora | IBM Plex Mono |
| Luxury / culture | Gloock | Crimson Pro | DM Mono |
| Technical / data | Tektur | Jura | JetBrains Mono |
| Restrained institutional | Instrument Serif | Work Sans | Geist Mono |
| Retro / gaming | Silkscreen *(one word)* | Outfit | Pixelify Sans |

These pairings are **starting points, not answers**. If the concept comes out identical to a
row in this table, there is no concept yet.
