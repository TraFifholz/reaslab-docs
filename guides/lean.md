---
title: Lean Tooling
---

# Lean Tooling

ReasLab bundles the Lean language server so you get instant feedback as you edit. This guide covers interactive theorem proving workflows in Lean 4 — tactics, goals, hypotheses, and the Infoview — along with language-aware editor features.

## Syntax highlighting and editor preferences

- Lean files render with grammar-aware highlighting, distinguishing tactics, terms, types, and imports at a glance.
- Adjust theme, font size, line numbers, word wrap, and cursor style from the editor settings drawer.
- **Bracket matching** and **auto-close** pairs (`()`, `{}`, `[]`, `«»`) make it easy to navigate deeply nested proof terms.

## Hover and definitions

![Hover Tooltip](/images/hover-tooltip.png)

- Hover anywhere in a Lean file to reveal statements, types, and docstrings inline.
- Use **Go to Definition** (`F12` or context menu) or **Go to Type Definition** to jump to a symbol's declaration.
- Definitions from imported dependencies (the standard library, MathLib, or any project dependency) open in a read-only viewer so your main file stays untouched.
- **Peek definition** (`Alt + F12`) shows an inline popup without leaving your current position.

## Diagnostics and messages

![Inline Diagnostics](/images/inline-diagnostics.png)

- Inline diagnostics decorate the editor — red squiggles for errors, yellow for warnings, blue for info — and appear in the gutter.
- The **Infoview** mirrors all Lean diagnostics and keeps them in sync as you continue editing, so you never have to guess whether the goal panel is stale.
- Diagnostics are streamed in real time; there is no "build" step to wait for.

## Infoview workflow

![Lean Infoview](/images/lean-infoview.png)

- The Lean **Infoview** opens automatically for `.lean` files in the right sidebar, showing the current proof state at a glance.
- **Goals panel**: Displays the active proof goals and subgoals. Each goal is numbered and shows its type and expected conclusion.
- **Hypotheses panel**: Lists all currently available assumptions (variables, parameters, and previously proven lemmas) with their types.
- Use the Infoview **refresh** button (or `Cmd/Ctrl + R`) to restart analysis — useful after a network hiccup or when the toolchain state seems stale.
- **Tactic state diff**: After each edit, the Infoview can highlight what changed in the proof state, helping you understand why a tactic succeeded or failed.

## Tactics and goals

- Write proofs by applying **tactics** that transform the current goal step by step until no goals remain.
- Common tactic patterns:
  - `rfl` — proves goals of the form `x = x`
  - `simp [*]` — simplifies using lemmas and hypotheses
  - `exact term` — provides a concrete term as the proof
  - `have h : T := proof` — introduces an intermediate lemma
  - `calc` — chains equalities or inequalities in a structured proof block
- Track **goals** and **hypotheses** in the Infoview to understand the proof state before each tactic application.

## Unicode symbols and palette

![Symbol palette](/images/symbol-palette.png)

- Type backslash abbreviations to insert Unicode symbols: `\to` → `→`, `\forall` → `∀`, `\exists` → `∃`, `\lam` → `λ`, `\le` → `≤`, and many more.
- Launch the **symbol palette** from the editor toolbar or via `Cmd/Ctrl + Shift + Space` to browse and search all available math symbols with character previews.
- Symbols are contextually filtered — in a Lean file, the palette prioritizes mathematical and logical Unicode symbols.

## Semantic Search

![Semantic Search](/images/search-semantic.png)

Beyond plain-text search, ReasLab offers **AI-powered Semantic Search** that understands mathematical concepts, not just keywords:

- Switch to the **Semantic** tab in the left sidebar.
- Describe what you are looking for in natural language — for example, "matrix decomposition methods" or "convex optimization duality".
- The engine searches across code structure and mathematical meaning, finding relevant Lean definitions and lemmas even when the exact keywords do not appear in the code.
- Results are ranked by semantic relevance and displayed with the matching code snippet highlighted.

## Lean toolchain management

![New Project — Toolchain](/images/new-project-toolchain.png)

Choose the Lean version that matches your project before you start editing. ReasLab keeps the active toolchain visible so you always know which compiler features are available.

### Pick a version when creating projects

- In the **New Project** flow, select the Lean toolchain version from the dropdown (e.g., Lean 4 stable, nightly, or a specific versioned release).
- The IDE provisions the correct toolchain and associated libraries automatically.
- You can import Git repositories that already include a `lean-toolchain` file; ReasLab respects that configuration and does not override it.

### Confirm the active toolchain

- Check the **status line** at the bottom of the editor for the current mode and Lean version.
- If the Infoview seems out of date, use the **refresh button** to restart analysis with the active toolchain.

<span style="color: red; font-weight: 600;">In‑project toolchain switching is under active development.</span>
