# Anatomia+ Anatomical Depth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the ten vector organs with richer material, depth, mode separation, annotations, and accessible motion while preserving all existing interactions.

**Architecture:** Keep `OrganVisual` as the SVG renderer, introduce small shared SVG primitives for tissue and cutaway treatment, and keep organ-specific anatomy in focused components. Expose stable mode/selection hooks through classes and data attributes so CSS can animate presentation without duplicating application state.

**Tech Stack:** React 18, TypeScript 5.7, SVG, CSS, Vitest, Testing Library, Playwright.

## Global Constraints

- Preserve the current dark green visual identity and lime interaction accent.
- Do not add WebGL, a rendering dependency, navigation, or medical content.
- Keep every hotspot keyboard accessible and every organ image named for assistive technology.
- Respect `prefers-reduced-motion`.
- Preserve the existing URL state and explorer interactions.

---

### Task 1: Stable visual states

**Files:**
- Modify: `src/components/OrganVisual.tsx`
- Modify: `src/components/OrganExplorer.tsx`
- Test: `src/OrganVisual.test.tsx`

**Interfaces:**
- Consumes: `Organ`, `ViewMode`, `selectedId`, and `onSelect`.
- Produces: `data-mode`, `data-selected-structure`, a `.tissue-shell`, and a `.cutaway-layer` for styling and tests.

- [ ] **Step 1: Write the failing test**

Render `OrganVisual` with the kidney fixture in `section` mode and assert that the SVG exposes `data-mode="section"`, `data-selected-structure`, and a visible element labelled `Plan de coupe`.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/OrganVisual.test.tsx`
Expected: FAIL because the visual-state attributes and labelled cutaway layer do not exist.

- [ ] **Step 3: Write minimal implementation**

Add the stable attributes to the root SVG. Extract the common shell and inset cutaway into focused SVG groups. Mark decorative layers `aria-hidden` and label the cutaway group `Plan de coupe`.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/OrganVisual.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/OrganVisual.tsx src/components/OrganExplorer.tsx src/OrganVisual.test.tsx
git commit -m "refactor: expose anatomical visual states"
```

### Task 2: Anatomical material and mode hierarchy

**Files:**
- Modify: `src/components/OrganVisual.tsx`
- Modify: `src/styles/explorer.css`
- Test: `src/OrganVisual.test.tsx`

**Interfaces:**
- Consumes: the stable SVG state hooks from Task 1.
- Produces: tissue highlights, inner shadow, cut rim, depth shading, network emphasis, and isolate emphasis.

- [ ] **Step 1: Write the failing test**

Add assertions that a non-heart organ renders `.tissue-highlight`, `.tissue-depth`, and `.cut-rim`, and that network mode renders an organ-specific `.network-layer`.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/OrganVisual.test.tsx`
Expected: FAIL because the material layers are absent.

- [ ] **Step 3: Write minimal implementation**

Add shared gradient/filter definitions and shell overlays. Mark each organ-specific network group with `.network-layer`. Add CSS opacity, saturation, depth, and transition rules keyed by `.mode-external`, `.mode-section`, `.mode-networks`, and `.mode-isolate`.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/OrganVisual.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/OrganVisual.tsx src/styles/explorer.css src/OrganVisual.test.tsx
git commit -m "feat: add anatomical tissue depth"
```

### Task 3: Precise labels and accessible motion

**Files:**
- Modify: `src/components/OrganExplorer.tsx`
- Modify: `src/styles/explorer.css`
- Modify: `src/styles/responsive.css`
- Test: `src/App.interaction.test.tsx`

**Interfaces:**
- Consumes: current selected structure and mode.
- Produces: connected label leaders, selected label emphasis, mode transition state, and reduced-motion fallback.

- [ ] **Step 1: Write the failing test**

Open the heart, select `Valve mitrale`, and assert that its annotation has `aria-current="true"` while other annotations do not.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run src/App.interaction.test.tsx`
Expected: FAIL because annotations do not expose `aria-current`.

- [ ] **Step 3: Write minimal implementation**

Add `aria-current` to the active annotation, a dedicated leader element, keyed mode transition attributes, desktop label connectors, mobile-safe placement, and a reduced-motion override.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run src/App.interaction.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/OrganExplorer.tsx src/styles/explorer.css src/styles/responsive.css src/App.interaction.test.tsx
git commit -m "feat: refine anatomical annotations"
```

### Task 4: Full verification and delivery

**Files:**
- Modify: `docs/fidelity-ledger.md`
- Modify: `README.md`
- Create: `outputs/anatomia-depth-desktop.png`
- Create: `outputs/anatomia-depth-mobile.png`

**Interfaces:**
- Consumes: the completed visual upgrade.
- Produces: verified screenshots, fidelity notes, and PR-ready documentation.

- [ ] **Step 1: Run complete automated verification**

Run: `pnpm test:run && pnpm build && pnpm test:e2e`
Expected: all Vitest tests, TypeScript build, Vite build, and Playwright scenarios pass.

- [ ] **Step 2: Verify visible behavior**

Capture the heart and kidney cutaway at 1584 × 992 and the heart at 390 × 844. Inspect navigation, organ depth, cutaway rim, network contrast, selected annotation, overflow, and reduced-motion behavior.

- [ ] **Step 3: Record fidelity evidence**

Update `docs/fidelity-ledger.md` with the comparison points and update the README screenshot and feature summary.

- [ ] **Step 4: Re-run full verification**

Run: `pnpm test:run && pnpm build && pnpm test:e2e`
Expected: all commands exit 0 with no test failures.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/fidelity-ledger.md outputs/anatomia-depth-desktop.png outputs/anatomia-depth-mobile.png
git commit -m "docs: document anatomical depth upgrade"
```

