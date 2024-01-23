import { roleUpdater } from '../../../../src/modules/roles/application/update/role-updater';
import { roleToNewRole } from '../../../../src/modules/roles/domain/role';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { roleCreateMother } from "../domain/role.mother"
import { roleServiceMock } from "../domain/role.service.mock";

describe("RoleUpdater", () => {

    it("should_successfully_role_update", async () => {
        const roleMother = roleCreateMother();
        const dataForm = roleToNewRole(roleMother);
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        roleServiceMock.update.mockResolvedValueOnce(response);
        const expected = await roleUpdater(roleServiceMock, uuid)(id, dataForm)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_role_update_to_have_call", async () => {
        const roleMother = roleCreateMother();
        const dataForm = roleToNewRole(roleMother);
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        roleServiceMock.save.mockResolvedValueOnce(response);
        await roleUpdater(roleServiceMock, uuid)(id, dataForm)
        expect(roleServiceMock.update).toHaveBeenCalledWith(id, dataForm)
    })

    it("should_failed_role_update", async () => {
        const roleMother = roleCreateMother();
        const dataForm = roleToNewRole(roleMother);
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        roleServiceMock.update.mockRejectedValueOnce(response);
        try {
            await roleUpdater(roleServiceMock, uuid)(id, dataForm);
            fail("should_failed_role_update")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})