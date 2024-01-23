/// <reference types="cypress" />

import { paths } from '../../../src/app/routes/paths';
import { permissionCreateMother } from '../../../test/modules/permissions/domain/permission.mother';

describe('Create Permission Page', () => {

    beforeEach(() => {
        cy.login();
        cy.wait(100);
        cy.visit(paths.dashboard.permissions.new);
        cy.url().should('include', paths.dashboard.permissions.new);
    })

    it('should_create_permission', () => {
        const permission = permissionCreateMother();
        cy.get('input[name="group"]').type(permission.group);
        cy.get('input[name="name"]').type(permission.name);
        cy.get('textarea[name="description"]').type(permission.description);
        cy.get('button[value="submit"]').click();
        cy.url().should('include', paths.dashboard.permissions.root);
    })

    it('should_create_permission_page_and_reload', () => {
        const permission = permissionCreateMother();
        cy.get('input[name="group"]').type(permission.group);
        cy.get('input[name="name"]').type(permission.name);
        cy.get('textarea[name="description"]').type(permission.description);
        cy.get('button[value="reload"]').click();
        cy.url().should('include', paths.dashboard.permissions.new);
    })

    it('should_create_permission_page_and_failed', () => {
        cy.get('button[value="reload"]').click();
        cy.url().should('include', paths.dashboard.permissions.new);
    })


})
