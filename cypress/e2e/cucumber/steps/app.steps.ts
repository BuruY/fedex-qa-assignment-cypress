import {AppPage} from '../../../pages/app.page';
import {equalExtractedValue} from '../../../util/matcher.util';
import {Then, When} from '@badeball/cypress-cucumber-preprocessor';

When('Clearing the searchInput', () => {
  const app = new AppPage();
  app.searchForm.searchInput.clear();
});

When(/^Typing (.*)\s? in searchInput$/, (keyword: string) => {
  const app = new AppPage();
  if (keyword.trim()) {
    app.searchForm.searchInput.clear();
    app.searchForm.searchInput.type(keyword);
  }
});

When('Pressing the "Enter" key on keyboard', () => {
  const app = new AppPage();
  app.searchForm.searchInput.type(`{enter}`);
});

Then(/^The page title is\s?(.*)$/, (title: string) => {
  const app = new AppPage();
  app.heading.should(equalExtractedValue(title));
});

Then('Only the SearchForm should be visible', () => {
  const app = new AppPage();
  app.searchForm.self.should('be.visible');
  app.planetSearchResult.self.should('not.exist');
  app.peopleSearchResult.self.should('not.exist');
});

Then('Default SearchForm values should be set', () => {
  const app = new AppPage();
  app.searchForm.peopleRadioInput.should('be.checked');
  app.searchForm.planetsRadioInput.should('not.be.checked');
  app.searchForm.searchInput.should('have.value', '');
});
