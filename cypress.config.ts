import {defineConfig} from 'cypress';

export default defineConfig({
  videosFolder: 'output/cypress/videos',
  screenshotsFolder: 'output/cypress/screenshots',
  fixturesFolder: false,
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: './cypress/**/*.spec.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4200',
    supportFile: './cypress/commands.ts',
    defaultCommandTimeout: 20000, // swapi can take a long time responding
  },
  retries: {
    runMode: 2,
    openMode: 0,
  }
});
