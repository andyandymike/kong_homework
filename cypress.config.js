const { defineConfig } = require("cypress");
const cypressFailFast = require("cypress-fail-fast/plugin.js");


module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8002',
    browser: 'chrome',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    setupNodeEvents(on, config) {
      cypressFailFast(on, config, {
        strategy: 'spec',
      });
    },
  },
});
