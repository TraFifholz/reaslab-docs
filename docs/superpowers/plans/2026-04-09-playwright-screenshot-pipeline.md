# Playwright Screenshot Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a repeatable Playwright-based screenshot pipeline for `docs-main` that captures core ReasLab product screens, applies tutorial-style annotations, and promotes approved outputs into the docs image set.

**Architecture:** The implementation is split into four layers: typed scene/manifest definitions, a Playwright capture runner, a post-processing annotation renderer, and a promotion flow that publishes reviewed assets into `public/images/`. The first batch ships ten core scene specs using a sanitized screenshot workspace under the user's existing account, with raw outputs and metadata kept separate from published docs assets.

**Tech Stack:** Bun, TypeScript, `tsx`, Playwright, Sharp, Zod, `bun test`

---

## File Structure

**Modify:**
- `D:\Workspace\docs-main\.gitignore` - ignore screenshot auth and generated outputs
- `D:\Workspace\docs-main\package.json` - add screenshot scripts and dev dependencies

**Create:**
- `D:\Workspace\docs-main\tools\screenshots\tsconfig.json` - isolated TypeScript config for screenshot tooling
- `D:\Workspace\docs-main\tools\screenshots\README.md` - operator guide for auth bootstrap, capture, annotation, promotion, and sanitized workspace rules
- `D:\Workspace\docs-main\tools\screenshots\manifest.json` - source of truth for first-batch scenes, publish paths, and docs usage
- `D:\Workspace\docs-main\tools\screenshots\review-checklist.json` - lightweight review artifact pairing scene specs, generated files, and docs usage
- `D:\Workspace\docs-main\tools\screenshots\theme.json` - shared annotation colors, spacing, and text styles
- `D:\Workspace\docs-main\tools\screenshots\runner\auth.ts` - guided login bootstrap that writes ignored session state
- `D:\Workspace\docs-main\tools\screenshots\runner\capture.ts` - scene runner that loads specs, executes Playwright steps, masks content, and writes raw screenshots plus metadata
- `D:\Workspace\docs-main\tools\screenshots\runner\annotate.ts` - CLI entrypoint for rendering tutorial overlays from raw outputs
- `D:\Workspace\docs-main\tools\screenshots\runner\promote.ts` - CLI entrypoint that copies approved outputs into canonical docs paths and updates manifest status
- `D:\Workspace\docs-main\tools\screenshots\runner\lib\schema.ts` - Zod schemas and TypeScript types for scene specs, manifest entries, and annotation definitions
- `D:\Workspace\docs-main\tools\screenshots\runner\lib\paths.ts` - path helpers for `.auth`, `output/raw`, `output/final`, and metadata directories
- `D:\Workspace\docs-main\tools\screenshots\runner\lib\manifest.ts` - load/save helpers for `manifest.json`
- `D:\Workspace\docs-main\tools\screenshots\runner\lib\metadata.ts` - capture metadata builder/writer
- `D:\Workspace\docs-main\tools\screenshots\runner\lib\playwright-session.ts` - browser/context creation from ignored session state
- `D:\Workspace\docs-main\tools\screenshots\runner\lib\preconditions.ts` - named reusable setup helpers such as `auth.loggedIn` and `workspace.cleanPanels`
- `D:\Workspace\docs-main\tools\screenshots\runner\lib\actions.ts` - executor for typed `setupSteps`
- `D:\Workspace\docs-main\tools\screenshots\runner\lib\annotate-image.ts` - Sharp-based overlay renderer
- `D:\Workspace\docs-main\tools\screenshots\specs\home-dashboard.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\new-project.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\file-explorer.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\editor-overview.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\lean-infoview.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\ai-chat-interface.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\provider-config.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\share-dialog.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\project-history.json`
- `D:\Workspace\docs-main\tools\screenshots\specs\search-panel.json`
- `D:\Workspace\docs-main\tools\screenshots\tests\schema.test.ts`
- `D:\Workspace\docs-main\tools\screenshots\tests\manifest.test.ts`
- `D:\Workspace\docs-main\tools\screenshots\tests\preconditions.test.ts`
- `D:\Workspace\docs-main\tools\screenshots\tests\metadata.test.ts`
- `D:\Workspace\docs-main\tools\screenshots\tests\annotate-image.test.ts`

**Do not create in v1:**
- a dedicated Playwright test runner config
- DOM-anchored smart annotation placement
- mobile screenshot variants
- auto-updating markdown unless a publish path truly changes

---

### Task 1: Bootstrap Screenshot Tooling

**Files:**
- Modify: `D:\Workspace\docs-main\.gitignore`
- Modify: `D:\Workspace\docs-main\package.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\tsconfig.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\README.md`

- [ ] **Step 1: Add ignored local-output paths**

Update `D:\Workspace\docs-main\.gitignore` with the screenshot-specific rules:

```gitignore
tools/screenshots/.auth/
tools/screenshots/output/
```

- [ ] **Step 2: Add screenshot scripts and dependencies**

Update `D:\Workspace\docs-main\package.json` so the scripts and dev dependencies include the screenshot tooling:

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview",
    "screenshots:auth": "tsx tools/screenshots/runner/auth.ts",
    "screenshots:capture": "tsx tools/screenshots/runner/capture.ts",
    "screenshots:annotate": "tsx tools/screenshots/runner/annotate.ts",
    "screenshots:promote": "tsx tools/screenshots/runner/promote.ts",
    "screenshots:typecheck": "tsc -p tools/screenshots/tsconfig.json --noEmit",
    "screenshots:test": "bun test tools/screenshots/tests"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "playwright": "^1.54.0",
    "sharp": "^0.34.0",
    "tsx": "^4.19.0",
    "typescript": "^5.8.0",
    "vitepress": "2.0.0-alpha.12",
    "zod": "^3.24.0"
  }
}
```

- [ ] **Step 3: Create isolated screenshot TypeScript config**

Create `D:\Workspace\docs-main\tools\screenshots\tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "types": ["node"]
  },
  "include": [
    "runner/**/*.ts",
    "tests/**/*.ts"
  ]
}
```

- [ ] **Step 4: Create the operator README skeleton**

Create `D:\Workspace\docs-main\tools\screenshots\README.md` with these sections:

```md
# Screenshot Workflow

## Prerequisites
## Sanitized Workspace Rules
## Bootstrap Login
## Capture a Scene
## Annotate a Scene
## Promote an Approved Image
## First-Batch Scene List
```

- [ ] **Step 5: Install dependencies**

Run: `bun install`

Expected: lockfiles update and the new screenshot dependencies are installed without errors.

- [ ] **Step 6: Install the Playwright browser used by the pipeline**

Run: `bunx playwright install chromium`

Expected: Chromium downloads successfully for local screenshot runs.

---

### Task 2: Define Typed Scene and Manifest Contracts

**Files:**
- Create: `D:\Workspace\docs-main\tools\screenshots\manifest.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\review-checklist.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\lib\schema.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\lib\paths.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\lib\manifest.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\tests\schema.test.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\tests\manifest.test.ts`

- [ ] **Step 1: Write the failing schema tests first**

Create `D:\Workspace\docs-main\tools\screenshots\tests\schema.test.ts` with checks for valid action types, required `mode`, and annotation shape:

```ts
import { describe, expect, test } from "bun:test"
import { SceneSpecSchema } from "../runner/lib/schema"

describe("SceneSpecSchema", () => {
  test("accepts an annotated scene with typed setup steps", () => {
    const parsed = SceneSpecSchema.parse({
      id: "provider-config",
      mode: "annotated",
      description: "Open model settings dialog",
      outputName: "ai-llm-configuration.png",
      publish: { target: "public/images/ai-llm-configuration.png" },
      docsUsage: ["guides/provider-config.md"],
      preconditions: ["auth.loggedIn", "workspace.docsSandboxOpen"],
      setupSteps: [
        { type: "click", locator: { kind: "selector", value: "[data-testid='settings-button']" } },
        { type: "waitForSelector", locator: { kind: "selector", value: "[data-testid='model-settings-dialog']" } }
      ],
      waitFor: [{ kind: "selector", value: "[data-testid='model-settings-dialog']" }],
      viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
      captureTarget: { kind: "viewport" },
      cleanupSelectors: ["[data-testid='toast']"],
      maskSelectors: ["[data-testid='user-avatar']"],
      annotations: [
        { type: "callout-dot", x: 1120, y: 120, label: "1" }
      ]
    })

    expect(parsed.id).toBe("provider-config")
  })
})
```

- [ ] **Step 2: Write the failing manifest tests**

Create `D:\Workspace\docs-main\tools\screenshots\tests\manifest.test.ts` with the first-batch contract hardcoded:

```ts
import { describe, expect, test } from "bun:test"
import { loadManifest } from "../runner/lib/manifest"

describe("manifest", () => {
  test("tracks the approved first-batch scenes", async () => {
    const manifest = await loadManifest()
    expect(manifest.scenes.map((scene) => scene.id)).toEqual([
      "home-dashboard",
      "new-project",
      "file-explorer",
      "editor-overview",
      "lean-infoview",
      "ai-chat-interface",
      "provider-config",
      "share-dialog",
      "project-history",
      "search-panel"
    ])
  })
})
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `bun test tools/screenshots/tests/schema.test.ts tools/screenshots/tests/manifest.test.ts`

Expected: FAIL because `schema.ts`, `manifest.ts`, and `manifest.json` do not exist yet.

- [ ] **Step 4: Implement the schema layer**

Create `D:\Workspace\docs-main\tools\screenshots\runner\lib\schema.ts` with Zod schemas for `SceneSpec`, `Manifest`, `Locator`, `SetupStep`, and annotation types. The action enum must include:

```ts
const SetupStepTypeSchema = z.enum([
  "goto",
  "click",
  "fill",
  "press",
  "waitForSelector",
  "waitForURL",
  "waitForIdle",
  "setViewportState",
  "dismiss",
  "mask",
  "assertVisible",
])
```

Also enforce these rules in the schema layer:

```txt
- every `annotated` scene must include at least one annotation item
- every `raw-only` scene must remain promotable without running annotate.ts
```

- [ ] **Step 5: Implement path and manifest helpers**

Create `D:\Workspace\docs-main\tools\screenshots\runner\lib\paths.ts` and `D:\Workspace\docs-main\tools\screenshots\runner\lib\manifest.ts` so all scripts share the same directory conventions and JSON load/save behavior.

- [ ] **Step 6: Create the initial manifest**

Create `D:\Workspace\docs-main\tools\screenshots\manifest.json` with one entry per approved first-batch scene. Use these exact publish targets in v1:

```json
{
  "version": 1,
  "scenes": [
    {
      "id": "home-dashboard",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/home-dashboard.png",
      "finalOutput": "tools/screenshots/output/final/home-dashboard.png",
      "publishPath": "public/images/ide-illustration.png",
      "docsUsage": ["index.md", "guides/overview.md", "zh/index.md", "zh/guides/overview.md"],
      "status": "planned"
    },
    {
      "id": "new-project",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/new-project.png",
      "finalOutput": "tools/screenshots/output/final/new-project.png",
      "publishPath": "public/images/new-project-toolchain.png",
      "docsUsage": ["guides/projects.md", "zh/guides/projects.md", "guides/lean.md", "zh/guides/lean.md"],
      "status": "planned"
    },
    {
      "id": "file-explorer",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/file-explorer.png",
      "finalOutput": "tools/screenshots/output/final/file-explorer.png",
      "publishPath": "public/images/upload-files.png",
      "docsUsage": ["guides/file-explorer.md", "zh/guides/file-explorer.md"],
      "status": "planned"
    },
    {
      "id": "editor-overview",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/editor-overview.png",
      "finalOutput": "tools/screenshots/output/final/editor-overview.png",
      "publishPath": "public/images/command-palette.png",
      "docsUsage": ["guides/overview.md", "guides/markdown.md", "guides/latex.md"],
      "status": "planned"
    },
    {
      "id": "lean-infoview",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/lean-infoview.png",
      "finalOutput": "tools/screenshots/output/final/lean-infoview.png",
      "publishPath": "public/images/lean-infoview.png",
      "docsUsage": ["guides/lean.md", "zh/guides/lean.md"],
      "status": "planned"
    },
    {
      "id": "ai-chat-interface",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/ai-chat-interface.png",
      "finalOutput": "tools/screenshots/output/final/ai-chat-interface.png",
      "publishPath": "public/images/ai-chat-interface.png",
      "docsUsage": ["guides/ai.md"],
      "status": "planned"
    },
    {
      "id": "provider-config",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/provider-config.png",
      "finalOutput": "tools/screenshots/output/final/provider-config.png",
      "publishPath": "public/images/ai-llm-configuration.png",
      "docsUsage": ["guides/provider-config.md", "zh/guides/provider-config.md", "guides/ai.md"],
      "status": "planned"
    },
    {
      "id": "share-dialog",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/share-dialog.png",
      "finalOutput": "tools/screenshots/output/final/share-dialog.png",
      "publishPath": "public/images/share-dialog.png",
      "docsUsage": ["guides/collaboration.md", "zh/guides/collaboration.md", "guides/ai.md"],
      "status": "planned"
    },
    {
      "id": "project-history",
      "mode": "raw-only",
      "rawOutput": "tools/screenshots/output/raw/project-history.png",
      "finalOutput": "tools/screenshots/output/final/project-history.png",
      "publishPath": "public/images/project-history.png",
      "docsUsage": ["guides/file-explorer.md", "zh/guides/file-explorer.md"],
      "status": "planned"
    },
    {
      "id": "search-panel",
      "mode": "annotated",
      "rawOutput": "tools/screenshots/output/raw/search-panel.png",
      "finalOutput": "tools/screenshots/output/final/search-panel.png",
      "publishPath": "public/images/search-project.png",
      "docsUsage": ["guides/search.md", "guides/file-explorer.md", "zh/guides/file-explorer.md"],
      "status": "planned"
    }
  ]
}
```

Create `D:\Workspace\docs-main\tools\screenshots\review-checklist.json` with one item per first-batch scene and these fields:

```json
{
  "version": 1,
  "items": [
    {
      "sceneId": "home-dashboard",
      "specPath": "tools/screenshots/specs/home-dashboard.json",
      "rawPath": "tools/screenshots/output/raw/home-dashboard.png",
      "finalPath": "tools/screenshots/output/final/home-dashboard.png",
      "docsUsage": ["index.md", "guides/overview.md", "zh/index.md", "zh/guides/overview.md"],
      "reviewStatus": "pending"
    }
  ]
}
```

Checklist schema rule:

```txt
- `finalPath` is required for `annotated` scenes
- `finalPath` must be `null` for `raw-only` scenes
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `bun test tools/screenshots/tests/schema.test.ts tools/screenshots/tests/manifest.test.ts`

Expected: PASS.

---

### Task 3: Build Auth Bootstrap and Reusable Playwright Actions

**Files:**
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\auth.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\lib\playwright-session.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\lib\preconditions.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\lib\actions.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\tests\preconditions.test.ts`

- [ ] **Step 1: Write the failing reusable-preconditions test**

Create `D:\Workspace\docs-main\tools\screenshots\tests\preconditions.test.ts`:

```ts
import { describe, expect, test } from "bun:test"
import { getPrecondition } from "../runner/lib/preconditions"

describe("preconditions", () => {
  test("resolves the supported named preconditions", () => {
    expect(typeof getPrecondition("auth.loggedIn")).toBe("function")
    expect(typeof getPrecondition("workspace.docsSandboxOpen")).toBe("function")
    expect(typeof getPrecondition("workspace.cleanPanels")).toBe("function")
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bun test tools/screenshots/tests/preconditions.test.ts`

Expected: FAIL because `preconditions.ts` does not exist yet.

- [ ] **Step 3: Implement session bootstrap support**

Create `D:\Workspace\docs-main\tools\screenshots\runner\lib\playwright-session.ts` to:

```ts
import { chromium } from "playwright"

export async function createAuthenticatedContext(sessionFile: string) {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({ storageState: sessionFile })
  return { browser, context }
}
```

Then extend it so a missing or expired session file throws a direct operator-facing error such as `Run bun run screenshots:auth first`.

- [ ] **Step 4: Implement the guided auth bootstrap command**

Create `D:\Workspace\docs-main\tools\screenshots\runner\auth.ts` so it:

```ts
import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"

// 1. open browser
// 2. navigate to ReasLab login
// 3. pause for manual sign-in
// 4. save storage state to tools/screenshots/.auth/session.json
```

The command must write the ignored session state to `tools/screenshots/.auth/session.json` and print the exact file path on success.

- [ ] **Step 5: Implement named preconditions and typed action execution**

Create `D:\Workspace\docs-main\tools\screenshots\runner\lib\preconditions.ts` and `D:\Workspace\docs-main\tools\screenshots\runner\lib\actions.ts`.

Support these reusable preconditions in v1:

```ts
"auth.loggedIn"
"workspace.docsSandboxOpen"
"workspace.cleanPanels"
```

Support these action handlers in `actions.ts`:

```ts
"goto"
"click"
"fill"
"press"
"waitForSelector"
"waitForURL"
"waitForIdle"
"setViewportState"
"dismiss"
"mask"
"assertVisible"
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `bun test tools/screenshots/tests/preconditions.test.ts`

Expected: PASS.

- [ ] **Step 7: Manually verify the auth bootstrap**

Run: `bun run screenshots:auth`

Expected: a browser opens, you sign in manually, and `tools/screenshots/.auth/session.json` is created without being tracked by git.

---

### Task 4: Build the Capture Runner and Metadata Output

**Files:**
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\capture.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\lib\metadata.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\tests\metadata.test.ts`

- [ ] **Step 1: Write the failing metadata test**

Create `D:\Workspace\docs-main\tools\screenshots\tests\metadata.test.ts`:

```ts
import { describe, expect, test } from "bun:test"
import { buildCaptureMetadata } from "../runner/lib/metadata"

describe("buildCaptureMetadata", () => {
  test("records stable scene metadata", () => {
    const metadata = buildCaptureMetadata({
      sceneId: "provider-config",
      currentUrl: "https://model.reaslab.io/home",
      viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
      appliedMasks: ["[data-testid='user-avatar']"],
      rawOutput: "tools/screenshots/output/raw/provider-config.png",
      finalOutput: "tools/screenshots/output/final/provider-config.png",
      publishPath: "public/images/ai-llm-configuration.png",
      gitCommit: "abcdef0"
    })

    expect(metadata.sceneId).toBe("provider-config")
    expect(metadata.publishPath).toBe("public/images/ai-llm-configuration.png")
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bun test tools/screenshots/tests/metadata.test.ts`

Expected: FAIL because `metadata.ts` does not exist yet.

- [ ] **Step 3: Implement metadata creation and persistence**

Create `D:\Workspace\docs-main\tools\screenshots\runner\lib\metadata.ts` so each capture writes JSON with these minimum fields:

```ts
sceneId
timestamp
currentUrl
viewport
appliedMasks
gitCommit
rawOutput
finalOutput
publishPath
```

- [ ] **Step 4: Implement the capture CLI**

Create `D:\Workspace\docs-main\tools\screenshots\runner\capture.ts` so it supports:

```txt
bun run screenshots:capture --scene provider-config
bun run screenshots:capture --scene all
```

The runner must:

```ts
// 1. load manifest and scene spec
// 2. create authenticated context from session.json
// 3. run named preconditions
// 4. execute typed setupSteps
// 5. wait for stable UI
// 6. apply cleanupSelectors and maskSelectors
// 7. write raw image + metadata JSON
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `bun test tools/screenshots/tests/metadata.test.ts`

Expected: PASS.

- [ ] **Step 6: Run static verification on the new tooling**

Run: `bun run screenshots:typecheck && bun run screenshots:test`

Expected: typecheck completes with no errors and all current screenshot tests pass.

---

### Task 5: Build the Annotation Renderer and Promotion Flow

**Files:**
- Create: `D:\Workspace\docs-main\tools\screenshots\theme.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\lib\annotate-image.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\annotate.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\runner\promote.ts`
- Create: `D:\Workspace\docs-main\tools\screenshots\tests\annotate-image.test.ts`

- [ ] **Step 1: Write the failing annotation test first**

Create `D:\Workspace\docs-main\tools\screenshots\tests\annotate-image.test.ts` that renders onto a generated blank PNG and checks that supported overlay types do not throw:

```ts
import { describe, expect, test } from "bun:test"
import { annotateImage } from "../runner/lib/annotate-image"

describe("annotateImage", () => {
  test("renders callout and highlight overlays", async () => {
    const output = await annotateImage({
      input: Buffer.alloc(1440 * 900 * 4),
      width: 1440,
      height: 900,
      annotations: [
        { type: "callout-dot", x: 100, y: 100, label: "1" },
        { type: "highlight-box", x: 240, y: 180, width: 320, height: 120, label: "Models" }
      ]
    })

    expect(output.byteLength).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bun test tools/screenshots/tests/annotate-image.test.ts`

Expected: FAIL because `annotate-image.ts` does not exist yet.

- [ ] **Step 3: Implement the shared annotation theme**

Create `D:\Workspace\docs-main\tools\screenshots\theme.json` with shared label and color tokens:

```json
{
  "fontFamily": "Inter, Arial, sans-serif",
  "labelFontSize": 20,
  "calloutFill": "#2563eb",
  "calloutText": "#ffffff",
  "highlightStroke": "#f97316",
  "labelBackground": "rgba(15, 23, 42, 0.92)",
  "labelText": "#ffffff"
}
```

- [ ] **Step 4: Implement the image renderer**

Create `D:\Workspace\docs-main\tools\screenshots\runner\lib\annotate-image.ts` using Sharp and support only these v1 overlay types:

```ts
"callout-dot"
"highlight-box"
"label-arrow"
```

Use viewport-relative pixel coordinates from the scene spec. Do not add DOM-anchored placement in v1.

- [ ] **Step 5: Implement the CLI wrappers**

Create `D:\Workspace\docs-main\tools\screenshots\runner\annotate.ts` and `D:\Workspace\docs-main\tools\screenshots\runner\promote.ts` so they support:

```txt
bun run screenshots:annotate --scene provider-config
bun run screenshots:annotate --scene all
bun run screenshots:promote --scene provider-config
```

`promote.ts` must copy the approved image into the `publishPath` from the manifest and update that scene's `status` from `planned` to `published`.

`promote.ts` must use `D:\Workspace\docs-main\tools\screenshots\review-checklist.json` as the approval gate:

```txt
- a scene may be promoted only if `reviewStatus` is `approved`
- for `--scene all`, skip scenes marked `needs-changes`
- for single-scene promotion, fail with an actionable error if that scene is not approved
```

`annotate.ts` must treat these three inputs as mandatory for annotated scenes:

```txt
- raw PNG output
- capture metadata JSON written by capture.ts
- scene spec annotation block
```

If the metadata JSON is missing for an annotated scene, `annotate.ts` must fail with an actionable error rather than silently rendering from partial inputs.

Promotion rules must be explicit:

```txt
- for `annotated` scenes, promote `finalOutput`
- for `raw-only` scenes, promote `rawOutput`
- if the required source image is missing, fail with an actionable error
- if a scene is already `published`, no-op with a clear message unless an explicit overwrite path is added later
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun test tools/screenshots/tests/annotate-image.test.ts`

Expected: PASS.

- [ ] **Step 7: Re-run full local verification for the tooling layer**

Run: `bun run screenshots:typecheck && bun run screenshots:test`

Expected: PASS.

---

### Task 6: Author the First Three Pilot Scene Specs

**Files:**
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\home-dashboard.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\ai-chat-interface.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\provider-config.json`
- Modify: `D:\Workspace\docs-main\tools\screenshots\manifest.json`
- Modify: `D:\Workspace\docs-main\tools\screenshots\README.md`

- [ ] **Step 1: Write a failing scene-validation test first**

Extend `D:\Workspace\docs-main\tools\screenshots\tests\schema.test.ts` so it loads these three JSON specs from disk and checks that their ids match manifest entries.

- [ ] **Step 2: Run the test to verify it fails**

Run: `bun test tools/screenshots/tests/schema.test.ts`

Expected: FAIL because the three JSON spec files do not exist yet.

- [ ] **Step 3: Create the `home-dashboard` scene**

Create `D:\Workspace\docs-main\tools\screenshots\specs\home-dashboard.json` with a sanitized dashboard/overview state and annotations pointing to the main IDE regions. Use this shape:

```json
{
  "id": "home-dashboard",
  "mode": "annotated",
  "description": "ReasLab overview workspace screenshot for docs landing pages",
  "outputName": "ide-illustration.png",
  "publish": { "target": "public/images/ide-illustration.png" },
  "docsUsage": ["index.md", "guides/overview.md", "zh/index.md", "zh/guides/overview.md"],
  "preconditions": ["auth.loggedIn", "workspace.docsSandboxOpen", "workspace.cleanPanels"],
  "setupSteps": [
    { "type": "goto", "url": "https://model.reaslab.io/home" },
    { "type": "waitForIdle" }
  ],
  "waitFor": [{ "kind": "selector", "value": "[data-testid='workspace-shell']" }],
  "viewport": { "width": 1440, "height": 900, "deviceScaleFactor": 1 },
  "captureTarget": { "kind": "viewport" },
  "cleanupSelectors": ["[data-testid='toast']"],
  "maskSelectors": ["[data-testid='user-avatar']"],
  "annotations": [
    { "type": "callout-dot", "x": 110, "y": 80, "label": "1" },
    { "type": "highlight-box", "x": 20, "y": 120, "width": 260, "height": 620, "label": "Project navigation" }
  ]
}
```

- [ ] **Step 4: Create the `ai-chat-interface` and `provider-config` scenes**

Create matching JSON specs for:

```txt
tools/screenshots/specs/ai-chat-interface.json
tools/screenshots/specs/provider-config.json
```

Both specs must use the sanitized docs workspace, explicit `publish.target`, and annotation coordinates for their key callouts.

For every annotated scene created in this task, require at least one `callout-dot` and at least one of `highlight-box` or `label-arrow`.

- [ ] **Step 5: Update the operator README with pilot-scene guidance**

Extend `D:\Workspace\docs-main\tools\screenshots\README.md` to document:

```md
- which workspace/project to use for screenshots
- which three pilot scenes exist first
- how to re-run a single scene end to end
```

- [ ] **Step 6: Run the validation tests to verify they pass**

Run: `bun test tools/screenshots/tests/schema.test.ts tools/screenshots/tests/manifest.test.ts`

Expected: PASS.

- [ ] **Step 7: Run the first live smoke capture**

Run:

```bash
bun run screenshots:capture --scene ai-chat-interface
bun run screenshots:annotate --scene ai-chat-interface
```

Expected:
- `tools/screenshots/output/raw/ai-chat-interface.png` exists
- `tools/screenshots/output/final/ai-chat-interface.png` exists
- the image is ready for review but is not promoted yet

---

### Task 7: Complete the Remaining First-Batch Scene Specs

**Files:**
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\new-project.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\file-explorer.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\editor-overview.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\lean-infoview.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\share-dialog.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\project-history.json`
- Create: `D:\Workspace\docs-main\tools\screenshots\specs\search-panel.json`
- Modify: `D:\Workspace\docs-main\tools\screenshots\manifest.json`

- [ ] **Step 1: Write the failing first-batch completeness test**

Extend `D:\Workspace\docs-main\tools\screenshots\tests\manifest.test.ts` so it asserts:

```ts
- every approved first-batch scene has a corresponding spec file
- every docsUsage path exists
- only project-history uses mode "raw-only"
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bun test tools/screenshots/tests/manifest.test.ts`

Expected: FAIL because seven spec files are still missing.

- [ ] **Step 3: Create the remaining scene specs**

Create these exact files and keep them aligned with the manifest:

```txt
tools/screenshots/specs/new-project.json
tools/screenshots/specs/file-explorer.json
tools/screenshots/specs/editor-overview.json
tools/screenshots/specs/lean-infoview.json
tools/screenshots/specs/share-dialog.json
tools/screenshots/specs/project-history.json
tools/screenshots/specs/search-panel.json
```

Use these exact publish targets from the manifest:

```txt
new-project -> public/images/new-project-toolchain.png
file-explorer -> public/images/upload-files.png
editor-overview -> public/images/command-palette.png
lean-infoview -> public/images/lean-infoview.png
share-dialog -> public/images/share-dialog.png
project-history -> public/images/project-history.png
search-panel -> public/images/search-project.png
```

Implementation rule for this step:

```txt
- all scenes except `project-history` must include concrete `annotations`
- `project-history` must be marked `raw-only` and must not depend on annotate.ts to be promotable
```

Each remaining scene spec must be fully implementation-ready and include all of these fields, not just ids and publish targets:

```txt
- route or entry URL
- named preconditions
- ordered setupSteps
- waitFor readiness conditions
- cleanupSelectors
- maskSelectors
- captureTarget
- docsUsage
- publish target
```

Use these per-scene intent contracts when authoring the remaining seven specs:

```txt
new-project:
- route/entry: open the create-project flow from the dashboard or home screen
- preconditions: auth.loggedIn, workspace.cleanPanels
- ready state: the new-project dialog or page is visible with toolchain controls rendered
- masks: user avatar and any recent-project side content
- annotation intent: project name input, project type/toolchain selector, create action

file-explorer:
- route/entry: open the sanitized docs workspace
- preconditions: auth.loggedIn, workspace.docsSandboxOpen, workspace.cleanPanels
- ready state: file tree visible and upload/drop affordance accessible
- masks: collaborator avatars or presence counts if unstable
- annotation intent: file tree area, upload entry point, file actions

editor-overview:
- route/entry: open a stable editor file in the sanitized docs workspace
- preconditions: auth.loggedIn, workspace.docsSandboxOpen, workspace.cleanPanels
- ready state: editor chrome, toolbar, and main editing surface fully visible
- masks: user avatar and any unstable peer/presence chips
- annotation intent: editor surface, toolbar, right-side assist/preview area

lean-infoview:
- route/entry: open a prepared `.lean` file in the sanitized docs workspace
- preconditions: auth.loggedIn, workspace.docsSandboxOpen, workspace.cleanPanels
- ready state: infoview panel populated with current goals or diagnostics
- masks: collaborator indicators if unstable
- annotation intent: code area, infoview, inline diagnostics or proof state region

share-dialog:
- route/entry: open the project share flow from the sanitized docs workspace
- preconditions: auth.loggedIn, workspace.docsSandboxOpen, workspace.cleanPanels
- ready state: share dialog fully visible with permission controls rendered
- masks: real collaborator identities and personal account identifiers
- annotation intent: permission selector, invite/share link control, AI-context sharing option if present

project-history:
- route/entry: open the project history panel for the sanitized docs workspace
- preconditions: auth.loggedIn, workspace.docsSandboxOpen, workspace.cleanPanels
- ready state: history list visible and stable
- masks: author identity, timestamps, and sensitive commit/session labels as needed
- annotation intent: none required because this scene is raw-only

search-panel:
- route/entry: open project search from the sanitized docs workspace
- preconditions: auth.loggedIn, workspace.docsSandboxOpen, workspace.cleanPanels
- ready state: search panel visible with stable sample query/results
- masks: volatile counters or user-specific result context if needed
- annotation intent: search input, results list, replace/filter controls if shown
```

- [ ] **Step 4: Re-run validation to verify the first batch is defined**

Run: `bun run screenshots:typecheck && bun run screenshots:test`

Expected: PASS.

- [ ] **Step 4.5: Verify image constraints match existing docs guidance**

Before approving the batch, confirm the promoted outputs satisfy the practical image guidance in `D:\Workspace\docs-main\public\images\README.md`:

```txt
- width no greater than about 1200px unless a specific scene requires otherwise
- reasonable file size for docs usage
- PNG output for published screenshots
```

Expected: first-batch assets are suitable for the existing docs image conventions.

- [ ] **Step 5: Capture and annotate the rest of the first batch**

Run:

```bash
bun run screenshots:capture --scene all
bun run screenshots:annotate --scene all
```

Expected: every annotated scene writes a final PNG and `project-history` remains raw-only.

- [ ] **Step 6: Review the batch before any promotion**

Before publishing anything, update `D:\Workspace\docs-main\tools\screenshots\review-checklist.json` for every scene in the batch:

```txt
- set `reviewStatus` to `approved` or `needs-changes`
- record actual raw path
- record actual final path or null for raw-only scenes
- confirm docsUsage still matches manifest intent
```

Expected: unapproved scenes remain marked `needs-changes` and are excluded from promotion.

- [ ] **Step 7: Promote only approved scenes**

Run: `bun run screenshots:promote --scene all`

Expected: only scenes marked `approved` in `review-checklist.json` are copied into their `public/images/...` targets, and only those manifest statuses update to `published`.

- [ ] **Step 8: Close the first-batch completion gate**

Before declaring the first batch complete, verify every first-batch scene is in one of these states:

```txt
- approved and promoted
- explicitly deferred by updating the spec/plan and removing it from the active first-batch set
```

Expected: no scene remains in unresolved `needs-changes` state while the batch is considered complete.

---

### Task 8: Final Review and Docs Integration Check

**Files:**
- Modify: `D:\Workspace\docs-main\tools\screenshots\README.md`
- Modify: `D:\Workspace\docs-main\tools\screenshots\manifest.json`
- Modify only if needed: markdown files whose image references no longer match the chosen publish paths

- [ ] **Step 1: Audit the promoted image set against the docs references**

Run:

```bash
rg -n "(/images/|\.\./reference/images/)" guides reference zh index.md
```

Expected: all promoted first-batch target paths are valid, and no first-batch markdown page points at a missing image.

- [ ] **Step 1.5: Update the review checklist for the batch**

Update `D:\Workspace\docs-main\tools\screenshots\review-checklist.json` so each scene records:

```txt
- actual spec path
- actual raw output path
- actual final output path or null for raw-only scenes
- docs usage
- reviewStatus = approved | needs-changes
```

Expected: the review checklist reflects the final approval state used by `promote.ts` and can be handed to another contributor to verify the batch consistently.

- [ ] **Step 2: Update markdown when a replacement asset changes the source reference**

If any approved automated screenshot replaces a legacy `reference/images/...` asset or cannot reuse the expected `public/images/...` target, update the directly affected markdown files in the same change so docsUsage points at the approved published asset. Otherwise, do not churn unrelated docs content.

- [ ] **Step 3: Document the steady-state operator flow**

Extend `D:\Workspace\docs-main\tools\screenshots\README.md` with the final runbook:

```md
1. bun run screenshots:auth
2. bun run screenshots:capture --scene <id|all>
3. bun run screenshots:annotate --scene <id|all>
4. review outputs
5. bun run screenshots:promote --scene <id|all>
```

- [ ] **Step 4: Run the full verification pass**

Run:

```bash
bun run screenshots:typecheck
bun run screenshots:test
bun run docs:build
```

Expected:
- screenshot tooling typechecks cleanly
- all screenshot tests pass
- the VitePress docs build succeeds with the promoted images in place

- [ ] **Step 5: Verify the docs site uses the promoted screenshots**

Run: `bun run docs:dev`

Expected: the local docs site renders the updated images without broken links on the first-batch pages.

---

## Implementation Notes

- Use `@superpowers:test-driven-development` before implementing Tasks 2 through 5
- Use `@superpowers:systematic-debugging` if Playwright selectors, login state, or masks behave inconsistently
- Use `@superpowers:verification-before-completion` before claiming the pipeline works or the first batch is complete
- Do not commit auth state, raw outputs, or final generated review artifacts
- Do not capture from a day-to-day personal project; always use the dedicated sanitized docs workspace
