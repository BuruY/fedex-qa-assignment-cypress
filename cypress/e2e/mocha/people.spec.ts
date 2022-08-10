import {AppPage} from '../../pages/app.page';
import {interceptGetSwapiPeople} from '../../intercept/swapi.intercept';
import {equalExtractedValue, peopleMatcher} from '../../util/matcher.util';

describe('When searching for people', () => {
  let app: AppPage;

  beforeEach(() => {
    cy.visit(Cypress.env('HOMEPAGE'));
    app = new AppPage();
  });

  it('Should be able to search by full name', () => {
    const peopleKeyword = 'Chewbacca';
    cy.searchPeople(peopleKeyword);
    app.planetSearchResult.self.should('not.exist');
    app.peopleSearchResult.self.should('be.visible');

    app.peopleSearchResult.characters.should('have.length', 1);
    peopleMatcher(app.peopleSearchResult.getCharacterByIndex(0), {
      name: peopleKeyword,
      gender: 'male',
      birthYear: '200BBY',
      eyeColor: 'blue',
      skinColor: 'unknown'
    });
  });

  it('Should be able to partially match', () => {
    cy.searchPeople('si');

    const characters = app.peopleSearchResult.characters;
    characters.should('have.length.greaterThan', 1);

    peopleMatcher(app.peopleSearchResult.getCharacterByIndex(0), {
      name: 'Jabba Desilijic Tiure',
      gender: 'hermaphrodite',
      birthYear: '600BBY',
      eyeColor: 'orange',
      skinColor: 'green-tan, brown'
    });
  });

  it('Should show loading state when awaiting results', () => {
    interceptGetSwapiPeople(3000);
    cy.searchPeople('doesn\'t matter');
    app.loading.should(equalExtractedValue('Loading...'));
  });
});
