# Anatomia+ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire un atlas anatomique français pseudo‑3D, responsive et accessible couvrant onze organes et leurs sous-structures.

**Architecture:** Application React/TypeScript statique avec données anatomiques typées, état d’exploration encodé dans l’URL et illustrations SVG en couches. Les composants de navigation, scène, annotations, recherche et fiche sont isolés afin de garder l’explorateur extensible.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS natif, SVG natifs, Lucide React.

## Global Constraints

- Interface et contenu en français.
- Onze organes répartis sur cinq systèmes.
- Au moins huit structures par organe et dix-huit pour le cœur.
- Niveaux `external`, `section`, `networks` et `isolate`.
- État sélectionné restauré depuis l’URL.
- Responsive vérifié à 1440 × 900, 1024 × 768 et 390 × 844.
- Parcours principal utilisable au clavier et respect de `prefers-reduced-motion`.
- Avertissement pédagogique visible.

---

## File Structure

- `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`: socle Vite et scripts.
- `src/main.tsx`, `src/App.tsx`: démarrage et composition générale.
- `src/types/anatomy.ts`: contrats des systèmes, organes et structures.
- `src/data/anatomy.ts`: contenu pédagogique des onze organes.
- `src/lib/anatomy.ts`: recherche et résolution d’identifiants.
- `src/lib/urlState.ts`: lecture et écriture de l’état dans l’URL.
- `src/hooks/useExplorerState.ts`: état central de navigation et de manipulation.
- `src/components/BodyOverview.tsx`: silhouette globale sélectionnable.
- `src/components/OrganVisual.tsx`: illustrations pseudo‑3D SVG par organe.
- `src/components/OrganExplorer.tsx`: scène, rotation, zoom et modes.
- `src/components/AnatomyTree.tsx`: arborescence système/organe/structure.
- `src/components/StructurePanel.tsx`: fiche anatomique contextuelle.
- `src/components/SearchDialog.tsx`: recherche globale.
- `src/components/Icon.tsx`: icônes cohérentes.
- `src/styles/*.css`: jetons, composition et responsive.
- `src/**/*.test.ts(x)`: tests unitaires et d’intégration.
- `e2e/explorer.spec.ts`: parcours navigateur principal.

### Task 1: Socle de l’application et test de rendu

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`, `src/test/setup.ts`, `src/App.test.tsx`

**Interfaces:**
- Produces: application Vite rendue dans `#root`; scripts `dev`, `build`, `test`, `test:run`.

- [ ] **Step 1: Écrire le test de démarrage**

```tsx
render(<App />)
expect(screen.getByRole('heading', { name: /explorez le corps humain/i })).toBeInTheDocument()
```

- [ ] **Step 2: Exécuter `pnpm test:run` et constater l’échec faute d’application.**
- [ ] **Step 3: Créer le socle Vite, le HTML sémantique et le titre attendu.**
- [ ] **Step 4: Installer les dépendances puis exécuter `pnpm test:run` et `pnpm build`.**
- [ ] **Step 5: Commit `feat: bootstrap Anatomia application`.**

### Task 2: Modèle anatomique et données complètes

**Files:**
- Create: `src/types/anatomy.ts`, `src/data/anatomy.ts`, `src/lib/anatomy.ts`, `src/lib/anatomy.test.ts`

**Interfaces:**
- Produces: `AnatomySystem`, `Organ`, `AnatomyStructure`, `ViewMode`; `anatomySystems`; `findOrgan(id)`, `findStructure(organId, structureId)`, `searchAnatomy(query)`.

- [ ] **Step 1: Tester que les données contiennent exactement onze organes, au moins huit structures par organe et au moins dix-huit pour le cœur.**

```ts
expect(anatomySystems.flatMap((system) => system.organs)).toHaveLength(11)
expect(organs.every((organ) => organ.structures.length >= 8)).toBe(true)
expect(findOrgan('heart')?.structures.length).toBeGreaterThanOrEqual(18)
```

- [ ] **Step 2: Tester la recherche accent-insensible sur les noms français et latins.**
- [ ] **Step 3: Exécuter le test et confirmer l’échec.**
- [ ] **Step 4: Définir les types et renseigner les onze organes avec descriptions, fonctions, relations, mesures et notes cliniques.**
- [ ] **Step 5: Implémenter les résolveurs et la normalisation de recherche.**
- [ ] **Step 6: Exécuter `pnpm test:run` puis commit `feat: add structured anatomy content`.**

### Task 3: État d’exploration et URL partageable

**Files:**
- Create: `src/lib/urlState.ts`, `src/lib/urlState.test.ts`, `src/hooks/useExplorerState.ts`

**Interfaces:**
- Produces: `ExplorerSnapshot { systemId, organId, structureId, mode, rotation, zoom }`; `readExplorerState(search)`, `serializeExplorerState(state)`; hook avec `selectOrgan`, `selectStructure`, `setMode`, `rotate`, `zoomBy`, `resetView`.

- [ ] **Step 1: Tester la lecture d’une URL valide et le repli vers `overview` en cas d’identifiant inconnu.**
- [ ] **Step 2: Tester la sérialisation déterministe de l’état.**
- [ ] **Step 3: Exécuter les tests et confirmer l’échec.**
- [ ] **Step 4: Implémenter le codec URL bornant la rotation à ±45° et le zoom entre 0,8 et 2,2.**
- [ ] **Step 5: Implémenter le hook et synchroniser l’historique avec `replaceState`.**
- [ ] **Step 6: Exécuter les tests puis commit `feat: add shareable explorer state`.**

### Task 4: Vue globale et scène anatomique pseudo‑3D

**Files:**
- Create: `src/components/BodyOverview.tsx`, `src/components/OrganVisual.tsx`, `src/components/OrganExplorer.tsx`
- Create: `src/components/OrganExplorer.test.tsx`, `src/styles/explorer.css`

**Interfaces:**
- Consumes: `Organ`, `ExplorerSnapshot` et actions du hook.
- Produces: scène avec `data-organ`, hotspots accessibles et contrôles réels de zoom/rotation/mode.

- [ ] **Step 1: Tester qu’un clic sur un hotspot sélectionne la structure correspondante.**
- [ ] **Step 2: Tester que les contrôles zoom, rotation, niveau et réinitialisation changent la scène.**
- [ ] **Step 3: Exécuter le test et confirmer l’échec.**
- [ ] **Step 4: Créer la silhouette globale avec zones d’organes et vues antérieure/postérieure.**
- [ ] **Step 5: Créer les onze illustrations SVG en couches avec variantes externe, coupe et réseaux.**
- [ ] **Step 6: Ajouter rotation par glissement, zoom molette/boutons/pincement, isolement et annotations progressives.**
- [ ] **Step 7: Exécuter les tests puis commit `feat: build layered anatomy explorer`.**

### Task 5: Navigation anatomique, fiches et recherche

**Files:**
- Create: `src/components/AnatomyTree.tsx`, `src/components/StructurePanel.tsx`, `src/components/SearchDialog.tsx`, `src/components/Icon.tsx`
- Create: `src/components/SearchDialog.test.tsx`, `src/styles/panels.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: données anatomiques, état et callbacks de sélection.
- Produces: navigation hiérarchique, fiche à onglets, recherche globale et navigation précédent/suivant.

- [ ] **Step 1: Tester une recherche `ventriculus` ouvrant le ventricule gauche.**
- [ ] **Step 2: Tester que précédent/suivant parcourt les structures du même organe.**
- [ ] **Step 3: Exécuter les tests et confirmer l’échec.**
- [ ] **Step 4: Implémenter l’arbre repliable avec compteurs de structures.**
- [ ] **Step 5: Implémenter la fiche avec onglets Rôle, Anatomie et Clinique.**
- [ ] **Step 6: Implémenter la recherche clavier avec résultats français/latin.**
- [ ] **Step 7: Intégrer les composants dans `App` et exécuter les tests.**
- [ ] **Step 8: Commit `feat: add anatomy navigation and knowledge panels`.**

### Task 6: Direction artistique, responsive et accessibilité

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/responsive.css`
- Modify: `src/main.tsx`, `src/App.tsx`, `src/styles/explorer.css`, `src/styles/panels.css`

**Interfaces:**
- Produces: design sombre validé, panneaux adaptatifs et expérience clavier complète.

- [ ] **Step 1: Définir les jetons exacts de couleur, typographie, espacement, profondeur et mouvement issus de la maquette.**
- [ ] **Step 2: Implémenter l’entrée orchestrée, les transitions de sélection et `prefers-reduced-motion`.**
- [ ] **Step 3: Transformer la navigation en tiroir et la fiche en panneau inférieur sous 900 px.**
- [ ] **Step 4: Vérifier ordre de tabulation, focus visible, libellés et contrastes.**
- [ ] **Step 5: Exécuter `pnpm test:run` et `pnpm build`, puis commit `feat: polish responsive accessible interface`.**

### Task 7: Vérification navigateur et livraison

**Files:**
- Create: `e2e/explorer.spec.ts`, `playwright.config.ts`
- Create: `README.md`

**Interfaces:**
- Produces: preuve du parcours principal et instructions de lancement.

- [ ] **Step 1: Écrire un parcours ouvrant le cœur, choisissant le mode coupe, sélectionnant la valve mitrale, zoomant puis réinitialisant.**
- [ ] **Step 2: Vérifier la restauration par URL et la recherche d’un organe.**
- [ ] **Step 3: Lancer le parcours aux formats 1440 × 900, 1024 × 768 et 390 × 844.**
- [ ] **Step 4: Capturer les vues finales et comparer palette, hiérarchie, densité, texte, contrôles, responsive et traitement anatomique aux maquettes validées.**
- [ ] **Step 5: Corriger toute dérive visible ou interaction inerte, puis relancer tests et build.**
- [ ] **Step 6: Documenter `pnpm install`, `pnpm dev`, `pnpm test:run` et `pnpm build`.**
- [ ] **Step 7: Commit `test: verify Anatomia core exploration flow`.**

