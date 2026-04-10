---
title: 优化建模智能体
---

# 优化建模智能体

优化建模智能体通过丰富的模板化配置、第三方求解器集成，帮助您顺畅地建立优化问题的数学模型并进行求解验证。

## 进入方式

您可以通过以下三种方式进入优化建模模板选择界面：
1. **通过 Dashboard**：进入主页后，点击右上角的 Dashboard，再在屏幕左侧选择 **Optimization Modeling**。
![基于 Dashboard 进入](../../reference/images/opt_image1.png)
2. **通过 Get Started**：点击首页的 Get Started 按钮，再在屏幕左侧选择 **Optimization Modeling**。
![基于 Get Started 进入](../../reference/images/opt_image2.png)
3. **通过 Templates**：在右上角的 Templates 下拉或区域处直接选择 **Optimization Modeling**。
![基于 Templates 进入](../../reference/images/opt_image3.png)

系统内内置了 9 大优化问题类别以及 173 种子类的优化问题模板。您可以使用树状视图快速定位，最后点击 **Use Template** 创建属于自己的项目。

## 基础功能
- **模板引擎**：一键生成包含问题描述、数学模型以及基础 Python 求解代码的代码库。
- **配置求解器执照**：支持一键绑定商业求解器。平台自带 OR-Tools、CPLEX 环境，如果您需要使用 Gurobi 或 COPT 等，则支持通过平台直连输入 License。
- **深度整合 AI**：通过 **Optimization Agent** 完成自然语言的直接代码开发与结果分析。

## 范例流程

1. 基于您想研究的优化背景，从系统库中选择适用的分类模板并创建工程。
![模板详情](../../reference/images/opt_image4.png)
2. 配置求解器许可：点击屏幕左侧栏的第三个图标进入许可配置界面。如果使用商用求解器，请上传您的许可证文件或输入 `LICENSEID`。设置完毕后，可以使用 `Test` 按钮检查连通性，最后点击 `Save` 进行保存。
![许可配置](../../reference/images/opt_image5.png)
3. 将实际的问题文档（如 `problem.docx`）或数据集拖入项目对应路径，或选中"Add File to Chat"。
4. 在对话界面的模型提供商后，选择 **Optimization Agent**。
5. 输入提示词进行对话：
   > "根据 problem.docx 里的问题描述，求解这个优化问题，并且生成具体的求解报告 PDF。"
![实际对话流程](../../reference/images/opt_image6.png)

## 示例项目
*(项目链接占位符)*

## 范例视频

**English Version**

<video controls width="100%">
  <source src="/vedio/optimization-en.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>

**中文版**

<video controls width="100%">
  <source src="/vedio/optimization-cn.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>
