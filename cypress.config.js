const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www3.epa.gov/carbon-footprint-calculator',
    viewportWidth: 1440,
    viewportHeight: 900
  },
});
