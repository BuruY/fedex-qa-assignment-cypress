import {AppPage} from '../../pages/app.page';
import {interceptGetSwapiPlanets} from '../../intercept/swapi.intercept';
import {equalExtractedValue, planetMatcher} from '../../util/matcher.util';

describe('When searching for planets', () => {
  let app: AppPage;

  beforeEach(() => {
    cy.visit(Cypress.env('HOMEPAGE'));
    app = new AppPage();
  });

  it('Should be able to search by full name', () => {
    const planetKeyword = 'Coruscant';
    cy.searchPlanet(planetKeyword);
    app.peopleSearchResult.self.should('not.exist');
    app.planetSearchResult.self.should('be.visible');

    app.planetSearchResult.planets.should('have.length', 1);
    planetMatcher(app.planetSearchResult.getPlanetByIndex(0), {
      name: planetKeyword,
      population: '1000000000000',
      climate: 'temperate',
      gravity: '1 standard'
    });
  });

  it('Should be able to partially match', () => {
    cy.searchPlanet('alee');

    const planets = app.planetSearchResult.planets;
    planets.should('have.length.greaterThan', 1);

    planetMatcher(app.planetSearchResult.getPlanetByIndex(0), {
      name: 'Aleen Minor',
      population: 'unknown',
      climate: 'unknown',
      gravity: 'unknown'
    });
  });

  it('Should show loading state when awaiting results', () => {
    interceptGetSwapiPlanets(3000);
    cy.searchPlanet('doesn\'t matter');
    app.loading.should(equalExtractedValue('Loading...'));
  });
});
