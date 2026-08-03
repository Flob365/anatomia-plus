# Anatomia+ — redesign des organes « Anatomie vivante »

## 1. Décision

La direction retenue est **Anatomie vivante** : une illustration anatomique éditoriale, organique et premium, qui remplace les silhouettes uniformes par des volumes individualisés. Elle conserve le laboratoire vert-noir de l’application et ses repères vert acide, mais donne à chaque organe une matière, une profondeur et des indices anatomiques propres.

## 2. Objectif produit

Rendre immédiatement crédible et agréable la zone d’exploration des organes. L’utilisateur doit comprendre la forme générale en un regard, distinguer les principales parties au niveau « Externe », puis voir les coupes et réseaux apparaître sans être confronté à un schéma plat ou à une masse générique.

## 3. Langage visuel

- scène conservée : fond vert-noir, aura discrète, organe central dominant ;
- matière : dégradés de tissu chaud, ombres internes, reflets doux et trames fines ;
- contour : bord externe plus fin et moins lumineux, avec une seconde ligne interne lorsque l’organe possède une coupe ;
- détails : anatomie spécifique par organe, sans décor répétitif ;
- profondeur : plan externe, structures internes et réseaux ont des opacités et des niveaux visuels distincts ;
- repères : pastilles vert acide identiques au système existant pour conserver la clarté interactive ;
- typographie et panneaux : inchangés pour éviter de déplacer l’apprentissage vers une refonte complète de l’interface.

## 4. Traitement par familles d’organes

### Cœur

Conserver l’image de coupe existante comme référence, mais l’intégrer dans un cadre plus propre : ombre maîtrisée, contours plus fins et couches coronaires visibles. Les modes « Coupe » et « Réseaux » ajoutent respectivement les cavités/valves puis les artères coronaires, sans superposition opaque.

### Poumons et trachée

Créer une paire de volumes asymétriques, avec hile, bronches principales, ramifications secondaires et léger voile translucide. Les réseaux affichent un arbre respiratoire et vasculaire, pas un simple X central.

### Cerveau

Remplacer les trois vagues horizontales par deux hémisphères modelés, une séparation médiane et des sillons organiques. La coupe fait ressortir le corps calleux, le thalamus et le tronc cérébral avec une teinte plus sombre.

### Foie, estomac et pancréas

Donner à chaque organe une silhouette distincte et des repères de surface : lobes et ligament pour le foie, grande/petite courbure pour l’estomac, tête/corps/queue et canal pour le pancréas.

### Intestins, côlon, reins et vessie

Utiliser des couches et des chemins internes dédiés. Les intestins doivent ressembler à des anses continues, le côlon à une couronne épaisse, les reins à des haricots avec cortex/médulla/bassinet, et la vessie à une poche translucide avec col et uretères.

## 5. États d’interaction

- Externe : volume plein, détails de surface lisibles, annotations principales ;
- Coupe : coupe interne contrastée, couche externe atténuée, annotations internes ;
- Réseaux : organe plus transparent, réseau fonctionnel coloré par famille ;
- Isoler : structure sélectionnée lumineuse, entourage atténué mais encore identifiable ;
- survol/sélection : reflet ou halo court sur l’élément correspondant, sans animation permanente agressive.

## 6. Système de design technique

- SVG code-native pour les silhouettes et chemins anatomiques afin de garder des repères sélectionnables, accessibles et précis ;
- définitions SVG réutilisables : gradients de tissu, ombre douce, trame micro-structurée, lumière de bord ;
- composants de détail ciblés par organe dans `OrganVisual.tsx` plutôt qu’un seul traitement générique ;
- identifiants de gradients préfixés par organe pour éviter les collisions SVG ;
- points de structure inchangés pour préserver les liens pédagogiques existants ;
- aucun changement aux données, à la navigation, aux URL ou aux fiches.

## 7. Responsive

La scène reste centrale sur desktop et mobile. Les organes réduisent leur largeur sans perdre leur contour ; les détails fins deviennent moins opaques avant le zoom. Les labels textuels et les pastilles restent accessibles par l’arbre sur mobile.

## 8. Critères d’acceptation

1. Chaque organe possède au moins un détail visuel spécifique en vue externe.
2. Les modes Externe, Coupe, Réseaux et Isoler sont visuellement différenciés.
3. Aucun organe ne ressemble à une simple forme remplie générique.
4. Les hotspots et la sélection clavier fonctionnent comme avant.
5. Le build, les tests et les URL existants restent valides.
6. Le rendu est vérifié sur desktop et mobile dans un navigateur réel.

## 9. Déviations assumées

Les visuels restent des illustrations SVG pédagogiques et non des modèles 3D certifiés. Cette approche est volontaire : elle garantit des interactions précises, des temps de chargement faibles et une meilleure accessibilité que des images raster non cliquables.
