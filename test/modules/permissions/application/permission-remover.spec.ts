import { permissionRemover } from '../../../../src/modules/permissions/application/remove/permission-remover';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { permissionServiceMock } from "../domain/permission.service.mock";

describe("PermissionRemover", () => {

    it("should_successfully_permission_remove", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        permissionServiceMock.remove.mockResolvedValueOnce(response);
        const expected = await permissionRemover(permissionServiceMock, uuid)(id)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_permission_remove_to_have_call", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        permissionServiceMock.remove.mockResolvedValueOnce(response);
        await permissionRemover(permissionServiceMock, uuid)(id)

        expect(permissionServiceMock.remove).toHaveBeenCalledWith(id)
    })

    it("should_failed_permission_remove", async () => {
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        permissionServiceMock.remove.mockRejectedValueOnce(response);
        try {
            await permissionRemover(permissionServiceMock, uuid)(id)
            fail("should_failed_permission_remove")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})