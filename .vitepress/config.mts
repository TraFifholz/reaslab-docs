import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ReasLab Documentation",
  description:
    "Learn how to onboard, collaborate, and extend the ReasLab Lean IDE.",
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "Lean 4, theorem proving, interactive theorem prover, proof assistant, formal verification, formal methods, type theory, dependent types, tactics, goals, hypotheses, mathematical research, teaching mathematics, algorithm verification, software verification, collaboration",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content:
          "Professional Lean 4 theorem proving environment for formal mathematics, research, and software verification with real-time collaboration.",
      },
    ],
  ],
  themeConfig: {
    nav: [
      { text: "User Guide", link: "/guides/overview" },
      { text: "Reference", link: "/reference/shortcuts" },
      { text: "Demo", link: "/demo/reaslab-introduction" },
    ],
    sidebar: {
      "/": [
        {
          text: "Quick Start",
          items: [
            { text: "Overview", link: "/" },
            { text: "Projects & Imports", link: "/guides/projects" },
          ],
        },
        {
          text: "User Guide",
          items: [
            { text: "Lean Development", link: "/guides/lean-tooling" },
            { text: "Collaboration", link: "/guides/collaboration" },
            { text: "Files & History", link: "/guides/files-and-history" },
            { text: "Search Features", link: "/guides/search" },
            { text: "Markdown Preview", link: "/guides/markdown" },
            { text: "LaTeX Editor", link: "/guides/latex" },
            { text: "Git Integration", link: "/guides/git-integration" },
            { text: "AI Assistant", link: "/guides/ai" },
          ],
        },
      ],
      "/guides/": [
        {
          text: "Quick Start",
          items: [
            { text: "Overview", link: "/guides/overview" },
            { text: "Projects & Imports", link: "/guides/projects" },
          ],
        },
        {
          text: "User Guide",
          items: [
            { text: "Lean Development", link: "/guides/lean-tooling" },
            { text: "Collaboration", link: "/guides/collaboration" },
            { text: "Files & History", link: "/guides/files-and-history" },
            { text: "Search Features", link: "/guides/search" },
            { text: "Markdown Preview", link: "/guides/markdown" },
            { text: "LaTeX Editor", link: "/guides/latex" },
            { text: "Git Integration", link: "/guides/git-integration" },
            { text: "AI Assistant", link: "/guides/ai" },
          ],
        },
      ],
      "/reference/": [
        {
          text: "Reference",
          items: [
            { text: "Keyboard Shortcuts", link: "/reference/shortcuts" },
            { text: "Editor Settings", link: "/reference/settings" },
            { text: "Glossary", link: "/reference/glossary" },
            { text: "Troubleshooting", link: "/reference/troubleshooting" },
          ],
        },
      ],
      "/demo/": [
        {
          text: "Demo",
          items: [
            { text: "Reaslab Introduction", link: "/demo/reaslab-introduction" },
            { text: "Optimization Modeling and Solver Integration", link: "/demo/optimization-modeling" },
            { text: "Mathematical Theorem Exploration", link: "/demo/mathematical-theorem" },
            { text: "Lean Formalization and Machine-Checked Proofs", link: "/demo/lean-formalization" },
            { text: "Web-Based Lean IDE and Project Environment", link: "/demo/lean-ide" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/reaslab" }],
    footer: {
      // message: "Questions? Reach out to the ReasLab team.",
      // copyright: `Copyright © ${new Date().getFullYear()} ReasLab`,
    },
  },
});
