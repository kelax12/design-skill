---
name: design-axel
description: "Design UI/UX et assets visuels, avec direction artistique assumée. Utiliser pour concevoir, refondre, critiquer ou finaliser une interface (landing, dashboard, SaaS, site, app mobile), pour produire des visuels (bannières, posts et carrousels réseaux sociaux, stories, slides, logos, identité de marque, icônes), ou pour choisir couleurs, typographies, espacement et layout. Couvre aussi les design tokens, shadcn/ui + Tailwind, l'accessibilité et le mode sombre."
argument-hint: "[livrable] [contexte]  ·  --safe pour un rendu conventionnel"
license: MIT
metadata:
  author: claudekit (fork Axel)
  version: "3.1.0"
---

# design-axel

Skill unifié de design. Fork corrigé de `claudekit/design` : moteur de recherche réparé,
scope mobile déverrouillé, doublons supprimés, et surtout **une doctrine explicite** à la
place de trois doctrines qui se contredisaient.

## Doctrine — l'ordre n'est pas négociable

```
0. preflight      →  savoir ce qui marche sur cette machine
1. charte projet  →  hériter avant d'inventer (BRAND.md, DESIGN.md, tokens du code)
2. DIRECTION      →  concept + élément signature + critique anti-défaut   ← references/direction.md
3. production     →  coder exactement le concept validé
4. QA             →  ui-ux-pro-max en correcteur, checklist du livrable   ← references/qa.md
5. vérification   →  screenshot, regarder, corriger. 1 passe groupée.
```

**Ce qui change par rapport à la version d'origine :** `ui-ux-pro-max` n'est plus la source
des idées, il est le correcteur en fin de chaîne. Ses recommandations de style et de palette
sont la moyenne statistique d'une catégorie de produit — c'est précisément ce qui produit
des rendus corrects et oubliables. **L'étape 2 ne se saute jamais**, y compris pour une
simple bannière.

## Étape 0 — Preflight (une fois par session)

```bash
node ~/.claude/skills/design-axel/scripts/preflight.mjs
```

Il affiche la valeur de `PY` et `SKILL` à utiliser ensuite, et dit quels modules sont
réellement disponibles. Toutes les commandes de ce skill supposent :

```bash
PY=$(command -v python3 || command -v python)   # Windows : python, pas python3
SKILL=~/.claude/skills/design-axel
```

## Étape 1 — Hériter de la charte du projet

```bash
ls BRAND.md DESIGN.md PRODUCT.md design-system/MASTER.md docs/DA-*.md 2>/dev/null
```

Si un de ces fichiers existe, **il fait foi** : la direction se décline, elle ne se réinvente
pas. Vérifier aussi les tokens réels du code (`tailwind.config`, `:root`, `theme.css`).
Détail dans `references/direction.md` §0.

## Étape 2 — Direction artistique (obligatoire)

**Charger `references/direction.md` et le suivre.** Sortie attendue avant toute ligne de code :
4-6 hex nommés · 2-3 familles typographiques avec rôles distincts · un concept de layout ·
**un** élément signature · la critique anti-défaut écrite.

## Routage par livrable

| Livrable | Modules à charger | QA |
|---|---|---|
| Landing, site, dashboard, SaaS | `references/direction.md` → `ui-styling/REFERENCE.md` | `references/qa.md` §A+§B |
| App mobile / React Native | `references/direction.md` → `ui-ux-pro-max/REFERENCE.md` (Quick Reference) | `references/qa.md` §A+§C |
| Bannière, cover, header, pub | `references/direction.md` → `banner-design/REFERENCE.md` | `references/qa.md` §A |
| Post, carrousel, story réseaux sociaux | `references/direction.md` → `references/social-photos-design.md` | `references/qa.md` §A |
| Présentation, pitch deck | `references/direction.md` → `slides/REFERENCE.md` | `references/qa.md` §A |
| Identité de marque, voix, assets | `brand/REFERENCE.md` | `references/qa.md` §A |
| Tokens, variables CSS, thèmes | `design-system/REFERENCE.md` | `references/qa.md` §A+§D |
| Revue / audit d'une UI existante | `ui-ux-pro-max/REFERENCE.md` Quick Reference | `references/qa.md` |

Un seul chemin canonique par tâche : les modules (`slides/`, `banner-design/`, …) sont la
référence, `references/` ne contient plus que ce qui n'a pas de module dédié.

## Étape 4 — QA (correcteur, pas directeur)

**Charger `references/qa.md`** et n'appliquer que la checklist du livrable.
Ne jamais imposer les règles d'app native (44 pt, safe areas, gestes, haptique) à un
visuel statique ou à une page web — c'est faux et ça écrase la composition.

```bash
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<produit industrie ton>" --design-system   # baseline à battre
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<sujet>" --domain ux                       # anti-patterns, a11y
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<sujet>" --stack <stack>                   # 16 stacks disponibles
```

Domaines : `product` `style` `color` `typography` `landing` `chart` `ux` `google-fonts`
`react` `web` `prompt`. Stacks : `html-tailwind` `shadcn` `react` `nextjs` `vue` `nuxtjs`
`nuxt-ui` `svelte` `angular` `astro` `react-native` `flutter` `swiftui` `jetpack-compose`
`threejs` `laravel`.

## Pas de generation d'images par IA

Ce skill ne genere **aucune image par IA**. Logo, identite corporate et icones se produisent
en **HTML/CSS/SVG pur**, exportes via Playwright : c'est deterministe, reproductible,
versionnable en clair, net a toute taille, et ca ne depend d'aucune cle ni d'aucun quota.

- **Logo / marque** : SVG dessine a la main. Si le projet a deja un logo (souvent
  `assets/`, `public/`, ou nomme dans la charte), **le reutiliser** plutot que d'en inventer un.
- **Icones** : prendre un jeu existant coherent (Lucide, Heroicons) ou dessiner en SVG.
  Une seule famille, une seule graisse de trait (cf. `references/qa.md` §A).
- **Mockups / mises en situation** : composition HTML/CSS (ombre, perspective, masque),
  ou photo fournie par le client.

## Scripts

| Script | Usage |
|---|---|
| `scripts/preflight.mjs` | État de la machine — à lancer en premier |
| `ui-ux-pro-max/scripts/search.py` | Moteur de recherche design (styles, palettes, typos, UX, stacks) |
| `brand/scripts/` · `design-system/scripts/` | Injection de charte, génération et validation de tokens |

## Mode `--safe`

Rendu conventionnel assumé (client conservateur, outil interne). Les étapes 2 et 3 restent
obligatoires : la distinction passe alors par la précision — rythme d'espacement, échelle
typographique, qualité des états — au lieu de l'expression. Un design sobre n'est pas un
design par défaut.
