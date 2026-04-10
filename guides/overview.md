---
title: Overview
---

# Overview

ReasLab is a one-stop intelligent mathematical reasoning engine for education, research, and complex decision-making scenarios. It breaks through the traditional manual approach in mathematical and applied research by building infrastructure that moves from expert intuition-driven to computable, verifiable, and AI-augmented workflows. Addressing the long-standing fragmentation between mathematical modeling, algorithm design, and theorem proving — all heavily dependent on manual experience — ReasLab uses large language models as its foundation, employs a multi-agent architecture, and integrates mathematical model libraries, algorithm libraries, and theorem knowledge bases. It unifies model construction, algorithm design, computational solving, natural language and formal proof, and Markdown/LaTeX report generation into a single environment, enabling mathematical objects to flow seamlessly across different representational levels and task stages. Backed by cloud computing, ReasLab requires no local installation and is available online immediately. It has already served nearly a thousand users in formal verification, optimization modeling, mathematical contest preparation, and scientific writing. It provides formal teaching and research workspaces for dozens of universities including Peking University and the National University of Singapore, and is actively supporting real business needs from companies like GoerTech. Its M2F agent has formalized Terence Tao's Analysis II, Rockafellar's Convex Analysis, and other books, generating over 300,000 lines of Lean code — providing sustainable, evolving infrastructure for mathematical research and complex decision-making.

## Before you begin

- **Create an account**: Visit [reaslab.com](https://reaslab.com) to sign up or sign in to an existing account.
- **Create or import a project**: Start from scratch, import an existing repository from GitHub, or join a project via a share link.
- **Browser requirements**: For the best experience, use the latest version of Chrome, Edge, or Safari.

## Interface at a glance

![IDE Overview](/images/ide-illustration.png)

- **Top bar**: Contains the menu, open tabs (files), real-time collaborator count for the current file and the entire project, and access to the project history.
- **Left sidebar**: Switch between the directory tree, full-text search, and semantic search.
- **Editor center**: Write Lean code and Markdown documents with standard developer experience including undo/redo, in-file search, command palette, and symbol palette.
- **Right sidebar**: The **Infoview** for Lean code — showing live goals/hypotheses — or a real-time rendered preview for Markdown.

## Workspace layout

ReasLab centers Lean editing around several core panes that stay in sync as you type:

### Top bar and tabs

- **Project Menu**: Provides global operations such as project settings, member management, and export options.
- **Tabs**: Click a tab to switch files; drag to reorder.
- **Online Peers**: Shows the number of collaborators currently online for the current file and the entire project. Hover to see each collaborator's cursor position.
- **Project History**: Browse and restore historical snapshots of any file.

### Left sidebar

The left sidebar has three toggle icons at the top, each opening a different panel:

- **Files** — A hierarchical directory tree. Create, rename, delete files and folders; drag files from your desktop to upload directly.
- **Search** — Run full-text or regex search and replace across all open files.
- **Semantic** — AI-powered semantic search that understands mathematical meaning rather than matching keywords. See the [Lean guide](/guides/lean#semantic-search) for details.

### Editor center

- **Toolbar** above the editor provides undo/redo, comment toggling, in-file search, the **command palette**, and the **symbol palette**.
- **Command Palette**: Press `Cmd/Ctrl + K` to invoke it. Type to filter and quickly execute hundreds of actions.
- **Status bar** at the bottom shows the current mode (Lean or Markdown), connection status, cursor position, and the active Lean toolchain version.

### Right sidebar

- **Lean files** automatically open the **Infoview**, which shows proof goals (Goals), available assumptions (Hypotheses), and inline diagnostic information in real time.
- **Markdown files** display a **live preview** with synchronized scrolling — what you see in the editor is exactly what appears in the preview.

![Lean Infoview](/images/lean-infoview.png)

## Core use cases

- **Mathematical research**: Develop formally verified mathematics and publish machine-checkable proofs that are verifiable by anyone.
- **Education**: Teach theorem proving, type theory, and tactic-based reasoning in collaborative labs where instructors and students share a live workspace.
- **Verification**: Specify and verify algorithms or software components using formal methods, reducing bugs in safety-critical code.

## Feature quick reference

| Feature | Details |
|---------|---------|
| Lean 4 editing & Infoview | [Lean Tooling guide](/guides/lean) |
| File management & search | [File Explorer guide](/guides/file-explorer) |
| Real-time collaboration | [Collaboration guide](/guides/collaboration) |
| AI agent configuration | [Provider Config guide](/guides/provider-config) |
| LaTeX editing & PDF export | [LaTeX guide](/guides/latex) |
| Markdown with live preview | [Markdown guide](/guides/markdown) |
| Git version control | [Git Integration guide](/guides/git-integration) |
