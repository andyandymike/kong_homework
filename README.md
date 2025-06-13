# Kong E2E Test Project with Cypress

## Local Run Setup

```bash
npm install
npm test
```

## Actions Implemented
- Create new service
- Create new service with empty name
- Create new service and route
- Create new service and route with empty name

## Extra Features

### Result Reporting
- Uses **Mochawesome** as the report generator.
- Generates an **HTML report** for human-readable output.
- Report are **downloadable via GitHub Actions**.

### GitHub Actions
- Continuous Integration is **enabled** via GitHub Actions.

---

## Project Structure

```
cypress/
  e2e/
    1-create-services  # Test cases for action 1
    2-add-entities     # Test cases for action 2
  support/
    config/            # Stores selectors and enumerations
    elements/          # Stores common elements
    pages/             # Stores common pages
cypress.config.js      # Cypress configuration
cypress.env.json       # Environment-related variables
```

---

## Test Design

### Test Case Principles
- Ensure test cases are **readable** to avoid overly long steps.
- Design **reusable** steps instead of duplicating logic across tests.
- Use **stable selectors** (e.g., `data-testid`) to reduce the risk of test breakage due to UI changes.

### Project-Level Implementation
- Provide **page-level functions** under `/cypress/support/pages/`.
- Provide common **element-level functions** under `/cypress/support/elements/`.
- To support future UI changes, provide **centralize selectors** under `/cypress/support/config/selectors.js`.
- To minimizing user input errors when writing test cases, provide **enumerations** to store **UI options or properties** under `/cypress/support/config/projectEnum.js`.

### Test Case Implementation
- Set up `baseUrl` and navigate to `/workspace` before each test begins.
- **Clean up data** (delete created entries) after each test, taking dependencies into account.
- **Print logs** at key steps to improve debugging.
- Include **validations** at important steps — more can be added as needed.
- Handle special input like entity name is **empty** - need to use entity Id intead of name to delete it.

---

## Assumptions

- Pages like Gateway Services and Routes share a **template**.  
  → A base class is used to implement core functionality such as create, delete, and get ID to avoiding code duplication.

- In the future, test data such as URLs may change (e.g., for specific test scenarios or changes in environments like `dev` or `uat`).
  → Variables are stored in **environment configuration** `cypress.env.json` to make tests easily configurable.

- Tests may **not** always run in a **fresh environment**:
  - When creating an entity, first check the number of existing one to validate if env is fresh (the page might differ).
  - Entity names should be unique to avoid duplication.
- **A toaster** will pop up when action is successfully executed like create or delete. Need to close it or it may make some button unable to click.<br>
Although we can set `{ force: true }` to click, but let's try close toaster to **minic user behavior** first.

---

## Trade-offs

- Some elements (e.g., workspace sidebar) do not fit well into a specific page object.<br>
They are defined as standalone element-level functions.<br>
While they could be part of Cypress commands, they are kept separate for extensibility and consistency.
- Due to time constraints, the browser size is currently fixed at the start of each test.<br>
In the future, tests should cover multiple screen sizes.

---
