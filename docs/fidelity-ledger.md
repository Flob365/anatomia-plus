# Anatomia+ — registre de fidélité visuelle

Référence : `outputs/anatomia-concept.png` (1584 × 992). Rendu vérifié : `outputs/anatomia-desktop.png` au même format.

| Point comparé | Référence | Rendu final | Décision |
| --- | --- | --- | --- |
| Composition | rail gauche, canvas dominant, inspecteur droit | mêmes trois zones et proportions proches | conforme |
| Palette | vert-noir froid, blanc cassé, accent jaune-vert | jetons `#041412`, `#f0f2ec`, `#d8e94c` | conforme |
| Anatomie | grand cœur réaliste en coupe | actif généré assorti, coupe détaillée et hotspots HTML/SVG | conforme après remplacement du cœur schématique |
| Typographie | sans sérif scientifique compacte | DM Sans + IBM Plex Sans, contrôles explicitement dimensionnés | conforme après ajout des fallbacks |
| Navigation | systèmes puis structures sélectionnées | 5 systèmes, sous-organes et 8–20 structures | conforme |
| Inspecteur | nom, latin, onglets, texte et données | nom, latin, 3 onglets, rôle, localisation, repère et relations | conforme, contenu adapté aux données disponibles |
| Interactions | coupe, réseaux, isolement, zoom et rotation | toutes les commandes modifient l’état et l’URL | conforme |
| Responsive | surface adaptée au mobile | tiroir de navigation et fiche inférieure, aucun débordement à 390 × 844 | conforme |

## Différence intentionnelle

La vue pseudo‑3D est construite avec un actif anatomique détaillé pour le cœur et des illustrations SVG en couches pour les dix autres organes. Cela conserve une application légère et interactive sans prétendre fournir un modèle volumétrique médical certifié.

## Copie au-dessus de la ligne de flottaison

Les libellés validés `ANATOMIA+`, systèmes, fil d’Ariane, recherche, modes, organe, structure, onglets et contrôles sont conservés. Les seules additions sont les compteurs réels de structures, l’avertissement pédagogique et les commandes d’orientation antérieure/postérieure requises par la spécification.

