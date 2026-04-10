---
title: Overview
---

# Overview

ReasLab is a browser‑based interactive theorem proving platform built on Lean 4. It supports formal verification and formal methods for mathematical research and software/algorithm verification, with a proof assistant workflow grounded in dependent type theory. This overview introduces the core areas of the interface and points you toward the guides that dive deeper into each feature set.

## What is theorem proving?

In an interactive theorem prover, you construct proofs step‑by‑step using tactics while monitoring goals and hypotheses in real time. Lean's type theory and dependent types let you encode precise specifications and develop formal mathematics and verified programs.

## Before you begin

- Create or sign in to your ReasLab account.
- Decide whether you are creating a new project, importing from Git, or joining via a share link.
- Confirm browser support: the latest Chrome, Edge, or Safari versions provide the best experience.

## Interface at a glance

![IDE Overview](/images/ide-illustration.png)

- **Top bar**: Menu button, open tabs, online peers for the current file and across the project, and access to project History.
- **Left sidebar**: toggle between the file tree, project-wide search, and semantic search views.
- **Editor**: Edit Lean and Markdown files with undo/redo, inline find, command palette, and symbol palette.
- **Right sidebar**: Infoview for Lean files and a live preview for Markdown content.

## Workspace layout

ReasLab centers Lean editing around a few core panes that stay in sync while you type:

### Top bar and tabs

- Use the **Project Menu** for global actions such as project settings, member management, and export options.
- Track open editor tabs from the top bar — click any tab to switch files, drag to reorder.
- See **online peers** for the current file and for the overall project beside the tab strip — hover to see each peer's cursor position.
- Access **project history** to browse and restore previous snapshots of any file.

### Left sidebar

The left sidebar hosts three primary panels, toggleable via icons at the top:

- **Files** — A hierarchical directory tree. Create, rename, delete files and folders; drag files from your desktop to upload directly.
- **Search** — Run project-wide plain-text or regex search and replace across all open files.
- **Semantic** — AI-powered search that understands mathematical meaning. More details are covered in the [Lean guide](/guides/lean#semantic-search).

### Editor center

- The **toolbar** above the editor provides undo/redo, comment toggling, in-file search, the **command palette**, and the **symbol palette**.
- The **command palette** (`Cmd/Ctrl + K`) gives quick access to hundreds of actions — open it and type to filter.
- The **status line** at the bottom shows the active mode (Lean or Markdown), connection status, cursor position, and the active Lean toolchain version.

### Right sidebar

- **Lean files** open the **Infoview** automatically, showing goals, hypotheses, and live diagnostics as you write tactics.
- **Markdown files** render a **live preview** with synchronized scrolling — what you see in the editor is exactly what appears in the preview.

![Lean Infoview](/images/lean-infoview.png)

Press `Cmd/Ctrl + K` to open the command palette for quick actions.

## Use cases

- **Mathematical research**: develop formal mathematics and publish machine‑checked proofs that are verifiable by anyone.
- **Education**: teach theorem proving, type theory, and tactics with collaborative labs where instructors and students share a live workspace.
- **Verification**: specify and verify algorithms or software components using formal methods, reducing bugs in safety‑critical code.

## Key features at a glance

| Feature | Where to learn more |
|---------|---------------------|
| Lean 4 editing & Infoview | [Lean Tooling guide](/guides/lean) |
| File management & search | [File Explorer guide](/guides/file-explorer) |
| Real‑time collaboration | [Collaboration guide](/guides/collaboration) |
| AI agent assistance | [Provider Config](/guides/provider-config) |
| LaTeX editing & PDF export | [LaTeX guide](/guides/latex) |
| Markdown with live preview | [Markdown guide](/guides/markdown) |
| Git version control | [Git Integration guide](/guides/git-integration) |
