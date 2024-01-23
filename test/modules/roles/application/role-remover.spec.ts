import { roleRemover } from '../../../../src/modules/roles/application/remove/role-remover';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { roleServiceMock } from "../domain/role.service.mock";

describe("RoleCreator", () => {

    it("should_successfully_role_remove", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        roleServiceMock.remove.mockResolvedValueOnce(response);
        const expected = await roleRemover(roleServiceMock, uuid)(id)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_role_remove_to_have_call", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        roleServiceMock.remove.mockResolvedValueOnce(response);
        await roleRemover(roleServiceMock, uuid)(id)

        expect(roleServiceMock.remove).toHaveBeenCalledWith(id)
    })

    it("should_failed_role_remove", async () => {
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        roleServiceMock.remove.mockRejectedValueOnce(response);
        try {
            await roleRemover(roleServiceMock, uuid)(id)
            fail("should_failed_role_remove")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})