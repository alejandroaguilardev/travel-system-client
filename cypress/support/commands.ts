/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(): Chainable<void>;
    }
}

Cypress.Commands.add('login', () => {
    const email = 'alex@gmail.com';
    const password = '12345678';

    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').should('exist').should('be.visible').click();
    cy.url().should('include', '/dashboard');
});
