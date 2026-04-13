import { defineConfig } from "vitepress";

function getSidebarEn() {
  return [
    {
      text: "Quick Start",
      items: [
        { text: "Overview", link: "/guides/overview" },
        { text: "Projects & Imports", link: "/guides/projects" },
      ],
    },
    {
      text: "Basic",
      items: [
        { text: "File Explorer & Search", link: "/guides/file-explorer" },
        { text: "Collaboration", link: "/guides/collaboration" },
        { text: "Markdown", link: "/guides/markdown" },
        { text: "LaTeX", link: "/guides/latex" },
        { text: "Lean", link: "/guides/lean" },
        { text: "Git Integration", link: "/guides/git-integration" },
      ],
    },
    {
      text: "Agent",
      items: [
        { text: "Provider Configuration", link: "/guides/provider-config" },
        { text: "ReasLingo", link: "/guides/reaslingo" },
        { text: "Math Modeling", link: "/guides/math-modeling" },
        { text: "Paper Generation", link: "/guides/paper-generation" },
        { text: "Optimization", link: "/guides/optimization" },
        { text: "Lean Formalization", link: "/guides/lean-formalization" }
      ],
    },
    {
      text: "Reference",
      items: [
        { text: "Keyboard Shortcuts", link: "/reference/shortcuts" },
        { text: "Editor Settings", link: "/reference/settings" },
        { text: "Glossary", link: "/reference/glossary" },
        { text: "Troubleshooting", link: "/reference/troubleshooting" },
      ],
    }
  ];
}

function getSidebarZh() {
  return [
    {
      text: "快速开始",
      items: [
        { text: "概览", link: "/zh/guides/overview" },
        { text: "项目与导入", link: "/zh/guides/projects" },
      ],
    },
    {
      text: "基础功能",
      items: [
        { text: "文件资源管理器与搜索", link: "/zh/guides/file-explorer" },
        { text: "协作", link: "/zh/guides/collaboration" },
        { text: "Markdown", link: "/zh/guides/markdown" },
        { text: "LaTeX", link: "/zh/guides/latex" },
        { text: "Lean", link: "/zh/guides/lean" },
        { text: "Git 集成", link: "/zh/guides/git-integration" },
      ],
    },
    {
      text: "智能体 (Agent)",
      items: [
        { text: "提供商配置 (LLM)", link: "/zh/guides/provider-config" },
        { text: "ReasLingo", link: "/zh/guides/reaslingo" },
        { text: "数学建模", link: "/zh/guides/math-modeling" },
        { text: "论文生成", link: "/zh/guides/paper-generation" },
        { text: "优化建模", link: "/zh/guides/optimization" },
        { text: "Lean 形式化", link: "/zh/guides/lean-formalization" }
      ],
    },
    {
      text: "参考指南",
      items: [
        { text: "快捷键", link: "/zh/reference/shortcuts" },
        { text: "编辑器设置", link: "/zh/reference/settings" },
        { text: "术语表", link: "/zh/reference/glossary" },
        { text: "常见问题", link: "/zh/reference/troubleshooting" },
      ],
    }
  ];
}

export default defineConfig({
  base: '/reaslab-docs/',
  title: "ReasLab Documentation",
  description: "Learn how to onboard, collaborate, and extend the ReasLab AI IDE.",
  head: [
    [
      "meta",
      {
        name: "description",
        content:
          "Professional AI-agent environment for formal mathematics, research, and software verification with real-time collaboration.",
      },
    ],
  ],
  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: [
          { text: "User Guide", link: "/guides/overview" },
          { text: "Reference", link: "/reference/shortcuts" },
        ],
        sidebar: {
          "/": getSidebarEn(),
        },
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      title: "ReasLab 文档",
      description: "了解如何入门、协作和扩展 ReasLab AI IDE。",
      themeConfig: {
        nav: [
          { text: "用户指南", link: "/zh/guides/overview" },
          { text: "参考指南", link: "/zh/reference/shortcuts" },
        ],
        sidebar: {
          "/zh/": getSidebarZh(),
        },
      },
    },
  },
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/reaslab" }],
  },
  vite: {
    server: {
      allowedHosts: true
    }
  }
});
