---
title: Paper Generation Agent
---

# Paper Generation Agent

The Paper Generation Agent (Paper Copilot) makes it extremely easy to orchestrate and execute a full scientific research and writing workflow in the ReasLab platform.

## Accessing the Agent
Open the chat panel (make sure you have configured your LLM Provider in Settings first), and select **Paper Copilot** from the dropdown to start your scientific writing journey.

## Basic Features

The scientific writing assistant adopts a primary-plus-specialized multi-agent architecture. The main agent interprets your intent, plans the research tasks, and coordinates the following six dedicated sub-agents:
- **@survey** / **@survey-auto**: Conducts literature reviews and writes the "Related Work" sections.
- **@algorithm** / **@algorithm-auto**: Designs algorithms, provides pseudocode, and verifies the algorithm in Python.
- **@prover** / **@prover-auto**: Establishes theoretical properties, formalizes hypotheses, and conducts proofs.
- **@experiment** / **@experiment-auto**: Designs and executes experiments, then reviews the results.
- **@intro** / **@intro-auto**: Summarizes research progress and drafts the "Introduction" section.
- **@paper**: Aggregates all research contents and drafts the final paper.

The survey agent handles literature research and drafts the survey or related work sections. The algorithm agent designs algorithms, produces pseudocode, and validates feasibility in Python. The prover agent builds theoretical properties, proposes assumptions, and derives proofs. The experiment agent designs and runs experiments, then reviews the resulting outputs. The intro agent summarizes research progress and writes the introduction. The paper agent combines all of this work into the final paper.

*(Note: the `-auto` suffix enables fully automatic execution. Without it, the workflow stays in the interactive confirmation mode by default.)*

## Example Workflow

To get the best results from the agent, the recommended workflow is:
1. **Prompt Input**: Provide an initial natural-language prompt describing the research or paper-writing task.
2. **Plan Generation**: The Copilot first returns a preliminary research plan.
3. **User Feedback**: You can request detailed adjustments, or type `Continue` to let the agent proceed.
4. **Iterative Execution**: The Copilot carries out the subtasks according to the plan, and after each stage it provides the generated content together with a summary of the next step.
5. **Manual Correction**: If part of the generated pipeline or subsystem is not meeting expectations, you can explicitly invoke a specific `@` command such as `@experiment` to focus on and improve that area.
6. **Final Output**: The Copilot gathers all content and generates the final PDF version of the paper.

## Sample Project
You can refer to the following example project to see the expected deliverable:
[Scientific Paper Writing](https://model.reaslab.io/share/3k0kYCxwSH2RQIQ4blUmZgR580db8.MzY.YTQzZTdhZTAtM2E4YS00NDQyLWFiNjctNGZkMjQ4NGNmZjNi)

## Example Video

<video controls width="100%">
  <source src="/vedio/paper-generation-en.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
