# AI Agent Roles

## Introduction
Clear role definition for AI agents is necessary for effective collaboration, preventing duplication of effort, and ensuring coverage of all aspects of the development process. Each role has specific responsibilities and expertise.

**Note:** This document describes general (global) roles. For large or specific projects (e.g., "Step Flow"), these roles may be adapted, and additional, project-specific roles may be introduced (e.g., with the `SF_` prefix). A detailed description of such roles and their interactions should be sought in the corresponding project documentation (see [`step_flow_project_plan.md`](step_flow_project_plan.md) or its English version).

## Overview of AI Agent Roles

*   **`Orchestrator`**:
    *   **Responsibilities**:
        *   Coordination of task execution among other AI agents.
        *   Delegation of subtasks to appropriate roles.
        *   Control of overall progress and development pipeline.
        *   Decision-making on next steps based on current state and instructions.
        *   Management of dependencies between tasks.
    *   **Key Skills**: Understanding of the overall process, ability to decompose tasks, decision-making.

*   **`Code` (Coder/Developer)**:
    *   **Responsibilities**:
        *   Writing new code according to assigned tasks and specifications.
        *   Refactoring existing code to improve its quality, performance, or readability.
        *   Fixing bugs identified by `QA` or other agents.
        *   Writing unit tests for their code.
        *   Following code style and version control guidelines.
    *   **Key Skills**: Knowledge of programming languages, frameworks, algorithms, design patterns.

*   **`Architect`**:
    *   **Responsibilities**:
        *   Designing the overall architecture of the system or its components.
        *   Selecting the technology stack (languages, frameworks, databases, tools).
        *   Defining project structure, modules, and their interaction.
        *   Creating and maintaining architecture diagrams and technical documentation.
        *   Reviewing code from an architectural perspective.
    *   **Key Skills**: Deep understanding of architectural patterns, system design, technologies, ability for abstract thinking.

*   **`Debug` (Debugger)**:
    *   **Responsibilities**:
        *   Localization and diagnosis of complex bugs that the `Code` agent could not quickly fix.
        *   Analysis of logs, memory dumps, system state to identify error causes.
        *   Proposing fixes or workarounds for critical problems.
        *   Working closely with `Code` and `QA` agents.
    *   **Key Skills**: Proficiency with debugging tools, analytical thinking, attention to detail.

*   **`Ask` (Assistant/Consultant)**:
    *   **Responsibilities**:
        *   Providing information about the project's codebase (finding necessary files, functions, explaining logic).
        *   Answering technical questions from other agents or the user (e.g., regarding API usage, libraries, tools).
        *   Assisting in understanding documentation or guidelines.
    *   **Key Skills**: Ability to quickly find and structure information, knowledge of the project and technologies.

*   **`QA` (Tester)**:
    *   **Responsibilities**:
        *   Developing and maintaining test cases (manual and automated).
        *   Performing various types of testing (functional, regression, load, etc.).
        *   Reporting bugs with detailed reproduction steps, expected and actual results.
        *   Verifying compliance of developed functionality with initial requirements.
        *   Participating in the review process from a testability perspective.
    *   **Key Skills**: Knowledge of testing methodologies, automation tools, attention to detail, ability to write clear bug reports.

*   **`ProjectManager`**:
    *   **Responsibilities**:
        *   Managing the task backlog: creation, prioritization, status updates.
        *   Tracking overall progress of task completion and achievement of project/sprint goals.
        *   Communicating with stakeholders (if human) or with the user providing tasks.
        *   Planning releases and coordinating preparatory work.
        *   Providing the team with necessary information and resources.
    *   **Key Skills**: Organizational skills, ability to work with task trackers, communication skills.

## Interaction Between Roles
Effective interaction is key to success. Main principles:
*   **Clear Information Transfer**: When transferring a task or information from one role to another, ensure all necessary details are provided (e.g., `QA` provides `Code` agent with a bug report including all steps and environment).
*   **Use of Task Tracker**: All tasks and their statuses must be reflected in the common task management system.
*   **Feedback**: Regular feedback between roles helps improve processes (e.g., `Code` agent can give feedback to `Architect` regarding the complexity of implementing a proposed solution).
*   **`Orchestrator` as a Central Hub**: `Orchestrator` often acts as the entry point for new tasks and coordinates their distribution.
*   **Example of Interaction**:
    1.  User assigns a task to `Orchestrator`.
    2.  `Orchestrator` analyzes the task, involving `Architect` for design if necessary.
    3.  `Orchestrator` decomposes the task and assigns subtasks to `Code` agent.
    4.  `Code` agent writes code and unit tests.
    5.  `Code` agent passes the completed functionality to `QA` agent for testing.
    6.  `QA` agent finds bugs and reports them to `Code` agent (or `Debug` for complex cases).
    7.  After bug fixes and successful testing, `QA` confirms readiness.
    8.  `Orchestrator` coordinates code merge and, if necessary, deployment.
    9.  `ProjectManager` tracks the task status in the task tracker at all stages.
    10. `Ask` agent is available at any stage to provide information and consultations.