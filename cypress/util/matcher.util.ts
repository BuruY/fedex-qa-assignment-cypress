type ChainableJQueryMatcher = ($element: JQuery) => void;

/**
 * This matches Chainable<JQuery> text value after trimming
 */
export const equalExtractedValue = (expectedMessage: string): ChainableJQueryMatcher => {
  return ($element: JQuery) => expect($element.text().trim()).equal(expectedMessage);
};
