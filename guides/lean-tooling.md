---
title: Lean Tooling
---

# Lean Tooling

ReasLab bundles the Lean language server so you get instant feedback as you edit. This guide covers interactive theorem proving workflows in Lean 4—tactics, goals, hypotheses, and the Infoview—along with language-aware editor features.

## Syntax highlighting and editor preferences

- Lean files render with grammar-aware highlighting.
- Adjust theme, font size, line numbers, and word wrap from the editor settings drawer.

## Hover and definitions

![Hover Tooltip](/images/hover-tooltip.png)

- Hover anywhere in a Lean file to reveal statements, types, and docstrings.
- Use **Go to Definition** or **Go to Type Definition** from the context menu to explore references. Definitions from dependencies open in a read-only viewer.

## Diagnostics and messages

![Inline Diagnostics](/images/inline-diagnostics.png)

- Inline diagnostics decorate the editor and appear in the gutter.
- The Infoview mirrors Lean diagnostics and keeps them in sync as you continue editing.

## Infoview workflow

![Lean Infoview](/images/lean-infoview.png)

- The Lean Infoview opens automatically for `.lean` files in the right sidebar.
- Use the Infoview refresh control to restart analysis if goals look stale or you reconnect after a network hiccup.

## Tactics and goals

- Write proofs using tactics that transform the current goals step by step.
- Track goals and hypotheses in the Infoview to understand the proof state and available assumptions.

## Unicode symbols and palette

![Symbol palette](/images/symbol-palette.png)

- Type backslash abbreviations (for example, `\to`) to insert common Unicode symbols.
- Launch the symbol palette from the editor toolbar or via `Cmd/Ctrl + Shift + Space` to search for math symbols with helpful previews.

## Lean toolchain management

Choose the Lean version that matches your project before you start editing. ReasLab keeps the active toolchain visible so you always know which compiler features are available.

### Pick a version when creating projects

![New Project — Toolchain](/images/new-project-toolchain.png)

- In the **New Project** flow, select the Lean toolchain version from the dropdown.
- The IDE provisions the correct toolchain and associated libraries automatically.
- You can import repositories that already include a Lean toolchain file; ReasLab respects that configuration.

### Confirm the active toolchain

- Check the status line at the bottom of the editor for the current mode and Lean version.
- If the Infoview feels out of date, use the refresh button to restart analysis with the active toolchain.

<span style="color: red; font-weight: 600;">In‑project toolchain switching is under development.</span>
