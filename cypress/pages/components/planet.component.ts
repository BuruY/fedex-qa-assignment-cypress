import {Page} from '../page';
import Chainable = Cypress.Chainable;

export class PlanetComponent extends Page {
  public constructor(selector: Cypress.Chainable<JQuery>) {
    super({init: selector, alias: 'planet-component'});
  }

  get nameHeading(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('h6.card-subtitle');
  }

  get populationValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-test="populationValue"]');
  }

  get climateValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-test="climateValue"]');
  }

  get gravityValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-test="gravityValue"]');
  }
}
