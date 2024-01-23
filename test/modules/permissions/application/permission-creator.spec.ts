import { permissionCreator } from '../../../../src/modules/permissions/application/create/permission-creator';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { permissionCreateMother } from "../domain/permission.mother"
import { permissionServiceMock } from "../domain/permission.service.mock";

describe("PermissionCreator", () => {

    it("should_successfully_permission_create", async () => {
        const dataForm = permissionCreateMother();
        const response = { message: MessageCreateMother() }
        permissionServiceMock.save.mockResolvedValueOnce(response);
        const expected = await permissionCreator(permissionServiceMock, uuid)(dataForm)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_permission_create_to_have_call", async () => {
        const dataForm = permissionCreateMother();
        const response = { message: MessageCreateMother() }
        permissionServiceMock.save.mockResolvedValueOnce(response);
        await permissionCreator(permissionServiceMock, uuid)(dataForm)

        expect(permissionServiceMock.save).toHaveBeenCalledWith(dataForm)
    })

    it("should_failed_permission_create", async () => {
        const dataForm = permissionCreateMother();
        const response = new Error(MessageCreateMother());
        permissionServiceMock.save.mockRejectedValueOnce(response);
        try {
            await permissionCreator(permissionServiceMock, uuid)(dataForm)
            fail("should_failed_permission_create")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})