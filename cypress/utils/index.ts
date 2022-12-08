export const visitAndSubmitForm = (): void => {
  cy.visit('/');

  cy.get('[data-testid="date-input"]').type('2200-10-10');
  cy.get('[data-testid="passengers-input"]').clear().type('2');

  cy.get('input[placeholder="Select your origin city"]').type('P');
  cy.contains('Paris').click();

  cy.get('input[placeholder="Select your destiny city"]').type('Ni');
  cy.contains('Nice').click();

  cy.get('[data-testid="search-button"]').click();
};
