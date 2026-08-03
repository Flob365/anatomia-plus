# ANATOMIA+

Un atlas interactif du corps humain pour explorer les principaux organes, leurs couches et leurs structures internes.

![Aperçu d’Anatomia+](outputs/anatomia-desktop.png)

## Présentation

Anatomia+ propose une expérience pédagogique pseudo‑3D en français. L’utilisateur peut sélectionner un organe depuis une silhouette humaine, zoomer, simuler une rotation, afficher une coupe anatomique, révéler les réseaux et isoler une structure précise.

Le projet couvre actuellement :

- 5 systèmes anatomiques ;
- 11 organes principaux ;
- 110 structures documentées ;
- les noms français et latins ;
- le rôle, l’anatomie, les relations et des informations cliniques pédagogiques.

> Anatomia+ est un outil éducatif. Son contenu ne remplace pas un diagnostic ou un avis médical.

## Fonctionnalités

- Vue globale antérieure et postérieure du corps humain
- Navigation par système, organe et sous-structure
- Modes `Externe`, `Coupe`, `Réseaux` et `Isoler`
- Zoom, rotation simulée et réinitialisation de la caméra
- Repères anatomiques interactifs
- Recherche en français ou en latin avec `⌘/Ctrl + K`
- Fiches détaillées avec trois niveaux de lecture
- URL partageable restaurant l’organe, la structure et le mode sélectionnés
- Interface responsive avec navigation mobile et fiche inférieure
- Navigation clavier et réduction des animations selon les préférences système

## Aperçus

| Bureau | Mobile |
| --- | --- |
| ![Vue bureau](outputs/anatomia-desktop.png) | ![Vue mobile](outputs/anatomia-mobile.png) |

## Technologies

- React 18
- TypeScript
- Vite
- SVG interactifs
- Lucide React
- Vitest et Testing Library
- Playwright pour les parcours de bout en bout

## Installation

Prérequis : Node.js 20 et pnpm.

```bash
pnpm install
pnpm dev
```

L’application est ensuite disponible sur [http://localhost:5173](http://localhost:5173).

## Vérification

```bash
pnpm test:run
pnpm build
```

Les scénarios de navigation complets peuvent être lancés avec :

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

## Structure du projet

```text
src/
├── components/   Interface et explorateur anatomique
├── data/         Contenu des systèmes, organes et structures
├── hooks/        État de navigation et de manipulation
├── lib/          Recherche et synchronisation avec l’URL
├── styles/       Direction artistique et responsive
└── types/        Modèle anatomique TypeScript
```

## Version prête à héberger

La commande `pnpm build` produit un site statique dans `dist/`. Une archive prête à héberger est également fournie dans [`outputs/anatomia-site.zip`](outputs/anatomia-site.zip).

