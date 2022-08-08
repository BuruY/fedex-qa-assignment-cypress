import {AppPage} from '../pages/app.page';
import {equalExtractedValue} from '../util/matcher.util';
import {interceptGetSwapiPeople, interceptGetSwapiPlanets} from '../intercept/swapi.intercept';

describe('Running the star-wars app', () => {
  let app: AppPage;

  beforeEach(() => {
    cy.visit('/');
    app = new AppPage();
  });

  it('Should only present the search form', () => {
    app.heading.should(equalExtractedValue('The Star Wars Search'));
    app.searchForm.self.should('be.visible');

    app.planetSearchResult.self.should('not.exist');
    app.peopleSearchResult.self.should('not.exist');
  });

  it('Should have default values set', () => {
    app.searchForm.peopleRadioInput.should('be.checked');
    app.searchForm.planetsRadioInput.should('not.be.checked');
    app.searchForm.searchInput.should('have.value', '');
  });

  it('Should be able to search with pressing "enter"', () => {
    app.searchForm.searchInput.type('a');
    app.searchForm.searchInput.type('{enter}');
    app.peopleSearchResult.self.should('be.visible');
  });

  it('Should switch between planets and people', () => {
    const planet = 'Tatooine';
    app.searchForm.planetsRadioInput.click();
    app.searchForm.searchInput.type(planet);
    const planetsAlias = interceptGetSwapiPlanets();
    app.searchForm.submitButton.click();

    cy.wait(planetsAlias);
    app.planetSearchResult.getPlanetByIndex(0).nameHeading.should(equalExtractedValue(planet));

    app.searchForm.peopleRadioInput.click();
    const peopleAlias = interceptGetSwapiPeople();
    app.searchForm.searchInput.type('{enter}');
    cy.wait(peopleAlias);
    app.notFound.should(equalExtractedValue('Not found.'));
  });

  it('Should show "Not found." when no results could be found', () => {
    app.searchForm.searchInput.type('abcdef1234!@#$');
    app.searchForm.submitButton.click();
    app.notFound.should(equalExtractedValue('Not found.'));
  });

  it('Should clear results when searching for empty string', () => {
    app.searchForm.planetsRadioInput.click();
    app.searchForm.searchInput.type('a');
    app.searchForm.submitButton.click();
    app.planetSearchResult.planets.should('have.length.greaterThan', 1);

    app.searchForm.searchInput.clear();
    app.searchForm.searchInput.type('{enter}');
    app.planetSearchResult.planets.should('not.exist');
  });

});
