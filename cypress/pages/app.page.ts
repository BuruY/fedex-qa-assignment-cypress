import {Page} from './page';
import {SearchComponent} from './components/search.component';
import {CharacterComponent} from './components/character.component';
import Chainable = Cypress.Chainable;
import {PlanetComponent} from './components/planet.component';

export class AppPage extends Page {
  public constructor() {
    super({init: 'app-root', alias: 'root'});
  }

  get heading(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('h1');
  }

  get searchForm(): SearchComponent {
    return new SearchComponent();
  }

  get peopleSearchResult(): PeopleResult {
    return new PeopleResult(cy.get(this.selfAlias).find('div[data-test="peopleResult"]'));
  }

  get planetSearchResult(): PlanetResult {
    return new PlanetResult(cy.get(this.selfAlias).find('div[data-test="planetResult"]'));
  }

  get loading(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-test="loading"]');
  }

  get notFound(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-test="notFound"]');
  }

}

class PeopleResult extends Page {
  private characterSelector = 'app-character';

  public constructor(selector: Cypress.Chainable<JQuery>) {
    super({init: selector, alias: 'people-result'});
  }

  get characters(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find(this.characterSelector);
  }

  getCharacterByIndex(row: number): CharacterComponent {
    return new CharacterComponent(cy.get(this.selfAlias).find(this.characterSelector).eq(row));
  }

}

class PlanetResult extends Page {
  private characterSelector = 'app-planet';

  public constructor(selector: Cypress.Chainable<JQuery>) {
    super({init: selector, alias: 'planet-result'});
  }

  get planets(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find(this.characterSelector);
  }

  getPlanetByIndex(row: number): PlanetComponent {
    return new PlanetComponent(cy.get(this.selfAlias).find(this.characterSelector).eq(row));
  }
}
