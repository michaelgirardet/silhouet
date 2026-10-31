# Silhouet — Guide de marque

## La marque

**Le S découpé** — un S épais tracé en deux arcs, coupé en son milieu par la
ligne pointillée de découpe : le même trait pointillé que le dropzone du site.
Le S est la lettre, la ligne est le geste de l'outil.

## Construction

- Canevas 256×256, marque centrée sur (128, 128).
- S : deux arcs de 270°, rayon 40, centres (128, 88) et (128, 168),
  trait de 34, extrémités rondes. Le tracé part de (168, 88), boucle par
  la gauche, croise en (128, 128), puis boucle par le bas jusqu'à (168, 168).
- Ligne de découpe : horizontale à y = 128, de x = 40 à x = 216, trait 7,
  pointillés 18/14, Ambre `#e8a33d`.
- La marque est volontairement construite en traits (`stroke`), pas en formes
  pleines : deux éléments, cinq ancres. Recolorier passe par l'attribut
  `stroke`, pas par un détourage.
- Variante petits formats (`silhouet-mark-small.svg`, ≤ 32 px) : la ligne
  passe à 12 d'épaisseur, pointillés 30/18, pour survivre au rendu subpixel.
- Wordmark : « SILHOUET » en Space Grotesk 500, lettres vectorisées extraites
  de la police (hauteur de capitale 88, débords arrondis ±1,76).
- Lockup horizontal 927×256 : symbole, 35 unités d'écart, wordmark à la
  baseline 172 (centré optiquement sur le symbole).
- Lockup empilé 640×380 : symbole à 85 % au-dessus, wordmark centré en dessous.

## Fichiers

| Fichier | Usage |
|---|---|
| `silhouet-mark-accent.svg` | Marque seule, S Ivoire + ligne Ambre — défaut sur Charbon |
| `silhouet-mark-ivory.svg` | Marque monochrome ivoire |
| `silhouet-mark-black.svg` | Marque monochrome noir — print, fonds clairs |
| `silhouet-mark-small.svg` | Variante petits formats (≤ 32 px), ligne renforcée |
| `silhouet-lockup-accent.svg` | Lockup horizontal, S ivoire + ligne ambre |
| `silhouet-lockup-ivory.svg` / `-black.svg` | Lockups monochromes |
| `silhouet-lockup-stacked-*.svg` | Lockups empilés (accent / ivoire / noir) |
| `src/app/favicon.ico` | 16/32/48 px, tuile Charbon, variante small |
| `src/app/icon.png` / `apple-icon.png` | 512 / 180 px, tuile Charbon |
| `public/og.png` | Partage social 1200×630, lockup accent + halo ambre |

## Couleurs

| Token | Hex | Rôle dans la marque |
|---|---|---|
| Ivoire | `#f4f1ec` | S et wordmark par défaut sur Charbon |
| Charbon Chaud | `#121014` | Toile / tuile d'icône |
| Ambre Silhouette | `#e8a33d` | La ligne de découpe — accent unique de la marque |

L'ambre reste réservé au moment de découpe (règle des 99 % du design system).
Dans le logo, il n'apparaît que sur la ligne pointillée.

## Usages

- **Espace de protection** : hauteur du S (194 unités à l'échelle 256) / 4,
  soit environ 48 unités de chaque côté.
- **Tailles minimales** : marque seule 16 px (utiliser `mark-small` en dessous
  de 32 px) ; lockup horizontal 140 px de large ; lockup empilé 96 px de large.
  En dessous, marque seule.
- **Fonds approuvés** : Charbon `#121014`, Suie `#1a1820` (ivoire/accent),
  Craie `#fbfaf8` (noir). Jamais sur photo.
- **Ne pas** : faire tourner le S, déformer les arcs, changer la couleur de la
  ligne, déplacer la ligne hors de l'axe médian, séparer la ligne du S,
  séparer le wordmark du symbole sous 140 px de large.
- **Inversé** : même géométrie, aucun amincissement nécessaire (traits pleins).
