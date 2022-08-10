import {DataTable, Step, Then, When} from '@badeball/cypress-cucumber-preprocessor';
import {interceptGetSwapiPeople} from '../../../intercept/swapi.intercept';
import {AppPage} from '../../../pages/app.page';
import {People, peopleMatcher} from '../../../util/matcher.util';

When(/^Searching for people\s?(.*)\s?$/, (keyword: string) => {
  cy.searchPeople(keyword);
});

When(/^Searching and validating API call for people\s?(.*)\s?$/, (keyword: string) => {
  const peopleAlias = interceptGetSwapiPeople();
  Step(this, `Searching for people${keyword}`);
  cy.wait(peopleAlias);
});

When('Delaying API call for people for {int} ms', (delayInMs: number) => {
  interceptGetSwapiPeople(delayInMs);
});

Then(/^People searchResults should (be visible|not exist)$/, (matcher: string) => {
  const app = new AppPage();
  app.peopleSearchResult.self.should(matcher.replace(' ', '.'));
});

Then(/^People should have more than (\d+) result(?:s)?$/, (length: number) => {
  const app = new AppPage();
  app.peopleSearchResult.characters.should('have.length.greaterThan', length);
});

Then(/^People should have (\d+) result(?:s)?$/, (length: number) => {
  const app = new AppPage();
  app.peopleSearchResult.characters.should('have.length', length);
});

Then(/^People result should match$/, (peopleDataTable: DataTable) => {
  const app = new AppPage();
  const peoplesToMatch = convertDataTableToPeople(peopleDataTable.rows());
  peoplesToMatch.forEach((people, index) => peopleMatcher(app.peopleSearchResult.getCharacterByIndex(index), people));
});

const convertDataTableToPeople = (dataTableRows: string[][]): Array<People> => {
  const peoplesToMatch: Array<People> = [];
  dataTableRows.map(row => peoplesToMatch.push({
    name: row[0],
    gender: row[1],
    birthYear: row[2],
    eyeColor: row[3],
    skinColor: row[4]
  }));
  return peoplesToMatch;
};
