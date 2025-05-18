# Development Guidelines for "Step Flow" Project

This document contains specific development guidelines for the "Step Flow" project, supplementing the global guidelines from [`../../.roo/development_guidelines.md`](../../.roo/development_guidelines.md).

## General Principles
*   Always refer to the main project plan: [`../step_flow_project_plan_en.md`](../step_flow_project_plan_en.md).
*   Adhere to the proposed directory structure (see section 6 of the project plan).
*   Use the proposed technology stack (see section 2 of the project plan).
*   **Teamwork and Scrum**:
    *   Actively participate in all Scrum ceremonies facilitated by `SF_ScrumMaster`.
    *   All tasks must be created and tracked in Jira (via `SF_TaskManager`).
    *   If impediments arise, immediately inform `SF_ScrumMaster` and `SF_LeadDeveloper`.
    *   Adhere to the Definition of Done (DoD) agreed upon by the team.

## Guidelines for React Native (PWA/Mobile - [`../frontend_pwa/`](../frontend_pwa/))
*   **Code Style**: Follow core JavaScript/TypeScript principles, use Prettier and ESLint with configurations adapted for React Native.
*   **Working with Native Modules**:
    *   Whenever possible, use cross-platform libraries.
    *   If native code is necessary, clearly separate logic for iOS and Android.
    *   Thoroughly document the use of native modules.
*   **State Management**: Choose one solution (Redux Toolkit, Zustand, Recoil) and stick to it throughout the PWA application.
*   **Styling**: Adapt Tailwind CSS or use Styled Components for neomorphic design. Ensure style consistency.
*   **Testing**: Write unit tests (Jest) and integration tests (React Native Testing Library) for all components and key functions.

## Guidelines for FastAPI (Backend - [`../backend/`](../backend/))
*   **Project Structure**:
    *   Separate logic by modules/domains (e.g., `users`, `workflows`, `agents`).
    *   Use `routers` to define endpoints.
    *   Pydantic models should be in a separate `schemas` module or alongside corresponding routers/services.
*   **Working with Pydantic Models**:
    *   Clearly define models for API requests and responses.
    *   Use Pydantic validation to ensure data correctness.
*   **Asynchronous Programming**:
    *   Use `async/await` for all I/O operations (database interaction, external APIs).
    *   Avoid blocking calls.
*   **Database Interaction (SQLAlchemy/AsyncPG)**:
    *   Use asynchronous sessions and engines.
    *   Define SQLAlchemy models in the `models` module.
    *   For complex queries, use Core SQLAlchemy or raw SQL if justified.
*   **Testing**: Write unit tests (Pytest) for services, repositories, and API endpoints. Use mocks for external dependencies.

## Naming Conventions for Neomorphic UI Components
*   **General Prefix**: Consider using a prefix like `Neumo` or `Nm` for neomorphic style components (e.g., `NeumoButton`, `NmCard`).
*   **Clarity and Consistency**: Names should clearly reflect the component's purpose.
*   **Structure**: If a component is composite, reflect this in the name (e.g., `NeumoListItem`, `NeumoListItemContent`).
*   **States**: For styling different states (pressed, focused), use clear CSS classes or props in Styled Components.

## Documentation
*   All functions, classes, and modules must have docstrings.
*   For API endpoints, use FastAPI's capabilities for automatic documentation generation (OpenAPI).
*   Complex logic should be commented.

## Interaction with Other Agents
*   Strictly follow instructions from `SF_Architect` and `SF_LeadDeveloper`.
*   Promptly respond to requests from `SF_QA` and fix identified bugs.
*   If API changes are necessary, coordinate them with frontend developers and other API consumers.
*   For specific information or research, contact `SF_Research`.
*   All communications should be constructive and aimed at achieving common sprint and project goals.