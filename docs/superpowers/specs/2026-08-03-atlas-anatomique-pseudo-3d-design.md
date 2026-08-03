# Anatomia+ — atlas anatomique pseudo‑3D interactif

## 1. Objectif

Créer une application web en français permettant au grand public curieux et aux lycéens d’explorer visuellement les principaux organes humains, leurs structures internes et leurs relations anatomiques. L’expérience doit donner une sensation de profondeur et de manipulation 3D tout en restant rapide, lisible et fiable sur ordinateur comme sur mobile.

Le contenu est pédagogique. Un avertissement permanent précise qu’il ne remplace ni un diagnostic ni un avis médical.

## 2. Direction visuelle validée

L’interface prend la forme d’un laboratoire anatomique sombre, précis et immersif : fond vert-noir, surfaces translucides, texte blanc cassé, repères vert acide et couleurs anatomiques réalistes. L’organe occupe le centre de l’écran. Une navigation hiérarchique se trouve à gauche et une fiche contextuelle à droite.

La composition évite l’apparence d’un tableau de bord générique. L’espace central reste dominant, les panneaux sont fins et les informations apparaissent au rythme de l’exploration. La typographie associe un caractère éditorial expressif pour les titres à une fonte sans sérif très lisible pour les données.

## 3. Périmètre anatomique

La première version couvre cinq systèmes et leurs organes principaux :

- cardiovasculaire : cœur ;
- respiratoire : poumons et trachée ;
- nerveux : cerveau ;
- digestif : foie, estomac, intestin grêle et côlon ;
- urinaire : reins et vessie.

Chaque organe possède entre 8 et 24 sous-structures sélectionnables selon sa complexité. Le cœur sert de référence de profondeur avec au minimum : aorte, artère pulmonaire, veines caves, veines pulmonaires, oreillettes, ventricules, septum, valves, cordages tendineux, muscles papillaires, myocarde, péricarde, artères coronaires et nœuds électriques.

Les autres organes suivent la même logique : lobes et bronches pour les poumons ; lobes, cervelet, tronc cérébral et grandes zones fonctionnelles pour le cerveau ; lobes, voies biliaires et vascularisation majeure pour le foie ; couches, régions et connexions pour l’estomac et les intestins ; cortex, médulla, pyramides, calices, bassinet et uretère pour le rein.

## 4. Modèle d’exploration

### Vue globale

La page d’accueil affiche une silhouette humaine antérieure. Les systèmes peuvent être activés ou masqués. Le survol ou le focus met un organe en évidence ; la sélection ouvre l’explorateur détaillé. Une commande permet de basculer entre les vues antérieure et postérieure.

### Explorateur d’organe

Le centre de l’écran affiche une illustration anatomique pseudo‑3D à plusieurs plans. L’utilisateur peut :

- faire glisser horizontalement pour simuler une rotation ;
- utiliser la molette, les boutons ou le pincement pour zoomer ;
- sélectionner une zone par clic ou via la liste hiérarchique ;
- isoler une structure et atténuer les autres ;
- réinitialiser la vue ;
- basculer entre les niveaux « Externe », « Coupe », « Réseaux » et « Isoler ».

La pseudo‑3D repose sur des illustrations SVG anatomiques en couches, des transformations, des ombres et des transitions de profondeur. Elle ne prétend pas remplacer un modèle médical volumétrique certifié.

### Niveau de détail

Chaque point anatomique ouvre une fiche comprenant :

- nom français et nom latin ;
- localisation dans l’organe ;
- rôle principal ;
- description anatomique ;
- relations avec les structures voisines ;
- dimensions ou chiffres clés lorsque pertinents ;
- fait clinique ou pathologie fréquente, formulé sans diagnostic ;
- renvoi vers la structure parente et les structures liées.

Les repères visibles sont limités aux éléments utiles au niveau de zoom actuel afin d’éviter la surcharge. Les sous-structures apparaissent progressivement lors du zoom.

## 5. Navigation et recherche

La navigation latérale regroupe les systèmes, les organes et leurs sous-structures sous forme d’arbre repliable. Un index permet de retrouver un organe ou une structure par son nom français ou latin. Des commandes « précédent » et « suivant » permettent de parcourir les structures d’un même organe.

L’état de l’exploration est reflété dans l’URL : système, organe, niveau et structure sélectionnée. Une actualisation ou un lien partagé restaure donc la même vue.

## 6. Contenu et données

Les informations anatomiques sont stockées dans des fichiers structurés séparés de l’interface. Le modèle contient : identifiant, libellés, système, organe parent, description, fonction, relations, chiffres clés, note clinique, repères visuels et niveau de zoom minimal.

Le texte doit rester précis mais compréhensible. Les termes techniques sont conservés lorsqu’ils sont utiles puis expliqués simplement. Les formulations absolues sont évitées quand la morphologie varie entre individus.

## 7. Architecture de l’interface

L’application est construite avec React, TypeScript et Vite. Elle est divisée en unités ciblées :

- `AppShell` : structure générale et navigation responsive ;
- `BodyOverview` : silhouette et sélection des systèmes ;
- `OrganExplorer` : scène pseudo‑3D, rotation, zoom et niveaux ;
- `AnatomyTree` : navigation hiérarchique ;
- `AnnotationLayer` : repères et étiquettes ;
- `StructurePanel` : contenu pédagogique ;
- `SearchDialog` : recherche globale ;
- fichiers de données et utilitaires séparés par système.

L’état local conserve l’organe, la structure, le niveau, la rotation et le zoom. Les interactions principales ne nécessitent pas de serveur. Cette architecture permet un déploiement statique rapide.

## 8. Responsive et accessibilité

Sur grand écran, l’interface utilise trois zones : navigation, scène, fiche. Sur tablette, la navigation devient un tiroir. Sur mobile, la scène reste prioritaire et la fiche s’ouvre comme un panneau inférieur extensible.

Toutes les structures sont accessibles au clavier depuis l’arbre anatomique. Les boutons possèdent des libellés explicites, le focus est visible et les couleurs respectent un contraste suffisant. Les animations sont réduites si le système demande moins de mouvement. Les zones anatomiques disposent d’un équivalent textuel ; aucune information essentielle ne dépend uniquement de la couleur ou du survol.

## 9. États et gestion des erreurs

L’application prévoit : chargement initial, absence de résultat dans la recherche, illustration indisponible et route anatomique inconnue. En cas d’erreur, la navigation reste utilisable et propose de revenir à la vue globale. Aucune commande visible ne doit être inactive ou purement décorative.

## 10. Tests et critères d’acceptation

Le produit est accepté lorsque :

1. les onze organes listés sont accessibles depuis la vue globale et la recherche ;
2. chaque organe propose une vue externe, une coupe et au moins huit structures annotées ;
3. le cœur propose au moins dix-huit structures ;
4. rotation, zoom, isolement, changement de niveau et réinitialisation modifient réellement la scène ;
5. la sélection depuis l’image et depuis l’arbre ouvre la même fiche ;
6. chaque fiche comporte les informations définies dans la section 4 ;
7. l’URL restaure l’état anatomique sélectionné ;
8. le parcours principal fonctionne au clavier ;
9. aucun contenu principal n’est coupé à 1440 × 900, 1024 × 768 et 390 × 844 ;
10. le projet passe les contrôles TypeScript et la construction de production ;
11. les interactions sont vérifiées dans un navigateur réel sur ordinateur et mobile ;
12. le rendu final reste fidèle aux maquettes validées, notamment la palette, la hiérarchie, la densité et la priorité donnée à l’organe.

## 11. Hors périmètre initial

Les modèles 3D volumétriques certifiés, la réalité augmentée, le diagnostic médical, le compte utilisateur, l’enregistrement cloud et la couverture exhaustive de tous les tissus microscopiques ne font pas partie de cette version. L’architecture doit néanmoins permettre d’ajouter ultérieurement d’autres organes et systèmes sans réécrire l’explorateur.

