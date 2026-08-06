# Anatomia+ — Profondeur anatomique

## Objectif

Faire passer les dix organes vectoriels d’un rendu schématique à une illustration anatomique stylisée plus profonde, cohérente avec le cœur existant et avec l’interface sombre premium d’Anatomia+.

## Direction retenue

La direction « Profondeur anatomique » conserve le fond vert-noir, l’accent jaune-vert et la composition actuelle. Chaque organe gagne un relief perceptible grâce à une lumière directionnelle, une ombre interne, une texture tissulaire discrète, un liseré humide et des détails anatomiques propres à l’organe. L’effet doit rester crédible et pédagogique, sans revendiquer une exactitude médicale certifiée.

## Comportements visuels

- Le mode `Externe` privilégie le volume, la matière et la silhouette.
- Le mode `Coupe` révèle une cavité interne distincte, avec un bord de coupe clair et une profondeur sombre.
- Le mode `Réseaux` atténue légèrement le tissu et renforce les tracés vasculaires, bronchiques, biliaires, nerveux ou urinaires selon l’organe.
- Le mode `Isoler` met en évidence la structure active et atténue les détails secondaires.
- Les changements de mode, d’organe et de structure utilisent des transitions courtes, désactivées avec `prefers-reduced-motion`.
- Les repères latéraux sont reliés à l’organe par une ligne lisible et leur état sélectionné est renforcé sans masquer l’image.

## Architecture

`OrganVisual.tsx` reste l’orchestrateur SVG et délègue la matière commune à des primitives visuelles réutilisables. Les détails propres à chaque organe restent regroupés par composant. `OrganExplorer.tsx` expose le mode courant à la scène pour piloter les transitions et les annotations. Les feuilles `explorer.css` et `responsive.css` portent le rendu, les états, l’animation et l’adaptation mobile.

## Accessibilité et robustesse

Les organes conservent leur nom accessible, les hotspots leur rôle clavier et les commandes leurs libellés. Les animations respectent la préférence de réduction de mouvement. Aucun détail décoratif ne doit intercepter les événements. L’expérience reste exploitable si les animations CSS ne sont pas disponibles.

## Validation

- Tests unitaires des modes et du marquage visuel sélectionné.
- Tests d’interaction existants conservés.
- Compilation TypeScript et build Vite.
- Vérification Playwright sur bureau et mobile.
- Comparaison visuelle avec l’écran existant : profondeur, lisibilité de la coupe, distinction des modes, annotations, cohérence de palette et absence de débordement.

## Hors périmètre

Pas de modèle WebGL, pas de téléchargement de modèle 3D, pas de nouvelle navigation, pas de modification du contenu médical et pas de dépendance de rendu supplémentaire.
