/// <reference types="cypress" />

import { paths } from '../../../src/app/routes/paths';
import { userToNewUser } from '../../../src/modules/users/domain/user';
import { userCreateMother } from '../../../test/modules/users/domain/user.mother';

describe("CreateUser", () => {
    beforeEach(() => {
        cy.login();
        cy.wait(100);
        cy.visit(paths.dashboard.users.new);
        cy.url().should("include", paths.dashboard.users.new)
    })

    it('should_create_user', () => {
        const data = userCreateMother();
        const user = userToNewUser(data);
        cy.get('input[name="name"]').type(user.name);
        cy.get('input[name="secondName"]').type(user?.secondName ?? "");
        cy.get('input[name="lastName"]').type(user.lastName);
        cy.get('input[name="secondLastName"]').type(user?.secondLastName ?? "");
        cy.get('input[name="email"]').type(user.email);
        cy.get('button[value="submit"]').click();
        cy.url().should('include', paths.dashboard.users.root);
    })

    it('should_create_user_page_and_reload', () => {
        const data = userCreateMother();
        const user = userToNewUser(data);
        cy.get('input[name="name"]').type(user.name);
        cy.get('input[name="secondName"]').type(user?.secondName ?? "");
        cy.get('input[name="lastName"]').type(user.lastName);
        cy.get('input[name="secondLastName"]').type(user?.secondLastName ?? "");
        cy.get('input[name="email"]').type(user.email);
        cy.get('button[value="reload"]').click();
        cy.url().should('include', paths.dashboard.users.new);
    })

    it('should_create_user_page_and_failed', () => {
        cy.get('button[value="reload"]').click();
        cy.url().should('include', paths.dashboard.users.new);
    })
})