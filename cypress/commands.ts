import {AppPage} from './pages/app.page';
import Chainable = Cypress.Chainable;
import 'cypress-mochawesome-reporter/register';

declare global {
  namespace Cypress {
    interface Chainable {
      searchPeople: (name: string) => void;
      searchPlanet: (name: string) => void;
    }
  }
}

const searchPeople = (name: string | undefined) => {
  const appPage = new AppPage();
  search(appPage, appPage.searchForm.peopleRadioInput, name);
};

const searchPlanet = (name: string | undefined) => {
  const appPage = new AppPage();
  search(appPage, appPage.searchForm.planetsRadioInput, name);
};

const search = (appPage: AppPage, radioToBeChecked: Chainable<JQuery>, keyword: string | undefined) => {
  radioToBeChecked.then(input => {
    if (!input.attr('checked')) {
      cy.wrap(input).click();
    }
  });

  const searchForm = appPage.searchForm;
  if (keyword) {
    searchForm.searchInput.clear();
    searchForm.searchInput.type(keyword);
  }
  searchForm.submitButton.click();
};

Cypress.Commands.add('searchPeople', searchPeople);
Cypress.Commands.add('searchPlanet', searchPlanet);
