# Development Pipeline

## Introduction
The general development pipeline describes the sequence of stages a task goes through from its inception to the release of the finished product or functionality. Following this pipeline ensures predictability, quality, and timely delivery.

**Note:** For large or specific projects (e.g., "Step Flow"), this pipeline may be detailed and adapted in the corresponding project documentation (see [`step_flow_project_plan.md`](step_flow_project_plan.md) or its English version).

## Pipeline Stages

1.  **Task Definition and Planning**:
    *   A task can originate from a user, stakeholder, or be created by `ProjectManager` based on requirements analysis or feedback.
    *   The task must be clearly formulated, contain a description of the expected result, acceptance criteria, and, if possible, business context.
    *   Responsible: `ProjectManager`, `Architect`.
    *   **ProjectManager Subtasks (Examples from SCRUM-1, SCRUM-3):**
        *   `SCRUM-1`: Define and create Epics in Jira.
        *   `SCRUM-1`: Define and configure Sprints in Jira.
        *   `SCRUM-1`: Define and configure Task types in Jira.
        *   `SCRUM-1`: Configure workflow for tasks in Jira.
        *   `SCRUM-3`: Conduct UX research and analyze user scenarios.
        *   `SCRUM-3`: Iteratively improve UI/UX based on feedback and testing.
    *   **Ask Subtasks (Examples from LEARNJIRA-1, LEARNJIRA-2, LEARNJIRA-3):**
        *   `LEARNJIRA-3`: Explore Atlassian Intelligence capabilities for Jira.
        *   `LEARNJIRA-2`: Explore Plans (Advanced Roadmaps) functionality in Jira.
        *   `LEARNJIRA-1`: Study security and access rights management in Jira.
    *   **Language Policy (English First)**: All system-related files (configurations, scripts), code comments, Git commit messages, and technical documentation (unless explicitly marked with a `-ru` suffix or intended for a Russian-speaking audience) MUST be written in formal, professional English. Vernacular, slang, or offensive language is strictly prohibited in these contexts.


2.  **Task Analysis, Design, and Decomposition**:
    *   Responsible: `Architect`, `ProjectManager`, `Orchestrator`.
    *   At this stage, the task is analyzed for technical feasibility, impact on the existing system, and required resources.
    *   Large tasks are decomposed into smaller, manageable subtasks.
    *   Dependencies between tasks are identified.
    *   `Architect` proposes a high-level technical solution, designs the architecture, API, data models.
    *   **Architect Subtasks (Examples from SCRUM-20, SCRUM-12, SCRUM-11, SCRUM-10, SCRUM-8, SCRUM-5, SCRUM-3, SCRUM-2):**
        *   `SCRUM-20`: Create and populate sf_architect.json configuration file.
        *   `SCRUM-20`: Create and populate sf_project_manager.json configuration file.
        *   `SCRUM-20`: Create and populate sf_orchestrator.json configuration file.
        *   `SCRUM-20`: Create and populate sf_developer_backend.json configuration file.
        *   `SCRUM-20`: Create and populate sf_developer_frontend_web.json configuration file.
        *   `SCRUM-20`: Create and populate sf_qa.json configuration file.
        *   `SCRUM-20`: Create and populate sf_devops.json configuration file.
        *   `SCRUM-12`: Initialize Git repository and structure the project.
        *   `SCRUM-12`: Set up CI/CD pipeline for backend (GitHub Actions).
        *   `SCRUM-12`: Set up CI/CD pipeline for frontend (GitHub Actions).
        *   `SCRUM-11`: Develop preloader concept and design.
        *   `SCRUM-10`: Design role and access rights model.
        *   `SCRUM-8`: Analyze requirements and define the main API scope.
        *   `SCRUM-8`: Design endpoints for authentication and user management.
        *   `SCRUM-8`: Design endpoints for Workflow management.
        *   `SCRUM-8`: Design endpoints for voice control.
        *   `SCRUM-8`: Design endpoints for agent configuration (if necessary).
        *   `SCRUM-8`: Create OpenAPI specification for the main API.
        *   `SCRUM-5`: Decompose and plan infrastructure setup tasks.
        *   `SCRUM-5`: Decompose and plan CI/CD tasks.
        *   `SCRUM-5`: Decompose and plan monitoring and logging tasks.
        *   `SCRUM-5`: Decompose and plan infrastructure security tasks.
        *   `SCRUM-3`: Develop detailed interface mockups and prototypes.
        *   `SCRUM-3`: Develop and maintain UI kit and style guidelines.
        *   `SCRUM-2`: Decompose and plan development of Workflow management module.
        *   `SCRUM-2`: Decompose and plan development of authentication and user management module.
        *   `SCRUM-2`: Decompose and plan development of voice control module.
        *   `SCRUM-2`: Decompose and plan development of AI agent configuration.

3.  **Development**:
    *   Responsible: `Code`.
    *   `Code` agent takes a task or subtask from the backlog.
    *   Code implementing the required functionality is written.
    *   Unit tests for the new code are written in parallel.
    *   The developer follows version control guidelines (branch creation, semantic commits).
    *   **Code Subtasks (Examples from SCRUM-22, SCRUM-19, SCRUM-18, SCRUM-17, SCRUM-16, SCRUM-15, SCRUM-14, SCRUM-13, SCRUM-12, SCRUM-11, SCRUM-10, SCRUM-9, SCRUM-7, SCRUM-6):**
        *   `SCRUM-22`: Write unit tests for the authentication module.
        *   `SCRUM-19`: Select and integrate MAS framework (Langchain/Autogen).
        *   `SCRUM-19`: Implement logic for loading workflow definition from PostgreSQL.
        *   `SCRUM-19`: Implement interpretation of a simple workflow.
        *   `SCRUM-19`: Create 2-3 simple stub agents.
        *   `SCRUM-19`: Implement data transfer mechanism between stub agents.
        *   `SCRUM-19`: Implement API endpoint for starting a workflow.
        *   `SCRUM-19`: Implement logging of workflow execution progress.
        *   `SCRUM-19`: Write unit tests for MAS core.
        *   `SCRUM-18`: Integrate react-flow library.
        *   `SCRUM-18`: Implement node types panel.
        *   `SCRUM-18`: Implement node dragging onto the canvas.
        *   `SCRUM-18`: Implement node connection.
        *   `SCRUM-18`: Implement workflow saving.
        *   `SCRUM-18`: Implement loading of existing workflow (Optional for MVP).
        *   `SCRUM-18`: Implement basic styling for nodes and canvas.
        *   `SCRUM-17`: Implement API endpoint for receiving audio.
        *   `SCRUM-17`: Set up integration with OpenAI Whisper API.
        *   `SCRUM-17`: Set up integration with ElevenLabs API.
        *   `SCRUM-17`: Implement logic for processing a simple command.
        *   `SCRUM-17`: Implement generation of a simple voice response.
        *   `SCRUM-17`: Ensure error handling from external APIs.
        *   `SCRUM-17`: Write unit tests for the dialogue service.
        *   `SCRUM-16`: Define data structure for workflow.
        *   `SCRUM-16`: Implement API endpoint for creating workflow (POST /workflows).
        *   `SCRUM-16`: Implement API endpoint for getting list of workflows (GET /workflows).
        *   `SCRUM-16`: Implement API endpoint for getting workflow by ID (GET /workflows/{workflow_id}).
        *   `SCRUM-16`: Implement API endpoint for updating workflow (PUT /workflows/{workflow_id}) (Optional for MVP).
        *   `SCRUM-16`: Implement API endpoint for deleting workflow (DELETE /workflows/{workflow_id}) (Optional for MVP).
        *   `SCRUM-16`: Ensure API security.
        *   `SCRUM-16`: Write unit tests for workflow management API.
        *   `SCRUM-16`: Generate API documentation (OpenAPI).
        *   `SCRUM-15`: Create React component for the main dashboard.
        *   `SCRUM-15`: Implement basic layout for the dashboard page.
        *   `SCRUM-15`: Ensure access only for authenticated users.
        *   `SCRUM-15`: Apply initial styling in neomorphic design.
        *   `SCRUM-15`: Prepare placeholders for future sections.
        *   `SCRUM-14`: Create React components for registration and login pages.
        *   `SCRUM-14`: Implement interaction with backend authentication API.
        *   `SCRUM-14`: Implement JWT token storage.
        *   `SCRUM-14`: Implement authentication state management.
        *   `SCRUM-14`: Implement redirection after successful login/registration.
        *   `SCRUM-14`: Implement user logout function.
        *   `SCRUM-14`: Implement display of authentication errors.
        *   `SCRUM-14`: Write unit tests for authentication components and logic.
        *   `SCRUM-13`: Implement API endpoint /auth/register.
        *   `SCRUM-13`: Implement API endpoint /auth/login.
        *   `SCRUM-13`: Implement API endpoint /auth/logout.
        *   `SCRUM-13`: Implement API endpoint /auth/refresh_token.
        *   `SCRUM-13`: Set up user data storage in PostgreSQL.
        *   `SCRUM-13`: Ensure authentication API security.
        *   `SCRUM-13`: Write unit tests for authentication service.
        *   `SCRUM-13`: Generate API documentation for authentication (OpenAPI).
        *   `SCRUM-12`: Create basic Dockerfile for backend.
        *   `SCRUM-12`: Create basic Dockerfile for frontend.
        *   `SCRUM-11`: Create SVG graphics for preloader.
        *   `SCRUM-11`: Implement preloader animation using GSAP.
        *   `SCRUM-11`: Integrate preloader into index.html and test.
        *   `SCRUM-10`: Implement mechanism for storing roles and rights in DB.
        *   `SCRUM-10`: Implement API for managing roles and rights.
        *   `SCRUM-10`: Integrate access rights check into existing APIs.
        *   `SCRUM-10`: Write unit tests for roles and rights system.
        *   `SCRUM-9`: Write unit tests for authentication module (repeat SCRUM-22).
        *   `SCRUM-7`: Implement endpoint for creating user (POST /users).
        *   `SCRUM-7`: Implement endpoint for getting list of users (GET /users).
        *   `SCRUM-7`: Implement endpoint for getting user by ID (GET /users/{user_id}).
        *   `SCRUM-7`: Implement endpoint for updating user (PUT /users/{user_id}).
        *   `SCRUM-7`: Implement endpoint for deleting user (DELETE /users/{user_id}).
        *   `SCRUM-7`: Integrate with roles and rights system (SCRUM-10).
        *   `SCRUM-7`: Write unit tests for user management API.
        *   `SCRUM-6`: Backend: Implement authentication API (see SCRUM-13).
        *   `SCRUM-6`: Frontend: Implement UI and authentication logic (see SCRUM-14).

4.  **Testing**:
    *   Responsible: `QA`, `Code` (for unit tests).
    *   After development by the `Code` agent is complete, functionality is passed to the `QA` agent for testing.
    *   `QA` agent executes test cases (manual or automated), conducts regression testing.
    *   All found bugs are registered in the task tracker and passed to the `Code` agent for fixing.
    *   The "Development (bug fixing) -> Testing" cycle may be repeated several times.
    *   **QA Subtasks (Examples from SCRUM-21, SCRUM-12, SCRUM-4):**
        *   `SCRUM-21`: Create MVP test plan document.
        *   `SCRUM-21`: Prepare basic test cases for manual authentication testing.
        *   `SCRUM-21`: Prepare basic test cases for manual workflow management API testing.
        *   `SCRUM-21`: Prepare basic test cases for manual workflow builder UI testing.
        *   `SCRUM-21`: Set up project for UI automation (Cypress/Selenium).
        *   `SCRUM-21`: Set up bug tracking system.
        *   `SCRUM-12`: Verify CI/CD operation on test commits.
        *   `SCRUM-4`: Develop testing strategy.
        *   `SCRUM-4`: Plan and write test cases for extended functionality.
        *   `SCRUM-4`: Set up and develop automated testing.
        *   `SCRUM-4`: Organize regression testing process.

5.  **Code Review**:
    *   Responsible: other `Code` agents, `Architect`.
    *   After the code is written and has passed preliminary testing (unit tests), a Pull Request (PR) or Merge Request (MR) is created.
    *   The code is reviewed for compliance with standards, quality, absence of potential problems, and architectural integrity.
    *   Comments are discussed and corrected by the code author.

6.  **Merge into Main Development Branch**:
    *   After successful review and passing all CI checks (linters, tests, build), the code from the feature/bugfix branch is merged into the main development branch (e.g., `develop` or `main`).
    *   Squash-merge is preferred for history cleanliness if adopted in the project.

7.  **(If applicable) Build and Deploy to Test/Staging Environments**:
    *   After merging into the main branch, the CI/CD process is triggered to build artifacts and deploy them to test or staging environments.
    *   Additional User Acceptance Testing (UAT) or demonstration to the client/user may be conducted in these environments.

8.  **(If applicable) Release**:
    *   After successful testing in intermediate environments and obtaining approval, a release to the production environment is planned and executed.
    *   This may include preparing release notes, notifying users.

9.  **Monitoring and Feedback Collection**:
    *   After release, it is important to monitor system operation, collect logs, performance metrics.
    *   User feedback is collected to identify problems or potential improvements.
    *   This information is used to create new tasks or improve existing processes.

## Tools
Various tools are used for effective pipeline operation:
*   **Task Trackers**: Jira, Trello, Asana, YouTrack (or internal task management system). Used for creating, tracking, and managing tasks. **IMPORTANT: In the "Step Flow" project, ALL tasks (creation, description, role assignment, progress tracking, documentation, etc.) are managed EXCLUSIVELY in JIRA.**
*   **Version Control Systems**: Git (with hosting services GitHub, GitLab, Bitbucket).
*   **CI/CD**: Jenkins, GitLab CI, GitHub Actions, CircleCI, TeamCity. For automating build, testing, and deployment.
*   **Communication Tools**: Slack, Microsoft Teams, Mattermost. For discussions and notifications.
*   **Documentation Tools**: Confluence, Notion, MkDocs, Sphinx. For maintaining technical and user documentation.
*   **Monitoring and Logging**: Prometheus, Grafana, ELK Stack (Elasticsearch, Logstash, Kibana), Sentry, Datadog.

The choice of specific tools depends on the project and team. It is important that all process participants know how to use them and follow the established rules for their use.