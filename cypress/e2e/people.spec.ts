import {AppPage} from '../pages/app.page';
import {equalExtractedValue} from '../util/matcher.util';
import {CharacterComponent} from '../pages/components/character.component';
import {interceptGetSwapiPeople} from '../intercept/swapi.intercept';

interface People {
  name: string;
  gender: string;
  birthYear: string;
  eyeColor: string;
  skinColor: string;
}

describe('When searching for people', () => {
  let app: AppPage;

  beforeEach(() => {
    cy.visit('/');
    app = new AppPage();
  });

  it('Should be able to search by full name', () => {
    const people = 'Chewbacca';
    cy.searchPeople(people);

    app.peopleSearchResult.characters.should('have.length', 1);
    shouldMatch(app.peopleSearchResult.getCharacterByIndex(0), {
      name: people,
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

    shouldMatch(app.peopleSearchResult.getCharacterByIndex(0), {
      name: 'Jabba Desilijic Tiure',
      gender: 'hermaphrodite',
      birthYear: '600BBY',
      eyeColor: 'orange',
      skinColor: 'green-tan, brown'
    });
  });

  it('Should show loading state when awaiting results', () => {
    interceptGetSwapiPeople(3000);
    app.searchForm.searchInput.type('doesn\'t matter');
    app.searchForm.submitButton.click();

    app.loading.should(equalExtractedValue('Loading...'));
  });
});

const shouldMatch = (searchResult: CharacterComponent, dataToMatch: People) => {
  searchResult.nameHeading.should(equalExtractedValue(dataToMatch.name));
  searchResult.genderValue.should(equalExtractedValue(dataToMatch.gender));
  searchResult.birthYearValue.should(equalExtractedValue(dataToMatch.birthYear));
  searchResult.eyeColorValue.should(equalExtractedValue(dataToMatch.eyeColor));
  searchResult.skinColorValue.should(equalExtractedValue(dataToMatch.skinColor));
};
