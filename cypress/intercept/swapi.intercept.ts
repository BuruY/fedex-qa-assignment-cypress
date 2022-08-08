export const interceptGetSwapiPeople = (delay = 0): string => {
  const alias = 'swapiPeople';
  cy.intercept('https://swapi.dev/api/people/**', req => {
    req.continue(res => {
      res.delay = delay;
    });
  }).as(alias);
  return `@${alias}`;
};

export const interceptGetSwapiPlanets = (delay = 0): string => {
  const alias = 'swapiPlanets';
  cy.intercept('https://swapi.dev/api/planets/**', req => {
    req.continue(res => {
      res.delay = delay;
    });
  }).as(alias);
  return `@${alias}`;
};
