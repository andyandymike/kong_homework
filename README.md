# Kong E2E Test Project with Cypress

## Local Run Setup
- Make sure docker environment is ready and up.
- Open terminal to project root.
- Run `git clone https://github.com/andyandymike/kong_homework.git`
- Run `cd kong_homework`
- Run `npm install`
- Run `docker-compose up -d`
- Check `http://localhost:8002/` is available.
- Check docker contains and get Container ID for cp.
- Run `docker exec -i [Container ID] /bin/sh -c "export KONG_ADMIN_GUI_PATH='/'; export KONG_ADMIN_GUI_URL='http://localhost:8002/manager'; kong reload; exit"`
- Run `npm test` 
- Check command line output or `cypress/reports/merged_report.html` for result.
- Run `docker-compose down` to shut down docker services.

## Tests Implemented
- Create new service -> Create new Route to associate with service.
- Create new service with empty name -> Create new Route with empty name to associate with service.
- Clean up for both success or failure execution are implemented.

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
    create-service-route/                 # Test cases folder
      create_service_route                # Test case: create a new service and associate it with a route
      create_service_route_empty_name     # Test case: create a new service and associate it with a route (names are all empty)
  support/
    config/                               # Stores selectors and enumerations
    elements/                             # Stores common elements
    pages/                                # Stores common pages
    commands.js                           # Stores common commands and test case step commands
cypress.config.js                         # Cypress configuration
cypress.env.json                          # Environment-related variables
```

---

## Test Design

### Test Case Principles
- Ensure test cases are **readable** to avoid overly long steps.
- Design **reusable** steps instead of duplicating logic across tests.
- Use **stable selectors** (e.g., `data-testid`) to reduce the risk of test breakage due to UI changes.
- Use **centralized** place to store values that may changed.
- Since test cases have dependency on each other, so **fail first**. Check **Trade-offs** for thoughts.

### Project-Level Implementation
- Provide **page-level functions** under `cypress/support/pages/`.
- Provide common **element-level functions** under `cypress/support/elements/`.
- Provide common functions under `cypress/support/common/func.js`.
- To support future UI changes, provide **centralize selectors** under `cypress/support/config/selectors.js`.
- To minimizing user input errors when writing test cases, provide **enumerations** to store **UI options or properties** under `cypress/support/config/projectEnum.js`.
- **Wrap** set of page/element/common actions to actual **test step** commands under `cypress/support/commands.js`.. To avoid possible misuse:
  - Parent command for steps that can be used any time. → eg. Create new service command will always start from `/workspaces`.
  - Child command for steps that have dependency. → eg. Get service Id should already on service detail page.
  - Dual command for steps that should be used both anywhere or inbetween. → eg. Set context value.

### Test Case Implementation
- Set up `baseUrl` and navigate to `/workspace` before each test begins.
- Create Service and Route are two `it()` within one `describe()`. Check **Trade-offs** for thoughts.
- **Clean up data** (delete created entries) on finish using after hook, taking dependencies into account.
- **Clean up data** (delete created entries) on failure using afterEach hook, taking dependencies into account.
- **Print logs** at key steps to improve debugging.
- Include **validations** at important steps — more can be added as needed.
- Handle special input like entity name is **empty** - need to use entity Id intead of name to delete it.

---

## Assumptions

- Pages like Gateway Services and Routes share a **template**.  
  → A base class is used to implement core functionality such as create, delete, and get ID to avoiding code duplication.

- Pages like Service detail and Route detail share a **template**.  
  → A base class is used to implement core functionality such as get ID to avoiding code duplication.

- In the future, test data such as URLs may change (e.g., for specific test scenarios or changes in environments like `dev` or `uat`).
  → Variables are stored in **environment configuration** `cypress.env.json` to make tests easily configurable.

- Tests may **not** always run in a **fresh environment**:
  - When creating an entity, first check the number of existing one to validate if env is fresh (the page might differ).
  - Entity names should be unique to avoid duplication.
- **A toaster** will pop up when action is successfully executed like create or delete. Need to close it or it may make some button unable to click.<br>
Although we can set `{ force: true }` to click, but let's try close toaster to **minic user behavior** first.

---

## Trade-offs

- Create Service and Route can also be merged into one `it()` within one `describe()`.
  - ✅ Cases will have no dependency on each other.
  - ✅ No need to fail fast.
  - ✅ Handle both success and failure in afterEach()
  - ❌ Case steps will be long.
- Some elements (e.g., workspace sidebar) do not fit well into a specific page object.<br>
They are defined as standalone element-level functions.<br>
While they could be part of Cypress commands, they are kept separate for extensibility and consistency.
- Due to time constraints, the browser size is currently fixed at the start of each test.<br>
In the future, tests should cover multiple screen sizes.

---
