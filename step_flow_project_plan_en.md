# "Step Flow" Project Development Plan

## 1. Overall Vision and Project Goals

### 1.1. Vision
Create an innovative multi-agent system "Step Flow" with intuitive voice control and a powerful workflow builder. The system should allow users to easily automate complex processes, create and configure AI agents, and manage them through a web interface and PWA application. "Step Flow" aims to become a leader in personalized AI solutions for automation.

### 1.2. Key Goals
*   Develop a multifunctional platform with voice control (Speech-to-Speech).
*   Implement a workflow builder based on `react-flow` for creating and managing multi-agent systems.
*   Provide the ability to generate custom agents, rules, and instructions.
*   Create a neomorphic black-and-white UI/UX with micro-animations and a unique animated preloader.
*   Ensure high performance, scalability, and reliability of the system.
*   Release the product to production with a team of specialized AI agents.
*   Provide users with the ability to create and manage their personal workflow instances in a cloud infrastructure.

## 2. Detailed Technology Stack

### 2.1. Frontend
*   **Web Application**: React, TypeScript.
*   **PWA/Mobile Application**: React Native, TypeScript.
*   **Styling and UI**: Neomorphic design (black and white color scheme), CSS-in-JS (e.g., Styled Components) or Tailwind CSS (adapted for AI aesthetic).
*   **Animations**: Micro-animations (Framer Motion or React Spring), ASAP SVG for preloader.
*   **State Management**: Redux Toolkit, Zustand, or Recoil.
*   **Workflow Builder**: `react-flow`.
*   **Build Tools**: Webpack/Vite for React, Metro for React Native.

### 2.2. Backend
*   **Language/Framework**: Python / FastAPI (for high performance and asynchronous operations).
*   **Database (Primary)**: PostgreSQL (for relational data, agent configurations, workflows).
*   **Database (Cache/Messaging)**: Redis (for caching, session management, possibly as a message broker for agents).
*   **Authentication/Authorization**: OAuth 2.0 / JWT.
*   **API**: RESTful API and/or GraphQL.

### 2.3. Voice Technologies
*   **Speech-to-Text (STT)**: OpenAI Whisper.
*   **Text-to-Speech (TTS)**: ElevenLabs.

### 2.4. Multi-Agent System
*   **Core/Framework**:
    *   **Option 1 (Recommended for starting)**: Langchain or Microsoft Autogen for rapid prototyping and use of ready-made components.
    *   **Option 2 (Long-term/Custom)**: Development of a proprietary lightweight core in Python for full control and optimization for project needs, if ready-made solutions prove insufficiently flexible.
*   **Inter-Agent Communication**: Redis Pub/Sub or RabbitMQ/Kafka (if more complex routing and delivery guarantees are required).
*   **Storage of Agent Configurations and Instructions**: PostgreSQL or specialized configuration files (YAML/JSON), managed via API.

### 2.5. DevOps
*   **Containerization**: Docker.
*   **Orchestration**: Kubernetes (for managing and scaling containerized applications, including client workflows).
*   **CI/CD**: GitHub Actions.
*   **Monitoring**: Prometheus, Grafana.
*   **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana) or Grafana Loki.
*   **Infrastructure as Code (IaC)**: Terraform or Ansible (optional, for managing cloud infrastructure).

## 3. System Architecture

### 3.1. High-Level Architecture

```mermaid
graph TD
    subgraph "User Interface"
        UI_Web[Web Application (React)]
        UI_PWA[PWA/Mobile App (React Native)]
    end

    subgraph "Backend System (FastAPI)"
        API_Gateway[API Gateway]
        AuthService[Authentication Service]
        WorkflowService[Workflow Management Service]
        AgentService[Agent Management Service]
        VoiceService[Voice Interaction Service]
    end

    subgraph "Multi-Agent System Core"
        MAS_Core[Main MAS Core]
        AgentOrchestrator[Agent Orchestrator]
        AgentInstances[Agent Instances (containers)]
    end

    subgraph "Data Stores"
        DB_PostgreSQL[PostgreSQL]
        DB_Redis[Redis]
    end

    subgraph "External Services"
        Ext_Whisper[OpenAI Whisper API]
        Ext_ElevenLabs[ElevenLabs API]
        Ext_Jira[Jira API]
    end

    UI_Web --> API_Gateway
    UI_PWA --> API_Gateway

    API_Gateway --> AuthService
    API_Gateway --> WorkflowService
    API_Gateway --> AgentService
    API_Gateway --> VoiceService

    VoiceService --> Ext_Whisper
    VoiceService --> Ext_ElevenLabs
    VoiceService --> MAS_Core

    WorkflowService --> MAS_Core
    WorkflowService --> DB_PostgreSQL
    AgentService --> MAS_Core
    AgentService --> DB_PostgreSQL

    MAS_Core --> AgentOrchestrator
    AgentOrchestrator --> AgentInstances
    MAS_Core --> DB_Redis # For communication/state

    AgentService --> Ext_Jira # For TaskManager agent

    AuthService --> DB_PostgreSQL
```

### 3.2. Multi-Agent Core Architecture

```mermaid
graph TD
    subgraph "API and Management Layer"
        API_AgentConfig[Agent Configuration API]
        API_WorkflowExec[Workflow Execution/Management API]
    end

    subgraph "MAS Core"
        Core_Orchestrator[MAS Core Orchestrator]
        Core_LifecycleMgr[Agent Lifecycle Manager]
        Core_MsgBroker[Message Broker (Redis Pub/Sub or Kafka)]
        Core_StateMgr[Workflow/Agent State Manager (Redis/PostgreSQL)]
        Core_InstructionStore[Instruction/Rule Store (PostgreSQL/Files)]
    end

    subgraph "Agent Execution (Containers)"
        AgentContainer1[Agent Container 1 (SF-Developer)]
        AgentContainer2[Agent Container 2 (SF-QA)]
        AgentContainerN[Agent Container N (...)]
    end

    API_AgentConfig --> Core_InstructionStore
    API_WorkflowExec --> Core_Orchestrator

    Core_Orchestrator --> Core_LifecycleMgr
    Core_Orchestrator --> Core_StateMgr
    Core_Orchestrator --> Core_MsgBroker

    Core_LifecycleMgr --> AgentContainer1
    Core_LifecycleMgr --> AgentContainer2
    Core_LifecycleMgr --> AgentContainerN

    AgentContainer1 -- Messages --> Core_MsgBroker
    AgentContainer2 -- Messages --> Core_MsgBroker
    AgentContainerN -- Messages --> Core_MsgBroker

    Core_MsgBroker -- Messages --> AgentContainer1
    Core_MsgBroker -- Messages --> AgentContainer2
    Core_MsgBroker -- Messages --> AgentContainerN

    AgentContainer1 -- State/Instruction Requests --> Core_StateMgr
    AgentContainer1 -- State/Instruction Requests --> Core_InstructionStore
```
*   **Agent Configuration API**: Allows creating, updating, and managing configurations, instructions, and rules for various agent types.
*   **Workflow Execution/Management API**: Accepts requests to run workflows, passes them to the core orchestrator, and tracks their execution.
*   **MAS Core Orchestrator**: The main component responsible for interpreting workflows, launching necessary agents, transferring data, and coordinating their work.
*   **Agent Lifecycle Manager**: Responsible for creating, starting, stopping, and monitoring the state of agent containers. Integrates with Kubernetes.
*   **Message Broker**: Ensures asynchronous communication between agents and the core.
*   **Workflow/Agent State Manager**: Stores and manages the current state of executing workflows and individual agents.
*   **Instruction/Rule Store**: Centralized location for storing instructions, prompts, and rules for all agents.
*   **Agent Containers**: Isolated environments (Docker containers) where agent instances run. Each agent has access to the message broker and, if necessary, to the instruction and state store.

### 3.3. Data Architecture
*   **PostgreSQL**:
    *   User information and permissions.
    *   Workflow definitions (structure, steps, connections).
    *   Configurations and instructions for agent templates.
    *   Workflow execution history.
    *   Audit logs and user actions.
    *   Project metadata.
*   **Redis**:
    *   User session cache.
    *   Cache for frequently requested data.
    *   Message queues for asynchronous communication between agents (if Redis Pub/Sub is used).
    *   Storage of temporary states of active workflows and agents.

## 4. "Step Flow" AI Agent Team

### 4.1. General Approach and Rationale
The user-proposed list of agents is extensive and covers many aspects. For effective work and to avoid excessive granularity, some roles will be combined or clarified. Core existing roles (`Orchestrator`, `Code`, `Architect`, `QA`, `ProjectManager`) will be adapted and supplemented with "Step Flow" specific agents. New roles will have the prefix `SF-` (Step Flow).

### 4.2. Agent Role Descriptions

#### 4.2.1. `SF-Orchestrator` (Adaptation of existing `Orchestrator`)
*   **Responsibilities**:
    *   Main coordinator for task execution within the "Step Flow" project.
    *   Decomposition of high-level tasks from `SF-ProjectManager` or the user.
    *   Delegation of subtasks to specialized `SF-` agents.
    *   Control over the overall development progress of "Step Flow", interaction with `SF-PipelineAdmin`.
    *   Management of dependencies between development tasks.
*   **Tools**: Access to task tracker, project knowledge base, configurations of other agents.
*   **Interaction**: `SF-ProjectManager`, `SF-Architect`, all `SF-Developer` agents, `SF-QA`, `SF-PipelineAdmin`.

#### 4.2.2. `SF-ProjectManager` (Adaptation of existing `ProjectManager`)
*   **Responsibilities**:
    *   Management of the "Step Flow" project backlog.
    *   Prioritization of tasks in collaboration with `SF-Architect` and stakeholders.
    *   Tracking progress through Roadmap stages.
    *   Communication with the user (for requirement gathering, demonstrations).
    *   Planning sprints and releases.
    *   Interaction with `SF-TaskManager` for synchronization with Jira (via MCP server `jira-mcp-server`).
*   **Tools**: Task tracker (Jira), planning tools, Jira API (via `SF-TaskManager`, which uses MCP server `jira-mcp-server`).
*   **Interaction**: `SF-Orchestrator`, `SF-Architect`, `SF-TaskManager`, user.

#### 4.2.3. `SF-Architect` (This role, i.e., me)
*   **Responsibilities**:
    *   Development and support of the "Step Flow" system architecture.
    *   Selection and updating of the technology stack.
    *   Design of system component interaction.
    *   Creation and updating of architectural documentation (including this plan).
    *   Code review for architecture compliance.
    *   Consulting other agents on architectural issues.
*   **Tools**: Modeling tools (Mermaid), documentation, access to the codebase.
*   **Interaction**: `SF-Orchestrator`, `SF-ProjectManager`, `SF-LeadDeveloper`, all `SF-Developer` agents.

#### 4.2.4. `SF-LeadDeveloper` (New role, detailing `TeamLead`)
*   **Responsibilities**:
    *   Technical leadership of the `SF-Developer` agent team.
    *   Assistance in solving complex technical problems.
    *   Code quality control, conducting code reviews.
    *   Mentoring and development of `SF-Developer` agents.
    *   Ensuring compliance with development guidelines.
    *   Researching new technologies and approaches to improve the development process.
*   **Tools**: IDE, Git, code review tools, access to task tracker.
*   **Interaction**: `SF-Architect`, `SF-Orchestrator`, all `SF-Developer` agents.

#### 4.2.5. `SF-Developer (Frontend - Web)` (Adaptation of `Code` for web frontend)
*   **Responsibilities**:
    *   Development of the "Step Flow" web interface using React and TypeScript.
    *   Implementation of neomorphic design and micro-animations.
    *   Creation of components for the workflow builder (`react-flow`).
    *   Writing unit and integration tests.
*   **Tools**: React, TypeScript, `react-flow`, Styled Components/Tailwind, Framer Motion/React Spring, Jest, React Testing Library.
*   **Interaction**: `SF-LeadDeveloper`, `SF-UI_Designer`, `SF-Developer (Backend)`, `SF-QA`.

#### 4.2.6. `SF-Developer (Frontend - PWA/Mobile)` (Adaptation of `Code` for PWA/Mobile)
*   **Responsibilities**:
    *   Development of the "Step Flow" PWA and mobile application using React Native and TypeScript.
    *   Adaptation of neomorphic design and animations for mobile platforms.
    *   Integration with native device functions (if required).
    *   Writing unit and integration tests.
*   **Tools**: React Native, TypeScript, Styled Components/Tailwind (adapted), Framer Motion/React Spring, Jest, React Native Testing Library.
*   **Interaction**: `SF-LeadDeveloper`, `SF-UI_Designer`, `SF-Developer (Backend)`, `SF-QA`.

#### 4.2.7. `SF-Developer (Backend)` (Adaptation of `Code` for backend)
*   **Responsibilities**:
    *   Development of backend services using Python/FastAPI.
    *   Design and implementation of APIs.
    *   Working with PostgreSQL and Redis databases.
    *   Integration with voice services (Whisper, ElevenLabs).
    *   Development of logic for the multi-agent system core.
    *   Writing unit and integration tests.
*   **Tools**: Python, FastAPI, SQLAlchemy/AsyncPG, Pytest.
*   **Interaction**: `SF-LeadDeveloper`, `SF-Developer (Frontend - Web)`, `SF-Developer (Frontend - PWA/Mobile)`, `SF-QA`, `SF-DevOps`.

#### 4.2.8. `SF-UI_Designer` (New role)
*   **Responsibilities**:
    *   Designing the user interface (UI) and user experience (UX) for web and PWA/mobile applications.
    *   Creating mockups and prototypes in a neomorphic style (black and white palette).
    *   Developing micro-animation and preloader concepts (ASAP SVG).
    *   Preparing a UI kit and design guidelines.
    *   Close interaction with frontend developers.
*   **Tools**: Figma/Sketch/Adobe XD, tools for creating SVG animations.
*   **Interaction**: `SF-ProjectManager`, `SF-Developer (Frontend - Web)`, `SF-Developer (Frontend - PWA/Mobile)`, `SF-QA`.

#### 4.2.9. `SF-QA` (Adaptation of existing `QA`)
*   **Responsibilities**:
    *   Development and execution of test cases for all "Step Flow" components.
    *   Functional, regression, UI/UX, load testing.
    *   Test automation (Selenium, Cypress, Appium, Detox).
    *   Bug reporting and tracking their resolution.
    *   Ensuring quality at all stages of development.
*   **Tools**: Test management systems, automation frameworks, API testing tools (Postman).
*   **Interaction**: All `SF-Developer` agents, `SF-UI_Designer`, `SF-ProjectManager`, `SF-Orchestrator`.

#### 4.2.10. `SF-DevOps` (New role, combines `DevOps` and `Deployment` agents)
*   **Responsibilities**:
    *   Configuration and support of CI/CD pipelines (GitHub Actions).
    *   Infrastructure management (Docker, Kubernetes).
    *   System monitoring and logging.
    *   Automation of build, test, and deployment processes.
    *   Ensuring security and fault tolerance of the infrastructure.
    *   Management of GIT repositories, versioning.
*   **Tools**: Docker, Kubernetes, GitHub Actions, Prometheus, Grafana, ELK/Loki, Terraform/Ansible, Git.
*   **Interaction**: All `SF-Developer` agents, `SF-Architect`, `SF-QA`.

#### 4.2.11. `SF-DataScientist` (New role)
*   **Responsibilities**:
    *   Analysis of data on the operation of the multi-agent system and user behavior.
    *   Development of models to improve agent efficiency (if required).
    *   Building dashboards to track key metrics.
    *   Researching the possibilities of applying ML to expand the functionality of "Step Flow".
*   **Tools**: Python, Pandas, Scikit-learn, TensorFlow/PyTorch, Jupyter Notebooks, SQL.
*   **Interaction**: `SF-ProjectManager`, `SF-Architect`, `SF-Developer (Backend)`.

#### 4.2.12. `SF-ContentManager` (New role)
*   **Responsibilities**:
    *   Creation and support of textual content for interfaces (web, PWA).
    *   Preparation of texts for standard voice assistant responses.
    *   Management of links and information materials in the system.
    *   Ensuring consistency and quality of textual information.
*   **Tools**: Text editors, content management systems (if applicable).
*   **Interaction**: `SF-UI_Designer`, `SF-Developer (Frontend - Web)`, `SF-Developer (Frontend - PWA/Mobile)`, `SF-DocWriter`.

#### 4.2.13. `SF-DocWriter` (New role, AI documentation writer)
*   **Responsibilities**:
    *   Creation and support of technical and user documentation in Russian and English.
    *   Documenting architecture, API, system components, files, constants, variables.
    *   Preparation of guides for users and developers.
    *   Automation of documentation generation from code (docstrings).
*   **Tools**: MkDocs/Sphinx/Docusaurus, Git, tools for working with docstrings.
*   **Interaction**: `SF-Architect`, all `SF-Developer` agents, `SF-QA`, `SF-ContentManager`.

#### 4.2.14. `SF-VoiceInteractionManager` (New role, part of the voice assistant)
*   **Responsibilities**:
    *   Processing user voice commands.
    *   Integration with Whisper (STT) and ElevenLabs (TTS).
    *   Managing dialogue with the user.
    *   Converting voice commands into actions for the multi-agent system.
    *   Forming voice responses.
*   **Tools**: Whisper API, ElevenLabs API, dialogue management libraries.
*   **Interaction**: `SF-Developer (Backend)` (for integration), MAS core.

#### 4.2.15. `SF-WorkflowBuilderAgent` (New role, part of the workflow builder)
*   **Responsibilities**:
    *   Providing the interface and logic for creating and editing workflows in `react-flow`.
    *   Validating created workflows.
    *   Saving and loading workflow definitions.
    *   Interacting with the backend to manage workflows.
    *   Generating configurations for the multi-agent core based on the visual representation of the workflow.
*   **Tools**: `react-flow`, TypeScript.
*   **Interaction**: `SF-Developer (Frontend - Web)`, `SF-Developer (Backend)` (for API).

#### 4.2.16. `SF-TaskManager (Jira Integrator)` (New role)
*   **Responsibilities**:
    *   Integration with Jira API via MCP server `jira-mcp-server`.
    *   Creation, updating, and deletion of tasks and subtasks in Jira based on information from the internal task tracker or `SF-ProjectManager` commands (using `jira-mcp-server`).
    *   Synchronization of task statuses and progress (using `jira-mcp-server`).
*   **Tools**: MCP server `jira-mcp-server` (provides access to Jira API), Python/FastAPI (if a backend agent) or JavaScript (if a client-side agent).
*   **Interaction**: `SF-ProjectManager`, `SF-Orchestrator`.

#### 4.2.17. `SF-PipelineAdmin` (New role, AI pipeline admin)
*   **Responsibilities**:
    *   Monitoring compliance with the development pipeline by all agents.
    *   Checking the execution of instructions and guidelines.
    *   Notifying `SF-Orchestrator` or `SF-ProjectManager` about violations or deviations.
    *   Automating routine checks within the pipeline.
*   **Tools**: Access to CI/CD logs, task tracker, version control system.
*   **Interaction**: `SF-Orchestrator`, `SF-ProjectManager`, `SF-DevOps`.

#### 4.2.18. `SF-ScrumMaster` (New role)
*   **Responsibilities**:
    *   Facilitation of all Scrum ceremonies (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective).
    *   Coaching the team and `SF-ProjectManager` (in the Product Owner role) on Scrum principles and practices.
    *   Assisting the team in self-organization and impediment removal.
    *   Protecting the team from external distractions.
    *   Tracking key team metrics (velocity, burndown, etc.).
*   **Tools**: Task tracker (Jira), meeting facilitation tools, Scrum Guide.
*   **Interaction**: All `SF-Developer` agents, `SF-ProjectManager` (as Product Owner), `SF-Orchestrator`, `SF-LeadDeveloper`.

#### 4.2.19. `SF-Research` (New role)
*   **Responsibilities**:
    *   Conducting research based on requests from other agents or strategic project goals.
    *   Analysis of new technologies, frameworks, tools that could be beneficial for "Step Flow".
    *   Collection and analysis of data on competitors, market, user trends.
    *   Preparation of reports and presentations on research findings.
    *   Assistance in forming requirements based on research data.
*   **Tools**: Internet access, specialized databases and analytical tools (if applicable), report creation tools.
*   **Interaction**: `SF-Architect`, `SF-ProjectManager`, `SF-LeadDeveloper`, `SF-DataScientist`, `SF-Orchestrator`.

### 4.3. Agent Configuration
*   For each new or adapted `SF-...` role, JSON configuration files will be created in the `step_flow/.roo/modes/` directory.
*   These files will contain:
    *   `slug` (e.g., `SF-developer_backend`).
    *   `name` (e.g., "SF: Backend Developer").
    *   `model` (specify the LLM used).
    *   `role` (detailed role description, as above).
    *   `custom_instructions` (specific instructions for the agent, including its tools, limitations, communication style if different from global).
    *   `allowed_file_patterns` (if there are restrictions on editable files).

## 5. Development Plan (Roadmap)

### 5.1. Stage 1: MVP (Minimum Viable Product) - (Approximately 3-4 months)
*   **Goals**: Basic voice control and workflow builder functionality.
*   **Key Features**:
    *   Web Application: Authentication, main dashboard.
    *   Backend: Basic APIs for user and workflow management.
    *   Voice Control: Integration of Whisper and ElevenLabs for simple dialogue (e.g., "create new workflow", "add agent").
    *   Workflow Builder: Basic interface on `react-flow` for creating workflows from 2-3 predefined agent types.
    *   Multi-Agent Core: Execution of simple workflows with 2-3 agents.
    *   DevOps: Basic CI/CD for backend and frontend.
    *   Core Agents: `SF-Architect`, `SF-ProjectManager`, `SF-Orchestrator`, `SF-Developer (Backend)`, `SF-Developer (Frontend - Web)`, `SF-QA`, `SF-DevOps`, `SF-ScrumMaster`.

### 5.2. Stage 2: Alpha (Approximately 3-4 months after MVP)
*   **Goals**: Functional expansion, PWA, custom agents.
*   **Key Features**:
    *   PWA: First version on React Native with core web application functionality.
    *   Voice Control: More complex dialogues, voice control of agent parameters.
    *   Workflow Builder: Ability to create custom agents (defining instructions, rules), more tools and services for connection.
    *   Multi-Agent Core: Support for custom agents, more complex pipelines.
    *   Neomorphic UI: Full design implementation with micro-animations and preloader.
    *   Jira Integration (`SF-TaskManager`).
    *   Expansion of Agent Team: `SF-UI_Designer`, `SF-DocWriter`, `SF-ContentManager`, `SF-LeadDeveloper`, `SF-Developer (Frontend - PWA/Mobile)`, `SF-Research`.

### 5.3. Stage 3: Beta (Approximately 2-3 months after Alpha)
*   **Goals**: Stabilization, optimization, feedback collection.
*   **Key Features**:
    *   Scalability: Performance optimization of backend and multi-agent core.
    *   Security: Security audit, enhanced protection.
    *   Testing: Extended load and user testing.
    *   Documentation: Complete user and technical documentation.
    *   Client Workflows: Implementation of a mechanism for creating and isolating personal client workflows in the cloud (Kubernetes).
    *   Agents: `SF-DataScientist` (start of data collection and analysis), `SF-PipelineAdmin`.

### 5.4. Stage 4: Release (Approximately 1-2 months after Beta)
*   **Goals**: Public launch.
*   **Key Features**:
    *   Fixing all critical and major bugs.
    *   Marketing materials.
    *   Preparation of user support.
    *   Final UI/UX polishing.

## 6. Proposed Project Directory Structure

```
/Users/bat/Documents/AIMultiAgent/
├── .git/
├── .roo/                     # Global Roo configurations and documentation
│   ├── modes/                # Global agent modes
│   ├── development_guidelines.md
│   ├── pipeline.md
│   └── roles.md
├── step_flow/                # Root folder of "Step Flow" project
│   ├── .roo/                 # "Step Flow" specific Roo configurations
│   │   ├── modes/            # Agent modes for "Step Flow" (SF-...)
│   │   ├── roles.md          # Description of SF-... agent roles
│   │   └── development_guidelines.md # Specific guidelines
│   ├── backend/              # Backend on FastAPI
│   │   ├── app/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── frontend_web/         # Web application on React
│   │   ├── public/
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── frontend_pwa/         # PWA/Mobile application on React Native
│   │   ├── src/
│   │   ├── ios/
│   │   ├── android/
│   │   └── package.json
│   ├── docs/                 # Project documentation (MkDocs, Sphinx)
│   ├── devops/               # DevOps configurations
│   │   ├── kubernetes/       # Kubernetes manifests
│   │   ├── CI/               # GitHub Actions scripts and configurations
│   │   └── grafana_dashboards/ # Grafana dashboards
│   ├── shared_types/         # Common TypeScript types for frontend and backend (optional)
│   └── step_flow_project_plan.md # This document
└── vars.evn
```

## 7. Development Pipeline and Agent Interaction in "Step Flow"

This pipeline describes the key development stages and agent roles in the "Step Flow" project, ensuring clear responsibility distribution and effective interaction.

### 7.1. Key Principles
*   **Iterative and Incremental**: Development is conducted in short cycles (sprints) with regular delivery of a working product.
*   **Adherence to Scrum Framework**: `SF-ScrumMaster` ensures compliance with Scrum practices.
*   **Clear Separation of Responsibilities**: Each agent has its own area of responsibility.
*   **Transparency**: All tasks and their progress are tracked in Jira (via `SF-TaskManager`, which uses MCP server `jira-mcp-server`).
*   **Quality**: `SF-QA` ensures quality control at all stages.
*   **Architectural Compliance**: `SF-Architect` controls the adherence of solutions to the project architecture.
*   **Automation**: `SF-DevOps` automates build, test, and deployment processes.
*   **Language Policy (English First)**: All system-related files (configurations, scripts), code comments, Git commit messages, and technical documentation (unless explicitly marked with a `-ru` suffix or intended for a Russian-speaking audience) MUST be written in formal, professional English. Vernacular, slang, or offensive language is strictly prohibited in these contexts.

### 7.2. Pipeline Stages and Agent Roles

#### 7.2.1. Initiation and Planning (Level: `SF-ProjectManager` and `SF-Architect`)
1.  **Vision and Requirements Formulation**:
    *   `SF-ProjectManager` (as Product Owner) gathers requirements from stakeholders/user, defines business goals.
    *   `SF-Architect` participates in defining technical requirements and constraints.
    *   `SF-Research` (if necessary) conducts preliminary research on the market, technologies, competitors. Results are passed to `SF-ProjectManager` and `SF-Architect`.
2.  **Roadmap and MVP Definition**:
    *   `SF-ProjectManager` and `SF-Architect` jointly form a long-term Roadmap and define the MVP scope.
3.  **Product Backlog Creation and Prioritization**:
    *   `SF-ProjectManager` creates and maintains the Product Backlog in Jira (via `SF-TaskManager`). Tasks are described as User Stories with acceptance criteria.
    *   Backlog priorities are determined by `SF-ProjectManager` in agreement with `SF-Architect`.

#### 7.2.2. Sprint Planning (Team effort led by `SF-ScrumMaster`)
1.  **"Sprint Planning" Event**:
    *   `SF-ScrumMaster` facilitates the meeting.
    *   `SF-ProjectManager` presents the highest priority items from the Product Backlog.
    *   The development team (`SF-LeadDeveloper`, `SF-Developer` agents, `SF-QA`, `SF-UI_Designer` if needed) discusses and selects tasks for the sprint, forming the Sprint Backlog.
    *   `SF-Orchestrator` assists in decomposing selected tasks into smaller subtasks for `SF-Developer` agents if necessary at this stage.
    *   Tasks in the Sprint Backlog are also entered into Jira.

#### 7.2.3. Development and Daily Coordination (Sprint Cycle)
1.  **Daily Scrum**:
    *   `SF-ScrumMaster` facilitates a short daily meeting of the development team for synchronization and impediment identification.
2.  **Research (if necessary)**:
    *   During the sprint, `SF-Developer` agents or `SF-Architect` may initiate requests to `SF-Research` for specific information needed to solve current tasks.
3.  **UI/UX Design**:
    *   `SF-UI_Designer` develops mockups and prototypes for tasks requiring UI. Passes them to `SF-Developer (Frontend)` agents.
4.  **Development (Coding)**:
    *   `SF-Developer` agents (Frontend Web, Frontend PWA/Mobile, Backend) implement functionality according to tasks from the Sprint Backlog.
    *   `SF-LeadDeveloper` provides technical support, conducts preliminary reviews, monitors code quality, and ensures adherence to guidelines.
5.  **Test Writing**:
    *   `SF-Developer` agents write unit tests.
    *   `SF-QA` develops test cases (functional, integration, UI/UX, etc.) for the developed functionality.
6.  **Code Management and CI/CD**:
    *   `SF-DevOps` ensures the operation of CI/CD pipelines. Commits from `SF-Developer` agents trigger automatic builds and test runs.

#### 7.2.4. Testing and Quality Assurance
1.  **Testing**:
    *   `SF-QA` conducts testing of the developed functionality according to prepared test cases. This includes:
        *   Functional testing.
        *   UI/UX testing (interaction with `SF-UI_Designer`).
        *   API testing (for backend).
        *   Integration testing of components.
        *   Specific testing: voice interface, PWA/Mobile, multi-agent scenarios.
2.  **Bug Reporting**:
    *   `SF-QA` reports discovered bugs in Jira (via `SF-TaskManager`) with clear descriptions and reproduction steps.
3.  **Bug Fixing**:
    *   `SF-Developer` agents fix bugs, `SF-QA` conducts re-testing.

#### 7.2.5. Code and Architecture Review
1.  **Code Review**:
    *   `SF-LeadDeveloper` and/or other `SF-Developer` agents conduct formal code reviews of completed tasks.
2.  **Architectural Review**:
    *   `SF-Architect` conducts reviews for architectural compliance for critically important or complex components.

#### 7.2.6. Sprint Review
1.  **"Sprint Review" Event**:
    *   `SF-ScrumMaster` facilitates the meeting.
    *   The development team demonstrates the product increment completed during the sprint to `SF-ProjectManager` and other stakeholders.
    *   `SF-ProjectManager` collects feedback that may influence the Product Backlog.

#### 7.2.7. Sprint Retrospective
1.  **"Sprint Retrospective" Event**:
    *   `SF-ScrumMaster` facilitates the team meeting (including `SF-ProjectManager` as part of the Scrum team).
    *   The team discusses what went well, what can be improved in processes, tools, or interaction. Retrospective outcomes are used to improve work in subsequent sprints.

#### 7.2.8. Release and Deployment
1.  **Release Preparation**:
    *   After several successful sprints and achieving release goals (e.g., MVP, Alpha), `SF-ProjectManager` initiates release preparation.
    *   `SF-QA` conducts final regression and, if necessary, load testing.
    *   `SF-DocWriter` finalizes user and technical documentation for the release.
    *   `SF-ContentManager` prepares release texts and materials.
2.  **Deployment**:
    *   `SF-DevOps` manages the deployment process to staging and production environments via CI/CD pipelines.

### 7.3. Pipeline Monitoring and Support
*   **`SF-PipelineAdmin`**:
    *   Continuously monitors compliance with the described pipeline by all agents.
    *   Checks the execution of instructions, guidelines, and correct use of Jira.
    *   Notifies `SF-Orchestrator`, `SF-ProjectManager`, and `SF-ScrumMaster` of identified violations or systemic pipeline problems.
    *   Proposes improvements for pipeline automation and optimization.

### 7.4. Agent Configuration Management
*   `SF-Architect` and `SF-LeadDeveloper` are responsible for the relevance and correctness of agent configuration files (in `step_flow/.roo/modes/`).
*   Changes to configurations go through the standard code review and versioning process.

## 8. Suggestions and Remarks

### 8.1. Potential Risks
*   **Integration Complexity**: A large number of technologies (voice, multi-agent, React Native, Kubernetes) can lead to integration difficulties.
*   **Performance of Voice Services**: Delays in Whisper or ElevenLabs operation can negatively affect UX.
*   **Quality of Speech Recognition and Synthesis**: Dependence on external STT/TTS services.
*   **Complexity of Debugging Multi-Agent Systems**: Debugging interactions between multiple agents can be non-trivial.
*   **Selection and Training of AI Agent Team**: Configuring and training such a large number of specialized agents will require time and resources.
*   **Neomorphic Design**: Although impressive, it can be complex to implement and ensure accessibility.
*   **Cloud Infrastructure Management**: Kubernetes requires expertise for setup and maintenance.

### 8.2. Additional Suggestions
*   **Iterative Development of Voice Assistant**: Start with a limited set of commands and gradually expand its capabilities.
*   **Modular Architecture of Multi-Agent Core**: Design the core so that new agent types and data sources can be easily added.
*   **Focus on User Experience (UX)**: Especially for the workflow builder and voice control. Conduct regular UX testing.
*   **Creation of a "Sandbox" for Workflow Developers**: A place where users can safely experiment with creating and testing their agents and workflows.
*   **Consider Using Feature Flags**: For gradual rollout of new features and A/B testing.

## 9. Updating Existing Documentation and Configurations

### 9.1. Updating Global Documents (in `.roo/`)
*   [`./.roo/roles.md`](./.roo/roles.md): General principles for naming project-specific roles (e.g., `PROJECT_` prefix) can be added.
*   [`./.roo/pipeline.md`](./.roo/pipeline.md): A section on how to adapt the pipeline for large subprojects like "Step Flow" can be added.

### 9.2. Creating Specific Documents for "Step Flow" (in `step_flow/.roo/`)
*   **`step_flow/.roo/roles.md`**: Detailed description of all `SF-...` agents, their responsibilities, tools, and interactions (as in section 4 of this plan).
*   **`step_flow/.roo/development_guidelines.md`**:
    *   Specific guidelines for React Native (code style, working with native modules).
    *   Guidelines for FastAPI (project structure, working with Pydantic models, asynchronous programming).
    *   Naming rules for components in neomorphic UI.
    *   Guidelines for writing instructions for AI agents.
*   **`step_flow/.roo/modes/`**: JSON configuration files for each `SF-...` agent.
