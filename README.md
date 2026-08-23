# design-axel

Skill Claude Code de design UI/UX. Fork corrigé du skill `design` de
[claudekit](https://github.com/carlrannaberg/claudekit), qui compilait plusieurs
skills d'UI/UX en un seul.

Le fork existe pour une raison précise : **la version d'origine produisait des rendus
génériques**, et pas par hasard. Trois causes, toutes corrigées ici.

## Ce qui était cassé

### 1. Le moteur de recherche ne tournait pas

`ui-ux-pro-max/scripts` et `ui-ux-pro-max/data` étaient des **symlinks git non résolus** :
sous Windows, deux fichiers texte de 31 et 34 octets. La base de 161 palettes, 57 appariements
typographiques et 99 règles UX était donc inaccessible, et le modèle improvisait.

Toutes les commandes invoquaient par ailleurs `python3`, qui n'existe pas sous Windows.

→ Symlinks remplacés par de vrais dossiers, convention `$PY` / `$SKILL`, et un preflight
(`scripts/preflight.mjs`) qui vérifie la machine avant de commencer.

### 2. Trois doctrines se contredisaient, sans arbitre

`ui-ux-pro-max` prescrit de *coller* à sa catégorie de produit : style recommandé par
industrie, palette tirée d'une base, cohérence avant tout. À côté, les skills de design
d'Anthropic (`frontend-design`) demandent l'inverse — éviter les défauts, assumer un point
de vue. Rien ne tranchait, donc le modèle suivait la doctrine la plus cochable, et livrait
**la moyenne statistique de la catégorie**.

Exemple réel, requête « productivity saas all-in-one » :

```
Colors:     #0D9488 (teal) + #EA580C (orange)
Typography: Plus Jakarta Sans en display ET en body
Style:      Motion-Driven
```

→ Doctrine explicite et ordonnée, `ui-ux-pro-max` **rétrogradé en correcteur** :

```
0. preflight   → ce qui marche sur cette machine
1. charte      → hériter avant d'inventer (BRAND.md, DESIGN.md, tokens du code)
2. DIRECTION   → concept + élément signature + critique anti-défaut  ← references/direction.md
3. production  → coder exactement le concept validé
4. QA          → ui-ux-pro-max en correcteur                          ← references/qa.md
5. vérif       → screenshot, regarder, corriger. 1 passe groupée.
```

L'étape 2 n'existait pas. C'est elle qui manquait le plus : le pipeline allait de
`brief → recherche en base → HTML → export`, c'est-à-dire toujours la première idée.

### 3. Scope React Native codé en dur

`ui-ux-pro-max` déclarait « Stack: React Native (this project's only tech stack) » et
n'exposait qu'un seul stack, alors que **16** existent dans sa base. Deux notes de périmètre
excluaient explicitement le web. Résultat : des contraintes 44×44 pt, safe areas et haptique
appliquées à des bannières et à des pages web.

→ 16 stacks exposés, règles natives conditionnées au type de livrable
(`references/qa.md` applique une checklist par livrable).

## Autres correctifs

- Poids : **25 Mo → 2,5 Mo**, 105 fichiers. Supprimés parce que rien ne les atteignait :
  `_claude-nested-copies.disabled/` (6,6 Mo de copies complètes des sous-skills), 6 fichiers
  de références dupliqués à l'octet près, le scaffolding amont pour Warp/Windsurf/Cursor,
  les tests unitaires amont et un artefact `.coverage`.
- **54 fichiers TTF (5,6 Mo) remplacés par un catalogue.** Aucun script ne les chargeait :
  leur seul usage était d'être parcourus pour choisir. `ui-styling/references/fonts-catalog.md`
  liste désormais les 29 familles avec leur caractère, leurs usages et des appariements
  de départ, en 3 Ko ; on charge depuis Google Fonts au moment de composer.
- `references/design-routing.md` réécrit : il décrivait 8 sous-skills qui n'existent plus.
- `SKILL.md` : 307 → 128 lignes, routeur au lieu de catalogue de commandes.
- **Génération d'images par IA retirée.** Les modules logo / CIP / icônes appelaient l'API
  Gemini. Logo, icônes et mockups se produisent désormais en HTML/CSS/SVG pur exporté via
  Playwright : déterministe, reproductible, versionnable, sans clé ni quota.

## Installation

```bash
git clone https://github.com/kelax12/design-skill.git
cp -r design-skill/design-axel ~/.claude/skills/
node ~/.claude/skills/design-axel/scripts/preflight.mjs
```

Le preflight doit afficher `Aucun bloquant`. Il donne aussi les valeurs de `PY` et `SKILL`
que les commandes du skill supposent :

```bash
PY=$(command -v python3 || command -v python)   # Windows : python, pas python3
SKILL=~/.claude/skills/design-axel
```

Invocation : `/design-axel <livrable> <contexte>`, ou `--safe` pour un rendu conventionnel
assumé (la direction reste obligatoire, l'audace baisse d'un cran).

## Prérequis

| Requis | Pour |
|---|---|
| Python 3 | moteur `ui-ux-pro-max` (styles, palettes, typos, UX, stacks) |
| Node ≥ 18 | preflight |
| Playwright | export PNG des visuels — `npx playwright install chromium` |

## Structure

```
design-axel/
├── SKILL.md                    routeur + doctrine
├── references/
│   ├── direction.md            LA passe de direction artistique (obligatoire)
│   ├── qa.md                   checklists de contrôle, une par type de livrable
│   ├── design-routing.md       routage par question
│   └── social-photos-design.md
├── ui-ux-pro-max/              moteur de recherche design (correcteur, pas directeur)
├── ui-styling/                 shadcn/ui + Tailwind, catalogue de 29 fontes libres
├── design-system/              tokens en 3 couches, specs de composants
├── brand/                      identité, voix, cohérence
├── banner-design/              bannières social / pub / web / print
├── slides/                     présentations HTML + Chart.js
└── scripts/preflight.mjs       état de la machine
```

## Licences et attribution

Ce dépôt redistribue du travail de tiers, conservé avec ses licences :

- skill `design` et sous-skills — [claudekit](https://github.com/carlrannaberg/claudekit), MIT
- module `ui-ux-pro-max` — voir `design-axel/ui-ux-pro-max/LICENSE`
- les 29 familles citées dans `fonts-catalog.md` sont sous SIL Open Font License ; le dépôt
  ne redistribue plus les binaires, il ne fait que les nommer

Les ajouts propres à ce fork (`references/direction.md`, `references/qa.md`,
`scripts/preflight.mjs`, `SKILL.md`) sont sous MIT.
