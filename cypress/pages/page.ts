import Chainable = Cypress.Chainable;

export interface PageOptions {
  init: string | Chainable<JQuery>;
  alias: string;
}

export class Page {
  public selfAlias: string;
  public self: Chainable<JQuery>;

  public constructor(options: PageOptions) {
    const {init, alias} = options;
    this.self = typeof init === 'string' ? cy.get(init) : init;
    this.self.as(alias);
    this.selfAlias = `@${alias}`;
  }
}
