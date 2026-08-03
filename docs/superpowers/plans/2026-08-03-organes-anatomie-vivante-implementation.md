# Anatomie vivante organ redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic organ silhouettes with distinctive, layered SVG illustrations while preserving all existing hotspots, modes, navigation, and URLs.

**Architecture:** Keep `OrganVisual` as the SVG canvas and split the visual logic into small in-file render helpers for shared tissue primitives and organ-specific details. Add a small set of scoped explorer CSS tokens for the new material treatment; do not change the data model or interaction contracts.

**Tech Stack:** React, TypeScript, SVG, CSS, Vite, Vitest.

## Global Constraints

- Preserve the dark green-black laboratory shell and acid-green interaction markers.
- Keep existing `OrganVisual` props and structure hotspot coordinates compatible with `OrganExplorer`.
- Keep the four modes `external`, `section`, `networks`, and `isolate` functional.
- Use code-native SVG for clickable anatomy; no raster placeholder replacement.
- Verify `npm test` and `npm run build` after implementation, then inspect desktop and mobile browser renders.

---

### Task 1: Build reusable tissue primitives and organ-specific layers

**Files:**
- Modify: `src/components/OrganVisual.tsx`

**Interfaces:**
- Preserve `OrganVisual({ organ, mode, selectedId, onSelect })` exactly.
- Add internal helpers that return SVG children: `TissueSurface`, `VascularNetwork`, and `OrganDetails`.

- [ ] **Step 1: Replace the single generic fill with scoped tissue definitions**

Add per-organ gradient IDs, a soft rim light, a low-opacity microtexture, and a stable shadow filter. Keep IDs prefixed with the organ ID so multiple SVGs cannot collide.

- [ ] **Step 2: Implement organ-specific external details**

Render dedicated details for heart, lungs/trachea, brain, liver, stomach, pancreas, intestines/colon, kidneys, and bladder. Each helper must be clipped or placed inside the corresponding silhouette and must use `mode` to control opacity rather than hiding the base shape.

- [ ] **Step 3: Implement section and networks layers**

For `section`, add a smaller dark internal cutaway with a warm rim. For `networks`, add only the relevant paths: coronary branches for heart, bronchial tree for lungs/trachea, portal/vessel lines for liver, duct for pancreas, ureters for kidneys/bladder, and enteric paths for intestines. Keep the generic fallback network only for unknown organs.

- [ ] **Step 4: Keep hotspot rendering unchanged and accessible**

Retain one keyboard-focusable `<g>` per `organ.structures` entry, the existing selected class, and the same coordinate conversion. Ensure decorative layers have `pointerEvents="none"` so clicking the anatomy remains reliable.

- [ ] **Step 5: Run the focused checks**

Run: `npm test -- --run src/App.test.tsx src/App.interaction.test.tsx`

Expected: all existing interaction assertions pass.

### Task 2: Tune the scene styling for the editorial anatomy direction

**Files:**
- Modify: `src/styles/explorer.css`
- Modify: `src/styles/responsive.css`

**Interfaces:**
- No component API changes.
- CSS classes continue to use `.organ-visual`, `.organ-stage`, `.organ-transform`, `.svg-hotspot`, and `.anatomy-label`.

- [ ] **Step 1: Add a restrained material treatment**

Use the existing green-black stage, add a subtle warm reflection to the organ stage, refine SVG transitions, and make selected markers read above the new layered surfaces.

- [ ] **Step 2: Preserve responsive constraints**

At mobile widths keep the organ centered and fully visible, retain touch pan/zoom, and avoid making fine details compete with the selected label list.

- [ ] **Step 3: Run lint/build checks**

Run: `npm run build`

Expected: Vite production build completes without TypeScript or CSS errors.

### Task 3: Browser visual QA and final cleanup

**Files:**
- Modify: `src/components/OrganVisual.tsx` or `src/styles/explorer.css` only if QA exposes a concrete mismatch.

- [ ] **Step 1: Start the Vite app and inspect the explorer**

Open the heart, lungs, brain, liver, kidneys, and bladder routes. Verify that each renders a differentiated shape and that the stage caption, labels, and panel remain readable.

- [ ] **Step 2: Exercise all four modes**

Click `Externe`, `Coupe`, `Réseaux`, and `Isoler`; select a hotspot from the image and from the tree; rotate and zoom. Confirm the selected structure and fiche stay synchronized.

- [ ] **Step 3: Check responsive render**

Inspect a desktop viewport and a 390×844 mobile viewport. Confirm no organ is clipped and the bottom panel remains usable.

- [ ] **Step 4: Re-run automated checks and record the result**

Run: `npm test -- --run` and `npm run build`.

Expected: all tests pass and the production build completes.

- [ ] **Step 5: Commit the implementation**

```bash
git add src/components/OrganVisual.tsx src/styles/explorer.css src/styles/responsive.css docs/superpowers/plans/2026-08-03-organes-anatomie-vivante-implementation.md
git commit -m "feat: redesign anatomy organ visuals"
```
