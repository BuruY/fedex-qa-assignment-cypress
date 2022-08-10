import {Then, When} from '@badeball/cypress-cucumber-preprocessor';
import {AppPage} from '../../../pages/app.page';
import {equalExtractedValue} from '../../../util/matcher.util';

When('The app is open', () => {
  cy.visit(Cypress.env('HOMEPAGE'));
});

Then('Loading page is shown', () => {
  const app = new AppPage();
  app.loading.should(equalExtractedValue('Loading...'));
});

Then('Not Found page is shown', () => {
  const app = new AppPage();
  app.notFound.should(equalExtractedValue('Not found.'));
});
