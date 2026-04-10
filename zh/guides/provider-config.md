---
title: 提供商配置 (LLM 配置)
---

# 提供商配置 (LLM 配置)

在体验 ReasLab 的诸多增强型智能体特性之前，您必须配置大语言模型 (LLM) 的服务端凭证。

## 1. 进入设置界面

请点击页面右上角的 **齿轮（Settings）** 图标，并在随后弹出的窗口中定位至模型功能配置列表页。
![AI LLM Configuration](/images/ai-llm-configuration.png)

## 支持的服务提供商

ReasLab 支持多种大语言模型服务商，包括：

- **SiliconFlow** — 聚合多种模型的 API 网关
- **AiHubMix** — 面向开发者的混合 AI 服务平台
- **DeepSeek** — 高性价比国产大模型，支持 DeepSeek-V3 / DeepSeek-R1 系列
- **OpenRouter** — 统一的模型路由服务
- **DashScope** — 阿里云通义千问系列

以下是中国大陆常用配置示例：

| 提供商 | Base URL | 典型模型 |
|--------|----------|----------|
| DeepSeek | `https://api.deepseek.com` | `deepseek-chat`, `deepseek-coder` |
| 硅基流动 (SiliconFlow) | `https://api.siliconflow.cn` | `deepseek-ai/DeepSeek-V3`, `Pro/deepseek-ai/DeepSeek-R1` |
| AiHubMix | `https://aihubmix.com/v1` | `deepseek-v3` |

## 添加新服务商

- 在列表底部点击 **+ Add Provider**。
- 填写服务商的**显示名称**（例如 `DeepSeek`、`硅基流动`）。
- 根据服务商提供的 API 文档，填入代理接口的 **Base URL**（API Base Address）。
- 安全地粘贴您的私钥 **API Key**，ReasLab 会加密存储，不会在前端日志中暴露。
- 点击 **Save（保存）** 确认。

## 添加具体模型

配置好上游服务商后，还需要注册具体可调度的模型实例：

- 找到 **+ Add Model** 按钮并点击进入。
- 设置一个仅供您在界面中辨识的**标签（Label）**（例如 `deepseek-v3-我家`）。
- 准确填写上游真实存在的 **Model ID**（例如 `deepseek-chat`）。
- 点击 **Save（保存）**。

配置完成后，您的自定义模型将出现在界面右下角 LLM 下拉菜单中，可随时切换使用。
