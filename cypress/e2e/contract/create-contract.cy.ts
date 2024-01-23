/// <reference types="cypress" />

import { paths } from '../../../src/app/routes/paths';
import { contractCreateMother } from '../../../test/modules/contracts/domain/contract.mother';

describe("CreateContract", () => {
    beforeEach(() => {
        cy.login();
        cy.wait(100);
        cy.visit(paths.dashboard.contracts.new);
        cy.url().should("include", paths.dashboard.contracts.new)
    })

    it('should_create_contract', () => {
        const contract = contractCreateMother();

        cy.get('input[name="number"]').type(contract.number);
        cy.get('input[placeholder="Buscar cliente..."]').click();
        cy.get('[role="option"]').first().click();
        cy.get('button[value="submit"]').click();
        cy.url().should('include', paths.dashboard.contracts.root);

    })

    it('should_create_contract_page_and_reload', () => {
        const contract = contractCreateMother();
        cy.get('input[name="number"]').type(contract.number);
        cy.get('input[placeholder="Buscar cliente..."]').click();
        cy.get('[role="option"]').first().click();
        cy.get('button[value="reload"]').click();
        cy.url().should('include', paths.dashboard.contracts.new);
    })

    it('should_create_contract_page_and_failed', () => {
        cy.get('button[value="reload"]').click();
        cy.url().should('include', paths.dashboard.contracts.new);
    })
})