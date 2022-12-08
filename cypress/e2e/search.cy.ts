import { visitAndSubmitForm } from '../utils';

describe('Fill the search form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should be able to insert the date value', () => {
    cy.get('[data-testid="date-input"]').type('2200-10-10').should('have.value', '2200-10-10');
  });

  it('Should be able to insert the date value', () => {
    cy.get('[data-testid="passengers-input"]').clear().type('2').should('have.value', '2');
  });

  it('Should be able to insert the origin city', () => {
    cy.get('input[placeholder="Select your origin city"]').type('P');
    cy.contains('Paris').click();
    cy.get('input[placeholder="Select your origin city"]').should('have.value', 'Paris');
  });

  it('Should be able to insert the destiny city', () => {
    cy.get('input[placeholder="Select your destiny city"]').type('Ni');
    cy.contains('Nice').click();
    cy.get('input[placeholder="Select your destiny city"]').should('have.value', 'Nice');
  });

  it('Should be able to add one more city', () => {
    cy.get('[data-testid="add-localization-button"]').click();
    cy.get('input[placeholder="Select your destiny city"]').should('be.visible');
  });

  it('Should be unable to submit form without filling the date', () => {
    cy.get('[data-testid="passengers-input"]').clear().type('2');
    cy.get('input[placeholder="Select your destiny city"]').type('Nice');
    cy.get('input[placeholder="Select your origin city"]').type('Paris');

    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="date-input-error"]').should('be.visible');
  });

  it('Should be unable to submit form without filling the passengers', () => {
    cy.get('[data-testid="passengers-input"]').clear();
    cy.get('[data-testid="date-input"]').type('2200-10-10');
    cy.get('input[placeholder="Select your destiny city"]').type('Nice');
    cy.get('input[placeholder="Select your origin city"]').type('Paris');

    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="passengers-input-error"]').should('be.visible');
  });

  it('Should be unable to submit form without filling the origin city', () => {
    cy.get('[data-testid="date-input"]').type('2200-10-10');
    cy.get('[data-testid="passengers-input"]').clear().type('2');
    cy.get('input[placeholder="Select your destiny city"]').type('Nice');

    cy.get('[data-testid="search-button"]').should('be.disabled');
  });

  it('Should be unable to submit form without filling the destiny city', () => {
    cy.get('[data-testid="date-input"]').type('2200-10-10');
    cy.get('[data-testid="passengers-input"]').clear().type('2');
    cy.get('input[placeholder="Select your origin city"]').type('Paris');

    cy.get('[data-testid="search-button"]').should('be.disabled');
  });
});

describe('After form submit', () => {
  beforeEach(() => {
    visitAndSubmitForm();
  });

  it('Should get correct value in date input', () => {
    cy.get('[data-testid="date-input"]').should('have.value', '2200-10-10');
  });

  it('Should get correct value in passengers input', () => {
    cy.get('[data-testid="passengers-input"]').should('have.value', '2');
  });

  it('Should display Paris city', () => {
    cy.contains('Paris');
  });

  it('Should display Nice city', () => {
    cy.contains('Nice');
  });

  it('Should display the correct relative distance', () => {
    cy.get('[data-testid="distance-value"]').should('have.text', '686km');
  });

  it('Should display the total distance', () => {
    cy.get('[data-testid="total-distance-value"]').should('have.text', '686km');
  });

  it('Should be able to start new search', () => {
    cy.get('[data-testid="search-button"]').click();

    cy.url().should('be.equal', 'http://localhost:3000/?passengers=1&cities=%2C');
  });
});

describe('Search form fills with data from url', () => {
  it('Should fill the date input', () => {
    cy.visit('/?date=2200-10-10');
    cy.get('[data-testid="date-input"]').should('have.value', '2200-10-10');
  });

  it('Should fill the passengers input', () => {
    cy.visit('/?passengers=2');
    cy.get('[data-testid="passengers-input"]').should('have.value', '2');
  });

  it('Should fill the cities input', () => {
    cy.visit('/?cities=Paris,Nice');
    cy.get('input[value="Paris"]').should('be.visible');
    cy.get('input[value="Nice"]').should('be.visible');
  });
});

describe('Gets correct result with data from url', () => {
  beforeEach(() => {
    cy.visit('/result?cities=Paris,Nice&date=2200-10-10&passengers=2');
  });

  it('Should get correct value in date input', () => {
    cy.get('[data-testid="date-input"]').should('have.value', '2200-10-10');
  });

  it('Should get correct value in passengers input', () => {
    cy.get('[data-testid="passengers-input"]').should('have.value', '2');
  });

  it('Should display Paris city', () => {
    cy.contains('Paris');
  });

  it('Should display Nice city', () => {
    cy.contains('Nice');
  });

  it('Should display the correct relative distance', () => {
    cy.get('[data-testid="distance-value"]').should('have.text', '686km');
  });

  it('Should display the total distance', () => {
    cy.get('[data-testid="total-distance-value"]').should('have.text', '686km');
  });
});

describe('Handle form errors', () => {
  it('Should display error toast when fail is sent', () => {
    cy.visit('/');
    cy.get('input[placeholder="Select your origin city"]').type('fail');
    cy.contains('Ops').should('be.visible');
  });
});

describe('Handle submit errors', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="date-input"]').type('2200-10-10');
    cy.get('[data-testid="passengers-input"]').clear().type('2');
    cy.get('input[placeholder="Select your origin city"]').type('Paris');
    cy.get('input[placeholder="Select your destiny city"]').type('Dijon');
    cy.get('[data-testid="search-button"]').click();
  });

  it('Should display error box when Dijon is sent', () => {
    cy.get('[data-testid="error-box"]').should('be.visible');
  });

  it('Should display error toast when Dijon is sent', () => {
    cy.contains('Ops').should('be.visible');
  });
});

export { };
