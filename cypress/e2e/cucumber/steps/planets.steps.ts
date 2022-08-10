import {DataTable, Step, Then, When} from '@badeball/cypress-cucumber-preprocessor';
import {interceptGetSwapiPlanets} from '../../../intercept/swapi.intercept';
import {AppPage} from '../../../pages/app.page';
import {Planet, planetMatcher} from '../../../util/matcher.util';

When(/^Searching for planet\s?(.*)\s?$/, (keyword: string) => {
  cy.searchPlanet(keyword);
});

When(/^Searching and validating API call for planet\s?(.*)\s?$/, (keyword: string) => {
  const planetsAlias = interceptGetSwapiPlanets();
  Step(this, `Searching for planet${keyword}`);
  cy.wait(planetsAlias);
});

When('Delaying API call for planet for {int} ms', (delayInMs: number) => {
  interceptGetSwapiPlanets(delayInMs);
});

Then(/^Planets searchResults should (be visible|not exist)$/, (matcher: 'be visible' | 'not exist') => {
  const app = new AppPage();
  app.planetSearchResult.self.should(matcher.replace(' ', '.'));
});

Then(/^Planet should have more than (\d+) result(?:s)?$/, (length: number) => {
  const app = new AppPage();
  app.planetSearchResult.planets.should('have.length.greaterThan', length);
});

Then(/^Planet should have (\d+) result(?:s)?$/, (length: number) => {
  const app = new AppPage();
  app.planetSearchResult.planets.should('have.length', length);
});

Then(/^Planet result should match$/, (planetsDataTable: DataTable) => {
  const app = new AppPage();
  const planetsToMatch = convertDataTableToPlanet(planetsDataTable.rows());
  planetsToMatch.forEach((planet, index) => planetMatcher(app.planetSearchResult.getPlanetByIndex(index), planet));
});

const convertDataTableToPlanet = (dataTableRows: string[][]): Array<Planet> => {
  const planetsToMatch: Array<Planet> = [];
  dataTableRows.map(row => planetsToMatch.push({
    name: row[0],
    population: row[1],
    climate: row[2],
    gravity: row[3]
  }));
  return planetsToMatch;
};
