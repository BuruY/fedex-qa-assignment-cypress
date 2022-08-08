import {AppPage} from '../pages/app.page';
import {equalExtractedValue} from '../util/matcher.util';
import {PlanetComponent} from '../pages/components/planet.component';
import {interceptGetSwapiPlanets} from '../intercept/swapi.intercept';

interface Planet {
  name: string;
  population: string;
  climate: string;
  gravity: string;
}

describe('When searching for planets', () => {
  let app: AppPage;

  beforeEach(() => {
    cy.visit('/');
    app = new AppPage();
  });

  it('Should be able to search by full name', () => {
    cy.searchPlanet('Coruscant');

    app.planetSearchResult.planets.should('have.length', 1);
    shouldMatch(app.planetSearchResult.getPlanetByIndex(0), {
      name: 'Coruscant',
      population: '1000000000000',
      climate: 'temperate',
      gravity: '1 standard'
    });
  });

  it('Should be able to partially match', () => {
    cy.searchPlanet('alee');

    const planets = app.planetSearchResult.planets;
    planets.should('have.length.greaterThan', 1);

    shouldMatch(app.planetSearchResult.getPlanetByIndex(0), {
      name: 'Aleen Minor',
      population: 'unknown',
      climate: 'unknown',
      gravity: 'unknown'
    });
  });

  it('Should show loading state when awaiting results', () => {
    interceptGetSwapiPlanets(3000);
    app.searchForm.planetsRadioInput.click();
    app.searchForm.searchInput.type('doesn\'t matter');
    app.searchForm.submitButton.click();

    app.loading.should(equalExtractedValue('Loading...'));
  });
});

const shouldMatch = (searchResult: PlanetComponent, dataToMatch: Planet) => {
  searchResult.nameHeading.should(equalExtractedValue(dataToMatch.name));
  searchResult.populationValue.should(equalExtractedValue(dataToMatch.population));
  searchResult.climateValue.should(equalExtractedValue(dataToMatch.climate));
  searchResult.gravityValue.should(equalExtractedValue(dataToMatch.gravity));
};
