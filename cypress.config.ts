import {defineConfig} from 'cypress';
import {addCucumberPreprocessorPlugin} from '@badeball/cypress-cucumber-preprocessor';
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await require('cypress-mochawesome-reporter/plugin')(on);
  await addCucumberPreprocessorPlugin(on, config);

  on('file:preprocessor', browserify(config, {
    typescript: require.resolve('typescript')
  }));

  return config;
}

export default defineConfig({
  videosFolder: 'output/cypress/videos',
  screenshotsFolder: 'output/cypress/screenshots',
  fixturesFolder: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'output/cypress/report',
    overwrite: false
  },
  env: {
    HOMEPAGE: '/'
  },
  e2e: {
    setupNodeEvents,
    specPattern: './cypress/**/*.{spec.ts,feature}',
    baseUrl: 'http://localhost:4200',
    supportFile: './cypress/commands.ts',
    defaultCommandTimeout: 20000, // swapi can take a long time responding
  }
});
