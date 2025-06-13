
---

## 1. Local run

```bash
npm install
npm testmochawesome
```

## 2. Extra feature

### a. Result Report
Uses Mochawesome as the report generator.<br>
An HTML report is enabled for human readability.<br>
The report is downloadable through GitHub Actions.

### b. Github Action
Enabled.

## Design
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

### Test Cases
- Ensure test cases are readable; avoid overly long steps.
- Design reusable steps instead of repeating similar actions in each test case.
- Use stable selectors such as data-testid properties to reduce the risk of test breakage due to UI changes.

### Project level implemention
- Provide page-level functions under /cypress/support/pages.
- Provide common element-level functions under /cypress/support/elements.
- Centralize selectors under /cypress/support/config/selectors.js to support future UI changes.
- Use enumerations to store UI options or properties, minimizing user input errors when writing test cases (/cypress/support/config/projectEnum.js).

### Test cases implemention
- Set up baseUrl and navigate to /workspace before each test begins.
- Clean up data (delete created entries) after each test, taking dependencies into account.
- PPrint logs at key steps to improve debugging.
- Include validations at important steps — more can be added as needed.

### Assumptions
- Entity/View Details Pages (e.g., Gateway Services, Routes) use a shared template.<br> 
A base class is used to implement core functionality such as create, delete, and get ID — avoiding code duplication.
- In the future, test data such as URLs may change (e.g., for specific test scenarios or changes in environments like dev or uat).<br>
Variables are stored in cypress.env.json to make tests easily configurable.
- Tests may not always run in a fresh environment:
  - When creating an entity, first check if number of existing one (the page might differ).
  - Entity names should be unique to avoid duplication.

### Trade-offs
- Some elements (e.g., workspace sidebar) do not fit well into a specific page object.<br>
They are defined as standalone element-level functions.<br>
While they could be part of Cypress commands, they are kept separate for extensibility and consistency.
- Due to time constraints, the browser size is currently fixed at the start of each test.<br>
In the future, tests should cover multiple screen sizes.

---