import { permissionUpdater } from '../../../../src/modules/permissions/application/update/permission-updater';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { permissionCreateMother } from "../domain/permission.mother"
import { permissionServiceMock } from "../domain/permission.service.mock";

describe("PermissionUpdater", () => {

    it("should_successfully_permission_update", async () => {
        const dataForm = permissionCreateMother();
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        permissionServiceMock.update.mockResolvedValueOnce(response);
        const expected = await permissionUpdater(permissionServiceMock, uuid)(id, dataForm)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_permission_update_to_have_call", async () => {
        const dataForm = permissionCreateMother();
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        permissionServiceMock.save.mockResolvedValueOnce(response);
        await permissionUpdater(permissionServiceMock, uuid)(id, dataForm)
        expect(permissionServiceMock.update).toHaveBeenCalledWith(id, dataForm)
    })

    it("should_failed_permission_update", async () => {
        const dataForm = permissionCreateMother();
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        permissionServiceMock.update.mockRejectedValueOnce(response);
        try {
            await permissionUpdater(permissionServiceMock, uuid)(id, dataForm);
            fail("should_failed_permission_update")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})