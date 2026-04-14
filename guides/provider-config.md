---
title: Provider Configuration
---

# Provider Configuration

Before leveraging the AI features of ReasLab, you will need to properly set up your Large Language Model (LLM) credentials to grant the system access to compute engines.

## 1. Access Settings

Click on the gear icon (Settings) located at the top-right corner of the interface to open the Model Configuration panel.
![AI LLM Configuration](/images/ai-llm-configuration.png)

## Supported Providers

ReasLab integrates with multiple LLM services:

- **SiliconFlow** — Multi-model API gateway
- **AiHubMix** — Developer-oriented hybrid AI platform
- **DeepSeek** — Cost-effective Chinese LLM, supporting DeepSeek-V3 / DeepSeek-R1 series
- **OpenRouter** — Unified model routing service
- **DashScope** — Alibaba Cloud Qwen series

Common configurations for Chinese developers:

| Provider | Base URL | Typical Models |
|----------|----------|----------------|
| DeepSeek | `https://api.deepseek.com` | `deepseek-chat`, `deepseek-coder` |
| SiliconFlow | `https://api.siliconflow.cn` | `deepseek-ai/DeepSeek-V3`, `Pro/deepseek-ai/DeepSeek-R1` |
| AiHubMix | `https://aihubmix.com/v1` | `deepseek-v3` |

## Add a New Provider

- Scroll to the bottom of the provider list and click **+ Add Provider**.
- Enter a **Display Name** for the provider (e.g., `DeepSeek`, `SiliconFlow`).
- Fill in the **Base URL** (API endpoint) as documented by the provider.
- Securely paste your **API Key** — ReasLab encrypts stored credentials and never exposes them in frontend logs.
- Click **Save** to confirm.

## Add a Specific Model

After a provider is configured, register the concrete model instances you want to invoke:

- Click **+ Add Model** in the same panel.
- Set a **Label** — a friendly name visible only in your workspace UI (e.g., `deepseek-v3-work`).
- Enter the exact **Model ID** recognized by the upstream API (e.g., `deepseek-chat`).
- Click **Save**.

Your custom models will now appear in the LLM dropdown at the bottom of the chat interface, ready for queries and automated agent tasks.
