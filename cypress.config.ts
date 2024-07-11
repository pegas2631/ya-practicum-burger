import { defineConfig } from "cypress";


export default defineConfig({
  e2e: {
    // @ts-ignore
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: './cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
