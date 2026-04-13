---
title: Paper Generation Agent
---

# Paper Generation Agent

The Paper Generation Agent (Paper Copilot) makes it extremely easy to orchestrate and execute a full scientific research and writing workflow in the ReasLab platform.

## Accessing the Agent
Open the chat panel (make sure you have configured your LLM Provider in Settings first), and select **Paper Copilot** from the dropdown to start your scientific writing journey.

## Basic Features

The Paper Copilot operates in a multi-agent orchestrated pattern. A **Main Agent** processes your requests and delegates tasks to six specialized sub-agents:
- **@survey** / **@survey-auto**: Conducts literature reviews and writes the "Related Work" sections.
- **@algorithm** / **@algorithm-auto**: Designs algorithms, provides pseudocode, and verifies the algorithm in Python.
- **@prover** / **@prover-auto**: Establishes theoretical properties, formalizes hypotheses, and conducts proofs.
- **@experiment** / **@experiment-auto**: Designs and executes experiments, then reviews the results.
- **@intro** / **@intro-auto**: Summarizes research progress and drafts the "Introduction" section.
- **@paper**: Aggregates all research contents and drafts the final paper.

Each sub-agent has specific capabilities: the survey agent conducts literature reviews and writes survey and related work chapters; the algorithm agent designs algorithms, provides pseudocode, and verifies algorithm feasibility using Python; the prover agent establishes theoretical properties, automatically provides hypotheses and conducts theorem proofs; the experiment agent designs and runs experiments, autonomously reviewing experimental results; the intro agent summarizes research progress and writes the paper's introduction; the paper agent synthesizes all research content and generates the final paper.

*(Note: Adding `-auto` suffix triggers the automatic mode for the agent without asking for interactive confirmations).*

## Example Workflow

The default highly recommended research process is as follows:
1. **Initial Prompt**: The user provides the initial prompt indicating what research paper is to be written.
2. **Planning**: The main Copilot generates a preliminary research plan.
3. **Review**: The user requests changes or inputs 'Continue' to approve the plan.
![Copilot Interaction Flow](../reference/images/paper_image6.png)
4. **Execution Cycle**: The Copilot executes research tasks phase by phase. It provides task summaries and a next-step plan at the end of each sprint.
5. **Modification**: If any specific chunk of output is out of expectations, you can explicitly mention specific sub-agents (e.g., `@experiment`) to perform deep-dive optimizations.
6. **Finalizing**: The Agent iteratively coordinates these steps until a final high-quality Paper PDF is generated.

## Sample Project
*(Project link placeholder)*

## Example Video

<video controls width="100%">
  <source src="/vedio/paper-generation-en.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>