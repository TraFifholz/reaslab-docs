---
title: Lean 形式化智能体
---

# Lean 形式化智能体

Lean 相关模块通过提供可视化、智能双向反馈的定理系统，以及配套的形式化智能体支持，来将原本有着极高操作门槛的交互式定理推导流程简易化。

## 进入方式

Lean 无需独立的开关界面。要进入正式环境：
- 点击 **New Project** 并选择 **Theorem Proving** 作为工程类型，继而选择您需要的 Lean Editor 工具链版本。
![创建 Lean 项目](../../reference/images/lean_image2.png)
- 或在项目页直接选择 **Theorem Proving Templates** 后进入即可。
在该工作区内，右侧的对话框将默认由基础体系的 **Reaslingo (reaslab-agent)** 接管，随时待命。

## 基础功能

- **富文本代码编辑器与 Infoview**：完整的 Lean 4 生态支持。除了提供语法高亮以及悬停释义诊断等要素，当您将光标放在 `proof` 块内部时，专属的 **Infoview** （右侧栏）会实时反馈未结目标与前提假设（Goal / Hypotheses）。
- **复合检索引擎引擎**：带有 Project Search 以及深度语义检索 Semantic Search (支持Moogle等特性)，帮助随时调取缺失的环境引理。
- **跨模态内容识别**：您能直接让 AI 理解 Markdown 文本、包含伪代码的 LaTeX、甚至 PDF 数据中的定理证明逻辑，进而原生地转化为 Lean `theorem` 声明的形式化代码框架！

## 范例流程

1. 创建环境完毕，在资源库中准备好您的待证明命题，或者带有 `sorry` 未完成补全标记的 `.lean` 文件。
2. 结合 @ Add Context，或者右键想要证明的文件并选择 **Add File to Chat**。
![添加文件到对话](../../reference/images/lean_image6.png)
3. 按照如下方法输入您的自然科学转换与验证需求：
   > "我已经添加了一个 Markdown 文件上下文，请提炼其中的'定理2.1'并以此作为目标条件，在目前工程里帮我填补所有的 sorry 以通过验证流程。"
4. 在侧边栏 Infoview 的验证提示辅助下，确认并采用大模型产出的逻辑代码与引理分支。
![AI 辅助补全代码](../../reference/images/lean_image7.png)

## 示例项目
*(项目链接占位符)*

## 范例视频

**English Version**

<video controls width="100%">
  <source src="/vedio/lean-formalization-en.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>

**中文版**

<video controls width="100%">
  <source src="/vedio/lean-formalization-cn.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>
