# Direction artistique — la passe obligatoire

**Aucun pixel, aucune ligne de CSS avant d'avoir traversé ce fichier.**

C'est l'étape qui manquait au skill. Sans elle, le pipeline était
`brief → recherche en base → HTML → export`, autrement dit : la première idée,
qui est toujours l'idée moyenne de la catégorie. Le résultat est correct, cochable,
et parfaitement oubliable.

---

## Étape 0 — Hériter avant d'inventer

Avant toute recherche, **lire le contexte du projet courant** (cwd) :

```bash
ls BRAND.md DESIGN.md PRODUCT.md design-system/MASTER.md docs/DA-*.md 2>/dev/null
```

- Un de ces fichiers existe → **c'est la source de vérité**. La direction ne se réinvente
  pas, elle se décline. Ton travail est de trouver, à l'intérieur de cette charte, la
  déclinaison la plus juste pour ce livrable précis.
- Une charte pose une règle qui te déplaît → tu l'appliques quand même, et tu signales
  le désaccord en une phrase. **Le brief gagne toujours.**
- Aucun fichier → tu es en terrain neuf, tu pars à l'étape 1.

Vérifier aussi les tokens réellement en place dans le code (`tailwind.config`, `:root`,
`theme.css`) : la vérité visuelle d'un projet est dans son code, pas dans un nom de fichier.

---

## Étape 1 — Ancrer dans le sujet

Si le brief ne dit pas ce qu'est le produit, **tranche toi-même et annonce ton choix** :
un sujet concret, une audience, **une** tâche que la page doit accomplir.

Les choix distinctifs viennent du monde du sujet — ses matériaux, ses instruments, ses
artefacts, son vocabulaire — jamais d'un catalogue de styles. Un cabinet comptable, une
salle d'escalade et une app de méditation n'ont aucune raison de partager la même grammaire
visuelle, même si la base de données les range tous en « service B2C ».

---

## Étape 2 — Le concept (livrable écrit, avant le code)

Produis ces quatre blocs, explicitement. Pas dans ta tête : écrits.

| Bloc | Exigence |
|---|---|
| **Couleur** | 4 à 6 valeurs hex **nommées** (le nom dit le rôle et l'intention, pas « primary-500 »). Une seule couleur porte l'accent. |
| **Typographie** | 2 à 3 familles avec rôles distincts : une display avec du caractère (utilisée avec retenue), une body complémentaire, éventuellement une utility pour données/légendes. **Deux fois la même famille pour display et body est un échec** — c'est le réflexe par défaut du moteur de recherche. |
| **Layout** | Un concept en une phrase + un wireframe ASCII. Comparer au moins deux options avant de trancher. |
| **Signature** | **L'unique élément par lequel ce livrable sera reconnu.** Un seul. C'est là que passe toute l'audace. |

---

## Étape 3 — La critique anti-défaut (gate)

Relis le concept et réponds honnêtement :

1. **« Est-ce que j'aurais produit exactement ça pour n'importe quel autre brief de cette catégorie ? »**
   Si oui → ce n'est pas une décision, c'est un réflexe. Reprendre l'axe fautif.
2. Le concept tombe-t-il dans un des trois looks saturés ?
   - fond crème ~`#F4F1EA` + serif fort + accent terracotta
   - fond quasi noir + un seul accent vert acide ou vermillon
   - mise en page « journal » : filets fins, `border-radius: 0`, colonnes denses
   Ces trois looks sont légitimes **si le brief les demande**. Sinon ce sont des défauts,
   pas des choix.
3. Même vigilance sur les styles que les anciennes versions de ce skill mettaient en avant :
   glassmorphism, dégradé violet→bleu, néon/cyberpunk, bento grid. Saturés. À justifier ou à écarter.
4. Les marqueurs structurels (01 / 02 / 03, eyebrows, filets, badges) n'ont le droit d'exister
   que s'ils **encodent une information vraie**. Une séquence numérotée sur trois blocs qui ne
   sont pas une séquence est de la décoration.
5. **Une seule audace.** Si deux éléments se disputent l'attention, il n'y a plus de signature.
   Avant de livrer : retirer un accessoire.

Écris en une ligne ce que tu as changé après cette critique, et pourquoi. Si tu n'as rien
changé, c'est probablement que tu n'as pas fait la critique.

---

## Étape 4 — Baseline à battre (facultatif, mais éclairant)

Le moteur `ui-ux-pro-max` sert ici comme **anti-référence** : il te dit ce que tout le
monde livrerait.

```bash
$PY $SKILL/ui-ux-pro-max/scripts/search.py "<produit industrie ton>" --design-system
```

Lis la sortie, puis demande-toi sur quel axe tu t'en écartes **et pourquoi**.
Si ton concept ressemble trait pour trait à cette sortie, tu n'as pas encore de concept.

Ce que ce moteur reste **très bon** à faire, et qu'il faut lui prendre :
- les contraintes d'accessibilité et de contraste (`--domain ux`) ;
- les anti-patterns explicites de sa sortie ;
- les guidelines par stack (`--stack <stack>`) ;
- les recommandations de type de graphique (`--domain chart`).

---

## Étape 5 — Construire, puis critiquer pour de vrai

- Coder **exactement** le concept validé. Chaque couleur et chaque taille de texte se dérive
  du bloc de l'étape 2. Aucune valeur qui n'y figure pas.
- Attention aux spécificités CSS qui s'annulent (un sélecteur d'élément qui écrase une classe
  de section, typiquement sur les marges verticales entre sections).
- **Vérification obligatoire** : une passe de screenshots groupée (desktop + mobile ensemble),
  corriger tout ce qu'elle montre, puis **au plus une** seconde passe. Pas de cycle
  screenshot-par-retouche : ça coûte cher et ça ne monte pas le niveau.
- Puis seulement : le contrôle qualité (`references/qa.md`).

---

## Mode `--safe`

Si l'utilisateur demande explicitement du conventionnel (client conservateur, outil interne,
contrainte de conformité), les étapes 2 et 3 restent obligatoires, mais l'audace de la
signature descend d'un cran : la distinction passe alors par la **précision** — rythme
d'espacement, échelle typographique, qualité des états — plutôt que par l'expression.
Un design sobre n'est pas un design par défaut.
