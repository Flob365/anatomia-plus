# Anatomia+ — inventaire du design de référence

## Référence

- Concept Image Gen : `/Users/florian/.codex/generated_images/019fc89b-a248-7593-9336-804f0f0ade3b/exec-07b6142e-1f2f-4541-b277-16bcb32ba9e3.png`
- Format natif : 1584 × 992, ratio 1,596.
- Fond verrouillé : vert-noir froid, jamais blanc ou crème.

## Composition

- Rail gauche de 252 px : marque, systèmes, organe et arbre des structures.
- Canvas central dominant, sans carte englobante, avec modes en haut et commandes de caméra en bas.
- Inspecteur droit de 350 px : titre, latin, trois onglets, texte, données et action d’isolement.
- Barre supérieure sobre avec fil d’Ariane, recherche et trois outils.
- Barre de raccourcis discrète en bas sur grand écran.

## Copie visible autorisée au premier écran

`ANATOMIA+`, `Systèmes`, `Cardiovasculaire`, `Respiratoire`, `Digestif`, `Nerveux`, `Urinaire`, `Cœur`, `Aperçu`, `Péricarde`, `Cavités cardiaques`, `Valve mitrale`, `Valves & cordages`, `Réseau coronaire`, `Système électrique`, `Externe`, `Coupe`, `Réseaux`, `Isoler`, `Rôle`, `Anatomie`, `Clinique`, `Réinitialiser`, `Zoom −`, `Zoom +`, `Plein écran`, `Masquer les étiquettes`.

## Jetons

- `--bg: #041412`, `--surface: #081d19`, `--surface-raised: #0b2420`.
- `--text: #f0f2ec`, `--muted: #8fa19b`, `--line: #24423b`.
- `--accent: #d8e94c`, `--accent-soft: #a6c94d`.
- Anatomie : rouges terre cuite, veines bleu acier, tissus ivoire rosé.
- Bordures 1 px, rayons 0–8 px, ombres surtout sur l’organe.

## Typographie et icônes

- Titres : `DM Sans`, 600–700, interlettrage négatif léger.
- Texte et commandes : `IBM Plex Sans`, 400–600.
- Libellés anatomiques : 12–14 px ; commandes : 12 px ; corps : 14–15 px.
- Icônes Lucide, contour 1,5 px, 18–20 px, sans contenant rond sauf commande de rotation.

## Composants et états

- Lignes de navigation ouvertes, séparées par des filets ; pas de grille de cartes.
- Segment de mode rectangulaire avec sélection accentuée.
- Hotspot circulaire en trois anneaux, relié par un trait fin.
- État isolé : organes/structures voisins atténués, structure active et repère accentués.
- Focus : contour accent de 2 px avec décalage de 2 px.
- Mobile : rail en tiroir, inspecteur en panneau inférieur, canvas toujours prioritaire.

## Traitement média

- L’organe est détouré ou vectoriel sur fond identique au canvas, sans voile coloré par-dessus.
- Halo radial uniquement derrière l’organe pour la profondeur.
- Les annotations et contrôles restent du texte HTML/SVG natif.

