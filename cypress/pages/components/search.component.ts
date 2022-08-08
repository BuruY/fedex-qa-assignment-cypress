import {Page} from '../page';
import Chainable = Cypress.Chainable;

export class SearchComponent extends Page {
  public constructor() {
    super({init: 'app-search-form', alias: 'search-form'});
  }

  get peopleRadioInput(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('input#people');
  }

  get planetsRadioInput(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('input#planets');
  }

  get searchInput(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('input#query');
  }

  get submitButton(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('button[type="submit"]');
  }

}
