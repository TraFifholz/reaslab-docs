# Playwright Screenshot Pipeline Design

> **For agentic workers:** This document defines the design for producing ReasLab product screenshots for the `docs-main` documentation site. Do not start implementation until this design is approved.

**Goal:** Create a screenshot production workflow that can quickly produce the first batch of core ReasLab documentation images while establishing a repeatable foundation for future re-capture.

**Context:** `docs-main` is a VitePress documentation site with existing screenshots referenced from `public/images/` and `reference/images/`. The immediate need is to improve product screenshots for core user-path documentation while supporting tutorial-style annotated outputs.

**Primary constraints:**
- Initial capture will use the user's current personal ReasLab account rather than a dedicated demo account.
- First batch should focus on core user journeys, not every document page.
- Final images should support tutorial-style callouts rather than raw screenshots only.
- The workflow must be lightweight enough to deliver early value without overbuilding a full visual automation platform.

**Working assumption for v1:** Even though the login identity is the user's personal account, all first-batch screenshots should be taken from a dedicated sanitized screenshot workspace or project set created specifically for docs capture. Personal account usage does not imply personal everyday project data is in scope for capture.

---

## 1. Problem Statement

The documentation site currently mixes several screenshot sources:

- stable public images under `public/images/`
- guide-specific reference images under `reference/images/`
- placeholder or partially maintained image references in some guides

This creates several operational issues:

- screenshots are not clearly generated from a single repeatable process
- image quality and composition are likely to drift over time
- updating screenshots after product UI changes will be expensive if the capture steps live only in human memory
- tutorial-oriented screenshots need annotation support that plain browser screenshots do not provide on their own

The design therefore needs to separate:

- how a product screen is reached and captured
- how explanatory overlays are applied
- how final images are published into the docs site

---

## 2. Desired Outcomes

The workflow should deliver the following outcomes:

1. A first batch of high-value screenshots for core user paths
2. Consistent screenshot framing, viewport sizing, and UI state
3. A repeatable script-driven capture path using Playwright
4. A structured annotation layer for tutorial callouts
5. Predictable output locations and naming conventions for docs authors

Success is defined as:

- a contributor can regenerate a known screenshot from a named spec
- final files can be copied or published into `public/images/`
- the first batch covers the most important product walkthrough screens
- sensitive or unstable personal-account UI data is either hidden, masked, or avoided
- the first batch has an explicit done-list with named scene specs and output files

---

## 3. Recommended Approach

The recommended design is a two-layer pipeline:

### Layer A: Capture layer

Playwright is responsible for:

- launching a controlled browser session
- authenticating as needed
- navigating to the target ReasLab screen
- normalizing window size and browser state
- waiting for the correct UI state
- hiding or masking unstable UI elements
- exporting a clean raw screenshot

### Layer B: Annotation layer

A separate post-processing step is responsible for:

- adding numbered callout markers
- drawing highlight boxes or arrows
- placing short explanatory labels
- exporting the final tutorial image used by the docs

This split is the key design decision. The browser automation should not own the full visual explanation problem. It should produce stable source material. Annotation should build on that source material in a deterministic way.

---

## 4. Alternatives Considered

### Option A: Pure Playwright screenshots only

This would be simpler to implement, but it does not satisfy the tutorial-image requirement well. It is a good fit for raw product imagery but weak for explanatory guides.

### Option B: Manual screenshots with ad hoc editing

This would produce fast early images, but maintenance would be poor. Re-capture would depend on memory, manual navigation, and inconsistent personal habits.

### Option C: Playwright capture plus structured annotation

This best fits the user's stated goals: fast initial value with a path to repeatable regeneration.

**Recommendation:** adopt Option C.

---

## 5. Scope of the First Batch

The first batch should deliberately stay small and target the highest-value product walkthroughs. Recommended initial scenes:

1. `home-dashboard`
2. `new-project`
3. `file-explorer`
4. `editor-overview`
5. `lean-infoview`
6. `ai-chat-interface`
7. `provider-config`
8. `share-dialog`
9. `project-history`
10. `search-panel`

These scenes map well to the documentation already present in files such as:

- `index.md`
- `guides/overview.md`
- `guides/projects.md`
- `guides/file-explorer.md`
- `guides/ai.md`
- `guides/provider-config.md`
- `guides/collaboration.md`
- `guides/search.md`
- `guides/lean.md`

Out of scope for the first batch:

- exhaustive coverage of every product flow
- mobile screenshots
- video capture automation
- advanced auto-layout detection for annotations
- full replacement of all existing `reference/images/` assets on day one

### First-batch acceptance contract

The first batch is considered complete only when each selected scene has all of the following:

- one approved scene spec file
- one reproducible raw output
- one reviewed final output if the scene is marked as annotated
- one declared publish target path
- one declared docs usage map listing the markdown files that should reference it

The implementation plan should classify each first-batch scene as one of:

- `raw-only`
- `annotated`

Recommended v1 classification:

- `home-dashboard` -> `annotated`
- `new-project` -> `annotated`
- `file-explorer` -> `annotated`
- `editor-overview` -> `annotated`
- `lean-infoview` -> `annotated`
- `ai-chat-interface` -> `annotated`
- `provider-config` -> `annotated`
- `share-dialog` -> `annotated`
- `project-history` -> `raw-only`
- `search-panel` -> `annotated`

### First-batch docs mapping

Initial intended docs mapping should be explicit:

- `home-dashboard` -> `index.md`, `guides/overview.md`, `zh/index.md`, `zh/guides/overview.md`
- `new-project` -> `guides/projects.md`, `guides/lean.md`, `zh/guides/projects.md`, `zh/guides/lean.md`
- `file-explorer` -> `guides/file-explorer.md`, `zh/guides/file-explorer.md`
- `editor-overview` -> `guides/overview.md`, `guides/markdown.md`, `guides/latex.md`
- `lean-infoview` -> `guides/lean.md`, `zh/guides/lean.md`
- `ai-chat-interface` -> `guides/ai.md`
- `provider-config` -> `guides/provider-config.md`, `zh/guides/provider-config.md`, `guides/ai.md`
- `share-dialog` -> `guides/collaboration.md`, `zh/guides/collaboration.md`, `guides/ai.md`
- `project-history` -> `guides/file-explorer.md`, `zh/guides/file-explorer.md`
- `search-panel` -> `guides/search.md`, `guides/file-explorer.md`, `zh/guides/file-explorer.md`

---

## 6. Repository Layout

Recommended new structure inside `docs-main`:

```text
tools/
  screenshots/
    runner/
      capture.ts
      annotate.ts
      utils/
    specs/
      home-dashboard.json
      editor-overview.json
      ai-chat-interface.json
    output/
      raw/
      final/
    assets/
      arrows/
      icons/
      fonts/
```

Publishing targets remain:

- `public/images/` for stable doc-facing images
- optionally `reference/images/` if some existing guides continue to rely on that structure

The `tools/screenshots/` tree should be treated as the production system, while `public/images/` remains the published artifact location.

---

## 7. Screenshot Spec Format

Each target image should be defined by a single scene spec rather than hardcoded script logic.

Each spec should include:

- `id`: stable scene identifier
- `description`: human-readable intent
- `route` or `entry`: how to reach the screen
- `setupSteps`: ordered actions to reach the desired UI state
- `waitFor`: selectors or conditions that define readiness
- `viewport`: width, height, and optional device scale factor
- `captureTarget`: viewport, full page, or element selector
- `maskSelectors`: selectors to hide or blur unstable or sensitive content
- `cleanupSelectors`: temporary UI to dismiss before capture
- `annotations`: optional callout definitions for final image generation
- `outputName`: final file name intended for docs use
- `publish`: target published path and replacement policy
- `docsUsage`: markdown files expected to use the output
- `mode`: `raw-only` or `annotated`

This format keeps scene knowledge close to the asset itself, making re-capture possible without reverse-engineering previous screenshots.

### Action schema for `setupSteps`

`setupSteps` must use a small explicit action vocabulary rather than free-form text. Each step should be machine-readable. Recommended initial action types:

- `goto`
- `click`
- `fill`
- `press`
- `waitForSelector`
- `waitForURL`
- `waitForIdle`
- `setViewportState`
- `dismiss`
- `mask`
- `assertVisible`

Each action should include only the minimum required fields. Example shape:

```json
{
  "type": "click",
  "locator": {
    "kind": "selector",
    "value": "[data-testid='share-button']"
  }
}
```

### Reusable preconditions and fixtures

Specs should be allowed to reference named shared preconditions rather than duplicating setup logic. Examples:

- `auth.loggedIn`
- `workspace.docsSandboxOpen`
- `workspace.cleanPanels`

These shared preconditions must live in code, not in hidden local knowledge.

### Metadata output contract

Every capture run should emit metadata alongside the raw image. Minimum metadata fields:

- scene id
- timestamp
- current URL
- viewport size
- applied masks
- git commit hash of `docs-main`
- source raw image path
- source final image path if generated
- publish target path

Metadata should be written in a machine-readable format such as JSON.

---

## 8. Capture Workflow

The capture workflow should be deterministic and explicit:

1. Start Playwright with a dedicated screenshot profile or isolated context
2. Load authentication from a local ignored session-state file or perform a guided login bootstrap
3. Navigate to the scene entry point
4. Execute scene setup steps
5. Wait for stable UI conditions
6. Hide or mask unstable UI regions
7. Capture raw image
8. Save metadata about the run

### Authentication and state handling

Authentication handling must be explicit because repeatability cannot depend on whatever happens to be open in a local browser.

Required v1 rules:

- session state must be stored in a local ignored file such as `tools/screenshots/.auth/session.json`
- no credentials or session state may be committed
- provide a bootstrap command that opens the login flow and saves fresh session state after successful authentication
- capture runs should fail fast with a clear message if session state is missing or expired
- the browser context used for capture should be isolated from the user's casual browser profile

This approach still works with a personal account, but it avoids depending on an uncontrolled day-to-day browser session.

Important implementation guidance:

- prefer condition-based waiting over sleeps
- prefer named selectors or semantic locators over positional clicks
- keep browser viewport fixed for a given screenshot family
- capture one canonical desktop size first, likely around `1440x900`

The output of this phase is a clean raw image in `tools/screenshots/output/raw/`.

---

## 9. Annotation Workflow

The annotation layer should start small and opinionated.

Supported annotation primitives in v1:

1. `callout-dot` — numbered circle marker
2. `highlight-box` — outlined or tinted rectangular emphasis
3. `label-arrow` — short label with directional arrow

Each annotation should be defined in the scene spec using explicit coordinate rules. The system does not need smart image understanding in the first version.

### Capture-to-annotation contract

The annotation renderer should consume:

- the raw PNG
- the capture metadata JSON
- the scene spec annotation block

The renderer must not depend on hidden manual state.

### Coordinate model

To limit drift and ambiguity, v1 should use viewport-relative pixel coordinates measured against the canonical captured image dimensions.

Rules:

- all annotation coordinates are stored relative to the captured bitmap width and height
- if a scene changes viewport dimensions, it becomes a distinct scene family or requires coordinate recalibration
- annotation anchors to DOM elements are out of scope for v1 unless explicitly added later

### Text styling contract

Annotation text styling should be versioned and centralized. At minimum:

- one shared font family
- one shared label size scale
- one shared color palette for callouts, arrows, and boxes
- one shared spacing system

The renderer should use a small theme file so visual style is stable across all screenshots.

The annotation renderer should:

- read the raw image
- apply declared overlays in order
- export a final PNG suitable for docs usage

This gives enough power for tutorial-style imagery without requiring a full design tool.

---

## 10. Handling Personal-Account Risk

Because the first iteration uses the user's existing personal account, the design must account for instability and privacy risk.

Required mitigations:

- hide or blur usernames, avatars, personal workspace names, and historical lists where practical
- avoid screenshots that reveal unnecessary private projects or collaborator data
- prefer a fixed screenshot project or stable sandbox workspace where possible
- add pre-capture cleanup steps for notifications, popovers, toasts, and dynamic panels
- identify regions that may need masking because they change frequently, such as timestamps or counters

Required policy for v1 first-batch scenes:

- every first-batch scene must be captured from a dedicated sanitized docs workspace, even if the login account itself is personal
- no first-batch capture may originate from an actively used personal working project
- if a scene cannot be made safe through sandboxing and masking, it is deferred from the first batch

This is a major reason the spec format must support masking and cleanup selectors explicitly.

---

## 11. Naming and Publishing Rules

Final image names should follow the existing kebab-case convention already implied in `public/images/README.md`.

Recommended rules:

- use lowercase kebab-case only
- one conceptual UI state per file
- keep final names stable even if the capture spec evolves
- publish PNG by default
- keep width and file size within the practical constraints documented in `public/images/README.md`

Preferred publish flow:

1. generate raw image
2. generate final annotated image
3. record or update manifest entry for the image
4. review visually
5. promote approved final asset into `public/images/` or approved legacy target
6. update markdown references if needed

### Manifest and promotion contract

To avoid ad hoc publishing, the pipeline should maintain a manifest file that records at least:

- scene id
- mode
- raw output path
- final output path
- canonical publish path
- docs usage list
- replacement status

Promotion should be an explicit step, not manual file shuffling without record. The promoting command should copy the chosen final output into the canonical publish path and update the manifest status.

---

## 12. Documentation Mapping Strategy

The current docs reference two main screenshot pools:

- `/images/...` from `public/images/`
- `../reference/images/...` from `reference/images/`

The screenshot pipeline should not attempt to normalize all legacy references immediately. Instead:

- first target the most reused assets in `public/images/`
- add new scene specs for those assets
- only migrate `reference/images/` usage when a guide is being actively refreshed

### Source-of-truth rule

For any newly automated screenshot, the scene spec plus manifest entry becomes the source of truth for:

- how the image is produced
- where the image is published
- which docs pages should reference it

Docs authors should not need to guess whether a screenshot belongs in `public/images/` or `reference/images/`; that decision must already exist in the manifest.

### Duplicate-avoidance rule

When an automated screenshot replaces a legacy image:

- prefer reusing the existing published filename if the conceptual screen is the same
- do not create a second semantically equivalent image under a new name unless there is a strong reason
- if a legacy `reference/images/` asset is replaced by a `public/images/` asset, the markdown references should be updated in the same change that promotes the new image

This staged approach reduces migration risk.

---

## 13. Verification and Review Expectations

Every produced screenshot should be checked for:

- correct route or screen state
- absence of sensitive data
- consistent framing
- readable annotation text
- no stale toasts, loading spinners, or transient modals
- visual match with the guide text it supports

For each batch, maintain a lightweight review checklist that pairs:

- scene spec name
- generated raw image
- final image path
- docs pages using the image

---

## 14. Risks and Trade-offs

### Risk: UI instability
If the current product changes often, selectors and annotation coordinates may drift.

**Mitigation:** use focused scene specs, semantic locators, and small batches.

### Risk: personal account contamination
Screenshots may expose unintended private data.

**Mitigation:** mask selectors, dedicated sample projects where possible, manual review before publish.

### Risk: annotation maintenance burden
Tutorial overlays can become expensive if overused.

**Mitigation:** keep annotation primitives limited and reserve overlays for truly explanatory images.

### Risk: overbuilding the system
Trying to solve every screenshot need in v1 would slow delivery.

**Mitigation:** optimize for first-batch usefulness, not universal screenshot automation.

---

## 15. Recommended Delivery Sequence

Implementation should proceed in this order:

1. Define screenshot naming rules and first-batch scene list
2. Build Playwright capture runner
3. Add scene spec support
4. Produce first raw captures for core user-path scenes
5. Build minimal annotation renderer
6. Produce final annotated screenshots for the most important guides
7. Publish selected outputs into `public/images/`
8. Update markdown references where replacements are ready

This sequence preserves momentum and reduces the chance of blocking on the annotation system before any screenshots exist.

---

## 16. Final Recommendation

Proceed with a lightweight but structured screenshot system built around:

- Playwright for deterministic product-state capture
- scene-spec files for repeatability
- a small annotation renderer for tutorial-style callouts
- staged publication into `public/images/`

This approach best matches the user's priorities: ship the first batch quickly, but avoid creating a one-off manual process that becomes expensive to maintain.
