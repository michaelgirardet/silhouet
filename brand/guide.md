# Silhouet — Guide de marque

## La marque

**Curseur** — le comparateur à 50 % : la moitié gauche pleine est l'image d'origine,
la moitié droite évidée en anneau est le résultat transparent, la couture verticale
est le curseur du comparateur. Le logo est l'interface signature de l'outil.

## Construction

- Canevas 256×256, disque r=104 centré (128,128) — marges 24 sur 4 côtés.
- Moitié pleine : demi-disque gauche.
- Moitié évidée : demi-anneau, rayon extérieur 104, rayon intérieur 74 (épaisseur 30).
- Aucune autre forme. Deux tracés, 8 ancres.
- Wordmark : « SILHUET » en Space Grotesk 500, lettres vectorisées (voir lockups),
  tracking 0,04 em, hauteur de capitale 88 (42 % du symbole), baseline à 172.
- Écart symbole / wordmark dans le lockup : 62 unités.

## Fichiers

| Fichier | Usage |
|---|---|
| `silhouet-mark-ivory.svg` | Marque seule, Ivoire `#f4f1ec` — défaut sur Charbon |
| `silhouet-mark-black.svg` | Marque seule, noir — fonds clairs, print |
| `silhouet-mark-accent.svg` | Marque accent : moitié Ivoire + anneau Ambre `#e8a33d` |
| `silhouet-lockup-*.svg` | Symbole + wordmark (noir / ivoire / accent) |
| `src/app/favicon.ico` | 16/32/48 px, tuile Charbon |
| `src/app/icon.png` / `apple-icon.png` | 512 / 180 px, tuile Charbon |
| `public/og.png` | Partage social 1200×630, lockup accent + halo |

## Couleurs

| Token | Hex | Rôle dans la marque |
|---|---|---|
| Ivoire | `#f4f1ec` | Marque par défaut sur Charbon |
| Charbon Chaud | `#121014` | Toile / tuile d'icône |
| Ambre Silhouette | `#e8a33d` | **Accent uniquement** : l'anneau « après » dans la variante accent |

L'ambre reste réservé au moment de révélation (règle des 99 % du design system).
La variante accent ne s'utilise pas dans l'interface courante : partage social,
écran d'accueil, supports événementiels.

## Usages

- **Espace de protection** : hauteur du disque / 4 (52 unités à l'échelle 256) de chaque côté.
- **Tailles minimales** : marque seule 16 px ; lockup 120 px de large ; en dessous, marque seule.
- **Fonds approuvés** : Charbon `#121014`, Suie `#1a1820` (ivoire), Craie `#fbfaf8` (noir). Jamais sur photo.
- **Ne pas** : faire tourner, déformer, ajouter d'ombres, changer les proportions
  moitié/moitié, séparer le wordmark du symbole à moins de 120 px de large, réutiliser
  l'ambre ailleurs que dans la variante accent.
- **Inversé** : même géométrie, aucun amincissement nécessaire (formes pleines).
