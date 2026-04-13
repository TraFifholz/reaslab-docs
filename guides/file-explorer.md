---
title: File Explorer & Search
---

# File Explorer & Search

The File Explorer and Search functionalities provide a comprehensive interface for navigating and querying your ReasLab projects.

## File Explorer

The system provides a clear project tree layout on the left panel. From here you can:

- **Create Files/Directories**: Click on the plus icon on the header to create new files or folders at any level of the directory hierarchy.
- **Drag & Drop**: Rapidly move folders and files by dragging them inside your browser. You can also drag files from your desktop directly into the file tree to upload them.
- **Context Menu**: Right-click any file or folder to access rename, delete, duplicate, or move actions.
- **File Icons**: File types are automatically distinguished by distinctive icons — Lean files, Markdown, images, configuration files, and more at a glance.

![Upload Files](/images/upload-files.png)

### File History & Snapshots

![Project History](/images/project-history.png)

Every save is automatically tracked. You can:

- **Browse history**: Open the revisions history panel to see a timeline of changes to any file, complete with timestamps and author names.
- **Restore previous versions**: Click any historical snapshot to preview its contents, then restore with one click if needed.
- **Compare diffs**: View side-by-side differences between the current file and any historical version.

## Global Text Search

![Project Search](/images/search-project.png)

You can search through all active files via the **Search** toggle available in the sidebar:

- **Full-text search**: Enter any keyword or phrase to find all occurrences across your project.
- **Regex support**: Toggle regex mode to search with full regular-expression patterns.
- **Replace in context**: The search panel also supports search-and-replace across all matched files — preview changes before applying them in bulk.

### Search Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Shift + F` | Open global search |
| `Enter` | Find next match |
| `Shift + Enter` | Find previous match |
| `Cmd/Ctrl + Enter` | Replace current match |
| `Cmd/Ctrl + Shift + Enter` | Replace all matches |
