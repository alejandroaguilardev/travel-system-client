/// <reference types="cypress" />

describe('Login Page', () => {

  beforeEach(() => {
    cy.visit('/auth/login');
  })

  it('should_admin_successfully_login', () => {
    const email = 'alex@gmail.com';
    const password = '12345678';

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').should('exist').should('be.visible').click();
    cy.url().should('include', '/dashboard');
  })

  it('should_failed_login', () => {
    const email = 'alex@gmail.com';
    const password = '123456780';

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').should('exist').should('be.visible').click();
    cy.url().should('include', '/auth/login');
  })
})