const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8002',
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
