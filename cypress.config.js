const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "rdmyqy",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www3.epa.gov/carbon-footprint-calculator',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 30000
  },
});
