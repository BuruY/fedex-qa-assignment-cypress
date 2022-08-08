import {AppPage} from './pages/app.page';
import Chainable = Cypress.Chainable;

declare global {
  namespace Cypress {
    interface Chainable {
      searchPeople: (name: string) => void;
      searchPlanet: (name: string) => void;
    }
  }
}

const searchPeople = (name: string) => {
  const appPage = new AppPage();
  search(appPage, appPage.searchForm.peopleRadioInput, name);

  appPage.planetSearchResult.self.should('not.exist');
  appPage.peopleSearchResult.self.should('be.visible');
};

const searchPlanet = (name: string) => {
  const appPage = new AppPage();
  search(appPage, appPage.searchForm.planetsRadioInput, name);

  appPage.peopleSearchResult.self.should('not.exist');
  appPage.planetSearchResult.self.should('be.visible');
};

const search = (appPage: AppPage, radioToBeChecked: Chainable<JQuery>, name: string) => {
  radioToBeChecked.then(input => {
    if (!input.attr('checked')) {
      cy.wrap(input).click();
    }
  });

  const searchForm = appPage.searchForm;
  searchForm.searchInput.clear();
  searchForm.searchInput.type(name);

  searchForm.submitButton.click();
};

Cypress.Commands.add('searchPeople', searchPeople);
Cypress.Commands.add('searchPlanet', searchPlanet);
