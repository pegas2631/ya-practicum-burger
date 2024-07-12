import { defineConfig } from "cypress";


export default defineConfig({
  e2e: {
    // @ts-ignore
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/#/',
    specPattern: './cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
