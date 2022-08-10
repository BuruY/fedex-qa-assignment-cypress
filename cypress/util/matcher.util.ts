import {CharacterComponent} from '../pages/components/character.component';
import {PlanetComponent} from '../pages/components/planet.component';

type ChainableJQueryMatcher = ($element: JQuery) => void;

/**
 * This matches Chainable<JQuery> text value after trimming
 */
export const equalExtractedValue = (expectedMessage: string): ChainableJQueryMatcher => {
  return ($element: JQuery) => expect($element.text().trim()).equal(expectedMessage);
};

export interface People {
  name: string;
  gender: string;
  birthYear: string;
  eyeColor: string;
  skinColor: string;
}

/**
 * This matches a CharacterComponent with a People object
 */
export const peopleMatcher = (searchResult: CharacterComponent, dataToMatch: People): void => {
  searchResult.nameHeading.should(equalExtractedValue(dataToMatch.name));
  searchResult.genderValue.should(equalExtractedValue(dataToMatch.gender));
  searchResult.birthYearValue.should(equalExtractedValue(dataToMatch.birthYear));
  searchResult.eyeColorValue.should(equalExtractedValue(dataToMatch.eyeColor));
  searchResult.skinColorValue.should(equalExtractedValue(dataToMatch.skinColor));
};

export interface Planet {
  name: string;
  population: string;
  climate: string;
  gravity: string;
}

/**
 * This matches a CharacterComponent with a Planets object
 */
export const planetMatcher = (searchResult: PlanetComponent, dataToMatch: Planet) => {
  searchResult.nameHeading.should(equalExtractedValue(dataToMatch.name));
  searchResult.populationValue.should(equalExtractedValue(dataToMatch.population));
  searchResult.climateValue.should(equalExtractedValue(dataToMatch.climate));
  searchResult.gravityValue.should(equalExtractedValue(dataToMatch.gravity));
};
