# Routage — quel module pour quelle question

Ce fichier décrivait autrefois 8 sous-skills séparés (`→ brand`, `→ logo-design`, …) avec des
chemins `node .claude/skills/brand/scripts/…`. Ces skills n'existent plus : tout est devenu
**module interne** de `design-axel`. La table de routage qui fait foi est celle du `SKILL.md`.
Ce fichier ne garde que le routage par *question*, qui reste utile.

**Rappel de doctrine :** quelle que soit l'entrée, `references/direction.md` passe en premier
pour tout livrable visuel. Les modules ci-dessous exécutent une direction déjà arrêtée.

## Par question

| Question | Où aller |
|---|---|
| « À quoi ça doit ressembler ? » | `references/direction.md` — **toujours ici en premier** |
| « Quelle couleur pour ça ? » | `brand/REFERENCE.md` si une charte existe, sinon `direction.md` §2 |
| « Comment créer un token pour X ? » | `design-system/REFERENCE.md` |
| « Faut-il une variable CSS ici ? » | `design-system/references/token-architecture.md` |
| « Comment construire ce composant ? » | `ui-styling/REFERENCE.md` |
| « Comment ajouter le mode sombre ? » | `ui-styling/references/shadcn-theming.md` |
| « Est-ce on-brand ? » | `brand/references/consistency-checklist.md` |
| « Cette UI est-elle correcte ? » (audit) | `ui-ux-pro-max/REFERENCE.md` Quick Reference + `references/qa.md` |
| « Pourquoi ça fait cheap / générique ? » | `references/direction.md` §3 (critique anti-défaut) |
| « Quelle taille pour cette plateforme ? » | `banner-design/references/banner-sizes-and-styles.md` ou `references/social-photos-design.md` |
| « Créer un logo » | `references/direction.md` puis SVG dessine a la main |
| « Mockups de papeterie / identité corporate » | composition HTML/CSS + export Playwright |
| « Générer des icônes SVG » | jeu existant (Lucide/Heroicons) ou SVG dessine |
| « Créer un pitch deck » | `slides/REFERENCE.md` |

## Enchaînements courants

**Nouveau projet complet**
`direction.md` → `brand/` (formaliser) → `design-system/` (tokens) → `ui-styling/` (implémenter) → `qa.md`

**Projet existant à faire évoluer**
Lire la charte et les tokens du code → `direction.md` §0 (hériter) → module du livrable → `qa.md`

**Campagne visuelle (plusieurs formats)**
`direction.md` **une seule fois** → décliner sur chaque format via `banner-design/` ou
`references/social-photos-design.md` → `qa.md` §A sur chaque export.
Un seul concept pour toute la campagne : c'est ce qui la rend reconnaissable.

**Package de marque**
`direction.md` **une seule fois** → logo SVG → declinaisons (papeterie, avatar, banniere)
→ `slides/` pour la presentation. Un seul concept pour tout le package.

## Commandes

```bash
PY=$(command -v python3 || command -v python)
SKILL=~/.claude/skills/design-axel

node $SKILL/scripts/preflight.mjs                                   # état machine
$PY  $SKILL/ui-ux-pro-max/scripts/search.py "<query>" --design-system   # baseline à battre
node $SKILL/brand/scripts/inject-brand-context.cjs                  # charte → contexte
node $SKILL/design-system/scripts/generate-tokens.cjs -c tokens.json
node $SKILL/design-system/scripts/validate-tokens.cjs -d src/
npx shadcn@latest add button card input
```
