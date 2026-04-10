---
title: Git Integration
---

# Git integration

Keep your ReasLab projects synchronized with Git repositories using built-in push and pull operations. This guide covers the available Git functionality and how to configure remote repositories.

## Git synchronization

After importing a Git repository or setting up a remote URL, you can synchronize your ReasLab project with the remote repository using basic operations.

Note: If you're signed in with GitHub and imported your own repository, push and pull work without additional configuration.

### Access sync operations

Git sync operations are available from the editor menu:

1. Click the **Menu** button in the top toolbar
2. Find the "Actions" section
3. Use **Sync Push To Remote** or **Sync Pull From Remote**

#### Sync Push To Remote
- Pushes your current project changes to the configured Git remote repository
- Shows a loading notification while pushing
- Displays success confirmation when complete
- Requires proper Git credentials and remote URL configuration

#### Sync Pull From Remote
- Pulls the latest changes from the configured Git remote repository
- Shows a loading notification while pulling
- Displays success confirmation when complete
- Merges remote changes with your current project state

## Project settings

Configure your Git integration through Project Settings:

### Git remote URL
Set or update the remote repository URL for push and pull operations.

### Git credentials
Configure authentication for accessing private repositories:
- Supports GitHub Personal Access Tokens
- Required for private repository access
- Stored securely for repeated operations

## Import from Git repositories

Create new ReasLab projects from existing Git repositories:

1. **GitHub integration**: Link your GitHub account to automatically list your Lean repositories
2. **Manual import**: Paste any Git URL to import from other platforms
3. Imports the repository's default branch.

## Current limitations

The Git integration provides essential synchronization functionality with some limitations:

### Available features
- ✅ Push changes to remote repository
- ✅ Pull changes from remote repository
- ✅ Configure remote URL and credentials
- ✅ Import projects from Git repositories
- ✅ GitHub account integration

### Not currently supported
- ❌ Branch management (switching, creating, merging)
- ❌ Commit history viewing within ReasLab
- ❌ Visual conflict resolution interface
- ❌ Advanced Git operations (rebase, stash, cherry-pick)
- ❌ Git diff visualization
- ❌ Commit message customization



For advanced Git operations beyond basic sync, use external Git tools alongside ReasLab's collaborative editing environment.
