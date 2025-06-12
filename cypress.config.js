const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'p9w76t',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
