---
title: Projects & Imports
---

# Projects & Imports

This guide covers creating a fresh workspace, importing existing repositories, and joining shared projects via links. ReasLab supports various specialized project templates tailored to different use cases.

After logging in, you land on the Projects page where you can view and manage all your projects.

![Projects Page](/images/project_page.png)

- **① Project Management tab**: Manage all your projects — filter, archive, or leave shared projects.
- **② Create Project tab**: Start a new project from scratch or from a template.
- **③ Filter**: In the Project Management tab, you can switch between **All Projects**, **Owned by You**, **Shared with You**, and **Archived**. Projects you own can be archived, and projects shared with you can be left.
- **④ Send Feedback**: Encounter any issues? Click this button to submit feedback — it will be filed as a GitHub issue automatically.

## Create a new project

There are multiple ways to start your journey in ReasLab, depending on whether you want a clean slate or a pre-configured environment.

### 1. Creating a Blank Project (New Project)
Suitable for general scientific writing or custom project structures. Usually, you start by clicking **New Project** in the Dashboard sidebar.
![Creating a Blank Project](/images/new_project.png)
- **①** Click this to switch to the **New Project** tab.
- **②** Enter your **Project Name** here.
- **③** Configure your new project in this area — select the Lean toolchain version, template type, and other settings.
- **④** When everything is ready, click this button to create the project.

### 2. Creating from a Math Modeling Template
Designed for competition participants. These templates come with the problem background and report structure.
![Math Modeling Templates](/images/model-template.png)
- **①** Buttons to navigate to the **Math Modeling** template area — includes top and left navigation buttons.
- **②** Filter suitable templates by **categories**.
- **③** The available templates appear here. Open one to preview its content, then click **Use Template** to create the corresponding project.

### 3. Creating from an Optimization Modeling Template
Quickly start optimization problems with mathematical models and solver configuration included. The system provides 9 major categories and 173 subcategories of optimization templates. You can use the tree view to locate a suitable template, then click **Use Template** to create your own project.
![Optimization Modeling Templates](/images/optimization-templeate.png)
- **①** Buttons to navigate to the **Optimization Modeling** template area — includes top and left navigation buttons.
- **②** Filter suitable templates by **categories**.
- **③** The available templates appear here. Open one to preview its content, then click **Use Template** to create the corresponding project.

### 4. Creating from a Lean (Theorem Proving) Template
Start a formal verification project with a preconfigured Lean 4 environment.
![Lean Templates](/images/lean_templates.png)
- **①** Navigate to the Lean template library — one button on the left and one at the top.
- **②** Select a template and click **Use Template** to create a project.

## Import from Git

![Import Git](/images/import_from_git.png)

There are several ways to bring an existing repository into the formal workflow:

- **①** Click the **Git** tab to switch to the Git import interface.
- **②** Enter the repository information by pasting a Git URL and configuring the project to import it.
- **③** Link your **GitHub account** to browse projects directly from your account without manually pasting the URL. The system imports the repository based on its default branch.

For more advanced Git operations (branch management, commit history, conflict resolution), see the [Git Integration guide](/guides/git-integration).

## Join via Share Link

- If you receive a high-permission share link from another member, open it in the browser after signing in. You can then join the project with the granted permissions, such as view, edit, or manage, and collaborate with others in the same workspace.

For details, see the [Collaboration guide](/guides/collaboration.md).
