---
title: Overview
---

# Overview

Reaslab is a browser‑based interactive theorem proving platform built on Lean 4. It supports formal verification and formal methods for mathematical research and software/algorithm verification, with a proof assistant workflow grounded in dependent type theory. This overview introduces the core areas of the interface and points you toward the guides that dive deeper into each feature set.

## What is theorem proving?

In an interactive theorem prover, you construct proofs step‑by‑step using tactics while monitoring goals and hypotheses in real time. Lean’s type theory and dependent types let you encode precise specifications and develop formal mathematics and verified programs.

## Before you begin

- Create or sign in to your Reaslab account.
- Decide whether you are creating a new project, importing from Git, or joining via a share link.
- Confirm browser support: the latest Chrome, Edge, or Safari versions provide the best experience.

## Interface at a glance

![IDE Overview](/images/ide-illustration.png)

- **Top bar**: Menu button, open tabs, online peers for the current file and across the project, and access to project History.
- **Left sidebar**: toggle between the file tree, project-wide search, and semantic search views.
- **Editor**: Edit Lean and Markdown files with undo/redo, inline find, command palette, and symbol palette.
- **Right sidebar**: Infoview for Lean files and a live preview for Markdown content.

## Workspace layout

Reaslab centers Lean editing around a few core panes that stay in sync while you type:

### Top bar and tabs
- Use the Project Menu for global actions.
- Track open editor tabs from the top bar.
- See online peers for the current file and for the overall project beside the tab strip, and access project history.

### Left sidebar
- **Files**: manage directories, create or rename files, and upload resources by dragging them in.
- **Search**: run project-wide search and replace.
- **Semantic**: explore semantic search results based on code meaning.

### Editor center
- Use the toolbar for undo/redo, comment toggling, in-file search, command palette, and symbol palette.
- Watch the status line for the active mode (Lean or Markdown), connection status, and cursor position.

### Right sidebar
- Lean files display the Infoview with goals, hypotheses, and diagnostics.
- Markdown files render a live preview with synced scrolling.

Press `Cmd/Ctrl + K` to open the command palette for quick actions. Continue to [Projects & Imports](/getting-started/projects) to create or bring in your own repositories.

## Use cases

- Mathematical research: develop formal mathematics and publish machine‑checked proofs.
- Education: teach theorem proving, type theory, and tactics with collaborative labs.
- Verification: specify and verify algorithms or software components using formal methods.
