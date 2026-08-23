# Catalogue de fontes — 29 familles libres, choisies pour leur caractère

Sélection curée, toutes sous **SIL Open Font License** et toutes disponibles sur
[Google Fonts](https://fonts.google.com). Ce fichier a remplacé un dossier de 54 fichiers
TTF (5,6 Mo) qu'aucun script ne chargeait : leur seul usage réel était de **parcourir la
liste pour choisir**. C'est ce que fait ce catalogue, à 3 Ko.

## Comment s'en servir

Charger au moment de composer, jamais en local :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Instrument+Sans:wght@400;500&display=block" rel="stylesheet">
```

`display=block` plutôt que `swap` pour un visuel exporté en PNG : on veut la vraie fonte au
rendu, pas un repli figé dans l'image. Et **vérifier** après chargement, sinon l'échec est
silencieux :

```js
await page.evaluate(() => document.fonts.ready);
const ok = await page.evaluate(() => document.fonts.check('700 74px "Bricolage Grotesque"'));
```

> Déclarer `font-family` ne charge rien. Une famille non chargée retombe sur `system-ui`
> sans le moindre avertissement — le défaut le plus courant, et le plus invisible.

## Display — porter la personnalité

| Famille | Caractère | Va bien pour |
|---|---|---|
| **Bricolage Grotesque** | Grotesque à largeurs irrégulières, optical sizing. Personnalité sans passer par un serif | Titres éditoriaux, produits qui veulent du caractère sans être sages |
| **Young Serif** | Serif trapu, empattements francs, très présent | Titres alimentaires, artisanat, éditorial chaleureux |
| **Gloock** | Didone à contraste extrême, verticalité marquée | Luxe, mode, culture. À réserver aux très grandes tailles |
| **Italiana** | Romaine fine, élégante, presque gravée | Beauté, joaillerie, invitations |
| **Poiret One** | Géométrique Art déco, traits filiformes | Affiches, façades, années 20 |
| **Boldonse** | Display expérimental, formes compressées | Une seule ligne, en très grand. Illisible en petit |
| **Erica One** | Grasse, arrondie, foraine | Promos, événements, ton exubérant |
| **Big Shoulders** | Condensée américaine, très haute | Titres denses, signalétique, sport |
| **Tektur** | Technique, coins coupés, aspect machine | Gaming, industrie, science-fiction sobre |
| **Smooch Sans** | Condensée légère, allongée | Éditorial mode, superpositions |
| **Arsenal SC** | Petites capitales, humaniste | Sous-titres, exergues, mentions de section |

## Texte — se taire et se lire

| Famille | Caractère | Va bien pour |
|---|---|---|
| **Instrument Sans** | Grotesque neutre, dessin propre, très bon en petit | Corps de texte, interfaces. Valeur sûre |
| **Work Sans** | Humaniste souple, chaleur discrète | Corps long, sites institutionnels |
| **Outfit** | Géométrique régulière, moderne | SaaS, produits tech grand public |
| **Jura** | Sans à squelette technique, léger | Data, dashboards, ton scientifique |
| **National Park** | Inspirée de la signalétique des parcs US | Outdoor, tourisme, cartographie |
| **Lora** | Serif de lecture, italiques calligraphiques | Articles longs, blogs, contenu à lire |
| **Crimson Pro** | Serif classique de labeur, italique fine | Livres, essais, docs académiques |
| **Libre Baskerville** | Baskerville taillée pour l'écran, large | Corps de texte à l'ancienne, presse |
| **IBM Plex Serif** | Serif corporate au dessin franc | Documentation technique lisible |
| **Instrument Serif** | Serif display fine, très contrastée | Titres d'article, chapeaux |

## Mono — chiffres, code, tableaux de bord

Toutes ont des **chiffres tabulaires** : indispensable dès qu'une valeur change et ne doit
pas faire danser la mise en page.

| Famille | Caractère | Va bien pour |
|---|---|---|
| **Geist Mono** | Neutre, ouverte, très lisible en petit | Données, légendes, libellés d'interface |
| **JetBrains Mono** | Dessinée pour le code, hauteur d'x généreuse | Blocs de code, terminaux |
| **IBM Plex Mono** | Mono corporate, légère chaleur | Documentation, extraits techniques |
| **DM Mono** | Mono géométrique, italique élégante | Étiquettes, éditorial technique |
| **Red Hat Mono** | Mono contemporaine, formes larges | Interfaces développeur |

## Accents — un mot, pas un paragraphe

| Famille | Caractère | Va bien pour |
|---|---|---|
| **Silkscreen** | Bitmap 8 bits | Rétro, jeu, badge. Un mot maximum |
| **Pixelify Sans** | Pixel plus lisible que Silkscreen | Gaming avec un peu de texte |
| **Nothing You Could Do** | Manuscrite au stylo, penchée | Annotation, signature, note en marge |

## Appariements de départ

Trois familles à rôles distincts valent mieux qu'une seule déclinée en poids — voir
`../../references/direction.md` §2. **Display et texte identiques est un échec**, c'est le
réflexe par défaut du moteur de recommandation.

| Intention | Display | Texte | Données |
|---|---|---|---|
| Produit à caractère | Bricolage Grotesque | Instrument Sans | Geist Mono |
| Éditorial chaleureux | Young Serif | Lora | IBM Plex Mono |
| Luxe / culture | Gloock | Crimson Pro | DM Mono |
| Technique / data | Tektur | Jura | JetBrains Mono |
| Institutionnel sobre | Instrument Serif | Work Sans | Geist Mono |
| Rétro / jeu | Silkscreen *(un mot)* | Outfit | Pixelify Sans |

Ces appariements sont des **points de départ, pas des réponses**. Si le concept sort
identique à la ligne du tableau, c'est qu'il n'y a pas encore de concept.
