import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Replace with your new server URL and port
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});