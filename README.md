# Silhouet

Supprimez l’arrière-plan et convertissez vos images en WebP directement dans votre navigateur.

[![Live Demo](https://img.shields.io/badge/Démo-en%20ligne-7C5CFF)](https://silhouet.vercel.app)
![MIT License](https://img.shields.io/badge/Licence-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?logo=tailwindcss)

---

## Présentation

**Silhouet** est une application web minimaliste permettant de supprimer l’arrière-plan d’une image ou de la convertir au format **WebP**, sans qu’aucune donnée ne soit transmise à un serveur.  
Le traitement est effectué localement dans le navigateur grâce à WebAssembly et à la bibliothèque [`@imgly/background-removal`](https://www.npmjs.com/package/@imgly/background-removal).

**Démo en ligne :** [https://silhouet.vercel.app](https://silhouet.vercel.app)

---

## Fonctionnalités principales

- Suppression automatique d’arrière-plan avec `@imgly/background-removal`
- Conversion rapide vers le format **WebP**
- Traitement local (aucune donnée transmise)
- Interface claire, responsive et accessible
- Thème clair / sombre
- Code 100 % TypeScript

---

## Stack technique

| Couche           | Technologie                                           |
| ---------------- | ----------------------------------------------------- |
| Framework        | [Next.js 15](https://nextjs.org/) (Turbopack)         |
| Langage          | TypeScript 5                                          |
| Interface        | React 19 + Tailwind CSS 4 + next-themes               |
| Traitement image | @imgly/background-removal + browser-image-compression |
| Icônes           | @phosphor-icons/react                                 |
| Analyse          | @vercel/analytics                                     |
| Lint / formatage | ESLint 9, Prettier, Biome                             |

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-pseudo/silhouet.git
cd silhouet
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L’application sera disponible sur http://localhost:3000

Structure du projet
src/
├── app/
│ ├── page.tsx # Page d'accueil
│ ├── remove-bg/ # Outil de suppression d'arrière-plan
│ ├── convert/ # Outil de conversion WebP
│ └── components/ # Dropzone, ProgressBar, Modal, etc.
├── lib/
│ └── image.ts # Fonctions utilitaires (downscale, blob, etc.)
├── styles/
│ └── globals.css
└── public/
└── assets/ # Images et ressources publiques

Objectif

Ce projet a été développé dans un but d’apprentissage et de démonstration technique.
Il illustre la mise en œuvre de traitement d’image en local dans le navigateur, avec une attention particulière portée à la simplicité d’usage, à la performance et à la protection des données.

Auteur

Développé par :
https://github.com/michaelgirardet

Licence

Ce projet est distribué sous la licence MIT.
