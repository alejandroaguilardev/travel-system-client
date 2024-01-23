import { roleCreator } from '../../../../src/modules/roles/application/create/role-creator';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { roleCreateMother } from "../domain/role.mother"
import { roleServiceMock } from "../domain/role.service.mock";
import { roleToNewRole } from '../../../../src/modules/roles/domain/role';

describe("RoleCreator", () => {

    it("should_successfully_role_create", async () => {
        const roleMother = roleCreateMother();
        const dataForm = roleToNewRole(roleMother);
        const response = { message: MessageCreateMother() }
        roleServiceMock.save.mockResolvedValueOnce(response);
        const expected = await roleCreator(roleServiceMock, uuid)(dataForm)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_role_create_to_have_call", async () => {
        const roleMother = roleCreateMother();
        const dataForm = roleToNewRole(roleMother);
        const response = { message: MessageCreateMother() }
        roleServiceMock.save.mockResolvedValueOnce(response);
        await roleCreator(roleServiceMock, uuid)(dataForm)

        expect(roleServiceMock.save).toHaveBeenCalledWith(dataForm)
    })

    it("should_failed_role_create", async () => {
        const roleMother = roleCreateMother();
        const dataForm = roleToNewRole(roleMother);
        const response = new Error(MessageCreateMother());
        roleServiceMock.save.mockRejectedValueOnce(response);
        try {
            await roleCreator(roleServiceMock, uuid)(dataForm)
            fail("should_failed_role_create")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})