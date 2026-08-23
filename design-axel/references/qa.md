# Contrôle qualité — par type de livrable

Le contrôle qualité vient **après** la direction artistique (`direction.md`), jamais avant.
Il corrige, il ne conçoit pas.

**Règle centrale : n'applique que la colonne de ton livrable.** L'ancienne version de ce
skill imposait les règles d'app native (44×44pt, safe areas, gestes, haptique) à tous les
livrables — y compris à des PNG Instagram et à des slides. Des contraintes tactiles sur une
image fixe ne protègent rien : elles écrasent la composition.

| Livrable | Checklist à appliquer | Ce qu'il faut ignorer |
|---|---|---|
| **Visuel social** (bannière, post, carrousel, story, slide) | §A ci-dessous | Tout ce qui touche au tactile, aux safe areas OS, aux états d'interaction, à la navigation |
| **Web** (landing, dashboard, SaaS, site) | §A + §B | Les règles iOS/Android (haptique, hitSlop, tab bar, gestes système) |
| **App native / React Native** | §A + §C + Quick Reference de `../ui-ux-pro-max/REFERENCE.md` | Les patterns desktop (hover comme interaction primaire, breadcrumbs) |
| **Tokens / charte** | §A + §D | §B et §C |

---

## §A — Socle commun (tous livrables)

- [ ] Le rendu correspond au concept écrit (`direction.md` étape 2) — couleurs, familles, signature. Aucune valeur ad hoc.
- [ ] Contraste texte : ≥ 4.5:1 pour le corps, ≥ 3:1 pour les grands titres. Vérifié, pas supposé.
- [ ] La hiérarchie tient sans la couleur (taille, graisse, espace).
- [ ] Une seule famille d'icônes, une seule graisse de trait. Pas d'emoji en guise d'icône.
- [ ] Rythme d'espacement cohérent (échelle 4/8), pas de valeurs au hasard.
- [ ] Aucun texte tronqué ni débordement à la taille de rendu réelle.
- [ ] Une seule audace visible. Si deux éléments crient, en retirer un.

## §B — Web

- [ ] Responsive vérifié à 375 px et en grand écran ; pas de scroll horizontal.
- [ ] Corps de texte ≥ 16 px, mesure 60–75 caractères par ligne en desktop.
- [ ] Focus clavier visible sur tout élément interactif (ne jamais supprimer l'anneau de focus).
- [ ] `prefers-reduced-motion` respecté.
- [ ] Images dimensionnées (width/height ou aspect-ratio) — pas de saut de mise en page.
- [ ] États hover / actif / désactivé définis, et distincts en clair **et** en sombre.
- [ ] Un seul CTA primaire par écran.

## §C — App native

- [ ] Cibles tactiles ≥ 44×44 pt (iOS) / 48×48 dp (Android), 8 px entre elles.
- [ ] Safe areas respectées (encoche, Dynamic Island, barre de gestes).
- [ ] Retour visuel au tap sous 100 ms, sans décalage de mise en page.
- [ ] Modes clair et sombre testés séparément, pas déduits l'un de l'autre.
- [ ] Dynamic Type / mise à l'échelle du texte système sans casse.
- [ ] Ordre de lecture lecteur d'écran = ordre visuel ; libellés descriptifs.

## §D — Tokens / charte

- [ ] Trois couches respectées : primitive → sémantique → composant.
- [ ] Aucun hex brut dans les composants.
- [ ] Chaque token sémantique a une valeur définie en clair **et** en sombre.
- [ ] Validation : `node $SKILL/design-system/scripts/validate-tokens.cjs --dir src/`

---

## Passe de contrôle automatisable

```bash
# anti-patterns et règles UX ciblées
$PY $SKILL/ui-ux-pro-max/scripts/search.py "accessibility contrast loading states" --domain ux

# guidelines de la stack réellement utilisée
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<sujet>" --stack <html-tailwind|react|nextjs|react-native|...>
```

## Vérification visuelle

Obligatoire pour **tout** livrable visuel, y compris bannières et slides (l'ancienne version
ne la prévoyait que pour les photos sociales — c'est pour ça que des défauts de composition
passaient).

1. Rendre / screenshoter le livrable à sa taille finale.
2. **Le regarder.** Une passe groupée : toutes les tailles d'un coup.
3. Corriger tout ce que la passe révèle.
4. Au plus une seconde passe de confirmation. Pas de boucle.
