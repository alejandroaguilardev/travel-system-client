import { paths } from '../../../src/app/routes/paths';
import { roleCreateMother } from '../../../test/modules/roles/domain/role.mother';

describe("CreateRole", () => {
    beforeEach(() => {
        cy.login();
        cy.wait(100);
        cy.visit(paths.dashboard.roles.new);
        cy.url().should("include", paths.dashboard.roles.new)
    })

    it('should_create_permission', () => {
        const role = roleCreateMother()
        cy.get('input[name="name"]').type(role.name);
        cy.get('textarea[name="description"]').type(role.description);
        cy.get('input[type="checkbox"]').check();
        cy.get('button[value="submit"]').click();
        cy.url().should('include', paths.dashboard.roles.root);
    })

    it('should_create_permission_page_and_reload', () => {
        const role = roleCreateMother()
        cy.get('input[name="name"]').type(role.name);
        cy.get('textarea[name="description"]').type(role.description);
        cy.get('input[type="checkbox"]').check();
        cy.get('button[value="reload"]').click();
        cy.url().should('include', paths.dashboard.roles.new);
    })

    it('should_create_permission_page_and_failed', () => {
        cy.get('button[value="reload"]').click();
        cy.url().should('include', paths.dashboard.roles.new);
    })
})