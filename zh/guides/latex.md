---
title: LaTeX 编辑器
---

# LaTeX 编辑器

ReasLab 提供了极其出色的云端 LaTeX 编辑工作流：不仅集成了实时异常诊断，还包含内建的同步 PDF 预览挂件。

## 概览

![LaTeX Editor Overview](/images/latex-overview.png)

- 伴随着完整的代码联想与代码高亮进行 LaTeX 纯文本构筑。
- 在右半屏随时以 PDF 结构审视排版情况。

## 文档大纲导航

![Document Outline](/images/tex-outline.png)

- 大纲视图使我们在超大型文献项目下快速切换变得极其丝滑。
- 单击即达对应的 sections (章节)、subsections 以及各类 anchors (标签)。

## 实时错误预警

![Inline Diagnostics](/images/tex-inline-diagnostics.png)

- 输入代码遇到句法破损，IDE 将立刻用醒目标注反馈内联语法诊断错误。
- 无须进行完整的漫长编译就能抓捕宏包缺失等常规失误。

## 实时编译反馈

![Compilation Output](/images/tex-compilation-live-output.png)

- 编辑器会在您无感知的情况下在后台执行源文档静默自动编译。
- 可开启监控实时的 Compilation logs （编译终端）捕获内部系统栈细节反馈。

## Diagnostics 专门面板

![Diagnostics Panel](/images/tex-compilation-output-diagnostics.png)

- 排版构建周期结束后，所有归档过的警告 (Warnings) 和致命错误 (Errors) 都陈列于 Diagnostics 侧边板。
- 单击某行错误将立即把准星定位到出问题的 `.tex` 代码行中。

## 引擎设置区

![TeX Settings](/images/tex-settings.png)

- 可以为您独有项目专门设定 TeX 后台执行引擎，比如切换至 `pdflatex` 或者针对中文字体更友好的 `xelatex`。
- 配置锁定主排版主入口文档，如此一来即使在编辑被调用的其它非主体文件（included files），依然保证整体编译方向正确。
