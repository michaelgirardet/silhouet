# Protocole de validation « privacy-first »

Silhouet promet : **vos images ne quittent jamais votre machine**. Ce protocole
vérifie que la promesse est vraie, de manière observable, sur un build de
production.

Il existe en deux formes :

- **manuelle** (DevTools, ~10 minutes) — décrite ci-dessous, étapes 1 à 9 ;
- **automatisée** (`node scripts/e2e/validate.js`) — rejoue le même scénario
  dans Chrome headless, avec des critères de passage explicites et un code de
  sortie non nul en cas d'échec. C'est cette version qui tourne en CI
  (`.github/workflows/validate.yml`).

## Prérequis

```bash
npm run build
npm run start        # serveur de production, http://localhost:3000
```

Pour la version automatisée : `node scripts/e2e/validate.js` (Chrome est
fourni par `puppeteer`, en devDependency).

## Procédure manuelle

1. Ouvrir DevTools → onglet **Network**, case « Disable cache » cochée.
2. Charger la page d'accueil, puis `/remove-bg`.
3. **Noter toutes les requêtes** : leur domaine doit être `localhost`
   uniquement — polices comprises (aucune requête vers `fonts.gstatic.com`,
   les polices sont self-hostées par `next/font`).
4. Déposer une image, lancer le détourage.
5. Pendant le traitement, filtrer le Network par « all » : **aucune requête**
   vers `staticimgly.com`, `imgly.com`, `vercel-insights`, `onnxruntime` ou
   tout domaine non-localhost. Les seules grosses requêtes sont les chunks
   `/models/*` de 4 Mo (le moteur est servi par l'app elle-même ; la lib
   découpe le modèle ONNX et le WASM d'onnxruntime-web en morceaux à noms
   hashés — il n'y a donc pas de fichier `.onnx` littéral).
6. Les URLs `blob:http://localhost…` sont normales : c'est le contenu local
   que la lib assemble depuis `/models/` avant de le donner à onnxruntime.
7. **Deuxième détourage** dans la même session : les modèles ne sont pas
   re-téléchargés (cache mémoire du moteur ; à défaut cache HTTP).
8. Recharger la page **sans vider le cache**, activer le mode avion dans
   DevTools (onglet Network), déposer une nouvelle image → le détourage doit
   fonctionner intégralement hors-ligne. Les fichiers du moteur sont servis
   sous `/models/<version>/` avec `Cache-Control: immutable` : l'URL change
   à chaque upgrade du paquet de données, donc le cache long est sûr (y
   compris pour `resources.json`) et le mode avion fonctionne après un
   premier chargement.
9. **Console** : zéro erreur, zéro violation CSP (rechercher
   « Content Security Policy »).

## Critères de passage (version automatisée)

- Départage impossible : le test vérifie que les images de résultat sont
  réellement rendues (`naturalWidth > 0`), pas seulement présentes dans le DOM.
- Premier détourage : aucun domaine tiers contacté, moteur chargé depuis
  `/models/`.
- Deuxième détourage : aucune requête `/models/` hors cache.
- Mode avion (émulation `offline` via CDP) : détourage complet, aucun domaine
  tiers, aucune requête échouée, `/models/` servi depuis le cache.
- Page `/convert` : conversion WebP fonctionnelle.
- Console : zéro erreur, zéro violation CSP.
- Seules les requêtes interrompues tolérées : prefetchs RSC de Next.js annulés
  par la navigation (`net::ERR_ABORTED` sur des `?_rsc=`).

## Notes techniques (le pourquoi des choix)

- **CSP** (`src/middleware.ts`) : nonce par requête (les routes sont rendues
  dynamiquement pour que Next.js puisse l'injecter), `blob:` dans
  `script-src`/`connect-src`/`worker-src` (la lib reconstruit `.mjs` et `.wasm`
  en URLs blob), `'wasm-unsafe-eval'` (compilation WebAssembly) et
  `'unsafe-eval'` (la dépendance `ndarray` du moteur génère du JS à
  l'initialisation). Aucun de ces assouplissements n'ouvre le réseau :
  `connect-src`/`img-src`/`default-src` restent `'self'` + `blob:`.
- **`publicPath`** (`src/app/remove-bg/page.tsx`) doit être une URL absolue :
  la lib fait `new URL(nom, publicPath)`. Le chemin est versionné
  (`/models/<version>/`) pour rendre le cache `immutable` sans risque ;
  `window.location.origin` reste correct derrière un proxy tant que l'app
  est servie à la racine du domaine.
- **Mono-thread** : sans `crossOriginIsolated` (COOP/COEP), onnxruntime-web
  replie en WASM mono-thread (~10 s par détourage en 400 px). Activer le
  multi-thread ouvrirait des contraintes CORP/CORSM sur toutes les ressources :
  backlog, non prioritaire.

## Historique

Le protocole a révélé (et conduit à corriger) : `publicPath` relatif
(invalide pour `new URL`), `'unsafe-eval'` manquant (EvalError au premier
détourage), absence de cache `immutable` sur `/models/` (mode avion
impossible), révocation prématurée des blob URLs (404), et un damier CSS
référençant une image inexistante (404 silencieux).
